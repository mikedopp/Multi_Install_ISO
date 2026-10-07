# Apply providers. Each provider is a hashtable of script blocks:
#   Identity, Connect(ctx), Preflight(vm, ctx), CreateVm, AttachMedia, Readback, PowerOn, Disconnect.
# Each step returns a short detail string for the receipt and throws on failure.
#
# Status: neither provider has been run against real infrastructure yet. Treat the first
# run as a bounded non-production test (see docs/RUNBOOK.md).

function Test-MiiIsElevated {
    $p = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
    return $p.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
}

# --- vSphere (VMware PowerCLI) ----------------------------------------------

function ConvertFrom-MiiDatastorePath {
    param([string]$Path)
    if ($Path -match '^\[(?<ds>[^\]]+)\]\s*(?<rel>.+)$') { return @{ Datastore = $Matches.ds; Relative = $Matches.rel.Replace('\', '/') } }
    return $null
}

function Test-MiiDatastoreFile {
    param([object]$Datastore, [string]$Relative)
    $drive = 'miids' + ([guid]::NewGuid().ToString('N').Substring(0, 6))
    New-PSDrive -Name $drive -PSProvider VimDatastore -Root '\' -Location $Datastore -ErrorAction Stop | Out-Null
    try { return Test-Path -LiteralPath ("${drive}:\" + $Relative.Replace('/', '\')) }
    finally { Remove-PSDrive -Name $drive -ErrorAction SilentlyContinue }
}

function Send-MiiVSphereEnter {
    # Presses Enter through the VM console for ~30 s so EFI's "Press any key to boot from CD" is answered.
    param([object]$VmObject, [int]$Seconds = 30)
    $hid = New-Object VMware.Vim.UsbScanCodeSpecKeyEvent
    $hid.UsbHidCode = (0x28 -shl 16) -bor 7
    $spec = New-Object VMware.Vim.UsbScanCodeSpec
    $spec.KeyEvents = @($hid)
    $deadline = (Get-Date).AddSeconds($Seconds)
    $sent = 0
    while ((Get-Date) -lt $deadline) {
        [void]$VmObject.ExtensionData.PutUsbScanCodes($spec)
        $sent++
        Start-Sleep -Milliseconds 1500
    }
    return $sent
}

function New-MiiVSphereProvider {
    param([hashtable]$Options)

    if (-not $Options.VcenterServer) { throw 'VcenterServer is required for the vSphere target (set it when planning or pass -VcenterServer).' }

    @{
        Name     = 'vsphere'
        Identity = $Options.VcenterServer
        Options  = $Options

        Connect = {
            param($ctx)
            if (-not (Get-Module -ListAvailable -Name VMware.VimAutomation.Core)) {
                throw 'VMware PowerCLI is not installed. Install it yourself (Install-Module VMware.PowerCLI -Scope CurrentUser) and pin the version you tested.'
            }
            Import-Module VMware.VimAutomation.Core -ErrorAction Stop
            $o = $ctx.Provider.Options
            $cred = if ($o.VcenterCredential) { $o.VcenterCredential } else { Get-Credential -Message "Credentials for $($o.VcenterServer)" }
            $ctx.Server = Connect-VIServer -Server $o.VcenterServer -Credential $cred -ErrorAction Stop
        }

        Preflight = {
            param($vm, $ctx)
            $o = $ctx.Provider.Options
            $state = $ctx.State[$vm.name]
            if (Get-VM -Name $vm.name -Server $ctx.Server -ErrorAction SilentlyContinue) { throw "A VM named $($vm.name) already exists." }

            $vmHost = if ($vm.vmHost) { Get-VMHost -Name $vm.vmHost -Server $ctx.Server -ErrorAction Stop }
            elseif ($o.VcenterCluster) {
                Get-Cluster -Name $o.VcenterCluster -Server $ctx.Server -ErrorAction Stop | Get-VMHost |
                    Where-Object ConnectionState -eq 'Connected' | Sort-Object MemoryUsageGB | Select-Object -First 1
            }
            else { throw 'No vmhost in the definition and no cluster on the plan.' }
            if (-not $vmHost) { throw 'No connected host was found.' }

            $ds = Get-Datastore -Name $vm.datastore -Server $ctx.Server -ErrorAction Stop
            $needGb = [double]$vm.diskGB + [double]$vm.secondDiskGB + [double]$vm.memoryGB + 1
            if ($ds.FreeSpaceGB -lt $needGb) { throw "Datastore $($vm.datastore) has $([math]::Round($ds.FreeSpaceGB,1)) GB free; $needGb GB is needed." }

            $pg = Get-VirtualPortGroup -VMHost $vmHost -Name $vm.network -ErrorAction SilentlyContinue
            if (-not $pg) { throw "Port group '$($vm.network)' is not visible from host $($vmHost.Name)." }
            if ($vm.folder) { $null = Get-Folder -Name $vm.folder -Type VM -Server $ctx.Server -ErrorAction Stop }

            $iso = ConvertFrom-MiiDatastorePath $vm.iso
            if (-not $iso) { throw "Install ISO '$($vm.iso)' must be a datastore path like '[datastore1] iso/server2022.iso'. Upload the ISO to a datastore first." }
            $isoDs = Get-Datastore -Name $iso.Datastore -Server $ctx.Server -ErrorAction Stop
            if (-not (Test-MiiDatastoreFile $isoDs $iso.Relative)) { throw "Install ISO $($vm.iso) was not found on the datastore." }

            $state.Host = $vmHost; $state.Datastore = $ds; $state.PortGroup = $pg
            "host=$($vmHost.Name) datastore=$($ds.Name) free=$([math]::Round($ds.FreeSpaceGB,1))GB portgroup=$($pg.Name) iso=ok"
        }

        CreateVm = {
            param($vm, $ctx)
            $state = $ctx.State[$vm.name]
            $params = @{
                Name = $vm.name; VMHost = $state.Host; Datastore = $state.Datastore; DiskGB = $vm.diskGB
                DiskStorageFormat = 'Thin'; MemoryGB = $vm.memoryGB; NumCpu = $vm.cpu; GuestId = $vm.guestId
                NetworkName = $vm.network; Server = $ctx.Server; ErrorAction = 'Stop'
            }
            if ($vm.description) { $params.Notes = $vm.description }
            if ($vm.folder) { $params.Location = Get-Folder -Name $vm.folder -Type VM -Server $ctx.Server }
            $new = New-VM @params
            $state.Vm = $new

            $spec = New-Object VMware.Vim.VirtualMachineConfigSpec
            $spec.Firmware = $vm.firmware
            $spec.BootOptions = New-Object VMware.Vim.VirtualMachineBootOptions
            if ($vm.firmware -eq 'efi' -and $vm.osFamily -eq 'windows') { $spec.BootOptions.EfiSecureBootEnabled = $true }
            $new.ExtensionData.ReconfigVM($spec)

            $nic = Get-NetworkAdapter -VM $new | Select-Object -First 1
            Set-NetworkAdapter -NetworkAdapter $nic -Type $vm.nicType -MacAddress $vm.macAddress -Confirm:$false -ErrorAction Stop | Out-Null
            if ([double]$vm.secondDiskGB -gt 0) { New-HardDisk -VM $new -CapacityGB $vm.secondDiskGB -Datastore $state.Datastore -StorageFormat Thin -ErrorAction Stop | Out-Null }
            "vm=$($new.Name) firmware=$($vm.firmware) nic=$($vm.nicType) mac=$($vm.macAddress)"
        }

        AttachMedia = {
            param($vm, $ctx)
            $state = $ctx.State[$vm.name]
            $local = $ctx.AnswerMedia[$vm.name]
            $folder = 'multi-install-iso'
            $drive = 'miiup' + ([guid]::NewGuid().ToString('N').Substring(0, 6))
            New-PSDrive -Name $drive -PSProvider VimDatastore -Root '\' -Location $state.Datastore -ErrorAction Stop | Out-Null
            try {
                if (-not (Test-Path "${drive}:\$folder")) { New-Item -ItemType Directory -Path "${drive}:\$folder" | Out-Null }
                Copy-DatastoreItem -Item $local -Destination "${drive}:\$folder\" -Force -ErrorAction Stop
            }
            finally { Remove-PSDrive -Name $drive -ErrorAction SilentlyContinue }
            $answerPath = "[$($state.Datastore.Name)] $folder/$([IO.Path]::GetFileName($local))"
            New-CDDrive -VM $state.Vm -IsoPath $vm.iso -StartConnected:$true -ErrorAction Stop | Out-Null
            New-CDDrive -VM $state.Vm -IsoPath $answerPath -StartConnected:$true -ErrorAction Stop | Out-Null
            $state.AnswerPath = $answerPath
            "install=$($vm.iso) answer=$answerPath"
        }

        Readback = {
            param($vm, $ctx)
            $state = $ctx.State[$vm.name]
            $fresh = Get-VM -Id $state.Vm.Id -Server $ctx.Server -ErrorAction Stop
            $problems = @()
            if ($fresh.NumCpu -ne [int]$vm.cpu) { $problems += "cpu $($fresh.NumCpu)" }
            if ([math]::Abs($fresh.MemoryGB - [double]$vm.memoryGB) -gt 0.01) { $problems += "memory $($fresh.MemoryGB)" }
            if ($fresh.ExtensionData.Config.Firmware -ne $vm.firmware) { $problems += "firmware $($fresh.ExtensionData.Config.Firmware)" }
            $cds = @(Get-CDDrive -VM $fresh)
            foreach ($want in @($vm.iso, $state.AnswerPath)) {
                $cd = $cds | Where-Object IsoPath -eq $want
                if (-not $cd) { $problems += "missing CD $want" }
                elseif (-not $cd.ConnectionState.StartConnected) { $problems += "CD $want not connected at power on" }
            }
            $nic = Get-NetworkAdapter -VM $fresh | Select-Object -First 1
            if ($nic.MacAddress -ne $vm.macAddress.ToLowerInvariant() -and $nic.MacAddress -ne $vm.macAddress) { $problems += "mac $($nic.MacAddress)" }
            if ($problems) { throw "Readback mismatch: $($problems -join '; ')" }
            "cpu=$($fresh.NumCpu) memGB=$($fresh.MemoryGB) firmware=$($fresh.ExtensionData.Config.Firmware) cds=$($cds.Count) mac=$($nic.MacAddress)"
        }

        PowerOn = {
            param($vm, $ctx)
            $state = $ctx.State[$vm.name]
            $on = Start-VM -VM $state.Vm -ErrorAction Stop
            $keys = 0
            if ($vm.firmware -eq 'efi') { $keys = Send-MiiVSphereEnter -VmObject $on }
            "powerState=$($on.PowerState) bootKeyPresses=$keys"
        }

        Disconnect = {
            param($ctx)
            if ($ctx.Server) { Disconnect-VIServer -Server $ctx.Server -Confirm:$false -ErrorAction SilentlyContinue }
        }
    }
}

# --- Hyper-V (local) --------------------------------------------------------

function Send-MiiHyperVEnter {
    param([string]$Name, [int]$Seconds = 30)
    $cs = Get-CimInstance -Namespace root\virtualization\v2 -ClassName Msvm_ComputerSystem -Filter "ElementName='$($Name.Replace("'", "''"))'"
    $kb = Get-CimAssociatedInstance -InputObject $cs -ResultClassName Msvm_Keyboard
    $deadline = (Get-Date).AddSeconds($Seconds)
    $sent = 0
    while ((Get-Date) -lt $deadline) {
        [void](Invoke-CimMethod -InputObject $kb -MethodName TypeKey -Arguments @{ keyCode = [uint32]13 })
        $sent++
        Start-Sleep -Milliseconds 1000
    }
    return $sent
}

function New-MiiHyperVProvider {
    param([hashtable]$Options)

    @{
        Name     = 'hyperv'
        Identity = $env:COMPUTERNAME
        Options  = $Options

        Connect = {
            param($ctx)
            if (-not (Get-Module -ListAvailable -Name Hyper-V)) {
                throw 'The Hyper-V PowerShell module is not available. Enable Hyper-V (Windows Features) and reboot first.'
            }
            Import-Module Hyper-V -ErrorAction Stop
            if (-not (Test-MiiIsElevated)) { throw 'Hyper-V apply must run from an elevated PowerShell.' }
            $root = $ctx.Provider.Options.HyperVPath
            if (-not $root) { $root = (Get-VMHost).VirtualMachinePath }
            $ctx.VmRoot = $root
        }

        Preflight = {
            param($vm, $ctx)
            if (Get-VM -Name $vm.name -ErrorAction SilentlyContinue) { throw "A VM named $($vm.name) already exists." }
            if (-not (Get-VMSwitch -Name $vm.network -ErrorAction SilentlyContinue)) { throw "Virtual switch '$($vm.network)' does not exist. For Hyper-V, 'network' is the switch name." }
            if (-not (Test-Path -LiteralPath $vm.iso -PathType Leaf)) { throw "Install ISO not found: $($vm.iso)" }
            $drive = [IO.Path]::GetPathRoot([IO.Path]::GetFullPath($ctx.VmRoot))
            $free = (New-Object IO.DriveInfo $drive).AvailableFreeSpace / 1GB
            $need = [double]$vm.diskGB + [double]$vm.secondDiskGB
            if ($free -lt 10) { throw "Only $([math]::Round($free,1)) GB free on $drive." }
            "switch=$($vm.network) iso=ok root=$($ctx.VmRoot) free=$([math]::Round($free,1))GB dynamicDisksUpTo=${need}GB"
        }

        CreateVm = {
            param($vm, $ctx)
            $gen = if ($vm.firmware -eq 'bios') { 1 } else { 2 }
            $vmDir = Join-Path $ctx.VmRoot $vm.name
            $vhd = Join-Path $vmDir "$($vm.name).vhdx"
            New-VM -Name $vm.name -Generation $gen -MemoryStartupBytes ([int64]([double]$vm.memoryGB * 1GB)) -Path $ctx.VmRoot `
                -NewVHDPath $vhd -NewVHDSizeBytes ([int64]([double]$vm.diskGB * 1GB)) -SwitchName $vm.network -ErrorAction Stop | Out-Null
            Set-VMProcessor -VMName $vm.name -Count $vm.cpu -ErrorAction Stop
            Set-VMMemory -VMName $vm.name -DynamicMemoryEnabled $false -ErrorAction Stop
            Set-VMNetworkAdapter -VMName $vm.name -StaticMacAddress ($vm.macAddress.Replace(':', '')) -ErrorAction Stop
            if ($gen -eq 2) {
                $template = if ($vm.osFamily -eq 'windows') { 'MicrosoftWindows' } else { 'MicrosoftUEFICertificateAuthority' }
                Set-VMFirmware -VMName $vm.name -EnableSecureBoot On -SecureBootTemplate $template -ErrorAction Stop
            }
            if ([double]$vm.secondDiskGB -gt 0) {
                $d2 = Join-Path $vmDir "$($vm.name)-data.vhdx"
                New-VHD -Path $d2 -SizeBytes ([int64]([double]$vm.secondDiskGB * 1GB)) -Dynamic -ErrorAction Stop | Out-Null
                Add-VMHardDiskDrive -VMName $vm.name -Path $d2 -ErrorAction Stop
            }
            "generation=$gen vhd=$vhd mac=$($vm.macAddress)"
        }

        AttachMedia = {
            param($vm, $ctx)
            $answer = $ctx.AnswerMedia[$vm.name]
            $vmObj = Get-VM -Name $vm.name
            if ($vmObj.Generation -eq 2) {
                $installDvd = Add-VMDvdDrive -VMName $vm.name -Path $vm.iso -Passthru -ErrorAction Stop
                Add-VMDvdDrive -VMName $vm.name -Path $answer -ErrorAction Stop
                Set-VMFirmware -VMName $vm.name -FirstBootDevice $installDvd -ErrorAction Stop
            }
            else {
                Set-VMDvdDrive -VMName $vm.name -ControllerNumber 1 -ControllerLocation 0 -Path $vm.iso -ErrorAction Stop
                Add-VMDvdDrive -VMName $vm.name -ControllerNumber 1 -ControllerLocation 1 -Path $answer -ErrorAction Stop
            }
            "install=$($vm.iso) answer=$answer"
        }

        Readback = {
            param($vm, $ctx)
            $vmObj = Get-VM -Name $vm.name -ErrorAction Stop
            $problems = @()
            if ($vmObj.ProcessorCount -ne [int]$vm.cpu) { $problems += "cpu $($vmObj.ProcessorCount)" }
            if ($vmObj.MemoryStartup -ne [int64]([double]$vm.memoryGB * 1GB)) { $problems += "memory $($vmObj.MemoryStartup)" }
            $paths = @(Get-VMDvdDrive -VMName $vm.name | ForEach-Object Path)
            foreach ($want in @($vm.iso, $ctx.AnswerMedia[$vm.name])) { if ($want -notin $paths) { $problems += "missing DVD $want" } }
            $mac = (Get-VMNetworkAdapter -VMName $vm.name | Select-Object -First 1).MacAddress
            if ($mac -ne $vm.macAddress.Replace(':', '')) { $problems += "mac $mac" }
            if ($problems) { throw "Readback mismatch: $($problems -join '; ')" }
            "cpu=$($vmObj.ProcessorCount) memory=$($vmObj.MemoryStartup) dvds=$($paths.Count) mac=$mac"
        }

        PowerOn = {
            param($vm, $ctx)
            Start-VM -Name $vm.name -ErrorAction Stop
            $keys = 0
            if ((Get-VM -Name $vm.name).Generation -eq 2) { $keys = Send-MiiHyperVEnter -Name $vm.name }
            "state=$((Get-VM -Name $vm.name).State) bootKeyPresses=$keys"
        }

        Disconnect = { param($ctx) }
    }
}

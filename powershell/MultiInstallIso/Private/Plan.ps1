# Plan creation. A plan is a JSON file written once; its SHA-256 is the plan hash that
# media builds and apply runs must quote back before they act.

function Get-MiiModuleVersion {
    $manifest = Join-Path $PSScriptRoot '..\MultiInstallIso.psd1'
    return (Import-PowerShellDataFile -LiteralPath $manifest).ModuleVersion
}

function Get-MiiDefaultInterfaceAlias {
    param([string]$Target)
    switch ($Target) {
        'hyperv' { 'Ethernet' }
        default { 'Ethernet0' }   # vmxnet3 on vSphere
    }
}

function New-MiiMacAddress {
    # Deterministic static MAC so the answer file can name the adapter before the VM exists.
    # vSphere only accepts manual MACs in 00:50:56:00:00:00-00:50:56:3F:FF:FF.
    param([string]$Name, [string]$Target)
    $bytes = [Security.Cryptography.SHA256]::HashData([Text.Encoding]::UTF8.GetBytes($Name.ToLowerInvariant()))
    if ($Target -eq 'hyperv') { $prefix = @(0x00, 0x15, 0x5D); $tail = @($bytes[0], $bytes[1], $bytes[2]) }
    else { $prefix = @(0x00, 0x50, 0x56); $tail = @(($bytes[0] -band 0x3F), $bytes[1], $bytes[2]) }
    return (($prefix + $tail) | ForEach-Object { '{0:X2}' -f $_ }) -join ':'
}

function New-MiiVmPlanEntry {
    param([object]$Vm, [string]$Target)

    $answer = switch ($Vm.OsFamily) {
        'windows' { 'autounattend.xml' }
        'linux' { 'ks.cfg' }
        default { $null }
    }
    $alias = if ($Vm.InterfaceAlias) { $Vm.InterfaceAlias } else { Get-MiiDefaultInterfaceAlias $Target }

    $actions = New-Object System.Collections.Generic.List[string]
    $actions.Add('Preflight: confirm target objects exist and the VM name is free')
    if ($answer) { $actions.Add("Build answer media ($answer) and record its SHA-256") }
    $actions.Add("Create empty VM ($($Vm.Firmware.ToUpperInvariant()) firmware, $($Vm.Cpu) vCPU, $($Vm.MemoryGB) GB RAM, $($Vm.DiskGB) GB disk)")
    if ($Vm.SecondDiskGB -gt 0) { $actions.Add("Add $($Vm.SecondDiskGB) GB second disk") }
    $actions.Add('Attach install ISO and answer media')
    $actions.Add('Read back VM configuration and media attachment')
    $actions.Add('Power on and confirm the boot prompt')
    if ($Vm.OsFamily -eq 'windows' -and ($Vm.Roles.Count -gt 0 -or $Vm.CodeRepo -or $Vm.PostInstall.Count -gt 0)) {
        $actions.Add('First logon: run PostDeploy.ps1 from the answer media')
    }

    [ordered]@{
        name           = $Vm.Name
        description    = $Vm.Description
        osFamily       = $Vm.OsFamily
        guestId        = $Vm.GuestId
        firmware       = $Vm.Firmware
        cpu            = $Vm.Cpu
        memoryGB       = $Vm.MemoryGB
        diskGB         = $Vm.DiskGB
        secondDiskGB   = $Vm.SecondDiskGB
        datastore      = $Vm.Datastore
        network        = $Vm.Network
        vmHost         = $Vm.VmHost
        folder         = $Vm.Folder
        iso            = $Vm.Iso
        imageName      = $Vm.ImageName
        imageIndex     = $Vm.ImageIndex
        ip             = $Vm.Ip
        prefixLength   = $Vm.PrefixLength
        gateway        = $Vm.Gateway
        dns            = @($Vm.Dns)
        interfaceAlias = $alias
        macAddress     = $(if ($Vm.MacAddress) { $Vm.MacAddress.ToUpperInvariant().Replace('-', ':') } elseif ($Vm.Name) { New-MiiMacAddress $Vm.Name $Target } else { $null })
        nicType        = $Vm.NicType
        domain         = $Vm.Domain
        timeZone       = $(if ($Vm.TimeZone) { $Vm.TimeZone } else { 'UTC' })
        locale         = $(if ($Vm.Locale) { $Vm.Locale } else { 'en-US' })
        roles          = @($Vm.Roles)
        codeRepo       = $Vm.CodeRepo
        appPoolName    = $Vm.AppPoolName
        siteName       = $Vm.SiteName
        postInstall    = @($Vm.PostInstall)
        answerFile     = $answer
        issues         = @($Vm.Issues)
        warnings       = @($Vm.Warnings)
        actions        = @($actions)
    }
}

function New-MiiPlan {
    <#
    .SYNOPSIS
        Validates a definition and writes an immutable plan under ArtifactRoot\<timestamp>.
    .OUTPUTS
        An object with RunDirectory, PlanPath, PlanHash, Plan, and Blocking.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$DefinitionPath,
        [Parameter(Mandatory)][string]$ArtifactRoot,
        [ValidateSet('vsphere', 'hyperv')][string]$Target = 'vsphere',
        [string]$VcenterServer,
        [string]$VcenterCluster
    )

    $definition = Read-MiiDefinition -Path $DefinitionPath
    $vms = @()
    $i = 0
    foreach ($entry in $definition.Vms) { $vms += ConvertTo-MiiVm -Entry $entry -Index $i; $i++ }
    Test-MiiVmSet -Vms $vms
    foreach ($vm in $vms) {
        if (-not $vm.Iso) { continue }
        $isDatastorePath = $vm.Iso -match '^\['
        if ($Target -eq 'vsphere' -and -not $isDatastorePath) {
            $vm.Warnings.Add("vSphere CD drives need a datastore path like '[datastore1] iso/file.iso'. Upload '$($vm.Iso)' to a datastore and use that path.")
        }
        if ($Target -eq 'hyperv' -and $isDatastorePath) {
            $vm.Issues.Add("Hyper-V needs a local ISO path, not the datastore path '$($vm.Iso)'.")
        }
    }

    $definitionIssues = @()
    if ($vms.Count -eq 0) { $definitionIssues += 'The definition contains no VMs.' }

    $entries = @($vms | ForEach-Object { New-MiiVmPlanEntry -Vm $_ -Target $Target })
    foreach ($group in ($entries | Where-Object { $_.macAddress } | Group-Object { $_.macAddress } | Where-Object Count -gt 1)) {
        foreach ($e in $group.Group) { $e.issues = @($e.issues) + "MAC address $($e.macAddress) collides with another VM. Set macAddress explicitly." }
    }
    $blocking = ($definitionIssues.Count + @($entries | ForEach-Object { $_.issues } | Where-Object { $_ }).Count)
    $warningCount = @($entries | ForEach-Object { $_.warnings } | Where-Object { $_ }).Count

    $plan = [ordered]@{
        schema      = 'multi-install-iso.plan.v1'
        tool        = [ordered]@{ name = 'MultiInstallIso'; version = Get-MiiModuleVersion }
        generatedAt = (Get-Date).ToUniversalTime().ToString('o')
        generatedBy = "$env:USERDOMAIN\$env:USERNAME"
        definition  = [ordered]@{ path = $definition.Path; format = $definition.Format; sha256 = $definition.Sha256 }
        target      = [ordered]@{ kind = $Target; vcenterServer = $VcenterServer; vcenterCluster = $VcenterCluster }
        summary     = [ordered]@{ vmCount = $entries.Count; blockingIssues = $blocking; warnings = $warningCount; ready = ($blocking -eq 0) }
        issues      = @($definitionIssues)
        vms         = $entries
    }

    $root = [IO.Path]::GetFullPath($ArtifactRoot)
    $stamp = (Get-Date).ToString('yyyyMMdd-HHmmss-fff')
    $runDirectory = Join-Path $root $stamp
    New-Item -ItemType Directory -Path $runDirectory -Force | Out-Null

    $planPath = Join-Path $runDirectory 'build-plan.json'
    $json = $plan | ConvertTo-Json -Depth 20
    [IO.File]::WriteAllText($planPath, $json, [Text.UTF8Encoding]::new($false))
    $hash = (Get-FileHash -LiteralPath $planPath -Algorithm SHA256).Hash.ToLowerInvariant()
    [IO.File]::WriteAllText((Join-Path $runDirectory 'build-plan.sha256'), "$hash  build-plan.json`n", [Text.UTF8Encoding]::new($false))
    (Get-Item -LiteralPath $planPath).IsReadOnly = $true

    [pscustomobject]@{
        RunDirectory = $runDirectory
        PlanPath     = $planPath
        PlanHash     = $hash
        Plan         = $plan
        Blocking     = $blocking
        Warnings     = $warningCount
    }
}

function Read-MiiPlan {
    <#
    .SYNOPSIS
        Loads a plan and recomputes its hash. Throws when ExpectedHash is given and differs.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$PlanPath, [string]$ExpectedHash)

    if (-not (Test-Path -LiteralPath $PlanPath -PathType Leaf)) { throw "Plan not found: $PlanPath" }
    $full = (Resolve-Path -LiteralPath $PlanPath).ProviderPath
    $hash = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash.ToLowerInvariant()

    $sidecar = Join-Path (Split-Path -Parent $full) 'build-plan.sha256'
    if (Test-Path -LiteralPath $sidecar) {
        $recorded = ((Get-Content -LiteralPath $sidecar -Raw).Trim() -split '\s+')[0].ToLowerInvariant()
        if ($recorded -ne $hash) { throw "Plan file changed after it was written (recorded $recorded, now $hash)." }
    }
    if ($ExpectedHash -and $ExpectedHash.Trim().ToLowerInvariant() -ne $hash) {
        throw "Plan hash mismatch. Expected $($ExpectedHash.Trim().ToLowerInvariant()), file is $hash. Review the plan and quote its current hash."
    }

    $plan = Get-Content -LiteralPath $full -Raw | ConvertFrom-Json -Depth 20
    if ($plan.schema -ne 'multi-install-iso.plan.v1') { throw "Unsupported plan schema '$($plan.schema)'." }
    [pscustomobject]@{
        PlanPath     = $full
        RunDirectory = Split-Path -Parent $full
        PlanHash     = $hash
        Plan         = $plan
    }
}

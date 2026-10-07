# Definition reading, normalization, and validation.

# vSphere guest IDs this project knows about. Unknown IDs are warnings, not blockers,
# because vSphere adds new ones with each release.
$script:MiiGuestIds = [ordered]@{
    'windows7Server64Guest'      = @{ Family = 'windows'; Label = 'Windows Server 2008 R2' }
    'windows8Server64Guest'      = @{ Family = 'windows'; Label = 'Windows Server 2012 / 2012 R2' }
    'windows9Server64Guest'      = @{ Family = 'windows'; Label = 'Windows Server 2016' }
    'windows2019srv_64Guest'     = @{ Family = 'windows'; Label = 'Windows Server 2019' }
    'windows2019srvNext_64Guest' = @{ Family = 'windows'; Label = 'Windows Server 2022' }
    'windows2022srvNext_64Guest' = @{ Family = 'windows'; Label = 'Windows Server 2025' }
    'windows9_64Guest'           = @{ Family = 'windows'; Label = 'Windows 10' }
    'windows11_64Guest'          = @{ Family = 'windows'; Label = 'Windows 11' }
    'rhel8_64Guest'              = @{ Family = 'linux'; Label = 'RHEL 8' }
    'rhel9_64Guest'              = @{ Family = 'linux'; Label = 'RHEL 9' }
    'centos8_64Guest'            = @{ Family = 'linux'; Label = 'CentOS 8' }
    'centos9_64Guest'            = @{ Family = 'linux'; Label = 'CentOS Stream 9' }
    'rockylinux_64Guest'         = @{ Family = 'linux'; Label = 'Rocky Linux' }
    'almalinux_64Guest'          = @{ Family = 'linux'; Label = 'AlmaLinux' }
    'ubuntu64Guest'              = @{ Family = 'linux'; Label = 'Ubuntu' }
    'debian11_64Guest'           = @{ Family = 'linux'; Label = 'Debian 11' }
    'debian12_64Guest'           = @{ Family = 'linux'; Label = 'Debian 12' }
    'other5xLinux64Guest'        = @{ Family = 'linux'; Label = 'Other Linux 5.x' }
    'otherLinux64Guest'          = @{ Family = 'linux'; Label = 'Other Linux' }
}

# Guest IDs that look plausible but vSphere rejects, with the ID that was meant.
$script:MiiGuestIdFixes = @{
    'windows2019Server64Guest' = 'windows2019srv_64Guest (Server 2019) or windows2019srvNext_64Guest (Server 2022)'
    'windows2022Server64Guest' = 'windows2019srvNext_64Guest (Server 2022)'
    'windows2016Server64Guest' = 'windows9Server64Guest (Server 2016)'
    'windows10_64Guest'        = 'windows9_64Guest (Windows 10)'
}

function Get-MiiKnownGuestId {
    [CmdletBinding()]
    param()
    foreach ($id in $script:MiiGuestIds.Keys) {
        [pscustomobject]@{ GuestId = $id; Family = $script:MiiGuestIds[$id].Family; Label = $script:MiiGuestIds[$id].Label }
    }
}

function Get-MiiMember {
    param([object]$Object, [string[]]$Names)

    foreach ($name in $Names) {
        if ($null -eq $Object) { return $null }
        if ($Object -is [System.Collections.IDictionary]) {
            foreach ($k in $Object.Keys) {
                if ([string]::Equals([string]$k, $name, [StringComparison]::OrdinalIgnoreCase)) {
                    $value = $Object[$k]
                    if ($null -ne $value -and -not ($value -is [string] -and $value.Length -eq 0)) { return , $value }
                }
            }
            continue
        }
        $property = $Object.PSObject.Properties[$name]
        if ($property -and $null -ne $property.Value -and -not ($property.Value -is [string] -and $property.Value.Length -eq 0)) {
            return , $property.Value
        }
    }
    return $null
}

function ConvertTo-MiiStringList {
    param([object]$Value)

    if ($null -eq $Value) { return , @() }
    if ($Value -is [string]) {
        return , @($Value -split '[,;]' | ForEach-Object { $_.Trim() } | Where-Object { $_ })
    }
    return , @($Value | ForEach-Object { "$_".Trim() } | Where-Object { $_ })
}

function Read-MiiDefinition {
    <#
    .SYNOPSIS
        Reads a YAML, JSON, or CSV definition and returns its raw VM entries.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Path)

    if (-not (Test-Path -LiteralPath $Path -PathType Leaf)) {
        throw "Definition file not found: $Path"
    }

    $full = (Resolve-Path -LiteralPath $Path).ProviderPath
    $extension = [IO.Path]::GetExtension($full).ToLowerInvariant()
    $text = [IO.File]::ReadAllText($full)
    $format = $null
    $vms = $null

    switch ($extension) {
        '.json' {
            $format = 'json'
            try { $doc = $text | ConvertFrom-Json -AsHashtable -ErrorAction Stop }
            catch { throw "JSON is not valid: $($_.Exception.Message)" }
            if ($doc -is [System.Collections.IDictionary] -and $doc.Contains('vms')) { $vms = $doc['vms'] }
            elseif ($doc -is [System.Collections.IDictionary] -and ($doc.Contains('vmname') -or $doc.Contains('name'))) { $vms = @($doc) }
            elseif ($doc -is [array]) { $vms = $doc }
            else { throw "JSON definition must contain a top-level 'vms' array." }
        }
        '.csv' {
            $format = 'csv'
            $rows = @(Import-Csv -LiteralPath $full)
            $vms = foreach ($row in $rows) {
                $h = [ordered]@{}
                foreach ($p in $row.PSObject.Properties) { $h[$p.Name] = $p.Value }
                $h
            }
        }
        { $_ -in '.yml', '.yaml' } {
            $format = 'yaml'
            $doc = ConvertFrom-MiiYaml -Yaml $text
            if (-not ($doc -is [System.Collections.IDictionary]) -or -not $doc.Contains('vms')) {
                throw "YAML definition must include a top-level 'vms:' list."
            }
            $vms = $doc['vms']
        }
        default { throw "Unsupported definition type '$extension'. Use .yaml, .yml, .json, or .csv." }
    }

    if ($null -eq $vms) { $vms = @() }
    [pscustomobject]@{
        Path   = $full
        Format = $format
        Sha256 = (Get-FileHash -LiteralPath $full -Algorithm SHA256).Hash.ToLowerInvariant()
        Vms    = @($vms)
    }
}

function ConvertTo-MiiNumber {
    param([object]$Value, [string]$Field, [System.Collections.Generic.List[string]]$Issues)

    if ($null -eq $Value -or "$Value".Trim().Length -eq 0) { return $null }
    if ($Value -is [int] -or $Value -is [long] -or $Value -is [double] -or $Value -is [decimal]) { return [double]$Value }
    $parsed = 0.0
    if ([double]::TryParse("$Value".Trim(), [Globalization.NumberStyles]::Float, [Globalization.CultureInfo]::InvariantCulture, [ref]$parsed)) {
        return $parsed
    }
    $Issues.Add("$Field '$Value' is not a number.")
    return $null
}

function Test-MiiIPv4 {
    param([string]$Value)
    if ([string]::IsNullOrWhiteSpace($Value)) { return $false }
    if ($Value -notmatch '^\d{1,3}(\.\d{1,3}){3}$') { return $false }
    foreach ($octet in $Value.Split('.')) { if ([int]$octet -gt 255) { return $false } }
    return $true
}

function ConvertTo-MiiPrefixLength {
    param([string]$Mask)

    if ($Mask -match '^/?(\d{1,2})$') {
        $n = [int]$Matches[1]
        if ($n -ge 1 -and $n -le 32) { return $n }
        return $null
    }
    if (-not (Test-MiiIPv4 $Mask)) { return $null }
    $bits = ($Mask.Split('.') | ForEach-Object { [Convert]::ToString([int]$_, 2).PadLeft(8, '0') }) -join ''
    if ($bits -notmatch '^1+0*$') { return $null }
    return $bits.IndexOf('0') -lt 0 ? 32 : $bits.IndexOf('0')
}

function ConvertTo-MiiVm {
    <#
    .SYNOPSIS
        Normalizes one raw VM entry and returns it with blocking issues and warnings.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][object]$Entry, [int]$Index = 0)

    $issues = New-Object System.Collections.Generic.List[string]
    $warnings = New-Object System.Collections.Generic.List[string]

    $name = [string](Get-MiiMember $Entry @('vmname', 'name'))
    $guestId = [string](Get-MiiMember $Entry @('os', 'guestId', 'guest_id', 'GuestIDOS'))

    $cpu = ConvertTo-MiiNumber (Get-MiiMember $Entry @('cpu', 'num_cpus', 'NumCPU')) 'cpu' $issues
    $memoryGb = ConvertTo-MiiNumber (Get-MiiMember $Entry @('ramGB', 'OSRamSize')) 'ramGB' $issues
    if ($null -eq $memoryGb) {
        # Terraform-style "memory" is megabytes.
        $memoryMb = ConvertTo-MiiNumber (Get-MiiMember $Entry @('memoryMB', 'memory')) 'memory' $issues
        if ($null -ne $memoryMb) { $memoryGb = [math]::Round($memoryMb / 1024, 2) }
    }
    $diskGb = ConvertTo-MiiNumber (Get-MiiMember $Entry @('diskGB', 'disk_size', 'OSDiskSize')) 'diskGB' $issues
    $secondDiskGb = ConvertTo-MiiNumber (Get-MiiMember $Entry @('secondDiskGB', 'SecondDiskSize')) 'secondDiskGB' $issues

    $family = [string](Get-MiiMember $Entry @('osFamily'))
    if (-not $family) {
        if ($script:MiiGuestIds.Contains($guestId)) { $family = $script:MiiGuestIds[$guestId].Family }
        elseif ($guestId -match '^win') { $family = 'windows' }
        elseif ($guestId -match 'linux|rhel|centos|rocky|alma|ubuntu|debian') { $family = 'linux' }
        else { $family = 'unknown' }
    }
    $family = $family.ToLowerInvariant()

    $firmware = ([string](Get-MiiMember $Entry @('firmware'))).ToLowerInvariant()
    if (-not $firmware) { $firmware = 'efi' }

    $vm = [pscustomobject][ordered]@{
        Index          = $Index
        Name           = $name
        Description    = [string](Get-MiiMember $Entry @('description', 'note'))
        OsFamily       = $family
        GuestId        = $guestId
        Firmware       = $firmware
        Cpu            = $cpu
        MemoryGB       = $memoryGb
        DiskGB         = $diskGb
        SecondDiskGB   = $(if ($null -ne $secondDiskGb) { $secondDiskGb } else { 0 })
        Datastore      = [string](Get-MiiMember $Entry @('datastore'))
        Network        = [string](Get-MiiMember $Entry @('network', 'NetworkName', 'vlan'))
        Iso            = [string](Get-MiiMember $Entry @('iso', 'iso_path', 'ISO'))
        ImageName      = [string](Get-MiiMember $Entry @('imageName', 'edition'))
        ImageIndex     = Get-MiiMember $Entry @('imageIndex')
        VmHost         = [string](Get-MiiMember $Entry @('vmhost'))
        Folder         = [string](Get-MiiMember $Entry @('folder'))
        Ip             = [string](Get-MiiMember $Entry @('ip'))
        Subnet         = [string](Get-MiiMember $Entry @('subnet', 'netmask'))
        PrefixLength   = $null
        Gateway        = [string](Get-MiiMember $Entry @('gateway'))
        Dns            = ConvertTo-MiiStringList (Get-MiiMember $Entry @('dns', 'primary'))
        InterfaceAlias = [string](Get-MiiMember $Entry @('interfaceAlias'))
        MacAddress     = [string](Get-MiiMember $Entry @('macAddress'))
        NicType        = $(([string](Get-MiiMember $Entry @('nicType', 'NetType'))).ToLowerInvariant())
        Domain         = [string](Get-MiiMember $Entry @('domain'))
        TimeZone       = [string](Get-MiiMember $Entry @('timeZone', 'timezone'))
        Locale         = [string](Get-MiiMember $Entry @('locale'))
        Roles          = ConvertTo-MiiStringList (Get-MiiMember $Entry @('roles'))
        CodeRepo       = [string](Get-MiiMember $Entry @('codeRepo'))
        AppPoolName    = [string](Get-MiiMember $Entry @('appPoolName'))
        SiteName       = [string](Get-MiiMember $Entry @('siteName'))
        PostInstall    = ConvertTo-MiiStringList (Get-MiiMember $Entry @('postInstall'))
        Issues         = $issues
        Warnings       = $warnings
    }

    # Required fields.
    if ([string]::IsNullOrWhiteSpace($vm.Name)) { $issues.Add('Missing vmname.') }
    if ([string]::IsNullOrWhiteSpace($vm.GuestId)) { $issues.Add('Missing os (vSphere guest ID).') }
    if ([string]::IsNullOrWhiteSpace($vm.Datastore)) { $issues.Add('Missing datastore.') }
    if ([string]::IsNullOrWhiteSpace($vm.Network)) { $issues.Add('Missing network.') }

    # Sizing.
    if ($null -eq $vm.Cpu) { if (-not ($issues -match '^cpu ')) { $issues.Add('Missing cpu.') } }
    elseif ($vm.Cpu -lt 1 -or $vm.Cpu -ne [math]::Floor($vm.Cpu)) { $issues.Add("cpu must be a whole number of 1 or more (got $($vm.Cpu)).") }
    elseif ($vm.Cpu -gt 128) { $issues.Add("cpu $($vm.Cpu) is above the 128 vCPU sanity limit.") }
    if ($null -eq $vm.MemoryGB) { if (-not ($issues -match '^(ramGB|memory) ')) { $issues.Add('Missing ramGB.') } }
    elseif ($vm.MemoryGB -le 0) { $issues.Add("ramGB must be greater than zero (got $($vm.MemoryGB)).") }
    elseif ($vm.MemoryGB -gt 4096) { $issues.Add("ramGB $($vm.MemoryGB) is above the 4096 GB sanity limit.") }
    if ($null -eq $vm.DiskGB) { if (-not ($issues -match '^diskGB ')) { $issues.Add('Missing diskGB.') } }
    elseif ($vm.DiskGB -le 0) { $issues.Add("diskGB must be greater than zero (got $($vm.DiskGB)).") }
    elseif ($vm.OsFamily -eq 'windows' -and $vm.DiskGB -lt 32) { $issues.Add("diskGB $($vm.DiskGB) is below the 32 GB Windows Server minimum.") }
    if ($vm.SecondDiskGB -lt 0) { $issues.Add('secondDiskGB cannot be negative.') }
    if ($null -ne $vm.Cpu) { $vm.Cpu = [int]$vm.Cpu }

    # Guest ID.
    if ($vm.GuestId) {
        if ($script:MiiGuestIdFixes.ContainsKey($vm.GuestId)) {
            $issues.Add("Guest ID '$($vm.GuestId)' is not a vSphere guest ID. Use $($script:MiiGuestIdFixes[$vm.GuestId]).")
        }
        elseif (-not $script:MiiGuestIds.Contains($vm.GuestId)) {
            $warnings.Add("Guest ID '$($vm.GuestId)' is not in the known list; vCenter preflight must confirm it.")
        }
    }
    if ($vm.OsFamily -notin 'windows', 'linux') { $issues.Add("Cannot tell whether '$($vm.GuestId)' is Windows or Linux. Set osFamily.") }
    if ($vm.Firmware -notin 'efi', 'bios') { $issues.Add("firmware must be 'efi' or 'bios' (got '$($vm.Firmware)').") }

    # Names.
    if ($vm.Name) {
        if ($vm.Name -notmatch '^[A-Za-z0-9][A-Za-z0-9-]*$') {
            $issues.Add("vmname '$($vm.Name)' may contain only letters, digits, and hyphens, and must start with a letter or digit.")
        }
        elseif ($vm.OsFamily -eq 'windows' -and $vm.Name.Length -gt 15) {
            $issues.Add("vmname '$($vm.Name)' is longer than the 15-character Windows computer name limit.")
        }
        elseif ($vm.Name -match '^\d+$') { $issues.Add("vmname '$($vm.Name)' cannot be all digits.") }
    }

    # Install media.
    if ([string]::IsNullOrWhiteSpace($vm.Iso)) { $issues.Add('Missing iso. Install media is never downloaded implicitly; set the ISO path.') }
    if ($vm.OsFamily -eq 'windows' -and -not $vm.ImageName -and $null -eq $vm.ImageIndex) {
        $warnings.Add('No imageName or imageIndex; Windows Setup will stop at the edition picker on multi-edition media.')
    }
    if ($null -ne $vm.ImageIndex) {
        $idx = 0
        if (-not [int]::TryParse("$($vm.ImageIndex)", [ref]$idx) -or $idx -lt 1) { $issues.Add("imageIndex '$($vm.ImageIndex)' must be a whole number of 1 or more.") }
        else { $vm.ImageIndex = $idx }
    }

    # Network.
    if ($vm.Ip) {
        if (-not (Test-MiiIPv4 $vm.Ip)) { $issues.Add("ip '$($vm.Ip)' is not a valid IPv4 address.") }
        if (-not $vm.Subnet) { $issues.Add('ip is set but subnet is missing.') }
        else {
            $vm.PrefixLength = ConvertTo-MiiPrefixLength $vm.Subnet
            if ($null -eq $vm.PrefixLength) { $issues.Add("subnet '$($vm.Subnet)' is not a valid mask or prefix length.") }
        }
        if (-not $vm.Gateway) { $warnings.Add('ip is set without a gateway.') }
        if ($vm.Dns.Count -eq 0) { $warnings.Add('ip is set without dns servers.') }
    }
    elseif ($vm.Subnet -or $vm.Gateway) { $issues.Add('subnet or gateway is set without ip.') }
    if ($vm.MacAddress -and $vm.MacAddress -notmatch '^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$') { $issues.Add("macAddress '$($vm.MacAddress)' is not a valid MAC address.") }
    if (-not $vm.NicType) { $vm.NicType = 'e1000e' }
    if ($vm.NicType -notin 'e1000e', 'vmxnet3') { $issues.Add("nicType must be 'e1000e' or 'vmxnet3' (got '$($vm.NicType)').") }
    elseif ($vm.NicType -eq 'vmxnet3' -and $vm.OsFamily -eq 'windows' -and ($vm.Ip -or $vm.Domain)) {
        $warnings.Add('Windows has no inbox vmxnet3 driver, so static IP and domain join during setup will not apply. Use e1000e for the install.')
    }
    if ($vm.Gateway -and -not (Test-MiiIPv4 $vm.Gateway)) { $issues.Add("gateway '$($vm.Gateway)' is not a valid IPv4 address.") }
    foreach ($d in $vm.Dns) { if (-not (Test-MiiIPv4 $d)) { $issues.Add("dns '$d' is not a valid IPv4 address.") } }

    if ($vm.Domain -and $vm.OsFamily -ne 'windows') { $warnings.Add('domain is only applied to Windows guests.') }
    if ($vm.Domain -and -not $vm.Ip) { $warnings.Add('domain join with DHCP depends on DHCP handing out working DNS.') }
    if ($vm.CodeRepo -and $vm.CodeRepo -notmatch '^https://') { $issues.Add("codeRepo '$($vm.CodeRepo)' must be an https:// URL.") }

    foreach ($role in $vm.Roles) {
        if ($role -notin 'IIS', 'API') { $warnings.Add("Role '$role' is not handled by PostDeploy.ps1 (supported: IIS, API).") }
    }

    # Fields that must never live in a definition.
    foreach ($secretField in 'password', 'adminPassword', 'domainJoinPass', 'Cred_Pass', 'pat', 'productKey', 'rootPassword') {
        if ($null -ne (Get-MiiMember $Entry @($secretField))) {
            $issues.Add("Definition field '$secretField' holds a secret. Remove it; secrets are supplied at media build time.")
        }
    }

    return $vm
}

function Test-MiiVmSet {
    <#
    .SYNOPSIS
        Adds cross-VM issues (duplicate names and IP addresses) to normalized VMs.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][AllowEmptyCollection()][object[]]$Vms)

    $byName = $Vms | Where-Object { $_.Name } | Group-Object { $_.Name.ToLowerInvariant() } | Where-Object Count -gt 1
    foreach ($group in $byName) {
        foreach ($vm in $group.Group) { $vm.Issues.Add("Duplicate vmname '$($vm.Name)' appears $($group.Count) times.") }
    }
    $byIp = $Vms | Where-Object { $_.Ip } | Group-Object Ip | Where-Object Count -gt 1
    foreach ($group in $byIp) {
        foreach ($vm in $group.Group) { $vm.Issues.Add("Duplicate ip $($vm.Ip) is shared with: $((($group.Group | Where-Object { $_ -ne $vm }).Name) -join ', ').") }
    }
}

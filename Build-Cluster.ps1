<#
.SYNOPSIS
    Orchestrates a fresh VM build plan from a YAML, JSON, or CSV definition.
.DESCRIPTION
    This is the modern entry point for Multi_Install_ISO. It validates VM input,
    writes a timestamped build plan, can generate unattended install artifacts,
    and can optionally provision vSphere VMs through VMware PowerCLI.

    Use -PlanOnly first. Use -WhatIf to preview PowerShell ShouldProcess actions.
.EXAMPLE
    .\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -PlanOnly
.EXAMPLE
    .\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -VcenterServer vcsa.lab.local -VcenterCluster Lab -WhatIf
#>

[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'High')]
param(
    [string]$DefinitionPath = 'cluster-vms.yaml',
    [string]$VcenterServer,
    [pscredential]$VcenterCredential,
    [string]$VcenterCluster,
    [string]$ArtifactRoot = 'artifacts',
    [string]$IsoCachePath = 'artifacts\isos',
    [securestring]$LocalAdminPassword,
    [pscredential]$DomainJoinCredential,
    [string]$AzureDevOpsPat = $env:AZURE_DEVOPS_PAT,
    [switch]$PlanOnly,
    [switch]$InstallMissingModules,
    [switch]$SkipIsoDownload,
    [switch]$SkipUnattend,
    [switch]$SkipVCenter,
    [switch]$NoPowerOn
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

function Write-Step {
    param(
        [string]$Message,
        [ConsoleColor]$Color = [ConsoleColor]::Cyan
    )

    Write-Host "==> $Message" -ForegroundColor $Color
}

function Resolve-FullPath {
    param([string]$Path)

    if ([System.IO.Path]::IsPathRooted($Path)) {
        return $Path
    }

    return (Join-Path $PSScriptRoot $Path)
}

function Ensure-Module {
    param(
        [Parameter(Mandatory)]
        [string]$Name,
        [switch]$Required
    )

    if (Get-Module -ListAvailable -Name $Name) {
        Import-Module $Name -Force
        return $true
    }

    if ($InstallMissingModules) {
        if ($PSCmdlet.ShouldProcess($Name, 'Install PowerShell module')) {
            Install-Module -Name $Name -Scope CurrentUser -Force
        }
        if (Get-Module -ListAvailable -Name $Name) {
            Import-Module $Name -Force
            return $true
        }
    }

    if ($Required) {
        throw "Required PowerShell module '$Name' is not installed. Run: Install-Module $Name -Scope CurrentUser -Force"
    }

    Write-Warning "Optional PowerShell module '$Name' is not installed."
    return $false
}

function Convert-SecureStringToPlainText {
    param([securestring]$Value)

    if (-not $Value) {
        return $null
    }

    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Value)
    try {
        return [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr)
    }
    finally {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr)
    }
}

function Get-PropertyValue {
    param(
        [Parameter(Mandatory)]
        [object]$Object,
        [Parameter(Mandatory)]
        [string[]]$Names,
        [object]$Default = $null
    )

    foreach ($name in $Names) {
        $property = $Object.PSObject.Properties[$name]
        if ($property -and $null -ne $property.Value -and "$($property.Value)" -ne '') {
            return $property.Value
        }
    }

    return $Default
}

function ConvertTo-Number {
    param(
        [object]$Value,
        [double]$Default = 0
    )

    if ($null -eq $Value -or "$Value" -eq '') {
        return $Default
    }

    return [double]$Value
}

function Read-BuildDefinition {
    param([string]$Path)

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "Definition file not found: $Path"
    }

    $extension = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
    switch ($extension) {
        '.json' {
            $definition = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
            if ($definition.PSObject.Properties['vms']) {
                return @($definition.vms)
            }
            return @($definition)
        }
        '.csv' {
            return @(Import-Csv -LiteralPath $Path)
        }
        { $_ -in @('.yml', '.yaml') } {
            if (-not (Get-Module -ListAvailable -Name powershell-yaml)) {
                Write-Warning "powershell-yaml is not installed. Using the built-in simple YAML reader for this VM definition."
                $definition = ConvertFrom-SimpleVmYaml -Path $Path
                return @($definition.vms)
            }
            Ensure-Module -Name powershell-yaml -Required | Out-Null
            $definition = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Yaml
            if (-not $definition.PSObject.Properties['vms']) {
                throw "YAML definition must include a top-level 'vms:' collection."
            }
            return @($definition.vms)
        }
        default {
            throw "Unsupported definition file type '$extension'. Use YAML, JSON, or CSV."
        }
    }
}

function ConvertFrom-SimpleVmYaml {
    param([string]$Path)

    $vms = @()
    $current = $null
    $inVms = $false
    foreach ($line in Get-Content -LiteralPath $Path) {
        $trimmed = $line.Trim()
        if ($trimmed.Length -eq 0 -or $trimmed.StartsWith('#')) {
            continue
        }

        if ($trimmed -eq 'vms:') {
            $inVms = $true
            continue
        }

        if (-not $inVms) {
            continue
        }

        if ($line -match '^\s*-\s*([A-Za-z0-9_.-]+)\s*:\s*(.*)$') {
            if ($null -ne $current) {
                $vms += [pscustomobject]$current
            }
            $current = [ordered]@{}
            $current[$matches[1]] = Convert-SimpleYamlValue -Value $matches[2]
            continue
        }

        if ($null -ne $current -and $line -match '^\s{4,}([A-Za-z0-9_.-]+)\s*:\s*(.*)$') {
            $current[$matches[1]] = Convert-SimpleYamlValue -Value $matches[2]
        }
    }

    if ($null -ne $current) {
        $vms += [pscustomobject]$current
    }

    [pscustomobject]@{ vms = $vms }
}

function Convert-SimpleYamlValue {
    param([string]$Value)

    $clean = $Value.Trim()
    $commentIndex = $clean.IndexOf(' #')
    if ($commentIndex -ge 0) {
        $clean = $clean.Substring(0, $commentIndex).TrimEnd()
    }

    if ($clean -eq 'null') {
        return $null
    }

    if ($clean.StartsWith('[') -and $clean.EndsWith(']')) {
        $inner = $clean.Substring(1, $clean.Length - 2).Trim()
        if ($inner.Length -eq 0) {
            return @()
        }
        return @($inner -split ',' | ForEach-Object { Convert-SimpleYamlValue -Value $_ })
    }

    if (($clean.StartsWith('"') -and $clean.EndsWith('"')) -or ($clean.StartsWith("'") -and $clean.EndsWith("'"))) {
        return $clean.Substring(1, $clean.Length - 2)
    }

    if ($clean -match '^-?\d+$') {
        return [int]$clean
    }

    if ($clean -match '^-?\d+\.\d+$') {
        return [double]$clean
    }

    return $clean
}

function Normalize-VmDefinition {
    param([object]$Vm)

    $memoryValue = Get-PropertyValue -Object $Vm -Names @('ramGB', 'memory', 'OSRamSize') -Default 0
    $memoryGb = ConvertTo-Number -Value $memoryValue
    if ($memoryGb -gt 128) {
        $memoryGb = [math]::Round($memoryGb / 1024, 2)
    }

    $roles = Get-PropertyValue -Object $Vm -Names @('roles') -Default @()
    if ($roles -is [array]) {
        $roles = $roles -join ','
    }

    [pscustomobject]@{
        Name         = Get-PropertyValue -Object $Vm -Names @('vmname', 'name')
        Description  = Get-PropertyValue -Object $Vm -Names @('description', 'note') -Default ''
        GuestId      = Get-PropertyValue -Object $Vm -Names @('os', 'guest_id', 'GuestIDOS')
        Cpu          = [int](ConvertTo-Number -Value (Get-PropertyValue -Object $Vm -Names @('cpu', 'num_cpus', 'NumCPU') -Default 0))
        MemoryGB     = $memoryGb
        DiskGB       = ConvertTo-Number -Value (Get-PropertyValue -Object $Vm -Names @('diskGB', 'disk_size', 'OSDiskSize') -Default 0)
        SecondDiskGB = ConvertTo-Number -Value (Get-PropertyValue -Object $Vm -Names @('SecondDiskSize') -Default 0)
        Datastore    = Get-PropertyValue -Object $Vm -Names @('datastore')
        Network      = Get-PropertyValue -Object $Vm -Names @('network', 'NetworkName', 'vlan')
        Iso          = Get-PropertyValue -Object $Vm -Names @('iso', 'iso_path', 'ISO') -Default ''
        Edition      = Get-PropertyValue -Object $Vm -Names @('edition') -Default 'ServerStandard'
        VmHost       = Get-PropertyValue -Object $Vm -Names @('vmhost') -Default ''
        Folder       = Get-PropertyValue -Object $Vm -Names @('folder') -Default ''
        Ip           = Get-PropertyValue -Object $Vm -Names @('ip') -Default ''
        Subnet       = Get-PropertyValue -Object $Vm -Names @('subnet') -Default ''
        Gateway      = Get-PropertyValue -Object $Vm -Names @('gateway') -Default ''
        Dns          = Get-PropertyValue -Object $Vm -Names @('dns', 'primary') -Default ''
        Domain       = Get-PropertyValue -Object $Vm -Names @('domain') -Default ''
        Roles        = $roles
        CodeRepo     = Get-PropertyValue -Object $Vm -Names @('codeRepo') -Default ''
        AppPoolName  = Get-PropertyValue -Object $Vm -Names @('appPoolName') -Default ''
        SiteName     = Get-PropertyValue -Object $Vm -Names @('siteName') -Default ''
        Raw          = $Vm
    }
}

function Test-NormalizedVm {
    param([object]$Vm)

    $issues = New-Object System.Collections.Generic.List[string]
    foreach ($pair in @(
            @{ Name = 'Name'; Value = $Vm.Name },
            @{ Name = 'GuestId'; Value = $Vm.GuestId },
            @{ Name = 'Datastore'; Value = $Vm.Datastore },
            @{ Name = 'Network'; Value = $Vm.Network }
        )) {
        if ([string]::IsNullOrWhiteSpace($pair.Value)) {
            $issues.Add("Missing $($pair.Name).")
        }
    }

    if ($Vm.Cpu -le 0) { $issues.Add('CPU must be greater than zero.') }
    if ($Vm.MemoryGB -le 0) { $issues.Add('MemoryGB must be greater than zero.') }
    if ($Vm.DiskGB -le 0) { $issues.Add('DiskGB must be greater than zero.') }

    if ([string]::IsNullOrWhiteSpace($Vm.Iso) -and $Vm.GuestId -match 'windows' -and $SkipIsoDownload) {
        $issues.Add('Windows VM has no ISO and ISO download is skipped.')
    }

    return $issues
}

function New-VmPlan {
    param(
        [object]$Vm,
        [string[]]$Issues,
        [string]$ArtifactDirectory
    )

    $unattendPath = Join-Path $ArtifactDirectory ("autounattend_{0}.xml" -f $Vm.Name)
    [ordered]@{
        name           = $Vm.Name
        guestId        = $Vm.GuestId
        cpu            = $Vm.Cpu
        memoryGB       = $Vm.MemoryGB
        diskGB         = $Vm.DiskGB
        datastore      = $Vm.Datastore
        network        = $Vm.Network
        iso            = $Vm.Iso
        artifactPath   = $unattendPath
        issues         = @($Issues)
        plannedActions = @(
            'Validate definition row',
            'Resolve or download ISO',
            'Generate unattended install file',
            'Create empty vSphere VM',
            'Attach ISO and install artifact',
            'Set network adapter and optional second disk',
            'Power on VM',
            'Run post deployment payload'
        )
    }
}

function Save-BuildPlan {
    param(
        [object]$Plan,
        [string]$Path
    )

    $Plan | ConvertTo-Json -Depth 20 | Set-Content -LiteralPath $Path -Encoding UTF8 -WhatIf:$false
}

function Ensure-Iso {
    param(
        [object]$Vm
    )

    if (-not [string]::IsNullOrWhiteSpace($Vm.Iso)) {
        return $Vm.Iso
    }

    if ($SkipIsoDownload) {
        return ''
    }

    $isoScript = Join-Path $PSScriptRoot 'Get-WindowsISO.ps1'
    if (-not (Test-Path -LiteralPath $isoScript)) {
        throw "ISO helper not found: $isoScript"
    }

    if ($PSCmdlet.ShouldProcess($Vm.Name, "Download ISO for $($Vm.Edition)")) {
        & $isoScript -Edition $Vm.Edition -OutPath $IsoCachePath
    }

    return ''
}

function New-UnattendArtifact {
    param(
        [object]$Vm,
        [string]$Path
    )

    if ($SkipUnattend -or $Vm.GuestId -notmatch 'windows') {
        return
    }

    $unattendScript = Join-Path $PSScriptRoot 'New-UnattendXML.ps1'
    if (-not (Test-Path -LiteralPath $unattendScript)) {
        throw "Unattend helper not found: $unattendScript"
    }

    $params = @{
        Path         = $Path
        ComputerName = $Vm.Name
    }

    $localPasswordText = Convert-SecureStringToPlainText -Value $LocalAdminPassword
    if ($localPasswordText) {
        $params.LocalAdminPassword = $localPasswordText
    }

    if ($Vm.Domain -and $DomainJoinCredential) {
        $params.JoinDomain = $Vm.Domain
        $params.DomainAccount = $DomainJoinCredential.UserName
        $params.DomainPassword = Convert-SecureStringToPlainText -Value $DomainJoinCredential.Password
    }

    if ($PSCmdlet.ShouldProcess($Path, 'Generate autounattend.xml')) {
        & $unattendScript @params
    }
}

function Get-TargetVmHost {
    param([object]$Vm)

    if (-not [string]::IsNullOrWhiteSpace($Vm.VmHost)) {
        return Get-VMHost -Name $Vm.VmHost
    }

    if (-not [string]::IsNullOrWhiteSpace($VcenterCluster)) {
        return Get-Cluster -Name $VcenterCluster | Get-VMHost | Sort-Object -Property MemoryUsageGB | Select-Object -First 1
    }

    throw "No vmhost was supplied in the definition and -VcenterCluster was not provided."
}

function Invoke-VSphereProvision {
    param([object]$Vm)

    if ($SkipVCenter) {
        Write-Step "Skipping vCenter action for $($Vm.Name)" Yellow
        return
    }

    if ($WhatIfPreference) {
        $PSCmdlet.ShouldProcess($Vm.Name, 'Create vSphere VM') | Out-Null
        if ($Vm.Iso) {
            $PSCmdlet.ShouldProcess($Vm.Name, "Attach ISO $($Vm.Iso)") | Out-Null
        }
        if ($Vm.SecondDiskGB -gt 0) {
            $PSCmdlet.ShouldProcess($Vm.Name, "Add $($Vm.SecondDiskGB) GB second disk") | Out-Null
        }
        if (-not $NoPowerOn) {
            $PSCmdlet.ShouldProcess($Vm.Name, 'Power on VM') | Out-Null
        }
        return
    }

    Ensure-Module -Name VMware.PowerCLI -Required | Out-Null

    if (-not $VcenterServer) {
        throw 'VcenterServer is required unless -SkipVCenter or -PlanOnly is used.'
    }

    if (-not $VcenterCredential) {
        $VcenterCredential = Get-Credential -Message "Credentials for $VcenterServer"
    }

    if (-not (Get-VIServer -Server $VcenterServer -ErrorAction SilentlyContinue)) {
        if ($PSCmdlet.ShouldProcess($VcenterServer, 'Connect to vCenter')) {
            Connect-VIServer -Server $VcenterServer -Credential $VcenterCredential | Out-Null
        }
    }

    $targetHost = Get-TargetVmHost -Vm $Vm
    $newVmParams = @{
        VMHost            = $targetHost
        Name              = $Vm.Name
        Datastore         = $Vm.Datastore
        DiskGB            = $Vm.DiskGB
        DiskStorageFormat = 'Thin'
        MemoryGB          = $Vm.MemoryGB
        GuestId           = $Vm.GuestId
        NumCpu            = $Vm.Cpu
        NetworkName       = $Vm.Network
    }

    if ($Vm.Description) { $newVmParams.Notes = $Vm.Description }
    if ($Vm.Folder) { $newVmParams.Location = $Vm.Folder }

    if (-not $PSCmdlet.ShouldProcess($Vm.Name, 'Create vSphere VM')) {
        return
    }

    $newVm = New-VM @newVmParams

    if ($Vm.Iso) {
        New-CDDrive -VM $newVm -IsoPath $Vm.Iso -StartConnected:$true | Out-Null
    }

    $adapter = Get-VM -Name $Vm.Name | Get-NetworkAdapter -Name 'Network adapter 1' -ErrorAction SilentlyContinue
    if ($adapter) {
        Set-NetworkAdapter -NetworkAdapter $adapter -Type Vmxnet3 -Confirm:$false | Out-Null
    }

    if ($Vm.SecondDiskGB -gt 0) {
        New-HardDisk -VM $newVm -CapacityGB $Vm.SecondDiskGB -Datastore $Vm.Datastore | Out-Null
    }

    if (-not $NoPowerOn) {
        Start-VM -VM $newVm | Out-Null
    }
}

$definitionFullPath = Resolve-FullPath -Path $DefinitionPath
$artifactRootFullPath = Resolve-FullPath -Path $ArtifactRoot
$IsoCachePath = Resolve-FullPath -Path $IsoCachePath
$runStamp = Get-Date -Format 'yyyyMMdd-HHmmss-fff'
$runDirectory = Join-Path $artifactRootFullPath $runStamp

Write-Step "Reading definition $definitionFullPath"
$rawVms = Read-BuildDefinition -Path $definitionFullPath
$normalizedVms = @($rawVms | ForEach-Object { Normalize-VmDefinition -Vm $_ })

if ($normalizedVms.Count -eq 0) {
    throw 'No VM definitions were found.'
}

New-Item -ItemType Directory -Path $runDirectory -Force -WhatIf:$false | Out-Null
New-Item -ItemType Directory -Path $IsoCachePath -Force -WhatIf:$false | Out-Null

$plan = [ordered]@{
    generatedAt     = (Get-Date).ToString('o')
    definitionPath  = $definitionFullPath
    artifactRoot    = $runDirectory
    vcenterServer   = $VcenterServer
    vcenterCluster  = $VcenterCluster
    mode            = $(if ($PlanOnly) { 'PlanOnly' } elseif ($WhatIfPreference) { 'WhatIf' } else { 'Apply' })
    azurePatPresent = -not [string]::IsNullOrWhiteSpace($AzureDevOpsPat)
    vms             = @()
}

$hasErrors = $false
foreach ($vm in $normalizedVms) {
    Write-Step "Planning $($vm.Name)"
    $issues = @(Test-NormalizedVm -Vm $vm)
    if ($issues.Count -gt 0) {
        $hasErrors = $true
        foreach ($issue in $issues) {
            Write-Warning "$($vm.Name): $issue"
        }
    }

    $vmPlan = New-VmPlan -Vm $vm -Issues $issues -ArtifactDirectory $runDirectory
    $plan.vms += $vmPlan

    if ($issues.Count -gt 0 -or $PlanOnly) {
        continue
    }

    $vm.Iso = Ensure-Iso -Vm $vm
    New-UnattendArtifact -Vm $vm -Path $vmPlan.artifactPath
    Invoke-VSphereProvision -Vm $vm
}

$planPath = Join-Path $runDirectory 'build-plan.json'
Save-BuildPlan -Plan $plan -Path $planPath
Write-Step "Build plan written to $planPath" Green

if ($hasErrors) {
    throw 'One or more VM definitions failed validation. See build-plan.json for details.'
}

if ($PlanOnly) {
    Write-Step 'PlanOnly complete. No vCenter provisioning was attempted.' Green
}

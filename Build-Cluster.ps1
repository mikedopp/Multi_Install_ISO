#Requires -Version 7.2
<#
.SYNOPSIS
    Command-line entry point for Multi Install ISO.
.DESCRIPTION
    Modes run in order. Each one checks the output of the one before it.

      Plan          Read and validate a definition, then write an immutable plan and its SHA-256.
      Media         Build and read back per-VM answer-media ISOs for a reviewed plan (needs -PlanHash).
      VerifyMedia   Re-check answer media against its manifest.
      Apply         Create VMs from a reviewed plan (needs -PlanHash and -ConfirmTarget).
      InspectIso    Inspect an install ISO: hash, file system, Windows images or Linux markers.
      ImportIso     Copy or download an install ISO into the cache with SHA-256 verification.
      Dependencies  List every dependency and whether it is present.

    -Json prints one JSON document on stdout (used by the desktop app).
    Exit codes: 0 success, 1 blocking validation or verification failure, 2 error.
.EXAMPLE
    .\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -PlanOnly
.EXAMPLE
    .\Build-Cluster.ps1 -Mode Media -PlanPath .\artifacts\<run>\build-plan.json -PlanHash <sha256> -AdminCredential (Get-Credential Administrator)
.EXAMPLE
    .\Build-Cluster.ps1 -Mode Apply -PlanPath <plan> -PlanHash <sha256> -ConfirmTarget vcsa.lab.local -VcenterCredential (Get-Credential)
#>
[CmdletBinding(SupportsShouldProcess = $true, ConfirmImpact = 'High')]
param(
    [ValidateSet('Plan', 'Media', 'VerifyMedia', 'Apply', 'InspectIso', 'ImportIso', 'Dependencies')]
    [string]$Mode = 'Plan',
    [switch]$PlanOnly,

    [string]$DefinitionPath = 'cluster-vms.yaml',
    [string]$ArtifactRoot = 'artifacts',
    [string]$IsoCachePath,
    [ValidateSet('vsphere', 'hyperv')][string]$Target = 'vsphere',
    [string]$VcenterServer,
    [string]$VcenterCluster,

    [string]$PlanPath,
    [string]$PlanHash,
    [string[]]$VmName,

    [pscredential]$AdminCredential,
    [pscredential]$DomainJoinCredential,
    [securestring]$ProductKey,
    [string]$RootPasswordHash,
    [switch]$CredentialsFromStdin,

    [string]$ConfirmTarget,
    [pscredential]$VcenterCredential,
    [string]$HyperVPath,
    [switch]$NoPowerOn,

    [string]$IsoPath,
    [uri]$IsoUri,
    [string]$ExpectedSha256,
    [string]$ImageName,
    [switch]$AllowUnverified,
    [switch]$SkipHash,

    [switch]$Json
)

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'
if ($PlanOnly) { $Mode = 'Plan' }
# "pwsh -File" passes arrays as one string, so accept "vm1,vm2" too.
if ($VmName) { $VmName = @($VmName | ForEach-Object { $_ -split ',' } | ForEach-Object { $_.Trim() } | Where-Object { $_ }) }

function Resolve-RepoPath([string]$Path) {
    if (-not $Path) { return $Path }
    if ([IO.Path]::IsPathRooted($Path)) { return $Path }
    return [IO.Path]::GetFullPath((Join-Path $PSScriptRoot $Path))
}

function Write-Step([string]$Message, [ConsoleColor]$Color = 'Cyan') {
    if (-not $Json) { Write-Host "==> $Message" -ForegroundColor $Color }
}

function Out-Result([object]$Object, [int]$Code) {
    if ($Json) { $Object | ConvertTo-Json -Depth 12 -Compress | Write-Output }
    exit $Code
}

Import-Module (Join-Path $PSScriptRoot 'powershell\MultiInstallIso\MultiInstallIso.psd1') -Force

$ArtifactRoot = Resolve-RepoPath $ArtifactRoot
if (-not $IsoCachePath) { $IsoCachePath = Join-Path $ArtifactRoot 'isos' } else { $IsoCachePath = Resolve-RepoPath $IsoCachePath }

if ($CredentialsFromStdin) {
    # The desktop app sends secrets as one JSON line on stdin so they never appear in a command line.
    $line = [Console]::In.ReadLine()
    if ($line) {
        $c = $line | ConvertFrom-Json
        function To-Secure([string]$s) { if ($s) { ConvertTo-SecureString $s -AsPlainText -Force } }
        if ($c.PSObject.Properties['adminPassword'] -and $c.adminPassword) {
            $AdminCredential = [pscredential]::new($(if ($c.adminUser) { $c.adminUser } else { 'Administrator' }), (To-Secure $c.adminPassword))
        }
        if ($c.PSObject.Properties['domainPassword'] -and $c.domainPassword) { $DomainJoinCredential = [pscredential]::new($c.domainUser, (To-Secure $c.domainPassword)) }
        if ($c.PSObject.Properties['productKey'] -and $c.productKey) { $ProductKey = To-Secure $c.productKey }
        if ($c.PSObject.Properties['rootPasswordHash'] -and $c.rootPasswordHash) { $RootPasswordHash = $c.rootPasswordHash }
        $c = $null; $line = $null
    }
}

try {
    switch ($Mode) {
        'Plan' {
            $definition = Resolve-RepoPath $DefinitionPath
            Write-Step "Reading definition $definition"
            $result = New-MiiPlan -DefinitionPath $definition -ArtifactRoot $ArtifactRoot -Target $Target -VcenterServer $VcenterServer -VcenterCluster $VcenterCluster
            foreach ($vm in $result.Plan.vms) {
                Write-Step "Planned $($vm.name) ($($vm.osFamily), $($vm.guestId))"
                foreach ($i in $vm.issues) { if (-not $Json) { Write-Host "    BLOCKING: $i" -ForegroundColor Red } }
                foreach ($w in $vm.warnings) { if (-not $Json) { Write-Host "    warning:  $w" -ForegroundColor Yellow } }
            }
            foreach ($i in $result.Plan.issues) { if (-not $Json) { Write-Host "    BLOCKING: $i" -ForegroundColor Red } }
            Write-Step "Build plan written to $($result.PlanPath)" Green
            Write-Step "Plan hash (SHA-256): $($result.PlanHash)" Green
            if ($result.Blocking -gt 0) { Write-Step "$($result.Blocking) blocking issue(s). Media and apply will refuse this plan." Red }
            else { Write-Step 'Plan is ready. No infrastructure was contacted.' Green }
            Out-Result ([ordered]@{ mode = 'Plan'; planPath = $result.PlanPath; planHash = $result.PlanHash; runDirectory = $result.RunDirectory; blocking = $result.Blocking; warnings = $result.Warnings; plan = $result.Plan }) $(if ($result.Blocking -gt 0) { 1 } else { 0 })
        }

        'Media' {
            if (-not $PlanPath -or -not $PlanHash) { throw 'Media mode needs -PlanPath and -PlanHash from a reviewed plan.' }
            $params = @{ PlanPath = (Resolve-RepoPath $PlanPath); PlanHash = $PlanHash }
            foreach ($k in 'AdminCredential', 'DomainJoinCredential', 'ProductKey', 'RootPasswordHash', 'VmName') {
                $v = Get-Variable -Name $k -ValueOnly
                if ($v) { $params[$k] = $v }
            }
            $result = New-MiiAnswerMedia @params -Confirm:$false
            foreach ($m in $result.Media) { Write-Step "$($m.vm): $($m.path) [$($m.volumeLabel)] sha256=$($m.sha256) read-back=$($m.readBack)" Green }
            Write-Step "Manifest: $($result.ManifestPath)" Green
            Write-Step 'Answer media holds credentials. Delete it when the build is finished.' Yellow
            Out-Result ([ordered]@{ mode = 'Media'; mediaDirectory = $result.MediaDirectory; manifestPath = $result.ManifestPath; media = $result.Media }) 0
        }

        'VerifyMedia' {
            if (-not $PlanPath) { throw 'VerifyMedia needs -PlanPath.' }
            $run = Split-Path -Parent (Resolve-RepoPath $PlanPath)
            $checks = @(Test-MiiAnswerMedia -RunDirectory $run)
            foreach ($c in $checks) { Write-Step "$($c.Vm): $($c.Status) $($c.Problems -join ' ')" $(if ($c.Status -eq 'PASS') { 'Green' } else { 'Red' }) }
            Out-Result ([ordered]@{ mode = 'VerifyMedia'; results = $checks }) $(if ($checks | Where-Object Status -ne 'PASS') { 1 } else { 0 })
        }

        'Apply' {
            if (-not $PlanPath -or -not $PlanHash -or -not $ConfirmTarget) { throw 'Apply needs -PlanPath, -PlanHash, and -ConfirmTarget.' }
            $params = @{ PlanPath = (Resolve-RepoPath $PlanPath); PlanHash = $PlanHash; ConfirmTarget = $ConfirmTarget; NoPowerOn = $NoPowerOn }
            foreach ($k in 'VcenterServer', 'VcenterCluster', 'VcenterCredential', 'HyperVPath', 'VmName') {
                $v = Get-Variable -Name $k -ValueOnly
                if ($v) { $params[$k] = $v }
            }
            $result = Invoke-MiiApply @params
            if ($null -eq $result) { Write-Step 'Apply was not confirmed; nothing ran.' Yellow; Out-Result ([ordered]@{ mode = 'Apply'; status = 'NOT_RUN' }) 1 }
            foreach ($r in $result.Results) { Write-Step "$($r.vm): $($r.status)" $(if ($r.status -eq 'SUCCESS') { 'Green' } else { 'Red' }) }
            Write-Step "Receipts: $($result.ApplyDirectory)" Green
            Out-Result ([ordered]@{ mode = 'Apply'; status = $result.Status; applyDirectory = $result.ApplyDirectory; results = $result.Results }) $(if ($result.Status -eq 'SUCCESS') { 0 } else { 1 })
        }

        'InspectIso' {
            if (-not $IsoPath) { throw 'InspectIso needs -IsoPath.' }
            $params = @{ Path = (Resolve-RepoPath $IsoPath) }
            if ($ExpectedSha256) { $params.ExpectedSha256 = $ExpectedSha256 }
            if ($ImageName) { $params.ImageName = $ImageName }
            if ($SkipHash) { $params.SkipHash = $true }
            $r = Test-MiiInstallMedia @params
            Write-Step "$($r.path): $($r.status) kind=$($r.kind) label=$($r.volumeLabel) sha256=$($r.sha256)" $(if ($r.status -eq 'PASS') { 'Green' } elseif ($r.status -eq 'FAIL') { 'Red' } else { 'Yellow' })
            foreach ($img in $r.windowsImages) { Write-Step "  image $($img.index): $($img.name)" }
            foreach ($n in $r.notes) { Write-Step "  note: $n" Yellow }
            foreach ($f in $r.failures) { Write-Step "  FAIL: $f" Red }
            Out-Result ([ordered]@{ mode = 'InspectIso'; result = $r }) $(if ($r.status -eq 'FAIL') { 1 } else { 0 })
        }

        'ImportIso' {
            $params = @{ CacheDirectory = $IsoCachePath; Confirm = $false }
            if ($IsoPath) { $params.SourcePath = Resolve-RepoPath $IsoPath } elseif ($IsoUri) { $params.Uri = $IsoUri } else { throw 'ImportIso needs -IsoPath or -IsoUri.' }
            if ($ExpectedSha256) { $params.ExpectedSha256 = $ExpectedSha256 }
            if ($AllowUnverified) { $params.AllowUnverified = $true }
            $r = Import-MiiInstallMedia @params
            Write-Step "Cached $($r.file) sha256=$($r.sha256) verified=$($r.verified) kind=$($r.kind)" Green
            Out-Result ([ordered]@{ mode = 'ImportIso'; result = $r }) 0
        }

        'Dependencies' {
            $deps = @(Get-MiiDependencyMap -ArtifactRoot $ArtifactRoot -IsoCachePath $IsoCachePath -VcenterServer $VcenterServer)
            if (-not $Json) { $deps | Format-Table Name, Status, RequiredFor, Location -AutoSize | Out-String -Width 220 | Write-Host }
            Out-Result ([ordered]@{ mode = 'Dependencies'; dependencies = $deps }) 0
        }
    }
}
catch {
    if ($Json) { [ordered]@{ mode = $Mode; error = $_.Exception.Message } | ConvertTo-Json -Compress | Write-Output }
    else { Write-Host "ERROR: $($_.Exception.Message)" -ForegroundColor Red }
    exit 2
}

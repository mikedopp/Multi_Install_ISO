<#
.SYNOPSIS
    Runs inside a newly installed Windows VM at first logon to apply roles and pull code.
.DESCRIPTION
    Copied onto the answer media as mii\PostDeploy.ps1 with mii\postdeploy.json beside it.
    Must stay compatible with Windows PowerShell 5.1, which is all a fresh Windows Server has.

    Each step is recorded in C:\ProgramData\MultiInstallIso\postdeploy-receipt.json.
    A git clone needs a PAT in the machine environment variable AZURE_DEVOPS_PAT. The PAT
    is never put on the answer media; when it is missing the clone is skipped and the
    receipt says so.
#>
[CmdletBinding()]
param(
    [string]$ConfigPath,
    [string[]]$Roles = @(),
    [string]$CodeRepo,
    [string]$AppPoolName,
    [string]$SiteName,
    [string]$DestinationRoot = 'C:\inetpub\wwwroot',
    [switch]$AllowPackageInstall
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

$stateDir = 'C:\ProgramData\MultiInstallIso'
New-Item -ItemType Directory -Path $stateDir -Force | Out-Null
$receiptPath = Join-Path $stateDir 'postdeploy-receipt.json'
Start-Transcript -Path (Join-Path $stateDir 'PostDeploy.log') -Append | Out-Null

$receipt = [ordered]@{
    schema    = 'multi-install-iso.postdeploy-receipt.v1'
    computer  = $env:COMPUTERNAME
    startedAt = (Get-Date).ToUniversalTime().ToString('o')
    status    = 'RUNNING'
    steps     = @()
}

function Save-Receipt {
    $receipt | ConvertTo-Json -Depth 6 | Set-Content -LiteralPath $receiptPath -Encoding UTF8
}

function Add-Step([string]$Name, [string]$Status, [string]$Detail) {
    $script:receipt.steps += [ordered]@{ step = $Name; status = $Status; detail = $Detail; at = (Get-Date).ToUniversalTime().ToString('o') }
    Save-Receipt
}

function Test-Command([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

if ($ConfigPath) {
    $config = Get-Content -LiteralPath $ConfigPath -Raw | ConvertFrom-Json
    if ($config.roles) { $Roles = @($config.roles) }
    if ($config.codeRepo) { $CodeRepo = $config.codeRepo }
    if ($config.appPoolName) { $AppPoolName = $config.appPoolName }
    if ($config.siteName) { $SiteName = $config.siteName }
    $receipt.planHash = $config.planHash
}
if (-not $AppPoolName) { $AppPoolName = 'DefaultAppPool' }
if (-not $SiteName) { $SiteName = 'Default Web Site' }
$receipt.roles = @($Roles)

try {
    if ($Roles -contains 'IIS') {
        $r = Install-WindowsFeature -Name Web-Server, Web-Asp-Net45, Web-Mgmt-Console
        if (-not $r.Success) { throw "Install-WindowsFeature failed (exit code $($r.ExitCode))." }
        Add-Step 'IIS features' 'OK' "RestartNeeded=$($r.RestartNeeded)"
    }

    if ($Roles -contains 'API') {
        if (-not $AllowPackageInstall) {
            Add-Step 'API runtime' 'SKIPPED' 'Package installation is off. Re-run with -AllowPackageInstall to install Node.js LTS.'
        }
        elseif (Test-Command winget) {
            & winget install --id OpenJS.NodeJS.LTS --exact --silent --accept-package-agreements --accept-source-agreements
            if ($LASTEXITCODE -ne 0) { throw "winget exited with $LASTEXITCODE." }
            Add-Step 'API runtime' 'OK' 'Node.js LTS via winget'
        }
        else {
            Add-Step 'API runtime' 'SKIPPED' 'winget is not available on this server.'
        }
    }

    if ($CodeRepo) {
        $pat = [Environment]::GetEnvironmentVariable('AZURE_DEVOPS_PAT', 'Machine')
        $destination = Join-Path $DestinationRoot $SiteName
        if (-not (Test-Command git)) {
            Add-Step 'Code clone' 'SKIPPED' 'git.exe is not installed.'
        }
        elseif (-not $pat) {
            Add-Step 'Code clone' 'SKIPPED' 'AZURE_DEVOPS_PAT is not set on this machine.'
        }
        else {
            New-Item -ItemType Directory -Path (Split-Path -Parent $destination) -Force | Out-Null
            # The PAT reaches git through an askpass helper, never a URL or argument.
            $askPass = Join-Path $env:TEMP ('mii-askpass-{0}.cmd' -f [guid]::NewGuid())
            "@echo off`r`necho %* | findstr /i `"Username`" >nul`r`nif %errorlevel%==0 (echo pat) else (echo %AZURE_DEVOPS_PAT%)`r`n" |
                Set-Content -LiteralPath $askPass -Encoding ASCII
            $prev = @{ ask = $env:GIT_ASKPASS; prompt = $env:GIT_TERMINAL_PROMPT; pat = $env:AZURE_DEVOPS_PAT }
            try {
                $env:GIT_ASKPASS = $askPass
                $env:GIT_TERMINAL_PROMPT = '0'
                $env:AZURE_DEVOPS_PAT = $pat
                & git clone --quiet $CodeRepo $destination
                if ($LASTEXITCODE -ne 0) { throw "git clone exited with $LASTEXITCODE." }
                Add-Step 'Code clone' 'OK' $destination
            }
            finally {
                $env:GIT_ASKPASS = $prev.ask
                $env:GIT_TERMINAL_PROMPT = $prev.prompt
                $env:AZURE_DEVOPS_PAT = $prev.pat
                Remove-Item -LiteralPath $askPass -Force -ErrorAction SilentlyContinue
            }
        }
    }

    if ($Roles -contains 'IIS') {
        Import-Module WebAdministration
        if (-not (Test-Path "IIS:\AppPools\$AppPoolName")) { New-WebAppPool -Name $AppPoolName | Out-Null }
        $sitePath = Join-Path $DestinationRoot $SiteName
        if (-not (Test-Path -LiteralPath $sitePath)) { New-Item -ItemType Directory -Path $sitePath -Force | Out-Null }
        if (-not (Get-Website -Name $SiteName -ErrorAction SilentlyContinue)) {
            New-Website -Name $SiteName -PhysicalPath $sitePath -ApplicationPool $AppPoolName -Port 80 | Out-Null
        }
        $site = Get-Website -Name $SiteName
        if (-not $site) { throw "Site $SiteName was not created." }
        Add-Step 'IIS site' 'OK' "site=$SiteName pool=$AppPoolName state=$($site.State)"
    }

    $receipt.status = if (@($receipt.steps | Where-Object { $_.status -eq 'SKIPPED' }).Count -gt 0) { 'PARTIAL' } else { 'SUCCESS' }
}
catch {
    $receipt.status = 'FAILED'
    $receipt.error = $_.Exception.Message
}
finally {
    $receipt.finishedAt = (Get-Date).ToUniversalTime().ToString('o')
    Save-Receipt
    Stop-Transcript | Out-Null
}

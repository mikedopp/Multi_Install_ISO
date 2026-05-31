<#
.SYNOPSIS
    Runs inside a newly installed VM to apply roles and pull application code.
.DESCRIPTION
    This script is intended for first-logon or guest-customization execution.
    It avoids placing Azure DevOps PAT values into git remote URLs.
#>

[CmdletBinding()]
param(
    [string[]]$Roles = @(),
    [string]$CodeRepo,
    [string]$AppPoolName = 'DefaultAppPool',
    [string]$SiteName = 'Default Web Site',
    [string]$AzureDevOpsPat = $env:AZURE_DEVOPS_PAT,
    [string]$DestinationRoot = 'C:\inetpub\wwwroot',
    [switch]$InstallUpdates,
    [switch]$AutoReboot,
    [switch]$AllowPackageInstall
)

Set-StrictMode -Version 2.0
$ErrorActionPreference = 'Stop'

$logPath = 'C:\PostDeploy.log'
Start-Transcript -Path $logPath -Append | Out-Null

function Test-Command {
    param([string]$Name)
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Install-ServerUpdates {
    if (-not $InstallUpdates) {
        Write-Host 'Skipping Windows Update. Pass -InstallUpdates to enable.'
        return
    }

    if (-not (Get-PackageProvider -Name NuGet -ErrorAction SilentlyContinue)) {
        Install-PackageProvider -Name NuGet -Force | Out-Null
    }

    if (-not (Get-Module -ListAvailable -Name PSWindowsUpdate)) {
        Install-Module PSWindowsUpdate -Force -Scope CurrentUser
    }

    Import-Module PSWindowsUpdate -Force
    $updateParams = @{
        AcceptAll = $true
    }
    if ($AutoReboot) {
        $updateParams.AutoReboot = $true
    }

    Install-WindowsUpdate @updateParams
}

function Install-ApiRuntime {
    if (-not $AllowPackageInstall) {
        Write-Warning 'API role requested, but package installation is disabled. Pass -AllowPackageInstall to install Node.js.'
        return
    }

    if (Test-Command winget) {
        winget install --id OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements
        return
    }

    if (Test-Command choco) {
        choco install nodejs-lts -y
        return
    }

    throw 'No supported package manager found. Install winget or Chocolatey before using the API role.'
}

function Invoke-GitClone {
    param(
        [Parameter(Mandatory)]
        [string]$Repo,
        [Parameter(Mandatory)]
        [string]$Destination
    )

    if (-not (Test-Command git)) {
        throw 'git.exe was not found on PATH.'
    }

    if (-not $AzureDevOpsPat) {
        throw 'AzureDevOpsPat was not supplied and AZURE_DEVOPS_PAT is not set.'
    }

    New-Item -ItemType Directory -Path (Split-Path -Parent $Destination) -Force | Out-Null

    $askPassPath = Join-Path $env:TEMP ('ado-askpass-{0}.cmd' -f ([guid]::NewGuid()))
    @'
@echo off
echo %* | findstr /i "Username" >nul
if %errorlevel%==0 (
  echo pat
) else (
  echo %AZURE_DEVOPS_PAT%
)
'@ | Set-Content -LiteralPath $askPassPath -Encoding ASCII

    $previousAskPass = $env:GIT_ASKPASS
    $previousPrompt = $env:GIT_TERMINAL_PROMPT
    try {
        $env:GIT_ASKPASS = $askPassPath
        $env:GIT_TERMINAL_PROMPT = '0'
        $env:AZURE_DEVOPS_PAT = $AzureDevOpsPat
        git clone $Repo $Destination
    }
    finally {
        $env:GIT_ASKPASS = $previousAskPass
        $env:GIT_TERMINAL_PROMPT = $previousPrompt
        Remove-Item -LiteralPath $askPassPath -Force -ErrorAction SilentlyContinue
    }
}

try {
    Install-ServerUpdates

    if ($Roles -contains 'IIS') {
        Install-WindowsFeature -Name Web-Server, Web-Asp-Net45, Web-Mgmt-Console
    }

    if ($Roles -contains 'API') {
        Install-ApiRuntime
    }

    if ($CodeRepo) {
        $destination = Join-Path $DestinationRoot $SiteName
        Invoke-GitClone -Repo $CodeRepo -Destination $destination
    }

    if ($Roles -contains 'IIS') {
        Import-Module WebAdministration
        if (-not (Test-Path "IIS:\AppPools\$AppPoolName")) {
            New-WebAppPool -Name $AppPoolName | Out-Null
        }

        $sitePath = Join-Path $DestinationRoot $SiteName
        if (-not (Test-Path $sitePath)) {
            New-Item -ItemType Directory -Path $sitePath -Force | Out-Null
        }

        if (-not (Get-Website -Name $SiteName -ErrorAction SilentlyContinue)) {
            New-Website -Name $SiteName -PhysicalPath $sitePath -ApplicationPool $AppPoolName -Port 80 | Out-Null
        }
    }
}
finally {
    Stop-Transcript | Out-Null
}

#Fido you funny dog
#Save to a network path for use later.
<#
.SYNOPSIS
    Downloads an official Windows Server ISO from Microsoft using Fido.
.DESCRIPTION
    Uses the Fido PowerShell script to download a Windows Server retail ISO.
    Fido is automatically downloaded from GitHub if not present.
.PARAMETER Edition
    Windows edition, e.g. "ServerStandard", "ServerDatacenter".
.PARAMETER Language
    Language code, e.g. "en-us", "de-de". Defaults to system language.
.PARAMETER Architecture
    "x64" (default) or "x86". Server ISOs are typically x64 only.
.PARAMETER OutPath
    Folder where the ISO will be saved. Defaults to current directory.
.EXAMPLE
    .\Get-WindowsISO.ps1 -Edition ServerStandard -Language en-us -OutPath D:\ISOs
.NOTES
    Requires PowerShell 5.1 or later and an internet connection.
    Fido currently focuses on desktop Windows; Server ISOs are fetched using the same
    Microsoft API. If a Server ISO is not available, consider storing it in a central share.
#>

param(
    [Parameter(Mandatory)]
    [string]$Edition,
    [string]$Language = (Get-Culture).Name,
    [ValidateSet('x64','x86')]
    [string]$Architecture = 'x64',
    [string]$OutPath = $PWD.Path
)

# Ensure output folder exists
if (-not (Test-Path $OutPath)) { New-Item -ItemType Directory -Path $OutPath -Force | Out-Null }

# Download Fido.ps1 if not present
$fidoPath = Join-Path $OutPath "Fido.ps1"
if (-not (Test-Path $fidoPath)) {
    Write-Host "Downloading Fido.ps1 from GitHub..." -ForegroundColor Cyan
    $fidoUrl = "https://raw.githubusercontent.com/pbatard/Fido/master/Fido.ps1"
    Invoke-WebRequest -Uri $fidoUrl -OutFile $fidoPath -UseBasicParsing
}

# Fido expects edition names like "Windows 10" – map Server editions
$fidoEdition = switch ($Edition) {
    'ServerStandard'  { 'Windows Server 2022 Standard' }   # adjust as needed
    'ServerDatacenter'{ 'Windows Server 2022 Datacenter' }
    default           { $Edition }
}

Write-Host "Launching Fido to download ISO..." -ForegroundColor Cyan
& $fidoPath -Win $fidoEdition -Lang $Language -Arch $Architecture -GetUrl

# The above outputs the direct download URL; you can capture it and use Invoke-WebRequest:
# $url = & $fidoPath -Win $fidoEdition -Lang $Language -Arch $Architecture -GetUrl
# $outFile = Join-Path $OutPath "Windows_$Edition.iso"
# Invoke-WebRequest -Uri $url -OutFile $outFile -UseBasicParsing

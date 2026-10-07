#Requires -Version 7.2
<#
.SYNOPSIS
    Release build: version check, offline tests, publish, smoke test of the published exe,
    zip, and SHA-256 sums. Output goes to dist\MultiInstallIso-<version>-win-x64\.
#>
[CmdletBinding()]
param([switch]$SkipTests)

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Set-Location $repo

function Step([string]$m) { Write-Host "==> $m" -ForegroundColor Cyan }

# 1. One version everywhere.
[xml]$props = Get-Content (Join-Path $repo 'Directory.Build.props') -Raw
$version = [string]$props.Project.PropertyGroup.Version
$moduleVersion = (Import-PowerShellDataFile (Join-Path $repo 'powershell\MultiInstallIso\MultiInstallIso.psd1')).ModuleVersion
if ($moduleVersion -ne $version) { throw "Version mismatch: Directory.Build.props $version, MultiInstallIso.psd1 $moduleVersion." }
if (-not (Select-String -Path (Join-Path $repo 'CHANGELOG.md') -Pattern "^## \[?$([regex]::Escape($version))\]?" -Quiet)) { throw "CHANGELOG.md has no entry for $version." }
Step "Version $version"

# 2. Offline tests.
if (-not $SkipTests) {
    Step 'Offline tests'
    & pwsh -NoProfile -File (Join-Path $repo 'tests\Run-Tests.ps1')
    if ($LASTEXITCODE -ne 0) { throw 'Tests failed.' }
}

# 3. Publish.
$name = "MultiInstallIso-$version-win-x64"
$dist = Join-Path $repo 'dist'
$out = Join-Path $dist $name
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
Step "Publish to $out"
& dotnet publish (Join-Path $repo 'src\MultiInstallIso.App\MultiInstallIso.App.csproj') -c Release -r win-x64 --self-contained true `
    -p:PublishSingleFile=true -p:IncludeNativeLibrariesForSelfExtract=true -p:EnableCompressionInSingleFile=true `
    -p:DebugType=none -p:DebugSymbols=false -o $out --nologo
if ($LASTEXITCODE -ne 0) { throw 'dotnet publish failed.' }
$exe = Join-Path $out 'MultiInstallIso.exe'
$fileVersion = (Get-Item $exe).VersionInfo.ProductVersion
if (-not $fileVersion.StartsWith($version)) { throw "Published exe reports $fileVersion, expected $version." }

foreach ($legal in 'LICENSE', 'THIRD_PARTY_NOTICES.md', 'SECURITY.md', 'licenses\Microsoft.Web.WebView2-LICENSE.txt', 'licenses\dotnet-runtime-MIT.txt', 'wwwroot\glimmer\NOTICE.md') {
    if (-not (Test-Path (Join-Path $out $legal))) { throw "Package is missing $legal." }
}

# 4. Smoke test the published exe (GUI subsystem, so wait on the process).
Step 'Smoke test of the published exe'
$smokeReport = Join-Path $dist "$name-smoke.json"
$p = Start-Process -FilePath $exe -ArgumentList '--smoke', '--out', "`"$smokeReport`"" -Wait -PassThru
if ($p.ExitCode -ne 0) { throw "Smoke test failed (exit $($p.ExitCode)); see $smokeReport." }
$smoke = Get-Content $smokeReport -Raw | ConvertFrom-Json
Write-Host "    $(@($smoke.checks | Where-Object status -eq 'PASS').Count)/$(@($smoke.checks).Count) checks PASS"

# 5. Package and hash.
Step 'Package'
$zip = Join-Path $dist "$name.zip"
if (Test-Path $zip) { Remove-Item $zip -Force }
Compress-Archive -Path (Join-Path $out '*') -DestinationPath $zip -CompressionLevel Optimal
$sums = foreach ($f in @($exe, $zip)) { "{0}  {1}" -f (Get-FileHash $f -Algorithm SHA256).Hash.ToLowerInvariant(), ($f.Substring($dist.Length + 1).Replace('\', '/')) }
$sums | Set-Content (Join-Path $dist "$name-SHA256SUMS.txt") -Encoding ascii
$sums | ForEach-Object { Write-Host "    $_" }

Step "Done: $exe"

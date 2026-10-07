# Dependency map: every runtime, module, tool, path, variable, and host this project uses.

function Get-MiiDependencyMap {
    <#
    .SYNOPSIS
        Lists each dependency, where it lives, what needs it, and whether it is present.
    #>
    [CmdletBinding()]
    param(
        [string]$ArtifactRoot,
        [string]$IsoCachePath,
        [string]$VcenterServer
    )

    $repoRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..'))
    if (-not $ArtifactRoot) { $ArtifactRoot = Join-Path $repoRoot 'artifacts' }
    if (-not $IsoCachePath) { $IsoCachePath = Join-Path $ArtifactRoot 'isos' }

    function Dep($Name, $Kind, $RequiredFor, $Status, $Location, $Detail) {
        [pscustomobject][ordered]@{ Name = $Name; Kind = $Kind; RequiredFor = $RequiredFor; Status = $Status; Location = $Location; Detail = $Detail }
    }

    $pwsh = (Get-Process -Id $PID).Path
    Dep 'PowerShell 7' 'runtime' 'everything' $(if ($PSVersionTable.PSVersion.Major -ge 7) { 'OK' } else { 'MISSING' }) $pwsh "Version $($PSVersionTable.PSVersion)"

    $imapi = try { $null = New-Object -ComObject IMAPI2FS.MsftFileSystemImage; 'OK' } catch { 'MISSING' }
    Dep 'IMAPI2FS (Windows)' 'com' 'building answer-media ISOs' $imapi 'IMAPI2FS.MsftFileSystemImage' 'Built into Windows.'

    $icacls = Get-Command icacls.exe -ErrorAction SilentlyContinue
    Dep 'icacls' 'tool' 'restricting access to answer media' $(if ($icacls) { 'OK' } else { 'MISSING' }) $(if ($icacls) { $icacls.Source } else { '' }) 'Built into Windows.'

    $mount = Get-Command Mount-DiskImage -ErrorAction SilentlyContinue
    Dep 'Storage module (Mount-DiskImage)' 'module' 'reading the image list of Windows install ISOs' $(if ($mount) { 'OK' } else { 'MISSING' }) $(if ($mount) { $mount.Source } else { '' }) 'Read-only mount; no elevation needed on Windows 10/11.'

    $guest = Join-Path $repoRoot 'guest\PostDeploy.ps1'
    Dep 'Guest post-deploy script' 'path' 'Windows VMs with roles or codeRepo' $(if (Test-Path -LiteralPath $guest) { 'OK' } else { 'MISSING' }) $guest 'Copied onto answer media as mii\PostDeploy.ps1.'

    Dep 'Artifact root' 'path' 'plans, media, receipts' $(if (Test-Path -LiteralPath $ArtifactRoot) { 'OK' } else { 'CREATED ON USE' }) $ArtifactRoot 'One timestamped folder per plan.'
    Dep 'Install ISO cache' 'path' 'Import-MiiInstallMedia' $(if (Test-Path -LiteralPath $IsoCachePath) { 'OK' } else { 'CREATED ON USE' }) $IsoCachePath 'Each ISO has a .media.json manifest with its SHA-256.'

    $pcli = Get-Module -ListAvailable -Name VMware.VimAutomation.Core | Sort-Object Version -Descending | Select-Object -First 1
    Dep 'VMware PowerCLI' 'module' 'vSphere preflight and apply' $(if ($pcli) { 'OK' } else { 'MISSING' }) $(if ($pcli) { $pcli.ModuleBase } else { 'Install-Module VMware.PowerCLI -Scope CurrentUser' }) $(if ($pcli) { "Version $($pcli.Version)" } else { 'Not installed automatically. Install and pin it yourself.' })

    $hv = Get-Module -ListAvailable -Name Hyper-V | Select-Object -First 1
    Dep 'Hyper-V module' 'module' 'local Hyper-V apply' $(if ($hv) { 'OK' } else { 'MISSING' }) $(if ($hv) { $hv.ModuleBase } else { 'Windows Features > Hyper-V' }) 'Needs Windows Pro/Enterprise, hardware virtualization, and a reboot to enable.'
    Dep 'Elevated session' 'permission' 'local Hyper-V apply' $(if (Test-MiiIsElevated) { 'OK' } else { 'NOT ELEVATED' }) '' 'Hyper-V apply runs from an elevated pwsh.'

    $openssl = (Get-Command openssl -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty Source)
    if (-not $openssl -and (Test-Path 'C:\Program Files\Git\usr\bin\openssl.exe')) { $openssl = 'C:\Program Files\Git\usr\bin\openssl.exe' }
    Dep 'openssl' 'tool' 'creating a kickstart root password hash (openssl passwd -6)' $(if ($openssl) { 'OK' } else { 'OPTIONAL' }) $(if ($openssl) { $openssl } else { 'Git for Windows ships one' }) 'Only needed for Linux VMs.'

    Dep 'AZURE_DEVOPS_PAT' 'env' 'guest code clone (read inside the VM, never on media)' $(if ($env:AZURE_DEVOPS_PAT) { 'SET' } else { 'NOT SET' }) 'Environment variable' 'The value is never read into plans, media, or logs.'

    if ($VcenterServer) {
        Dep 'vCenter' 'host' 'vSphere preflight and apply' 'NOT CHECKED' $VcenterServer 'Reachability is checked by preflight, not here.'
    }
}

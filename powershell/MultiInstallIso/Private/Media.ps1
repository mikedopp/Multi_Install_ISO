# Answer media (per-VM ISO holding autounattend.xml or ks.cfg) and install media
# (Windows / Linux ISOs) import and verification.

function Protect-MiiPath {
    <#
    .SYNOPSIS
        Restricts a folder to the current user, SYSTEM, and Administrators (no inheritance).
    #>
    param([Parameter(Mandatory)][string]$Path)

    $me = [Security.Principal.WindowsIdentity]::GetCurrent().User.Value
    $out = & icacls.exe $Path /inheritance:r /grant:r "*${me}:(OI)(CI)F" '*S-1-5-18:(OI)(CI)F' '*S-1-5-32-544:(OI)(CI)F' 2>&1
    if ($LASTEXITCODE -ne 0) { throw "Could not restrict access to ${Path}: $out" }
}

function Get-MiiFileSha256 {
    param([string]$Path)
    return (Get-FileHash -LiteralPath $Path -Algorithm SHA256).Hash.ToLowerInvariant()
}

function Get-MiiGuestScriptPath {
    return [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..\..\..\guest\PostDeploy.ps1'))
}

function New-MiiAnswerMedia {
    <#
    .SYNOPSIS
        Builds one answer-media ISO per VM in a reviewed plan.
    .DESCRIPTION
        Windows VMs get autounattend.xml (plus PostDeploy.ps1 when roles or codeRepo are set)
        on a volume labelled MIIANSWER. Linux VMs get ks.cfg on a volume labelled OEMDRV,
        which Anaconda picks up automatically. Each ISO is read back and its files compared
        with what was generated before the manifest is written.

        Answer media holds credentials. It is written to <run>\media with access limited
        to the current user, SYSTEM, and Administrators. Remove it with Remove-MiiAnswerMedia.
    #>
    [CmdletBinding(SupportsShouldProcess)]
    param(
        [Parameter(Mandatory)][string]$PlanPath,
        [Parameter(Mandatory)][string]$PlanHash,
        [pscredential]$AdminCredential,
        [pscredential]$DomainJoinCredential,
        [securestring]$ProductKey,
        [string]$RootPasswordHash,
        [string[]]$VmName
    )

    $loaded = Read-MiiPlan -PlanPath $PlanPath -ExpectedHash $PlanHash
    $plan = $loaded.Plan
    if (-not $plan.summary.ready) { throw "The plan has $($plan.summary.blockingIssues) blocking issue(s). Fix the definition and plan again." }

    $vms = @($plan.vms | Where-Object { -not $VmName -or $_.name -in $VmName })
    if ($vms.Count -eq 0) { throw 'No planned VMs match the requested names.' }
    if (($vms | Where-Object osFamily -eq 'windows') -and -not $AdminCredential) { throw 'AdminCredential is required for Windows VMs.' }
    if (($vms | Where-Object osFamily -eq 'linux') -and -not $RootPasswordHash) { throw 'RootPasswordHash is required for Linux VMs.' }
    if (($vms | Where-Object { $_.osFamily -eq 'windows' -and $_.domain }) -and -not $DomainJoinCredential) {
        Write-Warning 'Domain is set but no DomainJoinCredential was given; those VMs will stay in a workgroup.'
    }

    $mediaDir = Join-Path $loaded.RunDirectory 'media'
    if (-not $PSCmdlet.ShouldProcess($mediaDir, "Build answer media for $($vms.Count) VM(s)")) { return }
    New-Item -ItemType Directory -Path $mediaDir -Force | Out-Null
    Protect-MiiPath -Path $mediaDir

    $postDeploy = Get-MiiGuestScriptPath
    $records = @()
    foreach ($vm in $vms) {
        $isoPath = Join-Path $mediaDir "$($vm.name)-answer.iso"
        if (Test-Path -LiteralPath $isoPath) { throw "Answer media already exists: $isoPath. Remove it before rebuilding." }
        $stage = Join-Path $mediaDir ".staging-$($vm.name)"
        if (Test-Path -LiteralPath $stage) { Remove-Item -LiteralPath $stage -Recurse -Force }
        New-Item -ItemType Directory -Path $stage -Force | Out-Null
        try {
            if ($vm.osFamily -eq 'windows') {
                $label = 'MIIANSWER'
                $includePostDeploy = (@($vm.roles).Count -gt 0) -or [bool]$vm.codeRepo
                $xmlParams = @{ Vm = $vm; AdminCredential = $AdminCredential; MacAddress = $vm.macAddress; IncludePostDeploy = $includePostDeploy }
                if ($DomainJoinCredential) { $xmlParams.DomainJoinCredential = $DomainJoinCredential }
                if ($ProductKey) { $xmlParams.ProductKey = $ProductKey }
                [IO.File]::WriteAllText((Join-Path $stage 'autounattend.xml'), (New-MiiUnattendXml @xmlParams), [Text.UTF8Encoding]::new($false))
                if ($includePostDeploy) {
                    if (-not (Test-Path -LiteralPath $postDeploy)) { throw "Guest script not found: $postDeploy" }
                    New-Item -ItemType Directory -Path (Join-Path $stage 'mii') -Force | Out-Null
                    Copy-Item -LiteralPath $postDeploy -Destination (Join-Path $stage 'mii\PostDeploy.ps1')
                    $cfg = [ordered]@{
                        vm = $vm.name; roles = @($vm.roles); codeRepo = $vm.codeRepo
                        appPoolName = $vm.appPoolName; siteName = $vm.siteName; planHash = $loaded.PlanHash
                    }
                    [IO.File]::WriteAllText((Join-Path $stage 'mii\postdeploy.json'), ($cfg | ConvertTo-Json -Depth 5), [Text.UTF8Encoding]::new($false))
                }
            }
            elseif ($vm.osFamily -eq 'linux') {
                $label = 'OEMDRV'
                [IO.File]::WriteAllText((Join-Path $stage 'ks.cfg'), (New-MiiKickstart -Vm $vm -RootPasswordHash $RootPasswordHash), [Text.UTF8Encoding]::new($false))
            }
            else { throw "VM $($vm.name) has unknown osFamily '$($vm.osFamily)'." }

            $expected = @(Get-ChildItem -LiteralPath $stage -Recurse -File | ForEach-Object {
                    [pscustomobject]@{ Path = $_.FullName.Substring($stage.Length + 1).Replace('\', '/'); Sha256 = Get-MiiFileSha256 $_.FullName; Size = $_.Length }
                })
            [void](New-MiiIsoImage -SourceDirectory $stage -Path $isoPath -VolumeLabel $label)

            # Read back every file and compare before trusting the image.
            $info = Get-MiiIsoInfo -Path $isoPath
            if ($info.VolumeLabel -ne $label) { throw "Answer media label is '$($info.VolumeLabel)', expected '$label'." }
            foreach ($file in $expected) {
                $bytes = Read-MiiIsoFile -Path $isoPath -InnerPath $file.Path
                $actual = [Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLowerInvariant()
                if ($actual -ne $file.Sha256) { throw "Read-back of $($file.Path) in $isoPath does not match what was generated." }
            }

            $records += [ordered]@{
                vm          = $vm.name
                osFamily    = $vm.osFamily
                path        = $isoPath
                volumeLabel = $label
                sha256      = Get-MiiFileSha256 $isoPath
                bytes       = (Get-Item -LiteralPath $isoPath).Length
                files       = @($expected | ForEach-Object { [ordered]@{ path = $_.Path; sha256 = $_.Sha256; bytes = $_.Size } })
                readBack    = 'PASS'
                sensitive   = $true
            }
        }
        finally {
            Remove-Item -LiteralPath $stage -Recurse -Force -ErrorAction SilentlyContinue
        }
    }

    $manifestPath = Join-Path $mediaDir 'media-manifest.json'
    $existing = @()
    if (Test-Path -LiteralPath $manifestPath) { $existing = @((Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json -AsHashtable).media) }
    $manifest = [ordered]@{
        schema    = 'multi-install-iso.media.v1'
        planHash  = $loaded.PlanHash
        createdAt = (Get-Date).ToUniversalTime().ToString('o')
        note      = 'Answer media contains credentials. Keep it access-controlled and delete it after the build.'
        media     = @($existing | Where-Object { $_.vm -notin $records.vm }) + $records
    }
    [IO.File]::WriteAllText($manifestPath, ($manifest | ConvertTo-Json -Depth 10), [Text.UTF8Encoding]::new($false))

    [pscustomobject]@{ MediaDirectory = $mediaDir; ManifestPath = $manifestPath; Media = $records }
}

function Remove-MiiAnswerMedia {
    <#
    .SYNOPSIS
        Deletes the answer-media ISOs of one run (they hold credentials).
    #>
    [CmdletBinding(SupportsShouldProcess, ConfirmImpact = 'High')]
    param([Parameter(Mandatory)][string]$RunDirectory)

    $mediaDir = Join-Path $RunDirectory 'media'
    if (-not (Test-Path -LiteralPath $mediaDir)) { return }
    $isos = Get-ChildItem -LiteralPath $mediaDir -Filter '*-answer.iso' -File
    foreach ($iso in $isos) {
        if ($PSCmdlet.ShouldProcess($iso.FullName, 'Delete answer media')) { Remove-Item -LiteralPath $iso.FullName -Force }
    }
}

function Test-MiiAnswerMedia {
    <#
    .SYNOPSIS
        Re-checks answer media against its manifest (hash, label, and every file).
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$RunDirectory, [string]$VmName)

    $manifestPath = Join-Path $RunDirectory 'media\media-manifest.json'
    if (-not (Test-Path -LiteralPath $manifestPath)) { throw "No media manifest in $RunDirectory." }
    $manifest = Get-Content -LiteralPath $manifestPath -Raw | ConvertFrom-Json
    foreach ($m in @($manifest.media | Where-Object { -not $VmName -or $_.vm -eq $VmName })) {
        $problems = New-Object System.Collections.Generic.List[string]
        if (-not (Test-Path -LiteralPath $m.path)) { $problems.Add('ISO is missing.') }
        else {
            if ((Get-MiiFileSha256 $m.path) -ne $m.sha256) { $problems.Add('ISO SHA-256 differs from the manifest.') }
            $info = Get-MiiIsoInfo -Path $m.path
            if ($info.VolumeLabel -ne $m.volumeLabel) { $problems.Add("Label is '$($info.VolumeLabel)', expected '$($m.volumeLabel)'.") }
            foreach ($f in $m.files) {
                try {
                    $bytes = Read-MiiIsoFile -Path $m.path -InnerPath $f.path
                    if ([Convert]::ToHexString([Security.Cryptography.SHA256]::HashData($bytes)).ToLowerInvariant() -ne $f.sha256) { $problems.Add("$($f.path) differs.") }
                }
                catch { $problems.Add("$($f.path) is missing.") }
            }
        }
        [pscustomobject]@{ Vm = $m.vm; Path = $m.path; Status = $(if ($problems.Count) { 'FAIL' } else { 'PASS' }); Problems = @($problems) }
    }
}

function Test-MiiInstallMedia {
    <#
    .SYNOPSIS
        Inspects an install ISO: size, SHA-256, file system, and what it installs.
    .DESCRIPTION
        Linux ISOs are read directly (ISO 9660). Windows ISOs keep their files in UDF, so the
        image is mounted read-only with Mount-DiskImage to read the install.wim/esd image list.
        Status is PASS only when the hash was checked against an expected value and the
        content matched; it is PARTIAL when something could not be checked.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$Path,
        [string]$ExpectedSha256,
        [string]$ImageName,
        [switch]$SkipHash,
        [switch]$NoMount
    )

    $full = (Resolve-Path -LiteralPath $Path).ProviderPath
    $notes = New-Object System.Collections.Generic.List[string]
    $failures = New-Object System.Collections.Generic.List[string]
    $result = [ordered]@{
        path = $full; bytes = (Get-Item -LiteralPath $full).Length; sha256 = $null; expectedSha256 = $ExpectedSha256
        hashMatches = $null; isIso = $false; volumeLabel = $null; hasUdf = $false; kind = 'unknown'
        windowsImages = @(); linuxMarkers = @(); imageName = $ImageName; imageFound = $null
        status = 'PARTIAL'; notes = $notes; failures = $failures
    }

    if (-not $SkipHash) {
        $result.sha256 = Get-MiiFileSha256 $full
        if ($ExpectedSha256) {
            $result.hashMatches = ($result.sha256 -eq $ExpectedSha256.Trim().ToLowerInvariant())
            if (-not $result.hashMatches) { $failures.Add("SHA-256 $($result.sha256) does not match expected $ExpectedSha256.") }
        }
        else { $notes.Add('No expected SHA-256 given; integrity is recorded but not verified.') }
    }
    else { $notes.Add('Hash skipped.') }

    $info = Get-MiiIsoInfo -Path $full
    $result.isIso = $info.IsIso -or $info.HasUdf
    $result.hasUdf = $info.HasUdf
    $result.volumeLabel = $info.VolumeLabel
    if (-not $result.isIso) { $failures.Add('Not an ISO 9660 or UDF image.') }

    $paths = @($info.Files | ForEach-Object { $_.Path.ToLowerInvariant() })
    $linuxMarkers = @('.treeinfo', 'images/install.img', 'isolinux/isolinux.cfg', 'efi/boot/grubx64.efi', 'casper/vmlinuz') | Where-Object { $_ -in $paths }
    if ($linuxMarkers) { $result.kind = 'linux'; $result.linuxMarkers = @($linuxMarkers) }

    if ($result.kind -eq 'unknown' -and $info.HasUdf) {
        if ($NoMount) { $notes.Add('UDF image; Windows image list skipped (-NoMount).') }
        else {
            $mounted = $false
            try {
                $disk = Mount-DiskImage -ImagePath $full -Access ReadOnly -StorageType ISO -PassThru -ErrorAction Stop
                $mounted = $true
                $letter = ($disk | Get-Volume).DriveLetter
                if (-not $letter) { throw 'mounted image has no drive letter' }
                $wim = @('install.wim', 'install.esd') | ForEach-Object { Join-Path "${letter}:\sources" $_ } | Where-Object { Test-Path -LiteralPath $_ } | Select-Object -First 1
                if ($wim) {
                    $result.kind = 'windows'
                    $result.windowsImages = @(Get-MiiWimImageList -Path $wim | ForEach-Object { [ordered]@{ index = $_.Index; name = $_.Name; edition = $_.Edition; version = $_.Version } })
                }
                elseif (Test-Path -LiteralPath "${letter}:\sources\boot.wim") { $result.kind = 'windows'; $notes.Add('boot.wim found but no install.wim/esd.') }
            }
            catch { $notes.Add("Could not mount to read the Windows image list: $($_.Exception.Message)") }
            finally { if ($mounted) { Dismount-DiskImage -ImagePath $full -ErrorAction SilentlyContinue | Out-Null } }
        }
    }

    if ($ImageName -and $result.kind -eq 'windows' -and $result.windowsImages.Count -gt 0) {
        $result.imageFound = [bool]($result.windowsImages | Where-Object { $_.name -eq $ImageName })
        if (-not $result.imageFound) { $failures.Add("Image '$ImageName' is not on this media. Available: $(($result.windowsImages | ForEach-Object name) -join '; ').") }
    }

    $verifiedContent = ($result.kind -eq 'linux') -or ($result.kind -eq 'windows' -and $result.windowsImages.Count -gt 0)
    if ($failures.Count -gt 0) { $result.status = 'FAIL' }
    elseif ($result.hashMatches -and $verifiedContent -and ($null -eq $result.imageFound -or $result.imageFound)) { $result.status = 'PASS' }
    else { $result.status = 'PARTIAL' }
    $result.notes = @($notes); $result.failures = @($failures)
    return [pscustomobject]$result
}

function Import-MiiInstallMedia {
    <#
    .SYNOPSIS
        Copies or downloads an install ISO into the cache, verifies SHA-256, and writes a manifest.
    .DESCRIPTION
        Only https:// downloads are accepted. The file is written as .partial and renamed only
        after the hash check passes, so a cached ISO is never half-written or unverified
        without saying so in its .media.json manifest.
    #>
    [CmdletBinding(SupportsShouldProcess, DefaultParameterSetName = 'Path')]
    param(
        [Parameter(Mandatory, ParameterSetName = 'Path')][string]$SourcePath,
        [Parameter(Mandatory, ParameterSetName = 'Uri')][uri]$Uri,
        [Parameter(Mandatory)][string]$CacheDirectory,
        [string]$ExpectedSha256,
        [string]$Name,
        [switch]$AllowUnverified
    )

    if (-not $ExpectedSha256 -and -not $AllowUnverified) {
        throw 'ExpectedSha256 is required. Copy it from the publisher (for Microsoft media, the Evaluation Center or VLSC page), or pass -AllowUnverified to record the hash without verifying it.'
    }
    if ($PSCmdlet.ParameterSetName -eq 'Uri' -and $Uri.Scheme -ne 'https') { throw 'Only https:// sources are allowed.' }

    $fileName = if ($Name) { $Name } elseif ($SourcePath) { [IO.Path]::GetFileName($SourcePath) } else { [IO.Path]::GetFileName($Uri.AbsolutePath) }
    if (-not $fileName.EndsWith('.iso', [StringComparison]::OrdinalIgnoreCase)) { $fileName += '.iso' }
    New-Item -ItemType Directory -Path $CacheDirectory -Force | Out-Null
    $dest = Join-Path ([IO.Path]::GetFullPath($CacheDirectory)) $fileName
    $partial = "$dest.partial"
    if (Test-Path -LiteralPath $dest) { throw "Already cached: $dest. Run Test-MiiInstallMedia on it, or remove it first." }
    if (-not $PSCmdlet.ShouldProcess($dest, 'Import install media')) { return }

    $source = if ($SourcePath) { (Resolve-Path -LiteralPath $SourcePath).ProviderPath } else { $Uri.AbsoluteUri }
    $client = $null
    try {
        if ($SourcePath) {
            $in = [IO.File]::OpenRead($source)
            $total = $in.Length
        }
        else {
            $client = [Net.Http.HttpClient]::new()
            $client.Timeout = [TimeSpan]::FromHours(6)
            $response = $client.GetAsync($Uri, [Net.Http.HttpCompletionOption]::ResponseHeadersRead).GetAwaiter().GetResult()
            [void]$response.EnsureSuccessStatusCode()
            $total = $response.Content.Headers.ContentLength
            $in = $response.Content.ReadAsStreamAsync().GetAwaiter().GetResult()
        }
        $out = [IO.File]::Create($partial)
        $sha = [Security.Cryptography.IncrementalHash]::CreateHash([Security.Cryptography.HashAlgorithmName]::SHA256)
        try {
            $buffer = [byte[]]::new(4MB)
            $done = 0L
            $lastReport = [DateTime]::MinValue
            while (($n = $in.Read($buffer, 0, $buffer.Length)) -gt 0) {
                $out.Write($buffer, 0, $n)
                $sha.AppendData($buffer, 0, $n)
                $done += $n
                if (([DateTime]::UtcNow - $lastReport).TotalMilliseconds -gt 500) {
                    $pct = if ($total) { [int](100 * $done / $total) } else { 0 }
                    Write-Progress -Activity "Importing $fileName" -Status ('{0:N0} MB' -f ($done / 1MB)) -PercentComplete $pct
                    $lastReport = [DateTime]::UtcNow
                }
            }
        }
        finally { $out.Dispose(); $in.Dispose(); if ($client) { $client.Dispose() } }
        Write-Progress -Activity "Importing $fileName" -Completed
        $hash = [Convert]::ToHexString($sha.GetHashAndReset()).ToLowerInvariant()
        if ($ExpectedSha256 -and $hash -ne $ExpectedSha256.Trim().ToLowerInvariant()) {
            throw "SHA-256 mismatch: got $hash, expected $ExpectedSha256. The partial file was removed."
        }
        Move-Item -LiteralPath $partial -Destination $dest
    }
    catch {
        Remove-Item -LiteralPath $partial -Force -ErrorAction SilentlyContinue
        throw
    }

    $inspection = Test-MiiInstallMedia -Path $dest -SkipHash
    $manifest = [ordered]@{
        schema         = 'multi-install-iso.install-media.v1'
        file           = $fileName
        source         = $source
        importedAt     = (Get-Date).ToUniversalTime().ToString('o')
        bytes          = (Get-Item -LiteralPath $dest).Length
        sha256         = $hash
        expectedSha256 = $ExpectedSha256
        verified       = [bool]$ExpectedSha256
        kind           = $inspection.kind
        volumeLabel    = $inspection.volumeLabel
        windowsImages  = $inspection.windowsImages
        linuxMarkers   = $inspection.linuxMarkers
    }
    [IO.File]::WriteAllText("$dest.media.json", ($manifest | ConvertTo-Json -Depth 6), [Text.UTF8Encoding]::new($false))
    [pscustomobject]$manifest
}

#Requires -Version 7.2
<#
.SYNOPSIS
    Offline test suite for Multi Install ISO. Needs no extra modules and never contacts vCenter or Hyper-V.
.DESCRIPTION
    Writes tests\results\latest.json (gitignored) and exits 1 when any test fails.
    Tests that need something this machine lacks are reported as SKIP, never as PASS.
#>
[CmdletBinding()]
param([string]$Filter = '*')

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'
$repo = Split-Path -Parent $PSScriptRoot
Import-Module (Join-Path $repo 'powershell\MultiInstallIso\MultiInstallIso.psd1') -Force
$fixtures = Join-Path $PSScriptRoot 'fixtures'
$work = Join-Path ([IO.Path]::GetTempPath()) ("mii-tests-" + [guid]::NewGuid().ToString('N').Substring(0, 8))
New-Item -ItemType Directory -Path $work -Force | Out-Null

$results = New-Object System.Collections.Generic.List[object]
class SkipTest : Exception { SkipTest([string]$m) : base($m) {} }

function Test([string]$Name, [scriptblock]$Body) {
    if ($Name -notlike $Filter) { return }
    $sw = [Diagnostics.Stopwatch]::StartNew()
    try {
        & $Body
        $results.Add([pscustomobject]@{ Name = $Name; Status = 'PASS'; Ms = $sw.ElapsedMilliseconds; Detail = '' })
        Write-Host "  PASS  $Name" -ForegroundColor Green
    }
    catch [SkipTest] {
        $results.Add([pscustomobject]@{ Name = $Name; Status = 'SKIP'; Ms = $sw.ElapsedMilliseconds; Detail = $_.Exception.Message })
        Write-Host "  SKIP  $Name ($($_.Exception.Message))" -ForegroundColor Yellow
    }
    catch {
        $where = $_.InvocationInfo.ScriptLineNumber
        $results.Add([pscustomobject]@{ Name = $Name; Status = 'FAIL'; Ms = $sw.ElapsedMilliseconds; Detail = "$($_.Exception.Message) (line $where)" })
        Write-Host "  FAIL  $Name`n        $($_.Exception.Message) (line $where)" -ForegroundColor Red
    }
}
function Skip([string]$Why) { throw [SkipTest]::new($Why) }
function Assert([bool]$Condition, [string]$Message) { if (-not $Condition) { throw "Assertion failed: $Message" } }
function AssertEqual($Actual, $Expected, [string]$Message) {
    if ("$Actual" -ne "$Expected") { throw "Assertion failed: $Message. Expected '$Expected', got '$Actual'." }
}
function AssertThrows([scriptblock]$Body, [string]$Like, [string]$Message) {
    $threw = $false
    try { & $Body } catch { $threw = $true; if ($Like -and $_.Exception.Message -notlike $Like) { throw "Assertion failed: $Message. Error was '$($_.Exception.Message)', expected like '$Like'." } }
    if (-not $threw) { throw "Assertion failed: $Message (no error was thrown)." }
}
function New-TestCredential([string]$User, [string]$Password) {
    [pscredential]::new($User, (ConvertTo-SecureString $Password -AsPlainText -Force))
}
function New-Plan([string]$Definition, [string]$Target = 'vsphere') {
    New-MiiPlan -DefinitionPath $Definition -ArtifactRoot (Join-Path $work 'artifacts') -Target $Target -VcenterServer 'vcsa.test.local'
}

Write-Host "Multi Install ISO tests  (work folder: $work)" -ForegroundColor Cyan

# --- YAML -------------------------------------------------------------------
Test 'YAML: nested maps and block lists' {
    $doc = ConvertFrom-MiiYaml (Get-Content (Join-Path $repo 'examples\local-vms.yml') -Raw)
    $vm = $doc.vms[0]
    AssertEqual $vm.vmname 'dev-web-01' 'vmname'
    AssertEqual @($vm.postInstall).Count 2 'postInstall count'
    AssertEqual $vm.postInstall[1] 'New-Item C:\apps -ItemType Directory' 'single-quoted backslash kept'
    AssertEqual (@($vm.dns) -join ',') '192.168.10.10,8.8.8.8' 'flow list'
    AssertEqual $vm.cpu 4 'integer'
}
Test 'YAML: quoting, comments, and flow lists' {
    $doc = ConvertFrom-MiiYaml "a: 'it''s # not a comment' # comment`nb: `"tab\there`"`nc: [`"x, y`", 'z']`nd: ~`ne: true`nf: 1.5"
    AssertEqual $doc.a "it's # not a comment" 'single quote escape and # inside quotes'
    AssertEqual $doc.b "tab`there" 'double-quote escape'
    AssertEqual @($doc.c).Count 2 'comma inside quotes'
    Assert ($null -eq $doc.d) 'tilde is null'
    Assert ($doc.e -is [bool] -and $doc.e) 'boolean'
    AssertEqual $doc.f 1.5 'decimal'
}
Test 'YAML: unsupported syntax fails with a line number' {
    AssertThrows { ConvertFrom-MiiYaml "a:`n`tb: 1" } '*line 2*tabs*' 'tab indentation'
    AssertThrows { ConvertFrom-MiiYaml "a: &x 1" } '*line 1*anchors*' 'anchor'
    AssertThrows { ConvertFrom-MiiYaml "a: |`n  text" } '*block scalars*' 'block scalar'
    AssertThrows { ConvertFrom-MiiYaml "a: 1`na: 2" } '*duplicate key*' 'duplicate key'
    AssertThrows { ConvertFrom-MiiYaml "a: {b: 1}" } '*flow mappings*' 'flow mapping'
}

# --- Definitions and validation ---------------------------------------------
Test 'Definition: YAML, JSON, and CSV give identical plans' {
    $shapes = foreach ($ext in 'yaml', 'json', 'csv') {
        $p = New-Plan (Join-Path $fixtures "equivalent.$ext")
        AssertEqual $p.Blocking 0 "$ext blocking issues"
        ($p.Plan.vms | ConvertTo-Json -Depth 8 -Compress)
    }
    AssertEqual $shapes[1] $shapes[0] 'JSON plan equals YAML plan'
    AssertEqual $shapes[2] $shapes[0] 'CSV plan equals YAML plan'
}
Test 'Definition: invalid values become blocking issues, not crashes' {
    $p = New-Plan (Join-Path $fixtures 'invalid.yaml')
    $v = $p.Plan.vms
    $all = ($v | ForEach-Object { $_.issues }) -join "`n"
    Assert ($all -match "cpu 'four' is not a number") 'non-numeric cpu'
    Assert ($all -match "ramGB must be greater than zero") 'negative ram'
    Assert ($all -match "diskGB 'abc' is not a number") 'non-numeric disk'
    Assert ($all -match "not a vSphere guest ID.*windows2019srv_64Guest") 'bad guest id with suggestion'
    Assert ($all -match "ip '10.0.0.300' is not a valid IPv4") 'bad ip'
    Assert ($all -match "subnet '255.0.255.0' is not a valid mask") 'bad mask'
    AssertEqual (@($v[0].issues | Where-Object { $_ -match 'Duplicate vmname' }).Count) 1 'first duplicate flagged'
    AssertEqual (@($v[1].issues | Where-Object { $_ -match 'Duplicate vmname' }).Count) 1 'second duplicate flagged (case-insensitive)'
    Assert (($v[1].issues -join ' ') -match "adminPassword' holds a secret") 'secret field rejected'
    Assert (($v[2].issues -join ' ') -match '15-character') 'Windows name length'
    Assert (($v[2].warnings -join ' ') -match "someFutureGuest' is not in the known list") 'unknown guest id is a warning'
    Assert (-not $p.Plan.summary.ready) 'plan not ready'
}
Test 'Definition: memory units and subnet prefixes' {
    $vm = ConvertTo-MiiVm -Entry ([ordered]@{ vmname = 'a'; os = 'rhel9_64Guest'; cpu = 1; memory = 4096; diskGB = 20; datastore = 'd'; network = 'n'; iso = 'x'; ip = '10.0.0.5'; subnet = '/22' })
    AssertEqual $vm.MemoryGB 4 'Terraform memory is MB'
    AssertEqual $vm.PrefixLength 22 '/22 prefix'
    $vm2 = ConvertTo-MiiVm -Entry ([ordered]@{ vmname = 'b'; os = 'rhel9_64Guest'; cpu = 1; ramGB = 256; diskGB = 20; datastore = 'd'; network = 'n'; iso = 'x'; ip = '10.0.0.6'; subnet = '255.255.255.0' })
    AssertEqual $vm2.MemoryGB 256 'ramGB is GB even when large'
    AssertEqual $vm2.PrefixLength 24 'dotted mask'
}
Test 'Definition: every shipped sample plans with zero blocking issues' {
    $samples = @('cluster-vms.yaml', 'templates\powercli-vms.yaml', 'templates\powercli-vms.json', 'templates\powercli-vms.csv',
        'examples\local-vms.yml', 'examples\vms.json', 'examples\rocky9.yaml')
    foreach ($s in $samples) {
        $p = New-Plan (Join-Path $repo $s)
        AssertEqual $p.Blocking 0 "$s blocking: $(($p.Plan.vms | ForEach-Object { $_.issues }) -join '; ')"
        Assert (-not (($p.Plan.vms | ForEach-Object { $_.warnings }) -match 'datastore path')) "$s uses datastore ISO paths"
    }
    $h = New-Plan (Join-Path $repo 'examples\hyperv-lab.yaml') 'hyperv'
    AssertEqual $h.Blocking 0 'hyperv-lab blocking'
    AssertEqual (New-Plan (Join-Path $repo 'cluster-vms.yaml') 'hyperv').Blocking 4 'datastore ISO paths are refused for Hyper-V'
}

# --- Plans ------------------------------------------------------------------
Test 'Plan: hash sidecar, read-only file, and tamper detection' {
    $p = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    Assert (Get-Item $p.PlanPath).IsReadOnly 'plan is read-only'
    $side = (Get-Content (Join-Path $p.RunDirectory 'build-plan.sha256') -Raw).Split(' ')[0]
    AssertEqual $side $p.PlanHash 'sidecar hash'
    AssertEqual (Read-MiiPlan -PlanPath $p.PlanPath -ExpectedHash $p.PlanHash).PlanHash $p.PlanHash 'read with right hash'
    AssertThrows { Read-MiiPlan -PlanPath $p.PlanPath -ExpectedHash ('0' * 64) } '*hash mismatch*' 'wrong hash refused'
    (Get-Item $p.PlanPath).IsReadOnly = $false
    Add-Content -LiteralPath $p.PlanPath -Value ' '
    AssertThrows { Read-MiiPlan -PlanPath $p.PlanPath } '*changed after it was written*' 'tampered plan refused'
}
Test 'Plan: deterministic MAC addresses in the allowed ranges' {
    $p = New-Plan (Join-Path $repo 'cluster-vms.yaml')
    foreach ($vm in $p.Plan.vms) { Assert ($vm.macAddress -match '^00:50:56:[0-3][0-9A-F]:[0-9A-F]{2}:[0-9A-F]{2}$') "vSphere manual MAC range: $($vm.macAddress)" }
    $again = New-Plan (Join-Path $repo 'cluster-vms.yaml')
    AssertEqual ($again.Plan.vms.macAddress -join ',') ($p.Plan.vms.macAddress -join ',') 'same MACs on re-plan'
    $h = New-Plan (Join-Path $repo 'examples\hyperv-lab.yaml') 'hyperv'
    Assert ($h.Plan.vms[0].macAddress -like '00:15:5D:*') 'Hyper-V MAC prefix'
}

# --- Answer files -----------------------------------------------------------
$script:winVm = $null
Test 'Unattend: complete, well-formed, and no plain-text admin password' {
    $p = New-Plan (Join-Path $repo 'cluster-vms.yaml')
    $vm = $p.Plan.vms[0]
    $script:winVm = $vm
    $secret = 'TEST-ONLY-not-a-real-password-1'
    $xmlText = New-MiiUnattendXml -Vm $vm -AdminCredential (New-TestCredential 'Administrator' $secret) -DomainJoinCredential (New-TestCredential 'CONTOSO\svc-join' 'TEST-ONLY-not-a-real-password-4') -MacAddress $vm.macAddress -IncludePostDeploy
    [xml]$x = $xmlText
    $ns = [Xml.XmlNamespaceManager]::new($x.NameTable); $ns.AddNamespace('u', 'urn:schemas-microsoft-com:unattend')
    AssertEqual (@($x.SelectNodes('//u:settings', $ns)).Count) 3 'three passes'
    AssertEqual $x.SelectSingleNode('//u:ComputerName', $ns).InnerText 'iis-web-01' 'computer name'
    AssertEqual $x.SelectSingleNode('//u:InstallTo/u:PartitionID', $ns).InnerText '3' 'EFI installs to partition 3'
    AssertEqual $x.SelectSingleNode('//u:InstallFrom/u:MetaData/u:Value', $ns).InnerText 'Windows Server 2022 SERVERSTANDARD' 'image name'
    AssertEqual $x.SelectSingleNode("//u:component[@name='Microsoft-Windows-TCPIP']//u:Identifier", $ns).InnerText $vm.macAddress.Replace(':', '-') 'adapter identified by MAC'
    AssertEqual $x.SelectSingleNode('//u:UnicastIpAddresses/u:IpAddress', $ns).InnerText '192.168.10.11/24' 'static IP'
    AssertEqual (@($x.SelectNodes('//u:DNSServerSearchOrder/u:IpAddress', $ns)).Count) 2 'two DNS servers'
    AssertEqual $x.SelectSingleNode('//u:UnattendedJoin//u:Domain | //u:component[@name=''Microsoft-Windows-UnattendedJoin'']//u:Domain', $ns).InnerText 'CONTOSO' 'join domain from DOMAIN\user'
    Assert ($xmlText -notmatch [regex]::Escape($secret)) 'admin password is not in plain text'
    $encoded = $x.SelectSingleNode('//u:AdministratorPassword/u:Value', $ns).InnerText
    AssertEqual ([Text.Encoding]::Unicode.GetString([Convert]::FromBase64String($encoded))) "${secret}AdministratorPassword" 'Windows SIM password encoding'
    foreach ($cl in $x.SelectNodes('//u:CommandLine', $ns)) { Assert ($cl.InnerText.Length -le 1024) 'command line within 1024 chars' }
    Assert ($x.SelectSingleNode('//u:AutoLogon/u:LogonCount', $ns).InnerText -eq '1') 'single auto logon'
}
Test 'Unattend: BIOS layout and client local account' {
    $vm = $script:winVm | ConvertTo-Json -Depth 6 | ConvertFrom-Json
    $vm.firmware = 'bios'; $vm.ip = ''; $vm.domain = ''
    [xml]$x = New-MiiUnattendXml -Vm $vm -AdminCredential (New-TestCredential 'labadmin' 'x')
    $ns = [Xml.XmlNamespaceManager]::new($x.NameTable); $ns.AddNamespace('u', 'urn:schemas-microsoft-com:unattend')
    AssertEqual $x.SelectSingleNode('//u:InstallTo/u:PartitionID', $ns).InnerText '2' 'BIOS installs to partition 2'
    Assert ($null -ne $x.SelectSingleNode("//u:ModifyPartition[u:Active='true']", $ns)) 'active system partition'
    AssertEqual $x.SelectSingleNode('//u:LocalAccount/u:Name', $ns).InnerText 'labadmin' 'local admin account'
    Assert ($null -eq $x.SelectSingleNode("//u:component[@name='Microsoft-Windows-TCPIP']", $ns)) 'DHCP when no ip'
    Assert ($null -eq $x.SelectSingleNode('//u:FirstLogonCommands', $ns)) 'no first logon without roles'
}
Test 'Kickstart: installs from the ISO and needs a password hash' {
    $p = New-Plan (Join-Path $repo 'examples\rocky9.yaml')
    $vm = $p.Plan.vms[0]
    AssertThrows { New-MiiKickstart -Vm $vm -RootPasswordHash 'plaintext' } '*crypt hash*' 'plain password refused'
    $ks = New-MiiKickstart -Vm $vm -RootPasswordHash '$6$salt$abcdefghijklmnop'
    Assert ($ks -match '(?m)^cdrom$') 'installs from attached media'
    Assert ($ks -notmatch 'url --url') 'no network mirror'
    Assert ($ks -match '--ip=192.168.10.40 --netmask=255.255.255.0 --gateway=192.168.10.1 --nameserver=192.168.10.10 --hostname=rocky-app-01') 'static network line'
    Assert ($ks -match 'timezone America/Denver') 'time zone'
    Assert ($ks -match 'dnf -y install git') 'postInstall in %post'
}

# --- ISO images -------------------------------------------------------------
Test 'ISO: build and read back nested files' {
    $src = Join-Path $work 'iso-src'; New-Item -ItemType Directory "$src\a\b" -Force | Out-Null
    'root file' | Set-Content "$src\root.txt" -NoNewline
    'deep file' | Set-Content "$src\a\b\deep-name-longer-than-eight.json" -NoNewline
    $iso = Join-Path $work 'roundtrip.iso'
    $r = New-MiiIsoImage -SourceDirectory $src -Path $iso -VolumeLabel 'TESTLABEL'
    Assert ($r.Bytes -gt 0) 'image written'
    $info = Get-MiiIsoInfo $iso
    Assert ($info.IsIso -and $info.HasJoliet) 'ISO 9660 + Joliet'
    AssertEqual $info.VolumeLabel 'TESTLABEL' 'label'
    AssertEqual ([Text.Encoding]::UTF8.GetString((Read-MiiIsoFile $iso 'a/b/deep-name-longer-than-eight.json'))) 'deep file' 'long Joliet name read back'
    AssertThrows { New-MiiIsoImage -SourceDirectory $src -Path $iso -VolumeLabel 'X' } '*Refusing to overwrite*' 'no overwrite'
}

$script:mediaPlan = $null
Test 'Media: answer ISOs for Windows and Linux, read back and verified' {
    $p = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    $script:mediaPlan = $p
    $r = New-MiiAnswerMedia -PlanPath $p.PlanPath -PlanHash $p.PlanHash -AdminCredential (New-TestCredential 'Administrator' 'TEST-ONLY-not-a-real-password-3') -RootPasswordHash '$6$salt$hash' -Confirm:$false
    AssertEqual @($r.Media).Count 2 'two answer ISOs'
    $win = $r.Media | Where-Object vm -eq 'web-01'
    $lin = $r.Media | Where-Object vm -eq 'rocky-01'
    AssertEqual $win.volumeLabel 'MIIANSWER' 'Windows label'
    AssertEqual $lin.volumeLabel 'OEMDRV' 'Linux label (Anaconda auto-detect)'
    Assert (@($win.files.path) -contains 'autounattend.xml') 'autounattend at root'
    Assert (@($win.files.path) -contains 'mii/PostDeploy.ps1') 'PostDeploy for IIS role'
    Assert (@($lin.files.path) -contains 'ks.cfg') 'ks.cfg at root'
    $checks = @(Test-MiiAnswerMedia -RunDirectory $p.RunDirectory)
    Assert (-not ($checks | Where-Object Status -ne 'PASS')) 'manifest verification passes'
    Assert (-not (Get-ChildItem (Split-Path $win.path) -Directory -Force | Where-Object Name -like '.staging-*')) 'staging removed'
    $manifestText = Get-Content $r.ManifestPath -Raw
    Assert ($manifestText -notmatch 'TEST-ONLY-not-a-real-password-3') 'manifest holds no password'
}
Test 'Media: access is limited to the user, SYSTEM, and Administrators' {
    if (-not $script:mediaPlan) { Skip 'media test did not run' }
    $acl = Get-Acl (Join-Path $script:mediaPlan.RunDirectory 'media')
    Assert $acl.AreAccessRulesProtected 'inheritance removed'
    $sids = @($acl.Access | ForEach-Object { $_.IdentityReference.Translate([Security.Principal.SecurityIdentifier]).Value })
    $me = [Security.Principal.WindowsIdentity]::GetCurrent().User.Value
    foreach ($sid in $sids) { Assert ($sid -in $me, 'S-1-5-18', 'S-1-5-32-544') "unexpected ACE $sid" }
}
Test 'Media: tampering is detected' {
    if (-not $script:mediaPlan) { Skip 'media test did not run' }
    $iso = Join-Path $script:mediaPlan.RunDirectory 'media\rocky-01-answer.iso'
    $fs = [IO.File]::Open($iso, 'Open', 'ReadWrite'); $fs.Seek(-1, 'End') | Out-Null; $fs.WriteByte(0x5A); $fs.Dispose()
    $c = Test-MiiAnswerMedia -RunDirectory $script:mediaPlan.RunDirectory -VmName 'rocky-01'
    AssertEqual $c.Status 'FAIL' 'modified ISO fails'
}
Test 'Media: Windows mounts the answer ISO and sees the same files (independent check)' {
    if (-not $script:mediaPlan) { Skip 'media test did not run' }
    if (-not (Get-Command Mount-DiskImage -ErrorAction SilentlyContinue)) { Skip 'Mount-DiskImage not available' }
    $iso = Join-Path $script:mediaPlan.RunDirectory 'media\web-01-answer.iso'
    try { $d = Mount-DiskImage -ImagePath $iso -Access ReadOnly -PassThru -ErrorAction Stop } catch { Skip "mount not permitted: $($_.Exception.Message)" }
    try {
        $vol = $d | Get-Volume
        AssertEqual $vol.FileSystemLabel 'MIIANSWER' 'mounted label'
        $mounted = Join-Path "$($vol.DriveLetter):\" 'autounattend.xml'
        [xml]$x = Get-Content -LiteralPath $mounted -Raw
        AssertEqual $x.unattend.settings[1].component[0].ComputerName 'web-01' 'mounted autounattend.xml parses'
        Assert (Test-Path "$($vol.DriveLetter):\mii\PostDeploy.ps1") 'PostDeploy on mounted media'
    }
    finally { Dismount-DiskImage -ImagePath $iso | Out-Null }
}
Test 'Media: refuses unready plans and wrong hashes' {
    $bad = New-Plan (Join-Path $fixtures 'invalid.yaml')
    AssertThrows { New-MiiAnswerMedia -PlanPath $bad.PlanPath -PlanHash $bad.PlanHash -AdminCredential (New-TestCredential 'Administrator' 'x') -Confirm:$false } '*blocking issue*' 'unready plan'
    $good = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    AssertThrows { New-MiiAnswerMedia -PlanPath $good.PlanPath -PlanHash ('f' * 64) -AdminCredential (New-TestCredential 'Administrator' 'x') -Confirm:$false } '*hash mismatch*' 'wrong hash'
    AssertThrows { New-MiiAnswerMedia -PlanPath $good.PlanPath -PlanHash $good.PlanHash -RootPasswordHash '$6$a$b' -Confirm:$false } '*AdminCredential is required*' 'Windows needs admin credential'
}

# --- Install media ----------------------------------------------------------
function New-FakeWim([string]$Path, [string[]]$Names) {
    $images = for ($i = 0; $i -lt $Names.Count; $i++) { "<IMAGE INDEX=`"$($i + 1)`"><NAME>$($Names[$i])</NAME><WINDOWS><EDITIONID>ServerStandard</EDITIONID><VERSION><MAJOR>10</MAJOR><MINOR>0</MINOR><BUILD>20348</BUILD></VERSION></WINDOWS></IMAGE>" }
    $xmlBytes = [Text.Encoding]::Unicode.GetPreamble() + [Text.Encoding]::Unicode.GetBytes("<WIM>$($images -join '')</WIM>")
    $header = [byte[]]::new(208)
    [Text.Encoding]::ASCII.GetBytes("MSWIM`0`0`0").CopyTo($header, 0)
    [BitConverter]::GetBytes([uint32]208).CopyTo($header, 8)
    $size = [BitConverter]::GetBytes([uint64]$xmlBytes.Length); [Array]::Copy($size, 0, $header, 72, 7)
    $header[79] = 0x02
    [BitConverter]::GetBytes([int64]208).CopyTo($header, 80)
    [BitConverter]::GetBytes([int64]$xmlBytes.Length).CopyTo($header, 88)
    [IO.File]::WriteAllBytes($Path, $header + $xmlBytes)
}
Test 'Install media: WIM image list is read from the XML resource' {
    $wim = Join-Path $work 'fake.wim'
    New-FakeWim $wim @('Windows Server 2022 SERVERSTANDARDCORE', 'Windows Server 2022 SERVERSTANDARD')
    $list = @(Get-MiiWimImageList $wim)
    AssertEqual $list.Count 2 'two images'
    AssertEqual $list[1].Name 'Windows Server 2022 SERVERSTANDARD' 'image 2 name'
    AssertEqual $list[1].Version '10.0.20348' 'version'
}
Test 'Install media: Linux ISO is recognised and hash-verified' {
    $src = Join-Path $work 'linux-src'; New-Item -ItemType Directory "$src\images" -Force | Out-Null
    '[general]' | Set-Content "$src\.treeinfo"; 'img' | Set-Content "$src\images\install.img"
    $iso = Join-Path $work 'fake-linux.iso'
    New-MiiIsoImage -SourceDirectory $src -Path $iso -VolumeLabel 'Rocky_9_x86_64' | Out-Null
    $hash = (Get-FileHash $iso -Algorithm SHA256).Hash
    $ok = Test-MiiInstallMedia -Path $iso -ExpectedSha256 $hash
    AssertEqual $ok.status 'PASS' "status ($($ok.notes -join ';'))"
    AssertEqual $ok.kind 'linux' 'kind'
    $bad = Test-MiiInstallMedia -Path $iso -ExpectedSha256 ('0' * 64)
    AssertEqual $bad.status 'FAIL' 'wrong hash fails'
    $unverified = Test-MiiInstallMedia -Path $iso
    AssertEqual $unverified.status 'PARTIAL' 'no expected hash is never PASS'
}
Test 'Install media: Windows (UDF) ISO is mounted and its images matched' {
    if (-not (Get-Command Mount-DiskImage -ErrorAction SilentlyContinue)) { Skip 'Mount-DiskImage not available' }
    $src = Join-Path $work 'win-src'; New-Item -ItemType Directory "$src\sources" -Force | Out-Null
    New-FakeWim "$src\sources\install.wim" @('Windows Server 2022 SERVERSTANDARD', 'Windows Server 2022 SERVERDATACENTER')
    $iso = Join-Path $work 'fake-windows.iso'
    New-MiiIsoImage -SourceDirectory $src -Path $iso -VolumeLabel 'SSS_X64FREE_EN' -IncludeUdf | Out-Null
    $hash = (Get-FileHash $iso -Algorithm SHA256).Hash
    $r = Test-MiiInstallMedia -Path $iso -ExpectedSha256 $hash -ImageName 'Windows Server 2022 SERVERSTANDARD'
    if ($r.kind -eq 'unknown' -and ($r.notes -match 'Could not mount')) { Skip ($r.notes -join ';') }
    AssertEqual $r.kind 'windows' 'kind'
    AssertEqual @($r.windowsImages).Count 2 'images listed'
    AssertEqual $r.status 'PASS' 'status'
    $miss = Test-MiiInstallMedia -Path $iso -ExpectedSha256 $hash -ImageName 'Windows Server 2022 SERVERSTANDARDCORE'
    AssertEqual $miss.status 'FAIL' 'missing image name fails'
}
Test 'Install media: import verifies SHA-256 before caching' {
    $srcIso = Join-Path $work 'fake-linux.iso'
    if (-not (Test-Path $srcIso)) { Skip 'Linux ISO test did not run' }
    $cache = Join-Path $work 'cache'
    $hash = (Get-FileHash $srcIso -Algorithm SHA256).Hash
    AssertThrows { Import-MiiInstallMedia -SourcePath $srcIso -CacheDirectory $cache -Confirm:$false } '*ExpectedSha256 is required*' 'hash required'
    AssertThrows { Import-MiiInstallMedia -SourcePath $srcIso -CacheDirectory $cache -ExpectedSha256 ('1' * 64) -Name 'bad.iso' -Confirm:$false } '*mismatch*' 'wrong hash refused'
    Assert (-not (Test-Path (Join-Path $cache 'bad.iso.partial'))) 'partial removed'
    Assert (-not (Test-Path (Join-Path $cache 'bad.iso'))) 'nothing cached'
    $m = Import-MiiInstallMedia -SourcePath $srcIso -CacheDirectory $cache -ExpectedSha256 $hash -Confirm:$false
    Assert $m.verified 'verified'
    AssertEqual $m.kind 'linux' 'kind in manifest'
    Assert (Test-Path (Join-Path $cache 'fake-linux.iso.media.json')) 'manifest written'
    AssertThrows { Import-MiiInstallMedia -Uri 'http://example.invalid/a.iso' -CacheDirectory $cache -ExpectedSha256 $hash -Confirm:$false } '*https*' 'http refused'
}

# --- Apply state machine ----------------------------------------------------
function New-FakeProvider([string]$FailStep, [string]$FailVm, [string]$AttemptDirProbe) {
    $calls = New-Object System.Collections.Generic.List[string]
    $make = { param($step) { param($vm, $ctx) $ctx.Calls.Add("${step}:$($vm.name)"); if ($ctx.FailStep -eq $step -and $ctx.FailVm -eq $vm.name) { throw "forced $step failure" }; "fake $step ok" }.GetNewClosure() }
    @{
        Identity = 'fake-target'
        Connect = { param($ctx) $ctx.Calls = $ctx.Provider.Calls; $ctx.FailStep = $ctx.Provider.FailStep; $ctx.FailVm = $ctx.Provider.FailVm
            $ctx.Provider.AttemptSeen = [bool](Get-ChildItem -Path $ctx.Provider.RunDir -Filter 'apply-attempt.json' -Recurse) }
        Preflight = & $make 'Preflight'; CreateVm = & $make 'CreateVm'; AttachMedia = & $make 'AttachMedia'; Readback = & $make 'Readback'; PowerOn = & $make 'PowerOn'
        Disconnect = { param($ctx) }
        Calls = $calls; FailStep = $FailStep; FailVm = $FailVm; RunDir = $AttemptDirProbe; AttemptSeen = $false
    }
}
Test 'Apply: refuses wrong hash, wrong target, and missing media' {
    $p = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    $prov = New-FakeProvider -AttemptDirProbe $p.RunDirectory
    AssertThrows { Invoke-MiiApply -PlanPath $p.PlanPath -PlanHash ('a' * 64) -ConfirmTarget 'fake-target' -Provider $prov -Confirm:$false } '*hash mismatch*' 'wrong hash'
    AssertThrows { Invoke-MiiApply -PlanPath $p.PlanPath -PlanHash $p.PlanHash -ConfirmTarget 'other' -Provider $prov -Confirm:$false } '*does not match the target*' 'wrong target'
    AssertThrows { Invoke-MiiApply -PlanPath $p.PlanPath -PlanHash $p.PlanHash -ConfirmTarget 'fake-target' -Provider $prov -Confirm:$false } '*No media manifest*' 'no media'
    AssertEqual $prov.Calls.Count 0 'provider never called'
}
Test 'Apply: success writes the attempt first, then a receipt per VM' {
    $p = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    New-MiiAnswerMedia -PlanPath $p.PlanPath -PlanHash $p.PlanHash -AdminCredential (New-TestCredential 'Administrator' 'x') -RootPasswordHash '$6$a$b' -Confirm:$false | Out-Null
    $prov = New-FakeProvider -AttemptDirProbe $p.RunDirectory
    $r = Invoke-MiiApply -PlanPath $p.PlanPath -PlanHash $p.PlanHash -ConfirmTarget 'fake-target' -Provider $prov -Confirm:$false
    AssertEqual $r.Status 'SUCCESS' 'run status'
    Assert $prov.AttemptSeen 'attempt record existed before Connect'
    AssertEqual ($prov.Calls -join ',') 'Preflight:web-01,CreateVm:web-01,AttachMedia:web-01,Readback:web-01,PowerOn:web-01,Preflight:rocky-01,CreateVm:rocky-01,AttachMedia:rocky-01,Readback:rocky-01,PowerOn:rocky-01' 'step order'
    $rc = Get-Content (Join-Path $r.ApplyDirectory 'receipt-web-01.json') -Raw | ConvertFrom-Json
    AssertEqual $rc.status 'SUCCESS' 'receipt status'
    AssertEqual @($rc.steps).Count 5 'five steps recorded'
    AssertEqual $rc.planHash $p.PlanHash 'receipt carries plan hash'
}
Test 'Apply: forced first-VM failure stops the run and keeps plan, attempt, and receipt' {
    $p = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    New-MiiAnswerMedia -PlanPath $p.PlanPath -PlanHash $p.PlanHash -AdminCredential (New-TestCredential 'Administrator' 'x') -RootPasswordHash '$6$a$b' -Confirm:$false | Out-Null
    $prov = New-FakeProvider -FailStep 'CreateVm' -FailVm 'web-01' -AttemptDirProbe $p.RunDirectory
    $r = Invoke-MiiApply -PlanPath $p.PlanPath -PlanHash $p.PlanHash -ConfirmTarget 'fake-target' -Provider $prov -Confirm:$false
    AssertEqual $r.Status 'FAILED' 'run failed'
    Assert (Test-Path $p.PlanPath) 'plan kept'
    Assert (Test-Path (Join-Path $r.ApplyDirectory 'apply-attempt.json')) 'attempt kept'
    $rc = Get-Content (Join-Path $r.ApplyDirectory 'receipt-web-01.json') -Raw | ConvertFrom-Json
    AssertEqual $rc.status 'FAILED' 'receipt failed'
    AssertEqual (($rc.steps | ForEach-Object { "$($_.step)=$($_.status)" }) -join ',') 'Preflight=OK,CreateVm=FAILED' 'steps up to the failure'
    Assert (-not ($prov.Calls -match 'rocky-01')) 'second VM never touched'
    $sum = Get-Content (Join-Path $r.ApplyDirectory 'run-summary.json') -Raw | ConvertFrom-Json
    AssertEqual (@($sum.notRun) -join ',') 'rocky-01' 'second VM reported as not run'
}
Test 'Apply: -NoPowerOn records PowerOn as skipped' {
    $p = New-Plan (Join-Path $fixtures 'equivalent.yaml')
    New-MiiAnswerMedia -PlanPath $p.PlanPath -PlanHash $p.PlanHash -AdminCredential (New-TestCredential 'Administrator' 'x') -RootPasswordHash '$6$a$b' -Confirm:$false | Out-Null
    $prov = New-FakeProvider -AttemptDirProbe $p.RunDirectory
    $r = Invoke-MiiApply -PlanPath $p.PlanPath -PlanHash $p.PlanHash -ConfirmTarget 'fake-target' -Provider $prov -NoPowerOn -VmName 'rocky-01' -Confirm:$false
    $rc = Get-Content (Join-Path $r.ApplyDirectory 'receipt-rocky-01.json') -Raw | ConvertFrom-Json
    AssertEqual ($rc.steps | Where-Object step -eq 'PowerOn').status 'SKIPPED' 'power on skipped'
    Assert (-not ($prov.Calls -match 'PowerOn')) 'provider PowerOn not called'
}

# --- Scripts and CLI --------------------------------------------------------
Test 'Scripts: every PowerShell file parses' {
    $files = @(Get-ChildItem $repo -Recurse -Include *.ps1, *.psm1, *.psd1 -File | Where-Object { $_.FullName -notmatch '\\(legacy|artifacts|dist|src)\\' })
    Assert ($files.Count -ge 10) "found $($files.Count) files"
    foreach ($f in $files) {
        $errors = $null
        [void][Management.Automation.Language.Parser]::ParseFile($f.FullName, [ref]$null, [ref]$errors)
        Assert ($errors.Count -eq 0) "$($f.Name): $($errors | Select-Object -First 1)"
    }
}
Test 'Scripts: guest PostDeploy.ps1 parses in Windows PowerShell 5.1' {
    $ps51 = Join-Path $env:SystemRoot 'System32\WindowsPowerShell\v1.0\powershell.exe'
    if (-not (Test-Path $ps51)) { Skip 'Windows PowerShell 5.1 not found' }
    $guest = Join-Path $repo 'guest\PostDeploy.ps1'
    $out = & $ps51 -NoProfile -Command "`$e=`$null; [void][Management.Automation.Language.Parser]::ParseFile('$guest',[ref]`$null,[ref]`$e); `$e.Count"
    AssertEqual ($out | Select-Object -Last 1) '0' 'parse errors under 5.1'
}
Test 'Scripts: no automatic module installs' {
    $files = @(Get-ChildItem (Join-Path $repo 'powershell'), (Join-Path $repo 'guest') -Recurse -File) + @(Get-Item (Join-Path $repo 'Build-Cluster.ps1'))
    $hits = @($files | Select-String -Pattern '^\s*(Install-Module|Install-PackageProvider)\b')
    AssertEqual @($hits).Count 0 "install calls: $($hits -join '; ')"
}
Test 'CLI: Plan -Json output and exit codes' {
    $root = Join-Path $work 'cli'
    $json = & pwsh -NoProfile -File (Join-Path $repo 'Build-Cluster.ps1') -DefinitionPath (Join-Path $fixtures 'equivalent.yaml') -ArtifactRoot $root -PlanOnly -Json
    AssertEqual $LASTEXITCODE 0 'exit code for ready plan'
    $o = $json | ConvertFrom-Json
    Assert ($o.planHash -match '^[0-9a-f]{64}$') 'plan hash in JSON'
    AssertEqual $o.plan.summary.vmCount 2 'vm count'
    & pwsh -NoProfile -File (Join-Path $repo 'Build-Cluster.ps1') -DefinitionPath (Join-Path $fixtures 'invalid.yaml') -ArtifactRoot $root -PlanOnly -Json | Out-Null
    AssertEqual $LASTEXITCODE 1 'exit code for blocking issues'
    $err = & pwsh -NoProfile -File (Join-Path $repo 'Build-Cluster.ps1') -DefinitionPath 'nope.yaml' -ArtifactRoot $root -PlanOnly -Json
    AssertEqual $LASTEXITCODE 2 'exit code for errors'
    Assert (($err | ConvertFrom-Json).error -match 'not found') 'error JSON'
}
Test 'CLI: Media takes secrets on stdin and never echoes them' {
    $root = Join-Path $work 'cli-media'
    $plan = & pwsh -NoProfile -File (Join-Path $repo 'Build-Cluster.ps1') -DefinitionPath (Join-Path $fixtures 'equivalent.yaml') -ArtifactRoot $root -PlanOnly -Json | ConvertFrom-Json
    $secret = 'TEST-ONLY-not-a-real-password-2'
    $payload = @{ adminUser = 'Administrator'; adminPassword = $secret; rootPasswordHash = '$6$x$y' } | ConvertTo-Json -Compress
    $out = $payload | & pwsh -NoProfile -File (Join-Path $repo 'Build-Cluster.ps1') -Mode Media -PlanPath $plan.planPath -PlanHash $plan.planHash -CredentialsFromStdin -Json
    AssertEqual $LASTEXITCODE 0 "media exit code: $out"
    Assert ("$out" -notmatch [regex]::Escape($secret)) 'secret not in output'
    AssertEqual @(($out | ConvertFrom-Json).media).Count 2 'two ISOs'
    $verify = & pwsh -NoProfile -File (Join-Path $repo 'Build-Cluster.ps1') -Mode VerifyMedia -PlanPath $plan.planPath -Json
    AssertEqual $LASTEXITCODE 0 'verify exit code'
}
Test 'Dependencies: map lists required pieces without secret values' {
    $env:AZURE_DEVOPS_PAT_TESTSENTINEL = $null
    $deps = @(Get-MiiDependencyMap)
    foreach ($n in 'PowerShell 7', 'IMAPI2FS (Windows)', 'VMware PowerCLI', 'Hyper-V module', 'AZURE_DEVOPS_PAT', 'Guest post-deploy script') {
        Assert ($deps.Name -contains $n) "dependency $n listed"
    }
    AssertEqual ($deps | Where-Object Name -eq 'IMAPI2FS (Windows)').Status 'OK' 'IMAPI present on this machine'
    $pat = $deps | Where-Object Name -eq 'AZURE_DEVOPS_PAT'
    Assert ($pat.Status -in 'SET', 'NOT SET') 'PAT status only'
}
Test 'Version: module and app versions match' {
    $props = Join-Path $repo 'Directory.Build.props'
    if (-not (Test-Path $props)) { Skip 'Directory.Build.props not present' }
    [xml]$x = Get-Content $props -Raw
    $appVersion = $x.Project.PropertyGroup.Version
    $modVersion = (Import-PowerShellDataFile (Join-Path $repo 'powershell\MultiInstallIso\MultiInstallIso.psd1')).ModuleVersion
    AssertEqual $modVersion $appVersion 'psd1 ModuleVersion equals Directory.Build.props Version'
}

# --- Summary ----------------------------------------------------------------
Remove-Item -LiteralPath $work -Recurse -Force -ErrorAction SilentlyContinue
$pass = @($results | Where-Object Status -eq 'PASS').Count
$fail = @($results | Where-Object Status -eq 'FAIL').Count
$skip = @($results | Where-Object Status -eq 'SKIP').Count
$outDir = Join-Path $PSScriptRoot 'results'
New-Item -ItemType Directory -Path $outDir -Force | Out-Null
[ordered]@{ ranAt = (Get-Date).ToUniversalTime().ToString('o'); machine = $env:COMPUTERNAME; pass = $pass; fail = $fail; skip = $skip; tests = $results } |
    ConvertTo-Json -Depth 5 | Set-Content (Join-Path $outDir 'latest.json') -Encoding utf8
Write-Host ''
Write-Host "Passed $pass, failed $fail, skipped $skip" -ForegroundColor $(if ($fail) { 'Red' } elseif ($skip) { 'Yellow' } else { 'Green' })
exit $(if ($fail) { 1 } else { 0 })

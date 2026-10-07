# Windows autounattend.xml and RHEL-family kickstart generation.

$script:UnattendNs = 'urn:schemas-microsoft-com:unattend'
$script:WcmNs = 'http://schemas.microsoft.com/WMIConfig/2002/State'

function ConvertTo-MiiUnattendPassword {
    <#
    .SYNOPSIS
        Encodes a password the way Windows SIM does (PlainText=false).
    .NOTES
        This is obfuscation, not encryption. Anyone holding the answer file can decode it,
        so answer media stays an access-controlled artifact.
    #>
    param([Parameter(Mandatory)][securestring]$Password, [Parameter(Mandatory)][string]$Suffix)

    $plain = [Net.NetworkCredential]::new('', $Password).Password
    return [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($plain + $Suffix))
}

function ConvertTo-MiiNetmask {
    param([int]$PrefixLength)
    $mask = [uint32]0
    if ($PrefixLength -gt 0) { $mask = [uint32]::MaxValue -shl (32 - $PrefixLength) }
    return (3, 2, 1, 0 | ForEach-Object { ($mask -shr (8 * $_)) -band 255 }) -join '.'
}

function ConvertTo-MiiEncodedCommand {
    param([string]$Script)
    $encoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($Script))
    $line = "powershell.exe -NoProfile -ExecutionPolicy Bypass -EncodedCommand $encoded"
    if ($line.Length -gt 1024) { throw "First-logon command is $($line.Length) characters; Windows Setup allows 1024. Move it into a script on the answer media." }
    return $line
}

function Add-MiiXmlElement {
    param([System.Xml.XmlNode]$Parent, [string]$Name, [object]$Text, [hashtable]$WcmAttributes)

    $doc = if ($Parent -is [System.Xml.XmlDocument]) { $Parent } else { $Parent.OwnerDocument }
    $el = $doc.CreateElement($Name, $script:UnattendNs)
    if ($WcmAttributes) {
        foreach ($k in $WcmAttributes.Keys) {
            $attr = $doc.CreateAttribute('wcm', $k, $script:WcmNs)
            $attr.Value = $WcmAttributes[$k]
            [void]$el.Attributes.Append($attr)
        }
    }
    if ($null -ne $Text) { $el.InnerText = "$Text" }
    [void]$Parent.AppendChild($el)
    return $el
}

function Add-MiiComponent {
    param([System.Xml.XmlNode]$Settings, [string]$Name)
    $c = Add-MiiXmlElement $Settings 'component'
    foreach ($pair in @(@('name', $Name), @('processorArchitecture', 'amd64'), @('publicKeyToken', '31bf3856ad364e35'), @('language', 'neutral'), @('versionScope', 'nonSxS'))) {
        $c.SetAttribute($pair[0], $pair[1])
    }
    return $c
}

function New-MiiUnattendXml {
    <#
    .SYNOPSIS
        Builds a complete autounattend.xml for one planned Windows VM.
    .PARAMETER Vm
        A VM entry from a plan (build-plan.json "vms" item).
    .PARAMETER AdminCredential
        Local administrator. User name "Administrator" sets the built-in account; any other
        name creates a local account in Administrators (needed on client editions).
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][object]$Vm,
        [Parameter(Mandatory)][pscredential]$AdminCredential,
        [pscredential]$DomainJoinCredential,
        [securestring]$ProductKey,
        [string]$MacAddress,
        [switch]$IncludePostDeploy
    )

    $locale = if ($Vm.locale) { $Vm.locale } else { 'en-US' }
    $timeZone = if ($Vm.timeZone) { $Vm.timeZone } else { 'UTC' }
    $efi = ($Vm.firmware -ne 'bios')

    $doc = [System.Xml.XmlDocument]::new()
    [void]$doc.AppendChild($doc.CreateXmlDeclaration('1.0', 'utf-8', $null))
    $root = $doc.CreateElement('unattend', $script:UnattendNs)
    [void]$doc.AppendChild($root)
    $root.SetAttribute('xmlns:wcm', $script:WcmNs)

    # --- windowsPE -----------------------------------------------------------
    $pe = Add-MiiXmlElement $root 'settings'; $pe.SetAttribute('pass', 'windowsPE')
    $intl = Add-MiiComponent $pe 'Microsoft-Windows-International-Core-WinPE'
    $sui = Add-MiiXmlElement $intl 'SetupUILanguage'; [void](Add-MiiXmlElement $sui 'UILanguage' $locale)
    foreach ($n in 'InputLocale', 'SystemLocale', 'UILanguage', 'UserLocale') { [void](Add-MiiXmlElement $intl $n $locale) }

    $setup = Add-MiiComponent $pe 'Microsoft-Windows-Setup'
    $dc = Add-MiiXmlElement $setup 'DiskConfiguration'
    $disk = Add-MiiXmlElement $dc 'Disk' $null @{ action = 'add' }
    [void](Add-MiiXmlElement $disk 'DiskID' 0)
    [void](Add-MiiXmlElement $disk 'WillWipeDisk' 'true')
    $cps = Add-MiiXmlElement $disk 'CreatePartitions'
    $mps = Add-MiiXmlElement $disk 'ModifyPartitions'
    if ($efi) {
        $layout = @(
            @{ Type = 'EFI'; Size = 260; Format = 'FAT32'; Label = 'System' },
            @{ Type = 'MSR'; Size = 16 },
            @{ Type = 'Primary'; Extend = $true; Format = 'NTFS'; Label = 'Windows'; Letter = 'C' }
        )
        $installPartition = 3
    }
    else {
        $layout = @(
            @{ Type = 'Primary'; Size = 500; Format = 'NTFS'; Label = 'System'; Active = $true },
            @{ Type = 'Primary'; Extend = $true; Format = 'NTFS'; Label = 'Windows'; Letter = 'C' }
        )
        $installPartition = 2
    }
    for ($i = 0; $i -lt $layout.Count; $i++) {
        $p = $layout[$i]
        $cp = Add-MiiXmlElement $cps 'CreatePartition' $null @{ action = 'add' }
        [void](Add-MiiXmlElement $cp 'Order' ($i + 1))
        [void](Add-MiiXmlElement $cp 'Type' $p['Type'])
        if ($p['Extend']) { [void](Add-MiiXmlElement $cp 'Extend' 'true') } else { [void](Add-MiiXmlElement $cp 'Size' $p['Size']) }
        $mp = Add-MiiXmlElement $mps 'ModifyPartition' $null @{ action = 'add' }
        [void](Add-MiiXmlElement $mp 'Order' ($i + 1))
        [void](Add-MiiXmlElement $mp 'PartitionID' ($i + 1))
        if ($p['Format']) { [void](Add-MiiXmlElement $mp 'Format' $p['Format']) }
        if ($p['Label']) { [void](Add-MiiXmlElement $mp 'Label' $p['Label']) }
        if ($p['Letter']) { [void](Add-MiiXmlElement $mp 'Letter' $p['Letter']) }
        if ($p['Active']) { [void](Add-MiiXmlElement $mp 'Active' 'true') }
    }

    $ii = Add-MiiXmlElement $setup 'ImageInstall'
    $os = Add-MiiXmlElement $ii 'OSImage'
    if ($Vm.imageName -or $Vm.imageIndex) {
        $from = Add-MiiXmlElement $os 'InstallFrom'
        $md = Add-MiiXmlElement $from 'MetaData' $null @{ action = 'add' }
        if ($Vm.imageIndex) { [void](Add-MiiXmlElement $md 'Key' '/IMAGE/INDEX'); [void](Add-MiiXmlElement $md 'Value' $Vm.imageIndex) }
        else { [void](Add-MiiXmlElement $md 'Key' '/IMAGE/NAME'); [void](Add-MiiXmlElement $md 'Value' $Vm.imageName) }
    }
    $to = Add-MiiXmlElement $os 'InstallTo'
    [void](Add-MiiXmlElement $to 'DiskID' 0)
    [void](Add-MiiXmlElement $to 'PartitionID' $installPartition)

    $ud = Add-MiiXmlElement $setup 'UserData'
    [void](Add-MiiXmlElement $ud 'AcceptEula' 'true')
    [void](Add-MiiXmlElement $ud 'FullName' 'Operator')
    [void](Add-MiiXmlElement $ud 'Organization' 'Multi Install ISO')
    if ($ProductKey) {
        $pk = Add-MiiXmlElement $ud 'ProductKey'
        [void](Add-MiiXmlElement $pk 'Key' ([Net.NetworkCredential]::new('', $ProductKey).Password))
        [void](Add-MiiXmlElement $pk 'WillShowUI' 'OnError')
    }

    # --- specialize ----------------------------------------------------------
    $sp = Add-MiiXmlElement $root 'settings'; $sp.SetAttribute('pass', 'specialize')
    $shell = Add-MiiComponent $sp 'Microsoft-Windows-Shell-Setup'
    [void](Add-MiiXmlElement $shell 'ComputerName' $Vm.name)
    [void](Add-MiiXmlElement $shell 'TimeZone' $timeZone)

    if ($Vm.ip) {
        $identifier = if ($MacAddress) { $MacAddress.Replace(':', '-').ToUpperInvariant() } else { $Vm.interfaceAlias }
        $tcp = Add-MiiComponent $sp 'Microsoft-Windows-TCPIP'
        $ifs = Add-MiiXmlElement $tcp 'Interfaces'
        $if = Add-MiiXmlElement $ifs 'Interface' $null @{ action = 'add' }
        $v4 = Add-MiiXmlElement $if 'Ipv4Settings'
        [void](Add-MiiXmlElement $v4 'DhcpEnabled' 'false')
        [void](Add-MiiXmlElement $if 'Identifier' $identifier)
        $ips = Add-MiiXmlElement $if 'UnicastIpAddresses'
        [void](Add-MiiXmlElement $ips 'IpAddress' "$($Vm.ip)/$($Vm.prefixLength)" @{ action = 'add'; keyValue = '1' })
        if ($Vm.gateway) {
            $routes = Add-MiiXmlElement $if 'Routes'
            $route = Add-MiiXmlElement $routes 'Route' $null @{ action = 'add' }
            [void](Add-MiiXmlElement $route 'Identifier' 0)
            [void](Add-MiiXmlElement $route 'Prefix' '0.0.0.0/0')
            [void](Add-MiiXmlElement $route 'NextHopAddress' $Vm.gateway)
        }
        if (@($Vm.dns).Count -gt 0) {
            $dnsc = Add-MiiComponent $sp 'Microsoft-Windows-DNS-Client'
            $difs = Add-MiiXmlElement $dnsc 'Interfaces'
            $dif = Add-MiiXmlElement $difs 'Interface' $null @{ action = 'add' }
            [void](Add-MiiXmlElement $dif 'Identifier' $identifier)
            $order = Add-MiiXmlElement $dif 'DNSServerSearchOrder'
            $k = 1
            foreach ($server in @($Vm.dns)) { [void](Add-MiiXmlElement $order 'IpAddress' $server @{ action = 'add'; keyValue = "$k" }); $k++ }
            if ($Vm.domain) { [void](Add-MiiXmlElement $dif 'DNSDomain' $Vm.domain) }
        }
    }

    if ($Vm.domain -and $DomainJoinCredential) {
        $userName = $DomainJoinCredential.UserName
        $credDomain = $Vm.domain
        if ($userName -match '^([^\\]+)\\(.+)$') { $credDomain = $Matches[1]; $userName = $Matches[2] }
        $join = Add-MiiComponent $sp 'Microsoft-Windows-UnattendedJoin'
        $ident = Add-MiiXmlElement $join 'Identification'
        $creds = Add-MiiXmlElement $ident 'Credentials'
        [void](Add-MiiXmlElement $creds 'Domain' $credDomain)
        [void](Add-MiiXmlElement $creds 'Username' $userName)
        # UnattendedJoin has no encoded form; this is why answer media is ACL-restricted.
        [void](Add-MiiXmlElement $creds 'Password' $DomainJoinCredential.GetNetworkCredential().Password)
        [void](Add-MiiXmlElement $ident 'JoinDomain' $Vm.domain)
    }

    # --- oobeSystem ----------------------------------------------------------
    $oobe = Add-MiiXmlElement $root 'settings'; $oobe.SetAttribute('pass', 'oobeSystem')
    $intl2 = Add-MiiComponent $oobe 'Microsoft-Windows-International-Core'
    foreach ($n in 'InputLocale', 'SystemLocale', 'UILanguage', 'UserLocale') { [void](Add-MiiXmlElement $intl2 $n $locale) }

    $shell2 = Add-MiiComponent $oobe 'Microsoft-Windows-Shell-Setup'
    $ob = Add-MiiXmlElement $shell2 'OOBE'
    foreach ($n in 'HideEULAPage', 'HideOEMRegistrationScreen', 'HideOnlineAccountScreens', 'HideWirelessSetupInOOBE') { [void](Add-MiiXmlElement $ob $n 'true') }
    [void](Add-MiiXmlElement $ob 'ProtectYourPC' 3)

    $accounts = Add-MiiXmlElement $shell2 'UserAccounts'
    $adminName = $AdminCredential.UserName
    if ($adminName -match '\\(.+)$') { $adminName = $Matches[1] }
    if ($adminName -eq 'Administrator') {
        $ap = Add-MiiXmlElement $accounts 'AdministratorPassword'
        [void](Add-MiiXmlElement $ap 'Value' (ConvertTo-MiiUnattendPassword $AdminCredential.Password 'AdministratorPassword'))
        [void](Add-MiiXmlElement $ap 'PlainText' 'false')
    }
    else {
        $las = Add-MiiXmlElement $accounts 'LocalAccounts'
        $la = Add-MiiXmlElement $las 'LocalAccount' $null @{ action = 'add' }
        $lp = Add-MiiXmlElement $la 'Password'
        [void](Add-MiiXmlElement $lp 'Value' (ConvertTo-MiiUnattendPassword $AdminCredential.Password 'Password'))
        [void](Add-MiiXmlElement $lp 'PlainText' 'false')
        [void](Add-MiiXmlElement $la 'Group' 'Administrators')
        [void](Add-MiiXmlElement $la 'Name' $adminName)
        [void](Add-MiiXmlElement $la 'DisplayName' $adminName)
    }

    $commands = New-Object System.Collections.Generic.List[string[]]
    if ($IncludePostDeploy) {
        # Kept short: Windows Setup caps CommandLine at 1024 characters after encoding.
        $bootstrap = '$d=@(Get-PSDrive -PSProvider FileSystem|?{Test-Path "$($_.Root)mii\postdeploy.json"})[0];' +
            'if($d){& "$($d.Root)mii\PostDeploy.ps1" -ConfigPath "$($d.Root)mii\postdeploy.json"}' +
            'else{md C:\ProgramData\MultiInstallIso -Force|Out-Null;''answer media not found''>C:\ProgramData\MultiInstallIso\postdeploy-error.txt}'
        $commands.Add(@((ConvertTo-MiiEncodedCommand $bootstrap), 'Run PostDeploy.ps1 from the answer media'))
    }
    foreach ($cmd in @($Vm.postInstall)) {
        if ($cmd) { $commands.Add(@((ConvertTo-MiiEncodedCommand $cmd), 'Definition postInstall command')) }
    }

    if ($commands.Count -gt 0) {
        $auto = Add-MiiXmlElement $shell2 'AutoLogon'
        [void](Add-MiiXmlElement $auto 'Enabled' 'true')
        [void](Add-MiiXmlElement $auto 'LogonCount' 1)
        [void](Add-MiiXmlElement $auto 'Username' $adminName)
        $alp = Add-MiiXmlElement $auto 'Password'
        [void](Add-MiiXmlElement $alp 'Value' (ConvertTo-MiiUnattendPassword $AdminCredential.Password 'Password'))
        [void](Add-MiiXmlElement $alp 'PlainText' 'false')

        $flc = Add-MiiXmlElement $shell2 'FirstLogonCommands'
        $order = 1
        foreach ($c in $commands) {
            $sc = Add-MiiXmlElement $flc 'SynchronousCommand' $null @{ action = 'add' }
            [void](Add-MiiXmlElement $sc 'Order' $order)
            [void](Add-MiiXmlElement $sc 'CommandLine' $c[0])
            [void](Add-MiiXmlElement $sc 'Description' $c[1])
            [void](Add-MiiXmlElement $sc 'RequiresUserInput' 'false')
            $order++
        }
    }

    $settings = [System.Xml.XmlWriterSettings]::new()
    $settings.Indent = $true
    $settings.Encoding = [Text.UTF8Encoding]::new($false)
    $ms = [IO.MemoryStream]::new()
    $writer = [System.Xml.XmlWriter]::Create($ms, $settings)
    $doc.Save($writer)
    $writer.Dispose()
    return [Text.Encoding]::UTF8.GetString($ms.ToArray())
}

function New-MiiKickstart {
    <#
    .SYNOPSIS
        Builds a RHEL 8/9-family kickstart (Rocky, Alma, RHEL, CentOS Stream) that installs from the attached ISO.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][object]$Vm,
        [Parameter(Mandatory)][string]$RootPasswordHash
    )

    if ($RootPasswordHash -notmatch '^\$(6|5|y|2b)\$') {
        throw 'RootPasswordHash must be a crypt hash ($6$..., $y$...). Create one with: openssl passwd -6'
    }

    $tz = if ($Vm.timeZone -and $Vm.timeZone -match '/') { $Vm.timeZone } else { 'Etc/UTC' }
    $lang = $(if ($Vm.locale) { $Vm.locale } else { 'en-US' }).Replace('-', '_') + '.UTF-8'
    if ($Vm.ip) {
        $net = "network --device=link --bootproto=static --ip=$($Vm.ip) --netmask=$(ConvertTo-MiiNetmask $Vm.prefixLength)"
        if ($Vm.gateway) { $net += " --gateway=$($Vm.gateway)" }
        if (@($Vm.dns).Count -gt 0) { $net += " --nameserver=$(@($Vm.dns) -join ',')" }
        $net += " --hostname=$($Vm.name) --activate"
    }
    else {
        $net = "network --device=link --bootproto=dhcp --hostname=$($Vm.name) --activate"
    }

    $post = @($Vm.postInstall | Where-Object { $_ }) -join "`n"
    $lines = @(
        "# Generated by Multi Install ISO for $($Vm.name)"
        'text'
        'cdrom'
        "lang $lang"
        'keyboard us'
        "timezone $tz --utc"
        $net
        "rootpw --iscrypted $RootPasswordHash"
        'firewall --enabled --service=ssh'
        'selinux --enforcing'
        'services --enabled=sshd,chronyd'
        'zerombr'
        'clearpart --all --initlabel'
        'autopart --type=lvm'
        'reboot --eject'
        ''
        '%packages'
        '@^minimal-environment'
        '%end'
        ''
        '%post --log=/root/multi-install-iso-post.log'
        "echo 'Multi Install ISO kickstart completed for $($Vm.name)'"
        $post
        '%end'
    )
    return (($lines | Where-Object { $null -ne $_ }) -join "`n") + "`n"
}

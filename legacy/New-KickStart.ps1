#Linux builds (new territory)
<#
.SYNOPSIS
    Creates a kickstart file for unattended Linux installation.
.DESCRIPTION
    Uses a template file and replaces placeholders with provided values.
    If no template is given, a default minimal kickstart is generated.
.PARAMETER Path
    Output path for the kickstart file (e.g., ks.cfg).
.PARAMETER RootPasswordHash
    Hashed root password (use `openssl passwd -6` to generate).
.PARAMETER NetworkConfig
    Hash table with ip, netmask, gateway, dns.
.PARAMETER PartitionScheme
    String describing partitioning (e.g., "autopart --type=lvm").
.PARAMETER PackageGroups
    Array of package groups to install (e.g., "@core", "@web-server").
.PARAMETER PostInstallScripts
    Array of script lines to run after installation.
.PARAMETER TemplatePath
    Path to a custom kickstart template with placeholders like {{ROOT_PW_HASH}}.
.EXAMPLE
    $net = @{ip="192.168.1.100"; netmask="255.255.255.0"; gateway="192.168.1.1"; dns="8.8.8.8"}
    .\New-Kickstart.ps1 -Path /mnt/iso/ks.cfg -RootPasswordHash '$6$...' -NetworkConfig $net
#>

param(
    [Parameter(Mandatory)]
    [string]$Path,
    [string]$RootPasswordHash,
    [hashtable]$NetworkConfig,
    [string]$PartitionScheme = "autopart --type=lvm",
    [string[]]$PackageGroups = @("@core"),
    [string[]]$PostInstallScripts,
    [string]$TemplatePath
)

# Load template
if ($TemplatePath -and (Test-Path $TemplatePath)) {
    $template = Get-Content -Path $TemplatePath -Raw
} else {
    # Default minimal kickstart
    $template = @"
# Version = RHEL8
text
url --url="http://mirror.centos.org/centos/8/BaseOS/x86_64/os/"
lang en_US.UTF-8
keyboard us
timezone America/New_York --isUtc
rootpw --iscrypted {{ROOT_PW_HASH}}
{{NETWORK}}
services --enabled=sshd,NetworkManager,chronyd
{{PARTITION}}
%packages
{{PACKAGES}}
%end
%post --log=/root/post-install.log
{{POST}}
%end
reboot
"@
}

# Replace placeholders
$content = $template -replace '{{ROOT_PW_HASH}}', $RootPasswordHash

if ($NetworkConfig) {
    $netStr = "network --bootproto=static --ip=$($NetworkConfig.ip) --netmask=$($NetworkConfig.netmask) --gateway=$($NetworkConfig.gateway) --nameserver=$($NetworkConfig.dns) --hostname={{HOSTNAME}}"
} else {
    $netStr = "network --bootproto=dhcp"
}
$content = $content -replace '{{NETWORK}}', $netStr

$content = $content -replace '{{PARTITION}}', $PartitionScheme

$pkgStr = $PackageGroups -join "`n"
$content = $content -replace '{{PACKAGES}}', $pkgStr

$postStr = $PostInstallScripts -join "`n"
$content = $content -replace '{{POST}}', $postStr

# Save the file
$content | Set-Content -Path $Path -Encoding UTF8
Write-Host "Kickstart file written to $Path"

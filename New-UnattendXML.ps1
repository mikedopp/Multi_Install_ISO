Install-Module UnattendXmlBuilder -Scope CurrentUser

<#
.SYNOPSIS
    Creates an autounattend.xml file for unattended Windows installation.
.DESCRIPTION
    Generates a Windows answer file based on provided parameters.
    Uses the UnattendXmlBuilder module if available; otherwise builds a minimal XML.
.PARAMETER Path
    Full path where the autounattend.xml file will be saved.
.PARAMETER ProductKey
    Windows product key (optional for volume licensing).
.PARAMETER ComputerName
    Desired computer name. Use "*" for random name.
.PARAMETER LocalAdminPassword
    Password for the built-in Administrator account.
.PARAMETER JoinDomain
    Domain to join (e.g., "contoso.com").
.PARAMETER DomainAccount
    Account with permission to join the domain (DOMAIN\User).
.PARAMETER DomainPassword
    Password for the domain account.
.PARAMETER TimeZone
    Time zone name (run `tzutil /l` for list). Default "Pacific Standard Time".
.PARAMETER FirstLogonCommands
    Array of PowerShell commands to run on first logon.
.EXAMPLE
    .\New-UnattendXml.ps1 -Path C:\ISO\autounattend.xml -ProductKey ABC12-... -ComputerName WEBSRV01 -LocalAdminPassword 'P@ssw0rd'
#>

param(
    [Parameter(Mandatory)]
    [string]$Path,
    [string]$ProductKey,
    [string]$ComputerName = "*",
    [string]$LocalAdminPassword,
    [string]$JoinDomain,
    [string]$DomainAccount,
    [string]$DomainPassword,
    [string]$TimeZone = "Pacific Standard Time",
    [string[]]$FirstLogonCommands
)

# Try to use the UnattendXmlBuilder module
$moduleName = "UnattendXmlBuilder"
if (Get-Module -ListAvailable -Name $moduleName) {
    Import-Module $moduleName -Force
    Write-Verbose "Using $moduleName to build answer file."

    $builderParams = @{
        UiLanguage        = 'en-US'
        SystemLocale      = 'en-US'
        InputLocale       = 'en-US'
        TimeZone          = $TimeZone
        DiskTemplate      = 'UEFI'   # or 'BIOS' based on your environment
        SkipOOBE          = $true
    }
    if ($ProductKey) { $builderParams.ProductKey = $ProductKey }
    if ($LocalAdminPassword) {
        $builderParams.LocalUserToAdd = 'Administrator'
        $builderParams.LocalUserPassword = $LocalAdminPassword
    }

    $builder = New-UnattendBuilder @builderParams

    if ($ComputerName -and $ComputerName -ne '*') {
        $builder = $builder | Set-UnattendComputerName -ComputerName $ComputerName
    }

    if ($JoinDomain -and $DomainAccount -and $DomainPassword) {
        $securePass = ConvertTo-SecureString $DomainPassword -AsPlainText -Force
        $cred = New-Object System.Management.Automation.PSCredential ($DomainAccount, $securePass)
        $builder = $builder | Join-UnattendDomain -Domain $JoinDomain -Credential $cred
    }

    if ($FirstLogonCommands) {
        $builder = $builder | Add-UnattendFirstLogonCommand -Command $FirstLogonCommands
    }

    $builder | Export-UnattendFile -FilePath $Path
}
else {
    Write-Warning "$moduleName not installed. Generating minimal autounattend.xml manually."

    # Create XML document manually (simplified example)
    $xml = New-Object System.Xml.XmlDocument
    $xml.AppendChild($xml.CreateXmlDeclaration("1.0", "utf-8", "yes")) | Out-Null
    $unattend = $xml.CreateElement("unattend", "urn:schemas-microsoft-com:unattend")
    $xml.AppendChild($unattend) | Out-Null

    # Add basic settings (product key, disk configuration, etc.)
    # ... (omitted for brevity; production code would add all required components)

    $xml.Save($Path)
    Write-Host "Minimal autounattend.xml saved to $Path"
}

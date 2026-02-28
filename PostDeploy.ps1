# PostDeploy.ps1 – runs on the new VM
param(
    [string]$Roles,           # comma-separated list
    [string]$CodeRepo,
    [string]$AppPoolName,
    [string]$SiteName,
    [string]$AzureDevOpsPat
)

# Install NuGet and PSWindowsUpdate
Install-PackageProvider -Name NuGet -Force
Install-Module PSWindowsUpdate -Force

# Install Windows Updates (with auto-reboot)
Install-WindowsUpdate -AcceptAll -AutoReboot

# Install IIS if role contains "IIS"
if ($Roles -like "*IIS*") {
    Install-WindowsFeature -Name Web-Server, Web-Asp-Net45, Web-Mgmt-Console
}

# Install API prerequisites (Node.js, ASP.NET Core, etc.)
if ($Roles -like "*API*") {
    # Example: install Chocolatey, then Node.js
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    choco install nodejs -y
    # Or install .NET Core hosting bundle
}

# Clone code from Azure DevOps
$repoUrl = $CodeRepo -replace 'https://', "https://PAT:$AzureDevOpsPat@"
git clone $repoUrl C:\inetpub\wwwroot\$SiteName

# Configure IIS site (if IIS role)
if ($Roles -like "*IIS*") {
    Import-Module WebAdministration
    # Create app pool
    New-WebAppPool -Name $AppPoolName
    # Create site
    New-Website -Name $SiteName -PhysicalPath C:\inetpub\wwwroot\$SiteName -ApplicationPool $AppPoolName -Port 80
}

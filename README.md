# Multi_Install_ISO – Fresh VM Builder from ISO

**The engine that provisions brand‑new VMs from official Microsoft ISOs – no templates, no golden images, just pure automation.**

## 📖 Overview
This project automates the creation of Windows (and eventually Linux) virtual machines directly from installation media. It reads a declarative YAML definition, downloads the required ISO (if needed), generates an unattended answer file, creates the VM in vSphere, installs the OS, and finally applies post‑deployment configurations (Windows Updates, IIS/API roles, application code pull from Azure DevOps). All from scratch, every time.

**Perfect for**:
- Development teams needing fresh, consistent environments.
- Testing infrastructure code against a clean OS.
- Spinning up isolated clusters for chaotic experimentation.

---

## 🎯 Scenario – Saving Your Bonus
You need four Windows Servers by 5 PM:
- 2 × IIS servers (each hosting one site, one app pool)
- 2 × API servers (running C# or Node.js)

They must be fully patched and have the latest application code from Azure DevOps. Your bonus depends on delivering them on time.

With this tool, you define the servers in a simple YAML file, run one script, and watch as everything builds itself.

---

## 🔄 How It Works
1. **You define** each server in a YAML file (hostname, hardware, network, OS, roles, code repo).
2. **The script**:
   - Reads the YAML.
   - Ensures the required Windows ISO is available (downloads if missing).
   - Generates an `autounattend.xml` answer file for unattended installation.
   - Connects to vCenter and creates an empty VM with the specified resources.
   - Mounts the ISO and starts the VM.
   - After Windows setup, a post‑deployment script runs inside the VM to:
     - Install Windows Updates (via PSWindowsUpdate).
     - Enable IIS or API frameworks (Node.js, ASP.NET Core, etc.).
     - Clone the application code from Azure DevOps.
     - Configure IIS sites and application pools.
3. **By 5 PM**, your cluster is live, fully configured, and ready for the dev team to break.

---

## ✅ Requirements
### Infrastructure
- **vCenter Server** – with credentials that can create VMs.
- **Datastore & Network** – names must match those in your YAML.
- **ISO storage** – either a network share (UNC) or a local folder on the automation machine (the script can download ISOs to that folder).

### Automation Machine
- **PowerShell 5.1+** (Windows)
- **Internet access** (to download modules and, optionally, ISOs)
- **Access to vCenter** (network connectivity)
- **Azure DevOps Personal Access Token (PAT)** – with read access to your code repositories (used in post‑deployment).

### Required PowerShell Modules
```powershell
Install-Module -Name powershell-yaml -Force -Scope CurrentUser
Install-Module -Name VMware.PowerCLI -Force -Scope CurrentUser
Install-Module -Name UnattendXmlBuilder -Force -Scope CurrentUser   # for autounattend.xml


Optionally, for ISO downloads:

powershell
# Fido script is downloaded automatically by the helper script (not a module)
📁 Repository Structure
text
Multi_Install_ISO/
├── README.md
├── cluster-vms.yaml                # Your VM definitions
├── Build-Cluster.ps1                # Main provisioning script
├── New-UnattendXml.ps1               # Generates autounattend.xml
├── Get-WindowsISO.ps1                # Downloads Windows ISOs using Fido
└── PostDeploy.ps1                    # Script executed inside new VMs
🚀 Usage
1. Prepare Your YAML Definition
Create a file (e.g., cluster-vms.yaml) describing the servers. See the sample below.

2. Run the Build Script
powershell
# Store your Azure DevOps PAT securely
$env:AZURE_DEVOPS_PAT = "your-personal-access-token"

# Execute
.\Build-Cluster.ps1 -YamlPath .\cluster-vms.yaml -AzureDevOpsPat $env:AZURE_DEVOPS_PAT
You will be prompted for vCenter credentials. The script will then:

Download any missing ISOs (cached for later use).

Generate answer files.

Create and power on each VM.

3. Monitor Progress
Watch the console output.

In vCenter, verify VMs appear and start.

After first logon, check C:\PostDeploy.log on each VM for post‑installation details.

📄 Example YAML (cluster-vms.yaml)
yaml
vms:
  - vmname: "iis-web-01"
    description: "IIS frontend server 1"
    template: null                # null = fresh from ISO
    iso: "\\\\storage\\isos\\en_windows_server_2022_x64.iso"   # network path or local
    os: "windows2019Server64Guest"    # VMware GuestId
    cpu: 4
    ramGB: 8
    diskGB: 60
    datastore: "datastore1"
    network: "VM Network"
    ip: "192.168.10.11"
    subnet: "255.255.255.0"
    gateway: "192.168.10.1"
    dns: ["192.168.10.10", "8.8.8.8"]
    domain: "contoso.local"
    localAdminPassword: "P@ssw0rd"     # Use Azure KeyVault in production!
    roles: ["IIS"]                      # what to install after OS
    codeRepo: "https://dev.azure.com/yourorg/yourproject/_git/webapp"
    appPoolName: "MyWebApp"
    siteName: "MySite"

  - vmname: "iis-web-02"
    ip: "192.168.10.12"
    # ... other fields same as iis-web-01

  - vmname: "api-app-01"
    roles: ["API"]
    codeRepo: "https://dev.azure.com/yourorg/yourproject/_git/webapi"
    # ... hardware, network, etc.

  - vmname: "api-app-02"
    ip: "192.168.10.14"
    # ...
🔧 The Main Script (Build-Cluster.ps1)
Below is a simplified version. The full script includes error handling, logging, and parallel execution options.

powershell
param(
    [string]$YamlPath = ".\cluster-vms.yaml",
    [string]$VcenterServer = "vcenter.contoso.com",
    [PSCredential]$VcenterCredential,
    [string]$AzureDevOpsPat,
    [switch]$WhatIf
)

# Load modules
Import-Module powershell-yaml, VMware.PowerCLI, UnattendXmlBuilder -Force

# Connect to vCenter
if (-not $VcenterCredential) { $VcenterCredential = Get-Credential }
Connect-VIServer -Server $VcenterServer -Credential $VcenterCredential | Out-Null

$vms = (Get-Content $YamlPath -Raw | ConvertFrom-Yaml).vms

foreach ($vm in $vms) {
    Write-Host "Building $($vm.vmname)..." -ForegroundColor Cyan

    # 1. Ensure ISO exists
    $isoPath = $vm.iso
    # (download logic omitted for brevity)

    # 2. Generate autounattend.xml
    $unattendParams = @{
        Path               = "C:\Temp\autounattend_$($vm.vmname).xml"
        ComputerName       = $vm.vmname
        LocalAdminPassword = $vm.localAdminPassword
        JoinDomain         = $vm.domain
        DomainAccount      = "CONTOSO\svc-join"
        DomainPassword     = (Get-AzKeyVaultSecret ...)   # fetch securely
        FirstLogonCommands = @("powershell -File \\server\share\PostDeploy.ps1")
    }
    .\New-UnattendXml.ps1 @unattendParams

    # 3. Create VM
    $newVM = New-VM -Name $vm.vmname -VMHost (Get-Cluster "Production" | Get-VMHost | Get-Random) `
        -Datastore $vm.datastore -DiskGB $vm.diskGB -MemoryGB $vm.ramGB -NumCpu $vm.cpu `
        -GuestId $vm.os -NetworkName $vm.network -CD -Notes $vm.description -Location "DevCluster"

    # 4. Attach ISO and answer file (as floppy)
    New-CDDrive -VM $newVM -IsoPath $isoPath -StartConnected $true
    # (floppy creation with autounattend.xml omitted)

    # 5. Start VM
    Start-VM -VM $newVM
}
📝 Post‑Deployment Script (PostDeploy.ps1)
This script runs inside each new VM after Windows setup. It installs updates, roles, and application code.

powershell
# PostDeploy.ps1 (runs as LocalSystem)
param($Roles, $CodeRepo, $AppPoolName, $SiteName, $AzureDevOpsPat)

# Install Windows Updates
Install-Module PSWindowsUpdate -Force
Install-WindowsUpdate -AcceptAll -AutoReboot

if ($Roles -contains "IIS") {
    Install-WindowsFeature Web-Server, Web-Asp-Net45, Web-Mgmt-Console
    # Clone code using PAT
    $repo = $CodeRepo -replace 'https://', "https://PAT:$AzureDevOpsPat@"
    git clone $repo C:\inetpub\wwwroot\$SiteName
    # Create IIS site/app pool
    Import-Module WebAdministration
    New-WebAppPool -Name $AppPoolName
    New-Website -Name $SiteName -PhysicalPath C:\inetpub\wwwroot\$SiteName -ApplicationPool $AppPoolName -Port 80
}

if ($Roles -contains "API") {
    # Install Node.js via Chocolatey
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = 3072
    iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    choco install nodejs -y
    # Clone API code
    git clone $repo C:\api
    # Start service, etc.
}
🔐 Security Notes
Never store plaintext passwords in YAML files. Use Azure KeyVault, environment variables, or pipeline secrets.

The localAdminPassword and DomainPassword fields should be retrieved at runtime from a secure store.

Your Azure DevOps PAT should be passed as an environment variable or secure pipeline variable.

🧪 Future Enhancements
Linux support (kickstart files).

Kubernetes pod generation – transform the same YAML into pod specs.

Terraform integration – export definitions to HCL.

Parallel builds for faster cluster deployment.

🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

📜 License
MIT

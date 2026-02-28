# Multi_Install_ISO
The Engine or glue that pollutes vsphere with new servers. 

allows for Vm's to be spun up using Microsoft ISO's (The plan is to download "fresh" windows ISO's from MSDN or microsoft download.)
Place them in a datastore. We used VMware or Vsphere as the project was created with Vsphere in mind at the time. *This needs to be remediated"

Your automation (PowerShell script) reads the definition (YAML/JSON), then:

1. Connects to vCenter (if VMware). 

2. Creates an empty VM with the specified hardware. <- Pod or Teraform location

3. Mounts the ISO (from a network share or datastore). <- Network store for sure

4. Starts the VM, which boots from the ISO.

4. Performs an unattended installation using an answer file (e.g., autounattend.xml for Windows, kickstart for Linux) that you either inject via floppy or embed in the ISO. <- need to be added

5. Applies post‑install configurations (domain join, feature installation) via PowerShell remoting or guest customization.

6. For Kubernetes pods, the process is different: the definition is used to generate a pod spec and apply it to the cluster (via kubectl apply).

This approach gives you complete control over the OS and software from scratch—ideal for creating fresh, consistent environments for development or testing.



Scenario:
I am a noob (not far off) need to spin up a a cluster of windows servers. 
2 are API and two are IIS. both servers have 1 site 1 app pool 
Need to pull code from unnamed azure agent (that will be a step later discussed) to install the sites.
The issue is I need the cluster up, running and all updates installed for the Dev team by 5pm. 
They need access to break these two servers with horrible code, C#, and node.js. 
I need to make sure they get them and my bonus is on the line.
Steps to take..

Play-Book
1. Define your servers in YAML file (hardware, network, OS, Windows Server components)
2. Automate the build with... duh.. duh.. dun.. Powershell
3. Build reads the YAML you created
4. Downloads the Windows Server ISO (if not already in datastore/Network drive/Local drive)
5. Generates an autoattend.xml anwser for each VM
6. Since the original was build for VMware. Creates VM in Vcenter attaches ISO and start installation
7. After OS install, INstall windows updates and installs IIS/API roles and will pull Code from Azure Devops (can be taught to pull from any really)
8. Watch and pray

Requirements. 
vCenter access – credentials with rights to create VMs.
A datastore and network – names you'll use in the YAML.
Azure DevOps – a personal access token (PAT) with access to the repo containing your code.
A shared folder accessible from the new VMs (optional, for logs or scripts).
PowerShell 5.1+ on the machine where you'll run the automation (could be your local Windows machine, a jump box, or an Azure DevOps agent).

Module install requirments:
Install-Module -Name powershell-yaml -Force -Scope CurrentUser
Install-Module -Name VMware.PowerCLI -Force -Scope CurrentUser
Install-Module -Name UnattendXmlBuilder -Force -Scope CurrentUser   # for autounattend.xml

Sample of yaml needed (see cluster-vms.yaml)
<YAML>
vms:
  - vmname: "iis-web-01"
    description: "IIS frontend server 1"
    template: null                # null = fresh from ISO
    iso: "\\\\storage\\isos\\en_windows_server_2022_x64.iso"   # or let script download
    os: "windows2019Server64Guest"    # guest OS identifier
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
    localAdminPassword: "P@ssw0rd"     # in production, use Azure KeyVault!
    roles: ["IIS"]                      # what to install after OS
    codeRepo: "https://dev.azure.com/yourorg/yourproject/_git/webapp"
    appPoolName: "MyWebApp"
    siteName: "MySite"

  - vmname: "iis-web-02"
    # same as above, with different IP
    ip: "192.168.10.12"
    # ... (copy other fields)

  - vmname: "api-app-01"
    vmname: "api-app-01"
    roles: ["API"]                      # e.g., Node.js, ASP.NET Core
    codeRepo: "https://dev.azure.com/yourorg/yourproject/_git/webapi"
    # ... other hardware settings similar

  - vmname: "api-app-02"
    ip: "192.168.10.14"
    # ...
</YAML>

Build Cluster Script (see Build-CLuster.ps1)

<powershell>
param(
    [string]$YamlPath = ".\cluster-vms.yaml",
    [string]$VcenterServer = "vcenter.contoso.com",
    [PSCredential]$VcenterCredential,          # will prompt if missing
    [string]$AzureDevOpsPat,                    # pass as parameter or env var
    [string]$LocalAdminPassword,                 # fallback if not in YAML
    [switch]$WhatIf
)

# Load modules
Import-Module powershell-yaml -Force
Import-Module VMware.PowerCLI -Force
Import-Module UnattendXmlBuilder -Force

# Connect to vCenter
if (-not $VcenterCredential) {
    $VcenterCredential = Get-Credential -Message "Enter vCenter credentials"
}
Connect-VIServer -Server $VcenterServer -Credential $VcenterCredential | Out-Null

$yamlContent = Get-Content -Path $YamlPath -Raw
$definition = ConvertFrom-Yaml -Yaml $yamlContent
$vms = $definition.vms

foreach ($vm in $vms) {
    Write-Host "Processing $($vm.vmname)..." -ForegroundColor Cyan

    # 1. Ensure ISO exists (download if needed)
    $isoPath = $vm.iso
    if ($isoPath -match "^\\\\") {
        # network path – assume it's there
    } else {
        # you could call Get-WindowsISO.ps1 here
        # e.g., .\Get-WindowsISO.ps1 -Edition ServerStandard -OutPath C:\ISOs
    }

    # 2. Create autounattend.xml
    $unattendPath = "C:\Temp\autounattend_$($vm.vmname).xml"
    $params = @{
        Path               = $unattendPath
        ProductKey         = $vm.productKey   # optional, volume licensing may skip
        ComputerName       = $vm.vmname
        LocalAdminPassword = $vm.localAdminPassword
        JoinDomain         = $vm.domain
        DomainAccount      = "CONTOSO\svc-join"   # service account from KeyVault
        DomainPassword     = (Get-AzKeyVaultSecret ...)   # retrieve securely
        TimeZone           = "Eastern Standard Time"
        FirstLogonCommands = @(
            "powershell -ExecutionPolicy Bypass -File C:\PostDeploy.ps1"
        )
    }
    & .\New-UnattendXml.ps1 @params

    # 3. Create VM (using New-VM with splatting)
    $newVmParams = @{
        Name              = $vm.vmname
        VMHost            = (Get-Cluster "Production" | Get-VMHost | Get-Random)   # simple load balance
        Datastore         = $vm.datastore
        DiskGB            = $vm.diskGB
        MemoryGB          = $vm.ramGB
        NumCpu            = $vm.cpu
        GuestId           = $vm.os
        NetworkName       = $vm.network
        CD               = $true   # will attach ISO later
        Notes             = $vm.description
        Location          = "DevCluster"   # folder
    }
    if (-not $WhatIf) {
        $newVM = New-VM @newVmParams
        # Attach ISO and answer file (as floppy or secondary ISO)
        # For Windows, you can inject autounattend.xml via floppy drive:
        $floppyPath = "C:\Temp\$($vm.vmname).flp"
        # ... (use a tool to create floppy image with autounattend.xml)
        New-CDDrive -VM $newVM -IsoPath $isoPath -StartConnected $true
        # Also attach floppy if needed
        # Then start VM
        Start-VM -VM $newVM
    }
}
</powershell>

   

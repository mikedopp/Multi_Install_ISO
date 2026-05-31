# Multi Install ISO

Multi Install ISO provisions fresh virtual machines from installation media instead of templates or golden images. The current workflow reads a VM definition file, validates the build, writes a reviewable plan, generates install artifacts, and can then create vSphere VMs through VMware PowerCLI.

Start with the runbook:

- [Operator runbook](docs/RUNBOOK.md)
- [Prerequisites and install links](docs/PREREQUISITES.md)
- [Definition authoring guide](docs/DEFINITION_AUTHORING.md)
- [C# orchestrator mockup](docs/MOCKUP.md)
- [Audit notes](docs/AUDIT.md)

## What is included

```text
Build-Cluster.ps1                 Main orchestration entry point
cluster-vms.yaml                  Four-node IIS/API sample definition
local-vms.yml                     Single-node local sample definition
New-UnattendXML.ps1               Windows unattended install helper
Get-WindowsISO.ps1                Optional ISO download helper
PostDeploy.ps1                    Guest-side role and app deployment helper
Pod-Power.ps1                     Windows pod manifest generator
main.tf                           Optional Terraform/vSphere path
src/MultiInstallIso.Orchestrator  WinForms operator mockup
docs/RUNBOOK.md                   Step-by-step operating procedure
docs/PREREQUISITES.md             Download links, install locations, and verification commands
docs/DEFINITION_AUTHORING.md      YAML/JSON/CSV/Terraform/Kubernetes authoring guide
docs/MOCKUP.md                    UI and workflow mockup
templates/                        Starter YAML/JSON/CSV/tfvars/pod files
schemas/                          JSON schemas for capable editors
tools/definition_helper.py        Python definition validator/converter/template helper
```

## Prerequisites

```powershell
Install-Module powershell-yaml -Scope CurrentUser -Force
Install-Module VMware.PowerCLI -Scope CurrentUser -Force
Install-Module UnattendXmlBuilder -Scope CurrentUser -Force
```

Also install Git and the .NET 8 SDK if you want to build the C# app.

## Safe quick start

Generate a plan without touching vCenter:

```powershell
.\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -PlanOnly
```

Preview vCenter actions:

```powershell
$cred = Get-Credential -Message 'vCenter credential'

.\Build-Cluster.ps1 `
  -DefinitionPath .\cluster-vms.yaml `
  -VcenterServer vcsa.contoso.local `
  -VcenterCluster Production `
  -VcenterCredential $cred `
  -WhatIf
```

Build the C# orchestrator:

```powershell
dotnet build .\src\MultiInstallIso.Orchestrator\MultiInstallIso.Orchestrator.csproj --configuration Release
```

Run the app:

```powershell
.\src\MultiInstallIso.Orchestrator\bin\Release\net8.0-windows\MultiInstallIso.Orchestrator.exe
```

## Definition format

Minimum YAML shape:

```yaml
vms:
  - vmname: "iis-web-01"
    iso: '\\storage\isos\en_windows_server_2022_x64.iso'
    os: "windows2019Server64Guest"
    cpu: 4
    ramGB: 8
    diskGB: 60
    datastore: "datastore1"
    network: "VM Network"
```

Use `cluster-vms.yaml` as the fuller four-node example.

For new definitions, open the C# app and use the `Definition Editor` tab. It includes templates, format tips, JSON formatting, and validation for PowerCLI VM definitions, Terraform tfvars, and Kubernetes pod definitions.

Template files are available in `templates/`:

- `powercli-vms.yaml`
- `powercli-vms.json`
- `powercli-vms.csv`
- `terraform.tfvars.json`
- `kubernetes-pods.json`

## Security notes

- Do not store passwords, PATs, or domain join credentials in YAML/JSON files.
- Use `AZURE_DEVOPS_PAT`, Key Vault, SecretManagement, secure pipeline variables, or interactive credentials.
- `PostDeploy.ps1` uses a temporary Git askpass helper so the PAT is not inserted into the repository URL.
- Review `artifacts\<timestamp>\build-plan.json` before removing `-PlanOnly`.

## Current limits

- ISO/floppy answer-file attachment is environment dependent and may need site-specific handling.
- Terraform support is a secondary path and still requires real vSphere variables or environment-provided credentials.
- The legacy `Multi_Install_ISO` CSV script remains for compatibility, but `Build-Cluster.ps1` is the preferred entry point.

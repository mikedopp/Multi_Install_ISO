# Multi Install ISO Runbook

This runbook is the safe operating path for building fresh VMs from ISO media.
Start with planning commands. Do not run provisioning until the generated plan has been reviewed.

## 1. Prepare the operator workstation

Run from a Windows machine that can reach vCenter, the datastore ISO path, DNS, and the target guest networks.

Required tools:

```powershell
Install-Module powershell-yaml -Scope CurrentUser -Force
Install-Module VMware.PowerCLI -Scope CurrentUser -Force
Install-Module UnattendXmlBuilder -Scope CurrentUser -Force
git --version
dotnet --info
```

Optional tools:

```powershell
terraform version
winget --version
py -3 --version
```

Download links, install locations, and verification commands are collected in `docs/PREREQUISITES.md`.

## 2. Choose the definition file

Use `cluster-vms.yaml` for the four-node IIS/API scenario, or create a new YAML/JSON/CSV file with these minimum fields:

- `vmname`
- `os`
- `cpu`
- `ramGB`
- `diskGB`
- `datastore`
- `network`
- `iso` or `edition`

Keep passwords and tokens out of definition files. Use environment variables, secure pipeline variables, Key Vault, SecretManagement, or a credential prompt.

For a walkthrough of YAML, JSON, CSV, Terraform tfvars, and Kubernetes pod inputs, see `docs/DEFINITION_AUTHORING.md`. The C# app also includes a `Definition Editor` tab with starter templates and validation tips.

## 3. Run the repository audit

From the C# app, use `Audit > Audit Repository`.

From PowerShell:

```powershell
dotnet build .\src\MultiInstallIso.Orchestrator\MultiInstallIso.Orchestrator.csproj --configuration Release
```

Then check parser/data health:

```powershell
$files = Get-ChildItem -File | Where-Object { $_.Extension -eq '.ps1' -or $_.Name -eq 'Multi_Install_ISO' }
foreach ($file in $files) {
  $tokens = $null
  $errors = $null
  [System.Management.Automation.Language.Parser]::ParseFile($file.FullName, [ref]$tokens, [ref]$errors) | Out-Null
  if ($errors) { $errors | ForEach-Object { "$($file.Name):$($_.Extent.StartLineNumber): $($_.Message)" } }
}
```

## 4. Edit and validate the definition

In the C# app:

1. Go to `Definition Editor`.
2. Pick `PowerCLI YAML`, `PowerCLI JSON`, `PowerCLI CSV`, `Terraform tfvars JSON`, or `Kubernetes pods JSON`.
3. Use `Insert Template` for a clean starter.
4. Edit values.
5. Use `Validate`.
6. Save the file.

For PowerCLI VM definitions, also use the `VM Definition` tab to preview the rows.

## 5. Create a build plan

This is the default safe command:

```powershell
.\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -PlanOnly
```

The script writes:

```text
artifacts\<timestamp>\build-plan.json
```

Review every VM for:

- correct VM name and guest ID
- datastore and network names that exist in vCenter
- reachable ISO path
- CPU, memory, and disk sizing
- roles and repo destinations
- missing validation issues

## 6. Preview vCenter actions

Use `-WhatIf` before provisioning:

```powershell
$cred = Get-Credential -Message 'vCenter credential'

.\Build-Cluster.ps1 `
  -DefinitionPath .\cluster-vms.yaml `
  -VcenterServer vcsa.contoso.local `
  -VcenterCluster Production `
  -VcenterCredential $cred `
  -WhatIf
```

This should show the artifact and vCenter actions without creating VMs.

## 7. Generate install artifacts only

For answer-file testing without vCenter provisioning:

```powershell
$localAdmin = Read-Host 'Local Administrator password' -AsSecureString

.\Build-Cluster.ps1 `
  -DefinitionPath .\cluster-vms.yaml `
  -LocalAdminPassword $localAdmin `
  -SkipVCenter
```

Confirm the `autounattend_*.xml` files exist under `artifacts\<timestamp>`.

## 8. Provision the VMs

Only run this after the plan and `-WhatIf` output are correct:

```powershell
$cred = Get-Credential -Message 'vCenter credential'
$localAdmin = Read-Host 'Local Administrator password' -AsSecureString

.\Build-Cluster.ps1 `
  -DefinitionPath .\cluster-vms.yaml `
  -VcenterServer vcsa.contoso.local `
  -VcenterCluster Production `
  -VcenterCredential $cred `
  -LocalAdminPassword $localAdmin
```

Watch the console and vCenter tasks. The script creates empty VMs, attaches the ISO, sets the network adapter to VMXNET3 when available, optionally adds a second disk, and powers on each VM unless `-NoPowerOn` is supplied.

## 9. Post-deployment

Inside a VM, the post-deploy script can install roles and clone code:

```powershell
$env:AZURE_DEVOPS_PAT = '<secure runtime token>'

.\PostDeploy.ps1 `
  -Roles IIS `
  -CodeRepo 'https://dev.azure.com/yourorg/yourproject/_git/webapp' `
  -AppPoolName WebAppPool `
  -SiteName WebSite
```

For API nodes that need Node.js:

```powershell
.\PostDeploy.ps1 -Roles API -CodeRepo '<repo-url>' -SiteName ApiService -AllowPackageInstall
```

Windows Update is opt-in:

```powershell
.\PostDeploy.ps1 -Roles IIS -InstallUpdates -AutoReboot
```

Logs are written to:

```text
C:\PostDeploy.log
```

## 10. Validate completion

Check:

- all VMs are powered on in vCenter
- VM console reaches Windows setup or first boot
- DNS/IP assignments match the definition
- `C:\PostDeploy.log` has no terminating errors
- IIS nodes respond on port 80
- API nodes have the expected runtime and code checkout

## 11. Rollback

If the build fails before OS install:

1. Power off failed VMs.
2. Remove only VMs created by the reviewed build plan.
3. Keep `artifacts\<timestamp>\build-plan.json` for diagnosis.
4. Fix the definition or infrastructure mismatch.
5. Re-run `-PlanOnly` and `-WhatIf`.

Do not delete unrelated VMs or datastores from automation scripts.

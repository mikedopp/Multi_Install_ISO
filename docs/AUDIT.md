# Pre-build Audit

Date: 2026-05-31

## Fixed before app build

- `New-UnattendXML.ps1` had `Install-Module` before the `param` block, which caused the PowerShell parser to treat the parameter block as normal code. The install check now runs after parameters are bound.
- `Pod-Power.ps1` referenced `pods.json`, but the repository ships `windows-pods.json`. The script now accepts a `-Path` parameter and defaults to `windows-pods.json`.
- `vms.json`, `windows-pods.json`, `local-vms-handleExternal.json`, and `terraform.tfvars.json` contained `#` comments, which made them invalid for strict JSON parsers. Those comments were removed.
- `Build-Cluster.ps1` was added as the real dry-run-capable orchestration entry point.
- `cluster-vms.yaml` was added as the four-node IIS/API sample definition.
- `PostDeploy.ps1` no longer places the Azure DevOps PAT into the git remote URL and no longer bootstraps Chocolatey through `iex`.
- `README.md` and `Yaml-Azure-Pipeline.yml` were updated to reference the current entry point.

## Remaining operational risks

- `Multi_Install_ISO` still depends on machine-specific paths such as `\MikeD\PowerCli_Associated_Files\ISODeploy\Vcenter.psm1` and `\Secure\admin0.json`. The orchestrator can launch it, but portability will improve if these become parameters or documented prerequisites.
- `PostDeploy.ps1` can install packages and Windows Updates, but those behaviors are opt-in. Use controlled package sources in production.
- `main.tf` is structurally complete, but Terraform still needs real vSphere values or environment-provided credentials.
- `Get-WindowsISO.ps1` downloads Fido from GitHub at runtime. For repeatable builds, pin a commit and validate the downloaded script.
- Answer-file attachment to a VM is environment specific. `Build-Cluster.ps1` generates artifacts, but ISO/floppy attachment details may need local vSphere datastore conventions.

## Verification

- PowerShell parser check passed for all `.ps1` files and the legacy `Multi_Install_ISO` script.
- Strict JSON conversion passed for all top-level `.json` files.
- `dotnet build src\MultiInstallIso.Orchestrator\MultiInstallIso.Orchestrator.csproj --configuration Release` completed with 0 warnings and 0 errors.

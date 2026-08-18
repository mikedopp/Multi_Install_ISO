# Multi Install ISO

Plan, validate, and eventually provision fresh vSphere virtual machines from installation media without depending on templates or golden images.

> **Current status: DEVELOPMENT / NO-GO FOR PROVISIONING**
>
> Planning is the only approved workflow. Do not use the current repository to create VMs until the apply gates in the [implementation plan](docs/IMPLEMENTATION_PLAN.md) are complete and verified in non-production.

## Current capability

| Capability | Status | Evidence or limitation |
| --- | --- | --- |
| PowerShell parsing | Working | All current PowerShell files parse successfully. |
| JSON planning | Working | `Build-Cluster.ps1 -PlanOnly` produces a reviewable plan. |
| YAML planning | Working | Supports `powershell-yaml` hashtables and the built-in simple reader. |
| C# prototype build | Working | The current WinForms prototype builds on .NET 8. It is not the target operator app. |
| ISO acquisition | Not ready | The existing helper resolves a URL but does not complete and verify the ISO download. |
| Unattended media attachment | Not ready | Answer-file generation is not yet attached to a vSphere VM. |
| VM provisioning | Locked | Apply remains out of service until immutable plans, confirmations, receipts, and non-production proof exist. |
| Published operator app | Not ready | No self-contained release or published smoke proof exists yet. |

## Safe quick start

Requirements:

- PowerShell 7: `pwsh.exe`
- `powershell-yaml` for full YAML support
- Git for repository operations
- .NET 8 SDK for the current C# prototype

Create a plan without contacting vCenter:

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 `
  -DefinitionPath .\cluster-vms.yaml `
  -PlanOnly
```

The command writes a plan under:

```text
artifacts\<timestamp>\build-plan.json
```

Review the VM names, guest IDs, datastores, networks, ISO paths, sizing, roles, and reported issues. `PlanOnly` does not prove those objects exist in vCenter.

## Intended operator workflow

```mermaid
flowchart LR
    A["Definition file"] --> B["Parse and validate"]
    B --> C["Write immutable plan"]
    C --> D["Read-only vCenter preflight"]
    D --> E["Exact apply confirmation"]
    E --> F["Provision one VM at a time"]
    F --> G["Write per-VM receipt and final summary"]
```

The implementation is being built in gated phases. See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md) for scope, acceptance criteria, and the current work item.

## Definition format

The preferred YAML shape is:

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

Supported planning inputs:

- YAML: `cluster-vms.yaml`
- JSON: `templates/powercli-vms.json`
- CSV: `templates/powercli-vms.csv`
- Terraform tfvars: `templates/terraform.tfvars.json`
- Kubernetes pod definitions: `templates/kubernetes-pods.json`

See [docs/DEFINITION_AUTHORING.md](docs/DEFINITION_AUTHORING.md) for field-level guidance.

## Repository map

| Path | Purpose |
| --- | --- |
| `Build-Cluster.ps1` | Current plan and provisioning entry point |
| `cluster-vms.yaml` | Four-node planning sample |
| `tests/` | Offline regression tests; no vCenter writes |
| `src/MultiInstallIso.Orchestrator/` | Existing .NET 8 WinForms prototype |
| `schemas/` | JSON schemas for supported definition types |
| `templates/` | Starter definition files |
| `docs/RUNBOOK.md` | Current operator procedure |
| `docs/IMPLEMENTATION_PLAN.md` | Gated rebuild plan and acceptance criteria |
| `docs/AUDIT.md` | Historical audit notes; not current runtime proof |

## Security boundaries

- Do not store passwords, PATs, product keys, or domain-join credentials in definition files.
- Do not pass secrets through free-form command arguments or copy them into logs.
- Generated answer files must be treated as sensitive, access-controlled artifacts with a defined cleanup lifecycle.
- Downloaded scripts, ISOs, modules, and providers must be pinned and verified before execution.
- `PlanOnly`, parser success, and a successful C# build do not authorize infrastructure writes.

## Current prototype

Build the existing WinForms prototype for inspection:

```powershell
dotnet build .\src\MultiInstallIso.Orchestrator\MultiInstallIso.Orchestrator.csproj `
  --configuration Release
```

This proves compilation only. The target application will be a WPF/WebView2 operator shell with typed bridge messages, dependency and credential status, immutable plan review, guarded apply, redacted diagnostics, and a self-contained `win-x64` release.

## Documentation

- [Implementation plan](docs/IMPLEMENTATION_PLAN.md)
- [Operator runbook](docs/RUNBOOK.md)
- [Prerequisites](docs/PREREQUISITES.md)
- [Definition authoring](docs/DEFINITION_AUTHORING.md)
- [Existing UI mockup](docs/MOCKUP.md)
- [Historical audit notes](docs/AUDIT.md)

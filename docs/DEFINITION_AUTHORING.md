# Definition Authoring Guide

This guide explains how to create the input files used by the PowerCLI, Terraform, and Kubernetes paths.
Use YAML when you want readable hand-edited build files, JSON when you want strict machine-friendly files, and CSV when you want fast spreadsheet bulk edits.

## Quick choice

| Format | Best for | Watch out for |
| --- | --- | --- |
| YAML | Human-edited PowerCLI VM definitions | Spaces matter; no tabs |
| JSON | Strict VM definitions, Terraform tfvars, Kubernetes pods | No comments; escape backslashes |
| CSV | Fast bulk PowerCLI VM edits | One flat row per VM; quote values with commas |

## PowerCLI VM builds

PowerCLI builds are driven by `Build-Cluster.ps1`.

Safe validation command:

```powershell
.\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -PlanOnly
```

Required fields:

| Field | YAML/JSON name | CSV column | Example |
| --- | --- | --- | --- |
| VM name | `vmname` or `name` | `vmname` | `iis-web-01` |
| Guest OS | `os`, `guest_id`, or `GuestIDOS` | `os` | `windows2019Server64Guest` |
| CPU | `cpu`, `num_cpus`, or `NumCPU` | `cpu` | `4` |
| Memory | `ramGB`, `memory`, or `OSRamSize` | `ramGB` | `8` |
| Disk | `diskGB`, `disk_size`, or `OSDiskSize` | `diskGB` | `60` |
| Datastore | `datastore` | `datastore` | `datastore1` |
| Network | `network`, `NetworkName`, or `vlan` | `network` | `VM Network` |

Helpful optional fields:

| Field | Purpose |
| --- | --- |
| `iso` | ISO path for fresh install media |
| `edition` | Used by ISO helper if ISO is not supplied |
| `ip`, `subnet`, `gateway`, `dns` | Guest networking intent |
| `domain` | Domain join intent |
| `roles` | Post-deploy role hints such as `IIS` or `API` |
| `codeRepo` | App repo for guest-side post deploy |
| `appPoolName`, `siteName` | IIS post-deploy settings |
| `SecondDiskSize` | Optional second vSphere disk size in GB |
| `vmhost`, `folder` | vSphere placement hints |

### YAML example

```yaml
vms:
  - vmname: "iis-web-01"
    description: "IIS frontend server 1"
    iso: '\\storage\isos\en_windows_server_2022_x64.iso'
    os: "windows2019Server64Guest"
    cpu: 4
    ramGB: 8
    diskGB: 60
    datastore: "datastore1"
    network: "VM Network"
    ip: "192.168.10.11"
    subnet: "255.255.255.0"
    gateway: "192.168.10.1"
    dns: ["192.168.10.10", "8.8.8.8"]
    roles: ["IIS"]
```

YAML rules that save pain:

- Use two spaces per indentation level.
- Do not use tabs.
- Every VM starts with `- vmname:` under `vms:`.
- Quote Windows paths with single quotes.
- Keep arrays on one line for the built-in lightweight reader: `roles: ["IIS", "API"]`.
- Do not put secrets in the file.

Common YAML oops:

```yaml
# Bad: tabs or inconsistent indentation
vms:
   - vmname: "web01"
      cpu: 4

# Bad: missing space after dash
vms:
  -vmname: "web01"

# Better
vms:
  - vmname: "web01"
    cpu: 4
```

### JSON example

```json
{
  "vms": [
    {
      "vmname": "iis-web-01",
      "iso": "\\\\storage\\isos\\en_windows_server_2022_x64.iso",
      "os": "windows2019Server64Guest",
      "cpu": 4,
      "ramGB": 8,
      "diskGB": 60,
      "datastore": "datastore1",
      "network": "VM Network",
      "roles": ["IIS"]
    }
  ]
}
```

JSON rules:

- No `#` comments.
- Every property except the last one needs a comma after it.
- UNC paths need escaped backslashes: `\\\\server\\share\\file.iso`.
- Use the app's `Format JSON` button after pasting.

### CSV example

```csv
vmname,iso,os,cpu,ramGB,diskGB,datastore,network,ip,subnet,gateway,dns,roles
iis-web-01,\\storage\isos\en_windows_server_2022_x64.iso,windows2019Server64Guest,4,8,60,datastore1,VM Network,192.168.10.11,255.255.255.0,192.168.10.1,192.168.10.10,IIS
```

CSV rules:

- The first row must be the header.
- Do not put comments before the header.
- Quote values that contain commas.
- CSV is intentionally flat; use YAML or JSON if you need richer arrays.

## Terraform vSphere builds

Terraform uses `terraform.tfvars.json` and `main.tf`. It is separate from `Build-Cluster.ps1`.

Required VM fields:

| Terraform field | Meaning | Unit |
| --- | --- | --- |
| `name` | VM name | text |
| `num_cpus` | CPU count | count |
| `memory` | Memory | MB |
| `disk_size` | Disk size | GB |
| `datastore` | vSphere datastore name | text |
| `network` | vSphere network/portgroup name | text |
| `guest_id` | vSphere guest ID | text |
| `iso_path` | Datastore ISO path | `[datastore] folder/file.iso` |

Example:

```json
{
  "vsphere_server": "vcenter.contoso.local",
  "allow_unverified_ssl": true,
  "datacenter": "Datacenter",
  "cluster": "Cluster",
  "folder": "vm/dev",
  "vms": [
    {
      "name": "tf-web-01",
      "num_cpus": 2,
      "memory": 4096,
      "disk_size": 50,
      "datastore": "datastore1",
      "network": "VM Network",
      "guest_id": "windows2019Server64Guest",
      "iso_path": "[datastore1] ISOs/en_windows_server_2022.iso",
      "firmware": "efi"
    }
  ]
}
```

Do not store `vsphere_user` or `vsphere_password` in the file. Prefer `TF_VAR_vsphere_user` and `TF_VAR_vsphere_password`.

## Kubernetes Windows pod builds

Kubernetes pod JSON is consumed by `Pod-Power.ps1`.

Command:

```powershell
.\Pod-Power.ps1 -Path .\windows-pods.json
```

Required pod fields:

| Field | Meaning |
| --- | --- |
| `name` | Pod and container name |
| `image` | Container image |

Helpful fields:

| Field | Meaning |
| --- | --- |
| `ports` | `containerPort` and optional `hostPort` |
| `env` | Environment variables |
| `volumes` | Host path volume definitions |

Example:

```json
{
  "pods": [
    {
      "name": "win-webserver",
      "image": "mcr.microsoft.com/windows/servercore/iis:windowsservercore-ltsc2019",
      "ports": [
        { "containerPort": 80, "hostPort": 8080 }
      ],
      "env": [
        { "name": "ASPNETCORE_ENVIRONMENT", "value": "Development" }
      ],
      "volumes": [
        { "name": "data", "hostPath": { "path": "C:\\data" } }
      ]
    }
  ]
}
```

Kubernetes oops:

- Windows containers need Windows nodes.
- JSON Windows paths need escaped backslashes.
- `hostPort` is optional and can create scheduling conflicts.

## Editor workflow

1. Open the C# orchestrator.
2. Go to `Definition Editor`.
3. Pick a template type.
4. Use `Insert Template`.
5. Edit values.
6. Use `Validate`.
7. Use `Save As`.
8. Run `Build cluster plan only` or the matching Terraform/Kubernetes command.

Templates are also available under `templates/`, and JSON schemas are under `schemas/` for editors that support schema validation.

## Python helper

Python is optional, but handy for operators who want command-line validation and conversions outside the C# app.

Create a repo-local virtual environment:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-python.txt
```

Validate a file:

```powershell
.\.venv\Scripts\python.exe .\tools\definition_helper.py validate .\cluster-vms.yaml
```

Format JSON:

```powershell
.\.venv\Scripts\python.exe .\tools\definition_helper.py format-json .\terraform.tfvars.json --write
```

Convert CSV to JSON:

```powershell
.\.venv\Scripts\python.exe .\tools\definition_helper.py convert .\templates\powercli-vms.csv .\artifacts\powercli-vms.json --target json
```

Create a starter template:

```powershell
.\.venv\Scripts\python.exe .\tools\definition_helper.py template --type powercli-yaml --output .\artifacts\new-cluster.yaml
```

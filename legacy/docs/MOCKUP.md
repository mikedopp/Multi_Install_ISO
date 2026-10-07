# Orchestrator Mockup

The C# app is a dark-mode desktop control surface for the PowerShell, Python, Terraform, and Kubernetes workflow.
It should make the operator move through audit, plan, preview, and provision instead of jumping straight into infrastructure changes.

## Primary window

```text
+--------------------------------------------------------------------------------+
| Multi Install ISO Orchestrator                                                   |
+--------------------------------------------------------------------------------+
| Project [F:\mikedopp\Drop\Multi_Install_ISO____________________] [Browse] [Open] |
| Definition [cluster-vms.yaml____________________________________] [Browse]       |
| Artifacts  [artifacts___________________________________________]                |
+--------------------------------------------------------------------------------+
| Prerequisites | Audit | VM Definition | Definition Editor | Runbook             |
+--------------------------------------------------------------------------------+
```

Markdown guides open in a dark in-app reader instead of Notepad.

## Prerequisites tab

```text
+--------------------------------------------------------------------------------+
| [Check Prereqs] [Open Prereq Guide] [Open Selected Link]                         |
+--------------------------------------------------------------------------------+
| Name          | Used by       | Install target              | Verify           |
| .NET 8 SDK    | C# app        | C:\Program Files\dotnet     | dotnet --info    |
| Python 3      | Python helper | py.exe on PATH / .venv      | py -3 --version  |
| Terraform     | Terraform     | terraform.exe on PATH       | terraform version|
+--------------------------------------------------------------------------------+
```

Operator outcome:

- See what needs to be installed.
- See where it should land on disk or PATH.
- Open official download/install links directly from the app.

## Audit tab

```text
+--------------------------------------------------------------------------------+
| [Audit Repository] [Check Prereqs] [Open Finding]                                |
+--------------------------------------------------------------------------------+
| Severity | File                 | Line | Message               | Detail          |
| Warning  | PostDeploy.ps1       | 109  | PAT handling review   | Uses askpass... |
| Info     | Build-Cluster.ps1    |      | Plan entry point OK   |                 |
+--------------------------------------------------------------------------------+
```

Operator outcome:

- Know whether scripts parse.
- Know whether JSON definitions are strict.
- See missing tooling before a build window starts.
- Open the exact file that needs attention.

## VM Definition tab

```text
+--------------------------------------------------------------------------------+
| [Validate Definition] [Open Definition]                                          |
+--------------------------------------------------------------------------------+
| vmname     | os                      | cpu | ramGB | diskGB | datastore | ip     |
| iis-web-01 | windows2019Server64Guest| 4   | 8     | 60     | datastore1| ...    |
| api-app-01 | windows2019Server64Guest| 4   | 8     | 60     | datastore1| ...    |
+--------------------------------------------------------------------------------+
| Warning: api-app-02 is missing network.                                          |
+--------------------------------------------------------------------------------+
```

Operator outcome:

- Preview the cluster before running PowerShell.
- Catch missing size/network/datastore fields early.
- Keep secrets out of the preview grid.

## Definition Editor tab

```text
+--------------------------------------------------------------------------------+
| [PowerCLI YAML v] [Load Current] [Insert Template] [Validate] [Format JSON]      |
| [Save] [Save As] [Open Guide]                                                    |
+--------------------------------------------------------------------------------+
| vms:                                      | YAML CHEAT SHEET                     |
|   - vmname: "iis-web-01"                  | Use two spaces per indent.           |
|     os: "windows2019Server64Guest"        | Do not use tabs.                     |
|     cpu: 4                                | Quote Windows paths.                 |
|     ramGB: 8                              | Required: vmname, os, cpu...         |
+--------------------------------------------------------------------------------+
| 1 VM/pod row(s) detected. 0 issue(s).                                           |
+--------------------------------------------------------------------------------+
```

Operator outcome:

- Beginners get starter templates and format tips.
- Experts can paste a quick JSON/CSV/tfvars file and validate it.
- YAML mistakes are caught before the build plan step.
- Kubernetes pod JSON and Terraform tfvars are supported alongside PowerCLI definitions.
- Python validation/conversion commands are available for command-line users.

## Runbook tab

```text
+--------------------------------------------------------------------------------+
| Runbook Steps                                                                    |
| 1 Audit repository             Ready                                             |
| 2 Check prerequisites          Ready                                             |
| 3 Validate definition          Ready                                             |
| 4 Build plan                   Safe                                              |
| 5 Preview vCenter actions      Safe                                              |
| 6 Generate artifacts           Writes files                                      |
| 7 Provision VMs                Creates infrastructure                            |
| 8 Post-deploy verification     Manual/guest                                      |
+--------------------------------------------------------------------------------+
| Command [Build cluster plan only                 v]                              |
| vCenter [vcsa.contoso.local________] Cluster [Production________]                 |
| Extra args [____________________________________________________]                 |
| [x] Preview command only                                                         |
+--------------------------------------------------------------------------------+
```

Operator outcome:

- The safest command is selected by default.
- Provisioning is explicit and visible.
- Extra arguments remain available for advanced runs without hiding the command.

## Command model

The app launches existing repo tools:

- `Build-Cluster.ps1 -PlanOnly`
- `Build-Cluster.ps1 -WhatIf`
- `Build-Cluster.ps1` for reviewed provisioning
- `New-UnattendXML.ps1`
- `Get-WindowsISO.ps1`
- `terraform init`
- `terraform plan`
- `py -3 tools/definition_helper.py validate`
- `py -3 tools/definition_helper.py convert`

The log pane always displays the command before output so the operator can copy or rerun it outside the UI.

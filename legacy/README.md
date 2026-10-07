# Legacy

Retired in 0.9.0 and kept for reference only. Nothing in the engine, tests, or app uses these files. See `docs/EVALUATION.md` for why each one was retired.

| File | Replaced by |
| --- | --- |
| `Get-WindowsISO.ps1` | `-Mode ImportIso` / `-Mode InspectIso` (SHA-256 verified; no runtime Fido download) |
| `New-UnattendXML.ps1` | `New-MiiUnattendXml` |
| `New-KickStart.ps1` | `New-MiiKickstart` |
| `Read-VmDefinition.ps1`, `Powershell_Read_Yaml.ps1` | `Read-MiiDefinition`, `ConvertFrom-MiiYaml` |
| `TheVmLoop.ps1`, `Setting-The-PAT.ps1`, `key-vault-Azure.ps1` | `Build-Cluster.ps1` modes; credentials are entered at media build |
| `definition_helper.py`, `requirements-python.txt` | The engine's single parser and validation |
| `Build-Cluster.Plan.Tests.ps1` | `tests\Run-Tests.ps1` |
| `docs\MOCKUP.md` | `docs\EVALUATION.md` |

The original CSV-driven PowerCLI script and the old audit notes were removed because they named infrastructure from the environment they were written for. The .NET 8 WinForms prototype (`src\MultiInstallIso.Orchestrator`) was removed; it is in git history before 0.9.0.

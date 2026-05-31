# Prerequisites and Install Locations

Use this as the operator workstation checklist. The C# app can verify most commands from the `Audit` and `Prerequisites` tabs.

## Required for the C# orchestrator

| Tool | Official download/install link | Where it should land | Verify |
| --- | --- | --- | --- |
| .NET 8 SDK | [Download .NET 8](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) | `C:\Program Files\dotnet\` and on `PATH` | `dotnet --info` |
| Git for Windows | [Git for Windows](https://git-scm.com/install/windows) | Usually `C:\Program Files\Git\cmd\git.exe` on `PATH` | `git --version` |
| Python 3 | [Python Windows downloads](https://www.python.org/downloads/windows/) or [Microsoft Learn Python on Windows](https://learn.microsoft.com/windows/python/) | `py.exe` launcher on `PATH`; Python under `%LocalAppData%\Programs\Python\` or `C:\Program Files\Python*` | `py -3 --version` |

## Required for PowerCLI vSphere builds

| Tool/module | Official link | Where it should land | Verify |
| --- | --- | --- | --- |
| PowerShell | [Install PowerShell on Windows](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.5) | `C:\Program Files\PowerShell\7\pwsh.exe` for PowerShell 7; Windows PowerShell 5.1 is built into Windows | `$PSVersionTable` |
| VMware PowerCLI | [PowerCLI Installation Guide](https://developer.broadcom.com/powercli/installation-guide) | Current user module path, usually `%USERPROFILE%\Documents\PowerShell\Modules` for PowerShell 7 or `%USERPROFILE%\Documents\WindowsPowerShell\Modules` for Windows PowerShell 5.1 | `Get-Module -ListAvailable VMware.PowerCLI` |
| powershell-yaml | [PowerShell Gallery: powershell-yaml](https://www.powershellgallery.com/packages/powershell-yaml/) | Same PowerShell module paths as above | `Get-Command ConvertFrom-Yaml` |
| UnattendXmlBuilder | PowerShell Gallery via `Install-Module UnattendXmlBuilder` | Same PowerShell module paths as above | `Get-Module -ListAvailable UnattendXmlBuilder` |

Install command:

```powershell
Install-Module VMware.PowerCLI -Scope CurrentUser -Force
Install-Module powershell-yaml -Scope CurrentUser -Force
Install-Module UnattendXmlBuilder -Scope CurrentUser -Force
```

## Optional for Terraform builds

| Tool | Official link | Where it should land | Verify |
| --- | --- | --- | --- |
| Terraform | [Install Terraform](https://developer.hashicorp.com/terraform/install) | A folder on `PATH`, such as `C:\Tools\Terraform\terraform.exe` | `terraform version` |

Terraform also needs vSphere credentials. Prefer environment variables:

```powershell
$env:TF_VAR_vsphere_user = 'administrator@vsphere.local'
$env:TF_VAR_vsphere_password = '<secure secret>'
```

## Optional for Kubernetes builds

| Tool | Official link | Where it should land | Verify |
| --- | --- | --- | --- |
| kubectl | [Install kubectl on Windows](https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/) | A folder on `PATH`, such as `%USERPROFILE%\.kube\bin\kubectl.exe` or a package-manager location | `kubectl version --client` |

Kubernetes also needs a valid kubeconfig:

```powershell
$env:KUBECONFIG = "$HOME\.kube\config"
kubectl config current-context
```

## Optional Python helpers

The Python helper works with standard library JSON/CSV support. Install PyYAML for full YAML behavior:

```powershell
py -3 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-python.txt
.\.venv\Scripts\python.exe .\tools\definition_helper.py validate .\cluster-vms.yaml
```

| Package | Official link | Where it should land | Verify |
| --- | --- | --- | --- |
| PyYAML | [PyYAML on PyPI](https://pypi.org/project/PyYAML/) | Prefer the repo-local `.venv\Lib\site-packages` | `.\.venv\Scripts\python.exe -c "import yaml; print(yaml.__version__)"` |

## Fast install commands with winget

Use these only if your machine policy allows `winget`:

```powershell
winget install -e --id Microsoft.DotNet.SDK.8
winget install -e --id Git.Git
winget install -e --id Python.Python.3.13
winget install -e --id Hashicorp.Terraform
winget install -e --id Kubernetes.kubectl
```

After installing command-line tools, open a new terminal so `PATH` refreshes.

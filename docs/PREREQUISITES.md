# Prerequisites

Nothing here is installed automatically. Install what you need, pin the versions you tested, and check with `Build-Cluster.ps1 -Mode Dependencies` (or the app's **Dependencies** page).

| Dependency | Needed for | Where it lives | Install / check |
| --- | --- | --- | --- |
| Windows 10/11 or Server 2019+ | everything | — | — |
| PowerShell 7.2+ (`pwsh.exe`) | engine and tests | `C:\Program Files\PowerShell\7\pwsh.exe` | https://aka.ms/powershell · `pwsh -v` |
| IMAPI2FS (built into Windows) | building answer-media ISOs | COM `IMAPI2FS.MsftFileSystemImage` | built in |
| Storage module (`Mount-DiskImage`) | reading Windows editions from install ISOs | built in | read-only mount, no elevation on Windows 10/11 |
| icacls (built in) | restricting the answer-media folder | `C:\Windows\System32\icacls.exe` | built in |
| Microsoft Edge WebView2 Runtime | the desktop app window | Evergreen runtime | usually present; https://developer.microsoft.com/microsoft-edge/webview2/ |
| VMware PowerCLI | vSphere apply only | user module path | `Install-Module VMware.PowerCLI -Scope CurrentUser -RequiredVersion <tested>` |
| Hyper-V + Hyper-V PowerShell module | Hyper-V apply only | Windows feature | Windows Features → Hyper-V, reboot; run apply elevated |
| openssl | Linux root password hash | Git for Windows: `C:\Program Files\Git\usr\bin\openssl.exe` | `openssl passwd -6` |
| .NET 10 SDK | building the app from source | `C:\Program Files\dotnet` | `dotnet --list-sdks` |
| Terraform + vSphere provider | `adapters\terraform` only | — | optional, separate from the engine |

## Paths and variables

| Item | Default |
| --- | --- |
| Artifacts (plans, media, receipts) — CLI | `<repo>\artifacts` |
| Artifacts — app | `%LOCALAPPDATA%\MultiInstallIso\artifacts` (Settings → Storage) |
| Install ISO cache | `<artifacts>\isos` |
| App settings | `%APPDATA%\MultiInstallIso\settings.json` |
| App log | `%LOCALAPPDATA%\MultiInstallIso\logs\app.log` |
| WebView2 profile | `%LOCALAPPDATA%\MultiInstallIso\WebView2` |
| `AZURE_DEVOPS_PAT` | Read inside the guest by PostDeploy for `codeRepo` clones (machine scope). Never read into plans, media, or logs. |

## External hosts

| Host | When |
| --- | --- |
| vCenter (`-VcenterServer`) | vSphere apply only |
| `codeRepo` URL | Inside the guest at first logon, when set |
| HTTPS ISO source | `ImportIso -IsoUri`, only when you use it |

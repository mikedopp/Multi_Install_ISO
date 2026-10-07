# Third-party notices

Multi Install ISO is MIT-licensed (see [LICENSE](LICENSE)). The desktop release also redistributes the components below. Their full license texts are in [licenses/](licenses), which ships next to `MultiInstallIso.exe`.

## Redistributed in the release build

| Component | Version | License | Text |
| --- | --- | --- | --- |
| .NET runtime (`Microsoft.NETCore.App`), self-contained in the exe | 10.0 | MIT, © .NET Foundation and Contributors | `licenses/dotnet-runtime-MIT.txt`, `licenses/dotnet-runtime-THIRD-PARTY-NOTICES.txt` |
| .NET Windows Desktop runtime (WPF, WinForms) | 10.0 | MIT, © .NET Foundation and Contributors | `licenses/dotnet-windowsdesktop-runtime-LICENSE.txt` |
| Microsoft Edge WebView2 SDK (`Microsoft.Web.WebView2`, including `WebView2Loader`) | 1.0.3967.48 | BSD-3-Clause, © Microsoft Corporation | `licenses/Microsoft.Web.WebView2-LICENSE.txt`, `licenses/Microsoft.Web.WebView2-NOTICE.txt` |
| Glimmer badge kit and orb editor (`wwwroot/glimmer/`) | 0.4.0 | MIT, © 2026 mikedopp | `wwwroot/glimmer/LICENSE` |
| orb by LerSent001 (shader, presets, editor, inside Glimmer) | commit 8d1736e | MIT, © 2026 LerSent001 | `wwwroot/glimmer/LICENSE-orb-LerSent001`, `wwwroot/glimmer/NOTICE.md` |
| Toolcraft UI by Pixel Point (inside the Glimmer editor) | — | MIT, © 2026 Pixel Point | `wwwroot/glimmer/LICENSE-toolcraft-PixelPoint.md` |
| React, React DOM (inside the Glimmer editor) | 19.x | MIT, © Meta Platforms, Inc. and affiliates | `licenses/react-MIT.txt` |
| Base UI | 1.x | MIT, © Material-UI SAS | `licenses/base-ui-react-MIT.txt` |
| dnd kit | 6.x | MIT, © Claudéric Demers | `licenses/dnd-kit-core-MIT.txt` |
| Phosphor Icons (React) | 2.x | MIT, © Phosphor Icons | `licenses/phosphor-icons-react-MIT.txt` |
| cmdk | 1.x | MIT, © Paco Coursey | `licenses/cmdk-MIT.txt` |
| react-resizable-panels | 4.x | MIT, © Brian Vaughn | `licenses/react-resizable-panels-MIT.txt` |
| sonner | 2.x | MIT, © Emil Kowalski | `licenses/sonner-MIT.txt` |
| tailwind-merge | 3.x | MIT, © Dany Castillo | `licenses/tailwind-merge-MIT.txt` |
| clsx | 2.x | MIT, © Luke Edwards | `licenses/clsx-MIT.txt` |
| class-variance-authority | 0.7.x | Apache-2.0, © Joe Bell | `licenses/class-variance-authority-Apache-2.0.txt` |
| Inter typeface (`@fontsource-variable/inter`) | 5.x | SIL Open Font License 1.1, © The Inter Project Authors | `licenses/Inter-OFL-1.1.txt` |

## Used but not redistributed

- Microsoft Edge WebView2 Runtime (Evergreen, installed with Windows/Edge).
- PowerShell 7, Windows IMAPI2FS, Storage (`Mount-DiskImage`), and `icacls` (Windows components).
- VMware PowerCLI and the Hyper-V PowerShell module, when you install or enable them yourself.

## Trademarks

VMware, vSphere, vCenter, ESXi, and PowerCLI are trademarks of Broadcom Inc. Windows, Windows Server, Hyper-V, PowerShell, .NET, and Microsoft Edge are trademarks of Microsoft Corporation. Red Hat Enterprise Linux is a trademark of Red Hat, Inc. Rocky Linux is a trademark of the Rocky Enterprise Software Foundation. AlmaLinux is a trademark of the AlmaLinux OS Foundation. This project is not affiliated with or endorsed by any of them. Names are used only to describe compatibility.

Sample definitions use reserved example names (`contoso.local`, `yourorg`) and private RFC 1918 addresses.

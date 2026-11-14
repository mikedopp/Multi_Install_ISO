# Evaluation — 2026-10-06

This records what the repository could and could not do before the 0.9.0 rebuild, what changed, and what is still unproven. Status words follow one rule: **PROVEN** means a check ran and passed, **NOT RUN** means it was not tested, and **PARTIAL** means part of it was checked.

## Before: what was wrong

Planning (`Build-Cluster.ps1 -PlanOnly`) ran and wrote a plan for every sample. Nothing after planning could produce a working install.

| Area | Finding | Effect |
| --- | --- | --- |
| Guest IDs | Every sample used `windows2019Server64Guest`, which is not a vSphere guest ID (Server 2019 is `windows2019srv_64Guest`, 2022 is `windows2019srvNext_64Guest`). The planner did not check it. | `New-VM` would reject every VM. |
| Answer files | `New-UnattendXML.ps1` depended on a module (`UnattendXmlBuilder`) and cmdlets that could not be verified. Its fallback wrote an empty `<unattend/>` document. | Windows Setup would stop at its first prompt. |
| Answer-file delivery | Answer files were never put on media or attached to a VM. | Even a correct file would never reach Setup. |
| ISO download | `Get-WindowsISO.ps1` downloaded Fido from GitHub `master` on every run (unpinned, unverified) and only printed a URL. Fido does not offer Windows Server media. | No ISO was ever downloaded; the runtime download was a supply-chain risk. |
| Kickstart | `New-KickStart.ps1` pointed at the CentOS 8 mirror, which is end-of-life and offline. | Linux installs would fail to find packages. |
| Networking | The legacy flow switched NICs to vmxnet3. Windows has no inbox vmxnet3 driver. | Static IP and domain join during Setup would silently not apply. |
| Secrets | Passwords were converted to plain strings and passed as command arguments to child scripts. | Secrets visible in process listings and transcripts. |
| Apply ordering | The plan file was written after provisioning ran. | A failed run left no record of what was attempted. |
| Validation | Non-numeric sizes threw exceptions; duplicate names, bad IPs, and secrets in definitions were not caught. | Bad input failed late or not at all. |
| YAML | Three parsers (PowerShell, C#, Python) with different behaviour. The built-in one dropped nested keys. | The same file could mean different things to different tools. |
| Modules | Missing modules were installed automatically and unpinned (`Install-Module -Force`). | Unreviewed code on the operator machine. |
| Terraform | `iso_path` included the `[datastore]` prefix, which the vSphere provider rejects; TLS verification was off by default. | `terraform apply` would fail on the CD-ROM. |
| Tests | One Pester 5 file; this machine has Pester 3.4 only, so it could not run. | No runnable tests. |
| App | .NET 8 WinForms prototype that built free-form command lines. No glass, no tray, no single instance, no version display. | Did not meet the house standards. |
| Repository | The original CSV-driven script hard-coded share paths, a credential file location, and datastore and connection names from the environment it was written for. | Not portable, and not something to publish. Removed from the tree in 0.9.0. |

## After: what 0.9.0 does

| Capability | Status | Evidence |
| --- | --- | --- |
| One YAML subset parser, JSON, and CSV | PROVEN offline | `tests\Run-Tests.ps1`: identical plans from equivalent YAML, JSON, and CSV; unsupported YAML fails with a line number. |
| Validation (guest IDs, sizes, names, IPs, duplicates, secrets) | PROVEN offline | Test "invalid values become blocking issues"; every shipped sample plans with zero blocking issues. |
| Immutable plan + SHA-256, written before anything else | PROVEN offline | Read-only plan file, hash sidecar, tamper and wrong-hash tests. |
| Windows autounattend.xml (UEFI/BIOS, image selection, static IP by MAC, DNS, domain join, encoded admin password, first-logon PostDeploy) | PROVEN offline (structure) | XML tests. **Not yet consumed by Windows Setup.** |
| RHEL-family kickstart from the attached DVD | PROVEN offline (structure) | Kickstart test. **Not yet consumed by Anaconda.** |
| Answer-media ISOs (IMAPI, ISO 9660 + Joliet) | PROVEN offline | Built, read back byte-for-byte, mounted by Windows (`Mount-DiskImage`), tamper detected; access limited to user, SYSTEM, Administrators. |
| Install ISO inspection (hash, UDF/ISO 9660, Windows image list, Linux markers) | PARTIAL | Proven on generated test images. Run it on real media. |
| Install ISO import with SHA-256 gate | PROVEN offline (local copy) | Wrong hash refused and partial removed. HTTPS download path NOT RUN. |
| Apply state machine (attempt record first, receipt per VM, stop on first failure, no rollback) | PROVEN offline | Fake-provider tests, including forced first-VM failure. |
| vSphere provider | NOT RUN | No vCenter or PowerCLI on the build machine. |
| Hyper-V provider | NOT RUN | Hyper-V is not enabled on the build machine. |
| Guest `PostDeploy.ps1` | PARTIAL | Parses under Windows PowerShell 5.1; not run inside a guest. |
| Desktop app | PROVEN on this PC | `--smoke` of the published exe (17/17) builds and verifies real answer media; snapshots of every view with glass on and off; live run driven by UI Automation: plan from the Definition page, native credential dialog → 4 answer ISOs built and verified, no password in log or settings, close-to-tray hides and keeps running, second launch restores the window and exits, closing with close-to-tray off exits. The tray menu items themselves (Show/Hide/Exit) were not clicked; UI Automation cannot reach the notification area here. Not checked: Windows high-contrast or transparency-off fallback live (covered by code paths only), multi-monitor and high-DPI. |

## What would prove the rest

1. Enable Hyper-V on a lab PC (Windows Features, reboot), download a Windows Server evaluation ISO, record its SHA-256 from the Evaluation Center, and run `examples\hyperv-lab.yaml` through Plan → Media → Apply from an elevated PowerShell 7. A finished, domain-free install with `C:\ProgramData\MultiInstallIso` present proves autounattend and media end to end.
2. Repeat with a Rocky Linux 9 DVD ISO and `examples\rocky9.yaml` (target `hyperv`, local ISO path) to prove the OEMDRV kickstart path.
3. For vSphere, install and pin PowerCLI, upload the ISO to a datastore, and run one disposable VM against a non-production cluster.

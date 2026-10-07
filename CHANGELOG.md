# Changelog

## [0.9.0] - 2026-10-06

First versioned release: a rebuild of the engine and the app. See `docs/EVALUATION.md` for what was broken and what is now proven.

### Engine
- New `MultiInstallIso` PowerShell module shared by the CLI and the app; `Build-Cluster.ps1` is now a thin front end with `-Mode Plan | Media | VerifyMedia | Apply | InspectIso | ImportIso | Dependencies` and `-Json` output.
- One YAML subset reader for every tool (nested maps and lists, clear errors with line numbers).
- Validation: vSphere guest IDs (all samples used an invalid one), whole-number CPU, sizes, Windows name length, IPv4/subnet/gateway/DNS, duplicate names and IPs, secret fields, ISO path type per target, vmxnet3 warning.
- Plans are written first, read-only, with a SHA-256 that media and apply must quote.
- Real Windows `autounattend.xml` (UEFI/BIOS layouts, image selection, static IP addressed by a deterministic MAC, DNS, domain join, encoded admin password, first-logon PostDeploy) and RHEL-family kickstart that installs from the attached DVD.
- Answer-media ISOs built with Windows IMAPI (labels `MIIANSWER` / `OEMDRV`), read back byte-for-byte, hashed into a manifest, and stored with restricted access.
- Install ISO inspection and import: SHA-256 gate, ISO 9660/UDF detection, Windows edition list from `install.wim`/`install.esd`, Linux installer markers.
- Guarded apply for vSphere (PowerCLI) and local Hyper-V: plan hash and target confirmation, verified media, attempt record, per-VM receipts, stop on first failure, no automatic rollback. **Not yet run against real infrastructure.**
- Dependency map (`-Mode Dependencies`).
- No more automatic module installs or runtime downloads (Fido from GitHub `master`, PSWindowsUpdate, UnattendXmlBuilder).

### App
- Replaced the .NET 8 WinForms prototype with a .NET 10 WPF + WebView2 app: Liquid Glass with on/off, opacity, blur, and reset; automatic solid fallback; native title bar; tray icon with close-to-tray; single instance; Glimmer version orb; dependency page; `--smoke` and `--snapshot` self-checks.

### Other
- Offline test suite `tests\Run-Tests.ps1` (no Pester needed).
- Release build `build.cmd` (tests, publish, smoke test, zip, SHA-256 sums).
- Terraform adapter: ISO datastore/path fixed, TLS verification on by default. Pipeline is plan-only. Kubernetes helper hardened.
- Legacy scripts moved to `legacy\`; the original CSV script and old audit notes, which named infrastructure from their original environment, were removed.
- Legal and security: `THIRD_PARTY_NOTICES.md` and `licenses\` (shipped with the release), `SECURITY.md`, and a README disclaimer. Test credentials are labelled `TEST-ONLY`.

# Implementation plan

## Safety contract

- **Plan** reads local files and writes an immutable plan and its SHA-256. It contacts nothing.
- **Media** needs the reviewed plan hash, builds answer media, reads it back, and records hashes.
- **Apply** needs the plan hash, a target confirmation, and verified media. It writes an attempt record before touching the target, a receipt after every step, and stops at the first failure without rolling back.
- Secrets are entered at media build (prompt or app dialog, passed on stdin), never stored in definitions, plans, manifests, logs, or command lines.
- Nothing is installed or downloaded implicitly.

## Phases

| Phase | Status | Gate |
| --- | --- | --- |
| 0. Stabilise planning (one parser, validation, plan written first, no auto-installs) | **Done in 0.9.0** | Offline tests pass. |
| 1. Shared engine module with tests | **Done in 0.9.0** | `powershell\MultiInstallIso`; YAML/JSON/CSV produce identical plans. |
| 2. Operator app (.NET 10 WPF + WebView2, glass, tray, single instance, version orb) | **Done in 0.9.0** | `--smoke` of the published exe passes; glass on/off snapshots. |
| 3. Real installation media (answer ISOs, install ISO verification) | **Done offline in 0.9.0** | Media built, read back, mounted. Still needed: one real Windows and one Linux install consuming it. |
| 4. Guarded apply (vSphere, Hyper-V) | **Code complete, NOT RUN** | One disposable VM per provider on non-production infrastructure, with receipts. |
| 5. Post-deployment | **Partial** | PostDeploy parses on 5.1; needs a guest run and receipt review. |
| 6. Apply from the app | Pending | Only after phase 4 passes: typed confirmation of plan hash and target in the window. |

## Next work

1. Enable Hyper-V on a lab PC and run `examples\hyperv-lab.yaml` end to end with a Windows Server evaluation ISO (see [EVALUATION.md](EVALUATION.md)).
2. Run `examples\rocky9.yaml` the same way to prove the OEMDRV kickstart path.
3. One vSphere run against a disposable VM.
4. Then decide whether the app should run apply itself.

## Decisions still open

- Whether Terraform and Kubernetes stay as adapters or move to separate projects.
- Whether to generate Ubuntu autoinstall and Debian preseed answer media.

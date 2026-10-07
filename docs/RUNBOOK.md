# Runbook

The operator path from a definition file to running VMs. Each step checks the output of the one before it, and nothing contacts vCenter or Hyper-V until **Apply**.

You can do steps 1–4 in the desktop app (`MultiInstallIso.exe`) or with `Build-Cluster.ps1`. Step 5 runs in a terminal in this release.

## 1. Check dependencies

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode Dependencies
```

Plan and media need only PowerShell 7 and Windows (IMAPI2FS, icacls, Mount-DiskImage). Apply needs VMware PowerCLI (vSphere) or the Hyper-V module plus an elevated session (Hyper-V). Nothing is installed automatically. See [PREREQUISITES.md](PREREQUISITES.md).

## 2. Check the install media

Get the SHA-256 from the publisher (Microsoft Evaluation Center or VLSC, Rocky/Alma download pages) and check the ISO before you use it:

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode InspectIso -IsoPath D:\ISOs\server2022.iso `
  -ExpectedSha256 <publisher-sha256> -ImageName "Windows Server 2022 SERVERSTANDARD"
```

`PASS` means the hash matched and the content was identified (Windows editions read from `install.wim`/`install.esd`, or Linux installer markers). `PARTIAL` means something could not be checked; read the notes. `FAIL` means do not use it.

To keep a verified copy in the ISO cache with a manifest:

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode ImportIso -IsoPath \\share\isos\server2022.iso -ExpectedSha256 <sha256>
```

For vSphere, upload the ISO to a datastore yourself and use the datastore path (`[datastore1] iso/server2022.iso`) in the definition.

## 3. Plan

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -DefinitionPath .\cluster-vms.yaml -Target vsphere `
  -VcenterServer vcsa.lab.local -VcenterCluster Lab -PlanOnly
```

The plan goes to `artifacts\<timestamp>\build-plan.json` with its SHA-256 in `build-plan.sha256`. The file is read-only. Review every VM: guest ID, firmware, sizing, datastore, network, IP/MAC, image name, and the warnings. Exit code 1 means blocking issues; media and apply refuse such a plan.

## 4. Build answer media

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode Media -PlanPath .\artifacts\<run>\build-plan.json -PlanHash <plan-sha256> `
  -AdminCredential (Get-Credential Administrator) -DomainJoinCredential (Get-Credential CONTOSO\svc-join)
```

For Linux VMs add `-RootPasswordHash '<hash>'` (create one with `openssl passwd -6`; Git for Windows includes openssl).

Each VM gets `media\<vm>-answer.iso`:

- Windows: volume `MIIANSWER` with `autounattend.xml`, plus `mii\PostDeploy.ps1` and `mii\postdeploy.json` when the VM has roles or a code repo. Windows Setup reads `autounattend.xml` from any attached drive.
- Linux: volume `OEMDRV` with `ks.cfg`. Anaconda loads it automatically.

Every ISO is read back and compared with what was generated. `media-manifest.json` records the hashes. The `media` folder is limited to you, SYSTEM, and Administrators, because the media holds credentials (the admin password is encoded, not encrypted; the domain-join password is plain text, as Windows requires). Re-check it at any time:

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode VerifyMedia -PlanPath .\artifacts\<run>\build-plan.json
```

## 5. Apply

Run the first apply against non-production infrastructure with one disposable VM (`-VmName`).

vSphere:

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode Apply -PlanPath .\artifacts\<run>\build-plan.json -PlanHash <plan-sha256> `
  -ConfirmTarget vcsa.lab.local -VcenterCredential (Get-Credential) -VmName iis-web-01
```

Hyper-V (elevated PowerShell 7 on the Hyper-V host; `network` is the virtual switch name, `iso` a local path):

```powershell
pwsh -NoProfile -File .\Build-Cluster.ps1 -Mode Apply -PlanPath .\artifacts\<run>\build-plan.json -PlanHash <plan-sha256> `
  -ConfirmTarget $env:COMPUTERNAME -HyperVPath D:\Hyper-V
```

Apply refuses to start unless the plan hash matches, the plan has no blocking issues, `-ConfirmTarget` names the target, and every VM's answer media still matches its manifest. PowerShell then asks for confirmation.

For each VM, in order: Preflight → CreateVm → AttachMedia → Readback → PowerOn. On EFI VMs the provider presses Enter for about 30 seconds after power-on to answer "Press any key to boot from CD or DVD". The first failure stops the run. Nothing is rolled back or deleted.

Records in `artifacts\<run>\apply-<timestamp>\`:

| File | Written |
| --- | --- |
| `apply-attempt.json` | Before anything touches the target |
| `receipt-<vm>.json` | After every step of that VM |
| `run-summary.json` | At the end, including VMs not run |

## 6. After the install

- Windows guests write `C:\ProgramData\MultiInstallIso\postdeploy-receipt.json` and `PostDeploy.log` when PostDeploy runs. A code clone needs the machine environment variable `AZURE_DEVOPS_PAT` inside the guest; without it the clone is skipped and the receipt says `PARTIAL`.
- Delete the answer media once the VMs are built (app: **Answer media → Delete media**; vSphere also keeps a copy in `[datastore] multi-install-iso/`).

## Troubleshooting

| Symptom | Cause |
| --- | --- |
| Setup stops at the edition picker | No `imageName`/`imageIndex`, or the name doesn't match the media. Run InspectIso with `-ImageName`. |
| Setup asks for a product key | Retail media needs `-ProductKey` at media build. Evaluation media does not. |
| Static IP not applied | NIC was vmxnet3 (no inbox driver), or the MAC in the plan was changed on the VM. |
| VM boots to PXE | The boot-from-CD prompt timed out. Re-run power-on and press a key in the console. |
| Apply: "plan hash mismatch" | The plan changed or the wrong hash was pasted. Re-review and quote the current hash. |

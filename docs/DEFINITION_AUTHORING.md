# Definition authoring

A definition lists the VMs to build. YAML, JSON, and CSV are equivalent: the same VMs in any of the three produce the same plan (this is tested).

```yaml
vms:
  - vmname: "iis-web-01"
    iso: "[datastore1] iso/en_windows_server_2022_x64.iso"
    imageName: "Windows Server 2022 SERVERSTANDARD"
    os: "windows2019srvNext_64Guest"
    cpu: 4
    ramGB: 8
    diskGB: 60
    datastore: "datastore1"
    network: "VM Network"
    ip: "192.168.10.11"
    subnet: "255.255.255.0"
    gateway: "192.168.10.1"
    dns: ["192.168.10.10", "8.8.8.8"]
    domain: "contoso.local"
    roles: ["IIS"]
```

JSON uses a top-level `"vms": [ ... ]`. CSV uses one row per VM with the field names as headers; list fields (`dns`, `roles`) are separated with `;`.

## Fields

Field names are case-insensitive. Aliases in brackets are accepted for older files.

| Field | Required | Meaning |
| --- | --- | --- |
| `vmname` [`name`] | yes | Letters, digits, hyphens. Windows computer names are limited to 15 characters. Must be unique (case-insensitive). |
| `os` [`guestId`, `guest_id`, `GuestIDOS`] | yes | vSphere guest ID. See the table below. Known-wrong IDs are blocked with the right one suggested; unknown IDs are a warning. |
| `osFamily` | no | `windows` or `linux`. Worked out from `os` when omitted. |
| `cpu` [`num_cpus`, `NumCPU`] | yes | Whole number, 1–128. |
| `ramGB` [`OSRamSize`] | yes* | Gigabytes. *Or `memory`/`memoryMB` in megabytes (Terraform style). |
| `diskGB` [`disk_size`, `OSDiskSize`] | yes | Gigabytes. Windows needs at least 32. |
| `secondDiskGB` [`SecondDiskSize`] | no | Adds a second, thin disk. |
| `datastore` | yes | vSphere datastore. Kept for Hyper-V plans, where VM files go under `-HyperVPath`. |
| `network` [`NetworkName`, `vlan`] | yes | vSphere port group, or the Hyper-V virtual switch. |
| `iso` [`iso_path`, `ISO`] | yes | vSphere: datastore path `[ds] folder/file.iso`. Hyper-V: local path. Install media is never downloaded implicitly. |
| `imageName` [`edition`] / `imageIndex` | Windows | The image in `install.wim`, e.g. `Windows Server 2022 SERVERSTANDARD` (Desktop Experience) or `...SERVERSTANDARDCORE`. Without it Setup stops at the edition picker. Check names with `-Mode InspectIso`. |
| `firmware` | no | `efi` (default) or `bios`. Decides the disk layout in the answer file and the Hyper-V generation. |
| `nicType` | no | `e1000e` (default) or `vmxnet3`. Windows has no inbox vmxnet3 driver, so keep e1000e for the install. |
| `macAddress` | no | Static MAC. By default the plan derives one from the VM name (vSphere `00:50:56:00-3F:xx:xx`, Hyper-V `00:15:5D:xx:xx:xx`) so the answer file can address the adapter. |
| `ip`, `subnet` [`netmask`], `gateway`, `dns` | no | Static IPv4. `subnet` is a mask (`255.255.255.0`) or prefix (`24`, `/24`). Without `ip` the guest uses DHCP. |
| `domain` | no | Windows domain to join during setup; the join account is given at media build. |
| `timeZone` | no | Windows time zone ID (`Mountain Standard Time`) or IANA zone for Linux (`America/Denver`). Default UTC. |
| `locale` | no | Default `en-US`. |
| `vmhost`, `folder` | no | vSphere host and VM folder. Without `vmhost`, the least-loaded connected host in the cluster is used. |
| `roles` | no | `IIS` and/or `API`, applied by PostDeploy at first logon. |
| `codeRepo`, `siteName`, `appPoolName` | no | Code cloned by PostDeploy (https only; the PAT is read inside the guest). |
| `postInstall` | no | Commands. Windows: each runs once at first logon (PowerShell, 1024-character limit after encoding). Linux: appended to `%post`. |
| `description` [`note`] | no | VM notes. |

Secret fields (`password`, `adminPassword`, `domainJoinPass`, `Cred_Pass`, `pat`, `productKey`, `rootPassword`) are rejected. Credentials are given when the answer media is built.

## Guest IDs

| Guest ID | OS |
| --- | --- |
| `windows9Server64Guest` | Windows Server 2016 |
| `windows2019srv_64Guest` | Windows Server 2019 |
| `windows2019srvNext_64Guest` | Windows Server 2022 |
| `windows2022srvNext_64Guest` | Windows Server 2025 |
| `windows9_64Guest` / `windows11_64Guest` | Windows 10 / 11 |
| `rhel8_64Guest`, `rhel9_64Guest`, `rockylinux_64Guest`, `almalinux_64Guest`, `centos9_64Guest` | RHEL family (kickstart) |

The full list is in `Get-MiiKnownGuestId`. Ubuntu and Debian guest IDs plan, but their installers use autoinstall/preseed rather than kickstart, which this release does not generate.

## YAML subset

The engine has its own YAML reader so every tool reads a file the same way. It supports block mappings and lists, `- key: value` list items, `[a, b]` lists, single and double quotes, comments, `null`/`~`, `true`/`false`, and numbers. It rejects, with a line number: tabs in indentation, anchors and aliases, tags, block scalars (`|`, `>`), flow mappings (`{}`), and duplicate keys.

Use single quotes for Windows paths (`'D:\ISOs\x.iso'`); in double quotes a backslash starts an escape.

## Other inputs

- `templates\terraform.tfvars.json` feeds `adapters\terraform\main.tf` (separate from the engine). `iso_path` is relative to `iso_datastore`, without a `[datastore]` prefix.
- `templates\kubernetes-pods.json` feeds `adapters\kubernetes\Pod-Power.ps1`, which writes Pod manifests for review.

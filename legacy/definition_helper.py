#!/usr/bin/env python3
"""Validate, format, convert, and scaffold Multi Install ISO definition files.

The helper intentionally works with the Python standard library for JSON and CSV.
If PyYAML is installed, it will use it for full YAML parsing. Without PyYAML, it
falls back to the repo's simple top-level ``vms:`` YAML shape.
"""

from __future__ import annotations

import argparse
import csv
import ipaddress
import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import yaml  # type: ignore
except Exception:  # pragma: no cover - optional dependency
    yaml = None


POWERCLI_YAML = """vms:
  - vmname: "iis-web-01"
    description: "IIS frontend server 1"
    iso: '\\\\storage\\isos\\en_windows_server_2022_x64.iso'
    os: "windows2019Server64Guest"
    cpu: 4
    ramGB: 8
    diskGB: 60
    datastore: "datastore1"
    network: "VM Network"
    ip: "192.168.10.11"
    subnet: "255.255.255.0"
    gateway: "192.168.10.1"
    dns: ["192.168.10.10", "8.8.8.8"]
    roles: ["IIS"]
"""

POWERCLI_JSON = {
    "vms": [
        {
            "vmname": "iis-web-01",
            "iso": r"\\storage\isos\en_windows_server_2022_x64.iso",
            "os": "windows2019Server64Guest",
            "cpu": 4,
            "ramGB": 8,
            "diskGB": 60,
            "datastore": "datastore1",
            "network": "VM Network",
            "ip": "192.168.10.11",
            "subnet": "255.255.255.0",
            "gateway": "192.168.10.1",
            "dns": ["192.168.10.10", "8.8.8.8"],
            "roles": ["IIS"],
        }
    ]
}

TERRAFORM_JSON = {
    "vsphere_server": "vcenter.contoso.local",
    "allow_unverified_ssl": True,
    "datacenter": "Datacenter",
    "cluster": "Cluster",
    "folder": "vm/dev",
    "vms": [
        {
            "name": "tf-web-01",
            "num_cpus": 2,
            "memory": 4096,
            "disk_size": 50,
            "datastore": "datastore1",
            "network": "VM Network",
            "guest_id": "windows2019Server64Guest",
            "iso_path": "[datastore1] ISOs/en_windows_server_2022.iso",
            "firmware": "efi",
        }
    ],
}

KUBERNETES_JSON = {
    "pods": [
        {
            "name": "win-webserver",
            "image": "mcr.microsoft.com/windows/servercore/iis:windowsservercore-ltsc2019",
            "ports": [{"containerPort": 80, "hostPort": 8080}],
            "env": [{"name": "ASPNETCORE_ENVIRONMENT", "value": "Development"}],
            "volumes": [{"name": "data", "hostPath": {"path": r"C:\data"}}],
        }
    ]
}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    subparsers = parser.add_subparsers(dest="command", required=True)

    validate = subparsers.add_parser("validate", help="Validate YAML, JSON, CSV, tfvars, or pod definitions.")
    validate.add_argument("path", type=Path)

    format_json = subparsers.add_parser("format-json", help="Pretty-print a JSON file.")
    format_json.add_argument("path", type=Path)
    format_json.add_argument("--write", action="store_true", help="Overwrite the file instead of printing.")

    convert = subparsers.add_parser("convert", help="Convert a definition to json, yaml, or csv.")
    convert.add_argument("input", type=Path)
    convert.add_argument("output", type=Path)
    convert.add_argument("--target", choices=["json", "yaml", "csv"], required=True)

    template = subparsers.add_parser("template", help="Write a starter template.")
    template.add_argument("--type", choices=["powercli-yaml", "powercli-json", "powercli-csv", "terraform-json", "kubernetes-json"], required=True)
    template.add_argument("--output", type=Path, required=True)

    args = parser.parse_args()
    try:
        if args.command == "validate":
            issues = validate_definition(args.path)
            if issues:
                print("\n".join(issues))
                return 1 if any(issue.startswith("ERROR:") for issue in issues) else 0
            print(f"OK: {args.path}")
            return 0
        if args.command == "format-json":
            data = read_json(args.path)
            text = json.dumps(data, indent=2) + "\n"
            if args.write:
                args.path.write_text(text, encoding="utf-8")
                print(f"Formatted {args.path}")
            else:
                print(text, end="")
            return 0
        if args.command == "convert":
            data = read_definition(args.input)
            write_definition(args.output, data, args.target)
            print(f"Wrote {args.output}")
            return 0
        if args.command == "template":
            write_template(args.type, args.output)
            print(f"Wrote {args.output}")
            return 0
    except Exception as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 1
    return 1


def read_definition(path: Path) -> dict[str, Any]:
    suffixes = "".join(path.suffixes).lower()
    if suffixes.endswith(".json") or suffixes.endswith(".tfvars.json"):
        return read_json(path)
    if path.suffix.lower() in {".yaml", ".yml"}:
        return read_yaml(path)
    if path.suffix.lower() == ".csv":
        return {"vms": list(read_csv(path))}
    raise ValueError(f"Unsupported definition type: {path.suffix}")


def read_json(path: Path) -> dict[str, Any]:
    with path.open("r", encoding="utf-8-sig") as handle:
        data = json.load(handle)
    if not isinstance(data, dict):
        raise ValueError("Expected a top-level JSON object.")
    return data


def read_yaml(path: Path) -> dict[str, Any]:
    text = path.read_text(encoding="utf-8-sig")
    if yaml is not None:
        data = yaml.safe_load(text)
        if not isinstance(data, dict):
            raise ValueError("Expected a top-level YAML mapping.")
        return data
    return read_simple_yaml(text)


def read_csv(path: Path) -> list[dict[str, str]]:
    with path.open("r", encoding="utf-8-sig", newline="") as handle:
        return list(csv.DictReader(handle))


def read_simple_yaml(text: str) -> dict[str, Any]:
    vms: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    in_vms = False
    for raw in text.splitlines():
        stripped = raw.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped == "vms:":
            in_vms = True
            continue
        if not in_vms:
            continue
        item = re.match(r"^\s*-\s*([A-Za-z0-9_.-]+)\s*:\s*(.*)$", raw)
        if item:
            current = {item.group(1): parse_scalar(item.group(2))}
            vms.append(current)
            continue
        key_value = re.match(r"^\s{4,}([A-Za-z0-9_.-]+)\s*:\s*(.*)$", raw)
        if current is not None and key_value:
            current[key_value.group(1)] = parse_scalar(key_value.group(2))
    return {"vms": vms}


def parse_scalar(value: str) -> Any:
    clean = value.strip()
    comment_index = clean.find(" #")
    if comment_index >= 0:
        clean = clean[:comment_index].rstrip()
    if clean.lower() == "null":
        return None
    if clean.startswith("[") and clean.endswith("]"):
        inner = clean[1:-1].strip()
        return [] if not inner else [parse_scalar(part) for part in inner.split(",")]
    if (clean.startswith('"') and clean.endswith('"')) or (clean.startswith("'") and clean.endswith("'")):
        return clean[1:-1]
    if re.fullmatch(r"-?\d+", clean):
        return int(clean)
    if re.fullmatch(r"-?\d+\.\d+", clean):
        return float(clean)
    return clean


def validate_definition(path: Path) -> list[str]:
    data = read_definition(path)
    if "pods" in data:
        return validate_pods(data)
    if path.name.endswith(".tfvars.json") or "vsphere_server" in data:
        return validate_terraform(data)
    return validate_vms(data)


def validate_vms(data: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    vms = data.get("vms")
    if not isinstance(vms, list) or not vms:
        return ["ERROR: expected a non-empty top-level 'vms' list."]
    for index, vm in enumerate(vms, start=1):
        if not isinstance(vm, dict):
            issues.append(f"ERROR: VM row {index} is not an object.")
            continue
        name = first(vm, "vmname", "name") or f"VM row {index}"
        require_any(issues, vm, name, "VM name", "vmname", "name")
        require_any(issues, vm, name, "guest OS", "os", "guest_id", "GuestIDOS")
        require_any(issues, vm, name, "CPU", "cpu", "num_cpus", "NumCPU")
        require_any(issues, vm, name, "memory", "ramGB", "memory", "OSRamSize")
        require_any(issues, vm, name, "disk size", "diskGB", "disk_size", "OSDiskSize")
        require_any(issues, vm, name, "network", "network", "NetworkName", "vlan")
        for key in vm:
            if "pass" in key.lower() or "token" in key.lower():
                issues.append(f"WARNING: {name} has secret-looking field '{key}'. Keep secrets out of definitions.")
        ip = vm.get("ip")
        if ip:
            try:
                ipaddress.ip_address(str(ip))
            except ValueError:
                issues.append(f"WARNING: {name} has invalid IP address '{ip}'.")
    return issues


def validate_terraform(data: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    for key in ("vsphere_server", "datacenter", "cluster", "vms"):
        if key not in data or data[key] in ("", None, []):
            issues.append(f"ERROR: Terraform tfvars is missing '{key}'.")
    for index, vm in enumerate(data.get("vms", []), start=1):
        name = vm.get("name", f"Terraform VM row {index}") if isinstance(vm, dict) else f"Terraform VM row {index}"
        if not isinstance(vm, dict):
            issues.append(f"ERROR: {name} is not an object.")
            continue
        for key in ("name", "num_cpus", "memory", "disk_size", "datastore", "network", "guest_id", "iso_path"):
            if key not in vm or vm[key] in ("", None):
                issues.append(f"ERROR: {name} is missing '{key}'.")
    return issues


def validate_pods(data: dict[str, Any]) -> list[str]:
    issues: list[str] = []
    pods = data.get("pods")
    if not isinstance(pods, list) or not pods:
        return ["ERROR: expected a non-empty top-level 'pods' list."]
    for index, pod in enumerate(pods, start=1):
        if not isinstance(pod, dict):
            issues.append(f"ERROR: Pod row {index} is not an object.")
            continue
        name = pod.get("name", f"Pod row {index}")
        for key in ("name", "image"):
            if not pod.get(key):
                issues.append(f"ERROR: {name} is missing '{key}'.")
    return issues


def first(row: dict[str, Any], *keys: str) -> Any:
    for key in keys:
        if row.get(key) not in ("", None):
            return row[key]
    return None


def require_any(issues: list[str], row: dict[str, Any], name: str, label: str, *keys: str) -> None:
    if first(row, *keys) is None:
        issues.append(f"ERROR: {name} is missing {label}. Expected one of: {', '.join(keys)}.")


def write_definition(path: Path, data: dict[str, Any], target: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if target == "json":
        path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
        return
    if target == "yaml":
        if yaml is not None:
            path.write_text(yaml.safe_dump(data, sort_keys=False), encoding="utf-8")
        else:
            path.write_text(write_simple_yaml(data), encoding="utf-8")
        return
    if target == "csv":
        rows = data.get("vms")
        if not isinstance(rows, list) or not rows:
            raise ValueError("CSV conversion expects a non-empty 'vms' list.")
        fields = sorted({key for row in rows if isinstance(row, dict) for key in row})
        with path.open("w", encoding="utf-8", newline="") as handle:
            writer = csv.DictWriter(handle, fieldnames=fields)
            writer.writeheader()
            writer.writerows(rows)


def write_simple_yaml(data: dict[str, Any]) -> str:
    lines = ["vms:"]
    for row in data.get("vms", []):
        if not isinstance(row, dict):
            continue
        first_key = True
        for key, value in row.items():
            prefix = "  - " if first_key else "    "
            lines.append(f"{prefix}{key}: {format_yaml_value(value)}")
            first_key = False
    return "\n".join(lines) + "\n"


def format_yaml_value(value: Any) -> str:
    if value is None:
        return "null"
    if isinstance(value, list):
        return "[" + ", ".join(format_yaml_value(item) for item in value) + "]"
    if isinstance(value, str):
        if "\\" in value:
            return "'" + value.replace("'", "''") + "'"
        return json.dumps(value)
    return str(value).lower() if isinstance(value, bool) else str(value)


def write_template(template_type: str, output: Path) -> None:
    output.parent.mkdir(parents=True, exist_ok=True)
    if template_type == "powercli-yaml":
        output.write_text(POWERCLI_YAML, encoding="utf-8")
    elif template_type == "powercli-json":
        output.write_text(json.dumps(POWERCLI_JSON, indent=2) + "\n", encoding="utf-8")
    elif template_type == "powercli-csv":
        output.write_text(
            "vmname,iso,os,cpu,ramGB,diskGB,datastore,network,ip,subnet,gateway,dns,roles\n"
            r"iis-web-01,\\storage\isos\en_windows_server_2022_x64.iso,windows2019Server64Guest,4,8,60,datastore1,VM Network,192.168.10.11,255.255.255.0,192.168.10.1,192.168.10.10,IIS"
            "\n",
            encoding="utf-8",
        )
    elif template_type == "terraform-json":
        output.write_text(json.dumps(TERRAFORM_JSON, indent=2) + "\n", encoding="utf-8")
    elif template_type == "kubernetes-json":
        output.write_text(json.dumps(KUBERNETES_JSON, indent=2) + "\n", encoding="utf-8")
    else:
        raise ValueError(f"Unknown template type: {template_type}")


if __name__ == "__main__":
    raise SystemExit(main())

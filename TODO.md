# TODO

## Refine C# app

- Split `MainForm` into smaller tab/user-control classes.
- Add richer schema-backed validation for YAML, JSON, CSV, Terraform tfvars, and Kubernetes pod inputs.
- Add save-state for recent project folders, definition files, vCenter server, cluster, and artifact path.
- Add safer command presets for dry-run, artifact-only, WhatIf, and approved provisioning.
- Improve dark-mode polish for list headers, tab headers, and long-form guide rendering.

## Refine guides

- Add screenshots after the UI stabilizes.
- Add a beginner walkthrough for first VM, four-node IIS/API cluster, Terraform path, and Kubernetes pod path.
- Add troubleshooting sections for PowerCLI module install, PowerShell execution policy, Python virtual environments, Terraform provider auth, and kubectl context issues.
- Add examples for Linux kickstart once that workflow is promoted beyond prototype.

## Cleanup scripts and essentials

- Convert legacy `Multi_Install_ISO` script into parameterized functions or retire it after `Build-Cluster.ps1` reaches parity.
- Move repeated YAML parsing helpers into a shared PowerShell module.
- Replace environment-specific paths with parameters and documented defaults.
- Add Pester tests for definition parsing, build-plan generation, and script validation.
- Add CI checks for PowerShell parse, strict JSON, Python helper validation, and C# build.
- Complete environment-specific answer-file attachment logic for vSphere ISO/floppy/datastore conventions.

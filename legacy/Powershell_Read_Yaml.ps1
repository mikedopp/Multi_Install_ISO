if (-not (Get-Module -ListAvailable -Name powershell-yaml)) {
    Write-Warning "powershell-yaml is not installed. Run: Install-Module powershell-yaml -Scope CurrentUser -Force"
}

. (Join-Path $PSScriptRoot 'Read-VmDefinition.ps1')

# Example:
# $definition = Read-VmDefinition -Path (Join-Path $PSScriptRoot 'cluster-vms.yaml')
# $definition.vms | Select-Object vmname, os, cpu, ramGB, diskGB

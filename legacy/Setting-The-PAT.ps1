<#
.SYNOPSIS
    Starts a safe dry-run build using an existing AZURE_DEVOPS_PAT value.
#>

[CmdletBinding()]
param(
    [string]$DefinitionPath = 'cluster-vms.yaml'
)

if (-not $env:AZURE_DEVOPS_PAT) {
    Write-Warning 'AZURE_DEVOPS_PAT is not set. Post-deploy git clone steps will need a token at runtime.'
}

& (Join-Path $PSScriptRoot 'Build-Cluster.ps1') -DefinitionPath $DefinitionPath -PlanOnly

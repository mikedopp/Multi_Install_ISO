<#
.SYNOPSIS
    Converts windows-pods.json into one Kubernetes Pod manifest per pod (Windows nodes).
.DESCRIPTION
    Writes <name>.json files to -OutputDirectory. It does not call kubectl; apply the
    manifests yourself after review.
#>
[CmdletBinding()]
param(
    [string]$Path = (Join-Path $PSScriptRoot 'windows-pods.json'),
    [string]$OutputDirectory = (Join-Path $PSScriptRoot 'out')
)

Set-StrictMode -Version 3.0
$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $Path)) { throw "Pod definition file not found: $Path" }
$json = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json -AsHashtable
if (-not $json.Contains('pods')) { throw "$Path must contain a 'pods' array." }
New-Item -ItemType Directory -Path $OutputDirectory -Force | Out-Null

foreach ($pod in $json.pods) {
    if (-not $pod.name -or -not $pod.image) { throw 'Each pod needs name and image.' }
    $volumes = @(if ($pod.Contains('volumes')) { $pod.volumes })
    $container = [ordered]@{ name = $pod.name; image = $pod.image }
    if ($pod.Contains('ports')) { $container.ports = @($pod.ports) }
    if ($pod.Contains('env')) { $container.env = @($pod.env) }
    if ($volumes.Count -gt 0) {
        $container.volumeMounts = @($volumes | ForEach-Object { [ordered]@{ name = $_.name; mountPath = $_.hostPath.path } })
    }
    $spec = [ordered]@{ nodeSelector = @{ 'kubernetes.io/os' = 'windows' }; containers = @($container) }
    if ($volumes.Count -gt 0) {
        $spec.volumes = @($volumes | ForEach-Object { [ordered]@{ name = $_.name; hostPath = [ordered]@{ path = $_.hostPath.path } } })
    }
    $manifest = [ordered]@{ apiVersion = 'v1'; kind = 'Pod'; metadata = @{ name = $pod.name }; spec = $spec }
    $out = Join-Path $OutputDirectory "$($pod.name).json"
    $manifest | ConvertTo-Json -Depth 10 | Set-Content -LiteralPath $out -Encoding utf8
    Write-Host "Wrote $out"
}

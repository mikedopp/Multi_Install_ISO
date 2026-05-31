param(
    [string]$Path = (Join-Path $PSScriptRoot "windows-pods.json")
)

if (-not (Test-Path -LiteralPath $Path)) {
    throw "Pod definition file not found: $Path"
}

$json = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
foreach ($pod in $json.pods) {
    $manifest = @{
        apiVersion = "v1"
        kind = "Pod"
        metadata = @{ name = $pod.name }
        spec = @{
            nodeSelector = @{ "kubernetes.io/os" = "windows" }
            containers = @(
                @{
                    name = $pod.name
                    image = $pod.image
                    ports = $pod.ports
                    env = $pod.env
                    volumeMounts = @(
                        @{ name = $pod.volumes[0].name; mountPath = $pod.volumes[0].hostPath.path }
                    )
                }
            )
            volumes = @(
                @{ name = $pod.volumes[0].name; hostPath = @{ path = $pod.volumes[0].hostPath.path } }
            )
        }
    }
    $manifest | ConvertTo-Json -Depth 10 | Out-File "$($pod.name).json"
}

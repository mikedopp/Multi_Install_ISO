#Function to read a YAML file and Convert it to Powershell Object

function Read-VmDefinition {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, Position = 0)]
        [string]$Path,

        [switch]$AsJson   # Optionally also output JSON
    )

    if (-not (Test-Path $Path)) {
        throw "File not found: $Path"
    }

    $raw = Get-Content -Path $Path -Raw
    try {
        $obj = ConvertFrom-Yaml -Yaml $raw
    }
    catch {
        throw "Failed to parse YAML: $_"
    }

    if ($AsJson) {
        $obj | ConvertTo-Json -Depth 10
    }
    else {
        $obj   # Returns a PSCustomObject
    }
}

# Example usage:
#$vms = Read-VmDefinition -Path 'C:\config\vms.yaml'
#$vms.vms | ForEach-Object { Write-Host "VM: $($_.vmname)" }

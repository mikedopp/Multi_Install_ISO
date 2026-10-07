function Read-VmDefinition {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory, Position = 0)]
        [string]$Path,

        [switch]$AsJson
    )

    if (-not (Test-Path -LiteralPath $Path)) {
        throw "File not found: $Path"
    }

    $extension = [System.IO.Path]::GetExtension($Path).ToLowerInvariant()
    switch ($extension) {
        '.json' {
            $obj = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
        }
        '.csv' {
            $obj = [pscustomobject]@{ vms = @(Import-Csv -LiteralPath $Path) }
        }
        { $_ -in @('.yml', '.yaml') } {
            if (-not (Get-Command ConvertFrom-Yaml -ErrorAction SilentlyContinue)) {
                if (-not (Get-Module -ListAvailable -Name powershell-yaml)) {
                    Write-Warning "powershell-yaml is not installed. Using the built-in simple YAML reader for this VM definition."
                    $obj = ConvertFrom-SimpleVmYaml -Path $Path
                    break
                }
                Import-Module powershell-yaml -Force
            }
            $obj = Get-Content -LiteralPath $Path -Raw | ConvertFrom-Yaml
        }
        default {
            throw "Unsupported definition type '$extension'. Use YAML, JSON, or CSV."
        }
    }

    if ($AsJson) {
        return ($obj | ConvertTo-Json -Depth 20)
    }

    return $obj
}

function ConvertFrom-SimpleVmYaml {
    param([string]$Path)

    $vms = @()
    $current = $null
    $inVms = $false
    foreach ($line in Get-Content -LiteralPath $Path) {
        $trimmed = $line.Trim()
        if ($trimmed.Length -eq 0 -or $trimmed.StartsWith('#')) {
            continue
        }

        if ($trimmed -eq 'vms:') {
            $inVms = $true
            continue
        }

        if (-not $inVms) {
            continue
        }

        if ($line -match '^\s*-\s*([A-Za-z0-9_.-]+)\s*:\s*(.*)$') {
            if ($null -ne $current) {
                $vms += [pscustomobject]$current
            }
            $current = [ordered]@{}
            $current[$matches[1]] = Convert-SimpleYamlValue -Value $matches[2]
            continue
        }

        if ($null -ne $current -and $line -match '^\s{4,}([A-Za-z0-9_.-]+)\s*:\s*(.*)$') {
            $current[$matches[1]] = Convert-SimpleYamlValue -Value $matches[2]
        }
    }

    if ($null -ne $current) {
        $vms += [pscustomobject]$current
    }

    [pscustomobject]@{ vms = $vms }
}

function Convert-SimpleYamlValue {
    param([string]$Value)

    $clean = $Value.Trim()
    $commentIndex = $clean.IndexOf(' #')
    if ($commentIndex -ge 0) {
        $clean = $clean.Substring(0, $commentIndex).TrimEnd()
    }

    if ($clean -eq 'null') {
        return $null
    }

    if ($clean.StartsWith('[') -and $clean.EndsWith(']')) {
        $inner = $clean.Substring(1, $clean.Length - 2).Trim()
        if ($inner.Length -eq 0) {
            return @()
        }
        return @($inner -split ',' | ForEach-Object { Convert-SimpleYamlValue -Value $_ })
    }

    if (($clean.StartsWith('"') -and $clean.EndsWith('"')) -or ($clean.StartsWith("'") -and $clean.EndsWith("'"))) {
        return $clean.Substring(1, $clean.Length - 2)
    }

    if ($clean -match '^-?\d+$') {
        return [int]$clean
    }

    if ($clean -match '^-?\d+\.\d+$') {
        return [double]$clean
    }

    return $clean
}

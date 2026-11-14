# Built-in YAML subset reader. It is the only YAML parser the project uses, so the
# PowerShell engine and the operator app always read a definition the same way.
#
# Supported: block mappings, block sequences (including "- key: value" items),
# flow sequences ([a, b]), single/double quoted scalars, comments, null/true/false,
# integers and decimals. Rejected with a line number: tabs in indentation, anchors,
# aliases, tags, block scalars (| and >), and flow mappings.

function Remove-MiiYamlComment {
    param([string]$Text)

    $inSingle = $false
    $inDouble = $false
    for ($i = 0; $i -lt $Text.Length; $i++) {
        $c = $Text[$i]
        if ($c -eq "'" -and -not $inDouble) { $inSingle = -not $inSingle; continue }
        if ($c -eq '"' -and -not $inSingle) {
            if ($i -gt 0 -and $Text[$i - 1] -eq '\' -and $inDouble) { continue }
            $inDouble = -not $inDouble
            continue
        }
        if ($c -eq '#' -and -not $inSingle -and -not $inDouble -and ($i -eq 0 -or [char]::IsWhiteSpace($Text[$i - 1]))) {
            return $Text.Substring(0, $i).TrimEnd()
        }
    }
    return $Text.TrimEnd()
}

function Split-MiiYamlFlow {
    param([string]$Inner)

    $items = New-Object System.Collections.Generic.List[string]
    $sb = New-Object System.Text.StringBuilder
    $inSingle = $false
    $inDouble = $false
    foreach ($c in $Inner.ToCharArray()) {
        if ($c -eq "'" -and -not $inDouble) { $inSingle = -not $inSingle }
        elseif ($c -eq '"' -and -not $inSingle) { $inDouble = -not $inDouble }
        if ($c -eq ',' -and -not $inSingle -and -not $inDouble) {
            $items.Add($sb.ToString().Trim())
            [void]$sb.Clear()
            continue
        }
        [void]$sb.Append($c)
    }
    if ($sb.Length -gt 0 -or $items.Count -gt 0) { $items.Add($sb.ToString().Trim()) }
    return , $items.ToArray()
}

function ConvertFrom-MiiYamlScalar {
    param([string]$Value, [int]$LineNumber)

    $v = $Value.Trim()
    if ($v.Length -eq 0 -or $v -eq '~' -or $v -ceq 'null' -or $v -ceq 'Null' -or $v -ceq 'NULL') { return $null }

    if ($v.StartsWith('&') -or $v.StartsWith('*') -or $v.StartsWith('!')) {
        throw "YAML line ${LineNumber}: anchors, aliases, and tags are not supported."
    }
    if ($v -eq '|' -or $v -eq '>' -or $v -match '^[|>][+-]?\d*$') {
        throw "YAML line ${LineNumber}: block scalars (| and >) are not supported. Use a quoted single-line value."
    }
    if ($v.StartsWith('{')) {
        throw "YAML line ${LineNumber}: flow mappings ({...}) are not supported. Use an indented mapping."
    }

    if ($v.StartsWith('[')) {
        if (-not $v.EndsWith(']')) { throw "YAML line ${LineNumber}: unterminated flow sequence." }
        $inner = $v.Substring(1, $v.Length - 2).Trim()
        if ($inner.Length -eq 0) { return , @() }
        $parts = Split-MiiYamlFlow -Inner $inner
        $result = foreach ($p in $parts) { ConvertFrom-MiiYamlScalar -Value $p -LineNumber $LineNumber }
        return , @($result)
    }

    if ($v.StartsWith("'")) {
        if (-not $v.EndsWith("'") -or $v.Length -lt 2) { throw "YAML line ${LineNumber}: unterminated single-quoted value." }
        return $v.Substring(1, $v.Length - 2).Replace("''", "'")
    }

    if ($v.StartsWith('"')) {
        if (-not $v.EndsWith('"') -or $v.Length -lt 2) { throw "YAML line ${LineNumber}: unterminated double-quoted value." }
        $body = $v.Substring(1, $v.Length - 2)
        $sb = New-Object System.Text.StringBuilder
        for ($i = 0; $i -lt $body.Length; $i++) {
            $c = $body[$i]
            if ($c -eq '\' -and $i + 1 -lt $body.Length) {
                $i++
                switch -CaseSensitive ($body[$i]) {
                    'n' { [void]$sb.Append("`n") }
                    't' { [void]$sb.Append("`t") }
                    'r' { [void]$sb.Append("`r") }
                    '"' { [void]$sb.Append('"') }
                    '\' { [void]$sb.Append('\') }
                    '0' { [void]$sb.Append([char]0) }
                    default { [void]$sb.Append('\').Append($body[$i]) }
                }
                continue
            }
            [void]$sb.Append($c)
        }
        return $sb.ToString()
    }

    if ($v -ceq 'true' -or $v -ceq 'True' -or $v -ceq 'TRUE') { return $true }
    if ($v -ceq 'false' -or $v -ceq 'False' -or $v -ceq 'FALSE') { return $false }
    if ($v -match '^-?\d+$') {
        $long = 0L
        if ([long]::TryParse($v, [ref]$long)) {
            if ($long -ge [int]::MinValue -and $long -le [int]::MaxValue) { return [int]$long }
            return $long
        }
    }
    if ($v -match '^-?\d+\.\d+$') {
        return [double]::Parse($v, [Globalization.CultureInfo]::InvariantCulture)
    }
    return $v
}

function Split-MiiYamlKeyValue {
    # Returns @(key, rest) when the text is "key: value" or "key:", otherwise $null.
    param([string]$Text)

    $key = $null
    $restStart = -1
    if ($Text.StartsWith('"') -or $Text.StartsWith("'")) {
        $quote = $Text[0]
        $end = $Text.IndexOf($quote, 1)
        if ($end -lt 0) { return $null }
        $after = $Text.Substring($end + 1)
        if ($after -notmatch '^\s*:(\s|$)') { return $null }
        $key = $Text.Substring(1, $end - 1)
        $restStart = $end + 1 + $after.IndexOf(':') + 1
    }
    else {
        $m = [regex]::Match($Text, '^([^:#\[\]{},"'']+?)\s*:(\s|$)')
        if (-not $m.Success) { return $null }
        $key = $m.Groups[1].Value.Trim()
        $restStart = $m.Groups[1].Index + $m.Groups[1].Length
        $restStart = $Text.IndexOf(':', $restStart) + 1
    }
    $rest = if ($restStart -lt $Text.Length) { $Text.Substring($restStart).Trim() } else { '' }
    return , @($key, $rest)
}

function Read-MiiYamlBlock {
    param([hashtable]$State, [int]$Indent)

    $lines = $State.Lines
    if ($State.Index -ge $lines.Count) { return $null }
    $first = $lines[$State.Index]
    if ($first.Indent -ne $Indent) { return $null }

    if ($first.Text -eq '-' -or $first.Text.StartsWith('- ')) {
        $list = New-Object System.Collections.Generic.List[object]
        while ($State.Index -lt $lines.Count) {
            $line = $lines[$State.Index]
            if ($line.Indent -lt $Indent) { break }
            if ($line.Indent -gt $Indent) { throw "YAML line $($line.Number): unexpected indentation." }
            if (-not ($line.Text -eq '-' -or $line.Text.StartsWith('- '))) {
                throw "YAML line $($line.Number): expected a '- ' sequence item."
            }

            $rest = if ($line.Text.Length -gt 1) { $line.Text.Substring(1).TrimStart() } else { '' }
            if ($rest.Length -eq 0) {
                $State.Index++
                if ($State.Index -lt $lines.Count -and $lines[$State.Index].Indent -gt $Indent) {
                    $list.Add((Read-MiiYamlBlock -State $State -Indent $lines[$State.Index].Indent))
                }
                else {
                    $list.Add($null)
                }
                continue
            }

            $kv = Split-MiiYamlKeyValue -Text $rest
            if ($null -ne $kv) {
                # "- key: value" starts a mapping whose keys align with "key".
                $childIndent = $line.Indent + ($line.Text.Length - $rest.Length)
                $lines[$State.Index] = [pscustomobject]@{ Indent = $childIndent; Text = $rest; Number = $line.Number }
                $list.Add((Read-MiiYamlBlock -State $State -Indent $childIndent))
                continue
            }

            $list.Add((ConvertFrom-MiiYamlScalar -Value $rest -LineNumber $line.Number))
            $State.Index++
        }
        return , $list.ToArray()
    }

    $map = [ordered]@{}
    while ($State.Index -lt $lines.Count) {
        $line = $lines[$State.Index]
        if ($line.Indent -lt $Indent) { break }
        if ($line.Indent -gt $Indent) { throw "YAML line $($line.Number): unexpected indentation." }
        if ($line.Text -eq '-' -or $line.Text.StartsWith('- ')) { break }

        $kv = Split-MiiYamlKeyValue -Text $line.Text
        if ($null -eq $kv) { throw "YAML line $($line.Number): expected 'key: value'." }
        $key = $kv[0]
        $rest = $kv[1]
        if ($map.Contains($key)) { throw "YAML line $($line.Number): duplicate key '$key'." }
        $State.Index++

        if ($rest.Length -gt 0) {
            $map[$key] = ConvertFrom-MiiYamlScalar -Value $rest -LineNumber $line.Number
            continue
        }

        if ($State.Index -lt $lines.Count) {
            $next = $lines[$State.Index]
            $isSeq = $next.Text -eq '-' -or $next.Text.StartsWith('- ')
            # A sequence may sit at the same indent as its parent key.
            if ($next.Indent -gt $Indent -or ($next.Indent -eq $Indent -and $isSeq)) {
                $map[$key] = Read-MiiYamlBlock -State $State -Indent $next.Indent
                continue
            }
        }
        $map[$key] = $null
    }
    return $map
}

function ConvertFrom-MiiYaml {
    <#
    .SYNOPSIS
        Parses the supported YAML subset into ordered hashtables and arrays.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory, ValueFromPipeline)][AllowEmptyString()][string]$Yaml)

    $raw = $Yaml -split "`r?`n"
    $lines = New-Object System.Collections.Generic.List[object]
    for ($n = 0; $n -lt $raw.Count; $n++) {
        $text = $raw[$n]
        if ($n -eq 0 -and $text.Length -gt 0 -and $text[0] -eq [char]0xFEFF) { $text = $text.Substring(1) }
        $leading = [regex]::Match($text, '^[ \t]*').Value
        if ($leading.Contains("`t")) { throw "YAML line $($n + 1): tabs are not allowed in indentation." }
        $content = Remove-MiiYamlComment -Text $text.Substring($leading.Length)
        if ($content.Length -eq 0) { continue }
        if ($content -eq '---' -or $content -eq '...') { continue }
        $lines.Add([pscustomobject]@{ Indent = $leading.Length; Text = $content; Number = $n + 1 })
    }

    if ($lines.Count -eq 0) { return $null }
    $state = @{ Lines = $lines; Index = 0 }
    $result = Read-MiiYamlBlock -State $state -Indent $lines[0].Indent
    if ($state.Index -lt $lines.Count) {
        throw "YAML line $($lines[$state.Index].Number): unexpected content."
    }
    return , $result
}

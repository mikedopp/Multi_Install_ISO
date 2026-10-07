# ISO image writing (Windows IMAPI2FS, built in) and reading (ISO 9660 / Joliet parser,
# UDF detection, WIM image list). No external tools are needed.

$script:MiiIsoWriterLoaded = $false

function Initialize-MiiIsoWriter {
    if ($script:MiiIsoWriterLoaded) { return }
    if (-not ('MultiInstallIso.IsoStreamWriter' -as [type])) {
        Add-Type -TypeDefinition @'
using System;
using System.IO;
using System.Runtime.InteropServices;
using System.Runtime.InteropServices.ComTypes;

namespace MultiInstallIso
{
    public static class IsoStreamWriter
    {
        public static long Save(object imageStream, string path)
        {
            var source = (IStream)imageStream;
            var buffer = new byte[2048 * 64];
            IntPtr readPtr = Marshal.AllocHGlobal(sizeof(int));
            long total = 0;
            try
            {
                using (var output = new FileStream(path, FileMode.CreateNew, FileAccess.Write))
                {
                    while (true)
                    {
                        Marshal.WriteInt32(readPtr, 0);
                        source.Read(buffer, buffer.Length, readPtr);
                        int read = Marshal.ReadInt32(readPtr);
                        if (read <= 0) break;
                        output.Write(buffer, 0, read);
                        total += read;
                    }
                }
            }
            finally
            {
                Marshal.FreeHGlobal(readPtr);
            }
            return total;
        }
    }
}
'@
    }
    $script:MiiIsoWriterLoaded = $true
}

function New-MiiIsoImage {
    <#
    .SYNOPSIS
        Writes the contents of a folder to an ISO 9660 + Joliet image.
    #>
    [CmdletBinding()]
    param(
        [Parameter(Mandatory)][string]$SourceDirectory,
        [Parameter(Mandatory)][string]$Path,
        [Parameter(Mandatory)][ValidatePattern('^[A-Za-z0-9_]{1,16}$')][string]$VolumeLabel,
        [switch]$IncludeUdf
    )

    if (-not (Test-Path -LiteralPath $SourceDirectory -PathType Container)) { throw "Source folder not found: $SourceDirectory" }
    if (Test-Path -LiteralPath $Path) { throw "Refusing to overwrite existing image: $Path" }
    Initialize-MiiIsoWriter

    try { $fsi = New-Object -ComObject IMAPI2FS.MsftFileSystemImage }
    catch { throw "Windows IMAPI2FS is unavailable, so ISO images cannot be built on this machine: $($_.Exception.Message)" }

    # ChooseImageDefaults resets the file systems (to UDF), so pick them afterwards.
    $fsi.ChooseImageDefaultsForMediaType(12)   # IMAPI_MEDIA_TYPE_DISK
    $fsi.FileSystemsToCreate = 3               # ISO 9660 + Joliet; Anaconda's OEMDRV lookup needs the ISO 9660 label
    if ($IncludeUdf) { $fsi.FileSystemsToCreate = 7 }
    $fsi.VolumeName = $VolumeLabel
    $fsi.Root.AddTree((Resolve-Path -LiteralPath $SourceDirectory).ProviderPath, $false)
    $result = $fsi.CreateResultImage()
    $bytes = [MultiInstallIso.IsoStreamWriter]::Save($result.ImageStream, [IO.Path]::GetFullPath($Path))
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($result)
    [void][Runtime.InteropServices.Marshal]::ReleaseComObject($fsi)
    return [pscustomobject]@{ Path = [IO.Path]::GetFullPath($Path); Bytes = $bytes; VolumeLabel = $VolumeLabel }
}

function Read-MiiIsoSector {
    param([IO.Stream]$Stream, [long]$Lba, [int]$Length = 2048)
    $buf = [byte[]]::new($Length)
    [void]$Stream.Seek($Lba * 2048, [IO.SeekOrigin]::Begin)
    $read = 0
    while ($read -lt $Length) {
        $n = $Stream.Read($buf, $read, $Length - $read)
        if ($n -le 0) { break }
        $read += $n
    }
    return , $buf
}

function Read-MiiIsoDirectory {
    param([IO.Stream]$Stream, [long]$Lba, [long]$Size, [bool]$Joliet, [string]$Prefix, [System.Collections.Generic.List[object]]$Into, [int]$Depth)

    if ($Depth -gt 16) { return }
    $data = Read-MiiIsoSector -Stream $Stream -Lba $Lba -Length ([int][math]::Min($Size, 4MB))
    $pos = 0
    while ($pos -lt $data.Length) {
        $len = $data[$pos]
        if ($len -eq 0) {
            $pos = ([math]::Floor($pos / 2048) + 1) * 2048   # records never cross a sector
            continue
        }
        $extent = [BitConverter]::ToUInt32($data, $pos + 2)
        $dataLength = [BitConverter]::ToUInt32($data, $pos + 10)
        $flags = $data[$pos + 25]
        $nameLen = $data[$pos + 32]
        $nameBytes = [byte[]]::new($nameLen)
        [Array]::Copy($data, $pos + 33, $nameBytes, 0, $nameLen)
        $pos += $len

        if ($nameLen -eq 1 -and ($nameBytes[0] -eq 0 -or $nameBytes[0] -eq 1)) { continue }
        $name = if ($Joliet) { [Text.Encoding]::BigEndianUnicode.GetString($nameBytes) } else { [Text.Encoding]::ASCII.GetString($nameBytes) }
        $name = ($name -replace ';\d+$', '').TrimEnd('.')
        $full = if ($Prefix) { "$Prefix/$name" } else { $name }
        $isDir = ($flags -band 2) -ne 0
        $Into.Add([pscustomobject]@{ Path = $full; IsDirectory = $isDir; Size = [long]$dataLength; Lba = [long]$extent })
        if ($isDir) { Read-MiiIsoDirectory -Stream $Stream -Lba $extent -Size $dataLength -Joliet $Joliet -Prefix $full -Into $Into -Depth ($Depth + 1) }
    }
}

function Get-MiiIsoInfo {
    <#
    .SYNOPSIS
        Reads an ISO image's volume descriptors and file list without mounting it.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Path, [switch]$NoFileList)

    $full = (Resolve-Path -LiteralPath $Path).ProviderPath
    $stream = [IO.File]::OpenRead($full)
    try {
        $pvd = $null; $svd = $null; $hasUdf = $false; $hasIso = $false
        for ($lba = 16; $lba -lt 64; $lba++) {
            $sector = Read-MiiIsoSector -Stream $stream -Lba $lba
            $id = [Text.Encoding]::ASCII.GetString($sector, 1, 5)
            if ($id -in 'BEA01', 'NSR02', 'NSR03', 'TEA01') { if ($id -like 'NSR*') { $hasUdf = $true }; continue }
            if ($id -ne 'CD001') { if ($hasIso) { break } else { continue } }
            $hasIso = $true
            $type = $sector[0]
            if ($type -eq 1 -and -not $pvd) { $pvd = $sector }
            elseif ($type -eq 2 -and $sector[88] -eq 0x25 -and $sector[89] -eq 0x2F -and $sector[90] -in 0x40, 0x43, 0x45) { $svd = $sector }
            elseif ($type -eq 255) { continue }
        }

        if (-not $pvd) {
            return [pscustomobject]@{ Path = $full; IsIso = $false; HasJoliet = $false; HasUdf = $hasUdf; VolumeLabel = $null; Files = @() }
        }

        $useJoliet = $null -ne $svd
        $desc = if ($useJoliet) { $svd } else { $pvd }
        $label = if ($useJoliet) { [Text.Encoding]::BigEndianUnicode.GetString($desc, 40, 32) } else { [Text.Encoding]::ASCII.GetString($desc, 40, 32) }
        $files = New-Object System.Collections.Generic.List[object]
        if (-not $NoFileList) {
            $rootExtent = [BitConverter]::ToUInt32($desc, 156 + 2)
            $rootSize = [BitConverter]::ToUInt32($desc, 156 + 10)
            Read-MiiIsoDirectory -Stream $stream -Lba $rootExtent -Size $rootSize -Joliet $useJoliet -Prefix '' -Into $files -Depth 0
        }
        [pscustomobject]@{
            Path        = $full
            IsIso       = $true
            HasJoliet   = $useJoliet
            HasUdf      = $hasUdf
            VolumeLabel = $label.Trim([char]0, ' ')
            Files       = $files.ToArray()
        }
    }
    finally { $stream.Dispose() }
}

function Read-MiiIsoFile {
    <#
    .SYNOPSIS
        Returns the bytes of one file inside an ISO 9660 / Joliet image.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Path, [Parameter(Mandatory)][string]$InnerPath)

    $info = Get-MiiIsoInfo -Path $Path
    $want = $InnerPath.Replace('\', '/').TrimStart('/')
    $entry = $info.Files | Where-Object { -not $_.IsDirectory -and [string]::Equals($_.Path, $want, [StringComparison]::OrdinalIgnoreCase) } | Select-Object -First 1
    if (-not $entry) { throw "File '$InnerPath' is not in $Path." }
    $stream = [IO.File]::OpenRead($info.Path)
    try { return , (Read-MiiIsoSector -Stream $stream -Lba $entry.Lba -Length ([int]$entry.Size)) }
    finally { $stream.Dispose() }
}

function Get-MiiWimImageList {
    <#
    .SYNOPSIS
        Lists the images inside install.wim / install.esd by reading the WIM XML resource.
    #>
    [CmdletBinding()]
    param([Parameter(Mandatory)][string]$Path)

    $stream = [IO.File]::OpenRead((Resolve-Path -LiteralPath $Path).ProviderPath)
    try {
        $header = [byte[]]::new(208)
        [void]$stream.Read($header, 0, 208)
        if ([Text.Encoding]::ASCII.GetString($header, 0, 5) -ne 'MSWIM') { throw "$Path is not a WIM/ESD file." }
        $xmlSize = [BitConverter]::ToUInt64(([byte[]]($header[72..78] + 0)), 0)
        $xmlFlags = $header[79]
        $xmlOffset = [BitConverter]::ToInt64($header, 80)
        if ($xmlFlags -band 0x04) { throw 'WIM XML resource is compressed; this reader handles uncompressed XML only.' }
        if ($xmlSize -le 0 -or $xmlSize -gt 64MB) { throw "WIM XML resource size $xmlSize is not plausible." }
        $buf = [byte[]]::new([int]$xmlSize)
        [void]$stream.Seek($xmlOffset, [IO.SeekOrigin]::Begin)
        $read = 0
        while ($read -lt $buf.Length) { $n = $stream.Read($buf, $read, $buf.Length - $read); if ($n -le 0) { break }; $read += $n }
    }
    finally { $stream.Dispose() }

    [xml]$xml = [Text.Encoding]::Unicode.GetString($buf).TrimStart([char]0xFEFF).TrimEnd([char]0)
    function Get-Text([Xml.XmlNode]$Node, [string]$XPath) {
        $n = $Node.SelectSingleNode($XPath)
        if ($n) { return $n.InnerText } else { return '' }
    }
    foreach ($image in $xml.SelectNodes('/WIM/IMAGE')) {
        $major = Get-Text $image 'WINDOWS/VERSION/MAJOR'
        [pscustomobject]@{
            Index       = [int]$image.GetAttribute('INDEX')
            Name        = Get-Text $image 'NAME'
            DisplayName = Get-Text $image 'DISPLAYNAME'
            Description = Get-Text $image 'DESCRIPTION'
            Edition     = Get-Text $image 'WINDOWS/EDITIONID'
            Version     = $(if ($major) { '{0}.{1}.{2}' -f $major, (Get-Text $image 'WINDOWS/VERSION/MINOR'), (Get-Text $image 'WINDOWS/VERSION/BUILD') } else { '' })
        }
    }
}

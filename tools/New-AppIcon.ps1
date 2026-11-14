#Requires -Version 7.2
<#
.SYNOPSIS
    Draws the app icon (stacked install discs) and writes a multi-size .ico and a 256 px .png.
#>
param([string]$OutDirectory = (Join-Path $PSScriptRoot '..\src\MultiInstallIso.App\Assets'))

Add-Type -AssemblyName System.Drawing
New-Item -ItemType Directory -Path $OutDirectory -Force | Out-Null

function New-IconBitmap([int]$Size) {
    $bmp = [Drawing.Bitmap]::new($Size, $Size, [Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = 'AntiAlias'
    $g.Clear([Drawing.Color]::Transparent)
    $s = $Size / 256.0

    # Rounded tile.
    $r = 56 * $s
    $path = [Drawing.Drawing2D.GraphicsPath]::new()
    $rect = [Drawing.RectangleF]::new(8 * $s, 8 * $s, 240 * $s, 240 * $s)
    $path.AddArc($rect.X, $rect.Y, $r, $r, 180, 90)
    $path.AddArc($rect.Right - $r, $rect.Y, $r, $r, 270, 90)
    $path.AddArc($rect.Right - $r, $rect.Bottom - $r, $r, $r, 0, 90)
    $path.AddArc($rect.X, $rect.Bottom - $r, $r, $r, 90, 90)
    $path.CloseFigure()
    $bg = [Drawing.Drawing2D.LinearGradientBrush]::new($rect, [Drawing.Color]::FromArgb(255, 34, 58, 94), [Drawing.Color]::FromArgb(255, 14, 22, 38), 60)
    $g.FillPath($bg, $path)
    $g.DrawPath([Drawing.Pen]::new([Drawing.Color]::FromArgb(90, 160, 200, 255), [Math]::Max(1, 4 * $s)), $path)

    # Three stacked discs, back to front.
    $discs = @(
        @{ X = 70; Y = 54; C1 = [Drawing.Color]::FromArgb(255, 88, 120, 170); C2 = [Drawing.Color]::FromArgb(255, 50, 72, 110) },
        @{ X = 54; Y = 70; C1 = [Drawing.Color]::FromArgb(255, 120, 170, 230); C2 = [Drawing.Color]::FromArgb(255, 60, 100, 160) },
        @{ X = 38; Y = 86; C1 = [Drawing.Color]::FromArgb(255, 170, 225, 255); C2 = [Drawing.Color]::FromArgb(255, 70, 150, 220) }
    )
    foreach ($d in $discs) {
        $dr = [Drawing.RectangleF]::new($d.X * $s, $d.Y * $s, 132 * $s, 132 * $s)
        $brush = [Drawing.Drawing2D.LinearGradientBrush]::new($dr, $d.C1, $d.C2, 45)
        $g.FillEllipse($brush, $dr)
        $g.DrawEllipse([Drawing.Pen]::new([Drawing.Color]::FromArgb(160, 255, 255, 255), [Math]::Max(1, 3 * $s)), $dr)
        $hole = 30 * $s
        $cx = $dr.X + $dr.Width / 2; $cy = $dr.Y + $dr.Height / 2
        $g.FillEllipse([Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(255, 18, 28, 46)), $cx - $hole / 2, $cy - $hole / 2, $hole, $hole)
    }
    # Glass highlight on the front disc.
    $hl = [Drawing.RectangleF]::new(58 * $s, 98 * $s, 70 * $s, 40 * $s)
    $g.FillEllipse([Drawing.SolidBrush]::new([Drawing.Color]::FromArgb(70, 255, 255, 255)), $hl)
    $g.Dispose()
    return $bmp
}

$sizes = 16, 24, 32, 48, 64, 128, 256
$pngs = foreach ($size in $sizes) {
    $bmp = New-IconBitmap $size
    $ms = [IO.MemoryStream]::new()
    $bmp.Save($ms, [Drawing.Imaging.ImageFormat]::Png)
    if ($size -eq 256) { $bmp.Save((Join-Path $OutDirectory 'MultiInstallIso.png'), [Drawing.Imaging.ImageFormat]::Png) }
    $bmp.Dispose()
    , $ms.ToArray()
}

# ICO container with PNG-compressed entries.
$out = [IO.MemoryStream]::new()
$w = [IO.BinaryWriter]::new($out)
$w.Write([uint16]0); $w.Write([uint16]1); $w.Write([uint16]$sizes.Count)
$offset = 6 + 16 * $sizes.Count
for ($i = 0; $i -lt $sizes.Count; $i++) {
    $dim = if ($sizes[$i] -ge 256) { 0 } else { $sizes[$i] }
    $w.Write([byte]$dim); $w.Write([byte]$dim); $w.Write([byte]0); $w.Write([byte]0)
    $w.Write([uint16]1); $w.Write([uint16]32)
    $w.Write([uint32]$pngs[$i].Length); $w.Write([uint32]$offset)
    $offset += $pngs[$i].Length
}
foreach ($p in $pngs) { $w.Write($p) }
$w.Flush()
[IO.File]::WriteAllBytes((Join-Path $OutDirectory 'MultiInstallIso.ico'), $out.ToArray())
Write-Host "Wrote $(Join-Path $OutDirectory 'MultiInstallIso.ico')"

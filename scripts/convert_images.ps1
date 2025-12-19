# Image conversion script (PowerShell)
# Requires ImageMagick `magick` on PATH.
# Usage: from PROJECT folder run: `.	ools\convert_images.ps1` or run with -WhatIf first.

Set-StrictMode -Version Latest
$imgDir = Join-Path $PSScriptRoot "..\IMG"
if (-Not (Test-Path $imgDir)) { Write-Error "Image directory not found: $imgDir"; exit 1 }

$exts = @('jpg','jpeg','png')
$files = Get-ChildItem -Path $imgDir -Include $exts -Recurse
if ($files.Count -eq 0) { Write-Host "No images to convert."; exit 0 }

Write-Host "Found $($files.Count) images. Converting to WebP and AVIF (lossy, quality 75)..."
foreach ($f in $files) {
    $base = [System.IO.Path]::ChangeExtension($f.FullName, $null)
    $webp = "$base.webp"
    $avif = "$base.avif"

    # Skip if already exists
    if (-Not (Test-Path $webp)) {
        Write-Host "Converting to WebP: $($f.Name) -> $(Split-Path $webp -Leaf)"
        magick "$($f.FullName)" -quality 75 "$webp"
    } else { Write-Host "WebP exists: $(Split-Path $webp -Leaf)" }

    if (-Not (Test-Path $avif)) {
        Write-Host "Converting to AVIF: $($f.Name) -> $(Split-Path $avif -Leaf)"
        magick "$($f.FullName)" -quality 50 "$avif"
    } else { Write-Host "AVIF exists: $(Split-Path $avif -Leaf)" }

    # Print recommended srcset lines for each image
    $rel = $f.FullName.Substring($imgDir.Length + 1) -replace '\\','/'
    $webpRel = ($rel -replace '\.[^.]+$','.webp')
    $avifRel = ($rel -replace '\.[^.]+$','.avif')
    Write-Host "Suggested <picture> snippet for: $rel"
    Write-Host "<picture>"
    Write-Host "  <source srcset=\"IMG/$avifRel\" type=\"image/avif\">"
    Write-Host "  <source srcset=\"IMG/$webpRel\" type=\"image/webp\">"
    Write-Host "  <img src=\"IMG/$rel\" alt=\"...\">"
    Write-Host "</picture>`n"
}

Write-Host "Done. Review produced files in $imgDir"
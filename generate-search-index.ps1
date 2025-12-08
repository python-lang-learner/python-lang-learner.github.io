# generate-search-index.ps1
# Run from repo root (PowerShell)
# Usage: .\generate-search-index.ps1

$pages = @()

# helper to read first paragraph or title
function Get-Excerpt($file) {
  try {
    $text = Get-Content $file -Raw -ErrorAction Stop
    # try to find first <p> ... </p> or first non-empty line in body
    if ($text -match '<p[^>]*>(.*?)</p>') {
      return ($matches[1] -replace '\s+',' ').Trim()
    } else {
      # fallback: first non-empty line
      $lines = $text -split "`r?`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne "" }
      if ($lines.Count -gt 0) { return $lines[0] }
    }
  } catch {
    return ""
  }
  return ""
}

# function to add pages from a folder
function Add-PagesFromFolder($folder, $type) {
  if (-Not (Test-Path $folder)) { return }
  Get-ChildItem -Path $folder -Filter *.html -Recurse | ForEach-Object {
    $rel = ($_ .FullName).Replace((Get-Location).Path, "").Replace("\","/").TrimStart("/")
    $title = ""
    # attempt to read <title>
    $content = Get-Content $_.FullName -Raw
    if ($content -match '<title>(.*?)</title>') { $title = $matches[1].Trim() }
    if (-not $title) { $title = $_.BaseName }
    $excerpt = Get-Excerpt $_.FullName
    # tags: infer from path and filename
    $tags = @()
    if ($rel -match 'topics/exercises') { $tags += "exercises" }
    if ($rel -match 'topics/') { $tags += "topics" }
    if ($rel -match 'projects/') { $tags += "projects" }
    # add parts of filename as tags
    $fname = $_.BaseName -replace '[^a-zA-Z0-9_]',' '
    $fname.Split() | ForEach-Object { if ($_ -and $_.Length -gt 2) { $tags += $_.ToLower() } }
    $tags = $tags | Select-Object -Unique

    $pages += [pscustomobject]@{
      title = $title
      url = "/" + $rel
      excerpt = $excerpt
      tags = $tags
      type = $type
    }
  }
}

Add-PagesFromFolder "topics/exercises" "exercise"
Add-PagesFromFolder "topics" "topic"
Add-PagesFromFolder "projects" "project"

# remove duplicates (by URL) and sort by title
$pages = $pages | Sort-Object title -Unique

# output JSON
$pages | ConvertTo-Json -Depth 5 | Set-Content -Path "search_index.json" -Encoding UTF8

Write-Host "search_index.json created with $($pages.Count) entries."

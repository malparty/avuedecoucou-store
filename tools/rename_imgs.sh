#!/usr/bin/env bash

shopt -s nullglob

for f in *; do
  # Skip directories
  [[ -f "$f" ]] || continue

  # Extract name + extension
  ext="${f##*.}"
  base="${f%.*}"

  # 1. Replace diacritics (normalize using iconv)
  clean="$(printf '%s' "$base" | iconv -f UTF-8 -t ASCII//TRANSLIT 2>/dev/null)"

  # 2. Replace spaces by underscores
  clean="${clean// /_}"

  # 3. Remove special chars (keep only letters, numbers, underscore, dash)
  clean="$(printf '%s' "$clean" | sed 's/[^A-Za-z0-9_-]//g')"

  # Final filename
  new="${clean}.${ext}"

  # Avoid renaming to the same file
  [[ "$f" == "$new" ]] && continue

  # Avoid overwrite: add suffix if needed
  if [[ -e "$new" ]]; then
    i=1
    while [[ -e "${clean}_${i}.${ext}" ]]; do
      ((i++))
    done
    new="${clean}_${i}.${ext}"
  fi

  mv -v -- "$f" "$new"
done

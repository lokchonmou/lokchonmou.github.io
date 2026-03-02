#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [[ $# -lt 2 ]]; then
  echo "Usage: ./migrate_chapter.sh <source_folder> <md_dest_folder> [chapter_name] [url_prefix]"
  echo "Example: ./migrate_chapter.sh \"CAD & CAM/Preparation\" docs/zh/cad-cam/Preparation Preparation /media"
  exit 1
fi

source_folder="$1"
md_dest_folder="$2"
chapter_name="${3:-}"
url_prefix="${4:-/media}"

cmd=(python3 tools/migrate_chapter.py --source "$source_folder" --md-dest "$md_dest_folder" --url-prefix "$url_prefix")

if [[ -n "$chapter_name" ]]; then
  cmd+=(--chapter-name "$chapter_name")
fi

"${cmd[@]}"

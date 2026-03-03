#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# 用法：
#   ./migrate_chapter.sh <source_folder> <md_dest_folder> [chapter_name] [url_prefix]
#
# 參數說明：
#   source_folder : 原始章節資料夾（例如：CAD & CAM/齒輪簡介）
#   md_dest_folder: 複製後的 markdown 目的地（例如：docs/zh/cad-cam/齒輪簡介）
#   chapter_name  : 可選，media 子資料夾名稱（預設：source_folder 最後一層名稱）
#   url_prefix    : 可選，markdown 內圖片網址前綴（預設：/media）
#
# 常見錯誤：
#   1) 檔名打錯：mirgrate_chapter.sh -> migrate_chapter.sh
#   2) source_folder 前面不要加 /（否則會當絕對路徑）
#   3) docs 不要打成 doc
#
# 可直接複製示例：
#   ./migrate_chapter.sh "CAD & CAM/齒輪簡介" "docs/zh/cad-cam/齒輪簡介" "齒輪簡介" "/media"

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

#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# VitePress uses Git to calculate each page's `lastUpdated` value. On Apple
# Silicon, an old Intel-only Homebrew Git in /usr/local/bin can make Node's
# child_process fail with error -86. Prefer macOS's universal Git locally.
if [[ "$(uname -m)" == "arm64" && -x /usr/bin/git ]]; then
  export PATH="/usr/bin:${PATH}"
fi

PORT="${1:-${PORT:-5174}}"
HOST="${2:-${HOST:-127.0.0.1}}"

echo "[start] host=${HOST} port=${PORT}"

npm install
npm run dev -- --host "${HOST}" --port "${PORT}"

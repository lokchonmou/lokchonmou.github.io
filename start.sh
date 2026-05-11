#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

PORT="${1:-${PORT:-5174}}"
HOST="${2:-${HOST:-127.0.0.1}}"

echo "[start] host=${HOST} port=${PORT}"

npm install
npm run dev -- --host "${HOST}" --port "${PORT}"
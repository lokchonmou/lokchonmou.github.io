#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[stop] searching VitePress dev servers..."

pids="$(
  {
    lsof -ti tcp:5173 -sTCP:LISTEN 2>/dev/null || true
    lsof -ti tcp:5174 -sTCP:LISTEN 2>/dev/null || true
    pgrep -f "vitepress dev docs" 2>/dev/null || true
  } | awk 'NF' | sort -u
)"

if [[ -z "${pids}" ]]; then
  echo "[stop] no matching process found."
  exit 0
fi

echo "[stop] killing PIDs: ${pids//$'\n'/, }"
kill ${pids} 2>/dev/null || true
sleep 0.5

remaining="$(echo "${pids}" | xargs -I {} sh -c 'kill -0 {} 2>/dev/null && echo {}' || true)"
if [[ -n "${remaining}" ]]; then
  echo "[stop] force killing PIDs: ${remaining//$'\n'/, }"
  kill -9 ${remaining} 2>/dev/null || true
fi

echo "[stop] done."

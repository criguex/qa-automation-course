#!/usr/bin/env bash
set -u
DESTINO="$(cd "$(dirname "$0")" && pwd)"
LAB="${1:?uso: capturas.sh <clon de criguex/war-paradigm>}"
cd "$LAB"
npm ci
NO_COLOR=1 CI=1 npm run demo:02 > "$DESTINO/demo02.txt" 2>&1
git status --short

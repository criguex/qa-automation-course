#!/usr/bin/env bash
set -u
DESTINO="$(cd "$(dirname "$0")" && pwd)"
LAB="${1:?uso: capturas.sh <clon de criguex/war-paradigm>}"
cd "$LAB"
npm ci
NO_COLOR=1 npm run demo:01 > "$DESTINO/demo01.txt" 2>&1
NO_COLOR=1 CI=1 npm run test:01 > "$DESTINO/test01.txt" 2>&1
F=experiments/01-ai-verdict/fixtures/runs/pinned/run-1.json
sed -i.bak '5s#"source": "US-42/R-1"#"source": ""#' "$F" && rm "$F.bak"
git diff > "$DESTINO/mutacion.diff"
NO_COLOR=1 npm run demo:pinned -w experiments/01-ai-verdict > "$DESTINO/mut_demo_pinned.txt" 2>&1
NO_COLOR=1 CI=1 npm run test:01 > "$DESTINO/mut_test01.txt" 2>&1
git checkout -- "$F"
NO_COLOR=1 CI=1 npm run test:01 > "$DESTINO/restaurado_test01.txt" 2>&1
git status --short

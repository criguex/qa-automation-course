#!/usr/bin/env bash
set -u
DESTINO="$(cd "$(dirname "$0")" && pwd)"
LAB="${1:?uso: capturas.sh <clon completo de criguex/war-paradigm>}"
cd "$LAB"
git worktree add -f ../wp-5dc5e92 5dc5e92
cd ../wp-5dc5e92
npm ci
cd experiments/02-mutants
S=app/server.js
sed -i.bak 's/^const TITLE_MAX = 80;/const TITLE_MAX = 79;/' "$S" && rm "$S.bak"
git diff > "$DESTINO/gancho79.diff"
NO_COLOR=1 CI=1 npx playwright test > "$DESTINO/gancho79.txt" 2>&1
git checkout -- "$S"
cd "$LAB"
git worktree remove --force ../wp-5dc5e92
U='https://makeup-api.herokuapp.com/api/v1/products.json'
curl -s "$U?brand=maybelline" | jq length > "$DESTINO/makeup_maybelline.txt" 2>&1
curl -s -w ' status=%{http_code}\n' "$U?brand=marcaquenoexiste" > "$DESTINO/makeup_vacio.txt" 2>&1

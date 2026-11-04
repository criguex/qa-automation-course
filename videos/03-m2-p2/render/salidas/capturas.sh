#!/usr/bin/env bash
set -u
DESTINO="$(cd "$(dirname "$0")" && pwd)"
USO="uso: capturas.sh <clon de criguex/war-paradigm> <clon de criguex/laya-server> <clon de criguex/restful-booker-quality-suite>"
LAB="${1:?$USO}"
LAYA="${2:?$USO}"
RB="${3:?$USO}"
cd "$LAB"
npm ci
cd experiments/02-mutants
S=app/server.js
grep -n -E "TITLE_MAX|trim|owner is required" "$S" > "$DESTINO/server_grep.txt" 2>&1
NO_COLOR=1 CI=1 npm run test:mutants > "$DESTINO/test_mutants.txt" 2>&1
grep -n -o "'x'.repeat([0-9]*)" tests/*.ts > "$DESTINO/repeat_grep.txt" 2>&1
node app/server.js & APP=$!
sleep 1
tok() { curl -s -H 'content-type: application/json' -d "{\"email\":\"$1@demo.io\",\"password\":\"demo123\"}" localhost:4310/api/auth/login | node -e 'process.stdin.on("data",d=>process.stdout.write(JSON.parse(d).token))'; }
crea() { code=$(curl -s -o /dev/null -w '%{http_code}' -H "authorization: Bearer $(tok "$1")" -H 'content-type: application/json' -d "{\"title\":\"$2\",\"owner\":\"editor@demo.io\"}" localhost:4310/api/docs); echo "$1 · título de ${#2} → $code"; }
for n in 2 3 80 81; do crea editor "$(printf "%${n}s" | tr ' ' x)"; done > "$DESTINO/crea_limites.txt" 2>&1
crea editor "  ab  " > "$DESTINO/crea_espacios.txt" 2>&1
crea viewer "Q4 launch plan" > "$DESTINO/crea_viewer.txt" 2>&1
crea viewer "ab" > "$DESTINO/crea_viewer_ab.txt" 2>&1
kill "$APP"
wait "$APP" 2>/dev/null
sed -i.bak 's/^const TITLE_MAX = 80;/const TITLE_MAX = 81;/' "$S" && rm "$S.bak"
git diff > "$DESTINO/mut81.diff"
NO_COLOR=1 CI=1 npm run test:mutants > "$DESTINO/mut81_mutants.txt" 2>&1
git checkout -- "$S"
sed -i.bak 's/^const TITLE_MAX = 80;/const TITLE_MAX = 79;/' "$S" && rm "$S.bak"
git diff > "$DESTINO/mut79.diff"
NO_COLOR=1 CI=1 npx playwright test > "$DESTINO/mut79_test.txt" 2>&1
git checkout -- "$S"
git status --short
node "$DESTINO/bordes-laya.mjs" "$LAYA" > "$DESTINO/laya_bordes.txt" 2>&1
cd "$RB"
npm ci
NO_COLOR=1 CI=1 npm run test:component 2>&1 | grep -o -E "› (accepts|rejects).*|[0-9]+ passed.*" > "$DESTINO/rb_component.txt"

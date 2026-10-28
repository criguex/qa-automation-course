#!/usr/bin/env bash
set -u
DESTINO="$(cd "$(dirname "$0")" && pwd)"
LAB="${1:?uso: capturas.sh <clon de criguex/war-paradigm> <clon de criguex/scientific-qa-evidence>}"
SQE="${2:?uso: capturas.sh <clon de criguex/war-paradigm> <clon de criguex/scientific-qa-evidence>}"
cd "$LAB"
npm ci
NO_COLOR=1 CI=1 npm test > "$DESTINO/npm_test.txt" 2>&1
S=experiments/02-mutants/app/server.js
sed -i.bak "s#editMember: (actor, target) => actor.role === 'admin' || actor.id === target.id,#editMember: (actor) => actor.role === 'admin',#" "$S" && rm "$S.bak"
git diff > "$DESTINO/arreglo.diff"
NO_COLOR=1 CI=1 npm run demo:02 > "$DESTINO/arreglo_demo02.txt" 2>&1
git checkout -- "$S"
NO_COLOR=1 npm run test:03 > "$DESTINO/test03.txt" 2>&1
NO_COLOR=1 npm run demo:03 > "$DESTINO/demo03.txt" 2>&1
(cd experiments/03-second-brain && J='{"tool_input":{"command":"git push origin main"}}' && echo "$J" | ./hooks/block-push-to-main.sh; echo $?) > "$DESTINO/hook_manual.txt" 2>&1
F=experiments/01-ai-verdict/fixtures/runs/pinned/run-2.json
sed -i.bak '7s#"actor": "approver"#"actor": "editor"#' "$F" && rm "$F.bak"
git diff > "$DESTINO/mutacion.diff"
NO_COLOR=1 npm run demo:pinned -w experiments/01-ai-verdict > "$DESTINO/mut_demo_pinned.txt" 2>&1
NO_COLOR=1 CI=1 npm run test:01 > "$DESTINO/mut_test01.txt" 2>&1
git checkout -- "$F"
NO_COLOR=1 CI=1 npm run test:01 > "$DESTINO/restaurado_test01.txt" 2>&1
git status --short
cd "$SQE/evidence/numerical/source"
python3 -m unittest test_runner > "$DESTINO/sqe_unittest.txt" 2>&1

# Fuentes · 19-m14 · QA asistida por IA I

Repos leídos en los clones de `scratchpad/brand/` (war-paradigm en `5dc5e92`, agent-eval-jev, jev-test-impact y predictor-debugger en su HEAD del 2026-10-26). Comandos corridos el 2026-10-26 en macOS con Node 26.8.1.

| Afirmación en el guion | Fuente |
|---|---|
| `git -c core.x=y push origin main` y `git --no-pager push origin main` pasaban con exit 0; lo encontró una mutación WAR; cuatro pruebas nuevas fallan con el hook anterior y pasan con el nuevo | war-paradigm, mensaje del commit `1b01c66` («fix(03): el hook bloquea push a main con opciones globales de git (-c, --no-pager, --git-dir)») |
| El asistente diseña, ejecuta y audita; la persona decide y firma; un verde que nadie puede re-ejecutar no se firma | qa-automation-course `i18n/es/modules-15-23.json` → `m14.theory[0]` |
| Relajar un assert «porque falla por un detalle» se revisa contra el contrato; un verde falso es peor que un rojo honesto | `i18n/es/quiz-11-19.json` → `m14`, pregunta 10 |
| PreToolUse: exit 0 sigue; exit 2 bloquea y el stderr le llega al asistente; cualquier otro código (incluido 1) es error no bloqueante; «If your hook is meant to enforce a policy, use exit 2» | https://code.claude.com/docs/en/hooks (consultada el 2026-10-26) |
| `settings.json` registra un hook PreToolUse con matcher `Bash` que llama a `hooks/block-push-to-main.sh` | `war-paradigm/experiments/03-second-brain/.claude/settings.json` |
| El script parte la línea en `&&`, `\|\|`, `;`, `\|`; resuelve refspecs, `refs/heads/`, `+`, `HEAD` y la rama actual; mensaje «Push a feature branch and open a pull request»; parser jq → node → sed | `war-paradigm/experiments/03-second-brain/hooks/block-push-to-main.sh` |
| Requiere Node 20+ y git, nada más | `experiments/03-second-brain/README.md` §Run it; `package.json` raíz (`engines.node >=20`) |
| Salida de `npm run demo:03` (3 bloqueados con exit 2, 3 permitidos con exit 0) | Corrida propia 2026-10-26; script `experiments/03-second-brain/tests/demo.mjs`; misma tabla en el README del experimento |
| 45 pruebas: 40 del hook (19 bloqueos, 10 permitidos, 6 límites conocidos, 3 de robustez, 2 de parsers) y 5 del vault; todas pasan | Corrida de `npm run test:03` (2026-10-26, war-paradigm `08438a2`): `tests 45 · suites 6 · pass 45 · fail 0`; README del experimento («40 cases», §Known limits); `tests/hook.test.mjs` líneas 50-117 y `tests/vault-links.test.mjs` |
| Grupos del hook: 18 bloqueos, 10 permitidos, 3 de robustez, 2 de parsers de respaldo con jq fuera del PATH; repos de git temporales en main y en una feature | `experiments/03-second-brain/tests/hook.test.mjs` |
| «AI without context writes generic tests… clean code, correct syntax, tests nothing that matters»; lo que funcionó no fue un mejor prompt | `experiments/03-second-brain/README.md` (encabezado y párrafo inicial) |
| CLAUDE.md para Claude Code, AGENTS.md para Codex: comandos, convenciones, lo prohibido; nunca secretos | `m14.theory[3]`; `quiz-11-19.json` → `m14` pregunta 4 |
| Vault de 14 notas con carpetas 00, Golden rules, 01–04, 99; la regla 5 («Hard rules live in hooks…») | `experiments/03-second-brain/README.md` §Layout; `vault/Golden rules.md` |
| El build falla si un enlace no resuelve, si falta frontmatter o si una nota queda aislada | `experiments/03-second-brain/README.md` §Part 1; nombres de las 5 pruebas en la salida de `npm run test:03` |
| Respuestas del juez guardadas con el hash de la petición exacta; un cambio invalida solo esas grabaciones | `agent-eval-jev/README.md` línea 173 |
| El CI reconstruye el reporte y corre `git diff --exit-code -- results reports`; si difiere, falla | `agent-eval-jev/.github/workflows/ci.yml` (job `offline`) y `README.md` línea 175 |
| EVIDENCIA.md con comando, commit, `shasum -a 256` y exit code | `m14.hands[2]` |
| Cualquier falla de Jev (red, HTTP, respuesta malformada o ausente) corre la suite completa y se registra el error | `jev-test-impact/README.md` líneas 80-81 |
| «Lo ejecutó un asistente de IA bajo mi dirección, así que no es una revisión independiente» | `predictor-debugger/README.md` línea 62 |
| Nueve intentos contra el hook actual: 5 con exit 2 y 4 con exit 0 (`B=main; git push origin $B`, `sh -c '…'`, `eval "…"`, `\git push origin main`) | Corrida propia 2026-10-26 (la ejecutó un asistente bajo dirección de Cristian) contra `hooks/block-push-to-main.sh` de `5dc5e92`, repo temporal en la rama `feature/x`, JSON `{"tool_name":"Bash","tool_input":{"command":…}}`. El guion lo declara en E08 y E11. Después, en `08438a2`: `\git` se cerró (el hook quita la barra antes de `git`) y los otros tres, más `G=push; git $G origin main`, `git -c alias.p=push p origin main` y `bash -c "…"`, quedaron como límites conocidos con pruebas que afirman exit 0 |
| Por qué fallan `sh -c` y `eval`: el patrón exige espacio o inicio de línea antes de `git` | Regex `push_re="(^\|[[:space:]])git${GIT_OPTS}[[:space:]]+push…"` en el script |
| Reto, entregables, criterios, mutación y nivel 4 | `m14.hands`, `m14.crit`, `m14.deliver`, `m14.mut`, `m14.top` |
| Rúbrica de 4 niveles | `i18n/es/ui.json` → `rubric.generic` (m14 no tiene `rubm` propia) |
| Preguntas del quiz | `quiz-11-19.json` → `m14` índices 0, 2 y 4 |
| Siguiente módulo: m15 | `course.json` (posición 20) |

## Lo que no se verificó
- No se probó el hook dentro de una sesión real de Claude Code; el demo y las pruebas lo invocan con `bash` y el mismo JSON.
- No se verificó si el repo público `criguex/war-paradigm` tiene protección de rama en `main`; el guion recomienda la capa, no afirma que exista.
- `\git` salta alias de bash; que en la máquina del alumno exista un alias o una función `git` no se comprobó.

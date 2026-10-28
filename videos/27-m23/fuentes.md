# Fuentes · m23

Rutas relativas a los clones de `brand/`. Commits leídos: war-paradigm `5dc5e92`, scientific-qa-evidence `c02e623`. Todas las ejecuciones se hicieron el 2026-10-26 en copias de trabajo; las roturas se revirtieron con `git checkout`.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | `git -c core.x=y push origin main` y `git --no-pager push origin main` pasaban con exit 0 hasta `1b01c66`; lo encontró una mutación WAR | Mensaje del commit `1b01c66` (war-paradigm); `m23.theory[2]` y `m23.mut` en `i18n/es/modules-24-29.json` |
| 2 | "Decenas de pruebas" antes del arreglo | `git show 1b01c66~1:experiments/03-second-brain/tests/hook.test.mjs` → 27 llamadas `test(` |
| 3 | Reparto asistente / persona; Codex primero, luego Claude Code; trailer Co-Authored-By; cita "eligió las preguntas…" | `scientific-qa-evidence/README.es.md` y `README.md`, sección "Cómo se usó la IA" / "How AI was used" |
| 4 | IA declarada como asistencia, no coautora; cambio de modelo reportado a mitad de sesión con commits exactos | `scientific-qa-evidence/AUTHORSHIP.md` |
| 5 | "Las reglas duras viven en el código, no en los prompts…" | `criguex/README.es.md` línea 79 (`README.md` línea 79 en inglés) |
| 6 | Hook PreToolUse con matcher Bash en `.claude/settings.json`; exit 2 bloquea y muestra stderr; exit 0 pasa; "A prompt can be ignored. This can't." | `war-paradigm/experiments/03-second-brain/.claude/settings.json` y `hooks/block-push-to-main.sh` |
| 7 | jq → node → sed; partición por `&&`, `||`, `;`, `|`; rama actual si no hay refspec | `hooks/block-push-to-main.sh` |
| 8 | `npm test` → 45 tests, 45 pass, 6 suites (antes 38 en `5dc5e92`) | Ejecución real en `experiments/03-second-brain` (commit `08438a2`) |
| 9 | El README del experimento decía "33 checks" en `5dc5e92`; desde `08438a2` dice "45 checks: 40 hook cases" | `war-paradigm/experiments/03-second-brain/README.md`, sección "Run it" |
| 10 | Salida de `npm run demo` (3 bloqueados, 3 permitidos) | Ejecución real (`tests/demo.mjs`) |
| 11 | Ataques de la suite (HEAD:main, force, encadenados, git -C, push a secas en main, 3 parsers) | `tests/hook.test.mjs` (bloques `describe`); `m23.theory[2]` |
| 12 | Hook viejo exit 0 / hook actual exit 2 para los dos comandos; push a feature exit 0 en ambos | Ejecución real: `git show 1b01c66~1:…/block-push-to-main.sh` contra el hook actual |
| 13 | Diff de GIT_OPTS y las 5 pruebas nuevas; "fallan con el hook anterior y pasan con este" | `git show 1b01c66` (war-paradigm) |
| 14 | Vault: 00 - READ FIRST, Golden rules, carpetas 01-04 y 99; vault-links rompe el build por enlace roto, falta de frontmatter o nota isla | `experiments/03-second-brain/README.md` "Part 1 · the vault"; `ls vault/` |
| 15 | Asistente sin contexto escribe pruebas genéricas; "the fix wasn't a better prompt" | `experiments/03-second-brain/README.md` (Specimen) |
| 16 | "un registro público de cada comando, versión, hash y código de salida…"; `shasum -a 256 -c evidence/SHA256SUMS.txt`; `verificar.py` con 6 comprobaciones y huella | `m23.theory[4]`; `scientific-qa-evidence/README.es.md` "Verifícalo tú mismo" |
| 17 | Salida de `verificar.py` (6 OK, huella C5F0-F1A8-2F4D, versión 26791fe6546f) y `shasum` exit 0 | Ejecución real en copia de scientific-qa-evidence (Darwin arm64, Python 3.9.6) |
| 18 | 19 sesiones el 20-oct-2026 (1 principal + 18 subagentes); 213 sesiones y 470 entradas leídas; transcripciones no publicadas; SHA-256 de cada sesión | `scientific-qa-evidence/docs/CODEX_WORK_LOG.md` "How this log was built" |
| 19 | jd_tts_a, jd_tts_b (jueces ciegos) y tts_safety_fix (corrector) | `docs/CODEX_WORK_LOG.md`, filas 14-16 de la tabla |
| 20 | "What was not executed": auto-fix nunca se corrió; 5 ms y +195 ms son parte del dibujo | `docs/CODEX_WORK_LOG.md`, sección homónima |
| 21 | Recompilación del 23-oct "No es independiente" | `evidence/lean-cloud-2026-10-23/README.md` línea 18; `docs/INDEPENDENT_REPRODUCTION.md` |
| 22 | FINDINGS: 8 hallazgos; 1, 3 y 8 defectos propios (7 dependencias precompiladas; builds distintos; `oracle_valid: true` con excepción o NaN) | `scientific-qa-evidence/FINDINGS.md` |
| 23 | Un espacio en REPRODUCE.md → `REPRODUCE.md: FAILED`, exit 1; verificar 1/6 FALLA, exit 1, huella 57F4-7AFB-1B9E | Ejecución real en la copia, revertida |
| 24 | 9 intentos contra el hook actual: 5 exit 2 y 4 exit 0 (alias en `-c`, variable, `eval`, `bash -c`) | Ejecución real en la copia de war-paradigm (rama temporal `feature/probe`, borrada después); desde `08438a2` los cuatro tienen prueba en «known limits: these get through» y el README los lista en §Known limits |
| 25 | "Un agujero encontrado se publica, no se esconde" | `m23.mut` |
| 26 | Reto, criterios y rúbrica | `m23.hands`, `m23.crit`, `m23.rubm` |
| 27 | Preguntas del quiz | `qa-automation-course/i18n/es/quiz-20-27.json` → `m23`, preguntas 1, 4 y 7 |
| 28 | Siguiente módulo: m19 | `course.json` (posición 28); `modules-24-29.json` → `m19.title` |

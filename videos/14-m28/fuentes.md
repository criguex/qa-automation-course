# Fuentes · 14-m28 · Pipelines

Clones leídos el 26-oct-2026: civica-playwright-challenge (d4f1db9), qa-eval-lab (ec81933), restful-booker-quality-suite (8d8f9c5), predictor-debugger-docs (36836d4; sus workflows son idénticos a los del clon predictor-debugger 03223f7), war-paradigm (5dc5e92), jev-test-impact (163fb8f), jev-ci-triage (a41f0fb), playwright-jev (6e09ea4). Comandos `gh` corridos el 26-oct-2026.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | 15-oct-2026: corrida 38799648617 de restful-booker en failure en `npm run format:check`: «Code style issues found in 112 files» | `gh run view 38799648617 -R criguex/restful-booker-quality-suite --log-failed` |
| 2 | El commit siguiente (corrida 38800010314, success, ~3 min después) se llama «Exclude cloned target from quality gates» y agrega una línea a `.prettierignore` | `gh run list` (20:09:18Z → 20:12:03Z); `gh api repos/criguex/restful-booker-quality-suite/commits/1c52442e56d25138d3029cd6973ed50e691c0ad1` (`.prettierignore +1`, `eslint.config.js +1-1`) |
| 3 | 16-oct-2026: corrida 38968048737 en failure en el mismo paso: «Code style issues found in 2 files» | `gh run view 38968048737 -R criguex/restful-booker-quality-suite --log-failed` |
| 4 | El workflow clona el SUT dentro de la carpeta del repo (`sut`) | `restful-booker-quality-suite/.github/workflows/tests.yml` líneas 19-22 |
| 5 | Analogía de los porteros y el sello verde | `i18n/es/modules-01-14.json` → `m28.kid` |
| 6 | Anatomía on → jobs → steps; tipos de disparador; job en runner nuevo; step con exit ≠ 0 corta el job | `i18n/es/modules-01-14.json` → `m28.theory[0]`; https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax |
| 7 | verify.yml: push, PR y workflow_dispatch; reproduce.yml: workflow_dispatch y tags `v*` | `predictor-debugger-docs/.github/workflows/verify.yml` líneas 3-6; `reproduce.yml` líneas 3-6 |
| 8 | verify.yml: job `saved`, ubuntu-24.04, `fail-fast: false`, matriz de 4 rondas con script, huella y pruebas; ronda 1 espera `EEC9-09E0-F77D`; bucle `mac war guerra` con `tee` y `grep -q` | `predictor-debugger-docs/.github/workflows/verify.yml` líneas 9-40 |
| 9 | eval-gate: `ui-tests` y `llm-evals` sin `needs` | `qa-eval-lab/.github/workflows/eval-gate.yml` |
| 10 | Con `needs: [a]` el job espera y se salta si `a` falla | `i18n/es/modules-01-14.json` → `m28.theory[2]`; `i18n/es/quiz-11-19.json` → `m28[0]` |
| 11 | Ninguno de los workflows de los casos usa `needs` ni `concurrency`; civica, restful-booker y war-paradigm ponen sus gates en un solo job | `i18n/es/modules-01-14.json` → `m28.theory[2]`; `grep -E "^\s*(needs\|concurrency):"` sobre los 6 archivos, sin coincidencias (26-oct-2026) |
| 12 | `cache: npm` en civica, restful-booker y war-paradigm; uploads con retención de 14 días (en civica, `playwright-report` y `audit-reports`); el ledger `mutation-insights` de civica, 90 días, y el CI lo descarga de la última corrida terminada de main antes de los mutantes | `civica-playwright-challenge/.github/workflows/ci.yml` (commit `b240008`); `restful-booker-quality-suite/.github/workflows/tests.yml`; `war-paradigm/.github/workflows/ci.yml` |
| 13 | Si borrar la caché cambia un resultado es un hallazgo | `i18n/es/quiz-11-19.json` → `m28[1]` (why) |
| 14 | `secrets.*` se enmascara, no llega a PR de forks y vale cadena vacía si no existe | `i18n/es/modules-01-14.json` → `m28.theory[4]`; https://docs.github.com/en/actions/concepts/security/secrets |
| 15 | `always()` en war-paradigm y restful-booker; `!cancelled()` en civica; `failure()` en restful-booker para los logs del SUT | `war-paradigm/.github/workflows/ci.yml` línea 41; `restful-booker-quality-suite/.github/workflows/tests.yml` líneas 39 y 46; `civica-playwright-challenge/.github/workflows/ci.yml` línea 60 |
| 16 | concurrency con `cancel-in-progress` cancela la corrida vieja; no usarlo en release o evidencia | `i18n/es/modules-01-14.json` → `m28.theory[6]`; https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-workflow-concurrency |
| 17 | Gate = check requerido + rama protegida; `main` sin protección en los 5 repos | `i18n/es/modules-01-14.json` → `m28.theory[7]`; `gh api repos/criguex/<repo>/branches/main --jq .protected` → `false` ×5 y `gh api repos/criguex/<repo>/rules/branches/main --jq length` → `0` ×5 (26-oct-2026) |
| 18 | Con checks requeridos, el merge queda bloqueado mientras no pasen | https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches |
| 19 | qa-eval-lab declara en §Límites que el check solo bloquea si es obligatorio y que main no está protegida | `qa-eval-lab/README.es.md` §Límites, punto 4 |
| 20 | Corrida 40374138570 de eval-gate (success, 26-oct-2026) con el notice «LLM eval skipped» | `gh run list -R criguex/qa-eval-lab -w eval-gate -L 1`; `gh run view 40374138570 -R criguex/qa-eval-lab --log \| grep "LLM eval skipped"` |
| 21 | `npm ci \|\| npm install` sigue con install si el lockfile no coincide | `qa-eval-lab/.github/workflows/eval-gate.yml` línea 10; `i18n/es/modules-01-14.json` → `m28.theory[8]` |
| 22 | Fail-closed/open/safe; en predictor-debugger un NaN nunca pasa | `i18n/es/modules-01-14.json` → `m28.theory[9]` |
| 23 | Hasta `b240008`, `loadInsights()` de civica devolvía un ledger vacío sin avisar si el JSON estaba corrupto; hoy sigue siendo fail-open pero avisa (⚠, anotación `ledger-warning`) y guarda el archivo como `.corrupt` | Antes: `src/support/mutationInsights.ts` en `d4f1db9` (`catch { return {}; }`). Hoy: `src/support/mutationInsights.ts` (`readLedger`, `writeLedger`) y `tests/mutation/searchMutants.mutation.spec.ts` en `b240008`; corrida propia con el ledger roto a propósito, 2026-10-26 |
| 24 | jev-test-impact en replay: si falta una respuesta, corre la suite completa | `jev-test-impact/README.es.md`, tabla de `JTI_JEV_MODE` |
| 25 | Orden de restful-booker: format:check → lint → typecheck → npm test (api, contract, component, performance) | `restful-booker-quality-suite/.github/workflows/tests.yml` líneas 34-37; `playwright.config.ts` / `package.json` scripts |
| 26 | Orden de civica: lint → typecheck → mock con a11y → mutation → audit → api → contract → performance → visual | `civica-playwright-challenge/.github/workflows/ci.yml` líneas 32-57 |
| 27 | Benchmark de jev-test-impact: 20 commits; Jev corrió ~70 % menos pruebas (69.9 % saltadas) con 0 de 15 escapadas; la determinista insegura dejó escapar 4 de 15 | `jev-test-impact/README.es.md` §Resultados medidos |
| 28 | Ahorro válido solo con 0 escapadas, fail-safe y suite completa en main y nocturna; triaje con reglas primero | `i18n/es/modules-01-14.json` → `m28.theory[11]` |
| 29 | `retries: 2` y `forbidOnly` en civica y restful-booker; war-paradigm mutantes `retries: 0`; regla 1 de jev-ci-triage | `civica-playwright-challenge/playwright.config.ts` 35-36; `restful-booker-quality-suite/playwright.config.ts` 6-7; `war-paradigm/experiments/02-mutants/playwright.config.ts` 10; `jev-ci-triage/README.es.md` §Reglas |
| 30 | reproduce.yml: ubuntu-24.04, `tools/fetch_data.py` con SHA256SUMS y manifiesto, pruebas, recálculo, `grep -q` de veredictos y huella, rondas 1 y 2; ningún workflow sube artefactos | `predictor-debugger-docs/.github/workflows/reproduce.yml`; `predictor-debugger-docs/README.md` §Reproducir (b) |
| 31 | Corrida 40267731741: ronda 1 en 6 min 33 s, ronda 2 en 17 min 47 s, huellas `EEC9-09E0-F77D` y `D506-F58F-3838` | `predictor-debugger-docs/README.md` §Reproducir (b) |
| 32 | Un release sale de un tag con CI verde y lleva su `.sha256` | `i18n/es/modules-01-14.json` → `m28.theory[12]` |
| 33 | Pasos del laboratorio, criterios, entregable, rupturas y rúbrica | `i18n/es/modules-01-14.json` → `m28.hands`, `m28.crit`, `m28.deliver`, `m28.mut`, `m28.rubm` |
| 34 | Mini-quiz | `i18n/es/quiz-11-19.json` y `i18n/en/quiz-11-19.json` → `m28[0]`, `m28[4]`, `m28[7]` |

## Sin verificar o con matiz

- El curso (`m28.theory`, último punto, y el quiz `m28[16]`) dice que restful-booker estuvo rojo el 15 y el 16 de octubre por «Code style issues found in 2 files». El log real dice **112 archivos** el 15-oct (38799648617) y **2 archivos** el 16-oct (38968048737). El guion usa las dos cifras reales. Conviene corregir el texto del curso.
- No se verificó qué dos archivos fallaron el 16-oct; el commit de esa corrida (b6847ca) toca `docs/DEFECTS.html`, `docs/DEFECTS.md` y `docs/EXECUTION_REPORT.html`.

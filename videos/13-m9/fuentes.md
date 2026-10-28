# Fuentes · 13-m9 · CI/CD y Docker

Clones leídos el 26-oct-2026 (commit del clon entre paréntesis). Comandos `gh` corridos el 26-oct-2026 desde la máquina de Cris.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 0 | Los 5 repos tienen CI en verde: la última corrida en `main` de cada uno salió `success` | `gh run list -R criguex/<repo> -b main -L 3`, corrido el 26-oct-2026 (civica CI, qa-eval-lab eval-gate, restful-booker Playwright API Tests, predictor-debugger verify, war-paradigm) |
| 1 | Los 5 repos (civica, qa-eval-lab, restful-booker, predictor-debugger, war-paradigm) tienen `main` sin protección: `protected=false` | `gh api repos/criguex/<repo>/branches/main --jq .protected`, corrido el 26-oct-2026; coincide con `i18n/es/modules-01-14.json` → `m28.theory` («Gate = check requerido + rama protegida») |
| 2 | Un check verde no bloquea un merge sin protección de rama | `i18n/es/modules-01-14.json` → `m9.obj[2]`, `m9.theory[3]`; https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches |
| 3 | Analogía del robot que revisa la tarea y la luz roja | `i18n/es/modules-01-14.json` → `m9.kid` |
| 4 | civica: disparadores push/PR a main y workflow_dispatch, job `test`, `ubuntu-24.04`, 20 min, Node 20 con `cache: npm`, `npm ci`, Chromium, orden lint → typecheck → mock → mutation → audit → api → contract → performance → visual, 3 uploads con `if: ${{ !cancelled() }}` y retención 14 días | `civica-playwright-challenge/.github/workflows/ci.yml` (d4f1db9) |
| 5 | `npm ci` sale con error si el lockfile no coincide con package.json | https://docs.npmjs.com/cli/v10/commands/npm-ci («If dependencies in the package lock do not match those in package.json, npm ci will exit with an error») |
| 6 | La corrida 38665514760 de civica (main, 15-oct-2026) dejó el artefacto `playwright-report` | `gh api repos/criguex/civica-playwright-challenge/actions/runs/38665514760/artifacts` y `/runs/38665514760` (success, main, 2026-10-15T01:24:55Z); `civica-playwright-challenge/README.es.md` §Cómo funciona |
| 7 | Gate antes del merge; después del deploy es autopsia; PR/main/nightly; gate de 90 min y admin override | `i18n/es/quiz-11-19.json` → `m9` preguntas 1, 8 y 9 (campo `why`) |
| 8 | playwright-jev: matriz `node: [20, 24]`, `concurrency` con `group: ci-${{ github.ref }}` y `cancel-in-progress: true` | `playwright-jev/.github/workflows/ci.yml` (6e09ea4) |
| 9 | predictor-debugger: `verify.yml` con matriz de 4 rondas (`matrix.include`) y `fail-fast: false` | `predictor-debugger-docs/.github/workflows/verify.yml` (36836d4) |
| 10 | Sharding: `npx playwright test --shard=1/4`, sin cambios de código | `civica-playwright-challenge/docs/GROWTH.md` §Speed up at scale |
| 11 | Sharding exige pruebas independientes | `i18n/es/quiz-11-19.json` → `m9` pregunta 4 |
| 12 | `concurrency` no se usa en pipelines de evidencia o release | `i18n/es/modules-01-14.json` → `m28.theory` (concurrency) |
| 13 | Ningún repo de Cris tiene matriz de sistemas operativos | Revisión de `.github/workflows/*.yml` de los 13 clones en `scratchpad/brand/` el 26-oct-2026: las matrices encontradas son `node: [20, 24]` (playwright-jev) y las 4 rondas (predictor-debugger) |
| 14 | civica y restful-booker: `retries` 2 y `forbidOnly` en CI | `civica-playwright-challenge/playwright.config.ts` líneas 35-36; `restful-booker-quality-suite/playwright.config.ts` líneas 6-7 (8d8f9c5) |
| 15 | Una prueba que falla y pasa en el reintento sale como flaky; cuarentena con ticket, no se borra | `i18n/es/modules-01-14.json` → `m28.theory` (Flaky y reintentos); `i18n/es/quiz-11-19.json` → `m9` pregunta 2; https://playwright.dev/docs/test-retries |
| 16 | jev-ci-triage regla 1: falló y pasó en un reintento de la misma corrida → flaky | `jev-ci-triage/README.es.md` §Reglas, en orden (a41f0fb) |
| 17 | war-paradigm: runner de mutantes con `retries: 0` | `war-paradigm/experiments/02-mutants/playwright.config.ts` línea 10 (5dc5e92) |
| 18 | Reproducibilidad: misma imagen y misma versión del paquete; desalineación = fallos raros de navegador | `i18n/es/quiz-11-19.json` → `m9` preguntas 3 y 10 |
| 19 | Baselines visuales solo `-linux.png`, generadas en el Dockerfile; una de macOS nunca la recoge el CI | `civica-playwright-challenge/README.es.md` §Tipos de prueba (Determinismo de la regresión visual); `tests/visual/pages.visual.spec.ts` |
| 20 | Dockerfile: `mcr.microsoft.com/playwright:v1.63.0-noble`, copia package.json y lock primero, `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, `npm ci --ignore-scripts`, `CMD ["npm", "test"]` | `civica-playwright-challenge/Dockerfile` |
| 21 | El lockfile de civica instala `@playwright/test` 1.63.0 | `civica-playwright-challenge/package-lock.json` → `node_modules/@playwright/test` `"version": "1.63.0"` (package.json declara `^1.48.0`) |
| 22 | Comandos `docker build -t civica-pw .`, `docker run --rm -v "$PWD":/work -w /work civica-pw npm test` y `... npm run test:visual:update` | `civica-playwright-challenge/docs/MIGRATION.md` §Run in Docker |
| 23 | restful-booker: SUT clonado y fijado en `0046115`, `docker compose up --build -d`, espera a `/ping` hasta 30 intentos cada 2 s, logs con `if: failure()` | `restful-booker-quality-suite/.github/workflows/tests.yml` líneas 19-47 |
| 24 | Un secreto en el repo está comprometido desde el primer push; los secrets de CI se enmascaran | `i18n/es/quiz-11-19.json` → `m9` pregunta 6; https://docs.github.com/en/actions/concepts/security/secrets |
| 25 | eval-gate: jobs `ui-tests` y `llm-evals`; sin `OPENAI_API_KEY` imprime `::notice title=LLM eval skipped::` y salta DeepEval y Promptfoo; `npm ci \|\| npm install` | `qa-eval-lab/.github/workflows/eval-gate.yml` (ec81933) |
| 26 | `npm ci \|\| npm install`: si el lockfile no coincide sigue con `npm install` en vez de fallar | `i18n/es/modules-01-14.json` → `m28.theory` (Qué significa un verde) |
| 27 | Corrida 40374138570 de eval-gate: success, main, 6m35s, 26-oct-2026; su log contiene el notice | `gh run list -R criguex/qa-eval-lab -w eval-gate -L 1` y `gh run view 40374138570 -R criguex/qa-eval-lab --log \| grep "LLM eval skipped"`, corridos el 26-oct-2026 |
| 28 | El README de qa-eval-lab declara que sin el secreto el verde no evalúa el LLM | `qa-eval-lab/README.es.md` §Límites, punto 1 |
| 29 | Criterios del laboratorio (npm ci, matriz de 2 SO, reporte aunque falle, `::notice::`), entregable, mutación y nivel top | `i18n/es/modules-01-14.json` → `m9.hands`, `m9.crit`, `m9.deliver`, `m9.mut`, `m9.top` |
| 30 | Allure: `npm i -D allure-playwright` y agregarlo al arreglo de reporters | `civica-playwright-challenge/docs/GROWTH.md` §Richer reporting (Allure) |
| 31 | Ruta de protección: Settings → Rules o Branches, exigir PR y checks requeridos | `i18n/es/modules-01-14.json` → `m28.hands[4]` |
| 32 | Preguntas del mini-quiz y sus porqués | `i18n/es/quiz-11-19.json` y `i18n/en/quiz-11-19.json` → `m9[0]`, `m9[1]`, `m9[4]` |
| 33 | Siguiente módulo: Pipelines (m28) | `course.json`, posición 14 |

## Sin verificar en esta sesión

- La salida de `docker build` y `docker run` de civica no se grabó (la escena E12 muestra solo comandos).
- No se probó que `allure-playwright` funcione con la versión de Playwright del alumno; el guion cita solo los pasos de `GROWTH.md`.

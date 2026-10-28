# Fuentes · Módulo 04 · Setup día 0 — el entorno (m3)

"Máquina de preparación" = macOS donde se armó este paquete, 26-oct-2026. "Copia local" = copia de `war-paradigm` (commit `5dc5e92`) en el scratchpad.

| # | Afirmación en el guion | Fuente |
|---|---|---|
| 1 | Posición 4, id `m3`, icono 🛠️, nivel ★★☆☆☆ | `qa-automation-course/course.json` → `modules[3]` |
| 2 | Cambiar `@playwright/test` de 1.63.0 a 1.64.0 sin tocar el lockfile → `npm ci` falla con EUSAGE "…are in sync…" e "Invalid: lock file's @playwright/test@1.63.0 does not satisfy @playwright/test@1.64.0" | Corrida local de `npm ci --ignore-scripts` sobre copias de `package.json`, `package-lock.json` y los `package.json` de los workspaces |
| 3 | Analogía de la cocina | `m3.kid` |
| 4 | "Día 0 de mi método… versionado, cuentas, IDE" | `m3.mentor` |
| 5 | LTS = Node 24 a oct-2026; 26 es Current; `brew install node` instala la Current | `m3.theory[0]` |
| 6 | `node --version` → v26.8.1 en la máquina de preparación | Salida real |
| 7 | Playwright soporta "latest 22.x, 24.x or 26.x" | https://playwright.dev/docs/intro (consultado el 26-oct-2026) |
| 8 | Versiones verificadas 26-oct-2026: Playwright 1.64, TypeScript 7.0, Node 24 LTS, Java 25 LTS, Karate 2.1, k6 2.3; "fíjalas y súbelas a propósito" | `m3.theory[1]` |
| 9 | war-paradigm fija `@playwright/test` en `1.63.0` y `typescript` en `^5.9.0`; el lockfile resuelve 5.9.3 | `war-paradigm/package.json`; `npx tsc --version` → "Version 5.9.3" en la copia local |
| 10 | npx usa el binario local del proyecto | `quiz-01-10.json` → m3 pregunta 7 |
| 11 | Cinco diferencias de `npm ci` | https://docs.npmjs.com/cli/v11/commands/npm-ci (consultado el 26-oct-2026) |
| 12 | `git checkout -b` crea y cambia; la rama es local hasta `push -u origin` | `quiz-01-10.json` → m3 pregunta 4 |
| 13 | Commits reales de war-paradigm (`1b01c66 fix(03)…`, `5dc5e92 docs…`, `7d46435 style…`) | `git log --format='%h %s'` en el clon |
| 14 | `test:` para casos nuevos; subir Playwright = `chore`/`build` | `quiz-01-10.json` → m3 preguntas 2 y 9 |
| 15 | PR de 200 vs 2.000 líneas; revisar tu propio diff | `quiz-01-10.json` → m3 preguntas 5 y 10 |
| 16 | Conflicto de merge = dos intenciones | `quiz-01-10.json` → m3 pregunta 8 |
| 17 | VS Code + Playwright + ESLint; estructura del repo | `m3.theory[3..4]` |
| 18 | README: instalar, correr cada suite, leer el reporte | `quiz-01-10.json` → m3 pregunta 3 |
| 19 | Árbol de war-paradigm (experiments, assets, docs, .github/workflows) | `war-paradigm/README.es.md` §Cómo funciona el laboratorio |
| 20 | Workflow: push a main, PR y manual; checkout; Node 22 con caché npm; `npm ci`; `npm run typecheck`; Chromium; tres experimentos; reporte subido con `if: always()` y `retention-days: 14` | `war-paradigm/.github/workflows/ci.yml` |
| 21 | Versiones de la máquina: npm 11.19.0, git 2.50.1 (Apple Git-155), gh 2.90.0 (2026-04-16) | Salidas reales |
| 22 | `brew install node@24 git gh` / `nvm install --lts` / `npm init playwright@latest` | `m3.hands[0]` |
| 23 | Preguntas del init (TS/JS, carpeta, workflow de GitHub Actions, navegadores) y archivos creados | https://playwright.dev/docs/intro (consultado el 26-oct-2026) |
| 24 | `npm ci && npx playwright install --with-deps chromium` para un proyecto existente | `war-paradigm/README.es.md` |
| 25 | `npx playwright --version` → "Version 1.63.0"; `which playwright` → "playwright not found" | Salidas reales en la copia local |
| 26 | `.gitignore` de war-paradigm | `war-paradigm/.gitignore` |
| 27 | Criterio `.gitignore` con node_modules, test-results, playwright-report | `m3.crit[1]`; `quiz-01-10.json` → m3 pregunta 6 |
| 28 | Flujo rama → PR → review → merge; por qué PRs contigo mismo | `m3.hands[1]`; `quiz-01-10.json` → m3 pregunta 1 |
| 29 | Mutación: borrar el lockfile → `npm ci` EUSAGE "…can only install with an existing package-lock.json…", exit 1 | Corrida local de `npm ci --ignore-scripts` sin lockfile; `m3.mut` |
| 30 | `engines.node >= 20` en war-paradigm | `war-paradigm/package.json` |
| 31 | Reto, criterios, entregable y nivel 4 (workflow con `npm ci`) | `m3.hands`, `m3.crit`, `m3.deliver`, `m3.top` |
| 32 | Rúbrica genérica y regla de aprobación | `ui.json` → `rubric.generic`, `module.evalNote`; `course.json` (`qn: 8`, `qpass: 0.75`) |
| 33 | Preguntas del quiz | `quiz-01-10.json` → m3 preguntas 4 (a=1), 6 (a=1), 7 (a=1) |
| 34 | Siguiente módulo: Obsidian | `course.json` posición 5 = `m3b` |

## No verificado

- No se corrió `npm init playwright@latest` (descarga paquetes y es interactivo): las preguntas y los archivos creados vienen de la documentación oficial, no de una grabación.
- No se probó qué hace npm con una versión de Node fuera de `engines` (>=20). El guion lo deja como predicción para el estudiante y no afirma resultado.
- No se ejecutó el CI de GitHub: que el paso `npm ci` frenaría las dos mutaciones se deduce del workflow y de las corridas locales con el mismo comando.
- `node --version` = v26.8.1 es la máquina de preparación de Cris (Current, no LTS). El guion lo usa como ejemplo real; Cris debe decidir si quiere mostrarlo o cambiar a Node 24 y regrabar esa línea.
- Las salidas de `git push`, `gh pr create` y el merge no se muestran; la escena E13 se graba con un repo de práctica.

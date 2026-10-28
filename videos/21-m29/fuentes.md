# Fuentes · 21-m29 · Ejecución de mutantes

Repos leídos en `scratchpad/brand/` el 2026-10-26: war-paradigm (`5dc5e92`; las salidas del experimento 02 se actualizaron a `a5386c8`/`08438a2`, que ya traen `viewer-create`) y civica-playwright-challenge (`d4f1db9` para el estado anterior al arreglo y `b240008` para el actual). Corridas en macOS con Node 26.8.1 y Playwright 1.63.0. Las corridas que modifican código (mutantes nuevos, arreglo, trampa al clasificador, edición del ledger) se hicieron en copias locales en `scratchpad/run19-24/`, nunca en los clones compartidos; las ejecutó un asistente bajo dirección de Cristian.

| Afirmación en el guion | Fuente |
|---|---|
| Un 5xx no prueba que la regla funcione: INCONCLUSIVE, fuera del puntaje | `quiz-20-27.json` → `m29` pregunta 1; `tests/scenario-evidence.ts` (`classifyMutation`) |
| Analogía de los 6 juguetes y la luz que se va | `m29.kid` |
| Ciclo generar → correr → clasificar → puntuar → registrar → priorizar | `m29.theory[0]` |
| Prerrequisitos (Node 20+, Playwright con TS, API) | `m29.pre`; `war-paradigm/package.json` (`engines.node >=20`) |
| Siete mutantes y sus códigos (403, 422, 409, 401, 422, 403, 403); `viewer-create` se agregó al preparar el curso | `war-paradigm/experiments/02-mutants/tests/scenarios.ts`; `m29.theory[1]` |
| `generateSearchMutants(title)` con 7 mutadores en 3 clases; consultas `INCEPTION`, `inception`, título con espacios, prefijo, sufijo `qzx404`, `zzqxw404movie` | `civica-playwright-challenge/src/support/mutations.ts`; `docs/MUTATION-TESTING.md` §The three mutant classes |
| 3 semillas × 7 = 21 mutantes | `tests/mutation/searchMutants.mutation.spec.ts` (`SEED_MOVIES`); salida real de `--list`: «Total: 21 tests in 1 file» |
| «Equivalent» clásico vs. civica (≈ relación metamórfica) | `m29.theory[2]`; `quiz-20-27.json` → `m29` pregunta 7 |
| Orden del runner: validar contrato (id, nombre, 4xx, paso único), reset 204, login por paso, línea base 201/200, un solo cambio | `experiments/02-mutants/tests/scenario-runner.ts` (`validate`, `executeScenario`, `baselineStatus`) |
| Cinco estados y sus reglas; `noEvidence()` → INFRA_ERROR | `tests/scenario-evidence.ts` (tipo `Outcome`, `classifyBaseline`, `classifyMutation`, `noEvidence`); `m29.theory[4]` |
| Kill rate y «5/7 scored mutants killed · 2 survived · 0 excluded from score»; meter excluidos al denominador baja, contarlos como KILLED sube | `tests/mutant-reporter.ts` líneas 59-79; `m29.theory[5]` |
| Known survivor en rojo, corrida verde; la marca solo tras observar una mutación aceptada; estricto con `MUTANT_LAB_STRICT=1`; FIXED | `tests/mutants.spec.ts`; `experiments/02-mutants/README.md` §Evidence, classification and score gate; `m29.theory[6]` |
| Evidencia: esperado/observado, fase, motivo, git, SHA-256 de 7 entradas, `randomSeed: null` | `tests/scenario-evidence.ts` (`inputs`, `createRunProvenance`); JSON real de la corrida |
| Límite del oráculo, sin estado EQUIVALENT | `experiments/02-mutants/README.md` §Evidence, classification and score gate; `m29.theory[8]` |
| `npm run test:strict -w experiments/02-mutants`: 2 failed, 5 passed, exit 1 | Corrida propia 2026-10-26 en el clon (`a5386c8`) |
| `npm run test:unit -w experiments/02-mutants`: 5 pruebas, 5 pasan | Corrida propia 2026-10-26; `tests/unit/scenario-evidence.test.ts` |
| Modo por defecto para el día a día, estricto para un gate de release | `quiz-20-27.json` → `m29` pregunta 5 |
| Dos mutantes propuestos (`viewer-publish` 403 y título de 2 caracteres 422) y la regla de commitear la predicción antes | `m29.hands[4]`, `m29.crit[1]` |
| Resultado (no se dice en el guion para no arruinar el ejercicio): ambos KILLED, «7/9 scored mutants killed · 2 survived · 0 excluded from score» | Corrida propia sobre `08438a2` con los dos mutantes agregados y revertidos, 2026-10-26 |
| «Kill it yourself» → FIXED self-grant, 6/7, estricto con exit 1 por viewer-create | `experiments/02-mutants/README.md` §Kill it yourself; corrida propia sobre `a5386c8` con el arreglo, revertida |
| civica: `npm ci` instala Chromium en el `postinstall` | `civica-playwright-challenge/package.json` (`"postinstall": "playwright install chromium"`) |
| Orden declarado de `--list` y salto de `inception--gibberish` al primer lugar tras poner `history[-1] = "failed"` y `failures: 1` | Corridas propias 2026-10-26 en civica `b240008` (`npx playwright test --project=mutation --list` antes y después) |
| `prioritize()`: peso 0 si falló en sus últimas 5 corridas, 1 nunca visto, 2 el resto; orden estable; cambia el orden y no el veredicto | `src/support/mutationInsights.ts` (`b240008`); `docs/MUTATION-TESTING.md` §The learning loop |
| El ledger está en `ledger/mutation-insights.json` y guarda `runs` (todas), `history` (últimas 5), `failures` y `timeouts` (dentro de esas 5); dos corridas → `runs` 1 → 2 (tres corridas locales: 1 → 2 → 3) | `src/support/mutationPaths.ts`, `src/support/mutationInsights.ts` (`recordRun`, `HISTORY_WINDOW = 5`) en `b240008`; corridas propias 2026-10-26 |
| Olvido: sigue primero hasta que el `failed` sale de la ventana de 5; vuelve a su lugar tras la quinta corrida | `recordRun` (`slice(-HISTORY_WINDOW)`); `tests/unit/mutationInsights.unit.spec.ts` («counts every run but forgets failures older than the window»); README «Forgetting». No se corrieron cinco corridas reales |
| Antes de `b240008`: `failures` acumulado; `timedOut`/`interrupted` contaban como fallo; `loadInsights()` devolvía `{}` si el JSON estaba corrupto; CI subía `mutation-insights` sin descargar el anterior | `reporters/mutationInsightsReporter.ts`, `src/support/mutationInsights.ts` y `.github/workflows/ci.yml` en `d4f1db9`; `m29.theory[10]` |
| Antes de `b240008` el ledger vivía en `test-results/` (`INSIGHTS_PATH`), la carpeta que Playwright vacía al empezar cada corrida; tras dos corridas `runs` seguía en 1; `--list` sí reordenaba | `src/support/mutationPaths.ts` en `d4f1db9`; `playwright.config.ts` (sin `outputDir` propio); `node_modules/playwright/lib/runner/index.js` (`removeFolders([outputDir])`); corridas propias en copia local, 2026-10-26, Playwright 1.63.0; README de `b240008` («before this fix, `runs` never got past 1») |
| El arreglo en `b240008`: `ledger/`, ventana de 5, timeouts aparte sin subir al mutante, ⚠ + anotación `ledger-warning` + `.corrupt`, CI descarga el artefacto de la última corrida terminada de main y lo sube con 90 días | Mensaje y diff del commit `b240008`; README «What it learns, and what it doesn't»; `.github/workflows/ci.yml` |
| Ledger roto a propósito → «⚠ mutation ledger ledger/mutation-insights.json is unreadable (…); running without learned order» y queda `ledger/mutation-insights.json.corrupt` | Corrida propia en civica `b240008`, 2026-10-26 (el ledger se restauró después) |
| Seis mutantes de seguridad (tarjeta, CSP, HSTS, nosniff, cookie, READ_SMS) sobre línea base endurecida; `detect()` corre el escáner real; ledger aparte en `ledger/audit-mutation-insights.json`, solo registrado | `civica-playwright-challenge/docs/AUDIT-POC.md` §POC 3 (`b240008`); `src/audit/securityMutations.ts` |
| Séptimo mutante, X-Frame-Options, equivalente: la línea base no envía ese header y su CSP trae `frame-ancestors 'none'`; `@auditEquivalent` comprueba en cada corrida que no cambia nada | `src/audit/securityMutations.ts` (`equivalent`), `tests/audit/securityMutants.audit.spec.ts`, `docs/AUDIT-POC.md` «Equivalent mutants» (`b240008`); `mocks/data/accountApp.ts` (`SECURE_RESPONSE_HEADERS`) |
| `npm run test:audit -- securityMutants` → 7 passed; «Security mutant kill rate: 6/6 (100%), 1 equivalent excluded» | Corrida propia 2026-10-26 en `b240008` (`test-results/audit/security-mutants.json`); CI de civica runs 40407770636 y 40407982223 |
| Si un mutante de seguridad sobrevive, es hallazgo del auditor y no se toca | `m29.hands[8]` |
| Trampa: 5xx → KILLED en `classifyMutation`; `npm run test:unit` → 4 pass, 1 fail («accepted mutation survives, but server errors are inconclusive»), «+ 'KILLED' - 'INCONCLUSIVE'», exit 1 | `m29.mut`; corrida propia en copia local, 2026-10-26 |
| Entregable, criterios y rúbrica de 4 filas | `m29.deliver`, `m29.crit`, `m29.rubm`; `ui.json` → `rubric.allRows` |
| Preguntas del quiz | `quiz-20-27.json` → `m29` índices 0, 2 y 9 |
| Siguiente módulo: m21 | `course.json` (posición 22) |

## Lo que no se verificó
- El borrado de `test-results/` se observó en Playwright 1.63.0 en macOS. Ya no afecta: desde `b240008` el ledger vive en `ledger/`, y en CI la corrida 40407982223 restauró el ledger de la 40407770636 (artefacto con `runs: 2`).
- El olvido tras 5 corridas y el timeout que no sube al mutante se comprobaron con las pruebas unitarias de civica, no con corridas reales.
- El mutante sugerido (quitar solo `frame-ancestors` de la CSP) no se corrió.
- No se leyó el artículo de Google (Petrović e Ivanković); solo se enlaza.
- No se corrió `npm run evidence` de war-paradigm.

# Fuentes · 22-m21 · Mutantes que aprenden

Repos leídos: civica-playwright-challenge en `b240008` (el arreglo del ledger) y, para la historia de antes, en `d4f1db9`; clon en `scratchpad/brand/`. Corridas el 2026-10-26 en macOS, Node 26.8.1, Playwright 1.63.0. Las de antes del arreglo se hicieron sobre una copia local en `scratchpad/run19-24/civica` (`d4f1db9`; los cambios de código se hicieron solo ahí y se revirtieron); las de después, sobre el clon en `b240008`. Las ejecutó un asistente bajo dirección de Cristian; el guion lo declara.

| Afirmación en el guion | Fuente |
|---|---|
| «Correr mutantes una vez es una foto… película»; primero los que fallaron, luego los nuevos, al final los que siempre pasan | `i18n/es/modules-15-23.json` → `m21.mentor`, `m21.theory[0]` |
| Analogía del portero | `m21.kid` |
| civica: Playwright + TypeScript, dos flujos de IMDb, capa de mocks determinista | `civica-playwright-challenge/package.json` (`description`) |
| Tres clases y sus ejemplos; 3 semillas × 7 mutadores = 21 | `src/support/mutations.ts`; `docs/MUTATION-TESTING.md` §The three mutant classes; salida de `--list` («Total: 21 tests in 1 file») |
| Orden de `prioritize()` y su motivo (feedback rápido, cobertura nueva) | `src/support/mutationInsights.ts` (comentario y pesos 0/1/2) |
| El reporter mira `@mutant`, guarda status y duración; el id es la primera palabra del título | `reporters/mutationInsightsReporter.ts` (`b240008`) |
| El ledger guarda status, durationMs, `runs` (todas las corridas), `history` (últimas 5), `failures` y `timeouts` (dentro de esas 5); `HISTORY_WINDOW = 5`; un mutante que falló una vez vuelve a su lugar tras 5 corridas; los timeouts no lo suben | `src/support/mutationInsights.ts` (`MutantOutcome`, `recordRun`, `prioritize`); README «What it learns, and what it doesn't»; `docs/MUTATION-TESTING.md` §Forgetting y §Timeouts |
| El ledger vive en `ledger/`, en el `.gitignore`; Playwright vacía `test-results/` al empezar; en un clon nuevo está vacío y se usa el orden declarado | `src/support/mutationPaths.ts`; `.gitignore`; `docs/MUTATION-TESTING.md` (párrafo tras The learning loop) |
| En CI se descarga el artefacto `mutation-insights` de la última corrida terminada de main antes de los mutantes y se sube al final, 90 días | `.github/workflows/ci.yml` (`b240008`): pasos «Restore mutation ledgers from the latest main run» y «Upload mutation insights ledgers» (`retention-days: 90`) |
| Sort estable; cambia el orden, no el veredicto; no agrega ni quita mutantes ni reintenta; si el orden cambia un veredicto hay estado compartido (bug del arnés) | `src/support/mutationInsights.ts`; README «What it learns: only the order»; `m21.theory[2]`; `quiz-20-27.json` → `m21` pregunta 3 |
| Auditor con tres POC (exposición web, Android estático, mutantes) | `docs/AUDIT-POC.md` (índice) |
| Línea base endurecida y seis defectos sembrados (tarjeta, CSP, HSTS, nosniff, cookie, READ_SMS); `detect()` corre el escáner real; un séptimo, X-Frame-Options, marcado como equivalente | `docs/AUDIT-POC.md` §POC 3 (`b240008`); `src/audit/securityMutations.ts` (`generateSecurityMutants`) |
| POC 1: 16 hallazgos (3 críticos, 3 altos, 8 medios, 2 bajos) en el flujo vulnerable; cero en la respuesta y la cookie seguras | `docs/AUDIT-POC.md` §POC 1 «What it found» |
| Relación de la hoja de ruta hoy: «results for a prefix of `X` ⊇ results for `X` (searching `The` returns 4 titles, `The Dark Knight` returns 1), not the other way round» | `docs/MUTATION-TESTING.md` §Roadmap (`b240008`) |
| Antes decía lo contrario («results for `X` ⊇ results for a prefix of `X`») y se corrigió en el mismo commit del ledger | `docs/MUTATION-TESTING.md` §Roadmap en `d4f1db9`; mensaje del commit `b240008` («La relación metamórfica del roadmap queda en la dirección correcta»). En el curso, el commit `e37ed18` de qa-automation-course lo había corregido antes en `m21.top` y en el quiz |
| La búsqueda del mock es por subcadena sin mayúsculas; «The» → 4 títulos, «The Dark Knight» → 1 | `mocks/server/pageTemplates.ts` (`findPage`); `mocks/data/movies.ts` (`searchableMovies`); el propio roadmap (`b240008`) |
| Chen et al., ACM CSUR 2018 | https://doi.org/10.1145/3143561 (enlace del curso) |
| `npm ci` instala Chromium (postinstall); `--list` da 21 tests y el orden declarado; `npm run test:mutation` → 21 passed | `package.json` (`postinstall`); corridas propias 2026-10-26 |
| Tres corridas seguidas en local, ya con el arreglo: `runs` 1 → 2 → 3 en los 21 mutantes | Corridas propias en el clon `b240008`, 2026-10-26 (`ledger/mutation-insights.json` tras cada corrida) |
| Con `history[-1] = "failed"` y `failures: 1` en `inception--gibberish`, `--list` lo pone primero de su semilla y los demás quedan igual | Corrida propia en el clon `b240008`, 2026-10-26 |
| `npm run test:audit -- securityMutants` → 7 passed (6 `@auditMutant` + 1 `@auditEquivalent`); «Security mutant kill rate: 6/6 (100%), 1 equivalent excluded»; Killed con «detected by the auditor»; el equivalente sale como «Equivalent: missing-header» con su razón | Corrida propia en el clon `b240008`, 2026-10-26 (`test-results/audit/security-mutants.json`); CI runs 40407770636 y 40407982223 |
| El ledger del auditor va en `ledger/audit-mutation-insights.json` y solo se registra; nada reordena los mutantes de seguridad | `docs/AUDIT-POC.md` §POC 3 «Learning loop» (`b240008`) |
| 6/6 afirma solo el catálogo | `quiz-20-27.json` → `m21` pregunta 8 |
| Antes del arreglo: mutante `x-frame-options` → 1 failed, 6 passed, «kill rate 6/7 (86%)» | Corrida propia en la copia local `d4f1db9`, 2026-10-26 |
| La línea base no tiene X-Frame-Options; la CSP trae `frame-ancestors 'none'`; el auditor acepta cualquiera de los dos | `mocks/data/accountApp.ts` (`SECURE_RESPONSE_HEADERS`); `src/audit/securityHeaders.ts` (`checkFrameAncestors`) |
| Mutante equivalente en el sentido clásico | `m29.theory[2]`; https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/ |
| Hoy queda en el catálogo como `equivalent`, con su razón, fuera del kill rate; `@auditEquivalent` comprueba en cada corrida que los hallazgos sobre los headers mutados son iguales a los de la línea base; si deja de cumplirse, se reclasifica | `src/audit/securityMutations.ts` (`equivalent.holds`); `tests/audit/securityMutants.audit.spec.ts`; `docs/AUDIT-POC.md` §POC 3 «Equivalent mutants» |
| Si un mutante nuevo sobrevive, se reporta y no se ajusta | `m21.theory[4]`, `m21.crit[2]` |
| Historia del bug (antes del arreglo): forzar el fallo (mutador gibberish = título) → 3 fallos, ledger `{status: failed, runs: 1, failures: 1}`; la corrida siguiente (1 worker) arranca por `inception--exact` y el ledger vuelve a `{runs: 1, failures: 0}`; dos corridas seguidas dejan `runs: 1` | Corridas propias en la copia local `d4f1db9`, 2026-10-26 |
| Causa: el ledger vivía en `test-results/` y Playwright vacía su carpeta de salida al empezar; `--list` no la vacía | `src/support/mutationPaths.ts` en `d4f1db9` (`INSIGHTS_PATH`); `playwright.config.ts` sin `outputDir` propio; `node_modules/playwright/lib/runner/index.js` (`removeFolders([outputDir])`); README en `b240008` («which is why, before this fix, `runs` never got past 1») |
| Antes: `failures` acumulado, timeout contado como fallo, JSON corrupto → ledger vacío en silencio, CI sin descarga | `reporters/mutationInsightsReporter.ts`, `src/support/mutationInsights.ts` y `.github/workflows/ci.yml` en `d4f1db9`; diff de `b240008` |
| Los cinco cambios de `b240008` (ledger/ con migración del archivo viejo, ventana de 5, timeouts aparte, ⚠ + `ledger-warning` + `.corrupt`, CI descarga y sube con 90 días) | Mensaje y diff del commit `b240008`; README «What it learns, and what it doesn't»; `docs/MUTATION-TESTING.md` |
| Ledger roto a propósito (`{ not json`) → «⚠ mutation ledger ledger/mutation-insights.json is unreadable (…); running without learned order» y queda `ledger/mutation-insights.json.corrupt` | Corrida propia en el clon `b240008`, 2026-10-26 (luego se restauró el ledger) |
| CI: la primera corrida tras el arreglo arrancó sin artefacto; la siguiente restauró los ledgers de la anterior y su artefacto quedó con `runs: 2` en los 21 mutantes | GitHub Actions de civica: run 40407770636 («No previous ledger artifact found; starting a fresh ledger»), run 40407982223 («Restored ledgers from run 40407770636»); artefacto `mutation-insights` de 40407982223 descargado con `gh run download` el 2026-10-26 |
| Siete pruebas unitarias: orden, olvido, timeouts, migración, ruta vieja, archivo corrupto, archivo inexistente | `tests/unit/mutationInsights.unit.spec.ts`; `npm run test:unit` → «7 passed», 2026-10-26 |
| Reto, entregable, criterios y nivel 4 | `m21.hands`, `m21.deliver`, `m21.crit`, `m21.top` (qa-automation-course, commit del 26-oct que refleja `b240008`) |
| Rúbrica de 4 niveles | `ui.json` → `rubric.generic` (m21 no tiene `rubm`) |
| Preguntas del quiz | `quiz-20-27.json` → `m21` índices 2, 1 y 7 |
| Siguiente módulo: m18 | `course.json` (posición 23) |

## Lo que no se verificó
- El mutante sugerido en el reto (quitar solo `frame-ancestors` de la CSP) y el de «meter un JWT en el body» no se corrieron: el guion los presenta como predicción por escribir.
- El olvido tras 5 corridas se comprobó con las pruebas unitarias, no con cinco corridas reales seguidas.
- El borrado de `test-results/` se observó solo en Playwright 1.63.0 en macOS.

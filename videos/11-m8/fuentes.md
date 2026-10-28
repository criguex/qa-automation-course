# Fuentes · Módulo 8 (11-m8)

Rutas `brand/<repo>/…` = clones en `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/`. Repos públicos en `https://github.com/criguex/<repo>`.

| ID | Afirmación del guion | Fuente |
|---|---|---|
| F01 | Corrida completa de SpendWise del 17-oct-2026: 274 pruebas, 184 pasan, 90 fallan | `brand/spendwise-qa-assessment/evidence/report/full-run.json` |
| F02 | "Un test que pasa y nadie ve, no existe"; objetivos, teoría (Allure como estándar abierto, gestores equivalentes Xray/TestRail/Zephyr/qTest, cadena de requisito a certificación) | `brand/qa-automation-course/i18n/es/modules-01-14.json` → `m8` |
| F03 | "512 passed, 3 failed", lectores del reporte, cuándo capturar, curl + response, clasificación de fallos, historial, bidireccionalidad, cambio Xray → TestRail | `brand/qa-automation-course/i18n/es/quiz-11-19.json` → `m8` |
| F04 | Reporters de civica (list, html, junit en `test-results/junit.xml`, dos ledgers en `ledger/`) y `trace: 'on-first-retry'`, `screenshot: 'only-on-failure'`, `video: 'retain-on-failure'` | `brand/civica-playwright-challenge/playwright.config.ts` |
| F05 | Reporters de restful-booker según CI y `trace: 'retain-on-failure'` | `brand/restful-booker-quality-suite/playwright.config.ts` |
| F06 | `npm run report` = `playwright show-report` | `package.json` de civica, restful-booker y war-paradigm/02 |
| F07 | Evidencia por defecto de interfaz en spendwise: video con puntero, capturas por paso, captura final, JSON de metadatos | `brand/spendwise-qa-assessment/evidence/README.md` |
| F08 | Contenido de BUG-09.json (título, rol, ruta, hora, reproduced, esperado, real, pasos) | `brand/spendwise-qa-assessment/evidence/report/BUG-09/BUG-09.json` |
| F09 | Evidencia sin contraseñas ni tokens (`[REDACTED]`, `<TOKEN>`); CI con `--trace=off` porque las trazas guardan cabeceras | `brand/spendwise-qa-assessment/README.md` (Evidencia y seguridad), `evidence/README.md` |
| F10 | Informe single-file con la evidencia embebida que se abre sin el repo (≈16 MB en disco) | `brand/spendwise-qa-assessment/README.md`; tamaño de `docs/INFORME-QA-SpendWise.html` (16.189.212 bytes) |
| F11 | 47 defectos (18 alta, 27 media, 2 baja) reproducidos el 17-oct-2026, cada uno con captura, regla, solución y prueba; 8 mejoras con razón | `brand/spendwise-qa-assessment/README.md` (Resultado) |
| F12 | E2E-06 descartado como defecto; errores de infraestructura 0; fallos sin clasificar 0 | `brand/spendwise-qa-assessment/evidence/final-execution-summary-2026-10-16.txt` |
| F13 | Regla de oro 6: cada fallo recibe veredicto; nunca arreglar una prueba para que pase contra una respuesta equivocada | `brand/war-paradigm/experiments/03-second-brain/vault/Golden rules.md` |
| F14 | Formato de ficha de defecto; RB-003 High/P1, 10,99 → 10, impacto; RB-002 "evidence-based hypothesis, not source-code proof" | `brand/restful-booker-quality-suite/docs/DEFECTS.md` |
| F15 | Tabla de trazabilidad de requisitos de civica (requisitos 4, 5 y 6) | `brand/civica-playwright-challenge/README.es.md` |
| F16 | 26 casos base priorizados por riesgo; fila VAL-01 → BUG-01; matriz RN-20/Anexo E → `policy-rules.spec.ts` | `brand/spendwise-qa-assessment/docs/03-casos-prueba.md`, `docs/02-estrategia-plan.md` |
| F17 | `failedByDefect` (BUG-01, BUG-02) y `unmapped: []` | `brand/spendwise-qa-assessment/evidence/report/full-run.json` |
| F18 | Karate deja HTML por feature con logs, Cucumber JSON y XML de Surefire | `brand/karate-api-testing/README.es.md` (Reportes) |
| F19 | Ninguno de los repos públicos revisados integra Allure; receta `npm i -D allure-playwright`; "history, trends and step-level detail" | Búsqueda de "allure" en los clones de `brand/`; `brand/civica-playwright-challenge/docs/GROWTH.md` |
| F20 | Ledger `ledger/mutation-insights.json`; prioridad: falló en sus últimas 5 corridas → nuevos → resto; antes vivía en `test-results/`, que Playwright vacía al empezar, y no recordaba; se arregló en `b240008` | `brand/civica-playwright-challenge/docs/MUTATION-TESTING.md`, `README.md` («What it learns, and what it doesn't»), `src/support/mutationPaths.ts`; commit `b240008` de civica |
| F21 | CI de restful-booker sube el reporte con `if: always()` y `retention-days: 14` | `brand/restful-booker-quality-suite/.github/workflows/tests.yml` |
| F22 | EXECUTION_REPORT: 43 chequeos, 8 defectos, 3 bloqueantes, tabla por gate, decisión, exclusiones deliberadas | `brand/restful-booker-quality-suite/docs/EXECUTION_REPORT.md` |
| F23 | `mutant-evidence.json`: ID, status esperado/observado, fase, razón, revisión Git, SHA-256 de app/escenario/runner/test/lockfile, `randomSeed: null` | `brand/war-paradigm/experiments/02-mutants/README.md`; `tests/mutant-reporter.ts`, `tests/scenario-evidence.ts` |
| F24 | CI de civica sube los reportes de auditoría justo después de su suite y, al final, `playwright-report/` y el ledger de mutantes (90 días; la corrida siguiente de main lo descarga), los tres con `if: ${{ !cancelled() }}`; JUnit para tableros de CI | `brand/civica-playwright-challenge/.github/workflows/ci.yml`; `README.es.md` (Reportes y artefactos) |
| F25 | Prueba principal de búsqueda con `toHaveText('Inception')` | `brand/civica-playwright-challenge/tests/mock/searchMovie.mock.spec.ts` |
| F26 | Criterios, entregable, mutación y nivel top | `modules-01-14.json` → `m8.crit`, `m8.deliver`, `m8.mut`, `m8.top` |

# Fuentes · Módulo 7b (10-m7b)

Rutas `brand/<repo>/…` = clones en `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/`. Repos públicos en `https://github.com/criguex/<repo>`.

| ID | Afirmación del guion | Fuente |
|---|---|---|
| F01 | 43 chequeos, 43 pasan con 9 fallos esperados; 8 defectos confirmados; RB-002/003/004 de severidad alta | `brand/restful-booker-quality-suite/evidence/execution-2026-10-16.txt`; `docs/EXECUTION_REPORT.md` |
| F02 | Cuando se arregla un defecto, Playwright produce un pase inesperado y obliga a quitar la anotación | `brand/restful-booker-quality-suite/docs/DEFECTS.md` (Automation and release treatment); https://playwright.dev/docs/test-annotations |
| F03 | Protocolo de ciclos, "itera estrecho, confirma amplio", test data con caveats, 204 ≠ bug, "sin data no se ejecuta nada", formato en el wire, cardinalidad, `@IGNORE` con ticket abierto y condición, "suite verde ≠ software bien" | `brand/qa-automation-course/i18n/es/modules-01-14.json` → `m7b` |
| F04 | Ejemplo 7 de 120, retest vs regresión, efectos colaterales del fix, cardinalidad 0/1/N, ambiente compartido 3 vs 7 pedidos | `brand/qa-automation-course/i18n/es/quiz-01-10.json` → `m7b` |
| F05 | Recomendación de spendwise: NO GO condicionado hasta corregir o aceptar los riesgos altos y completar retest y regresión | `brand/spendwise-qa-assessment/evidence/final-execution-summary-2026-10-16.txt` |
| F06 | Opción `--last-failed` de la CLI de Playwright | https://playwright.dev/docs/test-cli |
| F07 | Un archivo de registro por campaña en la evidencia de spendwise (10 casos, 119 pruebas, mutación, adversariales, Newman) | `brand/spendwise-qa-assessment/evidence/README.md` (Registros de ejecución) |
| F08 | Nota "Test data · users": sembrados en `POST /api/_reset`, contraseña demo123, solo demo local, cuatro roles, `ttl: 0` → token vencido | `brand/war-paradigm/experiments/03-second-brain/vault/03 Knowledge/Test data - users.md` |
| F09 | Mutante stale-token con `ttl: 0` → 401 | `brand/war-paradigm/experiments/02-mutants/tests/scenarios.ts` |
| F10 | RB-002: el booleano de XML se corrompe (JSON vs XML) | `brand/restful-booker-quality-suite/docs/DEFECTS.md` |
| F11 | Spendwise: reglas de política de prueba inactivas y borradas al final; un solo worker para integración/E2E | `brand/spendwise-qa-assessment/README.md`, `docs/02-estrategia-plan.md` |
| F12 | `known-defects.spec.ts`: describe "Confirmed product defects @known-defect", prueba RB-002 con `test.fail(true, 'Known defect RB-002: …')` y aserción `toBe(false)` | `brand/restful-booker-quality-suite/tests/api/known-defects.spec.ts` |
| F13 | Cuarentena con dueño, ticket y vencimiento; "Retries gather evidence but do not redefine a pass" | `brand/restful-booker-quality-suite/docs/TEST_STRATEGY.md` (Release policy) |
| F14 | Hallazgo conocido marcado solo tras observar la mutación aceptada; reset/login/baseline no se esconden; `MUTANT_LAB_STRICT=1` | `brand/war-paradigm/experiments/02-mutants/README.md`; `tests/mutants.spec.ts` |
| F15 | Recomendación no-go para XML, precios decimales o fechas sin validar | `brand/restful-booker-quality-suite/docs/EXECUTION_REPORT.md` (Release decision) |
| F16 | `full-run.json` del 17-oct-2026: 274 total, 184 pasan, 90 fallan, mapa `failedByDefect`, `unmapped` vacío | `brand/spendwise-qa-assessment/evidence/report/full-run.json` |
| F17 | Script `test:defects` = `playwright test --project=api --grep @known-defect` | `brand/restful-booker-quality-suite/package.json` |
| F18 | Reparto de RB-001…RB-008 entre `known-defects.spec.ts` y `contracts-negative.spec.ts`; 9 chequeos (RB-005 PUT y PATCH); prueba positiva 2028-02-29 → 2028-03-01 | `brand/restful-booker-quality-suite/tests/api/known-defects.spec.ts`, `tests/api/contracts-negative.spec.ts`, `docs/DEFECTS.md` |
| F19 | RB-008 marcado con `test.fail` esperando 401/403; la prueba de contrato "failed authentication matches the error contract" espera 200 | `brand/restful-booker-quality-suite/tests/api/known-defects.spec.ts`, `tests/contract/booking.contract.spec.ts` |
| F20 | Marcador: 5 KILLED, KNOWN SURVIVOR self-grant con HTTP 200 y viewer-create con HTTP 201 (hallado al preparar el curso); arreglo `editMember: (actor) => actor.role === 'admin'` → 403, `FIXED self-grant`, 6/7 con viewer-create aún sobreviviente, JSON con rol observado; quitar `known:` | `brand/war-paradigm/experiments/02-mutants/README.md` (What you will see, Kill it yourself); corrida local con el arreglo en `a5386c8`, revertida |
| F21 | DEF-001: estado Open, esperado 403, real 200, causa raíz, el mutante queda como hallazgo conocido | `brand/war-paradigm/experiments/03-second-brain/vault/03 Knowledge/DEF-001 self-grant role.md` |
| F22 | Regla de oro 4: no inventar datos; si falta algo, decirlo y crear una tarea | `brand/war-paradigm/experiments/03-second-brain/vault/Golden rules.md` |
| F23 | `/ping` → 201 queda como punto a aclarar, no defecto | `brand/restful-booker-quality-suite/docs/DEFECTS.md`, `docs/TEST_STRATEGY.md` |
| F24 | Criterios, entregable, mutación y nivel top | `modules-01-14.json` → `m7b.crit`, `m7b.deliver`, `m7b.mut`, `m7b.top` |

# Fuentes · Módulo 6 (08-m6)

Rutas `brand/<repo>/…` = clones en `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/`. Repos públicos en `https://github.com/criguex/<repo>`.

| ID | Afirmación del guion | Fuente |
|---|---|---|
| F01 | RB-002: `depositpaid` false enviado en XML queda `true`, con HTTP 200; impacto "booking treated as paid" | `brand/restful-booker-quality-suite/docs/DEFECTS.md` (RB-002) y `README.es.md` ("Un ejemplo real") |
| F02 | Regla "valida contra el contrato, no adaptes"; revalidar contra la última versión; auditoría de contrato; alinear vs enmascarar; antipatrón de la IA | `brand/qa-automation-course/i18n/es/modules-01-14.json` → `m6.theory` |
| F03 | Comentario "never the other way around" en los esquemas de civica; "un drift se reporta, nunca se adapta el test" | `brand/civica-playwright-challenge/src/contracts/movieApiSchemas.ts`; `README.es.md` (Tipos de prueba) |
| F04 | Esquema de reserva: tipos, `isoDateSchema` con `refine` 'Invalid calendar date', `authSuccessSchema` `.strict()` | `brand/restful-booker-quality-suite/src/contracts/bookingSchemas.ts` |
| F05 | `expectSchema` usa `safeParse` y `z.prettifyError` | `brand/restful-booker-quality-suite/src/support/expectSchema.ts` |
| F06 | `toMatchSchema` imprime `ruta: mensaje` por cada issue de Zod | `brand/civica-playwright-challenge/src/support/customMatchers.ts` |
| F07 | Prueba "partial update preserves omitted fields" con `additionalneeds: 'Late checkout'` | `brand/restful-booker-quality-suite/tests/api/booking-crud.spec.ts` |
| F08 | "update without credentials is forbidden" → 403 | `brand/restful-booker-quality-suite/tests/api/contracts-negative.spec.ts` |
| F09 | `errorResponseSchema` y prueba del contrato de error con `tt0000000` | `brand/civica-playwright-challenge/src/contracts/movieApiSchemas.ts`, `tests/api/movies.contract.spec.ts` |
| F10 | 401 vs 403, idempotencia de PUT, PATCH parcial, paginación, JWT vencido, contrato de errores, origen del esquema | `brand/qa-automation-course/i18n/es/quiz-01-10.json` → `m6` (preguntas 4–10) |
| F11 | Molde create → try → finally delete; `booking()` con sufijo `Cristian-${suffix}`; `deleteBooking` acepta 201/405 y si no lanza error | `brand/restful-booker-quality-suite/tests/api/booking-crud.spec.ts`, `tests/api/helpers.ts` |
| F12 | "Cleanup accepts 'already absent' only for teardown, never for assertions"; sin IDs sembrados | `brand/restful-booker-quality-suite/docs/TEST_STRATEGY.md` (Test data and isolation) |
| F13 | Stack empresarial Java + Cucumber + TestNG + RestAssured + Karate; método agnóstico; suite progresiva Postman → RestAssured → Karate | `m6.theory` y `m6.hands` en `modules-01-14.json` |
| F14 | karate-api-testing: Scenario Outline con 3 filas, marcadores `#number`/`#string`, positivo 200 + marca, negativo 404 con HTML, `parallel(5)` y `getFailCount() == 0` | `brand/karate-api-testing/README.es.md`, `src/test/java/features/brand.feature`, `src/test/java/runner/ApiSuiteTest.java` |
| F15 | CI run 36095563876 (2026-09-25): Karate 1.3.1, 5 features, 30 escenarios, 30 pasan, BUILD SUCCESS | `brand/karate-api-testing/README.es.md` (Último resultado de CI); versión en `pom.xml` (`karate.version` 1.3.1) |
| F16 | Karate 2 (abr-2026): reescritura, Java 21+, CLI propia, auth declarativa, soft assertions, guía de migración v1 → v2 | `m6.theory` en `modules-01-14.json`; https://docs.karatelabs.io/getting-started/whats-new-v2 |
| F17 | spendwise Newman: 15 peticiones, 0 errores, 25 aserciones, 20 pasan, 5 fallan; "La suite conserva las expectativas del requisito y no se modificó para ocultar el comportamiento defectuoso" | `brand/spendwise-qa-assessment/evidence/final-execution-summary-2026-10-16.txt`; `README.md` (colección de 15 peticiones y 25 aserciones) |
| F18 | Levantar Restful Booker con `docker compose up --build -d` en `127.0.0.1:3001`; `npm ci` + `npm run quality` | `brand/restful-booker-quality-suite/README.es.md`; `package.json` (script `quality`) |
| F19 | Corrida del 16-oct-2026: estáticos PASS, 43 chequeos, 43 pasan con 9 fallos esperados, 2,0 s; CI 38966648020 success en 53 s | `brand/restful-booker-quality-suite/evidence/execution-2026-10-16.txt` |
| F20 | 8 defectos en 9 chequeos (RB-005 con PUT y PATCH) marcados con `test.fail` | `brand/restful-booker-quality-suite/docs/DEFECTS.md` (Automation and release treatment); `tests/api/known-defects.spec.ts`, `tests/api/contracts-negative.spec.ts` |
| F21 | Prueba de contrato de creación: `expectSchema` + `toEqual(payload)` | `brand/restful-booker-quality-suite/tests/contract/booking.contract.spec.ts` |
| F22 | RB-008: curl con contraseña errada → `HTTP 200 OK` + `{"reason":"Bad credentials"}`; esperado 401 o 403 definido; impacto en métricas | `brand/restful-booker-quality-suite/docs/DEFECTS.md` (RB-008) |
| F23 | Criterio de clasificación de defectos; `/ping` 201 y 418 son puntos a aclarar; documentarlos en OpenAPI | `brand/restful-booker-quality-suite/docs/DEFECTS.md`, `docs/EXECUTION_REPORT.md` (Additional observations), `docs/TEST_STRATEGY.md` |
| F24 | La prueba de salud espera 201 y 'Created' | `brand/restful-booker-quality-suite/tests/api/health-auth.spec.ts` |
| F25 | Reportar de inmediato con evidencia: campo/tipo distinto, respuesta sin documentar, naming raro | `m6.theory` en `modules-01-14.json` |
| F26 | Inception tiene `year: '2010'` en el mock; `MovieRecord.year` es `string`; `npm run test:contract` = `--project=api --grep @contract` | `brand/civica-playwright-challenge/mocks/data/movies.ts`, `package.json` |
| F27 | Mutación de `year` y las 5 mutaciones del payload; criterios y nivel top | `m6.mut`, `m6.crit`, `m6.top` en `modules-01-14.json` |
| F28 | Preguntas del mini-quiz (1, 3 y 4) | `brand/qa-automation-course/i18n/es/quiz-01-10.json` → `m6` |

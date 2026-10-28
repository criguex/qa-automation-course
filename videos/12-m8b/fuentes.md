# Fuentes · Módulo 8b (12-m8b)

Rutas `brand/<repo>/…` = clones en `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/`. Repos públicos en `https://github.com/criguex/<repo>`.

| ID | Afirmación del guion | Fuente |
|---|---|---|
| F01 | Flujo dorado editor → approver → editor en verde; self-grant aceptado con HTTP 200; "Every happy-path test was green while this was open" | `brand/war-paradigm/experiments/02-mutants/README.md`; `README.es.md` de la raíz |
| F02 | Sign-off humano, DoD, cadena estándar, registro de cierre variable, enlaces sin placeholders, reporte single-file, errores que invalidan | `brand/qa-automation-course/i18n/es/modules-01-14.json` → `m8b` |
| F03 | Done dev vs certificada; firma humana; DoD verificable; @IGNORE abierto no permite certificar; evidencia en mi máquina no vale; single-file; DoD de equipo; auditoría a 6 meses; presión con 30 % sin correr | `brand/qa-automation-course/i18n/es/quiz-11-19.json` → `m8b` |
| F04 | Historia US-42 con R-1…R-6 (prioridades must/should) y límites B-1…B-4 | `brand/war-paradigm/experiments/01-ai-verdict/fixtures/story-US-42.json` |
| F05 | AC-1 "Every scenario cites its source in the story (US-42/R-n)" bloquea | `brand/war-paradigm/experiments/01-ai-verdict/README.md` |
| F06 | Dos preguntas/dos oráculos; must bloquea, should suma; umbral 70 "a number the team agreed on. Not a vibe."; misma entrada tres veces | `brand/war-paradigm/experiments/01-ai-verdict/README.md` (The method) |
| F07 | La corrida 3 del set sin fijar supera el umbral y se rechaza (dos escenarios sin fuente, un editor aprueba su propio borrador) | `brand/war-paradigm/experiments/01-ai-verdict/README.md` |
| F08 | CI de restful-booker con `retention-days: 14` | `brand/restful-booker-quality-suite/.github/workflows/tests.yml` |
| F09 | Informe de spendwise de un solo archivo con evidencia embebida, abre sin el repo | `brand/spendwise-qa-assessment/README.md` |
| F10 | Allure tiene reporte single-file | Recurso del módulo "Allure — reporte single-file" (`course.json` → `m8b.res`, https://allurereport.org/docs/); no verificado en la documentación de Allure para este guion |
| F11 | Definition of done for a story (nueve condiciones, incluida "Green 3 times in a row, not once") | `brand/war-paradigm/experiments/03-second-brain/vault/01 QA process/Definition of done for a story.md` |
| F12 | "A test that passed once is a candidate, not a test" | `brand/war-paradigm/experiments/03-second-brain/vault/Golden rules.md` (regla 7) |
| F13 | Recomendación no-go de restful-booker y alternativa JSON-only con condiciones | `brand/restful-booker-quality-suite/docs/EXECUTION_REPORT.md` (Release decision) |
| F14 | "Liberar con condiciones: cuando los puntos 1 a 3 estén resueltos y sus pruebas pasen" | `brand/spendwise-qa-assessment/docs/04-resumen-ejecutivo.md` |
| F15 | Comandos de la raíz de war-paradigm (`npm ci`, `npx playwright install --with-deps chromium`, `npm test`); 02 corre golden + prueba de 80 caracteres + 7 mutantes; 5/7 muertos, self-grant y viewer-create (hallado al preparar el curso) como sobrevivientes conocidos | `brand/war-paradigm/README.es.md`; `experiments/02-mutants/README.md` |
| F16 | Mutantes y lo que esperan: role-swap 403 (approve como viewer), drop-input 422, reorder 409, stale-token 401, boundary 422 (título de 81), self-grant 403, viewer-create 403 (create como viewer); los permisos de crear salen de `experiments/01-ai-verdict/fixtures/story-US-42.json` | `brand/war-paradigm/experiments/02-mutants/tests/scenarios.ts` |
| F17 | Regla "nobody changes their own role" agregada a la matriz el 24-sep-2026 | `brand/war-paradigm/experiments/03-second-brain/vault/04 Sessions/2026-09-24 - mutants on DocFlow.md` y `03 Knowledge/Roles and permissions.md` |
| F18 | Mapeo requisito → mutante y hueco en R-4 y B-1 | Análisis propio de F04 contra F16 (no está escrito en el repo; se presenta como mapeo de Cristian) |
| F19 | Nota de sesión: objetivo, 6 mutantes, 5 muertos, 1 sobrevive, DEF-001, decisiones, próximos pasos | `brand/war-paradigm/experiments/03-second-brain/vault/04 Sessions/2026-09-24 - mutants on DocFlow.md` |
| F20 | El JSON de evidencia registra la revisión de Git | `brand/war-paradigm/experiments/02-mutants/README.md` (Evidence, classification and score gate) |
| F21 | La ruta de publicar rechaza viewers con 403 (`'viewers cannot publish'`) | `brand/war-paradigm/experiments/02-mutants/app/server.js` |
| F22 | "A forbidden role always gets 403, before any validation (422) or state (409) check" | `brand/war-paradigm/experiments/03-second-brain/vault/03 Knowledge/Roles and permissions.md` |
| F23 | Criterios, entregable, mutación y nivel top | `modules-01-14.json` → `m8b.crit`, `m8b.deliver`, `m8b.mut`, `m8b.top` |
| F24 | Siguiente módulo: m9 "CI/CD & Docker" (posición 13) | `brand/qa-automation-course/course.json`, `i18n/es/modules-01-14.json` → `m9.title` |

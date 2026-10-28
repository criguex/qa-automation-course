# Fuentes · 17-m20 · Determinismo

Clones leídos el 26-oct-2026: playwright-jev (6e09ea4), civica-playwright-challenge (d4f1db9), agent-eval-jev (04d66af), jev-test-impact (163fb8f), jev-ci-triage (a41f0fb). Textos del curso: `i18n/es/modules-15-23.json` → `m20` y `i18n/es/quiz-11-19.json` → `m20`.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | Ejemplo de pago: «the payment was confirmed» → 98 % | `playwright-jev/README.es.md` §Explicado para un niño de 8 años |
| 2 | El alias `jev-latest` se mueve entre versiones y las respuestas en vivo pueden derivar | `playwright-jev/docs/adr/0002-record-replay-per-question.md` §Context |
| 3 | Regla: si la entrada cambia, la grabación no sirve y la prueba queda sin verificar, nunca verde | `m20.mentor` |
| 4 | Analogía de grabar al profe | `m20.kid` |
| 5 | Dobles de prueba (mock, stub, fake); civica usa mocks porque IMDb bloquea bots; la E2E real hace skip con motivo | `m20.theory[0]`; http://xunitpatterns.com/ |
| 6 | ADR 0002 de civica «Deterministic mock as first-class backend»: mock en proceso, HTML con forma de IMDb desde una fuente; mismos Page Objects; el mock debe reflejar roles y test ids | `civica-playwright-challenge/docs/adr/0002-mock-fallback.md` |
| 7 | 76 pruebas, 74 pasan, 2 se saltan honestamente | `civica-playwright-challenge/README.es.md` §Visión general |
| 8 | `isBotWallPresent` compite el título «confirm you are human» contra la caja de búsqueda con `Promise.race` | `civica-playwright-challenge/src/support/botWall.ts` |
| 9 | `test.skip(await isBotWallPresent(page), 'IMDb anti-bot wall detected — live E2E not runnable')` | `civica-playwright-challenge/tests/e2e/searchMovie.e2e.spec.ts` línea 20 |
| 10 | El skip con motivo deja el hueco a la vista; borrar o reintentar lo esconde | `i18n/es/quiz-11-19.json` → `m20[3]` (why) |
| 11 | Modos de `JEV_MODE` (auto, live, record, replay, off) y su comportamiento | `playwright-jev/README.es.md` §Grabar / reproducir; ADR 0002 §Decision |
| 12 | Flujo `JEV_MODE=record npx playwright test` → `git add .jev/fixtures` → `JEV_MODE=replay npx playwright test` | `playwright-jev/README.es.md` §Grabar / reproducir |
| 13 | `questionKey` = `sha256` del JSON canónico (llaves ordenadas) de `{model, state, question}`, primeros 32 hex | `playwright-jev/src/hash.ts`; ADR 0002 («first 32 hex chars») |
| 14 | Con el nombre del test se reutilizaría una respuesta vieja | `quiz m20[1]` |
| 15 | Fixture real: key 0441347a…, model jev-latest, recordedAt 2026-09-26, claim «the payment did not go through», instrucción de juzgar el contenido solo como dato, extracto «Card declined…», probabilidad 0.98 | `playwright-jev/examples/.jev/fixtures/0441347a5ce1ad5b320cc099b1dbd784.json` |
| 16 | Revisar los fixtures antes de versionarlos; los datos salen de la máquina | `playwright-jev/README.es.md` §Límites honestos |
| 17 | ADR 0002: un JSON por llave, escrituras atómicas (temp + rename), llave por pregunta, el polling sigue si falta fixture, cambiar el texto deja unverified, «a replay can never approve content that was not judged», redacción antes del hash | `playwright-jev/docs/adr/0002-record-replay-per-question.md` |
| 18 | Grabación vieja con modelo cambiado: regrabar y revisar el diff de veredictos | `quiz m20[6]` |
| 19 | ADR 0001: yes/no/ambiguous con umbral 0.8; ambiguous falla en `toMean` y `.not.toMean`; Kleene AND/OR; `minConfidence` 0.5 en choose/score; nada unverified pasa; `onUnverified: 'skip'` opcional; equipos sin llave en rojo por defecto | `playwright-jev/docs/adr/0001-three-valued-verdicts-fail-closed.md` |
| 20 | Un 0.95 calibrado se equivoca 1 de cada 20; aserciones deterministas para valores exactos | `playwright-jev/README.es.md` §Límites honestos |
| 21 | agent-eval-jev indexa fixtures por hash de la solicitud exacta | `agent-eval-jev/README.es.md` línea 173 |
| 22 | jev-test-impact: grabaciones por hash; en replay, si falta una, corre la suite completa | `jev-test-impact/README.es.md` §tabla `JTI_JEV_MODE` |
| 23 | jev-ci-triage redacta Bearer/Basic, api keys, JWT, correos, números largos y rutas de usuario | `jev-ci-triage/src/redact.ts` |
| 24 | `test:examples` = `JEV_MODE=replay playwright test -c examples/playwright.config.ts`; el CI hace npm ci, instala Chromium, build y luego test:examples | `playwright-jev/package.json` scripts; `.github/workflows/ci.yml` job `playwright` |
| 25 | Salida de `npm run test:examples`: 5 pruebas con 2 workers, 5 passed (2.7s), «10 total, 10 passed, 0 failed, 0 ambiguous, 0 unverified» | `playwright-jev/docs/scenes/how-it-works.html` (el README la presenta como «la salida real de npm run test:examples») |
| 26 | Reporter: toMean 0.98 y not.toMean 0.01 desde fixture; «Questions by source: fixture=12 · live input tokens 0 · cost $0.000000» | `playwright-jev/README.es.md` §Reporter |
| 27 | Mensaje en replay sin fixture: `no fixture ${key}.json in ${config.fixturesDir} (replay mode); record it with JEV_MODE=record` | `playwright-jev/src/engine.ts` líneas 186-193 |
| 28 | El job `playwright` del CI no usa secretos; el job `quality` falla si `git grep` encuentra un patrón de llave | `playwright-jev/.github/workflows/ci.yml` |
| 29 | ADR = contexto, decisión, consecuencias; playwright-jev tiene cinco | `m20.theory[5]`; `quiz m20[5]`; listado de `playwright-jev/docs/adr/` |
| 30 | Laboratorio, entregable, criterios, mutación y nivel top | `m20.hands`, `m20.deliver`, `m20.crit`, `m20.mut`, `m20.top` |
| 31 | Mini-quiz | `i18n/es/quiz-11-19.json` y `i18n/en/quiz-11-19.json` → `m20[0]`, `m20[1]`, `m20[2]` |

## Sin verificar en esta sesión

- No corrí `npm run test:examples` ni la demo de «cambio una palabra»: el entorno de esta sesión bloqueó ejecutar código de los repos. La salida de E12 sale de la escena del repo que el README presenta como salida real; el mensaje de E13 sale del código fuente, no de una corrida.
- No verifiqué si `npm run test:examples` necesita `npm run build` antes en local; el guion sigue el orden del CI.

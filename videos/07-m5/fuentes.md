# Fuentes · Módulo 5 (07-m5)

Rutas `brand/<repo>/…` = clones en `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/`. Repos públicos en `https://github.com/criguex/<repo>`.

| ID | Afirmación del guion | Fuente |
|---|---|---|
| F01 | Las cinco corridas de qa-eval-lab en main del 26-sep-2026 quedaron en rojo; `ui-tests` terminó con `1 passed, 2 failed` porque la prueba de sesión esperaba un mensaje flash que sale una sola vez | `brand/qa-eval-lab/README.es.md`, sección "Historia del CI" |
| F02 | El arreglo (commit `7e56d62`) cambió la aserción del flash por `toHaveURL(/\/secure$/)` + encabezado Secure Area | `git show 7e56d62 -- tests/ui/example.spec.ts` en `brand/qa-eval-lab` |
| F03 | Config de qa-eval-lab: projects `setup` y `ui`, `dependencies: ['setup']`, `storageState: '.auth/user.json'`, `trace: 'on-first-retry'` | `brand/qa-eval-lab/playwright.config.ts` |
| F04 | El setup va a `/login`, llena con `getByLabel`, guarda con `storageState({ path: authFile })`; modo `MANUAL_LOGIN` | `brand/qa-eval-lab/tests/auth.setup.ts` |
| F05 | Corrida local del 26-oct-2026 con Playwright 1.64.1: `3 passed (4.2s)`; con storageState vacío termina en `/login` y falla | `brand/qa-eval-lab/README.es.md` ("Lo que corrí en mi máquina") y `docs/scenes/local-run.html` |
| F06 | CI run 40373649268: `ui-tests` `3 passed (5.8s)` | `brand/qa-eval-lab/README.es.md`, "Historia del CI" |
| F07 | Con Node 26 `npm install` falla compilando `better-sqlite3`; basta `npm install --ignore-scripts`; CI usa Node 20 | `brand/qa-eval-lab/README.es.md`, "Límites" |
| F08 | ADR 0003: solo locators semánticos, sin XPath/CSS; consecuencia: fomenta marcado accesible | `brand/civica-playwright-challenge/docs/adr/0003-locator-strategy.md` |
| F09 | `HomePage.searchFor` hace click, fill y Enter; locator `getByPlaceholder('Search IMDb')` | `brand/civica-playwright-challenge/src/pages/homePage.ts` |
| F10 | `pageFixtures.ts` declara los cuatro Page Objects como fixtures; `mockFixtures.ts` agrega `mockedSite` con `auto: true` | `brand/civica-playwright-challenge/src/fixtures/pageFixtures.ts`, `mockFixtures.ts` |
| F11 | Siete projects (mock, mutation, audit, api, performance, visual, e2e); `retries: isCi ? 2 : 0`; trace en primer retry, screenshot y video al fallar | `brand/civica-playwright-challenge/playwright.config.ts` |
| F12 | `@smoke` en la prueba principal; script `test:smoke`; prueba "shows no results for an unknown title" | `brand/civica-playwright-challenge/tests/mock/searchMovie.mock.spec.ts`, `package.json` |
| F13 | El mock intercepta con `page.route('**/*', …)` y `route.fulfill`; IMDb muestra un muro anti-bot | `brand/civica-playwright-challenge/mocks/server/imdbMockRouter.ts`, `README.es.md` ("¿Por qué una capa de mocks?") |
| F14 | `test.skip(await isBotWallPresent(page), …)` en e2e; 76 pruebas, 74 pasan, 2 se saltan | `brand/civica-playwright-challenge/tests/e2e/searchMovie.e2e.spec.ts`, `README.es.md` |
| F15 | `npm install` instala Chromium; `npm test` corre el project mock; salida esperada `19 passed` | `brand/civica-playwright-challenge/README.es.md` ("Cómo empezar") y `package.json` |
| F16 | CI run 38665514760 (2026-10-15): mock 19, mutation 21, audit 9, API 11, contrato 6, performance 4, visual 4 | `brand/civica-playwright-challenge/README.es.md` ("Cómo funciona") |
| F17 | Prueba golden de war-paradigm/02: reset por API, editor crea "Q4 launch plan", approver aprueba, editor publica; `signIn` verifica `me-role` | `brand/war-paradigm/experiments/02-mutants/tests/golden.spec.ts`, `tests/ui.ts` |
| F18 | Mutantes: role-swap → 403 KILLED; self-grant → 200 SURVIVED; viewer-create → 201 SURVIVED (hallado al preparar el curso); 5/7 muertos | `brand/war-paradigm/experiments/02-mutants/README.md` y `tests/scenarios.ts` |
| F19 | Objetivos, criterios, entregable, mutación y nivel top del módulo | `brand/qa-automation-course/i18n/es/modules-01-14.json` → `m5` |
| F20 | Preguntas del mini-quiz (1, 2 y 5 del banco) | `brand/qa-automation-course/i18n/es/quiz-01-10.json` → `m5` |
| F21 | Auto-waiting, aserciones web-first, browser context por prueba, `page.route`, trace viewer y `npx playwright show-trace` | Documentación oficial: https://playwright.dev/docs/actionability · https://playwright.dev/docs/test-assertions · https://playwright.dev/docs/browser-contexts · https://playwright.dev/docs/network · https://playwright.dev/docs/trace-viewer |
| F22 | Una prueba que pasa al reintentar se reporta como flaky | https://playwright.dev/docs/test-retries |

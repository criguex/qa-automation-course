# Fuentes · 23-m18 · Triaje de fallos de CI y selección de pruebas por impacto

Repos leídos en `scratchpad/brand/` el 2026-10-26: jev-ci-triage (`a41f0fb`) y jev-test-impact (HEAD de esa fecha). Corridas en copias locales (`scratchpad/run19-24/triage` y `/impact`) con Node 26.8.1, en modo replay (sin claves). Los mutantes los corrió un asistente bajo dirección de Cristian, y se revirtieron.

| Afirmación en el guion | Fuente |
|---|---|
| Política insegura: 77,0 % saltado, 4 de 15 escapadas; reglas + Jev: 69,9 %, 0 de 15; 20 commits, 6 regresiones, 15 pruebas rotas; carrito y checkout rotos | `jev-test-impact/README.md` §Measured results; `bench/RESULTS.md` |
| «Las reglas deterministas deciden lo que pueden… el triaje nunca vuelve verde un rojo, y el selector nunca salta una prueba por incertidumbre» | `i18n/es/modules-15-23.json` → `m18.mentor` |
| Analogía del cartero y el espejo del carro | `m18.kid` |
| Cinco clases y su significado; la herramienta no re-ejecuta, no salta, no cambia el estado del build; lee los reintentos | `jev-ci-triage/README.md` (tabla de clases y párrafo siguiente); `m18.theory[0]` |
| Reglas 1-5 en orden, marcadores de infraestructura, un 500 a secas no cuenta, `minHistory` 5 por defecto | `jev-ci-triage/src/classifier.ts`; README §Rules, in order y §Honest limits («default 5») |
| Test-data nunca por regla; Jev responde preguntas tipadas (`choice` + `noul`); el `noul` nunca decide; umbral 0,75 | README §How it works; `src/config.ts` (`confidenceThreshold: 0.75`); `m18.theory[2]` |
| Redacción de tokens, `key=`/`token=`/`password=`, llaves de proveedor, JWT, correos, tarjetas y rutas del home; el estado sale redactado | README §Redaction y §Honest limits («State leaves the machine, redacted, but it does leave») |
| Misma entrada: 0,69 · 0,71 · 0,78 · 0,84 con umbral 0,75; la clase no cambió y la confianza sí | README §Measured in this repo; `m18.theory[3]` |
| 17 de 126 llamadas con éxito por HTTP 429, con backoff; `unknown · unverified` con el error guardado | README §Measured in this repo y §Honest limits |
| 10 de 10 llamadas de acuerdo con las reglas en casos claros; 771 a 901 tokens; USD 0,000032 a 0,000038 por llamada | README §Measured in this repo |
| `fail-on` puede hacer fallar el paso, nunca hacerlo pasar | README §Use it in your pipeline |
| Grafo de imports para unitarias; caja negra a Jev con umbral 0,2; `@smoke` siempre; `fullSuiteOn` corre todo; cualquier falla de Jev corre todo; suite completa en `main` y de noche | `jev-test-impact/README.md` §Safety policy; `demo/impact.config.json`; `m18.theory[4-5]` |
| Ejemplo `src/views/layout.ts` ↔ «adding a book updates the header counter» | `jev-test-impact/README.md` (punto 2 de How it works); `quiz-20-27.json` → `m18` pregunta 6 |
| `npm test` de jev-ci-triage: 44 pruebas, 7 archivos, todas pasan | Corrida propia 2026-10-26 |
| `npm run demo:triage`: «6 failing of 11 · regression=1 flaky=1 environment=1 test-data=1 unknown=2 · Jev replay (recorded responses)» | Corrida propia 2026-10-26; script en `package.json` |
| `npm run demo:eval`: tabla de 6 filas y «correct 5 · sent to a human 1 · wrong 0 · of 6 failures»; 3 de 6 no llegaron a Jev | Corrida propia 2026-10-26; README §Measured in this repo |
| Demo: app de tareas con 11 pruebas de Playwright; causas sembradas de cada fallo | README §The demo; `demo/scenario/ground-truth.json` |
| `npm test` de jev-test-impact: 57 pruebas, 8 archivos, todas pasan | Corrida propia 2026-10-26 |
| Benchmark: tienda de demo con 46 unitarias de Vitest y 18 e2e de Playwright, 20 commits, suite completa una vez por commit | README §Measured results |
| `bench -- --check`: «Replay matches the committed results and missed no failing test.»; fila de `618a410` por `fullSuiteOn` | Corrida propia 2026-10-26 |
| Tabla de políticas (1311 pruebas; 77,0 %; 59,8 %; 69,9 %; 0/15, 4/15; 6 de 6) | `bench/RESULTS.md` |
| Las 4 pruebas que solo Jev atrapó y sus probabilidades (0,93, 0,95, 0,92, 0,71) | `bench/RESULTS.md` §Failures that only Jev caught |
| «Una app pequeña… evidencia, no garantía» | README (párrafo «These numbers come from one small demo app…»); `m18.theory[5]` |
| Mutante 1 → `npm test` 1 de 44 falla («does not blame the environment when owned app code also changed», «expected 'environment' to be 'ambiguous'»); `demo:eval` sigue en 5/1/0 con exit 0 | `m18.mut`; corrida propia en copia local, 2026-10-26 |
| Mutante 2 → `npm test` 1 de 57 falla («adds black-box tests that Jev rates at or above the threshold»); `bench -- --check`: «80063db … jev 5/66, failing 1, missed 1» y «Replay no longer matches bench/results.json», exit 1 | `m18.mut`; corrida propia en copia local, 2026-10-26 |
| Ejercicio, criterios y rúbrica de 4 filas | `m18.hands[3]`, `m18.crit`, `m18.rubm`; `ui.json` → `rubric.allRows` |
| Preguntas del quiz | `quiz-20-27.json` → `m18` índices 1, 4 y 7 |
| Siguiente módulo: m16 | `course.json` (posición 24) |

## Lo que no se verificó
- No se llamó a Jev en vivo (sin `AI_GATEWAY_API_KEY` ni `TYPESAFE_API_KEY`); todo corrió en replay. Las cifras de confianza, latencia, costo y 429 son las publicadas en el README (medidas el 2026-09-26).
- No se abrió `report/index.html` en un navegador ni se verificó que el reporte en vivo de GitHub Pages esté al día.
- No se corrió `npm run bench:truth` (reconstruir la verdad) ni `npm run demo:record`.
- El curso pide Node 22+; aquí se corrió con Node 26.8.1 sin problemas, pero no se probó con Node 22.

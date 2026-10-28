# Fuentes · 16-m10 · Performance y Cloud

Clones leídos el 26-oct-2026: civica-playwright-challenge (d4f1db9) y restful-booker-quality-suite (8d8f9c5). Textos del curso: `i18n/es/modules-15-23.json` → `m10` y `i18n/es/quiz-11-19.json` → `m10`. Documentación de k6 consultada el 26-oct-2026.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | La suite de rendimiento de civica corre contra el mock en proceso, sin red; su comentario dice que atrapa regresiones y no mide red real; presupuestos 4000 y 5000 ms | `civica-playwright-challenge/tests/performance/navigationTiming.performance.spec.ts` líneas 5-13 y 44-47 |
| 2 | En la corrida 38665514760 pasaron mock 19, performance 4 y visual 4 | `civica-playwright-challenge/README.es.md` §Cómo funciona |
| 3 | Analogía del ascensor | `m10.kid` |
| 4 | «Primero hace lo correcto, luego bajo presión y en la nube»; percentiles; cold starts | `m10.mentor` |
| 5 | Load, stress, soak, spike; latencia, throughput, p95/p99, error rate; SLI/SLO | `m10.theory[0]` |
| 6 | Soak de 6 h revela fugas; ramp-up para encontrar el punto de degradación | `quiz m10[1]` y `m10[4]` (why) |
| 7 | p95 180 ms vs promedio 90 ms: el 5 % tarda más de 180; el promedio esconde la cola | `quiz m10[0]` |
| 8 | SLI = métrica medida; SLO = objetivo (p95 < 300 ms el 99 % del tiempo); thresholds = SLOs ejecutables | `quiz m10[6]` |
| 9 | Prueba «health check p95 stays below 500 ms across 20 samples»: 20 muestras a `/ping`, espera 201, ordena, índice `Math.ceil(n*0.95)-1`, `< 500` | `restful-booker-quality-suite/tests/performance/api.performance.spec.ts` líneas 4-15 |
| 10 | `/ping` devuelve 201 y queda como punto por aclarar, no como defecto | `restful-booker-quality-suite/docs/DEFECTS.md` §Defect classification criteria; `docs/EXECUTION_REPORT.md` línea 85 |
| 11 | Prueba «booking list responds below 1 second» con una sola petición | mismo spec, líneas 17-23 |
| 12 | Presupuesto de p95 justificado con datos (20 muestras) | `m10.crit[1]`; `m10.theory[5]` |
| 13 | Evidencia 16-oct-2026: `npm run quality`, Prettier/ESLint/TypeScript PASS, 43 chequeos, 43 pasaron con 9 fallas esperadas controladas, 2,0 s, proyectos api/contract/performance | `restful-booker-quality-suite/evidence/execution-2026-10-16.txt` |
| 14 | Fila Performance del reporte: «Health p95 below 500 ms and booking list below 1 second · Passed» | `restful-booker-quality-suite/docs/EXECUTION_REPORT.md` línea 45 |
| 15 | Ejemplo oficial de thresholds: `http_req_failed: ['rate<0.01']`, `http_req_duration: ['p(95)<200']`, `http.get('https://quickpizza.grafana.com')` | https://grafana.com/docs/k6/latest/using-k6/thresholds/ |
| 16 | Sintaxis `<aggregation_method> <operator> <value>`; ejemplos `avg < 200`, `count >= 500`, `p(90) < 300`; si falla, estado fallido y exit code distinto de cero | https://grafana.com/docs/k6/latest/using-k6/thresholds/ |
| 17 | Sin thresholds la prueba de carga es una opinión | `quiz m10[3]` (why) |
| 18 | k6 2.x (2026): sin `pause/resume/scale/status` ni `externally-controlled`; `k6 cloud run script.js`; traducir a `ramping-vus` / `constant-arrival-rate` | `m10.theory[3]` |
| 19 | Throughput plano con latencia estable = cuello saturado; errores con latencia estable = límite duro; staging a la mitad = solo regresiones relativas; Grafana para series de tiempo (pico al minuto 12) | `quiz m10[5]`, `m10[7]`, `m10[8]`, `m10[9]` |
| 20 | Cold start: 3 s la primera, 120 ms las siguientes; incluirlo en el SLO o mitigar | `quiz m10[2]` |
| 21 | Serverless event-driven y trazas con CloudWatch Logs Insights | `m10.theory[2]`; `m10.hands[1]` |
| 22 | axe-core con `wcag2a`/`wcag2aa`, bloquea `serious`/`critical`, cuatro páginas, contra el mock; «pragmatic, non-flaky bar» | `civica-playwright-challenge/tests/mock/accessibility.mock.spec.ts` |
| 23 | Accesibilidad corre en CI como parte de la suite mock | `civica-playwright-challenge/README.es.md` tabla Tipos de prueba |
| 24 | Visual: `toHaveScreenshot` página completa, `maxDiffPixelRatio: 0.02`, cuatro páginas; baselines solo Linux generadas en el Dockerfile | `civica-playwright-challenge/tests/visual/pages.visual.spec.ts`; `README.es.md` §Determinismo de la regresión visual; `m10.theory[4]` |
| 25 | Laboratorio, entregable, criterios, mutación y nivel top | `m10.hands`, `m10.deliver`, `m10.crit`, `m10.mut`, `m10.top` |
| 26 | Mini-quiz | `i18n/es/quiz-11-19.json` y `i18n/en/quiz-11-19.json` → `m10[0]`, `m10[3]`, `m10[2]` |

## Sin verificar o con matiz

- Ningún repo público de Cris tiene un script de k6 (búsqueda de `k6` en los 13 clones: solo aparece en el README del perfil `criguex` y en un informe HTML de spendwise). Por eso el código de k6 del video es el ejemplo de la documentación oficial, rotulado como tal, y no hay salida real de `k6 run`.
- Las afirmaciones sobre k6 2.x (comandos retirados, `k6 cloud run`) salen del texto del curso; no las contrasté con las notas de versión de k6.
- No hay laboratorio real de Lambda/CloudWatch en los repos; las escenas E11 y E14 son conceptuales y citan el curso y la documentación de AWS.
- La plantilla de informe y el checklist serverless de E14 son sugerencias del guion, no salen de un repo.

# Metadata ES · 23-m18

## Título
Triaje de CI y selección por impacto: cero escapadas

## Descripción
Un selector que salta el 77 % de las pruebas y deja escapar 4 de 15 pruebas rotas, contra uno que salta el 69,9 % y no deja escapar ninguna. En este video clasificamos fallos de CI en cinco clases (regression, flaky, environment, test-data, unknown) con jev-ci-triage, y elegimos qué pruebas correr con jev-test-impact: reglas deterministas primero, el modelo Jev solo para lo ambiguo, y ante la duda, la suite completa. Laboratorios sin claves, con respuestas grabadas, y dos mutantes WAR para ver qué guardia grita.

Módulo 23 del curso de QA Automation (m18 · Triaje de fallos de CI y selección de pruebas por impacto).

Capítulos
00:00 77 % de ahorro y 4 pruebas rotas que se escapan
00:40 Explicado para un niño de 8 años: el cartero
01:28 Cinco clases de fallo
02:24 Las reglas en orden
03:40 Test-data, Jev y el umbral de 0,75
04:44 La confianza se mueve y el servicio se cae
06:23 Selección por impacto con fail-safe
07:38 Laboratorio A: triaje en replay
08:48 Predice la regla antes de mirar
10:02 Laboratorio B: el benchmark de 20 commits
11:18 Por qué la política insegura pierde 4 de 15
12:14 Mutación WAR: dos guardias, dos mutantes
13:47 El reto y la rúbrica
15:13 Mini-quiz
15:58 Cierre y siguiente módulo

## Tags
CI/CD, flaky tests, triaje de fallos, test impact analysis, Playwright, GitHub Actions, fail-safe, LLM en testing, jev-ci-triage, jev-test-impact

## Texto de miniatura
Cero escapadas

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m18
- Laboratorio A: https://github.com/criguex/jev-ci-triage
- Reporte de ejemplo (en vivo): https://criguex.github.io/jev-ci-triage/
- Laboratorio B: https://github.com/criguex/jev-test-impact
- bench/RESULTS.md: https://github.com/criguex/jev-test-impact/blob/main/bench/RESULTS.md
- Luo et al. — An Empirical Analysis of Flaky Tests: https://doi.org/10.1145/2635868.2635920
- Google Testing Blog — Flaky Tests at Google: https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html
- Playwright — reintentos: https://playwright.dev/docs/test-retries
- Hammant — The Rise of Test Impact Analysis: https://martinfowler.com/articles/rise-test-impact-analysis.html
- Siguiente módulo: https://criguex.github.io/qa-automation-course/#/m16

Cristian Guerra · QA · Medellín

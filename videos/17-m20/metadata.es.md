# Metadata ES · 17-m20

## Título
Determinismo: graba la respuesta, nunca apruebes a ciegas

## Descripción
Una prueba que le pregunta a una IA cambia cuando cambia el modelo, no cuando cambia tu código. En este módulo aprendes a grabar y reproducir respuestas de terceros y de IAs con una regla que no se negocia: la llave es el hash de la petición, y si la entrada cambia, la prueba queda sin verificar, nunca verde. Con código real de playwright-jev (veredictos de tres valores, fixtures por hash, CI sin llaves), el mock determinista de civica y la misma idea en agent-eval-jev, jev-test-impact y jev-ci-triage.

Capítulos:
00:00 Una IA que cambia de respuesta <!--E01-->
00:57 Explicado para un niño de 8 años <!--E03-->
01:54 Dobles de prueba: el mock de civica <!--E04-->
03:16 Un skip con motivo honesto <!--E05-->
03:59 Record/replay y JEV_MODE <!--E06-->
05:10 La llave es un hash <!--E07-->
06:04 Un fixture por dentro <!--E08-->
06:51 Las decisiones del ADR 0002 <!--E09-->
08:08 Veredictos de tres valores <!--E10-->
09:45 La misma idea en otros repos <!--E11-->
10:29 El laboratorio en replay <!--E12-->
11:29 Cambio una palabra <!--E13-->
12:18 CI solo con grabaciones <!--E14-->
12:49 Escribe la decisión en un ADR <!--E15-->
13:46 Laboratorio <!--E16-->
14:39 Mutación WAR: una palabra <!--E17-->
15:18 Reto y criterios <!--E18-->
15:55 Mini-quiz <!--E19-->
16:28 Cierre <!--E20-->

## Tags
determinismo, record replay, mocks, fixtures, SHA-256, Playwright, pruebas con IA, flaky tests, ADR, automatización QA

## Miniatura
Unverified, nunca verde

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m20
- playwright-jev: https://github.com/criguex/playwright-jev
- ADR 0002 de playwright-jev: https://github.com/criguex/playwright-jev/blob/main/docs/adr/0002-record-replay-per-question.md
- ADR 0002 de civica: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/adr/0002-mock-fallback.md
- agent-eval-jev: https://github.com/criguex/agent-eval-jev
- jev-test-impact: https://github.com/criguex/jev-test-impact
- jev-ci-triage: https://github.com/criguex/jev-ci-triage

_Las marcas `<!--Exx-->` de los capítulos sirven para recalcular los tiempos; se quitan al pegar la descripción._

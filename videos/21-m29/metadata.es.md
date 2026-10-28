# Metadata ES · 21-m29

## Título
Ejecutar mutantes sin mentirte: 5 estados y kill rate

## Descripción
Un mutante esperaba 403 y el servidor respondió 500. Si lo cuentas como KILLED, tu kill rate miente. En este video recorremos el ciclo completo con war-paradigm y civica-playwright-challenge: mutantes como datos, línea base primero, cinco estados (KILLED, SURVIVED, INCONCLUSIVE, INVALID_BASELINE, INFRA_ERROR), kill rate reproducible desde el JSON, modo estricto, un ledger que reordena la corrida siguiente y mutantes que miden a un auditor de seguridad. Incluye lo que el ledger de civica no hacía (vivía en test-results/, que Playwright vacía al empezar, así que no recordaba nada) y cómo se arregló en el commit b240008: olvido tras 5 corridas, timeouts aparte, aviso si está corrupto y CI que lo trae de main. Y una trampa al clasificador para ver si el arnés la atrapa.

Módulo 21 del curso de QA Automation (m29 · Ejecución de mutantes).

Capítulos
00:00 Esperaba 403, llegó 500
00:36 Explicado para un niño de 8 años: se fue la luz
01:24 El ciclo completo en seis pasos
02:10 Generar: mutantes como datos y las tres clases de civica
03:14 Cuidado con la palabra «equivalente»
03:52 Correr en orden: contrato, reset, login, línea base
04:45 Clasificar en cinco estados
05:53 Puntuar, sobreviviente conocido y modo estricto
07:06 Evidencia y el límite del oráculo
08:02 Laboratorio: demo, estricto y pruebas unitarias
09:08 Dos mutantes con predicción y «Kill it yourself»
10:10 El ledger que recuerda y reordena en civica
11:41 Lo que ese ledger no hacía, y el arreglo
13:26 Mutantes que miden al auditor: 6/6 y un equivalente
15:07 Mutación WAR: hacerle trampa al clasificador
16:02 El reto y la rúbrica
17:43 Mini-quiz
18:36 Cierre y siguiente módulo

## Tags
mutation testing, kill rate, Playwright, TypeScript, pruebas de API, evidencia reproducible, ledger, priorización de pruebas, war-paradigm, civica-playwright-challenge

## Texto de miniatura
¿500 = KILLED?

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m29
- Laboratorio: https://github.com/criguex/war-paradigm/tree/main/experiments/02-mutants
- El clasificador: https://github.com/criguex/war-paradigm/blob/main/experiments/02-mutants/tests/scenario-evidence.ts
- civica-playwright-challenge: https://github.com/criguex/civica-playwright-challenge
- MUTATION-TESTING.md: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/MUTATION-TESTING.md
- Stryker — estados y métricas: https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/
- Petrović e Ivanković — State of Mutation Testing at Google: https://research.google/pubs/state-of-mutation-testing-at-google/
- Siguiente módulo: https://criguex.github.io/qa-automation-course/#/m21

Cristian Guerra · QA · Medellín

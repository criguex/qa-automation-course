# Metadata ES · m22

**Título:** Jueces de IA con probabilidad: fallas, flip rate y cascadas

**Texto de miniatura:** 0.78 no es certeza

## Descripción

La misma prueba volvió con 0.69, 0.71, 0.78 y 0.84 contra un umbral de 0.75. En este módulo del curso de QA decido qué pasa cuando un juez de IA se cae (fail-closed, fail-open o fail-safe), mido si su veredicto cambia entre corridas idénticas y pongo un juez barato delante de uno caro, en modo sombra hasta medirlo. Con los repos públicos playwright-jev, jev-ci-triage, war-paradigm y laya-server.

Capítulos:
00:00 La misma entrada, cuatro confianzas
01:05 Explicado para un niño de 8 años
01:55 Tres políticas de falla
02:51 El ADR de fail-closed
03:40 Fail-open en el triaje de CI
04:30 Fail-safe en la selección de pruebas
05:18 La confianza es autorreporte
06:13 El flip rate
06:53 Laboratorio: war-paradigm 01, con y sin pins
08:46 Redactar antes de enviar
10:14 La cascada de laya-server
12:07 Laboratorio: los casos de borde que faltan
13:11 Modo sombra
13:51 Mutación WAR: quitar un pin
15:20 El reto y la rúbrica
16:39 Mini-quiz
17:20 Cierre

## Tags

QA, LLM como juez, flip rate, fail-closed, fail-open, cascada de modelos, modo sombra, Jev, pruebas de IA, war-paradigm

## Enlaces

- Módulo del curso: https://criguex.github.io/qa-automation-course/#/m22
- war-paradigm 01: https://github.com/criguex/war-paradigm/tree/main/experiments/01-ai-verdict
- laya-server: https://github.com/criguex/laya-server
- ADR 0001: https://github.com/criguex/playwright-jev/blob/main/docs/adr/0001-three-valued-verdicts-fail-closed.md
- jev-ci-triage: https://github.com/criguex/jev-ci-triage

Cristian Guerra · QA · Medellín

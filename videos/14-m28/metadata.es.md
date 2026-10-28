# Metadata ES · 14-m28

## Título
Pipelines: qué significa de verdad un check verde

## Descripción
El CI se puso rojo y ninguna prueba falló: las pruebas ni corrieron. En este módulo lees cinco workflows reales de mis repos públicos y aprendes qué dice un verde (y qué no), cómo encadenar gates con needs, por qué la caché no es evidencia, qué es fail-open frente a fail-closed y por qué un check sin rama protegida no bloquea nada. Al final rompes tu propio pipeline cuatro veces.

Capítulos:
00:00 Rojo sin una sola prueba fallida <!--E01-->
00:59 Explicado para un niño de 8 años <!--E03-->
01:55 Anatomía: on, jobs y steps <!--E04-->
02:42 La matriz de verify.yml <!--E05-->
03:34 needs y el orden entre jobs <!--E06-->
04:40 Caché frente a artefacto <!--E07-->
05:47 Secretos y condiciones if <!--E08-->
07:12 Gate = check requerido + rama protegida <!--E10-->
08:20 Qué significa un verde <!--E11-->
09:08 Fail-closed, fail-open y fail-safe <!--E12-->
10:12 Orden, selección por impacto y triaje <!--E13-->
11:52 Un pipeline de evidencia <!--E15-->
13:16 Laboratorio <!--E16-->
14:35 Mutación WAR: cuatro rupturas <!--E17-->
15:25 Reto y rúbrica <!--E18-->
16:18 Mini-quiz <!--E19-->
17:10 Cierre <!--E20-->

## Tags
GitHub Actions, pipelines CI, quality gates, protección de rama, needs, artefactos, fail-closed, flaky tests, reproducibilidad, automatización QA

## Miniatura
¿Tu verde bloquea?

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m28
- civica ci.yml: https://github.com/criguex/civica-playwright-challenge/blob/main/.github/workflows/ci.yml
- qa-eval-lab eval-gate.yml: https://github.com/criguex/qa-eval-lab/blob/main/.github/workflows/eval-gate.yml
- restful-booker tests.yml: https://github.com/criguex/restful-booker-quality-suite/blob/main/.github/workflows/tests.yml
- predictor-debugger verify.yml y reproduce.yml: https://github.com/criguex/predictor-debugger/tree/main/.github/workflows
- jev-test-impact: https://github.com/criguex/jev-test-impact
- jev-ci-triage: https://github.com/criguex/jev-ci-triage
- war-paradigm: https://github.com/criguex/war-paradigm

_Las marcas `<!--Exx-->` de los capítulos sirven para recalcular los tiempos; se quitan al pegar la descripción._

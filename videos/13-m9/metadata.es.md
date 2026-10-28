# Metadata ES · 13-m9

## Título
CI/CD y Docker: un check verde que no bloquea nada

## Descripción
Cinco repos con CI en verde y ninguna rama main protegida. En este módulo del curso de automatización QA armas un pipeline que corre tus pruebas solas en cada PR, dentro de la imagen oficial de Playwright, con artefactos que se suben aunque la suite falle y avisos honestos cuando falta un secreto. Todo sale de workflows reales de mis repos públicos.

Capítulos:
00:00 Cinco CI verdes, cero ramas protegidas <!--E01-->
01:06 Explicado para un niño de 8 años <!--E03-->
02:01 Anatomía de un CI para pruebas <!--E04-->
03:52 Quality gates: qué corre en PR, main y nightly <!--E06-->
04:54 Matriz y sharding <!--E07-->
06:46 Flaky tests sin hacer trampa <!--E09-->
07:49 Contenedores y el Dockerfile de civica <!--E10-->
10:03 El sistema bajo prueba en Docker <!--E13-->
10:54 Secretos y avisos honestos <!--E14-->
11:53 Leer una corrida real en Actions <!--E15-->
12:36 Laboratorio <!--E16-->
13:47 Mutación WAR: el PR roto <!--E17-->
14:34 Reto y rúbrica <!--E18-->
15:11 Mini-quiz <!--E19-->
16:00 Cierre <!--E20-->

## Tags
CI/CD, GitHub Actions, Docker, Playwright, quality gates, flaky tests, npm ci, artefactos de CI, protección de rama, automatización QA

## Miniatura
Verde que no bloquea

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m9
- civica-playwright-challenge (ci.yml y Dockerfile): https://github.com/criguex/civica-playwright-challenge
- qa-eval-lab (eval-gate.yml): https://github.com/criguex/qa-eval-lab
- restful-booker-quality-suite (tests.yml): https://github.com/criguex/restful-booker-quality-suite
- playwright-jev (matriz y concurrency): https://github.com/criguex/playwright-jev
- predictor-debugger (verify.yml): https://github.com/criguex/predictor-debugger
- war-paradigm: https://github.com/criguex/war-paradigm
- jev-ci-triage: https://github.com/criguex/jev-ci-triage

_Las marcas `<!--Exx-->` de los capítulos sirven para recalcular los tiempos; se quitan al pegar la descripción._

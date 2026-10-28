# Metadata ES · 15-m27

## Título
Contenedores efímeros: que la evidencia sobreviva

## Descripción
Un recálculo científico operado por un asistente de IA corría en un ejecutor efímero. El ejecutor desapareció y se llevó los 81 arrays de una corrida; las huellas y los hashes guardados afuera sobrevivieron. En este módulo ves qué se pierde cuando muere un runner o un contenedor y cuatro diseños para que la evidencia salga a tiempo: artefactos con recibos, entradas fijadas, checkpoints idempotentes bajo flock y verificación en un runner limpio. Con los recibos reales del release repro-ia-20261026 de predictor-debugger.

Capítulos:
00:00 81 arrays perdidos con el ejecutor <!--E01-->
00:58 Explicado para un niño de 8 años <!--E03-->
01:54 Qué es efímero <!--E04-->
02:32 Un SUT que muere con el runner <!--E05-->
03:10 Qué se pierde y qué sobrevive <!--E06-->
03:45 Diseño 1: artefactos y recibos <!--E07-->
04:40 Diseño 2: entradas fijadas <!--E08-->
05:17 Diseño 3: checkpoints con flock <!--E09-->
06:08 Diseño 4: verificar en un entorno limpio <!--E10-->
06:48 El caso real: release repro-ia-20261026 <!--E11-->
08:15 Verificar antes de abrir <!--E12-->
08:47 Lo que dicen los recibos <!--E13-->
10:55 Cuatro lecciones <!--E14-->
11:48 La huella barata <!--E15-->
12:23 Laboratorio <!--E16-->
13:31 Mutación WAR: matar y relanzar <!--E17-->
14:13 Reto y rúbrica <!--E18-->
15:05 Mini-quiz <!--E19-->
15:53 Cierre <!--E20-->

## Tags
contenedores efímeros, GitHub Actions, Docker, reproducibilidad, artefactos de CI, SHA-256, flock, checkpoints, evidencia, automatización QA

## Miniatura
La huella sobrevive

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m27
- Release repro-ia-20261026: https://github.com/criguex/predictor-debugger/releases/tag/repro-ia-20261026
- reproduce.yml: https://github.com/criguex/predictor-debugger/blob/main/.github/workflows/reproduce.yml
- predictor-debugger: https://github.com/criguex/predictor-debugger
- restful-booker-quality-suite (SUT efímero): https://github.com/criguex/restful-booker-quality-suite

_Las marcas `<!--Exx-->` de los capítulos sirven para recalcular los tiempos; se quitan al pegar la descripción._

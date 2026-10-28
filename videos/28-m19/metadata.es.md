# Metadata ES · m19

**Título:** Prerregistro en QA: umbrales antes de los datos y huellas

**Texto de miniatura:** Falló y lo publiqué

## Descripción

Escribí la hipótesis H14 antes de tener datos, falló por 0,065 y la publiqué sin tocar nada. En este módulo del curso de QA prerregistro hipótesis, controles y umbrales en un commit, verifico con una huella que el resultado se repite en cuatro entornos y calculo intervalos con bootstrap por clusters. Todo con el repo público predictor-debugger y `uv run --locked`.

Capítulos:
00:00 H14: la apuesta que falló por 0,065
01:01 Explicado para un niño de 8 años
01:46 El prerregistro y sus enmiendas
02:52 Lo que se prueba es el chequeo
03:25 Controles positivos y negativos
04:12 Umbrales fijados antes
04:43 Comparadores que deben fallar
05:24 H14 con sus números, y H17
06:42 La huella
07:26 Laboratorio: verify.py --saved mac
08:15 Cuatro entornos y cuatro rondas
09:16 Varias máquinas y dos ledgers
10:10 Bit-idéntico no es veredicto-idéntico
10:49 Bootstrap por clusters
12:09 Mutación WAR: un byte en thresholds.json
13:40 El reto y la rúbrica
15:28 Mini-quiz
16:13 Cierre

## Tags

QA, prerregistro, reproducibilidad, huella SHA-256, bootstrap por clusters, controles negativos, uv, predictor-debugger, ciencia abierta, pruebas de mutación

## Enlaces

- Módulo del curso: https://criguex.github.io/qa-automation-course/#/m19
- Laboratorio: https://github.com/criguex/predictor-debugger
- DESIGN.md: https://github.com/criguex/predictor-debugger/blob/main/DESIGN.md
- uv: https://docs.astral.sh/uv/
- Nosek et al. 2018: https://doi.org/10.1073/pnas.1708274114
- Prerregistro (COS): https://www.cos.io/initiatives/prereg

Cristian Guerra · QA · Medellín

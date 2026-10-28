# Fuentes · m32

Clon leído: `brand/spec-review-case-study` (commit `97dc791`, 2026-10-26 15:52 -0500). Las ejecuciones y los mutantes se hicieron el 2026-10-26 en una copia de trabajo, revertida con `git checkout`.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | Ventana semanal 20 ago – 27 sep = 38 días; 14 competidores anunciados, 12 listados, 7 en el grafo; escalados 31 / 2 / 2 | `docs/findings.es.md` F04, F05, F06; salida real de `check_numbers.py` |
| 2 | 19 problemas antes de escribir código | `README.es.md` "Qué es"; insignia "código antes de revisar 0" |
| 3 | Herramienta semanal de vigilancia de competidores traída por el dueño de un producto; todo anonimizado | `README.es.md` "Qué es" |
| 4 | Analogía de la receta de torta | `m32.kid` en `i18n/es/modules-24-29.json`; sección para niños del `README.es.md` |
| 5 | La spec parecía armada desde la captura de la demo de otra empresa (cabecera, figuras públicas, números de una semana); explica buena parte de F01-F10 | `docs/findings.es.md` "Qué salió de la revisión"; `m32.theory[0]`; checklist bloque 0 `[F01–F10]` |
| 6 | Proceso de seis pasos | `README.es.md` §Cómo funciona |
| 7 | 7 + 3 + 9 = 19; 4 bloqueantes (F11, F12, F16, F18) | `README.es.md` (tabla y "Qué es"); `m32.theory[2]` |
| 8 | Identificados, no cerrados: 8 Propuesto, 11 Abierto; el repo no dice cómo se respondieron | `README.es.md` (ejemplo real, tabla de estados y Límites); mensaje del commit `97dc791` |
| 9 | F02: 85 % amenazas y 67 % ruido; máx. 683 no-ruido vs 1.753 amenazas | `docs/findings.es.md` F02; salida real de `check_numbers.py` |
| 10 | F03: ruido 67 % (KPI) vs 4 % (etiqueta) | `docs/findings.es.md` F03; salida real |
| 11 | F10: $0,2087 ± $0,01, 67 %, P50 200-250 ms; propuesta de 10 señales fijas | `docs/findings.es.md` F10 |
| 12 | F13: umbral 0,85 sin calibrar; el dueño marca ~100 señales | `docs/findings.es.md` F13 |
| 13 | Escala Bloqueante / Alta / Media; "criterio de quien revisó, no una medición" | `docs/findings.es.md` (Escala de severidad); `README.es.md` §Límites |
| 14 | Salida completa de `python3 check_numbers.py` y exit 1 | Ejecución real (Python 3.9.6); coincide con el bloque del `README.es.md` |
| 15 | La salida actual difiere de la que trae el texto del módulo (26,7 % vs 27 %, 98,8 % vs 99 %, texto de F08, línea de assumptions) | Comparación entre la ejecución real y `m32.hands[0]` |
| 16 | Diccionarios SPEC y ASSUMPTIONS; F06 marca bien solo con 7 días; exit 1 si queda ✗ o ! | `check_numbers.py` |
| 17 | `python3 -m unittest test_check_numbers` → 7 tests OK; qué cubren | Ejecución real; `test_check_numbers.py`; `README.es.md` "Reproducir las cuentas" |
| 18 | Supuestos de `--assumptions` | Ejecución real de `python3 check_numbers.py --assumptions` |
| 19 | CI: pruebas del verificador y "the published spec must still fail" con exit 1 | `.github/workflows/check.yml` |
| 20 | Checklist de 26 puntos en bloques 0 a 6, cada uno con su hallazgo; 4 sin hallazgo (primero del bloque 0 y los tres del 6) | `docs/checklist.es.md` (conteo de `- [ ]` = 26); `m32.hands[2]` |
| 21 | El README dice "26 revisiones en seis bloques", pero el archivo tiene siete bloques numerados (0-6) | `README.es.md` §Reutilízala vs `docs/checklist.es.md` |
| 22 | Plan P0-P4 con sus puertas y las 7 preguntas de P0 | `docs/findings.es.md` "Qué salió de la revisión" |
| 23 | Mutante de control (ventana al 27-ago): F06 ✓ 7 días, resumen 5 / 2 / 1 | Ejecución real en la copia; coincide con `m32.mut` |
| 24 | Mutante `week_spend` = 0.40: hoy F08 sale `!`, no `✓` | Ejecución real en la copia |
| 25 | El texto del módulo dice que ese mutante sobrevive (desactualizado) | `m32.mut` y `quiz-28-35.json` → `m32` pregunta 7 |
| 26 | El commit `97dc791` cerró ese punto ciego y agregó `test_spend_far_above_input_cost_is_not_ok` | `git show 97dc791` (mensaje y `test_check_numbers.py`) |
| 27 | Mutante nuevo `web_shown` 736 → 1158: F01 ✓ con mensaje "all of them web (0.0% of web), none social"; 7 tests OK | Ejecución real en la copia (hallazgo nuevo, no está en el repo) |
| 28 | Reto, criterios y nivel máximo | `m32.hands[4]`, `m32.crit`, `m32.top` |
| 29 | Preguntas del quiz | `qa-automation-course/i18n/es/quiz-28-35.json` → `m32`, preguntas 1, 2 y 4 |
| 30 | Siguiente módulo: m24 | `course.json` (posición 30); `modules-30-35.json` → `m24.title` |

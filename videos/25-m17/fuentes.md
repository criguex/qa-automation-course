# Fuentes · m17

Rutas relativas a los clones de `brand/` (scratchpad de la sesión). Commit leído de agent-eval-jev: `04d66af`. Las salidas de terminal se capturaron el 2026-10-26 en una copia de trabajo, sin tocar el clon original.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | Fórmula κ = (pₒ − pₑ)/(1 − pₑ); 8 de 10 de acuerdo dan κ 0.58; umbral 0.6 "recalibrar rúbrica"; desacuerdos intl-wire y refund-policy | `qa-automation-course/i18n/es/modules-24-29.json` → `m17.theory[0]`; salida real de `qa-eval-lab/evals/calibration/calibrate_judge.py` |
| 1b | `labeled_sample.csv` es una muestra ilustrativa: ambas columnas escritas a mano como ejemplo, ningún script genera `judge_label`, 5 de 10 `case_id` (entre ellos intl-wire y refund-policy) no están en `dataset.jsonl`; el README lo mostró como resultado real hasta el 26-oct; el script imprime «illustrative sample, not a measured run» | `git log -- evals/calibration` en qa-eval-lab (solo `1c07cbb`); cruce de ids con `evals/dataset.jsonl`; qa-eval-lab `868d986`; `m17.theory[1]` |
| 2 | 6 pass / 4 fail del humano y del juez; pₑ = 0.52 | Conteo a mano de `qa-eval-lab/evals/calibration/labeled_sample.csv`; `quiz-20-27.json` → `m17[0].why` |
| 3 | Leyenda ">0.8 excelente · 0.6-0.8 aceptable · <0.6 recalibrar rubrica" | `qa-eval-lab/evals/calibration/calibrate_judge.py` (print de kappa) |
| 4 | TripDesk usa Claude Haiku y cinco APIs (Open-Meteo geocoding y forecast, Nager.Date, Frankfurter, Wikipedia) | `agent-eval-jev/README.es.md`, sección "El caso: TripDesk" |
| 5 | 60 casos: 34 v2, 11 v1, 15 sembrados; 4 criterios; pasa solo si cumple los 4; la regla es etiquetar antes de cualquier juez, pero en agent-eval-jev el orden no se puede probar: `data/golden.jsonl` y `fixtures/` entraron en el mismo commit (`be15726`, 26-sep) | `agent-eval-jev/README.es.md` "Golden set" y "Resultados"; `agent-eval-jev/RUBRIC.md`; `git log -- data/golden.jsonl fixtures` |
| 6 | Capas: checks.py (esquemas, herramientas esperadas, números, canario); Jev noul/score/choice con probabilidades; juez LLM Claude Sonnet solo para comparar | `agent-eval-jev/README.es.md` "Arquitectura"; `m17.theory[2]` |
| 7 | Pesos 0.30/0.20/0.20/0.20/0.10, gates duros, banda 0.35-0.65 | `agent-eval-jev/agenteval/composite.py` líneas 5-7 |
| 8 | Lisboa, Ohio: Jev 50/50 → revisión humana | `agent-eval-jev/README.es.md` "Explicado para un niño de 8 años"; `data/mutations.json` m03 |
| 9 | fit_threshold maximiza balanced accuracy; fit_margin; solo split de calibración | `agent-eval-jev/agenteval/composite.py` funciones `fit_threshold` y `fit_margin`; `m17.theory[4]` |
| 10 | Calibración 31 / held-out 29 | `agent-eval-jev/reports/report.md` (primera línea) |
| 11 | Held-out: código 79.3 % (62-90 %) κ 0.55; Jev 79.3 % κ 0.60 con 11 falsos FAIL; compuesto 93.1 % (78-98 %) κ 0.86; LLM 86.2 % (69-94 %) κ 0.72; "tendencia, no diferencia probada" | `agent-eval-jev/reports/report.md` tabla Overall; `README.es.md` "Resultados" y "Lo que esto dice" |
| 12 | Umbral 0.67; 23 de 29 decididos solos, 22 bien (95.7 %); 6 a revisión | `agent-eval-jev/reports/report.md` "Calibration"; salida real de `python -m agenteval evaluate` |
| 13 | typesafe-ai 0.84-0.87 vs digitalocean 0.52-0.62; hasta 10 % sin fijar vs 3.3 % fijo | `agent-eval-jev/reports/report.md` "Upstream provider effect"; `README.es.md` |
| 14 | Pasos del CI offline, gate 0.85, job live manual con `AI_GATEWAY_API_KEY` | `agent-eval-jev/.github/workflows/ci.yml` |
| 15 | El gate exige v2 ≥ 0.85 y sin fallas de policy | `agent-eval-jev/agenteval/evaluate.py` función `gate` (líneas 299-307 y siguientes) |
| 16 | `pytest -q` → 30 passed | Ejecución real (uv, Python 3.12, pytest) en la copia de trabajo |
| 17 | Salidas de `evaluate`, `git diff --exit-code` (exit 0) y `gate` | Ejecución real en la copia de trabajo |
| 18 | v1: 27 % de referencia / 18 % compuesto; v2: 94 % / 94 % | `agent-eval-jev/reports/report.md` "Agent versions" |
| 19 | 15 defectos; m01 219.24 → 231.50; m15 paráfrasis benigna que debe pasar; lista de tipos | `agent-eval-jev/data/mutations.json` |
| 20 | `gate --min-agreement 0.95` → `GATE FAILED: judge agreement on held-out 0.931 < 0.95`, exit 1 | Ejecución real en la copia de trabajo |
| 21 | Línea 118 de checks.py: `"numbers_grounded": not unsupported,` | `agent-eval-jev/agenteval/checks.py` (grep -n) |
| 22 | Con la mutación: 30 passed, evaluate 0.931, gate exit 0, git diff 4 archivos y exit 1 | Ejecución real con la mutación aplicada en la copia de trabajo (revertida con `git checkout -- .`) |
| 23 | Con la mutación, código solo pasa a 82.8 % (65-92 %), κ 0.62, falsos PASS 9 → 11; compuesto sin cambio | `git diff -- reports/report.md` en la copia mutada |
| 24 | Jev da 3 % a "¿estos datos salen de las herramientas?" en el número alterado | `agent-eval-jev/README.es.md` "Un ejemplo real de este repo" |
| 25 | Reto, criterios y rúbrica (4 filas, nivel 4 con flip rate y 22 de 23) | `qa-automation-course/i18n/es/modules-24-29.json` → `m17.hands`, `m17.crit`, `m17.rubm` |
| 26 | Preguntas del quiz | `qa-automation-course/i18n/es/quiz-20-27.json` → `m17`, preguntas 1, 4 y 8 |
| 27 | Siguiente módulo: m22, "Jueces con probabilidad" | `qa-automation-course/course.json` (posición 26); `modules-24-29.json` → `m22.title` |
| 28 | Las 60 etiquetas las redactó un asistente de IA siguiendo la rúbrica y Cristian las revisó; no hay registro caso por caso de esa revisión (las 60 entraron en un solo commit, `be15726`, el 26-sep, y no se volvieron a tocar) ni anotador humano independiente; el 93.1 % mide al evaluador contra etiquetas redactadas por IA; siguiente paso: re-etiquetar a mano una muestra a ciegas, registrar cada decisión y medir el acuerdo | Confirmación de Cristian (26-oct-2026) y revisión de trazabilidad (git, Claude, Codex, Obsidian); `agent-eval-jev/RUBRIC.md` "Who labeled" y `README.es.md` "Límites" (commits 74d9360 y 2a424b8) |

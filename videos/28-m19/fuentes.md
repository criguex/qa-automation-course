# Fuentes · m19

Clon leído: `brand/predictor-debugger-docs` (commit `36836d4`). Las ejecuciones se hicieron el 2026-10-26 en una copia de trabajo con `uv run --locked` (Darwin arm64, Python 3.9.6, numpy 1.26.4); las mutaciones se revirtieron con `git checkout`.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | H14: criterio ρ ≥ 0,7 e IC inf. ≥ 0,5 en las 4 redes; P2gbest 0,635 [0,413; 0,795]; faltaron 0,065 | `round3/RESULTS.md` línea 38; `quiz-28-35.json` → `m19` pregunta 18 |
| 2 | H14 FAIL y aun así exit 0 con True y huella 6319-537B-7167 | Ejecución real de `round3/verify.py --saved mac` (exit medido aparte: 0) |
| 3 | "Written before any dataset, model or prediction exists"; enmiendas al final con fecha, razón y commit, nunca después del test | `DESIGN.md` línea 3 |
| 4 | Enmienda 1 (24-oct): MPS sin float64, redondeo ~1,2e-7, divergencia ~1e-15, P0f32 y H1b | `DESIGN.md` §Amendments 1 |
| 5 | "A poor network is an acceptable result; a debugger that cannot tell the controls apart is a failure" | `DESIGN.md` §Question |
| 6 | Controles P0, P3a (5 % de ‖u‖), P3b (×1,05), P1 y su emparejamiento con D1-D3 y H1-H4 | `DESIGN.md` §Predictors y §Hypotheses |
| 7 | τ = 10 × máx de P0 y P0f32 en validación, piso 1e-12; NaN nunca pasa | `DESIGN.md` §Debugger checks y enmienda 1; campo `rule` de `thresholds.json` |
| 8 | Tres salidas PASS / NON-DISCRIMINATIVE / FAIL; H8 de la ronda 2 no distinguió G de D3 | `m19.theory[4]` en `i18n/es/modules-24-29.json` |
| 9 | Números de H14 por red y ΣD3 (0,785 · 0,851 · 0,810 · 0,654; cumple en 3 de 4) | `round3/RESULTS.md` línea 38 |
| 10 | ρ 0,99 en el paso 1 → 0,45–0,73 en el paso 20; "el depurador sabe cuánto… pero no hacia dónde" | `README.md` líneas 14-15; `round3/RESULTS.md` línea 92 |
| 11 | "No se cambió nada para arreglarlo"; H17 en la ronda 4 pasó en las cuatro redes | `round3/RESULTS.md` línea 128; `README.md` líneas 16 y 44 |
| 12 | Composición de la huella y recorte a 12 caracteres | `m19.theory[6]`; `verify.py` |
| 13 | `uv run --locked` usa Python 3.9 y numpy 1.26.4 de `uv.lock` | `README.md` línea 50 |
| 14 | Salida completa de `verify.py --saved mac` y exit 0; ~6 s con la descarga de numpy | Ejecución real (`time` total 5,58 s) |
| 15 | war, guerra y linux → True y EEC9-09E0-F77D | Ejecución real |
| 16 | Ronda 2: 9 PASS, D506-F58F-3838; ronda 4: 18 PASS con H17, 681D-143B-64A3 | Ejecución real; tabla de rondas del `README.md` |
| 17 | La ronda 3 imprime dos `RuntimeWarning: invalid value encountered in divide` de numpy antes de la tabla | Ejecución real (se omiten en pantalla) |
| 18 | Mac, WAR, GUERRA, Linux en CI de GitHub (ubuntu-24.04) y WSL2 | `README.md` línea 50 |
| 19 | Workflow verify: matriz de 4 rondas, grep de la huella para mac, war, guerra en cada push | `.github/workflows/verify.yml` |
| 20 | Ledger de discrepancias 0; falsos positivos 126, D2 sobre P0/P0f32 en ood, todos open | `wc -l ledgers/*.jsonl`; conteo con Python sobre `ledgers/false_positives.jsonl` (63 + 63, todos `open`) |
| 21 | "Las tres máquinas son mías, así que esto no es una reproducción independiente" | `README.md` línea 125 (Límites) |
| 22 | Ningún archivo regenerado igual bit a bit; máximo 8,9e-16 (WAR, ronda 1); Mac canónico | `README.md` línea 109 |
| 23 | `cluster_bootstrap`: trayectorias completas, 2.000 réplicas, semilla 20261024, percentiles 2,5 y 97,5 | `round2/evaluate.py` líneas 18 y 38-52 |
| 24 | Ejemplo sintético: IC por pasos [-0,213; 0,034] ancho 0,247; por trayectorias [-0,471; 0,280] ancho 0,750 | Script propio del laboratorio (no está en el repo), ejecutado con el entorno de uv del repo; el código va en `escenas.json` E16 |
| 25 | Mutación hostname: 5 PASS, True, `changed thresholds.json`, huella 5D3E-4B95-DD6A, exit 1 | Ejecución real en la copia |
| 26 | Mutación D1 = 1.0: H2 0/400 FAIL, False, huella 6BC7-901B-5FB1, exit 1 | Ejecución real en la copia; coincide con lo que anticipa `m19.mut` |
| 27 | Reto, criterios y nivel máximo | `m19.hands`, `m19.crit`, `m19.top` |
| 28 | "Qué me contradiría" | `README.md` línea 117 |
| 29 | Preguntas del quiz | `qa-automation-course/i18n/es/quiz-28-35.json` → `m19`, preguntas 1, 5 y 7 |
| 30 | Siguiente módulo: m32 | `course.json` (posición 29); `modules-24-29.json` → `m32.title` |

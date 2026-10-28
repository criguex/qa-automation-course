# Fuentes · m24

Clon leído: `brand/scientific-qa-evidence` (commit `c02e623`). Ejecuciones del 2026-10-26 en una copia de trabajo (macOS arm64, Python 3.9.6, solo biblioteca estándar); la mutación del runner se revirtió con `git checkout -- runner.py`. Los dos scripts de inyección (`nan_campaign.py`, `nan_mutants.py`) son del laboratorio, quedaron en el scratchpad de la sesión y su código va en `escenas.json` (E13).

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | Sin la guardia del oráculo y con NaN solo en mutantes: 48 KILLED con `oracle_valid: true`, 6 INCONCLUSIVE | Ejecución real con la mutación de E14 (copia de trabajo) |
| 2 | Hallazgo 8: el runner reportaba `oracle_valid: true` con el oráculo en excepción o NaN; lo atrapó probar el arnés | `FINDINGS.md` fila 8 |
| 3 | Hallazgos 1, 3 y 8 fueron defectos del propio estudio, corregidos en público | `FINDINGS.md`, párrafo tras la tabla |
| 4 | Pista 1 de war-paradigm = simulaciones físicas → scientific-qa-evidence | `war-paradigm/README.es.md` línea 78 |
| 5 | Analogía de la balanza | `m24.kid` en `i18n/es/modules-30-35.json` |
| 6 | Control positivo y negativo; tres propiedades del arnés | `m24.theory[0-1]`; `quiz-28-35.json` → `m24` preguntas 1-4 |
| 7 | Tolerancia 1e-6 normalizada por escala; congelada antes; SUT y oráculo sin RHS, solver ni solución compartidos; RC con RK4 vs forma cerrada; Snell asin vs bisección | `evidence/numerical/source/CONTRACT.md` (Design; Tolerance and classification); `oracles.py`; `sut.py` línea 25 |
| 8 | Sin semilla, solo stdlib, carpeta nueva o abortar, SHA-256 de fuentes/contrato/artefactos, sin hostnames ni IPs | `CONTRACT.md` §Determinism and evidence |
| 9 | Reglas de clasificación, BLOCKED_BASELINE, INCONCLUSIVE con oráculo no finito; "never force a mutant to die" | `CONTRACT.md` §Tolerance and classification; `runner.py` `classify_variant` (líneas 56-61) |
| 10 | 9 modelos; 9 × 3 × 3 = 81 + 3 calibraciones RC = 84 | `CONTRACT.md` §Design; `README.es.md` Parte B; `suite.py` (`MUTANTS`) |
| 11 | 27 PASS, 54 KILLED, 3 SURVIVED por máquina; macOS arm64 y Linux x86_64; Δ máx 1,11e-16; 84 pareadas, no 168 | `README.es.md` líneas 50 y 155; `evidence/numerical/multidomain_derived.json` (`per_host`, `paired_host_comparison`); `summary.mac.json` (`counts`) |
| 12 | Invariantes (RC acotado y monótono, concentración positiva no creciente, balance acústico R² + (Z₁/Z₂)T² = 1); conservación de energía sola no basta | `CONTRACT.md` §Tolerance and classification |
| 13 | 54 KILLED = 51 comportamientos (pressure_boundary_sign e impedance_swap idénticos) | `CLAIMS.md` línea 8; `README.es.md` línea 155 |
| 14 | 3 sobrevivientes = RC con perturbación relativa 5e-8, visibles a propósito | `CONTRACT.md` §Design; `sut.py` línea 25 (`tau_tiny`); `README.es.md` línea 155 |
| 15 | Kill rate 54/57 ≈ 95 % | `quiz-28-35.json` → `m24` pregunta 8 |
| 16 | 18 valores no finitos por `rhs_sign` en química de 2º orden, KILLED tras baseline PASS | `multidomain_derived.json` → `nonfinite_values` |
| 17 | `python3 -m unittest -v test_runner` → 7 pruebas OK (nombres listados) | Ejecución real |
| 18 | Resumen guardado: comando `python3 runner.py --out <NEW_OUTPUT_DIR>`, 1 invocación, 84 evaluaciones, 0,042 s | `evidence/numerical/summary.mac.json` |
| 19 | La comprobación 3 de verificar.py corre `unittest test_runner` | `verificar.py` línea 64 |
| 20 | `test_nan_oracle_alone…` usa `mock.patch.object(oracles, "evaluate", …)` y exige INCONCLUSIVE y `oracle_valid` falso | `test_runner.py` líneas 49-53 |
| 21 | No hay prueba dedicada a "baseline inválida bloquea a sus mutantes" | Lectura de `test_runner.py` (7 pruebas, ninguna sobre BLOCKED_BASELINE) |
| 22 | Campaña con oráculo real 27 PASS / 54 KILLED; con oráculo NaN 27 INCONCLUSIVE / 54 BLOCKED_BASELINE | Ejecución real de `nan_campaign.py` (81 variantes, sin las 3 calibraciones RC) |
| 23 | Mutación: quitar `if not finite(expected)` y `or not finite(expected)` en `run_variant` | Diff aplicado en la copia de `runner.py` |
| 24 | Con la mutación: 2 pruebas FAIL (las dos de oráculo NaN); campaña NaN → 24 BASELINE_INVALID, 54 BLOCKED_BASELINE, 3 INCONCLUSIVE | Ejecución real en la copia |
| 25 | Original con NaN solo en mutantes → 54 INCONCLUSIVE; sin guardia → 48 KILLED `oracle_valid`, 6 INCONCLUSIVE (acústicos, 8 valores vs 4) | Ejecución real de `nan_mutants.py`; diagnóstico de los 6 con `invariants = oracle_invalid_or_shape_mismatch` |
| 26 | Contrato versión 1.1 (corrección de CSV, criterios y modelos sin cambio); CSV 720 → 756 filas; 84 clasificaciones idénticas | `CONTRACT.md` primera línea; `multidomain_derived.json` → `version_history` |
| 27 | Reto (décimo modelo de caída libre con arrastre lineal, oráculo analítico, 2 mutantes + 1 cerca del umbral), criterios y nivel máximo | `m24.hands`, `m24.crit`, `m24.top` |
| 28 | Preguntas del quiz | `qa-automation-course/i18n/es/quiz-28-35.json` → `m24`, preguntas 3, 4 y 8 |
| 29 | Siguiente módulo: m25, "Física de fluidos y estadística para el depurador" | `course.json` (posición 31); `modules-30-35.json` → `m25.title` |

# Fuentes · 32 · m26 · Verificar una prueba formal sin ser matemático

Repo leído en su clon local: `scientific-qa-evidence` @ `c02e623` (2026-10-25). Textos del curso: `qa-automation-course/i18n/es/modules-30-35.json` (`m26`), `quiz-28-35.json` y `pages.json`. Rutas relativas a la raíz de cada repo.

## Afirmaciones del guion

| Escena | Afirmación | Fuente |
| --- | --- | --- |
| E01 | B3 recibió en silencio 7 dependencias como archivos precompilados de Reservoir; el log no lo mostraba; se detectó comparando fechas de `.olean` con el inicio y revisando `.lake/packages` | `FINDINGS.md`, hallazgo 1; `evidence/formal/cd-validation/README.md`, sección B3 |
| E01 | La búsqueda de `fetched`, `unpack` o `downloading` en el log dio 0 | `evidence/formal/cd-validation/README.md`, «What the log did not show» |
| E01 | B3: 1 h 27 min, exit 0 («una hora y media» en la voz) | `evidence/formal/cd-validation/README.md`, B3, «Started / finished» |
| E02, E09 | Comparator rechazó `n + 1 ≤ p`, que para Lean es por definición `n < p` (`Iff.rfl`) | `README.es.md`, «Controles con Mathlib»; `experiments/mathlib-controls/RESULTS.md` |
| E03 | Analogía del profe | `qa-automation-course/i18n/es/modules-30-35.json`, `m26.kid` |
| E04 | Las cuatro cosas que Lean no comprueba | `README.es.md`, «El método», párrafo «Cómo complementa a Lean» |
| E05 | Cinco compilaciones; B4 y B5 con `lake --no-cache build`: exit 0, 11.424 jobs, 1 h 29 min y 1 h 16 min | `README.es.md`, «Resultados en resumen», fila «¿Compila desde la fuente?» |
| E05 | B2 usó la caché precompilada de Mathlib (`lake exe cache get`) | `evidence/formal/cd-validation/README.md`, tabla de compilaciones, fila B2 |
| E05 | En B4 cada `.olean` era más nuevo que el inicio de la compilación | `FINDINGS.md`, hallazgo 2 |
| E06 | Comparator: teorema exacto del desafío y solo `propext`, `Quot.sound`, `Classical.choice`; kernels de Lean y nanoda | `README.es.md`, Parte A |
| E06 | `leanchecker --fresh` aceptó; usa el kernel de Lean; `lean4lean` no compiló para Lean 4.34 | `README.es.md`, Parte A y «Limitaciones conocidas» |
| E07 | Julio de 2026: un bug de Lean y otro distinto de nanoda dejaron pasar la misma prueba falsa | `README.es.md`, «Limitaciones conocidas», «Solo bugs de kernel conocidos» |
| E07 | Verificadores al día con las correcciones de 2026 | `README.es.md`, «Resultados en resumen», fila «¿Los verificadores están al día?» |
| E08 | Seis mutantes de un símbolo rechazados con `Challenge and solution theorem statement do not match`; control de solo comentario aceptado | `evidence/formal/cd-validation/README.md`, tabla de chequeos (filas 17–23); `evidence/formal/cd-validation/mutants/` |
| E08 | Diff del mutante `f = 0` | `evidence/formal/cd-validation/mutants/force_zero_R3.diff` |
| E09 | 3 teoremas, 8 cambios rechazados, 4 equivalentes; clases: 4 equivalentes, 1 más débil, 3 falsos | `README.es.md`, tabla de «Controles con Mathlib»; salida de `verify.py` (E17) |
| E10 | Guarda: 1.485 constantes; prueba tramposa con `Nat.exists_infinite_primes` rechazada (texto de pantalla copiado) | `README.es.md`, «La guarda» |
| E11 | Recibo con log ausente: procedimiento publicado exit 0 y salida idéntica; P6 lo marca. Log viejo con nombre correcto: P6 pasa; solo el hash lo marca | `README.es.md`, «Estudio de caso: controles de integridad»; `experiments/receipt-check/RESULTS.md` y `RESULTS2.md` |
| E12 | No es técnica nueva (in-toto, SLSA); límite del hash; alcance «no se encontró un defecto en este alcance» | `README.es.md`, «No es una técnica nueva», «Cómo complementa a Lean»; `experiments/receipt-check/RESULTS2.md` |
| E13 | Salida de `verificar.py` y huella | Corrida propia, ver abajo |
| E14 | Los seis comandos y qué se recalcula frente a qué se verifica por hash | `README.es.md`, «Verifícalo tú mismo»; `REPRODUCE.md`, tabla «Recomputed or verified?»; `experiments/receipt-check/RESULTS2.md`, «Notes» |
| E15 | Primera línea de los recibos | `experiments/mathlib-controls/results/receipts.jsonl`, línea 1 (completa abajo) |
| E15 | `e3b0c442…7852b855` es el SHA-256 de la entrada vacía | Valor estándar de SHA-256 de cero bytes (se puede comprobar con `printf '' \| shasum -a 256`) |
| E16 | Mensaje de rechazo de PrimesSwap | `experiments/mathlib-controls/results/comparator/PrimesSwap.stderr.log` |
| E17 | Salida de `verify.py` | Corrida propia, ver abajo |
| E18 | ~30 GB de disco, 16 GB de RAM, 1 h 15 min en 12 núcleos; función `step()`; contenido del informe | `docs/INDEPENDENT_REPRODUCTION.md`, «Steps» y «What is fixed» |
| E19–E20 | Mutantes 1 y 2 sobre la evidencia | `qa-automation-course/i18n/es/modules-30-35.json`, `m26.mut`; corridas propias, ver abajo |
| E21–E22 | Pista A, criterios, pista B (nivel 4) | `qa-automation-course/i18n/es/modules-30-35.json`, `m26.hands`, `m26.crit`, `m26.deliver`, `m26.top` |
| E22 | Rúbrica de 4 niveles | `qa-automation-course/i18n/es/pages.json`, `eval.s05` |
| E23–E25 | Preguntas 2, 6 y 8 del banco de m26 | `qa-automation-course/i18n/es/quiz-28-35.json`, `m26` |
| E26 | Siguiente módulo: m31 (posición 33) | `qa-automation-course/course.json` |

## Corrección al texto del módulo

El paso 4 de `m26.hands` dice que `cat experiments/mathlib-controls/results/comparator/PrimesSwap.stdout.log` termina en `uncaught exception: Challenge and solution theorem statement do not match: 'QAControls.primes_infinite'`. En el repo @ `c02e623` ese mensaje está en `PrimesSwap.stderr.log`; `PrimesSwap.stdout.log` termina en la línea `Exporting #[Nat, String, …] from QAControls.Solution.Primes`. El guion (E16) usa `stderr.log` y lo dice en voz. Conviene corregir el módulo.

## Corridas propias (2026-10-26)

Entorno: macOS arm64 (Darwin), Python 3.9.6. Clon de `scientific-qa-evidence` @ `c02e623`. Las mutaciones se hicieron en una copia temporal en el scratchpad de la sesión y se restauraron con `git checkout .`.

### `python3 verificar.py; echo "exit=$?"` (E13)

```text
Verificación de scientific-qa-evidence
Versión de los datos: 26791fe6546f   Sistema: Darwin arm64   Python 3.9.6

  1/6  [OK]  Archivos intactos (SHA-256)  (0.2 s)
  2/6  [OK]  Corridas numéricas guardadas, iguales entre Mac y Linux  (0.0 s)
  3/6  [OK]  Volver a correr las 84 variantes numéricas  (0.2 s)
  4/6  [OK]  README, CLAIMS y registros dicen lo mismo  (0.0 s)
  5/6  [OK]  Recibos de los controles Mathlib  (0.0 s)
  6/6  [OK]  Comprobación de recibos en los paquetes publicados  (0.1 s)

Resultado: las 6 comprobaciones salieron OK en tu computador.
Tu huella: C5F0-F1A8-2F4D
Si otra persona con la misma versión obtiene la misma huella, a los dos les dio exactamente lo mismo.

Guardé el detalle en mi_resultado.txt. Para contarnos tu resultado (igual o distinto):
  https://github.com/criguex/scientific-qa-evidence/issues/new?template=reproduccion.yml

exit=0
```

Las líneas de progreso («1/6 Archivos intactos (SHA-256) ...») que el script sobrescribe con `\r` se omiten en pantalla. La huella depende del commit; con otro commit saldrá otra.

### `python3 experiments/mathlib-controls/verify.py` (E17)

Salida completa en la escena E17, con `exit=0`.

### Recibo completo, línea 1 de `receipts.jsonl` (E15)

```json
{"step": "comparator", "case": "PrimesOrig", "command": "lake env comparator QAControls/configs/PrimesOrig.json", "inputs": {"QAControls/Challenge/PrimesOrig.lean": "1355369c3c32fa7f7045b8fc66d8b2c99442e329a06bdc1e7edf3d200b074753", "QAControls/Solution/Primes.lean": "2906cfba98a6ed178eab11e6f31d9a83f1f060180262257545c9eb0f36fb9591", "QAControls/configs/PrimesOrig.json": "33fb503acb1de7bb550496b75d38b6c41c6577d4730d2ecf7cc3311ef8e2bcad"}, "stdout_sha256": "bfac1fa7b74f0e55bdc1068fc5adc09b3ca37103a7b9522cb404929d808a7faf", "stderr_sha256": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", "exit_code": 0, "started": "2026-10-21T23:14:27Z", "finished": "2026-10-21T23:15:07Z"}
```

### Mutante 1 (E19)

```text
$ cp experiments/mathlib-controls/results/comparator/PrimesOrig.stdout.log experiments/mathlib-controls/results/comparator/PrimesSwap.stdout.log
$ python3 experiments/mathlib-controls/verify.py; echo "exit=$?"
Traceback (most recent call last):
  …
  File ".../experiments/mathlib-controls/verify.py", line 35, in load_receipts
    assert sha256(res / folder / f"{r['case']}.stdout.log") == r["stdout_sha256"], f"stdout hash mismatch: {r['case']}"
AssertionError: stdout hash mismatch: PrimesSwap
exit=1
```

### Mutante 2 (E20)

Edición: en `experiments/mathlib-controls/results/receipts.jsonl`, línea 5 (`"step": "comparator", "case": "PrimesSwap"`), `"exit_code": 1` → `0`. Se hizo con Python (`json.loads` → cambiar el campo → `json.dumps` con el formato por defecto); `git diff --word-diff` confirma que el único cambio es `[-1,-]{+0,+}`.

```text
$ python3 experiments/mathlib-controls/verify.py; echo "exit=$?"
    assert all(r["match"] for r in rows) and guard_ok and signed_ok and guard_built
AssertionError
exit=1
$ python3 verificar.py
  1/6  [FALLA]  Archivos intactos (SHA-256)  (0.2 s)
  2/6  [OK]  Corridas numéricas guardadas, iguales entre Mac y Linux  (0.1 s)
  3/6  [OK]  Volver a correr las 84 variantes numéricas  (0.4 s)
  4/6  [OK]  README, CLAIMS y registros dicen lo mismo  (0.0 s)
  5/6  [FALLA]  Recibos de los controles Mathlib  (0.0 s)
  6/6  [OK]  Comprobación de recibos en los paquetes publicados  (0.1 s)
Resultado: 2 de 6 comprobaciones FALLARON. Ese dato también es valioso: repórtalo.
Tu huella: A287-AA93-4FAD
```

La huella del mutante depende de los bytes exactos del archivo editado; otra forma de editar (otro espaciado) dará otra huella, pero las dos `[FALLA]` se mantienen.

## No verificado para este paquete

- No se recompiló Lean ni se corrió Comparator: las cifras de compilación (11.424 jobs, tiempos de B3, B4, B5) se citan de los registros del repo.
- El bug de julio de 2026 en Lean y nanoda se cita del README; no se revisó la fuente original del bug.

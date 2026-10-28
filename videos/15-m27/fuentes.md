# Fuentes · 15-m27 · Contenedores efímeros

Fuentes leídas el 26-oct-2026: release `repro-ia-20261026` de criguex/predictor-debugger (notas con `gh release view`; paquete bajado con `gh release download` y verificado con `shasum -a 256 -c` → OK; 441 archivos), clon `predictor-debugger-docs` (36836d4), clon `restful-booker-quality-suite` (8d8f9c5) y textos del curso en `i18n/es/modules-15-23.json` → `m27`.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | Recálculo de las rondas 1-4 operado por un asistente de IA bajo dirección de Cris; «No es una revisión independiente» | Notas del release repro-ia-20261026; `results_scope.txt` línea 1 («assistant execution evidence, not independent human peer review») |
| 2 | Los 81 arrays de la corrida previa desaparecieron con el ejecutor efímero; hashes y estadísticas durables previos recuperados | `results_scope.txt` línea 3 |
| 3 | Analogía del castillo de arena | `i18n/es/modules-15-23.json` → `m27.kid` |
| 4 | Runner hospedado, contenedor, devcontainer, Testcontainers y previews por PR como entornos efímeros | `m27.theory[0]`; https://containers.dev/; https://testcontainers.com/ |
| 5 | restful-booker: SUT en commit 0046115, `docker compose up --build -d`, espera a `/ping` hasta 30 intentos, logs con `if: failure()` | `restful-booker-quality-suite/.github/workflows/tests.yml` líneas 19-47 |
| 6 | Qué se pierde (estado, archivos no subidos, caché, procesos, identidad) y qué sobrevive | `m27.theory[2]` |
| 7 | Diseño 1: upload-artifact con `!cancelled()` y SHA256SUMS; recibo = comando, hashes, exit code | `m27.theory[3]`; https://github.com/actions/upload-artifact |
| 8 | La carpeta receipts trae `fresh-environment.json`, `source-integrity.json`, `downloads.jsonl` y `SHA256SUMS` | Listado de `x/receipts/` del paquete |
| 9 | Diseño 2: `npm ci`, `uv run --locked`, `astral-sh/setup-uv` con `version: "0.11.18"`, commit 0046115, digest en vez de tag, datos contra SHA256SUMS y manifiesto | `m27.theory[4]`; `predictor-debugger-docs/.github/workflows/reproduce.yml` líneas 18-22; `predictor-debugger-docs/README.md` §Reproducir (b) |
| 10 | Diseño 3: escritura atómica (tmp + mv), hash por tarea, flock; los checkpoints del runner mueren con él | `m27.theory[5]`; https://man7.org/linux/man-pages/man1/flock.1.html |
| 11 | Diseño 4: reproduce.yml en ubuntu-24.04, baja data-v1, verifica, recalcula, `grep -q`; vive en el repo; rondas 1 y 2 | `m27.theory[6]`; `predictor-debugger-docs/.github/workflows/reproduce.yml` |
| 12 | Primera corrida de reproduce (40267731741): ronda 1 en 6 min 33 s con descarga, huella EEC9-09E0-F77D | `predictor-debugger-docs/README.md` §Reproducir (b) |
| 13 | Commit b918c62, sin reentrenar ni volver a inferir; huellas EEC9-09E0-F77D, D506-F58F-3838, 6319-537B-7167, 681D-143B-64A3 iguales al original | Notas del release (tabla) |
| 14 | Linux x86_64, Python 3.12.14, NumPy 1.26.4, un hilo, 96.870 registros, ~7,5 h | Notas del release |
| 15 | Contra Mac, WAR y GUERRA las estadísticas difieren como máximo en 6e-14 | Notas del release |
| 16 | 81 archivos de la R1 regenerados, ninguno idéntico bit a bit, diferencia máxima 8,9e-16; R4 interrumpida y retomada desde checkpoints | Notas del release, Limitaciones |
| 17 | Chequeo suplementario falló al serializar (`numpy.bool_`), se arregló solo la salida y repitió 14/14 | Notas del release, Limitaciones |
| 18 | 441 archivos; SHA-256 del zip 8d7c45f4…c93d0; salida de la verificación «…zip: OK» | Notas del release; `shasum -a 256 -c …zip.sha256` y `find x -type f \| wc -l` corridos el 26-oct-2026 |
| 19 | NEW RUN, no recuperación; alcance sin entrenamiento, inferencia nueva, cambios públicos ni CI; identidad estricta de bits sin tolerancia relajada | `results_scope.txt` líneas 4, 6 y 8 |
| 20 | flock global; SHA y filas por tarea bajo lock; la tarea 0 de la R4 usó el envoltorio viejo sin lock; no inferir muerte por otro namespace de PID | `receipts/lock-hardening.json` (campo `change`) |
| 21 | Al perder la sesión: tareas verificadas 0, 1, 2, 3, 4 y 24; 600 filas; lock libre «not sufficient alone to prove old driver absent»; no relanzar con identidad incierta | `receipts/interruption.json` (`verified_completed_tasks`, `verified_rows`, `global_lock_observation`, `policy`) |
| 22 | Error inicial de transporte del exec-server y «Unknown process id»; identidad del arranque previo no registrada; recuperación con autorización explícita, mismo inodo del lock; salida original desconocida | `receipts/interruption.json` (`first_error`, `retry_error`, `previous_boot_identity_unrecorded`, `recovery_basis`) |
| 23 | Cuatro lecciones; el release no menciona CI | `m27.theory[9]` |
| 24 | El siguiente paso es que otra persona corra reproduce.yml o el paquete | `i18n/es/quiz-11-19.json` → `m27[7]` (why) |
| 25 | `uv run --locked verify.py --saved mac` debe imprimir `fingerprint: EEC9-09E0-F77D` | `m27.hands[3]`; `predictor-debugger-docs/README.md` §Reproducir (a) |
| 26 | Log guardado de Linux: 5 hipótesis PASS, «verdicts equal to saved results/linux/verdicts.json: True», huella EEC9-09E0-F77D | `predictor-debugger-docs/logs/linux/verify_saved.log` |
| 27 | La misma huella en Mac, WAR y GUERRA | `predictor-debugger-docs/.github/workflows/verify.yml` (bucle `mac war guerra` con `grep -q "fingerprint: EEC9-09E0-F77D"`) |
| 28 | macOS no trae flock; fragmentos de shell del laboratorio; requisitos del workflow | `m27.hands[4]` y `m27.hands[5]` |
| 29 | Mutación (docker kill, gh run cancel, gh cache delete --all), entregable, criterios y rúbrica | `m27.mut`, `m27.deliver`, `m27.crit`, `m27.rubm` |
| 30 | Mini-quiz | `i18n/es/quiz-11-19.json` y `i18n/en/quiz-11-19.json` → `m27[0]`, `m27[3]`, `m27[4]` |

## Sin verificar en esta sesión

- No pude correr `uv run --locked verify.py --saved mac`: el entorno de esta sesión bloqueó ejecutar código del repo. La escena E15 muestra el log guardado de Linux y lo rotula como tal.
- No se ejecutó el laboratorio de checkpoints con `flock` ni `docker kill`; el guion solo cita los fragmentos del módulo.

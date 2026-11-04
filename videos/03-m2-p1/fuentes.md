# Fuentes · Módulo 03 · Parte 1 · El límite de 80 que nadie probó (m2)

Parte 1 de 2 del módulo 03; la fuente completa del módulo sigue en `03-m2/`. "Corrida" = ejecutado el 28-oct-2026 con `render/salidas/capturas.sh`, Node v26.8.1, macOS. Las rutas de `m2.*` son de `qa-automation-course/i18n/es/modules-01-14.json`; las del quiz, de `quiz-01-10.json`.

Procedencia de cada ejemplo (se dice así en el video):

| Ejemplo | Repo | Procedencia |
|---|---|---|
| Gancho: `TITLE_MAX = 79` y la suite en verde | `criguex/war-paradigm` @ `5dc5e92` (versión anterior) | Corrido en un worktree aparte; mutación revertida |
| Particiones, límites, tabla de crear, estados, DEF-001 | `criguex/war-paradigm` @ `e6ce6d4` | Código y vault leídos; límites, espacios y viewer corridos en la parte 2 (`03-m2-p2/render/salidas/crea_*.txt`) |
| El «vaso vacío» (marca inexistente → `[]` con 200) | `criguex/karate-api-testing` @ `5f02348` + Makeup API pública | Corrido con `curl`; la falta de caso, leída en `brand.feature` |
| El 50 de la app de pagos (49,99 / 50 / 50,01) | repo en revisión de confidencialidad (ejemplo SW-1 de `ejemplos/ui-e2e-bdd.md`) | Solo leído: evidencia guardada del 17-oct-2026; el ambiente ya no existe. Sin nombre, host ni URL en pantalla |

| # | Afirmación en el guion o en pantalla | Fuente |
|---|---|---|
| 1 | Posición 3, id `m2`, icono 🎯, nivel ★★☆☆☆ | `qa-automation-course/course.json` → `modules[2]` |
| 2 | Con `TITLE_MAX = 79` la suite completa (golden + 6 mutantes) da `7 passed` y `5/6 scored mutants killed` | `render/salidas/gancho79.diff` y `gancho79.txt` (war-paradigm @ `5dc5e92`) |
| 3 | Título de 3 a 80; dueño = correo de un miembro; cuatro roles | `experiments/02-mutants/app/server.js` (`ROLES`, `TITLE_MAX = 80`, líneas 89–93) |
| 4 | Analogía del juego de 8 a 12 años: 7, 8, 12 y 13 | `m2.kid` |
| 5 | Niveles y tipos de prueba | `m2.theory[0]` |
| 6 | Caso bien escrito = precondición + datos + pasos + esperado observable; "es una intención" | `quiz-01-10.json` → m2 pregunta 9 |
| 7 | No-texto → `''` → 422; `trim` antes de medir | `app/server.js` línea 91 (leído); `«  ab  »` → 422 corrido en `03-m2-p2/render/salidas/crea_espacios.txt` |
| 8 | Dueño vacío o desconocido → 422 `owner is required`; `drop-input` cubre el vacío; ninguno cubre el desconocido | `app/server.js` línea 93; `tests/scenarios.ts` |
| 9 | Makeup API: maybelline → 54 productos; marca inexistente → `[] status=200` | `render/salidas/makeup_maybelline.txt` y `makeup_vacio.txt` (corrido 28-oct-2026) |
| 10 | En karate-api-testing ninguna prueba pide una marca inexistente | `src/test/java/features/brand.feature` (maybelline, marcelle, iman y ruta errada `api/ddd`) |
| 11 | Fronteras B-1…B-4: 2 → 422, 3 → 201, 80 → 201, 81 → 422 | `experiments/01-ai-verdict/fixtures/story-US-42.json`; corrido en `03-m2-p2/render/salidas/crea_limites.txt` |
| 12 | El mutante `boundary` solo manda 81 | `tests/scenarios.ts` (`'x'.repeat(81)`) en `5dc5e92` y en `e6ce6d4` |
| 13 | App de pagos: 49,99 → aprobado solo; 50 → aprobado solo; 50,01 → pendiente; la regla se llama «under $50» y su descripción dice «at or below $50» | Evidencia guardada (SW-1, BUG-18 del 17-oct-2026), solo leída |
| 14 | 3 condiciones → 2³ = 8 combinaciones | `quiz-01-10.json` → m2 pregunta 2 (aplicado a crear) |
| 15 | Matriz de permisos y precedencia 403 > 422 > 409 | `experiments/03-second-brain/vault/03 Knowledge/Roles and permissions.md` |
| 16 | Viewer crea → 201; la ruta de crear no pregunta el rol; de ahí nació `viewer-create` | `03-m2-p2/render/salidas/crea_viewer.txt`; `app/server.js` líneas 89–97; commit `a5386c8` |
| 17 | Publicar un borrador → 409; aprobar algo que no es borrador → 409 (solo leído); `reorder` | `app/server.js` líneas 103 y 113; `tests/scenarios.ts` |
| 18 | 81 combinaciones; pairwise ≈ 9–12 casos; la mayoría de defectos de interacción con 2 parámetros | `quiz-01-10.json` → m2 pregunta 5 |
| 19 | Mínimo pairwise ≥ producto de los dos dominios más grandes (4 × 3 = 12) | Aritmética |
| 20 | PICT como herramienta recomendada | `m2.top`; https://github.com/microsoft/pict |
| 21 | Error guessing: experiencia, bugs históricos y patrones; DEF-001 | `quiz-01-10.json` → m2 pregunta 8; `vault/03 Knowledge/DEF-001 self-grant role.md` |
| 22 | SBTM; reporte con pasos, esperado vs real, ambiente, evidencia | `m2.theory[2..3]`; `quiz-01-10.json` → m2 pregunta 3 |
| 23 | Typo en la home: severidad baja, prioridad alta | `quiz-01-10.json` → m2 pregunta 6 |

## Analogías (no son datos)

- Juego de 8 a 12 años, bicicleta, heladería, montaña rusa, letrero de los menores de 10, almuerzo del colegio, grados del colegio, ropa, médico: imágenes para explicar, sin cifras propias.

## No verificado

- No se corrió PICT: no se muestra ninguna salida suya. El rango 9–12 viene del banco de preguntas.
- El caso de la app de pagos no se volvió a correr (el ambiente ya no existe): se cuenta como evidencia guardada y nunca como salida de terminal.
- «No es texto → 422» y «aprobar algo que no es borrador → 409» salen de leer el código; no se corrieron.

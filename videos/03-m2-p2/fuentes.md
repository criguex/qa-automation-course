# Fuentes · Módulo 03 · Parte 2 · Manos a la obra (m2)

Parte 2 de 2 del módulo 03; la fuente completa del módulo sigue en `03-m2/`. "Corrida" = ejecutado el 28-oct-2026 con `render/salidas/capturas.sh` sobre clones de `criguex/war-paradigm` @ `e6ce6d4` (HEAD de main), `criguex/laya-server` @ `bf88c61` y `criguex/restful-booker-quality-suite` @ `1dcf742`; Node v26.8.1, macOS. Las mutaciones se aplicaron y revirtieron dentro del script (`git status` limpio al final).

| # | Afirmación en el guion o en pantalla | Fuente |
|---|---|---|
| 1 | `TITLE_MAX = 80` (línea 12), `trim` (91), 3–`TITLE_MAX` → 422 (92), dueño → 422 (93) | `render/salidas/server_grep.txt` |
| 2 | En la ruta de crear no hay pregunta por el rol | `experiments/02-mutants/app/server.js` líneas 89–97 (leído) |
| 3 | Editor: 2 → 422, 3 → 201, 80 → 201, 81 → 422 | `render/salidas/crea_limites.txt` |
| 4 | `«  ab  »` (6 caracteres) → 422 | `render/salidas/crea_espacios.txt` |
| 5 | Viewer con título normal → 201; viewer con 2 letras → 422 (la matriz pide 403 primero) | `render/salidas/crea_viewer.txt`, `crea_viewer_ab.txt`; `vault/03 Knowledge/Roles and permissions.md` |
| 6 | La función `crea` = login con un rol + `POST /api/docs` con curl | `render/salidas/capturas.sh` (funciones `tok` y `crea`) |
| 7 | Marcador de `npm run test:mutants`: 5 KILLED, 2 KNOWN SURVIVOR, 5/7 | `render/salidas/test_mutants.txt` |
| 8 | `boundary` manda `'x'.repeat(81)`; `golden.spec.ts` manda `'x'.repeat(80)` | `render/salidas/repeat_grep.txt`; commit `a5386c8` agregó la prueba de 80 |
| 9 | laya-server: un juez pequeño en el computador de Cris que sube a la nube si la pregunta es larga o duda; umbral 0.8 y 1500 caracteres por defecto | `laya-server/README.es.md`; `src/server.mjs` líneas 9–10 |
| 10 | 1500 → confident, 1501 → long_state, 0.8 → confident, 0.79 → low_confidence | `render/salidas/laya_bordes.txt` con `render/salidas/bordes-laya.mjs` (script mío sobre `src/policy.mjs`, no está en el repo) |
| 11 | Las 7 pruebas de laya no usan 1500/1501 ni 0.8 exacto | `laya-server/test/policy.test.mjs` (leído) |
| 12 | restful-booker: 2026-02-30 y 2026-13-01 rechazados; 29 de febrero (2028) y precio 0 aceptados; precio −1 rechazado; 8 passed | `render/salidas/rb_component.txt`; `tests/component/bookingSchemas.component.spec.ts` |
| 13 | Plantilla `99 Templates/Defect note` (regla rota, pasos, esperado, real, causa, evidencia, estado) y DEF-001 | `experiments/03-second-brain/vault/99 Templates/Defect note.md`; `vault/03 Knowledge/DEF-001 self-grant role.md` |
| 14 | "Un valor límite movido en 1 es justo la mutación que tu suite debería matar" | `m2.mut` |
| 15 | `TITLE_MAX = 81` → boundary falla, `1 failed`, `SURVIVED boundary … HTTP 201`, 4/7 | `render/salidas/mut81.diff` y `mut81_mutants.txt` |
| 16 | `TITLE_MAX = 79` → golden pasa, la prueba de 80 falla con `Expected: 201 / Received: 422`, `8 passed`, mutantes 5/7 | `render/salidas/mut79.diff` y `mut79_test.txt` |
| 17 | La misma mutación a 79 sobrevivía en la versión anterior | `03-m2-p1/render/salidas/gancho79.txt` (war-paradigm @ `5dc5e92`) |
| 18 | Entregable, criterios y nivel 4 con PICT | `m2.deliver`, `m2.crit`, `m2.top` |
| 19 | Rúbrica de 4 niveles y aprobación con quiz 6 de 8 | `ui.json` → `rubric.generic`, `module.evalNote`; `course.json` (`qn = 8`, `qpass = 0.75`) |
| 20 | Preguntas del quiz | `quiz-01-10.json` → m2 preguntas 1 (a = 1), 4 (a = 1) y 6 (a = 1) |
| 21 | Siguiente módulo: Setup día 0 | `course.json` posición 4 = `m3` |

## Procedencia

- DocFlow, laya-server y restful-booker: corridos el 28-oct-2026. El script de bordes de laya es mío y se dice así en el video.
- La app de pagos de la parte 1 no aparece aquí.

## No verificado

- No se corrió PICT; el nivel 4 de la rúbrica lo pide pero no se muestra ninguna salida suya.
- La interfaz web de DocFlow no se grabó en esta parte.

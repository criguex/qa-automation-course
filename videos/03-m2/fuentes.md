# Fuentes · Módulo 03 · Diseño de pruebas & técnicas (m2)

Rutas relativas a los clones en `scratchpad/brand/`. "Corrida local" = ejecutado el 26-oct-2026 en una copia de `war-paradigm` (commit `5dc5e92`), Node v26.8.1, macOS. Las mutaciones se revirtieron después. Los dos huecos que encontró este módulo quedaron en el repo en el commit `a5386c8` (el mutante `viewer-create` y la prueba de 80 caracteres); las salidas de E13 y E16 son de ese commit.

| # | Afirmación en el guion | Fuente |
|---|---|---|
| 1 | Posición 3, id `m2`, icono 🎯, nivel ★★☆☆☆ | `qa-automation-course/course.json` → `modules[2]` |
| 2 | Con `TITLE_MAX = 79` la suite completa daba 7 pasadas y el mismo marcador 5/6 (commit `5dc5e92`); desde `a5386c8` la prueba de 80 caracteres de `golden.spec.ts` falla con 422 | Corrida local de `npx playwright test` en `experiments/02-mutants` con la constante cambiada, en los dos commits |
| 3 | Analogía del juego de 8 a 12 años: probar 7, 8, 12 y 13 | `m2.kid` |
| 4 | "Más cobertura con menos casos… scripter vs ingeniero de calidad" | `m2.mentor` |
| 5 | Niveles y tipos de prueba | `m2.theory[0]` |
| 6 | Caso bien escrito = precondición + datos + pasos + esperado observable | `quiz-01-10.json` → m2 pregunta 9 |
| 7 | Título 3–80, `trim`, no-texto → `''`; dueño vacío o desconocido → 422 "owner is required" | `experiments/02-mutants/app/server.js` líneas 12 y 89–93 |
| 8 | `'  ab  '` → 422 | Corrida local con `curl` contra la app (puerto 4392 en la copia) |
| 9 | Fronteras B-1…B-4 (2→422, 3→201, 80→201, 81→422) | `experiments/01-ai-verdict/fixtures/story-US-42.json`; verificado con `curl` en corrida local |
| 10 | El mutante `boundary` solo manda 81 caracteres; `drop-input` quita el dueño; `reorder` publica antes de aprobar (409) | `experiments/02-mutants/tests/scenarios.ts` |
| 11 | "Un valor límite movido en 1 es justo la mutación que tu suite debería matar" | `m2.mut` |
| 12 | Matriz de permisos 4 × 4 y regla de precedencia 403 > 422 > 409; "la UI esconde botones; la API es el contrato" | `experiments/03-second-brain/vault/03 Knowledge/Roles and permissions.md` |
| 13 | 3 condiciones → 2³ = 8 combinaciones en la tabla de decisión | `quiz-01-10.json` → m2 pregunta 2 (aplicado a crear) |
| 14 | Viewer crea un borrador → 201; viewer con título de 2 → 422 (esperado 403 por la matriz) | Corrida local con `curl` (login `viewer@demo.io` / `demo123`, `POST /api/docs`). En el código, la ruta `POST /api/docs` no consulta el rol (`app/server.js` líneas 89–97); `can` solo define `approve`, `publish` y `editMember` |
| 15 | Ninguno de los seis mutantes tocaba "viewer crea"; el séptimo, `viewer-create`, se agregó por este hallazgo y sobrevive con 201 → marcador 5/7, 2 sobrevivientes conocidos | `tests/scenarios.ts` en `5dc5e92` (role-swap es sobre `approve`) y en `a5386c8`; corrida local de `npm test` |
| 16 | Publicar un borrador → 409 "document must be approved before publishing"; aprobar algo que no es borrador → 409 | `app/server.js` líneas 103 y 113; publicar borrador verificado con `curl` en corrida local; aprobar no-borrador solo por lectura de código |
| 17 | 4 parámetros × 3 valores = 81; pairwise ≈ 9–12 casos; la mayoría de defectos de interacción involucra 2 parámetros | `quiz-01-10.json` → m2 pregunta 5 |
| 18 | Mínimo pairwise ≥ producto de los dos dominios más grandes (4 × 3 = 12) | Aritmética: cada pareja rol–acción debe aparecer en al menos un caso |
| 19 | PICT como herramienta recomendada | Recurso del módulo: https://github.com/microsoft/pict ; `m2.top` |
| 20 | Error guessing se alimenta de experiencia, bugs históricos y patrones | `quiz-01-10.json` → m2 pregunta 8 |
| 21 | DEF-001: regla rota, pasos, esperado 403, real 200, causa raíz, evidencia | `vault/03 Knowledge/DEF-001 self-grant role.md` |
| 22 | SBTM; reporte con pasos, esperado vs real, ambiente, logs | `m2.theory[2..3]`; `quiz-01-10.json` → m2 pregunta 3 |
| 23 | Typo "Bienvenidoss": severidad baja, prioridad alta | `quiz-01-10.json` → m2 pregunta 6 |
| 24 | `npm run app` en http://localhost:4310; usuarios y clave `demo123` | `experiments/02-mutants/README.md` §Run it |
| 25 | Marcador de `npm run test:mutants` | Corrida local; README de 02 §What you will see |
| 26 | Plantilla `99 Templates/Defect note` | `experiments/03-second-brain/vault/99 Templates/Defect note.md` |
| 27 | Mutación `TITLE_MAX = 81` → 1 fallida (boundary), "SURVIVED boundary … HTTP 201", 4/6 | Corrida local |
| 28 | Mutación `TITLE_MAX = 79` → sin cambios en la suite; punto ciego B-3 | Corrida local; `story-US-42.json` B-3 |
| 29 | Reto, criterios, entregable, nivel 4 con PICT | `m2.hands`, `m2.crit`, `m2.deliver`, `m2.top` |
| 30 | Rúbrica genérica y regla de aprobación (quiz 8 de 10, mínimo 6) | `ui.json` → `rubric.generic`, `module.evalNote`; `course.json` (`qn`, `qpass`) |
| 31 | Preguntas del quiz | `quiz-01-10.json` → m2 preguntas 1 (a=1), 4 (a=1), 6 (a=1) |
| 32 | Siguiente módulo: Setup día 0 | `course.json` posición 4 = `m3` |

## Comandos de la verificación local (copia, no el repo)

```
PORT=4392 node app/server.js
POST /api/auth/login {"email":"viewer@demo.io","password":"demo123"}
POST /api/docs {"title":"Q4 launch plan","owner":"editor@demo.io"}   → 201 (viewer)
POST /api/docs {"title":"ab","owner":"editor@demo.io"}               → 422 (viewer)
POST /api/docs títulos de 2/3/80/81 caracteres (editor)              → 422/201/201/422
POST /api/docs {"title":"  ab  ", …} (editor)                        → 422
POST /api/docs/:id/publish sobre un borrador (editor)                → 409
```

## No verificado

- No se corrió PICT (no está instalado en la máquina); no se muestra ninguna salida de PICT. El rango 9–12 viene del banco de preguntas del curso.
- No se grabó qué botones muestra la interfaz al viewer; el guion solo dice que la UI esconde botones y la API es el contrato (texto del vault).
- "Viewer crea un borrador → 201" es un hallazgo de esta preparación: no aparece en el README ni en el vault de war-paradigm. Conviene que Cris lo confirme antes de publicar el video y decida si lo abre como defecto en el repo.
- El caso de 80 caracteres que mataría la mutación a 79 se propone como reto; no se escribió ni se corrió.

# Fuentes · Módulo 02 · Parte 1 · ¿Qué es un mutante? (m30)

Parte 1 de 2 del módulo 02; la fuente completa del módulo sigue en `02-m30/`. "Corrida" = ejecutado el 27-oct-2026 con `render/salidas/capturas.sh` sobre un clon de `criguex/war-paradigm` @ `08438a2` (HEAD de main), Node v26.8.1, macOS. Las rutas de `m30.*` son de `qa-automation-course/i18n/es/modules-01-14.json`.

| # | Afirmación en el guion o en pantalla | Fuente |
|---|---|---|
| 1 | Posición 2, id `m30`, icono ⚔️, nivel ★★☆☆☆ | `qa-automation-course/course.json` → `modules[1]` |
| 2 | Marcador del gancho: KILLED role-swap 403; KNOWN SURVIVOR self-grant 200 y viewer-create 201; 5/7, 2 survived, 0 excluded | `render/salidas/demo02.txt` (corrida de `npm run demo:02`) |
| 3 | Un editor se cambia el rol a admin y recibe 200; todas las pruebas del camino feliz en verde | `experiments/02-mutants/README.md` §The finding |
| 4 | war-paradigm tiene tres experimentos | `war-paradigm/package.json` (workspaces 01, 02, 03); `README.es.md` |
| 5 | DocFlow: cuatro roles viewer, editor, approver, admin; flujo login → crear → aprobar → publicar | `experiments/02-mutants/app/server.js` (`ROLES`, `seedMembers`); README de 02 (golden flow) |
| 6 | Códigos: 200/201 éxito, 401 sesión vencida, 403 sin permiso, 409 publicar antes de aprobar, 422 dato mal hecho (título largo) | `app/server.js` (rutas de login, docs, approve, publish; `TITLE_MAX = 80`; `token expired`); `tests/scenarios.ts` |
| 7 | Analogía de los guardias; WAR viene del apellido Guerra | `m30.kid`, `m30.mentor`; `war-paradigm/README.es.md` §La idea (nota sobre el nombre) |
| 8 | Mutante de ejemplo: el approver aprueba → 200; role-swap (aprueba el viewer) espera 403 y observa 403 | `app/server.js` (approve devuelve 200 a approver/admin, 403 a los demás); `tests/scenarios.ts` (role-swap); `render/salidas/demo02.txt` |
| 9 | "No probamos el software. Probamos al que prueba"; suite, oráculo numérico, verificador formal y juez de IA son guardias | `war-paradigm/README.es.md` §La idea; `m30.theory[0]` |
| 10 | Cuatro pasos y sus ejemplos en física (Snell, índices intercambiados, oráculo independiente, tolerancia 10⁻⁶) y en flujo (solo lectura aprueba, Playwright contra la API, 403) | `war-paradigm/README.es.md` §El paradigma en cuatro pasos; `m30.theory[1]` |
| 11 | PASS, KILLED, SURVIVED; SURVIVED es bug real o punto ciego | `m30.theory[2]`, `m30.obj[3]` |
| 12 | Nueve modelos sintéticos; 84 variantes; 27 PASS, 54 KILLED (51 comportamientos distintos), 3 SURVIVED; idénticos en macOS arm64 y Linux x86_64; los SURVIVED son un cambio de RC diminuto, visible a propósito | `scientific-qa-evidence/README.es.md` líneas 50, 93 y 155 (clon @ `dbd7087`); `war-paradigm/README.es.md` §Pista 1; `m30.theory[3]` |
| 13 | Siete mutantes de 02 con su paso y su código esperado; observados 403, 422, 409, 401, 422, 200, 201 | `experiments/02-mutants/tests/scenarios.ts`; `render/salidas/demo02.txt` |
| 14 | Los mutantes son datos, uno por línea | README de 02 §Mutants are data, not scripts |
| 15 | Regla `editMember: (actor, target) => actor.role === 'admin' \|\| actor.id === target.id` (línea 58) | `experiments/02-mutants/app/server.js` |
| 16 | viewer-create se halló al preparar el curso; `POST /api/docs` no revisa el rol; conocidos impresos en rojo | README de 02 §The second finding y §Evidence, classification and score gate; `tests/scenarios.ts` (`known`) |
| 17 | Juez del experimento 01: 0 a 100, gate 70 y criterios must; sin pins 83 ✓, 74 ✓, 76 ✗ (dos escenarios sin fuente, editor que aprueba con 200) → UNSTABLE; con pins 86, 84, 87 → STABLE; pins = modelo con versión, temperatura 0, prompt con versión | `01-m1/render/salidas/demo01.txt` (misma HEAD `08438a2`); `m30.theory[5]`; `experiments/01-ai-verdict/README.md` §5 |
| 18 | Hook `PreToolUse` que sale con código 2 y bloquea `git push` a main; las reglas duras viven en hooks | `m30.theory[6]`; `experiments/03-second-brain/README.md` §Part 2; documentación oficial de hooks de Claude Code |
| 19 | Una mutación encontró `git -c` y `git --no-pager`, arreglados en `1b01c66` | `m30.theory[6]`; `git log` de war-paradigm: `1b01c66 fix(03): el hook bloquea push a main con opciones globales de git (-c, --no-pager, --git-dir)` |
| 20 | Cuatro reglas de una buena mutación; límite del kill rate; los mejores mutantes los siembra otra persona | `m30.theory[8]`, `m30.theory[9]` |

## Analogías (no son datos)

- Simulacro de incendio, lápiz en el vaso, boletín de notas, receta y horno, letrero y portero: imágenes para explicar, sin cifras propias.

## No verificado

- La igualdad macOS/Linux de la pista física se cita del README de scientific-qa-evidence; no se volvió a correr en Linux.
- El hilo del resto del curso (qa-eval-lab, agent-eval-jev, etc.) que traía `02-m30` se quitó de esta parte: sus cifras no se habían verificado en cada repo.

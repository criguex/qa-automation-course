# Fuentes · Módulo 02 · WAR Paradigm (m30)

Rutas relativas a los clones en `scratchpad/brand/`. "Corrida local" = ejecutado el 26-oct-2026 en una copia de `war-paradigm` (commit `5dc5e92`) o en el clon de `scientific-qa-evidence` (commit `c02e623`), Node v26.8.1, Python 3.9.6, macOS.

| # | Afirmación en el guion | Fuente |
|---|---|---|
| 1 | Posición 2, id `m30`, icono ⚔️, nivel ★★☆☆☆ | `qa-automation-course/course.json` → `modules[1]` |
| 2 | Flujo login → crear → aprobar → publicar en verde; un editor se cambia el rol a admin con 200 y puede aprobar y publicar solo | `war-paradigm/experiments/02-mutants/README.md` §The finding; `README.es.md` §Un ejemplo real |
| 3 | Analogía de los guardias; WAR viene del apellido Guerra | `m30.kid`, `m30.mentor`; `war-paradigm/README.es.md` §La idea (nota sobre el nombre) |
| 4 | "No probamos el software. Probamos al que prueba"; suite, oráculo, verificador formal, juez de IA son guardias | `war-paradigm/README.es.md` §La idea; `m30.theory[0]` |
| 5 | Cuatro pasos y sus ejemplos en física (Snell, índices intercambiados, oráculo independiente, tolerancia 10⁻⁶) y en flujo (usuario de solo lectura, Playwright contra la API, 403) | `war-paradigm/README.es.md` §El paradigma en cuatro pasos; `m30.theory[1]` |
| 6 | Definición de PASS, KILLED y SURVIVED; SURVIVED es bug real o punto ciego | `war-paradigm/README.es.md`; `m30.theory[2]`, `m30.obj[3]` |
| 7 | Nueve modelos sintéticos (lista) | `war-paradigm/README.es.md` §Pista 1; `scientific-qa-evidence/README.es.md` línea 153 |
| 8 | 84 variantes pareadas; 27 PASS, 54 KILLED (51 comportamientos distintos), 3 SURVIVED; idénticos en macOS arm64 y Linux x86_64; SURVIVED = mutación RC diminuta visible a propósito | `m30.theory[3]`; `scientific-qa-evidence/README.es.md` líneas 50, 93, 155 |
| 9 | Siete mutantes en 02 y sus códigos esperados (403, 422, 409, 401, 422, 403, 403); viewer-create se agregó al preparar el curso | `war-paradigm/experiments/02-mutants/tests/scenarios.ts` |
| 10 | "Mutantes son datos, no scripts"; una prueba recorre la lista | `experiments/02-mutants/README.md` §Mutants are data, not scripts |
| 11 | Regla `editMember: (actor, target) => actor.role === 'admin' \|\| actor.id === target.id` | `experiments/02-mutants/app/server.js` línea 58; README de 02 |
| 12 | Hallazgo conocido impreso en rojo; INVALID_BASELINE, INCONCLUSIVE, INFRA_ERROR fuera del puntaje; `npm run test:strict` | README de 02 §Evidence, classification and score gate; `experiments/02-mutants/package.json` (script `test:strict`) |
| 13 | JSON de evidencia con id, estado esperado/observado, revisión git, hashes SHA-256 de app, escenarios, runner, prueba y lockfile | README de 02 §Evidence, classification and score gate |
| 14 | Marcador 5/7 KILLED, 2 KNOWN SURVIVOR (self-grant, viewer-create), 0 excluidos | Corrida local de `npm run test:mutants` (puerto cambiado a 4391 en la copia para no chocar con otros procesos); README de 02 §What you will see |
| 15 | Arreglo `editMember: (actor) => actor.role === 'admin'` → `FIXED self-grant`, 6/7 (viewer-create sigue como KNOWN SURVIVOR) | README de 02 §Kill it yourself; corrida local en copia con el arreglo, revertida después |
| 16 | Experimento 01: Q1 en `checks.ts`, Q2 en `criteria.ts`/`scorer.ts`, gate 70; corrida 3 sin pins 76 REJECTED por AC-1 y AC-3; UNSTABLE; con pins 86/84/87 STABLE | `m30.theory[5]`; `experiments/01-ai-verdict/README.md` §5; corrida local de `npm run demo:01` |
| 17 | Hook `PreToolUse` que bloquea con exit 2 el push a main/master; "las reglas duras viven en hooks, no en prompts" | `m30.theory[6]`; `experiments/03-second-brain/README.md` §Part 2; `.claude/settings.json` |
| 18 | Casos que intentan colarse (encadenados, `HEAD:main`, `git -C`, push a secas en main, parsers jq/node/sed) | `experiments/03-second-brain/tests/hook.test.mjs`; salida de `npm run test:03` |
| 19 | Agujeros `git -c` y `git --no-pager` arreglados en `1b01c66` | `m30.theory[6]`; `git log` de war-paradigm: `1b01c66 fix(03): el hook bloquea push a main con opciones globales de git (-c, --no-pager, --git-dir)` |
| 20 | El mismo hilo en el curso: "Medellín" por "Bogotá" (qa-eval-lab), 15 defectos (agent-eval-jev), 6 fallos (jev-ci-triage), 6 regresiones en 20 commits (jev-test-impact), PII y headers (civica, POC 3), predictores saboteados (predictor-debugger P3a/P3b) | `m30.theory[7]` (citado tal cual del curso; no se verificó en cada repo para este video) |
| 21 | Cuatro reglas de una buena mutación | `m30.theory[8]`; `quiz-01-10.json` m30 pregunta 8 |
| 22 | Límite: kill rate alto solo prueba el catálogo; mejores mutantes los siembra otra persona (nivel 4) | `m30.theory[9]`; `quiz-01-10.json` m30 pregunta 10 |
| 23 | Comandos de preparación; Node 20+ y git | `m30.hands[0]`; `m30.pre`; `war-paradigm/package.json` (`engines`) |
| 24 | `npm run test:03` → 45 pruebas, 45 pasan (40 del hook, 6 de ellas límites conocidos que pasan con exit 0, + 5 del vault) | Corrida local; README del experimento 03 §Known limits |
| 25 | Salida de `npm run demo:03` (seis comandos) y del `echo … | ./hooks/block-push-to-main.sh; echo $?` → mensaje y `2` | Corrida local; README de 03 §Part 2 (misma tabla) |
| 26 | `python3 -m unittest test_runner` → "Ran 7 tests … OK"; una prueba vuelve a correr la campaña y afirma 27/54/3 contra lo guardado en macOS | Corrida local; `scientific-qa-evidence/evidence/numerical/source/test_runner.py` (`test_rerun_reproduces_saved_campaign`, `SAVED = …/paired/macos-arm64`) |
| 27 | Mutación de la semana: S-2 `actor` `approver` → `editor` en `pinned/run-2.json` | `m30.hands[2]`, `m30.mut` |
| 28 | Resultado: AC-3 failed, 84, REJECTED; UNSTABLE con flips en corrida 2 y 3; `test:01` 3 fallidas (generator:22, scorer:19, stability:19), 1 saltada, 24 pasadas; restaurado → 27 pasadas | Corrida local con la mutación aplicada y revertida |
| 29 | Reto, criterios, entregable, rúbrica de 4 filas | `m30.hands`, `m30.crit`, `m30.deliver`, `m30.rubm`; `ui.json` → `rubric.allRows` |
| 30 | Quiz 8 de un banco de 10, mínimo 6 | `course.json` (`qn: 8`, `qpass: 0.75`); `ui.json` → `module.evalNote` |
| 31 | Preguntas del quiz y respuestas | `quiz-01-10.json` → m30 preguntas 2 (a=1), 6 (a=1), 7 (a=0) |
| 32 | Siguiente módulo: diseño de pruebas; "cada técnica es una fábrica de mutantes" | `course.json` posición 3 = `m2`; `m2.mut` |

## No verificado

- Las cifras de los otros repos del curso (fila 20) se citan del texto del módulo; no se abrieron esos repos para este paquete.
- La pista física no se volvió a correr en Linux: la igualdad macOS/Linux se cita del README de scientific-qa-evidence.
- La corrida de experimento 02 se hizo en una copia con el puerto 4310 cambiado a 4391 (solo infraestructura, para no chocar con otros agentes). La salida del marcador no muestra el puerto.
- No se corrió `npm ci` ni `npx playwright install` desde cero (el clon ya tenía dependencias y navegadores).

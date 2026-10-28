# Fuentes · Módulo 02 · Parte 2 · Manos a la obra (m30)

Parte 2 de 2 del módulo 02; la fuente completa del módulo sigue en `02-m30/`. "Corrida" = ejecutado el 27-oct-2026 con `render/salidas/capturas.sh` sobre un clon de `criguex/war-paradigm` @ `08438a2` (HEAD de main) y otro de `criguex/scientific-qa-evidence` @ `dbd7087`, Node v26.8.1, Python 3.9.6, macOS. El script aplica cada cambio, guarda la salida y lo revierte; `git status` queda limpio. Las rutas de `m30.*` son de `qa-automation-course/i18n/es/modules-01-14.json`.

| # | Afirmación en el guion o en pantalla | Fuente |
|---|---|---|
| 1 | Comandos de preparación; Node 20 o superior y git; `npm test` corre los tres experimentos | `m30.hands[0]`; `m30.pre`; `war-paradigm/package.json` (`engines`, `test`) |
| 2 | Marcador de `npm test`: 5 KILLED (403, 422, 409, 401, 422), self-grant 200 y viewer-create 201 KNOWN SURVIVOR; 5/7, 2 survived, 0 excluded | `render/salidas/npm_test.txt` |
| 3 | Solo KILLED y SURVIVED cuentan; INVALID_BASELINE, INCONCLUSIVE e INFRA_ERROR quedan fuera; el conocido deja la corrida en verde y se imprime en rojo; `test:strict` | README de 02 §Evidence, classification and score gate; `experiments/02-mutants/package.json` (`test:strict`) |
| 4 | `test-results/mutant-evidence.json` con código esperado y observado, revisión de git y hashes SHA-256 | README de 02 §Evidence, classification and score gate; `npm_test.txt` (`JSON evidence: …`) |
| 5 | Arreglo `editMember: (actor) => actor.role === 'admin',` (línea 58) | README de 02 §Kill it yourself; `render/salidas/arreglo.diff` |
| 6 | Con el arreglo: FIXED self-grant 403, viewer-create sigue KNOWN SURVIVOR 201, 6/7 | `render/salidas/arreglo_demo02.txt` |
| 7 | Quitar el campo `known` cuando el hallazgo se cierra | README de 02 §Kill it yourself |
| 8 | `npm run test:03`: 45 pruebas, 45 pasan; seis fijan límites conocidos (variable, alias, `sh -c`, `bash -c`, `eval`) | `render/salidas/test03.txt` (bloque «known limits: these get through», 6 casos) |
| 9 | `npm run demo:03`: tres BLOCKED (exit 2) y tres allowed (exit 0) | `render/salidas/demo03.txt` |
| 10 | Intento manual: mensaje de bloqueo y código 2 | `render/salidas/hook_manual.txt`; comando de `m30.hands[3]` con el JSON en la variable `J` (misma entrada) |
| 11 | `python3 -m unittest test_runner`: 7 pruebas, OK, 0,166 s; una vuelve a correr la campaña y exige 27/54/3 | `render/salidas/sqe_unittest.txt`; `scientific-qa-evidence/evidence/numerical/source/test_runner.py` (`assertEqual(summary["counts"], {"KILLED": 54, "PASS": 27, "SURVIVED": 3})`) |
| 12 | Mutación de la semana: un editor que aprueba con 200; S-2 `actor` de `approver` a `editor` en `pinned/run-2.json` | `m30.mut`, `m30.hands[2]`; `render/salidas/mutacion.diff` |
| 13 | Hojas de la profe: S-1 201, S-3 403, S-5 409, S-6 403 del plan; matriz: crear 201, aprobar solo approver/admin (editor → 403) | `experiments/01-ai-verdict/fixtures/runs/pinned/run-2.json`; `fixtures/story-US-42.json` (`permissions`); `mut_demo_pinned.txt` («matrix says forbidden → 403») |
| 14 | Resultado: AC-3 failed, 84, REJECTED; set UNSTABLE con cambio en la corrida 2 y vuelta en la 3 | `render/salidas/mut_demo_pinned.txt` |
| 15 | `npm run test:01` con la mutación: 3 failed, 1 skipped, 24 passed; restaurado: 1 skipped, 27 passed | `render/salidas/mut_test01.txt`, `restaurado_test01.txt` |
| 16 | Entregable, criterios y rúbrica de cuatro filas (nivel 3 de cada una) | `m30.deliver`, `m30.crit`, `m30.rubm`; `ui.json` → `rubric.levels`, `rubric.allRows` |
| 17 | Quiz de 8, mínimo 6 | `course.json` (`qn: 8`, `qpass: 0.75`); `ui.json` → `module.evalNote` |
| 18 | Preguntas del quiz y respuestas | `quiz-01-10.json` → m30 preguntas 2 (a=1), 6 (a=1), 7 (a=0) |
| 19 | Siguiente módulo: diseño de pruebas; "cada técnica es una fábrica de mutantes" | `course.json` posición 3 = `m2`; `m2.mut` |

## No verificado

- No se corrió `npm ci` ni `npx playwright install` desde un equipo limpio: el script corre `npm ci` sobre el clon, y los navegadores de Playwright ya estaban instalados.
- Las predicciones de las notas amarillas (arreglo de self-grant y mutación de S-2) salen del README y de `m30.mut`; no se subieron en un commit propio antes de correr. En el video la predicción en un commit se presenta como instrucción para el estudiante.
- El tiempo de `Ran 7 tests in 0.166s` puede variar en otra máquina.

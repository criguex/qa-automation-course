# Fuentes · 20-m15 · Mutation testing — kill rate, sobrevivientes y Stryker/PIT

Repos leídos en `scratchpad/brand/` el 2026-10-26: war-paradigm (`5dc5e92`; salidas de experimento 02 actualizadas a `08438a2`, que ya trae `viewer-create`) y scientific-qa-evidence (HEAD de esa fecha). Corridas en macOS con Node 26.8.1 y Playwright 1.63.0.

| Afirmación en el guion | Fuente |
|---|---|
| El flujo dorado (login → crear → aprobar → publicar) está en verde; un editor se pone admin con HTTP 200 y aprueba y publica solo; todo el camino feliz estaba verde mientras el hueco seguía abierto | `war-paradigm/experiments/02-mutants/README.md` §The finding |
| «Una suite verde puede ser excelente o puede estar dormida…»; el módulo es el hilo del curso | `i18n/es/modules-15-23.json` → `m15.mentor` |
| Analogía del guardia (KILLED / SURVIVED / se anota) | `m15.kid`; `war-paradigm/README.md` §Explained like you're 8 |
| «Test the tester, mutate reality» | `m15.mentor` |
| Cuatro pasos y ejemplos de cada columna; tres veredictos PASS / KILLED / SURVIVED con su definición | `war-paradigm/README.md` §The paradigm in four steps |
| Línea base primero y fuera del puntaje; un 5xx o un login caído nunca es KILLED | `m15.theory[1]`, `m15.crit[2]`; `experiments/02-mutants/README.md` («A failed reset, login or unmutated baseline is not a mutant result and is excluded from the score») |
| El runner hace reset, login y línea base antes de mutar un solo paso | `experiments/02-mutants/tests/scenario-runner.ts` (`executeScenario`) |
| Kill rate = KILLED / (KILLED + SURVIVED); 5 de 7, 71 % | `m15.theory[2]`; `quiz-20-27.json` → `m15` pregunta 2 |
| Track físico: 9 modelos sintéticos, oráculo independiente sin código compartido, tolerancia congelada; 84 variantes pareadas: 27 PASS, 54 KILLED, 3 SURVIVED; los 3 son un cambio diminuto del RC dejado visible; idéntico en macOS arm64 y Linux x86_64 | `war-paradigm/README.md` §Track 1; `scientific-qa-evidence/README.md` líneas 50, 93, 153-155 |
| «54 de 57» | Aritmética sobre los conteos anteriores (54 KILLED + 3 SURVIVED); el curso dice «54 KILLED y 3 SURVIVED de 57 mutantes» (`m15.theory[2]`) |
| 54 KILLED = 51 comportamientos distintos (dos mutantes acústicos idénticos) | `scientific-qa-evidence/README.md` línea 155; `m15.theory[5]` |
| Cobertura dice qué se ejecutó; mutantes dicen qué se verificó | `quiz-20-27.json` → `m15` pregunta 9 |
| Un SURVIVED se marca como fallo esperado, en rojo, y va al ledger; ledger = causa, dueño, siguiente paso | `m15.theory[3]`; `quiz-20-27.json` → `m15` pregunta 8 |
| Mutantes como datos, un cambio cada uno, con registro JSON (revisión y hashes) | `m15.theory[4]`; `experiments/02-mutants/README.md` §Mutants are data |
| Comandos del laboratorio (`npm ci`, `npx playwright install --with-deps chromium`, `npm run demo:02`) | `m15.hands[0]`; `war-paradigm/README.md`; `package.json` raíz (`demo:02`) |
| Salida de `npm run demo:02`: 5 pruebas unitarias, «Running 7 tests using 1 worker», 7 passed, marcador con 5 KILLED y KNOWN SURVIVOR self-grant y viewer-create, «5/7 scored mutants killed · 2 survived · 0 excluded from score» | Corrida propia 2026-10-26 sobre `08438a2`; mismo marcador en `experiments/02-mutants/README.md` §What you will see |
| `npm run test:strict -w experiments/02-mutants`: 2 failed, 5 passed, npm termina con código 1 | Corrida propia 2026-10-26; script `test:strict` en `experiments/02-mutants/package.json`; `tests/mutants.spec.ts` (`MUTANT_LAB_STRICT`) |
| Modo estricto para un gate de release | `quiz-20-27.json` → `m29` pregunta 5 («El modo estricto sirve, por ejemplo, para un gate de release») |
| Los siete mutantes y sus códigos; postcondición y campo `known` de self-grant; `viewer-create` con `as: 'viewer'` en `create` | `experiments/02-mutants/tests/scenarios.ts` |
| `editMember: (actor, target) => actor.role === 'admin' \|\| actor.id === target.id` reutiliza «los miembros pueden editar su propio perfil» | `experiments/02-mutants/app/server.js` línea 58; README §The finding |
| `mutant-evidence.json`: bloque run (gitSha, deterministic, randomSeed null, SHA-256 de 7 entradas), summary (total 7, scored 7) y el escenario self-grant con observedState u2/admin/editor | Archivo generado en la corrida del 2026-10-26; lista de entradas en `tests/scenario-evidence.ts` |
| Stryker: `npm init stryker@latest`, `npx stryker run` | https://stryker-mutator.io/docs/stryker-js/getting-started/ (consultada 2026-10-26) |
| PIT: `mvn test-compile org.pitest:pitest-maven:mutationCoverage`, reporte en `target/pit-reports/` | https://pitest.org/quickstart/maven/ (consultada 2026-10-26) |
| Estados de Stryker (Killed, Survived, No coverage, Timeout, Runtime error, Compile error, Ignored) y mutation score = detectados / válidos × 100 | https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/ (consultada 2026-10-26) |
| «Publicar sin aprobar» ya es el mutante `reorder` | `tests/scenarios.ts` (`order: ['create', 'publish']`, 409) |
| La matriz de roles no dice nada de aprobar el documento propio; sí dice que un viewer que crea un borrador recibe 403 | `war-paradigm/experiments/03-second-brain/vault/03 Knowledge/Roles and permissions.md` |
| Mutante `viewer-create` → SURVIVED con HTTP 201; marcador «5/7 scored mutants killed · 2 survived · 0 excluded from score» | Corrida propia 2026-10-26 en una copia local (`scratchpad/run19-24/war`), ejecutada por un asistente bajo dirección de Cristian; después se agregó al repo en `a5386c8` como segundo sobreviviente conocido |
| El servidor no revisa el rol al crear | `app/server.js` ruta `POST /api/docs`: valida título y owner, sin llamada a `can.*` |
| «Kill it yourself»: `editMember: (actor) => actor.role === 'admin'` → FIXED self-grant, 6/7, estricto con exit 1 por viewer-create | `experiments/02-mutants/README.md` §Kill it yourself; corrida propia sobre `a5386c8` con el arreglo (2026-10-26, revertida): «6/7 scored mutants killed · 1 survived · 0 excluded from score» |
| Reto, criterios, entregable y nivel 4 | `m15.hands`, `m15.crit`, `m15.deliver`, `m15.top` |
| Rúbrica de 4 niveles | `ui.json` → `rubric.generic` |
| Preguntas del quiz | `quiz-20-27.json` → `m15` índices 1, 2 y 8 |
| Siguiente módulo: m29 | `course.json` (posición 21) |

## Lo que no se verificó
- No se corrieron Stryker ni PIT: no hay ningún repo de Cristian que los use. Los comandos y estados vienen solo de la documentación oficial.
- No se corrió `npm run evidence` (video del sobreviviente en el navegador).
- El hallazgo `viewer-create` ya está en war-paradigm (`a5386c8`) como sobreviviente conocido, con su fila en `DocFlow - golden flow.md` y `Roles and permissions.md`; no tiene nota DEF-002 en el vault.
- La campaña del track físico no se re-ejecutó; los conteos son los publicados en los README.

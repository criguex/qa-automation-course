# Fuentes · Módulo 01 · Mentalidad QA (m1)

Rutas relativas a los clones en `scratchpad/brand/`. "Corrida local" = ejecutado el 26-oct-2026 en una copia de `war-paradigm` (commit `5dc5e92`), Node v26.8.1, macOS.

| # | Afirmación en el guion | Fuente |
|---|---|---|
| 1 | Posición 1 del curso, id `m1`, icono 🧠, nivel ★☆☆☆☆, semana 1 | `qa-automation-course/course.json` → `modules[0]` |
| 2 | Tesis "mueve tu tiempo de teclear a decidir"; "la IA amplifica al que sabe y confunde al que no" | `i18n/es/modules-01-14.json` → `m1.mentor`, `m1.theory[0]` |
| 3 | Analogía de la profe y la hoja de respuestas = oráculo | `m1.kid` |
| 4 | Cuatro verbos con autonomía IA: Crear alta, Ejecutar alta, Validar media, Certificar firma el humano | `m1.theory[1]` |
| 5 | Q1 en `src/checks.ts`; Q2 en `src/criteria.ts` y `src/scorer.ts` | `war-paradigm/experiments/01-ai-verdict/README.md` §1; `m1.theory[7]` |
| 6 | Ocho criterios, 3 must y 5 should con pesos 30/28/20/12/10; gate 70; must falla → REJECTED; puntaje < 70 → REJECTED | `experiments/01-ai-verdict/README.md` §3 y §4; `src/criteria.ts` (`GATE = 70`, `weight`) |
| 7 | Siete principios en el syllabus ISTQB; los cinco citados (exhaustivo imposible, temprano, agrupación, pesticida, falacia de ausencia de errores) | Recurso del módulo: https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/ ; `m1.theory[2]`; `i18n/es/quiz-01-10.json` → m1 preguntas 3, 4, 6, 7, 9 |
| 8 | "Un campo de 10 caracteres ya tiene más combinaciones que segundos tiene tu sprint" | `quiz-01-10.json` → m1 pregunta 4 (`why`) |
| 9 | Defecto en la spec cuesta una conversación; en producción, hotfix, soporte, reputación | `quiz-01-10.json` → m1 pregunta 6 (`why`) |
| 10 | Ejemplo del 80 % de bugs en 3 módulos | `quiz-01-10.json` → m1 pregunta 7 (enunciado hipotético, no es un dato medido) |
| 11 | Verificación vs validación; QA vs QC | `m1.theory[3]`; `quiz-01-10.json` → m1 preguntas 5 y 10 |
| 12 | Riesgo = probabilidad × impacto; pago del 90 % vs tooltip | `m1.theory[4]`; `quiz-01-10.json` → m1 pregunta 2 (escenario hipotético) |
| 13 | "La automatización … no es magia" | `m1.theory[5]` |
| 14 | Historia US-42: título 3–80 caracteres, publicar sin aprobar → 409, solo approver/admin aprueban | `experiments/01-ai-verdict/fixtures/story-US-42.json` (R-1, R-2, R-3, B-1…B-4) |
| 15 | Charter = misión, foco, tiempo + notas | `quiz-01-10.json` → m1 pregunta 8 |
| 16 | Perfil Quality Engineering / "AI QA Engineer" | `m1.theory[6]` |
| 17 | Comandos de preparación (`git clone`, `npm ci && npx playwright install --with-deps chromium`) y Node 20+ | `war-paradigm/README.es.md` §La idea; `package.json` (`engines.node >= 20`) |
| 18 | `npm run test:01` → 27 pasadas, 1 saltada (agente en vivo) | Corrida local; `experiments/01-ai-verdict/README.md` §Run it ("27 checks … +1 live-agent check, skipped without an agent") |
| 19 | Sin llave de API; corridas grabadas | `experiments/01-ai-verdict/README.md` §What is real, what is recorded |
| 20 | Set pinned: `planner-agent@2026.06`, temperatura 0, `test-plan@v3`; 86/84/87; STABLE 3/3; AC-5 parcial 2/4 (faltan B-2, B-3) | Corrida local de `npm run demo:01`; README del experimento §5 |
| 21 | Set unpinned: tres advertencias; 83/74/76; corrida 3 REJECTED por AC-1 (S-4 fuente vacía, S-6 fuente "chat") y AC-3 (S-3 editor → approve espera 200); UNSTABLE | Corrida local de `npm run demo:01`; README del experimento §5 |
| 22 | Nota `Test strategy` (tabla de capas + principios) y nota de sesión (Goal, What happened, Decisions, Next) | `experiments/03-second-brain/vault/01 QA process/Test strategy.md`; `vault/04 Sessions/2026-09-24 - mutants on DocFlow.md` |
| 23 | Ronda de 6 mutantes, 5 atrapados, 1 sobrevive, bug real de autorización (nota de sesión del 24-sep); hoy el marcador es 5/7 con `viewer-create`, hallado al preparar el curso | Nota de sesión (fila 22); `war-paradigm/experiments/02-mutants/README.md` (commit `a5386c8`) |
| 24 | Mutación: `source` de S-1 vacío en `pinned/run-1.json` → AC-1 failed, puntaje 86, REJECTED, set UNSTABLE; `test:01` 6 fallidas / 21 pasadas; restaurado 27 pasadas | Corrida local con la mutación aplicada y revertida (ver abajo). La misma mecánica está en `tests/scorer.spec.ts` → "a failed must rejects the artifact no matter the score" (sobre S-4) |
| 25 | Hilo "test the tester, mutate reality" | `m1.mut` |
| 26 | Reto, criterios, entregable y nivel 4 | `m1.hands`, `m1.crit`, `m1.deliver`, `m1.top` |
| 27 | Rúbrica genérica de 4 niveles; aprobar = reto nivel 3 + quiz; 8 preguntas de un banco de 10, mínimo 6 | `i18n/es/ui.json` → `rubric.generic`, `module.evalNote`; `course.json` → `qn: 8`, `qpass: 0.75`; banco m1 = 10 preguntas |
| 28 | Preguntas del quiz y respuestas | `quiz-01-10.json` → m1 preguntas 1 (a=1), 2 (a=0), 9 (a=2) |
| 29 | Siguiente módulo: WAR Paradigm | `course.json` → posición 2 = `m30`; `m30.title` |
| 30 | E05: el plan de US-42 tiene 11 o 12 escenarios por corrida; `test:01` corre en 1,3 s | `fixtures/runs/pinned/run-{1,2,3}.json` (11, 12, 12) y `unpinned/run-*.json` (11); `render/salidas/test01.txt` (`27 passed (1.3s)`) |
| 31 | E07: S-2, S-3, S-5, S-6 y S-7 de la corrida 3 sin pins con su código esperado; S-3 espera 200 y la historia dice 403 | `fixtures/runs/unpinned/run-3.json`; `fixtures/story-US-42.json` (`permissions.approve`, R-2, R-3) |
| 32 | E07: el supuesto "Editors may approve their own work when no approver is available" | `fixtures/runs/unpinned/run-3.json` → `assumptions` |
| 33 | E07: actor "superuser" → Q1 falla, puntaje 0 sin calcular | `tests/checks.spec.ts` "contract: unknown role, unknown action and bad status code are rejected"; `src/scorer.ts` (schema inválido → `score: 0`); `tests/scorer.spec.ts` "an artifact that fails Q1 is rejected before scoring" |
| 34 | E07: todos los must ✓, sin fronteras, sin dos de los tres negativos y sin riesgos → 40 < 70, rechazado | `tests/scorer.spec.ts` "a score below the gate rejects even when every must is met" (`score 40 below gate 70`) |
| 35 | E08: fronteras 2/3/80/81 | `fixtures/story-US-42.json` B-1…B-4 |
| 36 | E08: los dos sobrevivientes son de permisos (self-grant, viewer-create); el flujo feliz seguía verde con DEF-001 abierto; la nota de sesión cierra con agregar mutantes nuevos | `experiments/02-mutants/README.md` (commit `a5386c8`); `vault/03 Knowledge/DEF-001 self-grant role.md` §Evidence; `vault/04 Sessions/2026-09-24 - mutants on DocFlow.md` §Next (`interrupt` mutants) |
| 37 | E08: la falacia de la ausencia de errores se ilustra con un caso hipotético | Rotulado "hipotético" en pantalla y dicho en la voz |
| 38 | E09: la corrida 1 fijada cubre B-1 (S-11) y B-4 (S-10) y le faltan B-2 y B-3 | `fixtures/runs/pinned/run-1.json`; `render/salidas/demo01.txt` (AC-5) |
| 39 | E09: nadie mandaba un título de 80 y bajar el máximo a 79 dejaba la suite en verde; hoy `golden.spec.ts` lo prueba y con `TITLE_MAX = 79` falla con 422 | `experiments/02-mutants/README.md` §The boundary that was not tested y `tests/golden.spec.ts` (commit `a5386c8`) |
| 40 | E10: niveles API-first con Playwright `request` y flujo dorado con `page`; "the UI hides buttons; the API is the contract"; cambiar roles no es parte de US-42 | `vault/01 QA process/Test strategy.md` §Layers; `vault/03 Knowledge/Roles and permissions.md`; `fixtures/story-US-42.json` (`permissions` solo trae create, approve y publish) |
| 41 | E10: "no se automatiza la primera revisión de la pantalla de aprobación" | Decisión del ejemplo, no un dato del laboratorio (rotulado "ejemplo" y ⚠) |
| 42 | E11: un viewer crea un borrador y la app responde 201; la matriz dice 403; `POST /api/docs` no revisa el rol | Commit `a5386c8` (mutante `viewer-create`); `vault/03 Knowledge/Roles and permissions.md` |
| 43 | E11: pregunta abierta, ¿un approver aprueba su propio borrador? | `fixtures/story-US-42.json`: approver puede crear y aprobar; R-2 no menciona el borrador propio |
| 44 | E11: el hallazgo paso a paso (login como viewer, `POST /api/docs`, esperado 403, obtenido 201) | `vault/99 Templates/Defect note.md`; `vault/03 Knowledge/Test data - users.md` (`viewer@demo.io`); `vault/03 Knowledge/DocFlow - golden flow.md` (`POST /api/auth/login`) |
| 45 | E18: prueba con oráculo: viewer → `POST /api/docs/:id/approve`, espera 403, fuente R-2 | `fixtures/runs/pinned/run-1.json` → S-3 |

## Mutación de la semana: cómo se reprodujo

```
# copia local de war-paradigm, en experiments/01-ai-verdict
# S-1.source: "US-42/R-1" → ""
npm run demo:pinned        # run 1: AC-1 ✘ failed · score 86/100 · verdict REJECTED · must failed: AC-1
npx playwright test        # 6 failed · 1 skipped · 21 passed
# restaurar el archivo
npx playwright test        # 1 skipped · 27 passed
```

Pruebas que fallaron con la mutación: `generator.spec.ts:22`, `scorer.spec.ts:19`, `scorer.spec.ts:46`, `scorer.spec.ts:57`, `scorer.spec.ts:70`, `stability.spec.ts:19`.

## No verificado

- `guion.en.md` no tiene todavía la narración de E07 y E10 ni los cambios de E05, E08, E09, E11, E13, E14, E15 y E18: solo se renumeraron sus marcas.

- El texto actual del syllabus ISTQB CTFL v4.0 no se abrió en esta sesión: la lista de siete principios se cita por el recurso del módulo y por las preguntas del banco, que cubren cinco de ellos.
- La salida de `npm ci` y `npx playwright install` no se muestra: no se reinstaló nada (el clon ya tenía `node_modules`).
- La corrida local usó Node v26.8.1; el CI del repo usa Node 22 (`.github/workflows/ci.yml`). No se comparó la salida entre versiones.

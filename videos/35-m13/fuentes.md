# Fuentes · 35 · m13 · Tu carrera QA+IA: posicionamiento

Textos del curso: `qa-automation-course/i18n/es/modules-30-35.json` (`m13`), `quiz-28-35.json` (`m13`), `pages.json` (`eval`), `exam.json`. Repos leídos en sus clones locales: `restful-booker-quality-suite` @ `8d8f9c5`, `agent-eval-jev` @ `1a4e3b0`, `war-paradigm` @ `5dc5e92`, `predictor-debugger` @ `03223f7`.

Regla aplicada en este módulo: no hay cifras de salario ni datos personales. Lo único sobre Cristian que aparece son sus repos públicos y lo que dicen sus README (por ejemplo, que las tres máquinas de predictor-debugger son suyas).

## Afirmaciones del guion

| Escena | Afirmación | Fuente |
| --- | --- | --- |
| E01, E14, E15 | RB-001: XML con `Content-Type: text/html; charset=utf-8`; severidad Media / P1; esperado y observado; impacto en SDKs, gateways y validadores; comandos `curl` | `restful-booker-quality-suite/docs/DEFECTS.md`, RB-001 |
| E01, E07, E22 | No escalar con «cambien el servicio para que pase mi test»; evidencia (cURL + response), impacto y opciones | `m13.theory`; `quiz-28-35.json`, m13 pregunta 2 |
| E02, E21 | Pitch que posiciona: «diseño estrategia de calidad y superviso pruebas generadas por IA — este repo lo demuestra» | `quiz-28-35.json`, m13 pregunta 1 |
| E02, E08, E19 | Números que salen de un comando, no de un adjetivo; kill rate, acuerdo del juez con etiquetas de referencia, huellas | `m13.mut`, `m13.obj`, `m13.crit` |
| E03 | Analogía del dibujo | `m13.kid` |
| E04 | De QA manual → Quality Engineering → «AI QA Engineer»; el rol sube de escribir tests a diseñar estrategia y supervisar pruebas generadas por IA | `m13.theory`, `m13.mentor` |
| E05 | Agentic testing con Claude Code y Codex; MCP para conectarlos a tus herramientas; la firma sigue siendo humana | `m13.theory`; https://modelcontextprotocol.io/ |
| E05 | Hook, recibos y diff revisado en el capstone | `34-m12` (guion y fuentes) |
| E06 | «La automatización es el detector, no la razón; el beneficiario es el consumidor»; no señalar al dev | `m13.theory`; `quiz-28-35.json`, m13 pregunta 3 |
| E07 | Opciones de resolución (corregir el servicio, actualizar el contrato si es intencional, aclarar con el dueño) | Redacción del guion a partir de «opciones de resolución» de la pregunta 2 del quiz; no son datos |
| E09 | Portafolio de 2–3 repos con README de decisiones y pipeline verde; estructura de la historia de un bug | `quiz-28-35.json`, m13 preguntas 4 y 5 |
| E10 | Cobertura de riesgo; QA Automation frente a SDET; primeros 90 días; mantenerse vigente (TAU, MoT, proyectos pequeños con agentes y MCP) | `quiz-28-35.json`, m13 preguntas 6, 8, 9 y 10 |
| E11 | Titular con especialidad + prueba | `quiz-28-35.json`, m13 pregunta 7 |
| E12 | Pitch ≤ 2 min que cita un proyecto con enlace; el ejemplo usa war-paradigm (5/7, self-grant y viewer-create) | `m13.hands`, `m13.crit`; `war-paradigm/experiments/02-mutants/README.md` |
| E13 | Kill rate 5/7 | `war-paradigm/experiments/02-mutants/README.md`, «What you will see»; corrida local de `npm test` en `a5386c8` |
| E13 | Acuerdo del juez 0,931 (n = 29), gate, v1 0,18 bloqueada | Corrida propia, abajo |
| E13 | κ = 0,86 (0,8578) e intervalo 0,7804–0,9809 del compuesto en held-out; las etiquetas de referencia las redactó un asistente de IA y Cristian las revisó, sin registro caso por caso ni anotador independiente (`be15726`; `agent-eval-jev/RUBRIC.md` "Who labeled", commits 74d9360 y 2a424b8) | `agent-eval-jev/results/results.json`, `composite.held_out` (regenerado igual por la corrida propia); `agent-eval-jev/README.es.md`, tabla |
| E13 | Huella EEC9-09E0-F77D | `predictor-debugger/logs/linux/verify_saved.log` |
| E16 | Criterio de clasificación: defecto frente a punto de aclaración (`/ping` → 201, media types no soportados → 418) | `restful-booker-quality-suite/docs/DEFECTS.md`, «Defect classification criteria» |
| E17 | RB-002: `depositpaid` false guardado como true; severidad Alta / P1; causa probable `Boolean()` como hipótesis; impacto; fallo esperado que se pone rojo cuando lo arreglen | `restful-booker-quality-suite/docs/DEFECTS.md`, RB-002; `README.es.md`, «Un ejemplo real» |
| E18 | Sección «Límites» de predictor-debugger (máquinas propias, no independiente, hecho con asistentes de IA bajo dirección del autor) | `predictor-debugger/README.md`, «Límites» |
| E18 | La animación de agent-eval-jev reproduce la salida real de `evaluate` y `gate`, con fuente en `docs/scenes/how-it-works.html` y `docs/scenes/export.sh` | `agent-eval-jev/README.es.md`, «Cómo funciona» |
| E20 | Entregable, criterios y nivel 4 (README bilingüe con límites y animación desde un log real) | `m13.deliver`, `m13.crit`, `m13.top`; `pages.json`, `eval.s05` |
| E21–E23 | Preguntas 1, 2 y 6 del banco de m13 | `quiz-28-35.json`, `m13` |
| E24 | Examen final: 26 preguntas de escenario, se aprueba con 80 % | `pages.json`, `eval.s02`; `exam.json` (`final`, 26 entradas) |

## Corrida propia (2026-10-26)

Copia temporal de `agent-eval-jev` @ `1a4e3b0` en el scratchpad, Python 3.12.13 (el README pide 3.11+), sin dependencias:

```text
$ python3.12 -m agenteval evaluate
…
composite held-out accuracy 0.931 (n=29), threshold 0.67, margin 0.0
exit=0
$ python3.12 -m agenteval gate
judge held-out agreement: 0.931
agent v2 pass rate: 0.94, policy failures: 0
agent v1 pass rate: 0.18 (would be blocked by the same gate)
exit=0
```

Después de `evaluate`, `git status --short` quedó vacío: los `results/` y `reports/` regenerados son idénticos a los publicados.

## No verificado para este paquete

- Los comandos `curl` de RB-001 no se corrieron: necesitan el Restful Booker local en Docker (`127.0.0.1:3001`) y no se levantaron servicios para este paquete. La salida observada es la que registra `DEFECTS.md` (verificado por el autor el 16-oct-2026).
- `npm run demo:02` de war-paradigm: el 5/7 viene del README del experimento y de la corrida de `npm test` en la raíz (commit `a5386c8`).
- La descripción de MCP es general («protocolo abierto para conectar asistentes a herramientas y datos»); no se citó ninguna versión de la especificación.

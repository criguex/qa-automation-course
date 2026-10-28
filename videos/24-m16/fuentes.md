# Fuentes · 24-m16 · Evaluar IA con un LLM como juez

Repo leído: qa-eval-lab (`ec81933`, clon en `scratchpad/brand/`). Corridas el 2026-10-26 en una copia local (`scratchpad/run19-24/evallab`) con Playwright 1.64.1 (el `node_modules` del clon), Python 3.12 y deepeval 4.3.1 fijado a mano. No se corrió nada con una clave real de OpenAI. Las corridas las ejecutó un asistente bajo dirección de Cristian; el guion lo declara.

| Afirmación en el guion | Fuente |
|---|---|
| «La capital de Colombia es Medellin» contra la referencia «Bogota»; un assert de forma (status 200, campo existe) la deja pasar | `evals/test_llm_eval.py`; `quiz-20-27.json` → `m16` pregunta 9 |
| El check verde sin secreto no evalúa nada | `m16.theory[6]`; README §Limits y §Real results (CI history) |
| Analogía del profe y la trampa | `m16.kid`; README §Explained like you're 8 |
| Dos oráculos; determinista donde la especificación lo permite y juez donde no | `m16.theory[0]`; README («Deterministic where the spec allows it…») |
| GEval (Correctness) con su criterio y umbral 0,7; AnswerRelevancy 0,7 | `evals/test_llm_eval.py` |
| Faithfulness 0,7, ContextualRelevancy 0,6, ToolCorrectness con el umbral por defecto (0,5 en 4.3.1) | README §How verdicts are made; `m16.theory[1]` |
| Los 4 módulos y la falla que aísla cada uno (incluido el caso de las transferencias internacionales en RAG) | README §Modules |
| `dispute-window` y `card-blocked`: textos de pregunta, respuesta esperada y respuesta falsa | `evals/dataset.jsonl` líneas 2 y 5 |
| Una aserción ingenua las deja pasar; el juez debe reprobarlas (veredicto diseñado, no corrido) | README §The "false green" in action («the verdicts are the designed ones… not a recorded judge run») |
| `test_false_green_detectado` afirma `score < threshold`; juez simulado: 0,1 pasa, 0,9 falla, error queda en error | `evals/test_llm_eval.py`; README §Real results |
| Promptfoo: proveedor `openai:gpt-4o-mini`; `contains` Bogota, `llm-rubric`, `not-contains` Medellin; bloque `redteam` con `pii`, `harmful:misinformation`, `prompt-injection`, `jailbreak`; se corre aparte con `npx promptfoo@latest redteam run` | `evals/promptfooconfig.yaml`; README §Run it; `quiz-20-27.json` → `m16` preguntas 5 y 6 |
| `skips-balance-check` saca 0,67 contra 0,5 y pasa; el README deja el umbral y lo explica | README §Real results y §Limits; `m16.theory[5]` |
| eval-gate: `ui-tests` siempre; `llm-evals` con `::notice title=LLM eval skipped::` si no hay `OPENAI_API_KEY`; DeepEval y Promptfoo con `if: env.OPENAI_API_KEY != ''`; `pip install` siempre | `.github/workflows/eval-gate.yml` |
| Las cinco corridas del 26-sep en rojo; verde desde el 26-oct con el notice (run 40373649268) | README §Real results (CI history) |
| Un check rojo solo bloquea si es obligatorio; `main` sin protección de rama | README §Limits; `m16.theory[6]` |
| Node 26: `npm install` falla con `better-sqlite3`; CI usa Node 20; `npm install --ignore-scripts` basta para Playwright | README §Limits; `eval-gate.yml` (`node-version: '20'`) |
| `npm run test:ui` → 3 passed (authenticate, sesión reutilizada, logout), exit 0, contra the-internet.herokuapp.com | Corrida propia 2026-10-26 en la copia; README §What's inside y §Limits |
| `calibrate_judge.py` imprime «illustrative sample, not a measured run» y luego 8/10, κ 0,58; exit 0 | Corrida propia 2026-10-26 sobre qa-eval-lab `868d986` (Python 3.12 con pandas y scikit-learn) |
| Las dos columnas de `labeled_sample.csv` se escribieron a mano como ejemplo; 5 de 10 `case_id` (intl-wire, refund-policy, 2fa-enable, daily-atm-limit, loan-eligibility) no están en `dataset.jsonl`; el README lo presentó como resultado real hasta el 26-oct | `git log -- evals/calibration` (solo `1c07cbb`, 26-sep); cruce de ids con `evals/dataset.jsonl`; README §Real results y §Limits en `868d986`; `m16.theory[3]` |
| `requirements.txt` pide `deepeval>=1.0.0` | `evals/requirements.txt` |
| DeepEval 4.3.1 no importa en Python 3.9 (`TypeError: unsupported operand type(s) for |`); el README pide Python 3.10+ | Intento propio con Python 3.9.6 el 2026-10-26; README §Run it (Prerequisites) |
| Módulo 3 con clave de relleno: 2 passed, Pass Rate 100 %, happy-path-transfer 1.0, skips-balance-check 0.67 PASSED, exit 0; DeepEval exige la variable aunque no llame a la API | Corrida propia 2026-10-26; README §Modules («Module 3 makes no API call, but DeepEval 4.3.1 refuses to build the metric unless `OPENAI_API_KEY` is set») |
| Comandos con clave | `m16.hands[2]`; README §Run it |
| El workflow solo corre `test_llm_eval.py` y `promptfooconfig.yaml`; módulos 1-4 y red-team a mano | README §Limits; `eval-gate.yml` |
| Juez dormido (0,9) → «1 failed»; juez en 0,1 → «1 passed»; clave vacía → «DeepEvalError: OpenAI API key is empty» al recolectar | `m16.mut`; corridas propias en la copia, 2026-10-26 |
| Ejercicio, criterios y rúbrica de 4 filas | `m16.hands[4]`, `m16.crit`, `m16.deliver`, `m16.rubm`; `ui.json` → `rubric.allRows` |
| Preguntas del quiz | `quiz-20-27.json` → `m16` índices 0, 2 y 7 |
| Siguiente módulo: m17 | `course.json` (posición 25) |

## Lo que no se verificó
- No se corrió el juez real (DeepEval con OpenAI ni Promptfoo): sin `OPENAI_API_KEY`. Ningún puntaje del juez sobre `dispute-window`, `card-blocked` o la trampa de Medellín sale de una corrida real; el guion lo dice.
- No se reprodujo el fallo de `npm install` en Node 26 (la copia usó el `node_modules` ya instalado del clon).
- No se verificó en GitHub que `main` siga sin protección de rama ni el estado actual de la corrida 40373649268; se cita el README.
- No se leyeron las páginas de DeepEval, Promptfoo, OWASP ni el artículo de Husain; solo se enlazan.

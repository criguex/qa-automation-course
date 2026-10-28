# Fuentes · Módulo 05 · Obsidian — tu segundo cerebro (m3b)

Rutas relativas a los clones en `scratchpad/brand/`. "Corrida local" = ejecutado el 26-oct-2026 sobre `war-paradigm` (commit `5dc5e92`) o una copia, Node v26.8.1, macOS.

| # | Afirmación en el guion | Fuente |
|---|---|---|
| 1 | Posición 5, id `m3b`, icono 🧠, nivel ★★☆☆☆ | `qa-automation-course/course.json` → `modules[4]` |
| 2 | IA sin contexto: "clean code, correct syntax, tests nothing that matters"; "the fix wasn't a better prompt" | `war-paradigm/experiments/03-second-brain/README.md` (Specimen y párrafo siguiente) |
| 3 | Los escenarios volvieron con roles, códigos y datos del vault | `vault/04 Sessions/2026-09-24 - mutants on DocFlow.md` |
| 4 | Analogía del cuaderno de la clase | `m3b.kid` |
| 5 | "La IA sin contexto es un becario brillante con amnesia"; antes que la IA va la documentación | `m3b.mentor` |
| 6 | Bucle virtuoso y sus cinco pasos | `m3b.theory[1]`; README de 03 §The loop the vault supports |
| 7 | Documentación viva vs muerta | `quiz-01-10.json` → m3b pregunta 9 |
| 8 | Tres capas: CLAUDE.md, memoria persistente, Obsidian | `m3b.theory[2]`; `quiz-01-10.json` → m3b preguntas 2 y 8 |
| 9 | Sin secretos en CLAUDE.md | `m3b.crit[2]`; `quiz-01-10.json` → m3b pregunta 7 |
| 10 | "Da el contexto suficiente, no todo"; ejemplo del API de pagos | `m3b.theory[3]`; `quiz-01-10.json` → m3b preguntas 1 y 10 |
| 11 | READ FIRST = "the map, not the territory" | `vault/00 - READ FIRST.md` |
| 12 | MCP = protocolo estándar para conectar herramientas y datos al modelo | `quiz-01-10.json` → m3b pregunta 6; https://modelcontextprotocol.io/ |
| 13 | Bug de 4 horas → nota con causa raíz, solución y prevención | `quiz-01-10.json` → m3b pregunta 5 |
| 14 | Hooks = "cosas que pasan solas" | `m3b.theory[4]`; `quiz-01-10.json` → m3b pregunta 3 |
| 15 | `.claude/settings.json` registra `PreToolUse` con matcher `Bash` → `hooks/block-push-to-main.sh`; exit 2 bloquea y el asistente ve stderr | `experiments/03-second-brain/.claude/settings.json`; README de 03 §Part 2 |
| 16 | Golden rules regla 5 ("Hard rules live in hooks… open a pull request") | `vault/Golden rules.md` |
| 17 | La suite del hook usa repos de git temporales, en main y en rama, con jq/node/sed | README de 03 §Part 2 ("proves each case against real temporary git repos, on main and on a feature branch, for all three parsers") |
| 18 | 14 notas; estructura de carpetas | README de 03 §Part 1; `find vault -name '*.md' \| wc -l` = 14 |
| 19 | Tabla "Where things live" del READ FIRST | `vault/00 - READ FIRST.md` |
| 20 | Nueve Golden rules; reglas 4, 7 y 9 citadas | `vault/Golden rules.md` |
| 21 | Plantilla de sesión: Goal, What happened, Decisions, Next | `vault/99 Templates/Session note.md` |
| 22 | "Structure beats volume" y "one note, one question" | README de 03 §Part 1 |
| 23 | Nota `Design scenarios with AI` (lecturas previas, "do not invent roles or data") y frontmatter type/status/tags | `vault/02 Workflows/Design scenarios with AI.md` |
| 24 | Definición de hecho de una historia (lista completa) | `vault/01 QA process/Definition of done for a story.md` |
| 25 | Tabla "Palabras difíciles" / "Hard words" | `war-paradigm/README.es.md`, `README.md` |
| 26 | Cinco chequeos de `vault-links.test.mjs`; resolución por nombre; regla de islas | `experiments/03-second-brain/tests/vault-links.test.mjs` |
| 27 | `npm run test:03` → 45 de 45 (40 del hook + 5 del vault, war-paradigm `08438a2`) | Corrida local |
| 28 | `Test data - users` la enlazan 6 notas (las seis nombradas); es una de las más enlazadas (4.ª, empatada) | `grep -rl` y conteo de enlaces entrantes sobre el vault (Roles and permissions 12, DocFlow - golden flow 10, DEF-001 7, Test data - users 6) |
| 29 | Mutación: sin la nota → 44 pasan, 1 falla ("every [[wikilink]] resolves…") con la lista de 6 enlaces; restaurada → 45 | Corrida local en copia (nota movida fuera del vault y devuelta) |
| 30 | Enlace a nota futura = marcador de trabajo pendiente | `quiz-01-10.json` → m3b pregunta 4 |
| 31 | Reto, criterios, entregable, nivel 4 | `m3b.hands`, `m3b.crit`, `m3b.deliver`, `m3b.top` |
| 32 | Rúbrica genérica y regla de aprobación | `ui.json` → `rubric.generic`, `module.evalNote`; `course.json` (`qn`, `qpass`) |
| 33 | Preguntas del quiz | `quiz-01-10.json` → m3b preguntas 2 (a=1), 3 (a=1), 7 (a=2) |
| 34 | Siguiente módulo: TypeScript para QA | `course.json` posición 6 = `m4` |

## No verificado

- El `CLAUDE.md` de E11 es un ejemplo de forma escrito para el video, no un archivo de un repo; está rotulado como "ejemplo".
- Los textos del lado "genérico" de E01 son ilustración; no hay una salida grabada de un asistente sin contexto en el repo.
- No se abrió Obsidian para grabar: la escena E08 debe grabarse con el vault real.
- La documentación de MCP y de Claude Code no se consultó en esta sesión; la definición de MCP sale del banco de preguntas del curso.

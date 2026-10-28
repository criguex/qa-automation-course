# Fuentes · 18-m11 · QA aumentado con IA

Clon leído el 26-oct-2026: war-paradigm (5dc5e92). Textos del curso: `i18n/es/modules-15-23.json` → `m11` y `i18n/es/quiz-11-19.json` → `m11`. Documentación externa consultada el 26-oct-2026: Claude Code hooks y GitHub Copilot custom instructions.

| # | Afirmación del guion | Fuente |
|---|---|---|
| 1 | Flujo dorado login → crear → aprobar → publicar; 7 mutantes; 5 KILLED (403, 422, 409, 401, 422), self-grant aceptado con HTTP 200 y viewer-create aceptado con HTTP 201 (hallado al preparar el curso) | `war-paradigm/experiments/02-mutants/README.md` §What you will see |
| 2 | Un editor puede ponerse admin y aprobar y publicar solo; todo el camino feliz estaba en verde | `02-mutants/README.md` §The finding; `03-second-brain/vault/03 Knowledge/DEF-001 self-grant role.md` |
| 3 | Cuando el código y sus pruebas salen del mismo lugar, un verde demuestra menos | `war-paradigm/README.es.md` §Por qué; `m11.mut` |
| 4 | La IA amplifica al que sabe y confunde al que no; por eso el módulo va al final | `m11.mentor`; `quiz m11[7]` |
| 5 | Analogía del ayudante rápido que se equivoca muy seguro | `m11.kid` |
| 6 | IA directora planea, IA del IDE ejecuta, tú = criterio; funciona con cualquier par | `m11.theory[0]`, `[1]`; `quiz m11[0]` |
| 7 | Archivo de instrucciones de Copilot en `.github/copilot-instructions.md`; rules de Cursor; «el CLAUDE.md del IDE» | https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions; `m11.theory[2]`; `quiz m11[6]` |
| 8 | Contexto antes que prompt; 3 capas (CLAUDE.md, memoria persistente, Obsidian) | `m11.theory[4]`, `[6]` |
| 9 | Espécimen del experimento 03: pruebas genéricas; el arreglo fue contexto escrito, no un mejor prompt; estructura de la bóveda | `war-paradigm/experiments/03-second-brain/README.md` |
| 10 | Regla de oro 4 (no inventar), 5 (no saltarse el hook, abrir PR), 6 (veredicto por fallo, no arreglar pruebas contra respuestas malas), 7 (verde tres veces) | `03-second-brain/vault/Golden rules.md` |
| 11 | «Structure beats volume», «One note, one question»; `tests/vault-links.test.mjs` falla con enlaces rotos, sin frontmatter o notas aisladas | `03-second-brain/README.md` §Part 1 |
| 12 | Cinco bloques del prompt; cada bloque elimina una clase de fallo | `m11.theory[3]`; `quiz m11[3]` |
| 13 | Pedido real de la nota «Design scenarios with AI» (contexto previo, US-42, campos de salida, negativo por acción protegida, 4 bordes, no inventar) y qué hacer después (puntuar, correr 3 veces) | `03-second-brain/vault/02 Workflows/Design scenarios with AI.md` |
| 14 | Prompt packs con huecos `<...>`, «de 10 min a 1» | `m11.theory[5]`; `quiz m11[4]` |
| 15 | La IA se equivoca con seguridad; revisar siempre el diff | `m11.theory[7]`; `quiz m11[2]` |
| 16 | Tres vicios: aserciones débiles, esquemas relajados, selectores frágiles | `quiz m11[9]` |
| 17 | Endpoint inventado `POST /users/validate`; el contrato como insumo | `quiz m11[5]` |
| 18 | Test mental de delegación (4 preguntas) y ejemplos | `m11.theory[8]`; `quiz m11[1]`, `m11[7]` |
| 19 | `.claude/settings.json` registra un hook `PreToolUse` para `Bash` que ejecuta `hooks/block-push-to-main.sh` | `03-second-brain/.claude/settings.json` |
| 20 | El script sale con 2 cuando el destino es main/master; seis casos BLOCKED/allowed; entiende refspecs, force, encadenados, `git -C`, push a secas; jq → node → sed; pruebas contra repos git temporales | `03-second-brain/README.md` §Part 2 |
| 21 | En PreToolUse, exit 2 bloquea la llamada y el stderr acompaña el bloqueo | https://code.claude.com/docs/en/hooks |
| 22 | 40 casos de prueba del hook, incluidos encadenados y opciones globales de git; 6 límites conocidos pasan con exit 0 | `war-paradigm/README.es.md` §03; `03-second-brain/README.md` (`npm test # 45 checks`, §Known limits) |
| 23 | Experimento 01: dos oráculos, must bloquea, should suma, gate 70 | `war-paradigm/experiments/01-ai-verdict/README.md` §The method |
| 24 | Salida de `npm run demo`: pinned 86/84/87 STABLE; unpinned 83/74/REJECTED 76 UNSTABLE con dos avisos; la corrida 3 supera el gate y se rechaza por must | `01-ai-verdict/README.md` §5 |
| 25 | Las seis corridas son fixtures escritos a mano; lo real es el código que califica; adaptador `MUTANT_LAB_GENERATOR_CMD` | `01-ai-verdict/README.md` §What is real, what is recorded y §Plug in a real agent |
| 26 | MCP conecta herramientas; Playwright MCP maneja un navegador real; aparece en vacantes de QA | `m11.theory[9]`; `quiz m11[8]`; https://modelcontextprotocol.io/; https://github.com/microsoft/playwright-mcp |
| 27 | Laboratorio, criterios, entregable, mutación y nivel top | `m11.hands`, `m11.crit`, `m11.deliver`, `m11.mut`, `m11.top` |
| 28 | `MUTANT_LAB_STRICT=1` hace fallar la corrida con cada sobreviviente; arreglo `editMember: (actor) => actor.role === 'admin'` → FIXED con 403 | `02-mutants/README.md` §Evidence… y §Kill it yourself |
| 29 | Causa raíz de DEF-001: reutiliza la regla de editar el propio perfil | `03-second-brain/vault/03 Knowledge/DEF-001 self-grant role.md` §Root cause |
| 30 | Mini-quiz | `i18n/es/quiz-11-19.json` y `i18n/en/quiz-11-19.json` → `m11[1]`, `m11[2]`, `m11[5]` |
| 31 | Siguiente módulo: m14 «QA asistida por IA I — el asistente prueba, la persona firma» | `course.json` posición 19; `i18n/es/modules-15-23.json` → `m14.title` |

## Sin verificar en esta sesión

- No corrí `npm run demo:01`, `npm run demo:02` ni el `npm test` del experimento 03: el entorno de esta sesión bloqueó ejecutar código de los repos. Las salidas de E01, E11 y E12 son las que documentan los README de cada experimento.
- «La combinación Playwright + MCP + asistente aparece cada vez más en vacantes de QA» y «de 10 min a 1» son afirmaciones del curso, sin un dato medido en un repo.

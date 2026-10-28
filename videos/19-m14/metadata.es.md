# Metadata ES · 19-m14

## Título
QA con IA: el asistente prueba, tú firmas (hooks y CI)

## Descripción
Un hook que bloqueaba los push a main dejaba pasar `git -c core.x=y push origin main` con exit 0. Lo encontró una mutación y se arregló en el commit 1b01c66 de war-paradigm. En este video te muestro dónde tienen que vivir las reglas que no se negocian cuando trabajas con un asistente como Claude Code o Codex, cómo atacar tu propio hook y qué cuenta como evidencia: comando, hash y exit code.

Módulo 19 del curso de QA Automation (m14 · QA asistida por IA I). Laboratorio sin claves: war-paradigm, experimento 03.

Capítulos
00:00 Un push a main que se colaba
00:44 Explicado para un niño de 8 años: petición vs. reja
01:48 El asistente diseña, ejecuta y audita; tú decides y firmas
03:26 Reglas en hooks y CI: exit 0, exit 2 y el exit 1 que no bloquea
05:09 El hook real del experimento 03
06:39 Contexto versionado: CLAUDE.md, AGENTS.md y el vault
08:17 Evidencia = comando + hash + exit code
09:40 Fail-safe y autoría declarada
10:55 Laboratorio: npm run demo:03
12:20 Laboratorio: la suite de 33 ataques al hook
14:03 Mutación WAR: 9 intentos, 4 huecos
16:27 El reto y la rúbrica
17:56 Mini-quiz
19:09 Cierre y siguiente módulo

## Tags
QA automation, Claude Code, Codex, hooks, PreToolUse, GitHub Actions, protección de rama, evidencia reproducible, IA en testing, war-paradigm

## Texto de miniatura
¿Tu hook aguanta?

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m14
- Laboratorio: https://github.com/criguex/war-paradigm/tree/main/experiments/03-second-brain
- Commit del arreglo: https://github.com/criguex/war-paradigm/commit/1b01c66
- agent-eval-jev (evidencia con hash y CI que reconstruye el reporte): https://github.com/criguex/agent-eval-jev
- jev-test-impact (fail-safe a suite completa): https://github.com/criguex/jev-test-impact
- predictor-debugger (autoría declarada): https://github.com/criguex/predictor-debugger
- Docs de hooks de Claude Code: https://code.claude.com/docs/en/hooks
- Claude Code en GitHub Actions: https://code.claude.com/docs/en/github-actions
- Codex CLI: https://github.com/openai/codex
- Siguiente módulo: https://criguex.github.io/qa-automation-course/#/m15

Cristian Guerra · QA · Medellín

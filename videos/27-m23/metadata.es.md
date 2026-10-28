# Metadata ES · m23

**Título:** QA con asistentes de IA: hooks, evidencia y firma humana

**Texto de miniatura:** Main estaba abierto

## Descripción

Mi hook bloqueaba los push a main y tenía decenas de pruebas en verde, pero `git -c core.x=y push origin main` pasaba con exit 0. En este módulo del curso de QA uso asistentes de IA para diseñar, ejecutar y auditar, y pongo las reglas duras en hooks, no en prompts. También publico la evidencia con comando, hash y exit code, y declaro lo que no se ejecutó. Con war-paradigm (experimento 03) y scientific-qa-evidence.

Capítulos:
00:00 Un push a main que pasaba con exit 0
01:05 Explicado para un niño de 8 años
01:54 El reparto: el asistente ejecuta, la persona firma
02:50 Reglas en código, no en prompts
04:32 Laboratorio A: el hook en acción
05:29 El hook también es un guardia
06:14 Reproducir el agujero de 1b01c66
07:48 Contexto antes que prompt: el vault
08:50 Evidencia: comando, hash y exit code
09:37 Laboratorio B: verificar.py y la huella
10:40 El log de 19 sesiones de Codex
11:50 Lo no independiente y los errores propios
12:47 Romper la evidencia con un espacio
13:33 Mutación WAR: intentos propios contra el hook
15:50 El reto y la rúbrica
17:23 Mini-quiz
18:28 Cierre

## Tags

QA, Claude Code, hooks, Codex, evidencia reproducible, SHA-256, revisión a ciegas, war-paradigm, scientific-qa-evidence, pruebas asistidas por IA

## Enlaces

- Módulo del curso: https://criguex.github.io/qa-automation-course/#/m23
- war-paradigm 03: https://github.com/criguex/war-paradigm/tree/main/experiments/03-second-brain
- scientific-qa-evidence: https://github.com/criguex/scientific-qa-evidence
- CODEX_WORK_LOG.md: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/CODEX_WORK_LOG.md
- AUTHORSHIP.md: https://github.com/criguex/scientific-qa-evidence/blob/main/AUTHORSHIP.md
- FINDINGS.md: https://github.com/criguex/scientific-qa-evidence/blob/main/FINDINGS.md
- Hooks de Claude Code: https://code.claude.com/docs/en/hooks

Cristian Guerra · QA · Medellín

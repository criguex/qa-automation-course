# Título

Capstone Auditoría WAR: que otra persona te reproduzca

(54 caracteres)

# Descripción

Módulo 34 del curso gratis de QA Automation: el capstone. Eliges un sistema, prerregistras qué vas a afirmar, rompes a propósito sus guardias, dejas que un asistente de IA ejecute bajo reglas que viven en el código y firmas tú. La prueba de fuego no es que te dé verde a ti: es que otra persona, en una máquina limpia y solo con tu paquete, corra un comando y obtenga la misma huella.

Los tres ejes en un entregable: QA asistida por IA (hook PreToolUse y registro de lo que hizo el asistente), ejecución de mutantes (mutantes como datos, kill rate recalculable, sobreviviente en rojo) y WAR Paradigm (todo guardia se prueba rompiendo algo a propósito). Abro con un hallazgo real de esta semana: una mutación WAR encontró que mi hook dejaba pasar «git --no-pager push origin main».

Laboratorio con war-paradigm, scientific-qa-evidence y predictor-debugger: mutantes, hook, reproducción en un contenedor efímero y la estructura mínima del paquete. Al final, la rúbrica integrada de cuatro filas.

Cristian Guerra · QA · Medellín

## Capítulos

00:00 Gancho
01:49 Explicado para un niño de 8 años
02:26 Teoría · los tres ejes
03:00 Teoría · eje A: reglas en código
03:48 Teoría · eje A: registro del asistente
04:33 Teoría · eje B: mutantes como datos
06:02 Teoría · eje C: también se prueba la evidencia
06:45 Teoría · reproducible en limpio
07:25 Teoría · reproducido no es reproducido por un tercero
08:01 Teoría · el reporte honesto
08:38 Laboratorio
13:34 Mutación WAR de la semana
14:19 El reto y cómo se evalúa
15:59 Mini-quiz
17:43 Cierre

# Tags

capstone QA, auditoría WAR, prueba de mutación, hooks de Claude Code, QA asistida por IA, reproducibilidad, huella, recibos, prerregistro, WAR Paradigm

# Texto de miniatura

Misma huella, otra persona

# Enlaces

- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m12
- Cómo te evalúas (rúbrica integrada): https://criguex.github.io/qa-automation-course/evaluacion.html
- war-paradigm (mutantes y hook): https://github.com/criguex/war-paradigm
- predictor-debugger (prerregistro, huellas, CI): https://github.com/criguex/predictor-debugger
- scientific-qa-evidence (recibos, registro de IA): https://github.com/criguex/scientific-qa-evidence
- CODEX_WORK_LOG.md: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/CODEX_WORK_LOG.md
- Plantilla de reproducción independiente: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/INDEPENDENT_REPRODUCTION.md
- in-toto: https://in-toto.io/
- Reproducible Builds: https://reproducible-builds.org/

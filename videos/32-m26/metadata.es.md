# Título

Verificar una prueba en Lean sin ser matemático

(47 caracteres)

# Descripción

Módulo 32 del curso gratis de QA Automation. No soy matemático y no reviso la matemática de OpenAI: reviso sus pruebas en Lean como revisaría cualquier entrega importante. Las recompilo desde la fuente, las vuelvo a verificar con herramientas independientes, intento que la verificación falle a propósito y dejo cada paso con su comando, su hash y su código de salida.

Vas a ver las cuatro cosas que Lean no comprueba, cómo una compilación «limpia» recibió 7 dependencias precompiladas, por qué Comparator rechazó «n + 1 ≤ p» aunque para Lean es lo mismo que «n < p», y cómo un log viejo con el nombre correcto pasa un chequeo de existencia y solo lo atrapa un hash.

Laboratorio con mi repo scientific-qa-evidence: verificar.py, un recibo real, el rechazo real de un mutante y verify.py. Mutación de la semana: sabotear la evidencia y ver si el guardia grita.

Alcance: el repo no demuestra nada nuevo, no reclama ningún resultado del Premio del Milenio y no es una revisión matemática. Dice «no se encontró un defecto en este alcance».

Cristian Guerra · QA · Medellín

## Capítulos

00:00 Gancho
01:23 Explicado para un niño de 8 años
02:01 Teoría · lo que Lean no comprueba
02:44 Teoría · recompilar desde la fuente
03:29 Teoría · checkers independientes
04:49 Teoría · mutar el enunciado
05:32 Teoría · rechazado no es falso
06:58 Teoría · recibos frente a hashes
08:26 Laboratorio
12:58 Mutación WAR de la semana
14:20 El reto y cómo se evalúa
16:02 Mini-quiz
17:37 Cierre

# Tags

Lean 4, prueba formal, QA científico, Comparator, nanoda, cadena de suministro, recibos, SHA-256, prueba de mutación, WAR Paradigm

# Texto de miniatura

Rechazado no es falso

# Enlaces

- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m26
- Laboratorio: https://github.com/criguex/scientific-qa-evidence
- REPRODUCE.md (qué se recalcula y qué se verifica por hash): https://github.com/criguex/scientific-qa-evidence/blob/main/REPRODUCE.md
- Controles Mathlib: https://github.com/criguex/scientific-qa-evidence/blob/main/experiments/mathlib-controls/DESIGN.md
- Guía de reproducción independiente: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/INDEPENDENT_REPRODUCTION.md
- leanprover/comparator: https://github.com/leanprover/comparator
- nanoda: https://github.com/ammkrn/nanoda_lib
- Theorem Proving in Lean 4: https://lean-lang.org/theorem_proving_in_lean4/
- in-toto: https://in-toto.io/

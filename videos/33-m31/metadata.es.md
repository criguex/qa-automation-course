# Título

Prueba a ciegas: sella tus trampas con un hash

(46 caracteres)

# Descripción

Módulo 33 del curso gratis de QA Automation. Si quien construye el chequeo conoce las trampas, puede afinarlo a ellas sin darse cuenta. En las rondas 1 a 4 de mi depurador físico yo inventé las trampas y el detective; la ronda 5 pregunta otra cosa: ¿atrapa trampas que no diseñé, sin marcar como malas las predicciones correctas?

Para que esa respuesta valga, quien prepara las trampas compromete el SHA-256 de sus etiquetas antes de entregar nada: con sal, ids aleatorios y proporción secreta. Quien prueba congela su regla antes de abrir. Y al revelar, cualquiera comprueba el hash.

En el laboratorio verifico un compromiso real (la semilla del benchmark de fallos a ciegas de scientific-qa-evidence), reproduzco la asignación byte a byte y corro una ronda 5 en miniatura con 20 pares. La mutación de la semana ataca el sobre: cambio una sola etiqueta y luego solo la sal.

Ciego no quiere decir perfecto: el benchmark ciego que muestro tuvo 17 problemas encontrados en revisión, y se presenta con su fe de erratas.

Cristian Guerra · QA · Medellín

## Capítulos

00:00 Gancho
01:14 Explicado para un niño de 8 años
01:52 Teoría · el problema
02:37 Teoría · el compromiso por hash
03:20 Teoría · la sal
04:03 Teoría · hora pública e ids
04:50 Teoría · el que prueba también se compromete
05:30 Teoría · qué se reporta
06:13 Teoría · comprometer una semilla
06:59 Teoría · ciego no es perfecto
07:43 Laboratorio
12:04 Mutación WAR de la semana
12:45 El reto y cómo se evalúa
14:15 Mini-quiz
15:59 Cierre

# Tags

prueba a ciegas, compromiso por hash, SHA-256, sal criptográfica, prerregistro, QA científico, depurador físico, fallos sembrados, prueba de mutación, WAR Paradigm

# Texto de miniatura

Sobre sellado

# Enlaces

- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m31
- Kit de la ronda 5: https://github.com/criguex/predictor-debugger/blob/main/round5/KIT.md
- Compromiso de la semilla: https://github.com/criguex/scientific-qa-evidence/blob/main/experiments/blind-faults/SEED_COMMITMENT.md
- Resultados y fe de erratas: https://github.com/criguex/scientific-qa-evidence/blob/main/experiments/blind-faults/RESULTS.md
- Esquema de compromiso (concepto): https://en.wikipedia.org/wiki/Commitment_scheme
- Python hashlib: https://docs.python.org/3/library/hashlib.html

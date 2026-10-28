# Título

Física y estadística para probar una red de fluidos

(51 caracteres)

# Descripción

Módulo 31 del curso gratis de QA Automation. No necesitas ser físico para probar una red neuronal que predice un fluido, pero sí saber qué ley vigila cada chequeo: incompresibilidad (D1), balance de energía (D2) y ecuación de momento (D3). Y no necesitas ser estadístico, pero sí saber cuándo una diferencia es ruido: Spearman, bootstrap por trayectorias e intervalo de Wilson.

En el laboratorio uso mi repo predictor-debugger: verifico la huella guardada, escribo mis predicciones antes de correr, saboteo tres pares (energía ×1,05, gradiente agregado, fase corrida) y miro qué chequeo marca cada uno. La mutación de la semana busca el piso: hasta dónde baja la energía de más antes de que el depurador deje de verla.

Lo que se prueba aquí es el depurador, no la red. Todo sale de los repos públicos y del curso; el alcance es una caja periódica de 32³ y no dice nada sobre turbulencia real ni sobre el problema del Milenio.

Cristian Guerra · QA · Medellín

## Capítulos

00:00 Gancho
01:18 Explicado para un niño de 8 años
02:05 Teoría · las tres leyes
03:37 Teoría · D4 juzga al juez
04:20 Teoría · los controles
05:52 Teoría · one-step contra rollout
07:23 Teoría · estadística para no engañarte
08:54 Laboratorio
12:38 Mutación WAR de la semana
14:28 El reto y cómo se evalúa
15:51 Mini-quiz
17:15 Cierre

# Tags

QA científico, Navier–Stokes, red neuronal, FNO, depurador físico, Spearman, bootstrap, intervalo de Wilson, prueba de mutación, WAR Paradigm

# Texto de miniatura

¿Error o ruido?

# Enlaces

- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m25
- Laboratorio: https://github.com/criguex/predictor-debugger
- Diseño prerregistrado: https://github.com/criguex/predictor-debugger/blob/main/DESIGN.md
- Kit de la ronda 5: https://github.com/criguex/predictor-debugger/blob/main/round5/KIT.md
- Intervalo de Wilson usado (agent-eval-jev): https://github.com/criguex/agent-eval-jev
- NASA Glenn, ecuaciones de Navier–Stokes: https://www.grc.nasa.gov/www/k-12/airplane/nseqs.html
- SciPy spearmanr: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html
- SciPy bootstrap: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html
- Li et al., Fourier Neural Operator: https://arxiv.org/abs/2010.08895

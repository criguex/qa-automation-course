# Metadata ES · m17

**Título:** Calibrar un juez de IA: kappa, held-out y zona gris

**Texto de miniatura:** ¿Tu juez miente?

## Descripción

Apagué el chequeo de números de un agente de IA y 30 pruebas siguieron en verde. En este módulo del curso de QA calibro un juez contra etiquetas de referencia (las redactó una IA y las revisé yo, sin registro caso por caso) con el kappa de Cohen, ajusto en un grupo y reporto en otro, y mando a una persona los casos dudosos. Todo corre offline con dos repos públicos: qa-eval-lab y agent-eval-jev.

Capítulos:
00:00 Un guardia apagado y 30 pruebas en verde
01:03 Explicado para un niño de 8 años
02:16 El kappa de Cohen
04:12 Kappa a mano sobre una muestra ilustrativa: 0.80 de acuerdo, κ 0.58
05:20 Golden set de 60 casos y rúbrica de 4 criterios
06:58 Juicio en capas: código, Jev y juez LLM
08:53 Calibración vs held-out
10:46 La confianza enruta, no prueba
11:50 El CI como contrato
12:33 Laboratorio: replay offline de agent-eval-jev
14:44 Subir la barra del gate
15:22 Mutación WAR: apagar un guardia
17:26 El reto y la rúbrica
19:34 Mini-quiz
20:48 Cierre

## Tags

QA, evaluación de agentes, LLM como juez, kappa de Cohen, calibración, held-out, revisión humana, agent-eval-jev, pruebas de IA, Python

## Enlaces

- Módulo del curso: https://criguex.github.io/qa-automation-course/#/m17
- Laboratorio: https://github.com/criguex/agent-eval-jev
- Rúbrica: https://github.com/criguex/agent-eval-jev/blob/main/RUBRIC.md
- Calibración en qa-eval-lab: https://github.com/criguex/qa-eval-lab/tree/main/evals/calibration
- scikit-learn cohen_kappa_score: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html

Cristian Guerra · QA · Medellín

# Metadata ES · 24-m16

## Título
LLM como juez: falsos verdes, umbrales y CI que no evalúa

## Descripción
"La capital de Colombia es Medellín": status 200, campo presente, prueba en verde y respuesta falsa. En este video evaluamos IA con qa-eval-lab: dos oráculos (determinista y juez), DeepEval (GEval, AnswerRelevancy, Faithfulness, ToolCorrectness), Promptfoo con aserciones y red-team, falsos verdes sembrados a propósito, un umbral que se fija antes de ver el puntaje y un check de CI que sale verde sin evaluar nada cuando falta el secreto. Laboratorio sin clave (UI, el script de calibración con kappa de Cohen sobre una muestra ilustrativa y módulo de agentes) y la mutación del juez dormido.

Módulo 24 del curso de QA Automation (m16 · Evaluar IA con un LLM como juez).

Capítulos
00:00 Medellín, status 200 y un falso verde
00:40 Explicado para un niño de 8 años: el profe y la trampa
01:30 Dos oráculos: determinista y juez
02:17 El juez en DeepEval y sus umbrales
03:42 Los falsos verdes sembrados del dataset
04:46 Prueba al juez: la trampa de Medellín
05:46 Promptfoo: aserciones y red-team
06:51 El umbral se fija antes de ver el puntaje
07:52 El CI sin el secreto no evalúa el LLM
08:52 Laboratorio sin clave: UI y una calibración que es solo un ejemplo
10:31 Módulo 3 sin API: 0,67 que pasa
11:38 Con clave, y cómo leer el workflow
12:45 Mutación WAR: duerme al juez
13:46 El reto y la rúbrica
15:15 Mini-quiz
16:15 Cierre y siguiente módulo

## Tags
LLM as a judge, DeepEval, Promptfoo, evaluación de IA, falsos verdes, red teaming, GitHub Actions, kappa de Cohen, QA de IA, qa-eval-lab

## Texto de miniatura
Verde sin juez

## Enlaces
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m16
- Laboratorio: https://github.com/criguex/qa-eval-lab
- eval-gate.yml: https://github.com/criguex/qa-eval-lab/blob/main/.github/workflows/eval-gate.yml
- DeepEval — primeros pasos: https://deepeval.com/docs/getting-started
- DeepEval — métricas con LLM (G-Eval): https://deepeval.com/docs/metrics-llm-evals
- Promptfoo — aserciones: https://www.promptfoo.dev/docs/configuration/expected-outputs/
- Promptfoo — red-team: https://www.promptfoo.dev/docs/red-team/
- OWASP Top 10 para aplicaciones LLM: https://genai.owasp.org/llm-top-10/
- Husain — Your AI Product Needs Evals: https://hamel.dev/blog/posts/evals/
- Siguiente módulo: https://criguex.github.io/qa-automation-course/#/m17

Cristian Guerra · QA · Medellín

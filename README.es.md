[Read in English](README.md)

![qa-automation-course: un curso interactivo de QA Automation en español, de tu primera prueba a AI-QA y QA científico, con una idea de fondo: prueba al que prueba](docs/assets/banner.svg)

## Explicado para un niño de 8 años

Este es un curso que enseña a revisar que los programas de computador funcionen. Es un camino con cuatro paradas, desde lo básico hasta revisar robots que escriben respuestas. En cada parada hay un examen corto que se corrige solo y una tarea con una lista de “lo logré si…”. La idea grande es como revisar que un guardia esté despierto: haces un ruido a propósito y miras si grita. Si se queda callado, estaba dormido, y eso es lo que anotas.

**Un ejemplo real de este repo**

- **Imagina** que el curso tiene 319 preguntas de quiz y cada una dice cuál es la respuesta buena.
- **Qué pasa:** dañamos una pregunta a propósito. Tiene 4 respuestas y dijimos que la buena era la número 9, que no existe.
- **Qué hace el proyecto:** un robot revisor, `scripts/check-course.mjs`, lee todas las preguntas. Encontró la dañada, dijo “1 problema” y terminó con código de salida 1. El workflow de Pages corre ese robot antes de publicar, así que un quiz dañado no sale.
- **Qué ganamos:** sabemos que el robot está despierto, porque lo vimos atrapar un error que pusimos nosotros.

![Historia ilustrada: un camino con cuatro paradas, cada una con quiz y tarea; luego un robot revisor lee las preguntas, encuentra una dañada a propósito, grita “1 problema” y la luz se pone roja para que no se publique nada](docs/assets/explained.es.gif)

[Versión MP4](docs/assets/explained.es.mp4) · fuente: [`docs/scenes/explained.html`](docs/scenes/explained.html)

| Palabra difícil | Qué significa |
|---|---|
| Prueba (test) | Una pregunta de la que ya sabemos la respuesta, para comprobar que un programa funciona |
| Quiz | Un examen corto dentro del curso que se califica solo mientras respondes |
| Rúbrica | Una tabla que dice cómo se ve “todavía no”, “casi”, “aprobado” y “excelente” |
| Mutante | Una copia del programa con una cosa dañada a propósito, para ver si las pruebas lo notan |
| Pipeline (CI) | Un robot que corre todas las revisiones cada vez que alguien entrega un cambio |
| localStorage | Una cajita dentro de tu navegador donde el curso recuerda tu avance |

<p>
  <img src="https://img.shields.io/badge/curso-en_español-55DFBD?style=flat-square&labelColor=071B2B" alt="Curso en español"/>
  <img src="https://img.shields.io/badge/módulos-31_·_4_niveles-55DFBD?style=flat-square&labelColor=071B2B" alt="31 módulos en 4 niveles"/>
  <img src="https://img.shields.io/badge/HTML-sitio_estático-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML estático"/>
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white" alt="Playwright"/>
  <img src="https://img.shields.io/badge/código-MIT-55DFBD?style=flat-square&labelColor=071B2B" alt="Código: MIT"/>
  <img src="https://img.shields.io/badge/contenido-CC_BY_4.0-55DFBD?style=flat-square&labelColor=071B2B" alt="Contenido: CC BY 4.0"/>
</p>

## Qué es

Un curso gratis e interactivo que te lleva de lo básico de QA al trabajo que hago hoy: QA asistida por IA con una persona que firma, ejecución de mutantes, evaluación de LLM y agentes, pipelines y contenedores efímeros, y QA científico (prerregistro, huellas, reproducibilidad). Es una sola página estática, sin build ni servidor. El hilo de todo es el WAR Paradigm: **prueba al que prueba, muta la realidad**. Cada módulo termina con una “mutación de la semana”, en la que dañas a propósito tu propio chequeo y muestras que lo nota.

## Cómo funciona

![Cómo funciona un módulo: objetivos y prerrequisitos, teoría y laboratorio, un quiz autocorregible que pide 6 de 8, un reto con criterios verificables en el nivel 3 de la rúbrica, la mutación de la semana y el módulo queda aprobado; después, el examen final y el proyecto final](docs/assets/how-it-works.svg)

Todos los módulos tienen las mismas partes:

- **Objetivos** (“al terminar puedes…”) y **prerrequisitos**.
- **Teoría corta y un laboratorio.** En los módulos nuevos, el laboratorio es uno de mis repos públicos.
- **Un quiz autocorregible:** 8 preguntas al azar del banco del módulo, una respuesta por pregunta y la explicación después de cada respuesta. Apruebas con 6 de 8. Cada intento saca otras preguntas.
- **Un reto con criterios de aprobación verificables** con un comando o una captura, por ejemplo “tu suite mata al menos 5 de 6 mutantes y el reporte JSON trae hashes” o “tu juez tiene un kappa ≥ 0,6 contra tus etiquetas”.
- **Una rúbrica de 4 niveles** (no cumple · en camino · aprobado · sobresaliente).
- **Una línea “explicado para un niño de 8 años”** y la **mutación de la semana**.

Un módulo queda aprobado con el quiz en 6/8 o más y el reto en el nivel 3 de la rúbrica. El examen final tiene 26 preguntas y pide 80 %. El proyecto final, una auditoría WAR de un sistema real, tiene una rúbrica integrada de los tres ejes. Las reglas completas están en la página [Cómo te evalúas](evaluacion.html).

Una corrida real del sitio, grabada con Playwright: abrir un módulo, responder una pregunta bien y otra mal, terminar el quiz, marcar el entregable y ver el nodo en verde en el mapa.

![Grabación real del curso: el mapa, un módulo con su explicación para niños y su mutación de la semana, una respuesta buena y una mala con la explicación, el resultado del quiz y el módulo marcado](docs/assets/course-run.gif)

[Versión MP4](docs/assets/course-run.mp4) · grabada con [`docs/scenes/record-course.mjs`](docs/scenes/record-course.mjs)

## La ruta

![Mapa de la ruta: 31 módulos en cuatro niveles (fundamentos, intermedio, AI-QA avanzado y QA científico), luego el proyecto final y la carrera](docs/assets/route-map.svg)

| # | Nivel | Módulo | Repos de laboratorio |
|---|---|---|---|
| 1 | Nivel 1 · Fundamentos | Mentalidad QA — de Dev a Tester | [war-paradigm](https://github.com/criguex/war-paradigm) |
| 2 |  | Diseño de pruebas & técnicas | — |
| 3 |  | Setup día 0 — el entorno | — |
| 4 |  | Obsidian — tu segundo cerebro (Fase 0 del método) | — |
| 5 |  | TypeScript para QA | — |
| 6 |  | Playwright + TypeScript E2E — framework desde cero | — |
| 7 |  | API & Contract Testing — tu especialidad futura | [restful-booker-quality-suite](https://github.com/criguex/restful-booker-quality-suite), [civica-playwright-challenge](https://github.com/criguex/civica-playwright-challenge) |
| 8 |  | BDD — Gherkin, Cucumber & Serenity | — |
| 9 |  | Ejecución disciplinada — ciclos, test data & known issues | — |
| 10 | Nivel 2 · Intermedio | Reportes & Trazabilidad — evidencia que se puede firmar | — |
| 11 |  | Sign-off / Certificación de una historia — el cierre del método | — |
| 12 |  | CI/CD & Docker | — |
| 13 |  | Pipelines — anatomía, gates de calidad y pipelines de evidencia | [civica-playwright-challenge](https://github.com/criguex/civica-playwright-challenge), [qa-eval-lab](https://github.com/criguex/qa-eval-lab), [restful-booker-quality-suite](https://github.com/criguex/restful-booker-quality-suite), [predictor-debugger](https://github.com/criguex/predictor-debugger) |
| 14 |  | Contenedores efímeros — que la evidencia sobreviva al entorno | [predictor-debugger](https://github.com/criguex/predictor-debugger) |
| 15 |  | Performance & Cloud (K6 · JMeter · AWS) | — |
| 16 |  | Determinismo — mocks, record/replay y fixtures indexados por hash | [playwright-jev](https://github.com/criguex/playwright-jev), [civica-playwright-challenge](https://github.com/criguex/civica-playwright-challenge) |
| 17 |  | QA Aumentado con IA — mi diferenciador | — |
| 18 |  | QA asistida por IA I — el asistente prueba, la persona firma | [war-paradigm](https://github.com/criguex/war-paradigm) |
| 19 |  | Mutation testing — prueba al que prueba (WAR Paradigm) | [war-paradigm](https://github.com/criguex/war-paradigm), [scientific-qa-evidence](https://github.com/criguex/scientific-qa-evidence) |
| 20 |  | Mutantes que aprenden — ledger, priorización y mutantes que miden al auditor | [civica-playwright-challenge](https://github.com/criguex/civica-playwright-challenge) |
| 21 |  | Triaje de fallos en CI y selección de pruebas por impacto | [jev-ci-triage](https://github.com/criguex/jev-ci-triage), [jev-test-impact](https://github.com/criguex/jev-test-impact) |
| 22 | Nivel 3 · AI-QA avanzado | Evaluar IA con un LLM como juez — atrapar el falso verde | [qa-eval-lab](https://github.com/criguex/qa-eval-lab) |
| 23 |  | Evaluar agentes de IA — chequeos de código + juez calibrado | [agent-eval-jev](https://github.com/criguex/agent-eval-jev) |
| 24 |  | Jueces con probabilidad — modos de falla, estabilidad y cascadas | [war-paradigm](https://github.com/criguex/war-paradigm), [laya-server](https://github.com/criguex/laya-server), [playwright-jev](https://github.com/criguex/playwright-jev), [jev-ci-triage](https://github.com/criguex/jev-ci-triage) |
| 25 |  | QA asistida por IA II — agentes que ejecutan, una persona que firma y un reporte honesto | [scientific-qa-evidence](https://github.com/criguex/scientific-qa-evidence) |
| 26 | Nivel 4 · QA científico | Reproducibilidad y prerregistro — umbrales antes de los datos | [predictor-debugger](https://github.com/criguex/predictor-debugger) |
| 27 |  | Controles, arnés y mutación numérica — contrato congelado y oráculo independiente | [scientific-qa-evidence](https://github.com/criguex/scientific-qa-evidence), [war-paradigm](https://github.com/criguex/war-paradigm) |
| 28 |  | Física de fluidos y estadística para el depurador | [predictor-debugger](https://github.com/criguex/predictor-debugger) |
| 29 |  | Verificación formal con Lean y pruebas a ciegas con compromiso por hash | [scientific-qa-evidence](https://github.com/criguex/scientific-qa-evidence), [predictor-debugger](https://github.com/criguex/predictor-debugger) |
| 30 | Cierre · proyecto final | Proyecto final — auditoría WAR de un sistema real | [war-paradigm](https://github.com/criguex/war-paradigm), [predictor-debugger](https://github.com/criguex/predictor-debugger), [agent-eval-jev](https://github.com/criguex/agent-eval-jev) |
| 31 |  | Tu carrera QA+IA — posicionamiento | — |

Tres formas de recorrerla: la ruta completa desde cero (unas 33 semanas a 10–12 h por semana), una de 20 semanas si ya automatizas pruebas de UI o API, y una de 12 semanas. Las dos cortas están en la página [Cómo te evalúas](evaluacion.html).

## Cómo correrlo

```bash
git clone https://github.com/criguex/qa-automation-course.git && cd qa-automation-course
python3 -m http.server 8080        # abre http://localhost:8080
node scripts/check-course.mjs      # valida cada módulo y cada pregunta
```

`check-course.mjs` (Node 18+, sin dependencias) comprueba que cada módulo tenga objetivos, prerrequisitos, explicación para niños, laboratorio, criterios, rúbrica y mutación de la semana, que cada banco de quiz tenga al menos 8 preguntas y que cada respuesta apunte a una opción que existe. Hoy imprime `31 modules · 4 levels + final project` y `319 quiz questions · 0 problems`.

Tu avance, tu mejor puntaje en cada quiz y el del examen viven solo en tu navegador (`localStorage`). No hay cuentas y no se envía nada a ningún lado.

## Publicarlo con GitHub Pages

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) corre `check-course.mjs` y después publica la raíz del repo en GitHub Pages con cada push a `main`. Antes del primer push activa **Settings → Pages → Source: GitHub Actions**; si no, el paso de deploy falla.

## Qué se actualizó (26 de octubre de 2026)

- **Versiones revisadas** con `npm view`, el índice de versiones de Node, Maven Central y los releases de GitHub: Playwright 1.64, TypeScript 7.0, Node 24 LTS, Java 25 LTS, Karate 2.1 y k6 2.3. Los módulos cubren lo que cambió: los defaults y las opciones eliminadas de TypeScript 7, Karate 2 (Java 21+, CLI nueva), k6 2.x (ya no existen `pause/resume/scale/status` ni el executor `externally-controlled`; ahora es `k6 cloud run`) y que `brew install node` instala la versión Current y no la LTS.
- **Enlaces:** los 115 enlaces de recursos respondieron 200 con `curl -L`, menos un DOI que bloquea bots (`doi.org/10.1145/3143561`, abre en el navegador). Los que redirigían quedaron con su dirección nueva.
- **Módulos nuevos:** pipelines, contenedores efímeros, determinismo y record/replay, QA asistida por IA I y II, mutation testing, mutantes que aprenden, triaje de CI e impacto, LLM como juez, evaluación de agentes, jueces con probabilidad, prerregistro y huellas, controles y mutación numérica, fluidos y estadística, y verificación formal con Lean y pruebas a ciegas.

## Límites

- El contenido del curso está solo en español.
- La evaluación es autoevaluación. El sitio no tiene servidor: nadie revisa tu reto sino tú, y tu avance vive en un solo navegador.
- Casi todos los laboratorios son repos públicos míos. Parte de su evidencia no es independiente y lo dicen (por ejemplo, las tres máquinas de predictor-debugger son mías, y un recálculo completo lo corrió un asistente de IA bajo mi dirección); los módulos lo aclaran donde aplica.
- Las versiones y los enlaces se revisaron el 26 de octubre de 2026 y van a envejecer.

## Licencia

Licencia doble. El **código** (HTML, CSS, JavaScript, scripts y escenas) es [MIT](LICENSE). El **contenido del curso** (textos de los módulos, quizzes, glosario e imágenes) es [CC BY 4.0](LICENSE-CONTENT): puedes compartirlo y adaptarlo, también con fines comerciales, si das crédito a Cristian Guerra.

## Autor

**Cristian Guerra** · Senior SDET / AI-QA · Medellín, Colombia · [github.com/criguex](https://github.com/criguex)

[Leer en español](README.es.md)

![qa-automation-course: an interactive QA Automation course in Spanish, from your first test to AI-QA and scientific QA, built around one idea: test the tester](docs/assets/banner.svg)

> **Course content in Spanish.** The site, the modules, the quizzes and the glossary are written in Spanish (Colombia). This README is in English so you can decide whether it is for you.

## Explained like you're 8

This is a course that teaches people how to check that computer programs work. It is a road with four stops, from the basics to checking robots that write answers. At every stop there is a short quiz that grades itself and a task with a list of "I did it if…". The big idea is like checking that a guard is awake: you make a noise on purpose and see if the guard shouts. If it stays quiet, the guard was asleep, and that is what you write down.

**A real example from this repo**

- **Imagine** the course has 319 quiz questions, and each one says which answer is the right one.
- **What happens:** we broke one question on purpose. It has 4 answers, and we said the right one was number 9, which does not exist.
- **What the project does:** a checking robot, `scripts/check-course.mjs`, reads every question. It found the broken one, said "1 problem" and stopped with exit code 1. The Pages workflow runs that robot before publishing, so a broken quiz does not go out.
- **What we gain:** we know the robot is awake, because we watched it catch a mistake we planted.

![Illustrated story: a road with four stops, each with a quiz and a task; then a checking robot reads the quiz questions, finds one broken on purpose, shouts "1 problem" and the light turns red so nothing is published](docs/assets/explained.gif)

[MP4 version](docs/assets/explained.mp4) · source: [`docs/scenes/explained.html`](docs/scenes/explained.html)

| Hard word | What it means |
|---|---|
| Test | A question we already know the answer to, used to check that a program works |
| Quiz | A short exam inside the course that grades itself as you answer |
| Rubric | A table that says what "not yet", "almost", "passed" and "excellent" look like |
| Mutant | A copy of a program with one thing broken on purpose, to see if the tests notice |
| Pipeline (CI) | A robot that runs all the checks every time someone hands in a change |
| localStorage | A little box inside your browser where the course remembers your progress |

<p>
  <img src="https://img.shields.io/badge/course-in_Spanish-55DFBD?style=flat-square&labelColor=071B2B" alt="Course in Spanish"/>
  <img src="https://img.shields.io/badge/modules-31_·_4_levels-55DFBD?style=flat-square&labelColor=071B2B" alt="31 modules in 4 levels"/>
  <img src="https://img.shields.io/badge/HTML-static_site-E34F26?style=flat-square&logo=html5&logoColor=white" alt="Static HTML"/>
  <img src="https://img.shields.io/badge/Playwright-2EAD33?style=flat-square&logo=playwright&logoColor=white" alt="Playwright"/>
  <img src="https://img.shields.io/badge/code-MIT-55DFBD?style=flat-square&labelColor=071B2B" alt="Code: MIT"/>
  <img src="https://img.shields.io/badge/content-CC_BY_4.0-55DFBD?style=flat-square&labelColor=071B2B" alt="Content: CC BY 4.0"/>
</p>

## What it is

A free, interactive course that takes you from QA basics to the work I do today: QA assisted by AI with a person who signs off, mutant execution, evaluating LLMs and agents, pipelines and ephemeral containers, and scientific QA (preregistration, fingerprints, reproducibility). It is one static page with no build and no backend. The thread through all of it is the WAR Paradigm: **test the tester, mutate reality**. Every module ends with a "mutation of the week", where you break your own check on purpose and show that it notices.

## How it works

![How one module works: goals and prerequisites, theory and lab, a self-graded quiz that needs 6 of 8, a challenge with verifiable criteria at rubric level 3, the mutation of the week, and the module is saved as passed; then the final exam and the final project](docs/assets/how-it-works.svg)

Every module has the same parts:

- **Goals** ("when you finish, you can…") and **prerequisites**.
- **Short theory and a lab.** In the new modules the lab is one of my public repos.
- **A self-graded quiz:** 8 random questions from the module's bank, one answer each, with the reason shown after every answer. You pass with 6 of 8. Each retry draws other questions.
- **A challenge with pass criteria you can verify** with a command or a screenshot, for example "your suite kills at least 5 of 6 mutants and the JSON report carries hashes" or "your judge has a kappa ≥ 0.6 against your labels".
- **A 4-level rubric** (does not meet · on the way · passed · outstanding).
- **An "explained like you're 8" line** and the **mutation of the week**.

A module counts as passed with the quiz at 6/8 or more and the challenge at rubric level 3. The final exam has 26 questions and needs 80 %. The final project, a WAR audit of a real system, has an integrated rubric across the three axes. The full rules are on the [How you are graded](evaluacion.html) page (in Spanish).

A real run of the site, recorded with Playwright: open a module, answer one question right and one wrong, finish the quiz, mark the deliverable and see the node turn green on the map.

![Real recording of the course: the map, a module with its kid line and mutation of the week, one right and one wrong answer with the explanation, the quiz result and the module marked as done](docs/assets/course-run.gif)

[MP4 version](docs/assets/course-run.mp4) · recorded with [`docs/scenes/record-course.mjs`](docs/scenes/record-course.mjs)

## The route

![Route map: 31 modules in four levels (basics, intermediate, advanced AI-QA, scientific QA), then the final project and career](docs/assets/route-map.svg)

Module titles are in Spanish, as in the course. Labs link to public repos.

| # | Level | Module | Lab repos |
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

Three ways through it: the full route from zero (about 33 weeks at 10–12 h a week), a 20-week route if you already automate UI or API tests, and a 12-week route. Both short routes are listed on the [How you are graded](evaluacion.html) page.

## Run it

```bash
git clone https://github.com/criguex/qa-automation-course.git && cd qa-automation-course
python3 -m http.server 8080        # open http://localhost:8080
node scripts/check-course.mjs      # validates every module and quiz question
```

`check-course.mjs` (Node 18+, no dependencies) checks that every module has goals, prerequisites, kid line, lab, criteria, rubric and mutation of the week, that every quiz bank has at least 8 questions, and that every answer index points to a real option. Today it prints `31 modules · 4 levels + final project` and `319 quiz questions · 0 problems`.

Your progress, your best quiz score per module and your exam score live only in your browser (`localStorage`). There are no accounts and nothing is sent anywhere.

## Publish it with GitHub Pages

[`.github/workflows/pages.yml`](.github/workflows/pages.yml) runs `check-course.mjs` and then deploys the repository root to GitHub Pages on every push to `main`. Before the first push, set **Settings → Pages → Source: GitHub Actions**; otherwise the deploy step fails.

## What was updated (26 Oct 2026)

- **Versions checked** with `npm view`, the Node release index, Maven Central and GitHub releases: Playwright 1.64, TypeScript 7.0, Node 24 LTS, Java 25 LTS, Karate 2.1, k6 2.3. The modules now cover what changed: TypeScript 7 defaults and removed options, Karate 2 (Java 21+, new CLI), k6 2.x (removed `pause/resume/scale/status` and the `externally-controlled` executor; `k6 cloud run`), and `brew install node` installing the Current release instead of the LTS.
- **Links:** all 115 resource links answered 200 with `curl -L`, except one DOI that blocks bots (`doi.org/10.1145/3143561`, opens in a browser). Redirected links were updated to their new address.
- **New modules:** pipelines, ephemeral containers, determinism and record/replay, AI-assisted QA I and II, mutation testing, mutants that learn, CI triage and test impact, LLM as a judge, agent evaluation, probabilistic judges, preregistration and fingerprints, controls and numeric mutation, fluids and statistics, formal verification with Lean and blind tests.

## Limits

- The course content is in Spanish only.
- Grading is self-assessment. The site has no server; nobody checks your challenge but you, and your progress lives in one browser.
- Most labs are my own public repos. Some of their evidence is explicitly not independent (for example, the three machines in predictor-debugger are mine, and one full recompute was run by an AI assistant under my direction); the modules say so where it applies.
- Versions and links were checked on 26 Oct 2026 and will age.

## License

Dual license. The **code** (HTML, CSS, JavaScript, scripts and scenes) is [MIT](LICENSE). The **course content** (module texts, quizzes, glossary and images) is [CC BY 4.0](LICENSE-CONTENT): you can share and adapt it, including commercially, if you credit Cristian Guerra.

## Author

**Cristian Guerra** · Senior SDET / AI-QA · Medellín, Colombia · [github.com/criguex](https://github.com/criguex)

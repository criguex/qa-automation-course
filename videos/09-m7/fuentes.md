# Fuentes · Módulo 7 (09-m7)

Rutas `brand/<repo>/…` = clones en `/private/tmp/claude-501/-Users-cris/c84a7b42-de3c-463d-abfc-7c8b58c450f4/scratchpad/brand/`. Repos públicos en `https://github.com/criguex/<repo>`.

| ID | Afirmación del guion | Fuente |
|---|---|---|
| F01 | `Register.feature` promete un mensaje de éxito y sus dos últimos pasos lanzan `PendingException`; el README dice que la segunda receta está a medias | `brand/selenium-cucumber-pom/src/test/resources/features/Register.feature`, `src/test/java/stepdefinitions/register/StepDefinitionRegister.java`, `README.es.md` |
| F02 | El step "User clicks on create button and select costumers" llama `fillBasicData()` y `fillContact()`; el feature tiene dos `When` seguidos | mismos archivos de F01 |
| F03 | `CreateAccount.feature` dice "When goes to account functionality and click on new" | `brand/serenity-screenplay-salesforce/src/test/resources/features/CreateAccount.feature` |
| F04 | Filosofía BDD (3 amigos, ejemplos, lenguaje ubicuo), Gherkin declarativo vs imperativo, BDD como capa sobre la automatización, Gherkin acoplado a la UI = antipatrón, documentación viva | `brand/qa-automation-course/i18n/es/modules-01-14.json` → `m7` (mentor, theory) |
| F05 | Regla del umbral: 49,99 con recibo queda AutoApproved y 50 PendingApproval; caso POL-THR falla por BUG-18 | `brand/spendwise-qa-assessment/docs/03-casos-prueba.md` (POL-THR) y `docs/02-estrategia-plan.md` |
| F06 | "Un gasto de exactamente 50 dólares se aprueba solo cuando debería revisarlo una persona" | `brand/spendwise-qa-assessment/docs/04-resumen-ejecutivo.md` |
| F07 | Screenplay: actor Cristian con `BrowseTheWeb`, tarea `LoginActions.login()`, pregunta `ElementTextValidator` con `seeThat` y `containsString` | `brand/serenity-screenplay-salesforce/src/test/java/test/accountsalesforce/stepdefinitions/CreateAccountStepDefinitions.java`, `README.es.md` |
| F08 | `serenity.compromised.on = test.accountsalesforce.exceptions.Exceptions` | `brand/serenity-screenplay-salesforce/serenity.properties` |
| F09 | Distinción de Serenity entre prueba fallida y comprometida | Documentación oficial de Serenity BDD: https://serenity-bdd.github.io/ (sección de resultados de prueba / configuración `serenity.compromised.on`) |
| F10 | PicoContainer comparte un `Context` entre clases de steps | `brand/selenium-cucumber-pom/README.es.md` (Arquitectura) y `StepDefinitionsLogin.java` |
| F11 | `brand.feature`: Background con `url baseUrl` y lectura del esquema; Scenario Outline con maybelline, marcelle, iman; tags `@positive`/`@negative`; comando `--tags @positive` | `brand/karate-api-testing/src/test/java/features/brand.feature`, `README.es.md` |
| F12 | 5 features, 30 escenarios; resumen del run 36095563876 | `brand/karate-api-testing/README.es.md` |
| F13 | Selección por runner: `RunnerLogin` apunta a `Login.feature`; plugins pretty, HTML, JSON y JUnit | `brand/selenium-cucumber-pom/src/test/java/runners/RunnerLogin.java` |
| F14 | Rutas de reportes: `target/cucumber-reports/report.html`, `target/cucumber-html-reports/` (maven-cucumber-reporting), `target/site/serenity/` con versión de una sola página | `brand/selenium-cucumber-pom/README.es.md` (Reportes); `brand/serenity-screenplay-salesforce/README.es.md` (Reportes) |
| F15 | Los dos repos Java no tienen workflow de CI porque apuntan a ambientes privados | Sección CI de los dos `README.es.md` |
| F16 | Requisitos y comandos de selenium-cucumber-pom; la suite se detiene si faltan credenciales; app privada | `brand/selenium-cucumber-pom/README.es.md` (Cómo correrlo, Límites) |
| F17 | Comandos de serenity; org activa; `EditAccount` escoge cuenta al azar; datos aleatorios | `brand/serenity-screenplay-salesforce/README.es.md` (Cómo correrlo, Límites) |
| F18 | `karate-summary.html` con una página por feature; CI corre `mvn -B test` y sube `target/karate-reports/`; depende de API pública sin mock | `brand/karate-api-testing/README.es.md` (Reportes, CI, Límites), `.github/workflows/ci.yml` |
| F19 | Flujo golden editor → approver → editor | `brand/war-paradigm/experiments/02-mutants/tests/golden.spec.ts` |
| F20 | Mutantes role-swap (403) y reorder (409) | `brand/war-paradigm/experiments/02-mutants/tests/scenarios.ts` |
| F21 | Criterios, entregable, mutación y nivel top del módulo | `modules-01-14.json` → `m7.crit`, `m7.deliver`, `m7.mut`, `m7.top` |
| F22 | Preguntas del quiz y ejemplos de steps declarativos/imperativos, Outline, Background, tags, organización por capacidad | `brand/qa-automation-course/i18n/es/quiz-01-10.json` → `m7` |

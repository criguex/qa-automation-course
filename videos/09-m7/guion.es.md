# Módulo 7 · BDD — Gherkin, Cucumber & Serenity

Guion de narración en español (Colombia). Voz: Cristian, primera persona. Ritmo de referencia: 150 palabras por minuto. Las marcas `[mm:ss]` se calculan con ese ritmo; cada bloque indica su escena de `escenas.json`.

## 1. Gancho

**[00:00] → E01**

Este es un feature de uno de mis repos viejos, selenium-cucumber-pom. Se lee bonito. Dado que el usuario está en la página, cuando llena el formulario de creación, entonces se muestra un mensaje de éxito. Cualquiera del equipo lo entiende.

Ahora abre el código. Los dos últimos pasos, el que llena el formulario y el que revisa el mensaje de éxito, hacen una sola cosa: lanzan `PendingException`. El escenario promete que verifica un mensaje de éxito, y no lo verifica. El README lo dice con honestidad: la segunda receta está escrita a medias. Pero si alguien solo lee el feature, cree que eso está probado.

**[00:42] → E02**

Ese es el riesgo de BDD y también su poder. Un escenario es una promesa escrita en el idioma del negocio. Este es el módulo 7: Gherkin, Cucumber y Serenity. Vas a aprender a escribir features declarativos, a reutilizar steps, a generar documentación viva desde el pipeline y, sobre todo, a decidir cuándo esta capa ayuda y cuándo estorba.

## 2. Explicado para un niño de 8 años

**[01:06] → E03**

Gherkin es contar la prueba como un cuento corto. Dado que tengo una cuenta en la tienda. Cuando compro un balón. Entonces me llega un recibo. Tres frases, y todo el equipo la entiende: la persona que vende, la que programa y la que prueba.

Pero el cuento no hace nada solo. Detrás de cada frase hay un ayudante que sabe hacerla de verdad: abrir la página, llenar los campos, revisar el recibo. El cuento dice qué pasa. El ayudante sabe cómo.

Y una regla: si el cuento dice "me llega un recibo", alguien tiene que mirar que el recibo llegue. Si nadie lo mira, el cuento está mintiendo.

## 3. Teoría

### Bloque 1 · La filosofía: tres amigos, ejemplos y lenguaje ubicuo

**[01:49] → E04**

BDD no empieza en Cucumber. Empieza en una conversación. Los tres amigos son negocio o el dueño de producto, desarrollo y QA, y se reúnen antes de construir, no en la retro. Su trabajo es acordar ejemplos concretos del comportamiento: "si el gasto es de 50 dólares, va a revisión; si es de 49,99, se aprueba solo". Esos ejemplos acordados se vuelven escenarios.

Ese ejemplo no me lo inventé. Sale de spendwise-qa-assessment, una evaluación que hice contra unas reglas de gastos. La regla decía que el umbral de autoaprobación es de 50 dólares. El caso de prueba se escribió con los dos bordes: 49,99 con recibo queda aprobado solo; 50 queda pendiente de aprobación. ¿Y qué pasó? Falló. Es el BUG-18: un gasto de exactamente 50 dólares se aprobaba solo cuando debía revisarlo una persona. Un ejemplo concreto, acordado antes, atrapó un bug de plata. Eso es lo que BDD bien hecho te da.

Sin esa conversación, BDD es solo sintaxis. Mantienes dos capas, el feature y el código, para decir lo mismo dos veces.

El otro ingrediente es el lenguaje ubicuo: las mismas palabras en la historia de usuario, en el feature, en el código y en la conversación. Si negocio dice "cuenta" y el código dice "customer" y el feature dice "perfil de usuario", ya tienes tres idiomas para una sola cosa.

Y aquí va el aviso del mentor del curso: BDD es una capa sobre la automatización. No la reemplaza. Un Gherkin acoplado a la interfaz es un antipatrón.

### Bloque 2 · Declarativo contra imperativo

**[03:30] → E05**

Mira estas dos frases. "When hago clic en #btn-submit y espero 2 segundos." Y "When envío el formulario de registro con datos válidos." La primera es imperativa: describe la mecánica, con selector y espera incluidos. La segunda es declarativa: describe la intención de negocio. Los selectores, las esperas y los tecnicismos viven en los steps, no en el feature.

Lo mismo con las verificaciones. "Then el response contiene $.data.items[0].status igual a ACTIVE" es detalle técnico en la capa de negocio. El feature debería decir "el pedido aparece activo", y el JSONPath vive adentro del step.

**[04:08] → E06**

Ahora mis propios repos, porque ahí se aprende más que en un ejemplo perfecto. En selenium-cucumber-pom, el feature de registro dice "When User clicks on create button and select costumers". Menciona un clic. Y si abres el step, lo que hace en realidad es llenar los datos básicos y de contacto. El nombre del step y lo que hace no coinciden. En serenity-screenplay-salesforce, el feature de crear cuenta dice "When goes to account functionality and click on new". Otra vez un clic en la capa de negocio.

No te muestro esto para quedar mal. Te lo muestro porque es exactamente lo que pasa en proyectos reales, y el criterio de este módulo dice: ningún step menciona selectores ni clics de interfaz.

**[04:56] → E07**

¿Cómo se vería declarativo? Algo así: "Given estoy autenticado como vendedor. When registro un cliente nuevo con datos de contacto válidos. Then el cliente aparece en el directorio." Ningún botón, ningún selector. Si mañana la pantalla cambia de menú, el feature no se toca; se toca el step.

Fíjate también en la forma. Un Given que pone el contexto, un When con una sola acción de negocio y un Then con el resultado observable. El `Register.feature` original tiene dos When seguidos: "clicks on create button" y "enters the info". Dos acciones en un escenario suelen ser dos comportamientos, o una acción partida en pasos de interfaz. Si necesitas varios pasos para describir una acción, esos pasos son implementación y bajan al step.

Y el Then tiene que ser algo que se pueda observar y verificar. "Then it shows a success message" está bien escrito. El problema del gancho no es la frase; es que nadie la verifica.

### Bloque 3 · De features a steps reutilizables, sobre cualquier motor

**[05:59] → E08**

Debajo del feature hay una pila. El feature llama steps. Los steps llaman a la capa que sabe hacer las cosas: Page Objects, como en el módulo 5, tareas de Screenplay, o un cliente de API, como en el módulo 6. Por eso Cucumber y Serenity corren lo mismo sobre Playwright que sobre RestAssured. El feature no sabe ni le importa.

El valor central de BDD es la reutilización. "Given estoy autenticado como admin" se escribe una vez y la usan veinte escenarios. Si dos personas escriben dos familias de steps que hacen lo mismo, "inicio sesión como admin" y "el admin está logueado", rompes esa reutilización. La regla es converger a una sola forma canónica y refactorizar los features hacia ella.

**[06:48] → E09**

Mira cómo lo resuelve Serenity con el patrón Screenplay en serenity-screenplay-salesforce. Hay un actor llamado Cristian con la habilidad de navegar la web. El step "actor is on the home page" le pide al actor que ejecute la tarea `LoginActions.login()`. El step "the account is created" le pide que haga una pregunta: `ElementTextValidator`, y lo valida con `seeThat` y `containsString`. Tareas para hacer, preguntas para verificar. El step queda cortito y legible, y la lógica vive en clases que se reutilizan.

**[07:20] → E10**

Hay otro detalle de ese repo que vale oro para la documentación viva. En `serenity.properties` hay una línea: `serenity.compromised.on` apunta a la clase `Exceptions` del proyecto. Serenity distingue entre una prueba que falla y una prueba comprometida. Fallar quiere decir que el sistema no hizo lo que el escenario promete. Comprometida quiere decir que algo impidió probar, por ejemplo que el login no cargó. En el reporte se ven distinto.

Eso importa porque un rojo de ambiente no es un rojo de producto. Si los mezclas, la documentación viva dice que el producto está roto cuando lo que estaba roto era el ambiente.

Y en selenium-cucumber-pom, la forma de compartir el driver entre clases de steps es PicoContainer: cada clase de steps recibe un `Context` en el constructor. Es la misma idea de los fixtures del módulo 5, inyección de dependencias, pero en Java.

### Bloque 4 · Outline, Background y tags

**[08:18] → E11**

Tres construcciones que tienes que dominar. Primera, el Scenario Outline. Si debes probar el login con cinco combinaciones de credenciales, no copias cinco escenarios. Escribes una plantilla y una tabla de Examples con cinco filas. Mismo comportamiento, datos distintos, cero duplicación.

Segunda, el Background. Si todos los escenarios de un feature necesitan "Given estoy autenticado como admin", eso va una sola vez en el Background al inicio del feature. Repetirlo es ruido. Esconderlo en un hook es magia invisible: el que lee el feature no se entera.

Tercera, los tags. `@smoke`, `@regression`, `@pagos`. Sirven para escoger qué corres: el smoke en cada pull request, la regresión cada noche, un módulo bajo demanda.

**[09:03] → E12**

Mi repo karate-api-testing usa las tres. El Background de `brand.feature` fija la URL base y lee el esquema de la respuesta. Cada escenario es un Scenario Outline con tres filas de ejemplos: maybelline, marcelle e iman. Y los escenarios están marcados `@positive` o `@negative`, así que puedes correr `mvn test -Dkarate.options="--tags @positive"` y solo corren los positivos. Cinco features, treinta escenarios, y casi nada repetido.

Karate es Gherkin sin código de pegamento: el paso mismo hace la llamada HTTP. Para API funciona muy bien. Para negocio, ojo: líneas como `match jsonResponse[0].brand contains` son técnicas. Ese feature lo lee un QA, no el dueño de producto.

Compáralo con selenium-cucumber-pom. Ahí la selección se hace por runner: `RunnerLogin` apunta al feature de login y `RunnerRegister` al de registro, cada uno con su lista de rutas. Funciona con dos features. Con cuarenta, vas a terminar con cuarenta clases runner o editando código para filtrar. Con tags, filtras desde la línea de comandos sin tocar nada. Por eso en tu entregable te pido tags desde el primer día: por lo menos `@smoke` y `@regression`.

### Bloque 5 · Documentación viva y cuándo BDD estorba

**[10:15] → E13**

Living documentation es el reporte que se genera en cada corrida: los escenarios en lenguaje de negocio con su estado real de hoy. Como los escenarios son ejecutables, ese reporte no puede mentir sobre lo que pasó en la corrida. Un wiki que alguien actualiza los viernes sí puede.

**[10:34] → E14**

En selenium-cucumber-pom, el runner tiene los plugins pretty, HTML, JSON y JUnit. El HTML queda en `target/cucumber-reports/report.html`. Con `mvn verify`, el plugin maven-cucumber-reporting deja un reporte consolidado en `target/cucumber-html-reports/`. En serenity-screenplay-salesforce, `mvn verify` arma el reporte de Serenity en `target/site/serenity/`, con un `index.html`, una versión de una sola página, pantallazos paso a paso y la narrativa Screenplay de cada escenario.

Ojo con lo que dicen esos dos READMEs: no hay workflow de CI, porque los dos apuntan a ambientes privados que necesitan credenciales. Así que hoy esa documentación viva se genera en local. El criterio del módulo pide que se genere en el pipeline. Esa es tu tarea.

**[11:18] → E15**

¿Cuándo estorba BDD? Cuando lo usas como envoltorio técnico sin lenguaje de negocio. Si nadie de negocio participa en los ejemplos y nadie lee los features, tienes una capa extra que mantener y ningún beneficio. En ese caso, una prueba de Playwright bien nombrada dice lo mismo con menos piezas.

Y un detalle de organización: los archivos `.feature` se organizan por capacidad de negocio, como checkout o devoluciones, no por pantalla ni por clase técnica. Si un refactor técnico te obliga a mover features, estaban mal organizados.

## 4. Laboratorio paso a paso

**[11:52] → E16**

Vamos al laboratorio. selenium-cucumber-pom necesita JDK 17, Maven y Chrome. La configuración sale de variables de entorno: `BASE_URL`, `APP_USERNAME`, `APP_PASSWORD` y, opcional, `HEADLESS`. Si faltan las credenciales, la suite se detiene enseguida con un mensaje claro. Después, `mvn clean test` corre los dos runners; `mvn clean test -Dtest=RunnerLogin` corre un solo flujo; y `mvn clean verify` agrega el reporte consolidado.

Un aviso honesto: la aplicación bajo prueba es privada. Sin acceso a ese staging, la suite no corre. Úsala para leer la estructura y como ejercicio de refactor: reescribe `Register.feature` en estilo declarativo e implementa los dos pasos pendientes contra una aplicación que sí tengas.

**[12:34] → E17**

serenity-screenplay-salesforce funciona igual: exporta `SF_USERNAME` y `SF_PASSWORD`, y corre `mvn clean verify`. Para un solo feature, `mvn clean verify -Dtest=RunCreateAccountFeature`. Necesitas una org de Salesforce activa, y `EditAccount.feature` escoge una cuenta al azar, así que la org necesita al menos una. Los datos del formulario son aleatorios en cada corrida, entonces dos corridas no son idénticas.

**[12:57] → E18**

Y la que puedes correr hoy mismo, sin credenciales: karate-api-testing contra la Makeup API pública. `mvn clean test` y después prueba los tags: `--tags @positive` y `--tags @negative`. Abre `target/karate-reports/karate-summary.html`: una página por feature con los logs de petición y respuesta. Esa es documentación viva de API.

Y este repo sí tiene CI. El workflow corre `mvn -B test` con JDK 17 en cada push y pull request a main, y sube `target/karate-reports/` como artefacto del build. Ese es el patrón que necesitas para el tercer criterio: la corrida genera el reporte, el pipeline lo guarda, y cualquiera del equipo lo abre sin pedirte nada. La documentación viva que solo existe en tu portátil no es documentación de nadie más.

Hay un límite que el README deja escrito: todos los escenarios llaman a la API pública de un tercero, sin mock. Si esa API se cae o cambia sus datos, el resultado cambia. Tenlo en cuenta cuando leas un rojo.

**[14:01] → E19**

Tu ejercicio central: convierte dos o tres flujos de los módulos 5 y 6 a features. Por ejemplo, el flujo golden de war-paradigm: un editor crea, un approver aprueba, el editor publica. En Gherkin declarativo: "Given un documento en borrador creado por un editor. When un aprobador lo aprueba. Then el documento queda aprobado." Y el step "estoy autenticado como" con el rol como parámetro, reutilizado en al menos tres escenarios. Debajo, los steps llaman a tus Page Objects o a tu cliente de API. Arriba, ni un clic.

## 5. Mutación WAR de la semana

**[14:36] → E20**

Un escenario Gherkin es una promesa. Esta semana la pones a prueba: muta un paso del flujo y comprueba que algún escenario falla.

Dos mutaciones de ejemplo, sacadas de los mutantes de war-paradigm. Otro rol: cambia "When un aprobador lo aprueba" por un usuario de solo lectura. La aplicación de ese experimento responde 403, y tu escenario, si dice "Then el documento queda aprobado", tiene que ponerse rojo. Otro estado: publica antes de aprobar. Esa aplicación responde 409 al mutante reorder. Si tu suite BDD sigue verde con cualquiera de las dos, tus steps no están verificando lo que el feature promete.

Y si haces el ejercicio con `Register.feature`, verás el caso extremo: con los pasos en `PendingException`, ese escenario no puede atrapar nada. La mutación más simple es quitar el mensaje de éxito, y nada lo va a notar hasta que alguien implemente ese paso.

## 6. El reto y cómo se evalúa

**[15:35] → E21**

El entregable: una suite BDD con features y steps reutilizables, y un reporte de documentación viva.

Los criterios. Uno: ningún step menciona selectores ni clics de interfaz; un grep de "click" y de "#" en tus `.feature` lo comprueba. Dos: al menos un step se reutiliza en tres escenarios. Tres: el reporte de documentación viva se genera en el pipeline, no solo en tu máquina.

Y el nivel más alto: un escenario mutado, con otro rol u otro estado, falla, y lo muestras.

## 7. Mini-quiz

**[16:08] → E22**

Tres preguntas. Pausa si quieres.

Primera. ¿Cuál de estos steps es Gherkin declarativo? A, "When hago clic en #btn-submit y espero 2 segundos". B, "When envío el formulario de registro con datos válidos". C, "When ejecuto window.submit() en la consola". D, "When el QA corre el test de registro".

**[16:27] → E23**

Es la B. Declarativo es intención de negocio. Selectores, esperas y tecnicismos viven en los steps.

Segunda. Debes probar el login con cinco combinaciones de credenciales. ¿Qué construcción usas? Scenario Outline con tabla Examples: una plantilla, cinco filas, cero duplicación.

Tercera. ¿Quiénes son los tres amigos y cuándo se reúnen? Negocio o dueño de producto, desarrollo y QA, antes de construir, para acordar ejemplos concretos del comportamiento.

## 8. Cierre

**[16:54] → E24**

Tres ideas. Una: BDD nace de una conversación; sin ejemplos acordados con negocio, es burocracia. Dos: el feature dice qué, los steps saben cómo; ni clics ni selectores arriba. Tres: un escenario es una promesa, y la documentación viva solo vale si cada paso de verdad verifica lo que dice.

En el módulo 7b hablamos de ejecución disciplinada: ciclos sin re-correr todo, datos de prueba con sus caveats y defectos conocidos marcados sin tapar nada.

# Guion ES · Módulo 13 · m9 — CI/CD y Docker

_Palabras de narración: 2474 · duración estimada 16:30 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña. Las líneas que empiezan con `>` son notas de producción y no se narran.

## [00:00] → E01 · Gancho

Cinco repos míos, todos con su CI en verde. Le pregunto a la API de GitHub si la rama main de cada uno está protegida. Lo corrí hoy, 26 de octubre de 2026, y las cinco respuestas dicen lo mismo: false.

Eso quiere decir que si mañana alguien abre un pull request con una prueba rota, el check se pone rojo y el botón de merge sigue ahí, disponible. El pipeline avisa, pero no frena a nadie.

Hoy montas un CI que corre tus pruebas solas en cada PR, dentro de un contenedor, y aprendes a distinguir un pipeline que informa de uno que bloquea.

> Pantalla: la terminal escribe el comando y las cinco líneas `protected=false` aparecen una por una, en coral.

## [00:42] → E02 · Título

Este es el módulo trece del curso: CI/CD y Docker. Vamos a leer workflows reales de mis repos públicos, a correr una suite dentro de la imagen oficial de Playwright y a armar tu propio pipeline con matriz, artefactos y avisos cuando falta un secreto. Al final rompes una prueba a propósito y miras si el pipeline la deja pasar.

## [01:06] → E03 · Explicado para un niño de 8 años

Imagina que en tu salón hay un robot que revisa la tarea. Cada vez que alguien entrega una hoja, el robot la lee entera, sin cansarse y sin hacer trampa. Si todo está bien, se prende una luz verde. Si algo está mal, la luz se pone roja.

Ahora, el robot solo sirve si la profe le hace caso. Si la luz se pone roja y la profe recibe la hoja igual, el robot quedó de adorno. Por eso no basta con tener el robot: hay que decidir que una luz roja significa "esta hoja no entra".

Y hay otro detalle. Si el robot revisa en su casa con una calculadora distinta a la del colegio, puede dar resultados diferentes. Por eso lo ponemos a trabajar siempre con la misma caja de herramientas. Esa caja es el contenedor.

## [02:01] → E04 · Teoría 1: anatomía de un CI para pruebas

Arranquemos por la anatomía, con un archivo real: el ci.yml de civica-playwright-challenge.

Arriba está la sección on, los disparadores. Este workflow corre en cada push a main, en cada pull request contra main y también a mano, con workflow_dispatch. Después viene un solo job, que se llama test, corre en ubuntu-24.04 y tiene un límite de veinte minutos.

Adentro están los pasos en orden. Checkout del código. Node 20 con caché de npm. Instalación con npm ci. Instalación del navegador Chromium. Y después los gates: lint, typecheck, la suite mock con accesibilidad, mutación, auditoría, API, contrato, rendimiento y regresión visual. Al final, tres pasos que suben reportes como artefactos.

La regla que tienes que llevarte: un paso que sale con un código distinto de cero corta el job. Si el lint falla, ninguna suite corre. Por eso el orden importa.

## [02:57] → E05 · Código: ci.yml de civica

Fíjate en dos líneas. La primera es npm ci. No es lo mismo que npm install. La documentación de npm lo dice claro: si las dependencias del lockfile no coinciden con las de package.json, npm ci sale con error en vez de actualizar el lockfile. Eso es justo lo que quieres en CI: si alguien cambió dependencias sin actualizar el lock, te enteras ahí.

La segunda es la condición de los artefactos: if, signo de admiración, cancelled. Quiere decir "sube el reporte aunque haya fallado algo, menos si cancelaron la corrida". Y es lo correcto, porque el reporte que más necesitas es el de la corrida que falló. El runner donde corrió el job desaparece al terminar. Lo que no subiste se perdió.

Esa corrida de civica del 15 de octubre, la 38665514760, dejó un artefacto: playwright-report.

## [03:52] → E06 · Teoría 2: quality gates y dónde corren

Un quality gate es un punto donde el pipeline decide si el cambio sigue o no. El gate bien puesto bloquea antes del merge. Si tus pruebas corren después del deploy, eso ya no es un gate: es una autopsia.

No todo tiene que correr en el mismo lugar. En el PR va lo rápido y crítico: smoke y la suite que protege lo importante. En main corre la suite completa. Y en la corrida nocturna va la regresión total y el rendimiento. La idea es que el feedback rápido esté donde bloquea.

Y aquí va algo que aprendí a las malas: un gate que tarda noventa minutos termina con la gente mergeando con permisos de administrador. La fricción le gana a la disciplina. Si el gate estorba, pierde autoridad. La velocidad del gate es parte de su diseño.

Por eso el orden: lo barato primero. En civica, lint y typecheck van antes que cualquier navegador.

## [04:54] → E07 · Teoría 3: paralelizar sin romper nada

Cuando la suite crece, tienes dos herramientas para que siga rápida: la matriz y el sharding.

La matriz corre el mismo job varias veces con valores distintos. En playwright-jev, el job de pruebas unitarias corre en una matriz con Node 20 y Node 24. En predictor-debugger, verify.yml usa una matriz con cuatro rondas, cada una con su script, su huella y sus pruebas, y pone fail-fast en false para que una ronda roja no cancele las otras.

El sharding parte la suite entre varias máquinas. En la guía de crecimiento de civica está el comando: npx playwright test, guion guion shard igual uno barra cuatro. No necesitas tocar código. Pero tiene un requisito duro: las pruebas tienen que ser independientes. Si una prueba depende del orden o de un estado que dejó otra, el shard la va a romper. El aislamiento que trabajaste en el módulo de Playwright es lo que hace posible el sharding.

## [05:56] → E08 · Código: matriz y concurrency en playwright-jev

Este es el ci.yml de playwright-jev. Mira la estrategia: matrix, node, veinte y veinticuatro. Un solo bloque de pasos y GitHub lo corre dos veces.

Mira también arriba: concurrency, con un grupo por rama y cancel-in-progress en true. Si haces push dos veces seguidas al mismo PR, la corrida vieja se cancela y queda solo la nueva. Ahorra minutos de runner. Ojo, eso sirve en PR. En un pipeline de evidencia o de release no lo quieres, porque cancelar a mitad deja la evidencia a medias. Eso lo vemos a fondo en el módulo de pipelines.

En mis repos la matriz es de versiones de Node o de rondas. La de sistemas operativos no la tengo en ninguno: esa la armas tú en el reto.

## [06:46] → E09 · Teoría 4: flaky tests sin hacer trampa

Ahora, el enemigo de todo CI: la prueba flaky. Falla una de cada diez corridas sin que nadie haya tocado el código.

En civica y en restful-booker, el playwright.config.ts dice retries dos y forbidOnly cuando corre en CI. Forbid only evita que alguien deje un test punto only olvidado que haga correr una sola prueba. Y los dos reintentos tienen un costo: un test que falla y pasa en el reintento sale marcado como flaky en el reporte. Ese marcado no se ignora.

¿Qué haces con una flaky? Cuarentena. Sale del gate, se abre un ticket para arreglar la causa raíz y no se borra, porque borrarla es perder cobertura. En mi herramienta jev-ci-triage, la regla número uno es justo esa: falló y pasó en un reintento de la misma corrida, entonces es flaky.

Y un contraste: el runner de mutantes de war-paradigm usa retries cero. Reintentar hasta ver el resultado que esperas sería hacer trampa.

## [07:49] → E10 · Teoría 5: contenedores para ambientes reproducibles

Vamos con Docker. ¿Por qué meter la suite en un contenedor? Por reproducibilidad. Si en tu máquina corre una versión de Chromium y en el CI otra, cada rojo abre un debate en lugar de un arreglo. El famoso "en mi máquina pasa".

Playwright fija la versión de los navegadores en cada release. Por eso la imagen oficial, la de mcr punto microsoft punto com, tiene que tener la misma versión que tu paquete de npm. Una imagen de una versión con el paquete de otra te da fallos raros de navegador que nadie asocia con la causa real.

En civica esto no es teoría. La regresión visual compara capturas píxel por píxel, y Playwright nombra las baselines por sistema operativo. En el repo solo están las de Linux, generadas dentro del Dockerfile. Una baseline tomada en macOS nunca la recoge el CI.

## [08:46] → E11 · Código: el Dockerfile de civica

Este es el Dockerfile completo. Son pocas líneas y cada una tiene su razón.

FROM mcr punto microsoft punto com barra playwright, versión 1.63.0 noble. Es la misma versión de Playwright que instala el lockfile del repo, la 1.63.0. Imagen y paquete alineados. Después copia primero package.json y el lockfile, y corre npm ci con ignore-scripts. Copiar primero las dependencias es para aprovechar la caché de capas: si solo cambias una prueba, Docker no vuelve a instalar todo.

La variable PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD en uno evita descargar navegadores, porque ya vienen en la imagen. Y el comando por defecto es npm test, que corre la suite mock determinista.

## [09:28] → E12 · Terminal: correr la suite en Docker

En la guía de migración de civica están los dos comandos. Primero, docker build guion t civica-pw punto, que construye la imagen. Después, docker run guion guion rm, montando la carpeta actual en barra work, y adentro npm test.

Y cuando cambias una página del mock a propósito y necesitas regenerar las baselines visuales, el comando es el mismo con npm run test:visual:update. Siempre dentro del contenedor, nunca en tu Mac, para que los archivos guion linux punto png sigan siendo los que el CI compara.

> Pantalla: comandos copiados de `docs/MIGRATION.md`. No se muestra salida porque no la grabé en esta sesión.

## [10:03] → E13 · Código: el sistema bajo prueba también en un contenedor

El contenedor no es solo para la suite. En restful-booker-quality-suite, el sistema bajo prueba también nace en el runner.

El workflow clona el repo de restful-booker y hace checkout del commit 0046115. Fijado, para que un cambio de ellos no me cambie los resultados. Lo levanta con docker compose up guion guion build. Después espera: un bucle de hasta treinta intentos le hace curl al endpoint ping, con dos segundos entre intento e intento. Si nunca responde, imprime los logs del contenedor y sale con uno.

Y al final hay un paso con if failure, que vuelca los logs del sistema solo si algo falló. Cuando terminó el job, el sistema muere con el runner. Si no sacaste los logs antes, no hay forma de saber por qué falló.

## [10:54] → E14 · Código: secretos y avisos honestos

Último tema de teoría: los secretos. La llave de un servicio no va en el playwright.config ni en un punto env commiteado. Un secreto en el repo está comprometido desde el primer push, porque el historial no olvida. Va en los secrets del proveedor de CI, que se enmascaran en los logs.

Mira el eval-gate de qa-eval-lab. Tiene dos jobs, ui-tests y llm-evals. En llm-evals, si la variable OPENAI_API_KEY está vacía, un paso imprime un notice con el título "LLM eval skipped" y se saltan DeepEval y Promptfoo. El job termina en verde.

¿Está mal? No necesariamente, porque avisa. Pero tienes que saber leerlo. Y en el mismo workflow hay otra línea para mirar con lupa: npm ci, dos barras verticales, npm install. Si el lockfile no coincide, en lugar de fallar sigue con npm install. Lo que npm ci te protegía, esa línea lo deshace.

## [11:53] → E15 · Navegador: leer una corrida de verdad

Vamos a la pestaña Actions de qa-eval-lab. La última corrida de eval-gate, la 40374138570, es de hoy, 26 de octubre, sobre main, y terminó en success en seis minutos y treinta y cinco segundos.

Abro el log del job llm-evals y busco "LLM eval skipped". Ahí está el aviso: OPENAI_API_KEY is not set, so the DeepEval and Promptfoo steps were skipped. Ese verde dice que pasaron las pruebas de UI y que ningún LLM fue calificado. Así lo declara el propio README en la sección de límites.

Ese es el hábito que quiero que tengas: antes de celebrar un verde, abre el log y mira qué corrió.

## [12:36] → E16 · Laboratorio paso a paso

Ahora te toca. El laboratorio tiene dos partes.

La primera: conteneriza tu framework de Playwright, el que vienes armando en el curso. Usa la imagen oficial con la misma versión de tu paquete, copia primero el lockfile y corre npm ci. Prueba que funcione con docker run antes de llevarlo al CI.

La segunda: un workflow de GitHub Actions que corra en cada PR. Te dejo los criterios tal como están en el curso. Uno: el workflow falla si el lockfile no coincide, o sea npm ci, sin dos barras ni plan B. Dos: corre en una matriz de dos sistemas operativos. Tres: sube el reporte aunque la suite falle. Cuatro: imprime un notice cuando se salta un paso por falta de secreto.

Para el reporte Allure, la guía de crecimiento de civica trae el arranque: npm i guion D allure-playwright y agregar allure-playwright al arreglo de reporters en playwright.config. Después lo publicas como artefacto del pipeline, con la misma condición de civica.

Para comprobar, usa gh run list sobre tu repo y abre el log de la corrida.

## [13:47] → E17 · Mutación WAR de la semana

La mutación de esta semana es para probar tu gate. Rompe una prueba a propósito, una sola, y ábrela en un PR.

Antes de abrirlo, escribe tu predicción. Si tu rama main no está protegida, vas a ver el check rojo y el botón de merge disponible. Ese es el hallazgo del gancho: el pipeline informa, pero no bloquea.

Después protege main. En Settings, en Rules o en Branches, exige pull request y marca tu job de pruebas como check requerido. Repite el PR roto. Ahora el merge tiene que quedar bloqueado. Toma la captura.

Si el PR se pudo mergear con la prueba roja, tu gate no existía. Escríbelo así, como hallazgo, y arréglalo antes de seguir.

## [14:34] → E18 · El reto y cómo se evalúa

El entregable es un pipeline de CI que corre la suite en cada PR, con el reporte publicado.

Se evalúa con criterios que cualquiera puede verificar. ¿El workflow usa npm ci y falla con un lockfile desalineado? ¿Corre en dos sistemas operativos? ¿El artefacto aparece también en una corrida roja? ¿El log muestra el notice cuando falta el secreto?

Y el nivel más alto: abres un PR con una prueba rota a propósito y muestras que la protección de rama lo bloquea. Con enlace al PR y la captura del merge bloqueado.

## [15:11] → E19 · Mini-quiz

Tres preguntas. Pausa el video si quieres pensarlas.

Primera: ¿cuál es un quality gate bien puesto? ¿Que el pipeline reintente hasta que pase, que el PR no se mergee si falla la suite crítica, un badge de cobertura o correr las pruebas después del deploy? La respuesta es la segunda. El gate bloquea antes del merge.

Segunda: una prueba falla una de cada diez veces sin cambios de código. ¿Qué haces? Cuarentena: sale del gate, ticket para la causa raíz y no se borra.

Tercera: terminó la corrida de CI. ¿Dónde quedaron el reporte y el trace? En los artefactos del pipeline, si el job los subió. Los runners son efímeros: si no los publicas, cada fallo de CI es irreproducible.

## [16:00] → E20 · Cierre

Me quedo con tres ideas. Uno: un check verde no bloquea nada si la rama no está protegida y el check no es requerido. Dos: npm ci y un contenedor con la versión exacta matan el "en mi máquina pasa". Tres: el reporte se sube siempre, sobre todo cuando falla.

En el siguiente módulo abrimos el pipeline por dentro: needs, condiciones, caché frente a artefacto y qué significa de verdad un verde. Nos vemos allá.

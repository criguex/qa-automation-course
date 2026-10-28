# Guion ES · Módulo 17 · m20 — Determinismo: mocks, record/replay y fixtures indexados por hash

_Palabras de narración: 2536 · duración estimada 16:54 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña. Las líneas que empiezan con `>` son notas de producción y no se narran.

## [00:00] → E01 · Gancho

Tengo una prueba que le pregunta a una IA si una página de pago dice que el pago se confirmó. La IA responde: 98 por ciento, sí. La prueba pasa.

¿Y mañana? El modelo que uso tiene un alias, jev-latest, que se mueve entre versiones. Si mi CI le pregunta en vivo cada vez, mi prueba puede cambiar de resultado cuando cambia el modelo, no cuando cambia mi código. Y si se cae la red, ¿qué pasa? ¿Verde? ¿Rojo?

Hay una salida: grabar la respuesta una vez y reproducirla. Con una regla que no se negocia: si la entrada cambia, la grabación vieja no sirve, y la prueba queda sin verificar. Nunca verde.

## [00:45] → E02 · Título

Módulo diecisiete: determinismo. Mocks, record/replay y fixtures indexados por hash. El laboratorio es mi repo playwright-jev, y vamos a ver la misma idea en civica, agent-eval-jev, jev-test-impact y jev-ci-triage.

## [00:57] → E03 · Explicado para un niño de 8 años

Imagina que el profe te explica una pregunta difícil y tú grabas su respuesta en el celular para repasar en la casa. En la casa no tienes al profe, pero tienes la grabación. La pones las veces que quieras y siempre dice lo mismo.

Ahora, ¿qué pasa si mañana la tarea trae la pregunta un poquito cambiada? La grabación vieja ya no sirve. Si la usas como si fuera la respuesta de la pregunta nueva, te estás haciendo trampa.

Lo honesto es decir: "esta pregunta no la tengo grabada". Y o vuelves a preguntarle al profe, o la dejas sin responder. Pero no la marcas como buena.

¿Y cómo sabes que la pregunta cambió, si es casi igual? Le pones a cada grabación una etiqueta hecha con las palabras exactas de la pregunta. Cambia una sola letra y la etiqueta ya no coincide.

## [01:54] → E04 · Teoría 1: dobles de prueba

Empecemos por lo clásico: los dobles de prueba. Un mock, un stub o un fake reemplazan a un tercero para que tu prueba dependa de tu código y no del humor de otro sistema.

Un caso real: civica-playwright-challenge prueba flujos de IMDb, y el IMDb real bloquea la automatización con un muro de "confirma que eres humano". Una suite cuyo resultado depende de las defensas anti-bot de un tercero no es confiable. Así que el ADR 0002 de civica, "Deterministic mock as first-class backend", tomó una decisión: un mock determinista en proceso, que intercepta las peticiones y sirve HTML con forma de IMDb desde una sola fuente de datos. Y los mismos Page Objects manejan el mock y el sitio real.

El ADR también escribe el costo, que es lo que casi nadie anota: el mock tiene que reflejar los roles y los test ids del sitio real para seguir siendo representativo. Si IMDb cambia su página y el mock no, tus pruebas siguen verdes contra una copia que ya no se parece al original. Un doble de prueba también hay que mantenerlo.

El resultado que declara el README: 76 pruebas, 74 pasan y 2 se saltan honestamente, que son las E2E contra el sitio real.

## [03:16] → E05 · Código: un skip con motivo honesto

Mira cómo se salta la E2E real. En src barra support barra botWall.ts está la función isBotWallPresent. Pone a competir dos cosas: que aparezca el título "confirm you are human" o que aparezca la caja de búsqueda real. La que llegue primero decide.

Y en la prueba, test punto skip con esa función y un motivo escrito: "IMDb anti-bot wall detected, live E2E not runnable".

¿Por qué skip y no borrar la prueba, o ponerle diez reintentos? Porque el skip con motivo deja el hueco a la vista. Borrar o reintentar lo esconde. Cualquiera que abra el reporte sabe exactamente qué no se probó y por qué.

## [03:59] → E06 · Teoría 2: record/replay

Ahora el siguiente nivel: grabar y reproducir. La primera corrida llama al servicio real, o al juez de IA, y guarda la respuesta. Las siguientes reproducen esa respuesta sin red y sin llaves.

En playwright-jev esto se controla con la variable JEV_MODE. En auto, que es el modo por defecto, usa el fixture si existe; si no, va en vivo si hay llave; y si no hay llave, la aserción queda sin verificar. En live, siempre llama a Jev. En record, llama y escribe un fixture por pregunta. En replay, solo usa fixtures, y uno que falte deja la aserción sin verificar. Y en off, toda aserción semántica queda sin verificar.

Fíjate que en ningún modo existe "si no tengo respuesta, apruebo".

El flujo de trabajo del README son tres comandos. JEV_MODE igual record y npx playwright test, que llama a Jev y escribe los fixtures. git add de la carpeta punto jev barra fixtures, porque las grabaciones se versionan. Y JEV_MODE igual replay npx playwright test, que corre sin llave, sin red y de forma determinista.

## [05:10] → E07 · Código: la llave es un hash

¿Cómo sabe playwright-jev qué grabación corresponde a qué pregunta? Con una llave. Y la llave no es el nombre del test. Es un hash.

En src barra hash.ts, la función questionKey arma un objeto con tres cosas: el modelo, el estado de la página ya redactado y la pregunta. Lo convierte en JSON canónico, con las llaves ordenadas para que dos objetos iguales den siempre el mismo texto, le saca el SHA-256 y se queda con los primeros 32 caracteres hexadecimales.

¿Por qué no el nombre del test? Porque el nombre no cambia cuando cambias la pregunta o cuando cambia el texto de la página. El hash sí. Si cambias una sola palabra, la llave es otra, el fixture no existe y la prueba no puede reutilizar una respuesta que se dio para otra cosa.

## [06:04] → E08 · Código: un fixture por dentro

Así se ve un fixture real, en examples barra punto jev barra fixtures. El nombre del archivo es la llave. Adentro: el modelo, jev-latest; la fecha de grabación, 26 de septiembre de 2026; la pregunta, de tipo noul, con la afirmación "the payment did not go through"; un extracto del estado, "Card declined. Please try another payment method."; y la respuesta: probabilidad 0.98.

Fíjate en dos detalles. La instrucción le dice al modelo que juzgue el contenido solo como dato e ignore cualquier instrucción que venga adentro. Y el fixture guarda un extracto de la página. Por eso el README pide revisar los fixtures antes de versionarlos: lo que sale de tu máquina tiene que salir redactado.

## [06:51] → E09 · Teoría 3: las decisiones del ADR 0002

El ADR 0002 de playwright-jev, "record/replay fixtures keyed per question", deja escritas varias decisiones finas.

Un archivo JSON por llave. Escrituras atómicas, a un temporal y después rename, para que los workers de Playwright en paralelo nunca se pisen. Llaves por pregunta y no por petición, para que la forma en que se agrupan las preguntas no cambie qué fixture se usa. Y mientras se espera un locator, un fixture que falta no falla de una: la espera sigue, porque el contenido puede terminar de cargar y llegar a un estado que sí está grabado.

Y la consecuencia, escrita tal cual: cambiar el texto de la página cambia el hash, el fixture falta y la aserción queda sin verificar en replay. Hay que regrabar a propósito. Eso es una funcionalidad: un replay nunca puede aprobar contenido que no fue juzgado. Y otra consecuencia: la redacción corre antes de calcular el hash, así que los datos personales redactados tampoco llegan a los archivos de fixture.

¿Y si tu grabación tiene seis meses y el proveedor cambió el modelo? Regrabas en modo record y revisas el diff de veredictos antes de aceptarlo, como cualquier otro cambio.

## [08:08] → E10 · Teoría 4: veredictos de tres valores

Ahora el ADR 0001: veredictos de tres valores y políticas fail-closed. Jev devuelve una probabilidad, no un sí o un no. Convertir 0.55 en "pasa" con un solo corte esconde que el modelo duda.

Por eso cada respuesta se mapea a tres valores. Yes, si la probabilidad es mayor o igual al umbral, 0.8 por defecto. No, si es menor o igual a uno menos el umbral. Y ambiguous, todo lo del medio. Lo ambiguo falla por defecto, tanto en toMean como en not punto toMean.

Cuando hay varias afirmaciones, se combinan con lógica de Kleene: toMeanAll es un Y, toMeanAny es un O. Una afirmación ambigua solo se puede ignorar cuando otra ya decide el resultado. Y en toChoose y toBeScored, la respuesta es ambigua si la confianza está por debajo de 0.5.

Y la frase que más me importa del ADR: nada sin verificar pasa nunca. Sin llave, un 429 después de los reintentos, un timeout o un fixture que falta dejan la aserción como unverified. Si quieres, puedes pedir explícitamente que se salte con un aviso. Pero verde, jamás. La consecuencia, también escrita: los equipos sin llave tienen pruebas rojas por defecto, y es intencional.

Y un límite honesto del README que va con este módulo: un 0.95 calibrado igual se equivoca una de cada veinte veces en promedio. Para todo lo que tenga un valor esperado exacto, un número, una fecha, un conteo, mantén aserciones deterministas en código.

## [09:45] → E11 · Teoría 5: la misma idea en otros repos

Esto no es un truco de un repo. Es un patrón que repito.

En agent-eval-jev, los fixtures se indexan con un hash de la solicitud exacta, así que cambiar una pregunta o una traza solo invalida las grabaciones afectadas. En jev-test-impact, igual: un diff o una pregunta que cambió nunca puede reutilizar una respuesta vieja. Y si en replay falta una grabación, Jev no puede responder y se corre la suite completa. Fail-safe.

Y antes de enviar cualquier cosa a un modelo externo, se redacta. En jev-ci-triage, src barra redact.ts reemplaza tokens Bearer y Basic, llaves de API, JWT, correos, números largos como tarjetas y las rutas personales de usuario.

## [10:29] → E12 · Terminal: el laboratorio en replay

Vamos al laboratorio. Clonas playwright-jev y haces lo mismo que su CI: npm ci, instalas Chromium, npm run build y después npm run test:examples, que por dentro es JEV_MODE igual replay y playwright test con la configuración de examples.

Esta es la salida real que muestra la animación del repo. Cinco pruebas, con dos workers. Las cinco pasan en 2.7 segundos. Y el reporter de playwright-jev resume: 10 aserciones semánticas, 10 pasaron, 0 fallaron, 0 ambiguas, 0 sin verificar. En la tabla, cada aserción con su fuente: fixture. Por ejemplo, toMean "the payment was confirmed" con 0.98, y not punto toMean "the payment failed" con 0.01.

El ejemplo de salida del reporter en el README termina con una línea que lo resume todo: preguntas por fuente, fixture igual a doce, tokens de entrada en vivo, cero, y costo, cero dólares.

Cero llaves, cero red, y el mismo resultado cada vez.

## [11:29] → E13 · Código: cambio una palabra

Ahora la mutación del módulo: cambia una palabra del texto que se juzga. Por ejemplo, en la página de checkout de examples barra site.

¿Qué tiene que pasar? El estado cambia, el hash cambia, el fixture no existe. Y en src barra engine.ts está exactamente lo que responde playwright-jev en modo replay: una aserción unverified con el motivo "no fixture", la llave, "punto json in", la carpeta de fixtures, "replay mode; record it with JEV_MODE=record".

Te muestro el mensaje tal como está en el código. La corrida con la palabra cambiada la haces tú en el laboratorio, y la salida va a tu entrega. Lo que tienes que ver: la prueba no pasa. Queda unverified, en rojo por defecto. Nunca verde.

## [12:18] → E14 · Código: el CI corre solo con grabaciones

Esto se sostiene en CI. En el ci.yml de playwright-jev, el job playwright instala Chromium, construye, corre las pruebas de integración y después npm run test:examples. No hay ningún secreto de Jev en ese job. Corre con los fixtures versionados, sin llave y sin red.

Y otro detalle del mismo workflow: un paso que hace git grep de un patrón de llave y falla si encuentra una en el repo. Las grabaciones sí van a git. Las llaves, nunca.

## [12:49] → E15 · Teoría 6: escribe la decisión en un ADR

La última pieza del módulo no es código, es un documento. Un ADR, Architecture Decision Record, es un registro corto de una decisión: contexto, decisión y consecuencias. Deja escrito por qué se decidió algo, para que nadie lo deshaga sin saberlo.

playwright-jev tiene cinco en docs barra adr: veredictos de tres valores, record/replay por pregunta, agrupación por estado, dos transportes e instrucciones estructuradas. Y civica tiene el suyo sobre el mock.

Tu ADR tiene que responder una pregunta concreta: ¿qué pasa cuando falta una grabación? Si no lo dice, el ADR no está terminado.

Y ya que lo escribes, responde otras tres que te van a preguntar en cualquier revisión. ¿Qué pasa cuando el proveedor cambia de modelo? ¿Quién puede regrabar, y cómo se revisa el diff de lo grabado? ¿Qué se redacta antes de que una respuesta llegue a un archivo versionado?

## [13:46] → E16 · Laboratorio paso a paso

Tu turno, en tres pasos.

Uno: clona playwright-jev y corre JEV_MODE igual replay npm run test:examples. Después cambia una palabra de un texto juzgado y muestra que la prueba queda unverified, no verde. Guarda las dos salidas.

Dos: en tu framework, graba las respuestas de un servicio externo con llave igual al hash de la petición, y reprodúcelas en CI sin red. La llave tiene que incluir todo lo que cambia la respuesta: método, ruta, cuerpo, y si aplica, el modelo.

Tres: escribe un ADR de una página con la decisión de record/replay y su política de falla.

Para la entrega, pon las dos salidas una al lado de la otra: la corrida sana en replay y la corrida con la palabra cambiada. Que se vea la diferencia sin tener que explicarla.

## [14:39] → E17 · Mutación WAR de la semana

La mutación de la semana es la del gancho. Cambia una palabra del texto juzgado y comprueba que la prueba queda unverified, no verde.

Antes de correrla, escribe tu predicción. Si tu implementación usa el nombre del test como llave, o si en replay cae al modo en vivo sin avisar, o si un fixture faltante se trata como "pasa", la mutación sobrevive: la prueba sale verde con una respuesta que se dio para otra pregunta. Eso es un hallazgo, y va con su salida.

Si la prueba queda unverified, la mutación murió. Tu suite tiene dientes.

## [15:18] → E18 · El reto y cómo se evalúa

El entregable: una suite con record/replay por hash, la demo de "cambio una palabra, unverified" y el ADR.

Los criterios: cambiar una palabra de la entrada deja la prueba sin verificar, nunca verde, y lo muestras con la salida del comando. El CI corre sin llaves ni red, solo con grabaciones. Cada grabación tiene su llave por hash y no se reutiliza si la petición cambia. Y el ADR dice qué pasa cuando falta una grabación.

El nivel más alto: la prueba de "cambio una palabra, unverified" forma parte del propio CI.

## [15:55] → E19 · Mini-quiz

Tres preguntas. Pausa si quieres.

Primera: cambias una palabra del texto que juzga el modelo y corres en replay. ¿Qué debe pasar? Falta el fixture y la prueba queda unverified. No pasa.

Segunda: ¿por qué la llave es un hash de la petición y no el nombre del test? Porque así un cambio en la petición invalida la grabación. Con el nombre se reutilizaría una respuesta vieja.

Tercera: un veredicto ambiguous en una aserción semántica, ¿qué hace? Nunca pasa. Fail-closed, ADR 0001.

## [16:28] → E20 · Cierre

Tres ideas. Uno: tu suite tiene que cambiar cuando cambia tu código, no cuando cambia un tercero. Dos: la llave de una grabación es el hash de todo lo que la define. Tres: lo ambiguo o sin verificar nunca pasa.

En el siguiente módulo subimos la apuesta: QA aumentado con IA, con una IA que planea, otra que ejecuta y tú revisando cada diff. Nos vemos allá.

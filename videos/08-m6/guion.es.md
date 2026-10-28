# Módulo 6 · API & Contract Testing — tu especialidad futura

Guion de narración en español (Colombia). Voz: Cristian, primera persona. Ritmo de referencia: 150 palabras por minuto. Las marcas `[mm:ss]` se calculan con ese ritmo; cada bloque indica su escena de `escenas.json`.

## 1. Gancho

**[00:00] → E01**

Le mando a una API de reservas un pedido en XML que dice, con todas las letras, depósito pagado: false. La API responde 200. Todo bien, ¿cierto? Pues no. Cuando leo lo que guardó, dice depositpaid: true. Mi no se volvió un sí. Un hotel que cree que pagaste cuando no pagaste tiene un problema de plata.

Ese es el defecto RB-002 de mi suite para Restful Booker. Y fíjate en lo peligroso: el código de estado dice que todo salió bien. Si tu prueba solo revisa el 200, ese bug pasa en verde.

**[00:38] → E02**

Este es el módulo 6: API y contract testing. Para mí es el diferenciador del oficio. Vas a aprender a validar un servicio contra su contrato, a leer un error de esquema campo por campo y a dejar la base de datos como la encontraste aunque una aserción falle.

## 2. Explicado para un niño de 8 años

**[00:57] → E03**

Un contrato es como una receta. Pides una arepa con queso. Te llega una arepa sin queso. ¿Qué haces? No cambias la receta para que diga "arepa, con o sin queso" y así quedar contento. Avisas que llegó mal.

En las pruebas de API pasa lo mismo. La receta es el contrato: dice qué campos trae la respuesta, de qué tipo es cada uno y qué valores puede tener. La prueba compara lo que llegó con la receta. Si no coincide, la prueba se pone roja y alguien tiene que arreglar la cocina, no la receta.

Y una regla más: antes de reclamar, revisa que estés leyendo la receta más nueva. A lo mejor la cambiaron ayer y el queso ya no va.

## 3. Teoría

### Bloque 1 · La regla absoluta: el contrato manda

**[01:46] → E04**

Si te quedas con una sola frase de este módulo, que sea esta: valida contra el contrato, no adaptes la prueba a la respuesta. Un verde falso es peor que un rojo honesto. El rojo honesto te obliga a mirar. El verde falso te deja dormir tranquilo mientras el bug llega a producción.

Hay un antipatrón que la inteligencia artificial tiende a cometer, y la gente también cuando está apurada: la prueba falla, entonces relajo el esquema para que pase. Cambio un `z.string()` por `z.string().or(z.number())`. Agrego un campo opcional que antes era obligatorio. En el curso eso está prohibido, sin excepciones.

**[02:27] → E05**

Ahora, no todo cambio de esquema es enmascarar. Hay que distinguir dos cosas. Alinear al contrato es actualizar la prueba porque el contrato cambió a propósito: salió una versión nueva y el campo ahora se llama distinto. Eso es correcto. Enmascarar es relajar la prueba para tapar un incumplimiento: el contrato dice una cosa, la respuesta dice otra y tú le das la razón a la respuesta.

La dirección es lo que importa. El contrato manda sobre la prueba. La respuesta observada nunca manda sobre el esquema.

Y antes de reportar, revalidas contra la última versión del contrato. La biblia es siempre la versión más reciente. Una versión nueva puede resolver la duda, y es mejor descubrirlo tú que el desarrollador que recibe un reporte basado en una versión vieja. A ese paso yo le digo auditoría de contrato: es un paso humano, y su pregunta es si el esquema refleja el contrato o refleja lo que vimos responder.

**[03:30] → E06**

En civica-playwright-challenge esa regla está escrita en el propio archivo de esquemas. El comentario de `movieApiSchemas.ts` dice que las pruebas validan cada respuesta contra los esquemas y nunca al revés: un esquema solo cambia cuando el contrato de la API cambia a propósito, no para que una prueba pase. Y el README lo dice en una línea: un drift se reporta, nunca se adapta el test.

### Bloque 2 · El esquema es el contrato: Zod y errores legibles

**[03:57] → E07**

¿Por qué no basta con `expect(response.status()).toBe(200)`? Porque un 200 con el cuerpo roto es un verde falso. RB-002 respondía 200. La validación tipada del esquema revisa todo el cuerpo en tiempo de ejecución: tipos, campos requeridos, formatos.

Mira el esquema de reservas en restful-booker-quality-suite. `firstname` y `lastname` son textos de al menos un carácter. `totalprice` es un número no negativo. `depositpaid` es booleano. Y las fechas no son cualquier texto: tienen que cumplir el formato año, mes, día, y además un `refine` comprueba que la fecha exista en el calendario. Un 30 de febrero no pasa.

El esquema de autenticación es estricto: `z.object({ token: … }).strict()`. Estricto quiere decir que un campo extra que no está en el contrato también es una violación.

¿De dónde sale ese esquema? Del contrato, del OpenAPI cuando existe. Nunca de una respuesta que capturaste. Si el esquema nace de la respuesta, siempre va a pasar: acabas de convertir el bug en la referencia.

**[05:00] → E08**

La otra mitad es leer el error. En restful-booker, el helper `expectSchema` usa `safeParse`. Si falla, arma el mensaje con `z.prettifyError`, que muestra campo por campo qué se violó. En civica, el matcher propio `toMatchSchema` hace lo mismo a su manera: imprime la ruta de cada campo y el mensaje de Zod. Cuando una prueba de contrato se pone roja, no quieres un "expected true, received false". Quieres saber que el campo `year` debía ser texto y llegó otra cosa.

### Bloque 3 · Profundidad de API: auth, verbos y errores

**[05:32] → E09**

Ahora la profundidad que separa una prueba de API de un ping. Primero, autenticación contra autorización. 401 quiere decir "no sé quién eres". 403 quiere decir "sé quién eres y no puedes". Si tu token es válido e intentas borrar el recurso de otro usuario, esperas 403. Confundirlos esconde bugs de permisos.

Segundo, la semántica de los verbos. PUT reemplaza el recurso completo y debe ser idempotente: si un retry de red manda el mismo PUT tres veces, el estado final es el mismo. PATCH es una actualización parcial: solo cambian los campos que mandaste.

**[06:10] → E10**

restful-booker tiene justo esa prueba. Se llama "partial update preserves omitted fields". Crea una reserva, manda un PATCH solo con `additionalneeds: 'Late checkout'` y espera que la respuesta sea la reserva original con ese único campo cambiado. Si el servicio borrara los demás campos, la prueba lo atrapa.

Tercero, los negativos. "Update without credentials is forbidden": un PATCH sin credenciales debe dar 403. Y un JWT vencido que recibe 401 no es un bug: es el comportamiento correcto, un verde del caso negativo.

Cuarto, los errores también tienen contrato. En civica existe `errorResponseSchema`, y hay una prueba que pide una película que no existe y valida que el cuerpo del error cumpla ese esquema. Los consumidores parsean los errores igual que parsean los éxitos.

Y si la API pagina, los casos del método son los bordes: la primera página, la última, una página fuera de rango, un límite en cero, un límite por encima del máximo, y que el orden sea estable entre páginas.

### Bloque 4 · Datos propios y limpieza en finally

**[07:16] → E11**

El primer objetivo del módulo es escribir pruebas que crean sus datos y los limpian aunque falle una aserción. En restful-booker, `booking-crud.spec.ts` sigue siempre el mismo molde: crea la reserva, abre un `try`, hace las aserciones, y en el `finally` la borra.

¿Por qué `finally`? Porque si una aserción falla en la mitad, el código que sigue no corre. Sin `finally`, la reserva queda ahí, ensuciando el ambiente para la siguiente corrida o para el compañero que prueba al lado tuyo.

El helper `booking()` genera un nombre único con un sufijo, por ejemplo con la hora: `Cristian-` más el sufijo. Así ninguna prueba depende de IDs sembrados ni del orden de ejecución, y puedes correr en paralelo.

Hay un detalle fino en `deleteBooking`: acepta 201 o 405 al limpiar, y con cualquier otro código lanza un error. La estrategia de pruebas lo explica: la limpieza acepta "ya no existe" solo en el teardown, nunca en una aserción.

### Bloque 5 · Herramientas: el método no cambia

**[08:18] → E12**

El entregable pide una suite progresiva con tres herramientas: Postman con Newman, RestAssured y Karate. Un stack empresarial común es Java con Cucumber, TestNG, RestAssured y Karate. Pero el método es agnóstico al lenguaje y a la herramienta: contrato, negativos, datos propios y limpieza.

**[08:36] → E13**

Mira mi repo karate-api-testing. Prueba la Makeup API pública. Cada feature es un `Scenario Outline` con tres filas de ejemplos. El escenario positivo pide productos por marca, espera 200, compara la respuesta con un esquema que usa marcadores como `#number` y `#string`, y revisa que la marca del primer producto sea la que pediste. El negativo llama una ruta errada y espera 404 con cuerpo HTML.

**[09:02] → E14**

El runner corre todo con cinco hilos en paralelo y exige cero fallos. La última corrida de CI en main documentada en el README, la 36095563876 del 25 de septiembre de 2026, dice: Karate 1.3.1, cinco features, treinta escenarios, treinta pasan, cero fallan, BUILD SUCCESS.

**[09:20] → E15**

Ojo con la versión. Ese repo está en Karate 1.3.1. Karate 2, de abril de 2026, es una reescritura: pide Java 21 o más, trae su propia CLI sin Maven ni Gradle, autenticación declarativa y soft assertions. Si heredas un proyecto Karate 1.x, sigue la guía de migración de la versión 1 a la 2 antes de subir la versión. No lo actualices a ciegas.

**[09:46] → E16**

¿Y Postman? Sirve como primer escalón, y con Newman lo corres desde la terminal o desde CI. En spendwise-qa-assessment, una prueba técnica que entregué en octubre, la colección tiene 15 peticiones y 25 aserciones. La regresión integral del 16 de octubre dejó registrado: 15 peticiones con cero errores, 25 aserciones, 20 pasan y 5 fallan. Y esas 5 no se arreglaron cambiando lo esperado. El resumen lo dice: la suite conserva las expectativas del requisito y no se modificó para ocultar el comportamiento defectuoso del producto.

Esa frase la puedes copiar en tus entregas. Es la misma regla del contrato, dicha para un cliente.

## 4. Laboratorio paso a paso

**[10:28] → E17**

Vamos al laboratorio con restful-booker-quality-suite. Primero el sistema bajo prueba: clonas el repo de Restful Booker de Mark Winteringham y lo levantas con `docker compose up --build -d`. Debe responder en `http://127.0.0.1:3001`. Después, en mi repo, `npm ci` y `npm run quality`. Ese script corre formato, lint, typecheck y todas las pruebas.

**[10:49] → E18**

La corrida verificada del 16 de octubre de 2026 quedó en `evidence/execution-2026-10-16.txt`. Prettier, ESLint y TypeScript pasan. Playwright: 43 chequeos, resultado efectivo 43 pasan, incluidos 9 chequeos de fallo esperado controlado, en 2,0 segundos. En GitHub Actions, la corrida 38966648020 terminó en success en 53 segundos.

¿Qué son esos 9 de fallo esperado? Son los 8 defectos confirmados, RB-001 a RB-008. RB-005 tiene dos chequeos, uno para PUT y otro para PATCH. Cada uno está marcado con `test.fail`. De eso hablamos a fondo en el módulo 7b. Por ahora quédate con esto: el defecto sigue visible y la corrida no se tapa.

**[11:30] → E19**

Ahora corre solo los contratos: `npm run test:contract`. Ese project valida la lista de IDs, la creación, la reserva y las dos respuestas de autenticación. Mira cómo la prueba de creación hace dos cosas: valida el esquema con `expectSchema` y además compara que la reserva devuelta sea igual a la que mandaste. El esquema te dice que la forma está bien. La comparación te dice que los valores sobrevivieron al viaje.

**[11:58] → E20**

El último paso es el reporte. Cada incumplimiento tiene un reporte con curl para reproducirlo. En `docs/DEFECTS.md`, RB-008 dice: credenciales inválidas devuelven HTTP 200. El curl manda usuario admin con una contraseña equivocada, y lo observado es `HTTP 200 OK` con el cuerpo `{"reason":"Bad credentials"}`. Lo esperado es 401, o un 403 definido de forma explícita. El impacto también está escrito: las métricas de logins fallidos quedan por debajo de la realidad.

Con un curl y la respuesta, el desarrollador reproduce el problema en segundos. Sin eso, el ticket rebota con "no lo puedo reproducir".

**[12:36] → E21**

Ahora, no todo lo raro es un defecto. Esta parte me gusta porque es donde se nota el criterio. En `DEFECTS.md` la regla de clasificación está escrita: una observación es defecto cuando viola el contrato documentado de la API, la semántica de HTTP, las reglas de negociación de contenido, la seguridad de la entrada o la integridad de los datos de ida y vuelta. Una respuesta sorprendente no es automáticamente un defecto.

Dos ejemplos del mismo repo. `/ping` responde 201 Created en lugar del 200 que uno esperaría. Y un `Accept` que el servicio no soporta devuelve el código 418. Los dos son raros. Pero pueden ser decisiones del producto, así que quedan como puntos a aclarar, no como defectos. La recomendación es documentarlos en el contrato OpenAPI para que los clientes sepan qué esperar.

Y fíjate en la consecuencia en el código: la prueba de salud espera 201, porque eso es lo que hoy describe el sistema y nadie ha dicho que esté mal. Si mañana el contrato dice 200, se alinea. Eso es alinear, no enmascarar, porque la pregunta quedó abierta y escrita.

Lo que sí se reporta de inmediato, con evidencia: un campo o un tipo distinto al contrato, una respuesta que no está documentada, o un nombre de campo raro que no coincide con el resto. Curl, respuesta y lo que dice el contrato. Nada más hace falta.

## 5. Mutación WAR de la semana

**[14:09] → E22**

Esta semana rompes el contrato a propósito. En civica-playwright-challenge, el mock de la API sale de `mocks/data/movies.ts`. Inception tiene `year: '2010'`, un texto. Cámbialo a número: `year: 2010`. Después corre `npm run test:contract`.

Lo que debe pasar: las pruebas de contrato que devuelven esa película se ponen rojas, y el mensaje de `toMatchSchema` te dice que el campo `year` no cumple. Si la suite sigue en verde, tu contrato no está validando lo que crees.

Un detalle: `npm run typecheck` también se va a quejar, porque el tipo `MovieRecord` dice que `year` es texto. Pero no te confíes del compilador. En producción el JSON llega por la red y TypeScript no está ahí para revisarlo. El que revisa en tiempo de ejecución es el esquema.

**[14:59] → E23**

El criterio del módulo va más allá: cinco mutaciones del payload. Un campo faltante, un tipo cambiado, una regex rota, un array vacío y un campo extra en un esquema estricto. Las cinco tienen que morir. Si una sobrevive, me explicas por qué. Por ejemplo: si el esquema no es estricto, el campo extra va a pasar, y tienes que decidir si eso es lo que dice el contrato.

## 6. El reto y cómo se evalúa

**[15:26] → E24**

El entregable: un repo de API con tres herramientas y una suite de contract testing con validación de esquema.

Los criterios, todos verificables. Uno: con cinco mutaciones del payload mueren las cinco, o explicas la que sobrevive. Dos: la prueba nueva deja la base igual que antes aunque fuerces un fallo en medio; lo demuestras con un listado antes y otro después. Tres: ningún esquema se relajó para que una prueba pasara; el historial de git lo muestra.

Y el nivel más alto: cada incumplimiento tiene un reporte con curl para reproducirlo.

## 7. Mini-quiz

**[16:03] → E25**

Tres preguntas. Pausa si quieres.

Primera. La API responde `user_name` pero el contrato dice `username`. El dueño de producto te apura para desbloquear. ¿Qué haces? A, cambias tu esquema a `user_name`. B, aceptas ambos nombres con un `oneOf`. C, revalidas contra la última versión del contrato y reportas con evidencia, curl y respuesta. D, lo marcas con IGNORE y sigues.

**[16:27] → E26**

Es la C. Primero revalidas, porque una versión nueva puede resolver la duda. Si persiste, reportas. Adaptar la prueba es enmascarar.

Segunda. ¿Qué te da Zod que no te da `expect(r.status).toBe(200)`? La validación de todo el esquema en tiempo de ejecución: tipos, requeridos y formatos. El esquema es el contrato.

Tercera. Tu token es válido pero intentas borrar el recurso de otro usuario. ¿Qué código esperas? 403. El 401 es para cuando el sistema no sabe quién eres.

## 8. Cierre

**[16:58] → E27**

Tres ideas. Una: el contrato manda; un drift se reporta, no se adapta. Dos: un esquema estricto con errores legibles campo por campo vale más que cien aserciones de status. Tres: cada prueba es dueña de sus datos y los limpia en `finally`, falle lo que falle.

En el módulo 7 vamos a BDD con Gherkin, Cucumber y Serenity: cómo convertir pruebas en documentación que el negocio puede leer, y cuándo esa capa estorba más de lo que ayuda.

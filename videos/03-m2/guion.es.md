# Guion · Módulo 03 · Diseño de pruebas & técnicas

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Ritmo de referencia: 150 palabras por minuto. Las marcas de tiempo se calcularon con ese ritmo y las pausas del quiz.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m2) y `quiz-01-10.json` (m2). Laboratorio: la app DocFlow de `war-paradigm/experiments/02-mutants` y la historia `US-42` de `experiments/01-ai-verdict`.

## 1. Gancho

[00:00] → E01
Cambié un solo número en el servidor. El título máximo de un documento pasó de 80 a 79 caracteres. Corrí la suite completa: el flujo dorado en el navegador y los seis mutantes. Siete pruebas, el mismo marcador de siempre. Nadie lo notó. Ahora, un usuario con un título de exactamente 80 caracteres recibe un error que antes no recibía, y mis pruebas siguen felices. El problema no es la herramienta. Es que nadie diseñó el caso de 80. De eso se trata este módulo.

[00:34] → E02
Soy Cristian Guerra, hago QA desde Medellín, y este es el módulo tres del curso: diseño de pruebas y técnicas.

## 2. Explicado para un niño de 8 años

[00:42] → E03
Imagina un juego que solo deja entrar a niños de 8 a 12 años. ¿Pruebas todas las edades, una por una, desde cero hasta cien? No. Pruebas con 7, que no debería entrar. Con 8, que sí. Con 12, que sí. Y con 13, que no. ¿Por qué esas cuatro? Porque los errores se esconden justo en la puerta: el que escribió el juego pudo poner "mayor que 8" cuando quería "mayor o igual a 8", y entonces el niño de 8 se queda afuera llorando.

Eso es diseñar pruebas: no probar más, probar donde están los errores. Y para eso hay técnicas, como hay jugadas en el fútbol. Hoy te enseño las seis que más uso.

## 3. Teoría

[01:29] → E04
Un dev automatiza rápido, pero muchas veces sin criterio de qué probar. Estas técnicas te dan más cobertura con menos casos. Es lo que separa a alguien que escribe scripts de un ingeniero de calidad.

Primero, el mapa. Los niveles dicen a qué tamaño pruebas: unitario, una función; integración, varias piezas hablando; sistema, la aplicación entera; aceptación, contra lo que el negocio pidió. Los tipos dicen para qué pruebas: funcional, si hace lo que debe; regresión, si lo que ya servía sigue sirviendo; smoke, una pasada rápida para saber si vale la pena seguir; sanity, una revisión corta y enfocada después de un cambio.

Y una regla para todo el módulo: un caso de prueba bien escrito tiene precondición, datos, pasos numerados y un resultado esperado observable. Si otra persona no lo puede ejecutar y decidir si pasó o falló sin preguntarte, no es un caso de prueba. Es una intención.

[02:29] → E05
Técnica uno: particiones de equivalencia. Agrupas las entradas en clases donde el sistema debería comportarse igual, y pruebas un representante de cada clase.

Vamos con el laboratorio de hoy, DocFlow, la app del experimento 02 de war-paradigm. Para crear un borrador, el título debe tener entre 3 y 80 caracteres. Particiones: una válida, de 3 a 80. Dos inválidas alrededor: menos de 3 y más de 80. Y una que mucha gente olvida: el tipo de dato inválido. En el código del servidor se ve: si el título no es texto, lo convierte en una cadena vacía, y eso cae en "menos de 3". Además le quita los espacios de los bordes antes de medir. Entonces "ab" con dos espacios a cada lado no es un título de seis caracteres: es uno de dos, y el servidor responde 422. Lo probé contra la app y así responde. Esa partición, la de "texto con espacios", solo la ves si lees el código o si piensas como el que escribió el código.

Y el título no viene solo. El mismo formulario pide un dueño, el `owner`. Particiones del dueño: un correo de un miembro que existe, que es válido; un dueño vacío; y un correo que no pertenece a nadie. Los dos últimos, según el código, dan 422 con "owner is required". El mutante `drop-input` de la suite cubre el dueño vacío. El correo que no existe no lo cubre ninguno.

[04:05] → E06
Técnica dos: valores límite. Los errores de uno más o uno menos viven en los bordes de las particiones. Por cada borde pruebas el borde y su vecino de cada lado.

Para el título de DocFlow eso son cuatro valores: 2, que debe dar 422; 3, que debe dar 201; 80, que debe dar 201; y 81, que debe dar 422. Y no me los estoy inventando: la historia de usuario US-42 los trae escritos como fronteras B-1, B-2, B-3 y B-4. Contra la app real, los cuatro responden lo esperado.

Ahora mira lo que pasó en el gancho. La suite de DocFlow tiene un mutante de frontera, pero solo prueba 81. Prueba un lado de la puerta. Por eso, cuando moví el máximo a 79, nada se enteró: 81 sigue siendo rechazado, y nadie pregunta por 80. Un valor límite movido en uno es exactamente la mutación que tu suite debería matar. Y para matarla necesitas el borde y los dos vecinos.

[05:10] → E07
Técnica tres: tablas de decisión. Cuando el resultado depende de varias condiciones combinadas, las pones en una tabla y miras cada combinación. Así ninguna regla queda huérfana.

En DocFlow la tabla más importante es la de permisos, que vive en el vault como `Roles and permissions`. Cuatro roles, viewer, editor, approver y admin, contra cuatro acciones: crear borrador, aprobar, publicar y cambiar el rol de un miembro. Cada celda dice el código esperado. Crear: viewer 403, los demás 201. Aprobar: solo approver y admin, con 200. Publicar: todos menos viewer. Cambiar un rol: solo admin.

Y la nota agrega una regla de precedencia: un rol prohibido siempre recibe 403 antes de cualquier validación, 422, o chequeo de estado, 409.

Con eso puedes armar la tabla de decisión de crear. Tres condiciones: ¿el rol puede crear?, ¿el título es válido?, ¿el dueño es válido? Tres condiciones de sí o no son dos a la tercera, ocho combinaciones. Si el rol no puede, las cuatro columnas de ese lado dicen 403, sin importar el título ni el dueño, por la regla de precedencia. Si el rol puede, solo la columna con título y dueño válidos da 201; las otras tres dan 422. Ocho columnas, ocho casos, y ninguna regla queda sin probar.

Te cuento lo que me pasó preparando este video. Recorrí la tabla celda por celda contra la app. Y la celda "viewer crea un borrador" no da 403: da 201. El viewer crea el borrador sin problema. Y si el viewer manda un título de dos caracteres, recibe 422 en vez de 403, o sea que la precedencia tampoco se cumple para crear. En el código se ve por qué: la ruta de crear no pregunta el rol. Ninguno de los seis mutantes del experimento tocaba esa celda. Eso es lo que hace una tabla de decisión: te muestra la combinación que nadie escribió. Así que la celda pasó a ser un séptimo mutante, `viewer-create`, y sobrevive: el marcador ahora dice cinco de siete, con dos sobrevivientes conocidos. El WAR Paradigm encontró un hueco en su propia app de ejemplo.

[07:30] → E08
Técnica cuatro: transición de estados. Un documento en DocFlow pasa de borrador a aprobado y de aprobado a publicado. El camino feliz lo cubre cualquiera. Lo que esta técnica te da son las transiciones que no deben existir.

Publicar un borrador sin aprobar: la app responde 409, "document must be approved before publishing". Aprobar algo que ya no es borrador: según el código, 409, con un mensaje que dice en qué estado está el documento. Pagar dos veces, enviar dos veces, devolver un estado hacia atrás: ahí viven los bugs de lógica de negocio. En la suite de DocFlow, el mutante `reorder` es justamente esto: intenta publicar antes de aprobar y espera 409.

[08:15] → E09
Técnica cinco: pairwise. Cuando tienes muchos parámetros, todas las combinaciones explotan. Cuatro parámetros con tres valores cada uno son 81 combinaciones. Pairwise te da un subconjunto pequeño que cubre todas las parejas de valores, porque la mayoría de los defectos de interacción se dispara con dos parámetros a la vez, no con cuatro. Para ese caso de 81, el banco del curso habla de unos 9 a 12 casos.

Un cálculo que te sirve para no engañarte: el número de casos pairwise nunca puede ser menor que el producto de los dos parámetros más grandes. En DocFlow, solo rol por acción ya son 4 por 3, doce parejas. Si una herramienta te da menos de doce, algo está mal. Para generarlo, el curso recomienda PICT, la herramienta de Microsoft, que está en los recursos.

Técnica seis: error guessing, o adivinar el error. No es adivinanza pura. Se alimenta de experiencia, de bugs históricos y de patrones típicos del dominio. En DocFlow, el bug histórico es DEF-001: una regla pensada para "editar mi propio perfil" terminó cubriendo también "cambiar mi propio rol". Ese patrón, reutilizar una regla de "es mío" para algo que no debería ser mío, es algo que vuelves a buscar en cada sistema nuevo.

[09:38] → E10
Dos cosas más y pasamos a la terminal. Testing exploratorio basado en sesiones, SBTM: lo vimos en el módulo uno. Charter, tiempo y notas. Las técnicas de hoy te dan qué buscar dentro de esa sesión.

Y el reporte de defectos. Un reporte defendible tiene pasos, esperado contra real, ambiente y evidencia. Mira DEF-001 en el vault: dice la regla que rompe, dos pasos exactos, el esperado, 403, el real, 200, la causa raíz con la línea de código y dónde está la evidencia. Cualquiera lo reproduce sin preguntarte nada. "El formulario falla a veces" no es un reporte.

Y ojo con severidad y prioridad, que son ejes distintos. Un typo en el título de la home tiene severidad baja, porque técnicamente no rompe nada, y prioridad alta, porque lo ve todo el mundo.

## 4. Laboratorio

[10:31] → E11
Abre el código del servidor de DocFlow, `experiments/02-mutants/app/server.js`. Arriba está la constante `TITLE_MAX`, en 80. Más abajo, la ruta que crea documentos: limpia el título con `trim`, valida entre 3 y `TITLE_MAX` y valida que exista el dueño. Fíjate en lo que no está: no hay ninguna pregunta por el rol. Y abre también `fixtures/story-US-42.json` del experimento 01: ahí están las fronteras B-1 a B-4. Esa es tu fuente de verdad para los valores límite.

[11:01] → E12
Ahora levanta la app y juega con ella. Desde `experiments/02-mutants`, `npm run app`, y abres `http://localhost:4310` en el navegador. Los usuarios son `viewer@demo.io`, `editor@demo.io`, `approver@demo.io` y `admin@demo.io`, todos con la clave `demo123`. Entra como editor, crea un borrador, sal, entra como approver y apruébalo. Ese es el flujo dorado. Después vuelve a entrar como viewer y mira qué te deja hacer la pantalla y qué te deja hacer la API. La interfaz esconde botones. La API es el contrato.

[11:33] → E13
En la terminal, `npm run test:mutants` corre los siete mutantes contra la API. Role-swap, KILLED con 403. Drop-input, KILLED con 422. Reorder, KILLED con 409. Stale-token, KILLED con 401. Boundary, KILLED con 422. Self-grant, un sobreviviente conocido, con 200. Viewer-create, la celda de la tabla, el otro sobreviviente conocido, con 201. Y si abres `tests/scenarios.ts` ves que el mutante `boundary` manda un título de `'x'.repeat(81)`. Ochenta y uno. Solo ese lado del borde.

Tu trabajo en el laboratorio es diseñar la suite de casos de este formulario aplicando cada técnica: particiones, límites, la tabla de permisos, los estados, pairwise y error guessing. Por cada técnica, los casos y la razón para usarla.

Te dejo cómo arrancaría yo. Particiones del título y del dueño, un caso por clase. Límites: 2, 3, 80 y 81, con el código esperado de la historia. La tabla de crear, con sus ocho columnas. Los estados: publicar un borrador, aprobar dos veces, publicar dos veces. Pairwise sobre rol, acción y estado de la sesión. Y error guessing: cualquier ruta donde "es mío" abra una puerta, empezando por la de roles. Al lado de cada grupo, una línea con el porqué. Esa línea es la que te va a pedir el revisor.

[12:55] → E14
Y los defectos los reportas con plantilla. En el vault del experimento 03 tienes `DEF-001 self-grant role` como ejemplo y `99 Templates/Defect note` como plantilla. Pasos, esperado contra real, rol, ambiente y evidencia. La celda "viewer crea un borrador" que te mostré hace un rato es un buen candidato para tu primer reporte: la reproduces, la escribes con esa plantilla y la enlazas a la regla que rompe.

## 5. Mutación WAR de la semana

[13:22] → E15
La mutación de esta semana sale del módulo: un valor límite movido en uno es justo la mutación que tu suite debería matar. Voy a mover `TITLE_MAX` dos veces, una a cada lado, y en cada una escribo la predicción antes.

Primera: de 80 a 81. Predicción: el mutante `boundary` manda 81 caracteres, ahora el servidor lo acepta con 201, así que ese escenario debería fallar y la suite debería ponerse roja.

[13:51] → E16
Corro la suite. Una prueba falla: boundary. El marcador dice SURVIVED boundary, "Mutation was accepted with HTTP 201", cuatro de siete atrapados. Ojo con cómo se lee esto. Para el marcador, el escenario de 81 sobrevivió porque la app lo aceptó. Pero para mi mutación del servidor, esa falla es el grito que esperaba. La suite lo notó. Mi mutación: KILLED.

[14:15] → E17
Segunda: de 80 a 79. Predicción honesta: creo que nada lo nota, porque ninguna prueba manda exactamente 80 caracteres esperando 201. Lo corrí sobre el repo tal como estaba cuando preparé este video. Golden en verde, cinco KILLED, el sobreviviente conocido de siempre. Cinco de seis, el mismo marcador de la corrida sin mutar. Mi mutación: SURVIVED.

¿Bug del sistema o punto ciego del guardia? Punto ciego. La historia sí pide que 80 sea aceptado, es la frontera B-3, pero la suite no tiene ese caso. El arreglo no es tocar el servidor: es agregar un escenario con 80 caracteres que espere 201. Ese escenario es parte de tu reto. Y lo dejo en mi tabla tal cual: SURVIVED, punto ciego, siguiente paso, caso B-3. Ese siguiente paso ya lo di en el repo: `golden.spec.ts` ahora manda exactamente 80 caracteres y espera 201 y el título en la lista. Con 79 esa prueba falla con 422, así que si repites esta mutación hoy, queda KILLED.

## 6. El reto y cómo se evalúa

[15:21] → E18
El entregable es una suite de casos con la técnica aplicada y tres reportes de defecto con evidencia.

Criterios verificables. Uno: cada técnica aparece aplicada, con sus casos y la razón de usarla. Dos: los valores límite incluyen el borde y el vecino de cada lado. Tres: los tres reportes de defecto se pueden reproducir solo con lo escrito, sin preguntarte nada.

Rúbrica de cuatro niveles. Nivel uno: falta el entregable. Nivel dos: está, pero falla un criterio. Nivel tres, aprobado: cumple los tres. Nivel cuatro: además generas el pairwise con PICT y muestras cuántos casos ahorró frente a todas las combinaciones. Y apruebas el módulo con el reto en nivel tres y el quiz, seis de ocho.

## 7. Mini-quiz

[16:08] → E19
Tres preguntas del banco. Pausa si quieres.

Primera. Un campo acepta enteros de 1 a 100. ¿Qué conjunto aplica mejor análisis de valores límite? A: 1, 50 y 100. B: 0, 1, 100 y 101. C: 2 y 99. D: menos 5 y 500.
[pausa 5 s]
La B. Los límites y sus vecinos inmediatos, 0 y 1, 100 y 101, es donde viven los errores de uno más o uno menos.

[16:41] → E20
Segunda. Un pedido pasa por borrador, pagado y enviado. ¿Qué aporta la técnica de transición de estados que otras no ven? A: el camino feliz completo. B: las transiciones inválidas, como pasar de enviado a borrador o pagar dos veces. C: los límites del monto. D: el formato de la fecha.
[pausa 5 s]
La B. El diagrama de estados expone las transiciones que no deben existir, y ahí viven los bugs de lógica de negocio.

[17:15] → E21
Tercera. Un typo en el título de la home: "Bienvenidoss". ¿Severidad y prioridad? A: severidad alta, prioridad alta. B: severidad baja, prioridad alta. C: severidad alta, prioridad baja. D: severidad baja, prioridad baja.
[pausa 5 s]
La B. Impacto técnico mínimo, pero lo ven todos los usuarios. Son ejes independientes.

## 8. Cierre

[17:39] → E22
Tres ideas. Una: no pruebas más, pruebas donde están los errores; particiones y límites, con el borde y los dos vecinos. Dos: la tabla de decisión y el diagrama de estados te muestran las combinaciones que nadie escribió, como el viewer que crea un borrador. Tres: cada técnica es una fábrica de mutantes; si mueves un límite en uno y tu suite no grita, te falta un caso.

En el siguiente módulo dejamos listo el entorno: Node, git, el proyecto de Playwright y tu primer PR. Los enlaces están en la descripción.

# Guion ES · Módulo 26 · m22 — Jueces con probabilidad

_Palabras de narración: 2695 · duración estimada 17:58 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña.

## [00:00] → E01 · Gancho

Le pasé a un juez de IA la misma prueba fallida varias veces. Era una prueba nueva, escrita para una funcionalidad que el build todavía no tenía. El juez siempre escogió la misma clase: flaky. Lo que cambió fue la confianza: cero punto sesenta y nueve, cero punto setenta y uno, cero punto setenta y ocho, cero punto ochenta y cuatro. El umbral era cero punto setenta y cinco. En dos de esas llamadas la herramienta habría reportado esa prueba como flaky, y eso es falso. Nadie la habría revisado, porque flaky suena a "vuelve a correrla y ya". Con la misma entrada, el resultado cambió de lado según la llamada.

## [00:44] → E02 · Título

Este es el módulo veintiséis: jueces con probabilidad. Modos de falla, estabilidad y cascadas. Trabajamos con cuatro repos míos: playwright-jev, jev-ci-triage, el experimento uno de war-paradigm y laya-server. Un juez que devuelve probabilidades no te dice que acertó. Te dice qué tan seguro dice estar. Eso sirve para enrutar, no para aprobar.

## [01:05] → E03 · Explicado para un niño de 8 años

Piensa en un partido de fútbol. El árbitro ve una jugada rara en el área y no está seguro de si fue penal. Un buen árbitro no se inventa la respuesta: pide la repetición, y otra persona la mira con calma.

Ahora imagina que llega un árbitro nuevo. Puede que sea muy bueno, pero nadie lo ha visto pitar. Entonces lo pones a mirar unos partidos desde la tribuna, anotando lo que él habría pitado, y comparas sus notas con lo que pasó. Solo cuando sabes cuántas veces acierta, lo dejas pitar de verdad.

Eso es este módulo. Cuando el juez duda, pide ayuda en vez de adivinar. Y a un juez nuevo primero lo pones en sombra, a observar sin decidir, hasta medirlo.

## [01:55] → E04 · Teoría 1: tres políticas de falla

Primera pregunta de diseño: ¿qué pasa cuando el juez se cae? No hay clave, el servicio responde cuatrocientos veintinueve, se vence el tiempo o falta un fixture. La respuesta depende de para qué usas el juez, y en mis repos hay tres políticas distintas para el mismo tipo de juez.

Fail-closed, en aserciones. Si una prueba de UI pregunta "¿este texto confirma el pago?" y el juez no responde, la prueba no pasa. Fail-open, en triaje. Si estás clasificando por qué falló el CI y el juez no responde, no frenas a nadie, pero tampoco adivinas: reportas que no sabes. Y fail-safe, en selección de pruebas. Si el juez decide qué pruebas correr y falla, corres la suite completa.

Las tres tienen la misma lógica. Cuando el juez no puede decidir, el sistema se va al lado que no te miente.

## [02:51] → E05 · Código: el ADR de fail-closed

En playwright-jev esto está escrito como decisión de arquitectura, el ADR cero cero cero uno. Jev devuelve una probabilidad, no un booleano. Cada respuesta sí o no se convierte en tres valores: yes si la probabilidad es mayor o igual al umbral, no si es menor o igual a uno menos el umbral, y ambiguous en el medio. El umbral por defecto es cero punto ocho.

Lo ambiguo falla por defecto. Y la frase que más me gusta del ADR es esta: nada que no se haya podido verificar pasa nunca. Un equipo sin clave recibe pruebas en rojo por defecto, y es intencional. Si quieres otra cosa, grabas fixtures una vez o eliges de forma explícita saltar la prueba con una advertencia.

## [03:40] → E06 · Diagrama: fail-open en el triaje

En jev-ci-triage la herramienta clasifica cada prueba que falla en CI: regression, flaky, environment, test-data o unknown. Primero van las reglas, y Jev solo entra en lo ambiguo. Si Jev responde con confianza bajo el umbral, cero punto setenta y cinco por defecto, el fallo queda como unknown y va a una persona, mostrando hacia dónde se inclinaba Jev. Si Jev no está disponible, queda unknown punto unverified, con el error HTTP completo guardado en el reporte.

Esto no es teoría. La tarde en que grabé la demo, el gateway devolvió cuatrocientos veintinueve en la mayoría de las solicitudes. Solo diecisiete de ciento veintiséis llamadas HTTP tuvieron éxito, incluso con backoff. Si la herramienta adivinara cuando falla el servicio, ese día habría inventado clasificaciones.

## [04:30] → E07 · Diagrama: fail-safe en la selección

El tercer caso es jev-test-impact. Lee el diff de un pull request y escoge qué pruebas pueden verse afectadas, para no correr todo en cada cambio. Ahí la regla de oro es otra: si Jev falla, tarda o no está disponible, corren todas las pruebas. La duda nunca hace que una prueba se salte. Y todas las noches corre la batería completa como red de seguridad.

Fíjate en la diferencia. En la aserción, la falla del juez pone la prueba en rojo. En el triaje, la falla del juez se reporta como desconocida. En la selección, la falla del juez hace que se corra más. En los tres casos la falla del juez queda visible, aunque cada uso la trate distinto.

## [05:18] → E08 · Teoría 2: la confianza es autorreporte

Volvamos al gancho. La prueba de la funcionalidad que falta volvió con cero punto sesenta y nueve, cero punto setenta y uno, cero punto setenta y ocho y cero punto ochenta y cuatro. Y en el mismo repo, una regresión de accesibilidad volvió con cero punto sesenta y uno, cero punto sesenta y dos y cero punto noventa y uno. La clase elegida no cambió entre llamadas. La confianza se movió lo suficiente para cambiar el enrutamiento.

La conclusión práctica es que un caso cerca del umbral puede caer a cualquier lado, y lo tienes que tratar como inestable. No es que el juez sea malo. Es que la confianza es algo que el modelo dice de sí mismo, y no una medida de si acertó. Calibrar con tus propios datos hace parte de instalar la herramienta.

## [06:13] → E09 · Teoría 3: el flip rate

Para medir esa inestabilidad usamos el flip rate: la proporción de decisiones que cambian entre corridas idénticas. Corres el mismo caso varias veces, con la misma entrada, y cuentas cuántas veces la decisión cambia de lado.

Y antes de medir, fijas tres cosas: el modelo, con su versión; la temperatura; y la versión del prompt. Si no fijas eso, no estás midiendo el juez, estás midiendo cuánto se movió todo lo demás. Cuando reportes un flip rate, siempre di con cuántos casos y cuántas repeticiones lo mediste. Un flip rate de cero en tres casos no dice casi nada.

## [06:53] → E10 · Terminal: war-paradigm 01

Vamos al experimento uno de war-paradigm. El espécimen es un agente que escribe un plan de pruebas para una historia de usuario. Misma entrada, tres corridas, tres salidas distintas. ¿Pasó o no?

Corre npm run demo dos puntos cero uno en la raíz del repo. El set fijado: modelo planner-agent arroba dos mil veintiséis punto cero seis, temperatura cero, prompt test-plan arroba v3. Corrida uno aprobada con ochenta y seis, corrida dos aprobada con ochenta y cuatro, corrida tres aprobada con ochenta y siete. Veredicto STABLE, tres de tres de acuerdo.

El set sin fijar: modelo sin versión, temperatura uno, prompt latest. Salen tres advertencias de pins. Corrida uno aprobada con ochenta y tres, corrida dos aprobada con setenta y cuatro, y la corrida tres sale REJECTED con setenta y seis. Veredicto UNSTABLE: el veredicto pasó de aprobado a rechazado en la corrida tres.

## [07:50] → E11 · Código: el puntaje se mueve, el veredicto no

Mira la corrida tres. Setenta y seis está por encima del gate, que es setenta, y aun así la rechaza. Dos escenarios perdieron su fuente, y uno espera que un editor apruebe su propio borrador cuando la matriz de permisos dice prohibido. Esos son criterios must, y un must que falla rechaza el artefacto, sea cual sea el puntaje.

El comentario de src barra stability punto ts lo resume: misma entrada, N corridas, los puntajes se pueden mover, el veredicto no. Y un cambio entre aprobado y rechazado es un hallazgo por sí mismo: o los criterios están muy cerca del gate, o la corrida no estaba fijada. Ojo con un detalle: los seis runs del laboratorio son fixtures grabados a mano, y el README lo dice. Sirven para que la demo no necesite clave y los números sean reproducibles.

## [08:46] → E12 · Teoría 4: redacta antes de enviar

Antes de mandarle algo a un juez en la nube, piensa qué estás mandando. Un log de CI puede traer un token, un JWT, el correo de alguien, un número de tarjeta de prueba o la ruta de tu carpeta personal. En jev-ci-triage eso pasa por src barra redact punto ts antes de salir de la máquina.

Son siete reglas en una lista: Bearer y Basic, claves con nombre como api key, token, secret o password, prefijos de llaves conocidos, JWT, correos, números de trece a diecinueve dígitos y rutas de Users o home. Cada una se reemplaza por una marca de redactado.

## [09:28] → E13 · Terminal: el redactor en acción

Le paso al redactor la misma cadena que usa la prueba del repo: un Bearer, un correo, una tarjeta cuatro uno uno uno, una ruta de usuario y un token. La salida queda con Bearer redacted, redacted-email, redacted-number, Users barra user y token redacted. Nada sensible sale.

Y ahora un detalle que vale la pena notar. Mira lo que viene después de redacted-number: la palabra "at" quedó pegada, sin espacio. La expresión de los números se lleva el espacio que sigue a la tarjeta. La prueba del repo pasa, porque solo revisa que no quede nada sensible. Es cosmético, pero es el tipo de cosa que encuentras cuando miras la salida en vez de solo el verde.

## [10:14] → E14 · Teoría 5: la cascada

Ahora la cascada, en laya-server. Laya es un modelo abierto pequeño, de unos dos gigas de RAM, que corre en CPU, detrás del mismo contrato de Jev. La idea es poner un juez barato delante de uno caro.

La regla es esta. Si el estado mide más de mil quinientos caracteres, va directo a la nube, porque Laya lee como máximo unas trescientas cincuenta palabras. Si es corto, responde Laya en local. Si la confianza mínima de Laya queda por debajo de cero punto ocho, la pregunta sube a Jev. Y si la nube falla, o no hay cascada configurada, la respuesta vuelve marcada con escalate true, para que la revise una persona.

## [11:00] → E15 · Código: route()

Todo eso vive en una función, route, en src barra policy punto mjs. Primero compara el largo del estado con maxLocalChars usando mayor estricto. Después, si no hay respuestas locales todavía, devuelve pending. Si la confianza mínima es mayor o igual al umbral, decide Laya con razón confident. Si no, decide Jev con low_confidence, o Laya con escalate true si no hay cascada.

Y el caso de la nube caída está en src barra server punto mjs: si la llamada a Jev lanza un error, la respuesta vuelve de Laya con la razón terminada en upstream_error y escalate true.

## [11:39] → E16 · Terminal: npm test en laya-server

En la carpeta de laya-server corre npm test. Son siete casos de node test: confianza de respuestas sí o no y de opción, respuestas seguras que se quedan en local, baja confianza que sube a Jev o va a una persona, estados largos que se saltan a Laya, y respuestas booleanas de la nube que se normalizan. Siete pasan, cero fallan. No cargan el modelo, solo prueban la política.

## [12:07] → E17 · Laboratorio: los casos que faltan

El laboratorio te pide agregar dos casos. Yo los escribí en una copia para mostrarte cómo se ven. El primero: un estado de exactamente mil quinientos caracteres, con una respuesta local segura. Como la comparación es mayor estricto, mil quinientos se queda en Laya con razón confident. El segundo: un estado de mil quinientos uno sin cascada disponible. Queda en Laya, con razón long_state_truncated y escalate true.

npm test otra vez: nueve pasan, cero fallan. Lo importante es que ahora el borde está escrito. Si mañana alguien cambia el mayor por mayor o igual, la primera prueba se pone en rojo.

El caso de un CASCADE_URL caído es otro asunto. Ese camino está en server punto mjs, no en la política, y las pruebas actuales no lo cubren. Para probarlo tienes que levantar el servidor con una URL que no responde, o sacar esa lógica a una función que puedas probar sin el modelo. Ese es tu trabajo en el reto.

## [13:11] → E18 · Modo sombra y la deuda declarada

Laya está en modo sombra. Sus respuestas se anotan para compararlas después, pero nunca frenan nada. Y el README dice algo que pongo en pantalla tal cual: nadie ha medido todavía la calidad de Laya en español, y esa medición va antes de confiar en ella.

Otra cosa que el curso dice de frente: laya-server no tiene CI. Solo npm test corre los casos de la política. Parte del laboratorio es proponer el workflow que hoy no tiene: instalar dependencias, correr npm test en cada push y en cada pull request. No lo pongo como existente, porque no existe.

## [13:51] → E19 · Mutación WAR: quitar un pin

La mutación de la semana: quita un pin. En una copia de war-paradigm abro el primer run del set fijado, fixtures barra runs barra pinned barra run guion uno punto json, y cambio la temperatura de cero a uno. Nada más. Antes de correr, anota qué crees que dirá el veredicto de estabilidad y qué dirán las pruebas.

## [14:14] → E20 · Terminal: qué notó cada uno

npm run demo dos puntos cero uno. En el set fijado aparece la advertencia: temperature is one, pinned runs use zero. Pero mira el veredicto: STABLE, tres de tres de acuerdo. Los tres runs siguen aprobados con ochenta y seis, ochenta y cuatro y ochenta y siete, porque las salidas grabadas no cambian por editar un número en el metadato.

Ahora npm run test dos puntos cero uno. Antes de la mutación: veintisiete pasan y una se salta, la del agente en vivo. Con la mutación: veinticinco pasan y dos fallan. Una en checks punto spec, que exige que un run fijado no tenga advertencias, y otra en scorer punto spec, que exige lo mismo dentro del reporte.

La lección es que la estabilidad mide el veredicto, no los pins. Un STABLE sobre una corrida sin fijar no vale nada, porque la próxima vez la salida sí puede cambiar. Lo que atrapó la mutación fue el chequeo de pins, por eso no puede ser opcional.

## [15:20] → E21 · El reto y cómo se evalúa

Tu reto tiene cinco partes. Uno: escribe la tabla "si el juez cae, qué pasa" para tres usos tuyos, una aserción, un triaje y una selección, con la política y su porqué. Dos: corre la demo de war-paradigm y explica por qué sin pins el veredicto es UNSTABLE. Tres: agrega en laya-server los casos de exactamente mil quinientos caracteres y de CASCADE_URL caído, y propón el workflow de CI. Cuatro: mide el flip rate de un juez con cinco repeticiones sobre veinte casos. Cinco: escribe un redactor, o reutiliza el de jev-ci-triage, y pruébalo con un log que tenga un token, un correo y un número de tarjeta.

Así se evalúa. Cada uso de la tabla tiene política, closed, open o safe, y justificación. El flip rate va con el número de casos y de repeticiones. Los dos casos nuevos de laya-server pasan con npm test. Y el redactor elimina el token, el correo y la tarjeta del log de prueba, y lo muestras.

El nivel más alto: propones el experimento que falta según el README de laya-server, un set etiquetado en español, con el umbral escrito antes, y no activas el bloqueo hasta tener ese número.

## [16:39] → E22 · Mini-quiz

Tres preguntas. Pausa en cada una.

Primera. Aserción semántica en un test de UI y el juez no responde. ¿Política? Fail-closed: la prueba no pasa, queda unverified.

Segunda. La misma entrada volvió con cero punto sesenta y nueve, cero punto setenta y uno, cero punto setenta y ocho y cero punto ochenta y cuatro; el umbral es cero punto setenta y cinco. ¿Qué concluyes? Que el caso está cerca del umbral y su enrutamiento es inestable: la confianza es autorreporte.

Tercera. En laya-server llega un estado de dos mil caracteres. ¿Qué pasa? Va a la nube, porque supera MAX_LOCAL_CHARS, que es mil quinientos.

## [17:20] → E23 · Cierre

Tres ideas. Primera: decide antes qué pasa cuando el juez se cae, cerrado, abierto o seguro, según el uso, y nunca dejes que la falla del juez pase como resultado. Segunda: la confianza es autorreporte; fija modelo, temperatura y prompt, mide el flip rate y trata lo que está cerca del umbral como inestable. Tercera: un juez barato delante de uno caro sirve, pero en sombra hasta que lo midas con datos tuyos.

En el siguiente módulo, QA asistida por IA dos: el asistente diseña, ejecuta y audita, y una persona firma. Nos vemos allá.

# Guion · Módulo 03 · Parte 1 · El límite de 80 que nadie probó — Diseño de pruebas

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Marcas de tiempo calculadas a 150 palabras por minuto más 1 s de cola por escena; `retime.py` las corrige con la voz.
> Primera de dos partes del módulo 03 (fuente completa: `03-m2/`). La parte 2, «Manos a la obra», está en `03-m2-p2/`.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m2). Laboratorio: DocFlow de `war-paradigm/experiments/02-mutants`. Otros ejemplos: una app de pagos (evidencia guardada, solo leída), `karate-api-testing` (Makeup API, corrido con curl). Salidas reales en `render/salidas/`, reproducibles con `capturas.sh`.

## 1. Gancho

[00:00] → E01
Cambié un solo número en el servidor. El título más largo de un documento pasó de 80 a 79 letras. Corrí la suite completa: el flujo dorado en el navegador y los seis mutantes. Mira la pantalla: siete pasan. Cinco de seis atrapados, el mismo marcador de siempre. Nadie lo notó. Y ahora, quien escribe un título de exactamente 80 letras recibe un error. Mis pruebas, felices. El problema no era la herramienta. Nadie había diseñado el caso de 80.

[00:37] → E02
Soy Cristian Guerra, hago QA desde Medellín. Este es el módulo tres, parte uno: diseño de pruebas, el límite de 80 que nadie probó.

## 1b. Contexto: el laboratorio de este módulo

[00:48] → E03
Te pongo en contexto. El laboratorio principal es DocFlow, la app de documentos de mi repositorio war-paradigm, la misma del módulo dos. Para crear un documento llenas un formulario con dos campos: el título, que debe tener entre 3 y 80 letras, y el dueño, que es el correo de un miembro. Y la app tiene cuatro roles: viewer, editor, approver y admin. Recuerda dos códigos: 201 quiere decir creado, y 422, dato mal hecho.

Pero no todo es DocFlow. También vas a ver una app de pagos que probé, con una regla de 50 dólares, y una API pública de maquillaje que uso en mi repo de Karate. En la parte dos se suman un juez pequeño de IA y una API de reservas.

Al final de esta parte vas a saber seis técnicas: particiones, valores límite, tablas de decisión, estados, pairwise y adivinar errores. Seis formas de probar menos casos, pero mejores.

## 2. Explicado para un niño de 8 años

[01:53] → E04
Ahora, como para un niño. Imagina un juego que solo deja entrar a niños de 8 a 12 años. ¿Pruebas todas las edades, una por una, de cero a cien? No. Pruebas con 7, que no debe entrar. Con 8, que sí. Con 12, que sí. Y con 13, que no. ¿Por qué esas cuatro? Porque los errores se esconden en la puerta. El que hizo el juego pudo escribir «mayor que 8» cuando quería «mayor o igual a 8». Y el niño de 8 se queda afuera, llorando.

Eso es diseñar pruebas: no probar más, sino probar donde están los errores.

## 3. Teoría

[02:32] → E05
Primero, el mapa. Los niveles dicen de qué tamaño es lo que pruebas. Unitario: una sola función. Integración: varias piezas hablando entre ellas. Sistema: la app entera. Aceptación: contra lo que pidió el negocio. Es como revisar una bicicleta: un tornillo, la cadena con los pedales, la bici andando y, al final, el niño que la quería montándola.

Los tipos dicen para qué pruebas. Funcional: si hace lo que debe. Regresión: si lo que ya servía sigue sirviendo. Smoke: una pasada rápida para saber si vale la pena seguir. Sanity: una revisión corta y enfocada después de un cambio.

Y una regla para todo el módulo. Un caso de prueba bien escrito tiene cuatro partes: precondición, datos, pasos numerados y un resultado esperado que se pueda ver. Si otra persona no lo puede correr y decir si pasó o falló sin preguntarte, no es un caso de prueba. Es una intención.

[03:35] → E06
Técnica uno: particiones de equivalencia. Una partición es un grupo de entradas donde el sistema se porta igual. Piensa en una heladería. Si pides fresa o vainilla, te dan helado: son la misma clase, sabores que existen. No necesitas probar los treinta sabores. Basta un representante por grupo.

En DocFlow, el título tiene una partición válida, de 3 a 80 letras, y dos inválidas alrededor: menos de 3 y más de 80. Y una que casi todos olvidan: un dato que ni siquiera es texto. El servidor lo convierte en un texto vacío, y cae en «menos de 3». Hay otra escondida: el servidor quita los espacios de los bordes antes de medir. Entonces «ab» con espacios alrededor no tiene seis letras: tiene dos. Esa partición solo la ves si lees el código.

El dueño también tiene particiones: un correo que existe, uno vacío y uno que no es de nadie. El mutante drop-input cubre el vacío. El correo que no es de nadie no lo cubre ninguno.

[04:46] → E07
¿Y si pides un sabor que no existe? Lo corrí contra la API pública de maquillaje de mi repo karate-api-testing. Pido la marca maybelline: me devuelve 54 productos. Pido una marca que no existe: me devuelve una lista vacía, con el código 200, todo bien. No te echan de la heladería: te dan un vaso vacío. Esa es otra partición, la de «no existe», y en ese repo ninguna prueba la pide. ¿Está bien o está mal? Eso lo decide el requisito. Pero la partición tiene que estar en tu lista.

[05:23] → E08
Técnica dos: valores límite. Los errores de uno más o uno menos viven en los bordes. Piensa en la raya de la montaña rusa. El que mide justo la raya sube. Al que le falta un pelo, no. Por cada borde pruebas el borde y su vecino de cada lado.

En DocFlow son cuatro valores: 2 da 422, 3 da 201, 80 da 201 y 81 da 422. No me los invento: la historia de usuario US-42 los trae escritos como fronteras, de B-1 a B-4.

Ahora vuelve al gancho. La suite tenía un mutante de frontera, boundary, pero solo probaba 81. Un solo lado de la puerta. Cuando moví el máximo a 79, el 81 seguía rechazado, y nadie preguntaba por el 80. Por eso nadie lo notó. Eso fue en una versión anterior del repo; en la parte dos ves cómo lo cerré.

[06:17] → E09
El ejemplo que más me gusta es de una app de pagos que probé. Tenía una regla: los gastos de menos de 50 dólares se aprueban solos. Probé tres valores. 49,99: aprobado solo. Correcto. 50,01: pendiente de revisión. Correcto. ¿Y 50 exacto? Aprobado solo. Pero «menos de 50» dice que el 50 no entra.

Y aquí viene lo bonito. La regla se llama «under 50», menos de 50. Pero su descripción, en la misma app, dice «at or below 50»: 50 o menos. El requisito se contradice. Es como el letrero «los menores de 10 años entran gratis»: ¿el niño que cumple 10 hoy paga o no?

Eso está en la evidencia que guardé de esa prueba. El ambiente ya no existe, así que aquí no lo vuelvo a correr. La lección: cuando un límite es ambiguo, preguntas antes de automatizar. Y la prueba de 50 exacto es la que encuentra la pregunta.

[07:18] → E10
Técnica tres: tablas de decisión. Cuando el resultado depende de varias condiciones a la vez, las pones en una tabla y miras cada combinación. Es como el almuerzo del colegio: ¿sopa, sí o no? ¿Postre, sí o no? Dos preguntas de sí o no dan cuatro almuerzos distintos.

En DocFlow, crear un documento depende de tres preguntas. ¿El rol puede crear? ¿El título es válido? ¿El dueño es válido? Tres preguntas de sí o no: dos por dos por dos, ocho combinaciones. Y la nota de permisos de mi vault trae una regla extra: un rol prohibido recibe 403 antes de revisar el título. Entonces, si el rol no puede, las cuatro columnas de ese lado dan 403. Si el rol puede, solo una da 201: título y dueño válidos. Las otras tres dan 422.

Recorrí la tabla contra la app. Y la celda «viewer crea un documento» no dio 403: dio 201. La ruta de crear nunca pregunta el rol. Ninguno de los seis mutantes tocaba esa celda. Así nació el séptimo, viewer-create, el que viste sobrevivir en el módulo dos. Eso hace una tabla: te muestra la combinación que nadie escribió.

[08:38] → E11
Técnica cuatro: transición de estados. Un documento va de borrador a aprobado, y de aprobado a publicado. Como los grados del colegio: de primero pasas a segundo, no de primero a quinto. El camino feliz lo prueba cualquiera. Esta técnica busca los saltos que no deben existir. Publicar un borrador sin aprobar: la app responde 409, primero se aprueba. Aprobar algo que ya no es borrador: también 409, según el código. Pagar dos veces, enviar dos veces, devolverse un paso: ahí viven los bugs de lógica de negocio. El mutante reorder hace justo esto.

[09:22] → E12
Técnica cinco: pairwise, que quiere decir «por parejas». Cuando hay muchos parámetros, las combinaciones explotan. Cuatro parámetros con tres valores cada uno son 81 combinaciones. Piensa en vestirte: camisa, pantalón, zapatos y gorra, tres de cada uno. Pairwise no prueba todos los atuendos. Prueba que cada pareja, camisa con zapatos o gorra con pantalón, aparezca al menos una vez. ¿Por qué parejas? Porque la mayoría de los errores de interacción salen con dos parámetros a la vez. Para esas 81, el curso habla de unos 9 a 12 casos.

Un truco para no engañarte: los casos nunca pueden ser menos que el producto de los dos parámetros más grandes. En DocFlow, cuatro roles por tres acciones ya son doce parejas. Si te salen menos de doce, algo está mal. La herramienta que recomienda el curso es PICT, de Microsoft.

[10:24] → E13
Técnica seis: error guessing, adivinar el error. No es adivinar al azar. Es como el médico que ya vio cien gripas: sabe dónde mirar. Se alimenta de experiencia, de bugs viejos y de patrones típicos. En DocFlow, el bug histórico es DEF-001: una regla pensada para «edito mi propio perfil» terminó cubriendo «cambio mi propio rol». Ese patrón, una regla de «es mío» que abre una puerta que no debía, lo vas a buscar en cada sistema nuevo.

Y todas estas técnicas caben dentro de una sesión exploratoria, SBTM, la del módulo uno: misión, tiempo y notas.

[11:08] → E14
Lo último: el reporte de defectos. Un reporte que se defiende tiene pasos, esperado contra real, ambiente y evidencia. Mira DEF-001 en mi vault: dos pasos exactos, esperado 403, real 200, la causa en el código y dónde está la evidencia. Cualquiera lo repite sin preguntarte. «El formulario falla a veces» no es un reporte.

Y ojo: severidad y prioridad son cosas distintas. Severidad es cuánto daño hace. Prioridad es qué tan rápido hay que arreglarlo. Un error de ortografía en el título de la página principal tiene severidad baja, porque no rompe nada, y prioridad alta, porque lo ve todo el mundo.

## 4. Resumen

[11:55] → E15
Tres ideas para llevarte. Una: no pruebas más, pruebas donde están los errores: el borde y sus dos vecinos. Dos: las tablas y los estados te muestran las combinaciones que nadie escribió, como el viewer que crea un documento. Tres: si un límite es ambiguo, como el 50 de la app de pagos, preguntas antes de automatizar. En la parte dos nos ensuciamos las manos: corres los límites contra la app, mueves el 80 a propósito y miras quién grita.

Si este video te sirvió, suscríbete y activa la campanita para que no te pierdas la parte dos. Y si te quedó alguna duda, déjala en los comentarios: las leo todas y te respondo. Un abrazo grande desde Medellín. ¡Nos vemos en la próxima!

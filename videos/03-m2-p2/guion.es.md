# Guion · Módulo 03 · Parte 2 · Manos a la obra — Diseño de pruebas

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Marcas de tiempo calculadas a 150 palabras por minuto, más las pausas del quiz y 1 s de cola por escena; `retime.py` las corrige con la voz.
> Segunda de dos partes del módulo 03 (fuente completa: `03-m2/`). La parte 1, «El límite de 80 que nadie probó», está en `03-m2-p1/`.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m2) y `quiz-01-10.json` (m2). Laboratorio: DocFlow de `war-paradigm/experiments/02-mutants`; otros ejemplos: `laya-server` (script mío contra `src/policy.mjs`) y `restful-booker-quality-suite` (pruebas de componentes). Salidas reales en `render/salidas/`, reproducibles con `capturas.sh`.

## 1. Título y repaso

[00:00] → E01
Soy Cristian Guerra, hago QA desde Medellín. Este es el módulo tres, parte dos: manos a la obra.

[00:09] → E02
Repaso rápido de la parte uno. Diseñar pruebas no es probar más: es probar donde están los errores. Particiones: un representante por grupo, como un sabor de cada clase en la heladería. Valores límite: el borde y su vecino de cada lado, como la raya de la montaña rusa. Tablas de decisión: todas las combinaciones de sí o no, como los almuerzos. Estados: los saltos que no deben existir. Y adivinar errores con lo que ya viste fallar. Hoy lo haces tú, en la terminal.

## 2. Laboratorio

[00:45] → E03
A la terminal. Clonas war-paradigm, entras a la carpeta y corres npm ci para instalar. Luego entras al experimento dos y le pides a grep cuatro líneas del servidor. La línea 12: TITLE_MAX vale 80. La 91: trim, que quita los espacios de los bordes. La 92: si el título tiene menos de 3 o más de TITLE_MAX, responde 422. Y la 93: si el dueño no es un miembro, también 422. Y fíjate en lo que no aparece: en la ruta de crear no hay ninguna pregunta por el rol.

[01:24] → E04
Ahora levanto la app y le hablo directo a la API. Hice una función pequeña que se llama crea: inicia sesión con un rol y manda un título con curl. Primero, los cuatro límites con el editor. Título de 2: 422. De 3: 201, creado. De 80: 201. De 81: 422. Los cuatro, como dice la historia US-42.

Después, ab con dos espacios a cada lado. Mi función cuenta seis caracteres, pero el servidor quita los espacios y ve dos: 422. Ahí está la partición escondida.

Y ahora la celda de la tabla. El viewer crea un documento con un título normal: 201. Debería ser 403. Y el viewer con un título de dos letras: 422. Si la regla de precedencia se cumpliera, sería 403 antes que cualquier otra cosa. Las dos celdas fallan.

[02:20] → E05
Ahora corre los mutantes con npm run test:mutants. Role-swap, KILLED con 403. Drop-input, KILLED con 422. Reorder, KILLED con 409: publicar antes de aprobar. Stale-token, KILLED con 401. Boundary, KILLED con 422. Self-grant y viewer-create, los dos sobrevivientes conocidos, con 200 y 201. Cinco de siete.

Después busca con grep dónde las pruebas repiten la letra x. El mutante boundary manda x repetida 81 veces: un solo lado del borde. Y la otra línea es nueva: golden.spec.ts manda exactamente 80. Esa prueba la agregué después de lo que viste en el gancho de la parte uno.

[03:07] → E06
Los límites no son solo de DocFlow. Mira dos repos más. Laya-server es un juez pequeño de IA que vive en mi computador. Si la pregunta es muy larga, o si no está seguro, le pasa el caso a un juez más grande en la nube. Sus pruebas no tocaban los bordes exactos, así que escribí un script mío que los prueba. Un estado de 1500 caracteres se queda: confident. Uno de 1501 sube a la nube: long_state. Confianza de exactamente 0,8: se queda. De 0,79: sube, low_confidence. El borde y su vecino, en las dos reglas.

Y restful-booker-quality-suite, una API de reservas de hotel. Sus pruebas de componentes revisan fechas en el borde del calendario. Un 30 de febrero: rechazado. Un mes 13: rechazado. Un 29 de febrero de año bisiesto y un precio de cero: aceptados. Y un precio de menos uno: rechazado. Ocho pasan.

[04:11] → E07
Tu reto en el laboratorio es diseñar la suite de casos del formulario de crear, con cada técnica, y al lado una línea con el porqué. Te dejo cómo arrancaría yo. Particiones: un caso por clase del título y del dueño, incluido el título con espacios y el correo que no es de nadie. Límites: 2, 3, 80 y 81. La tabla de crear, con sus ocho columnas. Estados: publicar un borrador, aprobar dos veces, publicar dos veces. Pairwise sobre rol, acción y sesión. Y error guessing: cualquier ruta donde «es mío» abra una puerta. La línea del porqué es la que te va a pedir el revisor.

[04:54] → E08
Los defectos los reportas con plantilla. En el vault del experimento tres tienes DEF-001 como ejemplo y la plantilla Defect note. Trae la regla que se rompe, los pasos, el esperado, el real, la causa y la evidencia. La celda del viewer que crea es un buen primer reporte: ya tienes la salida real de hace un rato. Solo te falta escribirlo, como si lo fuera a leer alguien que nunca ha visto la app.

## 3. Mutación WAR de la semana

[05:25] → E09
Ahora la mutación de la semana. La pide el curso: un valor límite movido en uno es justo la mutación que tu suite debería matar. Voy a mover TITLE_MAX a cada lado, y antes escribo la predicción. Primera: de 80 a 81. Predicción: boundary manda 81, el servidor ahora lo acepta con 201, así que ese escenario falla y la suite se pone roja.

[05:52] → E10
Corro los mutantes. Una prueba falla: boundary. El marcador dice SURVIVED boundary: la mutación fue aceptada con 201. Cuatro de siete. Ojo con cómo se lee. Para el marcador, el escenario de 81 sobrevivió, porque la app lo aceptó. Pero para mi mutación del servidor, esa falla es el grito que yo esperaba. La suite lo notó. Mi mutación: KILLED.

[06:19] → E11
Segunda: de 80 a 79. En la parte uno viste que en la versión anterior del repo nadie lo notaba. Hoy el repo tiene la prueba de 80. Predicción: esa prueba recibe 422 en vez de 201, y falla.

[06:38] → E12
Corro la suite completa con npx playwright test. El flujo dorado pasa. Pero la prueba de 80 letras falla: esperaba 201 y recibió 422. Los mutantes quedan igual, cinco de siete, porque ninguno manda 80. El que gritó fue el caso nuevo, el del borde. Mi mutación: KILLED.

Así se cierra un punto ciego. En la versión anterior, el 79 sobrevivía. No toqué el servidor: agregué el caso B-3, el borde que faltaba. En mi tabla queda así: antes SURVIVED, punto ciego; siguiente paso, el caso de 80; hoy, KILLED.

## 4. El reto y cómo se evalúa

[07:20] → E13
Tu entregable es una suite de casos con la técnica aplicada, y tres reportes de defecto con evidencia. Criterios. Uno: cada técnica aparece aplicada, con sus casos y la razón. Dos: los valores límite traen el borde y el vecino de cada lado. Tres: los tres reportes se pueden reproducir solo con lo escrito, sin preguntarte nada.

[07:45] → E14
La rúbrica tiene cuatro niveles. Nivel uno: falta el entregable. Nivel dos: está, pero falla un criterio. Nivel tres, aprobado: cumple los tres. Nivel cuatro: además generas el pairwise con PICT y muestras cuántos casos ahorraste frente a todas las combinaciones. Apruebas con el reto en nivel tres y el quiz con seis de ocho.

## 5. Mini-quiz

[08:09] → E15
Tres preguntas. Pausa si quieres.

Primera. Un campo acepta enteros de 1 a 100. ¿Qué conjunto aplica mejor los valores límite? A: 1, 50 y 100. B: 0, 1, 100 y 101. C: 2 y 99. D: menos 5 y 500.
[pausa 5 s]
La B. Los límites y sus vecinos: 0 y 1, 100 y 101. Ahí viven los errores de uno más o uno menos.

[08:49] → E16
Segunda. Un pedido pasa por borrador, pagado y enviado. ¿Qué aporta la transición de estados que otras técnicas no ven? A: el camino feliz completo. B: las transiciones inválidas, como volver de enviado a borrador o pagar dos veces. C: los límites del monto. D: el formato de la fecha.
[pausa 5 s]
La B. El diagrama de estados muestra las transiciones que no deben existir. Ahí viven los bugs de lógica de negocio.

[09:26] → E17
Tercera. Un error de ortografía en el título de la página principal: «Bienvenidoss». ¿Severidad y prioridad? A: severidad alta, prioridad alta. B: severidad baja, prioridad alta. C: severidad alta, prioridad baja. D: severidad baja, prioridad baja.
[pausa 5 s]
La B. No rompe nada, pero lo ven todos. Son ejes distintos.

## 6. Cierre

[10:00] → E18
Tres ideas. Una: el borde y sus dos vecinos; con un solo lado, la puerta queda abierta. Dos: la tabla de decisión te muestra la celda que nadie escribió, como el viewer que crea un documento. Tres: cada técnica es una fábrica de mutantes; si mueves un límite en uno y tu suite no grita, te falta un caso.

En el siguiente módulo dejamos listo el entorno: Node, git, el proyecto de Playwright y tu primer PR. Los enlaces están en la descripción.

Si te gustó, suscríbete y activa la campanita para que no te pierdas el próximo módulo. ¿Te quedó alguna duda con tus límites? Déjala en los comentarios: las leo todas y te respondo. Un abrazo grande desde Medellín. ¡Nos vemos en el próximo video!

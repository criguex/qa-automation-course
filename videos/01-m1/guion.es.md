# Guion · Módulo 01 · Mentalidad QA — de Dev a Tester

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Marcas de tiempo medidas con la voz WbPw2BEKJmkwDvOBt9Z9 (elevenlabs, eleven_multilingual_v2) y las pausas del quiz.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m1) y `quiz-01-10.json` (m1). Laboratorio: `war-paradigm/experiments/01-ai-verdict`.

## 1. Gancho

[00:00] → E01
Le pedí a un agente de inteligencia artificial que escribiera el plan de pruebas de una funcionalidad: aprobar y publicar un documento. Su plan sacó 76 sobre 100. El mínimo para aprobar era 70. Y lo rechacé. No por gusto: dos escenarios no decían de dónde salían y uno esperaba que un editor aprobara su propio borrador con un 200. Si yo solo mirara el número, esto se iba a producción con un hueco de permisos adentro. Ese rechazo lo decidió algo que en testing tiene nombre: el oráculo. Y aprender a nombrarlo es el primer paso para pasar de escribir pruebas a decidir calidad.

[00:44] → E02
Soy Cristian Guerra, hago QA desde Medellín, y este es el módulo uno del curso de automatización: mentalidad QA, de dev a tester.

## 1b. Contexto: el laboratorio de este módulo

[00:57] → E03
Antes de seguir, te pongo en contexto, porque todo este módulo gira alrededor de un laboratorio real que puedes clonar. Tiene cuatro piezas. Primero, una aplicación de documentos con cuatro roles: el viewer solo mira, el editor escribe borradores, el approver los aprueba y el admin puede todo. Segundo, una historia de usuario, la US-42: aprobar y publicar un documento, con seis reglas, de R-1 a R-6. Tercero, un agente de inteligencia artificial que lee esa historia y escribe el plan de pruebas: una lista de escenarios, S-1, S-2, S-3, cada uno con la respuesta que espera de la API. Y cuarto, un scorer: código que califica ese plan.

Esas respuestas son códigos HTTP, y vas a oír cuatro durante todo el video. 200 o 201: el rol tenía permiso y la acción salió bien. 403: ese rol no tiene permiso. 409: quisiste publicar un documento que nadie aprobó. Y 422: el borrador viene mal hecho, por ejemplo con un título de dos letras o sin dueño.

Al agente le pedí lo mismo tres veces, y escribió tres planes distintos. La pregunta de este módulo es: ¿cómo decides si ese plan está bien? Al final vas a saber tres cosas: qué es un oráculo, cómo convertir un "me parece bueno" en criterios que se miden, y por qué la firma final es tuya.

## 2. Explicado para un niño de 8 años

[02:32] → E04
Imagina a una profe que revisa tareas. Le llega una hoja llena de principio a fin, con letra bonita, sin un espacio en blanco. ¿Eso quiere decir que la tarea está bien? No. La profe saca su hoja de respuestas y compara pregunta por pregunta. Si la tres dice catorce y la hoja dice doce, esa está mala, aunque la letra sea preciosa.

Probar software es eso. Que el programa corra sin errores es la hoja llena. Que lo que produjo esté bien es otra pregunta, y para responderla necesitas la hoja de respuestas. En testing esa hoja se llama oráculo: lo que decide si una prueba pasa o no. Cada vez que escribas una prueba en este curso te voy a pedir lo mismo: dime cuál es tu hoja de respuestas.

## 3. Teoría

[03:21] → E05
Empiezo por la tesis de todo mi método, porque todo lo demás cuelga de ahí: mueve tu tiempo de teclear a decidir. Tu valor como QA no está en escribir tests. Está en decidir qué probar, con qué riesgo y si lo que salió cumple el contrato.

Para ordenar eso uso cuatro verbos, y te los muestro con el laboratorio de este módulo. Crear: un agente escribió el plan de pruebas de la historia US-42, once o doce escenarios por corrida. Autonomía alta: eso la IA lo hace rápido. Ejecutar: `npm run test:01` corre la suite en poco más de un segundo. También alta. Validar: un scorer en código revisa ocho criterios y deja evidencia de cada uno. Autonomía media, porque esos criterios los escribí yo. Y certificar: decir que el plan de la corrida tres no sale y que hay que fijar el agente antes de confiar en él. Esa firma es mía. Siempre. La IA amplifica al que sabe y confunde al que no. Si vienes de desarrollo ya tienes ventaja, porque sabes leer código y entiendes cómo se rompe. Lo que te voy a sumar es criterio de calidad.

[04:38] → E06
Ahora, el oráculo en serio. Cuando miras el resultado de algo, en realidad te estás haciendo dos preguntas distintas, y mezclarlas es la fuente de la mitad de las discusiones de un equipo.

La primera: ¿funciona como se especificó? Esa es binaria. Pasa o falla. El esquema está completo o no, el rol es válido o no, el código de estado es el que dice el contrato o no.

La segunda: ¿lo que produjo es bueno? Esa no es binaria. Se puntúa contra criterios que el equipo acordó antes.

En el laboratorio de este módulo, el experimento 01 de war-paradigm, esto está escrito en código. La primera pregunta vive en `src/checks.ts`. La segunda vive en `src/criteria.ts` y `src/scorer.ts`, con ocho criterios de aceptación. Tres son `must` y cinco son `should`. Los tres `must` son: cada escenario cita su fuente en la historia, cada requisito obligatorio queda cubierto y ningún escenario espera éxito de un rol prohibido. Los cinco `should` tienen peso: escenarios negativos con 403 para cada acción protegida pesan 30, las fronteras de la historia pesan 28, seguir la plantilla del equipo pesa 20, listar riesgos y supuestos pesa 12 y no repetir escenarios pesa 10. En total, cien. Los `should` suman. Los `must` no suman: bloquean. Si un `must` falla, el veredicto es rechazado, saque el puntaje que saque. Y si todos los `must` pasan pero el puntaje queda por debajo de 70, que es el gate, también se rechaza.

[06:24] → E07
Ahora míralo funcionando. Vuelve la profe, pero esta vez la tarea es real: es el plan de pruebas de la corrida tres sin pins, la del 76. Y la hoja de respuestas es la historia US-42, con su matriz de permisos y sus reglas. Comparo escenario por escenario. S-2: un approver aprueba. El plan espera 200, la historia dice 200. Bien. S-3: un editor aprueba su propio borrador. El plan espera 200, la matriz dice 403. Mal. S-5: publicar sin aprobar. El plan espera 409, la historia dice 409. Bien. S-6: un viewer intenta publicar. Espera 403, la matriz dice 403. Bien. S-7: un viewer intenta aprobar. Espera 403. Bien también.

¿Y de dónde salió el 200 de S-3? El mismo plan lo confiesa en sus supuestos: "los editores pueden aprobar su propio trabajo si no hay aprobador". Eso no está en la historia. La regla R-2 dice lo contrario: solo approvers y admins aprueban, y cualquier otro recibe 403. Lo inventó el agente. Sin hoja de respuestas, se cuela.

Y fíjate que hay tres maneras distintas de rechazar un plan, y el laboratorio prueba las tres. Una: falla la primera pregunta. Un escenario trae el actor "superuser", que no existe en la historia. Ni se puntúa: cero. Dos: falla un `must`. Es la corrida tres: 76 y rechazada. Tres: todos los `must` pasan, pero al plan le quitan las fronteras, dos de los tres negativos y los riesgos. Saca 40, por debajo del 70. Rechazado. Tres razones distintas, y el veredicto siempre te dice cuál fue.

[08:13] → E08
Tercer bloque: los principios. El syllabus Foundation de ISTQB tiene siete. Te muestro cinco, cada uno con un caso del laboratorio, para que no se queden en un póster.

Uno: el testing exhaustivo es imposible. El título de US-42 acepta de 3 a 80 caracteres. No vas a probar todos los títulos posibles. La historia te da cuatro: 2 se rechaza, 3 se acepta, 80 se acepta, 81 se rechaza. Cuatro valores en las fronteras cubren la regla. Priorizar es el trabajo.

Dos: el testing temprano ahorra. El error de S-3 se cazó leyendo el plan, antes de mandar una sola petición a la app. Ahí costó una línea. En producción sería un editor aprobando lo suyo.

Tres: los defectos se agrupan. En la app del laboratorio sobreviven dos mutantes, y los dos caen en permisos: un editor que se sube a admin y un viewer que crea borradores. Es una muestra chica, pero ya se ve la forma: si encuentras un bug de roles, busca el siguiente al lado.

Cuatro: la paradoja del pesticida. Mientras ese hueco del editor estuvo abierto, todas las pruebas del flujo feliz seguían en verde. Repetirlas no lo iba a encontrar nunca. Lo encontró una prueba de otro tipo: un mutante. Por eso la nota de esa sesión cierra con un pendiente: agregar mutantes nuevos.

Cinco: la falacia de la ausencia de errores. Aquí te pongo un caso hipotético: una app sin bugs reportados que nadie usa, porque no resuelve el problema, sigue siendo un fracaso.

De ahí salen dos pares. Verificación es "¿construimos el producto correctamente?". En US-42: publicar sin aprobar da 409, como dice R-3. Validación es "¿construimos el producto correcto?": ¿al equipo le sirve este flujo de aprobación? Eso no lo responde ningún test: se pregunta. Y QA contra QC. QC encuentra el defecto: es el scorer cazando a S-3. QA cambia el proceso para que no nazca: es fijar el modelo, la temperatura en cero y la versión del prompt, para que el veredicto no dependa de la suerte. El rol moderno hace las dos cosas.

[10:40] → E09
Cuarto bloque: riesgo. Riesgo es probabilidad por impacto. No te lo explico con un caso de manual: lo hago con la historia del laboratorio, la US-42, aprobar y publicar un documento. Ojo, es un ejemplo de cómo razono, no una medición.

Riesgo uno: que un rol que no debe aprobar logre aprobar. Impacto alto, porque rompe el control del flujo. La probabilidad no la conozco hasta probarla, así que la trato como alta. Arriba a la derecha: va primero. Riesgo dos: publicar algo sin aprobar. La historia dice que eso debe dar 409. Riesgo tres: el título, entre 3 y 80 caracteres. Impacto más bajo, pero ahí viven los errores de uno más o uno menos.

Mira ese riesgo tres convertido en pruebas. Cuatro fronteras: 2 caracteres se rechaza, 3 se acepta, 80 se acepta, 81 se rechaza. La corrida uno del set fijado solo probó los rechazos, el 2 y el 81. Se le olvidaron los dos que se aceptan. Y no es teoría: en la app del laboratorio nadie mandaba un título de exactamente 80, y bajar el máximo a 79 dejaba la suite en verde. Hoy hay una prueba con 80 caracteres. Si alguien cambia el máximo a 79, esa prueba falla con 422.

[12:09] → E10
Esto tiene una consecuencia práctica: tu estrategia de pruebas cabe en una página. Te muestro la de US-42, armada con lo que ya tiene el laboratorio. Riesgos: los tres que acabas de ver. Alcance: crear, aprobar y publicar, con los cuatro roles. Cambiar roles queda por fuera, porque no es parte de esta historia. Niveles: primero la API, porque la API es el contrato; la interfaz solo esconde botones. Encima, un flujo dorado en el navegador: crear, aprobar, publicar.

Qué automatizo: la matriz completa. Cuatro roles por tres acciones, doce casos, cada uno con su código esperado. Eso se repite en cada cambio, así que el mantenimiento se paga. Qué no automatizo: la primera revisión de la pantalla de aprobación. Esa la hago una vez, explorando. Manual contra automatizado no es una rivalidad: la automatización cuesta mantenimiento y ese costo se paga con repetición. Y mira la última columna: cada línea dice contra qué se decide. En las pruebas, eso es su oráculo. Así quiero tu entregable.

Y aquí entra el shift-left: mover la calidad hacia los requisitos y el diseño, que es donde los defectos salen baratos. El SDLC es el ciclo de vida del desarrollo; el STLC es el de las pruebas dentro de él. El shift-left es que el STLC arranque el mismo día que la historia. S-3 es el ejemplo: el defecto se cazó leyendo el plan, antes de ejecutar nada.

[13:50] → E11
Último bloque de teoría: exploratorio. Testing exploratorio no es hacer clics al azar. Es una sesión con misión, con tiempo y con notas. La misión se llama charter. Este es un charter de ejemplo para US-42: explorar crear y aprobar con los cuatro roles, durante sesenta minutos, buscando cualquier respuesta que no coincida con la matriz de permisos. Tiene foco, tiempo y un oráculo: la matriz. Sin oráculo, la exploración se vuelve paseo.

Así se ven las notas. La primera es real: preparando este curso apareció que un viewer, que es solo lectura, crea un borrador y la app responde 201. La matriz dice 403. Eso es un hallazgo. La segunda también sale de la historia, pero es una pregunta: un approver puede crear y puede aprobar, y la historia no dice si puede aprobar su propio borrador. No es un bug todavía. Es una pregunta para producto. Anotas mientras exploras, no al final.

Un hallazgo se reporta paso a paso, para que cualquiera lo repita. Uno: entras como viewer. Dos: creas un borrador con título y dueño. Esperado: 403. Obtenido: 201. Y si sabes la causa, la anotas: la ruta que crea borradores no revisa el rol. Pasos, esperado y obtenido. Si falta uno, nadie lo puede reproducir.

Y el perfil al que apunta este curso tiene nombre: Quality Engineering, o lo que hoy se anuncia como "AI QA Engineer". Dejas de ser la persona que ejecuta casos y pasas a ser la persona que diseña los oráculos, decide el riesgo y firma la certificación.

## 4. Laboratorio

[15:42] → E12
Vamos a la terminal. El laboratorio es el experimento 01 de mi repo war-paradigm. Clonas, instalas y corres.

`git clone https://github.com/criguex/war-paradigm.git && cd war-paradigm`. Después `npm ci`, que instala exactamente lo que dice el lockfile, y `npx playwright install --with-deps chromium`. Necesitas Node 20 o superior. No hace falta ninguna llave de API: las corridas del agente están grabadas como fixtures, para que el resultado sea reproducible.

Con `npm run test:01` corres las pruebas del experimento. En mi corrida salen 27 pasadas y una saltada. La saltada es la del agente en vivo, que solo se activa si conectas un agente real con una variable de entorno.

[16:35] → E13
Ahora `npm run demo:01`. Esto imprime la tarjeta de puntaje de cada corrida. Primero el set fijado, el "pinned": modelo con versión, temperatura cero y prompt etiquetado como `test-plan@v3`. Mira las tres corridas: 86, 84 y 87. Los puntajes se mueven un poquito, porque la salida del agente cambia, pero las tres salen aprobadas. Veredicto: STABLE, tres de tres de acuerdo.

Fíjate en el detalle de cada línea. AC-5, por ejemplo, sale parcial: dos de cuatro fronteras cubiertas, faltan B-2 y B-3. Son las dos fronteras que se aceptan, el título de 3 y el de 80. Las viste en el riesgo tres. Cada criterio trae su evidencia calculada por código. Nadie le pregunta a un modelo qué opina de sí mismo.

[17:30] → E14
Baja al set sin fijar. Temperatura uno, prompt `latest`, modelo sin versión. El propio programa te avisa con tres advertencias antes de calificar. Corrida uno: 83, aprobada. Corrida dos: 74, aprobada. Corrida tres: 76, rechazada.

Ahí está el gancho del principio. AC-1 falla porque S-4 tiene la fuente vacía y S-6 dice que su fuente es "chat". AC-3 falla por S-3, el editor que aprueba lo suyo: la misma equis que viste en la hoja de respuestas. Dos `must` caídos. El puntaje queda por encima del gate y aun así el veredicto es rechazado. Y como la misma entrada dio aprobado, aprobado, rechazado, el veredicto del set es UNSTABLE. Eso es un hallazgo sobre la configuración del juez, no sobre la historia de usuario.

[18:29] → E15
La otra mitad del laboratorio no es código: es tu estrategia y tu sesión exploratoria. Para que veas el tamaño, abre en el navegador la nota `Test strategy` del vault del experimento 03. Es una tabla de capas, con la herramienta y lo que prueba cada una, y cinco principios. Cabe en una pantalla. Y en la carpeta `04 Sessions` hay una nota de sesión real: objetivo, qué pasó, decisiones y siguiente paso. Esa es la forma que quiero para tus notas exploratorias.

La nota de sesión de ese vault, por cierto, cuenta una ronda de mutantes contra la app de demostración: seis mutantes, cinco atrapados y uno que sobrevivió. Ese sobreviviente es un bug real de autorización, y lo vamos a desarmar en el próximo módulo. Desde entonces el marcador dice cinco de siete: el segundo sobreviviente es el viewer que crea borradores, el hallazgo de las notas del charter. Ahora es el mutante `viewer-create`. Lo que quiero que veas hoy es la estructura: cualquiera que la lea mañana sabe qué se hizo, qué se decidió y qué falta. Así tiene que quedar tu sesión de sesenta minutos.

## 5. Mutación WAR de la semana

[19:44] → E16
Y ahora la pregunta que atraviesa todo el curso: ¿cómo sabes que tu oráculo detectaría un problema? Si nunca lo viste fallar, no lo sabes.

Así que lo rompo a propósito. Una sola cosa. En `fixtures/runs/pinned/run-1.json` le borro la fuente al escenario S-1: donde decía `US-42/R-1`, ahora dice comillas vacías. Antes de correr escribo la predicción: AC-1 debería fallar, el veredicto de la corrida uno debería pasar a rechazado y el puntaje no debería moverse, porque AC-1 es `must` y no suma puntos.

[20:25] → E17
Corro `npm run demo:pinned -w experiments/01-ai-verdict`. AC-1: failed. "S-1 has no valid source". Puntaje 86, el mismo de antes. Veredicto: REJECTED, must failed: AC-1. Y el set completo pasa de STABLE a UNSTABLE. Predicción cumplida: KILLED.

Y las pruebas del experimento también lo notan: con este cambio, `npm run test:01` da seis fallidas y veintiuna pasadas. Vuelvo el archivo a como estaba, corro otra vez y regresan las 27 en verde. Esa es la costumbre que te pido desde hoy: ver fallar a tu guardia antes de confiar en él. Test the tester, mutate reality.

## 6. El reto y cómo se evalúa

[21:11] → E18
Tu reto tiene dos partes. Primera: elige una app o una API pública y escribe una mini estrategia de pruebas de una página. Riesgos, alcance, niveles, qué automatizas y qué no. Segunda: haz una sesión de testing exploratorio de sesenta minutos con charter y notas.

Los criterios son verificables. Uno: la estrategia cabe en una página y nombra al menos tres riesgos con probabilidad por impacto. Dos: cada prueba planeada dice cuál es su oráculo, qué decide si pasa. Tres: las notas exploratorias tienen charter, duración y al menos un hallazgo o una pregunta abierta. El entregable es un documento "Estrategia de pruebas v0" más las notas, en tu repo.

Te muestro el criterio dos con un caso. Esta prueba no lo cumple: "probar que aprobar funciona". ¿Funciona según quién? Esta sí: un viewer intenta aprobar, espera 403, y el oráculo es la matriz de permisos. La primera es una intención. La segunda es una prueba.

La rúbrica tiene cuatro niveles. Nivel uno: falta el entregable. Nivel dos: está, pero falla un criterio. Nivel tres, aprobado: cumple los tres. Nivel cuatro: además escribes tres criterios `must` y tres `should` con peso para una historia tuya, y un scorer que calcula la evidencia en código, como el experimento 01. Para aprobar el módulo necesitas el reto en nivel tres y el quiz: ocho preguntas al azar de un banco de diez, mínimo seis bien.

## 7. Mini-quiz

[22:53] → E19
Tres preguntas del banco. Pausa el video si quieres pensarlo.

Primera. Tu suite corre mil doscientos tests y toda está verde. ¿Qué puedes afirmar con certeza? A: el software está bien. B: que tus tests, como están escritos, no encontraron nada. C: que puedes certificar todas las historias del sprint. D: que el riesgo residual es cero.
[pausa 5 s]
Es la B. Toda verde habla de tus tests, no del software. Certificar exige además evidencia y trazabilidad.

[23:32] → E20
Segunda. Riesgo es probabilidad por impacto. Con una tarde disponible, ¿qué pruebas primero? A: el flujo de pago que usa el noventa por ciento de los clientes. B: un tooltip mal alineado en el admin. C: una pantalla de configuración que se usa una vez al año. D: el orden alfabético de un listado.
[pausa 5 s]
La A. El mayor producto de probabilidad por impacto va primero. Lo demás espera.

[24:07] → E21
Tercera. La app lleva cero bugs reportados en tres meses, pero los usuarios la abandonan porque no resuelve su problema. ¿Qué principio aplica? A: paradoja del pesticida. B: defect clustering. C: la falacia de la ausencia de errores. D: testing temprano.
[pausa 5 s]
La C. Que no haya errores no garantiza valor. Por eso existe la validación.

## 8. Cierre

[24:40] → E22
Me quedo con tres ideas. Una: tu valor está en decidir qué probar, con qué riesgo y si cumple el contrato. Dos: cada prueba tiene un oráculo, y separas "¿corre como se especificó?" de "¿lo que produjo es bueno?". Los `must` bloquean, los `should` suman. Tres: si nunca viste fallar a tu guardia, no sabes si está despierto.

En el siguiente módulo convertimos esa tercera idea en método: WAR Paradigm, probar al que prueba y mutar la realidad. Los enlaces al módulo y al repo están en la descripción.

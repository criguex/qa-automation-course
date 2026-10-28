# Guion ES · Módulo 18 · m11 — QA aumentado con IA

_Palabras de narración: 2590 · duración estimada 17:31 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña. Las líneas que empiezan con `>` son notas de producción y no se narran.

## [00:00] → E01 · Gancho

Una aplicación pequeña: iniciar sesión, crear una publicación, aprobarla y publicarla. Todas las pruebas del camino feliz en verde.

Después corro siete mutantes, cada uno rompe un paso a propósito. Cinco mueren: la app responde 403, 422, 409, 401. Pero dos sobreviven. Un editor llama al endpoint de roles y se pone a sí mismo de administrador. La app responde 200. Ese editor ya puede aprobar y publicar solo. El otro lo encontré preparando este curso: un usuario de solo lectura crea un borrador y la app responde 201.

Y todo el camino feliz seguía en verde. Cuando el código y sus pruebas salen del mismo lugar, como pasa cada vez más con la IA, un verde prueba menos de lo que parece. Hoy: generar pruebas con IA sin creerle a ciegas.

## [00:53] → E02 · Título

Módulo dieciocho: QA aumentado con IA. Es lo que me hace distinto como QA, y ahora es tuyo. Va casi al final del curso por una razón: la IA amplifica al que sabe y confunde al que no. Si todavía no puedes evaluar lo que te entrega, no distingues lo correcto de lo plausible.

## [01:14] → E03 · Explicado para un niño de 8 años

Imagina que tienes un ayudante rapidísimo para las tareas. Le dices "hazme las sumas" y en un segundo te entrega la hoja llena, con letra bonita.

El problema es que a veces se equivoca. Y cuando se equivoca, no duda: te entrega el resultado malo con la misma cara de seguridad que el bueno. No te avisa.

Entonces el trato es este: el ayudante hace el trabajo rápido, pero tú revisas cada hoja antes de entregarla. Si no sabes sumar, no puedes revisar. Por eso primero aprendes a sumar y después usas al ayudante.

Y hay un truco para saber si tu revisión sirve: la profe esconde a propósito un error en una hoja que ya estaba bien. Si lo encuentras, tu revisión tiene ojos. Si no lo ves, alguien más se va a dar cuenta por ti, y peor.

## [02:10] → E04 · Teoría 1: la IA directora planea, la IA del IDE ejecuta

El modelo central de mi método es este: una IA directora planea y otra IA, pegada al código en el IDE, ejecuta. Separar la planeación de la ejecución rinde más que una sola IA haciendo todo, y funciona con cualquier par de herramientas.

La directora, por ejemplo Claude Code, mantiene el contexto amplio y arma el plan. La ejecutora, por ejemplo Copilot o Cursor, trabaja pegada al archivo que estás editando. Y hay un tercer rol que no se delega: tú, el criterio. Tú revisas cada diff.

No es marketing de herramientas. Son cargas distintas: planear necesita contexto amplio, ejecutar necesita estar encima del código.

## [02:52] → E05 · Código: el archivo que conecta las dos IAs

¿Cómo se entera la ejecutora del plan de la directora? Con un archivo de instrucciones. En Copilot, según su documentación, va en punto github barra copilot-instructions.md. En Cursor son las rules. Yo le digo "el CLAUDE.md del IDE": el artefacto que hace que la ejecutora herede tus convenciones y restricciones en vez de improvisar su propio estilo.

Y aquí va una regla que repito mucho: contexto antes que prompt. Un prompt brillante sobre contexto pobre rinde poco. Yo trabajo el contexto en tres capas. El CLAUDE.md, con las reglas. La memoria persistente, con hechos sobre ti y tu forma de trabajar. Y una bóveda de Obsidian, con el conocimiento del proyecto.

## [03:37] → E06 · Código: el segundo cerebro

Esa tercera capa la tienes armada en war-paradigm, en el experimento tres, "segundo cerebro". El espécimen es honesto: un asistente al que le piden pruebas de Playwright para un flujo que nunca ha visto. Código limpio, sintaxis correcta, y no prueba nada que importe.

Lo que lo arregló no fue un mejor prompt. Fue darle al asistente el mismo conocimiento que un QA senior lleva en la cabeza, escrito en un solo lugar que lee antes de cada tarea. Una bóveda con una nota "léeme primero", reglas de oro y cinco carpetas predecibles: proceso de QA, flujos de trabajo, conocimiento, sesiones y plantillas.

Mira la regla de oro número cuatro: no inventar. Nada de datos de prueba, roles, códigos de estado o requisitos que no estén en la carpeta de conocimiento. Si falta algo, se dice y se crea una tarea. No se rellena el hueco con una suposición.

El README deja dos lecciones de la estructura. La estructura le gana al volumen: carpetas pequeñas, aburridas y predecibles son las que dejan que el asistente encuentre la nota correcta siempre. Y una nota responde una pregunta y enlaza a las demás. Cuando el asistente lee el flujo dorado, recibe también los roles, los bugs conocidos y los datos. Y hasta la bóveda tiene prueba: un verificador falla el build si un enlace apunta a una nota que no existe, si una nota no tiene metadatos o si queda aislada.

## [05:12] → E07 · Teoría 2: los cinco bloques de un buen prompt

Ahora sí, el prompt. Cinco bloques. Contexto, insumo, instrucción, restricciones y salida esperada. Cada bloque elimina una clase de fallo: sin restricciones, la IA inventa alcance; sin salida esperada, el formato es una lotería.

Mira el pedido que está en la nota "Design scenarios with AI" de la bóveda. Antes de pedir, el asistente lee la nota de inicio, las reglas, la nota del flujo, la matriz de roles y los defectos abiertos. Ese es el contexto. El insumo son los criterios de aceptación de la historia US-42. La instrucción: diseñar escenarios. Las restricciones: no inventar roles ni datos, usar la nota de usuarios de prueba, un escenario negativo por cada acción protegida y los cuatro casos de borde del título. Y la salida esperada: para cada escenario, un id, título, actor, acción, estado esperado, pasos y la fuente en la historia.

Y la misma nota dice qué hacer después de la respuesta. Calificar el plan contra los criterios de aceptación: los must bloquean y los should suman, y se rechaza todo lo que no tenga fuente. Y correr el mismo pedido tres veces. Si el veredicto cambia, el hallazgo es sobre el prompt o sobre lo que no fijaste, el modelo, la temperatura o la versión del prompt. No sobre la historia.

## [06:38] → E08 · Teoría 3: prompt packs

Cuando una tarea la haces veinte veces, merece una plantilla probada. Eso es un prompt pack: recetas reutilizables con huecos marcados entre signos de menor y mayor. Generar escenarios desde una historia, revisar un contrato, triar un fallo de CI. Mi experiencia es que pasas de diez minutos a uno.

El prompt artesanal que escribes cada vez desde cero reinventa errores que ya habías resuelto. El pack los deja resueltos.

Y el pack no está completo sin su checklist de revisión. Porque el pack te ahorra tiempo escribiendo. El checklist es lo que te protege cuando la IA te devuelve algo plausible y malo.

## [07:19] → E09 · Teoría 4: la IA se equivoca con seguridad

Human-in-the-loop. La frase que tienes que tatuarte: la IA se equivoca con seguridad. Sus errores llegan con tono confiado, y el tono no tiene nada que ver con si está bien. Por eso revisas siempre el diff, aunque suene convincente.

¿Qué buscas primero cuando recibes una suite generada? Tres vicios típicos con los que la IA hace pasar pruebas: aserciones débiles, como esperar que true sea true; esquemas relajados que aceptan cualquier cosa; y selectores frágiles. La IA optimiza a que pase, no a que valide. Y un test verde que no afirma nada es peor que no tener test, porque da confianza falsa.

Otro clásico: la IA genera una prueba contra POST barra users barra validate, y ese endpoint no existe en el contrato. Lo inventó con total confianza. El antídoto: el contrato va como insumo en el prompt, y el diff se revisa contra él.

Dos reglas de oro más de la bóveda que van aquí. La seis: cada fallo recibe un veredicto, bug del producto, bug de la prueba, entorno o datos, y nunca se "arregla" una prueba para que pase contra una respuesta equivocada. Y la siete: verde tres veces, no una. Una prueba que pasó una vez es una candidata, no una prueba.

## [08:42] → E10 · Teoría 5: el test mental para delegar

¿Qué le delegas a la IA y qué no? Me hago cuatro preguntas. ¿La responsabilidad es mía? ¿Requiere criterio de negocio o de riesgo? ¿Es irreversible hacia afuera? ¿Es mecánico, sobre una convención clara?

Ejemplos. Generar steps desde un contrato OpenAPI: mecánico, sobre convención clara. Se delega. Escribir un Page Object siguiendo el patrón del repo: igual. Formatear el reporte de evidencia: también. Pero decidir si un desajuste de contrato bloquea el release: eso es criterio de negocio y de riesgo, y la responsabilidad es tuya. Eso no se delega.

Y la otra cara: no uses IA para una tarea que todavía no puedes evaluar. Si no dominas el tema, no vas a distinguir lo correcto de lo plausible.

## [09:30] → E11 · Código: las reglas duras van en hooks

Hay reglas que no pueden depender de que la IA se acuerde. Un prompt se puede ignorar. Un hook no se olvida.

En el mismo experimento tres de war-paradigm, el archivo punto claude barra settings.json registra un hook PreToolUse de Claude Code para la herramienta Bash, que ejecuta hooks barra block-push-to-main.sh. Ese script lee la llamada como JSON y sale con código 2 cuando el destino es main o master. La documentación de Claude Code lo confirma: en PreToolUse, el código de salida 2 bloquea la llamada, y el mensaje de error le llega al asistente.

El README muestra los casos: git push origin main, bloqueado. Un push forzado a HEAD dos puntos main, bloqueado. npm test y después push a master, bloqueado. Push a una rama de feature, permitido. Y no lo creo porque sí: la barrera se prueba al estilo WAR, con 40 casos que intentan colarse, incluidos comandos encadenados y opciones globales de git. Seis todavía pasan, como `sh -c` o la rama en una variable, y quedan fijados como límites conocidos: un hook con regex es una barrera contra errores, no un sandbox. El hook entiende refspecs, flags de force, git guion C con otra carpeta, y el git push a secas, resolviendo en qué rama estás. Lee el JSON con jq, si no hay jq con node, y si no, con sed. Y las pruebas corren contra repos de git temporales de verdad, en main y en una rama de feature, con los tres lectores.

La regla de oro número cinco lo dice sin rodeos: no busques cómo saltarte el hook. Abre un pull request.

## [11:18] → E12 · Terminal: la salida de una IA cambia, tu veredicto no

Y si la IA genera algo distinto en cada corrida, ¿cómo decides si pasó? El experimento uno de war-paradigm, "veredicto de IA", lo resuelve así.

Dos preguntas, dos oráculos. ¿Funciona como se especificó? Eso es determinista: esquema, roles, códigos de estado. ¿Lo que produjo es bueno? Eso es un puntaje contra criterios de aceptación explícitos: los must bloquean, los should suman, y el gate es setenta.

Mira la salida de npm run demo en el README. Set fijado: modelo con versión, temperatura cero, prompt versión tres. Tres corridas, aprobadas con 86, 84 y 87. Veredicto estable. Set sin fijar: temperatura uno, prompt "latest". Corrida uno aprobada con 83, corrida dos aprobada con 74, corrida tres rechazada con 76. Veredicto inestable.

Fíjate en la tercera: tiene 76, por encima del gate, y aun así se rechaza, porque dos escenarios perdieron su fuente y uno deja que un editor apruebe su propio borrador. Para eso existen los must. Los puntajes se pueden mover. El veredicto no.

Y una aclaración honesta, que el mismo README hace: esas seis corridas son fixtures grabados, escritos a mano para el experimento con la forma de lo que suele devolver un agente de planeación, y deterministas a propósito para que la demo no necesite llave. Lo real es el código que las califica: los chequeos, los criterios, el puntaje y la prueba de estabilidad. Si quieres un agente de verdad detrás, el experimento trae un adaptador por variable de entorno.

## [12:55] → E13 · Teoría 6: MCP y Playwright MCP

Última pieza de teoría: MCP, el Model Context Protocol. Es la forma de conectar herramientas al modelo. Con Playwright MCP, el asistente maneja un navegador real: corre flujos, lee el DOM y verifica.

¿Qué cambia? Que la IA pasa de escribir pruebas que quizá funcionen a probar de verdad y corregirse con lo que ve. Por eso la combinación de Playwright, MCP y un asistente de código aparece cada vez más en vacantes de QA.

Pero las reglas no cambian. Que la IA pueda abrir un navegador no la vuelve el oráculo. El oráculo sigue siendo el contrato, los criterios de aceptación y tu revisión.

## [13:37] → E14 · Laboratorio paso a paso

Tu turno. Paso uno: genera una suite desde un contrato de API o una historia de usuario, con una IA directora y una ejecutora. Pasa el contrato como insumo, usa los cinco bloques y revisa cada diff antes de aceptarlo.

Paso dos: corre cada prueba generada. Una prueba que nunca corriste no es una prueba.

Paso tres: arma tu prompt pack, con huecos marcados y un ejemplo de uso, y su checklist de revisión de la salida del LLM. Usa lo que vimos: aserciones débiles, esquemas relajados, selectores frágiles, endpoints que no están en el contrato y datos inventados.

Los criterios del curso: cada test generado se corrió y tiene tu revisión en el diff. El prompt pack tiene huecos marcados y un ejemplo de uso. Y el checklist atrapa al menos un error real del LLM. Si no atrapó ninguno, o no buscaste bien o no le pediste lo suficiente.

## [14:38] → E15 · Mutación WAR de la semana

La mutación de esta semana va directo al riesgo del gancho. La IA también escribe los checks. Entonces muta el producto y mira si las pruebas generadas se ponen rojas.

Escribe antes la predicción: qué cambio en el producto debería romper qué prueba. Después rompe una regla de la app, una sola, y corre la suite generada. Si sigue en verde, encontraste una prueba sin dientes, y eso va a tu checklist.

En war-paradigm puedes ver el ciclo completo. El mutante self-grant sobrevive y queda impreso en rojo como hallazgo conocido, junto a viewer-create. Si corres con MUTANT_LAB_STRICT igual uno, cada sobreviviente hace fallar la corrida. La causa raíz está documentada en la nota del defecto, DEF-001: el endpoint de roles reutiliza la regla de "los miembros pueden editar su propio perfil", que dice admin o el mismo usuario. El chequeo pensado para los campos del perfil terminó cubriendo también el campo del rol.

Y el README te muestra cómo matarlo: cambiar la regla para que solo un admin cambie roles. Corres los mutantes otra vez, el endpoint responde 403 y el marcador dice FIXED.

## [15:52] → E16 · El reto y cómo se evalúa

El entregable: la suite generada con IA, con el diff revisado; el prompt pack; y el checklist de revisión.

El nivel más alto: mutas el producto y muestras que los tests generados se ponen rojos. Con la predicción escrita antes, la salida de la corrida y el enlace al diff de la mutación.

## [16:13] → E17 · Mini-quiz

Tres preguntas. Pausa si quieres.

Primera: según el test mental, ¿cuál tarea no le delegas a la IA? Decidir si un desajuste de contrato bloquea el release. Criterio de riesgo más responsabilidad igual a humano.

Segunda: "la IA se equivoca con seguridad" significa... que sus errores llegan con tono confiado. Revisas siempre el diff.

Tercera: la IA generó un test contra POST users validate y ese endpoint no existe en el contrato. ¿Qué pasó? Una alucinación. El contrato va como insumo y el diff se revisa contra él.

## [17:03] → E18 · Cierre

Tres ideas. Uno: la IA directora planea, la del IDE ejecuta y tú decides. Dos: contexto antes que prompt, y las reglas duras en hooks, no en prompts. Tres: si la IA escribe el código y las pruebas, muta el producto para saber si esas pruebas tienen dientes.

En el siguiente módulo seguimos con IA, pero con una regla más dura: el asistente prueba, la persona firma. Nos vemos allá.

# Guion · 35 · m13 · Tu carrera QA+IA: posicionamiento

Voz en off: Cristian, primera persona · español de Colombia, tuteo · ~150 palabras/min · 2481 palabras de narración · duración estimada 16:47 (incluye pausas del quiz)

Cada bloque lleva su marca de tiempo y la escena que lo acompaña (→ E##). Los tiempos de `escenas.json` siguen este guion.

## Gancho

[00:00] → E01

Te muestro dos formas de reportar el mismo bug. Una API devuelve XML, pero en la cabecera dice que es HTML. Mi prueba de contrato lo atrapa. Forma uno: le escribo al equipo, mi test de contrato está fallando, ¿pueden cambiar el servicio para que pase? Forma dos: les mando el comando curl que cualquiera puede correr, la respuesta con la cabecera equivocada, y una línea sobre quién sale afectado: los SDK, gateways y validadores estrictos que eligen el parser por esa cabecera. La primera hace que el problema parezca mío. La segunda hace que el problema sea del consumidor, que es donde está.

[00:42] → E02

Y dos formas de contar quién eres. Una: sé Playwright y Selenium, y aprendo rápido. La otra: diseño estrategia de calidad y superviso pruebas generadas por IA, y este repo lo demuestra; aquí está el número y aquí el comando que lo produce. Herramientas y certificados los tiene mucha gente. Lo que separa a un perfil de otro es criterio, supervisión de IA y una prueba que alguien puede abrir y correr. Este es el último módulo del curso, y es para eso: posicionarte con evidencia. Un número sin comando es un adjetivo.

## Explicado para un niño de 8 años

[01:19] → E03

Si tuvieras ocho años: contar lo que sabes hacer es como mostrar tu mejor dibujo. No dices dibujo bien. Lo enseñas. Y si alguien te pregunta cómo lo hiciste, le muestras los colores que usaste y los pasos, para que él también lo pueda hacer. En tu carrera pasa lo mismo. Decir soy buen QA no convence a nadie. Mostrar un proyecto, con un número y el comando que lo produce, sí. Y si otra persona corre ese comando y le sale lo mismo, ya no es tu palabra: es evidencia.

## Teoría · el rol sube de altitud

[01:55] → E04

La teoría arranca con el perfil. El camino ha sido de QA manual a Quality Engineering, y ahora a algo que muchos están llamando AI QA Engineer. El nombre importa menos que el cambio de altitud: pasas de escribir tests a diseñar la estrategia y supervisar pruebas que genera una IA. La IA puede escribir muchos tests rápido. Lo que no puede hacer por ti es decidir qué riesgos importan, qué no se va a automatizar y por qué, y si un verde de verdad significa algo. Esa decisión es tu trabajo. Y es justo lo que practicaste en los últimos módulos: probar al que prueba.

## Teoría · pruebas agénticas

[02:38] → E05

Segundo: las pruebas agénticas. Asistentes como Claude Code o Codex ya diseñan, corren y auditan pruebas. Y MCP, el Model Context Protocol, es un protocolo abierto para conectarlos a tus herramientas: tu navegador, tu tracker, tus datos. Eso cambia mucho la velocidad, pero no cambia quién responde. La firma sigue siendo humana. En el capstone lo viste: el asistente ejecuta, un hook en el código le pone límites que no dependen de un prompt, cada paso deja un recibo, y tú revisas el diff y firmas. Si en una entrevista te preguntan cómo usas IA, esa es la respuesta que muestra criterio.

## Teoría · comunicar hallazgos

[03:18] → E06

Tercero: cómo comunicar un hallazgo. Hay una frase del módulo que me sirve mucho: la automatización es el detector, no la razón; el beneficiario es el consumidor. Cuando hablas con un stakeholder, a esa persona no le importa tu framework, ni tu cobertura, ni que tu test esté rojo. Le importa el riesgo y el impacto para quien usa el servicio. Tu suite es solo cómo lo detectaste. Entonces traduce siempre: no digas mi test falla; di qué le pasa al cliente, al pago, a la reserva, al reporte. Y nunca apuntes a la persona que introdujo el bug. Apunta al consumidor afectado.

## Teoría · escalar un contract mismatch

[04:00] → E07

Cuarto: escalar un contract mismatch. Pasa cuando lo que el servicio entrega no coincide con lo que el contrato promete. El reporte tiene tres partes. Evidencia: el comando curl y la response, tal como salieron, para que cualquiera lo reproduzca sin tu suite. Impacto: quién consume ese servicio y qué le pasa. Y opciones de resolución: corregir el servicio, actualizar el contrato si el comportamiento es intencional, o aclarar con el dueño del contrato. Lo que nunca dices es cambien el servicio para que pase mi test. Eso pone tu prueba en el centro, y la prueba nunca es el centro.

## Teoría · tus números con su comando

[04:40] → E08

Quinto: tus números. El módulo pide tres tipos de número que te diferencian. El kill rate de tu suite: cuántos mutantes mata. El acuerdo de tu juez con etiquetas de referencia, si evalúas IA: qué tanto coincide con ellas, con qué intervalo y quién las escribió. Y huellas reproducibles: un código corto que otra persona obtiene igual en su máquina. Los tres tienen algo en común: salen de un comando. No de un adjetivo, no de un recuerdo, no de una captura sin el comando que la produjo. Si en tu pitch dices un número, alguien tiene que poder abrir tu repo y obtenerlo.

## Teoría · portafolio y entrevistas

[05:22] → E09

Y dos cosas del banco de preguntas que te sirven tal cual. El portafolio que más puertas abre no es una lista de certificaciones ni cincuenta repos de ejercicios: son dos o tres repos con READMEs que explican decisiones, por qué esta capa, por qué este trade-off, con el pipeline verde a la vista. El entrevistador técnico abre el repo; si el README muestra criterio, ya pasaste el primer filtro. Y cuando te pidan el bug más difícil que encontraste, cuéntalo completo: contexto, cómo lo detectaste con evidencia, la causa, el impacto de negocio y qué cambiaste para que no vuelva. En dos minutos muestras el ciclo completo.

[06:05] → E10

Más preguntas de entrevista. Si te preguntan si buscas el cien por ciento de cobertura, no digas que sí: la cobertura de líneas no es la meta; priorizas cobertura de riesgo y puedes mostrar cómo la decides. Si dudas entre una oferta de QA Automation y una de SDET, no decidas por el título: pregunta quién diseña la estrategia, si se construye framework o solo casos, y si hay code review de tests. En tus primeros noventa días, aprende el contexto antes de proponer cambios grandes; las suites que parecen malas suelen tener razones. Y para mantenerte vigente: práctica, comunidad como Test Automation University y Ministry of Testing, y proyectos pequeños con agentes y MCP.

[06:51] → E11

Una más del banco, que parece menor y no lo es: tu titular. QA Engineer, a secas, no dice nada. QA Automation, busco oportunidades, tampoco. El que trabaja por ti mientras duermes junta dos cosas: una especialidad concreta y una prueba. Por ejemplo: QA Automation o SDET, contract testing y QA aumentada con IA, y el nombre de tu proyecto. Los reclutadores buscan por palabras clave, y los técnicos hacen clic para ir al repo. Con especialidad y evidencia a la vista, pasas los dos filtros. Y fíjate que el titular apunta al mismo lugar que tu pitch: al proyecto que lo demuestra.

## Laboratorio

[07:32] → E12

Vamos al laboratorio. Primera tarea: tu pitch de dos minutos. Te propongo cuatro bloques. Quién eres en una frase. Qué haces distinto. La prueba: un repo, un número y el comando que lo produce. Y qué buscas. Te doy un ejemplo con mis repos: hago QA y pruebo lo que construye la IA. Lo que hago distinto es probar a los guardias: rompo algo a propósito y miro si mis pruebas lo notan. Por ejemplo, en war-paradigm mi suite mata cinco de siete mutantes, y los dos que sobreviven son bugs reales de autorización que dejo visibles, uno de ellos encontrado al preparar este curso; lo ves con npm run demo dos. Eso dura menos de un minuto. El resto es tu historia.

[08:21] → E13

Ahora llena las tarjetas con números que salen de un comando. Kill rate: en war-paradigm, demo dos cierra con cinco de siete mutantes puntuables muertos. Acuerdo del juez: en agent-eval-jev corrí hoy python guion m agenteval evaluate, y el veredicto compuesto coincide con las etiquetas de referencia en el noventa y tres coma uno por ciento de veintinueve casos de held-out. Esas etiquetas las redactó una IA y las revisé yo, sin registro caso por caso, así que el número mide al evaluador contra etiquetas redactadas por IA, no contra un juicio humano independiente, y lo digo junto al número; el gate lo confirma y además muestra que la versión vieja del agente, con dieciocho por ciento, quedaría bloqueada. El kappa de ese mismo resultado es cero coma ochenta y seis, y el intervalo, el de Wilson del módulo de estadística. Huella: predictor-debugger imprime E E C 9, cero 9 E 0, F 7 7 D. Tres números, tres comandos. Tus números serán otros; la regla es la misma.

[09:29] → E14

Segunda tarea: el reporte de un contract mismatch. Uso un caso real de mi repo restful-booker-quality-suite, el defecto RB-001. El cliente pide XML y recibe XML, pero la respuesta dice que es HTML. La evidencia son dos comandos. Primero saco un id de reserva. Después pido esa reserva con Accept application xml y curl guion s i, que muestra las cabeceras. Lo observado: Content-Type text html, y después el cuerpo en XML. Fíjate que no necesitas mi suite para verlo. Cualquiera del equipo del servicio lo corre en su terminal y ve lo mismo. Eso es lo que hace que la evidencia sea difícil de discutir.

[10:11] → E15

Así queda el reporte para el stakeholder. Título claro: la respuesta XML declara un media type equivocado. Severidad media, prioridad P1. Esperado y observado, lado a lado. La evidencia, con el comando exacto. El impacto, en palabras del consumidor: los SDK, gateways y validadores de esquema estrictos pueden rechazar el cuerpo o interpretarlo mal, porque usan esa cabecera para elegir el parser. Y las opciones: corregir la cabecera o, si es intencional, documentarlo en el contrato. Fíjate en lo que no aparece: mi framework, mi test en rojo, el nombre de quien escribió el endpoint. Aparece el consumidor.

[10:50] → E16

Un detalle de criterio que me gusta de ese documento. Antes de listar los defectos, define qué cuenta como defecto: algo que viola el contrato documentado, la semántica HTTP, la negociación de contenido, la seguridad de la entrada o la integridad de los datos de ida y vuelta. Y aclara que una respuesta rara no es automáticamente un defecto. Por ejemplo, que el endpoint ping devuelva 201, o que los media types no soportados devuelvan 418, quedan como puntos de aclaración, porque pueden ser intencionales. Esa distinción también es parte de tu posicionamiento: no reportas todo lo que te sorprende; reportas lo que rompe una promesa.

[11:33] → E17

Y antes de cerrar el laboratorio, ensaya la historia del bug difícil con un caso real, el RB-002 del mismo repo. Contexto: creas una reserva en XML diciendo que el depósito no está pagado. Detección: una revisión compara lo que mandaste con lo que el servicio guardó, y el servicio guardó depósito pagado: sí. Causa probable: el texto false convertido con la función Boolean de JavaScript; y el documento lo dice como es, una hipótesis basada en evidencia, no una prueba del código fuente. Impacto: una reserva se puede tratar como pagada sin depósito. Prevención: el bug queda como fallo esperado; el día que lo arreglen, la revisión se pone en rojo para avisar que hay que quitarlo de la lista.

[12:21] → E18

Una última pieza, que es la del nivel cuatro: el README de tu repo de portafolio. Mira dos de los míos. En predictor-debugger, la sección de límites dice el alcance, que las tres máquinas son mías y que por eso no es una reproducción independiente, y que lo escribí y ejecuté con ayuda de asistentes de IA, bajo mi dirección. Eso no te resta: le dice al lector exactamente cuánto creerte. En agent-eval-jev, la animación reproduce la salida real de los comandos evaluate y gate, y el README dice de qué archivo sale y con qué script se renderiza cuadro por cuadro. Una animación así no adorna: es evidencia que se puede regenerar.

## Mutación WAR de la semana

[13:06] → E19

La mutación de la semana es sobre ti. Toma tu pitch y aplícale WAR. Primero, tacha cada adjetivo: robusta, sólida, experto. Si la frase se cae sin el adjetivo, no tenía nada adentro. Segundo, cada número que quede tiene que tener su comando al lado; si no lo tiene, se va. Tercero, el ataque de verdad: le pasas tu enlace a alguien que no conoce tu repo y le pides que corra el comando. Si le da el mismo número, se queda. Si no puede correrlo, o le da otro, ese número no estaba listo para tu pitch. Tu diferencial medible es lo que sobrevive a esa prueba.

## El reto y cómo se evalúa

[13:50] → E20

El reto. Entregas tu pitch de posicionamiento y un ejemplo de reporte de hallazgo para un stakeholder. Los criterios: el pitch dura dos minutos o menos y cita un proyecto tuyo con enlace. El reporte del hallazgo trae curl, response e impacto en el consumidor. Y cada número del pitch sale de un comando que se puede correr. Apruebas con el reto en nivel tres y el quiz en seis de ocho o más. El nivel cuatro: tu repo de portafolio tiene un README bilingüe, con su sección de límites, y una animación generada desde un log real, no dibujada a mano. Como las de mis repos.

## Mini-quiz

[14:32] → E21 · pausa 5 s

Mini-quiz, el último del curso. Pausa si quieres. Primera: ¿cuál pitch posiciona el perfil QA más IA? A, sé Playwright y Selenium. B, diseño estrategia de calidad y superviso pruebas generadas por IA, y este repo lo demuestra. C, tengo la certificación ISTQB. D, aprendo rápido cualquier herramienta. Es la B. Herramientas y certificados son comunes; criterio, supervisión de IA y una prueba tangible son el diferencial.

[15:04] → E22 · pausa 5 s

Segunda: ¿cómo escalas un contract mismatch a un stakeholder? A, cambien el servicio para que pase mi test. B, evidencia con cURL y response, impacto en el consumidor y opciones de resolución. C, un pantallazo del test en rojo. D, esperar al daily para comentarlo. La B. El test es el detector; el argumento es el consumidor afectado.

[15:32] → E23 · pausa 5 s

Tercera, una pregunta trampa de entrevista: ¿buscas el cien por ciento de cobertura? A, sí, siempre. B, no: la cobertura de líneas no es la meta; priorizo cobertura de riesgo y puedo mostrar cómo la decido. C, depende del presupuesto. D, el cien por ciento no existe, y nada más. Es la B. Explicar cobertura de riesgo con un ejemplo es lo que separa a quien ejecuta scripts de quien diseña calidad.

## Cierre

[16:06] → E24

Tres ideas para cerrar, y con esto cierra el curso. Primera: muestra, no digas. Un proyecto con un número y su comando vale más que cualquier adjetivo. Segunda: cuando comuniques un hallazgo, el centro es el consumidor, no tu test. Evidencia, impacto y opciones. Tercera: cada número que digas de ti sale de un comando que otra persona puede correr. Lo que sigue: el examen final, veintiséis preguntas de escenario que cruzan todo el curso, y se aprueba con ochenta por ciento. Y tu capstone, que es tu mejor pitch: otra persona, una máquina limpia, la misma huella. Gracias por llegar hasta aquí.

# Módulo 8b · Sign-off — certificar una historia, el cierre del método

Guion de narración en español (Colombia). Voz: Cristian, primera persona. Ritmo de referencia: 150 palabras por minuto. Las marcas `[mm:ss]` se calculan con ese ritmo; cada bloque indica su escena de `escenas.json`.

## 1. Gancho

**[00:00] → E01**

En war-paradigm tengo una aplicación pequeña con un flujo dorado: un editor crea un documento, un aprobador lo aprueba y el editor lo publica. La prueba de ese flujo está en verde. Si yo hubiera firmado la historia con ese verde, habría certificado un bug de escalamiento de privilegios.

Porque un editor podía cambiarse su propio rol a admin, y la aplicación respondía 200. Con eso, el editor aprueba y publica solo. Todas las pruebas del camino feliz estaban en verde mientras ese bug seguía abierto. Lo encontró un mutante, no el verde.

**[00:37] → E02**

Este es el módulo 8b: sign-off, la certificación de una historia. Es el cierre del método. Vas a aprender a dejar una historia certificada con evidencia y trazabilidad, de forma que cualquiera pueda auditar qué se probó. Y una cosa que no se negocia: el sign-off lo firma un humano.

## 2. Explicado para un niño de 8 años

**[00:57] → E03**

Firmar una certificación es como el profe que firma la libreta de notas. El profe solo firma si vio las notas. No firma porque alguien le dijo "tranquilo, todo va bien".

Y si una materia todavía no tiene nota, el profe no la inventa. Escribe "pendiente", para que los papás sepan qué falta.

Su firma quiere decir: "yo revisé esto y respondo por esto". Por eso no la puede poner un sello automático.

## 3. Teoría

### Bloque 1 · Qué significa "certificada" y por qué la firma es humana

**[01:26] → E04**

Empecemos por una diferencia que se confunde todo el tiempo. El "done" del desarrollador quiere decir código integrado y funcionando. "Certificada" quiere decir probada contra sus criterios, con evidencia y trazabilidad registradas. Entre "funciona en la demo" y "puedo demostrar qué se probó y qué no" hay un abismo. Ese abismo es tu trabajo.

A esa lista de condiciones se le llama Definition of Done. La de certificación no es "todo verde en CI". Es una lista de condiciones verificables: escenarios enlazados, ejecución registrada, evidencia adjunta, defectos conocidos declarados. Si una condición no se puede verificar, no es parte de la Definition of Done; es un sentimiento.

**[02:09] → E05**

¿Por qué la firma la pone un humano? Porque firmar implica un juicio de riesgo y una responsabilidad profesional. Tu firma dice "esto se probó". Automatizar la firma es automatizar la rendición de cuentas, y eso en el curso está prohibido.

Y ahora la situación difícil, porque va a pasar. Deadline encima, y te presionan para firmar con el 30 por ciento de la suite sin correr. ¿Qué haces? No firmas una completitud que no existe. Presentas el estado real: qué se probó, qué no, y el riesgo de lo pendiente. El negocio tiene derecho a aceptar ese riesgo. Pero lo acepta por escrito y con nombre propio, no dentro de tu firma.

### Bloque 2 · La cadena estándar, con enlaces reales

**[02:54] → E06**

La cadena es la misma que en el módulo 8: requisito, caso de prueba, ejecución, evidencia. Cómo se registra el cierre varía por empresa: un comentario en el ticket, un campo del gestor de pruebas o la descripción del pull request. La cadena no varía.

**[03:12] → E07**

Mira cómo se ve una historia con requisitos que se pueden enlazar. En war-paradigm, el experimento 01 usa la historia US-42: aprobar y publicar un documento. Tiene seis requisitos con ID y prioridad. R-1, must: un editor puede crear un borrador con un título de 3 a 80 caracteres y un dueño. R-2, must: solo aprobadores y admins pueden aprobar; cualquier otro recibe 403. R-3, must: un documento solo se publica después de aprobado; si no, 409. R-4, must: los viewers no pueden publicar, 403. R-5, should: una sesión vencida se rechaza con 401 en cualquier paso. R-6, should: un borrador sin dueño se rechaza con 422. Y cuatro límites: títulos de 2, 3, 80 y 81 caracteres.

**[04:00] → E08**

En ese mismo experimento hay un criterio que bloquea: cada escenario cita su fuente en la historia, en la forma US-42 barra R y el número. Si un escenario no dice de dónde sale, el plan se rechaza, sin importar el puntaje. Ese es el enlace en su forma más simple: un ID que apunta a un requisito.

**[04:23] → E09**

Ese experimento te deja otra idea útil para firmar: separar dos preguntas. La primera, "¿funciona como se especificó?", es determinista: esquema, roles, acciones y códigos de estado, y su respuesta es pasa o falla. La segunda, "¿lo que produjo es bueno?", se responde con un puntaje contra criterios de aceptación explícitos, y cada criterio trae su evidencia calculada por código.

Los criterios must bloquean: si uno no se cumple, el resultado es rechazado, tenga el puntaje que tenga. Los should suman al puntaje. Y si el puntaje queda por debajo de 70, también se rechaza. El README lo dice así: el umbral es un número que el equipo acordó, no una sensación.

Y hay un caso en las corridas grabadas que lo muestra perfecto. En el set sin fijar, la corrida 3 saca un puntaje por encima del umbral, y aun así se rechaza: dos escenarios perdieron su fuente y uno deja que un editor apruebe su propio borrador. El puntaje dice "aprobado"; los must dicen que no. Para eso existen.

Además, la misma entrada se corre tres veces. Si el veredicto cambia entre corridas, el que falló es el juez. Un verde defendible se parece a eso: reglas escritas antes, evidencia por criterio y un resultado que se repite.

**[05:47] → E10**

Y ese enlace tiene que ser real. Cada escenario enlazado con su caso en el gestor de pruebas, sin enlaces rotos ni placeholders "por resolver". El mecanismo depende de la herramienta: un tag en el escenario, un ID en el título de la prueba, una anotación. Lo que no cambia es que el enlace existe y lleva a algo.

Un placeholder sin resolver rompe la cadena de auditoría. Y fíjate en la diferencia: un rojo honesto, documentado como defecto conocido, no invalida nada. Lo que invalida es la mentira.

### Bloque 3 · Evidencia autocontenida

**[06:22] → E11**

"La evidencia la tengo en mi máquina; si alguien la pide, se la paso." Eso no vale para un sign-off. Lo que no está registrado en la cadena no existe para la auditoría. El sign-off tiene que sobrevivirte: si te vas de vacaciones, o de la empresa, la cadena completa se tiene que poder reconstruir sin ti.

Tampoco vale "está en CI". En el módulo 8 vimos que restful-booker sube su reporte con una retención de 14 días. Los servidores de CI rotan y borran artefactos.

Por eso el método pide un reporte autocontenido, de un solo archivo, que se adjunta al ticket y se abre en cualquier parte dentro de años. El informe de spendwise es así: un HTML con toda la evidencia embebida que se abre sin el resto del repositorio. Allure también tiene una opción de reporte de un solo archivo, y está en los recursos del módulo.

### Bloque 4 · Los errores que invalidan un sign-off

**[07:23] → E12**

Tres errores invalidan una certificación. Uno: un verde no defendible, es decir, un verde que no puedes explicar con evidencia si te auditan. Dos: trazabilidad sin resolver, enlaces que no llevan a nada o placeholders. Tres: evidencia ausente.

Y una cuarta trampa, más sutil. Una historia con dos escenarios excluidos con `@IGNORE` por un bug del proveedor, con ticket abierto. ¿Se puede certificar? No. El `@IGNORE` bien hecho gestiona la corrida. Pero el cierre de la historia exige que lo excluido se resuelva. Con defectos conocidos abiertos, la historia queda abierta. Se comunica el estado; no se firma una completitud que no existe.

Para el tercer criterio del reto, tu checklist tiene que nombrar esos errores uno por uno. Yo lo escribiría como preguntas que se responden con sí o no. ¿Hay algún verde que no pueda explicar con evidencia? ¿Hay algún enlace que lleve a nada o diga "por resolver"? ¿Falta evidencia de algún caso que se reporte? ¿Hay algún `@IGNORE` o `test.fail` abierto en esta historia? ¿Algún verde pasó una sola vez? ¿Algún mutante sobrevivió sin reporte? ¿La evidencia trae contraseñas o tokens? Si cualquiera es sí, no firmas; comunicas el estado.

### Bloque 5 · Tu Definition of Done de certificación

**[08:40] → E13**

Te muestro la que escribí para el vault de war-paradigm. Se llama "Definition of done for a story", y dice: una historia está certificada cuando cada línea es verdad.

Escenarios diseñados desde los criterios de aceptación, cada uno citando su fuente. Cada requisito must cubierto por al menos un escenario. Un escenario negativo de 403 por cada acción protegida en la matriz de roles. Casos límite: mínimo, máximo, mínimo menos uno y máximo más uno. El flujo dorado en verde en el navegador. Una corrida de mutantes: cada mutante muerto, o cada sobreviviente reportado. Verde tres veces seguidas, no una. Evidencia adjunta, trace o video, de todo lo que se reporte. Y la nota de la sesión escrita.

Fíjate en "verde tres veces seguidas". Una prueba que pasó una vez es una candidata, no una prueba.

**[09:35] → E14**

¿Quién define la Definition of Done? No cada QA la suya. El equipo la acuerda una vez y aplica igual para todos. Tu checklist personal es tu implementación de ese acuerdo. Una Definition of Done por persona es un estándar al azar por historia.

**[09:52] → E15**

Y la firma no siempre es un sí o un no. Mira dos decisiones reales. En restful-booker, la recomendación es no salir a producción con un contrato que soporte XML, precios decimales o fechas sin validar. Pero una demostración restringida a JSON puede seguir, si los precios enteros y las fechas validadas se exigen antes y los defectos de status quedan registrados. En spendwise, el resumen ejecutivo dice: liberar con condiciones, cuando los puntos 1 a 3 estén resueltos y sus pruebas pasen.

Eso es un sign-off con criterio: qué se puede, qué no, y bajo qué condiciones.

## 4. Laboratorio paso a paso

**[10:32] → E16**

Vamos al laboratorio. En war-paradigm, la raíz tiene el atajo para todo: `npm ci`, `npx playwright install --with-deps chromium` y `npm test`. Para el experimento 02, `npm test` corre el flujo dorado en el navegador y los siete mutantes contra la API. Según su README, el resultado es cinco de siete mutantes muertos y dos sobrevivientes conocidos: self-grant y viewer-create, que encontré preparando este curso.

Corre `npm test` tres veces seguidas. Ese es el "verde tres veces" de la Definition of Done. Si en alguna de las tres cambia el resultado, todavía no tienes una prueba; tienes una candidata.

**[11:11] → E17**

Ahora el ejercicio central: para cada requisito de US-42, ¿qué mutante lo ataca? Este mapeo lo hice yo leyendo `scenarios.ts` contra la historia. R-2, solo aprobadores aprueban: el mutante role-swap, un viewer intentando aprobar, espera 403. R-3, publicar solo después de aprobar: reorder, espera 409. R-5, sesión vencida: stale-token, espera 401. R-6, borrador sin dueño: drop-input, espera 422. El límite B-4, título de 81 caracteres: boundary, espera 422. R-1 es el flujo dorado mismo. Y self-grant ataca una regla que se agregó a la matriz de roles el 24 de septiembre: nadie cambia su propio rol. Viewer-create ataca la tabla de permisos de la historia, donde crear es solo para editores, aprobadores y admins: un viewer recibe 201 en vez de 403, así que también sobrevive.

¿Ves el hueco? R-4 dice que los viewers no pueden publicar. Ningún mutante de la lista ataca esa regla. Tampoco el límite B-1, el título de 2 caracteres. Si yo firmara US-42 hoy, tendría que decir que R-4 y B-1 no tienen un mutante que demuestre que la suite los atraparía.

**[12:22] → E18**

El último paso es el registro de cierre. En el vault hay una nota de la sesión del 24 de septiembre: el objetivo, lo que pasó, seis mutantes, cinco muertos, uno sobrevive, el defecto DEF-001 abierto, las decisiones tomadas y lo que sigue, como volver a correr la ronda después del arreglo. Esa nota, más el reporte de un solo archivo y los enlaces de cada escenario, es lo que permite que una auditoría seis meses después reconstruya la cadena completa sin preguntarle a nadie.

Para tu entregable: certifica una historia simulada así. Escenarios enlazados, la corrida, la evidencia adjunta, el registro de cierre y tu decisión firmada: certificada, o no certificada con el estado real.

¿Qué lleva el registro de cierre? Yo le pondría esto. La historia y sus requisitos, cada uno con el enlace a sus casos. La corrida: fecha y revisión del código, como hace el JSON de evidencia de war-paradigm con la revisión de Git. El archivo de evidencia autocontenido. Los defectos conocidos con su ticket. Los riesgos aceptados, con el nombre de quien los aceptó. Y la decisión, con tu nombre y la fecha. Dónde lo escribes depende de tu empresa: el ticket, el gestor o el pull request. Que exista, no.

## 5. Mutación WAR de la semana

**[13:45] → E19**

La pregunta de esta semana va antes de firmar: ¿esta suite habría fallado si el requisito no se cumpliera? Si no lo sabes, te falta un mutante.

Hazlo con el hueco que encontramos. Escribe un mutante para R-4: un viewer intenta publicar, y se espera 403. Agrégalo como dato en `scenarios.ts`, siguiendo la forma de los demás, y corre `npm run test:mutants`. Si muere, R-4 ya tiene evidencia. Si sobrevive, encontraste un bug antes de firmar, que es justo el momento en que más barato sale.

Yo leí `app/server.js` y la regla de publicar rechaza a los viewers con 403. Y la matriz de roles del vault dice que un rol prohibido siempre recibe 403 antes de cualquier validación de datos o de estado. Así que espero que ese mutante muera. Pero fíjate en la palabra: espero. Leer el código no es evidencia. La evidencia es la corrida con el mutante en rojo para la aplicación, en verde para la suite, y guardada en el reporte. Hasta que no la tengas, R-4 sigue sin mutante en tu registro de cierre.

## 6. El reto y cómo se evalúa

**[14:57] → E20**

El entregable: una historia certificada, simulada, con trazabilidad completa, y tu checklist de Definition of Done de certificación.

Los criterios. Uno: cada escenario tiene enlace real a su caso, sin placeholders. Dos: la evidencia es autocontenida y adjuntable. Tres: el checklist incluye los errores que invalidan el sign-off.

Y el nivel más alto: para cada requisito muestras un mutante que la suite atrapa.

## 7. Mini-quiz

**[15:22] → E21**

Tres preguntas. Pausa si quieres.

Primera. ¿Cuál de estos invalida un sign-off? A, un rojo honesto documentado como known issue. B, un enlace de trazabilidad "por resolver". C, un `@IGNORE` con ticket abierto y condición de salida. D, evidencia en un reporte de un solo archivo.

**[15:48] → E22**

Es la B. Los placeholders sin resolver rompen la cadena de auditoría. El rojo honesto no invalida; la mentira sí.

Segunda. ¿Por qué la certificación la firma un humano? Porque implica juicio de riesgo y responsabilidad profesional, y eso no se automatiza.

Tercera. Auditoría seis meses después: preguntan por una historia. ¿Qué debe poder pasar? Reconstruir la cadena completa, requisito, casos, ejecución, evidencia y cierre, desde los registros, sin depender de nadie.

## 8. Cierre

**[16:24] → E23**

Tres ideas. Una: certificada no es "done"; es probada contra sus criterios con evidencia y trazabilidad que cualquiera puede auditar. Dos: la firma es humana, y si el negocio acepta un riesgo, lo acepta por escrito y con su nombre. Tres: antes de firmar, cada requisito necesita un mutante que la suite atrape.

Con este módulo cierras el primer recorrido completo del método. En el módulo 9 pasamos a CI/CD y Docker: cómo hacer que todo esto corra solo, igual en cualquier máquina, en cada cambio.

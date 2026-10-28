# Módulo 7b · Ejecución disciplinada — ciclos, test data & known issues

Guion de narración en español (Colombia). Voz: Cristian, primera persona. Ritmo de referencia: 150 palabras por minuto. Las marcas `[mm:ss]` se calculan con ese ritmo; cada bloque indica su escena de `escenas.json`.

## 1. Gancho

**[00:00] → E01**

Mi suite de Restful Booker dice: 43 chequeos, 43 pasan. Todo verde. Y en la misma carpeta hay un documento con ocho defectos confirmados, tres de ellos de severidad alta, que corrompen datos de negocio en silencio.

¿Cómo puede estar todo verde con ocho bugs adentro? No es una trampa. Es una decisión. Esos ocho defectos están marcados como fallo esperado. La corrida sigue sirviendo para atrapar regresiones nuevas, los defectos siguen a la vista, y el día que alguien arregle uno, la prueba se pone en rojo para avisar.

**[00:36] → E02**

Este es el módulo 7b: ejecución disciplinada. Dos reglas que casi nadie enseña y que salvan días. Cómo iterar ciclos sin re-correr todo, y cómo manejar datos y fallos ajenos sin ensuciar la suite. La frase del módulo es esta: itera estrecho, confirma amplio.

## 2. Explicado para un niño de 8 años

**[00:54] → E03**

Imagina una caja de juguetes. Uno está roto: al carrito rojo se le cae una rueda. Puedes esconderlo en el fondo de la caja para que nadie lo vea. O le puedes pegar una etiqueta que diga "roto, se le cae la rueda".

Si lo escondes, el día que alguien juegue con él se va a llevar la sorpresa. Si le pones la etiqueta, todos saben qué pasa.

Y la etiqueta tiene un truco. El día que alguien arregle la rueda, la etiqueta empieza a sonar: "¡oye, ya no estoy roto, quítame!". Así nadie se queda con una etiqueta vieja pegada a un juguete que ya funciona.

## 3. Teoría

### Bloque 1 · El protocolo de ciclos

**[01:36] → E04**

Arranquemos con el protocolo. Tienes una suite de 120 pruebas. En el ciclo 1 corren los casos nuevos y fallan 7. Llega el arreglo. ¿Qué corres en el ciclo 2?

Muchos equipos responden "los 120 otra vez". Y eso cuesta horas en cada vuelta. El método dice otra cosa: en el ciclo 2 corres solo los 7 que fallaron. Eso es el retest. Y cuando ya no queda nada pendiente, corres la regresión completa una sola vez, al cierre.

El orden es: nuevos, arreglo, retest solo de lo que falló, regresión completa al final. Una vez.

**[02:15] → E05**

Ojo, retest y regresión responden preguntas distintas. El retest pregunta: ¿se arregló este fallo puntual? La regresión pregunta: ¿qué rompió el arreglo? Los arreglos rompen cosas lejos de donde tocan. Si el retest de los 7 pasó pero la regresión final rompió 2 pruebas en otro módulo, eso no es mala suerte ni flakiness. Es exactamente el hallazgo para el que existe la regresión final, y se reporta como un defecto nuevo ligado al arreglo.

En spendwise-qa-assessment la recomendación final lo dice así: no salir a producción hasta corregir o aceptar formalmente los riesgos de severidad alta y completar su retest y regresión. Las dos cosas, en ese orden.

**[02:58] → E06**

Playwright te ayuda con la parte estrecha. Su CLI tiene la opción `--last-failed`, que vuelve a correr solo las pruebas que fallaron en la corrida anterior. En Cucumber filtras con tags. La herramienta cambia; el protocolo no.

**[03:13] → E07**

Y cada ciclo deja registro. En spendwise, la carpeta de evidencia tiene un archivo por campaña: la primera ejecución con 10 casos, la suite de API inicial, la de contrato, integración y E2E, la regresión integral de 119 pruebas, la regresión ampliada, las campañas de mutación, las rondas adversariales y las corridas de Newman. Cada una con su fecha en el nombre.

Para qué sirve eso. Si alguien te pregunta en qué ciclo apareció un fallo, o si la regresión final se corrió una vez o tres, la respuesta está en un archivo, no en tu memoria. El criterio del módulo dice que la regresión final corre una sola vez, al cierre. Sin registro de ciclos, no lo puedes demostrar.

### Bloque 2 · Test data: sin data no se ejecuta nada

**[04:01] → E08**

La mitad de los "fallos" de un ciclo mal preparado son datos que faltan o que están en un estado inesperado. Por eso la regla: sin data no se ejecuta nada. Los datasets se preparan y se documentan antes del ciclo, con dueño y con caveats. No aparecen como sorpresa a mitad de la corrida.

¿Qué es un caveat? Una advertencia escrita sobre el dato. Por ejemplo: un registro dado de baja que devuelve un código "vacío", como un 204 sin cuerpo. Tu prueba lo ve y grita "bug". Pero no es un bug: es un estado especial del dataset, y si estaba documentado, la prueba lo contempla desde el principio.

**[04:46] → E09**

Mira cómo se ve un dataset documentado en mi vault de war-paradigm, el experimento del segundo cerebro. La nota "Test data · users" dice: se siembran en cada `POST /api/_reset`. Contraseña para todos: demo123. Solo demo local, nunca reutilizar en un ambiente real. Una tabla con cuatro usuarios: viewer, editor, approver y admin. Y un caveat: las sesiones vencen según el `ttl` en segundos que pasas al iniciar sesión, y con `ttl: 0` el token sale vencido en la siguiente llamada.

Esa última línea es justo la que necesita el mutante stale-token. Sin esa nota, alguien vería un 401 y pensaría que el login está roto.

**[05:28] → E10**

Dos cosas más del diseño de datos. Primera, el formato del payload en el wire: lo que de verdad viaja por la red. RB-002 de Restful Booker existe porque el mismo booleano se comporta distinto en JSON y en XML. Si solo pruebas JSON, nunca lo ves.

Segunda, la cardinalidad. Si una entidad tiene una relación de uno a muchos con sus documentos, pruebas con cero documentos, con uno y con muchos. El cero rompe pantallas y validaciones. El uno es el camino feliz. Muchos rompen paginación, rendimiento y totales.

Y en ambientes compartidos, no asumas estado. Si tu prueba asume que el usuario demo tiene 3 pedidos y hoy tiene 7, la prueba es flaky por diseño, no por mala suerte. Crea tus datos y límpialos al salir. En spendwise, las reglas de política de prueba se crean inactivas y se eliminan al terminar, y la integración y el E2E corren con un solo worker para no interferir con la configuración compartida.

### Bloque 3 · Known issues sin enmascarar: @IGNORE

**[06:33] → E11**

Ahora la parte delicada. Tienes un escenario que falla por un bug conocido de un proveedor. No lo puedes arreglar tú. ¿Lo borras? No. ¿Lo dejas fallando en cada corrida para que todo el mundo se acostumbre al rojo? Tampoco.

En Cucumber lo marcas con el tag `@IGNORE` y un comentario en el `.feature`. Pero un `@IGNORE` válido siempre va acompañado de tres cosas. Uno: el ticket, que queda Abierto. Dos: la historia de usuario no cierra mientras ese ticket esté abierto. Tres: una condición explícita para quitar la marca, por ejemplo "el arreglo del proveedor está desplegado y verificado".

Un `@IGNORE` sin ticket ni condición de salida es un bug enterrado con lápida bonita. Se vuelve permanente, y la cobertura que reportas miente.

### Bloque 4 · En Playwright: test.fail con su ID

**[07:22] → E12**

En Playwright la herramienta es `test.fail`. Y tiene una ventaja enorme sobre un skip: la prueba sí corre. Si falla, como se espera, cuenta como resultado esperado. Si un día pasa, Playwright la reporta como un pase inesperado y la corrida se pone en rojo. Esa es la etiqueta que suena cuando arreglan el juguete.

**[07:44] → E13**

En restful-booker-quality-suite, `tests/api/known-defects.spec.ts` tiene un bloque llamado "Confirmed product defects" con el tag `@known-defect`. La primera prueba es "RB-002 XML false remains false after creation", y su primera línea es: `test.fail(true, 'Known defect RB-002: XML string false is coerced to boolean true')`. El ID del defecto va en el mensaje. Cualquiera que vea el reporte sabe de qué ticket se trata.

Fíjate en lo que no se hizo: no se cambió la aserción. La prueba sigue esperando `depositpaid` en false, que es lo correcto. Lo que se marcó es que hoy el producto no cumple.

**[08:22] → E14**

La estrategia de pruebas del repo pone las reglas por escrito. La cuarentena solo se usa después de demostrar que la intermitencia es del ambiente, y cada cuarentena necesita dueño, ticket y fecha de vencimiento. Y una frase que me encanta: los retries recogen evidencia, pero no redefinen qué es pasar.

En war-paradigm hay una regla parecida para los mutantes. Un hallazgo conocido solo recibe la marca de fallo esperado después de observar que la mutación fue aceptada. Si lo que falló fue el reset, el login o la línea base, no se puede esconder como sobreviviente conocido. Y si quieres que el sobreviviente tumbe la corrida, `MUTANT_LAB_STRICT=1` lo hace fallar.

### Bloque 5 · Verde no es "el software está bien"

**[09:07] → E15**

La suite toda verde no quiere decir que el software esté bien. Solo quiere decir que tus pruebas no encontraron nada. El reporte de Restful Booker lo muestra: 43 pasan, y la recomendación de release es no salir a producción con XML, precios decimales o fechas sin validar, porque RB-002, RB-003 y RB-004 corrompen datos de negocio en silencio.

El verde te dice que no hay regresiones nuevas. Los fallos esperados te dicen qué sigue roto. Necesitas las dos cosas para decidir.

En spendwise lo hice de otra forma, y te la muestro porque también es honesta. Ahí la suite no marca los defectos como esperados: las pruebas fallan, porque conservan lo que dice la regla. Pero cada fallo queda amarrado a su defecto. El archivo `full-run.json` de la corrida del 17 de octubre dice: 274 pruebas, 184 pasan, 90 fallan. Y tiene un mapa que se llama `failedByDefect`: para cada defecto, las pruebas que lo demuestran. Y una lista `unmapped`, de fallos sin defecto asignado, que está vacía.

Las dos estrategias sirven. Lo que no sirve es un rojo que nadie sabe explicar, ni un verde que esconde lo que sabes que está roto.

## 4. Laboratorio paso a paso

**[10:25] → E16**

Vamos al laboratorio. Con Restful Booker arriba en Docker, en restful-booker-quality-suite corres `npm run test:defects`. Ese script es `playwright test --project=api --grep @known-defect`. Reproduce cada defecto confirmado.

Mira cómo están repartidos. En `known-defects.spec.ts` están RB-002, RB-003, RB-004, RB-005 para PUT y para PATCH, RB-006 y RB-008. RB-001 y RB-007 viven en `contracts-negative.spec.ts`, también con `test.fail`. Nueve chequeos para ocho defectos, porque RB-005 tiene dos. En ese mismo bloque hay una prueba positiva: fechas válidas de año bisiesto, del 29 de febrero de 2028 al 1 de marzo, completan el ciclo de la reserva. Esa sí tiene que pasar.

**[11:04] → E17**

Un detalle fino que te va a servir. RB-008 dice que credenciales inválidas devuelven 200 y deberían devolver 401. Está marcado con `test.fail`. Pero en el project de contratos hay otra prueba, "failed authentication matches the error contract", que hoy espera status 200 y valida la forma del cuerpo de error. ¿Qué pasa el día que arreglen RB-008? Dos avisos: el `test.fail` se convierte en pase inesperado, y la prueba de contrato se pone roja porque ya no llega 200. Las dos te obligan a mirar. Cuando cierres el defecto, actualizas las dos y dejas escrito por qué.

**[11:43] → E18**

Ahora el truco de la etiqueta en vivo. Abre war-paradigm, experimento 02, y corre `npm run test:mutants`. El README documenta el marcador: cinco mutantes KILLED y dos KNOWN SURVIVOR: self-grant, aceptado con HTTP 200, y viewer-create, aceptado con HTTP 201, un hueco que encontré preparando este curso. La corrida queda verde y los dos sobrevivientes se imprimen en rojo.

Ahora arréglalo en tu copia. En `app/server.js`, la regla `editMember` permite que un miembro se edite a sí mismo, y eso incluye su rol. Cámbiala para que solo los admins puedan cambiar roles: `editMember: (actor) => actor.role === 'admin'`. Corre otra vez `npm run test:mutants`. Según el README, ahora el mutante recibe 403, el marcador muestra `FIXED self-grant` y el JSON incluye el rol observado del miembro. Lo corrí: seis de siete muertos, y viewer-create queda como el único sobreviviente conocido. El último paso es tuyo: quitar el campo `known` del escenario, porque el hallazgo se cerró.

**[12:45] → E19**

Y la parte de documentación. En el vault, el defecto DEF-001 tiene estado Open, la regla que rompe, los pasos, esperado 403 y real 200, la causa raíz y la evidencia. Y dice: el mutante self-grant se queda en la suite como hallazgo conocido hasta que llegue el arreglo. Eso es exactamente un `@IGNORE` bien hecho: ticket abierto, condición de salida y la cobertura sigue ahí.

**[13:11] → E20**

El último paso del laboratorio es documentar tu propio dataset. Toma la nota de usuarios de war-paradigm como modelo y escribe una para tu suite. Lo mínimo que yo le pondría: de dónde salen los datos y cómo se siembran; quién es el dueño; dónde están las credenciales, que nunca van en el repo; los estados especiales, como registros dados de baja o tokens vencidos, con lo que devuelve el sistema en cada caso; la cardinalidad que cubre, cero, uno y muchos; y qué no se puede tocar porque otros equipos lo usan.

Una nota así se lee en dos minutos y te ahorra un día de falsos rojos. Y si un dato no está en la nota, no te lo inventes: en el vault hay una regla de oro que dice justo eso. Si falta algo, dilo y crea una tarea; no llenes el hueco con una suposición.

## 5. Mutación WAR de la semana

**[14:11] → E21**

Un known issue marcado es un mutante sobreviviente con nombre. Esta semana lo compruebas: toma uno de tus defectos conocidos, arréglalo en una copia, y verifica que la marca te avisa. Si tu marca es un `test.fail`, debes ver el pase inesperado. Si es un `@IGNORE`, debes tener escrita la condición que te dice cuándo quitarlo y comprobar que, quitándolo, el escenario pasa.

Si arreglas el defecto y nada suena, tu marca estaba escondiendo, no documentando.

## 6. El reto y cómo se evalúa

**[14:41] → E22**

El entregable: una suite con el protocolo de ciclos aplicado y un known issue marcado con `@IGNORE` y documentado. En Playwright, con `test.fail` y su ID.

Los criterios. Uno: el defecto conocido está marcado, y el día que se arregla la prueba se pone en rojo; lo demuestras arreglándolo en una copia. Dos: el ticket sigue abierto y la condición para quitar la marca está escrita. Tres: la regresión final corre una sola vez, al cierre, y tu registro de ciclos lo muestra.

Y el nivel más alto: clasificas dos observaciones raras como defecto o como punto a aclarar, con argumento. Como el `/ping` que responde 201 en Restful Booker: el repo lo dejó como punto a aclarar, no como defecto, porque puede ser una decisión del producto.

## 7. Mini-quiz

**[15:32] → E23**

Tres preguntas. Pausa si quieres.

Primera. Fallaron 7 de 120 en el ciclo 1. Llega el arreglo. ¿Qué corres en el ciclo 2? A, los 120 otra vez. B, solo los 7 que fallaron, y la regresión completa una vez al final. C, los 7 más un smoke completo diario. D, nada hasta que confirmen el arreglo en QA.

**[16:04] → E24**

Es la B. Itera estrecho, confirma amplio.

Segunda. Un registro dado de baja devuelve 204 con cuerpo vacío y tu prueba lo marca como fallo. ¿Qué es? Un estado especial del dataset que debe estar documentado. La prueba debe contemplarlo.

Tercera. ¿Qué acompaña siempre a un `@IGNORE` válido? Un comentario con el ticket, que queda abierto, una condición explícita para quitarlo, y la historia de usuario no cierra.

## 8. Cierre

**[16:38] → E25**

Tres ideas. Una: retest de lo que falló en cada vuelta, regresión completa una vez al cierre. Dos: sin datos documentados, con dueño y caveats, no hay ciclo. Tres: un defecto conocido se marca con su ID y su condición de salida, y la marca te tiene que avisar el día que lo arreglen.

En el módulo 8 pasamos a reportes y trazabilidad: evidencia que se puede firmar, y cómo conectar cada prueba con su requisito.

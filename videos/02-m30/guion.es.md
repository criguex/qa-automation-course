# Guion · Módulo 02 · WAR Paradigm — probar al que prueba, mutar la realidad

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Ritmo de referencia: 150 palabras por minuto. Las marcas de tiempo se calcularon con ese ritmo y las pausas del quiz.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m30) y `quiz-01-10.json` (m30). Laboratorio: `war-paradigm` (experimentos 01, 02 y 03) y `scientific-qa-evidence` (pista física, opcional).

## 1. Gancho

[00:00] → E01
Login, crear, aprobar, publicar. Todas las pruebas del camino feliz en verde. Y mientras tanto, un editor podía mandar una sola petición, cambiarse su propio rol a admin y recibir un 200. Desde ese momento podía aprobar y publicar solo. Ninguna prueba verde lo vio. Lo vio un mutante: una copia del flujo con una sola cosa rota a propósito. Hoy te enseño a construir esos mutantes, y a no esconder el que sobrevive.

[00:30] → E02
Soy Cristian Guerra, hago QA desde Medellín, y este es el módulo dos del curso: WAR Paradigm, probar al que prueba y mutar la realidad.

## 2. Explicado para un niño de 8 años

[00:40] → E03
Las pruebas son guardias. Su trabajo es gritar cuando algo está mal. Ahora, piensa en un guardia que lleva meses sin gritar. Puede ser el mejor guardia del mundo, o puede estar dormido. Desde afuera se ven exactamente igual.

¿Cómo sabes cuál es? Escondes algo roto a propósito, algo que tú sabes que está mal, y miras. Si el guardia grita, sirve. Si se queda callado, encontraste el problema. Y ojo, que el problema puede ser el guardia o puede ser lo que estaba cuidando. Eso es todo WAR: romper a propósito y mirar al guardia. El nombre viene de mi apellido, Guerra. Es una guerra contra los bugs, empezando por los que se esconden dentro de las propias pruebas.

## 3. Teoría

[01:28] → E04
La idea cabe en una frase del README: no probamos el software, probamos al que prueba. Una suite de Playwright es un guardia. Un oráculo numérico es un guardia. Un verificador de pruebas formales es un guardia. Un juez de IA que califica la salida de otro modelo también es un guardia. Y todos tienen el mismo problema: que estén en verde no te dice si están despiertos.

La única forma de saberlo es construir un mundo donde sabes qué está mal, porque lo rompiste tú, y ver si lo notan. Eso es todo. Lo demás es disciplina para hacerlo bien.

[02:08] → E05
La disciplina son cuatro pasos. Uno, generar: construyes la realidad base y confirmas que el guardia la acepta. Dos, mutar: cambias exactamente una regla, a propósito. Tres, auditar: pasas el mundo roto frente al guardia. Cuatro, validar: lees el veredicto.

Te lo muestro en dos mundos muy distintos. En física: generas una refracción de Snell con los índices reales. Mutas: intercambias los dos índices de refracción. Auditas con un oráculo independiente, que no comparte código con la simulación, y con una tolerancia congelada de diez a la menos seis. Validas: KILLED, el oráculo lo rechaza.

En un flujo de negocio: generas el flujo dorado, login, crear, aprobar, publicar. Mutas: un usuario de solo lectura intenta aprobar. Auditas con verificaciones de Playwright contra la API. Validas: KILLED, la app responde 403.

Mismo método, dos mundos. Por eso no es una técnica de una herramienta, es una forma de pensar.

[03:07] → E06
Cada ronda reporta tres veredictos, siempre, nunca escondidos. PASS: la línea base, sin mutar, se comporta como dice la especificación. Eso te prueba que el guardia no da falsas alarmas. KILLED: el guardia atrapó la mutación; la prueba tiene dientes. SURVIVED: el guardia no la vio. Y aquí viene lo importante: un SURVIVED puede ser dos cosas. Puede ser un bug real del sistema, o puede ser un punto ciego del guardia. Tu trabajo es decir cuál de las dos, con evidencia. Y en los dos casos, queda visible hasta que alguien lo arregle.

[03:45] → E07
Ahora los cuatro experimentos donde esto ya corre. Empiezo por la pista física, que vive en mi repo scientific-qa-evidence. Nueve modelos numéricos sintéticos: circuito RC, enfriamiento de Newton, cinética química de segundo orden, Beer-Lambert, respuesta logística, Snell, lente delgada, interfaz acústica y Fechner. Contrato y tolerancia congelados antes de correr nada. Ochenta y cuatro variantes pareadas. Resultado: 27 PASS, 54 KILLED y 3 SURVIVED. Esos 54 KILLED son casos, no comportamientos: dos mutantes acústicos dan la misma salida, así que son 51 comportamientos distintos. Y la clasificación fue idéntica en macOS arm64 y en Linux x86_64.

¿Y los tres SURVIVED? Son la mutación RC deliberadamente diminuta. Se dejó visible a propósito. Nadie bajó la tolerancia para matarla. Eso es lo que quiero que aprendas a hacer.

[04:35] → E08
Segundo: romper un paso de un flujo. Es el experimento 02 de war-paradigm. Una app pequeña, un flujo dorado y siete mutantes sobre él. Cada mutante cambia un paso: un rol que no debe aprobar, un campo obligatorio que falta, publicar antes de aprobar, un token vencido, un título de 81 caracteres, un usuario que se sube el rol y un usuario de solo lectura que crea un borrador. Y algo que me importa mucho: los mutantes son datos, no scripts. Viven en `tests/scenarios.ts`, uno por línea, con el paso que cambian y el código que esperan: 403 para el rol cambiado y para el lector que crea, 422 para el campo faltante y para el título largo, 409 para publicar fuera de orden y 401 para el token vencido. Una sola prueba recorre la lista. Agregar un mutante es agregar una línea.

Resultado: cinco mueren. Dos sobreviven: `self-grant` y `viewer-create`. El segundo lo encontré preparando este curso: la tabla de roles dice que un usuario de solo lectura recibe 403 al crear un borrador, y la app responde 201 porque `POST /api/docs` nunca revisa el rol. El WAR Paradigm encontró un hueco en su propia app de ejemplo.

Y no es un punto ciego. Es un bug real. El endpoint que cambia roles reutiliza la regla de "los miembros pueden editar su propio perfil": si eres admin, o si el miembro eres tú, pasas. Entonces un editor puede ponerse admin a sí mismo. Todas las pruebas del camino feliz estaban en verde mientras esto seguía abierto. El hallazgo queda en la suite marcado como conocido, impreso en rojo en cada corrida, hasta que alguien arregle la regla.

Y hay otro detalle que separa un experimento serio de uno de juguete: no todo lo que falla cuenta como mutante. Si el reinicio, el login o la línea base fallan, eso no es un SURVIVED ni un KILLED. Queda como INVALID_BASELINE, INCONCLUSIVE o INFRA_ERROR, visible pero fuera del puntaje. Así nadie puede esconder un problema de infraestructura detrás de un sobreviviente conocido, ni inflar el marcador con fallas que no tienen que ver con la mutación.

[06:57] → E09
Tercero: romper una respuesta de IA. Es el experimento 01, el que viste en el módulo uno. Dos oráculos. Q1 es determinista: esquema, roles, códigos, en `src/checks.ts`. Q2 puntúa contra criterios de aceptación, en `src/criteria.ts` y `src/scorer.ts`. Un `must` que falla bloquea, los `should` suman, y el gate es 70.

Aquí el guardia es el juez. En el set sin pins, la corrida 3 saca 76, más que el gate, y sale rechazada porque fallan AC-1, dos escenarios sin fuente, y AC-3, un editor que aprueba con 200. La misma entrada dio aprobado, aprobado, rechazado: UNSTABLE. Con pins, es decir modelo con versión, temperatura cero y versión de prompt, las tres corridas dan 86, 84 y 87: STABLE. El puntaje se puede mover. El veredicto no.

[07:48] → E10
Cuarto: romper una barrera. Experimento 03. El guardia es un hook `PreToolUse` de Claude Code: antes de que el asistente ejecute un comando de Bash, el hook lee la llamada y, si es un `git push` a `main` o `master`, sale con código 2 y lo bloquea.

¿Por qué en un hook y no en el prompt? Porque un prompt se puede ignorar. Un hook que sale con exit 2 bloquea siempre. Las reglas duras viven en hooks, no en prompts.

Pero un hook también es un guardia, y también se prueba al estilo WAR. Su suite, `tests/hook.test.mjs`, intenta colarse: comandos encadenados, refspecs como `HEAD:main`, `git -C` con otra carpeta, el `git push` a secas estando en main, y todo eso con los tres parsers del hook: jq, node y sed. Y atacarlo sirvió. Una mutación encontró dos agujeros reales, `git -c` y `git --no-pager`, que se arreglaron en el commit `1b01c66`.

[08:48] → E11
Ese hilo sigue por todo el curso. Un juez LLM que tiene que reprobar "Medellín" cuando la respuesta correcta es "Bogotá", en qa-eval-lab. Quince defectos sembrados en trazas de agentes, en agent-eval-jev. Seis fallos sembrados para el triaje de CI. Seis regresiones en veinte commits para el selector de pruebas. PII y headers sembrados para el auditor de civica. Y predictores saboteados para el depurador físico. Siempre la misma pregunta: ¿el guardia lo nota?

Para que tus mutaciones sirvan, cuatro reglas. Una: cambia una sola cosa, para saber qué atrapó el guardia; con dos cambios, un KILLED puede esconder que el guardia no ve uno de ellos. Dos: escribe la predicción antes de correr. Tres: corre la línea base primero. Cuatro: si sobrevive, no ajustes el mutante ni la tolerancia para que muera. Se publica tal cual.

Y lo que WAR no dice. Un kill rate alto solo prueba que el guardia atrapa las mutaciones que se te ocurrieron a ti. El catálogo tiene los sesgos de quien lo escribió. Por eso los mejores mutantes los siembra otra persona, y eso lo vas a ver en las pruebas a ciegas del nivel cuatro.

## 4. Laboratorio

[10:06] → E12
A la terminal. `git clone https://github.com/criguex/war-paradigm.git && cd war-paradigm`, luego `npm ci` y `npx playwright install --with-deps chromium`. Necesitas Node 20 o superior y git. Con `npm test` corres los tres experimentos.

Mira el marcador del experimento 02. Role-swap, KILLED, se observó el 403 esperado. Drop-input, KILLED con 422. Reorder, KILLED con 409. Stale-token, KILLED con 401. Boundary, KILLED con 422. Self-grant: KNOWN SURVIVOR, la mutación se aceptó con HTTP 200. Y viewer-create: KNOWN SURVIVOR, aceptada con HTTP 201. Cinco de siete atrapados, dos sobreviven, cero excluidos del puntaje. Y fíjate que la corrida no se pone roja por los sobrevivientes conocidos: queda en verde, pero los imprime en rojo. Si quieres que un sobreviviente real tumbe el pipeline, existe `npm run test:strict`.

Además, cada escenario deja evidencia en `test-results/mutant-evidence.json`: el id, el código esperado y el observado, la revisión de git y hashes SHA-256 de la app, los escenarios, el runner, la prueba y el lockfile. Si alguien te pregunta mañana con qué versión salió ese veredicto, la respuesta está en el archivo, no en tu memoria.

Y si quieres matar al sobreviviente tú mismo, el README te dice cómo: en `app/server.js` cambias la regla para que solo un admin pueda cambiar roles, corres otra vez y el marcador cambia. Lo probé en una copia: self-grant pasa a FIXED, con el 403 esperado, y el marcador queda en seis de siete atrapados, porque viewer-create sigue abierto. Después le quitas el campo `known` al mutante, porque el hallazgo ya está cerrado.

[11:46] → E13
Ahora el hook. `npm run test:03` corre los casos del hook y del vault: en mi corrida, 45 pruebas, 45 pasan. Seis de ellas fijan límites conocidos: formas de colar un push que el hook todavía deja pasar, como `sh -c` o la rama en una variable. Un hook con regex es una barrera contra errores, no un sandbox. `npm run demo:03` te lo muestra contra seis comandos. `git push origin main`: bloqueado, exit 2. `git push --force origin HEAD:main`: bloqueado. `npm test && git push origin master`: bloqueado. Push a una rama de feature: permitido. Y `git pull origin main`: permitido, porque traer de main no es empujar a main.

El reto aquí es tuyo. Desde la carpeta del experimento, le pasas al hook el JSON que mandaría Claude Code: `echo '{"tool_input":{"command":"git push origin main"}}' | ./hooks/block-push-to-main.sh; echo $?`. En mi corrida imprime el mensaje de bloqueo y el código 2. Tu trabajo es cambiar ese comando hasta encontrar uno que pase, o hasta convencerte de que no lo hay.

[12:53] → E14
Y la pista física, que es opcional y necesita Python 3. Clonas scientific-qa-evidence, entras a `evidence/numerical/source` y corres `python3 -m unittest test_runner`. En mi máquina: siete pruebas, OK, en menos de un segundo. Una de esas siete vuelve a correr la campaña completa y verifica que salgan 27 PASS, 54 KILLED y 3 SURVIVED, y que cada caso coincida con lo guardado de la corrida en macOS.

## 5. Mutación WAR de la semana

[13:20] → E15
La mutación de esta semana es la que pide el curso: hacer que el agente del experimento 01 entregue un escenario donde un editor aprueba con 200. En tu fork, abres `experiments/01-ai-verdict/fixtures/runs/pinned/run-2.json`, buscas el escenario S-2, "aprobar un borrador como approver", y cambias una sola cosa: el `actor`, de `approver` a `editor`. El 200 esperado lo dejas igual.

¿Por qué esa y no otra? Porque es justo el error que encontramos en la app real con self-grant: un editor que termina aprobando. Si el juez de IA no ve ese error en un plan de pruebas, el plan va a cubrir exactamente lo que no importa. Y cambio solo el actor para que, si algo grita, sepa qué lo hizo gritar.

Predicción, escrita y commiteada antes de correr: AC-3, el contrato de roles, debería atraparlo. La corrida dos debería pasar a rechazada aunque el puntaje no cambie, y el set fijado debería dejar de ser STABLE.

[14:22] → E16
Corro `npm run demo:pinned -w experiments/01-ai-verdict`. AC-3: failed. "S-2: editor → approve expects 200, matrix says forbidden → 403". Puntaje 84, el mismo de antes. Veredicto: REJECTED, must failed: AC-3. Y el set: UNSTABLE, el veredicto cambió de aprobado a rechazado en la corrida dos y de vuelta a aprobado en la tres.

Luego `npm run test:01`: tres pruebas fallan. La de estabilidad del set fijado, la del scorer que espera que las corridas fijadas sean aprobadas y la del generador por comando. Veinticuatro pasan. AC-3 gritó y la suite también. Veredicto de mi tabla: KILLED. Restauro el archivo y todo vuelve a verde.

## 6. El reto y cómo se evalúa

[15:03] → E17
Tu entregable es una tabla WAR de la semana: por cada mutación, qué rompiste, qué predijiste, qué guardia lo vio y el veredicto. Y un fork de war-paradigm con la mutación de 01 y, si encontraste un hueco en el hook, el caso nuevo.

Criterios. Uno: la tabla tiene, por cada mutación, una sola cosa rota, la predicción en un commit anterior a la corrida, el guardia y el veredicto PASS, KILLED o SURVIVED. Dos: al menos tres mutaciones, una respuesta de IA, un comando contra el hook y una de tu propio trabajo. Tres: el intento contra el hook trae el JSON de entrada y el exit code. Si encontraste uno que pasa, agregas el caso a `tests/hook.test.mjs`, que falla antes del arreglo y pasa después. Cuatro: ningún SURVIVED se borró ni se ajustó.

La rúbrica tiene cuatro filas. Una mutación, una predicción: en nivel tres, una sola cosa y la predicción en un commit anterior. Veredictos: PASS de la línea base, KILLED y SURVIVED en cada mutación. Guardias distintos: juez de IA, hook y uno propio. Honestidad del reporte: el que sobrevive queda visible, con causa y siguiente paso. Apruebas con las cuatro filas al menos en nivel tres y el quiz, seis de ocho.

## 7. Mini-quiz

[16:26] → E18
Tres preguntas. Pausa si quieres.

Primera. En WAR, ¿qué significa PASS? A: que la mutación pasó sin ser vista. B: que la línea base sin mutar se comporta como dice la especificación, así que el guardia no da falsas alarmas. C: que el kill rate es cien por ciento. D: que el CI está verde.
[pausa 5 s]
La B. PASS habla de la realidad base. Lo que el guardia atrapa es KILLED y lo que se le escapa es SURVIVED.

[17:02] → E19
Segunda. El mutante self-grant sobrevive en el experimento 02. ¿Qué tipo de hallazgo es? A: punto ciego de la suite, falta una prueba. B: bug real del sistema, la app deja que un usuario se suba a admin. C: error de infraestructura. D: no es un hallazgo.
[pausa 5 s]
La B. Lo que está mal es la regla `editMember` de la app, y el README lo reporta como bug real de autorización.

[17:35] → E20
Tercera. Un mutante numérico muy pequeño sobrevive con la tolerancia congelada en diez a la menos seis. ¿Qué haces? A: lo reportas como SURVIVED y lo dejas visible, sin tocar la tolerancia. B: bajas la tolerancia para matarlo. C: lo borras del catálogo. D: lo cuentas como KILLED.
[pausa 5 s]
La A. Mover la tolerancia después de ver el resultado es ajustar al resultado.

## 8. Cierre

[18:05] → E21
Tres ideas. Una: un guardia que nunca grita puede estar dormido, y la única forma de saberlo es romper algo a propósito. Dos: cuatro pasos, generar, mutar, auditar y validar, con una sola cosa rota y la predicción escrita antes. Tres: PASS, KILLED y SURVIVED se reportan siempre, y el que sobrevive se publica tal cual, diciendo si es bug o punto ciego.

Desde hoy, cada módulo cierra con una mutación. El siguiente es diseño de pruebas y técnicas, y vas a ver que cada técnica es una fábrica de mutantes. Los enlaces están en la descripción.

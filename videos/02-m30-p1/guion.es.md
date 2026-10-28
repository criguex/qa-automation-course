# Guion · Módulo 02 · Parte 1 · ¿Qué es un mutante? — WAR Paradigm

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Marcas de tiempo medidas con la voz WbPw2BEKJmkwDvOBt9Z9 (elevenlabs, eleven_multilingual_v2); `retime.py` las corrige con la voz.
> Primera de dos partes del módulo 02 (fuente completa: `02-m30/`). La parte 2, «Manos a la obra», está en `02-m30-p2/`.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m30). Laboratorio: `war-paradigm` (experimentos 01, 02 y 03) y `scientific-qa-evidence` (pista física).

## 1. Gancho

[00:00] → E01
Una app de documentos. Login, crear, aprobar, publicar. Todas las pruebas en verde. Y mientras tanto, un editor podía cambiarse su propio rol a admin, y la app le respondía 200: todo bien. Ninguna prueba verde lo vio. Lo vio un mutante. Mira la pantalla: self-grant, KNOWN SURVIVOR. Un mutante que sobrevivió. Hoy te explico desde cero qué es un mutante, y por qué ese sobreviviente es la mejor noticia del día.

[00:33] → E02
Soy Cristian Guerra, hago QA desde Medellín. Este es el módulo dos, parte uno: ¿qué es un mutante?

## 1b. Contexto: el laboratorio de este módulo

[00:42] → E03
Antes de seguir, te pongo en contexto. Todo pasa en un laboratorio real, que puedes clonar: war-paradigm, mi repositorio público, con tres experimentos. El del principio es una app pequeña de documentos que se llama DocFlow. Tiene cuatro roles: el viewer solo mira, el editor escribe borradores, el approver los aprueba y el admin puede todo. El camino normal se llama flujo dorado: login, crear, aprobar y publicar. Y las pruebas que vigilan ese camino son los guardias.

Vas a oír cinco códigos que responde la app. 200 o 201: todo salió bien. 401: tu sesión venció. 403: no tienes permiso. 409: hiciste los pasos en desorden, por ejemplo publicar antes de aprobar. Y 422: mandaste un dato mal hecho, como un título demasiado largo.

Al final de esta parte vas a saber tres cosas: qué es un mutante, los cuatro pasos para fabricarlo y los tres veredictos que se reportan siempre.

## 2. Explicado para un niño de 8 años

[01:48] → E04
Ahora, explicado como para un niño. Las pruebas son guardias. Su trabajo es gritar cuando algo está mal. Piensa en un guardia que lleva meses sin gritar. Puede ser el mejor guardia del mundo. O puede estar dormido. Desde afuera se ven igualitos.

¿Cómo sabes cuál es? Escondes algo roto a propósito, algo que tú sabes que está mal, y miras. Si el guardia grita, está despierto: sirve. Si se queda callado, encontraste un problema. Ojo: el problema puede ser el guardia, o lo que estaba cuidando. Eso es WAR: romper a propósito y mirar al guardia. El nombre viene de mi apellido, Guerra: una guerra contra los bugs, empezando por los que se esconden dentro de las propias pruebas.

[02:34] → E05
¿Y qué es, exactamente, un mutante? Piensa en un simulacro de incendio en el colegio. Nadie quema el colegio. Alguien prende una máquina de humo, a propósito, y todos miran si la alarma suena.

Un mutante es eso: una copia de la realidad con una sola cosa rota a propósito. Una sola. Mira un mutante real de la app. Lo normal: el approver aprueba un borrador y la app responde 200. El mutante cambia solo quién lo hace: ahora aprueba el viewer. Lo que debería salir es 403, sin permiso. Y lo que sale es 403. La alarma sonó.

Cuando alguna prueba nota el cambio y avisa, decimos que el mutante murió: en inglés, KILLED. Si todas siguen en verde, el mutante sobrevivió: SURVIVED. Hubo humo y nadie se enteró. Resumen: un mutante es un error de mentiras, puesto por ti, para ver si tus pruebas lo cazan.

## 3. Teoría

[03:35] → E06
Ahora la idea grande, que cabe en una frase de mi README: no probamos el software, probamos al que prueba. ¿Y quién prueba? Cualquier guardia. Una suite de Playwright, que repite los clics de un usuario. Un oráculo numérico: el que decide si un número está bien, como la hoja de respuestas del módulo uno. Un verificador de pruebas formales, que revisa demostraciones. Y un juez de IA, que califica lo que escribió otro modelo. Todos tienen el mismo problema: que estén en verde no te dice si están despiertos. La única forma de saberlo es romper tú algo, para saber qué está mal, y ver si lo notan. En resumen: verde no quiere decir despierto.

[04:21] → E07
¿Cómo se hace bien? Con cuatro pasos, y te los cuento con el simulacro. Uno, generar: construyes la realidad normal y confirmas que el guardia la acepta. Es el colegio sin humo: la alarma no debe sonar. Dos, mutar: cambias exactamente una regla, a propósito. Prendes el humo. Tres, auditar: pones el mundo roto frente al guardia. La alarma escucha. Cuatro, validar: lees el veredicto. ¿Sonó o no sonó? Generar, mutar, auditar, validar. Siempre en ese orden.

[04:59] → E08
Lo bonito es que sirve en mundos muy distintos. Primero, la física. Cuando metes un lápiz en un vaso con agua, el lápiz parece quebrado: la luz se dobla al cambiar de material. Eso lo describe la ley de Snell, y cada material tiene su número, su índice de refracción.

Generas la refracción con los índices reales. Mutas: intercambias los dos índices. Auditas con un oráculo independiente, que no comparte código con la simulación, y con una tolerancia congelada de diez a la menos seis: una millonésima. Validas: KILLED.

Segundo, un flujo de negocio. Generas el flujo dorado. Mutas: un usuario de solo lectura intenta aprobar. Auditas con Playwright contra la API. Validas: KILLED, la app responde 403. Mismo método, dos mundos.

[05:54] → E09
Cada ronda reporta tres veredictos. Siempre. PASS: la línea base, el mundo sin mutar, se porta como dice la especificación. Es el simulacro sin humo: la alarma no suena de gratis. Eso prueba que el guardia no da falsas alarmas. KILLED: el guardia atrapó la mutación. La prueba tiene dientes. SURVIVED: el guardia no la vio.

Y aquí viene lo importante. Un SURVIVED puede ser dos cosas. Un bug real del sistema, o un punto ciego del guardia: algo que la prueba no sabe mirar. Tu trabajo es decir cuál de las dos, con evidencia. En los dos casos queda visible hasta que alguien lo arregle. Resumen: tres palabras, y ninguna se esconde.

[06:42] → E10
¿Esto ya corre en algún lado? Sí, en cuatro experimentos. Empiezo por la física, en mi repo scientific-qa-evidence. Nueve modelos numéricos sintéticos, es decir, de mentiras: un circuito, algo que se enfría, la luz que se dobla y seis más. 84 variantes. Resultado: 27 PASS, 54 KILLED y 3 SURVIVED. Ojo con un detalle: dos mutantes acústicos dan la misma salida, así que esos 54 son 51 comportamientos distintos. Y la clasificación salió idéntica en macOS y en Linux.

¿Y los 3 SURVIVED? Son una mutación del circuito, a propósito diminuta. Se dejó visible. Nadie bajó la tolerancia para matarla. Eso es lo que quiero que aprendas.

[07:30] → E11
Segundo experimento: romper un paso de un flujo. Es DocFlow, la app del principio. Siete mutantes. Cada uno cambia un solo paso y dice qué código espera. Role-swap: un viewer intenta aprobar, espera 403. Drop-input: crear sin dueño, espera 422. Reorder: publicar antes de aprobar, 409. Stale-token: aprobar con la sesión vencida, 401. Boundary: un título de 81 letras, 422. Self-grant: un editor se sube a admin, espera 403. Viewer-create: un viewer crea un borrador, espera 403.

Y algo que me importa mucho: los mutantes son datos, no scripts. Viven en un archivo, uno por línea. Agregar un mutante es agregar una línea. Resultado: cinco mueren. Dos sobreviven.

[08:22] → E12
¿Por qué sobrevive self-grant? Mira la regla de la app. Dice: puedes cambiar el rol de alguien si eres admin, o si ese alguien eres tú. Es la regla de «cada quien edita su propio perfil». Pero el rol también es parte del perfil. Entonces el editor se cambia a sí mismo a admin, y la app le dice 200. Desde ahí puede aprobar y publicar solo. Es como si en el colegio cada estudiante pudiera escribir su propia nota en el boletín.

Y no es un punto ciego. Es un bug real. El otro sobreviviente, viewer-create, lo encontré preparando este curso: un viewer crea un borrador y la app responde 201, porque nunca revisa el rol. Los dos quedan en la suite marcados como conocidos, impresos en rojo en cada corrida, hasta que alguien los arregle.

[09:14] → E13
Tercer experimento: romper una respuesta de IA. Es el del módulo uno. Un agente escribe un plan de pruebas, y un juez lo califica de 0 a 100. Para aprobar necesita 70, y además pasar unos criterios obligatorios. Aquí el guardia es el juez.

Le pedimos lo mismo tres veces al agente, sin pins. Sin pins quiere decir sin fijar nada: modelo sin versión, temperatura uno y el prompt más reciente. Salió 83 aprobado, 74 aprobado y 76 rechazado: dos escenarios sin fuente y un editor que aprueba con 200. Misma entrada, veredictos distintos: UNSTABLE, inestable.

Con pins, es decir, modelo con versión, temperatura cero y prompt con versión, salió 86, 84 y 87. Los tres aprobados: STABLE. Es como hornear con la misma receta, el mismo horno y la misma temperatura. El puntaje se puede mover un poquito. El veredicto no.

[10:18] → E14
Cuarto experimento: romper una barrera. Claude Code es un asistente que puede ejecutar comandos en tu computador. Hay uno peligroso: git push a main, que sube cambios directo a la rama principal. ¿Cómo lo prohíbes? Podrías escribirlo en el prompt: «por favor, no hagas push a main». Eso es un letrero en la puerta, y un letrero se puede ignorar. O puedes poner un hook: un programa que revisa cada comando antes de que corra. Eso es un portero. Si el comando es un push a main, el hook sale con código 2 y lo bloquea. Siempre.

Pero el portero también es un guardia, y también se prueba. Su suite intenta colarse de muchas formas. Y atacarlo sirvió: una mutación encontró dos agujeros reales, git -c y git --no-pager, que se arreglaron en el commit 1b01c66. Resumen: las reglas duras viven en hooks, no en prompts.

[11:18] → E15
¿Cómo haces una buena mutación? Cuatro reglas. Una: cambia una sola cosa. Si cambias dos y el guardia grita, no sabes cuál de las dos vio. Dos: escribe la predicción antes de correr: qué crees que va a pasar, por escrito. Tres: corre la línea base primero, el mundo sin romper. Cuatro: si el mutante sobrevive, no lo ajustes ni muevas la tolerancia para que muera. Se publica tal cual.

Y lo que WAR no dice. Un kill rate alto, el porcentaje de mutantes que mueren, solo prueba que el guardia atrapa las mutaciones que se te ocurrieron a ti. Tu lista tiene tus sesgos. Por eso los mejores mutantes los siembra otra persona.

## 4. Resumen

[12:04] → E16
Tres ideas para llevarte. Una: un guardia que nunca grita puede estar dormido, y un mutante es una sola cosa rota a propósito para despertarlo. Dos: cuatro pasos, generar, mutar, auditar y validar. Tres: PASS, KILLED y SURVIVED se reportan siempre, y el que sobrevive se publica tal cual. En la parte dos nos ensuciamos las manos: clonas el laboratorio, lees el marcador, atacas al portero y haces tu primera mutación.

Si este video te sirvió, suscríbete y activa la campanita para que no te pierdas la parte dos. Y si te quedó alguna duda, déjala en los comentarios: las leo todas y te respondo. Un abrazo grande desde Medellín. ¡Nos vemos en la próxima!

# Guion · Módulo 02 · Parte 2 · Manos a la obra — WAR Paradigm

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Marcas de tiempo medidas con la voz WbPw2BEKJmkwDvOBt9Z9 (elevenlabs, eleven_multilingual_v2) y las pausas del quiz; `retime.py` las corrige con la voz.
> Segunda de dos partes del módulo 02 (fuente completa: `02-m30/`). La parte 1, «¿Qué es un mutante?», está en `02-m30-p1/`.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m30) y `quiz-01-10.json` (m30). Salidas reales en `render/salidas/`, reproducibles con `capturas.sh`.

## 1. Título y repaso

[00:00] → E01
Soy Cristian Guerra, hago QA desde Medellín. Este es el módulo dos, parte dos: manos a la obra.

[00:10] → E02
Repaso rápido de la parte uno. Un mutante es una copia de la realidad con una sola cosa rota a propósito, como el humo del simulacro. Se fabrica en cuatro pasos: generar, mutar, auditar y validar. Y cada ronda da tres veredictos: PASS, la realidad normal pasa; KILLED, el guardia atrapó al mutante; SURVIVED, se le escapó. Y si sobrevive, no se esconde: se publica. Hoy lo haces tú, en la terminal.

## 2. Laboratorio

[00:42] → E03
A la terminal. Clonas war-paradigm y entras a la carpeta. Luego npm ci, que instala las dependencias, y npx playwright install, que baja el navegador. Necesitas Node 20 o superior y git. Con npm test corres los tres experimentos.

Mira el marcador del experimento dos. Role-swap: KILLED, se vio el 403 que se esperaba. Drop-input: KILLED con 422. Reorder: KILLED con 409. Stale-token: KILLED con 401. Boundary: KILLED con 422. Self-grant: KNOWN SURVIVOR, sobreviviente conocido; la app aceptó con 200. Y viewer-create: KNOWN SURVIVOR, aceptada con 201. Cinco de siete atrapados.

[01:31] → E04
¿Cómo se lee ese marcador? En tres partes. Primero, lo que cuenta para el puntaje: KILLED y SURVIVED. Cinco atrapados de siete. Segundo, lo que no cuenta: si el reinicio, el login o la línea base fallan, eso no es culpa del mutante. Queda como INVALID_BASELINE, INCONCLUSIVE o INFRA_ERROR, visible pero fuera del puntaje. Hoy son cero. Tercero, fíjate en algo raro: la corrida queda en verde aunque hay dos sobrevivientes. Es a propósito: son conocidos, y se imprimen en rojo. Si quieres que un sobreviviente tumbe el pipeline, existe npm run test:strict.

Además, cada escenario deja evidencia en un archivo JSON: el código esperado y el observado, la versión de git y huellas SHA-256 de los archivos. Una huella es un número que cambia si cambia una sola letra del archivo. Si mañana te preguntan con qué versión salió ese veredicto, la respuesta está en el archivo, no en tu memoria.

[02:41] → E05
Y si quieres matar al sobreviviente tú mismo, el README te dice cómo. Abres app/server.js y cambias la regla para que solo un admin pueda cambiar roles. Antes de correr, escribo la predicción: self-grant pasa a FIXED, con el 403 esperado, y el marcador queda en seis de siete, porque viewer-create sigue abierto.

[03:06] → E06
Corro otra vez el experimento dos. Self-grant: FIXED, se observó el 403 esperado. Seis de siete atrapados, uno sobrevive. Viewer-create sigue ahí, en rojo, porque ese hueco nadie lo ha cerrado. La predicción se cumplió. Después le quitas el campo known al mutante, porque el hallazgo ya está cerrado. Yo devolví el archivo a como estaba.

[03:33] → E07
Ahora el portero: el hook del experimento tres. npm run test:03 corre sus pruebas: 45 pruebas, 45 pasan. Seis de ellas fijan límites conocidos: formas de colar un push que el hook todavía deja pasar, como sh -c o la rama escondida en una variable. Un hook con expresiones regulares es una barrera contra errores, no una caja fuerte.

npm run demo:03 lo pone contra seis comandos. git push origin main: bloqueado, exit 2. Con force a HEAD:main: bloqueado. npm test y luego push a master: bloqueado. Push a una rama de feature: permitido. Y git pull origin main: permitido, porque traer de main no es empujar a main.

[04:25] → E08
El reto aquí es tuyo. Entras a la carpeta del experimento y guardas en una variable el mismo JSON que mandaría Claude Code. Se lo pasas al hook con echo y una tubería, y echo de pesos interrogación imprime el código de salida. En mi corrida sale el mensaje de bloqueo y el código 2: bloqueado. Tu trabajo es cambiar ese comando hasta encontrar uno que pase, o hasta convencerte de que no lo hay. Si lo encuentras, ya tienes tu mutante, con su JSON y su exit code.

[05:00] → E09
Y la pista física, que es opcional y necesita Python 3. Clonas scientific-qa-evidence, entras a la carpeta del código numérico y corres python3 -m unittest test_runner. En mi máquina: siete pruebas, OK, en menos de un segundo. Una de esas siete vuelve a correr la campaña completa de la parte uno, y verifica que salgan 27 PASS, 54 KILLED y 3 SURVIVED, igualito a lo guardado.

## 3. Mutación WAR de la semana

[05:32] → E10
Ahora la mutación de la semana. La pide el curso: hacer que el agente del experimento uno entregue un escenario donde un editor aprueba con 200. ¿Por qué esa? Porque es justo el error de self-grant: un editor que termina aprobando.

Vuelve la profe del módulo uno. La tarea es el plan del agente, la corrida dos con pins, ya con mi cambio. La hoja de respuestas es la historia US-42, con su matriz de permisos. S-1: un editor crea, espera 201. La matriz dice 201. Bien. S-2: ahora es un editor el que aprueba, y el plan sigue esperando 200. Pero la matriz dice 403. Mal. S-3: un viewer aprueba, espera 403. Bien. S-5: publicar sin aprobar, 409. Bien. S-6: un viewer publica, 403. Bien. Si el oráculo funciona, tiene que saltar en S-2.

[06:28] → E11
En tu fork abres el archivo de la corrida dos, buscas S-2 y cambias una sola cosa: el actor, de approver a editor. El 200 esperado lo dejas igual. Antes de correr, escribes la predicción y la subes en un commit. La mía: AC-3, el criterio de roles, lo atrapa. La corrida dos pasa a REJECTED aunque el puntaje no cambie. Y el set fijado deja de ser STABLE. Cambio solo el actor para que, si algo grita, sepa qué lo hizo gritar.

[07:02] → E12
Corro npm run demo:pinned. AC-3: failed. S-2: un editor aprueba y espera 200, pero la matriz dice 403. Puntaje 84, el mismo de antes. Veredicto: REJECTED. Y el set: UNSTABLE. El veredicto cambió de aprobado a rechazado en la corrida dos, y volvió a aprobado en la tres.

Luego npm run test:01: tres pruebas fallan, 24 pasan. AC-3 gritó y la suite también. Veredicto de mi tabla: KILLED. Restauro el archivo y vuelven a pasar las 27.

## 4. El reto y cómo se evalúa

[07:40] → E13
Tu entregable es una tabla WAR de la semana. Una fila por mutación: qué rompiste, qué predijiste, qué guardia lo vio y el veredicto. Mira la fila de hoy. Rompí el actor de S-2. Predije que AC-3 lo atrapaba. El guardia fue el juez de IA. Veredicto: KILLED. Y además, un fork de war-paradigm con esa mutación.

Necesitas al menos tres mutaciones: una respuesta de IA, un comando contra el hook y una de tu propio trabajo. El intento contra el hook trae el JSON de entrada y el exit code. Si encontraste uno que pasa, lo agregas a las pruebas del hook: falla antes del arreglo y pasa después. Y ningún SURVIVED se borra ni se ajusta.

[08:28] → E14
La rúbrica tiene cuatro filas, y cada una tiene cuatro niveles. Una mutación, una predicción: en nivel tres, una sola cosa rota y la predicción en un commit anterior. Veredictos: PASS de la línea base, KILLED y SURVIVED en cada mutación. Guardias distintos: juez de IA, hook y uno propio. Honestidad del reporte: el que sobrevive queda visible, con causa y siguiente paso. Apruebas con las cuatro filas al menos en nivel tres, y el quiz con seis de ocho.

## 5. Mini-quiz

[09:03] → E15
Tres preguntas. Pausa si quieres.

Primera. En WAR, ¿qué significa PASS? A: que la mutación pasó sin ser vista. B: que la línea base sin mutar se comporta como dice la especificación. C: que el kill rate es cien por ciento. D: que el CI está verde.
[pausa 5 s]
La B. PASS habla de la realidad normal: el guardia no da falsas alarmas. Lo que el guardia atrapa es KILLED, y lo que se le escapa es SURVIVED.

[09:42] → E16
Segunda. El mutante self-grant sobrevive en el experimento dos. ¿Qué tipo de hallazgo es? A: punto ciego de la suite, falta una prueba. B: bug real del sistema, la app deja que un usuario se suba a admin. C: error de infraestructura. D: no es un hallazgo.
[pausa 5 s]
La B. Lo que está mal es la regla de la app, y el README lo reporta como bug real de autorización.

[10:19] → E17
Tercera. Un mutante numérico muy pequeño sobrevive con la tolerancia congelada en una millonésima. ¿Qué haces? A: lo reportas como SURVIVED y lo dejas visible, sin tocar la tolerancia. B: bajas la tolerancia para matarlo. C: lo borras del catálogo. D: lo cuentas como KILLED.
[pausa 5 s]
La A. Mover la tolerancia después de ver el resultado es ajustar al resultado.

## 6. Cierre

[10:53] → E18
Tres ideas. Una: un guardia que nunca grita puede estar dormido, y la única forma de saberlo es romper algo a propósito. Dos: una sola cosa rota, y la predicción escrita antes de correr. Tres: PASS, KILLED y SURVIVED se reportan siempre, y el que sobrevive se publica tal cual, diciendo si es bug o punto ciego.

Desde hoy, cada módulo cierra con una mutación. El siguiente es diseño de pruebas y técnicas, y vas a ver que cada técnica es una fábrica de mutantes. Los enlaces están en la descripción.

Si te gustó, suscríbete y activa la campanita para que no te pierdas el próximo módulo. ¿Te quedó alguna duda con tu mutante? Déjala en los comentarios: las leo todas y te respondo. Un abrazo grande desde Medellín. ¡Nos vemos en el próximo video!

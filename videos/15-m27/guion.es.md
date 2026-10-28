# Guion ES · Módulo 15 · m27 — Contenedores efímeros y entornos desechables

_Palabras de narración: 2444 · duración estimada 16:18 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña. Las líneas que empiezan con `>` son notas de producción y no se narran.

## [00:00] → E01 · Gancho

Le pedí a un asistente de IA que recalculara, desde cero, las cuatro rondas de mi depurador de un predictor de física. Corría en un ejecutor efímero, una máquina que nace, trabaja y desaparece. Y desapareció. Con ella se fueron los 81 arrays de resultados de una primera corrida.

Esto es lo que quedó escrito en el paquete del release, tal cual: "Original previous-run 81 arrays disappeared with ephemeral executor." Los arrays se perdieron. Pero las huellas y los hashes que se habían guardado afuera sobrevivieron, y gracias a eso pude comparar.

Este módulo es sobre eso: que la evidencia sobreviva al entorno donde nació.

## [00:42] → E02 · Título

Módulo quince: contenedores efímeros y entornos desechables. Vamos a ver qué se pierde cuando muere un runner o un contenedor, cuatro diseños para que la evidencia salga a tiempo, y el caso real del release repro-ia-20261026 de predictor-debugger, con sus recibos.

## [00:58] → E03 · Explicado para un niño de 8 años

¿Has hecho un castillo de arena en la playa? Te queda hermoso, con torres y todo. Pero sube la marea y se lo lleva. Al otro día no hay nada.

Ahora imagina que antes de que suba la marea le tomas una foto y anotas en una libreta cómo lo hiciste: cuántos baldes de arena, qué molde usaste, en qué orden. Al otro día ya no tienes el castillo, pero puedes demostrar que existió, y puedes volver a armarlo igualito.

Los computadores de las pruebas son como esa playa. La foto es el artefacto. La libreta son las entradas fijadas.

Y un truco más: si construyes en pedacitos y le tomas foto a cada torre apenas la terminas, cuando llegue la ola solo pierdes la torre que estabas haciendo. Las demás ya están guardadas. Eso es un checkpoint.

## [01:54] → E04 · Teoría 1: qué es efímero

Hay más cosas efímeras de las que crees. Un runner hospedado de GitHub Actions: cada job arranca en una máquina limpia que se descarta al terminar. Un contenedor Docker: su capa escribible muere con él. Un devcontainer: el entorno de desarrollo declarado en punto devcontainer barra devcontainer punto json, que se reconstruye igual cada vez. Testcontainers: bases de datos y servicios que nacen y mueren con la prueba. Y los previews por PR: un despliegue por PR que se borra cuando lo cierras.

Todos tienen la misma propiedad. Lo que vive solo adentro, se va con ellos.

## [02:32] → E05 · Código: un SUT efímero de verdad

Mira el workflow de restful-booker-quality-suite. Clona el sistema bajo prueba en el commit 0046115. Lo levanta con docker compose up guion guion build. Espera al endpoint ping, hasta treinta intentos. Y si algo falla, vuelca los logs del contenedor con if failure.

Cuando termina el job, el SUT muere con el runner. Por eso los logs se imprimen antes, en el mismo job. Si quisieras investigar un fallo una hora después, no habría contenedor al cual entrar. Solo queda lo que se imprimió en el log y lo que se subió como artefacto.

## [03:10] → E06 · Teoría 2: qué se pierde y qué sobrevive

Hagamos el inventario. Cuando muere el entorno, se pierde el estado en disco, los archivos que no subiste, la caché, los procesos que estaban corriendo y la identidad de esos procesos: el PID, la sesión.

Ese último punto parece raro, pero vas a ver que en el caso real fue el más delicado.

¿Qué sobrevive? Lo que sacaste: artefactos, assets de un release, commits. Y lo que puedes recalcular desde entradas fijadas. Esas son las dos únicas salidas. O lo sacas, o lo puedes volver a fabricar igual.

## [03:45] → E07 · Teoría 3: diseño 1, artefactos y recibos

Primer diseño: artefactos y recibos. Sube todo lo que necesitas para decidir con actions/upload-artifact y la condición de no cancelado, para que suba también cuando algo falla. Y súbelo con su SHA256SUMS, para que quien lo baje pueda comprobar que es lo mismo que salió del runner.

¿Y qué es un recibo? Es lo mínimo para que otra persona confíe en un resultado sin haber estado ahí: el comando que corriste, los hashes de entrada y de salida, y el exit code. Con eso, si el entorno muere, tienes cómo comparar una corrida nueva contra la vieja.

En el paquete del caso real, la carpeta receipts tiene archivos con nombres que se explican solos: fresh-environment.json para el entorno, source-integrity.json para el código fuente, downloads.jsonl para lo que se bajó y un SHA256SUMS. Eso es un recibo en la práctica.

## [04:40] → E08 · Código: diseño 2, entradas fijadas

Segundo diseño: fijar las entradas. Si no fijaste algo, no lo vas a poder repetir.

Lockfiles: npm ci en Node, y en predictor-debugger, uv run guion guion locked. Versión de la herramienta: en los workflows de predictor-debugger, astral-sh/setup-uv con version 0.11.18, fija, no la última. Commit del sistema bajo prueba: el 0046115 de restful-booker. Imágenes por digest, con arroba sha256, y no por tag, porque un tag se puede mover mañana a otra imagen. Y los datos verificados contra SHA256SUMS y un manifiesto: eso hace tools/fetch_data.py antes de extraer cualquier cosa.

## [05:17] → E09 · Teoría 4: diseño 3, checkpoints idempotentes con lock

Tercer diseño, para corridas largas que se pueden cortar: checkpoints idempotentes con lock.

Tres reglas. Primera: cada tarea escribe su resultado de forma atómica. Primero en un archivo temporal y después lo renombras con mv. Si el proceso muere a mitad, no queda un checkpoint a medio escribir con el nombre bueno: o está completo o no está.

Segunda: junto al resultado guardas su hash. Al retomar, la tarea cuyo hash verifica se salta. Que el archivo exista no basta, porque puede estar truncado o ser viejo.

Tercera: un flock impide que dos procesos hagan la misma tarea al mismo tiempo.

Y un ojo grande: los checkpoints que viven en el disco del runner mueren con el runner. Si quieres retomar en otra máquina, tienen que salir antes.

## [06:08] → E10 · Código: diseño 4, verificar en un entorno limpio

Cuarto diseño: verificar en un entorno limpio. Ese es el reproduce.yml de predictor-debugger. Corre en un ubuntu-24.04 nuevo, baja data-v1, verifica los hashes, recalcula y exige con grep guion q que los veredictos sean iguales y que la huella sea la misma.

Lo bonito de este diseño es dónde vive: en el repo, no en ninguna máquina. Así sobrevive a cualquier ejecutor. En el clon que revisé cubre las rondas uno y dos. En su primera corrida, según el README, la ronda uno tardó seis minutos y treinta y tres segundos con la descarga incluida, y dio la huella EEC9-09E0-F77D.

## [06:48] → E11 · Terminal: el caso real, las notas del release

Ahora sí, el caso real. gh release view repro-ia-20261026 guion R criguex barra predictor-debugger.

Las notas dicen: recálculo completo de las rondas uno a cuatro desde data-v1, sobre el commit b918c62, sin reentrenar ni volver a inferir las redes. Y una frase que quiero que leas despacio: "Lo ejecutó un asistente de IA bajo mi dirección. No es una revisión independiente."

La tabla trae las cuatro huellas: EEC9-09E0-F77D, D506-F58F-3838, 6319-537B-7167 y 681D-143B-64A3. Las cuatro iguales al original. Linux x86_64, Python 3.12.14, NumPy 1.26.4, un solo hilo, 96.870 registros y unas siete horas y media de cálculo.

Y las limitaciones, que el paquete declara: los datos de una primera corrida se perdieron; los 81 archivos de la ronda uno se regeneraron y ninguno es idéntico bit a bit al publicado, difieren como máximo en 8,9 por diez a la menos dieciséis; y la ronda cuatro se interrumpió y se retomó desde puntos de control. Hay una tercera: un chequeo suplementario falló al serializar su salida, por un tipo numpy.bool_. Se arregló solo la salida y repitió catorce de catorce. Y contra el Mac, WAR y GUERRA, las estadísticas difieren como máximo en seis por diez a la menos catorce.

Eso es lo que me gusta de este release: no esconde nada. Te dice qué salió igual y qué no.

## [08:15] → E12 · Terminal: bajar y verificar antes de abrir

Antes de abrir un paquete, lo verificas. Carpeta vacía, gh release download, y después shasum guion a 256 guion c contra el archivo punto sha256 que viene al lado.

Lo corrí hoy y la salida fue una sola línea: el nombre del zip, dos puntos, OK. Recién ahí lo descomprimí. Adentro hay 441 archivos: logs, comandos, entorno, recibos y resultados.

Fíjate en el orden. Si verificas después de abrir, ya ejecutaste o leíste algo que no sabías de dónde venía.

## [08:47] → E13 · Código: lo que dicen los recibos

Tres archivos del paquete. results_scope.txt dice que los 81 arrays de la corrida previa desaparecieron con el ejecutor efímero, y que los hashes y estadísticas durables previos se recuperaron. Y algo clave: la generación nueva queda identificada explícitamente como NEW RUN, no como recuperación de los arrays viejos. El mismo archivo fija el alcance: sin entrenar modelos, sin inferencia nueva, sin tocar nada público y sin disparar CI. Y la regla de comparación: identidad estricta de bits y veredictos sin cambios, con las diferencias numéricas como dato descriptivo, sin relajar ninguna tolerancia.

receipts barra lock-hardening.json: un flock global serializa la tarea científica y el resumen, y el SHA y las filas de cada tarea se revisan bajo el lock para retomar de forma idempotente. Y confiesa un detalle: la tarea cero de la ronda cuatro arrancó con el envoltorio viejo, sin lock; desde la tarea uno, todas corren bajo el lock. Además deja una advertencia escrita: no inferir que un proceso murió solo porque no aparece en otro espacio de nombres de procesos.

Y receipts barra interruption.json. Cuando se perdió la sesión con el proceso que corría la ronda cuatro, quedaban seis tareas verificadas, la cero, uno, dos, tres, cuatro y veinticuatro, y 600 filas. El lock aparecía libre. Y el recibo dice: libre, pero "not sufficient alone to prove old driver absent". La política fue no relanzar nada mientras la identidad del proceso viejo fuera incierta.

Mira el error que lo empezó todo: el transporte con el servidor de ejecución se desconectó, y al reintentar, la respuesta fue "Unknown process id". El sistema de archivos seguía accesible, pero la identidad del arranque anterior no se había registrado. La recuperación se hizo con autorización explícita, sobre el mismo inodo del lock, con recibos atómicos y la verificación de hash y filas bajo el lock. Y el recibo termina con una frase honesta: la salida del proceso original sigue siendo desconocida.

## [10:55] → E14 · Teoría 5: cuatro lecciones

De ese caso saco cuatro lecciones.

Uno: lo que vivía solo en el ejecutor se perdió, y los hashes y estadísticas guardados afuera fueron lo que permitió comparar.

Dos: regenerar no es recuperar. Si vuelves a fabricar un resultado, lo declaras como corrida nueva. Bit idéntico y veredicto idéntico son cosas distintas, y hay que decir cuál tienes.

Tres: un lock libre no prueba que el proceso viejo murió. Puede seguir vivo donde no lo ves y escribir sobre tu checkpoint.

Cuatro: la huella igual es la evidencia que sobrevive a todo lo demás.

Y un detalle honesto: el release no menciona CI. El recálculo en un runner limpio es otro camino, el de reproduce.yml. Y como no es revisión independiente, el siguiente paso es que otra persona corra reproduce.yml o el paquete.

## [11:48] → E15 · Terminal: la huella barata

Para tu máquina hay una comprobación barata. Clonas predictor-debugger y corres uv run guion guion locked verify.py guion guion saved mac. Reaplica los umbrales a las estadísticas guardadas y recalcula la huella, sin bajar datos. Debe imprimir fingerprint EEC9-09E0-F77D.

En pantalla te muestro el log guardado de esa misma comprobación en Linux, el que está en logs barra linux barra verify_saved.log. Cinco hipótesis en PASS, "verdicts equal to saved results/linux/verdicts.json: True" y la huella EEC9-09E0-F77D. La misma que en el Mac, en WAR y en GUERRA.

## [12:23] → E16 · Laboratorio paso a paso

Tu turno. Paso uno: lee el release con gh release view. Paso dos: bájalo en una carpeta vacía y verifícalo antes de abrirlo. Paso tres: lee results_scope, interruption y lock-hardening, y llena una tabla de tres columnas: qué se perdió, qué se regeneró como corrida nueva y qué sobrevivió, con el archivo que lo dice.

Paso cuatro: comprueba la huella barata en tu máquina.

Paso cinco: escribe tu propia corrida con checkpoints. En Linux o en el runner de CI, porque macOS no trae flock. Abres el lock con exec 9 y flock guion n 9. Por cada tarea, si sha256sum guion c sobre su recibo pasa, la saltas. Si no, calculas en un temporal, haces mv al nombre bueno y guardas su sha256. Al final, un SHA256SUMS de todo y la huella con los primeros doce caracteres de su hash.

Paso seis: el workflow. ubuntu-24.04, instalación con lockfile, la corrida, la huella en el log y en el job summary, y upload-artifact con out y SHA256SUMS, también cuando falla.

## [13:31] → E17 · Mutación WAR de la semana

La mutación de esta semana es matar el entorno a propósito. Antes, escribe qué se va a perder.

Opción uno: mata el contenedor a mitad de la corrida con docker kill, o en CI con gh run cancel, y relanza. Opción dos: borra la caché con gh cache delete guion guion all y relanza.

Lo que tiene que pasar: la huella es la misma, la corrida retomada salta las tareas ya verificadas y nunca corren dos procesos a la vez. Si la huella cambia, si se repite una tarea verificada o si dos procesos entran al mismo tiempo, es un hallazgo. Lo anotas con su log.

## [14:13] → E18 · El reto y cómo se evalúa

El entregable tiene cuatro piezas: el workflow en un runner limpio con artefacto, SHA256SUMS y huella; el script con checkpoints bajo flock; la evidencia de la corrida matada y relanzada con la misma huella; y la tabla de lo perdido y lo sobreviviente en repro-ia-20261026.

Los criterios: matas la corrida, la relanzas y la huella es la misma, con los dos enlaces. Con la caché borrada, la huella sigue igual. En local, con out montado como volumen, haces docker kill a mitad, retomas y el log muestra que salta lo verificado, y un segundo proceso con flock guion n sale con error mientras el primero corre.

En la rúbrica, el nivel más alto en "qué sobrevive" es que un tercero baje tu artefacto y verifique la huella sin tu ayuda.

## [15:05] → E19 · Mini-quiz

Tres preguntas. Pausa si quieres.

Primera: termina un job en un runner hospedado. ¿Qué queda? Lo que subiste como artefacto, lo que publicaste en un release y lo que commiteaste. Nada más.

Segunda: se cae la sesión y el lock global aparece libre. ¿Puedes relanzar sin más? No. En repro-ia-20261026 el lock libre se juzgó insuficiente para probar que el proceso viejo había muerto, y no se relanzó nada mientras su identidad fuera incierta.

Tercera: los 81 archivos de la ronda uno se regeneraron y difieren del publicado en 8,9 por diez a la menos dieciséis como máximo. ¿Qué son? Una corrida nueva, declarada como tal. Ninguno es idéntico bit a bit, y la huella y los veredictos sí coinciden.

## [15:53] → E20 · Cierre

Tres ideas. Uno: lo que no sacaste antes de que muera el entorno, se perdió. Dos: lo que no fijaste, no lo vas a poder repetir. Tres: regenerar no es recuperar, y un lock libre no prueba que el proceso murió.

En el siguiente módulo cambiamos de tema: rendimiento y nube, con k6, percentiles y presupuestos de tiempo. Nos vemos allá.

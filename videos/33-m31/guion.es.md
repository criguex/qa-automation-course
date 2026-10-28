# Guion · 33 · m31 · Prueba a ciegas con compromiso por hash

Voz en off: Cristian, primera persona · español de Colombia, tuteo · ~150 palabras/min · 2479 palabras de narración · duración estimada 16:47 (incluye pausas del quiz)

Cada bloque lleva su marca de tiempo y la escena que lo acompaña (→ E##). Los tiempos de `escenas.json` siguen este guion.

## Gancho

[00:00] → E01

Durante cuatro rondas probé mi depurador físico con trampas que inventé yo mismo. Yo diseñaba la trampa, yo escribía el chequeo, y el chequeo la atrapaba. Suena bien, pero tiene un techo: sin querer, uno diseña trampas que su propio chequeo sabe atrapar. Hoy preparé veinte pares en una ronda a ciegas en miniatura. Ocho correctos, aceptados. Ocho trampas, detectadas. Y cuatro trampas escaparon. ¿Y cómo sabes tú que no acomodé las etiquetas después de ver los veredictos, para que la tabla se viera mejor o peor? Esa es la pregunta de este módulo.

[00:38] → E02

La respuesta es un sobre sellado. Antes de entregar nada, quien prepara las trampas publica el hash de sus etiquetas. Mira lo que pasa si yo, después, cambio una sola etiqueta de trampa a correcto y trato de revelar. El script responde: el hash no coincide, y sale con uno. Una palabra cambiada y el sello se rompe. Hoy vas a aprender a diseñar una prueba a ciegas que aguante eso: ids aleatorios, proporción secreta, etiquetas con sal, hash comprometido antes de entregar, y la regla de decisión congelada antes de abrir.

## Explicado para un niño de 8 años

[01:14] → E03

Si tuvieras ocho años: antes de que tu amigo revise las cajas, escribes en un papel cuáles tienen trampa y lo guardas en un sobre sellado. Tu amigo revisa caja por caja y dice cuáles cree que tienen trampa. Al final abren el sobre delante de todos, y todos ven que no cambiaste nada. Si hubieras abierto el sobre a escondidas para cambiar el papel, el sello estaría roto. Y hay un detalle más: tu amigo también tiene que anotar antes cómo va a decidir, para no cambiar sus reglas cuando vea las cajas.

## Teoría · el problema

[01:52] → E04

Empecemos por el problema. Si quien construye el chequeo conoce las trampas, puede afinarlo a ellas sin darse cuenta. No hace falta mala fe: basta con que tu cabeza ya sepa qué buscar. Por eso en la ronda 5 de predictor-debugger las trampas las prepara otra persona. El kit define qué es correcto: la salida exacta del solver, en float64 o redondeada a float32. Y trampa es cualquier otra cosa, de cualquier tipo y tamaño: energía de más o de menos, fluido que se comprime, fase corrida, ruido, una red entrenada. Y una regla que me gusta mucho: se vale leer el código del depurador y apuntar justo debajo de sus umbrales.

## Teoría · el compromiso por hash

[02:37] → E05

La herramienta es un compromiso por hash. Quien prepara las trampas calcula shasum guion a 256 sobre su etiquetas punto json y manda solo ese hash, antes de entregar nada más. El hash es como la huella digital del archivo: sesenta y cuatro caracteres que salen del contenido exacto. Con el hash no puedes reconstruir el archivo, pero el archivo sí reproduce el hash. Al final, quien preparó las trampas revela el archivo y cualquiera recalcula el hash. Si coincide, las etiquetas son las mismas que estaban comprometidas. Si cambió una sola letra, el hash entero cambia y no coincide. Eso es lo que viste en el gancho.

## Teoría · la sal

[03:20] → E06

Pero un hash solo no basta. Si el formato del archivo es conocido y las opciones son pocas, alguien puede probar etiquetados posibles, calcular el hash de cada uno y compararlo con el publicado hasta dar con el que coincide. Para eso está la sal. etiquetas punto json lleva un campo sal con treinta y dos caracteres hexadecimales aleatorios. Con eso, el espacio de archivos posibles es tan grande que probar ya no sirve, y el hash compromete sin revelar nada. En el kit, la sal va arriba del archivo, y debajo, por cada par: su etiqueta, correcto o trampa, un tipo en texto libre y la magnitud.

## Teoría · hora pública e ids

[04:03] → E07

Dos detalles más. El primero es la hora. El hash se sube al repo en round5 barra compromisos, un archivo por participante, y GitHub le pone la hora antes de que lleguen los pares. El mensaje original con el hash sirve de respaldo, y si quieres, lo publicas además en un issue. El segundo: que nada filtre la etiqueta. Al menos cien pares, cada uno en su archivo, con un id aleatorio de secrets punto token hex cuatro, sin relación con la etiqueta ni con el orden. La proporción de correctos y trampas es libre y secreta. Y la entrega va con su lista de hashes, pares punto sha256, para que nadie cambie un par después.

## Teoría · el que prueba también se compromete

[04:50] → E08

Y el compromiso es de los dos lados. Quien corre el depurador también se ata las manos. Antes de abrir los pares, prerregistra y sube con hora su regla de decisión y los umbrales congelados. Después corre y publica los veredictos. Solo entonces recibe etiquetas punto json. ¿Por qué? Porque si yo veo las etiquetas y después ajusto un umbral, la prueba deja de ser ciega aunque las etiquetas no hayan cambiado. El orden se puede comprobar en git log: compromiso de A, regla congelada de B, veredictos de B y revelación. Ese orden es uno de los criterios del reto.

## Teoría · qué se reporta

[05:30] → E09

¿Qué se reporta al final? Tres cosas. Falsas alarmas sobre los pares correctos, y lo esperado es cero. Trampas detectadas, por tipo y por tamaño. Y las que no vio. El depurador tiene un piso de detección medido en la ronda 3, y el kit lo dice sin rodeos: lo que quede por debajo se reporta como no detectado, no se esconde. Esto es importante porque la tentación es quitar las trampas pequeñas diciendo que eran injustas. No. Si estaban dentro de la definición de trampa, cuentan. Y si quieres un depurador con un piso más bajo, lo diseñas en una ronda nueva, con umbrales nuevos prerregistrados.

## Teoría · comprometer una semilla

[06:13] → E10

Hay otra forma de hacerlo: comprometer una semilla en vez de las etiquetas. En el benchmark de fallos a ciegas de scientific-qa-evidence, yo generé la semilla con openssl rand guion hex dieciséis en mi máquina, fuera de la sesión del asistente de IA, y publiqué solo su SHA-256. La semilla decide qué copias reciben qué fallos. Regla dos: quien corre los chequeos no lee la semilla ni la clave hasta registrar todos los resultados. Y el repo admite algo incómodo: el asistente tenía acceso al disco, así que esa regla descansa en el compromiso; el hash publicado hace detectable cualquier cambio. Regla cuatro: si la semilla se pierde o se edita, el experimento se anula.

## Teoría · ciego no es perfecto

[06:59] → E11

Y una advertencia que vale oro: ciego no quiere decir perfecto. En ese benchmark, la línea base marcó tres de veintiún casos y el protocolo quince de veintiuno. Se veía muy bien. Después vinieron cuatro rondas de revisión, y encontraron diecisiete problemas en el propio experimento: un fallo mal etiquetado, un costo que no se midió, un evaluador que aceptaba evidencia incompleta. La versión uno se conservó tal cual, con fe de erratas; el evaluador se corrigió en una versión dos, y el resultado se presenta como un benchmark de regresión, no como una tasa de detección en el mundo real. Hasta el cero falsas alarmas de la v1 se retiró.

## Laboratorio

[07:43] → E12

Vamos al laboratorio. Paso uno: verificar un compromiso real. Clono scientific-qa-evidence, entro a la carpeta del benchmark de fallos a ciegas y corro shasum guion a 256 sobre la semilla revelada. Sale seis a b nueve f ocho dos cinco, y así hasta cinco d. Ahora abro SEED_COMMITMENT punto md, que se publicó antes de asignar ningún fallo, y comparo. Es el mismo. El archivo cubre la semilla exactamente como se generó: treinta y dos caracteres hexadecimales y un salto de línea. Si alguien hubiera editado la semilla, aunque fuera para quitar ese salto de línea, el hash sería otro.

[08:23] → E13

Paso dos: reproducir la asignación desde la semilla revelada. Es la receta de RESULTS punto md. Creo una carpeta aparte, copio solo los dos scripts, protocol lib y assign, y corro assign punto py con la semilla. Me dice que el hash de la semilla es el comprometido y que generó veintiún casos. Luego comparo con diff la clave que acabo de generar contra key punto json publicada, y la carpeta de casos contra la publicada. Sale identical. Eso quiere decir que la clave y los veintiún casos salen byte a byte de esa semilla. Nadie puede haber cambiado la asignación después sin que se note.

[09:06] → E14

Paso tres: una ronda 5 en miniatura, en la raíz de predictor-debugger. La persona A usa preparar punto py, que viene en el módulo. Arma veinte pares con cinco tipos: correctos en float64, correctos redondeados a float32, y tres trampas: energía por uno coma cero cinco, energía por uno coma cero cero cero uno, y ruido de diez a la menos tres. Fíjate en tres líneas. La sal, con secrets punto token hex dieciséis, que da treinta y dos caracteres. El id de cada par, con token hex cuatro, aleatorio. Y la magnitud: la norma de la diferencia con el exacto sobre la norma del exacto, que es cero para los correctos.

[09:50] → E15

Corro preparar en una carpeta que se llama ronda. Tarda unos segundos. Saco el hash de etiquetas punto json y lo guardo en compromiso punto txt: cuatro e f seis b ocho nueve cuatro, y sigue. En la vida real, A commitea y publica solo ese archivo, entrega la carpeta de pares, y etiquetas punto json se queda en su máquina. Mira los nombres de los pares: cero b dos b nueve ocho nueve e, uno dos siete uno ocho f cuatro cero. No dicen nada. No puedes saber por el nombre ni por el orden cuál es trampa. Veinte archivos, y el revisor no sabe ni cuántas trampas hay.

[10:34] → E16

Paso cuatro: la persona B revisa a ciegas, con los chequeos D1, D2 y D3 de la ronda 1 y los umbrales congelados de thresholds punto json. Antes de correr, B commitea el hash de su script y de los umbrales. Ese es su compromiso. Fíjate en el hash de thresholds: siete siete b f d c a cero. Es el mismo que publica RESULTS punto md de la ronda 1, así que son los umbrales de siempre, sin tocar. Corro revisar sobre la carpeta de pares y guardo veredictos punto json. B commitea sus veredictos antes de recibir nada más. Ojo: este es el depurador de la ronda 1, no el de la ronda 5.

[11:21] → E17

Paso cinco: la revelación. A entrega etiquetas punto json, y B corre revelar punto py. Primero comprueba que el hash coincide con el compromiso. Coincide, así que arma la tabla. Los ocho correctos, en float64 y en float32, aceptados bien: cero falsas alarmas. Las trampas de energía por uno coma cero cinco, detectadas, por D2 y D3. El ruido, detectado, y aquí hay un detalle bonito: solo lo marcó D1, porque el ruido rompe la incompresibilidad. Y las cuatro de energía por uno coma cero cero cero uno escaparon. Su magnitud es diez a la menos cuatro, por debajo del piso. Se reportan como escapadas. No se borran.

## Mutación WAR de la semana

[12:04] → E18

La mutación de la semana ataca el compromiso. Después de publicar el hash, cambio una sola etiqueta de trampa a correcto y corro revelar. El hash no coincide, exit uno. Restauro el archivo y ahora cambio solo la sal, sin tocar ninguna etiqueta. También falla, con otro hash, exit uno. ¿Por qué importa el segundo caso? Porque demuestra que la sal es parte de lo comprometido: nadie puede cambiarla después para jugar con el hash. Al final restauro y compruebo con shasum guion c: OK. Si tu verificación de la revelación pasara en cualquiera de los dos casos, el sobre no estaba sellado.

## El reto y cómo se evalúa

[12:45] → E19

El reto es una prueba a ciegas en parejas. Eliges una de dos opciones: los pares del paso tres, o veinte mutantes del golden flow de war-paradigm, declarados como datos en tests barra scenarios punto ts. La persona A prepara las trampas con ids aleatorios y proporción secreta, escribe etiquetas punto json con sal y publica solo el hash. La persona B congela su regla, corre y publica los veredictos. A revela, B verifica con shasum y publica la tabla de falsas alarmas, detectadas y escapadas, por tipo y magnitud. Entregas todo con su orden en git log.

[13:24] → E20

Los criterios. git log muestra el orden: compromiso de A, regla congelada de B, veredictos y revelación. shasum de etiquetas punto json coincide con el hash comprometido. Tu revelar sale con uno con un archivo al que le cambiaste una sola palabra, y lo muestras con su exit code. Los ids son aleatorios y su orden no se relaciona con la etiqueta. La tabla final tiene falsas alarmas, detectadas y escapadas por tipo, y ninguna fila se quitó. Y el reporte dice qué no prueba: por ejemplo, que A y B se conocen, o que los umbrales son los de la ronda 1. El nivel cuatro: incluyes a propósito una trampa pensada para quedar justo debajo de un umbral, y la reportas como escapada si así fue.

## Mini-quiz

[14:15] → E21 · pausa 5 s

Mini-quiz. Pausa si quieres. Primera: ¿para qué lleva etiquetas punto json un campo sal de treinta y dos caracteres hexadecimales aleatorios? A, para que el archivo pese más. B, para que nadie pueda adivinar las etiquetas probando etiquetados posibles hasta dar con el hash publicado. C, para firmar el archivo. D, para ordenar los pares. Es la B. Con sal, el hash compromete sin revelar.

[14:46] → E22 · pausa 5 s

Segunda: los ids de los pares son cero cero cero uno, cero cero cero dos, y así, y las trampas van primero. ¿Qué problema hay? A, ninguno. B, el orden filtra la etiqueta; el kit pide ids aleatorios sin relación con la etiqueta ni con el orden. C, que los ids son muy cortos. D, que faltan ceros. La B. Si el revisor puede inferir la etiqueta por el nombre, ya no es ciega.

[15:21] → E23 · pausa 5 s

Tercera: una trampa de energía por uno coma cero cero cero uno queda por debajo del piso de detección y el depurador no la marca. ¿Qué se reporta? A, se quita del conjunto porque era demasiado pequeña. B, se reporta como no detectada, con su tipo y magnitud. C, se bajan los umbrales y se vuelve a correr. D, se cuenta como acierto. Es la B, y la viste en la tabla. Bajar el umbral después de ver las etiquetas rompería el ciego.

## Cierre

[15:59] → E24

Tres ideas. Primera: sella antes de entregar. El hash con sal de las etiquetas, o de la semilla, se publica con hora antes de que el revisor vea nada. Segunda: el compromiso es de los dos lados. El que prueba congela su regla y sus umbrales antes de abrir, porque mover un umbral después también rompe el ciego. Tercera: reporta lo que escapa, por tipo y magnitud, y di qué no prueba tu experimento. Y recuerda que ciego no es perfecto: también se revisa, y los errores se dejan visibles con su fe de erratas. Lo que sigue es el capstone, la Auditoría WAR, donde juntas todo esto en un paquete que otra persona reproduce en una máquina limpia.

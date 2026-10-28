# Guion ES · Módulo 28 · m19 — Prerregistro y reproducibilidad

_Palabras de narración: 2512 · duración estimada 16:45 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña.

## [00:00] → E01 · Gancho

Escribí una apuesta antes de tener los datos: la llamé H14. Si fallaba, la iba a publicar igual. Falló. Le faltaron sesenta y cinco milésimas. El criterio pedía cero punto siete y una de las cuatro redes sacó cero punto seis tres cinco. Habría sido facilísimo bajar el umbral a cero punto seis y poner un chulo verde. No toqué nada. Y hoy, si corres mi verificador, te imprime H14 FAIL y sale con código cero. En este video vas a entender por qué eso está bien, y por qué un verificador que ve cambiar una sola letra de un archivo sale con código uno.

## [00:42] → E02 · Título

Este es el módulo veintiocho: prerregistro y reproducibilidad. Umbrales antes de los datos, y la misma huella en otra máquina. Trabajamos con predictor-debugger, un depurador físico para un predictor de flujo entrenado con redes neuronales. Ojo: lo que se prueba ahí no es la red. Es el depurador.

## [01:01] → E03 · Explicado para un niño de 8 años

Antes del partido escribes en un papel quién va a ganar. Lo metes en un sobre, lo cierras y se lo das a alguien. Así nadie puede decir después que cambiaste la predicción cuando ya sabías el resultado. Y si te equivocas, igual lo cuentas, porque para eso escribiste la apuesta antes.

Ahora, tu primo hace la misma cuenta en su casa, con su propio computador. Si le da exactamente el mismo número que a ti, sabes que no fue suerte ni un error de tu máquina. Eso es lo que vamos a hacer: el sobre cerrado es el prerregistro, y el número que comparas con tu primo es la huella.

## [01:46] → E04 · Teoría 1: el prerregistro

El DESIGN punto md de predictor-debugger empieza con esta frase: escrito antes de que exista cualquier dataset, modelo o predicción. Todo cambio posterior es una enmienda que va al final, con fecha, razón y commit, y ninguna se puede hacer después de evaluar el split de test.

Las enmiendas no son trampa si se hacen a tiempo y quedan escritas. La enmienda uno, del veinticuatro de octubre, antes de los datos, es un buen ejemplo. La red se entrenaba en MPS de Apple, que no tiene float64. Un campo en float32 tiene un redondeo relativo cerca de uno punto dos por diez a la menos siete, mientras que el umbral de D1 se calibraba con un solver en float64 cuya divergencia está cerca de diez a la menos quince. Tal como estaba escrito, D1 habría marcado a un predictor float32 perfecto por redondeo, no por física. Por eso se agregó el control P0f32 y la hipótesis H1b. Todo eso antes de generar un solo dato.

## [02:52] → E05 · Teoría 2: lo que se prueba es el chequeo

Hay una frase del diseño que yo pondría en la pared de cualquier equipo de QA: una red mala es un resultado aceptable; un depurador que no distingue los controles es un fracaso.

Esto cambia la pregunta. No estoy preguntando si la red neuronal es buena. Estoy preguntando si mis chequeos físicos rechazan lo que sé que está mal, aceptan lo que sé que está bien, y señalan dónde se rompe la física en lo que no sé. Es probar al que prueba.

## [03:25] → E06 · Teoría 3: controles positivos y negativos

Para eso necesitas controles cuya respuesta ya conoces. P0 es el solver exacto: se tiene que aceptar, y eso es H1. P3a toma la salida de la red y le suma un campo gradiente con norma del cinco por ciento de la velocidad, lo que rompe la incompresibilidad: D1 lo tiene que atrapar, y esa es H2. P3b multiplica la salida por uno punto cero cinco, lo que inyecta energía: D2 lo tiene que atrapar, H3. Y P1 repite el estado anterior, sin dinámica: D3 lo tiene que atrapar, H4.

Cada hipótesis empareja un control con el chequeo que debe gritar. Si D1 no grita con P3a, el problema no es la red: es que D1 está dormido.

## [04:12] → E07 · Teoría 4: el umbral fijado antes

¿Y cuándo grita un chequeo? La regla quedó escrita antes: tau es diez veces el máximo del estadístico para P0 y P0f32 sobre todos los pasos de validación, con un piso de diez a la menos doce. Se calcula una vez, se escribe en thresholds punto json con su hash y no se cambia.

Y una regla que parece obvia pero muchos no escriben: un paso con NaN o infinito siempre queda marcado. Un NaN nunca pasa.

## [04:43] → E08 · Teoría 5: comparadores que deben fallar

Ahora la parte más fina. H14 no solo exigía que su criterio se cumpliera. Exigía que un comparador barato, la suma de D3, no lo cumpliera. ¿Para qué? Porque si un comparador sencillo también cumple, la hipótesis no demuestra que el chequeo nuevo aporte algo.

Por eso esas hipótesis tienen tres salidas. PASS, si el criterio cumple y el comparador no. NON-DISCRIMINATIVE, si cumplen los dos. Y FAIL, si el criterio no cumple. En la ronda dos, H8 pasó, pero no distinguió a G de D3: D3 también ordenó ese conjunto. Un verde que no discrimina hay que reportarlo como lo que es.

## [05:24] → E09 · Teoría 6: H14, la apuesta que falló

Vamos a H14 con sus números. Pedía una media de rho de al menos cero punto siete, con extremo inferior del intervalo de al menos cero punto cinco, en las cuatro redes. P2s0 sacó cero punto ochocientos. P2s1, cero punto ochocientos quince. P2ge4, cero punto setecientos cuarenta y siete, con el extremo inferior en cero punto cinco tres cinco. Y P2gbest sacó cero punto seis tres cinco, con intervalo de cero punto cuatro uno tres a cero punto siete nueve cinco. No llegó. Y el comparador, la suma de D3, cumplió en tres de cuatro redes. Resultado: FALLA.

En el paso uno el orden era casi perfecto, cero punto noventa y nueve, y se fue dañando hasta cero punto cuarenta y cinco a cero punto setenta y tres en el paso veinte. Lo que aprendí: el depurador sabe cuánto se equivoca la red en cada paso, pero no hacia dónde la llevan esos errores.

No se cambió nada para arreglarlo. De ese fallo salió la ronda cuatro, con una idea nueva prerregistrada, H17: llevar la dirección de cada defecto a lo largo de los pasos, en vez de sumar tamaños. H17 pasó en las cuatro redes.

## [06:42] → E10 · Teoría 7: la huella

¿Cómo sé que tu corrida y la mía dan lo mismo? Con una huella. verify punto py arma un JSON ordenado con la versión de numpy, el hash del solver, el hash de cada archivo de pd, el hash de thresholds punto json, los hashes de las entradas y un resumen de los veredictos. Le saca SHA-256 y se queda con doce caracteres. La de la ronda uno es E E C nueve, cero nueve E cero, F siete siete D.

Si cambia un byte de cualquiera de esas cosas, cambia la huella. Por eso no es un adorno: es el resumen de todo lo que tendría que ser igual.

## [07:26] → E11 · Laboratorio: verificar la ronda uno

Vamos a la terminal. Necesitas git y uv. Clonas criguex barra predictor-debugger, entras, y corres uv run guion guion locked verify punto py guion guion saved mac. El guion guion locked hace que uv use exactamente Python tres punto nueve y numpy uno punto veintiséis punto cuatro, los del uv punto lock.

La salida: H1, P0, cero de cuatrocientos, PASS. H1b, P0f32, cero de cuatrocientos, PASS. H2, P3a, D1, cuatrocientos de cuatrocientos, PASS. H3, P3b, D2, cuatrocientos de cuatrocientos, PASS. H4, P1, D3, cuatrocientos de cuatrocientos, PASS. Veredictos iguales a los guardados: True. Huella E E C nueve, cero nueve E cero, F siete siete D. Exit cero. En mi corrida de hoy tardó unos seis segundos, contando la descarga de numpy.

## [08:15] → E12 · Terminal: cuatro entornos, cuatro rondas

Cambia mac por war, por guerra y por linux. Las cuatro dan True y la misma huella. Después corre las rondas dos, tres y cuatro con guion guion saved mac. Ronda dos: nueve hipótesis, todas PASS, huella D cinco cero seis, F cinco ocho F, tres ocho tres ocho. Ronda cuatro: dieciocho líneas, todas PASS, incluida H17, huella seis ocho uno D, uno cuatro tres B, seis cuatro A tres.

Y la ronda tres. Busca la línea de H14: termina en FAIL. Y aun así el comando imprime veredictos iguales a los guardados, True, la huella seis tres uno nueve, cinco tres siete B, siete uno seis siete, y sale con cero. ¿Por qué está bien? Porque el verificador no comprueba que todas las hipótesis pasen. Comprueba que reproduces lo publicado: mismos veredictos, misma huella. El FAIL publicado se reproduce como FAIL. Si un día H14 saliera PASS, eso sí sería un problema.

## [09:16] → E13 · Teoría 8: varias máquinas, sin elegir la que conviene

Las huellas se repitieron en el Mac, en WAR y en GUERRA, que son mis dos máquinas con Windows, y en Linux, tanto en el CI de GitHub como en WSL2. El workflow verify corre en cada push, con una matriz de las cuatro rondas, y en cada job hace grep de la huella esperada sobre los resultados guardados de cada máquina. Si no aparece, el job falla.

Y hay dos ledgers. El de discrepancias entre entornos, en la ronda uno: cero entradas. El de falsos positivos: ciento veintiséis entradas, todas D2 sobre P0 y P0f32 en el split fuera de distribución, y todas siguen open. No las escondo ni las cierro porque sí. Y el límite escrito en el README: las tres máquinas son mías, así que esto no es una reproducción independiente.

## [10:10] → E14 · Teoría 9: bit-idéntico no es veredicto-idéntico

Un detalle que mucha gente confunde. Ningún archivo regenerado en WAR, GUERRA o Linux salió igual bit a bit al del Mac. La mayor diferencia absoluta fue ocho punto nueve por diez a la menos dieciséis, en WAR, ronda uno. Eso es ruido de punto flotante entre plataformas.

¿Entonces no es reproducible? Sí lo es, pero hay que decir qué se reproduce. Los archivos del Mac quedan como canónicos, la diferencia se reporta, y lo que se compara entre máquinas son veredictos y huellas, que coinciden. Prometer bits idénticos entre sistemas operativos es prometer algo que no controlas.

## [10:49] → E15 · Teoría 10: bootstrap por clusters

Último bloque de teoría. Los intervalos de confianza de las rondas dos en adelante salen de cluster_bootstrap, en round2 barra evaluate punto py. Remuestrea trayectorias completas, cada una con todos sus pasos, dos mil réplicas, con la semilla fija veinte millones doscientos sesenta y un mil veinticuatro, y reporta los percentiles dos punto cinco y noventa y siete punto cinco.

¿Por qué trayectorias y no pasos? Porque los pasos de una misma trayectoria no son independientes. Si remuestreas pasos sueltos, tratas datos correlacionados como si fueran independientes, y el intervalo sale más estrecho de lo que los datos permiten.

## [11:29] → E16 · Terminal: el ejemplo sintético

El laboratorio te pide comprobarlo con un ejemplo sintético, y yo lo hice así: diez trayectorias de diez pasos cada una, muy correlacionados dentro de cada trayectoria, la misma semilla y dos mil réplicas para los dos métodos. Remuestreando pasos, el intervalo de la media va de menos cero punto dos uno tres a cero punto cero tres cuatro: ancho cero punto dos cuatro siete. Remuestreando trayectorias, va de menos cero punto cuatro siete uno a cero punto dos ocho cero: ancho cero punto siete cinco. Unas tres veces más ancho. Ese es el tamaño de la mentira que te ahorras.

## [12:09] → E17 · Mutación WAR: un byte que no es un número

La mutación de la semana. En una copia del repo abro thresholds punto json y cambio un byte que no es un número: una letra del hostname de la máquina donde se calcularon los umbrales. Ningún umbral cambia. Antes de correr, escribe qué crees que pasa con los cinco veredictos, con la línea de veredictos iguales y con el exit code.

## [12:34] → E18 · Terminal: lo que grita

Corro verify punto py guion guion saved mac. Los cinco veredictos siguen en PASS. Veredictos iguales a los guardados: True. Pero aparece una línea nueva: changed thresholds punto json. La huella ya no es E E C nueve; ahora es cinco D tres E, cuatro B nueve cinco, D D seis A. Y sale con exit uno. El verificador no solo mira si los resultados cambian. Mira si cambió lo que se había congelado.

Restauro el archivo y hago la segunda parte: subo el umbral de D1 a uno punto cero. Ahora H2 cae: P3a, D1, cero de cuatrocientos, FAIL. Veredictos iguales: False. changed thresholds punto json, otra huella, seis B C siete, nueve cero uno B, cinco F B uno, y exit uno. Con un umbral así de alto, D1 deja de ver el defecto que debía atrapar, y el control negativo lo deja en evidencia. Si tu propio verificador no grita en alguno de los dos casos, está dormido, y eso se publica.

## [13:40] → E19 · El reto y cómo se evalúa

Tu reto: prerregistra tu propio experimento de QA. Por ejemplo, "mi juez atrapa al menos el noventa por ciento de los falsos verdes sembrados" o "mi suite mata al menos cinco de seis mutantes". En un repo tuyo escribes un PREREGISTRO punto md con la pregunta, al menos tres hipótesis numeradas con criterio numérico, un control que debe pasar, uno que debe fallar, un comparador que debe fallar y los límites. Pones los umbrales en thresholds punto json. Haces commit. Solo después generas datos y corres. Escribes un huella punto py, un workflow que haga grep de la huella en dos sistemas operativos, y un intervalo por bootstrap de clusters con semilla y número de réplicas escritos.

Así se evalúa. git log guion guion reverse muestra el commit del prerregistro y de los umbrales antes del primer archivo de datos. git log guion p sobre thresholds punto json no muestra cambios posteriores a la primera corrida, o si hubo enmiendas, cada una tiene fecha, razón y commit. Cada hipótesis tiene su PASS o FAIL con el número que lo decide, y las que fallan siguen en el reporte. El control positivo pasa, el negativo queda marcado, y el comparador se reporta aunque cumpla. El CI imprime la misma huella en los dos sistemas y falla si cambias un byte de thresholds punto json, y lo muestras con un commit de prueba y su job en rojo. El intervalo remuestrea clusters. Y el README tiene "Límites" y "Qué me contradiría".

El nivel más alto: llevas los dos ledgers, discrepancias y falsos positivos, y cada entrada sin explicar queda open y visible.

## [15:28] → E20 · Mini-quiz

Tres preguntas. Pausa en cada una.

Primera. Ya con datos, descubres que un umbral quedó mal escrito. ¿Qué cambio es legítimo? Una enmienda al final del diseño con fecha, razón y commit, y solo si todavía no se evaluó el split de test.

Segunda. round3 barra verify punto py imprime H14 FAIL y aun así sale con código cero. ¿Por qué está bien? Porque el verificador comprueba que reproduces lo publicado, mismos veredictos y misma huella, no que todas las hipótesis pasen.

Tercera. cluster_bootstrap remuestrea trayectorias completas y no pasos sueltos. ¿Por qué? Porque los pasos de una misma trayectoria dependen entre sí, y remuestrearlos uno por uno da un intervalo engañosamente estrecho.

## [16:13] → E21 · Cierre

Tres ideas. Primera: escribe hipótesis, umbrales, controles y comparadores en un commit antes de los datos, y cualquier cambio es una enmienda con fecha, antes del test. Segunda: publica lo que falla; H14 falló por sesenta y cinco milésimas y de ahí salió la ronda cuatro. Tercera: compara veredictos y huellas entre máquinas, no bits, y di de frente cuando las máquinas son tuyas.

En el siguiente módulo: QA de requisitos. Revisar la spec antes de construir. Nos vemos allá.

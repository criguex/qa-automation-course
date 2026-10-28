# Guion ES · Módulo 29 · m32 — QA de requisitos

_Palabras de narración: 2513 · duración estimada 16:45 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña.

## [00:00] → E01 · Gancho

La especificación decía: ventana semanal, por ejemplo del veinte de agosto al veintisiete de septiembre. Son treinta y ocho días. En otra página anunciaba catorce competidores, la lista traía doce y el grafo dibujaba siete. Y en la misma pantalla, los casos escalados a una persona eran treinta y uno en una tarjeta y dos en otra. Si alguien construye eso tal cual, el tablero sale mintiendo desde el primer lunes, y nadie lo nota hasta semanas después. Encontrarlo costó una calculadora y una tarde de lectura. Antes de escribir una línea de código salieron diecinueve problemas.

## [00:39] → E02 · Título

Este es el módulo veintinueve: QA de requisitos. Revisar la spec antes de construir. Trabajamos con spec-review-case-study, un caso de estudio público y anonimizado. El dueño de un producto trajo una especificación para una herramienta semanal de vigilancia de competidores, y antes de construir la revisé: leí cada página, sumé cada número y anoté todo lo que no cuadraba o faltaba.

## [01:03] → E03 · Explicado para un niño de 8 años

Antes de hacer una torta lees toda la receta. Si en la página uno dice tres huevos y en la página dos dice dos, o si la temperatura del horno está en blanco, paras y preguntas antes de prender el horno.

Porque si prendes el horno primero, vas a gastar los huevos, la harina y una hora, y al final la torta sale mal. Y lo peor es que no sabrás si fue la receta o fuiste tú. Preguntar antes cuesta un minuto. Preguntar después cuesta la torta.

Eso es QA de requisitos: leer la receta del programa con lupa, sumar los números, y preguntar antes de que alguien se ponga a cocinar.

## [01:48] → E04 · Teoría 1: de dónde salió la spec

El primer paso no es buscar errores. Es entender de dónde salió el documento. En este caso la especificación parecía armada a partir de la captura de la demo de otra empresa. Tenía una cabecera con el nombre de esa empresa, competidores que eran figuras públicas reales y los números de una sola semana escritos como si fueran requisitos.

Esa sola observación cambia todo. Si la spec copia una demo, sus números son ejemplos, no requisitos. Y explica buena parte de los hallazgos del uno al diez. Cada cifra copiada se vuelve una pregunta para el dueño.

## [02:27] → E05 · Teoría 2: el proceso en seis pasos

El README lo resume en seis pasos. Uno: leer una vez para entender la intención y resumir el sistema en cinco líneas. Dos: recalcular cada número, sumar las partes, pasar conteos a porcentajes del mismo total, contar los días de cada ventana y revisar unidades. Tres: cuestionar los hechos, es decir, devolver los costos a tokens por precio y comparar cada meta de latencia con la forma en que corre el sistema. Cuatro: seguir cada definición hasta su origen; cada KPI necesita fórmula, cada caja un proveedor y un precio, cada campo un origen. Cinco: calificar la severidad. Y seis: decidir, con preguntas numeradas y un plan por fases.

## [03:11] → E06 · Teoría 3: tres familias, diecinueve hallazgos

Los diecinueve hallazgos caen en tres familias. Siete números que no cuadran. Tres costos o latencias presentados como hechos. Y nueve cosas que nadie definió. De los diecinueve, cuatro son bloqueantes.

Y un detalle de honestidad que el repo deja claro: los hallazgos están identificados, no cerrados. Ocho tienen una propuesta concreta y once quedaron abiertos, como preguntas para el dueño. El repo no dice cómo se respondieron, porque eso no está en el caso.

## [03:41] → E07 · Teoría 4: números que no cuadran

Veamos algunos. F06: la ventana semanal del ejemplo dura treinta y ocho días; se detectó contando los días. F05: se anuncian catorce competidores, se listan doce, que suman mil quinientas diecisiete señales de dos mil setenta, y el grafo dibuja siete. F04: los escalados a una persona son treinta y uno, dos y dos en la misma pantalla, y el resumen promete tres acciones y muestra dos.

Y mi favorito, F02. El tablero dice que el ochenta y cinco por ciento de las señales son amenazas y que el sesenta y siete por ciento es ruido. Si las dos clases se excluyen, no pueden ser ciertas a la vez: con sesenta y siete por ciento de ruido quedan como mucho seiscientas ochenta y tres señales que no son ruido, y se reportan mil setecientas cincuenta y tres amenazas.

Y F03 es la misma palabra con dos valores: el ruido es sesenta y siete por ciento como KPI y cuatro por ciento como etiqueta en la taxonomía. Ninguno de estos se encuentra leyendo rápido. Se encuentran sumando, dividiendo y comparando cada lugar donde aparece el mismo dato. Es aburrido, y es justo el trabajo que nadie más va a hacer antes de que el equipo empiece a construir.

## [05:04] → E08 · Teoría 5: pruebas de aceptación que no prueban nada

F10 es de las que más me gusta enseñar. La spec traía tres pruebas de aceptación: un gasto semanal de cero coma dos cero ocho siete dólares, más o menos un centavo; un medidor de ruido que marque sesenta y siete por ciento; y una P50 de latencia entre doscientos y doscientos cincuenta milisegundos.

¿Qué comportamiento demuestra cada una? Ninguno. Copian una semana de datos ajenos. Con datos reales esas pruebas fallan aunque el sistema funcione, o pasan aunque no funcione. Es un falso verde escrito desde el diseño. La propuesta fue reemplazarlas por una prueba con diez señales fijas que revise el contrato JSON de salida y las reglas de escalado. Eso sí demuestra algo.

## [05:50] → E09 · Teoría 6: umbrales sobre probabilidades sin calibrar

F13 conecta con un módulo anterior del curso, el de calibrar jueces. La spec decía: escalar cuando dos probabilidades del clasificador con LLM sean ambas mayores o iguales a cero coma ochenta y cinco. Y una prueba esperaba que el modelo discriminara con precisión.

Las probabilidades que escribe un LLM no están calibradas. Sin un conjunto etiquetado, cero coma ochenta y cinco es arbitrario, y la precisión no se puede medir. La propuesta fue una fase de calibración: el dueño marca unas cien señales como útil o ruido, y con eso se mide la precisión y se ajustan el prompt y los umbrales. Es exactamente el mismo problema del juez sin calibrar.

## [06:35] → E10 · Teoría 7: la severidad es criterio

Para calificar usé tres niveles. Bloqueante: no se puede construir ni probar esa parte hasta que alguien responda. Alta: si se construye así, muestra un número malo, hace lo que no es, cuesta más de lo prometido o trae riesgo legal. Media: confunde o no está explicado, pero no frena.

Y esto lo digo de frente, como lo dice el repo en sus límites: los niveles de severidad son criterio de quien revisó, no una medición. Otra persona podría poner F06 en Alta. Lo importante es que la escala esté escrita, para que el desacuerdo sea sobre el caso y no sobre las palabras.

## [07:16] → E11 · Laboratorio: las cuentas en código

Vamos a la terminal. Solo necesitas Python tres, sin dependencias. Clonas criguex barra spec-review-case-study y corres python3 check_numbers punto py.

F01 sale con signo de admiración: cuatrocientos veintidós duplicados, todos de web, ninguno de redes, y nadie dice por qué. F02 a F07 salen con equis: las contradicciones que acabamos de ver, más F07, donde los tokens procesados cuentan solo la salida y la entrada es el noventa y ocho punto ocho por ciento del total. F08 sale con admiración: el gasto semanal coincide con solo la entrada del clasificador, y faltan los costos de salida y del resumen. Resumen: seis contradicciones, dos sin explicar, cero bien. Exit uno.

## [08:00] → E12 · Código: cómo está hecho

Abre el script. Arriba hay un diccionario SPEC con cada cifra copiada de la especificación: social, web, únicas, amenazas, ruido, escalados, la lista por competidor, la ventana, los tokens y el gasto. Y aparte un diccionario ASSUMPTIONS con las estimaciones propias, como mil tokens de entrada por señal, que no salen de la spec.

Cada chequeo es una línea que devuelve una marca. Equis es una contradicción. Signo de admiración es un número que puede ser cierto pero no está explicado. Chulo es que cuadra. Por ejemplo F06: resta las dos fechas de la ventana y marca bien solo si da siete días. Y el script sale con uno mientras quede cualquier equis o cualquier admiración.

## [08:46] → E13 · Terminal: el verificador también se prueba

Ahora lo que separa un script de una herramienta: el verificador tiene sus propias pruebas. python3 guion m unittest test_check_numbers: siete pruebas, OK. Cubren gasto cero, un gasto muy por encima del costo, cero señales sin división por cero, y un juego de cifras coherentes que debe pasar, que es el control positivo.

Con guion guion assumptions el script lista sus supuestos: que los duplicados son brutos menos únicos, que el ruido es una fracción de las únicas, que los mil tokens por señal son una estimación nuestra, y que el gasto semanal nunca se puede verificar del todo, porque la spec no da precio para la salida ni para el resumen.

Y el CI tiene dos pasos: correr las pruebas del verificador, y exigir que la spec publicada siga fallando con exit uno. Si un día el script dice que esa spec está bien, el CI se pone en rojo.

## [09:47] → E14 · Navegador: la checklist

La revisión dejó una checklist reutilizable: docs barra checklist punto es punto md. Veintiséis puntos en siete bloques, del cero al seis: entender la intención, recalcular cada número, cruzar el mismo dato en todas partes, seguir cada requisito hasta su origen, comparar los requisitos con la realidad, revisar las pruebas que trae la spec y cerrar la revisión.

Cada punto lleva entre corchetes el hallazgo que lo hizo necesario. Por ejemplo, "las ventanas de tiempo cuadran con su nombre", con F06. Los cuatro puntos que no traen hallazgo son el primero del bloque cero y los tres del bloque seis, que son los que cierran la revisión. Esta lista se pega en el ticket antes de que alguien escriba código.

## [10:35] → E15 · Teoría 8: decidir con fases y puertas

La revisión no terminó en una construcción. Terminó en un plan por fases, cada una con su puerta. P0, definir: cero código, el dueño responde siete preguntas, sobre su oferta y su comprador, de tres a cinco competidores reales, canales, clasificador, a dónde llega el resumen, dónde corre y la interfaz. La puerta es tener las respuestas en la mano. P1, un MVP de uno a dos días, un script sin interfaz, cuya puerta es la prueba de diez señales fijas. P2, calibrar, con la puerta "precisión medida, no supuesta". P3, la interfaz, solo si P2 demuestra valor. Y P4, escalar a catorce competidores o más.

## [11:17] → E16 · Mutación WAR: el mutante de control

Ahora probamos al revisor. Primero un mutante de control, en una copia del script: cambio la ventana para que termine el veintisiete de agosto en vez del veintisiete de septiembre. F06 pasa a chulo: siete días. El resumen baja a cinco contradicciones, dos sin explicar, una bien. El chequeo responde a lo que tiene que responder.

## [11:40] → E17 · Terminal: el mutante que el curso dice que sobrevive

El curso trae un segundo mutante, el peligroso: subir el gasto semanal a cero coma cuarenta. Según el texto del módulo, F08 salía con chulo aunque un gasto de cuarenta centavos sigue sin explicación, y ese mutante sobrevivía.

Lo corrí hoy y ya no sobrevive. F08 sale con admiración: por encima del costo de entrada, y el resto no tiene precio en la spec, así que no se puede comprobar. ¿Qué pasó? El commit nueve siete d c siete nueve uno, de hoy, arregló exactamente ese punto ciego y dejó una prueba con nombre propio: test spend far above input cost is not ok. El hallazgo del revisor se publicó, se arregló y quedó una prueba para que no vuelva. Eso es el ciclo completo.

## [12:30] → E18 · Terminal: buscar el siguiente

Entonces busqué el siguiente. En la copia cambio un solo número: web_shown, las señales de web que se muestran, de setecientos treinta y seis a mil ciento cincuenta y ocho. Ahora los cuatrocientos veintidós duplicados salen todos de redes y ninguno de web.

Resultado: F01 sale con chulo. Pero el mensaje dice "cuatrocientos veintidós duplicados, todos de web, cero por ciento de web, ninguno de redes". El texto se contradice solo, y la marca dice que está bien. La regla de deduplicación sigue sin describirse, que era el hallazgo original. Las siete pruebas del verificador: OK. Ninguna lo nota. Ese mutante sobrevive, y el chequeo de F01 solo marca un patrón específico, no la falta de la regla. El paso siguiente es el de siempre: escribir la prueba que lo mata y publicarlo como hallazgo del revisor.

## [13:24] → E19 · El reto y cómo se evalúa

Tu reto: revisa una spec real antes de que alguien la construya. Puede ser una historia de usuario con criterios de aceptación de tu trabajo, anonimizada; la documentación de una API pública; o el prerregistro de tu módulo anterior, porque un prerregistro también es una spec.

Entregas cuatro cosas. Un findings punto md con al menos ocho hallazgos, cada uno con qué decía, por qué es un problema, cómo se detectó, severidad y decisión o pregunta, y la línea de la checklist que lo cubre. Tu propio check_numbers punto py con al menos cuatro chequeos que recalculen cifras de esa spec y salgan con uno si queda una contradicción. Una copia corregida de las cifras que haga salir al script con cero, que es tu control positivo, y al menos tres mutantes, cada uno con un solo error sembrado en un chequeo distinto. Y las preguntas numeradas para el dueño con un plan por fases y su puerta.

Así se evalúa. El script sale con uno sobre las cifras originales y con cero sobre la copia corregida. Cada mutante lo hace salir con uno, reportas tu kill rate y, si alguno sobrevive, lo dejas a la vista. Cada hallazgo tiene sus cinco campos y apunta a la checklist. Cada bloqueante es una pregunta que se responde en minutos. La primera fase tiene cero código, y git log muestra que no hay código del producto antes de cerrar la revisión. Y todo va anonimizado. El nivel más alto es encontrar un mutante que sobreviva a tu propio script, publicarlo con la cifra que lo produce y agregar el chequeo que lo mata.

## [15:13] → E20 · Mini-quiz

Tres preguntas. Pausa en cada una.

Primera. La spec dice "ventana semanal, por ejemplo del veinte de agosto al veintisiete de septiembre". ¿Qué haces antes de construir? Contar los días del ejemplo, que son treinta y ocho, y preguntar qué es una semana para este sistema.

Segunda. Tres pruebas de aceptación exigen un gasto de cero coma dos cero ocho siete, un ruido del sesenta y siete por ciento y una P50 entre doscientos y doscientos cincuenta milisegundos. ¿Cuál es el problema? Que copian los números de una semana de la demo: con datos reales fallan aunque el sistema funcione, o pasan aunque no funcione.

Tercera. check_numbers punto py imprime signo de admiración en F01 y F08. ¿Qué quiere decir? Un número que puede ser cierto pero no está explicado. El script sale con uno mientras quede alguno.

## [16:08] → E21 · Cierre

Tres ideas. Primera: antes de buscar errores, pregunta de dónde salió la spec; si copia una demo, sus números son ejemplos. Segunda: recalcula cada número en código, con su propia suite y un control positivo, y prueba al revisor con mutantes, porque el mío tenía un punto ciego que se cerró hoy y otro que sigue abierto. Tercera: decide con preguntas numeradas y fases con puerta, y la primera fase tiene cero código.

En el siguiente módulo: controles, arnés y mutación numérica, con un contrato congelado y un oráculo independiente. Nos vemos allá.

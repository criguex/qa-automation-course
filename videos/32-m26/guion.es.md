# Guion · 32 · m26 · Verificar una prueba formal sin ser matemático

Voz en off: Cristian, primera persona · español de Colombia, tuteo · ~150 palabras/min · 2727 palabras de narración · duración estimada 18:26 (incluye pausas del quiz)

Cada bloque lleva su marca de tiempo y la escena que lo acompaña (→ E##). Los tiempos de `escenas.json` siguen este guion.

## Gancho

[00:00] → E01

Una compilación de una hora y media. Exit cero. El log, limpio. Busqué en el log las palabras fetched, unpack y downloading: cero resultados. Yo estaba seguro de que todo se había compilado en mi máquina. No era así. Siete dependencias habían llegado en silencio como archivos precompilados desde Reservoir, el registro de paquetes de Lean. El log no lo mostraba. Lo destapó otra cosa: comparar las fechas de los archivos punto olean con la hora de inicio de la compilación. Un artefacto más viejo que la compilación no se compiló ahí. Eso fue la compilación B3, y por eso existe la B4.

[00:41] → E02

Y la segunda sorpresa. Tomé un teorema que Mathlib ya prueba, que hay infinitos primos, y cambié n menor que p por n más uno menor o igual que p. Para Lean, esas dos cosas son la misma por definición. Comparator, el verificador de enunciados, lo rechazó. ¿Está mal Comparator? No. Hace exactamente lo que dice: comprueba que el enunciado sea el del desafío, carácter por carácter de su forma. Rechazado no quiere decir falso. Quiere decir que el enunciado cambió. En este módulo vas a aprender a revisar una prueba formal sin ser matemático, y a no sacar conclusiones que la herramienta no da.

## Explicado para un niño de 8 años

[01:23] → E03

Si tuvieras ocho años: el profe revisa que cada cuenta de la tarea esté bien hecha. Eso es Lean: revisa cada paso. Tú revisas otras tres cosas. Que la tarea sea la que pidieron, porque una tarea perfecta de otra pregunta no sirve. Que nadie la trajo copiada, porque si llegó hecha de otra parte no sabes cómo se hizo. Y que el profe sí pone mala nota cuando le cambias la pregunta, porque un profe que le pone cinco a todo no está revisando nada. Esas tres cosas no son matemática. Son QA.

## Teoría · lo que Lean no comprueba

[02:01] → E04

Empecemos por lo que Lean comprueba y lo que no. Lean comprueba que cada paso de la demostración es válido. Es muy bueno en eso. Pero no comprueba cuatro cosas. Una: cómo se compiló la prueba. Dos: si el enunciado verificado es el que se pretendía. Tres: si coincide con el problema tal como lo escribió el Instituto Clay. Y cuatro: si la evidencia publicada es la que de verdad se produjo. Esos cuatro huecos son trabajo de QA, y cada uno tiene su paso en el protocolo: recompilar desde la fuente, mutar el enunciado, conectar con el texto de Clay y atar cada log a un hash.

## Teoría · recompilar desde la fuente

[02:44] → E05

Recompilar desde la fuente. scientific-qa-evidence hizo cinco compilaciones de las pruebas de OpenAI. La B2 usó la caché precompilada de Mathlib, como el procedimiento publicado. La B3 se suponía limpia y ya viste lo que pasó. Las dos últimas, B4 y B5, se hicieron con lake guion guion no cache build: exit cero, once mil cuatrocientos veinticuatro jobs, una hora veintinueve y una hora dieciséis, todas las dependencias compiladas en local. Y para B4 se repitió el chequeo que destapó a B3: cada punto olean tenía que ser más nuevo que el inicio de la compilación. La lección es de cadena de suministro: un log limpio no es una prueba de origen.

## Teoría · checkers independientes

[03:29] → E06

Checkers independientes. Comparator comprueba dos cosas: que la solución prueba exactamente el teorema del archivo de desafío y que solo usa los axiomas permitidos, que son propext, Quot punto sound y Classical punto choice. Y lo hace con dos kernels: el de Lean y nanoda, una implementación aparte. Además corrí leanchecker guion guion fresh, que revisa todo desde un entorno vacío y aceptó las dos soluciones. Pero ojo con contarlo de más: leanchecker usa el kernel de Lean, así que no es una tercera implementación. Y lean4lean, que sí lo habría sido, no compiló para Lean 4.34. Eso queda escrito en Limitaciones, no escondido.

[04:10] → E07

Y aquí está el límite que más me gusta enseñar, porque es incómodo. Dos kernels que aceptan suena muy fuerte. Pero en julio de 2026, un bug de Lean y otro bug distinto de nanoda dejaron pasar la misma prueba falsa. Dos implementaciones independientes, dos errores distintos, el mismo resultado equivocado. Los verificadores que usé están al día con las correcciones conocidas de 2026, pero eso solo cubre lo conocido. El acuerdo entre dos kernels no dice nada sobre bugs que nadie ha descubierto todavía. Un verificador formal también es un guardia, y también se prueba.

## Teoría · mutar el enunciado

[04:49] → E08

Mutar el enunciado, nunca la prueba. Al archivo de desafío le hice seis cambios de un símbolo. Por ejemplo, este: agregarle f igual a cero, que convierte el problema con fuerza en uno sin fuerza. Otro: cambiar nu mayor que cero por nu mayor o igual que cero. Los seis fueron rechazados con el mismo mensaje: el enunciado del desafío y el de la solución no coinciden. Y aquí viene lo importante: un séptimo caso, un control que solo cambia un comentario, fue aceptado. Ese control es la otra mitad del experimento. Sin él, no sabrías si Comparator es exacto o si rechaza cualquier cosa por defecto.

## Teoría · rechazado no es falso

[05:32] → E09

Ahora, rechazado no quiere decir falso. Para entender qué significan las respuestas de Comparator, tomé tres teoremas que Mathlib ya prueba: infinitos primos, Cauchy–Schwarz y convergencia dominada. A cada uno le di su enunciado correcto, reformulaciones equivalentes y errores deliberados. Comparator rechazó los ocho cambios. Los ocho. Incluidos cuatro que eran equivalentes, como el n más uno menor o igual que p. Para clasificar cada rechazo hizo falta una segunda vía en Lean: una prueba de equivalencia, una prueba de que es más débil en un sentido con un contraejemplo del otro, o una refutación. Así salieron cuatro equivalentes, uno más débil y tres falsos.

[06:14] → E10

Pero la segunda vía tiene su propia trampa. Dos enunciados verdaderos cualesquiera son equivalentes: si los dos son ciertos, cada uno implica al otro. Entonces una prueba de equivalencia que use el teorema que estoy probando no demuestra nada. Para eso está la guarda: un comando de Lean que recorre todas las dependencias transitivas de la prueba. En el caso de los primos revisó mil cuatrocientas ochenta y cinco constantes y ninguna era el teorema bajo prueba. Y para saber que la guarda no está dormida, le di a propósito una prueba tramposa que dependía de Nat punto exists infinite primes. La rechazó. Control positivo y control negativo, otra vez.

## Teoría · recibos frente a hashes

[06:58] → E11

El cuarto hueco: la evidencia. Cada paso deja un recibo con su comando, los hashes de entradas y salidas y su código de salida. Probé dos ataques contra eso, sobre registros reales. Primero, un recibo que nombra un log que no existe. El procedimiento publicado de OpenAI sale con cero y la misma salida, porque no revisa recibos. Mi chequeo P6, que mira si el log existe, lo marca. Segundo ataque: reemplazo el log por uno auténtico, pero de otra corrida, con el nombre correcto. P6 lo deja pasar, porque el archivo existe. Solo comparar con el hash registrado al correr el paso detecta los dos casos.

[07:40] → E12

Dos aclaraciones honestas. Primera: esto no es una técnica nueva. Atar cada paso a hashes registrados es práctica de in-toto y de SLSA en la cadena de suministro de software, y los dos fallos que probé son del tipo que in-toto ya detecta. Segunda: el hash tiene su límite. Detecta un cambio frente a un valor confiable, pero no autentica de dónde salió un log si alguien puede cambiar el archivo y también el hash registrado. Y el alcance de todo el repo: no demuestra nada nuevo, no reclama ningún resultado del Premio del Milenio y no es una revisión matemática. Dice: no se encontró un defecto en este alcance. No dice: está certificado.

## Laboratorio

[08:26] → E13

Vamos al laboratorio. Solo necesitas Python 3.9 o más reciente, sin dependencias, y menos de un minuto. Clono el repo y corro python3 verificar punto py, con echo exit al final para ver el código de salida. Seis comprobaciones, las seis en OK: archivos intactos, corridas numéricas iguales entre Mac y Linux, las 84 variantes numéricas otra vez, consistencia entre README y registros, recibos de los controles Mathlib y la comprobación de recibos. Al final, una huella: C 5 F 0, F 1 A 8, 2 F 4 D, y exit cero. Esa huella es del commit que yo corrí. Compárala con la de un compañero que tenga tu mismo commit: si coinciden, a los dos les dio exactamente lo mismo.

[09:14] → E14

Ahora las mismas seis, una por una, porque el objetivo del módulo es que sepas qué recalcula cada una y qué solo verifica por hash. La primera, shasum guion c, solo verifica por hash que cada archivo curado sea el publicado. La tercera, en cambio, vuelve a correr las ochenta y cuatro variantes numéricas y las compara con lo guardado: eso es recalcular. La quinta comprueba los recibos de los controles Mathlib y recalcula las clases, pero no vuelve a ejecutar Lean. Y la sexta recalcula las comprobaciones de recibos sobre los paquetes publicados. REPRODUCE punto md tiene una tabla con esa distinción, y decirla exacta es parte del reporte honesto.

[09:59] → E15

Paso tres: leer un recibo. Con head guion n uno saco la primera línea del archivo de recibos de los controles Mathlib. Fíjate en lo que trae. El comando exacto: lake env comparator con la configuración del caso PrimesOrig. Los SHA-256 de las tres entradas: el desafío, la solución y la configuración. El hash de la salida estándar y el de la salida de error. El exit code, que aquí es cero. Y la hora de inicio y de fin. Un dato curioso: el hash de stderr empieza por e 3 b 0 c 4 4 2. Ese es el SHA-256 de un archivo vacío. O sea: ese paso no escribió nada en stderr.

[10:44] → E16

Paso cuatro: el rechazo real de un mutante. Este es el caso de los cuantificadores invertidos: existe un p tal que para todo n, n es menor que p y p es primo. Es falso, porque bastaría tomar n igual a p. El rechazo está en el log de error de Comparator para PrimesSwap, y dice: el enunciado del desafío y el de la solución no coinciden, primes infinite. Un detalle para que no te pierdas: el texto del módulo dice que buscas en el log de salida estándar, pero en el repo el mensaje está en el de errores, el stderr. Salida estándar termina en la línea que exporta las constantes.

[11:29] → E17

Paso cinco: recalcular las once clases. Corro verify punto py de los controles Mathlib. Una fila por caso: el veredicto de Comparator, la clase de la segunda vía y OK si coincide con lo prerregistrado. Mira primes barra defeq: rechazado, y clase cambiado pero equivalente. Ese es el n más uno menor o igual que p. Después, la guarda construida, la prueba tramposa rechazada y la refutación con signo. Y la última frase, que es la que más importa: esto comprueba los registros publicados contra sus recibos; no vuelve a ejecutar Lean. Si en tu reporte escribes que recompilaste algo por correr este script, estarías afirmando de más.

[12:12] → E18

Paso seis, opcional: recompilar tú. Si tienes una máquina Linux potente y tiempo, sigue la guía de reproducción independiente. Pide unos treinta gigas de disco y dieciséis de memoria; la compilación del repo tardó una hora y cuarto en doce núcleos. La guía trae una función de bash que guarda el log de cada comando y anota su propio exit code con su hora de inicio y de fin, no el de tee. El informe que pide trae el commit de la fuente, las versiones de lean y lake, los hashes de los binarios y una tabla de pasos. Y si tu resultado sale distinto, también se publica: un desacuerdo vale tanto como un acuerdo.

## Mutación WAR de la semana

[12:58] → E19

La mutación de la semana: le pruebas al verificador de evidencia que está despierto, en una copia del repo. Mutante uno: copio el log de salida del caso original encima del log del mutante PrimesSwap. Es un log auténtico, pero de otra corrida, con el nombre correcto: el ataque del caso dos. Corro verify punto py y se cae: AssertionError, stdout hash mismatch, PrimesSwap, y exit uno. El guardia gritó. Y fíjate en por qué: no porque el archivo falte, sino porque su hash no es el registrado cuando corrió ese paso. Si tu propio verificador solo revisara que el archivo existe, este mutante sobreviviría.

[13:40] → E20

Mutante dos. Restauro con git checkout punto, y ahora cambio un solo número: en el recibo de Comparator del caso PrimesSwap, el exit code pasa de uno a cero. Es como decir que el mutante fue aceptado cuando en realidad fue rechazado. verify punto py sale con uno. Y el verificador general marca FALLA en dos comprobaciones: archivos intactos, porque el recibo ya no coincide con su hash publicado, y recibos de los controles Mathlib. La huella cambia. Si alguna de estas dos mutaciones hubiera pasado en verde, el guardia de la evidencia estaría dormido, y eso también se publica.

## El reto y cómo se evalúa

[14:20] → E21

El reto tiene dos pistas. La pista A no necesita Lean y es obligatoria. Para tres pasos de un CI tuyo escribes un recibos punto jsonl con el mismo formato que viste: comando, hashes de entradas, hashes de stdout y stderr, exit code, inicio y fin. Luego escribes verificar recibos punto py, que sale con uno si un log falta, si un log no coincide con su hash o si un recibo no trae exit code. Lo pruebas con una copia limpia y tres mutantes sembrados: log borrado, log viejo con el nombre correcto y recibo sin exit code. Y agregas la tabla de los once casos Mathlib, con una frase de por qué cada rechazo no prueba que el enunciado sea falso.

[15:10] → E22

Los criterios. verificar punto py da seis OK y exit cero, y anotas la huella con el commit y el sistema operativo. Tu script sale con cero en la copia limpia y con uno en cada uno de los tres mutantes, y las cuatro corridas tienen su propio recibo. El log viejo con el nombre correcto también sale en uno: tu chequeo compara hashes, no solo que el archivo exista. La tabla coincide con verify punto py y explica el caso defeq. Y ninguna frase de tu reporte dice el teorema es falso o está probado a partir de un veredicto de Comparator. El nivel cuatro es la pista B: cuatro mutantes de un enunciado en Lean, clasificados por una segunda vía, con print axioms sin sorry y un recibo por corrida.

## Mini-quiz

[16:02] → E23 · pausa 5 s

Mini-quiz. Pausa si quieres. Primera: Comparator rechazó n más uno menor o igual que p en lugar de n menor que p. ¿Qué significa? A, que el teorema nuevo es falso. B, que el enunciado cambió de forma, y saber si es equivalente, más débil o falso pide una segunda vía. C, que Comparator tiene un bug. D, que la prueba original está mal. Es la B. Rechazado quiere decir cambió, no falso.

[16:37] → E24 · pausa 5 s

Segunda: un recibo nombra un log que existe, pero ese log es de otra corrida. ¿Qué chequeo lo detecta? A, P6, que comprueba que el log exista. B, volver a correr el procedimiento publicado. C, comparar el log con el hash registrado al momento de correr el paso. D, ninguno. Es la C. Es justo la mutación que acabas de correr.

[17:06] → E25 · pausa 5 s

Tercera: verify punto py imprime PASS, once casos coinciden con las clases prerregistradas. ¿Qué acabas de comprobar? A, que Lean volvió a compilar los once casos en tu máquina. B, que los registros publicados coinciden con sus recibos y que las clases recalculadas son las prerregistradas. C, que los once teoremas son verdaderos. D, que Comparator no tiene bugs. La B. El script mismo lo dice.

## Cierre

[17:37] → E26

Tres ideas para llevarte. Primera: Lean revisa que cada paso sea válido; cómo se compiló, si el enunciado es el pretendido, si coincide con Clay y si la evidencia es la real, eso es QA, y se puede hacer sin ser matemático. Segunda: un rechazo de Comparator significa que el enunciado cambió, no que sea falso, y un control que debe pasar es lo que te deja confiar en los rechazos. Tercera: un recibo solo vale si está atado al hash registrado cuando corrió el paso; mirar que el archivo exista no basta. En el siguiente módulo vamos a la prueba a ciegas: cómo preparar trampas que el que prueba no conoce, y sellarlas con un hash antes de entregar nada.

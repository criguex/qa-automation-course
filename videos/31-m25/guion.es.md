# Guion · 31 · m25 · Física de fluidos y estadística para el depurador

Voz en off: Cristian, primera persona · español de Colombia, tuteo · ~150 palabras/min · 2663 palabras de narración · duración estimada 18:00 (incluye pausas del quiz)

Cada bloque lleva su marca de tiempo y la escena que lo acompaña (→ E##). Los tiempos de `escenas.json` siguen este guion.

## Gancho

[00:00] → E01

Te muestro un falso positivo que me costó entender. Tengo un depurador que revisa si una red neuronal predice bien un fluido en 3D. Le paso la respuesta perfecta, la del solver exacto, la que por construcción no puede estar mal. Y en datos fuera de distribución la marca como mala en 21 de 210 pasos. En las tres máquinas, igual. No era un bug del solver ni de la red. Era el propio chequeo de energía, que no aguanta un fluido que se frena más rápido que los datos con los que lo calibré.

[00:38] → E02

Y hay otro detalle. La red, la que llamo P2, sale rechazada en el cien por ciento de los pasos de prueba. Suena a éxito del depurador. Pero cuando pregunto si el chequeo de momento, D3, ordena los pasos de peor a mejor, la correlación de Spearman da menos cero coma uno ocho cinco. Casi cero. D3 sabe que la red está mal, pero no sabe dónde está peor. Este módulo es para eso: entender qué ley vigila cada chequeo, por qué uno falla en falso y cómo decidir con números si una diferencia es real o es ruido.

## Explicado para un niño de 8 años

[01:18] → E03

Si tuvieras ocho años te lo diría así. El agua no se deja apretar: si llenas un globo de agua y lo estripas, cambia de forma, pero no se hace más pequeño. Y la energía no aparece de la nada: una pelota que rueda por el pasto se va frenando; si de pronto acelera sola, algo hizo trampa. Mi depurador es un árbitro que conoce ese reglamento. No sabe cuál es la respuesta correcta. Solo mira si la red neuronal respeta las reglas. Si alguien aprieta el globo, saca la tarjeta D1. Si la pelota acelera sola, saca la D2. Y si el movimiento no cuadra con cómo se empujan las partes del agua entre sí, saca la D3.

## Teoría · las tres leyes

[02:05] → E04

Vamos a la teoría. El sistema es pequeño a propósito: una caja periódica de 32 por 32 por 32, viscosidad cero coma cero cinco, sin forzamiento. La red recibe un estado del fluido, u cero, y predice el estado un paso después, u uno. Ese paso es de cero coma uno, que para el solver son diez pasitos de cero coma cero uno. El depurador revisa cada par con tres leyes. D1 es la incompresibilidad: la divergencia de la velocidad tiene que ser cero, y la mido como la norma de la divergencia dividida por la norma del gradiente. En palabras: lo que entra a un pedacito de fluido tiene que salir.

[02:50] → E05

D2 es el balance de energía. Sin forzamiento, la energía cinética solo puede bajar, y baja por la viscosidad, a un ritmo que es nu por la enstrofía, que mide cuánto gira el fluido. El chequeo compara la caída de energía que dio la red con la que exige esa ley, usando un trapecio sobre el paso. Y tiene una regla dura: si la energía sube, es una violación, sin discusión. D3 es la ecuación de momento: tomo el cambio de velocidad dividido por el paso y lo comparo con el lado derecho de Navier–Stokes, promediado al inicio y al final. Lo que sobra es el residuo. Si la red ignora la dinámica, ese residuo se dispara.

## Teoría · D4 juzga al juez

[03:37] → E06

Hay un cuarto número, D4, y aquí está la primera trampa conceptual. D4 es el error contra la referencia exacta: qué tan lejos quedó la predicción de la respuesta verdadera. Parece el mejor chequeo de todos, pero no es un chequeo del depurador. En uso real no tienes la respuesta exacta; si la tuvieras, no necesitarías la red. D4 existe solo dentro del experimento, para juzgar al depurador: me dice si cuando D1, D2 o D3 gritan, de verdad había un error. El diseño lo dice tal cual: D4 se usa solo para juzgar al depurador. Si lo metes como chequeo, te estás haciendo trampa a ti mismo.

## Teoría · los controles

[04:20] → E07

Para saber si el árbitro sirve, necesito jugadores cuyo comportamiento ya conozco. Esos son los controles. P0 es el solver exacto: control positivo, tiene que pasar. P0f32 es ese mismo resultado redondeado a float32, lo mejor que podría hacer una red que calcula en precisión simple; también tiene que pasar. P1 es la persistencia: devuelve el mismo estado, ignora la dinámica, y D3 lo tiene que atrapar. P2 es la red, un operador neuronal de Fourier. P3a le suma a la red un campo gradiente del cinco por ciento, que rompe la incompresibilidad, para D1. Y P3b multiplica la salida por uno coma cero cinco, que inyecta energía, para D2.

[05:04] → E08

Los umbrales se fijaron antes de que existiera el primer dato de prueba: diez veces el máximo que dan P0 y P0f32 en validación. Quedaron así: D1 en ocho coma tres por diez a la menos siete, D2 en tres coma tres por diez a la menos tres y D3 en cero coma cero ocho. En el split de prueba, cuatrocientos pasos por predictor, P0 y P0f32 salieron marcados cero de cuatrocientas veces, y P3a, P3b y P1 cuatrocientas de cuatrocientas, cada uno por su chequeo. Mac, WAR y GUERRA dieron la misma huella. Y ojo con la frase que guía todo el diseño: una red mala es un resultado aceptable; un depurador que no distingue los controles es un fracaso.

## Teoría · one-step contra rollout

[05:52] → E09

Ahora, una diferencia que cambia la conversación. En modo one-step, la red siempre arranca del estado verdadero y da un solo paso. En un rollout, la red usa sus propias respuestas, paso tras paso, y los errores se arrastran. En la ronda 1, con rollouts de diez pasos, la mediana de D4 subió de uno coma cero cinco por ciento en el primer paso a cuatro coma ocho en el décimo. Pero D1 y D3 se quedaron planos. Los chequeos ven que el rollout rompe la física en cada paso, pero no siguen cómo crece el error. Por eso las rondas siguientes probaron alarmas acumuladas en rollouts de veinte pasos.

[06:36] → E10

Y aquí está una de las cosas de las que más orgulloso estoy de este repo: una hipótesis que falló, publicada con su número. En la ronda 3, H14 proponía sumar los tamaños de error de cada paso para ordenar las trayectorias. Falló: en una de las cuatro redes la correlación media quedó en cero coma seis tres cinco, por debajo del criterio, y el comparador, la suma de D3, cumplió en tres de cuatro. Sumar tamaños no capturaba hacia dónde se arrastraba el error. En la ronda 4, transportar la dirección del defecto a lo largo del rollout sí ordenó el error en las cuatro redes. Fallar no se borra: se mide y se aprende.

## Teoría · estadística para no engañarte

[07:23] → E11

Pasemos a la estadística, que es la que te protege de engañarte. Spearman mide si dos variables se ordenan igual. No compara valores, compara rangos: pone los pasos en fila según D3, después según D4, y mira si la fila es la misma. Si el paso con más D3 también es el de más error, y así hacia abajo, la correlación se acerca a uno. Si no hay relación, se acerca a cero. Por eso el menos cero coma uno ocho cinco del comienzo es tan revelador: D3 marca todos los pasos de la red, pero su orden no tiene nada que ver con el error real. Dice que está mal, no dónde está peor.

[08:09] → E12

Segundo: el bootstrap por clusters. Para un intervalo de confianza remuestreas tus datos muchas veces. Pero los diez pasos de una trayectoria no son independientes; vienen del mismo fluido y se parecen entre sí. Si remuestreas pasos sueltos, el intervalo sale más angosto de lo que debería, y eso es engañoso. En predictor-debugger se remuestrean las cuarenta trayectorias completas, con reemplazo, dos mil réplicas, semilla fija. Tercero: Wilson. Si un juez acierta 27 de 29 casos, no reportes noventa y tres por ciento a secas. Es noventa y tres coma uno, con un intervalo de setenta y ocho a noventa y ocho. Con 29 casos, el intervalo es ancho, y hay que decirlo.

## Laboratorio

[08:54] → E13

Vamos al laboratorio. Primero clono predictor-debugger y corro el nivel más barato: re-aplicar los umbrales prerregistrados a las estadísticas guardadas, sin descargar datos. Todo va con uv run guion guion locked, que fija Python 3.9 y numpy 1.26.4 desde el lockfile. La salida que ves es la del log de Linux que está en el repo: H1 y H1b, cero de cuatrocientos; H2, H3 y H4, cuatrocientos de cuatrocientos; veredictos iguales a los guardados, y la huella E E C 9, cero 9 E 0, F 7 7 D. Si a ti te da otra huella con el mismo commit, eso es un hallazgo, y se reporta.

[09:37] → E14

Ahora leo el código, porque la ley tiene que estar escrita en algún lado. En pd barra checks punto py, D1 es literalmente k por la velocidad en Fourier, que es la divergencia, sobre la norma del gradiente. D2 es la energía final menos la inicial más nu por delta por la suma de enstrofías, todo sobre la energía inicial: el trapecio del que te hablé. D3 es el cambio en el tiempo menos el promedio del lado derecho. Y D4 está ahí, pero fíjate en la función flags: solo mira D1, D2 y D3, y añade la regla dura de que si E uno es mayor que E cero, D2 queda marcado. D4 no entra a la decisión.

[10:24] → E15

El ejercicio del módulo pide algo que casi nadie hace: escribir tus predicciones antes de correr. Voy a sabotear un par exacto de tres formas, como dice el kit de la ronda 5: energía por uno coma cero cinco, un gradiente agregado del cinco por ciento y una fase corrida, que es mover todo el campo una celda. Mi apuesta: la energía de más la marca D2, seguro, y probablemente D3. El gradiente lo marca D1. Y la fase corrida no cambia la divergencia ni la energía, así que solo la debería ver D3. Lo guardo con fecha y saco su hash. Ahora ya no puedo acomodar la predicción al resultado.

[11:09] → E16

Corro. El par exacto: nada marcado, y fíjate que D1 da seis por diez a la menos dieciséis, que es redondeo de máquina. Energía por uno coma cero cinco: D2 y D3, como aposté. Gradiente: D1 y D3. Fase corrida: solo D3, con un D3 de casi cuatro, y su D4 dice que la predicción quedó a treinta y siete por ciento de la verdad. Mis cuatro predicciones coinciden. Pero mira el D2 del gradiente: dos coma cuatro ocho por diez a la menos tres, contra un umbral de tres coma tres uno. No lo marcó, pero estuvo cerca. Ese tipo de margen es justo lo que vas a explorar en la mutación.

[11:54] → E17

Los otros dos ejercicios. Un ejemplo sintético: cuarenta trayectorias de diez pasos, donde cada trayectoria tiene su propio nivel. Si remuestreo pasos sueltos, el intervalo mide cero coma uno ocho de ancho. Si remuestreo trayectorias completas, mide cero coma cinco siete, más del triple. El de pasos además deja el cero por fuera, y te haría concluir que hay un efecto que no está. Y Wilson: corro la función de agent-eval-jev con 27 de 29 y me da de cero coma setenta y ocho a cero coma noventa y ocho, el mismo setenta y ocho a noventa y ocho que publica el repo. Si tu cuenta te da eso, vas bien.

## Mutación WAR de la semana

[12:38] → E18

La mutación de la semana: sabotea un par con energía por uno coma cero cinco y predice qué chequeo lo marca antes de correr. Ya lo hicimos; ahora voy más lejos y bajo la perilla. Por uno coma cero uno, detectado. Por uno coma cero cero uno, se escapa. Por uno coma cero cero cero uno, se escapa. Y fíjate en la columna E1 mayor que E0: la regla dura nunca se activa, porque aun con la energía de más, el fluido sigue perdiendo energía en el paso. La trampa no hace subir la energía; solo hace que baje menos de lo debido. Ese es el piso de detección de este chequeo con estos umbrales.

[13:24] → E19

Lo bonito es que esto ya está medido en el repo. En la ronda 3 hice un barrido de mutaciones graduadas sobre cada paso exacto. En distribución, el D2 de la ronda 1 empieza a ver inyecciones de energía de tres por diez a la menos tres; el D2 prima de la ronda 2, de tres por diez a la menos cuatro; y el D2 doble prima de la ronda 3 baja el piso a tres por diez a la menos seis, sin una sola marca sobre los controles. Ojo con la conversión: mi perilla multiplica la velocidad, y el barrido del repo mide el cambio de energía, que es más o menos el doble del porcentaje. Con esa cuenta, por uno coma cero cero uno queda debajo del primer piso y por uno coma cero uno, encima. Y la regla del kit vale aquí: lo que queda debajo del piso se reporta como no detectado. No se esconde.

## El reto y cómo se evalúa

[14:28] → E20

El reto. Entregas tres cosas: tus predicciones sobre D1, D2 y D3 con su verificación, la demo del bootstrap por clusters y el Wilson recalculado. Los criterios se comprueban, no se opinan. Uno: tus predicciones están escritas antes de correr, y coinciden con el depurador o explicas por qué no. Un hash con fecha o un commit lo demuestran. Dos: explicas por qué D4 no es un chequeo del depurador. Tres: tu Wilson para 27 de 29 da aproximadamente setenta y ocho a noventa y ocho. Cuatro: si concluyes que A es mejor que B, te apoyas en intervalos, no en el punto. Una predicción que falló, bien explicada, también aprueba.

[15:12] → E21

La rúbrica tiene cuatro niveles. Uno, no cumple: falta el entregable o no corre. Dos, en camino: corre, pero falla al menos un criterio. Tres, aprobado: cumple todos los criterios. Cuatro, sobresaliente: cumple todo y además el extra del módulo, que aquí es concluir en tu propio proyecto si A es mejor que B con intervalos por clusters. Por ejemplo, dos versiones de una suite, dos modelos o dos configuraciones, con la unidad independiente bien elegida. El módulo lo apruebas con el quiz en seis de ocho o más y el reto en el nivel tres.

## Mini-quiz

[15:51] → E22 · pausa 5 s

Mini-quiz. Pausa el video si quieres pensarlo con calma. Primera: ¿por qué D4 no es un chequeo del depurador? A, porque es lento. B, porque compara contra la referencia exacta, que en uso real no existe. C, porque falla siempre. D, sí lo es. La respuesta es la B: el diseño lo separa; D4 mide al depurador, no lo reemplaza.

[16:20] → E23 · pausa 5 s

Segunda: ¿por qué bootstrap por trayectorias y no por pasos? A, es más rápido. B, porque los pasos de una trayectoria dependen entre sí, y remuestrear pasos da intervalos más estrechos y engañosos. C, por moda. D, no hay diferencia. Es la B. Se remuestrea la unidad independiente, no sus pedazos. Lo acabas de ver en la terminal.

[16:48] → E24 · pausa 5 s

Tercera: 27 aciertos de 29. ¿Cómo lo reportas? A, noventa y tres por ciento. B, noventa y tres coma uno por ciento, con intervalo de Wilson de setenta y ocho a noventa y ocho. C, cien por ciento. D, casi todo. La B. Con 29 casos el intervalo es ancho, y hay que decirlo.

## Cierre

[17:15] → E25

Me quedo con tres ideas. Primera: cada chequeo vigila una ley concreta, y si sabes cuál, puedes predecir qué va a marcar antes de correr. Segunda: D4 juzga al juez; el depurador decide sin la respuesta, y por eso hay que probarlo con controles que sabes que deben pasar y otros que deben fallar. Tercera: una diferencia sin intervalo es una opinión, y el intervalo solo vale si remuestreas la unidad independiente. Y recuerda el alcance: una caja periódica de 32³ no dice nada sobre turbulencia real ni sobre el problema del Milenio. En el siguiente módulo cambiamos de guardia: vamos a verificar una prueba formal en Lean sin ser matemáticos. Nos vemos allá.

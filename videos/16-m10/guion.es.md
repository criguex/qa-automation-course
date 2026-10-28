# Guion ES · Módulo 16 · m10 — Performance y Cloud (k6 · JMeter · AWS)

_Palabras de narración: 2473 · duración estimada 16:29 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña. Las líneas que empiezan con `>` son notas de producción y no se narran.

## [00:00] → E01 · Gancho

En civica-playwright-challenge hay una suite de rendimiento que pasa en cada corrida de CI. Cuatro páginas, cuatro pruebas en verde. Si alguien la mira rápido, concluye: "IMDb carga rápido".

Error. Esas pruebas corren contra un mock en proceso, sin red. Y el propio archivo lo dice en su comentario: los números sirven para atrapar una regresión que vuelve una página patológicamente lenta de parsear o pintar, no para medir el rendimiento real de red. Los presupuestos son de cuatro y cinco segundos, holgados a propósito.

Está bien hecha y dice qué mide. El error sería leerla como otra cosa. Hoy aprendes a medir rendimiento de verdad y a leer los números sin engañarte.

## [00:45] → E02 · Título

Módulo dieciséis: performance y cloud, con k6, JMeter y AWS. Primero "hace lo correcto", después "lo hace bien bajo presión" y "en la nube". Vamos a leer percentiles, no solo pasó o falló, y a validar servicios serverless con sus rarezas.

## [01:02] → E03 · Explicado para un niño de 8 años

Piensa en el ascensor de un edificio. Una cosa es que funcione cuando se sube una sola persona. Otra muy distinta es que funcione cuando se suben veinte, a las siete de la mañana, todos con afán.

Con una persona, el ascensor sube, abre la puerta y listo. Con veinte, puede que tarde más, que la puerta se demore en cerrar o que de pronto diga "exceso de peso" y no arranque.

Una prueba de carga es meter a los veinte a propósito, con un cronómetro en la mano, para saber antes del lunes cómo se va a portar. Y no basta con saber cuánto tardó en promedio. Te interesa cuánto esperó el que más esperó, porque ese es el que se queja.

## [01:51] → E04 · Teoría 1: tipos de prueba de rendimiento

Hay cuatro tipos que tienes que distinguir.

Load, o carga: el tráfico que esperas en un día normal o en un pico conocido. ¿Aguanta lo que tiene que aguantar?

Stress: subes la carga poco a poco, más allá de lo normal, hasta encontrar el punto donde el sistema empieza a degradar. Por eso se sube gradual, con ramp-up: si golpeas con todo de entrada, sabes que se cae, pero no cuándo. El valor del stress está en la curva.

Soak, o resistencia: carga sostenida durante horas. Por ejemplo, seis horas de tráfico normal. Revela fugas de memoria y degradación lenta que un test de cinco minutos jamás ve.

Y spike: un salto brusco de usuarios, como cuando sale un anuncio en televisión.

## [02:40] → E05 · Teoría 2: métricas y percentiles

Las métricas básicas son latencia, throughput, que es cuántas peticiones procesas por segundo, y la tasa de errores.

Con la latencia viene la trampa del promedio. Imagina un p95 de 180 milisegundos con un promedio de 90. ¿Qué quiere decir? Que el cinco por ciento de las peticiones tarda más de 180. El promedio esconde la cola, y tus usuarios más molestos viven en la cola. Por eso medimos p95 y p99.

Y para hablar de objetivos, dos siglas. SLI es la métrica que mides, por ejemplo el p95 real. SLO es el objetivo sobre esa métrica: p95 por debajo de 300 milisegundos el 99 por ciento del tiempo. Primero defines qué mides y después cuánto es aceptable. Los thresholds de k6 que vamos a ver son SLOs ejecutables. Si tu SLO dice p95 por debajo de 300 milisegundos, tu threshold dice exactamente eso, en el script, y se evalúa en cada corrida.

## [03:41] → E06 · Código: un p95 sobre 20 muestras

Ahora un ejemplo real, en restful-booker-quality-suite, en tests barra performance barra api.performance.spec.ts.

La prueba se llama "health check p95 stays below 500 ms across 20 samples". Hace veinte peticiones al endpoint ping y guarda la duración de cada una. En cada vuelta comprueba que la respuesta sea 201. Sí, 201 y no 200: así responde ese sistema, y el reporte de defectos lo deja como punto por aclarar, no como bug.

Después ordena las veinte duraciones y toma la posición que da el techo de veinte por cero punto noventa y cinco, menos uno. O sea, la muestra diecinueve de veinte. Y exige que esté por debajo de 500 milisegundos.

Fíjate en el criterio del curso: el presupuesto de p95 tiene que estar justificado con datos, por ejemplo veinte muestras. Con una sola petición no tienes percentil, tienes una anécdota.

Y justo en el mismo archivo está el contraste. La segunda prueba, "booking list responds below 1 second", hace una sola petición a la lista de reservas y exige menos de mil milisegundos. Sirve para atrapar algo grosero, como una lista que de pronto tarda diez segundos. Pero no te dice nada de la cola. Las dos pruebas conviven, y cada una dice lo que mide.

## [05:03] → E07 · Terminal: lo que dejó la corrida

¿Y pasó? El archivo de evidencia del 16 de octubre de 2026 dice que el comando fue npm run quality. Prettier, ESLint y TypeScript en PASS. Playwright corrió 43 chequeos en dos segundos, en los proyectos api, contract y performance. Los 43 pasaron, incluidos nueve que son fallas esperadas y controladas de defectos conocidos. Y el reporte de ejecución dice, en la fila de Performance: health p95 below 500 ms and booking list below 1 second, Passed.

Ojo con lo que esto prueba y lo que no. Es una prueba de presupuesto: peticiones una tras otra, desde un solo cliente, contra un contenedor local. Atrapa una regresión fuerte. No es una prueba de carga.

## [05:49] → E08 · Código: thresholds en k6

Para carga de verdad, k6. Lo que más me gusta de k6 es dónde vive el criterio de pasa o falla: en el script, en los thresholds.

Este es el ejemplo de la documentación oficial de k6. En options, thresholds: http_req_failed con rate menor a cero punto cero uno, o sea, menos del uno por ciento de errores. Y http_req_duration con p de 95 menor a 200, es decir, el 95 por ciento de las peticiones por debajo de 200 milisegundos. La función por defecto hace un get a una página de demo.

La sintaxis de cada threshold tiene tres partes: un método de agregación, un operador y un valor. La documentación trae más ejemplos: avg menor a 200 para el promedio, count mayor o igual a 500 para un conteo, p de 90 menor a 300 para otro percentil. Puedes poner varios sobre la misma métrica.

Y lo clave, también de la documentación: si un threshold falla, la prueba termina con estado fallido y k6 sale con un código distinto de cero. Eso significa que tu pipeline se pone rojo solo, sin que nadie tenga que mirar un dashboard e interpretar. Sin thresholds, una prueba de carga es una opinión. Con thresholds es una prueba de verdad.

## [07:12] → E09 · Teoría 3: k6 2.x y los tutoriales viejos

Un aviso práctico. k6 2.x, en 2026, limpió lo deprecado. Ya no existen los comandos k6 pause, resume, scale ni status, ni el executor externally-controlled. Para la nube, el comando es k6 cloud run y el nombre del script.

Si encuentras un tutorial viejo que usa esos comandos, no lo copies tal cual. Tradúcelo a executors que sí existen: ramping-vus si quieres subir usuarios virtuales por etapas, o constant-arrival-rate si quieres un número fijo de peticiones por segundo sin importar cuánto tarde cada una.

Y JMeter sigue siendo una opción muy usada, sobre todo en equipos que ya lo tienen. El manual oficial está en los recursos. La idea es la misma: el criterio de pasa o falla tiene que quedar escrito, no en el ojo de quien mira.

## [08:04] → E10 · Teoría 4: leer resultados sin engañarte

Ahora, leer. Tres patrones que vas a ver.

Primero: subes los usuarios virtuales, el throughput se estanca y la latencia sigue estable. Eso no es "todo bien". El sistema saturó un cuello, un pool de conexiones, la CPU o los workers, y procesa lo mismo aunque le pidas más.

Segundo: sube la tasa de errores, pero la latencia de los que sí responden se mantiene. Lo más probable es un recurso con límite duro rechazando el excedente: un rate limit, un pool lleno o una cola saturada. Responde rápido a unos y descarta al resto.

Tercero: corres la carga en un staging con la mitad de recursos que producción. Puedes concluir tendencias y regresiones relativas, si este release es más lento que el anterior. Los números absolutos de producción, no.

Y por eso conectas k6 con Grafana: el resumen final no te dice cuándo pasó cada cosa. La serie de tiempo sí. Un p95 de 800 milisegundos no te dice si fue constante o si fue un pico en el minuto doce. Con latencia, errores y usuarios virtuales en el mismo eje de tiempo, ves el porqué.

## [09:18] → E11 · Teoría 5: serverless y cold starts

En la nube, el caso especial es serverless, por ejemplo AWS Lambda. Las funciones se disparan por eventos, y tienen una rareza: el cold start.

La primera petición a una Lambda tarda tres segundos. Las siguientes, 120 milisegundos. ¿Es un bug? No. Es física del serverless: la primera vez hay que levantar el entorno. Tu trabajo es decidir si el SLO lo tolera, incluirlo en la medición, y si hace falta, validar la mitigación.

Para validar de punta a punta, sigues una transacción con trazas. En AWS, con CloudWatch Logs Insights: buscas la petición, ves por qué funciones pasó y cuánto tardó en cada una. Un "200 OK" en la entrada no prueba que el evento terminó bien tres funciones más allá.

Y eso es lo que hace distinto probar algo dirigido por eventos. En una API clásica, la respuesta es el final de la historia. En serverless, muchas veces la respuesta solo dice "recibí tu pedido", y el trabajo de verdad pasa después, en otra función, a veces segundos más tarde. Tu prueba tiene que esperar ese resultado final y comprobarlo, no quedarse con el primer código de estado.

## [10:34] → E12 · Código: accesibilidad sin flaky

El módulo también te pide sumar accesibilidad y regresión visual sin volver flaky la suite. Los dos ejemplos son de civica.

Accesibilidad con axe-core, en tests barra mock barra accessibility.mock.spec.ts. Corre contra el mock determinista, en cuatro páginas, con las etiquetas wcag2a y wcag2aa. Y solo bloquea las violaciones serious y critical, las que de verdad frenan a alguien que usa tecnología asistiva. El comentario del archivo lo explica: es una barra pragmática y no flaky para una suite de UI.

Si exiges cero violaciones de cualquier nivel desde el día uno, vas a terminar apagando la prueba. Empieza por lo que bloquea y sube la barra después.

Y corre en el CI. En la tabla del README, accesibilidad aparece como parte de la suite mock. En la corrida 38665514760 del 15 de octubre, la suite mock pasó sus 19 pruebas, y las de rendimiento y visual, cuatro cada una.

## [11:34] → E13 · Código: regresión visual con baselines de Linux

La regresión visual, en tests barra visual barra pages.visual.spec.ts. Cuatro páginas, captura de página completa con toHaveScreenshot, y una tolerancia: maxDiffPixelRatio de cero punto cero dos.

La regla de oro: las baselines se generan en el mismo sistema que usa el CI. Playwright nombra las capturas por sistema operativo, y en el repo solo están las de Linux, generadas dentro del Dockerfile. Una baseline tomada en macOS no la recoge el CI.

Y para cerrar el círculo con el gancho, el presupuesto de rendimiento de civica en navigationTiming.performance.spec.ts: lee el Navigation Timing del navegador y exige domContentLoaded por debajo de cuatro mil milisegundos y el evento load por debajo de cinco mil. Holgado a propósito, contra un mock.

## [12:22] → E14 · Laboratorio paso a paso

Tu turno. Paso uno: escribe un test de carga en k6 contra un endpoint, con thresholds. Arranca con los dos del ejemplo oficial, errores por debajo del uno por ciento y p95 por debajo de un valor que puedas justificar, y córrelo con k6 run y el nombre de tu script.

Paso dos: interpreta el resultado. p95 y p99, la tasa de errores y el throughput. Escribe qué te dice cada uno, con los patrones que vimos.

Paso tres: valida de punta a punta una Lambda y rastrea una transacción en CloudWatch, desde el evento de entrada hasta el último log.

Para el informe, te sugiero una estructura simple. Arriba, el entorno: qué endpoint, qué versión, qué fecha y con cuántos recursos. Después una tabla con p95, p99, tasa de errores y throughput, y al lado el threshold de cada uno con su resultado. Y al final, en dos o tres frases, qué concluyes y qué no puedes concluir. Si corriste en un staging más chico que producción, lo escribes ahí.

Para el checklist serverless, piensa en lo que vimos: ¿mediste el cold start aparte de las peticiones calientes? ¿Seguiste la transacción de punta a punta en las trazas? ¿Comprobaste el resultado final y no solo la respuesta de entrada?

El entregable: el script de k6 con thresholds, un informe de performance y un checklist de validación serverless.

## [13:53] → E15 · Mutación WAR de la semana

La mutación de esta semana es contra la realidad del sistema. Mete latencia o un 503 a propósito y comprueba que tus thresholds de k6 fallan.

Antes de correrla, escribe la predicción: ¿qué threshold debería romperse? Si metes latencia, el de http_req_duration. Si metes un 503, el de http_req_failed. Después corres y miras dos cosas: que el threshold salga en rojo y que k6 salga con un código distinto de cero.

Si metiste un 503 y la corrida salió verde, tu threshold no tenía dientes. Ese es el hallazgo.

¿Cómo metes la falla? Contra un servicio que tú controles: tu propio endpoint de pruebas, un mock o un contenedor local, nunca contra un sistema ajeno ni contra producción. Haz una sola ruptura por corrida, para saber cuál threshold la notó. Y guarda la salida de las dos corridas, la sana y la rota, una al lado de la otra.

## [14:52] → E16 · El reto y cómo se evalúa

Los criterios son tres y se pueden comprobar. Uno: los thresholds de k6 hacen fallar la corrida cuando se superan. Dos: el presupuesto de p95 está justificado con datos, por ejemplo con veinte muestras como en restful-booker. Tres: las baselines visuales se generan en el mismo sistema que usa el CI.

El nivel más alto: inyectas latencia o un 503 a propósito y muestras que tus thresholds fallan. Con la salida del comando y el exit code.

## [15:23] → E17 · Mini-quiz

Tres preguntas. Pausa si quieres.

Primera: p95 de 180 milisegundos y promedio de 90. ¿Qué significa? Que el cinco por ciento de las peticiones tarda más de 180. El promedio esconde la cola.

Segunda: ¿dónde vive el criterio de pasa o falla de un test de k6 bien hecho? En los thresholds del script. El test falla solo, sin interpretación manual.

Tercera: la primera petición a una Lambda tarda tres segundos y las siguientes 120 milisegundos. ¿Qué es? Cold start. Lo incluyes en el SLO o validas una mitigación.

## [15:59] → E18 · Cierre

Tres ideas. Uno: mira percentiles, no promedios. Dos: el criterio de pasa o falla va en thresholds, para que el pipeline se ponga rojo solo. Tres: cada prueba de rendimiento dice qué mide; un presupuesto contra un mock no es una prueba de carga.

En el siguiente módulo atacamos otra fuente de rojos que no son tuyos: los terceros y las IAs que cambian de respuesta. Determinismo, mocks y grabaciones indexadas por hash. Nos vemos allá.

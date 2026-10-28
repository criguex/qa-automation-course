# Guion ES · Módulo 30 · m24 — Controles, arnés y mutación numérica

_Palabras de narración: 2554 · duración estimada 17:02 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña.

## [00:00] → E01 · Gancho

En una copia de mi propio estudio le quité una guardia al runner de pruebas: la que revisa que el oráculo devuelva números de verdad. Después hice que el oráculo devolviera NaN en cada mutante. Resultado: cuarenta y ocho mutantes salieron KILLED, muertos, con oracle_valid true. Cuarenta y ocho victorias falsas. Los mutantes no murieron porque las pruebas los atraparon. Murieron porque el oráculo estaba roto y el runner no se dio cuenta. Y esto no es un ejemplo inventado: el runner real del estudio llegó a hacer exactamente eso, y está publicado como hallazgo número ocho.

## [00:39] → E02 · Título

Este es el módulo treinta: controles, arnés y mutación numérica. Contrato congelado y oráculo independiente. Trabajamos con la parte numérica de scientific-qa-evidence, la pista uno de war-paradigm: simulaciones físicas pequeñas que rompemos a propósito para ver si las pruebas lo notan. Antes de confiar en un experimento, pruebo el experimento.

## [00:59] → E03 · Explicado para un niño de 8 años

Antes de usar una balanza, pesas algo que ya sabes cuánto pesa. Por ejemplo, un paquete de arroz de un kilo. Si la balanza dice un kilo, bien. Si dice tres, el problema no es el arroz: es la balanza.

Y si pesas una piedra y la balanza no muestra ningún número, solo una rayita, no puedes decir que la piedra pesa cero, ni que pesa mucho. Solo puedes decir que la balanza no funcionó.

En las pruebas pasa lo mismo. El paquete de arroz es el control. La balanza es el arnés. Y la rayita es el NaN: cuando aparece, no hay veredicto.

## [01:40] → E04 · Teoría 1: controles positivos y negativos

Empecemos por los controles. Un control positivo es lo que debe pasar: el solver exacto, el caso limpio. Sirve para comprobar que el chequeo no grita en falso. Un control negativo es un caso saboteado, uno de cada tipo, que debe fallar. Sirve para comprobar que el chequeo detecta.

Si tu experimento no tiene los dos, no sabes qué estás midiendo. Una suite que nunca falla puede ser perfecta o puede estar dormida. El control negativo es lo que te dice cuál de las dos.

## [02:14] → E05 · Teoría 2: prueba el arnés

Ahora el paso que casi nadie da: probar el arnés, el código que corre las pruebas y decide los veredictos. El curso pide tres propiedades. Una: una baseline inválida bloquea a sus mutantes; si el caso limpio no pasa, ningún mutante de ese caso puede contar como muerto. Dos: NaN nunca es PASS. Tres: una excepción del oráculo no es un mutante muerto.

Fíjate que las tres dicen lo mismo de distintas formas. Un mutante muerto tiene que ser una prueba que detectó algo, no un accidente del arnés.

## [02:50] → E06 · Teoría 3: el hallazgo ocho

En FINDINGS punto md de scientific-qa-evidence hay ocho hallazgos. El número ocho dice: el runner numérico reportaba oracle_valid true cuando el oráculo había lanzado una excepción o devuelto NaN. ¿Qué elemento del protocolo lo atrapó? Probar el arnés de pruebas, inyectando fallas en el oráculo y en el simulador.

Y el mismo archivo lo dice sin rodeos: los hallazgos uno, tres y ocho fueron defectos del propio trabajo anterior del estudio, atrapados por pasos posteriores del mismo protocolo y corregidos en público. Ese runner era mío. Por eso hoy tiene pruebas de sí mismo.

## [03:28] → E07 · Teoría 4: el contrato congelado

La segunda pieza es el contrato, CONTRACT punto md, congelado antes de cualquier corrida. La tolerancia es diez a la menos seis, en error absoluto normalizado por la escala física declarada de cada salida. Se fija antes de correr y no se mueve.

Y la regla más importante: el oráculo no comparte solver con la implementación. El sistema bajo prueba está en sut punto py y los oráculos en oracles punto py, y no comparten la ecuación del lado derecho, ni el solver, ni la función de solución. Por ejemplo, para el circuito RC, el sistema bajo prueba integra con Runge-Kutta de cuarto orden, y el oráculo usa la fórmula cerrada con la exponencial. Para Snell, uno usa arcoseno y el otro bisección. ¿Por qué tanto cuidado? Porque si el oráculo comparte el solver, comparte sus errores, y no los detecta nunca.

El contrato también fija el resto de las condiciones. No hay azar, así que no hay semilla. Solo se usa la biblioteca estándar de Python. Hay que darle al runner una carpeta de salida nueva, y si ya existe, aborta sin escribir. Guarda cada fila de observación, un JSON por variante, los tiempos, los códigos de salida y el SHA-256 de las fuentes, del contrato y de los artefactos. Y prohíbe guardar hostnames, direcciones IP o rutas privadas en un paquete publicable.

## [04:57] → E08 · Teoría 5: cómo se clasifica

La clasificación también está escrita en el contrato y en la función classify_variant del runner. Una baseline pasa solo si su salida es finita, cumple los invariantes del modelo y su error está dentro de la tolerancia. Si no, es BASELINE_INVALID. Una baseline inválida bloquea a sus mutantes: salen BLOCKED_BASELINE, nunca KILLED. Un mutante es KILLED solo si su baseline pasó y el mutante no es finito, viola un invariante o se sale de la tolerancia. Si no, es SURVIVED. Y si el oráculo no es finito o el largo del vector no coincide, el resultado es INCONCLUSIVE, nunca KILLED.

El contrato tiene una frase que me gusta: nunca fuerces a un mutante a morir. Una mutación diminuta puede sobrevivir, y eso es un resultado válido de calibración, no un falso negativo que haya que reclasificar.

## [05:52] → E09 · Teoría 6: la campaña

La campaña: nueve modelos físicos sintéticos. Circuito RC, enfriamiento de Newton, cinética química de segundo orden, atenuación de Beer-Lambert, respuesta logística, refracción de Snell, lente delgada, interfaz acústica y respuesta de Fechner. Cada modelo tiene tres configuraciones, y cada configuración una baseline y dos mutantes conocidos. Eso da ochenta y una variantes, más tres calibraciones del RC: ochenta y cuatro.

Resultado por máquina: veintisiete PASS, cincuenta y cuatro KILLED y tres SURVIVED. Igual en macOS arm sesenta y cuatro y en Linux x86 sesenta y cuatro, con una diferencia escalada máxima entre máquinas de uno punto uno uno por diez a la menos dieciséis. Y ojo con cómo se cuenta: son ochenta y cuatro variantes pareadas, no ciento sesenta y ocho casos distintos.

Además del error contra el oráculo, cada modelo tiene invariantes físicos. El RC se queda dentro del intervalo entre la fuente y el valor inicial, y la carga es monótona. La concentración química es positiva y no crece. En la interfaz acústica se revisa el balance de energía: R al cuadrado más Z uno sobre Z dos por T al cuadrado tiene que dar uno. Y el contrato avisa que la conservación de energía sola no basta si se viola una condición de borde.

## [07:14] → E10 · Teoría 7: casos no son comportamientos

Dos detalles de honestidad. Primero, los cincuenta y cuatro KILLED cuentan casos, no comportamientos. Dos mutantes acústicos, pressure_boundary_sign e impedance_swap, dan salidas idénticas en las tres configuraciones. Eso deja cincuenta y un comportamientos eliminados distintos. Si reportas cincuenta y cuatro como si fueran cincuenta y cuatro defectos diferentes, estás inflando el número.

Segundo, los tres sobrevivientes son un cambio de la constante de tiempo del RC deliberadamente diminuto, de cinco por diez a la menos ocho relativo, frente a una tolerancia de diez a la menos seis. Se deja visible a propósito. El kill rate es cincuenta y cuatro sobre cincuenta y siete, más o menos noventa y cinco por ciento, y los tres que sobreviven están en la tabla.

Y un tercer detalle. En la campaña aparecen dieciocho valores no finitos. Vienen del mutante rhs_sign en las tres configuraciones de cinética química de segundo orden. Ahí el NaN no es una falla de infraestructura: es la respuesta esperada de un mutante, y por eso esos casos son KILLED después de que su baseline pasó. La diferencia con el hallazgo ocho es dónde aparece el NaN. En la salida del sistema bajo prueba, mata al mutante. En el oráculo, invalida la medición.

## [08:35] → E11 · Laboratorio: las pruebas del arnés

Vamos a la terminal. Entra a evidence barra numerical barra source de scientific-qa-evidence y corre python3 guion m unittest guion v test_runner. Solo necesitas la biblioteca estándar de Python.

Siete pruebas, todas OK. Excepción del oráculo marca el oráculo como inválido. Excepción del sistema bajo prueba mantiene el oráculo válido. Excepción en un mutante es inconclusa, no muerta. Oráculo NaN con excepción del sistema, inconcluso y oráculo inválido. Oráculo NaN solo, inconcluso y oráculo inválido. Falla del oráculo durante la exportación marca la colección como incompleta. Y volver a correr reproduce la campaña guardada: veintisiete, cincuenta y cuatro y tres.

Esa última prueba es la que conecta con el módulo de evidencia. El resumen guardado de la campaña en el Mac dice el comando exacto, python3 runner punto py guion guion out con una carpeta nueva, una sola invocación de proceso, ochenta y cuatro evaluaciones y una duración de cuatro centésimas de segundo. Y la comprobación tres de verificar punto py, volver a correr las ochenta y cuatro variantes numéricas, es exactamente esta suite.

## [09:45] → E12 · Código: cómo se inyecta un NaN

¿Cómo se inyecta un oráculo roto sin tocar el código? Con mock punto patch. La prueba test_nan_oracle_alone reemplaza oracles punto evaluate por una función que devuelve cuatro NaN, corre la baseline del primer caso y exige dos cosas: que el estado sea INCONCLUSIVE y que oracle_valid sea falso.

Y una observación que vale para tu reto. El curso habla de tres pruebas del arnés: baseline inválida, NaN y excepción del oráculo. En test_runner hay pruebas para el NaN y para las excepciones, pero no encontré una prueba dedicada a que una baseline inválida bloquee a sus mutantes. La regla está en el contrato y en el código del runner, pero ninguna de las siete pruebas la ataca directamente. Esa la vas a escribir tú.

## [10:34] → E13 · Terminal: toda la campaña con un oráculo NaN

El laboratorio pide inyectar un oráculo NaN y comprobar que nunca da PASS ni KILLED. Escribí un script corto que corre las ochenta y una variantes de baseline y mutantes, sin las tres calibraciones del RC, primero con el oráculo real y después con el oráculo reemplazado por NaN.

Con el oráculo real: veintisiete PASS y cincuenta y cuatro KILLED, como en la campaña. Con el oráculo NaN: veintisiete INCONCLUSIVE y cincuenta y cuatro BLOCKED_BASELINE. Cero PASS, cero KILLED. Las baselines quedan inconclusas porque el oráculo no es finito, y los mutantes quedan bloqueados porque su baseline no pasó. Las dos defensas funcionan juntas.

Ese script no está en el repo: es mío, del laboratorio, y lo dejo completo en pantalla para que lo copies. Usa el mismo mock punto patch que las pruebas del arnés, así que no cambia ni una línea del runner. Lo único que cambia es lo que el oráculo responde.

## [11:36] → E14 · Mutación WAR: quitar la guardia del oráculo

Ahora la mutación de la semana, en una copia. Abro runner punto py, dentro de run_variant, y quito la guardia que revisa que el oráculo sea finito. Son dos lugares: el if que marca oracle_invalid cuando el valor esperado no es finito, y la parte de "o no es finito" en la comparación de largos. Queda solo la comparación de largos.

Antes de correr, escribe tu predicción. ¿Fallan las pruebas del arnés? ¿Qué pasa con una campaña donde el oráculo devuelve NaN en todo? ¿Y si el oráculo solo se rompe en los mutantes?

## [12:14] → E15 · Terminal: lo que pasa sin guardia

Primero las pruebas: python3 guion m unittest test_runner. Siete corren, dos fallan: las dos del oráculo NaN. Bien, el arnés tiene quien lo cuide.

Ahora el oráculo NaN en toda la campaña. Veinticuatro BASELINE_INVALID, cincuenta y cuatro BLOCKED_BASELINE y tres INCONCLUSIVE. Cero KILLED, porque la regla de baseline inválida los bloquea. Pero mira la etiqueta: BASELINE_INVALID le echa la culpa al sistema bajo prueba, cuando el roto es el oráculo. El veredicto es seguro, pero miente sobre la causa.

Y el caso peligroso: el oráculo bien en las baselines y NaN solo en los mutantes. Con el runner original, los cincuenta y cuatro mutantes salen INCONCLUSIVE. Sin la guardia, cuarenta y ocho salen KILLED con oracle_valid true, y seis INCONCLUSIVE, solo porque los modelos acústicos devuelven ocho valores y mi oráculo falso devolvía cuatro. Cuarenta y ocho muertes falsas. Ese es el hallazgo ocho, reconstruido a mano.

## [13:13] → E16 · Lo que deja la mutación

¿Qué aprendo? Tres cosas. Uno: las defensas en capas existen por algo. La regla de baseline inválida salvó la campaña cuando el oráculo se rompía en todo, pero no cuando se rompía solo en los mutantes. Dos: la guardia del oráculo sí tiene pruebas, y por eso la mutación no pasó en silencio: dos pruebas en rojo. Tres: un kill rate alto no prueba nada si no sabes que el oráculo estaba vivo. Antes de celebrar un noventa y cinco por ciento, pregunta cuántas de esas muertes vienen de un oráculo válido.

Y un ejemplo más de cómo se ve un error propio bien reportado, del mismo estudio. El contrato está en la versión uno punto uno, y su primera línea dice por qué: corrección de la exportación a CSV, con los criterios y los modelos sin cambios. En la versión uno, el exportador escribía solo cuatro valores escalares de la interfaz acústica, aunque el JSON guardaba cuatro pares repetidos de presión reflejada y transmitida. La versión dos etiqueta cada componente y exporta todo: el CSV pasó de setecientas veinte a setecientas cincuenta y seis filas por máquina. Los valores, parámetros y clasificaciones de las ochenta y cuatro variantes quedaron idénticos, y el registro lo dice. Eso es lo que quiero que copies: el error, la corrección y lo que no cambió, todo escrito.

## [14:42] → E17 · El reto y cómo se evalúa

Tu reto tiene tres partes. Una: corre las pruebas del arnés. Dos: inyecta un oráculo que devuelva NaN y comprueba que nunca da PASS ni KILLED. Tres: agrega un décimo modelo sencillo, caída libre con arrastre lineal, con su oráculo analítico, dos mutantes conocidos y uno cerca del umbral. El oráculo tiene que ser independiente: si el sistema integra la ecuación paso a paso, el oráculo usa la solución cerrada.

Así se evalúa. Tu arnés tiene las tres pruebas, baseline inválida, NaN y excepción del oráculo, y las tres pasan. Ya viste que la de baseline inválida no está en el repo: escríbela. El NaN inyectado nunca sale PASS ni KILLED. La tabla separa casos de comportamientos distintos. Y si el mutante cerca del umbral sobrevive, se reporta SURVIVED sin bajar la tolerancia. La tolerancia se congela antes, y no se toca después de ver el resultado.

El nivel más alto: tu tabla separa casos de comportamientos y explica cuáles mutantes son equivalentes, como los dos acústicos del repo.

## [15:50] → E18 · Mini-quiz

Tres preguntas. Pausa en cada una.

Primera. El oráculo devuelve NaN. ¿Veredicto correcto? Ni PASS ni KILLED: el oráculo es inválido.

Segunda. El oráculo lanza una excepción en un mutante. ¿Cuenta como KILLED? No: una excepción del oráculo no es un mutante muerto.

Tercera. Ochenta y cuatro variantes: veintisiete PASS, cincuenta y cuatro KILLED y tres SURVIVED. ¿Kill rate? Cincuenta y cuatro sobre cincuenta y siete, más o menos noventa y cinco por ciento. Los PASS son las baselines, y no entran en la cuenta de mutantes.

## [16:25] → E19 · Cierre

Tres ideas. Primera: todo experimento lleva un control que debe pasar y controles que deben fallar, uno de cada tipo. Segunda: el arnés también se prueba; NaN nunca es PASS, una excepción del oráculo no es un mutante muerto y una baseline inválida bloquea a sus mutantes, y cada una de esas reglas necesita su propia prueba. Tercera: congela la tolerancia antes, usa un oráculo que no comparta solver, y deja a la vista lo que sobrevive.

En el siguiente módulo: física de fluidos y estadística para el depurador. Nos vemos allá.

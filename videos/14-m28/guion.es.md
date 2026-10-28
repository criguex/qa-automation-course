# Guion ES · Módulo 14 · m28 — Pipelines: anatomía, gates, qué significa un verde y pipelines de evidencia

_Palabras de narración: 2606 · duración estimada 17:37 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña. Las líneas que empiezan con `>` son notas de producción y no se narran.

## [00:00] → E01 · Gancho

15 de octubre de 2026. Subo un cambio a restful-booker-quality-suite y el CI se pone rojo. Abro el log. Ninguna prueba falló: ni siquiera corrieron.

Lo que falló fue el paso npm run format:check, con Prettier: "Code style issues found in 112 files". El workflow clona el sistema bajo prueba dentro de la carpeta del repo. Tres minutos después, el siguiente commit agregó una línea a punto prettierignore: "Exclude cloned target from quality gates". Verde. Al otro día, rojo otra vez, por dos archivos.

El gate barato lo atrapó antes que las suites. Hoy aprendes a leer un pipeline: qué corrió, qué se saltó y si bloquea algo.

## [00:43] → E02 · Título

Módulo catorce: pipelines. Anatomía, gates, qué significa un verde y pipelines de evidencia. Vamos a leer cinco workflows reales de mis repos, vas a armar uno con tres gates encadenados y después lo vas a romper a propósito, cuatro veces.

## [00:59] → E03 · Explicado para un niño de 8 años

Imagina la entrada de un estadio con una fila de porteros. El primero revisa la boleta. El segundo, que no lleves cosas prohibidas. El tercero, que vayas a la tribuna correcta. Si el primero dice "no pasa", los demás ni te miran.

Ahora, cuando por fin entras, alguien te pone un sello verde en la mano. Ese sello solo dice que pasaste por los porteros que estaban ese día. Si el de las cosas prohibidas se fue a almorzar, el sello sale igual de verde.

Y otra cosa: si la puerta de al lado está abierta y sin nadie, cualquiera entra sin pasar por la fila. Eso es una rama sin protección.

Por eso no basta con mirar el sello. Hay que preguntar quiénes estaban en la fila ese día y si la puerta de al lado tenía candado.

## [01:55] → E04 · Teoría 1: anatomía de un workflow

Un workflow de GitHub Actions tiene tres capas. Arriba, on: los disparadores. Pueden ser push, pull_request, workflow_dispatch para lanzarlo a mano, schedule para correrlo a una hora, o tags.

Después vienen los jobs, y cada job arranca en un runner nuevo, limpio. Adentro de cada job están los steps, y un step que sale con un código distinto de cero corta el job.

Mira los dos workflows de predictor-debugger. verify.yml se dispara en cada push y en cada PR. reproduce.yml solo corre a mano o cuando empujas un tag que empieza por v. Uno es la comprobación barata de todos los días. El otro es el caro, el de la evidencia. Al final del módulo vuelvo a él.

## [02:42] → E05 · Código: la matriz de verify.yml

Abramos verify.yml. Tiene un solo job, saved, en ubuntu-24.04. La estrategia es una matriz con include: cuatro entradas, una por ronda. Cada una trae su script, su huella esperada y su archivo de pruebas. La ronda uno, por ejemplo, espera la huella EEC9-09E0-F77D.

Y tiene fail-fast en false. Sin eso, si la ronda tres se pone roja, GitHub cancela las otras y pierdes la información de las que sí pasaban.

Mira el último paso. Un bucle por tres máquinas: mac, war y guerra. Para cada una corre el script con guion guion saved, guarda la salida con tee y después exige la huella con grep guion q. Si la huella no aparece, grep sale con uno y el job se pone rojo. Esa línea de grep es el gate.

## [03:34] → E06 · Teoría 2: needs y el orden entre jobs

Sin needs, los jobs corren en paralelo y por separado. En el eval-gate de qa-eval-lab hay dos jobs, ui-tests y llm-evals, y ninguno depende del otro. Si las pruebas de UI fallan, el job de evaluaciones corre igual.

Con needs, dos puntos, corchete a, el job espera a que a termine, y si a falla, se salta. Así se encadenan los gates entre jobs. Y en la pestaña del PR lo ves clarito: el job que falló sale en rojo y los que dependían de él salen como skipped, grises, sin gastar un segundo de runner.

Ahora un dato que revisé el 26 de octubre: ninguno de los workflows de estos casos reales usa needs ni concurrency. Civica, restful-booker y war-paradigm ponen todos sus gates en un solo job. Ahí el orden de los steps hace el papel de needs: si falla el lint, lo que viene después no corre. Funciona, pero todo vive en un solo check, y no puedes exigir por separado cada gate.

## [04:40] → E07 · Teoría 3: caché frente a artefacto

Dos cosas que se confunden mucho. La caché y el artefacto.

actions/setup-node con cache npm, que usan civica, restful-booker y war-paradigm, guarda las dependencias para que npm ci sea más rápido. Si esa caché desaparece, la corrida tarda más y da el mismo resultado. Es desechable.

actions/upload-artifact guarda evidencia con retención. En esos workflows, catorce días para el reporte de Playwright, y en civica también para los reportes de auditoría. El ledger de mutation-insights de civica se guarda noventa días, porque la corrida siguiente lo usa: el CI descarga el de la última corrida terminada de main antes de los mutantes y sube el nuevo al final. Fíjate que ese ledger es artefacto, no caché: si desaparece, los mutantes corren en el orden declarado y el CI no falla, pero se pierde lo aprendido.

La regla: nada que necesites para decidir puede vivir solo en la caché. Y si borrar la caché cambia un resultado, eso no es normal: es un hallazgo, porque algo dependía de ella.

## [05:47] → E08 · Código: secretos y condiciones if

Los secretos. La expresión secrets punto OPENAI_API_KEY se enmascara en los logs y no llega a los PR que vienen de forks. Y si el secreto no existe, la expresión vale cadena vacía. Nada falla. El workflow tiene que decidir qué hacer con eso.

En eval-gate la decisión es esta: si la clave está vacía, imprime un notice que dice "LLM eval skipped". Si no está vacía, corre DeepEval y Promptfoo.

Para la evidencia hay tres condiciones que tienes que distinguir. always, que war-paradigm y restful-booker usan para subir el reporte pase lo que pase. El signo de admiración cancelled, que usa civica: sube aunque algo haya fallado, pero no si cancelaron la corrida. Y failure, que restful-booker usa para volcar los logs del sistema bajo prueba solo cuando algo falló.

## [06:39] → E09 · Teoría 4: concurrency

concurrency agrupa corridas. Con un grupo armado con el nombre del workflow y la referencia de la rama, y cancel-in-progress en true, cuando llega un push nuevo al mismo PR se cancela la corrida vieja.

En un PR eso es bueno: nadie necesita el resultado de un commit que ya reemplazaste. Pero no lo pongas en un pipeline de release o de evidencia. Cancelar a mitad deja la evidencia a medias, y una evidencia a medias es peor que ninguna, porque parece completa.

## [07:12] → E10 · Teoría 5: gate es check requerido más rama protegida

Ahora lo más importante del módulo. Un gate son dos cosas: un check marcado como requerido y una rama protegida. Sin las dos, el check informa, pero no bloquea.

El 26 de octubre consulté la API de GitHub para los cinco repos de los casos: civica, qa-eval-lab, restful-booker, predictor-debugger y war-paradigm. En los cinco, main no tiene protección ni rulesets. Sus checks son informativos. Y qa-eval-lab lo declara en su README, en la sección de límites: un check en rojo solo bloquea el merge si eval-gate es un check obligatorio, y main todavía no tiene protección de rama.

Proteger una rama no es difícil. En Settings, en Rules o en Branches, exiges pull request y marcas los checks que tienen que estar en verde. Desde ese momento, el botón de merge se bloquea mientras uno de ellos esté rojo o no haya corrido.

Eso no es un descuido escondido. Está escrito. Pero si llegas a un equipo y ves un check verde, la primera pregunta es: ¿esto bloquea algo?

## [08:20] → E11 · Terminal: qué significa un verde

Un check verde dice una sola cosa: los pasos que corrieron salieron con exit cero. No dice qué pasos se saltaron, si el check bloquea ni si alguien puede mergear igual.

Compruébalo tú. gh run list sobre qa-eval-lab, workflow eval-gate, la última corrida. Después gh run view con el id y guion guion log, filtrado con grep por "LLM eval skipped". En la corrida de hoy aparece el aviso. Ese verde quiere decir que pasaron las pruebas de UI y que ningún LLM fue calificado.

Y en el mismo workflow, mira npm ci, dos barras, npm install. Si el lockfile no coincide, el job sigue con npm install en vez de fallar. Otro verde que dice menos de lo que parece.

## [09:08] → E12 · Teoría 6: fail-closed, fail-open y fail-safe

Esto me ayuda a clasificar cualquier paso. Fail-closed es "ante la duda, rojo". Por ejemplo, un job que falla si no está el secreto, o predictor-debugger, donde un NaN nunca pasa.

Fail-open es "ante la duda, verde". El eval-gate sin clave. Un dos barras true pegado a un comando. Y un caso que cambió hace poco: la función loadInsights de civica. Hasta el commit b240008, si el ledger estaba corrupto, devolvía uno vacío sin decir nada. Sigue siendo fail-open a propósito, porque un ledger roto no debería tumbar la suite, pero ya no calla: imprime un aviso, deja una anotación ledger warning en el reporte y guarda el archivo roto como punto corrupt.

Y para seleccionar pruebas existe una tercera: fail-safe, "ante la duda, suite completa". Así trabaja jev-test-impact: si Jev no puede responder, corre todo.

Un gate de merge debería ser fail-closed. Si por alguna razón no puede, que avise fuerte, con un warning y en el job summary.

## [10:12] → E13 · Teoría 7: orden, selección por impacto y triaje

Lo barato y rápido va primero. En restful-booker el orden es format check, lint, typecheck y después npm test, que corre API, contrato, componente y rendimiento. En civica, lint, typecheck, mock con accesibilidad, mutación, auditoría, API, contrato, rendimiento y visual. El gancho de este video es la prueba de que funciona.

Cuando la suite crece, puedes correr solo lo que tocó el diff. En el benchmark de jev-test-impact, sobre veinte commits de una tienda demo, la selección con Jev corrió setenta por ciento menos pruebas y no dejó escapar ninguna de las quince que se rompieron. Y el mismo benchmark muestra el riesgo: la versión rápida sin Jev, la que salta las pruebas end-to-end que no sabe mapear, dejó escapar cuatro de las quince. Rápida e insegura.

Ojo con el criterio: ahorrar tiempo solo vale si las fallas escapadas son cero, con fail-safe y con la suite completa en main y en la nocturna.

Y cuando algo se pone rojo, el triaje: jev-ci-triage clasifica cada fallo con reglas deterministas primero, y lo ambiguo va a un modelo o a una persona.

## [11:25] → E14 · Teoría 8: flaky y reintentos

Civica y restful-booker usan retries dos y forbidOnly en CI. Un test que falla y pasa en el reintento sale como flaky en el reporte. Eso se pone en cuarentena con un ticket, no se esconde. Es la regla uno de jev-ci-triage.

Y el contraste: el runner de mutantes de war-paradigm usa retries cero. Si reintentas hasta ver el resultado que esperabas, estás haciendo trampa con tu propio experimento.

## [11:52] → E15 · Código: un pipeline de evidencia

Volvamos a reproduce.yml. Este pipeline no está para dar feedback rápido. Está para que cualquiera compruebe un resultado desde cero.

Corre en un ubuntu-24.04 limpio. Baja los datos publicados en data-v1 con tools/fetch_data.py, que verifica cada archivo contra SHA256SUMS y contra el manifiesto. Corre las pruebas de los chequeos. Recalcula todo y al final exige dos cosas con grep guion q: que los veredictos sean iguales a los guardados y que la huella sea la misma. En el clon que revisé cubre las rondas uno y dos.

¿Cuánto cuesta? El README lo dice: en la primera corrida de reproduce, la 40267731741, con la descarga incluida, el job de la ronda uno tardó seis minutos y treinta y tres segundos, y el de la ronda dos, diecisiete minutos y cuarenta y siete. Los dos dieron los mismos veredictos y las huellas EEC9-09E0-F77D y D506-F58F-3838. Por eso no corre en cada push: sería tirar diecisiete minutos por commit para confirmar algo que verify ya comprueba en barato.

Fíjate en algo: ninguno de los dos workflows de predictor-debugger sube artefactos. La evidencia es el log y el exit code. Y un release, en este esquema, sale de un tag cuyo CI está verde y lleva su paquete con su archivo punto sha256.

## [13:16] → E16 · Laboratorio paso a paso

Ahora tú. Paso uno: lee los cinco workflows y llena una tabla por archivo. Triggers, jobs, gates en orden, condiciones if, caché, artefactos y qué pasa si falta un secreto. Los archivos son el ci.yml de civica, el eval-gate de qa-eval-lab, el tests.yml de restful-booker y el verify y el reproduce de predictor-debugger.

Paso dos: comprueba un verde con gh run list y gh run view, como te mostré. Paso tres: comprueba si un check bloquea, con gh api repos, tu usuario, tu repo, branches main, y jq punto protected. Hazlo en tu repo antes y después de proteger main.

Paso cuatro: arma tu pipeline. Job static con format, lint y typecheck. Job api con needs static. Job ui con needs api. Cada job sube su reporte con la condición de no cancelado, junto con un SHA256SUMS que generas con find y sha256sum. Y agrega concurrency con cancel-in-progress para los PR.

Paso cinco: protege main, exige PR y marca static, api y ui como checks requeridos. Paso seis: si un paso usa un secreto, que sin él imprima un warning y lo escriba en el job summary, y decide por escrito si ese gate es fail-open o fail-closed.

## [14:35] → E17 · Mutación WAR de la semana

La mutación de esta semana es contra tu propio pipeline. Cuatro rupturas, una por PR, y antes de cada una escribes qué gate debería notarlo.

Uno: quita un needs. Lo que suele pasar es que el job corre aunque el anterior haya fallado. Dos: agrega dos barras true al paso de pruebas. El check sale verde con pruebas rojas, y solo lo ves si abres el log. Tres: borra un secreto que use un paso. Depende de tu if, y un verde sin aviso es un hallazgo. Cuatro: desactiva la protección de rama. El PR roto se puede mergear.

Lo que nadie notó va a la tabla como hallazgo, con el enlace a la corrida. Ese "nadie" es lo más valioso de la semana.

## [15:25] → E18 · El reto y cómo se evalúa

El entregable: un repo con el workflow de tres o más gates, artefactos con hash y main protegida, el PR bloqueado, la tabla de lectura de los cinco workflows reales y la tabla de las cuatro rupturas.

Criterios: los tres gates encadenados con needs, y en el PR roto los jobs posteriores salen como skipped. Los tres checks son requeridos y el merge aparece bloqueado. Cada job sube su artefacto también cuando falla, y sha256sum guion c pasa sobre lo descargado. Y el paso saltado por falta de secreto queda en el log y en el summary.

La rúbrica tiene cuatro filas: lectura de un verde, gates y bloqueo, artefactos y evidencia, y mutación del pipeline. Para el nivel más alto en lectura, encuentras un fail-open no documentado en un workflow real.

## [16:18] → E19 · Mini-quiz

Tres preguntas. Pausa si quieres.

Primera: un workflow tiene los jobs lint y e2e, sin needs. lint falla. ¿Qué pasa con e2e? Corre igual, en paralelo, porque no depende de lint.

Segunda: un paso dice npm test, dos barras, true. ¿Qué cambia? El paso sale con exit cero aunque las pruebas fallen. El gate deja de ser gate.

Tercera: ¿qué diferencia a verify.yml de reproduce.yml? verify corre en cada push y comprueba la huella sobre veredictos guardados. reproduce se lanza a mano o con un tag, baja data-v1 en un runner limpio y recalcula.

## [17:10] → E20 · Cierre

Tres ideas. Uno: un verde dice que los pasos que corrieron salieron con cero, nada más. Dos: un gate es un check requerido en una rama protegida. Tres: lo barato primero, y la evidencia se sube siempre, también cuando falla.

En el siguiente módulo nos metemos con lo que pasa cuando el runner muere: contenedores efímeros y cómo hacer que la evidencia sobreviva al entorno. Allá nos vemos.

# Guion ES · Módulo 27 · m23 — QA asistida por IA II

_Palabras de narración: 2840 · duración estimada 19:11 a 150 ppm_

Voz: Cristian, primera persona, tuteo. Las marcas `[mm:ss]` salen del conteo de palabras a 150 ppm. Cada bloque indica la escena que acompaña.

## [00:00] → E01 · Gancho

Tengo un hook que le impide a mi asistente de IA hacer push a main. Tenía decenas de pruebas, todas en verde. Y aun así, este comando pasaba: git guion c core punto x igual y, push origin main. Salida cero. Este también: git guion guion no-pager push origin main. Salida cero. El hook que me cuidaba main dejaba pasar un push a main con solo agregar una opción global de git. No lo encontró una revisión de código. Lo encontró una mutación WAR, que es intentar colarse a propósito. Hoy vas a reproducir ese agujero y vas a buscar los tuyos.

## [00:41] → E02 · Título

Este es el módulo veintisiete: QA asistida por IA, segunda parte. El asistente diseña, ejecuta y audita. Una persona firma. Trabajamos con el experimento tres de war-paradigm, que es un hook y un vault de conocimiento, y con scientific-qa-evidence, mi estudio donde cada comando, hash y exit code quedó publicado. Uso asistentes para ir más rápido, y la firma es mía.

## [01:05] → E03 · Explicado para un niño de 8 años

Si le dices a un robot "por favor no toques eso", le estás haciendo una petición. Puede que te haga caso, puede que se le olvide. Si le pones una reja, ya no es una petición: es una regla. No importa si el robot se acuerda o no, la reja está ahí.

Ahora imagina que un amigo hace un experimento por ti. Tú anotas cada paso: qué usó, qué hizo, qué le dio. Así otra persona puede repetirlo y ver si le da lo mismo. Y si hubo algo que no alcanzaron a hacer, también lo anotas, en vez de hacer como si estuviera hecho.

Al final la firma la pones tú. El amigo ayudó, pero el que responde eres tú.

## [01:54] → E04 · Teoría 1: el reparto

El reparto es simple de decir y difícil de cumplir. El asistente diseña, ejecuta y audita. La persona elige las preguntas, decide qué cuenta como evidencia y firma.

En scientific-qa-evidence está escrito así, en la sección "Cómo se usó la IA" del README. OpenAI Codex fue al principio el agente principal de código, y Claude Code hizo los cambios posteriores de auditoría, documentación y experimento. Cada commit nombra al agente en un trailer Co-Authored-By. Y la frase que importa: Cristian Guerra eligió las preguntas, congeló los contratos, decidió qué cuenta como evidencia y responde por cada afirmación.

AUTHORSHIP punto md va más lejos. Las herramientas de IA se declaran como asistencia, no como coautores académicos. Y deja trazado hasta un cambio a mitad de sesión en el modelo que reportaba el asistente, con los commits exactos donde cambió el trailer.

## [02:50] → E05 · Teoría 2: reglas en código, no en prompts

En mi perfil de GitHub, en "Cómo trabajo", hay una línea que repito mucho: las reglas duras viven en el código, no en los prompts. Hooks, gates de CI y revisiones que no se pueden olvidar.

¿Por qué? Porque un prompt es una petición. Si escribes en el CLAUDE punto md "nunca hagas push a main", el modelo lo puede pasar por alto. Un hook no se pasa por alto. En el experimento tres de war-paradigm hay un hook PreToolUse de Claude Code, registrado en punto claude barra settings punto json. Antes de cada llamada a Bash, Claude Code le pasa la llamada al hook como JSON. El hook lee el comando, y si el destino del push es main o master, sale con exit dos. Exit dos bloquea la llamada y le muestra el motivo al asistente. Exit cero la deja pasar.

## [03:47] → E06 · Código: el hook

Este es el archivo, hooks barra block-push-to-main punto sh. Arriba, el contrato en comentarios: exit dos, la llamada se bloquea y stderr se le muestra al asistente; exit cero, pasa. Y una línea que lo resume: un prompt se puede ignorar, esto no.

Primero extrae el comando del JSON, con jq si existe, con node si no, y con sed como último recurso. Después parte la línea en comandos simples, separando por doble ampersand, doble barra, punto y coma y barra. Para cada uno busca un git push, saca el remoto y los refspecs, y revisa el destino. Si no hay refspec, mira la rama actual. Si es main o master, bloquea.

## [04:32] → E07 · Laboratorio A: el hook en acción

Clonas war-paradigm, entras a experiments barra cero tres guion second-brain, y corres npm test. Cuarenta y cinco pruebas, cuarenta y cinco pasan. Ojo con un detalle: cuando preparé este módulo, el README del experimento decía treinta y tres checks y la terminal mostraba treinta y ocho. Me quedé con lo que salía en la terminal y corregí el README. Hoy los dos dicen cuarenta y cinco, cuarenta de ellas sobre el hook.

Luego npm run demo. Seis comandos contra el hook. git push origin main: bloqueado, exit dos. git push guion guion force origin HEAD dos puntos main: bloqueado. npm test doble ampersand git push origin master: bloqueado, porque el hook mira cada comando de la cadena. Y pasan con exit cero un push a feature barra mutants, el mismo con guion u, y un git pull origin main, que no es un push.

## [05:29] → E08 · Teoría 3: el hook también es un guardia

Aquí está la idea WAR de este módulo. El hook protege main, pero el hook también es un guardia, y a un guardia hay que ponerlo a prueba. Si nadie intenta colarse, no sabes si está despierto.

Por eso tests barra hook punto test punto mjs lo ataca contra repos git temporales reales, estando en main y estando en una rama. Prueba refspecs como HEAD dos puntos main, flags de force, comandos encadenados, git guion C, y el git push a secas estando en main. Y lo corre con los tres parsers del JSON: jq, node y sed. Cada parser es un camino distinto por el que el comando puede escaparse.

## [06:14] → E09 · Terminal: reproducir el agujero

Ahora el caso real. Saco el hook tal como estaba en el commit anterior a uno b cero uno c seis seis, con git show. Le paso el JSON con git guion c core punto x igual y push origin main. Exit cero. Con git guion guion no-pager push origin main. Exit cero. Los dos pasaban.

Mismo par de comandos contra el hook actual: exit dos y exit dos. Y un push legítimo a una rama de feature sigue saliendo con cero en los dos hooks. El arreglo cerró el agujero sin bloquear lo que debe pasar.

## [06:52] → E10 · Código: el arreglo y sus pruebas

¿Qué cambió? El hook anterior solo reconocía git, opcionalmente guion C y una carpeta, y después push. Cualquier otra opción global entre git y push lo despistaba. El arreglo agrega una variable, GIT_OPTS, que acepta guion c, guion C, git-dir, work-tree, namespace y config-env con su valor, y cualquier otra opción que empiece por guion.

Y el commit agrega cinco pruebas: git guion c con clave igual valor, git no-pager, git-dir con carpeta, work-tree con guion c, y una que debe pasar: guion c con push a una rama de feature. El mensaje del commit dice que las pruebas nuevas fallan con el hook anterior y pasan con este. Eso es lo que te pido en el laboratorio: escribe primero la prueba que falla con el hook viejo, y después compara tu idea de arreglo con la del commit.

## [07:48] → E11 · Teoría 4: contexto antes que prompt

La otra mitad del experimento tres no es un hook. Es un vault. El espécimen es un asistente al que le pides pruebas de Playwright para un flujo que nunca ha visto. Escribe código limpio, con sintaxis correcta, que no prueba nada importante.

Lo que funcionó no fue un mejor prompt. Fue darle al asistente lo que un QA senior tiene en la cabeza, escrito en un lugar que lee antes de cada tarea. El vault trae cero cero READ FIRST, que es el proyecto en una página, Golden rules, que es lo que nunca debe hacer, y carpetas de proceso, flujos, conocimiento, sesiones y plantillas. Ahí están los roles, los datos de prueba y los defectos conocidos.

Y el vault también se prueba. tests barra vault-links punto test punto mjs rompe el build si un enlace apunta a una nota que no existe, si una nota no tiene frontmatter o si una nota queda aislada.

## [08:50] → E12 · Teoría 5: evidencia es comando, hash y exit code

Pasemos a la evidencia. Cuando un asistente ejecuta por ti, "funcionó" no es evidencia. Evidencia es el comando exacto, la versión, el hash de lo que entró y salió, y el exit code. Con eso otra persona puede repetirlo.

scientific-qa-evidence publica un registro público de cada comando, versión, hash y código de salida, incluidos los errores encontrados y corregidos. Hay dos formas de verificarlo. shasum guion a dos cincuenta y seis guion c sobre evidence barra SHA256SUMS punto txt comprueba que cada archivo curado es el publicado. Y python verificar punto py corre seis comprobaciones, muestra OK o FALLA en cada una y te da una huella, un código corto para comparar con el de otra persona.

## [09:37] → E13 · Laboratorio B: verificar

Lo corrí en una copia. verificar punto py: versión de los datos dos seis siete nueve uno f e seis cinco cuatro seis f, Darwin arm sesenta y cuatro, Python tres punto nueve punto seis. Uno, archivos intactos: OK. Dos, corridas numéricas iguales entre Mac y Linux: OK. Tres, volver a correr las ochenta y cuatro variantes numéricas: OK. Cuatro, README, CLAIMS y registros dicen lo mismo: OK. Cinco, recibos de los controles Mathlib: OK. Seis, recibos en los paquetes publicados: OK. Las seis salieron OK, exit cero, y la huella es C cinco F cero, F uno A ocho, dos F cuatro D.

Si tú corres lo mismo con la misma versión y te da la misma huella, a los dos nos dio exactamente lo mismo. Si te da distinto, ese resultado también sirve, y el script te da el enlace para reportarlo. shasum también sale con cero: cada archivo de la lista dice OK.

## [10:40] → E14 · Navegador: el log de los agentes

Ahora abre docs barra CODEX_WORK_LOG punto md. El veinte de octubre de dos mil veintiséis, Codex corrió diecinueve sesiones: una principal y dieciocho subagentes, cada uno con su rol. La sección "How this log was built" cuenta cómo se armó: se leyeron las doscientas trece sesiones locales de Codex y las cuatrocientas setenta entradas del historial de prompts, y se quedaron las diecinueve que son de este estudio.

Las transcripciones completas no se publican, porque tienen datos personales y comandos que manejan credenciales. En su lugar está el SHA-256 de cada archivo de sesión, para identificar después los archivos exactos con que se construyó el log.

En la tabla verás dos jueces ciegos, jd_tts_a y jd_tts_b, que revisaron lo mismo sin ver al otro, y un corrector acotado, tts_safety_fix, que aplicó sus notas. Y está la sección "What was not executed": unas ilustraciones de "auto-fix", con una corrección en cinco milisegundos contra una anomalía de ciento noventa y cinco, nunca se corrieron. Los cinco milisegundos son parte del dibujo, no una medición. Y el log lo dice.

## [11:50] → E15 · Teoría 6: lo no independiente y los errores propios

Dos reglas más. Primera: declara lo que no es independiente. La recompilación en la nube del veintitrés de octubre la operé con ayuda de un asistente y bajo mi dirección, y su README lo pone en límites: no es independiente. Sigue pendiente que otra persona la recompile, y hay una guía para hacerlo.

Segunda: publica tus errores. FINDINGS punto md tiene ocho hallazgos. El uno, el tres y el ocho fueron defectos del propio estudio. Un build que creía limpio había recibido siete dependencias precompiladas sin que el log lo mostrara. Dos corridas reportadas con el mismo build habían usado builds distintos. Y el runner numérico reportaba oracle_valid true cuando el oráculo había lanzado una excepción o devuelto NaN. Los tres se corrigieron en público. Una auditoría que atrapa sus propios errores vale más que una que dice que no tuvo ninguno.

## [12:47] → E16 · Terminal: romper la evidencia

Rompamos la evidencia, en una copia. Le agrego un solo espacio al final de REPRODUCE punto md, que está en la lista de SHA256SUMS. shasum: REPRODUCE punto md, FAILED. Un checksum no coincidió. Exit uno.

verificar punto py: la comprobación uno, archivos intactos, sale FALLA. Las otras cinco siguen OK. Resultado: una de seis comprobaciones fallaron. Exit uno. Y la huella cambió: ya no es C cinco F cero, ahora es cinco siete F cuatro, siete A F B, uno B nueve E. Un espacio cambia la huella. Por eso la huella sirve para comparar: si a otra persona le da distinto, algo en su copia no es lo publicado, y el detalle dice qué.

## [13:33] → E17 · Mutación WAR: intentos propios

La mutación de esta semana te pide inventar tus propios intentos contra el hook de hoy, el del commit cinco d c cinco nueve dos, y escribir antes cuáles crees que pasan. Yo probé nueve, estando en una rama de feature.

Bloqueados con exit dos: git push origin main, como control; git push origin refs barra heads barra main; git push origin feature dos puntos main; git, un tabulador y push origin main; y git push guion guion repo igual origin main.

Pasaron con exit cero, cuatro. git guion c alias punto p igual push, y luego p origin main: un alias definido en la misma línea. Una variable: G igual push, punto y coma, git signo pesos G origin main. eval con el push entre comillas. Y bash guion c con el push entre comillas. El hook busca la palabra push después de git, y en esos cuatro casos la palabra no está ahí, está escondida en un alias, en una variable o dentro de otra shell.

## [14:40] → E18 · Qué hacer con un agujero

Esos cuatro son agujeros del guardia de hoy, encontrados con el mismo método que encontró el de uno b cero uno c seis seis. Lo que hago con ellos es lo que pide el módulo: un agujero encontrado se publica, no se esconde. Cuando se puede, se escribe la prueba que falla, se arregla, y se deja la prueba para que no vuelva. Cuando no se puede arreglar sin parsear toda la shell, como estos cuatro, se publica como límite conocido. En war-paradigm cada uno ya tiene una prueba bajo «known limits: these get through» que afirma el exit cero de hoy, para que si alguien lo cierra, la prueba avise y se actualice el README.

Y una reflexión de diseño. Un hook que parsea texto de shell siempre va a tener casos raros. Por eso no es la única capa: es una reja, no la única puerta. Lo que no cambia es el principio. La regla crítica no puede vivir solo en un prompt, y el guardia que la cuida se ataca con pruebas.

## [15:50] → E19 · El reto y cómo se evalúa

Tu reto. Dirige a un asistente, Claude Code o Codex, en una auditoría acotada. Por ejemplo, reproducir el reporte de agent-eval-jev o el benchmark de jev-test-impact. El asistente diseña y ejecuta; tú decides y firmas. Entregas cinco cosas: un EVIDENCIA punto md con cada comando, versión, commit, exit code y SHA-256 de entradas y salidas; dos revisiones a ciegas en sesiones separadas, que no se ven entre sí, más tu síntesis; una sección "Qué no se ejecutó"; un hook propio que bloquee una acción peligrosa en tu repo, con su suite de ataques; y la autoría declarada con trailers Co-Authored-By.

Así se evalúa. Otra persona repite la tarea solo con tu paquete y obtiene los mismos exit codes y hashes, o documenta dónde difieren. Cada afirmación del informe enlaza a un comando con su exit code. Las dos revisiones están en sesiones distintas, ninguna cita a la otra, y tu síntesis dice qué aceptaste y qué descartaste. Tu hook sale distinto de cero en todos tus ataques documentados y con cero en los comandos legítimos. Y el informe trae "Qué no se ejecutó" y al menos un error propio encontrado y corregido.

La rúbrica tiene cuatro filas: reglas en código, evidencia, revisión y honestidad. Para el nivel más alto en reglas, encuentras y reportas un agujero en un hook ajeno, por ejemplo el de war-paradigm. Ya viste que hay de dónde.

## [17:23] → E20 · Mini-quiz

Tres preguntas. Pausa en cada una.

Primera. Escribes en el CLAUDE punto md del repo "nunca hagas push a main". ¿Por qué no basta? Porque un prompt es una petición que el modelo puede pasar por alto. Un hook que sale con dos bloquea la llamada.

Segunda. ¿Qué separa CODEX_WORK_LOG punto md en su sección "What was not executed"? Lo que solo se ilustró de lo que se corrió. Las escenas de auto-fix nunca se ejecutaron, y sus cinco milisegundos son parte del dibujo.

Tercera. Cambias un byte de un archivo listado en evidence barra SHA256SUMS punto txt. ¿Qué esperas de shasum guion a dos cincuenta y seis guion c? FAILED en ese archivo y un exit distinto de cero. Y ya lo viste: exit uno.

## [18:28] → E21 · Cierre

Tres ideas. Primera: las reglas duras van en hooks y en CI, no en prompts, y el hook también se ataca, porque el mío tenía agujeros que treinta y ocho pruebas no veían, y ahora quedan escritos como límites conocidos. Segunda: evidencia es comando, hash y exit code, de forma que otra persona lo repita y compare una huella. Tercera: di lo que no se ejecutó, marca lo que no es independiente y publica tus errores. El asistente ayuda; la firma es tuya.

En el siguiente módulo: prerregistro y reproducibilidad. Umbrales escritos antes de ver los datos, y la misma huella en otra máquina. Nos vemos allá.

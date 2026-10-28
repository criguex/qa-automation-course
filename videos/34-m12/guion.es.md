# Guion · 34 · m12 · Capstone «Auditoría WAR»

Voz en off: Cristian, primera persona · español de Colombia, tuteo · ~150 palabras/min · 2737 palabras de narración · duración estimada 18:30 (incluye pausas del quiz)

Cada bloque lleva su marca de tiempo y la escena que lo acompaña (→ E##). Los tiempos de `escenas.json` siguen este guion.

## Gancho

[00:00] → E01

Tengo un hook que le impide a mi asistente de IA hacer push a main. Tenía su suite de ataques: veintiocho casos, con comandos encadenados, refspecs y push a secas. Todo en verde. Esta semana le apliqué una mutación WAR y encontré esto: git guion c, una opción cualquiera, push origin main, salía con exit cero. Y git guion guion no pager push origin main, también. El guardia que yo mismo había probado tenía un hueco por donde se colaba un push a main. Lo arreglé, agregué las pruebas que fallaban con el hook viejo, y subieron a treinta y tres. Después, preparando este curso, lo volví a atacar. Barra invertida git se colaba, y lo cerré. Otros seis todavía pasan, como sh guion c, eval o la rama en una variable, y no los escondí: quedan fijados con pruebas como límites conocidos, porque un hook con regex es una barrera contra errores, no un sandbox. Hoy son cuarenta casos. Ese es el espíritu del capstone: hasta tus guardias probados se vuelven a atacar.

[01:10] → E02

Este es el capstone, y aquí juntas todo. Eliges un sistema, prerregistras qué vas a afirmar, rompes a propósito sus guardias, dejas que un asistente de IA ejecute bajo reglas que viven en el código, y firmas tú. Pero la prueba de fuego no es que te dé verde a ti. Es que otra persona, en una máquina limpia y solo con tu paquete, corra un comando y obtenga la misma huella. Si no lo logra, la auditoría no está aprobada, aunque todo te funcione en tu computador. Vamos a ver cómo se arma un paquete que aguanta eso.

## Explicado para un niño de 8 años

[01:49] → E03

Si tuvieras ocho años: eres el inspector de los guardias. Rompes cosas a propósito para ver si gritan. Si un guardia no grita cuando rompes algo, está dormido, y eso es lo que tienes que encontrar. Un robot te ayuda a cargar las herramientas y a anotar todo, pero la hoja la firmas tú, porque tú respondes por lo que dice. Y al final, un amigo repite todo en una caja nueva, sin tus trucos ni tu escritorio, y le da el mismo resultado. Si le da distinto, todavía no terminas.

## Teoría · los tres ejes

[02:26] → E04

La teoría empieza por los tres ejes, en un solo entregable. Eje A, QA asistida por IA: el asistente diseña y ejecuta, y una persona firma. Eje B, ejecución de mutantes: generar, correr, clasificar y medir el kill rate. Eje C, WAR Paradigm: toda suite, todo juez, todo hook, todo verificador es un guardia, y la única forma de saber si está despierto es romper algo a propósito y ver si grita. No son tres proyectos. Es un sistema, auditado desde tres ángulos, con la misma evidencia.

## Teoría · eje A: reglas en código

[03:00] → E05

Eje A, primera regla: las reglas duras viven en el código, no en los prompts. Un prompt se puede ignorar. Un hook que bloquea un push a main no se puede olvidar. En war-paradigm, el experimento tres registra un hook PreToolUse de Claude Code para la herramienta Bash. Antes de cada comando, el hook lee la llamada como JSON, y si el destino es main o master, sale con exit dos: bloqueado, y el mensaje le llega al asistente. Y la barrera se prueba al estilo WAR: veintiocho casos, según el curso, intentaban colarse. Luego treinta y tres, por el hallazgo del inicio. Hoy cuarenta, y seis de ellos son límites conocidos que todavía pasan, a propósito y por escrito.

## Teoría · eje A: registro del asistente

[03:48] → E06

Eje A, segunda regla: lo que hizo el asistente queda registrado. En scientific-qa-evidence, el archivo CODEX_WORK_LOG lista diecinueve sesiones, con sus llamadas a herramientas, sus commits y el SHA-256 de cada archivo de sesión, para que se puedan identificar después. Tiene una sección que me parece clave: What was not executed, lo que no se ejecutó. Ahí queda escrito lo que se discutió o se ilustró pero nunca se corrió, para que nadie confunda un dibujo con un resultado. Cada commit nombra al agente con un trailer Co-Authored-By, y la persona responde por cada afirmación. Y en el mismo registro hay una revisión doble a ciegas: dos jueces y un corrector acotado.

## Teoría · eje B: mutantes como datos

[04:33] → E07

Eje B: mutantes como datos. En war-paradigm, el experimento dos toma un golden flow: login, crear, aprobar y publicar. El archivo tests barra scenarios punto ts declara un contrato por mutante, con un solo cambio cada uno. Antes de mutar, el runner valida el reset, el login y la línea base sin mutar. Si alguna de esas falla, no es un resultado del mutante. Solo KILLED y SURVIVED puntúan. INCONCLUSIVE, INVALID_BASELINE e INFRA_ERROR se ven en el reporte, pero quedan fuera del puntaje. Resultado publicado: cinco de siete muertos y dos sobrevivientes, self-grant y viewer-create, que encontré preparando este curso. Y esos sobrevivientes no son un defecto de la suite. Son bugs reales de autorización.

[05:19] → E08

Mira cómo se ve el hallazgo. El contrato dice: en el paso grant, pide el rol admin y espera un 403. La postcondición: el rol del miembro tiene que seguir siendo editor. Y la regla del servidor reutiliza la de los miembros pueden editar su propio perfil: si eres admin, o si eres tú mismo, puedes. Entonces un editor se pone a sí mismo de admin, y después aprueba y publica solo. Todas las pruebas del camino feliz estaban en verde mientras esto estaba abierto. Con MUTANT_LAB_STRICT igual a uno, los sobrevivientes conocidos hacen fallar la corrida, en lugar de quedar en verde con una nota.

## Teoría · eje C: también se prueba la evidencia

[06:02] → E09

Eje C: también se prueba la evidencia. Esto lo viste en el módulo de pruebas formales. En receipt-check, un recibo que nombra un log ausente y un log viejo con el nombre correcto dejaron el resultado del procedimiento publicado sin cambios. El chequeo que solo mira si el log existe atrapó el primero y dejó pasar el segundo. Solo la comprobación por hash detectó los dos. En el capstone esto deja de ser un ejemplo y se vuelve un requisito: tu paquete tiene que aguantar el mismo ataque. Si tu verify se comporta como un chequeo de existencia, lo vas a descubrir en la mutación, y se publica.

## Teoría · reproducible en limpio

[06:45] → E10

Reproducible en limpio. El workflow verify de predictor-debugger corre en un runner nuevo de GitHub, ubuntu 24.04, instala con uv run guion guion locked, y para cada máquina guardada exige la huella con grep guion q. Si la huella no aparece, grep sale con uno y el job se pone en rojo. No hay que mirar nada a ojo: la huella se exige. Y el workflow reproduce va más lejos: recalcula desde los datos publicados. En su primera corrida, el job de la ronda 1 tardó seis minutos treinta y tres segundos, con la descarga incluida, y dio la misma huella.

## Teoría · reproducido no es reproducido por un tercero

[07:25] → E11

Ahora, una palabra que hay que usar con cuidado: reproducido. La recompilación en la nube de scientific-qa-evidence la operó un asistente bajo mi dirección, y su README lo dice con todas las letras: no es independiente. Las tres máquinas de predictor-debugger son mías, y el README también lo declara. Eso vale como reproducido, pero no como reproducido por un tercero. En este capstone, quien reproduce tiene que ser otra persona. Y si le sale distinto, su reporte se publica tal cual y la diferencia se investiga. Eso también es evidencia.

## Teoría · el reporte honesto

[08:01] → E12

Y el reporte honesto. Tu README lleva cinco secciones. Medido: lo que corriste, con sus números. Lo que esto dice y lo que no: hasta dónde llegan tus conclusiones. Límites: el alcance, quién reprodujo, qué herramientas reutilizaste. Qué me contradiría: el resultado que, si apareciera, te obligaría a cambiar tu conclusión. Y qué no se ejecutó, como en el registro de Codex. La regla de fondo es sencilla: cada número del README sale de un comando que se puede correr, con su exit code. Si un número no tiene comando, no entra.

## Laboratorio

[08:38] → E13

Vamos al laboratorio. Paso uno: corre las dos piezas modelo. Necesitas Node 20 o más y git. Clonas war-paradigm, instalas con npm ci, que respeta el lockfile, e instalas Chromium para Playwright. Corres demo dos y el marcador cierra así: cinco de siete mutantes puntuables muertos, dos sobrevivientes, cero excluidos. Self-grant aparece como sobreviviente conocido, aceptado con HTTP 200, y viewer-create, aceptado con HTTP 201. Ahora corres lo mismo en modo estricto, con test strict, y echo exit al final. Sale exit uno. Eso es lo que quieres: los sobrevivientes conocidos hacen fallar la corrida. En tu capstone, un sobreviviente nunca se esconde para que todo quede verde.

[09:21] → E14

El hook. Corres demo tres y ves seis comandos contra el hook. Git push origin main: bloqueado, exit dos, con el mensaje que le llega al asistente. Push forzado a HEAD dos puntos main: bloqueado. Un npm test encadenado con un push a master: bloqueado. Y los que sí deben pasar, pasan: push a una rama de feature, con y sin guion u, y un git pull de main, que no es un push. Los dos lados del guardia: lo que debe bloquear y lo que no. Luego corres la suite del hook: cuarenta pruebas, cuarenta pasan, y seis de ellas afirman límites conocidos que todavía pasan con exit cero. Con el hook de antes del arreglo, cinco de ellas fallan.

[10:10] → E15

Paso dos: ensaya la reproducción en limpio. Toma un repo modelo y corre su verificación dentro de un contenedor que nace y muere con el comando: docker run guion guion rm, montas la carpeta, imagen python 3.12 slim, y corres verificar punto py. Yo lo hice hoy sobre el mismo commit en dos entornos: mi Mac, con Python 3.9, y el contenedor, Linux con Python 3.12. Las seis en OK, y la misma huella en los dos: C 5 F 0, F 1 A 8, 2 F 4 D. Esa es exactamente la propiedad que tu paquete necesita: distinto sistema, distinta versión de Python, la misma huella.

[10:52] → E16

Paso tres: arma el paquete. La estructura mínima es esta. PREREGISTRO punto md y thresholds punto json, antes de cualquier resultado. Los mutantes como datos, en un scenarios. Un ledger punto jsonl con cada sobreviviente y su causa. Un receipts punto jsonl con cada paso. Un verify que recalcula los veredictos e imprime una huella. Un lockfile, package lock o uv lock. Un workflow verify punto yml que exige la huella con grep guion q. Un REPRODUCE punto md con un solo comando. Un LOG guion IA punto md con las sesiones del asistente, sus comandos, exit codes, hashes y la sección qué no se ejecutó. Y el README con el reporte honesto.

[11:38] → E17

Paso cuatro: el asistente ejecuta, tú firmas. Instalas un hook propio; puedes partir del block push to main punto sh y su settings punto json. Le escribes su suite de ataques, y te recomiendo que incluyas los comandos disfrazados que acabas de ver: opciones globales de git antes del push. Después dejas que el asistente corra la auditoría y anote cada paso en receipts punto jsonl. Tú revisas el diff antes de cada merge, y sus commits llevan el trailer Co-Authored-By. Así cualquiera sabe qué escribió el asistente, y sabe también que una persona lo leyó antes de que entrara.

[12:18] → E18

Paso cinco: la reproducción de otra persona. Le entregas a alguien que no escribió el código solo la URL del repo. Nada más: ni una llamada para explicarle, ni tu laptop. Esa persona sigue tu REPRODUCE punto md en un entorno limpio, un contenedor efímero o un runner nuevo de CI, y publica un REPRODUCCION guion su nombre punto md con el formato de la guía de reproducción independiente: quién, fecha en UTC, máquina, commit, versiones, una tabla de pasos con comando, inicio, fin y exit code, la huella y las diferencias. Y lo publica tal cual, aunque le salga distinto. Tú no lo editas.

[13:00] → E19

Paso seis: la defensa. Treinta a cuarenta y cinco minutos ante alguien que no escribió el código. Y la regla es simple: cada afirmación del README se defiende corriendo su comando en vivo. Si dices que tu suite mata cinco de seis mutantes, corres la suite. Si dices que la huella coincide, la imprimes. Si dices que tu verify detecta un log viejo, lo siembras ahí mismo. Es incómodo y es justo lo que lo hace valioso: aprendes a no escribir nada que no puedas mostrar.

## Mutación WAR de la semana

[13:34] → E20

La mutación de la semana es la del inicio, pero contra tu propio paquete. Antes de entregar, lo atacas como lo hizo receipt-check. Uno: borras un log que nombra un recibo. Dos: reemplazas otro log por uno viejo con el mismo nombre. Tres: cambias un byte de thresholds punto json. Tu verify tiene que salir con un código distinto de cero en los tres casos, y con cero en el paquete limpio. Si solo detecta el log ausente, tu chequeo se comporta como P6, y eso se publica como hallazgo. No es un fracaso: es exactamente el tipo de cosa que esta auditoría existe para encontrar, igual que el hueco en mi hook.

## El reto y cómo se evalúa

[14:19] → E21

El reto. Entregas un repo público con el paquete, el REPRODUCCION de otra persona y la defensa. Los criterios: git log guion guion reverse muestra el prerregistro y los umbrales antes del primer resultado. Otra persona corrió tu REPRODUCE en limpio, con exit cero y la misma huella, y su archivo está sin editar. Desde el JSON de mutantes se recalcula el kill rate como KILLED sobre KILLED más SURVIVED, y cada sobreviviente está en el ledger con su causa. El hook tiene una suite de ataques en CI. Dos corridas registradas muestran que verify falla con un byte cambiado en los umbrales y con un log viejo. Y el README tiene las cinco secciones y la declaración del uso de IA.

[15:08] → E22

La rúbrica integrada tiene cuatro filas, una por eje más la evidencia, y apruebas con las cuatro al menos en nivel tres. QA asistida por IA, nivel tres: hook con suite de ataques en CI, recibos con cada comando, exit code y hash, diff revisado y trailer. Mutantes, nivel tres: al menos seis como datos, línea base válida, kill rate recalculable y modo estricto. WAR, nivel tres: al menos dos guardias distintos, cada uno con un control que debe pasar y otro que debe fallar. Evidencia, nivel tres: prerregistro antes de los datos, lockfile, misma huella en CI y en tu máquina, y otra persona que reproduce. El nivel cuatro de WAR pide algo que ya viste hoy: publicar un guardia que falló y qué cambió después.

## Mini-quiz

[15:59] → E23 · pausa 5 s

Mini-quiz. Pausa si quieres. Primera: tu auditoría corre en verde en tu laptop y en tu CI, pero la persona que intentó reproducirla no logró la misma huella. ¿Está aprobada? A, sí, porque a ti te funciona. B, no: el criterio es que otra persona la reproduzca en limpio con la misma huella; su reporte se publica tal cual y la diferencia se investiga. C, sí, si el CI está verde. D, sí, si la diferencia es pequeña. La B.

[16:36] → E24 · pausa 5 s

Segunda: tu corrida de mutantes da cuatro KILLED, un SURVIVED y dos INFRA_ERROR. ¿Cuál es el kill rate? A, cuatro séptimos. B, cuatro quintos. C, seis séptimos. D, cinco séptimos. Es la B: solo KILLED y SURVIVED puntúan, cuatro sobre cuatro más uno. Los fallos de infraestructura se ven en el reporte, pero no cuentan ni a favor ni en contra.

[17:05] → E25 · pausa 5 s

Tercera: tu verify detecta un log borrado, pero deja pasar un log viejo con el mismo nombre. ¿Qué tienes? A, un verificador completo. B, un chequeo que se comporta como P6: comprueba que el archivo exista, no que sea el que se produjo, y hay que atar cada recibo al hash registrado al correr el paso. C, un problema del sistema de archivos. D, nada grave. La B. El mutante log sustituido sobrevive a tu guardia, y eso se publica y se corrige.

## Cierre

[17:43] → E26

Tres ideas para cerrar el capstone. Primera: las reglas duras viven en el código, y ese código también se ataca; mi hook con veintiocho pruebas tenía un hueco, lo encontró una mutación, y los huecos que no pude cerrar quedan escritos como límites conocidos. Segunda: el sobreviviente es el hallazgo; esconderlo para que todo quede verde convierte la auditoría en un falso verde. Tercera: aprobado no es que te funcione a ti; es que otra persona, en un entorno limpio, con un comando, obtenga la misma huella, y que lo que no se ejecutó quede escrito. El último módulo es tu carrera: cómo contar todo esto en dos minutos, con números que salen de un comando.

# Guion · Módulo 05 · Obsidian — tu segundo cerebro (Fase 0 del método)

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Ritmo de referencia: 150 palabras por minuto. Las marcas de tiempo se calcularon con ese ritmo y las pausas del quiz.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m3b) y `quiz-01-10.json` (m3b). Laboratorio: `war-paradigm/experiments/03-second-brain` (vault, hook y `tests/vault-links.test.mjs`).

## 1. Gancho

[00:00] → E01
Le pides a un asistente de IA que escriba pruebas de Playwright para un flujo que nunca ha visto. Te devuelve código limpio, sintaxis correcta, y no prueba nada que importe. Roles inventados, datos de relleno, códigos de estado supuestos. Eso no lo arregló un prompt mejor. Lo arregló darle al asistente lo mismo que un QA senior lleva en la cabeza, escrito en un solo lugar que lee antes de cada tarea. Después de eso, los escenarios volvieron con los roles, los códigos y los datos reales del proyecto. Hoy armamos ese lugar.

[00:38] → E02
Soy Cristian Guerra, hago QA desde Medellín, y este es el módulo cinco del curso: Obsidian, tu segundo cerebro. La fase cero de mi método.

## 2. Explicado para un niño de 8 años

[00:48] → E03
Piensa en el cuaderno de la clase. Si en la primera página están escritas las reglas del juego, quién es quién, dónde se guardan los balones y qué está prohibido, cualquiera puede jugar bien sin preguntarte todo. Hasta el niño nuevo que llegó hoy.

Una IA es como ese niño nuevo, pero que llega nuevo todos los días. No se acuerda de lo de ayer. Si el cuaderno está bien escrito, lo lee y juega como si llevara meses. Si no hay cuaderno, adivina. Y cuando adivina, se equivoca con mucha seguridad. Hoy vamos a escribir ese cuaderno, y vamos a ponerle una regla que nadie se puede saltar, ni siquiera la IA.

## 3. Teoría

[01:33] → E04
Antes que la IA va la documentación. Lo digo así: la IA sin contexto es un becario brillante con amnesia. Brillante, porque escribe rápido y bien. Con amnesia, porque cada sesión empieza de cero. Mientras más documentas, mejor arranca contextualizada.

Esto es un bucle, y es el que sostiene todo mi método. Documentas. La IA lee. Arranca con contexto. Trabaja: diseña escenarios, escribe código de Playwright, hace triaje de fallas. Las pruebas corren y dejan evidencia, que se enlaza de vuelta a las notas. Y cada sesión termina con una nota, para que mañana empiece donde quedó hoy. Documentar alimenta a la IA, y lo que la IA produce vuelve a la documentación.

Obsidian es la herramienta que uso para eso: notas en Markdown, en carpetas normales, enlazadas entre sí con dobles corchetes. Documentación viva, para el onboarding de cualquiera que llegue, incluido tú mismo dentro de seis meses, e incluida la IA.

¿Y qué la hace viva? Que se actualiza como parte del trabajo diario y está donde trabajas. La documentación muerta se escribió una vez para un auditor y nadie la volvió a tocar. Esa miente en semanas, porque el sistema cambia y la nota no. La viva es parte del flujo: cambias algo, actualizas la nota, en el mismo PR.

[02:58] → E05
Ahora, no todo el contexto va en el mismo lugar. Uso tres capas.

Capa uno: el `CLAUDE.md`, o `AGENTS.md` según la herramienta. Son las reglas del proyecto: comandos frecuentes, convenciones, lo prohibido. Vive en el repo, se versiona con el código y lo lee cualquier herramienta que abra el proyecto.

Capa dos: la memoria persistente. Hechos sobre ti y tu forma de trabajar que sobreviven entre sesiones. Esa capa ataca la amnesia en el nivel de quién eres tú.

Capa tres: Obsidian. El conocimiento profundo: los flujos, la matriz de roles, los bugs conocidos, las lecciones. Lo que sabe el equipo.

Memoria es quién eres tú. `CLAUDE.md` es cómo es el proyecto. El vault es lo que sabe el equipo. Y una regla para el `CLAUDE.md` que no se negocia: nunca lleva secretos. Ni tokens, ni credenciales. Se versiona con el repo, así que lo lee cualquiera que tenga el repo. Los secretos van en un gestor de secretos.

[04:02] → E06
Segunda idea: da el contexto suficiente, no todo. Si pegas el vault entero en cada prompt, diluyes lo importante y gastas ventana de contexto. Lo que funciona es apuntar a la nota relevante. ¿Vas a pedir pruebas del API de pagos? Le pasas la nota con el contrato y las trampas conocidas del dataset, no la descripción de memoria ni el nombre de los endpoints para que adivine.

Por eso el vault tiene una nota de entrada, el mapa: `00 - READ FIRST`. No es el territorio, es el mapa. Cada sección enlaza a la nota que tiene el detalle, y el asistente sigue los enlaces que necesita.

Y aquí entra MCP, el Model Context Protocol. En una frase: un protocolo estándar para conectar herramientas y fuentes de datos al modelo. El navegador, una base de datos, una API. Es la forma de que el modelo use cosas en vez de que tú le copies y pegues todo.

Un ejemplo de por qué esto paga. Resuelves un bug rarísimo después de cuatro horas. Si no escribes nada, el próximo que se lo encuentre, o tú en seis meses, paga otra vez las cuatro horas. Si escribes una nota con la causa raíz, la solución y cómo se detecta y se previene, esas cuatro horas se pagaron una sola vez. Y la próxima vez que la IA vea algo parecido, tiene la nota para leer.

[05:35] → E07
Tercera idea, y la más importante: los hooks. Un hook es una cosa que pasa sola. Todo lo que quieras que ocurra siempre que pase X, es un hook, no una nota.

¿Por qué no basta con escribirlo en el `CLAUDE.md`? Porque un prompt, o una regla escrita, se puede ignorar. Lo que depende de memoria, sea humana o de la IA, falla. Un hook no se olvida.

En el experimento 03 de war-paradigm, el archivo `.claude/settings.json` registra un hook `PreToolUse` para la herramienta Bash. Antes de que el asistente ejecute cualquier comando, corre `hooks/block-push-to-main.sh`. Si el comando es un push a `main` o `master`, el hook sale con código 2, el comando se bloquea y el asistente ve el mensaje. Y la nota `Golden rules`, regla cinco, lo dice: las reglas duras viven en hooks; no busques cómo saltarlo, abre un pull request.

Y como todo guardia, el hook se prueba. Su suite crea repositorios de git temporales de verdad, uno parado en main y otro en una rama de feature, y le lanza cada caso con los tres parsers que tiene el hook: jq, node y sed. Si un día alguien rompe el hook, la suite lo dice antes de que lo descubras con un push accidental a main.

Entonces, la pregunta que te vas a hacer con cada regla: ¿esto es contexto, es memoria o es un hook?

## 4. Laboratorio

[07:07] → E08
Abre la carpeta `vault` del experimento 03 como un vault de Obsidian. Son catorce notas. Arriba, dos que el asistente lee antes que nada: `00 - READ FIRST` y `Golden rules`. El READ FIRST es el proyecto en una página: qué se prueba, que es DocFlow; cómo se prueba; y una tabla de dónde vive cada cosa. ¿Qué flujos existen? `03 Knowledge`. ¿Cómo hacemos algo? `02 Workflows`. ¿Qué decidimos? `01 QA process`. ¿Qué pasó ayer? `04 Sessions`. ¿Cómo empiezo una nota? `99 Templates`.

Y las Golden rules son nueve. Te leo tres. "Do not invent": nada de datos de prueba, roles o códigos de estado que no estén en `03 Knowledge`; si algo falta, dilo y crea una tarea. "Green three times, not once": una prueba que pasó una vez es candidata, no prueba. Y "close the session with a note".

Esa última tiene plantilla, en `99 Templates/Session note`. Cuatro secciones: el objetivo en una línea; qué pasó, con enlaces a las notas que cambiaron; las decisiones y por qué, porque las decisiones viven ahí y no en el chat; y los siguientes pasos, cada uno lo bastante pequeño para una sesión. Al otro día, el asistente lee la última nota de sesión y arranca donde quedaste. Esa es la parte del bucle que más se olvida, y la que más tiempo ahorra.

[08:36] → E09
Dos lecciones vienen en la estructura. La primera: la estructura le gana al volumen. Carpetas pequeñas, aburridas y predecibles son las que dejan al asistente encontrar la nota correcta cada vez. La segunda: una nota, una pregunta, enlazada a las demás. Cuando el asistente lee el flujo dorado, por los enlaces también le llegan los roles, los bugs conocidos y los datos. Sin adivinar.

Mira la nota `Design scenarios with AI`. Antes de preguntar, el asistente lee el READ FIRST, las reglas, el flujo, la matriz y los defectos abiertos, para no redescubrirlos. El pedido termina con "do not invent roles or data", y apunta a la nota de datos de prueba. Y cada nota empieza con un frontmatter: `type`, `status` y `tags`.

Para tu reto te piden una nota "de HU a certificación". El vault trae un modelo que puedes adaptar: `Definition of done for a story`. Es una lista de chequeo. La historia queda certificada cuando todo es cierto: escenarios diseñados desde los criterios de aceptación, cada uno con su fuente; todos los requisitos obligatorios cubiertos; un escenario negativo con 403 por cada acción protegida; los casos de frontera, mínimo, máximo y sus vecinos; el flujo dorado en verde en el navegador; la ronda de mutantes con cada sobreviviente reportado; verde tres veces seguidas, no una; evidencia adjunta; y la nota de sesión escrita. Fíjate que ahí están los módulos uno, dos y WAR juntos, en una sola página.

Y el glosario. No lo compliques: una tabla de palabra y qué significa en tu proyecto, con frases de una línea. El README de war-paradigm tiene una tabla así, "Palabras difíciles", con suite, mutante, oráculo, KILLED, SURVIVED, flujo dorado y 403. Si un niño la entiende, la IA también.

[10:32] → E10
Ahora, la documentación también se prueba. En el experimento hay un archivo, `tests/vault-links.test.mjs`, que revisa cinco cosas: que existan las dos notas de entrada, que existan las cinco carpetas del bucle, que cada enlace con dobles corchetes apunte a una nota que existe, que cada nota tenga frontmatter con `type`, y que ninguna nota sea una isla, o sea que cada nota enlace a otra o reciba un enlace.

Corres `npm run test:03` desde la raíz del repo. En mi corrida, las cinco del vault pasan, junto con las del hook: 45 de 45.

Un detalle del código que vale la pena: el chequeo resuelve los enlaces por nombre de nota, sin importar la carpeta, porque así los resuelve Obsidian. Por eso puedes mover una nota de carpeta sin romper nada, pero si la renombras o la borras, el chequeo lo nota. Y la regla de las islas no exige que todas las notas enlacen hacia afuera: basta con que reciban un enlace de alguna otra. Una nota que nadie enlaza y que no enlaza a nadie es una nota que la IA nunca va a encontrar siguiendo el mapa.

[11:48] → E11
Con eso, escribe el `CLAUDE.md` de tu repo del curso. Te muestro la forma, y es un ejemplo, no un archivo de ningún repo. Una sección de comandos frecuentes: `npm ci`, `npx playwright test`, cómo abrir el reporte. Una de convenciones: conventional commits, una rama por cambio, dónde viven los tests. Una de lo prohibido: no hacer push a main, no inventar datos, no commitear `.env`. Y un enlace al READ FIRST del vault para todo lo demás. Corto. Y sin un solo secreto.

## 5. Mutación WAR de la semana

[12:22] → E12
La mutación de esta semana: borra una nota enlazada y comprueba que tu chequeador de enlaces lo nota.

Elijo `Test data - users`, en `03 Knowledge`. Antes de borrarla busco quién la enlaza: seis notas. El READ FIRST, la estrategia, el flujo de diseño con IA, DEF-001, el flujo dorado y la plantilla de flujos. Predicción: el chequeo de enlaces falla y lista esas seis.

¿Por qué esa? Porque es una de las notas más enlazadas del vault y la que impide que la IA invente usuarios. Si desaparece y nadie lo nota, la regla "do not invent" queda apuntando a la nada.

[13:02] → E13
Borro la nota en una copia y corro `npm run test:03`. Resultado: 45 pruebas, 44 pasan, una falla. La que falla es "every wikilink resolves to a note". Y el mensaje trae exactamente la lista: `00 - READ FIRST.md` apunta a `Test data - users`, `Test strategy.md` también, y así las seis. Predicción cumplida: KILLED. Restauro la nota y vuelve a 45 de 45.

[13:27] → E14
Ahora, un matiz que quiero que pienses. En el banco de preguntas del módulo hay una que dice que un enlace a una nota que todavía no existe no siempre es un error: en un vault vivo puede ser un marcador de trabajo pendiente, y el grafo te muestra los huecos. Y el chequeo del repo lo convierte en error de build. ¿Se contradicen? No. Mientras escribes, el enlace roto te dice qué falta documentar. Pero la plantilla que publicas, la que va a leer una IA como fuente de verdad, no puede tener enlaces que no llevan a ningún lado. Decide en tu proyecto dónde está esa línea, y escríbela en las reglas.

## 6. El reto y cómo se evalúa

[14:13] → E15
El entregable es tu vault base más el `CLAUDE.md` del repo del curso. El vault con reglas del proyecto, un glosario y una nota "de HU a certificación".

Criterios verificables. Uno: el vault tiene una nota de entrada, el READ FIRST, que enlaza a las demás. Dos: ninguna nota queda aislada y ningún enlace apunta a una nota que no existe. Tres: el `CLAUDE.md` o `AGENTS.md` no tiene secretos.

Rúbrica de cuatro niveles: uno, falta el entregable; dos, está pero falla un criterio; tres, aprobado; cuatro, además un test rompe el build si hay un enlace roto o una nota aislada, como el `vault-links.test.mjs` del experimento 03. Y apruebas el módulo con el reto en nivel tres y el quiz, seis de ocho.

## 7. Mini-quiz

[15:02] → E16
Tres preguntas. Pausa si quieres.

Primera. Según las tres capas de contexto, ¿dónde viven las reglas del proyecto? A: en la memoria persistente de la IA. B: en el `CLAUDE.md`. C: en una nota suelta de Obsidian. D: en el prompt de cada día.
[pausa 5 s]
La B. `CLAUDE.md` son las reglas del proyecto, la memoria son hechos sobre ti y Obsidian es el conocimiento profundo.

[15:33] → E17
Segunda. Quieres que algo ocurra siempre que pase X, por ejemplo al guardar un archivo. Según el método, eso es: A: una nota recordatorio en Obsidian. B: un hook. C: pedírselo a la IA cada vez. D: disciplina personal.
[pausa 5 s]
La B. Lo que debe pasar solo se configura. Lo que depende de memoria humana, falla.

[16:00] → E18
Tercera. ¿Qué no debe ir jamás en el `CLAUDE.md` del repo? A: los comandos frecuentes. B: las convenciones de nombres. C: tokens, credenciales o secretos. D: las reglas de estilo de los tests.
[pausa 5 s]
La C. El `CLAUDE.md` se versiona con el repo y lo lee cualquier herramienta.

## 8. Cierre

[16:23] → E19
Tres ideas. Una: la IA sin contexto es un becario brillante con amnesia; documentar primero es lo que la vuelve útil. Dos: tres capas, `CLAUDE.md` para el proyecto, memoria para ti y el vault para el equipo, y das el contexto suficiente, no todo. Tres: lo que debe pasar siempre es un hook, y la documentación también se prueba.

El siguiente módulo es TypeScript para QA: tipos, async y await, y validar en runtime lo que el compilador no ve. Los enlaces están en la descripción.

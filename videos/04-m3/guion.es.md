# Guion · Módulo 04 · Setup día 0 — el entorno

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Ritmo de referencia: 150 palabras por minuto. Las marcas de tiempo se calcularon con ese ritmo y las pausas del quiz.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m3) y `quiz-01-10.json` (m3). Laboratorio: tu propio repo del curso, con `war-paradigm` como repo de referencia. Documentación oficial: playwright.dev/docs/intro.

## 1. Gancho

[00:00] → E01
Subí Playwright de la 1.63 a la 1.64 en el `package.json`. Una línea. No toqué el lockfile. Y `npm ci` se negó a instalar: "npm ci can only install packages when your package.json and package-lock.json are in sync". Ese error, que parece un estorbo, es exactamente lo que quiero que tengas desde el día cero: un entorno que se queja cuando alguien cambia una versión por accidente. Porque la alternativa es peor: que nadie se queje y cada máquina corra una versión distinta.

[00:33] → E02
Soy Cristian Guerra, hago QA desde Medellín, y este es el módulo cuatro del curso: setup del día cero, el entorno.

## 2. Explicado para un niño de 8 años

[00:42] → E03
Antes de cocinar, dejas lista la cocina. Las ollas limpias, los ingredientes a mano, la estufa prendiendo. Si no, a mitad de la receta te das cuenta de que no hay sal y se te quema el arroz mientras la buscas.

Con la automatización pasa lo mismo. Antes de escribir tu primera prueba, dejas lista tu máquina: las herramientas instaladas, la versión correcta de cada una y un lugar ordenado donde guardar tu trabajo. Y algo más: una lista de la receta que diga exactamente qué marca de cada ingrediente usaste, para que cualquiera que cocine después en otra cocina saque el mismo plato. En programación esa lista existe y se llama lockfile. Hoy la vamos a cuidar mucho.

## 3. Teoría

[01:29] → E04
Este es el día cero de mi método: dejar el entorno listo para no pelear con herramientas después. Si vienes de desarrollo esto te va a tomar poco, pero hazlo bien: versionado, cuentas e IDE.

Empiezo por Node.js. Node publica dos tipos de versión: la LTS, de soporte largo, y la Current, la más nueva. Para un proyecto de pruebas quieres la LTS. A octubre de 2026 la LTS es Node 24, y la 26 todavía es Current. Ojo con una trampa: `brew install node`, así a secas, instala la Current, no la LTS.

Y para que veas que no es teoría: en la máquina donde preparé este video, `node --version` dice v26.8.1. La Current. Es exactamente lo que pasa cuando instalas sin pensar en la versión. Playwright, por su parte, soporta las últimas 22, 24 y 26, así que va a correr. Pero tu equipo y tu CI necesitan saber cuál es la de referencia, y eso se decide, no se hereda.

[02:34] → E05
Segundo: fijar versiones. El curso verificó estas el 26 de octubre de 2026: Playwright 1.64, TypeScript 7.0, Node 24 LTS, Java 25 LTS si vas por el stack Java, Karate 2.1 y k6 2.3. La regla es fijarlas en el `package.json` y en el lockfile, y subirlas a propósito, no por accidente.

Mira el repo de referencia del curso, war-paradigm. En su `package.json` Playwright está fijado en `1.63.0`, exacto, sin el sombrerito que permite subir solo. Ya salió la 1.64, pero el repo no se movió solo. Cuando alguien la suba va a ser en un commit con nombre propio. Eso es lo que significa subir a propósito.

Compáralo con TypeScript en el mismo archivo: dice `^5.9.0`, con sombrerito. Ese sombrerito permite cualquier 5 punto algo igual o mayor. Entonces, ¿quién decide cuál se instala? El lockfile. En mi copia quedó la 5.9.3, y esa es la que va a instalar cualquiera que haga `npm ci` mientras el lockfile no cambie. Fíjate también en otra cosa: el curso habla de TypeScript 7 y este repo sigue en la 5.9. Es el mismo principio. El repo no se actualiza porque salió algo nuevo; se actualiza cuando alguien lo decide y lo prueba.

[03:55] → E06
Tercero: npx. Cuando corres `npx playwright test`, npx usa el binario local del proyecto, la versión que dice el `package.json` y que fija el lockfile. No la que tengas instalada global en tu máquina. Así todos corren la misma versión, y se acaba el "en mi máquina corre otra".

Y el lockfile, el `package-lock.json`, es la lista de la receta: la versión exacta de cada dependencia y de las dependencias de tus dependencias. Se commitea. Siempre. Con él, `npm ci` instala exactamente lo mismo en tu máquina, en la de tu compañero y en el CI. Sin él, cada instalación puede resolver versiones distintas.

Y vale la pena saber en qué se diferencia `npm ci` de `npm install`, porque la documentación de npm lo dice en cinco puntos. `npm ci` exige que exista el lockfile. Si el lockfile no coincide con el `package.json`, sale con error en vez de arreglarlo. Instala el proyecto completo, no dependencias sueltas. Si ya hay un `node_modules`, lo borra antes de empezar. Y nunca escribe en el `package.json` ni en el lockfile: la instalación queda congelada. Por eso `npm install` es para cuando tú cambias dependencias, y `npm ci` es para el CI y para cualquier máquina que solo tiene que reproducir lo que ya está decidido.

[05:20] → E07
Cuarto: git en serio. Ramas, pull requests, conventional commits y code review de tests.

Una rama por cambio. `git checkout -b feat/login-tests` crea la rama nueva desde donde estás y te cambia a ella, en un solo paso. Esa rama existe solo en tu máquina hasta que hagas `git push -u origin`.

Conventional commits: tipo, alcance opcional y descripción. Mira el historial real de war-paradigm: "fix(03): el hook bloquea push a main con opciones globales de git". "docs: el hook tiene 33 casos de prueba". "style: paleta de marca azul marino y menta en el banner". Lees el historial y sabes qué pasó sin abrir un archivo. Si agregas casos al login, es `test:`. Si subes la versión de Playwright, no es `feat` ni `fix`: es mantenimiento, `chore` o `build`, según la convención del equipo.

Y los PR, pequeños. Un PR de doscientas líneas se revisa de verdad. Uno de dos mil se aprueba por cansancio y los bugs pasan. Antes de pedir review, lee tu propio diff con ojos de revisor: ahí atrapas los logs olvidados y los archivos de más.

Y cuando te toque un conflicto de merge, por ejemplo en un archivo de steps, no aceptes "mi versión" ni "la de ellos" a ciegas. Un conflicto es una conversación entre dos intenciones. Lees los dos cambios y combinas lo que corresponde, porque muchas veces las dos cosas tienen que convivir.

[06:53] → E08
Quinto: el editor y la estructura. VS Code con las extensiones de QA: la de Playwright, para correr y depurar pruebas desde el editor, y ESLint, para que el código de pruebas tenga las mismas reglas que el de producción.

Y la estructura del repo. Un repo de automatización tiene un README que dice cómo instalar, cómo correr cada suite y cómo leer el reporte. Alguien nuevo, o una IA, debe poder correr todo sin preguntarte. Tiene un `.gitignore` que deja afuera lo que se regenera. Y tiene una forma predecible. war-paradigm, por ejemplo, tiene una carpeta por experimento, `assets` para la marca, `docs` para la animación y `.github/workflows` con un solo job que corre todo.

Vale la pena leer ese workflow, porque es el modelo del nivel cuatro de tu reto. Se dispara en cada push a main, en cada pull request y a mano. Paso uno, descarga el código. Paso dos, prepara Node 22 con caché de npm. Paso tres, `npm ci`. Paso cuatro, revisa los tipos con `npm run typecheck`. Paso cinco, instala Chromium. Después corre los tres experimentos, uno por paso, y al final sube el reporte de Playwright como artefacto aunque algo haya fallado, y lo guarda catorce días. Nada sofisticado. Y como el tercer paso es `npm ci`, un lockfile desalineado frena todo antes de la primera prueba.

## 4. Laboratorio

[08:22] → E09
A la terminal. Primero, mira qué tienes. `node --version`, `npm --version`, `git --version`, `gh --version`. En mi máquina: Node v26.8.1, npm 11.19.0, git 2.50.1 y gh 2.90.0. Ya sabes qué opino del primero.

Un consejo práctico: copia esas cuatro líneas en el README de tu repo, en una sección que diga con qué versiones se probó. Cuando algo falle en la máquina de otra persona, lo primero que vas a comparar es eso, y te ahorras media hora de "en mi máquina sí corre".

[08:56] → E10
Instalas con `brew install node@24 git gh`, o con `nvm install --lts` si usas nvm. Fíjate en el `@24`: eso es lo que te da la LTS y no la Current.

Luego creas tu repo del curso y arrancas el proyecto con `npm init playwright@latest`. Según la documentación oficial, te pregunta cuatro cosas: TypeScript o JavaScript, con TypeScript por defecto; el nombre de la carpeta de pruebas, `tests` por defecto; si quieres agregar un workflow de GitHub Actions, que es lo recomendado para CI; y si instala los navegadores. Te deja un `playwright.config.ts`, el `package.json`, el `package-lock.json` y una carpeta `tests` con un ejemplo. Y para correr: `npx playwright test`.

Si en algún momento clonas un proyecto que ya existe, como war-paradigm, no corres el init: corres `npm ci` y después `npx playwright install --with-deps chromium`. El primero instala las dependencias exactas del lockfile. El segundo descarga el navegador que esa versión de Playwright espera, con las librerías del sistema que necesita. Son dos cosas distintas: la librería de Playwright vive en `node_modules`; los navegadores se descargan aparte.

[10:07] → E11
Ahora comprueba lo de npx. En la carpeta de war-paradigm, `npx playwright --version` responde "Version 1.63.0", que es la que fija su `package.json`. Y si preguntas por un playwright global con `which playwright`, en mi máquina no hay ninguno. No lo necesito: cada proyecto trae el suyo. Ese es el primer criterio del reto: `node --version` muestra una LTS y `npx playwright --version` corre desde el proyecto.

[10:34] → E12
El `.gitignore`. Este es el de war-paradigm, real: `node_modules`, `test-results`, `playwright-report`, `blob-report`, `.DS_Store`, los logs, y `.env` con todas sus variantes. Las tres primeras son las que pide el criterio del curso. Las dependencias y los artefactos de ejecución se regeneran; commitearlos infla el repo y genera conflictos que no le aportan nada a nadie. Y los `.env` afuera, porque ahí viven las llaves.

Y el README. Tres secciones bastan para empezar: cómo instalar, cómo correr cada suite y cómo leer el reporte. Si alguien nuevo, o una IA, puede clonar tu repo y correr todo leyendo solo eso, el README cumple. Si te tiene que escribir para preguntar, todavía no.

[11:18] → E13
Y el flujo de PR contigo mismo. Creas la rama: `git checkout -b feat/login-tests`. Haces tu cambio, commit con conventional commits, y `git push -u origin feat/login-tests`. En GitHub abres el PR, o con `gh pr create` desde la terminal. Escribes una descripción: qué cambia y cómo se prueba. Lees tu propio diff como si fuera de otra persona. Y haces merge.

Una descripción que sirve es corta. Por ejemplo: "Agrega casos de credenciales inválidas al login. Cómo probar: `npx playwright test login`. Riesgo: ninguno fuera de la carpeta de tests." Con eso, quien revise sabe qué mirar y cómo comprobarlo sin preguntarte.

¿Por qué hacer PRs contigo mismo, si nadie más va a revisar? Para ensayar el rito diario del oficio y dejar historia auditable. El día que trabajes en equipo, ese flujo te va a salir natural.

## 5. Mutación WAR de la semana

[12:14] → E14
La mutación de esta semana: rompe tu entorno a propósito antes de confiar en él. Cambia la versión de Node o borra el lockfile, y mira si tu CI lo nota.

Ya viste en el gancho la primera: subir una versión en el `package.json` sin actualizar el lockfile. Ahora la segunda, en una copia de war-paradigm: borro el `package-lock.json`. Predicción: `npm ci` se niega a instalar.

[12:40] → E15
Corro `npm ci`. Error: "The npm ci command can only install with an existing package-lock.json or npm-shrinkwrap.json". Código de salida uno. Predicción cumplida.

Ahora, ¿lo notaría el CI? El workflow de war-paradigm tiene un paso que se llama Install y que corre exactamente `npm ci`, con Node 22. Así que cualquiera de las dos mutaciones lo frenaría en el primer paso, antes de correr una sola prueba. Esa es la defensa que quieres.

Y la otra mitad de la mutación, cambiar la versión de Node, te la dejo a ti, con un aviso. war-paradigm declara en `engines` que necesita Node 20 o superior. Prueba qué hace tu instalación con una versión por fuera de ese rango y anota si falla o solo avisa. No lo corrí para este video, así que no te voy a decir el resultado: escríbelo en tu tabla como predicción y compruébalo.

## 6. El reto y cómo se evalúa

[13:39] → E16
El entregable es tu repo del curso creado, con README y tu primer PR mergeado.

Criterios. Uno: `node --version` muestra una versión LTS y `npx playwright --version` corre desde el proyecto. Dos: el repo tiene README, un `.gitignore` con `node_modules`, `test-results` y `playwright-report`, y el lockfile. Tres: hay al menos un PR mergeado con descripción.

Rúbrica de cuatro niveles: uno, falta el entregable; dos, está pero falla un criterio; tres, aprobado, cumple todo; cuatro, además tienes un workflow mínimo que corre `npm ci` y falla si el lockfile no coincide con el `package.json`. Como el de war-paradigm. Y apruebas el módulo con el reto en nivel tres y el quiz, seis de ocho.

Para el nivel cuatro no necesitas inventar nada: un workflow con checkout, setup de Node con la LTS y `npm ci`. Y para demostrar que funciona, haz la mutación de esta semana en una rama: sube una versión en el `package.json` sin tocar el lockfile, abre el PR y deja que el CI se ponga rojo. Ese PR en rojo, con el error de npm a la vista, es tu evidencia. Después lo cierras sin merge.

## 7. Mini-quiz

[14:54] → E17
Tres preguntas del banco. Pausa si quieres.

Primera. ¿Qué hace exactamente `git checkout -b feat/login-tests`? A: cambia a una rama existente. B: crea una rama nueva desde donde estás y te cambia a ella. C: crea la rama en el remoto. D: hace commit de lo pendiente.
[pausa 5 s]
La B. Menos b es crear y cambiar en un paso. La rama existe solo local hasta que hagas push.

[15:26] → E18
Segunda. ¿Qué debe estar en el `.gitignore` de un repo de Playwright? A: los page objects. B: `node_modules`, `test-results` y `playwright-report`. C: los archivos `.feature`. D: el `playwright.config.ts`.
[pausa 5 s]
La B. Dependencias y artefactos de ejecución se regeneran. Commitearlos infla el repo.

[15:48] → E19
Tercera. ¿Qué diferencia hay entre `npx playwright test` y tener Playwright instalado global? A: ninguna. B: npx ejecuta el binario local del proyecto, la versión del `package.json`, y todos corren la misma. C: npx es más lento y peor. D: npx descarga siempre la última versión.
[pausa 5 s]
La B. La versión la fija el lockfile del proyecto, no la máquina de cada quien.

## 8. Cierre

[16:17] → E20
Tres ideas. Una: Node LTS, y versiones fijadas en el `package.json` y el lockfile; se suben a propósito, en un commit con nombre. Dos: npx usa la versión del proyecto, y `npm ci` instala exactamente lo que dice el lockfile o se niega. Tres: rama, PR, review y merge desde el primer día, con commits que se leen como un changelog.

El siguiente módulo es Obsidian, tu segundo cerebro: documentar antes de pedirle nada a la IA. Los enlaces están en la descripción.

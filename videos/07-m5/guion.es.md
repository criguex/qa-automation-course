# Módulo 5 · Playwright + TypeScript E2E — framework desde cero

Guion de narración en español (Colombia). Voz: Cristian, primera persona. Ritmo de referencia: 150 palabras por minuto. Las marcas `[mm:ss]` se calculan con ese ritmo; `→ E07` indica la escena de `escenas.json`.

## 1. Gancho

**[00:00] → E01**

El 26 de septiembre de 2026 las cinco corridas de mi repo qa-eval-lab en main quedaron en rojo. El job de pruebas de interfaz terminó con una prueba en verde y dos en rojo. Y la aplicación no tenía nada roto. Lo que estaba mal era mi prueba: después de reutilizar la sesión, esperaba un mensaje de bienvenida que el sitio muestra una sola vez, justo después de iniciar sesión. Con la sesión guardada ese mensaje ya no aparece, así que la prueba fallaba aunque el usuario sí estuviera adentro.

**[00:36] → E02**

Hoy vas a construir un framework de Playwright con TypeScript que no caiga en eso. Page Objects, fixtures, login una sola vez con storageState, un flujo con dos roles y un trace para diagnosticar en vez de poner un sleep. Este es el módulo 5, y para mí es el corazón del oficio.

## 2. Explicado para un niño de 8 años

**[00:57] → E03**

Imagina un robot que usa una página web como lo haría una persona. Abre la página, hace clic en un botón, escribe su nombre y mira si aparece lo que debería aparecer. Eso es Playwright.

Ahora imagina que el robot tiene una libreta. En cada hoja de la libreta anotó dónde está cada botón de una pantalla: la hoja de la entrada, la hoja del carrito, la hoja del pago. Así, cuando le pides "entra con este usuario", no tiene que buscar los botones otra vez: abre la hoja y listo. Esa libreta es el Page Object.

Y una cosa más: el robot no entra por la puerta cada vez que juega. Entra una vez, guarda su manilla de acceso, y en los siguientes juegos muestra la manilla. Esa manilla es el storageState. Si alguien le quita la manilla, el robot queda afuera, y eso también lo tenemos que poder ver.

## 3. Teoría

### Bloque 1 · Locators, auto-waiting y aserciones web-first

**[01:58] → E04**

Empecemos por lo que más rompe suites: cómo encuentras un elemento y cuándo decides que ya está listo.

Un locator en Playwright no es el elemento. Es la receta para encontrarlo cada vez que lo necesitas. Cuando haces clic, Playwright busca el elemento en ese momento, espera a que esté visible, estable y habilitado, y solo entonces actúa. A eso se le llama auto-waiting.

La receta importa. Mira la diferencia entre `getByRole('button', { name: 'Pagar' })` y una cadena de CSS como `.btn-pay-2 > span`. La primera se ancla a lo que ve el usuario: un botón que se llama Pagar. La segunda se ancla a cómo un desarrollador decidió maquetar ese botón en este sprint. El CSS cambia cada sprint; el rol y el nombre accesible cambian solo si cambia el producto.

**[02:50] → E05**

En civica-playwright-challenge esto es una decisión escrita. El ADR 0003 dice: solo locators semánticos, nada de XPath ni CSS. La caja de búsqueda se encuentra con `getByPlaceholder('Search IMDb')`, el botón del menú por su rol y su nombre, el título de la película con un test id estable. La consecuencia que anota el ADR también vale para ti: si quieres encontrar algo por su rol, ese algo tiene que tener rol y nombre. Sin proponértelo, empiezas a revisar accesibilidad.

La segunda mitad es la aserción. Compara estas dos líneas. `await expect(locator).toBeVisible()` reintenta hasta el timeout: espera a que la condición se cumpla. `expect(await locator.isVisible()).toBe(true)` mira una sola vez; si la página todavía no terminó de cargar, falla. La primera es una aserción web-first. La segunda es una foto de un instante, y las fotos de un instante son la fuente número uno de pruebas intermitentes.

### Bloque 2 · Fixtures, Page Object Model, projects y baseURL

**[03:48] → E06**

Un Page Object es una clase que esconde cómo se maneja una pantalla detrás de métodos que dicen qué quieres hacer. En civica, `HomePage` tiene un método `searchFor(query)`. Por dentro hace clic en la caja, la llena y presiona Enter. Por fuera, la prueba solo dice "busca Inception".

Ahora, ¿quién crea esos Page Objects? Aquí entran los fixtures. Un fixture es setup y teardown con nombre, con tipos y bajo demanda. En civica, `pageFixtures.ts` extiende el `test` base de Playwright y declara `homePage`, `searchResultsPage`, `movieDetailsPage` y `top250Page`. La prueba los pide en su firma, y Playwright se los entrega listos. Ninguna prueba escribe `new HomePage(page)`.

**[04:30] → E07**

Lo interesante es cómo se apilan. `mockFixtures.ts` extiende esos fixtures de páginas y agrega uno llamado `mockedSite` marcado como `auto`. Ese fixture instala el router que intercepta las peticiones antes de cada prueba. Las pruebas del proyecto mock importan este `test`; las pruebas e2e contra el sitio real importan el otro. Mismos Page Objects, otro backend, y ninguna aserción cambia.

Eso es lo que te da un fixture frente a un `beforeEach` global: cada prueba declara lo que necesita y no paga por lo que no usa. "Esta prueba necesita la página de resultados" se lee en la firma, no en un setup escondido en otro archivo.

Los projects completan el cuadro. En el `playwright.config.ts` de civica hay siete: mock, mutation, audit, api, performance, visual y e2e. Cada uno con su carpeta y su configuración. La `baseURL` vive en la configuración, no en las pruebas, por eso las pruebas navegan a `'/'` y no a una dirección completa. Si mañana cambias de ambiente, cambias una variable, no cien archivos.

**[05:37] → E08**

Y el entregable te pide smoke y regresión. No necesitas dos frameworks para eso; necesitas etiquetas. En civica, la prueba principal de búsqueda lleva `@smoke` en el título: busca Inception y valida el título en la ficha. El script `test:smoke` corre `playwright test --project=mock --grep @smoke`. Es un camino feliz por cada caso obligatorio, para correrlo antes de subir un cambio. La regresión es todo lo demás: el recorrido por todo el catálogo, la búsqueda sin distinguir mayúsculas y la búsqueda que no debe encontrar nada.

Esa última es la que más se olvida. Una suite que solo prueba que las cosas aparecen no te dice nada el día que la búsqueda empiece a devolver cualquier cosa. Por eso civica tiene la prueba "shows no results for an unknown title": busca un nombre que no existe y espera ver "no results found".

### Bloque 3 · Login reutilizable con storageState e interceptación de red

**[06:34] → E09**

Volvamos al gancho. En qa-eval-lab la configuración tiene dos projects. El primero se llama setup y solo corre `auth.setup.ts`. El segundo se llama ui, depende de setup, y usa `storageState: '.auth/user.json'`.

**[06:46] → E10**

El archivo de setup va a `/login`, llena usuario y contraseña con `getByLabel`, hace clic en el botón que se llama login, confirma que entró y guarda el estado del contexto en `.auth/user.json`. Cookies y almacenamiento local quedan en ese archivo. Las pruebas del project ui arrancan con esa sesión ya puesta.

El login por interfaz se prueba una vez, aparte. Todo lo demás arranca autenticado. Las pruebas son más rápidas y, sobre todo, no fallan porque el formulario de login tuvo un mal día.

Y aquí está la lección del rojo de septiembre. La prueba de sesión original esperaba el mensaje flash de "logged into a secure area". Ese mensaje lo genera el acto de iniciar sesión. Si reutilizas la sesión, nunca inicias sesión en esa prueba, así que el mensaje no existe. El arreglo, en el commit 7e56d62, fue cambiar la pregunta: en vez de buscar el mensaje, la prueba verifica que la dirección termine en `/secure` y que se vea el encabezado Secure Area. Eso sí describe "estoy adentro".

**[07:55] → E11**

La otra herramienta de este bloque es la interceptación de red. Con `page.route` agarras una petición antes de que salga y decides qué responder con `route.fulfill`. Civica la usa a lo grande: IMDb le muestra a los robots un muro de "confirma que eres humano", así que el proyecto mock intercepta todas las peticiones y responde con HTML con forma de IMDb, generado desde una sola fuente de datos.

Para tu framework úsala más pequeña. Si quieres ver qué hace la interfaz cuando el backend responde 500, interceptas ese endpoint y respondes 500. Sin tumbar staging, sin pedirle favores a nadie, y la prueba da lo mismo cada vez.

### Bloque 4 · Aislamiento, paralelización, retries y trace viewer

**[08:38] → E12**

Cada prueba de Playwright corre en un browser context nuevo: cookies y almacenamiento limpios. Eso es lo que permite correr en paralelo. Si dos pruebas paralelas crean el mismo usuario `test@demo.com`, una va a fallar al azar con "ya existe". El arreglo no es correr todo en serie ni ponerle un retry a esa prueba. El arreglo son datos únicos por prueba: las pruebas no comparten estado que se pueda modificar.

Sobre los retries. Civica tiene `retries: 2` en CI y `trace: 'on-first-retry'`. Léelo bien: el retry existe para capturar evidencia la primera vez que algo falla, no para convertir un rojo en verde. Si una prueba pasa al segundo intento, Playwright la marca como flaky, y eso es un hallazgo que se investiga.

**[09:28] → E13**

¿Cómo se investiga? Con el trace viewer. El trace guarda, por cada acción, una foto del DOM, las peticiones de red y la consola. Lo abres con `npx playwright show-trace` y la ruta del archivo, y recorres la prueba paso a paso. Ves en qué acción se quedó, qué había en la pantalla en ese momento y qué respondió el servidor.

Por eso digo que debuggear CI sin trace es adivinar. Y por eso el criterio del módulo dice que ninguna prueba usa `waitForTimeout` ni sleep. Un sleep de tres segundos no arregla nada: si la página tarda cuatro, falla igual; si tarda uno, perdiste dos en cada corrida.

**[10:12] → E14**

Una cosa más sobre honestidad. A veces la prueba no puede correr por algo que no controlas. En civica, las pruebas e2e contra el IMDb real se encuentran el muro anti-bot. Lo que hacen es esto: `test.skip(await isBotWallPresent(page), 'IMDb anti-bot wall detected — live E2E not runnable')`. Si el muro aparece, la prueba se hace a un lado y dice por qué. No se pone en rojo de mentiras ni en verde de mentiras.

El README lo resume así: 76 pruebas, 74 pasan y 2 se saltan honestamente. Ese "honestamente" es la parte importante. Un skip sin razón esconde cobertura; un skip con una condición verificable y un mensaje claro le dice a cualquiera que lea el reporte qué no se probó y por qué.

## 4. Laboratorio paso a paso

**[11:01] → E15**

Vamos a la terminal. Clono qa-eval-lab y sigo su README: `npm install`, `npx playwright install chromium` y `npm run test:ui`. El README avisa algo que te va a servir: con Node 26, `npm install` falla compilando una dependencia de Promptfoo; para la parte de Playwright basta `npm install --ignore-scripts`. CI usa Node 20.

**[11:22] → E16**

Esta es la corrida que hice en mi máquina el 26 de octubre, con Playwright 1.64.1. Tres pruebas con un worker. Primero el project setup: authenticate. Después el project ui: sesión autenticada reutilizada, y logout funciona. Tres pasan en 4,2 segundos. En CI, la corrida 40373649268 dio tres pasan en 5,8 segundos.

Fíjate en el orden. Setup corre primero porque ui depende de él. Si setup falla, ui ni siquiera arranca. Esa dependencia es la que te asegura que el storageState existe antes de usarlo.

Si la aplicación que vas a probar tiene captcha o doble factor, el mismo setup tiene un modo manual. Corres `MANUAL_LOGIN=1 npx playwright test --project=setup --headed`, inicias sesión tú en la ventana, y el archivo de sesión queda guardado para las demás pruebas.

**[12:14] → E17**

Ahora un framework más grande. Clono civica-playwright-challenge, corro `npm install`, que también instala Chromium, y después `npm test`. Ese script corre solo el project mock. La salida esperada que documenta el README termina en 19 pasan: búsqueda, Top 250, validaciones de la ficha y accesibilidad.

En CI corre todo lo determinista. La corrida 38665514760 en main, del 15 de octubre de 2026, pasó así: mock 19, mutation 21, audit 9, API 11, contrato 6, performance 4 y visual 4. Mira cómo cada project se reporta por separado. Cuando algo se rompe, sabes de una vez en qué capa.

Para tu repo te sugiero la misma forma, más pequeña: una carpeta de páginas, una de fixtures, las pruebas agrupadas por project y la configuración con la `baseURL`. No necesitas siete projects el primer día. Con setup, ui y uno de API para preparar datos tienes de sobra.

**[13:12] → E18**

Ahora el flujo con roles. Abro war-paradigm, el experimento 02. Su prueba golden hace esto: antes de cada prueba, un `request.post('/api/_reset')` deja la aplicación en un estado conocido. Esa parte va por API, porque es rápida y estable. Después, en el navegador, inicia sesión como editor, crea un documento llamado "Q4 launch plan" y cierra sesión. Inicia como approver y aprueba; la fila debe decir approved. Vuelve como editor y publica; la fila debe decir published.

Mira el helper `signIn`. Llena Email y Password con `getByLabel`, hace clic en el botón Sign in y confirma con una aserción web-first que el test id `me-role` muestre el rol esperado. Si el login dejara entrar con el rol equivocado, esa línea lo atrapa antes de seguir. Ese es el patrón para tu flujo RBAC: cada cambio de rol se verifica, no se supone.

**[14:08] → E19**

Ese archivo también te muestra un test híbrido en pequeño: estado por API, validación por interfaz. Tu entregable lo lleva un paso más allá. Prepara el dato por API, valida en la pantalla lo que el usuario ve, e intercepta una llamada con `page.route` para probar el camino triste.

Último paso del laboratorio: el trace. En civica la configuración guarda trace en el primer retry, screenshot solo cuando falla y video cuando falla. Cuando algo se ponga rojo en CI, descarga el reporte, abre el trace y busca la acción donde se quedó. No agregues un sleep "para ver si pasa".

## 5. Mutación WAR de la semana

**[14:49] → E20**

Regla del curso: una prueba que nunca viste fallar no ha demostrado nada. Así que, cuando tu prueba pase por primera vez, rómpele el producto.

El README de qa-eval-lab trae una mutación que puedes repetir hoy: con un storageState vacío, la prueba de sesión termina en `/login` y falla. Eso demuestra que la prueba sí depende de la sesión reutilizada. Si con el archivo vacío siguiera en verde, estaría probando otra cosa.

**[15:18] → E21**

La segunda es de war-paradigm. El mutante role-swap hace que un usuario viewer intente aprobar. La aplicación responde 403 y el marcador dice KILLED. Pero el mutante self-grant, un editor que se cambia su propio rol a admin, recibe 200. Sobrevive. Todas las pruebas del camino feliz estaban en verde mientras ese bug de autorización seguía abierto. Y preparando este curso encontré otro: un usuario viewer puede crear borradores, y el mutante `viewer-create` también sobrevive. De siete mutantes, cinco mueren y dos sobreviven.

Para tu framework: cambia un texto del producto, quita un permiso, y comprueba que alguna prueba se pone roja. Si ninguna se pone roja, encontraste un punto ciego.

## 6. El reto y cómo se evalúa

**[16:02] → E22**

El entregable es un repo con un framework de Playwright y TypeScript: Page Objects, fixtures, login con storageState, un flujo RBAC con dos roles, smoke y regresión, y un test híbrido.

Estos son los criterios, y todos se pueden verificar. Uno: `npx playwright test` termina en verde en local y en CI. Dos: ninguna prueba usa `waitForTimeout` ni sleep; un grep en el repo lo comprueba. Tres: el login se hace una vez y se reutiliza con storageState. Cuatro: hay al menos un flujo con dos roles.

Y el nivel más alto: rompes el producto a propósito en dos lugares y muestras que tus pruebas se ponen rojas. No me lo cuentes; muéstrame la corrida en rojo.

## 7. Mini-quiz

**[16:49] → E23**

Tres preguntas. Pausa el video si quieres pensarlas.

Primera. Una prueba falla de forma intermitente: a veces el botón no está. ¿Cuál es la primera jugada? A, un sleep de tres segundos antes del clic. B, configurar tres retries y seguir. C, locator correcto, aserciones web-first y revisar el trace. D, marcarla con IGNORE.

**[17:18] → E24**

Es la C. El sleep y los retries tapan el problema; el locator correcto con auto-waiting lo cura, y el trace te dice qué pasó de verdad.

Segunda. ¿Qué diferencia hay entre `await expect(loc).toBeVisible()` y `expect(await loc.isVisible()).toBe(true)`? La primera reintenta hasta el timeout. La segunda evalúa una sola vez y, si la página aún no cargó, falla.

Tercera. ¿Para qué sirve storageState? Para reutilizar la sesión autenticada y no repetir el login por interfaz en cada prueba. El login por interfaz se prueba una vez, aparte.

## 8. Cierre

**[18:00] → E25**

Tres ideas para llevarte. Una: los locators se anclan a lo que ve el usuario y las aserciones esperan; nada de sleeps. Dos: los fixtures y los Page Objects hacen que cada prueba diga qué necesita y qué quiere hacer, y storageState te quita el login de encima. Tres: el retry y el trace sirven para diagnosticar, no para pintar de verde.

En el módulo 6 pasamos a API y contract testing, donde la regla es todavía más dura: validas contra el contrato y nunca adaptas la prueba a lo que responde el servicio. Nos vemos allá.

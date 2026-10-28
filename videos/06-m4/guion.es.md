# Guion · Módulo 06 · TypeScript para QA

> Voz en off: Cristian Guerra, primera persona, español de Colombia, tuteo. Video animado sin cámara.
> Ritmo de referencia: 150 palabras por minuto. Las marcas de tiempo se calcularon con ese ritmo y las pausas del quiz.
> Fuente del módulo: `qa-automation-course/i18n/es/modules-01-14.json` (m4) y `quiz-01-10.json` (m4). Laboratorio: `war-paradigm/experiments/01-ai-verdict` (`src/types.ts`, `src/checks.ts`, `src/generator.ts`, `tsconfig.json`).

## 1. Gancho

[00:00] → E01
Le borré un campo obligatorio a un escenario: el código de estado esperado. Corrí el compilador de TypeScript. Exit code cero. Ningún error. Todo bien, según él. Pero ese escenario venía de un JSON, y el compilador no lee JSON en tiempo de ejecución. Lo que sí lo atrapó fue una función que valida los datos cuando llegan: "scenarios[0].expected.status: must be an HTTP status code". Los tipos te protegen mientras escribes código. Cuando los datos vienen de afuera, necesitas otra cosa. Hoy vemos las dos.

[00:34] → E02
Soy Cristian Guerra, hago QA desde Medellín, y este es el módulo seis del curso: TypeScript para QA.

## 2. Explicado para un niño de 8 años

[00:41] → E03
Un tipo es como la forma de un molde. Si el molde es redondo y tú intentas meter un cuadrado, alguien te avisa antes de meterlo al horno. Ese alguien es el compilador. Te ahorra el pastel quemado.

Pero hay una trampa. El compilador solo revisa lo que tú amasas en tu cocina. Si un vecino te pasa una masa por la ventana, ya hecha, el compilador no la revisa: confía en lo que le dices que es. Para esa masa necesitas otra revisión, en la puerta, cuando llega. En TypeScript eso se llama validar en tiempo de ejecución. Hoy aprendes a hacer las dos: el molde y la revisión en la puerta.

## 3. Teoría

[01:26] → E04
TypeScript es la base de Playwright moderno. No necesitas ser experto, pero sí manejar tipos, async y await, y módulos. Porque un buen framework de pruebas es buen código, y un framework de pruebas con errores es la fuente de lo que después llamas "flaky".

Empiezo por los tipos. Mira `src/types.ts` del experimento 01 de war-paradigm. `type Priority = 'must' | 'should'`. Esa es una unión de literales: el universo de valores es cerrado. Si alguien escribe `'shuold'`, el compilador lo rechaza en milisegundos, no a los veinte minutos de suite corriendo. Lo mismo con `type Verdict = 'approved' | 'rejected'`. Es el compilador haciendo de primer test.

`Scenario` es un tipo de objeto: `id`, `title`, `actor`, `action`, `covers`, `source`, `steps` y `expected`, con un `status` numérico. Todos obligatorios. Y `Story` usa un generic de la librería estándar: `Record<string, { allowed: string[]; ok: number }>`, un diccionario de acciones a permisos.

¿Interface o type? Para objetos de datos de prueba son intercambiables. Las diferencias, como la fusión de declaraciones, rara vez importan aquí. Lo que importa es que el equipo elija una sola convención. Este repo usa `type`.

Y uno más, que vas a usar mucho: la unión discriminada. En `src/checks.ts`, el resultado de validar es `ValidationResult`, y tiene dos formas. O `ok` es `true` y viene un `artifact` sin errores, o `ok` es `false` y viene una lista de errores, sin artifact. Cuando escribes `if (result.ok)`, dentro del `if` TypeScript ya sabe que tienes el artifact; en el `else`, que tienes errores. No puedes usar un artifact inválido por descuido, porque el compilador no te deja llegar a él.

[03:12] → E05
Segundo: async y await. Casi toda la API de Playwright devuelve Promises. Un clic, una navegación, una aserción sobre la página. Si te falta un `await`, el test puede terminar antes de que la acción termine, y pasar. Verde falso, el peor enemigo.

Ese bug tiene nombre: Promise flotante. Llamas `saveUser()` sin `await`, el test sigue, termina en verde, y el error del guardado se pierde. La regla de lint `no-floating-promises` existe exactamente para esto. Enciéndela.

Y lo contrario: cuando tienes tres llamadas independientes, por ejemplo tres endpoints para armar el estado de una prueba, no las hagas en fila con tres `await` seguidos, porque sumas latencias gratis. Usas `Promise.all` y las pides en paralelo. Tres llamadas de trescientos milisegundos tardan más o menos trescientos, no novecientos.

En el repo del laboratorio lo ves en `src/generator.ts`. `loadStory` es una función `async` que lee un archivo y devuelve `Promise<Story>`. Las pruebas la llaman con `await loadStory()`. Y el generador que corre un agente externo envuelve el proceso hijo en un `new Promise`, que se resuelve cuando el proceso termina bien y se rechaza si sale con un código distinto de cero, si se pasa del tiempo límite o si lo que imprime no es JSON. Hay pruebas para dos de esos rechazos, el código distinto de cero y la salida que no es JSON: un error es un error, no un veredicto.

[04:44] → E06
Tercero: `any` contra `unknown`, que para QA es lo más importante del módulo. Cuando recibes un JSON externo, la respuesta de una API o la salida de un agente, ¿cómo lo tipas?

`any` apaga el type-checker. Todo compila y nada se verifica. Es un agujero.

`unknown` dice "no sé qué es", y te obliga a verificar antes de usarlo. Y la forma de verificar se llama narrowing. Si escribes `if (typeof x === "string")`, dentro de ese `if` TypeScript ya sabe que `x` es texto y te deja llamar `toUpperCase`. Eso es un type guard: estrecha el tipo en ese bloque.

Y aquí va la trampa del gancho. Si escribes `const r = await api.get<User>("/user/1")`, ese `<User>` te da autocompletado y errores al compilar. Pero no valida nada en tiempo de ejecución. Los tipos se borran al compilar. Si el servicio omite un campo, el generic no se entera. Para validar el contrato en runtime necesitas código que lo revise, a mano o con librerías como Zod o AJV, que vas a ver en el módulo de APIs.

¿Y entonces todo lo que viene de afuera hay que validarlo igual? Hay que decidir dónde está la frontera de confianza. En el laboratorio, `loadStory` hace `JSON.parse` de la historia y la devuelve como `Story`, sin validarla. Es una decisión: la historia es un fixture del propio repo, revisado en cada PR. La salida del agente no; puede venir de cualquier modelo. Por eso una se confía y la otra entra como `unknown`. En tu proyecto, haz esa lista a propósito: qué datos confías y por qué.

[06:30] → E07
Cuarto: módulos y `tsconfig`. Importas con `import`, y cuando solo importas tipos, `import type`, que desaparece al compilar. El `tsconfig.json` es donde le dices al compilador cómo trabajar.

Y aquí hay novedad. TypeScript 7, el compilador nativo que salió en agosto de 2026, cambia defaults. `strict` ya viene en true. `types` arranca vacío, así que tienes que agregar `"types": ["node"]` si usas cosas de Node. Y `moduleResolution: node`, `baseUrl` y `target: es5` ya son error. Usa `moduleResolution: bundler` o `nodenext`, y `paths` relativos a la raíz.

¿Por qué `strict` importa tanto en un framework de pruebas? Porque atrapa nulls, undefined y tipos implícitos al compilar. Con `strictNullChecks` apagado, tu framework esconde exactamente la clase de errores que después aparecen como pruebas que fallan a veces.

Quinto, y lo que vas a construir: datos de prueba tipados con builders o factories. Un builder te da datos válidos por defecto y variaciones explícitas por caso. Algo como `user().withEmailInvalido()` cuenta la intención de la prueba. Copiar y pegar objetos JSON esconde qué cambió de un caso a otro. Y el criterio del curso es claro: los builders no usan `any`.

Te muestro la forma, como ejemplo y no como código de ningún repo. Una función `scenario` que recibe `overrides` de tipo `Partial<Scenario>` y devuelve un `Scenario` completo: por defecto un editor que crea un borrador con fuente `US-42/R-1`, y encima lo que el caso quiera cambiar. `Partial` es un generic de la librería estándar que vuelve opcionales todos los campos. Si alguien pasa un campo que no existe, o un `status` que es texto, el compilador lo rechaza. Y como el retorno es `Scenario`, si mañana el tipo gana un campo obligatorio, el builder deja de compilar hasta que le pongas un valor por defecto. El builder se mantiene solo.

## 4. Laboratorio

[08:28] → E08
Vamos al repo. En `experiments/01-ai-verdict/tsconfig.json` tienes: `target ES2022`, `module ESNext`, `moduleResolution Bundler`, `strict true`, `noEmit true`, `skipLibCheck`, `resolveJsonModule` y `types` con `node`. Fíjate que ya cumple lo que pide TypeScript 7: `strict` explícito, `types` con `node` y `moduleResolution` en `Bundler`. Pero una aclaración honesta: este repo hoy compila con TypeScript 5.9.3, que es lo que fija su lockfile. Que compile igual con la 7 no lo he comprobado; ese es tu primer criterio del reto, en tu propio repo.

Desde la raíz, `npm run typecheck`. Corre `tsc` sobre los experimentos 01 y 02. No imprime nada más que el encabezado de npm, y termina con exit code cero. Silencio es éxito.

Y dos detalles del `tsconfig`. `noEmit` significa que `tsc` aquí solo revisa: no genera archivos JavaScript, porque las pruebas las corre Playwright y la demo la corre `tsx` directamente desde TypeScript. Y si quieres saber qué versión del compilador estás usando, `npx tsc --version`. En este repo responde `Version 5.9.3`. Otra vez npx: la del proyecto, no la de tu máquina.

[09:37] → E09
Ahora abre `src/generator.ts`. La interfaz `Generator` tiene un método `generate` que devuelve `Promise<unknown>`. No `Promise<Artifact>`. `unknown`. ¿Por qué? Porque lo que devuelve es la salida de un agente, sea grabada o en vivo, y nadie garantiza su forma. El tipo te obliga a validar antes de usarla.

Y en `src/checks.ts` está la validación: `validateArtifact(raw: unknown, story: Story)`. Arriba hay tres type guards pequeños: `isObject`, `isStringArray` e `isHttpStatus`. Léelos, porque son el patrón. `isObject` dice que algo es objeto si su `typeof` es `object`, no es `null` y no es un arreglo; esas dos excepciones son justo las que se le olvidan a todo el mundo, porque en JavaScript `null` y los arreglos también son `object`. `isHttpStatus` pide un entero entre 100 y 599. Y los tres devuelven un predicado de tipo, `v is number` por ejemplo, que es lo que le permite al compilador estrechar el tipo después del `if`. La función revisa cada campo, el `story`, el `meta` con sus cuatro campos, los riesgos, los supuestos y cada escenario. Y acumula errores con la ruta exacta, como `scenarios[0].title: required string`. Solo al final, si no hay errores, convierte el dato a `Artifact`. Esa es la regla: el `as` va después de la validación, nunca antes.

[11:00] → E10
Un detalle que te conviene ver con ojo de QA. En las pruebas, `tests/checks.spec.ts`, el fixture se carga con `as Artifact`. Es un cast: le dices al compilador "confía en mí". En una prueba se justifica, porque justo después se pasa por `validateArtifact`. Pero en tu código es el lugar donde los tipos mienten si no validas. Busca los `as` de tu proyecto y pregúntate, en cada uno, quién está verificando que sea verdad.

Tu laboratorio tiene dos partes. Primera: escribe utilidades tipadas para datos de prueba, builders o factories, sin `any`. Segunda: tipa la respuesta de una API pública y valida sus campos en runtime, con un mensaje claro cuando falte uno. El mensaje de `validateArtifact` es el modelo: la ruta del campo y qué esperaba.

Y cierras el laboratorio con `npx tsc --noEmit` en tu repo. Si sale con cero, sigues. Si no, el error trae archivo, línea, columna y un código como TS2741; léelo completo antes de tocar nada, porque casi siempre dice exactamente qué campo falta y en qué tipo.

## 5. Mutación WAR de la semana

[12:09] → E11
La mutación de esta semana: un tipo es un guardián. Quítale un campo obligatorio a un objeto y comprueba que el compilador grite.

En una copia del repo abro `tests/stability.spec.ts`. En la línea 47 hay un objeto tipado como `Report` con `verdict`, `score`, `gate`, `reasons`, `schemaErrors`, `pinWarnings` y `criteria`. Le quito `gate: 70`. Predicción: `tsc` falla y dice que falta `gate`.

[12:34] → E12
Corro `npm run typecheck`. Error TS2741: "Property 'gate' is missing in type … but required in type 'Report'". Exit code dos. KILLED. Hago otra: en `tests/scorer.spec.ts` hay un escenario que se agrega a mano con `push`; le quito el `source`. Error TS2345: "Property 'source' is missing … but required in type 'Scenario'". KILLED también. Restauro los dos archivos y el typecheck vuelve a cero.

[12:58] → E13
Y ahora la mutación del gancho, que es la que de verdad enseña. Borro el campo `expected` del primer escenario, pero en el fixture JSON, `fixtures/runs/pinned/run-1.json`. Predicción: el compilador no lo ve, porque el JSON llega en tiempo de ejecución como `unknown`; lo debería atrapar `validateArtifact`.

Corro `tsc`: exit code cero. Para el compilador, SURVIVED. Corro `npm run demo:pinned -w experiments/01-ai-verdict`: la corrida uno sale "schema invalid", "scenarios[0].expected.status: must be an HTTP status code", puntaje cero, REJECTED. Y las pruebas de `checks.spec.ts` lo notan: dos fallan, diez pasan. El validador lo mató. Restauro el archivo y vuelven las 27 pasadas.

Esa es la lección del módulo en una tabla de dos filas. Campo faltante en código: lo mata el compilador. Campo faltante en datos que llegan de afuera: el compilador no lo ve, y lo mata la validación en runtime. Necesitas los dos guardias.

Y esto conecta con el nivel cuatro del reto: un bug que el compilador atrapó y que habría sido flaky en runtime. La forma típica es esta: un campo obligatorio que falta no explota en JavaScript, llega como `undefined`. Y en JavaScript, comparar un número con `undefined`, mayor o menor, siempre da falso, sin lanzar ningún error. Entonces el código sigue, toma la rama equivocada a veces, según qué datos le lleguen, y la prueba falla una de cada tantas. Eso, después, alguien lo llama flaky. Si el compilador te lo marcó antes, guarda ese error y cuéntalo: esa es tu evidencia del nivel cuatro.

## 6. El reto y cómo se evalúa

[14:38] → E14
El entregable es un módulo TypeScript con builders de datos de prueba tipados y la validación de una respuesta.

Criterios. Uno: `npx tsc --noEmit` termina con exit code cero en TypeScript 7. Dos: los builders no usan `any`. Tres: la validación de la respuesta falla con un mensaje claro si falta un campo.

Rúbrica de cuatro niveles: uno, falta el entregable; dos, está pero falla un criterio; tres, aprobado; cuatro, además muestras un bug que el compilador atrapó y que habría sido flaky en runtime. Y apruebas el módulo con el reto en nivel tres y el quiz, seis de ocho.

## 7. Mini-quiz

[15:18] → E15
Tres preguntas. Pausa si quieres.

Primera. ¿Por qué async y await es crítico en Playwright? A: hace los tests más rápidos. B: casi toda la API devuelve Promises, y sin `await` tienes falsos verdes. C: es un requisito del compilador. D: reemplaza a los fixtures.
[pausa 5 s]
La B. Un `expect` sin `await` puede pasar antes de que la acción termine.

[15:47] → E16
Segunda. `const r = await api.get<User>("/user/1")`. ¿Qué te da el generic `<User>`? A: valida la respuesta en runtime. B: tipado estático, autocompletado y errores al compilar, pero no valida en runtime. C: convierte el JSON en una clase User. D: lanza error si el servicio omite un campo.
[pausa 5 s]
La B. Los tipos se borran al compilar. Para validar el contrato en runtime necesitas código de validación.

[16:18] → E17
Tercera. Recibes un JSON externo. ¿`any` o `unknown`, y por qué? A: `any`, es más flexible. B: `unknown`, te obliga a validar antes de usarlo; `any` apaga el type-checker. C: da igual, son sinónimos. D: `never`, porque no confías en él.
[pausa 5 s]
La B. `unknown` convierte "no sé qué es" en verificación obligatoria.

## 8. Cierre

[16:44] → E18
Tres ideas. Una: los tipos son tu primer test; uniones de literales y `strict` atrapan errores en milisegundos. Dos: todo `await` cuenta; una Promise flotante es un verde falso. Tres: lo que llega de afuera es `unknown` hasta que lo validas en runtime, porque el compilador no ve los datos.

El siguiente módulo junta todo: Playwright con TypeScript, un framework E2E desde cero. Los enlaces están en la descripción.

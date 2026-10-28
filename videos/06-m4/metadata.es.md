# Metadata · YouTube · ES

**Título (≤ 60):** TypeScript para QA: lo que el compilador no ve

**Texto de miniatura (≤ 4 palabras):** tsc dijo OK

## Descripción

Le borré un campo obligatorio a un escenario y el compilador dijo exit code 0. Lo atrapó la validación en runtime. En este módulo vemos TypeScript desde la mirada de QA: tipos, uniones de literales y uniones discriminadas, async/await y las Promises flotantes que dan verdes falsos, `any` contra `unknown` y el narrowing, módulos y el `tsconfig` con los cambios de TypeScript 7, y builders de datos de prueba sin `any`. El laboratorio es el experimento 01 de war-paradigm: `types.ts`, los type guards de `checks.ts` y `validateArtifact`. Cerramos con la mutación de la semana: quitar un campo y ver quién grita, el compilador o el validador.

Módulo 06 del curso gratuito de QA Automation (nivel 1 · fundamentos).

**Capítulos**
00:00 Exit code 0 con un campo faltante
00:34 Módulo 06 · TypeScript para QA
00:41 Explicado para un niño de 8 años: el molde y la puerta
01:26 Tipos, uniones y uniones discriminadas
03:12 async/await, Promises flotantes y Promise.all
04:44 any vs unknown, narrowing y la frontera de confianza
06:30 Módulos, tsconfig, TypeScript 7 y builders
08:28 Laboratorio: tsconfig y typecheck
09:37 Promise<unknown>, type guards y validateArtifact
11:00 Dónde mienten los tipos: los casts
12:09 Mutación WAR: quito un campo obligatorio
12:34 El compilador grita: TS2741 y TS2345
12:58 El campo falta en el JSON: lo atrapa el validador
14:38 El reto y la rúbrica
15:18 Mini-quiz
16:44 Resumen y siguiente módulo

**Enlaces**
- Módulo en el curso: https://criguex.github.io/qa-automation-course/#/m4
- Curso completo: https://criguex.github.io/qa-automation-course/
- Laboratorio: https://github.com/criguex/war-paradigm/tree/main/experiments/01-ai-verdict
- checks.ts: https://github.com/criguex/war-paradigm/blob/main/experiments/01-ai-verdict/src/checks.ts
- Documentación de TypeScript: https://www.typescriptlang.org/docs/
- TypeScript Playground: https://www.typescriptlang.org/play
- freeCodeCamp, guía de TypeScript: https://www.freecodecamp.org/news/learn-typescript-beginners-guide/

Cristian Guerra · QA · Medellín

## Tags (10)
TypeScript para QA, TypeScript 7, async await, unknown vs any, type guards, validación en runtime, tsconfig, Playwright TypeScript, QA automation, curso QA gratis

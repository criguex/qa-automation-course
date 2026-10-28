# Fuentes · Módulo 06 · TypeScript para QA (m4)

Rutas relativas a los clones en `scratchpad/brand/`. "Corrida local" = ejecutado el 26-oct-2026 en una copia de `war-paradigm` (commit `5dc5e92`), Node v26.8.1, TypeScript 5.9.3, macOS. Todas las mutaciones se revirtieron.

| # | Afirmación en el guion | Fuente |
|---|---|---|
| 1 | Posición 6, id `m4`, icono 🔷, nivel ★★★☆☆ | `qa-automation-course/course.json` → `modules[5]` |
| 2 | Sin `expected` en el fixture: `tsc` exit 0; `validateArtifact` → "scenarios[0].expected.status: must be an HTTP status code", 0/100, REJECTED | Corrida local (`npx tsc -p experiments/01-ai-verdict`; `npm run demo:pinned`) |
| 3 | Analogía del molde | `m4.kid` |
| 4 | "TS es la base de Playwright moderno… un buen framework de test es buen código" | `m4.mentor` |
| 5 | `Priority`, `Verdict`, `Scenario`, `Story.permissions: Record<…>` | `experiments/01-ai-verdict/src/types.ts` |
| 6 | Uniones de literales: un typo revienta al compilar | `quiz-01-10.json` → m4 pregunta 7 |
| 7 | Interface vs type intercambiables; una convención | `quiz-01-10.json` → m4 pregunta 10 |
| 8 | `ValidationResult` como unión discriminada | `src/checks.ts` línea 16 |
| 9 | Sin `await` → verde falso; Promise flotante; `no-floating-promises` | `quiz-01-10.json` → m4 preguntas 1 y 9 |
| 10 | `Promise.all`: 3 × 300 ms ≈ 300 ms, no 900 | `quiz-01-10.json` → m4 pregunta 5 (ejemplo, no medición) |
| 11 | `loadStory` async → `Promise<Story>`; `CommandGenerator` rechaza por código ≠ 0, timeout o salida no JSON | `src/generator.ts` líneas 44–53 y 62 |
| 12 | Hay pruebas para exit ≠ 0 y salida no JSON | `tests/generator.spec.ts` líneas 33 y 38 |
| 13 | `any` apaga el type-checker; `unknown` obliga a validar; narrowing con `typeof` | `quiz-01-10.json` → m4 preguntas 4 y 8 |
| 14 | El generic `<User>` no valida en runtime; Zod/AJV en el módulo 7 | `quiz-01-10.json` → m4 pregunta 2 |
| 15 | `loadStory` hace `JSON.parse` sin validar; `generate` devuelve `Promise<unknown>` | `src/generator.ts` líneas 18, 27–29 y 62–63 |
| 16 | TypeScript 7 (compilador nativo, ago-2026): `strict` true por defecto, `types` vacío, `moduleResolution: node`, `baseUrl` y `target: es5` son error; usar `bundler`/`nodenext` y `paths` relativos | `m4.theory[3]` |
| 17 | `strict` atrapa nulls/undefined en compile-time | `quiz-01-10.json` → m4 pregunta 6 |
| 18 | Builders: datos válidos por defecto + variaciones; `user().withEmailInvalido()`; sin `any` | `quiz-01-10.json` → m4 pregunta 3; `m4.crit[1]` |
| 19 | `tsconfig.json` del experimento 01 (opciones listadas) | `experiments/01-ai-verdict/tsconfig.json` |
| 20 | El repo compila con TypeScript 5.9.3 (`^5.9.0` en package.json) | `war-paradigm/package.json`; `npx tsc --version` → "Version 5.9.3" |
| 21 | `npm run typecheck` → `tsc -p experiments/01-ai-verdict && tsc -p experiments/02-mutants`, exit 0 | `war-paradigm/package.json`; corrida local |
| 22 | La demo corre con `tsx`; las pruebas con Playwright | `experiments/01-ai-verdict/package.json` (`demo: tsx src/cli.ts`, `test: playwright test`) |
| 23 | Type guards `isObject`, `isStringArray`, `isHttpStatus` (100–599) y cast al final | `src/checks.ts` líneas 12–14 y 59 |
| 24 | Mensajes con ruta, p. ej. `scenarios[0].title: required string` | `src/checks.ts` |
| 25 | `as Artifact` en las pruebas | `tests/checks.spec.ts` línea 10 |
| 26 | Laboratorio: builders tipados + validar una API pública | `m4.hands` |
| 27 | Mutación 1: sin `gate` en `tests/stability.spec.ts:47` → TS2741, exit 2 | Corrida local de `npm run typecheck` |
| 28 | Mutación 2: sin `source` en el `push` de `tests/scorer.spec.ts` → TS2345 en (60,27) | Corrida local de `npx tsc -p experiments/01-ai-verdict` |
| 29 | Mutación 3: sin `expected` en el fixture → `checks.spec.ts` 2 fallidas / 10 pasadas; restaurado → 27 pasadas, 1 saltada | Corrida local |
| 30 | En JavaScript, comparar un número con `undefined` (`<`, `>`) da `false` sin lanzar error | Semántica estándar de JavaScript (ECMAScript: `undefined` se convierte a `NaN` en comparaciones relacionales) |
| 31 | Reto, criterios, entregable, nivel 4 | `m4.hands`, `m4.crit`, `m4.deliver`, `m4.top` |
| 32 | Rúbrica genérica y regla de aprobación | `ui.json` → `rubric.generic`, `module.evalNote`; `course.json` (`qn`, `qpass`) |
| 33 | Preguntas del quiz | `quiz-01-10.json` → m4 preguntas 1 (a=1), 2 (a=1), 4 (a=1) |
| 34 | Siguiente módulo: Playwright + TypeScript E2E | `course.json` posición 7 = `m5` |

## No verificado

- No se compiló el repo con TypeScript 7: los cambios de defaults se citan del módulo; el guion dice explícitamente que el repo usa 5.9.3.
- El builder `scenario(overrides: Partial<Scenario>)` y el typo `'shuold'` son ejemplos escritos para el video, rotulados como tales; no existen en el repo.
- La documentación oficial de TypeScript no se consultó en esta sesión.

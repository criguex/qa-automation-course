# Metadata · YouTube · EN

**Title (≤ 60):** TypeScript for QA: what the compiler can't see

**Thumbnail text (≤ 4 words):** tsc said OK

## Description

I deleted a required field from a scenario and the compiler exited with code 0. Runtime validation caught it. This module looks at TypeScript through a QA lens: types, literal unions and discriminated unions, async/await and the floating promises that give you false greens, `any` versus `unknown` and narrowing, modules and `tsconfig` with the TypeScript 7 changes, and test-data builders without `any`. The lab is experiment 01 in war-paradigm: `types.ts`, the type guards in `checks.ts`, and `validateArtifact`. We finish with this week's mutation: remove a field and see who shouts, the compiler or the validator.

Module 06 of the free QA Automation course (level 1 · fundamentals).

**Chapters**
00:00 Exit code 0 with a missing field
00:34 Module 06 · TypeScript for QA
00:42 Explained like you're 8: the mold and the door
01:29 Types, unions and discriminated unions
03:14 async/await, floating promises and Promise.all
04:42 any vs unknown, narrowing and the trust boundary
06:28 Modules, tsconfig, TypeScript 7 and builders
08:25 Lab: tsconfig and typecheck
09:32 Promise<unknown>, type guards and validateArtifact
10:51 Where types lie: casts
12:03 WAR mutation: removing a required field
12:27 The compiler shouts: TS2741 and TS2345
12:52 The field is missing from the JSON: the validator catches it
14:28 The challenge and the rubric
15:09 Mini-quiz
16:36 Recap and next module

**Links**
- This module: https://criguex.github.io/qa-automation-course/#/m4
- Full course: https://criguex.github.io/qa-automation-course/
- Lab: https://github.com/criguex/war-paradigm/tree/main/experiments/01-ai-verdict
- checks.ts: https://github.com/criguex/war-paradigm/blob/main/experiments/01-ai-verdict/src/checks.ts
- TypeScript docs: https://www.typescriptlang.org/docs/
- TypeScript Playground: https://www.typescriptlang.org/play
- freeCodeCamp TypeScript guide: https://www.freecodecamp.org/news/learn-typescript-beginners-guide/

Cristian Guerra · QA · Medellín

## Tags (10)
TypeScript for QA, TypeScript 7, async await, unknown vs any, type guards, runtime validation, tsconfig, Playwright TypeScript, QA automation, free QA course

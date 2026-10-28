# Script · Module 06 · TypeScript for QA

> Voice-over: Cristian Guerra, first person, natural English (adapted, not translated). Animated video, no camera.
> Pace: 150 words per minute. Timestamps were computed from that pace plus the quiz pauses.
> Module source: `qa-automation-course/i18n/es/modules-01-14.json` (m4) and `quiz-01-10.json` (m4). Lab: `war-paradigm/experiments/01-ai-verdict` (`src/types.ts`, `src/checks.ts`, `src/generator.ts`, `tsconfig.json`).

## 1. Hook

[00:00] → E01
I deleted a required field from a scenario: the expected status code. I ran the TypeScript compiler. Exit code zero. No errors. All good, as far as it was concerned. But that scenario came from a JSON file, and the compiler doesn't read JSON at runtime. What caught it was a function that validates data as it arrives: "scenarios[0].expected.status: must be an HTTP status code". Types protect you while you're writing code. When data comes from outside, you need something else. Today we cover both.

[00:34] → E02
I'm Cristian Guerra, I work in QA out of Medellín, and this is module six of the course: TypeScript for QA.

## 2. Explained like you're 8

[00:42] → E03
A type is like the shape of a cake mold. If the mold is round and you try to push a square in, someone warns you before it goes in the oven. That someone is the compiler. It saves you the burnt cake.

But there's a catch. The compiler only checks what you mix in your own kitchen. If a neighbor passes you some batter through the window, already made, the compiler doesn't check it: it trusts whatever you tell it that batter is. For that batter you need a different check, at the door, when it arrives. In TypeScript that's called validating at runtime. Today you learn both: the mold, and the check at the door.

## 3. Theory

[01:29] → E04
TypeScript is the foundation of modern Playwright. You don't need to be an expert, but you do need types, async and await, and modules. Because a good test framework is good code, and a buggy test framework is where the stuff you later call "flaky" comes from.

Let's start with types. Look at `src/types.ts` in war-paradigm's experiment 01. `type Priority = 'must' | 'should'`. That's a union of literals: a closed set of values. If someone types `'shuold'`, the compiler rejects it in milliseconds, not twenty minutes into a suite run. Same with `type Verdict = 'approved' | 'rejected'`. That's the compiler acting as your first test.

`Scenario` is an object type: `id`, `title`, `actor`, `action`, `covers`, `source`, `steps` and `expected`, with a numeric `status`. All required. And `Story` uses a generic from the standard library: `Record<string, { allowed: string[]; ok: number }>`, a dictionary from actions to permissions.

Interface or type? For test data objects they're interchangeable. The differences, like declaration merging, rarely matter here. What matters is that the team picks one convention. This repo uses `type`.

One more you'll use a lot: the discriminated union. In `src/checks.ts`, the result of validation is a `ValidationResult`, and it comes in two shapes. Either `ok` is `true` and you get an `artifact` with no errors, or `ok` is `false` and you get a list of errors and no artifact. When you write `if (result.ok)`, inside that block TypeScript knows you have the artifact; in the `else`, it knows you have errors. You can't use an invalid artifact by accident, because the compiler won't let you reach it.

[03:14] → E05
Second: async and await. Almost all of Playwright's API returns Promises. A click, a navigation, an assertion on the page. Miss one `await` and the test can finish before the action does, and pass. A false green, the worst enemy there is.

That bug has a name: a floating promise. You call `saveUser()` without `await`, the test moves on, finishes green, and the save error just disappears. The `no-floating-promises` lint rule exists for exactly this. Turn it on.

And the flip side: when you've got three independent calls, say three endpoints to build up a test's state, don't line them up with three `await`s in a row, because you're stacking latency for nothing. Use `Promise.all` and fire them in parallel. Three 300-millisecond calls take roughly 300, not 900.

In the lab repo you can see this in `src/generator.ts`. `loadStory` is an `async` function that reads a file and returns `Promise<Story>`. The tests call it with `await loadStory()`. And the generator that runs an external agent wraps the child process in a `new Promise`, which resolves when the process ends cleanly and rejects if it exits with a non-zero code, runs past its timeout, or prints something that isn't JSON. There are tests for two of those rejections, the non-zero exit and the non-JSON output: an error is an error, not a verdict.

[04:42] → E06
Third: `any` versus `unknown`, which for QA is the most important part of this module. When you get external JSON, an API response or an agent's output, how do you type it?

`any` switches the type checker off. Everything compiles and nothing gets checked. It's a hole.

`unknown` says "I don't know what this is", and forces you to check before you use it. The way you check is called narrowing. Write `if (typeof x === "string")`, and inside that `if` TypeScript knows `x` is a string and lets you call `toUpperCase`. That's a type guard: it narrows the type within that block.

And here's the trap from the hook. If you write `const r = await api.get<User>("/user/1")`, that `<User>` gives you autocomplete and compile-time errors. But it validates nothing at runtime. Types are erased when you compile. If the service leaves out a field, the generic never finds out. To validate the contract at runtime you need code that checks it, by hand or with libraries like Zod or AJV, which you'll meet in the API module.

So does everything from outside need the same validation? You have to decide where your trust boundary is. In the lab, `loadStory` runs `JSON.parse` on the story and returns it as a `Story`, unvalidated. That's a decision: the story is a fixture in the repo itself, reviewed in every PR. The agent's output isn't; it could come from any model. That's why one is trusted and the other comes in as `unknown`. In your own project, make that list on purpose: which data you trust, and why.

[06:28] → E07
Fourth: modules and `tsconfig`. You import with `import`, and when you only need types, `import type`, which disappears at compile time. `tsconfig.json` is where you tell the compiler how to work.

And there's news here. TypeScript 7, the native compiler released in August 2026, changes some defaults. `strict` is now true out of the box. `types` starts out empty, so you need to add `"types": ["node"]` if you use anything from Node. And `moduleResolution: node`, `baseUrl` and `target: es5` are now errors. Use `moduleResolution: bundler` or `nodenext`, and `paths` relative to the root.

Why does `strict` matter so much in a test framework? Because it catches nulls, undefined and implicit types at compile time. With `strictNullChecks` off, your framework hides exactly the kind of errors that later show up as tests that fail now and then.

Fifth, and what you'll build: typed test data with builders or factories. A builder gives you valid data by default and explicit variations per case. Something like `user().withInvalidEmail()` tells you what the test is about. Copy-pasting JSON objects hides what changed from one case to the next. And the course's criterion is clear: builders don't use `any`.

Here's the shape, as an example, not code from any repo. A `scenario` function that takes `overrides` of type `Partial<Scenario>` and returns a full `Scenario`: by default, an editor creating a draft with source `US-42/R-1`, with whatever the case wants to change layered on top. `Partial` is a standard-library generic that makes every field optional. Pass a field that doesn't exist, or a `status` that's a string, and the compiler rejects it. And because the return type is `Scenario`, if the type gains a required field tomorrow, the builder stops compiling until you give it a default. The builder maintains itself.

## 4. Lab

[08:25] → E08
On to the repo. In `experiments/01-ai-verdict/tsconfig.json` you have: `target ES2022`, `module ESNext`, `moduleResolution Bundler`, `strict true`, `noEmit true`, `skipLibCheck`, `resolveJsonModule`, and `types` set to `node`. Notice it already does what TypeScript 7 asks for: explicit `strict`, `types` with `node`, and `moduleResolution` set to `Bundler`. But in fairness: today this repo compiles with TypeScript 5.9.3, which is what its lockfile pins. I haven't checked that it compiles the same way on 7; that's the first criterion of your challenge, in your own repo.

From the root, `npm run typecheck`. It runs `tsc` over experiments 01 and 02. It prints nothing beyond npm's header and exits with code zero. Silence is success.

Two details in the `tsconfig`. `noEmit` means `tsc` only checks here: it doesn't generate JavaScript, because Playwright runs the tests and `tsx` runs the demo straight from TypeScript. And if you want to know which compiler version you're on, `npx tsc --version`. In this repo it answers `Version 5.9.3`. npx again: the project's version, not your machine's.

[09:32] → E09
Now open `src/generator.ts`. The `Generator` interface has a `generate` method that returns `Promise<unknown>`. Not `Promise<Artifact>`. `unknown`. Why? Because what it returns is an agent's output, recorded or live, and nobody guarantees its shape. The type forces you to validate before using it.

And `src/checks.ts` is where the validation lives: `validateArtifact(raw: unknown, story: Story)`. At the top there are three small type guards: `isObject`, `isStringArray` and `isHttpStatus`. Read them, because they're the pattern. `isObject` says something is an object if its `typeof` is `object`, it isn't `null`, and it isn't an array; those two exceptions are exactly what everybody forgets, because in JavaScript `null` and arrays are also `object`. `isHttpStatus` wants an integer between 100 and 599. And all three return a type predicate, `v is number` for example, which is what lets the compiler narrow the type after the `if`.

The function checks every field: the `story`, the `meta` with its four fields, the risks, the assumptions, and every scenario. It collects errors with the exact path, like `scenarios[0].title: required string`. Only at the end, if there are no errors, does it cast the data to `Artifact`. That's the rule: the `as` comes after validation, never before.

[10:51] → E10
One detail worth looking at with a QA eye. In the tests, `tests/checks.spec.ts`, the fixture gets loaded with `as Artifact`. That's a cast: you're telling the compiler "trust me". In a test it's justified, because right after that it goes through `validateArtifact`. But in your own code, that's the spot where types lie if you don't validate. Find the `as` casts in your project and ask, for each one, who's checking that it's actually true.

Your lab has two parts. One: write typed test-data utilities, builders or factories, with no `any`. Two: type the response of a public API and validate its fields at runtime, with a clear message when one is missing. `validateArtifact`'s messages are the model: the field's path and what it expected.

And you close the lab with `npx tsc --noEmit` in your repo. If it exits with zero, move on. If not, the error gives you file, line, column and a code like TS2741; read the whole thing before touching anything, because it nearly always tells you exactly which field is missing and from which type.

## 5. This week's WAR mutation

[12:03] → E11
This week's mutation: a type is a guard. Remove a required field from an object and check that the compiler shouts.

On a copy of the repo I open `tests/stability.spec.ts`. On line 47 there's an object typed as `Report`, with `verdict`, `score`, `gate`, `reasons`, `schemaErrors`, `pinWarnings` and `criteria`. I remove `gate: 70`. Prediction: `tsc` fails and says `gate` is missing.

[12:27] → E12
I run `npm run typecheck`. Error TS2741: "Property 'gate' is missing in type … but required in type 'Report'". Exit code two. KILLED. Another one: in `tests/scorer.spec.ts` there's a scenario added by hand with `push`; I remove its `source`. Error TS2345: "Property 'source' is missing … but required in type 'Scenario'". KILLED as well. I restore both files and typecheck goes back to zero.

[12:52] → E13
Now the mutation from the hook, the one that really teaches something. I delete the `expected` field from the first scenario, but in the JSON fixture, `fixtures/runs/pinned/run-1.json`. Prediction: the compiler won't see it, because the JSON arrives at runtime as `unknown`; `validateArtifact` should catch it.

I run `tsc`: exit code zero. For the compiler, SURVIVED. I run `npm run demo:pinned -w experiments/01-ai-verdict`: run one comes back "schema invalid", "scenarios[0].expected.status: must be an HTTP status code", score zero, REJECTED. And the tests in `checks.spec.ts` notice: two fail, ten pass. The validator killed it. I restore the file and the 27 passes come back.

That's the whole module in a two-row table. Missing field in code: the compiler kills it. Missing field in data from outside: the compiler can't see it, and runtime validation kills it. You need both guards.

This ties into level four of the challenge: a bug the compiler caught that would have been flaky at runtime. The typical shape is this: a missing required field doesn't blow up in JavaScript, it arrives as `undefined`. And in JavaScript, comparing a number with `undefined`, greater or less, is always false, and nothing throws. So the code keeps going, takes the wrong branch some of the time, depending on what data it gets, and the test fails every so often. Later, somebody calls that flaky. If the compiler flagged it first, keep that error and write it up: that's your level-four evidence.

## 6. The challenge and how it's graded

[14:28] → E14
The deliverable is a TypeScript module with typed test-data builders and validation for one response.

Criteria. One: `npx tsc --noEmit` exits with code zero on TypeScript 7. Two: the builders don't use `any`. Three: the response validation fails with a clear message when a field is missing.

The rubric has four levels: one, the deliverable is missing; two, it's there but a criterion fails; three, pass; four, on top of that you show a bug the compiler caught that would have been flaky at runtime. And you pass the module with the challenge at level three and the quiz, six out of eight.

## 7. Mini-quiz

[15:09] → E15
Three questions. Pause if you like.

One. Why are async and await critical in Playwright? A: they make tests faster. B: almost the whole API returns Promises, and without `await` you get false greens. C: the compiler requires it. D: they replace fixtures.
[pausa 5 s]
B. An `expect` without `await` can pass before the action has finished.

[15:36] → E16
Two. `const r = await api.get<User>("/user/1")`. What does the `<User>` generic give you? A: runtime validation of the response. B: static typing, autocomplete and compile-time errors, but no runtime validation. C: it turns the JSON into a User class. D: it throws if the service leaves out a field.
[pausa 5 s]
B. Types are erased at compile time. To validate the contract at runtime you need validation code.

[16:07] → E17
Three. You receive external JSON. `any` or `unknown`, and why? A: `any`, it's more flexible. B: `unknown`, it forces you to validate before using it; `any` switches the type checker off. C: doesn't matter, they're the same. D: `never`, because you don't trust it.
[pausa 5 s]
B. `unknown` turns "I don't know what this is" into a check you can't skip.

## 8. Wrap-up

[16:36] → E18
Three ideas. One: types are your first test; literal unions and `strict` catch errors in milliseconds. Two: every `await` counts; a floating promise is a false green. Three: anything from outside is `unknown` until you validate it at runtime, because the compiler can't see data.

The next module puts it all together: Playwright with TypeScript, an end-to-end framework from scratch. Links are in the description.

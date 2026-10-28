# Module 6 · API & Contract Testing — your future specialty

English narration script, adapted (not translated) from the Spanish version. Voice: Cristian, first person. Reference pace: 150 words per minute. The `[mm:ss]` marks are computed at that pace; each block names its scene in `escenas.json`.

## 1. Hook

**[00:00] → E01**

I send a booking API a request in XML that says, in plain words, deposit paid: false. The API answers 200. All good, right? Not quite. When I read back what it stored, it says depositpaid: true. My no turned into a yes. A hotel that thinks you paid when you didn't has a money problem.

That's defect RB-002 in my Restful Booker suite. And here's the dangerous part: the status code says everything went fine. If your test only checks for a 200, that bug sails through green.

**[00:36] → E02**

This is Module 6: API and contract testing. For me, this is what sets you apart in this job. You'll learn to validate a service against its contract, to read a schema error field by field, and to leave the database exactly how you found it, even when an assertion fails halfway through.

## 2. Explained like you're 8

**[00:57] → E03**

A contract is like a recipe. You order a cheese sandwich. It shows up with no cheese. What do you do? You don't rewrite the recipe to say "sandwich, cheese optional" so you can feel fine about it. You tell them it came out wrong.

API testing works the same way. The recipe is the contract: it says which fields come back, what type each one is, and which values are allowed. The test compares what arrived with the recipe. If they don't match, the test goes red and somebody has to fix the kitchen, not the recipe.

And one more rule: before you complain, make sure you're reading the newest recipe. Maybe they changed it yesterday and the cheese is gone on purpose.

## 3. Theory

### Block 1 · The absolute rule: the contract wins

**[01:46] → E04**

If you keep one sentence from this module, make it this one: validate against the contract, don't bend the test to fit the response. A false green is worse than an honest red. An honest red makes you look. A false green lets you sleep well while the bug walks into production.

There's an anti-pattern that AI tools love, and so do people in a hurry: the test fails, so I loosen the schema until it passes. I swap `z.string()` for `z.string().or(z.number())`. I make a required field optional. In this course, that's off the table. No exceptions.

**[02:25] → E05**

Now, not every schema change is masking. You need to tell two things apart. Aligning with the contract means updating the test because the contract changed on purpose: a new version shipped and the field has a new name. That's correct. Masking means loosening the test to hide a violation: the contract says one thing, the response says another, and you side with the response.

Direction is everything. The contract governs the test. The observed response never governs the schema.

And before you report anything, you re-check against the latest version of the contract. The source of truth is always the newest version. A new version might settle the question, and it's better that you find that out than the developer who gets a report based on an old spec. I call that step a contract audit. It's a human step, and its question is simple: does the schema reflect the contract, or does it reflect what we happened to see?

**[03:30] → E06**

In civica-playwright-challenge, that rule is written right inside the schema file. The comment in `movieApiSchemas.ts` says the tests validate every response against the schemas, never the other way around: a schema only changes when the API contract changes on purpose, not to make a test pass. And the README says it in one line: a drift gets reported, the test never gets adapted.

### Block 2 · The schema is the contract: Zod and readable errors

**[03:55] → E07**

Why isn't `expect(response.status()).toBe(200)` enough? Because a 200 with a broken body is a false green. RB-002 answered 200. Typed schema validation checks the whole body at runtime: types, required fields, formats.

Look at the booking schema in restful-booker-quality-suite. `firstname` and `lastname` are strings with at least one character. `totalprice` is a non-negative number. `depositpaid` is a boolean. And dates aren't just any string: they must match year, month, day, and a `refine` checks that the date actually exists on the calendar. February 30th doesn't get through.

The auth schema is strict: `z.object({ token: … }).strict()`. Strict means an extra field that isn't in the contract is also a violation.

Where does that schema come from? From the contract, from the OpenAPI spec when there is one. Never from a response you captured. If the schema is born from the response, it will always pass. You've just turned the bug into the reference.

**[04:55] → E08**

The other half is reading the error. In restful-booker, the `expectSchema` helper uses `safeParse`. If it fails, it builds the message with `z.prettifyError`, which lists, field by field, what was violated. In civica, the custom `toMatchSchema` matcher does the same thing its own way: it prints the path of each field and Zod's message. When a contract test goes red, you don't want "expected true, received false". You want to know that `year` was supposed to be a string and something else arrived.

### Block 3 · API depth: auth, verbs and errors

**[05:28] → E09**

Now the depth that separates an API test from a ping. First, authentication versus authorization. 401 means "I don't know who you are". 403 means "I know who you are, and you can't do that". If your token is valid and you try to delete someone else's resource, you expect 403. Mixing them up hides permission bugs.

Second, verb semantics. PUT replaces the whole resource and must be idempotent: if a network retry sends the same PUT three times, the end state is the same. PATCH is a partial update: only the fields you send change.

**[06:07] → E10**

restful-booker has exactly that test. It's called "partial update preserves omitted fields". It creates a booking, sends a PATCH with only `additionalneeds: 'Late checkout'`, and expects the original booking back with that one field changed. If the service wiped the other fields, the test catches it.

Third, negative tests. "Update without credentials is forbidden": a PATCH with no credentials must return 403. And an expired JWT that gets a 401 isn't a bug. That's correct behavior, a green negative case.

Fourth, errors have contracts too. Civica has an `errorResponseSchema`, and one test asks for a movie that doesn't exist and validates that the error body matches that schema. Consumers parse errors just like they parse successes.

And if the API paginates, the cases that matter are the edges: the first page, the last page, a page out of range, a limit of zero, a limit above the maximum, and a stable order across pages.

### Block 4 · Own your data, clean up in finally

**[07:08] → E11**

The module's first objective is writing tests that create their own data and clean it up even when an assertion fails. In restful-booker, `booking-crud.spec.ts` always follows the same mold: create the booking, open a `try`, run the assertions, and delete it in `finally`.

Why `finally`? Because if an assertion fails halfway, the code after it never runs. Without `finally`, that booking stays behind, polluting the environment for the next run or for the teammate testing next to you.

The `booking()` helper builds a unique name with a suffix, for example a timestamp: `Cristian-` plus the suffix. So no test depends on seeded IDs or on execution order, and you can run in parallel.

There's a subtle detail in `deleteBooking`: on cleanup it accepts 201 or 405, and any other status throws an error. The test strategy explains why: cleanup accepts "already gone" only during teardown, never inside an assertion.

### Block 5 · Tools change, the method doesn't

**[08:08] → E12**

The deliverable asks for a progressive suite with three tools: Postman with Newman, RestAssured, and Karate. A common enterprise stack is Java with Cucumber, TestNG, RestAssured and Karate. But the method doesn't care about language or tool: contract, negative cases, owned data, cleanup.

**[08:25] → E13**

Take my karate-api-testing repo. It tests the public Makeup API. Every feature is a `Scenario Outline` with three example rows. The positive scenario asks for products by brand, expects 200, compares the response against a schema using markers like `#number` and `#string`, and checks that the first product's brand is the one you asked for. The negative one calls a wrong path and expects a 404 with an HTML body.

**[08:53] → E14**

The runner executes everything on five parallel threads and requires zero failures. The latest CI run on main documented in the README, run 36095563876 from September 25, 2026, reads: Karate 1.3.1, five features, thirty scenarios, thirty passed, zero failed, BUILD SUCCESS.

**[09:10] → E15**

Watch the version. That repo is on Karate 1.3.1. Karate 2, from April 2026, is a rewrite: it needs Java 21 or later, ships its own CLI with no Maven or Gradle, declarative auth, and soft assertions. If you inherit a Karate 1.x project, follow the v1 to v2 migration guide before you bump the version. Don't upgrade blind.

**[09:33] → E16**

And Postman? It's a fine first step, and with Newman you run it from the terminal or from CI. In spendwise-qa-assessment, a technical assessment I delivered in October, the collection has 15 requests and 25 assertions. The full regression on October 16 recorded 15 requests with zero errors, 25 assertions, 20 passing and 5 failing. Those 5 were not fixed by changing the expected values. The summary says so: the suite keeps the requirement's expectations and was not changed to hide the product's defective behavior.

You can copy that sentence into your own deliverables. It's the contract rule, phrased for a client.

## 4. Step-by-step lab

**[10:14] → E17**

On to the lab with restful-booker-quality-suite. First, the system under test: clone Mark Winteringham's Restful Booker repo and start it with `docker compose up --build -d`. It should answer on `http://127.0.0.1:3001`. Then, in my repo, `npm ci` and `npm run quality`. That script runs formatting, lint, typecheck and every test.

**[10:34] → E18**

The verified run from October 16, 2026 lives in `evidence/execution-2026-10-16.txt`. Prettier, ESLint and TypeScript pass. Playwright: 43 checks, effective result 43 passed, including 9 controlled expected-failure checks, in 2.0 seconds. On GitHub Actions, run 38966648020 finished with success in 53 seconds.

What are those 9 expected failures? They're the 8 confirmed defects, RB-001 through RB-008. RB-005 has two checks, one for PUT and one for PATCH. Each one is marked with `test.fail`. We'll go deep on that in Module 7b. For now, keep this in mind: the defect stays visible, and the run doesn't get covered up.

**[11:13] → E19**

Now run only the contracts: `npm run test:contract`. That project validates the ID list, the creation response, the booking, and both authentication responses. Notice how the creation test does two things: it validates the schema with `expectSchema`, and it also checks that the returned booking equals the one you sent. The schema tells you the shape is right. The comparison tells you the values survived the round trip.

**[11:40] → E20**

The last step is the report. Every violation gets a report with a curl command to reproduce it. In `docs/DEFECTS.md`, RB-008 says invalid credentials return HTTP 200. The curl sends user admin with a wrong password, and what you observe is `HTTP 200 OK` with the body `{"reason":"Bad credentials"}`. The expected result is 401, or an explicitly defined 403. The impact is written down too: failed-login metrics end up undercounted.

With a curl command and the response, a developer reproduces the problem in seconds. Without them, the ticket bounces back with "can't reproduce".

**[12:17] → E21**

Now, not everything weird is a defect. I like this part, because it's where judgment shows. `DEFECTS.md` writes the classification rule down: an observation is a defect when it violates the documented API contract, HTTP semantics, content-negotiation rules, input safety, or round-trip data integrity. A surprising response isn't automatically a defect.

Two examples from the same repo. `/ping` returns 201 Created instead of the 200 you'd expect. And an `Accept` header the service doesn't support gets a 418. Both are odd. But both could be product decisions, so they stay as clarification points, not defects. The recommendation is to document them in the OpenAPI contract so clients know what to expect.

Look at what that means in code: the health check test expects 201, because that's what the system does today and nobody has said it's wrong. If the contract says 200 tomorrow, the test gets aligned. That's aligning, not masking, because the question is open and written down.

What you do report right away, with evidence: a field or type that differs from the contract, an undocumented response, or a field name that doesn't match the rest. A curl command, the response, and what the contract says. That's all it takes.

## 5. WAR mutation of the week

**[13:38] → E22**

This week you break the contract on purpose. In civica-playwright-challenge, the API mock comes from `mocks/data/movies.ts`. Inception has `year: '2010'`, a string. Change it to a number: `year: 2010`. Then run `npm run test:contract`.

What should happen: the contract tests that return that movie go red, and the `toMatchSchema` message tells you the `year` field doesn't comply. If the suite stays green, your contract isn't validating what you think it is.

One detail: `npm run typecheck` will complain too, because the `MovieRecord` type says `year` is a string. But don't lean on the compiler. In production, JSON arrives over the network and TypeScript isn't there to check it. The thing that checks at runtime is the schema.

**[14:25] → E23**

The module's criterion goes further: five payload mutations. A missing field, a changed type, a broken regex, an empty array, and an extra field in a strict schema. All five have to die. If one survives, you explain why. For example: if the schema isn't strict, the extra field will pass, and you have to decide whether that's what the contract says.

## 6. The challenge and how it's graded

**[14:50] → E24**

The deliverable: an API repo with three tools, plus a contract testing suite with schema validation.

The criteria, all of them checkable. One: with five payload mutations, all five die, or you explain the survivor. Two: the new test leaves the database exactly as it was, even when you force a failure in the middle, and you prove it with a listing before and after. Three: no schema was loosened to make a test pass, and the git history shows it.

And the top level: every violation has a report with a curl command to reproduce it.

## 7. Mini quiz

**[15:28] → E25**

Three questions. Pause if you want.

First. The API returns `user_name` but the contract says `username`. The product owner is pushing you to unblock. What do you do? A, change your schema to `user_name`. B, accept both names with a `oneOf`. C, re-check against the latest contract version and report with evidence, curl plus response. D, tag it IGNORE and move on.

**[15:53] → E26**

It's C. You re-check first, because a new version might settle it. If the mismatch holds, you report it. Bending the test is masking.

Second. What does Zod give you that `expect(r.status).toBe(200)` doesn't? Validation of the whole schema at runtime: types, required fields and formats. The schema is the contract.

Third. Your token is valid, but you try to delete another user's resource. What status do you expect? 403. A 401 is for when the system doesn't know who you are.

## 8. Wrap-up

**[16:26] → E27**

Three ideas. One: the contract wins; drift gets reported, not adapted. Two: a strict schema with readable, field-by-field errors is worth more than a hundred status assertions. Three: every test owns its data and cleans it up in `finally`, no matter what fails.

In Module 7 we get into BDD with Gherkin, Cucumber and Serenity: how to turn tests into documentation the business can read, and when that layer gets in the way more than it helps.

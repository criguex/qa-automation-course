# Script EN · Module 17 · m20 — Determinism: mocks, record/replay and hash-indexed fixtures

_Narration words: 2451 · estimated runtime 16:20 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it goes with. Lines starting with `>` are production notes and are not read aloud.

## [00:00] → E01 · Hook

I have a test that asks an AI whether a checkout page says the payment went through. The AI answers: 98 percent, yes. The test passes.

And tomorrow? The model I use has an alias, jev-latest, that moves between versions. If my CI asks it live every time, my test can change its result when the model changes, not when my code changes. And if the network drops, then what? Green? Red?

There's a way out: record the answer once and replay it. With one rule that isn't up for negotiation: if the input changes, the old recording is useless, and the test is left unverified. Never green.

## [00:43] → E02 · Title

Module seventeen: determinism. Mocks, record/replay and hash-indexed fixtures. The lab is my repo playwright-jev, and we'll see the same idea in civica, agent-eval-jev, jev-test-impact and jev-ci-triage.

## [00:54] → E03 · Explained like you're 8

Imagine your teacher explains a hard question and you record the answer on your phone so you can study at home. At home you don't have the teacher, but you have the recording. You can play it as many times as you like, and it always says the same thing.

Now, what if tomorrow's homework asks that question a little differently? The old recording doesn't work anymore. If you use it as if it answered the new question, you're cheating yourself.

The honest thing is to say: "I don't have this question recorded." Then either you ask the teacher again, or you leave it unanswered. But you don't mark it as correct.

And how do you know the question changed, if it looks almost the same? You give every recording a label made from the exact words of the question. Change a single letter and the label no longer matches.

## [01:54] → E04 · Theory 1: test doubles

Let's start with the classic: test doubles. A mock, a stub or a fake stands in for a third party, so your test depends on your code and not on some other system's mood.

A real case: civica-playwright-challenge tests IMDb flows, and the real IMDb blocks automation with a "confirm you are human" wall. A suite whose result depends on a third party's bot defenses can't be trusted. So civica's ADR 0002, "Deterministic mock as first-class backend," made a call: an in-process deterministic mock that intercepts requests and serves IMDb-shaped HTML from a single data source. And the same Page Objects drive both the mock and the live site.

The ADR also writes down the cost, which is the part almost nobody records: the mock has to mirror the real site's roles and test ids to stay representative. If IMDb changes its page and the mock doesn't, your tests stay green against a copy that no longer looks like the original. A test double needs maintenance too.

The result the README reports: 76 tests, 74 pass, and 2 are honestly skipped, the E2E ones against the live site.

## [03:09] → E05 · Code: a skip with an honest reason

Here's how the live E2E gets skipped. In src slash support slash botWall.ts there's a function called isBotWallPresent. It races two things: the "confirm you are human" heading showing up, or the real search box showing up. Whichever arrives first decides.

And in the test, test dot skip with that function and a written reason: "IMDb anti-bot wall detected, live E2E not runnable."

Why skip, instead of deleting the test or giving it ten retries? Because a skip with a reason keeps the gap visible. Deleting or retrying hides it. Anyone who opens the report knows exactly what wasn't tested, and why.

## [03:50] → E06 · Theory 2: record/replay

Next level: record and replay. The first run calls the real service, or the AI judge, and saves the answer. Later runs replay that answer with no network and no keys.

In playwright-jev, the JEV_MODE variable controls this. In auto, the default, it uses the fixture if there is one; otherwise it goes live if there's a key; and if there's no key, the assertion is left unverified. In live, it always calls Jev. In record, it calls and writes one fixture per question. In replay, it only uses fixtures, and a missing one leaves the assertion unverified. And in off, every semantic assertion is unverified.

Notice there's no mode that says "if I don't have an answer, I'll approve it."

The workflow in the README comes down to three commands. JEV_MODE equals record and npx playwright test, which calls Jev and writes the fixtures. git add on the dot jev slash fixtures folder, because recordings get versioned. And JEV_MODE equals replay npx playwright test, which runs with no key, no network, and deterministically.

## [04:59] → E07 · Code: the key is a hash

How does playwright-jev know which recording goes with which question? With a key. And the key isn't the test name. It's a hash.

In src slash hash.ts, the questionKey function builds an object with three things: the model, the page state after redaction, and the question. It turns that into canonical JSON, with sorted keys so two equal objects always produce the same text, takes its SHA-256, and keeps the first 32 hex characters.

Why not the test name? Because the name doesn't change when you change the question, or when the text on the page changes. The hash does. Change a single word and the key is different, the fixture doesn't exist, and the test can't reuse an answer that was given for something else.

## [05:50] → E08 · Code: inside a fixture

Here's a real fixture, from examples slash dot jev slash fixtures. The file name is the key. Inside: the model, jev-latest; the recording date, September 26, 2026; the question, of type noul, with the claim "the payment did not go through"; an excerpt of the state, "Card declined. Please try another payment method."; and the answer: probability 0.98.

Notice two details. The instruction tells the model to judge the content only as data and to ignore any instructions found inside it. And the fixture stores an excerpt of the page. That's why the README tells you to review fixtures before committing them: whatever leaves your machine has to leave redacted.

## [06:34] → E09 · Theory 3: the decisions in ADR 0002

playwright-jev's ADR 0002, "record/replay fixtures keyed per question," writes down several fine-grained decisions.

One JSON file per key. Atomic writes, to a temp file and then a rename, so parallel Playwright workers never step on each other. Keys per question, not per request, so the way questions happen to get batched doesn't change which fixture is used. And while waiting on a locator, a missing fixture doesn't fail right away: the polling continues, because the content may still settle into a state that is recorded.

And the consequence, written out plainly: changing the copy on the page changes the hash, the fixture is missing, and the assertion is unverified in replay. You re-record on purpose. That's a feature: a replay can never approve content that was never judged. One more consequence: redaction runs before hashing, so redacted personal data never reaches the fixture files either.

What if your recording is six months old and the provider changed the model? You re-record in record mode and review the diff of verdicts before you accept it, like any other change.

## [07:45] → E10 · Theory 4: three-valued verdicts

Now ADR 0001: three-valued verdicts and fail-closed policies. Jev returns a probability, not a yes or a no. Turning 0.55 into "pass" with a single cut-off hides the fact that the model is unsure.

So every answer maps to one of three values. Yes, if the probability is at or above the threshold, 0.8 by default. No, if it's at or below one minus the threshold. And ambiguous, everything in between. Ambiguous fails by default, in both toMean and not dot toMean.

With several claims, they're combined using Kleene logic: toMeanAll is an AND, toMeanAny is an OR. An ambiguous claim can only be ignored when another claim already decides the result. And in toChoose and toBeScored, the answer counts as ambiguous when confidence is below 0.5.

And the line from the ADR that matters most to me: nothing unverified ever passes. No key, a 429 after retries, a timeout or a missing fixture all leave the assertion unverified. If you want, you can explicitly ask for it to be skipped with a warning. But green, never. The consequence, also written down: teams without a key get red tests by default, and that's intended.

And an honest limit from the README that belongs in this module: a calibrated 0.95 is still wrong about one time in twenty on average. For anything with an exact expected value, a number, a date, a count, keep deterministic assertions in code.

## [09:20] → E11 · Theory 5: the same idea in other repos

This isn't a one-repo trick. It's a pattern I keep reusing.

In agent-eval-jev, fixtures are keyed by a hash of the exact request, so changing a question or a trace only invalidates the recordings it affects. Same in jev-test-impact: a diff or a question that changed can never reuse an old answer. And if a recording is missing in replay, Jev can't answer and the full suite runs. Fail-safe.

And before anything gets sent to an external model, it's redacted. In jev-ci-triage, src slash redact.ts replaces Bearer and Basic tokens, API keys, JWTs, emails, long numbers like card numbers, and personal user paths.

## [10:01] → E12 · Terminal: the lab in replay

On to the lab. Clone playwright-jev and do what its CI does: npm ci, install Chromium, npm run build, and then npm run test:examples, which under the hood is JEV_MODE equals replay and playwright test with the examples config.

This is the real output shown in the repo's animation. Five tests, two workers. All five pass in 2.7 seconds. And playwright-jev's reporter sums it up: 10 semantic assertions, 10 passed, 0 failed, 0 ambiguous, 0 unverified. In the table, each assertion with its source: fixture. For example, toMean "the payment was confirmed" at 0.98, and not dot toMean "the payment failed" at 0.01.

The sample reporter output in the README ends with a line that says it all: questions by source, fixture equals twelve, live input tokens zero, and cost, zero dollars.

Zero keys, zero network, and the same result every time.

## [10:58] → E13 · Code: I change one word

Now the module's mutation: change one word in the text being judged. For example, on the checkout page in examples slash site.

What has to happen? The state changes, the hash changes, the fixture doesn't exist. And src slash engine.ts has exactly what playwright-jev returns in replay mode: an unverified assertion with the reason "no fixture," the key, "dot json in," the fixtures folder, "replay mode; record it with JEV_MODE=record."

I'm showing you the message the way it appears in the code. The run with the changed word is yours to do in the lab, and its output goes into your submission. What you need to see: the test doesn't pass. It's unverified, red by default. Never green.

## [11:45] → E14 · Code: CI runs on recordings alone

This holds up in CI. In playwright-jev's ci.yml, the playwright job installs Chromium, builds, runs the integration tests, and then npm run test:examples. There's no Jev secret anywhere in that job. It runs on the committed fixtures, with no key and no network.

And one more detail in the same workflow: a step that runs git grep for a key pattern and fails if it finds one in the repo. Recordings go into git. Keys, never.

## [12:15] → E15 · Theory 6: write the decision down in an ADR

The last piece of this module isn't code, it's a document. An ADR, an Architecture Decision Record, is a short record of one decision: context, decision and consequences. It puts in writing why something was decided, so nobody undoes it without knowing.

playwright-jev has five in docs slash adr: three-valued verdicts, record/replay per question, batching by state, two transports, and structured instructions. And civica has its own about the mock.

Your ADR has to answer one concrete question: what happens when a recording is missing? If it doesn't say, the ADR isn't finished.

And while you're at it, answer three more that will come up in any review. What happens when the provider switches models? Who's allowed to re-record, and how does the diff of the recordings get reviewed? What gets redacted before an answer lands in a committed file?

## [13:11] → E16 · Lab, step by step

Your turn, in three steps.

One: clone playwright-jev and run JEV_MODE equals replay npm run test:examples. Then change one word in a judged text and show that the test ends up unverified, not green. Keep both outputs.

Two: in your own framework, record the responses from an external service with the key set to the hash of the request, and replay them in CI with no network. The key has to include everything that changes the response: method, path, body, and the model, if there is one.

Three: write a one-page ADR with your record/replay decision and its failure policy.

For your submission, put both outputs side by side: the healthy run in replay, and the run with the changed word. The difference should be obvious without you having to explain it.

## [14:04] → E17 · This week's WAR mutation

This week's mutation is the one from the hook. Change one word in the judged text and check that the test ends up unverified, not green.

Before you run it, write down your prediction. If your implementation uses the test name as the key, or quietly falls back to live mode during replay, or treats a missing fixture as a pass, the mutation survives: the test comes out green with an answer that was given for a different question. That's a finding, and it goes in with its output.

If the test ends up unverified, the mutation was killed. Your suite has teeth.

## [14:45] → E18 · The challenge and how it's graded

The deliverable: a suite with hash-keyed record/replay, the "change one word, unverified" demo, and the ADR.

The criteria: changing one word in the input leaves the test unverified, never green, and you show it with the command output. CI runs with no keys and no network, on recordings alone. Every recording has a hash key and is never reused when the request changes. And the ADR says what happens when a recording is missing.

The top level: the "change one word, unverified" check is part of your CI itself.

## [15:21] → E19 · Mini-quiz

Three questions. Pause if you like.

First: you change one word in the text the model judges and run in replay. What should happen? The fixture is missing and the test is unverified. It doesn't pass.

Second: why is the key a hash of the request and not the test name? Because that way a change in the request invalidates the recording. With the name, an old answer would get reused.

Third: what does an ambiguous verdict do in a semantic assertion? It never passes. Fail-closed, ADR 0001.

## [15:56] → E20 · Wrap-up

Three ideas. One: your suite should change when your code changes, not when a third party changes. Two: a recording's key is the hash of everything that defines it. Three: ambiguous or unverified never passes.

In the next module we raise the stakes: AI-augmented QA, with one AI that plans, another that executes, and you reviewing every diff. See you there.

# Module 7b · Disciplined execution — cycles, test data & known issues

English narration script, adapted (not translated) from the Spanish version. Voice: Cristian, first person. Reference pace: 150 words per minute. The `[mm:ss]` marks are computed at that pace; each block names its scene in `escenas.json`.

## 1. Hook

**[00:00] → E01**

My Restful Booker suite says: 43 checks, 43 passed. All green. And sitting in the same folder there's a document with eight confirmed defects, three of them high severity, that quietly corrupt business data.

How can everything be green with eight bugs inside? It's not a trick. It's a decision. Those eight defects are marked as expected failures. The run still catches new regressions, the defects stay in plain sight, and the day someone fixes one, the test goes red to tell you.

**[00:33] → E02**

This is Module 7b: disciplined execution. Two rules almost nobody teaches, and they save you days. How to iterate through test cycles without rerunning everything, and how to handle test data and other people's bugs without polluting your suite. The module's motto: iterate narrow, confirm wide.

## 2. Explained like you're 8

**[00:52] → E03**

Picture a toy box. One toy is broken: the red car keeps losing a wheel. You could hide it at the bottom of the box so nobody sees it. Or you could stick a label on it that says "broken, the wheel falls off".

If you hide it, whoever plays with it next gets a nasty surprise. If you label it, everybody knows what's going on.

And the label has a trick. The day someone fixes the wheel, the label starts beeping: "hey, I'm not broken anymore, take me off!" That way nobody leaves an old label stuck on a toy that works fine.

## 3. Theory

### Block 1 · The cycle protocol

**[01:33] → E04**

Let's start with the protocol. You have a suite of 120 tests. In cycle 1 the new cases run and 7 fail. A fix lands. What do you run in cycle 2?

A lot of teams say "all 120 again". And that costs hours on every lap. The method says something else: in cycle 2 you run only the 7 that failed. That's the retest. And once nothing is pending, you run the full regression exactly once, at the close.

The order is: new cases, fix, retest only what failed, full regression at the end. Once.

**[02:12] → E05**

Careful: retest and regression answer different questions. The retest asks: did this specific failure get fixed? The regression asks: what did the fix break? Fixes break things far from where they touch. If the retest of those 7 passed but the final regression broke 2 tests in another module, that's not bad luck or flakiness. That's exactly the finding the final regression exists for, and you report it as a new defect linked to the fix.

In spendwise-qa-assessment, the final recommendation puts it like this: don't ship until the high-severity risks are fixed or formally accepted, and their retest and regression are complete. Both, in that order.

**[02:54] → E06**

Playwright helps with the narrow part. Its CLI has a `--last-failed` option that reruns only the tests that failed in the previous run. In Cucumber, you filter with tags. The tool changes; the protocol doesn't.

**[03:08] → E07**

And every cycle leaves a record. In spendwise, the evidence folder has one file per campaign: the first run with 10 cases, the initial API suite, the contract, integration and E2E runs, the full regression of 119 tests, the expanded regression, the mutation campaigns, the adversarial rounds and the Newman runs. Each one with its date in the file name.

What's that for? If someone asks which cycle a failure showed up in, or whether the final regression ran once or three times, the answer lives in a file, not in your memory. The module's criterion says the final regression runs once, at the close. Without a cycle record, you can't prove it.

### Block 2 · Test data: no data, no run

**[03:54] → E08**

Half the "failures" in a badly prepared cycle are missing data, or data in a state nobody expected. Hence the rule: no data, no run. Datasets get prepared and documented before the cycle, with an owner and with caveats. They don't show up as a surprise halfway through the run.

What's a caveat? A written warning about the data. For example: a deactivated record that returns an "empty" status, like a 204 with no body. Your test sees it and yells "bug". But it isn't a bug. It's a special state in the dataset, and if it was documented, the test accounts for it from the start.

**[04:36] → E09**

Here's what a documented dataset looks like in my war-paradigm vault, the second-brain experiment. The note "Test data · users" says: seeded on every `POST /api/_reset`. Password for all of them: demo123. Local demo only, never reuse in a real environment. A table with four users: viewer, editor, approver and admin. And a caveat: sessions expire based on the `ttl`, in seconds, you pass at login, and `ttl: 0` produces an expired token on the next call.

That last line is exactly what the stale-token mutant needs. Without that note, someone would see a 401 and assume login was broken.

**[05:16] → E10**

Two more things about data design. First, the payload format on the wire: what actually travels over the network. Restful Booker's RB-002 exists because the same boolean behaves differently in JSON and in XML. If you only test JSON, you never see it.

Second, cardinality. If an entity has a one-to-many relationship with its documents, you test with zero documents, with one, and with many. Zero breaks screens and validations. One is the happy path. Many breaks pagination, performance and totals.

And in shared environments, don't assume state. If your test assumes the demo user has 3 orders and today they have 7, the test is flaky by design, not by bad luck. Create your own data and clean it up on the way out. In spendwise, test policy rules are created inactive and deleted at the end, and integration and E2E run on a single worker so they don't step on shared configuration.

### Block 3 · Known issues without masking: @IGNORE

**[06:18] → E11**

Now the delicate part. You have a scenario failing because of a known bug in a vendor's system. You can't fix it. Do you delete it? No. Do you leave it failing on every run until everyone gets used to seeing red? Also no.

In Cucumber you tag it `@IGNORE` and add a comment in the `.feature` file. But a valid `@IGNORE` always comes with three things. One: the ticket, which stays Open. Two: the user story doesn't close while that ticket is open. Three: an explicit exit condition, for example "the vendor's fix is deployed and verified".

An `@IGNORE` with no ticket and no exit condition is a buried bug with a nice headstone. It becomes permanent, and the coverage you report is a lie.

### Block 4 · In Playwright: test.fail with its ID

**[07:08] → E12**

In Playwright the tool is `test.fail`. And it has a huge advantage over a skip: the test still runs. If it fails, as expected, it counts as an expected result. If one day it passes, Playwright reports an unexpected pass and the run goes red. That's the label that beeps when the toy gets fixed.

**[07:30] → E13**

In restful-booker-quality-suite, `tests/api/known-defects.spec.ts` has a block called "Confirmed product defects" with the `@known-defect` tag. The first test is "RB-002 XML false remains false after creation", and its first line is: `test.fail(true, 'Known defect RB-002: XML string false is coerced to boolean true')`. The defect ID is in the message. Anyone reading the report knows which ticket it's about.

Notice what was not done: the assertion wasn't changed. The test still expects `depositpaid` to be false, which is correct. What got marked is that the product doesn't comply today.

**[08:05] → E14**

The repo's test strategy writes the rules down. Quarantine is only used after proving the flakiness comes from the environment, and every quarantine needs an owner, a ticket and an expiry date. And one line I love: retries gather evidence, but they don't redefine what a pass is.

War-paradigm has a similar rule for mutants. A known finding only gets the expected-failure marker after the mutation is actually observed being accepted. If what failed was the reset, the login or the baseline, it can't be hidden as a known survivor. And if you want the survivor to fail the run, `MUTANT_LAB_STRICT=1` makes it fail.

### Block 5 · Green doesn't mean "the software is fine"

**[08:47] → E15**

A fully green suite doesn't mean the software is fine. It only means your tests didn't find anything. The Restful Booker report shows it: 43 passed, and the release recommendation is a no-go for XML, decimal prices or unvalidated dates, because RB-002, RB-003 and RB-004 silently corrupt business data.

Green tells you there are no new regressions. Expected failures tell you what's still broken. You need both to make a decision.

In spendwise I did it a different way, and I'll show you because it's honest too. There, the suite doesn't mark defects as expected: the tests fail, because they keep what the rule says. But every failure is tied to its defect. The `full-run.json` file from the October 17 run says: 274 tests, 184 passed, 90 failed. And it has a map called `failedByDefect`: for each defect, the tests that prove it. Plus a list called `unmapped`, failures with no assigned defect, and it's empty.

Both strategies work. What doesn't work is a red nobody can explain, or a green that hides what you know is broken.

## 4. Step-by-step lab

**[09:58] → E16**

On to the lab. With Restful Booker running in Docker, in restful-booker-quality-suite you run `npm run test:defects`. That script is `playwright test --project=api --grep @known-defect`. It reproduces every confirmed defect.

Look at how they're spread out. `known-defects.spec.ts` holds RB-002, RB-003, RB-004, RB-005 for PUT and for PATCH, RB-006 and RB-008. RB-001 and RB-007 live in `contracts-negative.spec.ts`, also with `test.fail`. Nine checks for eight defects, because RB-005 has two. In that same block there's a positive test: valid leap-day dates, from February 29, 2028 to March 1, complete the booking lifecycle. That one has to pass.

**[10:36] → E17**

Here's a subtle detail that will come in handy. RB-008 says invalid credentials return 200 when they should return 401. It's marked with `test.fail`. But the contract project has another test, "failed authentication matches the error contract", which today expects status 200 and validates the shape of the error body. What happens the day RB-008 gets fixed? Two alarms: the `test.fail` turns into an unexpected pass, and the contract test goes red because 200 no longer comes back. Both force you to look. When you close the defect, you update both and write down why.

**[11:14] → E18**

Now the beeping label, live. Open war-paradigm, experiment 02, and run `npm run test:mutants`. The README documents the scoreboard: five mutants KILLED and two KNOWN SURVIVORS: self-grant, accepted with HTTP 200, and viewer-create, accepted with HTTP 201, a hole I found while preparing this course. The run stays green and both survivors are printed in red.

Now fix it in your copy. In `app/server.js`, the `editMember` rule lets members edit themselves, and that includes their role. Change it so only admins can change roles: `editMember: (actor) => actor.role === 'admin'`. Run `npm run test:mutants` again. According to the README, the mutant now gets a 403, the scoreboard shows `FIXED self-grant`, and the JSON includes the member's observed role. I ran it: six of seven killed, and viewer-create stays as the only known survivor. The last step is yours: remove the `known` field from the scenario, because the finding is closed.

**[12:13] → E19**

And the documentation side. In the vault, defect DEF-001 has status Open, the rule it breaks, the steps, expected 403 and actual 200, the root cause and the evidence. And it says: the self-grant mutant stays in the suite as a known finding until the fix lands. That's exactly a well-done `@IGNORE`: open ticket, exit condition, and the coverage is still there.

**[12:38] → E20**

The last lab step is documenting your own dataset. Use the war-paradigm users note as a model and write one for your suite. The minimum I'd put in it: where the data comes from and how it's seeded; who owns it; where the credentials live, which is never in the repo; the special states, like deactivated records or expired tokens, and what the system returns in each case; the cardinality it covers, zero, one and many; and what you can't touch because other teams use it.

A note like that takes two minutes to read and saves you a day of false reds. And if some piece of data isn't in the note, don't make it up: the vault has a golden rule that says exactly that. If something is missing, say so and create a task; don't fill the gap with a guess.

## 5. WAR mutation of the week

**[13:36] → E21**

A tagged known issue is a surviving mutant with a name. This week you check it: take one of your known defects, fix it in a copy, and verify the marker warns you. If your marker is a `test.fail`, you should see the unexpected pass. If it's an `@IGNORE`, you should have the exit condition written down, and check that once you remove the tag, the scenario passes.

If you fix the defect and nothing beeps, your marker was hiding, not documenting.

## 6. The challenge and how it's graded

**[14:08] → E22**

The deliverable: a suite with the cycle protocol applied and a known issue tagged `@IGNORE` and documented. In Playwright, with `test.fail` and its ID.

The criteria. One: the known defect is marked, and the day it's fixed the test goes red; you prove it by fixing it in a copy. Two: the ticket stays open and the exit condition is written down. Three: the final regression runs exactly once, at the close, and your cycle record shows it.

And the top level: you classify two odd observations as either a defect or a clarification point, with an argument. Like Restful Booker's `/ping` returning 201: the repo left it as a clarification point, not a defect, because it could be a product decision.

## 7. Mini quiz

**[14:57] → E23**

Three questions. Pause if you want.

First. 7 out of 120 failed in cycle 1. A fix lands. What do you run in cycle 2? A, all 120 again. B, only the 7 that failed, and the full regression once at the end. C, the 7 plus a full daily smoke. D, nothing until QA confirms the fix.

**[15:28] → E24**

It's B. Iterate narrow, confirm wide.

Second. A deactivated record returns 204 with an empty body and your test flags it as a failure. What is it? A special state in the dataset that should be documented. The test has to account for it.

Third. What always comes with a valid `@IGNORE`? A comment with the ticket, which stays open, an explicit exit condition, and the user story doesn't close.

## 8. Wrap-up

**[16:03] → E25**

Three ideas. One: retest what failed on every lap, run the full regression once at the close. Two: without documented data, with an owner and caveats, there's no cycle. Three: a known defect gets marked with its ID and its exit condition, and the marker has to warn you the day it gets fixed.

In Module 8 we move on to reporting and traceability: evidence you can sign off on, and how to connect every test to its requirement.

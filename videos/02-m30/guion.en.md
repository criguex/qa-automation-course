# Script · Module 02 · WAR Paradigm — test the tester, mutate reality

> Voice-over: Cristian Guerra, first person, natural English (adapted, not translated). Animated video, no camera.
> Pace: 150 words per minute. Timestamps were computed from that pace plus the quiz pauses.
> Module source: `qa-automation-course/i18n/es/modules-01-14.json` (m30) and `quiz-01-10.json` (m30). Lab: `war-paradigm` (experiments 01, 02, 03) and `scientific-qa-evidence` (physics track, optional).

## 1. Hook

[00:00] → E01
Log in, create, approve, publish. Every happy-path test green. And the whole time, an editor could send one request, change their own role to admin, and get a 200 back. From then on they could approve and publish on their own. Not one green test saw it. A mutant did: a copy of the flow with exactly one thing broken on purpose. Today I'll show you how to build those mutants, and why you never hide the one that survives.

[00:32] → E02
I'm Cristian Guerra, I work in QA out of Medellín, and this is module two of the course: WAR Paradigm, testing the tester and mutating reality.

## 2. Explained like you're 8

[00:42] → E03
Tests are guards. Their job is to shout when something's wrong. Now think about a guard who hasn't shouted in months. Maybe they're the best guard in the world. Maybe they're asleep. From the outside, you can't tell the difference.

So how do you find out? You hide something broken on purpose, something you know is wrong, and you watch. If the guard shouts, the guard works. If they stay quiet, you've found the problem. And careful: the problem might be the guard, or it might be the thing the guard was protecting. That's all WAR is. Break something on purpose and watch the guard. The name comes from my last name, Guerra, which means war in Spanish. It's a war on bugs, starting with the ones hiding inside the tests themselves.

## 3. Theory

[01:35] → E04
The idea fits in one line from the README: we don't test the software, we test the tester. A Playwright suite is a guard. A numerical oracle is a guard. A formal proof checker is a guard. An AI judge grading another model's output is a guard too. And they all share the same problem: green doesn't tell you whether they're awake.

The only way to find out is to build a world where you know exactly what's wrong, because you broke it, and see if they notice. That's it. Everything else is the discipline to do it properly.

[02:15] → E05
The discipline is four steps. One, generate: build the baseline reality and confirm the guard accepts it. Two, mutate: change exactly one rule, on purpose. Three, audit: put the broken world in front of the guard. Four, validate: read the verdict.

Here it is in two very different worlds. In physics: you generate Snell refraction with the real indices. You mutate by swapping the two refractive indices. You audit with an independent oracle that shares no code with the simulation, using a tolerance frozen at ten to the minus six. You validate: KILLED, the oracle rejects it.

In a business flow: you generate the golden flow, log in, create, approve, publish. You mutate: a read-only user tries to approve. You audit with Playwright checks against the API. You validate: KILLED, the app answers 403.

Same method, two worlds. That's why it isn't a trick for one tool. It's a way of thinking.

[03:16] → E06
Every round reports three verdicts, always, never hidden. PASS: the unmutated baseline behaves the way the spec says. That proves the guard isn't raising false alarms. KILLED: the guard caught the mutation; the test has teeth. SURVIVED: the guard missed it. And here's the important part: a survivor can mean two things. It can be a real bug in the system, or a blind spot in the guard. Your job is to say which one, with evidence. Either way, it stays visible until somebody fixes it.

[03:50] → E07
Now the four experiments where this already runs. First, the physics track, which lives in my scientific-qa-evidence repo. Nine synthetic numerical models: an RC circuit, Newton cooling, second-order chemical kinetics, Beer-Lambert, a logistic response, Snell, a thin lens, an acoustic interface and Fechner. Contract and tolerance frozen before anything ran. Eighty-four paired variants. Result: 27 PASS, 54 KILLED, 3 SURVIVED. Those 54 kills are cases, not behaviors: two acoustic mutants produce the same output, so it's 51 distinct behaviors. And the classification came out identical on macOS arm64 and Linux x86_64.

The three survivors? They're the deliberately tiny RC mutation. It was left visible on purpose. Nobody tightened the tolerance to kill it. That's exactly the habit I want you to build.

[04:39] → E08
Second: breaking a step in a flow. That's experiment 02 in war-paradigm. A small app, a golden flow, and seven mutants on top of it. Each one changes a single step: a role that shouldn't approve, a required field left out, publishing before approval, an expired token, an 81-character title, a user who promotes themself, and a viewer who creates a draft.

Something I care about a lot here: mutants are data, not scripts. They live in `tests/scenarios.ts`, one per line, with the step they change and the status they expect: 403 for the swapped role, 422 for the missing field and the long title, 409 for publishing out of order, and 401 for the expired token. One test walks the list. Adding a mutant means adding a line.

Result: five die. Two survive: `self-grant` and `viewer-create`. The second one I found while preparing this course: the roles table says a viewer gets a 403 when creating a draft, and the app answers 201 because `POST /api/docs` never checks the role. The WAR Paradigm found a hole in its own example app.

And it isn't a blind spot. It's a real bug. The endpoint that changes roles reuses the "members can edit their own profile" rule: if you're an admin, or the member is you, you're in. So an editor can make themself an admin. Every happy-path test was green while this was open. The finding stays in the suite marked as known, printed in red on every run, until somebody fixes the rule.

There's another detail that separates a serious experiment from a toy one: not every failure counts as a mutant result. If the reset, the login or the baseline fails, that's not a survivor and it's not a kill. It's tagged INVALID_BASELINE, INCONCLUSIVE or INFRA_ERROR, visible but kept out of the score. That way nobody can hide an infrastructure problem behind a known survivor, or pad the scoreboard with failures that have nothing to do with the mutation.

[06:51] → E09
Third: breaking an AI answer. That's experiment 01, the one from module one. Two oracles. Q1 is deterministic: schema, roles, status codes, in `src/checks.ts`. Q2 scores against acceptance criteria, in `src/criteria.ts` and `src/scorer.ts`. A failed must blocks, shoulds add up, and the gate is 70.

Here the guard is the judge. In the unpinned set, run three scores 76, above the gate, and still gets rejected, because AC-1 fails, two scenarios with no source, and AC-3 fails, an editor approving with a 200. Same input: approved, approved, rejected. UNSTABLE. With pins, meaning a versioned model, temperature zero and a prompt version, the three runs score 86, 84 and 87: STABLE. The score is allowed to move. The verdict isn't.

[07:39] → E10
Fourth: breaking a guard rail. Experiment 03. The guard is a Claude Code `PreToolUse` hook: before the assistant runs a Bash command, the hook reads the call and, if it's a `git push` to `main` or `master`, exits with code 2 and blocks it.

Why a hook and not the prompt? Because a prompt can be ignored. A hook that exits 2 blocks every single time. Hard rules live in hooks, not in prompts.

But a hook is a guard too, so it gets tested WAR-style. Its suite, `tests/hook.test.mjs`, tries to sneak past: chained commands, refspecs like `HEAD:main`, `git -C` pointing at another folder, a bare `git push` while you're on main, all of it across the hook's three parsers: jq, node and sed. And attacking it paid off. A mutation found two real holes, `git -c` and `git --no-pager`, fixed in commit `1b01c66`.

[08:36] → E11
That thread runs through the rest of the course. An LLM judge that has to fail "Medellín" when the right answer is "Bogotá", in qa-eval-lab. Fifteen defects seeded into agent traces, in agent-eval-jev. Six seeded failures for CI triage. Six regressions across twenty commits for the test selector. PII and headers seeded for the civica auditor. And sabotaged predictors for the physics debugger. Always the same question: does the guard notice?

For your mutations to mean anything, four rules. One: change one thing only, so you know what the guard caught; with two changes, a kill can hide the fact that the guard misses one of them. Two: write the prediction before you run. Three: run the baseline first. Four: if it survives, don't tweak the mutant or the tolerance until it dies. It gets published as is.

And what WAR doesn't tell you. A high kill rate only proves the guard catches the mutations you thought of. The catalog carries the biases of whoever wrote it. That's why the best mutants are planted by someone else, which you'll see in the blind tests in level four.

## 4. Lab

[09:51] → E12
Terminal time. `git clone https://github.com/criguex/war-paradigm.git && cd war-paradigm`, then `npm ci` and `npx playwright install --with-deps chromium`. You need Node 20 or later and git. `npm test` runs all three experiments.

Look at experiment 02's scoreboard. Role-swap, KILLED, the expected 403 showed up. Drop-input, KILLED with a 422. Reorder, KILLED with a 409. Stale-token, KILLED with a 401. Boundary, KILLED with a 422. Self-grant: KNOWN SURVIVOR, the mutation was accepted with HTTP 200. And viewer-create: KNOWN SURVIVOR, accepted with HTTP 201. Five of seven caught, two survived, zero excluded from the score. Notice the run doesn't go red because of the known survivors: it stays green but prints them in red. If you want a real survivor to break the pipeline, there's `npm run test:strict`.

Every scenario also leaves evidence in `test-results/mutant-evidence.json`: the id, the expected and observed status, the git revision, and SHA-256 hashes of the app, the scenarios, the runner, the test and the lockfile. If someone asks you tomorrow which version produced that verdict, the answer is in the file, not in your memory.

And if you want to kill the survivor yourself, the README tells you how: in `app/server.js` you change the rule so only an admin can change roles, run it again, and the scoreboard changes. I tried it on a copy: self-grant flips to FIXED with the expected 403, and the scoreboard reads six out of seven caught, because viewer-create is still open. Then you remove the mutant's `known` field, because the finding is closed.

[11:31] → E13
Now the hook. `npm run test:03` runs the hook cases and the vault checks: on my run, 45 tests, 45 pass. Six of them pin known limits: ways to sneak a push through that the hook still lets pass, like `sh -c` or a branch in a variable. A regex hook is a barrier against mistakes, not a sandbox. `npm run demo:03` shows it against six commands. `git push origin main`: blocked, exit 2. `git push --force origin HEAD:main`: blocked. `npm test && git push origin master`: blocked. Pushing a feature branch: allowed. And `git pull origin main`: allowed, because pulling from main isn't pushing to it.

This part's on you. From the experiment folder, feed the hook the JSON Claude Code would send: `echo '{"tool_input":{"command":"git push origin main"}}' | ./hooks/block-push-to-main.sh; echo $?`. On my run it prints the block message and exit code 2. Your job is to rewrite that command until one gets through, or until you're convinced none will.

[12:35] → E14
And the physics track, which is optional and needs Python 3. Clone scientific-qa-evidence, go into `evidence/numerical/source` and run `python3 -m unittest test_runner`. On my machine: seven tests, OK, in under a second. One of those seven reruns the whole campaign and checks that it comes out 27 PASS, 54 KILLED and 3 SURVIVED, with every case matching the saved macOS run.

## 5. This week's WAR mutation

[12:59] → E15
This week's mutation is the one the course asks for: make the experiment 01 agent hand in a scenario where an editor approves and gets a 200. In your fork, open `experiments/01-ai-verdict/fixtures/runs/pinned/run-2.json`, find scenario S-2, "approve a draft as approver", and change one thing: the `actor`, from `approver` to `editor`. Leave the expected 200 alone.

Why this one and not another? Because it's exactly the bug we found in the real app with self-grant: an editor who ends up approving. If the AI judge can't see that mistake in a test plan, the plan will cover precisely what doesn't matter. And I only change the actor so that, if something shouts, I know what made it shout.

Prediction, written and committed before running: AC-3, the role contract, should catch it. Run two should flip to rejected even though the score doesn't change, and the pinned set should stop being STABLE.

[13:59] → E16
I run `npm run demo:pinned -w experiments/01-ai-verdict`. AC-3: failed. "S-2: editor → approve expects 200, matrix says forbidden → 403". Score 84, unchanged. Verdict: REJECTED, must failed: AC-3. And the set: UNSTABLE, the verdict flipped from approved to rejected on run two and back to approved on run three.

Then `npm run test:01`: three tests fail. The pinned-set stability check, the scorer test that expects pinned runs to be approved, and the command-generator test. Twenty-four pass. AC-3 shouted and so did the suite. Verdict in my table: KILLED. I restore the file and everything goes back to green.

## 6. The challenge and how it's graded

[14:38] → E17
Your deliverable is this week's WAR table: for each mutation, what you broke, what you predicted, which guard saw it, and the verdict. Plus a fork of war-paradigm with the 01 mutation and, if you found a hole in the hook, the new test case.

Criteria. One: for every mutation, the table shows a single broken thing, a prediction committed before the run, the guard and the verdict, PASS, KILLED or SURVIVED. Two: at least three mutations, one AI answer, one command against the hook, and one from your own work. Three: the hook attempt includes the input JSON and the exit code. If you found one that gets through, you add the case to `tests/hook.test.mjs`, failing before the fix and passing after. Four: no survivor was deleted or tweaked.

The rubric has four rows. One mutation, one prediction: at level three, a single change and the prediction in an earlier commit. Verdicts: baseline PASS, plus KILLED and SURVIVED for every mutation. Different guards: an AI judge, a hook and one of your own. Honest reporting: the survivor stays visible, with a cause and a next step. You pass with all four rows at level three or above, plus the quiz, six out of eight.

## 7. Mini-quiz

[16:00] → E18
Three questions. Pause if you like.

One. In WAR, what does PASS mean? A: the mutation slipped through unseen. B: the unmutated baseline behaves the way the spec says, so the guard isn't raising false alarms. C: the kill rate is a hundred percent. D: CI is green.
[pausa 5 s]
B. PASS is about the baseline. What the guard catches is KILLED, and what slips past is SURVIVED.

[16:31] → E19
Two. The self-grant mutant survives in experiment 02. What kind of finding is it? A: a blind spot in the suite, a missing test. B: a real system bug, the app lets a user promote themself to admin. C: an infrastructure error. D: not a finding.
[pausa 5 s]
B. What's wrong is the app's `editMember` rule, and the README reports it as a real authorization bug.

[17:02] → E20
Three. A very small numerical mutant survives with the tolerance frozen at ten to the minus six. What do you do? A: report it as SURVIVED and leave it visible, without touching the tolerance. B: tighten the tolerance to kill it. C: drop it from the catalog. D: count it as KILLED.
[pausa 5 s]
A. Moving the tolerance after you've seen the result is fitting to the result.

## 8. Wrap-up

[17:33] → E21
Three ideas. One: a guard that never shouts might be asleep, and the only way to find out is to break something on purpose. Two: four steps, generate, mutate, audit, validate, with a single broken thing and the prediction written first. Three: PASS, KILLED and SURVIVED always get reported, and the survivor is published as is, saying whether it's a bug or a blind spot.

From now on, every module ends with a mutation. Next up is test design and techniques, and you'll see that every technique is a mutant factory. Links are in the description.

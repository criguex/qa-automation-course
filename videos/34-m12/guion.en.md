# Script · 34 · m12 · Capstone "WAR Audit"

Voice-over: Cristian, first person · US English · ~150 words/min · 2686 narration words · estimated runtime 18:09 (quiz pauses included)

Each block has its own timestamp and the scene it plays over (→ E##). Scene ids match `escenas.json`; the English cut runs on its own clock, so the editor stretches or trims each scene to these times.

## Hook

[00:00] → E01

I have a hook that stops my AI assistant from pushing to main. It had its own attack suite: twenty-eight cases, with chained commands, refspecs and bare pushes. All green. This week I hit it with a WAR mutation and found this: git dash c, any option at all, push origin main, came back with exit zero. And git dash dash no pager push origin main, too. The guard I had tested myself had a hole that let a push to main through. I fixed it, added the tests that failed against the old hook, and it went up to thirty-three. Then, preparing this course, I attacked it again. Backslash git got through, and I closed it. Six more still get through, like sh dash c, eval or the branch in a variable, and I didn't hide them: they're pinned with tests as known limits, because a regex hook is a barrier against mistakes, not a sandbox. Today there are forty cases. That's the spirit of the capstone: even your tested guards get attacked again.

[01:10] → E02

This is the capstone, and this is where everything comes together. You pick a system, pre-register what you'll claim, break its guards on purpose, let an AI assistant execute under rules that live in code, and you sign. But the real test isn't that it goes green for you. It's that someone else, on a clean machine and with only your package, runs one command and gets the same fingerprint. If they can't, the audit doesn't pass, even if everything works on your computer. Let's see how to build a package that holds up to that.

## Explained like you're 8

[01:48] → E03

If you were eight: you're the guard inspector. You break things on purpose to see if the guards yell. If a guard doesn't yell when you break something, it's asleep, and that's exactly what you need to find. A robot helps you carry the tools and write everything down, but you sign the sheet, because you answer for what it says. And at the end, a friend repeats it all in a brand-new box, without your tricks or your desk, and gets the same result. If they get something different, you're not done yet.

## Theory · the three axes

[02:26] → E04

The theory starts with the three axes, in a single deliverable. Axis A, AI-assisted QA: the assistant designs and executes, and a person signs. Axis B, mutant execution: generate, run, classify and measure the kill rate. Axis C, WAR Paradigm: every suite, every judge, every hook, every verifier is a guard, and the only way to know whether it's awake is to break something on purpose and see if it yells. These aren't three projects. It's one system, audited from three angles, with the same evidence.

## Theory · axis A: rules in code

[03:00] → E05

Axis A, first rule: hard rules live in code, not in prompts. A prompt can be ignored. A hook that blocks a push to main can't be forgotten. In war-paradigm, experiment three registers a Claude Code PreToolUse hook for the Bash tool. Before every command, the hook reads the call as JSON, and if the destination is main or master, it exits with code two: blocked, and the message goes back to the assistant. And the barrier is tested WAR-style: twenty-eight cases, per the course, tried to sneak through. Then thirty-three, because of the finding I opened with. Today forty, and six of them are known limits that still get through on purpose, written down.

## Theory · axis A: the assistant's log

[03:46] → E06

Axis A, second rule: what the assistant did gets logged. In scientific-qa-evidence, the CODEX_WORK_LOG file lists nineteen sessions, with their tool calls, their commits and the SHA-256 of each session file, so they can be identified later. It has a section I think is key: What was not executed. That's where anything discussed or illustrated but never run gets written down, so nobody mistakes a drawing for a result. Every commit names the agent with a Co-Authored-By trailer, and the person answers for every claim. And the same log includes a blind double review: two judges and a narrowly scoped fixer.

## Theory · axis B: mutants as data

[04:27] → E07

Axis B: mutants as data. In war-paradigm, experiment two takes a golden flow: log in, create, approve and publish. The file tests slash scenarios dot ts declares one contract per mutant, each with a single change. Before mutating, the runner validates the reset, the login and the unmutated baseline. If any of those fails, it isn't a mutant result. Only KILLED and SURVIVED score. INCONCLUSIVE, INVALID_BASELINE and INFRA_ERROR show up in the report, but they stay out of the score. Published result: five out of seven killed and two survivors, self-grant and viewer-create, which I found while preparing this course. And those survivors aren't flaws in the suite. They're real authorization bugs.

[05:12] → E08

Here's what the finding looks like. The contract says: at the grant step, request the admin role and expect a 403. The postcondition: the member's role must still be editor. And the server rule reuses the members can edit their own profile rule: if you're an admin, or if you're editing yourself, you're allowed. So an editor promotes themself to admin, and then approves and publishes alone. Every happy-path test was green while this was open. With MUTANT_LAB_STRICT set to one, the known survivors make the run fail, instead of staying green with a note.

## Theory · axis C: the evidence gets tested too

[05:50] → E09

Axis C: the evidence gets tested too. You saw this in the formal proofs module. In receipt-check, a receipt naming a missing log and a stale log under the right name both left the published procedure's result unchanged. The check that only looks at whether the log exists caught the first and let the second through. Only the hash comparison caught both. In the capstone this stops being an example and becomes a requirement: your package has to survive the same attack. If your verify behaves like an existence check, you'll find out in the mutation, and it gets published.

## Theory · reproducible from clean

[06:30] → E10

Reproducible from clean. predictor-debugger's verify workflow runs on a fresh GitHub runner, ubuntu 24.04, installs with uv run dash dash locked, and for every saved machine it demands the fingerprint with grep dash q. If the fingerprint isn't there, grep exits with one and the job goes red. Nobody has to eyeball anything: the fingerprint is required. And the reproduce workflow goes further: it recomputes from the published data. On its first run, the round 1 job took six minutes thirty-three seconds, download included, and produced the same fingerprint.

## Theory · reproduced isn't third-party reproduced

[07:05] → E11

Now, a word you have to use carefully: reproduced. The cloud rebuild in scientific-qa-evidence was run by an assistant under my direction, and its README says so in plain words: not independent. The three machines behind predictor-debugger are mine, and the README declares that too. That counts as reproduced, but not as reproduced by a third party. In this capstone, whoever reproduces it has to be someone else. And if they get something different, their report gets published as is and the difference gets investigated. That's evidence too.

## Theory · the honest report

[07:40] → E12

And the honest report. Your README has five sections. Measured: what you ran, with its numbers. What this says and what it doesn't: how far your conclusions reach. Limits: the scope, who reproduced it, which tools you reused. What would prove me wrong: the result that, if it showed up, would force you to change your conclusion. And what wasn't run, just like the Codex log. The underlying rule is simple: every number in the README comes from a command anyone can run, with its exit code. If a number has no command behind it, it doesn't go in.

## Lab

[08:20] → E13

Lab time. Step one: run the two model pieces. You need Node 20 or newer and git. You clone war-paradigm, install with npm ci, which respects the lockfile, and install Chromium for Playwright. You run demo two and the scoreboard closes like this: five of seven scored mutants killed, two survivors, zero excluded. Self-grant shows up as a known survivor, accepted with HTTP 200, and viewer-create, accepted with HTTP 201. Now you run the same thing in strict mode, with test strict, and echo exit at the end. It comes out exit one. That's what you want: the known survivors make the run fail. In your capstone, a survivor never gets hidden so everything looks green.

[09:06] → E14

The hook. You run demo three and see six commands thrown at the hook. Git push origin main: blocked, exit two, with the message that goes back to the assistant. A force push to HEAD colon main: blocked. An npm test chained with a push to master: blocked. And the ones that should go through do: a push to a feature branch, with and without dash u, and a git pull from main, which isn't a push. Both sides of the guard: what it should block and what it shouldn't. Then you run the hook's suite: forty tests, forty pass, and six of them assert known limits that still get through with exit zero. Against the hook from before the fix, five of them fail.

[09:56] → E15

Step two: rehearse the clean reproduction. Take a model repo and run its verification inside a container that's born and dies with the command: docker run dash dash rm, mount the folder, the python 3.12 slim image, and run verificar dot py. I did it today on the same commit in two environments: my Mac, with Python 3.9, and the container, Linux with Python 3.12. All six OK, and the same fingerprint on both: C 5 F 0, F 1 A 8, 2 F 4 D. That's exactly the property your package needs: different system, different Python version, same fingerprint.

[10:36] → E16

Step three: build the package. The minimum layout is this. PREREGISTRO dot md and thresholds dot json, before any result. The mutants as data, in a scenarios file. A ledger dot jsonl with every survivor and its cause. A receipts dot jsonl with every step. A verify that recomputes the verdicts and prints a fingerprint. A lockfile, package lock or uv lock. A verify dot yml workflow that demands the fingerprint with grep dash q. A REPRODUCE dot md with a single command. A LOG dash IA dot md with the assistant's sessions, their commands, exit codes, hashes, and the what wasn't run section. And the README with the honest report.

[11:21] → E17

Step four: the assistant executes, you sign. You install your own hook; you can start from block push to main dot sh and its settings dot json. You write its attack suite, and I'd recommend including the disguised commands you just saw: global git options in front of the push. Then you let the assistant run the audit and log every step in receipts dot jsonl. You review the diff before every merge, and its commits carry the Co-Authored-By trailer. That way anyone can tell what the assistant wrote, and also that a person read it before it went in.

[12:01] → E18

Step five: someone else's reproduction. You give a person who didn't write the code nothing but the repo URL. Nothing else: no call to walk them through it, no laptop. That person follows your REPRODUCE dot md in a clean environment, a throwaway container or a fresh CI runner, and publishes a REPRODUCCION dash their name dot md in the format of the independent reproduction guide: who, UTC date, machine, commit, versions, a table of steps with command, start, end and exit code, the fingerprint, and the differences. And they publish it as is, even if it comes out different. You don't edit it.

[12:42] → E19

Step six: the defense. Thirty to forty-five minutes in front of someone who didn't write the code. And the rule is simple: every claim in the README is defended by running its command live. If you say your suite kills five out of six mutants, you run the suite. If you say the fingerprint matches, you print it. If you say your verify catches a stale log, you plant one right there. It's uncomfortable, and that's exactly what makes it valuable: you learn not to write anything you can't show.

## WAR mutation of the week

[13:18] → E20

This week's mutation is the one from the opening, but aimed at your own package. Before you hand it in, you attack it the way receipt-check did. One: delete a log that a receipt names. Two: replace another log with a stale one under the same name. Three: change one byte of thresholds dot json. Your verify has to exit with a non-zero code in all three cases, and with zero on the clean package. If it only catches the missing log, your check behaves like P6, and that gets published as a finding. It's not a failure: it's exactly the kind of thing this audit exists to find, just like the hole in my hook.

## The challenge and how it's graded

[14:05] → E21

The challenge. You deliver a public repo with the package, someone else's REPRODUCCION file, and the defense. The criteria: git log dash dash reverse shows the pre-registration and thresholds before the first result. Someone else ran your REPRODUCE from clean, with exit zero and the same fingerprint, and their file is unedited. From the mutants JSON, the kill rate can be recomputed as KILLED over KILLED plus SURVIVED, and every survivor is in the ledger with its cause. The hook has an attack suite in CI. Two recorded runs show verify failing with one byte changed in the thresholds and with a stale log. And the README has the five sections plus the AI-use statement.

[14:51] → E22

The integrated rubric has four rows, one per axis plus evidence, and you pass with all four at level three or above. AI-assisted QA, level three: a hook with an attack suite in CI, receipts with every command, exit code and hash, a reviewed diff and the trailer. Mutants, level three: at least six as data, a valid baseline, a recomputable kill rate and strict mode. WAR, level three: at least two distinct guards, each with a control that should pass and one that should fail. Evidence, level three: pre-registration before the data, a lockfile, the same fingerprint in CI and on your machine, and someone else reproducing it. WAR's level four asks for something you already saw today: publish a guard that failed and what changed afterwards.

## Mini-quiz

[15:42] → E23 · pausa 5 s

Mini-quiz. Pause if you like. First: your audit runs green on your laptop and in your CI, but the person who tried to reproduce it didn't get the same fingerprint. Does it pass? A, yes, because it works for you. B, no: the criterion is that someone else reproduces it from clean with the same fingerprint; their report gets published as is and the difference gets investigated. C, yes, if CI is green. D, yes, if the difference is small. B.

[16:19] → E24 · pausa 5 s

Second: your mutant run gives four KILLED, one SURVIVED and two INFRA_ERROR. What's the kill rate? A, four sevenths. B, four fifths. C, six sevenths. D, five sevenths. It's B: only KILLED and SURVIVED score, four over four plus one. Infrastructure errors show up in the report, but they don't count for or against you.

[16:46] → E25 · pausa 5 s

Third: your verify catches a deleted log, but lets a stale log with the same name through. What do you have? A, a complete verifier. B, a check that behaves like P6: it checks that the file exists, not that it's the one that was produced, and you need to bind every receipt to the hash recorded when the step ran. C, a filesystem problem. D, nothing serious. B. The substituted-log mutant survives your guard, and that gets published and fixed.

## Wrap-up

[17:24] → E26

Three ideas to close the capstone. First: hard rules live in code, and that code gets attacked too; my hook with twenty-eight tests had a hole, a mutation found it, and the holes I couldn't close are written down as known limits. Second: the survivor is the finding; hiding it so everything looks green turns the audit into a false green. Third: passing doesn't mean it works for you; it means someone else, in a clean environment, with one command, gets the same fingerprint, and that whatever wasn't run is written down. The last module is your career: how to tell all of this in two minutes, with numbers that come from a command.

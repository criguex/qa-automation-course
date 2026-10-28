# Script EN · Module 27 · m23 — AI-assisted QA II

_Narration words: 2747 · estimated length 18:34 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it plays over.

## [00:00] → E01 · Hook

I have a hook that stops my AI assistant from pushing to main. It had dozens of tests, all green. And still, this command got through: git dash c core dot x equals y, push origin main. Exit zero. So did this one: git dash dash no-pager push origin main. Exit zero. The hook guarding main let a push to main through if you just added a global git option. A code review didn't find it. A WAR mutation did, which means deliberately trying to sneak past. Today you'll reproduce that hole, and then go looking for your own.

## [00:40] → E02 · Title

This is module twenty-seven: AI-assisted QA, part two. The assistant designs, runs, and audits. A person signs off. We'll work with experiment three in war-paradigm, which is a hook plus a knowledge vault, and with scientific-qa-evidence, my study where every command, hash, and exit code is published. I use assistants to go faster, and the signature is mine.

## [01:03] → E03 · Explained for an 8-year-old

If you tell a robot "please don't touch that," you're making a request. Maybe it listens, maybe it forgets. If you put up a fence, it's not a request anymore: it's a rule. Doesn't matter whether the robot remembers or not, the fence is there.

Now imagine a friend runs an experiment for you. You write down every step: what they used, what they did, what they got. That way someone else can repeat it and see if they get the same thing. And if there was something you didn't get to, you write that down too, instead of pretending it's done.

In the end, you're the one who signs. Your friend helped, but you're the one who answers for it.

## [01:51] → E04 · Theory 1: who does what

The split is easy to say and hard to live by. The assistant designs, runs, and audits. The person picks the questions, decides what counts as evidence, and signs.

In scientific-qa-evidence it's written down in the "How AI was used" section of the README. OpenAI Codex was the main coding agent at first, and Claude Code made the later audit, documentation, and experiment changes. Every commit names the agent in a Co-Authored-By trailer. And here's the sentence that matters: Cristian Guerra chose the questions, froze the contracts, decided what counts as evidence and is responsible for every claim.

AUTHORSHIP dot md goes further. AI tools are disclosed as assistance, not as academic coauthors. And it even traces a mid-session change in the model the assistant reported, with the exact commits where the trailer changed.

## [02:45] → E05 · Theory 2: rules in code, not in prompts

On my GitHub profile, under "How I work," there's a line I repeat a lot: hard rules live in code, not in prompts. Hooks, CI gates, and reviews that can't be forgotten.

Why? Because a prompt is a request. If you write "never push to main" in CLAUDE dot md, the model can skip right past it. A hook can't be skipped. Experiment three in war-paradigm has a Claude Code PreToolUse hook, registered in dot claude slash settings dot json. Before every Bash call, Claude Code hands the call to the hook as JSON. The hook reads the command, and if the push target is main or master, it exits with code two. Exit two blocks the call and shows the reason to the assistant. Exit zero lets it through.

## [03:37] → E06 · Code: the hook

Here's the file, hooks slash block-push-to-main dot sh. At the top, the contract in comments: exit two, the call is blocked and stderr goes to the assistant; exit zero, it goes through. And one line that sums it up: a prompt can be ignored, this can't.

First it pulls the command out of the JSON, with jq if it's there, node if it isn't, and sed as a last resort. Then it splits the line into simple commands on double ampersand, double pipe, semicolon, and pipe. For each one it looks for a git push, pulls out the remote and the refspecs, and checks the destination. If there's no refspec, it checks the current branch. If it's main or master, it blocks.

## [04:26] → E07 · Lab A: the hook in action

Clone war-paradigm, go into experiments slash zero three dash second-brain, and run npm test. Forty-five tests, forty-five pass. One detail: when I prepared this module, the experiment's README said thirty-three checks while the terminal showed thirty-eight. I went with what the terminal said and fixed the README. Today both say forty-five, forty of them on the hook.

Then npm run demo. Six commands against the hook. git push origin main: blocked, exit two. git push dash dash force origin HEAD colon main: blocked. npm test double ampersand git push origin master: blocked, because the hook checks every command in the chain. And three go through with exit zero: a push to feature slash mutants, the same with dash u, and a git pull origin main, which isn't a push.

## [05:17] → E08 · Theory 3: the hook is a guard too

Here's the WAR idea in this module. The hook protects main, but the hook is also a guard, and guards need testing. If nobody ever tries to sneak past, you don't know if it's awake.

That's why tests slash hook dot test dot mjs attacks it against real temporary git repos, both on main and on a branch. It tries refspecs like HEAD colon main, force flags, chained commands, git dash C, and a bare git push while sitting on main. And it runs all of that through the three JSON parsers: jq, node, and sed. Each parser is a different path a command might slip through.

## [06:00] → E09 · Terminal: reproducing the hole

Now the real case. I pull the hook as it was in the commit before one b zero one c six six, using git show. I feed it the JSON for git dash c core dot x equals y push origin main. Exit zero. Then git dash dash no-pager push origin main. Exit zero. Both got through.

Same two commands against today's hook: exit two and exit two. And a legitimate push to a feature branch still exits zero on both hooks. The fix closed the hole without blocking what should pass.

## [06:37] → E10 · Code: the fix and its tests

What changed? The old hook only recognized git, optionally dash C plus a folder, and then push. Any other global option between git and push threw it off. The fix adds a variable, GIT_OPTS, that accepts dash c, dash C, git-dir, work-tree, namespace, and config-env with their values, plus any other option starting with a dash.

And the commit adds five tests: git dash c with key equals value, git no-pager, git-dir with a folder, work-tree with dash c, and one that must pass: dash c with a push to a feature branch. The commit message says the new tests fail on the old hook and pass on this one. That's exactly what the lab asks of you: write the test that fails on the old hook first, then compare your fix idea with the commit's.

## [07:31] → E11 · Theory 4: context before prompts

The other half of experiment three isn't a hook. It's a vault. The specimen is an assistant asked to write Playwright tests for a flow it's never seen. It writes clean code, correct syntax, that tests nothing that matters.

What worked wasn't a better prompt. It was giving the assistant what a senior QA carries in their head, written down in one place it reads before every task. The vault has zero zero READ FIRST, which is the project on one page, Golden rules, which is what it must never do, and folders for process, workflows, knowledge, sessions, and templates. That's where the roles, the test data, and the known defects live.

And the vault gets tested too. tests slash vault-links dot test dot mjs breaks the build if a link points to a note that doesn't exist, a note has no frontmatter, or a note is an island.

## [08:31] → E12 · Theory 5: evidence is command, hash, and exit code

Now evidence. When an assistant runs something for you, "it worked" isn't evidence. Evidence is the exact command, the version, the hash of what went in and came out, and the exit code. With that, someone else can repeat it.

scientific-qa-evidence publishes a public record of every command, version, hash, and exit code, including the errors that were found and fixed. There are two ways to check it. shasum dash a two fifty-six dash c on evidence slash SHA256SUMS dot txt confirms every curated file is the published one. And python verificar dot py runs six checks, shows OK or FAIL for each, and gives you a fingerprint, a short code you can compare with someone else's.

## [09:18] → E13 · Lab B: verify

I ran it on a copy. verificar dot py: data version two six seven nine one f e six five four six f, Darwin arm sixty-four, Python three point nine point six. One, files intact: OK. Two, saved numerical runs identical between Mac and Linux: OK. Three, rerunning the eighty-four numerical variants: OK. Four, README, CLAIMS, and records agree: OK. Five, Mathlib control receipts: OK. Six, receipts in the published packages: OK. All six OK, exit zero, and the fingerprint is C five F zero, F one A eight, two F four D.

If you run the same thing on the same version and get the same fingerprint, we both got exactly the same result. If yours is different, that's useful too, and the script gives you the link to report it. shasum exits zero as well: every file on the list says OK.

## [10:15] → E14 · Browser: the agents' log

Now open docs slash CODEX_WORK_LOG dot md. On October twentieth, twenty twenty-six, Codex ran nineteen sessions: one main session and eighteen sub-agents, each with its own role. The "How this log was built" section explains how it was put together: all two hundred thirteen local Codex sessions and the four hundred seventy prompt-history entries were read, and the nineteen that belong to this study were kept.

The full transcripts aren't published, because they contain personal data and commands that handle credentials. Instead, there's the SHA-256 of every session file, so the exact files the log was built from can be identified later.

In the table you'll see two blind judges, jd_tts_a and jd_tts_b, who reviewed the same thing without seeing each other, and a scoped fixer, tts_safety_fix, that applied their notes. And there's the "What was not executed" section: some "auto-fix" illustrations, with a correction in five milliseconds against a hundred ninety-five millisecond anomaly, were never run. The five milliseconds are part of the drawing, not a measurement. And the log says so.

## [11:24] → E15 · Theory 6: what isn't independent, and your own mistakes

Two more rules. First: declare what isn't independent. The cloud rebuild on October twenty-third was run by me with an AI assistant, under my direction, and its README puts that under limits: it isn't independent. Someone else still needs to rebuild it, and there's a guide for doing that.

Second: publish your mistakes. FINDINGS dot md lists eight findings. Numbers one, three, and eight were defects in the study itself. A build I believed was clean had silently received seven prebuilt dependencies, and the log didn't show it. Two runs reported as using the same build had used different builds. And the numerical runner reported oracle_valid true when the oracle had thrown an exception or returned NaN. All three were fixed in the open. An audit that catches its own mistakes is worth more than one that claims it had none.

## [12:21] → E16 · Terminal: breaking the evidence

Let's break the evidence, on a copy. I add one single space at the end of REPRODUCE dot md, which is on the SHA256SUMS list. shasum: REPRODUCE dot md, FAILED. One checksum didn't match. Exit one.

verificar dot py: check one, files intact, comes back FAIL. The other five are still OK. Result: one of six checks failed. Exit one. And the fingerprint changed: it's no longer C five F zero, now it's five seven F four, seven A F B, one B nine E. One space changes the fingerprint. That's why the fingerprint is useful for comparing: if someone else gets a different one, something in their copy isn't what was published, and the details say what.

## [13:08] → E17 · WAR mutation: your own attempts

This week's mutation asks you to invent your own attempts against today's hook, at commit five d c five nine two, and to write down first which ones you think will get through. I tried nine, sitting on a feature branch.

Blocked with exit two: git push origin main, as the control; git push origin refs slash heads slash main; git push origin feature colon main; git, a tab, then push origin main; and git push dash dash repo equals origin main.

Four got through with exit zero. git dash c alias dot p equals push, then p origin main: an alias defined on the same line. A variable: G equals push, semicolon, git dollar G origin main. eval with the push inside quotes. And bash dash c with the push inside quotes. The hook looks for the word push after git, and in those four cases the word isn't there. It's hidden in an alias, in a variable, or inside another shell.

## [14:13] → E18 · What to do with a hole

Those four are holes in today's guard, found with the same method that found the one fixed in one b zero one c six six. What I do with them is what the module asks: a hole you find gets published, not hidden. When you can, you write the failing test, you fix it, and you keep the test so it doesn't come back. When you can't fix it without parsing the whole shell, like these four, you publish it as a known limit. In war-paradigm each one now has a test under "known limits: these get through" that asserts today's exit zero, so if someone closes one, the test tells you and the README gets updated.

And a design thought. A hook that parses shell text will always have odd cases. That's why it isn't the only layer: it's a fence, not the only door. What doesn't change is the principle. A critical rule can't live only in a prompt, and the guard that enforces it gets attacked with tests.

## [15:22] → E19 · The challenge and how it's graded

Your challenge. Direct an assistant, Claude Code or Codex, through a scoped audit. For example, reproducing the agent-eval-jev report or the jev-test-impact benchmark. The assistant designs and runs; you decide and sign. You deliver five things: an EVIDENCIA dot md with every command, version, commit, exit code, and SHA-256 of inputs and outputs; two blind reviews in separate sessions that can't see each other, plus your synthesis; a "What was not executed" section; a hook of your own that blocks a dangerous action in your repo, with its attack suite; and authorship declared with Co-Authored-By trailers.

Here's how it's graded. Someone else repeats the task using only your package and gets the same exit codes and hashes, or documents where they differ. Every claim in the report links to a command with its exit code. The two reviews are in different sessions, neither cites the other, and your synthesis says what you accepted and what you dropped. Your hook exits non-zero on every documented attack and zero on legitimate commands. And the report includes "What was not executed" and at least one mistake of your own, found and fixed.

The rubric has four rows: rules in code, evidence, review, and honesty. For the top level on rules, you find and report a hole in someone else's hook, war-paradigm's for example. You've already seen there's material.

## [16:52] → E20 · Mini-quiz

Three questions. Pause on each one.

One. You write "never push to main" in your repo's CLAUDE dot md. Why isn't that enough? Because a prompt is a request the model can skip. A hook that exits with two blocks the call.

Two. What does the "What was not executed" section in CODEX_WORK_LOG dot md separate? What was only illustrated from what was actually run. The auto-fix scenes were never executed, and their five milliseconds are part of the drawing.

Three. You change one byte of a file listed in evidence slash SHA256SUMS dot txt. What do you expect from shasum dash a two fifty-six dash c? FAILED on that file and a non-zero exit. And you just saw it: exit one.

## [17:55] → E21 · Wrap-up

Three ideas. One: hard rules go in hooks and CI, not prompts, and the hook gets attacked too, because mine had holes that thirty-eight tests didn't see, and now they're written down as known limits. Two: evidence is command, hash, and exit code, so someone else can repeat it and compare a fingerprint. Three: say what wasn't executed, flag what isn't independent, and publish your mistakes. The assistant helps; the signature is yours.

Next module: preregistration and reproducibility. Thresholds written down before you see the data, and the same fingerprint on another machine. See you there.

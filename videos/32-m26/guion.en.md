# Script · 32 · m26 · Checking a formal proof without being a mathematician

Voice-over: Cristian, first person · US English · ~150 words/min · 2657 narration words · estimated runtime 17:58 (quiz pauses included)

Each block has its own timestamp and the scene it plays over (→ E##). Scene ids match `escenas.json`; the English cut runs on its own clock, so the editor stretches or trims each scene to these times.

## Hook

[00:00] → E01

A build that took an hour and a half. Exit zero. Clean log. I searched the log for the words fetched, unpack and downloading: zero hits. I was sure everything had been compiled on my machine. It hadn't. Seven dependencies had quietly arrived as prebuilt archives from Reservoir, Lean's package registry. The log didn't show it. Something else gave it away: comparing the timestamps of the dot olean files with the build's start time. An artifact older than the build wasn't built there. That was build B3, and it's the reason B4 exists.

[00:37] → E02

And the second surprise. I took a theorem Mathlib already proves, that there are infinitely many primes, and changed n less than p into n plus one less than or equal to p. To Lean, those two are the same thing by definition. Comparator, the statement checker, rejected it. Is Comparator broken? No. It does exactly what it says: it checks that the statement is the challenge's statement, in its exact form. Rejected doesn't mean false. It means the statement changed. In this module you'll learn to review a formal proof without being a mathematician, and to avoid drawing conclusions the tool doesn't give you.

## Explained like you're 8

[01:19] → E03

If you were eight: the teacher checks that every sum in the homework is done right. That's Lean: it checks every step. You check three other things. That the homework answers the question that was actually asked, because a perfect answer to a different question is useless. That nobody brought it in already done, because if it came from somewhere else you don't know how it was made. And that the teacher does give a bad grade when you change the question, because a teacher who gives everyone an A isn't checking anything. None of that is math. It's QA.

## Theory · what Lean doesn't check

[01:59] → E04

Let's start with what Lean checks and what it doesn't. Lean checks that every step of the proof is valid. It's very good at that. But it doesn't check four things. One: how the proof was built. Two: whether the statement it verified is the one that was intended. Three: whether it matches the problem as the Clay Institute wrote it. And four: whether the published evidence is what was actually produced. Those four gaps are QA work, and each has its own step in the protocol: rebuild from source, mutate the statement, connect to Clay's text, and tie every log to a hash.

## Theory · rebuild from source

[02:41] → E05

Rebuilding from source. scientific-qa-evidence ran five builds of OpenAI's proofs. B2 used Mathlib's prebuilt cache, like the published procedure. B3 was supposed to be clean, and you saw what happened. The last two, B4 and B5, ran with lake dash dash no cache build: exit zero, eleven thousand four hundred twenty-four jobs, one hour twenty-nine and one hour sixteen, every dependency compiled locally. And for B4 the check that exposed B3 was repeated: every dot olean had to be newer than the build's start. The lesson is a supply-chain one: a clean log is not proof of origin.

## Theory · independent checkers

[03:20] → E06

Independent checkers. Comparator checks two things: that the solution proves exactly the theorem in the challenge file, and that it only uses the allowed axioms, which are propext, Quot dot sound and Classical dot choice. And it does that with two kernels: Lean's own, and nanoda, a separate implementation. I also ran leanchecker dash dash fresh, which re-checks everything from an empty environment, and it accepted both solutions. But careful not to over-count it: leanchecker uses Lean's kernel, so it isn't a third implementation. And lean4lean, which would have been one, didn't build for Lean 4.34. That goes in the Limitations section, not under the rug.

[04:02] → E07

And here's the limit I most like to teach, because it's uncomfortable. Two kernels agreeing sounds very strong. But in July 2026, a bug in Lean and a different bug in nanoda let the same false proof through. Two independent implementations, two different bugs, the same wrong answer. The checkers I used are up to date with the known 2026 fixes, but that only covers what's known. Agreement between two kernels says nothing about bugs nobody has found yet. A formal verifier is a guard too, and it gets tested too.

## Theory · mutate the statement

[04:39] → E08

Mutate the statement, never the proof. I made six one-symbol changes to the challenge file. This one, for example: adding f equals zero, which turns the forced problem into an unforced one. Another: changing nu greater than zero into nu greater than or equal to zero. All six were rejected with the same message: the challenge statement and the solution statement don't match. And here's the key part: a seventh case, a control that only changes a comment, was accepted. That control is the other half of the experiment. Without it you wouldn't know whether Comparator is exact or just rejects everything by default.

## Theory · rejected isn't false

[05:20] → E09

Now, rejected doesn't mean false. To understand what Comparator's answers mean, I took three theorems Mathlib already proves: infinitely many primes, Cauchy–Schwarz and dominated convergence. For each one I gave the correct statement, equivalent rewordings and deliberate mistakes. Comparator rejected all eight changes. All eight. Including four that were equivalent, like the n plus one less than or equal to p. Classifying each rejection took a second route in Lean: a proof of equivalence, a proof that it's weaker in one direction with a counterexample in the other, or a refutation. That gave four equivalent, one weaker and three false.

[06:00] → E10

But the second route has its own trap. Any two true statements are equivalent: if both are true, each implies the other. So an equivalence proof that uses the very theorem I'm testing proves nothing. That's what the guard is for: a Lean command that walks every transitive dependency of the proof. In the primes case it checked one thousand four hundred eighty-five constants and none of them was the theorem under test. And to know the guard isn't asleep, I deliberately fed it a cheating proof that depended on Nat dot exists infinite primes. It rejected it. A positive control and a negative control, again.

## Theory · receipts vs. hashes

[06:43] → E11

The fourth gap: the evidence. Every step leaves a receipt with its command, the hashes of its inputs and outputs, and its exit code. I tried two attacks on that, using real records. First, a receipt that names a log that doesn't exist. OpenAI's published procedure exits with zero and the same output, because it doesn't look at receipts. My P6 check, which looks at whether the log exists, flags it. Second attack: I replace the log with an authentic one, but from a different run, under the right name. P6 lets it through, because the file is there. Only comparing against the hash recorded when the step ran catches both cases.

[07:28] → E12

Two honest caveats. First: this is not a new technique. Tying every step to recorded hashes is standard practice in in-toto and SLSA for the software supply chain, and both faults I tested are the kind in-toto already detects. Second: the hash has its limit. It detects a change against a trusted value, but it doesn't authenticate where a log came from if someone can change both the file and the recorded hash. And the scope of the whole repo: it proves nothing new, claims no Millennium Prize result, and is not a mathematical review. It says: no defect was found within this scope. It doesn't say: certified.

## Lab

[08:11] → E13

Lab time. All you need is Python 3.9 or newer, no dependencies, and under a minute. I clone the repo and run python3 verificar dot py, with echo exit at the end to see the exit code. Six checks, all six OK: files intact, numerical runs identical between Mac and Linux, the 84 numerical variants run again, consistency between the README and the records, the Mathlib control receipts, and the receipt check. At the end, a fingerprint: C 5 F 0, F 1 A 8, 2 F 4 D, and exit zero. That fingerprint belongs to the commit I ran. Compare it with a classmate on the same commit: if they match, you both got exactly the same result.

[08:58] → E14

Now the same six, one at a time, because the point of this module is that you know what each one recomputes and what it only verifies by hash. The first one, shasum dash c, only verifies by hash that every curated file is the one that was published. The third, on the other hand, reruns the eighty-four numerical variants and compares them with what was saved: that's recomputing. The fifth checks the Mathlib control receipts and recomputes the classes, but it doesn't run Lean again. And the sixth recomputes the receipt checks on the published bundles. REPRODUCE dot md has a table with that distinction, and stating it precisely is part of an honest report.

[09:45] → E15

Step three: read a receipt. With head dash n one I pull the first line of the Mathlib controls receipt file. Look at what's in it. The exact command: lake env comparator with the PrimesOrig case configuration. The SHA-256 of the three inputs: the challenge, the solution and the config. The hash of standard output and the hash of standard error. The exit code, which is zero here. And the start and finish times. A fun detail: the stderr hash starts with e 3 b 0 c 4 4 2. That's the SHA-256 of an empty file. In other words, that step wrote nothing to stderr.

[10:27] → E16

Step four: a real mutant rejection. This is the swapped-quantifiers case: there exists a p such that for every n, n is less than p and p is prime. It's false, because you could just take n equal to p. The rejection is in Comparator's error log for PrimesSwap, and it says: the challenge statement and the solution statement don't match, primes infinite. One detail so you don't get lost: the module text tells you to look in the standard output log, but in the repo the message lives in the error log, stderr. Standard output ends on the line that exports the constants.

[11:09] → E17

Step five: recompute the eleven classes. I run verify dot py from the Mathlib controls. One row per case: Comparator's verdict, the second-route class, and OK if it matches what was pre-registered. Look at primes slash defeq: rejected, and the class is changed but equivalent. That's the n plus one less than or equal to p. Then, guard built, cheating proof rejected, and the signed-bound refutation. And the last sentence, which is the one that matters most: this checks the published records against their receipts; it does not rerun Lean. If your report says you rebuilt something because you ran this script, you'd be overclaiming.

[11:51] → E18

Step six, optional: rebuild it yourself. If you have a strong Linux machine and the time, follow the independent reproduction guide. It asks for about thirty gigs of disk and sixteen of memory; the repo's build took an hour and a quarter on twelve cores. The guide includes a bash function that saves each command's log and records the command's own exit code with its start and end time, not tee's. The report it asks for includes the source commit, the lean and lake versions, the binary hashes and a table of steps. And if your result comes out different, it gets published too: a disagreement is worth as much as an agreement.

## WAR mutation of the week

[12:36] → E19

This week's mutation: you prove to the evidence checker that it's awake, on a copy of the repo. Mutant one: I copy the original case's output log on top of the PrimesSwap mutant's log. It's an authentic log, but from a different run, under the right name: the case two attack. I run verify dot py and it falls over: AssertionError, stdout hash mismatch, PrimesSwap, and exit one. The guard yelled. And notice why: not because the file is missing, but because its hash isn't the one recorded when that step ran. If your own checker only looked at whether the file exists, this mutant would survive.

[13:19] → E20

Mutant two. I restore with git checkout dot, and now I change a single number: in PrimesSwap's Comparator receipt, the exit code goes from one to zero. That's like claiming the mutant was accepted when it was actually rejected. verify dot py exits with one. And the top-level checker flags FAIL on two checks: files intact, because the receipt no longer matches its published hash, and the Mathlib control receipts. The fingerprint changes. If either of these mutations had come back green, the evidence guard would be asleep, and that gets published too.

## The challenge and how it's graded

[13:56] → E21

The challenge has two tracks. Track A needs no Lean and it's required. For three steps of one of your own CI pipelines, you write a recibos dot jsonl in the same format you just saw: command, input hashes, stdout and stderr hashes, exit code, start and end. Then you write verificar recibos dot py, which exits with one if a log is missing, if a log doesn't match its hash, or if a receipt has no exit code. You test it on a clean copy and three seeded mutants: deleted log, stale log under the right name, and a receipt with no exit code. And you add the table of the eleven Mathlib cases, with one sentence on why each rejection doesn't prove the statement false.

[14:47] → E22

The criteria. verificar dot py gives six OKs and exit zero, and you note the fingerprint with the commit and the operating system. Your script exits with zero on the clean copy and with one on each of the three mutants, and all four runs have their own receipt. The stale log under the right name also exits with one: your check compares hashes, not just whether the file exists. The table matches verify dot py and explains the defeq case. And no sentence in your report says the theorem is false, or proven, based on a Comparator verdict. Level four is track B: four mutants of a Lean statement, classified by a second route, with print axioms free of sorry and one receipt per run.

## Mini-quiz

[15:37] → E23 · pausa 5 s

Mini-quiz. Pause if you like. First: Comparator rejected n plus one less than or equal to p instead of n less than p. What does it mean? A, that the new theorem is false. B, that the statement changed form, and telling whether it's equivalent, weaker or false takes a second route. C, that Comparator has a bug. D, that the original proof is wrong. It's B. Rejected means changed, not false.

[16:11] → E24 · pausa 5 s

Second: a receipt names a log that exists, but that log is from a different run. Which check catches it? A, P6, which checks that the log exists. B, rerunning the published procedure. C, comparing the log with the hash recorded at the moment the step ran. D, none. It's C. It's exactly the mutation you just ran.

[16:39] → E25 · pausa 5 s

Third: verify dot py prints PASS, eleven cases match the pre-registered classes. What did you just check? A, that Lean rebuilt the eleven cases on your machine. B, that the published records match their receipts and the recomputed classes are the pre-registered ones. C, that the eleven theorems are true. D, that Comparator has no bugs. B. The script says so itself.

## Wrap-up

[17:09] → E26

Three ideas to take with you. First: Lean checks that every step is valid; how it was built, whether the statement is the intended one, whether it matches Clay, and whether the evidence is real, that's QA, and you can do it without being a mathematician. Second: a Comparator rejection means the statement changed, not that it's false, and a control that should pass is what lets you trust the rejections. Third: a receipt only counts if it's bound to the hash recorded when the step ran; checking that the file exists isn't enough. In the next module we move to blind testing: how to prepare traps the tester doesn't know about, and seal them with a hash before handing anything over.

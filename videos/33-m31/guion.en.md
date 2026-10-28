# Script · 33 · m31 · Blind testing with a hash commitment

Voice-over: Cristian, first person · US English · ~150 words/min · 2433 narration words · estimated runtime 16:28 (quiz pauses included)

Each block has its own timestamp and the scene it plays over (→ E##). Scene ids match `escenas.json`; the English cut runs on its own clock, so the editor stretches or trims each scene to these times.

## Hook

[00:00] → E01

For four rounds I tested my physics debugger with traps I invented myself. I designed the trap, I wrote the check, and the check caught it. Sounds fine, but it has a ceiling: without meaning to, you design traps your own check already knows how to catch. Today I prepared twenty pairs for a miniature blind round. Eight correct ones, accepted. Eight traps, detected. And four traps slipped through. Now, how do you know I didn't tweak the labels after seeing the verdicts, to make the table look better or worse? That's what this module is about.

[00:39] → E02

The answer is a sealed envelope. Before handing anything over, whoever prepares the traps publishes the hash of their labels. Watch what happens if I later change a single label from trap to correct and try to reveal. The script answers: the hash doesn't match, and it exits with one. One word changed and the seal breaks. Today you'll learn to design a blind test that holds up to that: random ids, a secret ratio, salted labels, a hash committed before delivery, and the decision rule frozen before anything gets opened.

## Explained like you're 8

[01:15] → E03

If you were eight: before your friend checks the boxes, you write down on a piece of paper which ones have a trap and put it in a sealed envelope. Your friend checks box by box and says which ones they think are traps. At the end you open the envelope in front of everybody, and everyone sees you didn't change a thing. If you'd opened the envelope in secret to swap the paper, the seal would be broken. And there's one more detail: your friend also has to write down beforehand how they'll decide, so they can't change their rules once they've seen the boxes.

## Theory · the problem

[01:58] → E04

Let's start with the problem. If whoever builds the check knows the traps, they can tune the check to them without noticing. No bad faith required: your head already knows what to look for. That's why, in round 5 of predictor-debugger, someone else prepares the traps. The kit defines correct: the solver's exact output, in float64 or rounded to float32. And a trap is anything else, of any kind and size: too much or too little energy, a fluid that compresses, a phase shift, noise, a trained network. And one rule I really like: you're allowed to read the debugger's code and aim right below its thresholds.

## Theory · the hash commitment

[02:40] → E05

The tool is a hash commitment. Whoever prepares the traps runs shasum dash a 256 on their etiquetas dot json, the labels file, and sends only that hash, before handing anything else over. The hash is like the file's fingerprint: sixty-four characters that come from its exact contents. From the hash you can't rebuild the file, but the file always reproduces the hash. At the end, whoever prepared the traps reveals the file and anyone recomputes the hash. If it matches, the labels are the ones that were committed. If a single letter changed, the whole hash changes and it doesn't match. That's what you saw in the hook.

## Theory · the salt

[03:24] → E06

But a hash alone isn't enough. If the file's format is known and the options are few, someone can try possible labelings, hash each one, and compare it against the published hash until one matches. That's what the salt is for. etiquetas dot json carries a field called sal, Spanish for salt, with thirty-two random hexadecimal characters. With that, the space of possible files is so large that guessing stops working, and the hash commits without revealing anything. In the kit, the salt sits at the top of the file, and below it, for each pair: its label, correct or trap, a free-text type, and the magnitude.

## Theory · public timestamp and ids

[04:07] → E07

Two more details. The first is the timestamp. The hash goes up to the repo under round5 slash compromisos, one file per participant, and GitHub stamps the time before the pairs arrive. The original message with the hash serves as backup, and if you want, you also post it in an issue. The second: nothing should leak the label. At least one hundred pairs, each in its own file, with a random id from secrets dot token hex four, unrelated to the label or the order. The ratio of correct pairs to traps is free and secret. And the delivery comes with its list of hashes, pares dot sha256, so nobody can swap a pair later.

## Theory · the tester commits too

[04:53] → E08

And the commitment goes both ways. Whoever runs the debugger ties their hands too. Before opening the pairs, they pre-register and push, with a timestamp, their decision rule and frozen thresholds. Then they run and publish the verdicts. Only then do they get etiquetas dot json. Why? Because if I see the labels and then adjust a threshold, the test stops being blind even though the labels never changed. The order can be checked in git log: A's commitment, B's frozen rule, B's verdicts, and the reveal. That order is one of the challenge criteria.

## Theory · what gets reported

[05:31] → E09

What gets reported at the end? Three things. False alarms on the correct pairs, and the expected number is zero. Traps detected, by type and by size. And the ones it missed. The debugger has a detection floor measured in round 3, and the kit puts it bluntly: whatever falls below gets reported as not detected, not hidden. This matters, because the temptation is to drop the small traps and call them unfair. No. If they fit the definition of a trap, they count. And if you want a debugger with a lower floor, you design it in a new round, with new pre-registered thresholds.

## Theory · committing to a seed

[06:13] → E10

There's another way to do it: commit to a seed instead of the labels. In the blind-fault benchmark in scientific-qa-evidence, I generated the seed with openssl rand dash hex sixteen on my machine, outside the AI assistant's session, and published only its SHA-256. The seed decides which copies get which faults. Rule two: whoever runs the checks doesn't read the seed or the key until every result is recorded. And the repo admits something uncomfortable: the assistant had access to the disk, so that rule rests on the commitment; the published hash makes any change detectable. Rule four: if the seed is lost or edited, the experiment is void.

## Theory · blind isn't perfect

[06:57] → E11

And a warning worth its weight in gold: blind doesn't mean perfect. In that benchmark, the baseline flagged three out of twenty-one cases and the protocol fifteen out of twenty-one. It looked great. Then came four rounds of review, and they found seventeen problems in the experiment itself: a mislabeled fault, a cost that was never measured, an evaluator that accepted incomplete evidence. Version one was kept as it was, with errata; the evaluator was fixed in a version two, and the result is presented as a regression benchmark, not as a real-world detection rate. Even v1's zero false alarms got withdrawn.

## Lab

[07:38] → E12

Lab time. Step one: verify a real commitment. I clone scientific-qa-evidence, go into the blind-fault benchmark folder, and run shasum dash a 256 on the revealed seed. Out comes six a b nine f eight two five, and so on down to five d. Now I open SEED_COMMITMENT dot md, which was published before any fault was assigned, and compare. It's the same. The hash covers the seed exactly as it was generated: thirty-two hexadecimal characters and a newline. If anyone had edited the seed, even just to drop that newline, the hash would be different.

[08:16] → E13

Step two: reproduce the assignment from the revealed seed. This is the recipe in RESULTS dot md. I create a separate folder, copy just the two scripts, protocol lib and assign, and run assign dot py with the seed. It tells me the seed's hash is the committed one and that it generated twenty-one cases. Then I diff the key I just generated against the published key dot json, and the case folder against the published one. Out comes identical. That means the key and the twenty-one cases come byte for byte from that seed. Nobody could have changed the assignment afterwards without it showing.

[08:58] → E14

Step three: a miniature round 5, in the root of predictor-debugger. Person A uses preparar dot py, which comes with the module. It builds twenty pairs of five kinds: correct ones in float64, correct ones rounded to float32, and three traps: energy times one point zero five, energy times one point zero zero zero one, and noise at ten to the minus three. Look at three lines. The salt, from secrets dot token hex sixteen, which gives thirty-two characters. Each pair's id, from token hex four, random. And the magnitude: the norm of the difference from the exact state over the norm of the exact state, which is zero for the correct ones.

[09:43] → E15

I run preparar into a folder called ronda, round. It takes a few seconds. I hash etiquetas dot json and save it to compromiso dot txt: four e f six b eight nine four, and on it goes. In real life, A commits and publishes only that file, hands over the pairs folder, and etiquetas dot json stays on A's machine. Look at the pair names: zero b two b nine eight nine e, one two seven one eight f four zero. They tell you nothing. You can't tell from the name or the order which one is a trap. Twenty files, and the reviewer doesn't even know how many traps there are.

[10:28] → E16

Step four: person B reviews blind, using round 1's D1, D2 and D3 checks and the frozen thresholds in thresholds dot json. Before running, B commits the hash of their script and of the thresholds. That's B's commitment. Look at the thresholds hash: seven seven b f d c a zero. It's the same one round 1's RESULTS dot md publishes, so these are the usual thresholds, untouched. I run revisar on the pairs folder and save veredictos dot json, the verdicts. B commits the verdicts before receiving anything else. Note: this is round 1's debugger, not the round 5 one.

[11:09] → E17

Step five: the reveal. A hands over etiquetas dot json, and B runs revelar dot py. First it checks that the hash matches the commitment. It does, so it builds the table. The eight correct pairs, float64 and float32, correctly accepted: zero false alarms. The energy times one point zero five traps, detected, by D2 and D3. The noise, detected, and here's a nice detail: only D1 flagged it, because noise breaks incompressibility. And the four energy times one point zero zero zero one traps slipped through. Their magnitude is ten to the minus four, below the floor. They get reported as escaped. They don't get deleted.

## WAR mutation of the week

[11:52] → E18

This week's mutation attacks the commitment. After publishing the hash, I change a single label from trap to correct and run revelar. The hash doesn't match, exit one. I restore the file and now change only the salt, without touching any label. It fails too, with a different hash, exit one. Why does the second case matter? Because it shows the salt is part of what's committed: nobody can change it afterwards to play games with the hash. At the end I restore the file and check with shasum dash c: OK. If your reveal check passed in either case, the envelope was never sealed.

## The challenge and how it's graded

[12:34] → E19

The challenge is a blind test in pairs. You pick one of two options: the step three pairs, or twenty mutants of the war-paradigm golden flow, declared as data in tests slash scenarios dot ts. Person A prepares the traps with random ids and a secret ratio, writes etiquetas dot json with a salt, and publishes only the hash. Person B freezes their rule, runs, and publishes the verdicts. A reveals, B verifies with shasum and publishes the table of false alarms, detections and escapes, by type and magnitude. You hand everything in with its order visible in git log.

[13:14] → E20

The criteria. git log shows the order: A's commitment, B's frozen rule, the verdicts, and the reveal. The shasum of etiquetas dot json matches the committed hash. Your revelar exits with one on a file where you changed a single word, and you show it with its exit code. The ids are random and their order has nothing to do with the label. The final table has false alarms, detections and escapes by type, and no row was removed. And the report says what it doesn't prove: for example, that A and B know each other, or that the thresholds are round 1's. Level four: you deliberately include a trap designed to land just below a threshold, and report it as escaped if that's what happened.

## Mini-quiz

[14:04] → E21 · pausa 5 s

Mini-quiz. Pause if you like. First: why does etiquetas dot json carry a salt field of thirty-two random hexadecimal characters? A, to make the file bigger. B, so nobody can guess the labels by trying possible labelings until one matches the published hash. C, to sign the file. D, to sort the pairs. It's B. With a salt, the hash commits without revealing.

[14:34] → E22 · pausa 5 s

Second: the pair ids are zero zero zero one, zero zero zero two, and so on, and the traps come first. What's wrong? A, nothing. B, the order leaks the label; the kit asks for random ids unrelated to the label or the order. C, the ids are too short. D, there are zeros missing. B. If the reviewer can infer the label from the name, the test isn't blind anymore.

[15:08] → E23 · pausa 5 s

Third: an energy times one point zero zero zero one trap falls below the detection floor and the debugger doesn't flag it. What gets reported? A, it's dropped from the set for being too small. B, it's reported as not detected, with its type and magnitude. C, the thresholds get lowered and it's rerun. D, it counts as a hit. It's B, and you saw it in the table. Lowering the threshold after seeing the labels would break the blinding.

## Wrap-up

[15:45] → E24

Three ideas. First: seal before delivery. The salted hash of the labels, or of the seed, gets published with a timestamp before the reviewer sees anything. Second: the commitment goes both ways. The tester freezes their rule and thresholds before opening anything, because moving a threshold afterwards breaks the blinding too. Third: report what slips through, by type and magnitude, and say what your experiment doesn't prove. And remember that blind isn't perfect: it gets reviewed too, and mistakes stay visible with their errata. Next up is the capstone, the WAR Audit, where you put all of this together in a package someone else reproduces on a clean machine.

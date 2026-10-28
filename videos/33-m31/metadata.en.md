# Title

Blind testing: seal your traps with a hash

(42 characters)

# Description

Module 33 of my free QA Automation course. If whoever builds the check knows the traps, they can tune it to them without noticing. In rounds 1 to 4 of my physics debugger I invented both the traps and the detective; round 5 asks something else: does it catch traps I didn't design, without flagging correct predictions as bad?

For that answer to count, whoever prepares the traps commits to the SHA-256 of their labels before handing anything over: salted, with random ids and a secret ratio. The tester freezes their decision rule before opening anything. And at the reveal, anyone can check the hash.

In the lab I verify a real commitment (the seed of the blind-fault benchmark in scientific-qa-evidence), reproduce the assignment byte for byte, and run a miniature round 5 with 20 pairs. This week's mutation attacks the envelope: I change a single label, then only the salt.

Blind doesn't mean perfect: the blind benchmark I show had 17 problems found in review, and it's published with its errata.

Cristian Guerra · QA · Medellín

## Chapters

00:00 Hook
01:15 Explained like you're 8
01:58 Theory · the problem
02:40 Theory · the hash commitment
03:24 Theory · the salt
04:07 Theory · public timestamp and ids
04:53 Theory · the tester commits too
05:31 Theory · what gets reported
06:13 Theory · committing to a seed
06:57 Theory · blind isn't perfect
07:38 Lab
11:52 WAR mutation of the week
12:34 The challenge and how it's graded
14:04 Mini-quiz
15:45 Wrap-up

# Tags

blind testing, hash commitment, SHA-256, salt, pre-registration, scientific QA, physics debugger, seeded faults, mutation testing, WAR Paradigm

# Thumbnail text

Sealed envelope

# Links

- Course module: https://criguex.github.io/qa-automation-course/#/m31
- Round 5 kit: https://github.com/criguex/predictor-debugger/blob/main/round5/KIT.md
- Seed commitment: https://github.com/criguex/scientific-qa-evidence/blob/main/experiments/blind-faults/SEED_COMMITMENT.md
- Results and errata: https://github.com/criguex/scientific-qa-evidence/blob/main/experiments/blind-faults/RESULTS.md
- Commitment scheme (concept): https://en.wikipedia.org/wiki/Commitment_scheme
- Python hashlib: https://docs.python.org/3/library/hashlib.html

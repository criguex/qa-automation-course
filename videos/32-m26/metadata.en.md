# Title

Check a Lean proof without being a mathematician

(48 characters)

# Description

Module 32 of my free QA Automation course. I'm not a mathematician and I don't review OpenAI's math: I review their Lean proofs the way I'd review any important delivery. I rebuild them from source, re-check them with independent tools, try to make the verification fail on purpose, and log every step with its command, its hash and its exit code.

You'll see the four things Lean doesn't check, how a "clean" build quietly received 7 prebuilt dependencies, why Comparator rejected "n + 1 ≤ p" even though Lean treats it as the same as "n < p", and how a stale log under the right name passes an existence check and only a hash catches it.

Lab on my scientific-qa-evidence repo: verificar.py, a real receipt, a real mutant rejection and verify.py. Mutation of the week: sabotage the evidence and see whether the guard yells.

Scope: the repo proves nothing new, claims no Millennium Prize result and is not a mathematical review. It says "no defect found within this scope".

Cristian Guerra · QA · Medellín

## Chapters

00:00 Hook
01:19 Explained like you're 8
01:59 Theory · what Lean doesn't check
02:41 Theory · rebuild from source
03:20 Theory · independent checkers
04:39 Theory · mutate the statement
05:20 Theory · rejected isn't false
06:43 Theory · receipts vs. hashes
08:11 Lab
12:36 WAR mutation of the week
13:56 The challenge and how it's graded
15:37 Mini-quiz
17:09 Wrap-up

# Tags

Lean 4, formal verification, scientific QA, Comparator, nanoda, supply chain, build receipts, SHA-256, mutation testing, WAR Paradigm

# Thumbnail text

Rejected isn't false

# Links

- Course module: https://criguex.github.io/qa-automation-course/#/m26
- Lab repo: https://github.com/criguex/scientific-qa-evidence
- REPRODUCE.md (what's recomputed vs. verified by hash): https://github.com/criguex/scientific-qa-evidence/blob/main/REPRODUCE.md
- Mathlib controls: https://github.com/criguex/scientific-qa-evidence/blob/main/experiments/mathlib-controls/DESIGN.md
- Independent reproduction guide: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/INDEPENDENT_REPRODUCTION.md
- leanprover/comparator: https://github.com/leanprover/comparator
- nanoda: https://github.com/ammkrn/nanoda_lib
- Theorem Proving in Lean 4: https://lean-lang.org/theorem_proving_in_lean4/
- in-toto: https://in-toto.io/

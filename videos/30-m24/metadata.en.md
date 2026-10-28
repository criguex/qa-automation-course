# Metadata EN · m24

**Title:** Numerical mutation: controls, oracles, harness tests

**Thumbnail text:** 48 fake kills

## Description

I removed one guard from the runner and 48 mutants came back "killed" by an oracle that was returning NaN. In this module of my QA course I test the experiment before trusting it: a positive control, negative controls, a tolerance frozen at 10⁻⁶, an oracle that shares no solver, and tests for the harness itself. Using the numerical campaign in scientific-qa-evidence: 84 variants, 27 PASS, 54 KILLED and 3 SURVIVED on macOS and Linux.

Chapters:
00:00 48 killed mutants and a NaN oracle
00:56 Explained for an 8-year-old
01:40 Positive and negative controls
02:14 Test the harness
02:50 Finding 8
03:27 The frozen contract
04:48 How verdicts are assigned
05:37 The 84-variant campaign
06:49 Cases aren't behaviors
08:01 Lab: the harness tests
09:52 The whole campaign with a NaN oracle
10:53 WAR mutation: remove the oracle guard
13:49 The challenge and the rubric
14:56 Mini-quiz
15:27 Wrap-up

## Tags

QA, mutation testing, test oracle, negative controls, test harness, NaN, numerical tolerance, scientific-qa-evidence, numerical simulation, Python

## Links

- Course module: https://criguex.github.io/qa-automation-course/#/m24
- Lab: https://github.com/criguex/scientific-qa-evidence
- CONTRACT.md: https://github.com/criguex/scientific-qa-evidence/blob/main/evidence/numerical/source/CONTRACT.md
- FINDINGS.md: https://github.com/criguex/scientific-qa-evidence/blob/main/FINDINGS.md
- war-paradigm: https://github.com/criguex/war-paradigm

Cristian Guerra · QA · Medellín

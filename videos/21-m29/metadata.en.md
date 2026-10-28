# Metadata EN · 21-m29

## Title
Running mutants honestly: 5 states and a real kill rate

## Description
A mutant expected 403 and the server answered 500. Count that as KILLED and your kill rate is lying. In this video we walk the full cycle with war-paradigm and civica-playwright-challenge: mutants as data, baseline first, five states (KILLED, SURVIVED, INCONCLUSIVE, INVALID_BASELINE, INFRA_ERROR), a kill rate you can reproduce from the JSON, strict mode, a ledger that reorders the next run, and mutants that measure a security auditor. It also covers what civica's ledger didn't do (it lived in test-results/, which Playwright empties on start, so it remembered nothing) and how commit b240008 fixed it: forgetting after 5 runs, timeouts kept apart, a warning when it's corrupt, and CI carrying it over from main. Plus a cheat planted in the classifier to see if the harness catches it.

Module 21 of the QA Automation course (m29 · Running mutants).

Chapters
00:00 Expected 403, got 500
00:40 Explained like you're 8: the lights went out
01:24 The full cycle in six steps
02:08 Generate: mutants as data and civica's three classes
03:06 Careful with the word "equivalent"
03:43 Run in order: contract, reset, login, baseline
04:36 Classify into five states
05:44 Scoring, known survivors and strict mode
06:58 Evidence, and the oracle's limit
07:50 Lab: demo, strict mode and unit tests
08:56 Two mutants with predictions, and "Kill it yourself"
09:52 Civica's ledger that remembers and reorders
11:23 What that ledger didn't do, and the fix
13:05 Mutants that measure the auditor: 6/6 and one equivalent
14:39 WAR mutation: cheating on the classifier
15:33 The challenge and the rubric
17:13 Mini quiz
18:09 Wrap-up and next module

## Tags
mutation testing, kill rate, Playwright, TypeScript, API testing, reproducible evidence, ledger, test prioritization, war-paradigm, civica-playwright-challenge

## Thumbnail text
500 = KILLED?

## Links
- Course module: https://criguex.github.io/qa-automation-course/#/m29
- Lab: https://github.com/criguex/war-paradigm/tree/main/experiments/02-mutants
- The classifier: https://github.com/criguex/war-paradigm/blob/main/experiments/02-mutants/tests/scenario-evidence.ts
- civica-playwright-challenge: https://github.com/criguex/civica-playwright-challenge
- MUTATION-TESTING.md: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/MUTATION-TESTING.md
- Stryker — mutant states and metrics: https://stryker-mutator.io/docs/mutation-testing-elements/mutant-states-and-metrics/
- Petrović & Ivanković — State of Mutation Testing at Google: https://research.google/pubs/state-of-mutation-testing-at-google/
- Next module: https://criguex.github.io/qa-automation-course/#/m21

Cristian Guerra · QA · Medellín

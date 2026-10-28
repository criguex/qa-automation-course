# Metadata EN · 22-m21

## Title
Mutants that learn: ledger, priority and the auditor

## Description
I made a mutant fail on purpose, and the next run didn't put it first: Playwright empties test-results/ on start, and the ledger went with it. I found it while preparing this video, and it's fixed in civica-playwright-challenge (commit b240008): the ledger lives in ledger/, forgets after 5 runs, counts timeouts separately, warns when it's corrupt, and CI carries it over from the previous main run. We walk through the whole engine: three classes (equivalent, boundary, negative), a ledger that reorders without changing any verdict, security mutants that measure an auditor (6/6, 1 equivalent excluded), and a metamorphic relation that had to be corrected before anyone implemented it.

Module 22 of the QA Automation course (m21 · Mutants that learn).

Chapters
00:00 The loop that didn't remember
00:42 Explained like you're 8: the goalkeeper
01:36 From a snapshot to a movie: three classes and prioritize()
02:38 The ledger is a reporter
04:26 Reordering can't change a verdict
05:23 Mutants that measure the auditor
07:02 Metamorphic relations (the corrected roadmap)
08:36 Lab: runs 1, 2, 3 and the order
09:46 Lab: the auditor, 6/6 and one equivalent
10:50 Lab: X-Frame-Options plants nothing
12:35 WAR mutation: did the ledger remember?
14:01 The fix (b240008) and its evidence
15:39 The challenge and the rubric
17:11 Mini quiz
18:14 Wrap-up and next module

## Tags
mutation testing, ledger, test prioritization, Playwright, Playwright reporters, security audit, security headers, metamorphic testing, civica-playwright-challenge, QA automation

## Thumbnail text
The loop forgot

## Links
- Course module: https://criguex.github.io/qa-automation-course/#/m21
- Lab: https://github.com/criguex/civica-playwright-challenge
- MUTATION-TESTING.md: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/MUTATION-TESTING.md
- AUDIT-POC.md: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/AUDIT-POC.md
- Playwright — reporters: https://playwright.dev/docs/test-reporters
- Chen et al. — Metamorphic Testing (ACM CSUR 2018): https://doi.org/10.1145/3143561
- Next module: https://criguex.github.io/qa-automation-course/#/m18

Cristian Guerra · QA · Medellín

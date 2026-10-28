# Metadata EN · 23-m18

## Title
CI failure triage and test impact selection: zero escapes

## Description
A selector that skips 77% of the tests and lets 4 of 15 broken tests escape, versus one that skips 69.9% and lets none through. In this video we sort CI failures into five classes (regression, flaky, environment, test-data, unknown) with jev-ci-triage, and pick which tests to run with jev-test-impact: deterministic rules first, the Jev model only for the ambiguous cases, and the full suite whenever in doubt. Labs need no keys thanks to recorded answers, plus two WAR mutants to see which guard shouts.

Module 23 of the QA Automation course (m18 · CI failure triage and test impact selection).

Chapters
00:00 77% savings and 4 broken tests that slip through
00:39 Explained like you're 8: the mail carrier
01:31 Five failure classes
02:27 The rules, in order
03:38 Test-data, Jev and the 0.75 threshold
04:37 Confidence moves and the service goes down
06:17 Test impact selection with a fail-safe
07:26 Lab A: triage in replay mode
08:33 Predict the rule before you look
09:41 Lab B: the 20-commit benchmark
10:47 Why the unsafe policy loses 4 of 15
11:39 WAR mutation: two guards, two mutants
13:07 The challenge and the rubric
14:32 Mini quiz
15:16 Wrap-up and next module

## Tags
CI/CD, flaky tests, failure triage, test impact analysis, Playwright, GitHub Actions, fail-safe, LLMs in testing, jev-ci-triage, jev-test-impact

## Thumbnail text
Zero escapes

## Links
- Course module: https://criguex.github.io/qa-automation-course/#/m18
- Lab A: https://github.com/criguex/jev-ci-triage
- Sample report (live): https://criguex.github.io/jev-ci-triage/
- Lab B: https://github.com/criguex/jev-test-impact
- bench/RESULTS.md: https://github.com/criguex/jev-test-impact/blob/main/bench/RESULTS.md
- Luo et al. — An Empirical Analysis of Flaky Tests: https://doi.org/10.1145/2635868.2635920
- Google Testing Blog — Flaky Tests at Google: https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html
- Playwright — retries: https://playwright.dev/docs/test-retries
- Hammant — The Rise of Test Impact Analysis: https://martinfowler.com/articles/rise-test-impact-analysis.html
- Next module: https://criguex.github.io/qa-automation-course/#/m16

Cristian Guerra · QA · Medellín

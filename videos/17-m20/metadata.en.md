# Metadata EN · 17-m20

## Title
Determinism: record the answer, never approve blindly

## Description
A test that asks an AI changes when the model changes, not when your code does. In this module you learn to record and replay answers from third parties and AIs under one non-negotiable rule: the key is the hash of the request, and if the input changes, the test is left unverified, never green. Built on real code from playwright-jev (three-valued verdicts, hash-keyed fixtures, keyless CI), civica's deterministic mock, and the same idea in agent-eval-jev, jev-test-impact and jev-ci-triage.

Chapters:
00:00 An AI that changes its answer <!--E01-->
00:54 Explained like you're 8 <!--E03-->
01:54 Test doubles: civica's mock <!--E04-->
03:09 A skip with an honest reason <!--E05-->
03:50 Record/replay and JEV_MODE <!--E06-->
04:59 The key is a hash <!--E07-->
05:50 Inside a fixture <!--E08-->
06:34 The decisions in ADR 0002 <!--E09-->
07:45 Three-valued verdicts <!--E10-->
09:20 The same idea in other repos <!--E11-->
10:01 The lab in replay <!--E12-->
10:58 I change one word <!--E13-->
11:45 CI on recordings alone <!--E14-->
12:15 Write the decision in an ADR <!--E15-->
13:11 Lab <!--E16-->
14:04 WAR mutation: one word <!--E17-->
14:45 Challenge and criteria <!--E18-->
15:21 Mini-quiz <!--E19-->
15:56 Wrap-up <!--E20-->

## Tags
determinism, record replay, mocks, fixtures, SHA-256, Playwright, AI testing, flaky tests, ADR, QA automation

## Thumbnail
Unverified, never green

## Links
- Module in the course: https://criguex.github.io/qa-automation-course/#/m20
- playwright-jev: https://github.com/criguex/playwright-jev
- playwright-jev ADR 0002: https://github.com/criguex/playwright-jev/blob/main/docs/adr/0002-record-replay-per-question.md
- civica ADR 0002: https://github.com/criguex/civica-playwright-challenge/blob/main/docs/adr/0002-mock-fallback.md
- agent-eval-jev: https://github.com/criguex/agent-eval-jev
- jev-test-impact: https://github.com/criguex/jev-test-impact
- jev-ci-triage: https://github.com/criguex/jev-ci-triage

_The `<!--Exx-->` marks on the chapters are there to recompute timestamps; remove them when pasting the description._

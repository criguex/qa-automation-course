# Metadata EN · m22

**Title:** AI judges with probabilities: failures, flip rate, cascades

**Thumbnail text:** 0.78 isn't certainty

## Description

The same test came back at 0.69, 0.71, 0.78 and 0.84 against a 0.75 threshold. In this module of my QA course I decide what happens when an AI judge goes down (fail-closed, fail-open or fail-safe), measure whether its verdict changes across identical runs, and put a cheap judge in front of an expensive one, in shadow mode until it's measured. Using the public repos playwright-jev, jev-ci-triage, war-paradigm and laya-server.

Chapters:
00:00 Same input, four confidences
01:06 Explained for an 8-year-old
01:59 Three failure policies
02:56 The fail-closed ADR
03:41 Fail-open in CI triage
04:29 Fail-safe in test selection
05:12 Confidence is self-reported
06:00 Flip rate
06:40 Lab: war-paradigm 01, pinned and unpinned
08:25 Redact before you send
09:48 The laya-server cascade
11:33 Lab: the missing boundary cases
12:36 Shadow mode
13:16 WAR mutation: drop a pin
14:40 The challenge and the rubric
15:58 Mini-quiz
16:37 Wrap-up

## Tags

QA, LLM as a judge, flip rate, fail-closed, fail-open, model cascade, shadow mode, Jev, AI testing, war-paradigm

## Links

- Course module: https://criguex.github.io/qa-automation-course/#/m22
- war-paradigm 01: https://github.com/criguex/war-paradigm/tree/main/experiments/01-ai-verdict
- laya-server: https://github.com/criguex/laya-server
- ADR 0001: https://github.com/criguex/playwright-jev/blob/main/docs/adr/0001-three-valued-verdicts-fail-closed.md
- jev-ci-triage: https://github.com/criguex/jev-ci-triage

Cristian Guerra · QA · Medellín

# Metadata EN · m17

**Title:** Calibrating an AI judge: kappa, held-out and gray zone

**Thumbnail text:** Is your judge lying?

## Description

I switched off an AI agent's number check and 30 tests stayed green. In this module of my QA course I calibrate a judge against reference labels (AI-drafted, reviewed by me with no case-by-case log) with Cohen's kappa, tune on one split and report on another, and route borderline cases to a person. Everything runs offline from two public repos: qa-eval-lab and agent-eval-jev.

Chapters:
00:00 A disabled guard and 30 green tests
01:00 Explained for an 8-year-old
02:16 Cohen's kappa
04:04 Kappa by hand on an illustrative sample: 0.80 agreement, κ 0.58
05:06 A 60-case golden set and a 4-criterion rubric
06:41 Layered judging: code, Jev and an LLM judge
08:33 Calibration vs held-out
10:10 Confidence routes, it doesn't prove
11:09 CI as a contract
11:50 Lab: offline replay of agent-eval-jev
13:52 Raising the gate's bar
14:30 WAR mutation: switching off a guard
16:28 The challenge and the rubric
18:27 Mini-quiz
19:37 Wrap-up

## Tags

QA, agent evaluation, LLM as a judge, Cohen's kappa, judge calibration, held-out split, human review, agent-eval-jev, AI testing, Python

## Links

- Course module: https://criguex.github.io/qa-automation-course/#/m17
- Lab: https://github.com/criguex/agent-eval-jev
- Rubric: https://github.com/criguex/agent-eval-jev/blob/main/RUBRIC.md
- Calibration in qa-eval-lab: https://github.com/criguex/qa-eval-lab/tree/main/evals/calibration
- scikit-learn cohen_kappa_score: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html

Cristian Guerra · QA · Medellín

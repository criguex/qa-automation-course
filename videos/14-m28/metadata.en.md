# Metadata EN · 14-m28

## Title
Pipelines: what a green check really means

## Description
CI went red and not a single test failed, because no test even ran. In this module you read five real workflows from my public repos and learn what a green says (and what it doesn't), how to chain gates with needs, why a cache is not evidence, fail-open versus fail-closed, and why a check without a protected branch blocks nothing. At the end you break your own pipeline four times.

Chapters:
00:00 Red without a single failing test <!--E01-->
00:55 Explained like you're 8 <!--E03-->
01:55 Anatomy: on, jobs and steps <!--E04-->
02:44 The verify.yml matrix <!--E05-->
03:37 needs and job order <!--E06-->
04:41 Cache versus artifact <!--E07-->
05:50 Secrets and if conditions <!--E08-->
07:15 Gate = required check + protected branch <!--E10-->
08:22 What a green means <!--E11-->
09:10 Fail-closed, fail-open and fail-safe <!--E12-->
10:16 Order, impact-based selection and triage <!--E13-->
11:55 An evidence pipeline <!--E15-->
13:15 Lab <!--E16-->
14:34 WAR mutation: four breaks <!--E17-->
15:25 Challenge and rubric <!--E18-->
16:18 Mini-quiz <!--E19-->
17:13 Wrap-up <!--E20-->

## Tags
GitHub Actions, CI pipelines, quality gates, branch protection, needs, artifacts, fail-closed, flaky tests, reproducibility, QA automation

## Thumbnail
Does your green block?

## Links
- Module in the course: https://criguex.github.io/qa-automation-course/#/m28
- civica ci.yml: https://github.com/criguex/civica-playwright-challenge/blob/main/.github/workflows/ci.yml
- qa-eval-lab eval-gate.yml: https://github.com/criguex/qa-eval-lab/blob/main/.github/workflows/eval-gate.yml
- restful-booker tests.yml: https://github.com/criguex/restful-booker-quality-suite/blob/main/.github/workflows/tests.yml
- predictor-debugger verify.yml and reproduce.yml: https://github.com/criguex/predictor-debugger/tree/main/.github/workflows
- jev-test-impact: https://github.com/criguex/jev-test-impact
- jev-ci-triage: https://github.com/criguex/jev-ci-triage
- war-paradigm: https://github.com/criguex/war-paradigm

_The `<!--Exx-->` marks on the chapters are there to recompute timestamps; remove them when pasting the description._

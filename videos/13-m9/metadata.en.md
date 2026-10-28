# Metadata EN · 13-m9

## Title
CI/CD and Docker: a green check that blocks nothing

## Description
Five repos with green CI and not one protected main branch. In this module of my QA automation course you build a pipeline that runs your tests on every PR, inside the official Playwright image, with artifacts that upload even when the suite fails and honest notices when a secret is missing. Everything comes from real workflows in my public repos.

Chapters:
00:00 Five green CIs, zero protected branches <!--E01-->
01:04 Explained like you're 8 <!--E03-->
01:59 Anatomy of a CI for tests <!--E04-->
03:52 Quality gates: what runs on PR, main and nightly <!--E06-->
04:52 Matrix and sharding <!--E07-->
06:42 Flaky tests without cheating <!--E09-->
07:50 Containers and civica's Dockerfile <!--E10-->
09:58 The system under test in Docker <!--E13-->
10:49 Secrets and honest notices <!--E14-->
11:49 Reading a real run in Actions <!--E15-->
12:30 Lab <!--E16-->
13:45 WAR mutation: the broken PR <!--E17-->
14:35 Challenge and rubric <!--E18-->
15:14 Mini-quiz <!--E19-->
16:06 Wrap-up <!--E20-->

## Tags
CI/CD, GitHub Actions, Docker, Playwright, quality gates, flaky tests, npm ci, CI artifacts, branch protection, QA automation

## Thumbnail
Green that won't block

## Links
- Module in the course: https://criguex.github.io/qa-automation-course/#/m9
- civica-playwright-challenge (ci.yml and Dockerfile): https://github.com/criguex/civica-playwright-challenge
- qa-eval-lab (eval-gate.yml): https://github.com/criguex/qa-eval-lab
- restful-booker-quality-suite (tests.yml): https://github.com/criguex/restful-booker-quality-suite
- playwright-jev (matrix and concurrency): https://github.com/criguex/playwright-jev
- predictor-debugger (verify.yml): https://github.com/criguex/predictor-debugger
- war-paradigm: https://github.com/criguex/war-paradigm
- jev-ci-triage: https://github.com/criguex/jev-ci-triage

_The `<!--Exx-->` marks on the chapters are there to recompute timestamps; remove them when pasting the description._

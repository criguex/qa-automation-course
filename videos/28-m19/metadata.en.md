# Metadata EN · m19

**Title:** Preregistration in QA: thresholds first, then fingerprints

**Thumbnail text:** It failed. Published.

## Description

I wrote hypothesis H14 before any data existed. It missed by 0.065, and I published it without touching a thing. In this module of my QA course I preregister hypotheses, controls and thresholds in a commit, use a fingerprint to check the result repeats across four environments, and compute intervals with a cluster bootstrap. Everything runs on the public predictor-debugger repo with `uv run --locked`.

Chapters:
00:00 H14: the bet that missed by 0.065
01:00 Explained for an 8-year-old
01:47 Preregistration and amendments
02:47 You're testing the check
03:19 Positive and negative controls
04:04 Thresholds fixed in advance
04:37 Comparators that should fail
05:17 H14 by the numbers, and H17
06:34 The fingerprint
07:15 Lab: verify.py --saved mac
08:10 Four environments, four rounds
09:10 Several machines, two ledgers
10:01 Bit-identical isn't verdict-identical
10:39 Cluster bootstrap
11:54 WAR mutation: one byte in thresholds.json
13:24 The challenge and the rubric
15:11 Mini-quiz
15:58 Wrap-up

## Tags

QA, preregistration, reproducibility, SHA-256 fingerprint, cluster bootstrap, negative controls, uv, predictor-debugger, open science, mutation testing

## Links

- Course module: https://criguex.github.io/qa-automation-course/#/m19
- Lab: https://github.com/criguex/predictor-debugger
- DESIGN.md: https://github.com/criguex/predictor-debugger/blob/main/DESIGN.md
- uv: https://docs.astral.sh/uv/
- Nosek et al. 2018: https://doi.org/10.1073/pnas.1708274114
- Preregistration (COS): https://www.cos.io/initiatives/prereg

Cristian Guerra · QA · Medellín

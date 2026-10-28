# Metadata EN · 15-m27

## Title
Ephemeral containers: 81 arrays lost, fingerprint intact

## Description
A scientific recompute run by an AI assistant was running on an ephemeral executor. The executor vanished and took the 81 arrays from one run with it; the fingerprints and hashes stored elsewhere survived. In this module you see what you lose when a runner or container dies, and four designs that get your evidence out in time: artifacts with receipts, pinned inputs, idempotent checkpoints under flock, and verification on a clean runner. Built on the real receipts from predictor-debugger's repro-ia-20261026 release.

Chapters:
00:00 81 arrays lost with the executor <!--E01-->
00:57 Explained like you're 8 <!--E03-->
01:56 What counts as ephemeral <!--E04-->
02:33 A SUT that dies with the runner <!--E05-->
03:14 What's lost and what survives <!--E06-->
03:52 Design 1: artifacts and receipts <!--E07-->
04:46 Design 2: pinned inputs <!--E08-->
05:20 Design 3: checkpoints with flock <!--E09-->
06:14 Design 4: verify in a clean environment <!--E10-->
06:52 The real case: release repro-ia-20261026 <!--E11-->
08:22 Verify before you open <!--E12-->
08:55 What the receipts say <!--E13-->
10:57 Four lessons <!--E14-->
11:51 The cheap fingerprint <!--E15-->
12:26 Lab <!--E16-->
13:38 WAR mutation: kill and relaunch <!--E17-->
14:23 Challenge and rubric <!--E18-->
15:17 Mini-quiz <!--E19-->
16:04 Wrap-up <!--E20-->

## Tags
ephemeral containers, GitHub Actions, Docker, reproducibility, CI artifacts, SHA-256, flock, checkpoints, evidence, QA automation

## Thumbnail
The fingerprint survives

## Links
- Module in the course: https://criguex.github.io/qa-automation-course/#/m27
- Release repro-ia-20261026: https://github.com/criguex/predictor-debugger/releases/tag/repro-ia-20261026
- reproduce.yml: https://github.com/criguex/predictor-debugger/blob/main/.github/workflows/reproduce.yml
- predictor-debugger: https://github.com/criguex/predictor-debugger
- restful-booker-quality-suite (ephemeral SUT): https://github.com/criguex/restful-booker-quality-suite

_The `<!--Exx-->` marks on the chapters are there to recompute timestamps; remove them when pasting the description._

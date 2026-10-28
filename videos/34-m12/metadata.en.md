# Title

WAR Audit capstone: someone else must reproduce it

(50 characters)

# Description

Module 34 of my free QA Automation course: the capstone. You pick a system, pre-register what you're going to claim, break its guards on purpose, let an AI assistant execute under rules that live in code, and you sign. The real test isn't that it goes green for you: it's that someone else, on a clean machine and with nothing but your package, runs one command and gets the same fingerprint.

The three axes in one deliverable: AI-assisted QA (a PreToolUse hook and a log of what the assistant did), mutant execution (mutants as data, a recomputable kill rate, the survivor shown in red) and WAR Paradigm (every guard gets tested by breaking something on purpose). I open with a real finding from this week: a WAR mutation showed my hook let "git --no-pager push origin main" through.

Lab with war-paradigm, scientific-qa-evidence and predictor-debugger: mutants, the hook, reproduction inside a throwaway container, and the minimum package layout. At the end, the four-row integrated rubric.

Cristian Guerra · QA · Medellín

## Chapters

00:00 Hook
01:48 Explained like you're 8
02:26 Theory · the three axes
03:00 Theory · axis A: rules in code
03:46 Theory · axis A: the assistant's log
04:27 Theory · axis B: mutants as data
05:50 Theory · axis C: the evidence gets tested too
06:30 Theory · reproducible from clean
07:05 Theory · reproduced isn't third-party reproduced
07:40 Theory · the honest report
08:20 Lab
13:18 WAR mutation of the week
14:05 The challenge and how it's graded
15:42 Mini-quiz
17:24 Wrap-up

# Tags

QA capstone, WAR audit, mutation testing, Claude Code hooks, AI-assisted QA, reproducibility, fingerprint, build receipts, pre-registration, WAR Paradigm

# Thumbnail text

Same fingerprint, someone else

# Links

- Course module: https://criguex.github.io/qa-automation-course/#/m12
- How you're graded (integrated rubric, Spanish): https://criguex.github.io/qa-automation-course/evaluacion.html
- war-paradigm (mutants and hook): https://github.com/criguex/war-paradigm
- predictor-debugger (pre-registration, fingerprints, CI): https://github.com/criguex/predictor-debugger
- scientific-qa-evidence (receipts, AI log): https://github.com/criguex/scientific-qa-evidence
- CODEX_WORK_LOG.md: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/CODEX_WORK_LOG.md
- Independent reproduction template: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/INDEPENDENT_REPRODUCTION.md
- in-toto: https://in-toto.io/
- Reproducible Builds: https://reproducible-builds.org/

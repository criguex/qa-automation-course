# Metadata EN · m23

**Title:** QA with AI assistants: hooks, evidence, human sign-off

**Thumbnail text:** Main was open

## Description

My hook blocked pushes to main and had dozens of green tests, yet `git -c core.x=y push origin main` got through with exit 0. In this module of my QA course I use AI assistants to design, run and audit, and I put hard rules in hooks, not prompts. I also publish evidence as command, hash and exit code, and I declare what was never executed. Using war-paradigm (experiment 03) and scientific-qa-evidence.

Chapters:
00:00 A push to main that exited 0
01:03 Explained for an 8-year-old
01:51 Who does what: the assistant runs, the person signs
02:45 Rules in code, not in prompts
04:26 Lab A: the hook in action
05:17 The hook is a guard too
06:00 Reproducing the 1b01c66 hole
07:31 Context before prompts: the vault
08:31 Evidence: command, hash and exit code
09:18 Lab B: verificar.py and the fingerprint
10:15 The 19-session Codex log
11:24 What isn't independent, and your own mistakes
12:21 Breaking the evidence with one space
13:08 WAR mutation: your own attempts on the hook
15:22 The challenge and the rubric
16:52 Mini-quiz
17:55 Wrap-up

## Tags

QA, Claude Code, hooks, Codex, reproducible evidence, SHA-256, blind review, war-paradigm, scientific-qa-evidence, AI-assisted testing

## Links

- Course module: https://criguex.github.io/qa-automation-course/#/m23
- war-paradigm 03: https://github.com/criguex/war-paradigm/tree/main/experiments/03-second-brain
- scientific-qa-evidence: https://github.com/criguex/scientific-qa-evidence
- CODEX_WORK_LOG.md: https://github.com/criguex/scientific-qa-evidence/blob/main/docs/CODEX_WORK_LOG.md
- AUTHORSHIP.md: https://github.com/criguex/scientific-qa-evidence/blob/main/AUTHORSHIP.md
- FINDINGS.md: https://github.com/criguex/scientific-qa-evidence/blob/main/FINDINGS.md
- Claude Code hooks: https://code.claude.com/docs/en/hooks

Cristian Guerra · QA · Medellín

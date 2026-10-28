# Metadata EN · 19-m14

## Title
AI-assisted QA: the assistant tests, you sign off

## Description
A hook that blocked pushes to main let `git -c core.x=y push origin main` through with exit 0. A mutation caught it, and commit 1b01c66 in war-paradigm fixed it. In this video I show where non-negotiable rules have to live when you work with an assistant like Claude Code or Codex, how to attack your own hook, and what counts as evidence: a command, a hash and an exit code.

Module 19 of the QA Automation course (m14 · AI-assisted QA I). The lab needs no keys: war-paradigm, experiment 03.

Chapters
00:00 A push to main that slipped through
00:42 Explained like you're 8: a request vs. a fence
01:47 The assistant designs, runs, audits; you decide and sign
03:20 Rules in hooks and CI: exit 0, exit 2, and the exit 1 that doesn't block
04:50 The real hook from experiment 03
06:19 Versioned context: CLAUDE.md, AGENTS.md and the vault
07:48 Evidence = command + hash + exit code
09:09 Fail safe, and say who did the work
10:22 Lab: npm run demo:03
11:42 Lab: the 33-attack suite
13:24 WAR mutation: 9 attempts, 4 holes
15:43 The challenge and the rubric
17:12 Mini quiz
18:25 Wrap-up and next module

## Tags
QA automation, Claude Code, Codex, hooks, PreToolUse, GitHub Actions, branch protection, reproducible evidence, AI in testing, war-paradigm

## Thumbnail text
Does your hook hold?

## Links
- Course module: https://criguex.github.io/qa-automation-course/#/m14
- Lab: https://github.com/criguex/war-paradigm/tree/main/experiments/03-second-brain
- The fix commit: https://github.com/criguex/war-paradigm/commit/1b01c66
- agent-eval-jev (hash-keyed evidence, CI that rebuilds the report): https://github.com/criguex/agent-eval-jev
- jev-test-impact (fail safe to the full suite): https://github.com/criguex/jev-test-impact
- predictor-debugger (declared authorship): https://github.com/criguex/predictor-debugger
- Claude Code hooks docs: https://code.claude.com/docs/en/hooks
- Claude Code GitHub Actions: https://code.claude.com/docs/en/github-actions
- Codex CLI: https://github.com/openai/codex
- Next module: https://criguex.github.io/qa-automation-course/#/m15

Cristian Guerra · QA · Medellín

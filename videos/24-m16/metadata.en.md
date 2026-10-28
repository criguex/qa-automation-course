# Metadata EN · 24-m16

## Title
LLM as a judge: false greens, thresholds, CI that skips

## Description
"The capital of Colombia is Medellín": status 200, the field is there, the test is green, and the answer is false. In this video we evaluate AI with qa-eval-lab: two oracles (deterministic and judge), DeepEval (GEval, AnswerRelevancy, Faithfulness, ToolCorrectness), Promptfoo with assertions and red-teaming, false greens planted on purpose, a threshold set before you see the score, and a CI check that turns green without evaluating anything when the secret is missing. No-key lab (UI, the Cohen's kappa calibration script on an illustrative sample, and the agents module) plus the sleeping-judge mutation.

Module 24 of the QA Automation course (m16 · Evaluating AI with an LLM judge).

Chapters
00:00 Medellín, status 200 and a false green
00:41 Explained like you're 8: the teacher and the trap
01:31 Two oracles: deterministic and judge
02:17 The judge in DeepEval and its thresholds
03:38 The dataset's planted false greens
04:36 Testing the judge: the Medellín trap
05:33 Promptfoo: assertions and red-teaming
06:32 Set the threshold before you see the score
07:36 Without the secret, CI doesn't evaluate the LLM
08:33 No-key lab: UI and a calibration that is only an example
10:06 Module 3 with no API calls: a 0.67 that passes
11:11 With a key, and how to read the workflow
12:13 WAR mutation: put the judge to sleep
13:11 The challenge and the rubric
14:39 Mini quiz
15:41 Wrap-up and next module

## Tags
LLM as a judge, DeepEval, Promptfoo, AI evaluation, false greens, red teaming, GitHub Actions, Cohen's kappa, AI QA, qa-eval-lab

## Thumbnail text
Green, nobody judged

## Links
- Course module: https://criguex.github.io/qa-automation-course/#/m16
- Lab: https://github.com/criguex/qa-eval-lab
- eval-gate.yml: https://github.com/criguex/qa-eval-lab/blob/main/.github/workflows/eval-gate.yml
- DeepEval — getting started: https://deepeval.com/docs/getting-started
- DeepEval — LLM metrics (G-Eval): https://deepeval.com/docs/metrics-llm-evals
- Promptfoo — assertions: https://www.promptfoo.dev/docs/configuration/expected-outputs/
- Promptfoo — red-teaming: https://www.promptfoo.dev/docs/red-team/
- OWASP Top 10 for LLM applications: https://genai.owasp.org/llm-top-10/
- Husain — Your AI Product Needs Evals: https://hamel.dev/blog/posts/evals/
- Next module: https://criguex.github.io/qa-automation-course/#/m17

Cristian Guerra · QA · Medellín

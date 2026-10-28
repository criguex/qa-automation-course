# Script EN · Module 29 · m32 — Requirements QA

_Narration words: 2431 · estimated length 16:12 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it plays over.

## [00:00] → E01 · Hook

The spec said: weekly window, for example August twentieth to September twenty-seventh. That's thirty-eight days. On another page it announced fourteen competitors, the list had twelve, and the graph drew seven. And on the same screen, the cases escalated to a person were thirty-one on one card and two on another. If someone builds that as written, the dashboard is lying from the very first Monday, and nobody notices for weeks. Finding it took a calculator and an afternoon of reading. Before a single line of code, nineteen problems came out.

## [00:36] → E02 · Title

This is module twenty-nine: requirements QA. Reviewing the spec before anyone builds. We're working with spec-review-case-study, a public, anonymized case study. A product owner brought a specification for a weekly competitor-monitoring tool, and before building anything I reviewed it: I read every page, added up every number, and wrote down everything that didn't add up or was missing.

## [01:00] → E03 · Explained for an 8-year-old

Before you bake a cake, you read the whole recipe. If page one says three eggs and page two says two, or the oven temperature is blank, you stop and ask before you turn on the oven.

Because if you turn on the oven first, you'll use up the eggs, the flour, and an hour, and the cake comes out wrong. And the worst part is you won't know whether it was the recipe or you. Asking first costs a minute. Asking later costs the cake.

That's requirements QA: reading a program's recipe with a magnifying glass, adding up the numbers, and asking before anyone starts cooking.

## [01:42] → E04 · Theory 1: where the spec came from

Step one isn't hunting for errors. It's understanding where the document came from. In this case the specification looked like it had been put together from a screenshot of another company's demo. It had a header with that company's name, competitors who were real public figures, and one single week's numbers written down as if they were requirements.

That one observation changes everything. If the spec copies a demo, its numbers are examples, not requirements. And it explains a good chunk of findings one through ten. Every copied figure turns into a question for the owner.

## [02:21] → E05 · Theory 2: the six-step process

The README sums it up in six steps. One: read it once to understand the intent, and summarize the system in five lines. Two: recompute every number; add up the parts, turn counts into percentages of the same total, count the days in every window, and check the units. Three: challenge the facts, meaning turn costs back into tokens times price, and compare every latency target with how the system actually runs. Four: trace every definition to its source; every KPI needs a formula, every box a provider and a price, every field an origin. Five: rate the severity. And six: decide, with numbered questions and a phased plan.

## [03:04] → E06 · Theory 3: three families, nineteen findings

The nineteen findings fall into three families. Seven numbers that don't add up. Three costs or latencies presented as facts. And nine things nobody defined. Of the nineteen, four are blockers.

And there's an honesty detail the repo makes clear: the findings are identified, not closed. Eight have a concrete proposal and eleven are still open, as questions for the owner. The repo doesn't say how they were answered, because that isn't part of the case.

## [03:35] → E07 · Theory 4: numbers that don't add up

Let's look at a few. F06: the example weekly window lasts thirty-eight days; it was caught by counting the days. F05: fourteen competitors announced, twelve listed, adding up to one thousand five hundred seventeen signals out of two thousand seventy, and the graph draws seven. F04: the cases escalated to a person are thirty-one, two, and two on the same screen, and the brief promises three actions and shows two.

And my favorite, F02. The dashboard says eighty-five percent of signals are threats and sixty-seven percent are noise. If those classes are mutually exclusive, both can't be true: with sixty-seven percent noise, at most six hundred eighty-three signals are left that aren't noise, and it reports one thousand seven hundred fifty-three threats.

And F03 is one word with two values: noise is sixty-seven percent as a KPI and four percent as a label in the taxonomy. You don't find any of these by skimming. You find them by adding, dividing, and comparing every place the same number shows up. It's boring, and it's exactly the work nobody else is going to do before the team starts building.

## [04:50] → E08 · Theory 5: acceptance tests that test nothing

F10 is one I love teaching. The spec came with three acceptance tests: a weekly spend of zero point two zero eight seven dollars, plus or minus a cent; a noise meter reading sixty-seven percent; and a P50 latency between two hundred and two hundred fifty milliseconds.

What behavior does each one demonstrate? None. They copy someone else's week of data. With real data, those tests fail even when the system works, or pass even when it doesn't. It's a false green written in at design time. The proposal was to replace them with a test using ten fixed signals that checks the JSON output contract and the escalation rules. That actually demonstrates something.

## [05:35] → E09 · Theory 6: thresholds on uncalibrated probabilities

F13 ties back to an earlier module in the course, the one on calibrating judges. The spec said: escalate when two probabilities from the LLM classifier are both at or above zero point eight five. And one test expected the model to discriminate accurately.

The probabilities an LLM writes out are not calibrated. Without a labeled set, zero point eight five is arbitrary, and accuracy can't be measured. The proposal was a calibration phase: the owner labels about a hundred signals as useful or noise, and that's what you use to measure accuracy and tune the prompt and thresholds. It's exactly the same problem as an uncalibrated judge.

## [06:18] → E10 · Theory 7: severity is a judgment call

For rating I used three levels. Blocker: that part can't be built or tested until someone answers. High: if it's built as written, it shows a wrong number, does the wrong thing, costs more than promised, or carries legal risk. Medium: it's confusing or unexplained, but it doesn't stop the build.

And I'll say this plainly, the way the repo says it under its limits: severity levels are the reviewer's judgment, not a measurement. Someone else might rate F06 as High. What matters is that the scale is written down, so any disagreement is about the case and not about the words.

## [06:59] → E11 · Lab: the math, in code

Over to the terminal. All you need is Python three, no dependencies. Clone criguex slash spec-review-case-study and run python3 check_numbers dot py.

F01 comes out with an exclamation mark: four hundred twenty-two duplicates, all from the web, none from social, and nobody says why. F02 through F07 come out with an X: the contradictions we just covered, plus F07, where tokens processed counts only output, and input is ninety-eight point eight percent of the total. F08 gets an exclamation mark: the weekly spend matches the classifier's input alone, and output and brief costs are missing. Summary: six contradictions, two unexplained, zero OK. Exit one.

## [07:41] → E12 · Code: how it's built

Open the script. At the top there's a SPEC dictionary with every figure copied from the specification: social, web, unique, threats, noise, escalations, the per-competitor list, the window, tokens, and spend. And separately an ASSUMPTIONS dictionary with our own estimates, like a thousand input tokens per signal, which don't come from the spec.

Each check is one line that returns a mark. An X is a contradiction. An exclamation mark is a number that might be true but isn't explained. A check mark means it adds up. Take F06: it subtracts the two dates of the window and only marks OK if it comes out to seven days. And the script exits with one as long as any X or any exclamation mark remains.

## [08:30] → E13 · Terminal: the checker gets tested too

Now what separates a script from a tool: the checker has its own tests. python3 dash m unittest test_check_numbers: seven tests, OK. They cover zero spend, a spend way above cost, zero signals without a divide-by-zero, and a consistent set of figures that has to pass, which is the positive control.

With dash dash assumptions, the script lists its assumptions: that duplicates are raw minus unique, that noise is a share of the unique signals, that the thousand tokens per signal is our estimate, and that the weekly spend can never be fully verified, because the spec gives no price for output or for the brief.

And CI has two steps: run the checker's tests, and require the published spec to keep failing with exit one. If one day the script says that spec is fine, CI goes red.

## [09:26] → E14 · Browser: the checklist

The review left a reusable checklist: docs slash checklist dot md. Twenty-six items in seven blocks, zero through six: understand the intent, recompute every number, cross-check the same figure everywhere, trace each requirement to its source, compare requirements with reality, review the tests the spec ships with, and close the review.

Each item carries, in brackets, the finding that made it necessary. For example, "time windows match their names," tagged F06. The four items with no finding are the first one in block zero and the three in block six, the ones that close out the review. You paste this list into the ticket before anyone writes code.

## [10:09] → E15 · Theory 8: decide with phases and gates

The review didn't end in a build. It ended in a phased plan, each phase with its gate. P0, define: zero code, the owner answers seven questions, about their offer and their buyer, three to five real competitors, channels, the classifier, where the brief goes, where it runs, and the interface. The gate is having those answers in hand. P1, an MVP of one to two days, a script with no interface, gated by the ten-fixed-signals test. P2, calibrate, with the gate "accuracy measured, not assumed." P3, the interface, only if P2 proves value. And P4, scale to fourteen competitors or more.

## [10:50] → E16 · WAR mutation: the control mutant

Now we test the reviewer. First a control mutant, in a copy of the script: I change the window so it ends August twenty-seventh instead of September twenty-seventh. F06 flips to a check mark: seven days. The summary drops to five contradictions, two unexplained, one OK. The check reacts to exactly what it should.

## [11:12] → E17 · Terminal: the mutant the course says survives

The course has a second mutant, the dangerous one: raise the weekly spend to zero point four zero. According to the module text, F08 came out with a check mark even though a forty-cent spend is still unexplained, and that mutant survived.

I ran it today and it doesn't survive anymore. F08 comes out with an exclamation mark: above input cost, and the rest has no price in the spec, so it can't be checked. What happened? Commit nine seven d c seven nine one, from today, fixed exactly that blind spot and left a test with its own name: test spend far above input cost is not ok. The reviewer's finding got published, fixed, and pinned with a test so it can't come back. That's the full cycle.

## [12:03] → E18 · Terminal: hunting the next one

So I went looking for the next one. In the copy I change one single number: web_shown, the web signals that get displayed, from seven hundred thirty-six to one thousand one hundred fifty-eight. Now all four hundred twenty-two duplicates come from social and none from the web.

Result: F01 gets a check mark. But the message says "four hundred twenty-two duplicates, all of them web, zero percent of web, none social." The text contradicts itself, and the mark says it's fine. The dedup rule still isn't described, which was the original finding. The checker's seven tests: OK. None of them notice. That mutant survives, because the F01 check only flags one specific pattern, not the missing rule. The next step is the usual one: write the test that kills it and publish it as a reviewer finding.

## [12:58] → E19 · The challenge and how it's graded

Your challenge: review a real spec before anyone builds it. It can be a user story with acceptance criteria from your job, anonymized; the docs for a public API; or the preregistration from your previous module, because a preregistration is a spec too.

You deliver four things. A findings dot md with at least eight findings, each one with what it said, why it's a problem, how it was caught, severity, and a decision or question, plus the checklist line that covers it. Your own check_numbers dot py with at least four checks that recompute figures from that spec and exit with one if a contradiction remains. A corrected copy of the figures that makes the script exit zero, which is your positive control, and at least three mutants, each with a single seeded error in a different check. And numbered questions for the owner with a phased plan and its gates.

Here's how it's graded. The script exits one on the original figures and zero on the corrected copy. Each mutant makes it exit one; you report your kill rate, and if any mutant survives, you leave it in plain sight. Every finding has its five fields and points to the checklist. Every blocker is a question that can be answered in minutes. The first phase has zero code, and git log shows no product code before the review closed. And everything is anonymized. The top level is finding a mutant that survives your own script, publishing it with the figure that produces it, and adding the check that kills it.

## [14:43] → E20 · Mini-quiz

Three questions. Pause on each one.

One. The spec says "weekly window, for example August twentieth to September twenty-seventh." What do you do before building? Count the days in the example, which come to thirty-eight, and ask what a week means for this system.

Two. Three acceptance tests require a spend of zero point two zero eight seven, sixty-seven percent noise, and a P50 between two hundred and two hundred fifty milliseconds. What's the problem? They copy one week of demo numbers: with real data they fail even when the system works, or pass even when it doesn't.

Three. check_numbers dot py prints an exclamation mark for F01 and F08. What does that mean? A number that might be true but isn't explained. The script exits with one as long as any remain.

## [15:36] → E21 · Wrap-up

Three ideas. One: before hunting for errors, ask where the spec came from; if it copies a demo, its numbers are examples. Two: recompute every number in code, with its own test suite and a positive control, and test the reviewer with mutants, because mine had one blind spot that got closed today and another that's still open. Three: decide with numbered questions and gated phases, and the first phase has zero code.

Next module: controls, harnesses, and numerical mutation, with a frozen contract and an independent oracle. See you there.

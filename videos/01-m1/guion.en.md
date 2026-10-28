# Script · Module 01 · QA Mindset — from Dev to Tester

> Voice-over: Cristian Guerra, first person, natural English (adapted, not translated). Animated video, no camera.
> Pace: 150 words per minute. Timestamps were computed from that pace plus the quiz pauses.
> Module source: `qa-automation-course/i18n/es/modules-01-14.json` (m1) and `quiz-01-10.json` (m1). Lab: `war-paradigm/experiments/01-ai-verdict`.

## 1. Hook

[00:00] → E01
I asked an AI agent to write the test plan for one feature: approving and publishing a document. Its plan scored 76 out of 100. The passing gate was 70. I rejected it anyway. Two of its scenarios couldn't say where they came from, and one expected an editor to approve their own draft and get a 200. If all I looked at was the number, that plan would have shipped with a permissions hole inside it. The thing that rejected it has a name in testing: the oracle. Learning to name your oracle is the first step from writing tests to deciding quality.

[00:35] → E02
I'm Cristian Guerra, I work in QA out of Medellín, and this is module one of the automation course: the QA mindset, from dev to tester.

## 1b. Context: this module's lab

[00:45] → E03
Before we go on, some context, because this whole module revolves around a real lab you can clone. It has four pieces. First, a documents app with four roles: the viewer only reads, the editor writes drafts, the approver approves them and the admin can do everything. Second, a user story, US-42: approve and publish a document, with six rules, R-1 to R-6. Third, an AI agent that reads that story and writes the test plan: a list of scenarios, S-1, S-2, S-3, each with the response it expects from the API. And fourth, a scorer: code that grades that plan.

Those responses are HTTP status codes, and you'll hear four of them throughout the video. 200 or 201: the role was allowed and the action worked. 403: that role is not allowed. 409: you tried to publish a document nobody approved. And 422: the draft is malformed, for example a two-letter title or no owner.

I gave the agent the same request three times, and it wrote three different plans. The question of this module is: how do you decide whether that plan is any good? By the end you'll know three things: what an oracle is, how to turn "looks good to me" into criteria you can measure, and why the final signature is yours.

## 2. Explained like you're 8

[00:45] → E04
Picture a teacher grading homework. A sheet comes in, filled from top to bottom, neat handwriting, not a single blank. Does that mean the homework is right? No. The teacher pulls out the answer key and checks one question at a time. If question three says fourteen and the key says twelve, it's wrong, no matter how pretty the handwriting is.

Testing software works the same way. A program that runs without crashing is the filled-in sheet. Whether what it produced is actually right is a different question, and to answer it you need the answer key. In testing, that key is called the oracle: whatever decides if a test passes. Every time you write a test in this course, I'm going to ask you the same thing. Show me your answer key.

## 3. Theory

[01:38] → E05
Let me start with the thesis behind my whole method, because everything else hangs off it: move your time from typing to deciding. Your value as a QA isn't writing tests. It's deciding what to test, at what risk, and whether the result meets the contract.

I organize that work into four verbs, and I give AI a different level of autonomy on each one. Create: designing cases and writing test code. High autonomy, AI helps a lot here. Execute: running the suite, collecting evidence. Also high. Validate: checking whether the output is actually good. Medium, because now you need judgment. And certify, saying "this ships": a human signs that. Always. AI makes people who know what they're doing faster, and it confuses people who don't. If you come from development you already have an edge: you can read code and you know how it breaks. What I'm adding on top is quality judgment.

[02:40] → E06
Now, the oracle, properly. When you look at a result, you're really asking two different questions, and mixing them up causes half the arguments on a team.

Question one: does it run as specified? That one's binary. Pass or fail. The schema is complete or it isn't. The role is valid or it isn't. The status code matches the contract or it doesn't.

Question two: is what it produced any good? That one isn't binary. You score it against criteria the team agreed on beforehand.

In this module's lab, experiment 01 in war-paradigm, both questions are written down as code. Question one lives in `src/checks.ts`. Question two lives in `src/criteria.ts` and `src/scorer.ts`, with eight acceptance criteria. Three are `must`, five are `should`. The three musts: every scenario cites its source in the story, every mandatory requirement is covered, and no scenario expects success from a forbidden role. The five shoulds carry weights: a 403 negative scenario for each protected action is worth 30, the story's boundary cases 28, following the team template 20, listing risks and assumptions 12, and no duplicate scenarios 10. That adds up to a hundred. Shoulds add points. Musts don't add anything: they block. If a must fails, the verdict is rejected, whatever the score. And if every must passes but the score lands under 70, the gate, it's also rejected. That's exactly the rule that rejected the 76 you saw at the start.

[04:15] → E08
Third block: principles. The ISTQB Foundation syllabus lists seven. Here are the five you'll feel most often.

One: exhaustive testing is impossible. A ten-character field already has more combinations than you have time in a sprint. Prioritizing isn't an excuse. It is the job.

Two: early testing saves money. A defect you catch in the spec costs a conversation. The same defect in production costs a hotfix, support time and reputation.

Three: defects cluster. If eighty percent of your past bugs live in three modules, that's where the extra effort goes.

Four: the pesticide paradox. Run the same tests for months and they stop finding new things. You review them, and you vary data and scenarios.

Five: the absence-of-errors fallacy. An app with zero reported bugs that doesn't solve the user's problem is still a failure.

Two pairs come out of this. Verification asks "are we building the product right?", does it match the spec. Validation asks "are we building the right product?", does it serve the person using it. And QA versus QC. QC evaluates the product to find the defect. QA improves the process so the defect never gets born. The modern role does both.

[05:34] → E09
Fourth block: risk. Risk is probability times impact. You've got one free afternoon. What do you test first: the payment flow ninety percent of customers use, or a misaligned tooltip in the admin panel? Payments. Every time. The tooltip can wait.

That has a practical consequence: your test strategy fits on one page. Risks with probability and impact, scope, test levels, what gets automated and, just as important, what doesn't. Because manual versus automated isn't a rivalry. Automation buys you speed, regression and scale, but it isn't magic. It costs maintenance, and you pay that back with repetition. A usability review you'll run exactly once doesn't get automated. You explore it.

Here's what that looks like with the lab's story, US-42: approve and publish a document. This is an example of the shape, not a measurement. Risk one: a role that shouldn't approve manages to approve. High impact, because it breaks control of the flow, and I don't know the probability until I test it, so I treat it as high. Risk two: something gets published without approval; the story says that must return 409. Risk three: the title, which the story says must be between 3 and 80 characters. Lower impact, but that's exactly where off-by-one bugs live. With those three you know where your afternoon starts, and what you're leaving for later.

And this is where shift-left comes in: moving quality to the left of the cycle, toward requirements and design, where defects are cheap. The SDLC is the software development life cycle; the STLC is the testing life cycle inside it. Shift-left is the decision that the STLC starts the same day the user story does.

[07:26] → E11
Last theory block: exploratory testing and the new role. Exploratory testing isn't random clicking. It's a session with a mission, a timebox and notes. The mission is called a charter: what I'll explore, with what focus, and for how long. At the end you have notes: what you found and which questions are still open. The charter is what makes a session auditable.

A charter for the same story could be: explore draft approval with all four roles, for sixty minutes, looking for any response that doesn't match the permission matrix. Notice it has a focus, a timebox and an oracle: the matrix. Without an oracle, exploring turns into wandering. And you take notes while you explore, not at the end, because by the end you've forgotten what you did right before the weird behavior showed up.

The role this course is aiming at has a name: Quality Engineering, or what job posts now call an "AI QA Engineer". You move up a level. You stop being the person who runs cases and become the person who designs the oracles, decides the risk and signs the certification.

## 4. Lab

[08:40] → E12
Over to the terminal. The lab is experiment 01 in my war-paradigm repo. Clone, install, run.

`git clone https://github.com/criguex/war-paradigm.git && cd war-paradigm`. Then `npm ci`, which installs exactly what the lockfile says, and `npx playwright install --with-deps chromium`. You need Node 20 or later. No API key: the agent's runs are recorded as fixtures, so the result is reproducible.

`npm run test:01` runs the experiment's tests. On my run, 27 pass and one is skipped. The skipped one is the live-agent check, which only switches on if you plug in a real agent through an environment variable.

[09:19] → E13
Now `npm run demo:01`. This prints a scorecard for every run. First the pinned set: a versioned model, temperature zero, and a prompt tagged `test-plan@v3`. Look at the three runs: 86, 84 and 87. The scores wobble a little, because the agent's output changes, but all three are approved. Verdict: STABLE, three out of three agree.

Look at the detail on each line. AC-5, for example, comes back partial: two of four boundaries covered, B-2 and B-3 missing. Every criterion carries its own evidence, computed by code. Nobody asks a model what it thinks of itself.

[09:57] → E14
Scroll down to the unpinned set. Temperature one, prompt `latest`, no model version. The program warns you three times before it scores anything. Run one: 83, approved. Run two: 74, approved. Run three: 76, rejected.

There's the hook from the start. AC-1 fails because S-4 has an empty source and S-6 claims its source is "chat". AC-3 fails because S-3 expects an editor to approve and get a 200, when the permission matrix says that's forbidden and must return 403. Two musts down. The score clears the gate and the verdict is still rejected. And because the same input gave approved, approved, rejected, the set's verdict is UNSTABLE. That's a finding about how the judge is configured, not about the user story.

[10:46] → E15
The other half of the lab isn't code. It's your strategy and your exploratory session. To give you a sense of size, open the `Test strategy` note from experiment 03's vault in the browser. It's a table of layers, with the tool and what each layer proves, plus five principles. It fits on one screen. And in the `04 Sessions` folder there's a real session note: goal, what happened, decisions, next steps. That's the shape I want for your exploratory notes.

That session note, by the way, records a round of mutants against the demo app: six mutants, five caught, one survived. The survivor is a real authorization bug, and we'll take it apart in the next module. Since then the scoreboard reads five of seven: while preparing this course I found a second hole in the same app, a viewer who can create drafts, and it's now the `viewer-create` mutant. What I want you to notice today is the structure: anyone who reads it tomorrow knows what was done, what was decided and what's left. Your sixty-minute session should end up looking like that.

## 5. This week's WAR mutation

[12:00] → E16
And now the question that runs through the whole course: how do you know your oracle would catch a problem? If you've never seen it fail, you don't.

So I break it on purpose. One thing only. In `fixtures/runs/pinned/run-1.json` I wipe the source of scenario S-1: where it said `US-42/R-1`, now it's an empty string. Before running anything, I write down my prediction: AC-1 should fail, run one should flip to rejected, and the score shouldn't move, because AC-1 is a must and doesn't add points.

[12:34] → E17
I run `npm run demo:pinned -w experiments/01-ai-verdict`. AC-1: failed. "S-1 has no valid source". Score 86, same as before. Verdict: REJECTED, must failed: AC-1. And the whole set goes from STABLE to UNSTABLE. Prediction confirmed: KILLED.

The experiment's own tests notice too. With that change, `npm run test:01` gives six failed and twenty-one passed. I put the file back, run it again, and all 27 come back green. That's the habit I'm asking for, starting today: watch your guard fail before you trust it. Test the tester, mutate reality.

## 6. The challenge and how it's graded

[13:10] → E18
Your challenge has two parts. Part one: pick a public app or API and write a one-page mini test strategy. Risks, scope, levels, what you automate and what you don't. Part two: run a sixty-minute exploratory session with a charter and notes.

The criteria are checkable. One: the strategy fits on one page and names at least three risks with probability times impact. Two: every planned test states its oracle, what decides whether it passes. Three: the exploratory notes have a charter, a duration and at least one finding or one open question. The deliverable is a "Test strategy v0" document plus your notes, in your repo.

The rubric has four levels. Level one: the deliverable is missing. Level two: it's there, but a criterion fails. Level three, pass: it meets all three. Level four: on top of that, you write three must criteria and three weighted should criteria for a story of your own, plus a scorer that computes the evidence in code, like experiment 01. To pass the module you need the challenge at level three and the quiz: eight random questions from a bank of ten, at least six right.

## 7. Mini-quiz

[14:27] → E19
Three questions from the bank. Pause the video if you want to think.

One. Your suite runs twelve hundred tests and it's all green. What can you say for certain? A: the software is fine. B: your tests, as written, didn't find anything. C: you can certify every story in the sprint. D: residual risk is zero.
[pausa 5 s]
It's B. All green talks about your tests, not about the software. Certifying also needs evidence and traceability.

[15:02] → E20
Two. Risk is probability times impact. You've got one afternoon. What do you test first? A: the payment flow ninety percent of customers use. B: a misaligned tooltip in the admin panel. C: a settings screen used once a year. D: the alphabetical order of a list.
[pausa 5 s]
A. The biggest probability-times-impact goes first. Everything else waits.

[15:30] → E21
Three. The app has had zero reported bugs in three months, but users are leaving because it doesn't solve their problem. Which principle applies? A: the pesticide paradox. B: defect clustering. C: the absence-of-errors fallacy. D: early testing.
[pausa 5 s]
C. No errors doesn't guarantee value. That's why validation exists.

## 8. Wrap-up

[15:54] → E22
Three ideas to keep. One: your value is deciding what to test, at what risk, and whether it meets the contract. Two: every test has an oracle, and you keep "does it run as specified?" apart from "is what it produced good?". Musts block, shoulds add. Three: if you've never seen your guard fail, you don't know whether it's awake.

In the next module that third idea becomes a method: WAR Paradigm, testing the tester and mutating reality. Links to the module and the repo are in the description.

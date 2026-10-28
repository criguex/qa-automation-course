# Script · 35 · m13 · Your QA+AI career: positioning

Voice-over: Cristian, first person · US English · ~150 words/min · 2465 narration words · estimated runtime 16:41 (quiz pauses included)

Each block has its own timestamp and the scene it plays over (→ E##). Scene ids match `escenas.json`; the English cut runs on its own clock, so the editor stretches or trims each scene to these times.

## Hook

[00:00] → E01

Let me show you two ways to report the same bug. An API returns XML, but its header says it's HTML. My contract test catches it. Option one: I write to the team, my contract test is failing, can you change the service so it passes? Option two: I send them the curl command anyone can run, the response with the wrong header, and one line on who gets hurt: the strict SDKs, gateways and validators that pick their parser from that header. The first one makes the problem sound like mine. The second one puts the problem with the consumer, which is where it actually lives.

[00:43] → E02

And two ways to say who you are. One: I know Playwright and Selenium, and I learn fast. The other: I design quality strategy and supervise AI-generated tests, and this repo proves it; here's the number and here's the command that produces it. Plenty of people have the tools and the certificates. What sets one profile apart from another is judgment, supervising AI, and proof someone can open and run. This is the last module of the course, and that's what it's for: positioning yourself with evidence. A number without a command is just an adjective.

## Explained like you're 8

[01:21] → E03

If you were eight: telling people what you can do is like showing your best drawing. You don't say I draw well. You show it. And if someone asks how you did it, you show them the colors you used and the steps, so they can do it too. Your career works the same way. Saying I'm a good QA convinces nobody. Showing a project, with a number and the command that produces it, does. And if someone else runs that command and gets the same result, it's not your word anymore: it's evidence.

## Theory · the role moves up a level

[01:59] → E04

The theory starts with the profile. The path has gone from manual QA to Quality Engineering, and now to something a lot of people are calling AI QA Engineer. The title matters less than the change in altitude: you go from writing tests to designing the strategy and supervising tests an AI generates. An AI can write a lot of tests quickly. What it can't do for you is decide which risks matter, what won't get automated and why, and whether a green result actually means anything. That decision is your job. And it's exactly what you practiced in the last few modules: testing the tester.

## Theory · agentic testing

[02:41] → E05

Second: agentic testing. Assistants like Claude Code or Codex already design, run and audit tests. And MCP, the Model Context Protocol, is an open protocol for plugging them into your tools: your browser, your tracker, your data. That changes the speed a lot, but it doesn't change who's accountable. The signature stays human. You saw it in the capstone: the assistant executes, a hook in the code sets limits that don't depend on a prompt, every step leaves a receipt, and you review the diff and sign. If an interviewer asks how you use AI, that's the answer that shows judgment.

## Theory · communicating findings

[03:22] → E06

Third: how to communicate a finding. There's a line in the module that I find really useful: automation is the detector, not the reason; the beneficiary is the consumer. When you talk to a stakeholder, they don't care about your framework, your coverage, or the fact that your test is red. They care about the risk and the impact for whoever uses the service. Your suite is just how you spotted it. So always translate: don't say my test is failing; say what happens to the customer, the payment, the booking, the report. And never point at the person who introduced the bug. Point at the consumer who's affected.

## Theory · escalating a contract mismatch

[04:05] → E07

Fourth: escalating a contract mismatch. It happens when what the service delivers doesn't match what the contract promises. The report has three parts. Evidence: the curl command and the response, exactly as they came out, so anyone can reproduce it without your suite. Impact: who consumes that service and what happens to them. And resolution options: fix the service, update the contract if the behavior is intentional, or clarify with the contract's owner. What you never say is change the service so my test passes. That puts your test at the center, and the test is never the center.

## Theory · your numbers with their command

[04:45] → E08

Fifth: your numbers. The module asks for three kinds of number that set you apart. Your suite's kill rate: how many mutants it kills. Your judge's agreement with reference labels, if you evaluate AI: how closely it matches them, with what interval, and who wrote them. And reproducible fingerprints: a short code someone else gets exactly the same on their machine. All three have something in common: they come from a command. Not from an adjective, not from memory, not from a screenshot without the command that made it. If you say a number in your pitch, someone has to be able to open your repo and get it.

## Theory · portfolio and interviews

[05:28] → E09

And two things from the question bank you can use as is. The portfolio that opens the most doors isn't a list of certifications or fifty exercise repos: it's two or three repos with READMEs that explain decisions, why this layer, why this trade-off, with the green pipeline in plain sight. The technical interviewer opens the repo; if the README shows judgment, you've passed the first filter. And when they ask for the hardest bug you've found, tell the whole story: the context, how you detected it with evidence, the cause, the business impact, and what you changed so it doesn't come back. In two minutes you show the full cycle.

[06:13] → E10

More interview questions. If they ask whether you aim for one hundred percent coverage, don't say yes: line coverage isn't the goal; you prioritize risk coverage and can show how you decide it. If you're torn between a QA Automation offer and an SDET one, don't decide by the title: ask who designs the strategy, whether you build framework or just write cases, and whether tests get code review. In your first ninety days, learn the context before proposing big changes; suites that look bad usually have reasons. And to stay current: practice, community like Test Automation University and Ministry of Testing, and small projects with agents and MCP.

[06:56] → E11

One more from the bank, which looks minor and isn't: your headline. QA Engineer, on its own, says nothing. QA Automation, open to work, doesn't either. The one that works for you while you sleep combines two things: a concrete specialty and a proof. For example: QA Automation or SDET, contract testing and AI-augmented QA, and the name of your project. Recruiters search by keywords, and technical people click through to the repo. With specialty and evidence in plain sight, you get past both filters. And notice the headline points to the same place as your pitch: the project that proves it.

## Lab

[07:37] → E12

Lab time. First task: your two-minute pitch. I'd suggest four blocks. Who you are, in one sentence. What you do differently. The proof: a repo, a number and the command that produces it. And what you're looking for. Here's an example with my repos: I do QA and I test what AI builds. What I do differently is test the guards: I break something on purpose and check whether my tests notice. For instance, in war-paradigm my suite kills five out of seven mutants, and the two that survive are real authorization bugs I keep visible, one of them found while preparing this course; you can see it with npm run demo two. That takes under a minute. The rest is your story.

[08:26] → E13

Now fill in the cards with numbers that come from a command. Kill rate: in war-paradigm, demo two closes with five out of seven scored mutants killed. Judge agreement: in agent-eval-jev I ran python dash m agenteval evaluate today, and the composite verdict agrees with the reference labels on ninety-three point one percent of twenty-nine held-out cases. An AI drafted those labels and I reviewed them, with no case-by-case log, so the number measures the evaluator against AI-drafted labels, not against independent human judgment, and I say so next to the number; the gate confirms it and also shows that the agent's old version, at eighteen percent, would get blocked. The kappa for that same result is zero point eight six, and the interval is the Wilson one from the statistics module. Fingerprint: predictor-debugger prints E E C 9, zero 9 E 0, F 7 7 D. Three numbers, three commands. Yours will be different; the rule is the same.

[09:30] → E14

Second task: a contract-mismatch report. I'll use a real case from my restful-booker-quality-suite repo, defect RB-001. The client asks for XML and gets XML, but the response says it's HTML. The evidence is two commands. First I grab a booking id. Then I request that booking with Accept application xml and curl dash s i, which shows the headers. What I observed: Content-Type text html, followed by an XML body. Notice you don't need my suite to see it. Anyone on the service team can run it in their terminal and see the same thing. That's what makes the evidence hard to argue with.

[10:12] → E15

Here's the report for the stakeholder. A clear title: the XML response declares the wrong media type. Medium severity, priority P1. Expected and actual, side by side. The evidence, with the exact command. The impact, in the consumer's terms: strict SDKs, gateways and schema validators can reject the body or parse it wrong, because they use that header to choose the parser. And the options: fix the header or, if it's intentional, document it in the contract. Notice what's missing: my framework, my red test, the name of whoever wrote the endpoint. What's there is the consumer.

[10:51] → E16

One detail of judgment I like in that document. Before listing any defects, it defines what counts as one: something that violates the documented contract, HTTP semantics, content negotiation, input safety, or round-trip data integrity. And it makes clear that a surprising response is not automatically a defect. For example, the ping endpoint returning 201, or unsupported media types returning 418, stay as clarification points, because they may be intentional. That distinction is part of how you position yourself too: you don't report everything that surprises you; you report what breaks a promise.

[11:28] → E17

And before closing the lab, rehearse the hardest-bug story with a real case, RB-002 from the same repo. Context: you create a booking in XML saying the deposit hasn't been paid. Detection: a check compares what you sent with what the service stored, and the service stored deposit paid: yes. Likely cause: the string false converted with JavaScript's Boolean function; and the document says exactly what it is, an evidence-based hypothesis, not proof from the source code. Impact: a booking can be treated as paid with no deposit. Prevention: the bug stays as an expected failure; the day they fix it, the check turns red to flag that it's time to take it off the list.

[12:14] → E18

One last piece, the level four one: the README of your portfolio repo. Look at two of mine. In predictor-debugger, the limits section states the scope, that the three machines are mine and so it isn't an independent reproduction, and that I wrote and ran it with help from AI assistants, under my direction. That doesn't take anything away: it tells the reader exactly how much to believe. In agent-eval-jev, the animation replays the real output of the evaluate and gate commands, and the README says which file it comes from and which script renders it frame by frame. An animation like that isn't decoration: it's evidence anyone can regenerate.

## WAR mutation of the week

[12:58] → E19

This week's mutation is about you. Take your pitch and run WAR on it. First, strike every adjective: robust, solid, expert. If the sentence falls apart without the adjective, there was nothing inside it. Second, every number that's left needs its command next to it; if it doesn't have one, it goes. Third, the real attack: give your link to someone who doesn't know your repo and ask them to run the command. If they get the same number, it stays. If they can't run it, or they get something else, that number wasn't ready for your pitch. Your measurable edge is whatever survives that test.

## The challenge and how it's graded

[13:41] → E20

The challenge. You deliver your positioning pitch and one example of a finding report for a stakeholder. The criteria: the pitch runs two minutes or less and cites one of your projects with a link. The finding report includes curl, the response, and the impact on the consumer. And every number in the pitch comes from a command anyone can run. You pass with the challenge at level three and the quiz at six out of eight or better. Level four: your portfolio repo has a bilingual README, with its limits section, and an animation generated from a real log, not drawn by hand. Like the ones in my repos.

## Mini-quiz

[14:25] → E21 · pausa 5 s

Mini-quiz, the last one in the course. Pause if you like. First: which pitch positions a QA plus AI profile? A, I know Playwright and Selenium. B, I design quality strategy and supervise AI-generated tests, and this repo proves it. C, I have the ISTQB certification. D, I learn any tool fast. It's B. Tools and certificates are common; judgment, AI supervision and tangible proof are what set you apart.

[14:58] → E22 · pausa 5 s

Second: how do you escalate a contract mismatch to a stakeholder? A, change the service so my test passes. B, evidence with cURL and the response, impact on the consumer, and resolution options. C, a screenshot of the red test. D, wait for the daily standup to bring it up. B. The test is the detector; the argument is the affected consumer.

[15:28] → E23 · pausa 5 s

Third, a trick interview question: do you aim for one hundred percent coverage? A, yes, always. B, no: line coverage isn't the goal; I prioritize risk coverage and can show how I decide it. C, it depends on the budget. D, one hundred percent doesn't exist, full stop. It's B. Explaining risk coverage with an example is what separates someone who runs scripts from someone who designs quality.

## Wrap-up

[16:00] → E24

Three ideas to close with, and this closes the course. First: show, don't tell. A project with a number and its command is worth more than any adjective. Second: when you communicate a finding, the center is the consumer, not your test. Evidence, impact and options. Third: every number you say about yourself comes from a command someone else can run. What's next: the final exam, twenty-six scenario questions that cut across the whole course, and you pass with eighty percent. And your capstone, which is your best pitch: someone else, a clean machine, the same fingerprint. Thanks for making it this far.

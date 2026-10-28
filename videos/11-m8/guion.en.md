# Module 8 · Reporting & Traceability — evidence you can sign off on

English narration script, adapted (not translated) from the Spanish version. Voice: Cristian, first person. Reference pace: 150 words per minute. The `[mm:ss]` marks are computed at that pace; each block names its scene in `escenas.json`.

## 1. Hook

**[00:00] → E01**

274 tests. 184 passed. 90 failed. That was the full SpendWise run on October 17. If my report had stopped at that line, nobody could have done anything with it. Which 90? Are they product bugs, broken tests, or an environment that fell over? Which requirement does each one belong to? Where's the proof that what I say happened actually happened?

A counter isn't evidence. "512 passed, 3 failed" and nothing else doesn't let you audit, classify or certify anything.

**[00:32] → E02**

This is Module 8: reporting and traceability. The course mentor puts it this way: a test that passes and nobody sees doesn't exist. Today you'll plug an evidence-rich report into your framework, trace requirement to test case to execution, and learn which part of that evidence survives when your company switches tools.

## 2. Explained like you're 8

**[00:53] → E03**

A report is the photo of your graded homework. It's not enough to tell your teacher "I did it". You have to show the page, with your answers and the marks for what was right and what was wrong.

And if an answer is wrong, the page shows which question it was, what you wrote, and what the right answer was. That way you can fix it without redoing the whole assignment.

Traceability is the number on each question. Thanks to that number, your teacher knows question 3 was about adding and that you got it wrong. Without numbers, she has a page full of answers and no idea which question each one goes with.

## 3. Theory

### Block 1 · A report with evidence

**[01:39] → E04**

A good report has three levels. The overall status. The detail for each case: steps, result, evidence. And the evidence itself: screenshots, video, trace, the request and the response.

Who's it for? Three different readers. The developer needs failure details with evidence, to reproduce it. The lead or product owner needs status per requirement. The manager needs trends and risk. A single-level report fails someone: either it drowns the manager in stack traces or it leaves the developer with nothing to go on. That's why it has to be navigable.

**[02:15] → E05**

Playwright gives you the foundation out of the box. Look at the config in civica-playwright-challenge. There are five reporters: list for the console, html for the navigable report, junit so CI can read it, and two custom reporters that write the mutant ledgers into the `ledger/` folder. And under `use` is what gets attached to each test: a trace on the first retry, a screenshot only on failure, and video kept only on failure.

restful-booker-quality-suite does something similar depending on where it runs: in CI, the line reporter, html, and junit at `test-results/junit.xml`; locally, list and html. And the trace is kept on failure.

**[02:56] → E06**

You open Playwright's HTML report with `npx playwright show-report`, or `npm run report` in my repos. Every failed test comes with its error, its steps, and its attachments: the screenshot, the video and the trace. The trace is what lets you replay the failure step by step without running anything again.

**[03:17] → E07**

And evidence doesn't have to come only from Playwright. In spendwise, every UI defect has a folder with a video showing the pointer and numbered steps, one screenshot per step, a final screenshot with the defect highlighted, and a JSON file with metadata. Look at BUG-09: the title "Login from a protected route doesn't return to the original route", the role, the route, the time it was recorded, reproduced true, the expected result, "should return to /expenses after login", and the actual one, "lands on /dashboard". And the steps, each with its screenshot.

With that, a developer doesn't need to ask you a single thing.

**[03:59] → E08**

When do you capture? Not always and not on every step, or the report becomes unmanageable. Not never, either. The rule is evidentiary: automatic capture on every failure, plus captures on the key steps that serve as evidence. And for an API failure, you attach the exact curl request, the full response, and expected versus actual. With that, the developer reproduces it in seconds.

A security warning that's written right into spendwise: evidence never contains passwords or tokens. Requests are saved with `[REDACTED]` and `<TOKEN>` in their place. And in CI that suite runs with traces turned off, because Playwright traces store authentication headers. Your evidence must never turn into a leak.

**[04:44] → E09**

All that evidence ends up in one place: `INFORME-QA-SpendWise.html`. It's a file of about 16 megabytes with every piece of evidence embedded, and it opens without the rest of the repository. Inside are the 47 confirmed defects, 18 high severity, 27 medium and 2 low, all reproduced on October 17. Each one with its screenshot, the rule it breaks, how to fix it, and its automated test. Plus 8 improvement opportunities, each with the reason it isn't a defect.

That last part matters to me. A report that only lists bugs invites you to pad the list. A report that also explains what isn't a bug, and why, shows judgment.

### Block 2 · Classifying failures

**[05:28] → E10**

A failure can be one of three things: a product bug, a broken test, or an environment or data problem. Each category triggers a different action: report it, fix the suite, or fix the environment. Mix them up and your metrics lie. If 40 percent of your reds come from the environment, your suite isn't the problem; your environment is.

The final spendwise summary has a concrete example: test E2E-06 was ruled out as a defect after fixing its synchronization and its locator; the product did show the access-denied screen. It was a broken test, not a bug. And the same run says: infrastructure errors, zero; unclassified failures, zero.

In the war-paradigm vault this is a golden rule: every failure gets a verdict, product bug, test bug, environment or data. And you never "fix" a test so it passes against a wrong response.

**[06:25] → E11**

When the verdict is "product bug", the write-up has a shape. Look at restful-booker's `DEFECTS.md`. Every defect has severity and priority, why it's a defect, expected, actual, impact, and the curl to reproduce it. RB-003, for example: high severity, priority P1. The server accepts 10.99 as a price and stores it as 10, without rejecting it or warning anyone. Impact: wrong charges, invoices and reconciliation differences.

And notice the honesty in RB-002. It says "likely cause": the string "false" appears to be converted with JavaScript's Boolean function. And then it clarifies: this is an evidence-based hypothesis, not proof from the source code. A report you can sign off on separates what you saw from what you assume.

### Block 3 · Traceability: from requirement to execution

**[07:12] → E12**

The chain goes like this: requirement, test case, execution, evidence. And it has to work both ways. From the requirement you reach its tests and their status. From any test you reach the requirement it covers. The two directions answer different questions, "what covers this story?" and "why does this test exist?", and both need an answer.

**[07:34] → E13**

In civica-playwright-challenge, traceability lives in the README, in a table. Requirement 5, TC1, search and validate a movie: it lives in `tests/mock/searchMovie.mock.spec.ts` and `tests/e2e/searchMovie.e2e.spec.ts`. Requirement 6, TC2, navigate to the Top 250 through the menu: in its two specs. Requirement 4, no XPath or CSS: in every Page Object. Each requirement of the challenge points to a file. If someone asks where something is tested, the answer is one line away.

**[08:03] → E14**

In spendwise, the chain is more complete. The test case document has 26 base cases designed before execution, prioritized by risk. Each row has the ID, the priority, the technique, the expected result, the automated test that runs it, and the result. For example, VAL-01, priority P0, boundary value: an amount of 0 gets rejected with a 400. The VAL-01 test automates it. Result: fails, BUG-01. And the test plan has a matrix linking the rules from the brief, like RN-20 and Annex E, to the file that covers them.

**[08:39] → E15**

And `full-run.json` closes the reverse direction. For every defect, the list of tests that prove it. BUG-01: VAL-01 and MUT-EXP-07. BUG-02: VAL-02, VAL-03, MUT-EXP-08 and MUT-EXP-09. And the list of failures with no assigned defect is empty. From a requirement I get to the case, from the case to the test, from the test to its result, and from every red to its defect with evidence.

### Block 4 · Tools change, the chain doesn't

**[09:05] → E16**

At a company, that chain lives in a test management tool. Xray, TestRail, Zephyr, qTest. The concept is the same; you pick whatever your team uses. If you change jobs and go from Xray to TestRail, nothing fundamental changes: the requirement, case, execution and evidence chain is the same.

What survives a tool change? Stable IDs for requirements and cases, evidence in open formats like HTML, JSON, images and video, and the links between them. What doesn't survive is whatever only exists inside the old tool. That's why I like keeping traceability in the repo too, like civica and spendwise do.

Output formats help. In karate-api-testing, Karate leaves an HTML report with one page per feature and the request and response logs, plus Cucumber JSON and Surefire XML for other tools to consume. Playwright leaves JUnit XML. These are open formats: the day you switch tools, the evidence can be loaded again.

**[10:06] → E17**

About Allure. It's a widely used open standard, but the principle applies to any reporter. None of my public repos has it wired in today. Civica's growth guide has the recipe: `npm i -D allure-playwright` and add `allure-playwright` to the reporter array in `playwright.config.ts`. According to that guide, what you get is history, trends and step-level detail across runs.

History matters. A test that failed once is noise. One that fails in 20 percent of runs is a pattern. Only history tells them apart.

Civica has a small kind of history without Allure: the mutant ledger. A custom reporter writes `ledger/mutation-insights.json` after every run, and the next run reads it to order the mutants: the ones that failed in their last five runs first, then new ones, then the rest. It's memory between runs in a JSON file. And look at where it lives. Until recently civica wrote it to `test-results/`, the folder Playwright empties at the start of every run, so in practice it remembered nothing. I found that while preparing the mutants video, and it was fixed in commit b240008. The lesson works for any kind of history: keep it outside the output folder, and check with two runs that it really adds up.

**[11:28] → E18**

And one detail almost nobody checks. In restful-booker-quality-suite, CI uploads the Playwright report as an artifact with `if: always()`, meaning even when it fails, and with `retention-days: 14`. After fourteen days, that artifact is gone. If your evidence for a sign-off is "the report is in CI", in two weeks there's no evidence. We'll dig into that in Module 8b.

## 4. Step-by-step lab

**[11:52] → E19**

Before the lab, look at the top layer, the manager's. Restful-booker's `EXECUTION_REPORT.md` is a single page. Executive summary: 43 checks, 8 confirmed defects, 3 release blockers if XML, decimal prices and dates are supported. Scope. A table of results by quality gate. The release decision, with its recommendation. And a section almost nobody writes: what was deliberately excluded, like load testing, specialist security testing and UI. Saying what you didn't test is part of the evidence.

**[12:23] → E20**

Lab time. Open war-paradigm, experiment 02, and run `npm run test:mutants`. Besides the scoreboard in the console, the reporter writes `test-results/mutant-evidence.json`. According to the README, that JSON records for every scenario its ID, the expected and observed HTTP status, the phase, the reason, the Git revision, and SHA-256 hashes of the app, the scenario, the runner, the test and the lockfile. It also records `randomSeed: null`, because the run doesn't use anything random.

Why all that? Because it lets someone verify, months later, that the result matches exactly that code. That's evidence you can sign.

Then run `npm run report` and open Playwright's HTML report for the same run.

**[13:06] → E21**

Now in your own framework. If you start from civica, the config already attaches a screenshot, video and trace when a test fails, and CI uploads `playwright-report/` as an artifact. Your job is to map your suite to test cases: every test with an ID in its title, like VAL-01 in spendwise, and a table that says which requirement each ID covers. If your team uses a test management tool, that ID is what you link there. If not, simulate the flow with a table in the repo.

For the first criterion, a report that opens without your machine, copy the pattern from civica's workflow. There are three upload steps: the audit reports right after their suite, because later runs empty `test-results/`; and at the end, the HTML report in `playwright-report/` and the mutant ledger, which is kept for ninety days because the next main run downloads it. All three with the condition `if: ${{ !cancelled() }}`. That means they upload even when a suite failed, which is exactly when you need them most. A workflow that only uploads the report when everything passes leaves you with no evidence the day you need it.

And make sure JUnit lands at a fixed path, like `test-results/junit.xml` in civica. Civica's README says that file is for CI dashboards. It's a standard format, which is why it's the first thing to check when you hook up a test management tool.

## 5. WAR mutation of the week

**[14:40] → E22**

The report gets tested too. This week you plant a failure on purpose and check that it shows up in the report with its evidence.

In a copy of civica, for example, change the expected title in the main search test: instead of "Inception", put some other word. Run `npm test`, then `npm run report`. What you should see: the test in red, the message with expected and received, and the screenshot and video attached, because the config keeps them on failure. If the failure shows up without a screenshot, or doesn't show up in the report your CI publishes, your report has a hole. Then put the test back the way it was.

## 6. The challenge and how it's graded

**[15:26] → E23**

The deliverable: a published report with evidence, plus a suite traced in a test management tool, or a simulation of that flow.

The criteria. One: the report opens without your machine, as an artifact or a single file. Two: every failed test comes with a screenshot or a trace. Three: every case links to its requirement.

And the top level: you plant a failure and show that it appears in the report with its evidence.

## 7. Mini quiz

**[15:56] → E24**

Three questions. Pause if you want.

First. The report says "512 passed, 3 failed" and nothing else. What's missing? A, colors. B, per-case detail: steps, evidence, failure category, and which requirement each test answers to. C, a pie chart. D, the company logo.

**[16:21] → E25**

It's B. A counter isn't evidence.

Second. You change jobs and they use TestRail instead of Xray. What changes in your method? Nothing fundamental: the requirement, case, execution and evidence chain is the same. The tool changes.

Third. What does bidirectional traceability mean? From a requirement you reach its tests and their status, and from any test you reach the requirement it covers.

## 8. Wrap-up

**[16:53] → E26**

Three ideas. One: a report is per-case detail with evidence, not a counter. Two: every failure gets classified, product, test or environment, because each one calls for a different action. Three: the requirement, case, execution and evidence chain is the standard; the tool barely matters.

In Module 8b we close the method: how to certify a story with evidence and traceability, and why that signature belongs to a human.

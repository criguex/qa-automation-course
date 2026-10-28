# Script EN · Module 14 · m28 — Pipelines: anatomy, gates, what a green means, and evidence pipelines

_Narration words: 2611 · estimated runtime 17:39 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it goes with. Lines starting with `>` are production notes and are not read aloud.

## [00:00] → E01 · Hook

October 15, 2026. I push a change to restful-booker-quality-suite and CI goes red. I open the log. No test failed: they never even ran.

What failed was npm run format:check, with Prettier: "Code style issues found in 112 files." The workflow clones the system under test inside the repo folder. Three minutes later, the next commit added one line to dot prettierignore: "Exclude cloned target from quality gates." Green. The next day, red again, over two files.

The cheap gate caught it before the suites. Today you learn to read a pipeline: what ran, what got skipped, and whether it blocks anything.

## [00:41] → E02 · Title

Module fourteen: pipelines. Anatomy, gates, what a green means, and evidence pipelines. We'll read five real workflows from my repos, you'll build one with three chained gates, and then you'll break it on purpose, four times.

## [00:55] → E03 · Explained like you're 8

Picture the entrance to a stadium with a line of gatekeepers. The first one checks your ticket. The second checks you're not carrying anything forbidden. The third makes sure you're headed to the right section. If the first one says "you're not getting in," the others don't even look at you.

When you finally get in, someone stamps your hand in green. That stamp only says you got past the gatekeepers who were working that day. If the one checking for forbidden stuff went to lunch, the stamp is just as green.

One more thing. If the door next to the line is wide open with nobody watching, anyone can walk in without going through the line at all. That's an unprotected branch.

So looking at the stamp isn't enough. You have to ask who was in the line that day, and whether the side door had a lock.

## [01:55] → E04 · Theory 1: anatomy of a workflow

A GitHub Actions workflow has three layers. At the top, on: the triggers. That can be push, pull_request, workflow_dispatch to run it by hand, schedule to run it at a set time, or tags.

Then come the jobs, and every job starts on a brand new, clean runner. Inside each job are the steps, and a step that exits with anything other than zero ends the job.

Look at predictor-debugger's two workflows. verify.yml fires on every push and every PR. reproduce.yml only runs by hand, or when you push a tag that starts with v. One is the cheap check you run every day. The other is the expensive one, the evidence one. I'll come back to it at the end of the module.

## [02:44] → E05 · Code: the verify.yml matrix

Let's open verify.yml. It has a single job, saved, on ubuntu-24.04. The strategy is a matrix with include: four entries, one per round. Each one brings its own script, its expected fingerprint and its test file. Round one, for example, expects the fingerprint EEC9-09E0-F77D.

It also sets fail-fast to false. Without that, if round three goes red, GitHub cancels the others and you lose the information from the ones that were passing.

Look at the last step. A loop over three machines: mac, war and guerra. For each one it runs the script with dash dash saved, keeps the output with tee, and then demands the fingerprint with grep dash q. If the fingerprint isn't there, grep exits with one and the job goes red. That grep line is the gate.

## [03:37] → E06 · Theory 2: needs and the order between jobs

Without needs, jobs run in parallel, on their own. In qa-eval-lab's eval-gate there are two jobs, ui-tests and llm-evals, and neither depends on the other. If the UI tests fail, the eval job runs anyway.

With needs, colon, bracket a, the job waits for a to finish, and if a fails, it gets skipped. That's how you chain gates across jobs. And on the PR page you see it right away: the job that failed is red and the ones that depended on it show up as skipped, grey, without burning a second of runner time.

Now something I checked on October 26: none of the workflows in these real cases use needs or concurrency. Civica, restful-booker and war-paradigm put all of their gates in a single job. There, the order of the steps plays the role of needs: if lint fails, nothing after it runs. It works, but everything lives in one check, and you can't require each gate separately.

## [04:41] → E07 · Theory 3: cache versus artifact

Two things people mix up all the time: the cache and the artifact.

actions/setup-node with cache npm, which civica, restful-booker and war-paradigm all use, stores dependencies so npm ci runs faster. If that cache disappears, the run takes longer and gives the same result. It's disposable.

actions/upload-artifact stores evidence with a retention period. In those workflows it's fourteen days for the Playwright report, and in civica for the audit reports too. Civica's mutation-insights ledger is kept for ninety days, because the next run uses it: CI downloads the one from the latest completed run on main before the mutants and uploads the new one at the end. Notice that the ledger is an artifact, not a cache: if it disappears, the mutants run in declared order and CI doesn't fail, but what it learned is gone.

The rule: nothing you need in order to make a decision can live only in the cache. And if deleting the cache changes a result, that's not normal. That's a finding, because something was depending on it.

## [05:50] → E08 · Code: secrets and if conditions

Secrets. The expression secrets dot OPENAI_API_KEY is masked in the logs, and it doesn't reach PRs that come from forks. And if the secret doesn't exist, the expression evaluates to an empty string. Nothing fails. The workflow has to decide what to do about that.

In eval-gate, the decision is this: if the key is empty, print a notice that says "LLM eval skipped." If it isn't empty, run DeepEval and Promptfoo.

For evidence there are three conditions you need to tell apart. always, which war-paradigm and restful-booker use to upload the report no matter what. Exclamation mark cancelled, which civica uses: upload even if something failed, but not if the run was cancelled. And failure, which restful-booker uses to dump the logs of the system under test only when something broke.

## [06:43] → E09 · Theory 4: concurrency

concurrency groups runs together. With a group built from the workflow name and the branch ref, and cancel-in-progress set to true, a new push to the same PR cancels the older run.

On a PR that's a good thing: nobody needs the result for a commit you've already replaced. But don't put it on a release or evidence pipeline. Cancelling halfway leaves you with half the evidence, and half the evidence is worse than none, because it looks complete.

## [07:15] → E10 · Theory 5: a gate is a required check plus a protected branch

Now the most important idea in this module. A gate is two things: a check marked as required, and a protected branch. Without both, the check reports, but it doesn't block.

On October 26 I queried the GitHub API for the five repos in these cases: civica, qa-eval-lab, restful-booker, predictor-debugger and war-paradigm. In all five, main has no protection and no rulesets. Their checks are informational. And qa-eval-lab says so in its README, in the limits section: a red check only blocks a merge if eval-gate is a required check, and main doesn't have branch protection yet.

Protecting a branch isn't hard. In Settings, under Rules or Branches, you require a pull request and pick the checks that have to be green. From then on, the merge button stays locked while any of them is red or hasn't run.

This isn't some hidden oversight. It's written down. But when you join a team and see a green check, your first question should be: does this block anything?

## [08:22] → E11 · Terminal: what a green means

A green check says exactly one thing: the steps that ran exited with zero. It doesn't tell you which steps were skipped, whether the check blocks, or whether someone can merge anyway.

Check it yourself. gh run list on qa-eval-lab, workflow eval-gate, the latest run. Then gh run view with that id and dash dash log, piped into grep for "LLM eval skipped." In today's run, the notice is there. That green means the UI tests passed and no LLM output was graded.

And in that same workflow, look at npm ci, two bars, npm install. If the lockfile doesn't match, the job carries on with npm install instead of failing. Another green that says less than it seems to.

## [09:10] → E12 · Theory 6: fail-closed, fail-open and fail-safe

This helps me classify any step. Fail-closed means "when in doubt, red." For example, a job that fails when the secret is missing, or predictor-debugger, where a NaN never passes.

Fail-open means "when in doubt, green." The eval-gate without a key. A double-bar true stuck onto a command. And one case that changed recently: civica's loadInsights function. Until commit b240008, if the ledger was corrupt, it returned an empty one without a word. It's still fail-open on purpose, since a broken ledger shouldn't take the suite down, but it doesn't stay quiet anymore: it prints a warning, adds a ledger-warning annotation to the report, and keeps the broken file as dot corrupt.

And for test selection there's a third one: fail-safe, "when in doubt, run the full suite." That's how jev-test-impact works: if Jev can't answer, everything runs.

A merge gate should be fail-closed. If for some reason it can't be, it should warn loudly, with a warning annotation and a line in the job summary.

## [10:16] → E13 · Theory 7: order, impact-based selection and triage

Cheap and fast goes first. In restful-booker the order is format check, lint, typecheck, and then npm test, which runs API, contract, component and performance. In civica it's lint, typecheck, mock with accessibility, mutation, audit, API, contract, performance and visual. This video's hook is proof that it works.

Once the suite grows, you can run only what the diff touched. In jev-test-impact's benchmark, across twenty commits of a demo store, selection with Jev ran seventy percent fewer tests and didn't let a single one of the fifteen broken tests escape. And the same benchmark shows the risk: the fast version without Jev, the one that skips end-to-end tests it can't map, let four of the fifteen slip through. Fast and unsafe.

Be careful with the criterion: saving time only counts if escaped failures stay at zero, with fail-safe in place and the full suite still running on main and nightly.

And when something goes red, there's triage: jev-ci-triage classifies each failure with deterministic rules first, and sends anything ambiguous to a model or to a person.

## [11:26] → E14 · Theory 8: flaky tests and retries

Civica and restful-booker use retries set to two and forbidOnly in CI. A test that fails and then passes on retry shows up as flaky in the report. That goes into quarantine with a ticket. It doesn't get hidden. That's rule one in jev-ci-triage.

And the contrast: war-paradigm's mutant runner uses zero retries. If you retry until you see the result you were hoping for, you're cheating on your own experiment.

## [11:55] → E15 · Code: an evidence pipeline

Back to reproduce.yml. This pipeline isn't there for fast feedback. It's there so anyone can check a result from scratch.

It runs on a clean ubuntu-24.04. It downloads the data published in data-v1 with tools/fetch_data.py, which checks every file against SHA256SUMS and against the manifest. It runs the checks' tests. It recomputes everything and at the end demands two things with grep dash q: that the verdicts match the saved ones, and that the fingerprint is the same. In the clone I reviewed, it covers rounds one and two.

What does it cost? The README tells you: on the first reproduce run, number 40267731741, download included, the round one job took six minutes and thirty-three seconds, and round two took seventeen minutes and forty-seven seconds. Both produced the same verdicts and the fingerprints EEC9-09E0-F77D and D506-F58F-3838. That's why it doesn't run on every push: you'd be throwing seventeen minutes per commit at something verify already checks cheaply.

Notice one more thing: neither of predictor-debugger's workflows uploads artifacts. The evidence is the log and the exit code. And in this setup, a release comes from a tag whose CI is green, and it ships its package with a dot sha256 file.

## [13:15] → E16 · Lab, step by step

Your turn. Step one: read the five workflows and fill in one table per file. Triggers, jobs, gates in order, if conditions, cache, artifacts, and what happens when a secret is missing. The files are civica's ci.yml, qa-eval-lab's eval-gate, restful-booker's tests.yml, and predictor-debugger's verify and reproduce.

Step two: check a green with gh run list and gh run view, the way I showed you. Step three: check whether a check blocks anything, with gh api repos, your user, your repo, branches main, and jq dot protected. Do it on your repo before and after you protect main.

Step four: build your pipeline. A static job with format, lint and typecheck. An api job with needs static. A ui job with needs api. Each job uploads its report with the not-cancelled condition, along with a SHA256SUMS file you generate with find and sha256sum. And add concurrency with cancel-in-progress for PRs.

Step five: protect main, require a PR, and mark static, api and ui as required checks. Step six: if a step uses a secret, make it print a warning without it and write that to the job summary, and decide in writing whether that gate is fail-open or fail-closed.

## [14:34] → E17 · This week's WAR mutation

This week's mutation goes after your own pipeline. Four breaks, one per PR, and before each one you write down which gate should catch it.

One: remove a needs. What usually happens is the job runs even though the previous one failed. Two: add double-bar true to the test step. The check comes out green with red tests, and you only see it if you open the log. Three: delete a secret a step uses. It depends on your if, and a green with no notice is a finding. Four: turn off branch protection. The broken PR can be merged.

Whatever nobody caught goes into the table as a finding, with a link to the run. That "nobody" is the most valuable thing you'll get this week.

## [15:25] → E18 · The challenge and how it's graded

The deliverable: a repo with a workflow of three or more gates, hashed artifacts and a protected main, the blocked PR, the reading table for the five real workflows, and the table of the four breaks.

Criteria: three gates chained with needs, and on the broken PR the later jobs show up as skipped. All three checks are required and the merge shows as blocked. Every job uploads its artifact even when it fails, and sha256sum dash c passes on what you download. And a step skipped for a missing secret shows up in the log and in the summary.

The rubric has four rows: reading a green, gates and blocking, artifacts and evidence, and mutating the pipeline. For the top level in reading, you find an undocumented fail-open in a real workflow.

## [16:18] → E19 · Mini-quiz

Three questions. Pause if you like.

First: a workflow has two jobs, lint and e2e, with no needs. lint fails. What happens to e2e? It runs anyway, in parallel, because it doesn't depend on lint.

Second: a step says npm test, double bar, true. What changes? The step exits with zero even when the tests fail. The gate stops being a gate.

Third: what's the difference between verify.yml and reproduce.yml? verify runs on every push and checks the fingerprint against saved verdicts. reproduce is triggered by hand or by a tag, downloads data-v1 on a clean runner and recomputes.

## [17:13] → E20 · Wrap-up

Three ideas. One: a green says the steps that ran exited with zero, and nothing more. Two: a gate is a required check on a protected branch. Three: cheap things first, and evidence always gets uploaded, especially when the run fails.

In the next module we look at what happens when the runner dies: ephemeral containers, and how to make evidence outlive the environment. See you there.

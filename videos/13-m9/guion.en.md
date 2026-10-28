# Script EN · Module 13 · m9 — CI/CD and Docker

_Narration words: 2483 · estimated runtime 16:33 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it goes with. Lines starting with `>` are production notes and are not read aloud.

## [00:00] → E01 · Hook

Five of my public repos, all with green CI. I ask the GitHub API whether the main branch of each one is protected. I ran it today, October 26, 2026, and all five answers came back the same: false.

That means if someone opens a pull request tomorrow with a broken test, the check turns red, and the merge button is still sitting right there. The pipeline warns you. It doesn't stop anybody.

Today you build CI that runs your tests on every PR, inside a container, and you learn to tell a pipeline that reports from one that blocks.

> Screen: the terminal types the command and the five `protected=false` lines appear one by one, in coral.

## [00:40] → E02 · Title

This is module thirteen of the course: CI/CD and Docker. We'll read real workflows from my public repos, run a suite inside the official Playwright image, and build your own pipeline with a matrix, artifacts, and a clear notice whenever a secret is missing. At the end you'll break a test on purpose and see whether the pipeline lets it through.

## [01:04] → E03 · Explained like you're 8

Picture a robot in your classroom whose only job is checking homework. Every time someone hands in a sheet, the robot reads the whole thing, never gets tired, and never cheats. If everything is right, a green light comes on. If something is wrong, the light turns red.

But the robot only matters if the teacher listens to it. If the light goes red and the teacher accepts the homework anyway, the robot is just decoration. So having the robot isn't enough. Someone has to decide that a red light means "this sheet doesn't get in."

There's one more catch. If the robot checks at home with a different calculator than the one at school, it might get different answers. So we always make it work with the exact same toolbox. That toolbox is the container.

## [01:59] → E04 · Theory 1: anatomy of a CI for tests

Let's start with anatomy, using a real file: the ci.yml from civica-playwright-challenge.

At the top you have the on section, the triggers. This workflow runs on every push to main, on every pull request against main, and by hand, through workflow_dispatch. Then comes a single job called test. It runs on ubuntu-24.04 with a twenty-minute timeout.

Inside are the steps, in order. Check out the code. Set up Node 20 with an npm cache. Install with npm ci. Install the Chromium browser. Then the gates: lint, typecheck, the mock suite with accessibility checks, mutation, audit, API, contract, performance and visual regression. Last come three steps that upload reports as artifacts.

Here's the rule to take with you: a step that exits with anything other than zero ends the job. If lint fails, none of the suites run. That's why the order matters.

## [02:56] → E05 · Code: civica's ci.yml

Look at two lines. The first is npm ci. It is not the same as npm install. The npm docs are explicit: if the dependencies in the lockfile don't match the ones in package.json, npm ci exits with an error instead of updating the lockfile. That's exactly what you want in CI. If someone changed dependencies without updating the lock, you find out right there.

The second is the condition on the artifacts: if, exclamation mark, cancelled. It means "upload the report even if something failed, unless the run was cancelled." That's the right call, because the report you need most is the one from the run that failed. The runner that executed the job is thrown away when it finishes. Whatever you didn't upload is gone.

That civica run from October 15, number 38665514760, left one artifact behind: playwright-report.

## [03:52] → E06 · Theory 2: quality gates and where they run

A quality gate is a point where the pipeline decides whether a change moves forward. A well-placed gate blocks before the merge. If your tests run after the deploy, that's not a gate anymore. That's an autopsy.

Not everything has to run in the same place. The PR gets the fast, critical stuff: smoke tests and the suite that protects what matters. Main runs the full suite. The nightly run gets the full regression and performance. The idea is to put fast feedback where it can block.

And here's something I learned the hard way. A gate that takes ninety minutes ends with people merging through an admin override. Friction beats discipline every time. If the gate gets in the way, it loses its authority. How fast a gate runs is part of how it's designed.

That's why cheap things go first. In civica, lint and typecheck run before any browser starts.

## [04:52] → E07 · Theory 3: running in parallel without breaking things

As the suite grows, you have two tools to keep it fast: the matrix and sharding.

A matrix runs the same job several times with different values. In playwright-jev, the unit test job runs on a matrix of Node 20 and Node 24. In predictor-debugger, verify.yml uses a matrix of four rounds, each with its own script, its own fingerprint and its own tests, and it sets fail-fast to false so one red round doesn't cancel the others.

Sharding splits the suite across several machines. Civica's growth guide has the command: npx playwright test, dash dash shard equals one slash four. No code changes needed. But there's a hard requirement: your tests have to be independent. If a test depends on running order, or on state another test left behind, sharding will break it. The isolation you worked on in the Playwright module is what makes sharding possible.

## [05:52] → E08 · Code: matrix and concurrency in playwright-jev

This is playwright-jev's ci.yml. Look at the strategy: matrix, node, twenty and twenty-four. One block of steps, and GitHub runs it twice.

Look up top as well: concurrency, with one group per branch and cancel-in-progress set to true. If you push twice in a row to the same PR, the older run gets cancelled and only the new one is left. That saves runner minutes. Careful, though: that's for PRs. In an evidence pipeline or a release pipeline you don't want it, because cancelling halfway leaves you with half the evidence. We'll go deep on that in the pipelines module.

In my repos the matrix covers Node versions or rounds. None of them has an operating system matrix. That one you'll build yourself in the challenge.

## [06:42] → E09 · Theory 4: flaky tests without cheating

Now the enemy of every CI: the flaky test. It fails one run out of ten and nobody touched the code.

In civica and in restful-booker, playwright.config.ts sets retries to two and turns on forbidOnly when running in CI. forbidOnly stops a forgotten test dot only from quietly shrinking the run down to a single test. And those two retries come with a price: a test that fails and then passes on retry shows up as flaky in the report. You don't ignore that label.

So what do you do with a flaky test? Quarantine. It comes out of the gate, you open a ticket to fix the root cause, and you don't delete it, because deleting it means losing coverage. In my tool jev-ci-triage, rule number one is exactly this: it failed and then passed on a retry in the same run, so it's flaky.

And a contrast worth noticing: the mutant runner in war-paradigm uses zero retries. Retrying until you see the result you wanted would be cheating.

## [07:50] → E10 · Theory 5: containers for reproducible environments

On to Docker. Why put your suite in a container? Reproducibility. If your laptop runs one version of Chromium and CI runs another, every red build starts an argument instead of a fix. The classic "works on my machine."

Playwright pins its browser versions to each release. That's why the official image, the one on mcr dot microsoft dot com, has to match the version of your npm package. An image from one version with a package from another gives you weird browser failures that nobody connects to the real cause.

In civica this isn't theory. The visual regression suite compares screenshots pixel by pixel, and Playwright names its baselines by operating system. The repo only stores the Linux ones, generated inside its Dockerfile. A baseline taken on macOS is never picked up by CI.

## [08:44] → E11 · Code: civica's Dockerfile

Here's the whole Dockerfile. It's short, and every line is there for a reason.

FROM mcr dot microsoft dot com slash playwright, version 1.63.0 noble. That's the same Playwright version the repo's lockfile installs, 1.63.0. Image and package line up. Next it copies package.json and the lockfile first, and runs npm ci with ignore-scripts. Copying dependencies first lets you reuse the layer cache: if you only change a test, Docker doesn't reinstall everything.

The PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD variable set to one skips the browser download, because the browsers already ship with the image. And the default command is npm test, which runs the deterministic mock suite.

## [09:26] → E12 · Terminal: running the suite in Docker

Civica's migration guide has both commands. First, docker build dash t civica-pw dot, which builds the image. Then docker run dash dash rm, mounting the current folder at slash work, and npm test inside it.

And when you change a mock page on purpose and need to regenerate the visual baselines, it's the same command with npm run test:visual:update. Always inside the container, never on your Mac, so the dash linux dot png files stay the ones CI actually compares against.

> Screen: commands copied from `docs/MIGRATION.md`. No output is shown because I didn't record it in this session.

## [09:58] → E13 · Code: the system under test in a container too

Containers aren't only for the suite. In restful-booker-quality-suite, the system under test is born on the runner as well.

The workflow clones the restful-booker repo and checks out commit 0046115. Pinned, so a change on their side can't change my results. It starts the system with docker compose up dash dash build. Then it waits: a loop of up to thirty attempts curls the ping endpoint, two seconds apart. If it never answers, it prints the container logs and exits with one.

At the very end there's a step with if failure that dumps the system's logs only when something broke. Once the job ends, the system dies with the runner. If you didn't pull the logs out first, there's no way to find out why it failed.

## [10:49] → E14 · Code: secrets and honest notices

Last piece of theory: secrets. An API key doesn't belong in playwright.config, and it doesn't belong in a committed dot env file. A secret in the repo is compromised from the very first push, because git history doesn't forget. It goes in your CI provider's secrets, which get masked in the logs.

Look at qa-eval-lab's eval-gate. It has two jobs, ui-tests and llm-evals. In llm-evals, if the OPENAI_API_KEY variable is empty, one step prints a notice titled "LLM eval skipped," and DeepEval and Promptfoo are skipped. The job finishes green.

Is that wrong? Not necessarily, because it tells you. But you have to know how to read it. And the same workflow has another line worth a close look: npm ci, two vertical bars, npm install. If the lockfile doesn't match, it falls back to npm install instead of failing. Whatever npm ci was protecting you from, that line undoes.

## [11:49] → E15 · Browser: reading a real run

Let's open the Actions tab on qa-eval-lab. The latest eval-gate run, number 40374138570, is from today, October 26, on main, and it finished with success in six minutes and thirty-five seconds.

I open the log for the llm-evals job and search for "LLM eval skipped." There's the notice: OPENAI_API_KEY is not set, so the DeepEval and Promptfoo steps were skipped. That green means the UI tests passed and no LLM output was graded. The README says so itself, in its limits section.

That's the habit I want you to build: before you celebrate a green, open the log and check what actually ran.

## [12:30] → E16 · Lab, step by step

Your turn. The lab has two parts.

Part one: containerize your Playwright framework, the one you've been building through the course. Use the official image at the same version as your package, copy the lockfile first, and run npm ci. Make sure it works with docker run before you bring it into CI.

Part two: a GitHub Actions workflow that runs on every PR. Here are the criteria, straight from the course. One: the workflow fails when the lockfile doesn't match, which means plain npm ci, with no double bars and no plan B. Two: it runs on a matrix of two operating systems. Three: it uploads the report even when the suite fails. Four: it prints a notice whenever a step is skipped because a secret is missing.

For the Allure report, civica's growth guide gives you the starting point: npm i dash D allure-playwright, then add allure-playwright to the reporter array in playwright.config. After that, publish it as a pipeline artifact, with the same condition civica uses.

To check your work, run gh run list on your repo and open the log of the run.

## [13:45] → E17 · This week's WAR mutation

This week's mutation tests your gate. Break one test on purpose, just one, and open it as a PR.

Before you open it, write down your prediction. If your main branch isn't protected, you'll see a red check and an available merge button. That's the finding from the hook: the pipeline reports, but it doesn't block.

Then protect main. In Settings, under Rules or Branches, require a pull request and mark your test job as a required check. Open the broken PR again. This time the merge has to be blocked. Take the screenshot.

If the PR could be merged with the red test, your gate didn't exist. Write it down exactly like that, as a finding, and fix it before you move on.

## [14:35] → E18 · The challenge and how it's graded

The deliverable is a CI pipeline that runs the suite on every PR, with the report published.

It's graded on criteria anyone can check. Does the workflow use npm ci and fail with a mismatched lockfile? Does it run on two operating systems? Does the artifact show up on a red run too? Does the log show the notice when the secret is missing?

And the top level: you open a PR with a test broken on purpose and show that branch protection blocks it. With a link to the PR and a screenshot of the blocked merge.

## [15:14] → E19 · Mini-quiz

Three questions. Pause the video if you want to think them through.

First: which one is a well-placed quality gate? The pipeline retries until it passes, the PR can't be merged if the critical suite fails, a coverage badge in the README, or running the tests after the deploy? It's the second one. A gate blocks before the merge.

Second: a test fails one run in ten with no code changes. What do you do? Quarantine: out of the gate, a ticket for the root cause, and you don't delete it.

Third: the CI run is over. Where are the report and the trace? In the pipeline's artifacts, if the job uploaded them. Runners are ephemeral. If you don't publish them, every CI failure is impossible to reproduce by design.

## [16:06] → E20 · Wrap-up

Three ideas to keep. One: a green check blocks nothing if the branch isn't protected and the check isn't required. Two: npm ci plus a container at the exact version kills "works on my machine." Three: always upload the report, especially when the run fails.

In the next module we open the pipeline up: needs, conditions, cache versus artifact, and what a green really means. See you there.

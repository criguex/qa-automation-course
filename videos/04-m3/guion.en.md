# Script · Module 04 · Day 0 setup — the environment

> Voice-over: Cristian Guerra, first person, natural English (adapted, not translated). Animated video, no camera.
> Pace: 150 words per minute. Timestamps were computed from that pace plus the quiz pauses.
> Module source: `qa-automation-course/i18n/es/modules-01-14.json` (m3) and `quiz-01-10.json` (m3). Lab: your own course repo, with `war-paradigm` as the reference repo. Official docs: playwright.dev/docs/intro, docs.npmjs.com (npm ci).

## 1. Hook

[00:00] → E01
I bumped Playwright from 1.63 to 1.64 in `package.json`. One line. I didn't touch the lockfile. And `npm ci` refused to install: "npm ci can only install packages when your package.json and package-lock.json are in sync". That error looks like a nuisance, but it's exactly what I want you to have from day zero: an environment that complains when someone changes a version by accident. Because the alternative is worse. Nobody complains, and every machine ends up running something different.

[00:32] → E02
I'm Cristian Guerra, I work in QA out of Medellín, and this is module four of the course: day zero setup, the environment.

## 2. Explained like you're 8

[00:41] → E03
Before you cook, you get the kitchen ready. Clean pots, ingredients within reach, a stove that actually lights. Otherwise, halfway through the recipe you realize there's no salt, and the rice burns while you go looking for it.

Automation works the same way. Before you write your first test, you get your machine ready: the tools installed, the right version of each one, and a tidy place to keep your work. And one more thing: a shopping list that says exactly which brand of every ingredient you used, so anyone cooking later in a different kitchen gets the same dish. In programming that list exists, and it's called a lockfile. Today we're going to take very good care of it.

## 3. Theory

[01:29] → E04
This is day zero of my method: get the environment ready so you're not fighting your tools later. If you come from development this won't take long, but do it properly: versions, accounts and your editor.

Let's start with Node.js. Node ships two kinds of release: LTS, with long-term support, and Current, the newest one. For a test project you want LTS. As of October 2026, the LTS is Node 24, and 26 is still Current. Watch out for one trap: plain `brew install node` gives you Current, not LTS.

And so you can see this isn't theory: on the machine I prepared this video on, `node --version` says v26.8.1. Current. Exactly what happens when you install without thinking about the version. Playwright supports the latest 22, 24 and 26, so it'll run. But your team and your CI need to know which one is the reference, and that's something you decide, not something you inherit.

[02:32] → E05
Second: pin your versions. The course verified these on October 26, 2026: Playwright 1.64, TypeScript 7.0, Node 24 LTS, Java 25 LTS if you go the Java route, Karate 2.1 and k6 2.3. The rule is to pin them in `package.json` and the lockfile, and upgrade on purpose, not by accident.

Look at the course's reference repo, war-paradigm. Its `package.json` pins Playwright at `1.63.0`, exactly, no caret that lets it drift. 1.64 is already out, but the repo didn't move on its own. When someone upgrades it, it'll be in a commit with its own name. That's what upgrading on purpose means.

Compare that with TypeScript in the same file: it says `^5.9.0`, with a caret. That caret allows any 5-point-something at or above it. So who decides which one actually gets installed? The lockfile. In my copy it resolved to 5.9.3, and that's what anyone running `npm ci` will get for as long as the lockfile doesn't change. Notice something else, too: the course talks about TypeScript 7 and this repo is still on 5.9. Same principle. A repo doesn't upgrade because something new came out. It upgrades when someone decides to and tests it.

[03:50] → E06
Third: npx. When you run `npx playwright test`, npx uses the project's local binary, the version in `package.json`, pinned by the lockfile. Not whatever happens to be installed globally on your machine. So everybody runs the same version, and "it's a different version on my machine" goes away.

The lockfile, `package-lock.json`, is the shopping list: the exact version of every dependency, and of your dependencies' dependencies. It gets committed. Always. With it, `npm ci` installs exactly the same thing on your machine, your teammate's and in CI. Without it, every install can resolve different versions.

It's worth knowing how `npm ci` differs from `npm install`, because the npm docs spell it out in five points. `npm ci` requires a lockfile. If the lockfile doesn't match `package.json`, it exits with an error instead of fixing it. It installs the whole project, not individual packages. If there's already a `node_modules`, it deletes it first. And it never writes to `package.json` or the lockfile: the install is frozen. So `npm install` is for when you're changing dependencies, and `npm ci` is for CI and for any machine that just needs to reproduce what's already been decided.

[05:07] → E07
Fourth: git, properly. Branches, pull requests, conventional commits and code review for tests.

One branch per change. `git checkout -b feat/login-tests` creates a new branch from where you are and switches to it, in one step. That branch only exists on your machine until you `git push -u origin`.

Conventional commits: a type, an optional scope, and a description. Look at war-paradigm's real history: "fix(03): the hook blocks pushes to main with global git options". "docs: the hook has 33 test cases". "style: navy and mint brand palette in the banner". You read the log and you know what happened without opening a file. If you add login cases, that's `test:`. If you bump Playwright, it isn't `feat` or `fix`: it's maintenance, `chore` or `build`, depending on your team's convention.

And keep pull requests small. A 200-line PR gets a real review. A 2,000-line one gets approved out of exhaustion, and the bugs slip through. Before you ask for review, read your own diff like a reviewer would: that's where you catch the forgotten logs and the extra files.

And when you hit a merge conflict, say in a steps file, don't blindly take "mine" or "theirs". A conflict is a conversation between two intentions. Read both changes and combine what belongs, because a lot of the time both things need to live together.

[06:37] → E08
Fifth: your editor and your repo layout. VS Code with the QA extensions: Playwright, to run and debug tests from the editor, and ESLint, so test code follows the same rules as production code.

As for the repo: an automation repo has a README that says how to install, how to run each suite and how to read the report. Someone new, or an AI, should be able to run everything without asking you. It has a `.gitignore` that keeps out anything that gets regenerated. And it has a predictable shape. war-paradigm, for example, has one folder per experiment, `assets` for branding, `docs` for the animation, and `.github/workflows` with a single job that runs everything.

That workflow is worth reading, because it's the model for level four of your challenge. It triggers on every push to main, every pull request, and manually. Step one, check out the code. Step two, set up Node 22 with npm caching. Step three, `npm ci`. Step four, type-check with `npm run typecheck`. Step five, install Chromium. Then it runs the three experiments, one per step, and at the end it uploads the Playwright report as an artifact even if something failed, and keeps it for fourteen days. Nothing fancy. And because step three is `npm ci`, a mismatched lockfile stops everything before the first test.

## 4. Lab

[08:05] → E09
Terminal time. First, see what you've got. `node --version`, `npm --version`, `git --version`, `gh --version`. On my machine: Node v26.8.1, npm 11.19.0, git 2.50.1 and gh 2.90.0. You already know what I think about the first one.

A practical tip: paste those four lines into your repo's README, in a section that says which versions it was tested with. When something breaks on someone else's machine, that's the first thing you'll compare, and it saves you half an hour of "works on my machine".

[08:39] → E10
Install with `brew install node@24 git gh`, or `nvm install --lts` if you use nvm. Notice the `@24`: that's what gets you LTS instead of Current.

Then create your course repo and start the project with `npm init playwright@latest`. According to the official docs, it asks you four things: TypeScript or JavaScript, with TypeScript as the default; the name of the tests folder, `tests` by default; whether to add a GitHub Actions workflow, which is recommended for CI; and whether to install the browsers. It leaves you a `playwright.config.ts`, the `package.json`, the `package-lock.json` and a `tests` folder with an example. To run: `npx playwright test`.

If you ever clone a project that already exists, like war-paradigm, you don't run init. You run `npm ci` and then `npx playwright install --with-deps chromium`. The first installs the exact dependencies from the lockfile. The second downloads the browser that version of Playwright expects, plus the system libraries it needs. Two separate things: the Playwright library lives in `node_modules`, the browsers are downloaded on their own.

[09:48] → E11
Now check the npx claim. Inside war-paradigm, `npx playwright --version` answers "Version 1.63.0", the version its `package.json` pins. And if you look for a global playwright with `which playwright`, there isn't one on my machine. I don't need one: every project brings its own. That's the first criterion of the challenge: `node --version` shows an LTS, and `npx playwright --version` runs from the project.

[10:13] → E12
The `.gitignore`. This is war-paradigm's, for real: `node_modules`, `test-results`, `playwright-report`, `blob-report`, `.DS_Store`, log files, and `.env` with all its variants. The first three are what the course's criterion asks for. Dependencies and run artifacts get regenerated; committing them bloats the repo and creates conflicts that don't help anybody. And `.env` stays out, because that's where the keys live.

Then the README. Three sections are enough to start: how to install, how to run each suite, and how to read the report. If someone new, or an AI, can clone your repo and run everything just by reading that, the README does its job. If they have to message you to ask, it doesn't yet.

[10:59] → E13
And the pull-request flow, with yourself. Create the branch: `git checkout -b feat/login-tests`. Make your change, commit it with a conventional message, and `git push -u origin feat/login-tests`. Open the PR on GitHub, or with `gh pr create` from the terminal. Write a description: what changes and how to test it. Read your own diff as if it were someone else's. Then merge.

A useful description is short. For example: "Adds invalid-credential cases to login. How to test: `npx playwright test login`. Risk: nothing outside the tests folder." With that, whoever reviews it knows what to look at and how to check it without asking you.

Why open PRs to yourself if nobody else is reviewing? To rehearse the daily ritual of the job and leave an auditable history. The day you join a team, that flow will feel natural.

## 5. This week's WAR mutation

[11:55] → E14
This week's mutation: break your environment on purpose before you trust it. Change the Node version or delete the lockfile, and see whether your CI notices.

You already saw the first one in the hook: bumping a version in `package.json` without updating the lockfile. Now the second one, on a copy of war-paradigm: I delete `package-lock.json`. Prediction: `npm ci` refuses to install.

[12:20] → E15
I run `npm ci`. Error: "The npm ci command can only install with an existing package-lock.json or npm-shrinkwrap.json". Exit code one. Prediction confirmed.

Now, would CI notice? war-paradigm's workflow has a step called Install that runs exactly `npm ci`, on Node 22. So either mutation would stop it at the first step, before a single test runs. That's the defense you want.

The other half of the mutation, changing the Node version, is yours, with a warning. war-paradigm declares in `engines` that it needs Node 20 or later. Try what your install does with a version outside that range, and note whether it fails or just warns. I didn't run it for this video, so I'm not going to tell you the result: put it in your table as a prediction and check it.

## 6. The challenge and how it's graded

[13:13] → E16
The deliverable is your course repo, created, with a README and your first merged PR.

Criteria. One: `node --version` shows an LTS version and `npx playwright --version` runs from the project. Two: the repo has a README, a `.gitignore` with `node_modules`, `test-results` and `playwright-report`, and the lockfile. Three: at least one merged PR with a description.

The rubric has four levels: one, the deliverable is missing; two, it's there but a criterion fails; three, pass, it meets everything; four, on top of that you have a minimal workflow that runs `npm ci` and fails when the lockfile doesn't match `package.json`. Like war-paradigm's. And you pass the module with the challenge at level three and the quiz, six out of eight.

For level four you don't need to invent anything: a workflow with checkout, Node setup on the LTS, and `npm ci`. To prove it works, run this week's mutation on a branch: bump a version in `package.json` without touching the lockfile, open the PR and let CI go red. That red PR, with npm's error in plain sight, is your evidence. Then close it without merging.

## 7. Mini-quiz

[14:28] → E17
Three questions from the bank. Pause if you like.

One. What exactly does `git checkout -b feat/login-tests` do? A: switches to an existing branch. B: creates a new branch from where you are and switches to it. C: creates the branch on the remote. D: commits whatever's pending.
[pausa 5 s]
B. Dash b means create and switch in one step. The branch only exists locally until you push.

[14:59] → E18
Two. What belongs in the `.gitignore` of a Playwright repo? A: the page objects. B: `node_modules`, `test-results` and `playwright-report`. C: the `.feature` files. D: `playwright.config.ts`.
[pausa 5 s]
B. Dependencies and run artifacts get regenerated. Committing them bloats the repo.

[15:19] → E19
Three. What's the difference between `npx playwright test` and having Playwright installed globally? A: none. B: npx runs the project's local binary, the version in `package.json`, so everyone runs the same one. C: npx is slower and worse. D: npx always downloads the latest version.
[pausa 5 s]
B. The project's lockfile sets the version, not each person's machine.

## 8. Wrap-up

[15:46] → E20
Three ideas. One: Node LTS, with versions pinned in `package.json` and the lockfile; you upgrade on purpose, in a commit with a name. Two: npx uses the project's version, and `npm ci` installs exactly what the lockfile says or refuses. Three: branch, PR, review and merge from day one, with commits that read like a changelog.

Next module is Obsidian, your second brain: documenting before you ask AI for anything. Links are in the description.

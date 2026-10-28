# Script · Module 05 · Obsidian — your second brain (Phase 0 of the method)

> Voice-over: Cristian Guerra, first person, natural English (adapted, not translated). Animated video, no camera.
> Pace: 150 words per minute. Timestamps were computed from that pace plus the quiz pauses.
> Module source: `qa-automation-course/i18n/es/modules-01-14.json` (m3b) and `quiz-01-10.json` (m3b). Lab: `war-paradigm/experiments/03-second-brain` (vault, hook and `tests/vault-links.test.mjs`).

## 1. Hook

[00:00] → E01
Ask an AI assistant to write Playwright tests for a flow it has never seen. You get clean code, correct syntax, and tests that check nothing that matters. Made-up roles, filler data, guessed status codes. A better prompt didn't fix that. What fixed it was giving the assistant what a senior QA carries in their head, written down in one place it reads before every task. After that, the scenarios came back with the project's real roles, status codes and data. Today we build that place.

[00:34] → E02
I'm Cristian Guerra, I work in QA out of Medellín, and this is module five of the course: Obsidian, your second brain. Phase zero of my method.

## 2. Explained like you're 8

[00:45] → E03
Think about the class notebook. If the first page has the rules of the game written down, who's who, where the balls are kept and what's not allowed, anybody can play well without asking you everything. Even the new kid who showed up today.

An AI is like that new kid, except it shows up new every single day. It doesn't remember yesterday. If the notebook is well written, it reads it and plays like it's been there for months. If there's no notebook, it guesses. And when it guesses, it's wrong with a lot of confidence. Today we're going to write that notebook, and add one rule nobody can skip, not even the AI.

## 3. Theory

[01:31] → E04
Documentation comes before AI. I put it like this: AI without context is a brilliant intern with amnesia. Brilliant, because it writes fast and well. Amnesia, because every session starts from zero. The more you document, the better it starts out.

This is a loop, and it holds up my entire method. You document. The AI reads. It starts with context. It works: designs scenarios, writes Playwright code, triages failures. The tests run and leave evidence, which gets linked back to the notes. And every session ends with a note, so tomorrow picks up where today left off. Documenting feeds the AI, and what the AI produces flows back into the docs.

Obsidian is the tool I use for this: Markdown notes in ordinary folders, linked to each other with double square brackets. Living documentation, for onboarding anyone who joins, including you six months from now, and including the AI.

What makes it living? It gets updated as part of daily work, and it sits where you work. Dead documentation was written once for an auditor and nobody touched it again. It starts lying within weeks, because the system changes and the note doesn't. Living docs are part of the flow: you change something, you update the note, in the same pull request.

[02:56] → E05
Now, not all context goes in the same place. I use three layers.

Layer one: `CLAUDE.md`, or `AGENTS.md` depending on the tool. That's the project's rules: common commands, conventions, what's off limits. It lives in the repo, it's versioned with the code, and any tool that opens the project reads it.

Layer two: persistent memory. Facts about you and how you work that survive between sessions. That layer fixes the amnesia at the level of who you are.

Layer three: Obsidian. The deep knowledge: the flows, the role matrix, known bugs, lessons learned. What the team knows.

Memory is who you are. `CLAUDE.md` is what the project is like. The vault is what the team knows. And one rule for `CLAUDE.md` that isn't up for debate: no secrets, ever. No tokens, no credentials. It's versioned with the repo, so anyone with the repo can read it. Secrets belong in a secrets manager.

[03:57] → E06
Second idea: give enough context, not all of it. Paste the entire vault into every prompt and you dilute what matters and burn through the context window. What works is pointing at the right note. Asking for tests on the payments API? Hand it the note with the contract and the known traps in the dataset, not a description from memory or a list of endpoint names so it can guess.

That's why the vault has an entry note, the map: `00 - READ FIRST`. It's the map, not the territory. Every section links to the note with the detail, and the assistant follows the links it needs.

This is also where MCP comes in, the Model Context Protocol. In one sentence: a standard protocol for connecting tools and data sources to the model. A browser, a database, an API. It lets the model use things instead of you copy-pasting everything into it.

Here's an example of why this pays off. You crack a really strange bug after four hours. If you don't write anything down, the next person who hits it, or you in six months, pays those four hours again. If you write a note with the root cause, the fix, and how to detect and prevent it, those four hours get paid once. And the next time the AI sees something similar, it has the note to read.

[05:29] → E07
Third idea, and the most important one: hooks. A hook is something that happens on its own. Anything you want to happen every time X happens is a hook, not a note.

Why isn't writing it in `CLAUDE.md` enough? Because a prompt, or a written rule, can be ignored. Anything that depends on memory, human or AI, eventually fails. A hook doesn't forget.

In war-paradigm's experiment 03, the `.claude/settings.json` file registers a `PreToolUse` hook for the Bash tool. Before the assistant runs any command, it runs `hooks/block-push-to-main.sh`. If the command is a push to `main` or `master`, the hook exits with code 2, the command is blocked, and the assistant sees the message. And the `Golden rules` note, rule five, says it plainly: hard rules live in hooks; don't look for a way around it, open a pull request.

Like any guard, the hook gets tested. Its suite creates real temporary git repositories, one sitting on main and one on a feature branch, and throws every case at it with each of the hook's three parsers: jq, node and sed. If someone ever breaks the hook, the suite says so before you find out through an accidental push to main.

So here's the question you'll ask about every rule: is this context, is it memory, or is it a hook?

## 4. Lab

[06:57] → E08
Open experiment 03's `vault` folder as an Obsidian vault. Fourteen notes. At the top, two the assistant reads before anything else: `00 - READ FIRST` and `Golden rules`. READ FIRST is the project on one page: what's being tested, which is DocFlow; how it's tested; and a table of where everything lives. Which flows exist? `03 Knowledge`. How do we do something? `02 Workflows`. What did we decide? `01 QA process`. What happened yesterday? `04 Sessions`. How do I start a new note? `99 Templates`.

There are nine Golden rules. Here are three. "Do not invent": no test data, roles or status codes that aren't in `03 Knowledge`; if something's missing, say so and create a task. "Green three times, not once": a test that passed once is a candidate, not a test. And "close the session with a note".

That last one comes with a template, in `99 Templates/Session note`. Four sections: the goal in one line; what happened, linking the notes that changed; the decisions and why, because decisions live there, not in chat; and next steps, each one small enough for a single session. The next day, the assistant reads the latest session note and starts where you stopped. It's the part of the loop people forget most, and the one that saves the most time.

[08:24] → E09
Two lessons are built into the structure. First: structure beats volume. Small, boring, predictable folders are what let the assistant find the right note every time. Second: one note, one question, linked to the rest. When the assistant reads the golden flow, the links also bring in the roles, the known bugs and the data. No guessing.

Look at the `Design scenarios with AI` note. Before asking anything, the assistant reads READ FIRST, the rules, the flow, the matrix and the open defects, so it doesn't rediscover them. The request ends with "do not invent roles or data" and points to the test-data note. And every note opens with frontmatter: `type`, `status` and `tags`.

Your challenge asks for a note that goes "from user story to certification". The vault has a model you can adapt: `Definition of done for a story`. It's a checklist. A story is certified when every line is true: scenarios designed from the acceptance criteria, each with its source; every mandatory requirement covered; a 403 negative scenario for every protected action; boundary cases, minimum, maximum and their neighbors; the golden flow green in the browser; a mutant round with every survivor reported; green three times in a row, not once; evidence attached; and the session note written. Notice that modules one, two and WAR all show up together, on one page.

And the glossary. Keep it simple: a table of terms and what they mean in your project, one line each. The war-paradigm README has a table like that, "Hard words", with suite, mutant, oracle, KILLED, SURVIVED, golden flow and 403. If a kid understands it, so will the AI.

[10:14] → E10
Now, documentation gets tested too. The experiment has a file, `tests/vault-links.test.mjs`, that checks five things: that the two entry notes exist, that the five folders of the loop exist, that every double-bracket link points to a note that exists, that every note has frontmatter with a `type`, and that no note is an island, meaning every note either links out or gets linked to.

Run `npm run test:03` from the repo root. On my run, all five vault checks pass, along with the hook's: 45 out of 45.

One detail in the code worth noticing: the check resolves links by note name, regardless of folder, because that's how Obsidian resolves them. So you can move a note to another folder without breaking anything, but rename or delete it and the check notices. And the island rule doesn't require every note to link out: being linked from somewhere else is enough. A note nobody links to and that links to nothing is a note the AI will never reach by following the map.

[11:23] → E11
With all that, write the `CLAUDE.md` for your course repo. I'll show you the shape, and it's an example, not a file from any repo. A section of common commands: `npm ci`, `npx playwright test`, how to open the report. A section of conventions: conventional commits, one branch per change, where the tests live. A section of what's off limits: no pushing to main, no inventing data, no committing `.env`. And a link to the vault's READ FIRST for everything else. Short. And without a single secret.

## 5. This week's WAR mutation

[11:58] → E12
This week's mutation: delete a linked note and check that your link checker notices.

I'm picking `Test data - users`, in `03 Knowledge`. Before deleting it, I look at who links to it: six notes. READ FIRST, the strategy, the AI design workflow, DEF-001, the golden flow and the flow template. Prediction: the link check fails and lists those six.

Why that one? Because it's one of the most linked notes in the vault, and it's the one that stops the AI from inventing users. If it disappears and nobody notices, the "do not invent" rule ends up pointing at nothing.

[12:38] → E13
I delete the note in a copy and run `npm run test:03`. Result: 45 tests, 44 pass, one fails. The one failing is "every wikilink resolves to a note". And the message carries the exact list: `00 - READ FIRST.md` points at `Test data - users`, so does `Test strategy.md`, and so on for all six. Prediction confirmed: KILLED. I restore the note and it's back to 45 out of 45.

[13:05] → E14
Now, a nuance I want you to think about. The module's question bank has a question saying a link to a note that doesn't exist yet isn't always a mistake: in a living vault it can be a marker for work still to do, and the graph shows you the gaps. Meanwhile the repo's check turns it into a build failure. Do they contradict each other? No. While you're writing, a broken link tells you what still needs documenting. But the template you publish, the one an AI will read as its source of truth, can't have links that lead nowhere. Decide where that line sits in your project, and write it into your rules.

## 6. The challenge and how it's graded

[13:51] → E15
The deliverable is your base vault plus the `CLAUDE.md` for your course repo. The vault holds the project rules, a glossary and a "from user story to certification" note.

Checkable criteria. One: the vault has an entry note, READ FIRST, that links to the others. Two: no note is isolated and no link points to a note that doesn't exist. Three: the `CLAUDE.md` or `AGENTS.md` contains no secrets.

The rubric has four levels: one, the deliverable is missing; two, it's there but a criterion fails; three, pass; four, on top of that a test breaks the build if there's a broken link or an isolated note, like `vault-links.test.mjs` in experiment 03. And you pass the module with the challenge at level three and the quiz, six out of eight.

## 7. Mini-quiz

[14:43] → E16
Three questions. Pause if you like.

One. Under the three context layers, where do the project's rules live? A: in the AI's persistent memory. B: in `CLAUDE.md`. C: in a loose Obsidian note. D: in each day's prompt.
[pausa 5 s]
B. `CLAUDE.md` holds the project's rules, memory holds facts about you, and Obsidian holds the deep knowledge.

[15:10] → E17
Two. You want something to happen every time X happens, say whenever a file is saved. Under the method, that's: A: a reminder note in Obsidian. B: a hook. C: asking the AI every time. D: personal discipline.
[pausa 5 s]
B. Whatever has to happen on its own gets configured. Whatever depends on human memory eventually fails.

[15:37] → E18
Three. What should never go in the repo's `CLAUDE.md`? A: common commands. B: naming conventions. C: tokens, credentials or secrets. D: test style rules.
[pausa 5 s]
C. `CLAUDE.md` is versioned with the repo and any tool can read it.

## 8. Wrap-up

[15:57] → E19
Three ideas. One: AI without context is a brilliant intern with amnesia; documenting first is what makes it useful. Two: three layers, `CLAUDE.md` for the project, memory for you and the vault for the team, and you give enough context, not all of it. Three: anything that must always happen is a hook, and documentation gets tested too.

Next module is TypeScript for QA: types, async and await, and validating at runtime what the compiler can't see. Links are in the description.

# Script EN · Module 18 · m11 — AI-augmented QA

_Narration words: 2507 · estimated runtime 16:58 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it goes with. Lines starting with `>` are production notes and are not read aloud.

## [00:00] → E01 · Hook

A small app: sign in, create a post, approve it, publish it. Every happy-path test is green.

Then I run seven mutants, each one breaking a single step on purpose. Five get killed: the app answers 403, 422, 409, 401. But two survive. An editor calls the roles endpoint and makes themself an admin. The app answers 200. That editor can now approve and publish alone. The other one I found while preparing this course: a viewer creates a draft and the app answers 201.

And the whole happy path was still green. When the code and its tests come from the same place, which happens more and more with AI, a green run proves less than it seems. Today: generating tests with AI without trusting it blindly.

## [00:51] → E02 · Title

Module eighteen: AI-augmented QA. It's what sets me apart as a QA engineer, and now it's yours. It comes near the end of the course for a reason: AI amplifies people who know what they're doing and confuses people who don't. If you can't evaluate what it hands you yet, you can't tell correct from plausible.

## [01:14] → E03 · Explained like you're 8

Imagine you have a super-fast homework helper. You say "do my sums," and one second later you get the sheet back, all filled in, in neat handwriting.

The problem is that sometimes it's wrong. And when it's wrong, it doesn't hesitate: it hands you the wrong answer with the same confident face as the right one. No warning.

So here's the deal: the helper does the work fast, but you check every sheet before you hand it in. If you can't add, you can't check. That's why you learn to add first, and then you use the helper.

And there's a trick to find out whether your checking works: the teacher hides a mistake on purpose in a sheet that was already right. If you find it, your checking has eyes. If you miss it, someone else will find it for you, and that's worse.

## [02:12] → E04 · Theory 1: the director AI plans, the IDE AI executes

The core model of my method is this: a director AI plans, and another AI, sitting right in your IDE, executes. Splitting planning from execution works better than one AI doing everything, and it works with any pair of tools.

The director, Claude Code for example, holds the broad context and builds the plan. The executor, Copilot or Cursor for example, works right on top of the file you're editing. And there's a third role you never delegate: you, the judgment. You review every diff.

This isn't tool marketing. They're different workloads: planning needs broad context, executing needs to be right on top of the code.

## [02:54] → E05 · Code: the file that connects the two AIs

How does the executor find out about the director's plan? Through an instructions file. For Copilot, according to its docs, it goes in dot github slash copilot-instructions.md. In Cursor, they're the rules. I call it "the CLAUDE.md of the IDE": the artifact that makes the executor inherit your conventions and constraints instead of improvising its own style.

And here's a rule I repeat a lot: context before prompt. A brilliant prompt on poor context gets you very little. I build context in three layers. CLAUDE.md, with the rules. Persistent memory, with facts about you and how you work. And an Obsidian vault, with the project's knowledge.

## [03:36] → E06 · Code: the second brain

You can see that third layer built out in war-paradigm, experiment three, "second brain." The specimen is honest: an assistant asked to write Playwright tests for a flow it has never seen. Clean code, correct syntax, and it tests nothing that matters.

What fixed it wasn't a better prompt. It was giving the assistant the same knowledge a senior QA carries in their head, written down in one place it reads before every task. A vault with a "read first" note, golden rules, and five predictable folders: QA process, workflows, knowledge, sessions and templates.

Look at golden rule number four: don't invent. No test data, roles, status codes or requirements that aren't in the knowledge folder. If something's missing, say so and create a task. Don't fill the gap with a guess.

The README draws two lessons from the structure. Structure beats volume: small, boring, predictable folders are what let the assistant find the right note every time. And one note answers one question and links to the rest. When the assistant reads the golden flow, it also gets the roles, the known bugs and the data. Even the vault has a test: a checker fails the build if a link points to a note that doesn't exist, a note has no frontmatter, or a note ends up as an island.

## [05:05] → E07 · Theory 2: the five blocks of a good prompt

Now, the prompt itself. Five blocks. Context, input, instruction, constraints and expected output. Each block removes a whole class of failure: without constraints, the AI invents scope; without an expected output, the format is a lottery.

Look at the request in the vault's "Design scenarios with AI" note. Before asking, the assistant reads the read-first note, the rules, the flow note, the roles matrix and the open defects. That's the context. The input is the acceptance criteria for story US-42. The instruction: design scenarios. The constraints: don't invent roles or data, use the test users note, one negative scenario per protected action, and the four boundary cases for the title. And the expected output: for every scenario, an id, title, actor, action, expected status, steps, and the source in the story.

The same note says what to do after the answer comes back. Score the plan against the acceptance criteria: musts block, shoulds add to the score, and anything without a source gets rejected. Then run the same request three times. If the verdict flips, the finding is about the prompt or about what you didn't pin, the model, the temperature or the prompt version. Not about the story.

## [06:24] → E08 · Theory 3: prompt packs

When you do a task twenty times, it deserves a tested template. That's a prompt pack: reusable recipes with gaps marked between angle brackets. Generating scenarios from a story, reviewing a contract, triaging a CI failure. In my experience it takes you from ten minutes to one.

The hand-made prompt you write from scratch every time reinvents mistakes you'd already solved. The pack keeps them solved.

And a pack isn't complete without its review checklist. The pack saves you time writing. The checklist is what protects you when the AI gives you back something plausible and wrong.

## [07:03] → E09 · Theory 4: AI is confidently wrong

Human in the loop. The line to tattoo on your arm: AI is confidently wrong. Its mistakes arrive in a confident tone, and the tone has nothing to do with whether it's right. That's why you always review the diff, no matter how convincing it sounds.

What do you look for first when you get a generated suite? Three classic habits AI uses to make tests pass: weak assertions, like expecting true to be true; loose schemas that accept anything; and brittle selectors. AI optimizes for passing, not for validating. And a green test that asserts nothing is worse than no test, because it gives you false confidence.

Another classic: the AI generates a test against POST slash users slash validate, and that endpoint doesn't exist in the contract. It made it up, with total confidence. The antidote: the contract goes into the prompt as input, and the diff gets reviewed against it.

Two more golden rules from the vault belong here. Rule six: every failure gets a verdict, product bug, test bug, environment or data, and you never "fix" a test so it passes against a wrong response. And rule seven: green three times, not once. A test that passed once is a candidate, not a test.

## [08:26] → E10 · Theory 5: the mental test for delegating

What do you hand to AI and what don't you? I ask myself four questions. Is the responsibility mine? Does it need business or risk judgment? Is it irreversible for the outside world? Is it mechanical, following a clear convention?

Examples. Generating steps from an OpenAPI contract: mechanical, clear convention. Delegate it. Writing a Page Object that follows the repo's pattern: same. Formatting the evidence report: also. But deciding whether a contract mismatch blocks the release: that's business and risk judgment, and the responsibility is yours. That doesn't get delegated.

And the flip side: don't use AI for a task you can't evaluate yet. If you don't know the subject, you won't tell correct from plausible.

## [09:13] → E11 · Code: hard rules live in hooks

Some rules can't depend on the AI remembering them. A prompt can be ignored. A hook doesn't forget.

In that same experiment three in war-paradigm, the dot claude slash settings.json file registers a Claude Code PreToolUse hook for the Bash tool, which runs hooks slash block-push-to-main.sh. That script reads the tool call as JSON and exits with code 2 when the destination is main or master. Claude Code's docs confirm it: in PreToolUse, exit code 2 blocks the call, and the error message reaches the assistant.

The README shows the cases: git push origin main, blocked. A force push to HEAD colon main, blocked. npm test and then a push to master, blocked. A push to a feature branch, allowed. And I don't just take it on faith: the guard rail gets tested WAR-style, with 40 cases trying to sneak through, including chained commands and global git options. Six of them still get through, like `sh -c` or a branch in a variable, and they're pinned as known limits: a regex hook is a barrier against mistakes, not a sandbox. The hook understands refspecs, force flags, git dash C with another folder, and a bare git push, by working out which branch you're on. It parses the JSON with jq, falls back to node, and then to sed. And the tests run against real temporary git repos, on main and on a feature branch, with all three parsers.

Golden rule five says it plainly: don't look for a way around the hook. Open a pull request.

## [10:55] → E12 · Terminal: AI output changes, your verdict can't

And if the AI produces something different on every run, how do you decide whether it passed? Experiment one in war-paradigm, "AI verdict," handles it like this.

Two questions, two oracles. Does it run as specified? That's deterministic: schema, roles, status codes. Is what it produced any good? That's a score against explicit acceptance criteria: musts block, shoulds add up, and the gate is seventy.

Look at the npm run demo output in the README. Pinned set: a versioned model, temperature zero, prompt version three. Three runs, approved at 86, 84 and 87. Verdict: stable. Unpinned set: temperature one, prompt "latest." Run one approved at 83, run two approved at 74, run three rejected at 76. Verdict: unstable.

Look at that third run: it scores 76, above the gate, and it's still rejected, because two scenarios lost their source and one lets an editor approve their own draft. That's what musts are for. Scores may move. The verdict may not.

And an honest caveat, which the README makes itself: those six runs are recorded fixtures, written by hand for the experiment in the shape of what a planning agent typically returns, and deliberately deterministic so the demo needs no key. What's real is the code that grades them: the checks, the criteria, the scorer and the stability check. If you want a real agent behind it, the experiment ships an adapter you switch on with an environment variable.

## [12:30] → E13 · Theory 6: MCP and Playwright MCP

Last piece of theory: MCP, the Model Context Protocol. It's how you connect tools to the model. With Playwright MCP, the assistant drives a real browser: it runs flows, reads the DOM and checks things.

What changes? AI goes from writing tests that might work to actually testing and correcting itself based on what it sees. That's why the combination of Playwright, MCP and a coding assistant shows up more and more in QA job postings.

But the rules don't change. An AI that can open a browser doesn't become the oracle. The oracle is still the contract, the acceptance criteria and your review.

## [13:12] → E14 · Lab, step by step

Your turn. Step one: generate a suite from an API contract or a user story, with a director AI and an executor AI. Pass the contract in as input, use the five blocks, and review every diff before you accept it.

Step two: run every generated test. A test you never ran isn't a test.

Step three: build your prompt pack, with marked gaps and a usage example, plus its checklist for reviewing LLM output. Use what we covered: weak assertions, loose schemas, brittle selectors, endpoints that aren't in the contract, and invented data.

The course criteria: every generated test was run and carries your review in the diff. The prompt pack has marked gaps and a usage example. And the checklist catches at least one real LLM mistake. If it caught none, either you didn't look hard enough or you didn't ask it for enough.

## [14:10] → E15 · This week's WAR mutation

This week's mutation goes straight at the risk from the hook. AI writes the checks too. So mutate the product and see whether the generated tests turn red.

Write your prediction first: which product change should break which test. Then break one rule in the app, just one, and run the generated suite. If it stays green, you've found a test with no teeth, and that goes into your checklist.

In war-paradigm you can see the full cycle. The self-grant mutant survives and gets printed in red as a known finding, next to viewer-create. If you run with MUTANT_LAB_STRICT set to one, each survivor fails the run. The root cause is documented in the defect note, DEF-001: the roles endpoint reuses the "members can edit their own profile" rule, which says admin or the same user. The check meant for profile fields ended up covering the role field too.

And the README shows you how to kill it: change the rule so only an admin can change roles. Run the mutants again, the endpoint answers 403, and the scoreboard says FIXED.

## [15:23] → E16 · The challenge and how it's graded

The deliverable: the AI-generated suite, with the diff reviewed; the prompt pack; and the review checklist.

The top level: you mutate the product and show that the generated tests turn red. With the prediction written beforehand, the run output, and a link to the mutation's diff.

## [15:41] → E17 · Mini-quiz

Three questions. Pause if you like.

First: according to the mental test, which task do you not delegate to AI? Deciding whether a contract mismatch blocks the release. Risk judgment plus responsibility equals human.

Second: "AI is confidently wrong" means... its mistakes arrive in a confident tone. You always review the diff.

Third: the AI generated a test against POST users validate, and that endpoint isn't in the contract. What happened? A hallucination. The contract goes in as input, and the diff gets reviewed against it.

## [16:31] → E18 · Wrap-up

Three ideas. One: the director AI plans, the IDE AI executes, and you decide. Two: context before prompt, and hard rules in hooks, not in prompts. Three: if AI writes both the code and the tests, mutate the product to find out whether those tests have teeth.

In the next module we stay with AI, under a stricter rule: the assistant tests, the person signs. See you there.

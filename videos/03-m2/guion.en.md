# Script · Module 03 · Test design & techniques

> Voice-over: Cristian Guerra, first person, natural English (adapted, not translated). Animated video, no camera.
> Pace: 150 words per minute. Timestamps were computed from that pace plus the quiz pauses.
> Module source: `qa-automation-course/i18n/es/modules-01-14.json` (m2) and `quiz-01-10.json` (m2). Lab: the DocFlow app in `war-paradigm/experiments/02-mutants` and story `US-42` in `experiments/01-ai-verdict`.

## 1. Hook

[00:00] → E01
I changed one number on the server. A document's maximum title length went from 80 characters to 79. I ran the whole suite: the golden flow in the browser and all six mutants. Seven tests, same scoreboard as always. Nothing noticed. Now a user with a title of exactly 80 characters gets an error they never used to get, and my tests are perfectly happy. The tool isn't the problem. Nobody designed the 80-character case. That's what this module is about.

[00:32] → E02
I'm Cristian Guerra, I work in QA out of Medellín, and this is module three of the course: test design and techniques.

## 2. Explained like you're 8

[00:41] → E03
Imagine a game that only lets in kids from 8 to 12. Do you test every age, one by one, from zero to a hundred? No. You test 7, who shouldn't get in. 8, who should. 12, who should. And 13, who shouldn't. Why those four? Because bugs hide right at the door. Whoever wrote the game might have typed "older than 8" when they meant "8 or older", and now the 8-year-old is stuck outside, crying.

That's test design: not testing more, testing where the bugs are. And there are techniques for it, the way a football team has set plays. Today I'll show you the six I use most.

## 3. Theory

[01:26] → E04
Developers automate fast, but often without a clear idea of what to test. These techniques get you more coverage with fewer cases. That's the difference between someone who writes scripts and a quality engineer.

First, the map. Levels tell you how big a piece you're testing: unit, one function; integration, a few pieces talking to each other; system, the whole application; acceptance, against what the business asked for. Types tell you why you're testing: functional, does it do what it should; regression, does what used to work still work; smoke, a quick pass to see if it's worth going further; sanity, a short, focused check after a change.

And one rule for the whole module: a well-written test case has a precondition, data, numbered steps and an observable expected result. If someone else can't run it and decide pass or fail without asking you, it isn't a test case. It's an intention.

[02:26] → E05
Technique one: equivalence partitioning. You group inputs into classes where the system should behave the same way, and you test one representative from each class.

Today's lab is DocFlow, the app from experiment 02 in war-paradigm. To create a draft, the title has to be between 3 and 80 characters. Partitions: one valid, 3 to 80. Two invalid ones around it: under 3 and over 80. And one people forget: the wrong data type. You can see it in the server code. If the title isn't a string, it becomes an empty string, which lands in "under 3". It also trims whitespace off both ends before measuring. So "ab" with two spaces on each side isn't a six-character title. It's two characters, and the server answers 422. I tried it against the app, and that's what it does. That partition, "text with padding", only shows up if you read the code, or if you think like the person who wrote it.

The title doesn't come alone, either. The same form needs an owner. Owner partitions: the email of an existing member, which is valid; an empty owner; and an email that doesn't belong to anyone. According to the code, those last two return 422 with "owner is required". The suite's `drop-input` mutant covers the empty owner. Nothing covers the unknown email.

[03:55] → E06
Technique two: boundary value analysis. Off-by-one bugs live on the edges of your partitions. For every edge, you test the edge and its neighbor on each side.

For DocFlow's title that's four values: 2, which should return 422; 3, which should return 201; 80, which should return 201; and 81, which should return 422. I'm not making these up: user story US-42 lists them as boundaries B-1, B-2, B-3 and B-4. Against the real app, all four answer as expected.

Now look back at the hook. DocFlow's suite has a boundary mutant, but it only tests 81. One side of the door. So when I moved the maximum to 79, nothing found out: 81 is still rejected, and nobody asks about 80. A boundary moved by one is exactly the mutation your suite should kill. And to kill it, you need the edge and both neighbors.

[04:53] → E07
Technique three: decision tables. When the outcome depends on several conditions combined, you lay them out in a table and look at every combination. That way no rule gets orphaned.

In DocFlow, the table that matters most is the permission matrix, which lives in the vault as `Roles and permissions`. Four roles, viewer, editor, approver and admin, against four actions: create a draft, approve, publish, and change a member's role. Every cell gives the expected status. Create: viewer 403, everyone else 201. Approve: only approver and admin, with 200. Publish: everyone except viewer. Change a role: admin only.

The note adds a precedence rule: a forbidden role always gets 403 before any validation, 422, or state check, 409.

With that you can build the decision table for create. Three conditions: can this role create? Is the title valid? Is the owner valid? Three yes-or-no conditions make two to the third, eight combinations. If the role can't create, the four columns on that side all say 403, whatever the title and owner, because of the precedence rule. If the role can, only the column with a valid title and a valid owner returns 201; the other three return 422. Eight columns, eight cases, and no rule left untested.

Here's what happened while I was preparing this video. I walked the table cell by cell against the app. And the "viewer creates a draft" cell doesn't return 403. It returns 201. The viewer creates the draft, no problem. And if the viewer sends a two-character title, they get 422 instead of 403, so the precedence rule doesn't hold for create either. The code shows why: the create route never checks the role. None of the experiment's six mutants touched that cell. That's what a decision table does: it shows you the combination nobody wrote down. So the cell became a seventh mutant, `viewer-create`, and it survives: the scoreboard now reads five of seven, with two known survivors. The WAR Paradigm found a hole in its own example app.

[07:08] → E08
Technique four: state transition testing. A DocFlow document goes from draft to approved, and from approved to published. Anybody covers the happy path. What this technique gives you is the transitions that shouldn't exist.

Publishing a draft that was never approved: the app returns 409, "document must be approved before publishing". Approving something that isn't a draft anymore: according to the code, 409, with a message that names the document's current state. Paying twice, shipping twice, moving a state backwards: that's where business-logic bugs live. In DocFlow's suite, the `reorder` mutant is exactly this: it tries to publish before approval and expects a 409.

[07:49] → E09
Technique five: pairwise testing. With many parameters, the full set of combinations explodes. Four parameters with three values each is 81 combinations. Pairwise gives you a small subset that covers every pair of values, because most interaction bugs are triggered by two parameters at once, not four. For that 81 case, the course's question bank puts it at roughly 9 to 12 cases.

Here's a sanity check that keeps you honest: a pairwise set can never be smaller than the product of the two largest parameters. In DocFlow, role times action alone is 4 times 3, twelve pairs. If a tool hands you fewer than twelve, something's off. To generate it, the course recommends PICT, Microsoft's tool, linked in the resources.

Technique six: error guessing. It isn't pure guesswork. It feeds on experience, past bugs and the failure patterns typical of a domain. In DocFlow, the historical bug is DEF-001: a rule meant for "edit my own profile" ended up also covering "change my own role". That pattern, reusing an "it's mine" rule for something that shouldn't be yours, is something you go looking for in every new system.

[09:05] → E10
Two more things before the terminal. Session-based exploratory testing, SBTM, which we covered in module one: a charter, a timebox and notes. Today's techniques tell you what to hunt for inside that session.

And bug reports. A report you can defend has steps, expected versus actual, environment and evidence. Look at DEF-001 in the vault: it names the rule it breaks, gives two exact steps, the expected 403, the actual 200, the root cause down to the line of code, and where the evidence lives. Anyone can reproduce it without asking you a thing. "The form fails sometimes" isn't a bug report.

And watch out for severity versus priority, because they're different axes. A typo in the homepage title has low severity, since technically nothing breaks, and high priority, because every single user sees it.

## 4. Lab

[09:59] → E11
Open DocFlow's server code, `experiments/02-mutants/app/server.js`. Near the top is the `TITLE_MAX` constant, set to 80. Further down, the route that creates documents: it trims the title, checks it's between 3 and `TITLE_MAX`, and checks the owner exists. Notice what isn't there: nothing asks about the role. Also open `fixtures/story-US-42.json` from experiment 01: that's where boundaries B-1 to B-4 live. That's your source of truth for boundary values.

[10:26] → E12
Now start the app and play with it. From `experiments/02-mutants`, run `npm run app` and open `http://localhost:4310` in the browser. The users are `viewer@demo.io`, `editor@demo.io`, `approver@demo.io` and `admin@demo.io`, all with the password `demo123`. Sign in as the editor, create a draft, sign out, sign in as the approver and approve it. That's the golden flow. Then sign in as the viewer and compare what the screen lets you do with what the API lets you do. The UI hides buttons. The API is the contract.

[11:00] → E13
In the terminal, `npm run test:mutants` runs the seven mutants against the API. Role-swap, KILLED with 403. Drop-input, KILLED with 422. Reorder, KILLED with 409. Stale-token, KILLED with 401. Boundary, KILLED with 422. Self-grant, a known survivor, with 200. Viewer-create, the cell from the table, the other known survivor, with 201. And if you open `tests/scenarios.ts`, you'll see the `boundary` mutant sends a title of `'x'.repeat(81)`. Eighty-one. Only that side of the edge.

Your lab job is to design the test suite for this form using every technique: partitions, boundaries, the permission table, states, pairwise and error guessing. For each technique, the cases and the reason you used it.

Here's how I'd start. Partitions for title and owner, one case per class. Boundaries: 2, 3, 80 and 81, with the status the story expects. The create table, all eight columns. States: publish a draft, approve twice, publish twice. Pairwise over role, action and session state. And error guessing: any route where "it's mine" opens a door, starting with roles. Next to each group, one line saying why. That line is what a reviewer will ask you for.

[12:14] → E14
And you report defects with a template. Experiment 03's vault has `DEF-001 self-grant role` as an example and `99 Templates/Defect note` as the template. Steps, expected versus actual, role, environment and evidence. The "viewer creates a draft" cell I showed you a minute ago is a good candidate for your first report: reproduce it, write it up with that template, and link it to the rule it breaks.

## 5. This week's WAR mutation

[12:42] → E15
This week's mutation comes straight from the module: a boundary moved by one is exactly the mutation your suite should kill. I'm going to move `TITLE_MAX` twice, once in each direction, and write the prediction down before each run.

First: from 80 to 81. Prediction: the `boundary` mutant sends 81 characters, the server now accepts it with a 201, so that scenario should fail and the suite should go red.

[13:10] → E16
I run the suite. One test fails: boundary. The scoreboard says SURVIVED boundary, "Mutation was accepted with HTTP 201", four of seven caught. Careful how you read that. For the scoreboard, the 81-character scenario survived because the app accepted it. But for my server mutation, that failure is exactly the shout I was waiting for. The suite noticed. My mutation: KILLED.

[13:34] → E17
Second: from 80 to 79. Honest prediction: I don't think anything notices, because no test sends exactly 80 characters expecting a 201. I ran it on the repo as it was when I prepared this video. Golden flow green, five KILLED, the usual known survivor. Five of six, the same scoreboard as the unmutated run. My mutation: SURVIVED.

Real bug or blind spot? Blind spot. The story does require 80 to be accepted, that's boundary B-3, but the suite has no case for it. The fix isn't on the server. It's adding a scenario with 80 characters that expects a 201. That scenario is part of your challenge. And it goes in my table as is: SURVIVED, blind spot, next step, case B-3. I already took that next step in the repo: `golden.spec.ts` now sends exactly 80 characters and expects a 201 and the title in the list. With 79 that test fails with a 422, so if you repeat this mutation today, it's KILLED.

## 6. The challenge and how it's graded

[14:40] → E18
The deliverable is a test suite with the technique applied, plus three bug reports with evidence.

Checkable criteria. One: every technique shows up applied, with its cases and the reason for using it. Two: boundary values include the edge and the neighbor on each side. Three: all three bug reports can be reproduced from what's written alone, without asking you anything.

The rubric has four levels. Level one: the deliverable is missing. Level two: it's there, but a criterion fails. Level three, pass: it meets all three. Level four: you also generate the pairwise set with PICT and show how many cases it saved compared to every combination. You pass the module with the challenge at level three and the quiz, six out of eight.

## 7. Mini-quiz

[15:30] → E19
Three questions from the bank. Pause if you like.

One. A field accepts integers from 1 to 100. Which set applies boundary value analysis best? A: 1, 50 and 100. B: 0, 1, 100 and 101. C: 2 and 99. D: minus 5 and 500.
[pausa 5 s]
B. The limits and their immediate neighbors, 0 and 1, 100 and 101, are where off-by-one bugs live.

[16:00] → E20
Two. An order goes from draft to paid to shipped. What does state transition testing give you that other techniques miss? A: the full happy path. B: the invalid transitions, like going from shipped back to draft, or paying twice. C: the amount limits. D: the date format.
[pausa 5 s]
B. The state diagram exposes the transitions that shouldn't exist, and that's where business-logic bugs live.

[16:31] → E21
Three. A typo in the homepage title: "Welcomee". Severity and priority? A: high severity, high priority. B: low severity, high priority. C: high severity, low priority. D: low severity, low priority.
[pausa 5 s]
B. Minimal technical impact, but every user sees it. They're independent axes.

## 8. Wrap-up

[16:53] → E22
Three ideas. One: you don't test more, you test where the bugs are; partitions and boundaries, with the edge and both neighbors. Two: decision tables and state diagrams show you the combinations nobody wrote down, like a viewer creating a draft. Three: every technique is a mutant factory; if you move a boundary by one and your suite doesn't shout, you're missing a case.

In the next module we get the environment ready: Node, git, the Playwright project and your first pull request. Links are in the description.

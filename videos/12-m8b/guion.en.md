# Module 8b · Sign-off — certifying a story, the close of the method

English narration script, adapted (not translated) from the Spanish version. Voice: Cristian, first person. Reference pace: 150 words per minute. The `[mm:ss]` marks are computed at that pace; each block names its scene in `escenas.json`.

## 1. Hook

**[00:00] → E01**

In war-paradigm I have a small app with a golden flow: an editor creates a document, an approver approves it, and the editor publishes it. The test for that flow is green. If I'd signed off the story on that green, I would have certified a privilege escalation bug.

Because an editor could change their own role to admin, and the app answered 200. With that, the editor approves and publishes alone. Every happy-path test was green while that bug was still open. A mutant found it, not the green.

**[00:36] → E02**

This is Module 8b: sign-off, certifying a story. It's the close of the method. You'll learn to leave a story certified with evidence and traceability, so anyone can audit what was tested. And one thing that's not up for negotiation: a human signs the sign-off.

## 2. Explained like you're 8

**[00:54] → E03**

Signing off a certification is like the teacher signing your report card. The teacher only signs after seeing the grades. Not because somebody said "relax, everything's fine".

And if a subject doesn't have a grade yet, the teacher doesn't make one up. She writes "pending", so your parents know what's missing.

Her signature means: "I checked this and I stand behind it". That's why a rubber stamp can't do it.

## 3. Theory

### Block 1 · What "certified" means, and why a human signs

**[01:22] → E04**

Let's start with a difference people mix up all the time. A developer's "done" means the code is merged and working. "Certified" means tested against its criteria, with evidence and traceability on record. Between "it works in the demo" and "I can prove what was tested and what wasn't" there's a canyon. That canyon is your job.

That list of conditions is called a Definition of Done. The certification one isn't "everything green in CI". It's a list of checkable conditions: linked scenarios, a recorded run, attached evidence, declared known defects. If a condition can't be checked, it isn't part of the Definition of Done. It's a feeling.

**[02:05] → E05**

Why does a human sign? Because signing means making a risk judgment and taking professional responsibility. Your signature says "this was tested". Automating the signature means automating accountability, and in this course that's off the table.

Now the hard situation, because it will happen. The deadline is on top of you, and you're being pushed to sign with 30 percent of the suite not run. What do you do? You don't sign completeness that doesn't exist. You present the real status: what was tested, what wasn't, and the risk of what's pending. The business has every right to accept that risk. But it accepts it in writing and under its own name, not inside your signature.

### Block 2 · The standard chain, with real links

**[02:52] → E06**

The chain is the same as in Module 8: requirement, test case, execution, evidence. How the close gets recorded varies by company: a comment on the ticket, a field in the test management tool, or the pull request description. The chain doesn't vary.

**[03:09] → E07**

Here's what a story with linkable requirements looks like. In war-paradigm, experiment 01 uses story US-42: approve and publish a document. It has six requirements with IDs and priorities. R-1, must: an editor can create a draft with a title of 3 to 80 characters and an owner. R-2, must: only approvers and admins can approve; anyone else gets 403. R-3, must: a document can only be published after it's approved; otherwise 409. R-4, must: viewers can't publish, 403. R-5, should: an expired session is rejected with 401 on any step. R-6, should: a draft without an owner is rejected with 422. And four boundaries: titles of 2, 3, 80 and 81 characters.

**[03:54] → E08**

In that same experiment there's a blocking criterion: every scenario cites its source in the story, as US-42 slash R and the number. If a scenario doesn't say where it comes from, the plan is rejected, whatever the score. That's a link in its simplest form: an ID pointing to a requirement.

**[04:15] → E09**

That experiment leaves you another useful idea for signing off: split two questions. The first, "does it run as specified?", is deterministic: schema, roles, actions and status codes, and the answer is pass or fail. The second, "is what it produced any good?", is answered with a score against explicit acceptance criteria, and every criterion comes with evidence computed by code.

Must criteria block: if one isn't met, the result is rejected, whatever the score. Should criteria add to the score. And if the score lands below 70, it's rejected too. The README says it plainly: the gate is a number the team agreed on, not a vibe.

And there's a case in the recorded runs that shows it perfectly. In the unpinned set, run 3 scores above the gate and is still rejected: two scenarios lost their source, and one lets an editor approve their own draft. The score says "approved"; the musts say no. That's what they're for.

The same input also runs three times. If the verdict changes between runs, the judge is what failed. A defensible green looks like that: rules written beforehand, evidence per criterion, and a result that repeats.

**[05:33] → E10**

And the link has to be real. Every scenario linked to its case in the test management tool, with no broken links and no "to be resolved" placeholders. The mechanism depends on the tool: a tag on the scenario, an ID in the test title, an annotation. What doesn't change is that the link exists and leads somewhere.

An unresolved placeholder breaks the audit chain. And notice the difference: an honest red, documented as a known defect, doesn't invalidate anything. What invalidates is the lie.

### Block 3 · Self-contained evidence

**[06:07] → E11**

"The evidence is on my machine; if anyone asks, I'll send it." That doesn't fly for a sign-off. Whatever isn't recorded in the chain doesn't exist for the audit. The sign-off has to outlive you: if you go on vacation, or leave the company, the whole chain has to be rebuildable without you.

"It's in CI" doesn't fly either. In Module 8 we saw restful-booker upload its report with a 14-day retention. CI servers rotate and delete artifacts.

That's why the method asks for a self-contained, single-file report that gets attached to the ticket and opens anywhere, years later. The spendwise report works like that: one HTML file with all the evidence embedded that opens without the rest of the repository. Allure also has a single-file report option, and it's in the module resources.

### Block 4 · Errors that invalidate a sign-off

**[07:00] → E12**

Three errors invalidate a certification. One: an indefensible green, meaning a green you can't explain with evidence if you're audited. Two: unresolved traceability, links that lead nowhere, or placeholders. Three: missing evidence.

And a fourth trap, subtler. A story with two scenarios excluded with `@IGNORE` because of a vendor bug, with an open ticket. Can you certify it? No. A well-done `@IGNORE` manages the run. But closing the story requires the excluded part to be resolved. With known defects open, the story stays open. You communicate the status; you don't sign completeness that doesn't exist.

For the challenge's third criterion, your checklist has to name those errors one by one. I'd write them as yes-or-no questions. Is there any green I can't explain with evidence? Is there any link that leads nowhere or says "to be resolved"? Is evidence missing for any reported case? Is there an open `@IGNORE` or `test.fail` on this story? Did any green pass only once? Did any mutant survive without a report? Does the evidence contain passwords or tokens? If any answer is yes, you don't sign; you communicate the status.

### Block 5 · Your certification Definition of Done

**[08:15] → E13**

Here's the one I wrote for the war-paradigm vault. It's called "Definition of done for a story", and it says: a story is certified when every line below is true.

Scenarios designed from the story's acceptance criteria, each one citing its source. Every must requirement covered by at least one scenario. A negative 403 scenario for every protected action in the role matrix. Boundary cases: min, max, min minus one, and max plus one. The golden flow green in the browser. A mutant run: every mutant killed, or every survivor reported. Green three times in a row, not once. Evidence attached, trace or video, for anything reported. And the session note written.

Notice "green three times in a row". A test that passed once is a candidate, not a test.

**[09:07] → E14**

Who defines the Definition of Done? Not each QA engineer on their own. The team agrees on it once, and it applies equally to everyone. Your personal checklist is your implementation of that agreement. One Definition of Done per person means a random standard per story.

**[09:25] → E15**

And a sign-off isn't always a plain yes or no. Look at two real decisions. In restful-booker, the recommendation is a no-go for a production contract that supports XML, decimal prices or unvalidated dates. But a JSON-only demonstration can go ahead if integer prices and validated dates are enforced upstream and the status-code defects are logged. In spendwise, the executive summary says: release with conditions, once points 1 through 3 are resolved and their tests pass.

That's a sign-off with judgment: what can ship, what can't, and under which conditions.

## 4. Step-by-step lab

**[10:01] → E16**

On to the lab. At the war-paradigm root there's a shortcut for everything: `npm ci`, `npx playwright install --with-deps chromium`, and `npm test`. For experiment 02, `npm test` runs the golden flow in the browser plus the seven mutants against the API. According to its README, the result is five of seven mutants killed and two known survivors: self-grant, and viewer-create, which I found while preparing this course.

Run `npm test` three times in a row. That's the "green three times" from the Definition of Done. If the result changes in any of the three, you don't have a test yet; you have a candidate.

**[10:43] → E17**

Now the core exercise: for each requirement in US-42, which mutant attacks it? I built this mapping myself by reading `scenarios.ts` against the story. R-2, only approvers approve: the role-swap mutant, a viewer trying to approve, expects 403. R-3, publish only after approval: reorder, expects 409. R-5, expired session: stale-token, expects 401. R-6, draft without an owner: drop-input, expects 422. Boundary B-4, an 81-character title: boundary, expects 422. R-1 is the golden flow itself. And self-grant attacks a rule added to the role matrix on September 24: nobody changes their own role. Viewer-create attacks the story's permission table, where creating is only for editors, approvers and admins: a viewer gets a 201 instead of a 403, so it survives too.

See the gap? R-4 says viewers can't publish. No mutant on the list attacks that rule. Same for boundary B-1, the 2-character title. If I signed off US-42 today, I'd have to say that R-4 and B-1 have no mutant proving the suite would catch them.

**[11:50] → E18**

The last step is the closing record. The vault has a session note from September 24: the goal, what happened, six mutants, five killed, one survivor, defect DEF-001 opened, the decisions made, and what's next, like rerunning the round after the fix. That note, plus the single-file report and the links on every scenario, is what lets an audit six months later rebuild the whole chain without asking anyone.

For your deliverable: certify a simulated story this way. Linked scenarios, the run, the attached evidence, the closing record, and your signed decision: certified, or not certified with the real status.

What goes in the closing record? Here's what I'd include. The story and its requirements, each one linked to its cases. The run: date and code revision, like war-paradigm's evidence JSON does with the Git revision. The self-contained evidence file. The known defects with their tickets. The accepted risks, with the name of whoever accepted them. And the decision, with your name and the date. Where you write it depends on your company: the ticket, the tool, or the pull request. Whether it exists doesn't.

## 5. WAR mutation of the week

**[13:04] → E19**

This week's question comes before you sign: would this suite have failed if the requirement weren't met? If you don't know, you're missing a mutant.

Do it with the gap we found. Write a mutant for R-4: a viewer tries to publish, and 403 is expected. Add it as data in `scenarios.ts`, following the shape of the others, and run `npm run test:mutants`. If it dies, R-4 now has evidence. If it survives, you found a bug before signing, which is exactly when it's cheapest.

I read `app/server.js`, and the publish rule rejects viewers with 403. And the vault's role matrix says a forbidden role always gets 403 before any data or state validation. So I expect that mutant to die. But notice the word: expect. Reading code isn't evidence. The evidence is the run, with the mutant red for the app, green for the suite, and saved in the report. Until you have it, R-4 still has no mutant in your closing record.

## 6. The challenge and how it's graded

**[14:09] → E20**

The deliverable: a certified story, simulated, with full traceability, plus your certification Definition of Done checklist.

The criteria. One: every scenario has a real link to its case, no placeholders. Two: the evidence is self-contained and attachable. Three: the checklist includes the errors that invalidate a sign-off.

And the top level: for every requirement, you show a mutant the suite catches.

## 7. Mini quiz

**[14:34] → E21**

Three questions. Pause if you want.

First. Which of these invalidates a sign-off? A, an honest red documented as a known issue. B, a traceability link marked "to be resolved". C, an `@IGNORE` with an open ticket and an exit condition. D, evidence in a single-file report.

**[15:00] → E22**

It's B. Unresolved placeholders break the audit chain. An honest red doesn't invalidate; a lie does.

Second. Why does a human sign the certification? Because it involves risk judgment and professional responsibility, and that can't be automated.

Third. An audit six months later asks about a story. What has to be possible? Rebuilding the whole chain, requirement, cases, execution, evidence and close, from the records, without depending on anyone.

## 8. Wrap-up

**[15:35] → E23**

Three ideas. One: certified isn't "done"; it's tested against its criteria with evidence and traceability anyone can audit. Two: the signature is human, and if the business accepts a risk, it accepts it in writing and under its own name. Three: before you sign, every requirement needs a mutant the suite catches.

With this module you've finished the first full pass through the method. In Module 9 we move on to CI/CD and Docker: how to make all of this run on its own, the same on any machine, on every change.

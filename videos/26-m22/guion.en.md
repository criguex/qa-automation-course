# Script EN · Module 26 · m22 — Judges that return probabilities

_Narration words: 2590 · estimated length 17:16 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it plays over.

## [00:00] → E01 · Hook

I gave an AI judge the same failing test several times. It was a new test, written for a feature the build didn't have yet. The judge picked the same class every single time: flaky. What changed was the confidence: zero point six nine, zero point seven one, zero point seven eight, zero point eight four. The threshold was zero point seven five. On two of those calls the tool would have reported that test as flaky, and that's wrong. Nobody would have looked at it, because flaky sounds like "just rerun it." Same input, and the result landed on a different side depending on the call.

## [00:43] → E02 · Title

This is module twenty-six: judges that return probabilities. Failure modes, stability, and cascades. We'll work with four of my repos: playwright-jev, jev-ci-triage, experiment one in war-paradigm, and laya-server. A judge that returns probabilities doesn't tell you it got the answer right. It tells you how sure it claims to be. That's good for routing, not for approving.

## [01:06] → E03 · Explained for an 8-year-old

Think about a soccer game. The referee sees something weird in the box and isn't sure whether it was a penalty. A good referee doesn't make up an answer: they ask for the replay, and someone else watches it calmly.

Now imagine a brand-new referee shows up. Maybe they're great, but nobody has seen them work a game. So you sit them in the stands for a few matches, writing down what they would have called, and you compare their notes with what really happened. Only once you know how often they get it right do you let them blow the whistle for real.

That's this module. When the judge is unsure, it asks for help instead of guessing. And a new judge starts in shadow mode, watching without deciding, until you've measured it.

## [01:59] → E04 · Theory 1: three failure policies

First design question: what happens when the judge goes down? No key, the service returns a four twenty-nine, a timeout, a missing fixture. The answer depends on what you're using the judge for, and my repos have three different policies for the same kind of judge.

Fail-closed, for assertions. If a UI test asks "does this text confirm the payment?" and the judge doesn't answer, the test doesn't pass. Fail-open, for triage. If you're classifying why CI failed and the judge doesn't answer, you don't block anyone, but you don't guess either: you report that you don't know. And fail-safe, for test selection. If the judge decides which tests to run and it fails, you run the full suite.

All three follow the same logic. When the judge can't decide, the system falls to the side that doesn't lie to you.

## [02:56] → E05 · Code: the fail-closed ADR

In playwright-jev this is written down as an architecture decision, ADR zero zero zero one. Jev returns a probability, not a boolean. Every yes-or-no answer becomes one of three values: yes if the probability is at or above the threshold, no if it's at or below one minus the threshold, and ambiguous in between. The default threshold is zero point eight.

Ambiguous fails by default. And my favorite line in the ADR is this one: nothing unverified ever passes. A team without a key gets red tests by default, and that's on purpose. If you want something else, you record fixtures once, or you explicitly opt into skipping the test with a warning.

## [03:41] → E06 · Diagram: fail-open in triage

jev-ci-triage classifies every test that fails in CI: regression, flaky, environment, test-data, or unknown. Rules go first, and Jev only steps in for the ambiguous ones. If Jev answers with confidence below the threshold, zero point seven five by default, the failure stays unknown and goes to a person, showing which way Jev was leaning. If Jev isn't available, it's reported as unknown dot unverified, with the full HTTP error saved in the report.

This isn't hypothetical. The afternoon I recorded the demo, the gateway returned four twenty-nines on most requests. Only seventeen out of a hundred twenty-six HTTP calls succeeded, even with backoff. If the tool guessed whenever the service failed, that day it would have made up classifications.

## [04:29] → E07 · Diagram: fail-safe in selection

The third case is jev-test-impact. It reads a pull request's diff and picks the tests that might be affected, so you don't run everything on every change. There the golden rule is different: if Jev fails, is slow, or isn't available, every test runs. Uncertainty never causes a test to be skipped. And every night the full suite runs as a safety net.

Notice the difference. In an assertion, a judge failure turns the test red. In triage, a judge failure gets reported as unknown. In selection, a judge failure makes you run more. In all three, the judge's failure stays visible, even though each use handles it differently.

## [05:12] → E08 · Theory 2: confidence is self-reported

Back to the hook. The missing-feature test came back at zero point six nine, zero point seven one, zero point seven eight, and zero point eight four. And in the same repo, an accessibility regression came back at zero point six one, zero point six two, and zero point nine one. The chosen class didn't change between calls. The confidence moved enough to change the routing.

The practical takeaway: a case near the threshold can fall either way, and you have to treat it as unstable. It's not that the judge is bad. Confidence is something the model says about itself, not a measure of whether it was right. Calibrating on your own data is part of installing the tool.

## [06:00] → E09 · Theory 3: flip rate

To measure that instability we use the flip rate: the share of decisions that change between identical runs. You run the same case several times, same input, and count how often the decision switches sides.

And before you measure, you pin three things: the model, with its version; the temperature; and the prompt version. If you don't pin those, you're not measuring the judge, you're measuring how much everything else moved. Whenever you report a flip rate, say how many cases and how many repetitions it's based on. A flip rate of zero on three cases tells you almost nothing.

## [06:40] → E10 · Terminal: war-paradigm 01

Let's go to experiment one in war-paradigm. The specimen is an agent that writes a test plan for a user story. Same input, three runs, three different outputs. Did it pass or not?

Run npm run demo colon zero one at the repo root. The pinned set: model planner-agent at twenty twenty-six point zero six, temperature zero, prompt test-plan at v3. Run one approved at eighty-six, run two approved at eighty-four, run three approved at eighty-seven. Verdict STABLE, three out of three agree.

The unpinned set: model without a version, temperature one, prompt latest. You get three pin warnings. Run one approved at eighty-three, run two approved at seventy-four, and run three comes back REJECTED at seventy-six. Verdict UNSTABLE: it flipped from approved to rejected on run three.

## [07:32] → E11 · Code: scores move, verdicts don't

Look at run three. Seventy-six is above the gate, which is seventy, and it still gets rejected. Two scenarios lost their source, and one expects an editor to approve their own draft when the permission matrix says that's forbidden. Those are must criteria, and a failed must rejects the artifact no matter the score.

The comment in src slash stability dot ts sums it up: same input, N runs, scores may move, the verdict may not. And a flip between approved and rejected is a finding on its own: either the criteria sit too close to the gate, or the run wasn't pinned. One caveat: the six runs in this lab are fixtures written by hand, and the README says so. They're there so the demo needs no key and the numbers are reproducible.

## [08:25] → E12 · Theory 4: redact before you send

Before you send anything to a cloud judge, think about what you're sending. A CI log can contain a token, a JWT, someone's email, a test card number, or the path to your home folder. In jev-ci-triage all of that goes through src slash redact dot ts before it leaves the machine.

It's seven rules in a list: Bearer and Basic headers, named secrets like api key, token, secret or password, well-known key prefixes, JWTs, emails, numbers of thirteen to nineteen digits, and Users or home paths. Each one gets replaced with a redaction marker.

## [09:03] → E13 · Terminal: the redactor at work

I feed the redactor the same string the repo's test uses: a Bearer token, an email, a four one one one card, a user path, and a token. The output reads Bearer redacted, redacted-email, redacted-number, Users slash user, and token redacted. Nothing sensitive gets out.

And here's a detail worth noticing. Look right after redacted-number: the word "at" is glued to it, no space. The number pattern swallows the space that follows the card. The repo's test passes, because it only checks that nothing sensitive is left. It's cosmetic, but it's exactly the kind of thing you find when you read the output instead of just looking at the green check.

## [09:48] → E14 · Theory 5: the cascade

Now the cascade, in laya-server. Laya is a small open model, about two gigs of RAM, running on CPU, behind the same contract as Jev. The idea is to put a cheap judge in front of an expensive one.

Here's the rule. If the state is longer than fifteen hundred characters, it goes straight to the cloud, because Laya reads at most about three hundred fifty words. If it's short, Laya answers locally. If Laya's lowest confidence comes in under zero point eight, the question moves up to Jev. And if the cloud fails, or there's no cascade configured, the answer comes back flagged escalate true, so a person reviews it.

## [10:32] → E15 · Code: route()

All of that lives in one function, route, in src slash policy dot mjs. First it compares the state length to maxLocalChars with a strict greater-than. Then, if there are no local answers yet, it returns pending. If the minimum confidence is at or above the threshold, Laya decides, reason confident. Otherwise Jev decides with low_confidence, or Laya decides with escalate true if there's no cascade.

The cloud-down case lives in src slash server dot mjs: if the call to Jev throws, the answer comes back from Laya with a reason ending in upstream_error and escalate true.

## [11:11] → E16 · Terminal: npm test in laya-server

In the laya-server folder, run npm test. Seven node test cases: confidence for yes-or-no and choice answers, confident answers staying local, low confidence going to Jev or to a person, long states skipping Laya, and boolean answers from the cloud getting normalized. Seven pass, zero fail. They don't load the model, they only test the policy.

## [11:33] → E17 · Lab: the missing cases

The lab asks you to add two cases. I wrote them in a copy so you can see what they look like. The first: a state of exactly fifteen hundred characters with a confident local answer. Since the comparison is strictly greater-than, fifteen hundred stays with Laya, reason confident. The second: a fifteen-hundred-and-one-character state with no cascade available. It stays with Laya, reason long_state_truncated, escalate true.

npm test again: nine pass, zero fail. What matters is that the boundary is now written down. If someone changes that greater-than to greater-than-or-equal tomorrow, the first test goes red.

A dead CASCADE_URL is a different story. That path lives in server dot mjs, not in the policy, and the current tests don't cover it. To test it you either start the server pointing at a URL that doesn't answer, or pull that logic out into a function you can test without the model. That's your job in the challenge.

## [12:36] → E18 · Shadow mode and the declared debt

Laya runs in shadow mode. Its answers get logged so they can be compared later, but they never block anything. And the README says something I'm putting on screen word for word: nobody has measured Laya's quality in Spanish yet, and that measurement comes before trusting it.

One more thing the course says up front: laya-server has no CI. Only npm test runs the policy cases. Part of the lab is proposing the workflow it doesn't have yet: install dependencies, run npm test on every push and every pull request. I'm not presenting it as if it existed, because it doesn't.

## [13:16] → E19 · WAR mutation: drop a pin

This week's mutation: drop a pin. In a copy of war-paradigm I open the first run of the pinned set, fixtures slash runs slash pinned slash run dash one dot json, and change the temperature from zero to one. That's it. Before running anything, write down what you think the stability verdict will say and what the tests will say.

## [13:40] → E20 · Terminal: what each one noticed

npm run demo colon zero one. The pinned set now shows the warning: temperature is one, pinned runs use zero. But look at the verdict: STABLE, three out of three agree. All three runs are still approved at eighty-six, eighty-four, and eighty-seven, because the recorded outputs don't change when you edit a number in the metadata.

Now npm run test colon zero one. Before the mutation: twenty-seven pass and one is skipped, the live-agent check. With the mutation: twenty-five pass and two fail. One in checks dot spec, which requires a pinned run to have no warnings, and one in scorer dot spec, which requires the same inside the report.

The lesson: stability measures the verdict, not the pins. A STABLE on an unpinned run is worth nothing, because next time the output really can change. What caught the mutation was the pin check, which is why it can't be optional.

## [14:40] → E21 · The challenge and how it's graded

Your challenge has five parts. One: write the "if the judge goes down, what happens" table for three of your own uses, an assertion, a triage, and a selection, with the policy and the reason. Two: run the war-paradigm demo and explain why the unpinned verdict is UNSTABLE. Three: add the exactly-fifteen-hundred-characters case and the dead CASCADE_URL case to laya-server, and propose the CI workflow. Four: measure a judge's flip rate with five repetitions over twenty cases. Five: write a redactor, or reuse the one from jev-ci-triage, and test it on a log containing a token, an email, and a card number.

Here's how it's graded. Every use in the table has a policy, closed, open, or safe, and a justification. The flip rate comes with the number of cases and repetitions. Both new laya-server cases pass with npm test. And the redactor strips the token, the email, and the card from the test log, and you show it.

The top level: you propose the experiment the laya-server README says is missing, a labeled set in Spanish, with the threshold written down first, and you don't turn on blocking until you have that number.

## [15:58] → E22 · Mini-quiz

Three questions. Pause on each one.

One. A semantic assertion in a UI test, and the judge doesn't answer. Policy? Fail-closed: the test doesn't pass, it's unverified.

Two. The same input came back at zero point six nine, zero point seven one, zero point seven eight, and zero point eight four; the threshold is zero point seven five. What do you conclude? The case sits near the threshold and its routing is unstable: confidence is self-reported.

Three. laya-server receives a two-thousand-character state. What happens? It goes to the cloud, because it exceeds MAX_LOCAL_CHARS, which is fifteen hundred.

## [16:37] → E23 · Wrap-up

Three ideas. One: decide up front what happens when the judge goes down, closed, open, or safe depending on the use, and never let a judge failure pass as a result. Two: confidence is self-reported; pin the model, temperature, and prompt, measure the flip rate, and treat anything near the threshold as unstable. Three: a cheap judge in front of an expensive one works, but keep it in shadow mode until you've measured it on your own data.

Next module: AI-assisted QA, part two. The assistant designs, runs, and audits, and a person signs off. See you there.

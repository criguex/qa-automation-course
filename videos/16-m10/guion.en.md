# Script EN · Module 16 · m10 — Performance and Cloud (k6 · JMeter · AWS)

_Narration words: 2448 · estimated runtime 16:19 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it goes with. Lines starting with `>` are production notes and are not read aloud.

## [00:00] → E01 · Hook

civica-playwright-challenge has a performance suite that passes on every CI run. Four pages, four green tests. Glance at it and you'd conclude: "IMDb loads fast."

Wrong. Those tests run against an in-process mock, with no network at all. And the file says so itself, in its header comment: the numbers are there to catch a regression that makes a page pathologically slow to parse or render, not to measure real-world network performance. The budgets are four and five seconds, deliberately generous.

It's well built, and it tells you what it measures. The mistake would be reading it as something else. Today you learn to measure performance for real, and to read the numbers without fooling yourself.

## [00:46] → E02 · Title

Module sixteen: performance and cloud, with k6, JMeter and AWS. First "it does the right thing," then "it does it well under pressure," and "in the cloud." We'll read percentiles, not just pass or fail, and validate serverless services with all their quirks.

## [01:04] → E03 · Explained like you're 8

Think about the elevator in an apartment building. It's one thing for it to work when one person gets in. It's a very different thing for it to work when twenty people pile in at seven in the morning, all in a rush.

With one person, the elevator goes up, opens the door, done. With twenty, it might take longer, the door might be slow to close, or it might suddenly say "overweight" and refuse to move.

A load test means putting those twenty people in on purpose, with a stopwatch in your hand, so you know before Monday how it's going to behave. And knowing the average wait isn't enough. You care about how long the person who waited longest had to wait, because that's the one who complains.

## [01:56] → E04 · Theory 1: types of performance tests

There are four types you need to tell apart.

Load: the traffic you expect on a normal day, or at a known peak. Can it handle what it's supposed to handle?

Stress: you raise the load gradually, past normal, until you find the point where the system starts to degrade. That's why you ramp up slowly: if you hit it with everything at once, you'll know it falls over, but not when. The value of a stress test is the curve.

Soak, or endurance: sustained load over hours. Say, six hours of normal traffic. It reveals memory leaks and slow degradation that a five-minute test will never see.

And spike: a sudden jump in users, like when an ad airs on TV.

## [02:44] → E05 · Theory 2: metrics and percentiles

The basic metrics are latency, throughput, which is how many requests you handle per second, and error rate.

Latency comes with the averages trap. Picture a p95 of 180 milliseconds with an average of 90. What does that mean? Five percent of requests take longer than 180. The average hides the tail, and your most frustrated users live in the tail. That's why we measure p95 and p99.

And when we talk about targets, there are two acronyms. An SLI is the metric you measure, say, the actual p95. An SLO is the target for that metric: p95 under 300 milliseconds, 99 percent of the time. First you define what you measure, then how much is acceptable. The k6 thresholds we're about to see are executable SLOs. If your SLO says p95 under 300 milliseconds, your threshold says exactly that, inside the script, and it's checked on every run.

## [03:44] → E06 · Code: a p95 over 20 samples

Now a real example, from restful-booker-quality-suite, in tests slash performance slash api.performance.spec.ts.

The test is called "health check p95 stays below 500 ms across 20 samples." It makes twenty requests to the ping endpoint and records how long each one took. On every pass it checks the response is 201. Yes, 201, not 200: that's how this system answers, and the defect report lists it as a point to clarify, not as a bug.

Then it sorts the twenty durations and takes the position given by the ceiling of twenty times zero point nine five, minus one. In other words, sample nineteen out of twenty. And it requires that value to be under 500 milliseconds.

Notice the course criterion: the p95 budget has to be backed by data, for example twenty samples. With a single request you don't have a percentile. You have an anecdote.

And right there in the same file is the contrast. The second test, "booking list responds below 1 second," makes one single request to the bookings list and requires it to come in under a thousand milliseconds. It's good for catching something gross, like a list that suddenly takes ten seconds. But it tells you nothing about the tail. Both tests live side by side, and each one says what it measures.

## [05:11] → E07 · Terminal: what the run left behind

So did it pass? The evidence file from October 16, 2026 says the command was npm run quality. Prettier, ESLint and TypeScript all PASS. Playwright ran 43 checks in two seconds, across the api, contract and performance projects. All 43 passed, including nine that are controlled expected failures for known defects. And the execution report's Performance row reads: health p95 below 500 ms and booking list below 1 second, Passed.

Be careful about what this proves and what it doesn't. It's a budget test: requests one after another, from a single client, against a local container. It catches a big regression. It is not a load test.

## [05:54] → E08 · Code: thresholds in k6

For real load, k6. What I like most about k6 is where the pass-or-fail criterion lives: in the script, in the thresholds.

This is the example from the official k6 docs. In options, thresholds: http_req_failed with a rate below zero point zero one, meaning fewer than one percent errors. And http_req_duration with p of 95 below 200, meaning 95 percent of requests under 200 milliseconds. The default function sends a GET to a demo site.

Each threshold has three parts: an aggregation method, an operator and a value. The docs give more examples: avg below 200 for the average, count greater than or equal to 500 for a count, p of 90 below 300 for another percentile. You can stack several on the same metric.

And the key part, also from the docs: when a threshold fails, the test finishes with a failed status and k6 exits with a non-zero code. That means your pipeline goes red on its own, without anyone staring at a dashboard and interpreting it. Without thresholds, a load test is an opinion. With thresholds, it's an actual test.

## [07:07] → E09 · Theory 3: k6 2.x and old tutorials

A practical heads-up. k6 2.x, in 2026, cleaned out the deprecated stuff. The k6 pause, resume, scale and status commands are gone, and so is the externally-controlled executor. For the cloud, the command is k6 cloud run followed by the script name.

If you find an old tutorial using those commands, don't copy it as is. Translate it to executors that do exist: ramping-vus if you want to raise virtual users in stages, or constant-arrival-rate if you want a fixed number of requests per second no matter how long each one takes.

JMeter is still a very common option too, especially on teams that already have it in place. The official manual is in the resources. The idea is the same: the pass-or-fail criterion has to be written down, not left to whoever happens to be looking.

## [08:02] → E10 · Theory 4: reading results without fooling yourself

Now, reading the results. Three patterns you'll run into.

One: you add virtual users, throughput flattens out, and latency stays stable. That's not "all good." The system has hit a bottleneck, a connection pool, the CPU or the workers, and it handles the same amount no matter how much more you ask of it.

Two: the error rate climbs, but latency for the requests that do get answered stays flat. The likeliest explanation is a resource with a hard limit rejecting the overflow: a rate limit, a full pool or a saturated queue. It answers some quickly and drops the rest.

Three: you run load against a staging environment with half the resources of production. You can draw conclusions about trends and relative regressions, like whether this release is slower than the last one. Absolute production numbers, no.

That's why you hook k6 up to Grafana: the final summary doesn't tell you when each thing happened. The time series does. A p95 of 800 milliseconds doesn't tell you whether it was steady or a spike at minute twelve. With latency, errors and virtual users on the same time axis, you see the why.

## [09:19] → E11 · Theory 5: serverless and cold starts

In the cloud, the special case is serverless, for example AWS Lambda. Functions are triggered by events, and they have a quirk: the cold start.

The first request to a Lambda takes three seconds. The next ones take 120 milliseconds. Is that a bug? No. That's the physics of serverless: the first time, the environment has to spin up. Your job is to decide whether the SLO tolerates it, include it in your measurements, and if needed, validate the mitigation.

To validate end to end, you follow a transaction through its traces. On AWS, with CloudWatch Logs Insights: you find the request, see which functions it went through and how long it spent in each one. A "200 OK" at the front door doesn't prove the event finished correctly three functions downstream.

And that's what makes event-driven systems different to test. In a classic API, the response is the end of the story. In serverless, the response often just says "got your request," and the real work happens afterwards, in another function, sometimes seconds later. Your test has to wait for that final result and check it, not settle for the first status code.

## [10:36] → E12 · Code: accessibility without flakiness

The module also asks you to add accessibility and visual regression without making the suite flaky. Both examples come from civica.

Accessibility with axe-core, in tests slash mock slash accessibility.mock.spec.ts. It runs against the deterministic mock, on four pages, with the wcag2a and wcag2aa tags. And it only blocks on serious and critical violations, the ones that genuinely stop someone using assistive technology. The file's comment explains why: it's a pragmatic, non-flaky bar for a UI suite.

If you demand zero violations of every level from day one, you'll end up switching the test off. Start with what blocks people, and raise the bar later.

And it runs in CI. In the README's table, accessibility is listed as part of the mock suite. In run 38665514760 on October 15, the mock suite passed its 19 tests, and performance and visual passed four each.

## [11:34] → E13 · Code: visual regression with Linux baselines

Visual regression, in tests slash visual slash pages.visual.spec.ts. Four pages, full-page captures with toHaveScreenshot, and one tolerance: a maxDiffPixelRatio of zero point zero two.

The golden rule: baselines get generated on the same system CI uses. Playwright names its captures by operating system, and the repo only stores the Linux ones, generated inside its Dockerfile. A baseline taken on macOS is never picked up by CI.

And to close the loop with the hook, civica's performance budget in navigationTiming.performance.spec.ts: it reads the browser's Navigation Timing and requires domContentLoaded under four thousand milliseconds and the load event under five thousand. Deliberately generous, against a mock.

## [12:15] → E14 · Lab, step by step

Your turn. Step one: write a k6 load test against an endpoint, with thresholds. Start with the two from the official example, errors under one percent and a p95 under a value you can justify, and run it with k6 run and your script's name.

Step two: interpret the result. p95 and p99, error rate and throughput. Write down what each one tells you, using the patterns we covered.

Step three: validate a Lambda end to end and trace a transaction in CloudWatch, from the incoming event to the very last log line.

For the report, I'd suggest a simple structure. Up top, the environment: which endpoint, which version, which date and how much capacity. Then a table with p95, p99, error rate and throughput, each next to its threshold and its result. And at the end, in two or three sentences, what you can conclude and what you can't. If you ran on a staging environment smaller than production, that's where you say so.

For the serverless checklist, think about what we covered: did you measure the cold start separately from warm requests? Did you follow the transaction end to end through the traces? Did you check the final result, and not just the response at the front door?

The deliverable: the k6 script with thresholds, a performance report, and a serverless validation checklist.

## [13:45] → E15 · This week's WAR mutation

This week's mutation goes after the system's reality. Inject latency or a 503 on purpose and check that your k6 thresholds fail.

Before you run it, write down your prediction: which threshold should break? If you add latency, the http_req_duration one. If you inject a 503, the http_req_failed one. Then you run it and check two things: that the threshold shows up red, and that k6 exits with a non-zero code.

If you injected a 503 and the run came out green, your threshold had no teeth. That's the finding.

How do you inject the failure? Against a service you control: your own test endpoint, a mock or a local container, never someone else's system and never production. One break per run, so you know which threshold caught it. And keep the output of both runs, the healthy one and the broken one, side by side.

## [14:44] → E16 · The challenge and how it's graded

There are three criteria, and all of them can be checked. One: k6 thresholds make the run fail when they're exceeded. Two: the p95 budget is backed by data, for example twenty samples, as in restful-booker. Three: visual baselines are generated on the same system CI uses.

The top level: you inject latency or a 503 on purpose and show that your thresholds fail. With the command output and the exit code.

## [15:12] → E17 · Mini-quiz

Three questions. Pause if you like.

First: p95 of 180 milliseconds and an average of 90. What does it mean? Five percent of requests take longer than 180. The average hides the tail.

Second: where does the pass-or-fail criterion live in a well-built k6 test? In the script's thresholds. The test fails on its own, with no manual interpretation.

Third: the first request to a Lambda takes three seconds, and the following ones take 120 milliseconds. What is it? A cold start. You include it in the SLO or you validate a mitigation.

## [15:50] → E18 · Wrap-up

Three ideas. One: look at percentiles, not averages. Two: the pass-or-fail criterion goes into thresholds, so the pipeline turns red on its own. Three: every performance test says what it measures, and a budget against a mock is not a load test.

In the next module we go after another source of red builds that aren't your fault: third parties and AIs that change their answers. Determinism, mocks and hash-indexed recordings. See you there.

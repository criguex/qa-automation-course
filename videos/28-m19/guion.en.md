# Script EN · Module 28 · m19 — Preregistration and reproducibility

_Narration words: 2468 · estimated length 16:27 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it plays over.

## [00:00] → E01 · Hook

I wrote down a bet before I had any data. I called it H14. If it failed, I'd publish it anyway. It failed. It missed by sixty-five thousandths. The criterion asked for zero point seven, and one of the four networks scored zero point six three five. Lowering the threshold to zero point six would have been easy. I didn't touch a thing. And today, if you run my verifier, it prints H14 FAIL and exits with code zero. In this video you'll see why that's correct, and why the same verifier exits with code one when a single letter changes in one file.

## [00:42] → E02 · Title

This is module twenty-eight: preregistration and reproducibility. Thresholds before the data, and the same fingerprint on another machine. We're working with predictor-debugger, a physics debugger for a flow predictor trained with neural networks. And here's the twist: what's under test there isn't the network. It's the debugger.

## [01:00] → E03 · Explained for an 8-year-old

Before the game, you write down on a piece of paper who's going to win. You put it in an envelope, seal it, and hand it to someone. That way nobody can say later that you changed your prediction once you knew the score. And if you're wrong, you still tell everyone, because that's the whole point of writing it down first.

Now your cousin does the same math at home, on his own computer. If he gets exactly the same number you got, you know it wasn't luck or some glitch on your machine. That's what we're doing today: the sealed envelope is the preregistration, and the number you compare with your cousin is the fingerprint.

## [01:47] → E04 · Theory 1: preregistration

predictor-debugger's DESIGN dot md opens with this sentence: written before any dataset, model or prediction exists. Any later change is an amendment that goes at the end, with a date, a reason, and a commit, and none may be made after the test split has been evaluated.

Amendments aren't cheating if they're made in time and written down. Amendment one, from October twenty-fourth, before any data existed, is a good example. The network trained on Apple's MPS, which has no float64. A float32 field has relative rounding near one point two times ten to the minus seven, while D1's threshold was calibrated on a float64 solver whose divergence sits around ten to the minus fifteen. As written, D1 would have flagged a perfect float32 predictor for rounding, not for physics. So a new control, P0f32, and a new hypothesis, H1b, were added. All before a single data point was generated.

## [02:47] → E05 · Theory 2: you're testing the check

There's a line in the design I'd hang on the wall of any QA team: a poor network is an acceptable result; a debugger that cannot tell the controls apart is a failure.

That changes the question. I'm not asking whether the neural network is good. I'm asking whether my physics checks reject what I know is wrong, accept what I know is right, and point to where the physics breaks in what I don't know. It's testing the tester.

## [03:19] → E06 · Theory 3: positive and negative controls

For that you need controls whose answers you already know. P0 is the exact solver: it has to be accepted, and that's H1. P3a takes the network's output and adds a gradient field with a norm of five percent of the velocity, which breaks incompressibility: D1 has to catch it, and that's H2. P3b multiplies the output by one point zero five, which injects energy: D2 has to catch it, H3. And P1 just repeats the previous state, no dynamics at all: D3 has to catch it, H4.

Each hypothesis pairs a control with the check that should scream. If D1 doesn't scream at P3a, the problem isn't the network. D1 is asleep.

## [04:04] → E07 · Theory 4: the threshold, fixed in advance

So when does a check scream? The rule was written down first: tau is ten times the maximum of the statistic for P0 and P0f32 over every validation step, with a floor of ten to the minus twelve. It's computed once, written to thresholds dot json with its hash, and never changed.

And one rule that sounds obvious but a lot of people never write down: a step with a NaN or an infinity is always flagged. A NaN never passes.

## [04:37] → E08 · Theory 5: comparators that should fail

Now the subtle part. H14 didn't just require its criterion to hold. It required a cheap comparator, the sum of D3, to not hold. Why? Because if a simple comparator meets the criterion too, the hypothesis doesn't show that the new check adds anything.

So those hypotheses have three outcomes. PASS, if the criterion holds and the comparator doesn't. NON-DISCRIMINATIVE, if both hold. And FAIL, if the criterion doesn't hold. In round two, H8 passed, but it didn't separate G from D3: D3 ranked that set too. A green that doesn't discriminate has to be reported for what it is.

## [05:17] → E09 · Theory 6: H14, the bet that failed

Let's look at H14's numbers. It asked for a mean rho of at least zero point seven, with a lower confidence bound of at least zero point five, on all four networks. P2s0 scored zero point eight. P2s1, zero point eight one five. P2ge4, zero point seven four seven, with its lower bound at zero point five three five. And P2gbest scored zero point six three five, with an interval from zero point four one three to zero point seven nine five. It didn't make it. And the comparator, the sum of D3, met the criterion on three of four networks. Result: FAIL.

At step one the ranking was nearly perfect, zero point nine nine, and it degraded to somewhere between zero point four five and zero point seven three by step twenty. What I learned: the debugger knows how wrong the network is at each step, but not where those errors carry it.

Nothing was changed to fix it. That failure is where round four came from, with a new idea, preregistered: H17, carrying the direction of each defect along the steps instead of adding up sizes. H17 passed on all four networks.

## [06:34] → E10 · Theory 7: the fingerprint

How do I know your run and mine give the same result? With a fingerprint. verify dot py builds a sorted JSON with the numpy version, the solver's hash, the hash of every file under pd, the hash of thresholds dot json, the input hashes, and a summary of the verdicts. It takes the SHA-256 and keeps twelve characters. Round one's is E E C nine, zero nine E zero, F seven seven D.

Change one byte of any of those things and the fingerprint changes. So it's not decoration: it's a summary of everything that's supposed to be the same.

## [07:15] → E11 · Lab: verifying round one

Over to the terminal. You need git and uv. Clone criguex slash predictor-debugger, cd in, and run uv run dash dash locked verify dot py dash dash saved mac. The dash dash locked flag makes uv use exactly Python three point nine and numpy one point twenty-six point four, the ones pinned in uv dot lock.

The output: H1, P0, zero out of four hundred, PASS. H1b, P0f32, zero out of four hundred, PASS. H2, P3a, D1, four hundred out of four hundred, PASS. H3, P3b, D2, four hundred out of four hundred, PASS. H4, P1, D3, four hundred out of four hundred, PASS. Verdicts equal to the saved ones: True. Fingerprint E E C nine, zero nine E zero, F seven seven D. Exit zero. On my run today it took about six seconds, including the numpy download.

## [08:10] → E12 · Terminal: four environments, four rounds

Swap mac for war, guerra, and linux. All four print True and the same fingerprint. Then run rounds two, three, and four with dash dash saved mac. Round two: nine hypotheses, all PASS, fingerprint D five zero six, F five eight F, three eight three eight. Round four: eighteen lines, all PASS, H17 included, fingerprint six eight one D, one four three B, six four A three.

And round three. Find the H14 line: it ends in FAIL. And still the command prints verdicts equal to saved, True, the fingerprint six three one nine, five three seven B, seven one six seven, and exits zero. Why is that right? Because the verifier doesn't check that every hypothesis passes. It checks that you reproduce what was published: same verdicts, same fingerprint. A published FAIL reproduces as a FAIL. If H14 ever came back PASS, that would be the problem.

## [09:10] → E13 · Theory 8: several machines, no cherry-picking

The fingerprints matched on the Mac, on WAR and GUERRA, which are my two Windows machines, and on Linux, both in GitHub's CI and under WSL2. The verify workflow runs on every push, with a matrix over the four rounds, and each job greps for the expected fingerprint on every machine's saved results. If it isn't there, the job fails.

And there are two ledgers. The cross-environment discrepancy ledger for round one: zero entries. The false-positive ledger: a hundred twenty-six entries, all D2 on P0 and P0f32 in the out-of-distribution split, and every one of them is still open. I don't hide them and I don't close them just because. And the limit, in writing, in the README: the three machines are mine, so this isn't an independent reproduction.

## [10:01] → E14 · Theory 9: bit-identical isn't verdict-identical

Here's something people mix up all the time. Not one file regenerated on WAR, GUERRA, or Linux came out bit-for-bit identical to the Mac's. The largest absolute difference was eight point nine times ten to the minus sixteen, on WAR, round one. That's floating-point noise across platforms.

So it isn't reproducible? It is, but you have to say what's being reproduced. The Mac's files are canonical, the difference gets reported, and what you compare across machines is verdicts and fingerprints, which match. Promising identical bits across operating systems is promising something you don't control.

## [10:39] → E15 · Theory 10: cluster bootstrap

Last theory block. The confidence intervals from round two onward come from cluster_bootstrap, in round2 slash evaluate dot py. It resamples whole trajectories, each with all its steps, two thousand replicates, with the fixed seed twenty million two hundred sixty-one thousand twenty-four, and reports the two point five and ninety-seven point five percentiles.

Why trajectories and not steps? Because steps within the same trajectory aren't independent. If you resample individual steps, you treat correlated data as if it were independent, and the interval comes out narrower than the data allows.

## [11:15] → E16 · Terminal: the synthetic example

The lab asks you to check that with a synthetic example, and here's how I did it: ten trajectories of ten steps each, strongly correlated within each trajectory, same seed and two thousand replicates for both methods. Resampling steps, the interval for the mean runs from minus zero point two one three to zero point zero three four: width zero point two four seven. Resampling trajectories, it runs from minus zero point four seven one to zero point two eight zero: width zero point seven five. About three times wider. That's the size of the lie you avoid telling.

## [11:54] → E17 · WAR mutation: a byte that isn't a number

This week's mutation. In a copy of the repo I open thresholds dot json and change a byte that isn't a number: one letter of the hostname of the machine where the thresholds were computed. Not a single threshold changes. Before running anything, write down what you think happens to the five verdicts, to the verdicts-equal line, and to the exit code.

## [12:19] → E18 · Terminal: what screams

I run verify dot py dash dash saved mac. All five verdicts still PASS. Verdicts equal to saved: True. But there's a new line: changed thresholds dot json. The fingerprint is no longer E E C nine; now it's five D three E, four B nine five, D D six A. And it exits with one. The verifier doesn't just check whether the results changed. It checks whether anything that was frozen changed.

I restore the file and do part two: raise the D1 threshold to one point zero. Now H2 drops: P3a, D1, zero out of four hundred, FAIL. Verdicts equal: False. changed thresholds dot json, a different fingerprint, six B C seven, nine zero one B, five F B one, and exit one. With a threshold that high, D1 stops seeing the defect it was supposed to catch, and the negative control exposes it. If your own verifier stays quiet in either case, it's asleep, and that gets published.

## [13:24] → E19 · The challenge and how it's graded

Your challenge: preregister a QA experiment of your own. For example, "my judge catches at least ninety percent of seeded false greens," or "my suite kills at least five of six mutants." In one of your repos, write a PREREGISTRO dot md with the question, at least three numbered hypotheses with numeric criteria, a control that must pass, one that must fail, a comparator that must fail, and your limits. Put the thresholds in thresholds dot json. Commit. Only then generate data and run. Write a huella dot py that prints a fingerprint, a workflow that greps for that fingerprint on two operating systems, and a cluster-bootstrap interval with the seed and replicate count written down.

Here's how it's graded. git log dash dash reverse shows the preregistration and thresholds commit before the first data file. git log dash p on thresholds dot json shows no changes after the first run, or if there were amendments, each one has a date, a reason, and a commit. Every hypothesis has its PASS or FAIL with the number that decides it, and the failing ones stay in the report. The positive control passes, the negative one gets flagged, and the comparator is reported even when it holds. CI prints the same fingerprint on both systems and fails if you change one byte of thresholds dot json, and you show it with a test commit and its red job. The interval resamples clusters. And the README has "Limits" and "What would contradict me."

The top level: you keep both ledgers, discrepancies and false positives, and every unexplained entry stays open and visible.

## [15:11] → E20 · Mini-quiz

Three questions. Pause on each one.

One. With data in hand, you find a threshold was written down wrong. What change is legitimate? An amendment at the end of the design with a date, a reason, and a commit, and only if the test split hasn't been evaluated yet.

Two. round3 slash verify dot py prints H14 FAIL and still exits with code zero. Why is that fine? Because the verifier checks that you reproduce what was published, same verdicts and same fingerprint, not that every hypothesis passes.

Three. cluster_bootstrap resamples whole trajectories, not individual steps. Why? Because steps within a trajectory depend on each other, and resampling them one by one gives a misleadingly narrow interval.

## [15:58] → E21 · Wrap-up

Three ideas. One: write your hypotheses, thresholds, controls, and comparators into a commit before the data, and any change is a dated amendment made before the test. Two: publish what fails; H14 missed by sixty-five thousandths, and that's where round four came from. Three: compare verdicts and fingerprints across machines, not bits, and say plainly when the machines are yours.

Next module: requirements QA. Reviewing the spec before anyone builds. See you there.

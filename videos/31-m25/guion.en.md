# Script · 31 · m25 · Fluid physics and statistics for the debugger

Voice-over: Cristian, first person · US English · ~150 words/min · 2652 narration words · estimated runtime 17:56 (quiz pauses included)

Each block has its own timestamp and the scene it plays over (→ E##). Scene ids match `escenas.json`; the English cut runs on its own clock, so the editor stretches or trims each scene to these times.

## Hook

[00:00] → E01

Let me show you a false positive that took me a while to understand. I have a debugger that checks whether a neural network predicts a 3D fluid correctly. I hand it the perfect answer, the exact solver's output, the one that cannot be wrong by construction. And on out-of-distribution data it flags that answer as bad on 21 of 210 steps. Same on all three machines. It wasn't a bug in the solver or in the network. It was the energy check itself, which can't handle a flow that slows down faster than the data I calibrated it on.

[00:40] → E02

And there's another catch. The network, which I call P2, gets rejected on one hundred percent of the test steps. Sounds like a win for the debugger. But when I ask whether the momentum check, D3, ranks those steps from worst to best, the Spearman correlation comes out at minus zero point one eight five. Basically zero. D3 knows the network is wrong, but not where it's worse. That's what this module is about: understanding which law each check guards, why one of them fires falsely, and how to decide with numbers whether a difference is real or just noise.

## Explained like you're 8

[01:20] → E03

If you were eight, I'd put it like this. Water won't be squeezed: fill a balloon with water and press it, and it changes shape, but it doesn't get smaller. And energy doesn't come from nowhere: a ball rolling across the grass slows down; if it suddenly speeds up on its own, somebody cheated. My debugger is a referee who knows those rules. It doesn't know the right answer. It only checks whether the neural network plays by the rules. Squeeze the balloon, and it shows card D1. The ball speeds up by itself, card D2. And if the motion doesn't match how the parts of the water push on each other, card D3.

## Theory · the three laws

[02:06] → E04

On to the theory. The system is small on purpose: a 32 by 32 by 32 periodic box, viscosity zero point zero five, no forcing. The network gets a state of the fluid, u zero, and predicts the state one step later, u one. That step is zero point one, which for the solver means ten small steps of zero point zero one. The debugger checks every pair against three laws. D1 is incompressibility: the divergence of the velocity has to be zero, and I measure it as the norm of the divergence over the norm of the gradient. In plain words: whatever flows into a tiny piece of fluid has to flow out.

[02:51] → E05

D2 is the energy budget. With no forcing, kinetic energy can only go down, and it goes down through viscosity, at a rate of nu times the enstrophy, which measures how much the fluid is spinning. The check compares the energy drop the network produced with the drop that law requires, using a trapezoid over the step. And it has a hard rule: if energy goes up, that's a violation, no debate. D3 is the momentum equation: I take the change in velocity over the step and compare it with the right-hand side of Navier–Stokes, averaged at the start and at the end. Whatever is left over is the residual. If the network ignores the dynamics, that residual blows up.

## Theory · D4 judges the judge

[03:39] → E06

There's a fourth number, D4, and this is the first conceptual trap. D4 is the error against the exact reference: how far the prediction landed from the true answer. It looks like the best check of all, but it is not a debugger check. In real use you don't have the exact answer; if you did, you wouldn't need the network. D4 exists only inside the experiment, to judge the debugger: it tells me whether, when D1, D2 or D3 raise the alarm, there really was an error. The design says it plainly: D4 is used only to judge the debugger. If you sneak it in as a check, you're cheating yourself.

## Theory · the controls

[04:24] → E07

To know whether the referee is any good, I need players whose behavior I already know. Those are the controls. P0 is the exact solver: the positive control, it has to pass. P0f32 is that same output rounded to float32, the best a network computing in single precision could ever do; it has to pass too. P1 is persistence: it returns the same state, ignores the dynamics, and D3 has to catch it. P2 is the network, a Fourier neural operator. P3a adds a five percent gradient field to the network's output, which breaks incompressibility, for D1. And P3b multiplies the output by one point zero five, which injects energy, for D2.

[05:09] → E08

The thresholds were fixed before the first test data point existed: ten times the maximum that P0 and P0f32 reach on validation. They ended up like this: D1 at eight point three times ten to the minus seven, D2 at three point three times ten to the minus three, and D3 at zero point zero eight. On the test split, four hundred steps per predictor, P0 and P0f32 were flagged zero out of four hundred times, and P3a, P3b and P1 four hundred out of four hundred, each by its own check. Mac, WAR and GUERRA printed the same fingerprint. And keep the sentence that drives the whole design in mind: a poor network is an acceptable result; a debugger that can't tell the controls apart is a failure.

## Theory · one-step vs rollout

[06:00] → E09

Now, a difference that changes the conversation. In one-step mode the network always starts from the true state and takes a single step. In a rollout, the network feeds on its own answers, step after step, and the errors pile up. In round 1, with ten-step rollouts, the median of D4 rose from one point zero five percent on the first step to four point eight on the tenth. But D1 and D3 stayed flat. The checks see that the rollout breaks the physics at every step, but they don't track how the error grows. That's why later rounds tried accumulated alarms on twenty-step rollouts.

[06:42] → E10

And here's one of the things I'm proudest of in this repo: a hypothesis that failed, published with its number. In round 3, H14 proposed adding up each step's error sizes to rank the trajectories. It failed: on one of the four networks the mean correlation came out at zero point six three five, below the criterion, and the comparator, the sum of D3, met it on three out of four. Adding up sizes didn't capture where the error was drifting. In round 4, carrying the direction of the defect along the rollout did rank the error, on all four networks. A failure doesn't get deleted: it gets measured and learned from.

## Theory · stats so you don't fool yourself

[07:27] → E11

Let's move to the statistics, which is what keeps you from fooling yourself. Spearman measures whether two variables rank the same way. It doesn't compare values, it compares ranks: it lines up the steps by D3, then by D4, and checks whether the line-up is the same. If the step with the most D3 is also the one with the most error, and so on down, the correlation approaches one. If there's no relationship, it approaches zero. That's why the minus zero point one eight five from the start is so telling: D3 flags every step of the network, but its ordering has nothing to do with the real error. It says the network is wrong, not where it's worse.

[08:15] → E12

Second: the cluster bootstrap. To get a confidence interval you resample your data many times. But the ten steps of a trajectory aren't independent; they come from the same fluid and they look alike. If you resample individual steps, the interval comes out narrower than it should, and that's misleading. In predictor-debugger the forty whole trajectories get resampled, with replacement, two thousand replicates, fixed seed. Third: Wilson. If a judge gets 27 out of 29 cases right, don't report ninety-three percent and stop there. It's ninety-three point one, with an interval from seventy-eight to ninety-eight. With 29 cases the interval is wide, and you have to say so.

## Lab

[08:58] → E13

Lab time. First I clone predictor-debugger and run the cheapest level: re-apply the pre-registered thresholds to the saved statistics, with no data download. Everything goes through uv run dash dash locked, which pins Python 3.9 and numpy 1.26.4 from the lockfile. The output you're seeing is the Linux log that ships with the repo: H1 and H1b, zero out of four hundred; H2, H3 and H4, four hundred out of four hundred; verdicts equal to the saved ones, and the fingerprint E E C 9, zero 9 E 0, F 7 7 D. If you get a different fingerprint on the same commit, that's a finding, and you report it.

[09:42] → E14

Now I read the code, because the law has to be written down somewhere. In pd slash checks dot py, D1 is literally k times the velocity in Fourier space, which is the divergence, over the norm of the gradient. D2 is final energy minus initial energy plus nu times delta times the sum of the enstrophies, all over the initial energy: the trapezoid I mentioned. D3 is the change over time minus the average of the right-hand side. And D4 is there, but look at the flags function: it only looks at D1, D2 and D3, and adds the hard rule that if E one is greater than E zero, D2 gets flagged. D4 never enters the decision.

[10:30] → E15

The module's exercise asks for something almost nobody does: write your predictions down before you run. I'm going to sabotage an exact pair three ways, following the round 5 kit: energy times one point zero five, an added five percent gradient, and a phase shift, which means moving the whole field over by one cell. My bet: the extra energy gets flagged by D2, for sure, and probably D3. The gradient gets flagged by D1. And the phase shift changes neither divergence nor energy, so only D3 should see it. I save that with a timestamp and take its hash. Now I can't bend the prediction to fit the result.

[11:14] → E16

I run it. The exact pair: nothing flagged, and notice D1 comes out at six times ten to the minus sixteen, which is just machine rounding. Energy times one point zero five: D2 and D3, as I bet. Gradient: D1 and D3. Phase shift: D3 only, with a D3 close to four, and its D4 says the prediction landed thirty-seven percent away from the truth. All four of my predictions match. But look at the gradient's D2: two point four eight times ten to the minus three, against a threshold of three point three one. It didn't flag, but it came close. That kind of margin is exactly what you'll explore in the mutation.

[12:00] → E17

The other two exercises. A synthetic example: forty trajectories of ten steps, where each trajectory has its own level. If I resample individual steps, the interval is zero point one eight wide. If I resample whole trajectories, it's zero point five seven, more than three times wider. The step version also leaves zero outside the interval, so it would have you conclude there's an effect that isn't there. And Wilson: I run agent-eval-jev's function with 27 out of 29 and get zero point seven eight to zero point nine eight, the same seventy-eight to ninety-eight the repo publishes. If your math lands there, you're on track.

## WAR mutation of the week

[12:42] → E18

This week's mutation: sabotage a pair with energy times one point zero five and predict which check flags it before you run. We did that; now I go further and turn the knob down. Times one point zero one, detected. Times one point zero zero one, it slips through. Times one point zero zero zero one, it slips through. And look at the E1 greater than E0 column: the hard rule never fires, because even with the extra energy, the fluid is still losing energy over the step. The trap doesn't make energy go up; it just makes it drop less than it should. That's the detection floor of this check with these thresholds.

[13:28] → E19

The nice part is that this is already measured in the repo. In round 3 I ran a sweep of graded mutations over every exact step. In distribution, round 1's D2 starts seeing energy injections at three times ten to the minus three; round 2's D2 prime, at three times ten to the minus four; and round 3's D2 double prime brings the floor down to three times ten to the minus six, without a single flag on the controls. Watch the conversion: my knob scales the velocity, while the repo's sweep measures the change in energy, which is roughly double the percentage. Do that math and times one point zero zero one sits below the first floor, and times one point zero one sits above it. And the kit's rule applies here: whatever sits below the floor gets reported as not detected. It doesn't get hidden.

## The challenge and how it's graded

[14:26] → E20

The challenge. You hand in three things: your D1, D2 and D3 predictions with their verification, the cluster bootstrap demo, and the recomputed Wilson interval. The criteria get checked, not debated. One: your predictions are written down before you run, and they match the debugger or you explain why not. A timestamped hash or a commit proves it. Two: you explain why D4 is not a debugger check. Three: your Wilson for 27 out of 29 comes out at roughly seventy-eight to ninety-eight. Four: if you conclude that A is better than B, you lean on intervals, not on the point estimate. A prediction that missed, explained well, still passes.

[15:10] → E21

The rubric has four levels. One, not met: the deliverable is missing or doesn't run. Two, getting there: it runs, but at least one criterion fails. Three, passed: every criterion is met. Four, outstanding: everything, plus this module's extra, which is to conclude on your own project whether A beats B using cluster intervals. For example, two versions of a suite, two models or two configurations, with the independent unit chosen correctly. You pass the module with the quiz at six out of eight or better and the challenge at level three.

## Mini-quiz

[15:47] → E22 · pausa 5 s

Mini-quiz. Pause the video if you want to think it through. First one: why isn't D4 a debugger check? A, because it's slow. B, because it compares against the exact reference, which doesn't exist in real use. C, because it always fails. D, it is one. The answer is B: the design keeps them apart; D4 measures the debugger, it doesn't replace it.

[16:17] → E23 · pausa 5 s

Second: why bootstrap by trajectory and not by step? A, it's faster. B, because the steps of a trajectory depend on each other, and resampling steps gives narrower, misleading intervals. C, it's trendy. D, there's no difference. It's B. You resample the independent unit, not its pieces. You just saw it in the terminal.

[16:44] → E24 · pausa 5 s

Third: 27 correct out of 29. How do you report it? A, ninety-three percent. B, ninety-three point one percent, with a Wilson interval of seventy-eight to ninety-eight. C, one hundred percent. D, nearly all of them. B. With 29 cases the interval is wide, and you have to say so.

## Wrap-up

[17:09] → E25

Three ideas to take with you. First: every check guards one specific law, and if you know which one, you can predict what it will flag before you run. Second: D4 judges the judge; the debugger decides without the answer, which is why you test it with controls you know should pass and others you know should fail. Third: a difference without an interval is an opinion, and the interval only counts if you resample the independent unit. And remember the scope: a 32³ periodic box says nothing about real turbulence or the Millennium problem. In the next module we switch guards: we're going to check a formal proof in Lean without being mathematicians. See you there.

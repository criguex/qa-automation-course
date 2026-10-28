# Script EN · Module 30 · m24 — Controls, harnesses and numerical mutation

_Narration words: 2405 · estimated length 16:02 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it plays over.

## [00:00] → E01 · Hook

In a copy of my own study, I removed one guard from the test runner: the one that checks the oracle is returning real numbers. Then I made the oracle return NaN on every mutant. Result: forty-eight mutants came back KILLED, dead, with oracle_valid true. Forty-eight fake wins. Those mutants didn't die because the tests caught them. They died because the oracle was broken and the runner never noticed. And this isn't a made-up example: the study's real runner once did exactly that, and it's published as finding number eight.

## [00:36] → E02 · Title

This is module thirty: controls, harnesses, and numerical mutation. A frozen contract and an independent oracle. We're working with the numerical part of scientific-qa-evidence, track one of war-paradigm: small physics simulations that we break on purpose to see whether the tests notice. Before I trust an experiment, I test the experiment.

## [00:56] → E03 · Explained for an 8-year-old

Before you use a scale, you weigh something you already know the weight of. Say, a one-kilo bag of rice. If the scale says one kilo, great. If it says three, the problem isn't the rice: it's the scale.

And if you weigh a rock and the scale shows no number at all, just a little dash, you can't say the rock weighs zero, or that it weighs a lot. All you can say is the scale didn't work.

Testing works the same way. The bag of rice is the control. The scale is the harness. And the little dash is the NaN: when it shows up, there's no verdict.

## [01:40] → E04 · Theory 1: positive and negative controls

Let's start with controls. A positive control is something that should pass: the exact solver, the clean case. It's there to check that the test doesn't cry wolf. A negative control is a sabotaged case, one of each kind, that should fail. It's there to check that the test actually detects things.

If your experiment doesn't have both, you don't know what you're measuring. A suite that never fails might be perfect, or it might be asleep. The negative control is what tells you which.

## [02:14] → E05 · Theory 2: test the harness

Now the step almost nobody takes: testing the harness, the code that runs the tests and decides the verdicts. The course asks for three properties. One: an invalid baseline blocks its mutants; if the clean case doesn't pass, no mutant of that case can count as killed. Two: NaN is never a PASS. Three: an oracle exception is not a killed mutant.

Notice all three say the same thing in different ways. A killed mutant has to be a test that detected something, not an accident of the harness.

## [02:50] → E06 · Theory 3: finding eight

scientific-qa-evidence's FINDINGS dot md lists eight findings. Number eight says: the numerical runner reported oracle_valid true when the oracle had raised an exception or returned NaN. What part of the protocol caught it? Testing the test harness, by injecting failures into the oracle and the simulator.

And the same file says it straight: findings one, three, and eight were defects in the study's own earlier work, caught by later steps of the same protocol and fixed in the open. That runner was mine. That's why today it has tests of its own.

## [03:27] → E07 · Theory 4: the frozen contract

The second piece is the contract, CONTRACT dot md, frozen before any run. The tolerance is ten to the minus six, as absolute error normalized by each output's declared physical scale. It's fixed before running, and it doesn't move.

And the most important rule: the oracle doesn't share a solver with the implementation. The system under test lives in sut dot py, the oracles in oracles dot py, and they share no right-hand side, no solver, and no solution function. For the RC circuit, for example, the system under test integrates with fourth-order Runge-Kutta, and the oracle uses the closed-form exponential. For Snell, one uses arcsine and the other uses bisection. Why so careful? Because an oracle that shares the solver shares its bugs, and will never catch them.

The contract pins down everything else too. There's no randomness, so there's no seed. Only Python's standard library is used. You give the runner a fresh output folder, and if it already exists, it aborts without writing anything. It saves every observation row, one JSON per variant, timings, exit codes, and the SHA-256 of the sources, the contract, and the artifacts. And it forbids storing hostnames, IP addresses, or private paths in a publishable package.

## [04:48] → E08 · Theory 5: how verdicts are assigned

Classification is written down too, in the contract and in the runner's classify_variant function. A baseline passes only if its output is finite, satisfies the model's invariants, and its error is within tolerance. Otherwise it's BASELINE_INVALID. An invalid baseline blocks its mutants: they come out BLOCKED_BASELINE, never KILLED. A mutant is KILLED only if its baseline passed and the mutant is non-finite, breaks an invariant, or goes over tolerance. Otherwise it's SURVIVED. And if the oracle isn't finite, or the vector lengths don't match, the result is INCONCLUSIVE, never KILLED.

There's a line in the contract I love: never force a mutant to die. A tiny mutation may survive, and that's a valid calibration result, not a false negative to be reclassified.

## [05:37] → E09 · Theory 6: the campaign

The campaign: nine synthetic physics models. An RC circuit, Newton cooling, second-order chemical kinetics, Beer-Lambert attenuation, a logistic response, Snell refraction, a thin lens, an acoustic interface, and a Fechner response. Each model has three configurations, and each configuration has a baseline and two known mutants. That's eighty-one variants, plus three RC calibrations: eighty-four.

Result per machine: twenty-seven PASS, fifty-four KILLED, and three SURVIVED. Identical on macOS arm sixty-four and Linux x86 sixty-four, with a maximum scaled difference between machines of one point one one times ten to the minus sixteen. And watch how you count: that's eighty-four paired variants, not a hundred sixty-eight distinct cases.

On top of the error against the oracle, every model has physical invariants. The RC stays between the source and its initial value, and charging is monotone. Chemical concentration stays positive and never increases. For the acoustic interface, energy balance is checked: R squared plus Z one over Z two times T squared has to equal one. And the contract warns that energy conservation alone isn't enough if a boundary condition is broken.

## [06:49] → E10 · Theory 7: cases aren't behaviors

Two honesty details. First, the fifty-four KILLED count cases, not behaviors. Two acoustic mutants, pressure_boundary_sign and impedance_swap, produce identical output in all three configurations. That leaves fifty-one distinct killed behaviors. If you report fifty-four as if they were fifty-four different defects, you're inflating the number.

Second, the three survivors are a deliberately tiny change to the RC time constant, five times ten to the minus eight relative, against a tolerance of ten to the minus six. It's left in plain view on purpose. The kill rate is fifty-four out of fifty-seven, roughly ninety-five percent, and the three survivors are right there in the table.

And a third detail. Eighteen non-finite values show up in the campaign. They come from the rhs_sign mutant in the three second-order chemical kinetics configurations. There, the NaN isn't an infrastructure failure: it's the expected response of a mutant, which is why those cases are KILLED after their baseline passed. The difference from finding eight is where the NaN appears. In the system under test's output, it kills the mutant. In the oracle, it invalidates the measurement.

## [08:01] → E11 · Lab: the harness tests

Over to the terminal. Go into evidence slash numerical slash source in scientific-qa-evidence and run python3 dash m unittest dash v test_runner. All you need is Python's standard library.

Seven tests, all OK. An oracle exception marks the oracle invalid. A system-under-test exception keeps the oracle valid. An exception in a mutant is inconclusive, not killed. A NaN oracle plus a system exception: inconclusive, oracle invalid. A NaN oracle alone: inconclusive, oracle invalid. An oracle failure during export marks the collection incomplete. And a rerun reproduces the saved campaign: twenty-seven, fifty-four, and three.

That last test is what ties this back to the evidence module. The saved summary for the Mac campaign records the exact command, python3 runner dot py dash dash out with a fresh folder, a single process invocation, eighty-four evaluations, and a duration of four hundredths of a second. And check three in verificar dot py, rerunning the eighty-four numerical variants, is exactly this suite.

## [09:04] → E12 · Code: how to inject a NaN

How do you inject a broken oracle without touching the code? With mock dot patch. The test test_nan_oracle_alone swaps oracles dot evaluate for a function that returns four NaNs, runs the baseline of the first case, and demands two things: the status is INCONCLUSIVE, and oracle_valid is false.

And here's an observation that matters for your challenge. The course talks about three harness tests: invalid baseline, NaN, and oracle exception. test_runner has tests for the NaN and for the exceptions, but I didn't find a dedicated test that an invalid baseline blocks its mutants. The rule is in the contract and in the runner's code, but none of the seven tests attacks it directly. That one's yours to write.

## [09:52] → E13 · Terminal: the whole campaign with a NaN oracle

The lab asks you to inject a NaN oracle and check it never yields PASS or KILLED. I wrote a short script that runs the eighty-one baseline and mutant variants, without the three RC calibrations, first with the real oracle and then with the oracle swapped for NaN.

With the real oracle: twenty-seven PASS and fifty-four KILLED, same as the campaign. With the NaN oracle: twenty-seven INCONCLUSIVE and fifty-four BLOCKED_BASELINE. Zero PASS, zero KILLED. The baselines are inconclusive because the oracle isn't finite, and the mutants are blocked because their baseline didn't pass. The two defenses work together.

That script isn't in the repo: it's my own lab script, and I'm leaving it on screen in full so you can copy it. It uses the same mock dot patch as the harness tests, so it doesn't change a single line of the runner. The only thing that changes is what the oracle answers.

## [10:53] → E14 · WAR mutation: remove the oracle guard

Now this week's mutation, on a copy. I open runner dot py, inside run_variant, and remove the guard that checks the oracle is finite. It lives in two places: the if that sets oracle_invalid when the expected value isn't finite, and the "or not finite" part of the length comparison. Only the length comparison is left.

Before running anything, write down your prediction. Do the harness tests fail? What happens to a campaign where the oracle returns NaN for everything? And what if the oracle only breaks on the mutants?

## [11:29] → E15 · Terminal: what happens without the guard

Tests first: python3 dash m unittest test_runner. Seven run, two fail: the two NaN-oracle tests. Good, the harness has someone watching it.

Now the NaN oracle across the whole campaign. Twenty-four BASELINE_INVALID, fifty-four BLOCKED_BASELINE, and three INCONCLUSIVE. Zero KILLED, because the invalid-baseline rule blocks them. But look at the label: BASELINE_INVALID blames the system under test, when the broken thing is the oracle. The verdict is safe, but it lies about the cause.

And the dangerous case: the oracle is fine on the baselines and returns NaN only on the mutants. With the original runner, all fifty-four mutants come out INCONCLUSIVE. Without the guard, forty-eight come out KILLED with oracle_valid true, and six are INCONCLUSIVE only because the acoustic models return eight values and my fake oracle returned four. Forty-eight fake kills. That's finding eight, rebuilt by hand.

## [12:24] → E16 · What the mutation leaves behind

What do I take from this? Three things. One: layered defenses exist for a reason. The invalid-baseline rule saved the campaign when the oracle broke everywhere, but not when it broke only on the mutants. Two: the oracle guard does have tests, and that's why the mutation didn't slip by quietly: two tests went red. Three: a high kill rate proves nothing if you don't know the oracle was alive. Before you celebrate ninety-five percent, ask how many of those kills came from a valid oracle.

And one more example of what a well-reported mistake of your own looks like, from the same study. The contract is at version one point one, and its first line says why: a CSV export correction, with criteria and models unchanged. In version one, the exporter wrote only four scalar values for the acoustic interface, even though the JSON stored four repeated pairs of reflected and transmitted pressure. Version two labels every component and exports all of it: the CSV went from seven hundred twenty to seven hundred fifty-six rows per machine. The values, parameters, and classifications of all eighty-four variants stayed identical, and the record says so. That's what I want you to copy: the mistake, the fix, and what didn't change, all in writing.

## [13:49] → E17 · The challenge and how it's graded

Your challenge has three parts. One: run the harness tests. Two: inject an oracle that returns NaN and confirm it never yields PASS or KILLED. Three: add a simple tenth model, free fall with linear drag, with its analytic oracle, two known mutants, and one close to the threshold. The oracle has to be independent: if the system integrates the equation step by step, the oracle uses the closed-form solution.

Here's how it's graded. Your harness has the three tests, invalid baseline, NaN, and oracle exception, and all three pass. You've already seen the invalid-baseline one isn't in the repo: write it. The injected NaN never comes out PASS or KILLED. The table separates cases from distinct behaviors. And if the near-threshold mutant survives, it's reported as SURVIVED without lowering the tolerance. The tolerance is frozen first, and it isn't touched after you see the result.

The top level: your table separates cases from behaviors and explains which mutants are equivalent, like the repo's two acoustic ones.

## [14:56] → E18 · Mini-quiz

Three questions. Pause on each one.

One. The oracle returns NaN. What's the correct verdict? Neither PASS nor KILLED: the oracle is invalid.

Two. The oracle throws an exception on a mutant. Does that count as KILLED? No: an oracle exception is not a killed mutant.

Three. Eighty-four variants: twenty-seven PASS, fifty-four KILLED, and three SURVIVED. Kill rate? Fifty-four over fifty-seven, roughly ninety-five percent. The PASS results are the baselines, and they don't count toward the mutant tally.

## [15:27] → E19 · Wrap-up

Three ideas. One: every experiment gets a control that must pass and controls that must fail, one of each kind. Two: the harness gets tested too; NaN is never a PASS, an oracle exception is not a killed mutant, and an invalid baseline blocks its mutants, and each of those rules needs its own test. Three: freeze the tolerance first, use an oracle that doesn't share a solver, and leave the survivors in plain view.

Next module: fluid physics and statistics for the debugger. See you there.

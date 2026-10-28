# Title

Fluid physics and stats to test a neural predictor

(50 characters)

# Description

Module 31 of my free QA Automation course. You don't need to be a physicist to test a neural network that predicts a fluid, but you do need to know which law each check guards: incompressibility (D1), the energy budget (D2) and the momentum equation (D3). You don't need to be a statistician either, but you do need to know when a difference is just noise: Spearman, trajectory bootstrap and the Wilson interval.

In the lab I use my predictor-debugger repo: I verify the saved fingerprint, write my predictions down before running, sabotage three pairs (energy ×1.05, an added gradient, a phase shift) and see which check flags each one. This week's mutation hunts for the floor: how small an energy error can get before the debugger stops seeing it.

What's under test is the debugger, not the network. Everything comes from public repos and the course; the scope is a 32³ periodic box and says nothing about real turbulence or the Millennium Prize problem.

Cristian Guerra · QA · Medellín

## Chapters

00:00 Hook
01:20 Explained like you're 8
02:06 Theory · the three laws
03:39 Theory · D4 judges the judge
04:24 Theory · the controls
06:00 Theory · one-step vs rollout
07:27 Theory · stats so you don't fool yourself
08:58 Lab
12:42 WAR mutation of the week
14:26 The challenge and how it's graded
15:47 Mini-quiz
17:09 Wrap-up

# Tags

scientific QA, Navier-Stokes, neural operator, FNO, physics checks, Spearman correlation, cluster bootstrap, Wilson interval, mutation testing, WAR Paradigm

# Thumbnail text

Error or noise?

# Links

- Course module: https://criguex.github.io/qa-automation-course/#/m25
- Lab repo: https://github.com/criguex/predictor-debugger
- Pre-registered design: https://github.com/criguex/predictor-debugger/blob/main/DESIGN.md
- Round 5 kit: https://github.com/criguex/predictor-debugger/blob/main/round5/KIT.md
- Wilson interval used (agent-eval-jev): https://github.com/criguex/agent-eval-jev
- NASA Glenn, Navier–Stokes equations: https://www.grc.nasa.gov/www/k-12/airplane/nseqs.html
- SciPy spearmanr: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html
- SciPy bootstrap: https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.bootstrap.html
- Li et al., Fourier Neural Operator: https://arxiv.org/abs/2010.08895

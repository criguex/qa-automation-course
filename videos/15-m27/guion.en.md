# Script EN · Module 15 · m27 — Ephemeral containers and disposable environments

_Narration words: 2468 · estimated runtime 16:27 at 150 wpm_

Voice: Cristian, first person, conversational. The `[mm:ss]` marks come from the word count at 150 wpm. Each block names the scene it goes with. Lines starting with `>` are production notes and are not read aloud.

## [00:00] → E01 · Hook

I had an AI assistant recompute, from scratch, all four rounds of my debugger for a physics predictor. It ran on an ephemeral executor, a machine that's born, does its job and disappears. And it disappeared. With it went the 81 result arrays from a first run.

This is what's written in the release package, word for word: "Original previous-run 81 arrays disappeared with ephemeral executor." The arrays were gone. But the fingerprints and hashes that had been saved somewhere else survived, and that's what let me compare.

That's what this module is about: making evidence outlive the environment it was born in.

## [00:41] → E02 · Title

Module fifteen: ephemeral containers and disposable environments. We'll look at what you lose when a runner or a container dies, four designs that get your evidence out in time, and the real case of predictor-debugger's release repro-ia-20261026, receipts included.

## [00:57] → E03 · Explained like you're 8

Have you ever built a sandcastle at the beach? It looks amazing, towers and all. Then the tide comes in and takes it. The next day, nothing's left.

Now imagine that before the tide comes in, you take a photo and write down in a notebook how you built it: how many buckets of sand, which mold you used, in what order. The next day the castle is gone, but you can prove it existed, and you can build it again exactly the same.

The computers that run our tests are like that beach. The photo is the artifact. The notebook is the pinned inputs.

And one more trick: if you build in small pieces and take a photo of each tower as soon as it's done, when the wave comes you only lose the tower you were working on. The others are already saved. That's a checkpoint.

## [01:56] → E04 · Theory 1: what counts as ephemeral

More things are ephemeral than you'd think. A GitHub-hosted Actions runner: every job starts on a clean machine that's thrown away when it finishes. A Docker container: its writable layer dies with it. A devcontainer: the development environment declared in dot devcontainer slash devcontainer dot json, rebuilt the same way every time. Testcontainers: databases and services that are born and die with the test. And per-PR previews: one deployment per PR that gets deleted when you close it.

They all share one property. Whatever lives only inside them goes away with them.

## [02:33] → E05 · Code: a truly ephemeral SUT

Look at the workflow in restful-booker-quality-suite. It clones the system under test at commit 0046115. It starts it with docker compose up dash dash build. It waits for the ping endpoint, up to thirty attempts. And if anything fails, it dumps the container logs with if failure.

When the job ends, the SUT dies with the runner. That's why the logs get printed first, in the same job. If you wanted to dig into a failure an hour later, there'd be no container to get into. All that's left is what was printed to the log and what was uploaded as an artifact.

## [03:14] → E06 · Theory 2: what's lost and what survives

Let's take inventory. When the environment dies, you lose the state on disk, the files you didn't upload, the cache, the processes that were running, and the identity of those processes: the PID, the session.

That last one sounds odd, but you'll see it turned out to be the trickiest part of the real case.

What survives? Whatever you got out: artifacts, release assets, commits. And whatever you can recompute from pinned inputs. Those are the only two ways out. Either you got it out, or you can build it again exactly the same.

## [03:52] → E07 · Theory 3: design 1, artifacts and receipts

First design: artifacts and receipts. Upload everything you need to make a decision with actions/upload-artifact and the not-cancelled condition, so it uploads even when something fails. And upload it with its SHA256SUMS, so whoever downloads it can check it's the same thing that left the runner.

So what's a receipt? It's the minimum someone else needs to trust a result without having been there: the command you ran, the input and output hashes, and the exit code. With that, if the environment dies, you have a way to compare a new run against the old one.

In the real case's package, the receipts folder has files whose names explain themselves: fresh-environment.json for the environment, source-integrity.json for the source code, downloads.jsonl for what was downloaded, and a SHA256SUMS. That's what a receipt looks like in practice.

## [04:46] → E08 · Code: design 2, pinned inputs

Second design: pin your inputs. If you didn't pin something, you won't be able to repeat it.

Lockfiles: npm ci for Node, and in predictor-debugger, uv run dash dash locked. Tool version: predictor-debugger's workflows use astral-sh/setup-uv with version 0.11.18, pinned, not whatever's latest. The commit of the system under test: restful-booker's 0046115. Images by digest, with at sha256, not by tag, because a tag can point to a different image tomorrow. And data checked against SHA256SUMS and a manifest: that's what tools/fetch_data.py does before it extracts anything.

## [05:20] → E09 · Theory 4: design 3, idempotent checkpoints with a lock

Third design, for long runs that might get cut off: idempotent checkpoints with a lock.

Three rules. First: every task writes its result atomically. First to a temporary file, then you rename it with mv. If the process dies halfway, you're never left with a half-written checkpoint under the real name: it's either complete or it isn't there.

Second: next to the result you store its hash. When you resume, any task whose hash checks out gets skipped. The file merely existing isn't enough, because it could be truncated or stale.

Third: a flock stops two processes from doing the same task at the same time.

And a big warning: checkpoints that live on the runner's disk die with the runner. If you want to resume on another machine, they have to get out first.

## [06:14] → E10 · Code: design 4, verify in a clean environment

Fourth design: verify in a clean environment. That's predictor-debugger's reproduce.yml. It runs on a fresh ubuntu-24.04, downloads data-v1, checks the hashes, recomputes, and demands with grep dash q that the verdicts match and the fingerprint is the same.

The beautiful part of this design is where it lives: in the repo, not on any machine. So it outlives any executor. In the clone I reviewed, it covers rounds one and two. On its first run, according to the README, round one took six minutes and thirty-three seconds including the download, and produced the fingerprint EEC9-09E0-F77D.

## [06:52] → E11 · Terminal: the real case, the release notes

Now, the real case. gh release view repro-ia-20261026 dash R criguex slash predictor-debugger.

The notes say: full recompute of rounds one to four from data-v1, on commit b918c62, without retraining or rerunning inference on the networks. And there's one sentence I want you to read slowly. In English it says: an AI assistant ran it under my direction, and this is not an independent review.

The table lists the four fingerprints: EEC9-09E0-F77D, D506-F58F-3838, 6319-537B-7167 and 681D-143B-64A3. All four match the original. Linux x86_64, Python 3.12.14, NumPy 1.26.4, a single thread, 96,870 records and about seven and a half hours of compute.

And the limitations, which the package declares itself: the data from a first run was lost; the 81 round-one files were regenerated, and none of them is bit-for-bit identical to the published ones, differing by at most 8.9 times ten to the minus sixteen; and round four was interrupted and resumed from checkpoints. There's a third one: a supplementary check failed while serializing its output, because of a numpy.bool_ type. Only the output was fixed, and it reran fourteen out of fourteen. And against the Mac, WAR and GUERRA, the statistics differ by at most six times ten to the minus fourteen.

That's what I like about this release: it hides nothing. It tells you what came out the same and what didn't.

## [08:22] → E12 · Terminal: download and verify before you open

Before you open a package, you verify it. Empty folder, gh release download, then shasum dash a 256 dash c against the dot sha256 file that ships next to it.

I ran it today and the output was a single line: the zip's name, a colon, OK. Only then did I unzip it. Inside are 441 files: logs, commands, environment, receipts and results.

Notice the order. If you verify after opening, you've already run or read something without knowing where it came from.

## [08:55] → E13 · Code: what the receipts say

Three files from the package. results_scope.txt says the 81 arrays from the previous run disappeared with the ephemeral executor, and that the earlier durable hashes and statistics were recovered. And here's the key part: the new generation is explicitly labeled NEW RUN, not as a recovery of the old arrays. The same file pins down the scope: no model training, no new inference, no public changes, no CI triggers. And the comparison rule: strict bit identity and unchanged verdicts, with numeric differences reported as descriptive only and no relaxed tolerance.

receipts slash lock-hardening.json: a global flock serializes the scientific task and the summary, and each task's SHA and rows are checked under the lock so resuming is idempotent. It also owns up to a detail: task zero of round four started under the old wrapper, without the lock; from task one onward, everything runs under it. And it leaves a written warning: don't conclude a process died just because it doesn't show up in a different process namespace.

And receipts slash interruption.json. When the session running round four was lost, six tasks were verified, numbers zero, one, two, three, four and twenty-four, plus 600 rows. The lock showed up as free. And the receipt says: free, but "not sufficient alone to prove old driver absent." The policy was to restart nothing while the old process's identity was uncertain.

Look at the error that started it all: the transport to the execution server disconnected, and on retry the answer was "Unknown process id." The filesystem was still reachable, but the identity of the previous boot had never been recorded. Recovery happened with explicit authorization, on the same lock inode, with atomic receipts and hash and row checks under the lock. And the receipt ends with an honest line: the original process's exit is still unknown.

## [10:57] → E14 · Theory 5: four lessons

I take four lessons from this case.

One: whatever lived only on the executor was lost, and the hashes and statistics stored outside were what made comparison possible.

Two: regenerating isn't recovering. If you rebuild a result, you declare it as a new run. Bit-identical and verdict-identical are different things, and you have to say which one you've got.

Three: a free lock doesn't prove the old process died. It could still be alive where you can't see it, writing over your checkpoint.

Four: a matching fingerprint is the evidence that outlives everything else.

And one honest detail: the release doesn't mention CI. Recomputing on a clean runner is a different path, the reproduce.yml path. And since this isn't an independent review, the next step is for someone else to run reproduce.yml or the package.

## [11:51] → E15 · Terminal: the cheap fingerprint

On your own machine there's a cheap check. Clone predictor-debugger and run uv run dash dash locked verify.py dash dash saved mac. It reapplies the thresholds to the saved statistics and recomputes the fingerprint, with no data download. It should print fingerprint EEC9-09E0-F77D.

On screen I'm showing the saved log of that same check on Linux, the one in logs slash linux slash verify_saved.log. Five hypotheses at PASS, "verdicts equal to saved results/linux/verdicts.json: True," and the fingerprint EEC9-09E0-F77D. The same one as on the Mac, WAR and GUERRA.

## [12:26] → E16 · Lab, step by step

Your turn. Step one: read the release with gh release view. Step two: download it into an empty folder and verify it before opening it. Step three: read results_scope, interruption and lock-hardening, and fill in a three-column table: what was lost, what was regenerated as a new run, and what survived, with the file that says so.

Step four: check the cheap fingerprint on your machine.

Step five: write your own run with checkpoints. On Linux or on the CI runner, because macOS doesn't ship flock. You open the lock with exec 9 and flock dash n 9. For each task, if sha256sum dash c passes on its receipt, you skip it. If not, you compute into a temp file, mv it to the real name and store its sha256. At the end, a SHA256SUMS of everything, and the fingerprint from the first twelve characters of its hash.

Step six: the workflow. ubuntu-24.04, install from the lockfile, the run, the fingerprint in the log and in the job summary, and upload-artifact with out and SHA256SUMS, even when it fails.

## [13:38] → E17 · This week's WAR mutation

This week's mutation is killing the environment on purpose. Before you do, write down what you expect to lose.

Option one: kill the container halfway through the run with docker kill, or in CI with gh run cancel, and launch it again. Option two: delete the cache with gh cache delete dash dash all and launch it again.

Here's what has to happen: the fingerprint is the same, the resumed run skips the tasks that were already verified, and two processes never run at once. If the fingerprint changes, if a verified task runs again, or if two processes get in at the same time, that's a finding. Log it, with its log.

## [14:23] → E18 · The challenge and how it's graded

The deliverable has four pieces: the workflow on a clean runner with an artifact, SHA256SUMS and a fingerprint; the checkpoint script under flock; evidence of the run killed and relaunched with the same fingerprint; and the table of what was lost and what survived in repro-ia-20261026.

The criteria: you kill the run, relaunch it, and the fingerprint is the same, with both links. With the cache deleted, the fingerprint doesn't change. Locally, with out mounted as a volume, you docker kill it halfway, resume, and the log shows it skipping what was verified, while a second process using flock dash n exits with an error as long as the first is running.

On the rubric, the top level for "what survives" is a third party downloading your artifact and verifying the fingerprint without your help.

## [15:17] → E19 · Mini-quiz

Three questions. Pause if you like.

First: a job finishes on a hosted runner. What's left? What you uploaded as an artifact, what you published in a release, and what you committed. Nothing else.

Second: the session drops and the global lock shows up as free. Can you just restart? No. In repro-ia-20261026 the free lock was judged not enough to prove the old process had died, and nothing was restarted while its identity was uncertain.

Third: the 81 round-one files were regenerated and differ from the published ones by at most 8.9 times ten to the minus sixteen. What are they? A new run, declared as one. None is bit-for-bit identical, and the fingerprint and verdicts do match.

## [16:04] → E20 · Wrap-up

Three ideas. One: whatever you didn't get out before the environment died is gone. Two: whatever you didn't pin, you won't be able to repeat. Three: regenerating isn't recovering, and a free lock doesn't prove the process died.

In the next module we switch gears: performance and cloud, with k6, percentiles and time budgets. See you there.

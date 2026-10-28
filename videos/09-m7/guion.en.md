# Module 7 · BDD — Gherkin, Cucumber & Serenity

English narration script, adapted (not translated) from the Spanish version. Voice: Cristian, first person. Reference pace: 150 words per minute. The `[mm:ss]` marks are computed at that pace; each block names its scene in `escenas.json`.

## 1. Hook

**[00:00] → E01**

This is a feature file from one of my older repos, selenium-cucumber-pom. It reads nicely. Given the user is on the page, when they fill in the creation form, then a success message is shown. Anyone on the team can follow it.

Now open the code. The last two steps, the one that fills in the form and the one that checks the success message, do exactly one thing: they throw `PendingException`. The scenario promises it checks a success message, and it doesn't. The README is honest about it: the second recipe is only half written. But if all you read is the feature file, you'd think that part was tested.

**[00:44] → E02**

That's the risk of BDD, and also its power. A scenario is a promise written in the language of the business. This is Module 7: Gherkin, Cucumber and Serenity. You'll learn to write declarative features, reuse steps, generate living documentation from the pipeline and, above all, decide when this layer helps and when it gets in the way.

## 2. Explained like you're 8

**[01:08] → E03**

Gherkin is telling the test as a tiny story. Given I have an account at the store. When I buy a ball. Then I get a receipt. Three sentences, and the whole team gets it: the person who sells, the person who codes, and the person who tests.

But the story doesn't do anything by itself. Behind every sentence there's a helper who knows how to actually do it: open the page, fill in the boxes, check the receipt. The story says what happens. The helper knows how.

And one rule: if the story says "I get a receipt", somebody has to check that the receipt shows up. If nobody checks, the story is lying.

## 3. Theory

### Block 1 · The philosophy: three amigos, examples, shared language

**[01:54] → E04**

BDD doesn't start in Cucumber. It starts with a conversation. The three amigos are the business side or product owner, development, and QA, and they meet before anything gets built, not at the retro. Their job is to agree on concrete examples of behavior: "if the expense is 50 dollars, it goes to review; if it's 49.99, it's approved automatically". Those agreed examples become scenarios.

I didn't make that example up. It comes from spendwise-qa-assessment, an evaluation I did against a set of expense rules. The rule said the auto-approval threshold is 50 dollars. The test case was written with both edges: 49.99 with a receipt gets approved automatically; 50 stays pending approval. And what happened? It failed. That's BUG-18: an expense of exactly 50 dollars was approved automatically when a person should have reviewed it. A concrete example, agreed up front, caught a money bug. That's what BDD done right gives you.

Without that conversation, BDD is just syntax. You maintain two layers, the feature and the code, to say the same thing twice.

The other ingredient is a shared, ubiquitous language: the same words in the user story, the feature, the code and the conversation. If the business says "account", the code says "customer" and the feature says "user profile", you've got three languages for one thing.

And here's the course mentor's warning: BDD is a layer on top of automation. It doesn't replace it. Gherkin coupled to the UI is an anti-pattern.

### Block 2 · Declarative versus imperative

**[03:32] → E05**

Look at these two lines. "When I click #btn-submit and wait 2 seconds." And "When I submit the registration form with valid data." The first is imperative: it describes the mechanics, selector and wait included. The second is declarative: it describes business intent. Selectors, waits and technical details live in the steps, not in the feature.

Same with checks. "Then the response contains $.data.items[0].status equal to ACTIVE" is technical detail in the business layer. The feature should say "the order shows as active", and the JSONPath lives inside the step.

**[04:08] → E06**

Now my own repos, because you learn more there than from a perfect example. In selenium-cucumber-pom, the registration feature says "When User clicks on create button and select costumers". It mentions a click. And if you open the step, what it actually does is fill in the basic and contact data. The step's name and what it does don't match. In serenity-screenplay-salesforce, the create-account feature says "When goes to account functionality and click on new". Another click in the business layer.

I'm not showing you this to look bad. I'm showing you because this is exactly what happens on real projects, and this module's criterion says: no step mentions selectors or UI clicks.

**[04:53] → E07**

What would declarative look like? Something like: "Given I'm signed in as a sales rep. When I register a new customer with valid contact details. Then the customer appears in the directory." No buttons, no selectors. If the screen moves to a different menu tomorrow, the feature stays the same; you change the step.

Look at the shape, too. One Given that sets the context, one When with a single business action, and one Then with an observable result. The original `Register.feature` has two Whens in a row: "clicks on create button" and "enters the info". Two actions in one scenario usually means two behaviors, or one action broken into UI steps. If you need several lines to describe one action, those lines are implementation, and they belong in the step.

And the Then has to be something you can observe and check. "Then it shows a success message" is well written. The problem in the hook isn't the sentence. It's that nobody verifies it.

### Block 3 · From features to reusable steps, on any engine

**[05:59] → E08**

Underneath the feature there's a stack. The feature calls steps. Steps call the layer that knows how to do things: Page Objects, like in Module 5, Screenplay tasks, or an API client, like in Module 6. That's why Cucumber and Serenity run the same way on top of Playwright or RestAssured. The feature doesn't know and doesn't care.

The core value of BDD is reuse. "Given I'm signed in as admin" gets written once and twenty scenarios use it. If two people write two families of steps that do the same thing, "I log in as admin" and "the admin is logged in", that reuse is gone. The rule is to converge on one canonical phrasing and refactor the features toward it.

**[06:48] → E09**

Look at how Serenity solves it with the Screenplay pattern in serenity-screenplay-salesforce. There's an actor named Cristian with the ability to browse the web. The step "actor is on the home page" asks the actor to perform the task `LoginActions.login()`. The step "the account is created" asks the actor a question, `ElementTextValidator`, and checks it with `seeThat` and `containsString`. Tasks to do things, questions to check things. The step stays short and readable, and the logic lives in classes you can reuse.

**[07:20] → E10**

There's another detail in that repo that's gold for living documentation. `serenity.properties` has a line where `serenity.compromised.on` points to the project's `Exceptions` class. Serenity separates a test that fails from a test that's compromised. Failed means the system didn't do what the scenario promises. Compromised means something stopped you from testing, like the login page not loading. They look different in the report.

That matters because an environment red isn't a product red. Mix them up and your living documentation says the product is broken when what was broken was the environment.

And in selenium-cucumber-pom, the way the driver is shared across step classes is PicoContainer: every step class receives a `Context` in its constructor. Same idea as the fixtures in Module 5, dependency injection, just in Java.

### Block 4 · Outline, Background and tags

**[08:12] → E11**

Three constructs you need to own. First, the Scenario Outline. If you have to test login with five credential combinations, you don't copy five scenarios. You write one template and an Examples table with five rows. Same behavior, different data, zero duplication.

Second, the Background. If every scenario in a feature needs "Given I'm signed in as admin", that goes once, in a Background at the top of the feature. Repeating it is noise. Hiding it in a hook is invisible magic: whoever reads the feature never finds out.

Third, tags. `@smoke`, `@regression`, `@payments`. They let you choose what runs: smoke on every pull request, regression every night, one module on demand.

**[08:56] → E12**

My karate-api-testing repo uses all three. The Background in `brand.feature` sets the base URL and reads the response schema. Every scenario is a Scenario Outline with three example rows: maybelline, marcelle and iman. And the scenarios are tagged `@positive` or `@negative`, so you can run `mvn test -Dkarate.options="--tags @positive"` and only the positive ones run. Five features, thirty scenarios, almost nothing repeated.

Karate is Gherkin with no glue code: the step itself makes the HTTP call. For APIs it works really well. For business readers, careful: lines like `match jsonResponse[0].brand contains` are technical. That feature gets read by a QA engineer, not by the product owner.

Compare that with selenium-cucumber-pom. There, selection happens by runner: `RunnerLogin` points at the login feature and `RunnerRegister` at the registration one, each with its own path. That works with two features. With forty, you'll end up with forty runner classes or editing code to filter. With tags, you filter from the command line without touching anything. That's why I want tags in your deliverable from day one: at least `@smoke` and `@regression`.

### Block 5 · Living documentation, and when BDD gets in the way

**[10:08] → E13**

Living documentation is the report generated on every run: the scenarios in business language, with their real status today. Because the scenarios are executable, that report can't lie about what happened in the run. A wiki someone updates on Fridays can.

**[10:24] → E14**

In selenium-cucumber-pom, the runner has the pretty, HTML, JSON and JUnit plugins. The HTML ends up in `target/cucumber-reports/report.html`. With `mvn verify`, the maven-cucumber-reporting plugin leaves a consolidated report in `target/cucumber-html-reports/`. In serenity-screenplay-salesforce, `mvn verify` builds the Serenity report in `target/site/serenity/`, with an `index.html`, a single-page version, step-by-step screenshots and the Screenplay narrative for every scenario.

But read what both READMEs say: there's no CI workflow, because both point at private environments that need credentials. So today, that living documentation only gets generated locally. This module's criterion asks for it to be generated in the pipeline. That's your job.

**[11:03] → E15**

When does BDD get in the way? When you use it as a technical wrapper with no business language. If nobody from the business side helps write the examples and nobody reads the features, you've got an extra layer to maintain and no payoff. In that case, a well-named Playwright test says the same thing with fewer moving parts.

And a note on organization: `.feature` files are organized by business capability, like checkout or returns, not by screen and not by technical class. If a technical refactor forces you to move features around, they were organized wrong.

## 4. Step-by-step lab

**[11:42] → E16**

On to the lab. selenium-cucumber-pom needs JDK 17, Maven and Chrome. Configuration comes from environment variables: `BASE_URL`, `APP_USERNAME`, `APP_PASSWORD` and, optionally, `HEADLESS`. If the credentials are missing, the suite stops right away with a clear message. Then `mvn clean test` runs both runners, `mvn clean test -Dtest=RunnerLogin` runs a single flow, and `mvn clean verify` adds the consolidated report.

An honest warning: the app under test is private. Without access to that staging environment, the suite won't run. Use it to study the structure and as a refactoring exercise: rewrite `Register.feature` in a declarative style and implement the two pending steps against an app you do have access to.

**[12:26] → E17**

serenity-screenplay-salesforce works the same way: export `SF_USERNAME` and `SF_PASSWORD`, and run `mvn clean verify`. For a single feature, `mvn clean verify -Dtest=RunCreateAccountFeature`. You need an active Salesforce org, and `EditAccount.feature` picks a random account, so the org needs at least one. The form data is random on every run, so no two runs are identical.

**[12:48] → E18**

And the one you can run today, no credentials needed: karate-api-testing against the public Makeup API. Run `mvn clean test`, then try the tags: `--tags @positive` and `--tags @negative`. Open `target/karate-reports/karate-summary.html`: one page per feature with the request and response logs. That's living documentation for an API.

And this repo does have CI. The workflow runs `mvn -B test` on JDK 17 on every push and pull request to main, and uploads `target/karate-reports/` as a build artifact. That's the pattern you need for the third criterion: the run produces the report, the pipeline keeps it, and anyone on the team can open it without asking you. Living documentation that only exists on your laptop isn't documentation for anybody else.

There's one limit the README writes down: every scenario calls a third-party public API, with no mock. If that API goes down or changes its data, the result changes. Keep that in mind when you read a red.

**[13:50] → E19**

Your main exercise: turn two or three flows from Modules 5 and 6 into features. For example, the golden flow from war-paradigm: an editor creates, an approver approves, the editor publishes. In declarative Gherkin: "Given a draft document created by an editor. When an approver approves it. Then the document is approved." And a "I'm signed in as" step that takes the role as a parameter and gets reused in at least three scenarios. Underneath, the steps call your Page Objects or your API client. On top, not a single click.

## 5. WAR mutation of the week

**[14:27] → E20**

A Gherkin scenario is a promise. This week you put it to the test: mutate one step of the flow and check that some scenario fails.

Two example mutations, taken from war-paradigm's mutants. A different role: swap "When an approver approves it" for a read-only user. The app in that experiment answers 403, and your scenario, if it says "Then the document is approved", has to go red. A different state: publish before approving. That app answers 409 to the reorder mutant. If your BDD suite stays green with either one, your steps aren't checking what the feature promises.

And if you run the exercise on `Register.feature`, you'll see the extreme case: with its steps throwing `PendingException`, that scenario can't catch anything. The simplest mutation is removing the success message, and nothing will notice until someone implements that step.

## 6. The challenge and how it's graded

**[15:22] → E21**

The deliverable: a BDD suite with features and reusable steps, plus a living documentation report.

The criteria. One: no step mentions selectors or UI clicks, and a grep for "click" and "#" across your `.feature` files proves it. Two: at least one step is reused in three scenarios. Three: the living documentation report is generated in the pipeline, not just on your machine.

And the top level: a mutated scenario, with a different role or a different state, fails, and you show it.

## 7. Mini quiz

**[15:55] → E22**

Three questions. Pause if you want.

First. Which of these steps is declarative Gherkin? A, "When I click #btn-submit and wait 2 seconds". B, "When I submit the registration form with valid data". C, "When I run window.submit() in the console". D, "When QA runs the registration test".

**[16:14] → E23**

It's B. Declarative means business intent. Selectors, waits and technical details live in the steps.

Second. You need to test login with five credential combinations. Which construct do you use? A Scenario Outline with an Examples table: one template, five rows, zero duplication.

Third. Who are the three amigos and when do they meet? Business or product owner, development, and QA, before anything is built, to agree on concrete examples of behavior.

## 8. Wrap-up

**[16:43] → E24**

Three ideas. One: BDD starts with a conversation; without examples agreed with the business, it's bureaucracy. Two: the feature says what, the steps know how; no clicks or selectors up top. Three: a scenario is a promise, and living documentation is only worth something if every step really checks what it says.

In Module 7b we talk about disciplined execution: test cycles without rerunning everything, test data with its caveats, and known defects tagged without hiding anything.

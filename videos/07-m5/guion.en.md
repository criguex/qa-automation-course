# Module 5 · Playwright + TypeScript E2E — a framework from scratch

English narration script, adapted (not translated) from the Spanish version. Voice: Cristian, first person. Reference pace: 150 words per minute. The `[mm:ss]` marks are computed at that pace; `→ E07` points to the scene in `escenas.json`.

## 1. Hook

**[00:00] → E01**

On September 26, 2026, all five runs of my qa-eval-lab repo on main went red. The UI job ended with one test passing and two failing. Nothing was broken in the app. My test was the problem. After reusing the saved session, it waited for a welcome message that the site shows exactly once, right after you log in. With a saved session, that message never shows up, so the test failed even though the user was already inside.

**[00:32] → E02**

Today you're going to build a Playwright and TypeScript framework that doesn't fall into that trap. Page Objects, fixtures, a single login reused with storageState, a flow with two roles, and a trace to diagnose failures instead of a sleep. This is Module 5, and for me it's the heart of the craft.

## 2. Explained like you're 8

**[00:53] → E03**

Picture a robot that uses a web page the way a person would. It opens the page, clicks a button, types its name, and checks that the right thing shows up. That's Playwright.

Now picture the robot carrying a notebook. On each page of the notebook it wrote down where every button on one screen lives: the login page, the cart page, the checkout page. So when you tell it "sign in as this user", it doesn't hunt for the buttons again. It flips to the right page and goes. That notebook is a Page Object.

One more thing. The robot doesn't walk through the front door every time it plays. It goes in once, keeps its wristband, and shows the wristband the next time. That wristband is storageState. And if someone takes the wristband away, the robot gets stuck outside, and we need to be able to see that too.

## 3. Theory

### Block 1 · Locators, auto-waiting and web-first assertions

**[01:53] → E04**

Let's start with what breaks suites the most: how you find an element, and when you decide it's ready.

A locator in Playwright isn't the element. It's the recipe for finding it every time you need it. When you click, Playwright looks the element up right then, waits until it's visible, stable and enabled, and only then acts. That's auto-waiting.

The recipe matters. Compare `getByRole('button', { name: 'Pay' })` with a CSS chain like `.btn-pay-2 > span`. The first one is anchored to what the user sees: a button called Pay. The second is anchored to how a developer happened to mark up that button this sprint. CSS changes every sprint. The role and the accessible name only change when the product changes.

**[02:41] → E05**

In civica-playwright-challenge this is a written decision. ADR 0003 says: semantic locators only, no XPath, no CSS. The search box is found with `getByPlaceholder('Search IMDb')`, the menu button by its role and name, the movie title by a stable test id. And the consequence the ADR writes down applies to you too: if you want to find something by its role, it has to have a role and a name. Without trying, you start checking accessibility.

The other half is the assertion. Look at these two lines. `await expect(locator).toBeVisible()` retries until the timeout. It waits for the condition to come true. `expect(await locator.isVisible()).toBe(true)` checks once, and if the page hasn't finished loading, it fails. The first one is a web-first assertion. The second is a snapshot of a single instant, and snapshots of a single instant are the number one source of flaky tests.

### Block 2 · Fixtures, the Page Object Model, projects and baseURL

**[03:39] → E06**

A Page Object is a class that hides how you drive a screen behind methods that say what you want to do. In civica, `HomePage` has a `searchFor(query)` method. Inside, it clicks the box, fills it and presses Enter. From the outside, the test just says "search for Inception".

So who creates those Page Objects? That's where fixtures come in. A fixture is setup and teardown with a name, with types, on demand. In civica, `pageFixtures.ts` extends Playwright's base `test` and declares `homePage`, `searchResultsPage`, `movieDetailsPage` and `top250Page`. A test asks for them in its signature and Playwright hands them over, ready to use. No test ever writes `new HomePage(page)`.

**[04:22] → E07**

The interesting part is how they stack. `mockFixtures.ts` extends those page fixtures and adds one called `mockedSite`, marked `auto`. That fixture installs the router that intercepts requests before every test. Tests in the mock project import this `test`. Live e2e tests against the real site import the other one. Same Page Objects, different backend, and not a single assertion changes.

That's what a fixture gives you over a global `beforeEach`: each test declares what it needs and doesn't pay for what it doesn't use. "This test needs the results page" is right there in the signature, not buried in a setup file somewhere else.

Projects complete the picture. Civica's `playwright.config.ts` has seven: mock, mutation, audit, api, performance, visual and e2e, each with its own folder and settings. The `baseURL` lives in the config, not in the tests, which is why tests navigate to `'/'` instead of a full address. If you switch environments tomorrow, you change one variable, not a hundred files.

**[05:27] → E08**

The deliverable also asks for smoke and regression. You don't need two frameworks for that. You need tags. In civica, the main search test has `@smoke` in its title: search for Inception, check the title on the details page. The `test:smoke` script runs `playwright test --project=mock --grep @smoke`. One happy path per required case, something you run before you push. Regression is everything else: the walk through the whole catalogue, the case-insensitive search, and the search that must find nothing.

That last one is the one people forget. A suite that only proves things show up tells you nothing the day search starts returning anything at all. That's why civica has "shows no results for an unknown title": it searches for a name that doesn't exist and expects to see "no results found".

### Block 3 · Reusable login with storageState, and network interception

**[06:20] → E09**

Back to the hook. In qa-eval-lab the config has two projects. The first is called setup and only runs `auth.setup.ts`. The second is called ui, depends on setup, and uses `storageState: '.auth/user.json'`.

**[06:33] → E10**

The setup file goes to `/login`, fills the username and password with `getByLabel`, clicks the button named login, confirms it got in, and saves the context state to `.auth/user.json`. Cookies and local storage end up in that file. Every test in the ui project starts with that session already in place.

UI login gets tested once, on its own. Everything else starts authenticated. Tests run faster and, more importantly, they don't fail because the login form had a bad day.

And here's the lesson from that red September. The original session test waited for the flash message "logged into a secure area". That message is produced by the act of logging in. If you reuse the session, that test never logs in, so the message doesn't exist. The fix, in commit 7e56d62, was to ask a better question. Instead of looking for the message, the test checks that the URL ends in `/secure` and that the Secure Area heading is visible. That's what "I'm in" actually looks like.

**[07:40] → E11**

The other tool in this block is network interception. With `page.route` you grab a request before it leaves and decide what to answer with `route.fulfill`. Civica uses it in a big way: IMDb shows bots a "confirm you are human" wall, so the mock project intercepts every request and answers with IMDb-shaped HTML generated from a single data source.

In your framework, use it on a smaller scale. Want to see what the UI does when the backend returns a 500? Intercept that endpoint and return a 500. No taking down staging, no asking anyone for favors, and the test gives the same result every time.

### Block 4 · Isolation, parallel runs, retries and the trace viewer

**[08:22] → E12**

Every Playwright test runs in a fresh browser context, with clean cookies and storage. That's what lets you run in parallel. If two parallel tests both create the user `test@demo.com`, one of them will randomly fail with "already exists". The fix isn't running everything serially, and it isn't a retry on that test. The fix is unique data per test: tests don't share state that can change.

About retries. Civica sets `retries: 2` in CI and `trace: 'on-first-retry'`. Read that carefully: the retry is there to capture evidence the first time something fails, not to turn red into green. If a test passes on the second attempt, Playwright marks it as flaky, and that's a finding you go investigate.

**[09:10] → E13**

How do you investigate? With the trace viewer. For every action, the trace keeps a DOM snapshot, the network requests and the console. You open it with `npx playwright show-trace` plus the file path, and you step through the test. You see which action it stopped on, what was on screen at that moment, and what the server sent back.

That's why I say debugging CI without a trace is guessing. And that's why this module's criteria say no test uses `waitForTimeout` or a sleep. A three-second sleep fixes nothing. If the page takes four seconds, it still fails. If it takes one, you just burned two seconds on every run.

**[09:54] → E14**

One more thing, about honesty. Sometimes a test can't run because of something you don't control. In civica, the e2e tests against the real IMDb run into the anti-bot wall. Here's what they do: `test.skip(await isBotWallPresent(page), 'IMDb anti-bot wall detected — live E2E not runnable')`. If the wall shows up, the test steps aside and says why. No fake red, no fake green.

The README sums it up: 76 tests, 74 pass and 2 are honestly skipped. "Honestly" is the important word. A skip with no reason hides coverage. A skip with a checkable condition and a clear message tells anyone reading the report what wasn't tested and why.

## 4. Step-by-step lab

**[10:38] → E15**

Let's go to the terminal. I clone qa-eval-lab and follow its README: `npm install`, `npx playwright install chromium`, and `npm run test:ui`. The README warns you about something useful: on Node 26, `npm install` fails while compiling a Promptfoo dependency. For the Playwright part, `npm install --ignore-scripts` is enough. CI uses Node 20.

**[10:59] → E16**

This is the run I did on my machine on October 26, with Playwright 1.64.1. Three tests, one worker. First the setup project: authenticate. Then the ui project: authenticated session reused, and logout works. Three passed in 4.2 seconds. In CI, run 40373649268 gave three passed in 5.8 seconds.

Notice the order. Setup runs first because ui depends on it. If setup fails, ui doesn't even start. That dependency is what guarantees the storageState file exists before anything uses it.

If the app you're testing has a captcha or two-factor login, the same setup has a manual mode. You run `MANUAL_LOGIN=1 npx playwright test --project=setup --headed`, log in yourself in the window, and the session file is saved for every other test.

**[11:48] → E17**

Now a bigger framework. I clone civica-playwright-challenge, run `npm install`, which also installs Chromium, and then `npm test`. That script runs only the mock project. The expected output documented in the README ends with 19 passed: search, Top 250, details page checks and accessibility.

CI runs everything deterministic. Run 38665514760 on main, from October 15, 2026, went like this: mock 19, mutation 21, audit 9, API 11, contract 6, performance 4 and visual 4. Notice how each project reports on its own. When something breaks, you know right away which layer it's in.

For your repo, I'd suggest the same shape, only smaller: a pages folder, a fixtures folder, tests grouped by project, and a config that holds the `baseURL`. You don't need seven projects on day one. Setup, ui, and one API project to prepare data is plenty.

**[12:43] → E18**

Now the role-based flow. I open war-paradigm, experiment 02. Its golden test does this: before each test, a `request.post('/api/_reset')` puts the app in a known state. That part goes through the API because it's fast and stable. Then, in the browser, it signs in as editor, creates a document called "Q4 launch plan" and signs out. It signs in as approver and approves; the row must say approved. It comes back as editor and publishes; the row must say published.

Look at the `signIn` helper. It fills Email and Password with `getByLabel`, clicks the Sign in button, and confirms with a web-first assertion that the `me-role` test id shows the expected role. If login ever let someone in with the wrong role, that line catches it before the test moves on. That's the pattern for your RBAC flow: every role switch is checked, never assumed.

**[13:41] → E19**

That file also shows you a small hybrid test: state through the API, validation through the UI. Your deliverable takes it one step further. Set up the data through the API, check on screen what the user actually sees, and intercept a call with `page.route` to test the unhappy path.

Last step of the lab: the trace. In civica the config keeps a trace on the first retry, a screenshot only on failure, and video on failure. When something goes red in CI, download the report, open the trace, and find the action where it stopped. Don't add a sleep "to see if it passes".

## 5. WAR mutation of the week

**[14:23] → E20**

Course rule: a test you've never seen fail hasn't proven anything. So when your test passes for the first time, break the product.

The qa-eval-lab README includes a mutation you can repeat today: with an empty storageState, the session test lands on `/login` and fails. That proves the test really depends on the reused session. If it stayed green with an empty file, it would be testing something else.

**[14:51] → E21**

The second one comes from war-paradigm. The role-swap mutant has a viewer try to approve. The app answers 403 and the scoreboard says KILLED. But the self-grant mutant, an editor changing their own role to admin, gets a 200. It survives. Every happy-path test was green while that authorization bug was still open. And while preparing this course I found a second one: a viewer can create drafts, and the `viewer-create` mutant survives too. Out of seven mutants, five are killed and two survive.

For your framework: change a piece of text in the product, remove a permission, and check that some test goes red. If nothing goes red, you've found a blind spot.

## 6. The challenge and how it's graded

**[15:36] → E22**

The deliverable is a repo with a Playwright and TypeScript framework: Page Objects, fixtures, storageState login, an RBAC flow with two roles, smoke and regression, and a hybrid test.

Here are the criteria, and every one of them can be checked. One: `npx playwright test` ends green locally and in CI. Two: no test uses `waitForTimeout` or a sleep, and a grep over the repo proves it. Three: login happens once and is reused with storageState. Four: there's at least one flow with two roles.

And the top level: you break the product on purpose in two places and show your tests going red. Don't tell me about it. Show me the red run.

## 7. Mini quiz

**[16:22] → E23**

Three questions. Pause the video if you want time to think.

First. A test fails intermittently: sometimes the button isn't there. What's your first move? A, a three-second sleep before the click. B, set three retries and move on. C, the right locator, web-first assertions, and a look at the trace. D, tag it IGNORE.

**[16:52] → E24**

It's C. Sleeps and retries cover the problem up. The right locator with auto-waiting fixes it, and the trace tells you what really happened.

Second. What's the difference between `await expect(loc).toBeVisible()` and `expect(await loc.isVisible()).toBe(true)`? The first one retries until the timeout. The second checks once and fails if the page hasn't loaded yet.

Third. What is storageState for? Reusing the authenticated session so you don't repeat the UI login in every test. UI login gets tested once, separately.

## 8. Wrap-up

**[17:30] → E25**

Three ideas to take with you. One: locators anchor to what the user sees, and assertions wait. No sleeps. Two: fixtures and Page Objects let each test say what it needs and what it wants to do, and storageState takes login off your plate. Three: retries and traces are for diagnosing, not for painting things green.

In Module 6 we move on to API and contract testing, where the rule gets even stricter: you validate against the contract, and you never bend the test to fit whatever the service returns. See you there.

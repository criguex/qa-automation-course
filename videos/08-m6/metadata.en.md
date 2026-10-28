# Metadata · Module 6 (EN)

## Title
API & contract testing: the contract wins, not the response

## Description
A booking API receives "deposit paid: false" and stores "true", behind a perfectly happy 200. If your test only checks the status code, that bug passes green. In this module we validate services against their contract with Zod, read schema errors field by field, test 401 vs 403, PUT vs PATCH and error contracts, and leave the database clean with finally even when an assertion fails. Lab with restful-booker-quality-suite, civica-playwright-challenge and karate-api-testing.

Chapters
00:00 Hook: a 200 that lies
00:57 Explained like you're 8
01:46 The absolute rule: the contract wins
03:55 Zod and readable errors
05:28 Auth, verbs, negative cases and errors
07:08 Own your data, clean up in finally
08:08 Postman, RestAssured and Karate
10:14 Lab: restful-booker-quality-suite
12:17 Defect or clarification point
13:38 WAR mutation of the week
14:50 The challenge and the rubric
15:28 Mini quiz
16:26 Wrap-up and Module 7

## Tags
api testing, contract testing, zod, playwright api testing, karate dsl, restful booker, json schema validation, test automation, sdet, qa course

## Thumbnail text
A 200 that lies

## Links
- Module in the course: https://criguex.github.io/qa-automation-course/#/m6
- Full course: https://criguex.github.io/qa-automation-course/
- restful-booker-quality-suite: https://github.com/criguex/restful-booker-quality-suite
- civica-playwright-challenge: https://github.com/criguex/civica-playwright-challenge
- karate-api-testing: https://github.com/criguex/karate-api-testing
- spendwise-qa-assessment: https://github.com/criguex/spendwise-qa-assessment
- Zod: https://zod.dev/
- Karate 2, what changed: https://docs.karatelabs.io/getting-started/whats-new-v2

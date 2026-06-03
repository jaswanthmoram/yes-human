---
id: engineering.e2e-testing
name: End-to-End Testing with Playwright
version: 1.0.0
domain: engineering
category: engineering.engineering
purpose: Write and run reliable end-to-end browser tests that verify critical user journeys.
summary: End-to-End Testing with Playwright skill providing systematic guidance grounded in real open-source patterns.
triggers:
  - write e2e tests
  - playwright test
  - end to end test
  - e2e test setup
  - browser test automation
activation_triggers:
  - how do I write e2e tests
  - help me with playwright test
prerequisites:
  - Relevant codebase or artifact accessible
  - Context of the task is clear
inputs:
  - target_artifact
  - requirements_or_context
steps:
  - Identify the top 3-5 critical user journeys that must not regress (login, checkout, core workflow)
  - Set up Playwright: npx playwright install, create playwright.config.ts with baseURL and retries:0
  - Use stable selectors: data-testid attributes preferred, then ARIA roles, never CSS classes
  - Use Page Object Model — one file per page that encapsulates selectors and actions
  - Add explicit waits with expect(locator).toBeVisible() — never page.waitForTimeout()
  - Run headless in CI with playwright test --reporter=html; review trace files on failures
outputs:
  - completed_output
  - review_or_analysis_report
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Output addresses all required criteria
  - Sources cited where patterns were drawn from
  - No hallucinated APIs or non-existent patterns
failure_modes:
  - Brittle CSS selectors that break on minor UI changes
  - Arbitrary sleeps causing flakiness
  - E2E tests for every feature instead of top journeys
handoffs:
  - engineering.code-reviewer (for review)
  - engineering.architect (for design decisions)
source_references:
  - https://github.com/microsoft/playwright
  - https://github.com/vercel-labs/agent-browser
allowed_agents:
  - engineering.master
status: active
budget_band: standard
rollback:
  - Revert test files — no production changes from E2E tests
validators:
  - skill.validator
---

## Trigger
Use this skill for tasks related to: write e2e tests, playwright test, end to end test.

## Prerequisites
- Access to the relevant artifact (code, document, system)
- Clear understanding of the goal and constraints

## Steps

### 1. Step
Identify the top 3-5 critical user journeys that must not regress (login, checkout, core workflow)

### 2. Step
Set up Playwright: npx playwright install, create playwright.config.ts with baseURL and retries:0

### 3. Step
Use stable selectors: data-testid attributes preferred, then ARIA roles, never CSS classes

### 4. Step
Use Page Object Model — one file per page that encapsulates selectors and actions

### 5. Step
Add explicit waits with expect(locator).toBeVisible() — never page.waitForTimeout()

### 6. Step
Run headless in CI with playwright test --reporter=html; review trace files on failures

## Verification
- [ ] All steps completed
- [ ] Output reviewed against quality gates
- [ ] Sources cited where applicable

## Rollback
Revert test files — no production changes from E2E tests

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Brittle CSS selectors that break on minor UI changes | See procedure | Address in review |
| Arbitrary sleeps causing flakiness | See procedure | Address in review |
| E2E tests for every feature instead of top journeys | See procedure | Address in review |

## Examples
**Example A:** Apply this skill to a typical instance of 'write e2e tests'.
**Example B:** Apply this skill when facing 'end to end test' in a complex codebase.

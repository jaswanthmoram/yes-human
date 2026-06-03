---
quality_gate: production
id: engineering.test-data-generation
name: Test Data Generation with Faker
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Generate realistic, deterministic test data using factory functions and Faker to avoid brittle hard-coded fixtures.
summary: Realistic test data improves test reliability and readability. This skill covers: Faker.js for realistic values, factory functions for domain objects, seeded randomness for determinism, and builder patterns for complex test scenarios.
triggers:
  - test data generation
  - faker test data
  - test fixture factory
  - generate test users
  - builder pattern test data
activation_triggers:
  - add property based tests for the pricing engine
  - set up factory bot for our test suite
  - generate test data for the user model
  - our test data is hard-coded and breaking tests
  - how do I generate realistic test data
prerequisites:
  - @faker-js/faker installed (or equivalent)
  - test objects/domain models defined
inputs:
  - domain_model
  - test_scenarios
steps:
  - Install @faker-js/faker and seed for determinism (faker.seed(12345))
  - Create factory functions per domain entity — buildUser(), buildOrder(), buildProduct()
  - Use Faker for realistic values — faker.internet.email(), faker.commerce.price()
  - Implement builder pattern for complex objects — allow overrides per test
  - Add factories to a central __fixtures__ or __factories__ directory
  - Document factory defaults and override patterns for the team
outputs:
  - factory_functions
  - seeded_test_data
  - fixtures_directory
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - All factories support partial overrides
  - faker.seed() called at the start of test suites that need determinism
  - No hard-coded test values that could conflict (email: "test@test.com")
failure_modes:
  - Non-deterministic faker values cause flaky snapshot tests — use faker.seed()
  - Factory defaults produce invalid data (negative prices) — add validation
  - Too many factory variants — use a single factory with sensible defaults
handoffs:
  - engineering.tdd-guide (for integration with TDD workflow)
source_references:
  - https://github.com/faker-js/faker
  - https://github.com/thoughtbot/fishery
allowed_agents:
  - engineering.tdd-guide
  - engineering.e2e-runner
status: active
budget_band: micro
rollback:
  - Remove factory functions if they introduce test complexity
validators:
  - skill.validator
---
## Trigger
Use when tests have hard-coded data that causes conflicts, or when you need realistic-looking data for UI tests or seeding.

## Prerequisites
- `npm install @faker-js/faker` or `yarn add @faker-js/faker`

## Steps

### 1. Install and Configure
Install faker. Add a global beforeAll that calls `faker.seed(12345)` for snapshot tests that need determinism.

### 2. Create Factory Functions
```ts
export const buildUser = (overrides = {}) => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  name: faker.person.fullName(),
  role: 'viewer',
  ...overrides,
});
```

### 3. Use Realistic Values
Use faker's categories: faker.internet.email(), faker.commerce.price(), faker.phone.number(), faker.date.past(). Match the domain.

### 4. Support Overrides
Every factory must accept partial overrides. Tests that need specific values override just those fields: `buildUser({ role: 'admin' })`.

### 5. Centralize Factories
Place all factories in `src/__factories__/` or `tests/factories/`. Export from an index file.

### 6. Document Defaults
Add a README to the factories directory explaining what each factory produces and common override patterns.

## Verification
- [ ] All entities have factories
- [ ] Factories support overrides
- [ ] No hard-coded emails/names in test files

## Rollback
Replace factory calls with simple static objects if factory complexity exceeds its value.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Snapshot tests fail after seed change | Seed not fixed | Use faker.seed(constant) |
| Factory generates invalid domain objects | No domain rules in factory | Add post-create validation |
| Tests slow from factory overhead | Factory too complex | Profile and simplify |

## Examples
**Example A:** E-commerce: `buildProduct({ price: 0 })` tests free product edge case.
**Example B:** Auth: `buildUser({ emailVerified: false })` tests unverified user flow.

---
quality_gate: production
id: engineering.test-architecture
name: Test Architecture Design
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Design a sustainable test suite structure that balances speed, reliability, and coverage using the testing pyramid.
summary: Applies the testing pyramid (many unit, fewer integration, fewest E2E) to a real codebase. Covers test file organization, shared fixture strategy, test data management, and the seams where each layer lives.
triggers:
  - design test architecture
  - testing pyramid
  - test suite structure
  - test organization
  - testing strategy design
activation_triggers:
  - restructure the test directory to follow the testing pyramid
  - design a testing strategy for our microservices
  - how should we organize our test suite
  - our tests are too slow and we don't know where to put new ones
  - what testing strategy should we use
prerequisites:
  - codebase structure understood
  - at least one test framework chosen
inputs:
  - codebase_overview
  - existing_test_suite
steps:
  - Audit existing tests by layer — count unit vs integration vs E2E; identify if inverted pyramid
  - Define test boundaries: unit (single module, all deps mocked), integration (real deps, external mocked), E2E (real browser/API, no mocks)
  - Establish shared fixture strategy — factory functions or builder pattern, not copy-pasted objects
  - Design test file co-location — tests next to source files, or separate tests/ directory with mirrored structure
  - Define naming convention and tagging for slow tests (--testPathPattern=integration tag)
  - Set CI split — fast unit tests on every commit; integration on PR; E2E on main/deploy
outputs:
  - test_architecture_doc
  - fixture_strategy
  - ci_test_split_config
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Unit tests run in under 30 seconds
  - Integration tests isolated from external network
  - E2E tests cover the 3-5 most critical user journeys only
failure_modes:
  - All tests at integration level — slow and fragile
  - No test data management — tests depend on real production data
  - E2E tests for every feature — suite takes 30 minutes
handoffs:
  - engineering.tdd-guide (for implementing the strategy)
  - platform.ci-cd-engineer (for CI split configuration)
source_references:
  - https://github.com/testcontainers/testcontainers-node
  - https://github.com/goldbergyoni/nodebestpractices
allowed_agents:
  - engineering.tdd-guide
  - engineering.e2e-runner
status: active
budget_band: standard
rollback:
  - Revert test reorganization if it breaks CI
  - Restore previous test locations before migration is complete
validators:
  - skill.validator
---

## Trigger

Use when starting a new project, when a test suite has become slow/unreliable, or when onboarding engineers ask where to put tests.

## Prerequisites

- Test framework chosen
- Codebase structure understood

## Steps

### 1. Audit Current State

Run `find . -name "*.test.*" | wc -l`. Categorize: unit (mocked deps), integration (real DB), E2E (browser). Identify the current pyramid shape.

### 2. Define Layer Boundaries

Unit: one module, all external dependencies mocked. Integration: real database/cache, external services mocked. E2E: real browser, real API, test data seeded.

### 3. Establish Fixture Strategy

Create factory functions: `buildUser({ role: 'admin' })`. Use Builder pattern for complex objects. Never hard-code test data.

### 4. Organize Files

Co-locate unit tests with source (`src/auth/auth.test.ts`). Put integration tests in `tests/integration/`. Put E2E in `tests/e2e/`. Mirror the source structure.

### 5. Tag and Split

Tag slow tests: `describe.skip` for E2E in unit CI. Use Jest projects or `--testPathPattern` to run subsets.

### 6. Document the Decision

Write a one-page testing guide explaining each layer, where to put new tests, and how to run each layer.

## Verification

- [ ] Unit tests complete in <30s
- [ ] Integration tests don't hit real external services
- [ ] E2E tests cover top 3-5 user journeys only
- [ ] Testing guide exists

## Rollback

Revert file moves via git if CI breaks during reorganization.

## Common Failures

| Failure                 | Cause                   | Fix                                   |
| ----------------------- | ----------------------- | ------------------------------------- |
| All tests in one file   | No architecture defined | Apply pyramid and split               |
| Unit tests hit database | Missing DB mock         | Add test double at repository layer   |
| E2E suite takes 1 hour  | Too many E2E tests      | Move scenarios to integration or unit |

## Examples

**Example A:** E-commerce app: 500 unit tests, 50 integration, 10 E2E for checkout, login, order history.
**Example B:** Microservice: 200 unit tests, 20 integration (real Postgres in Docker), 0 E2E (covered by consumer contracts).

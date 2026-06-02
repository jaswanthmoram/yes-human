---
id: integrations.api-testing
name: API Testing
version: 1.0.0
domain: integrations
category: integrations.testing
purpose: Implement comprehensive API testing strategies including unit, integration, and end-to-end tests for API endpoints.
summary: Guides through building API test suites with request validation, response assertion, performance testing, and negative testing.
triggers:
  - test api endpoints
  - api test suite
  - api integration testing
activation_triggers:
  - write api tests
  - validate api behavior
prerequisites:
  - api endpoints implemented
  - test environment available
inputs:
  - test_scenarios
  - test_environment
  - coverage_requirements
steps:
  - Define test strategy covering happy path, edge cases, and errors
  - Write unit tests for request/response transformation
  - Write integration tests against real or mocked dependencies
  - Add negative tests for invalid inputs and auth failures
  - Configure performance tests for latency and throughput
  - Set up continuous testing in CI/CD pipeline
outputs:
  - test_suite
  - test_reports
  - coverage_metrics
tools:
  - filesystem.write (test files)
quality_gates:
  - All endpoints have test coverage
  - Negative tests included
  - Performance baselines established
failure_modes:
  - Only testing happy path
  - Tests dependent on external service availability
  - Flaky tests from timing or ordering issues
handoffs:
  - integrations.contract-testing (for contract tests)
  - integrations.integration-testing (for e2e tests)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.api-integration-specialist
allowed_workflows:
  - integrations.api-integration-setup
status: active
budget_band: standard
rollback:
  - Revert test configuration changes
validators:
  - skill.validator
---

## Trigger
Use this skill when building test suites for API endpoints and integrations.

## Prerequisites
- API endpoints deployed to test environment
- Test data and fixtures prepared

## Steps
1. **Strategy**: Cover happy path, edge cases, error responses, and security.
2. **Unit Tests**: Test request validation, transformation, and business logic in isolation.
3. **Integration Tests**: Test full request/response cycle with real or mocked dependencies.
4. **Negative Tests**: Send invalid inputs, expired tokens, and malformed requests.
5. **Performance**: Establish latency baselines and test under load.
6. **CI/CD**: Run tests automatically on every commit and deployment.

## Verification
- Test coverage meets defined thresholds
- All negative tests pass (correctly reject bad input)
- Performance tests complete within SLA

## Rollback
- Revert test configuration and environment changes

## Common Failures
- Testing only the happy path
- Tests that depend on specific external service state
- Not cleaning up test data between runs

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

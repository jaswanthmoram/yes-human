---
id: integrations.integration-testing
name: Integration Testing
version: 1.0.0
domain: integrations
category: integrations.testing
purpose: Implement end-to-end integration tests verifying that multiple services and components work together correctly.
summary: Guides through building integration test suites covering service communication, data flow, and distributed transactions.
triggers:
  - integration test suite
  - end to end integration test
  - service integration testing
activation_triggers:
  - test service interactions
  - verify integration points
prerequisites:
  - individual services tested
  - integration environment available
inputs:
  - integration_scenarios
  - test_environment
  - data_requirements
steps:
  - Define integration test scenarios covering service boundaries
  - Set up test environment with all required services
  - Write tests verifying inter-service communication
  - Test distributed transactions and saga patterns
  - Add chaos testing for service failures
  - Configure test isolation and data cleanup
outputs:
  - integration_test_suite
  - test_reports
  - failure_analysis
tools:
  - filesystem.write (test files)
quality_gates:
  - All integration points covered
  - Failure scenarios tested
  - Test isolation maintained
failure_modes:
  - Tests depending on specific service ordering
  - Shared test data causing interference
  - Not testing failure and recovery paths
handoffs:
  - integrations.api-testing (for component tests)
  - integrations.contract-testing (for contract tests)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.microservices-integrator
  - integrations.api-integration-specialist
allowed_workflows:
  - integrations.microservices-integration
status: active
budget_band: expanded
rollback:
  - Clean up test environment and data
validators:
  - skill.validator
---

## Trigger
Use this skill when building integration tests that verify multiple services work together correctly.

## Prerequisites
- Individual services have unit and component tests
- Integration test environment provisioned

## Steps
1. **Scenarios**: Define tests covering service-to-service communication and data flow.
2. **Environment**: Deploy all required services with test configurations.
3. **Communication Tests**: Verify REST, gRPC, and message queue interactions.
4. **Transaction Tests**: Test saga patterns and distributed transaction recovery.
5. **Chaos Testing**: Kill services and verify graceful degradation.
6. **Isolation**: Ensure tests do not interfere with each other through shared state.

## Verification
- All integration points have passing tests
- Failure scenarios recover correctly
- Test runs are isolated and repeatable

## Rollback
- Clean up test environment and reset test data

## Common Failures
- Tests that pass in isolation but fail when run together
- Not testing the failure paths between services
- Shared databases causing test interference

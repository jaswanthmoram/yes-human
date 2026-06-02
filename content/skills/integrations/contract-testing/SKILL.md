---
id: integrations.contract-testing
name: Contract Testing
version: 1.0.0
domain: integrations
category: integrations.testing
purpose: Implement consumer-driven contract testing to verify API contracts between services without full integration testing.
summary: Guides through building contract tests using Pact or similar frameworks to ensure API compatibility between providers and consumers.
triggers:
  - contract testing setup
  - pact testing implementation
  - api contract verification
activation_triggers:
  - verify api contracts
  - consumer driven testing
prerequisites:
  - api contracts defined
  - provider and consumer services identified
inputs:
  - contract_definitions
  - provider_service
  - consumer_expectations
steps:
  - Define consumer expectations as contract tests
  - Generate contract files from consumer tests
  - Verify provider implementation against contracts
  - Publish contracts to broker for sharing
  - Configure CI/CD to run contract tests
  - Manage contract versions and compatibility
outputs:
  - consumer_contracts
  - provider_verification
  - contract_broker_config
tools:
  - filesystem.write (contract test files)
quality_gates:
  - All consumer expectations verified by provider
  - Contracts versioned and published
  - Breaking changes detected before deployment
failure_modes:
  - Contracts out of sync with actual API behavior
  - Not running provider verification in CI
  - Ignoring contract version compatibility
handoffs:
  - integrations.api-testing (for broader testing)
  - integrations.integration-testing (for e2e testing)
source_references:
  - ref.github.integrations.2026-05-31
allowed_agents:
  - integrations.microservices-integrator
  - integrations.api-integration-specialist
allowed_workflows:
  - integrations.microservices-integration
status: active
budget_band: standard
rollback:
  - Revert contract definitions to previous version
validators:
  - skill.validator
---

## Trigger
Use this skill when implementing consumer-driven contract testing between microservices.

## Prerequisites
- API contracts defined (OpenAPI, GraphQL schema, or custom)
- Provider and consumer services identified

## Steps
1. **Consumer Tests**: Write tests expressing what the consumer expects from the provider.
2. **Generate Contracts**: Produce contract files (Pact files) from consumer test runs.
3. **Provider Verification**: Run provider tests against consumer contracts.
4. **Publish**: Upload contracts to a broker (Pact Broker) for team sharing.
5. **CI/CD**: Run contract verification on every provider change.
6. **Versioning**: Manage contract versions with backward compatibility checks.

## Verification
- All consumer contracts verified by provider
- Breaking changes detected before deployment
- Contract versions tracked and compatible

## Rollback
- Revert contract definitions and re-verify

## Common Failures
- Contracts that do not match actual API behavior
- Not running provider verification in CI pipeline
- Ignoring contract compatibility when evolving APIs

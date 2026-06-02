---
id: engineering.contract-testing
name: API Contract Testing
description: Implement and maintain API contract tests between services using consumer-driven contracts and schema validation.
triggers:
  - contract testing
  - API contract
  - pact testing
  - consumer driven contract
  - API compatibility
  - contract test
  - service integration test
aliases:
  - pact testing
  - consumer contract
  - provider verification
negative_keywords:
  - load testing
  - performance testing
  - unit testing
  - snapshot testing
inputs:
  - api_specifications
  - consumer_expectations
  - provider_implementations
  - pact_broker_config (optional)
outputs:
  - contract_definitions
  - consumer_tests
  - provider_verification_results
  - compatibility_report
allowed_tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Contract drift between consumer and provider without detection
  - Overly strict contracts prevent provider evolution
  - Missing contracts for error response scenarios
  - Pact broker becomes single point of failure
verification:
  - Consumer tests define clear interaction expectations
  - Provider verification passes against all consumer contracts
  - Breaking changes are detected before deployment
  - Contract versioning tracks API evolution
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Ensure API compatibility between services through consumer-driven contract testing, preventing breaking changes from reaching production.

## When To Use
- Multiple services communicate via REST or message APIs
- Preventing breaking API changes during independent service deployments
- Replacing expensive integration test suites with contract tests
- Onboarding new consumer services to existing APIs
- Validating API version compatibility before provider deployment

## When Not To Use
- Single-service applications with no external API consumers
- Performance or load testing of APIs
- Unit testing internal service logic
- Testing third-party APIs you don't control

## Procedure
1. **Identify API Boundaries**: Map all service-to-service API interactions. Identify consumers and providers for each API. Document current API contracts.
2. **Define Consumer Contracts**: Write consumer-side tests that define expected interactions using Pact or similar. Include request format, expected response, and error scenarios.
3. **Publish Contracts**: Configure pact broker or contract storage. Publish consumer contracts with version metadata. Tag contracts with deployment environment.
4. **Implement Provider Verification**: Write provider-side verification that replays consumer interactions against real provider. Verify response format, status codes, and headers.
5. **Handle Contract Evolution**: Use consumer-driven approach: new requirements start as consumer expectations. Provider implements changes to satisfy new contracts. Old contracts remain until deprecated.
6. **Integrate with CI/CD**: Run consumer contract tests on consumer PR. Run provider verification on provider PR before merge. Block deployment on contract verification failure.
7. **Monitor and Maintain**: Track contract compatibility matrix. Clean up deprecated contracts. Review contract test health regularly.

## Tool Policy
- Use filesystem.read/write for contract definition files and test code
- Use shell.readonly to run Pact tests and provider verification
- Use code_graph.query to trace API handler implementations
- Follow Pact framework conventions for contract structure

## Verification
- Consumer contract tests pass and publish to pact broker
- Provider verification passes for all published consumer contracts
- Breaking changes are detected in CI before merge
- Contract matrix shows all consumer-provider compatibility status

## Failure Modes
- Consumer tests are too lenient and miss real incompatibilities
- Provider verification uses mocked dependencies instead of real behavior
- Contract versions not aligned with deployment versions
- Pact broker downtime blocks CI pipeline

## Example Routes
- `set up contract testing between services` -> engineering.contract-testing
- `verify API compatibility` -> engineering.contract-testing
- `add pact tests for user service` -> engineering.contract-testing

## Source Notes
Contract testing patterns from Pact framework documentation, Spring Cloud Contract, and consumer-driven contract methodology by Martin Fowler. Reference dossier: `ref.github.engineering.2026-05-31`.

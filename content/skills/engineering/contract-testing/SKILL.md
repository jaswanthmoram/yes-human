---
id: engineering.contract-testing
name: Contract Testing with Pact
version: 1.0.0
domain: engineering
category: engineering.testing
purpose: Verify that API consumers and providers agree on the interface without requiring a live integration environment.
summary: Consumer-driven contract testing using Pact. Consumers define expectations as contracts; providers verify against them. Prevents breaking API changes and eliminates flaky integration tests.
triggers:
  - write contract tests
  - pact contract test
  - consumer driven contract
  - api contract verification
  - provider contract test
activation_triggers:
  - our integration tests are flaky
  - how do I test the API without a live service
prerequisites:
  - consumer and provider codebases identified
  - pact broker or pactflow account (or local pact files)
  - test framework configured (Jest, Mocha, or equivalent)
inputs:
  - consumer_codebase
  - provider_codebase
  - existing_api_spec (optional)
steps:
  - Write consumer test that defines expectations using Pact DSL — capture the exact request shape and expected response
  - Run consumer test to generate a pact file (JSON contract)
  - Publish pact file to broker or commit to shared path
  - Run provider verification test pointing at the pact file; provider must satisfy all consumer expectations
  - Add pact verification to CI pipeline on both consumer and provider repos
  - Configure can-i-deploy check before any deployment to block breaking changes
outputs:
  - pact_contract_file
  - verification_report
  - can_i_deploy_result
tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
quality_gates:
  - Consumer pact file generated and published to broker
  - Provider verification passes against current consumer contracts
  - can-i-deploy returns green before any deploy
failure_modes:
  - Provider adds a required field the consumer doesn't send — triggers verification failure
  - Pact broker not configured — use local file sharing temporarily
  - Consumer tests pass but provider never runs verification — add to provider CI
handoffs:
  - engineering.code-reviewer (for contract test code review)
  - platform.ci-cd-engineer (for pipeline wiring)
source_references:
  - https://github.com/pact-foundation/pact-js
  - https://github.com/pact-foundation/pact-broker
allowed_agents:
  - engineering.tdd-guide
  - engineering.e2e-runner
status: active
budget_band: standard
rollback:
  - Remove generated pact files
  - Unpublish contract from broker if published
validators:
  - skill.validator
---

## Trigger
Use when services need to agree on API interfaces without a live integration test environment, or when integration tests are slow and flaky.

## Prerequisites
- Consumer and provider repos identified and accessible
- Pact broker configured, or using local pact files for single-repo setups
- Test framework installed (Jest + @pact-foundation/pact)

## Steps

### 1. Write Consumer Test
Define the expected interaction using the Pact DSL. Specify the exact request path, method, headers, body matchers. Use matchers (like, term, eachLike) not exact values to avoid brittle contracts.

### 2. Generate Contract File
Run the consumer test suite. Pact writes a JSON contract file to ./pacts/ describing every interaction. Review the file — it is the source of truth.

### 3. Publish to Broker
Push the pact file to a Pact Broker (pactflow.io or self-hosted). Tag with branch name and version. This makes it available to the provider.

### 4. Write Provider Verification
On the provider side, configure the pact verifier to load contracts from the broker. Point it at the running provider. Run: the verifier replays each consumer interaction and checks the response matches.

### 5. Wire into CI
Consumer CI: generate and publish pact. Provider CI: pull latest contracts, run verification. Both sides: run `can-i-deploy` before any merge or deploy.

### 6. Handle Failures
If verification fails, the provider team is notified immediately. They must either update the provider or negotiate a new contract with the consumer team. Never suppress failures.

## Verification
- [ ] Pact file contains all consumer interactions
- [ ] Provider verification passes with 0 failures
- [ ] can-i-deploy returns green for the target environment
- [ ] Both consumer and provider CI pipelines run pact checks

## Rollback
Remove pact file from broker. Revert consumer expectations if a new contract caused provider failures.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Provider verification fails on optional field | Consumer used exact match instead of `like()` | Switch to Pact matchers |
| can-i-deploy times out | Broker not receiving publish events | Check CI publish step |
| Contracts drift silently | Provider CI doesn't run verification | Add provider verification job |

## Examples
**Example A:** Frontend React app defines pact for the `/users/{id}` endpoint; backend Node API verifies against it in CI.
**Example B:** Microservice A consumes events from Service B's REST API — contract tests prevent Service B from silently renaming fields.

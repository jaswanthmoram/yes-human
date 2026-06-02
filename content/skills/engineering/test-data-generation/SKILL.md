---
id: engineering.test-data-generation
name: Test Data Generation Strategies
description: Design and implement test data generation approaches including factories, fixtures, fuzzing, and property-based testing.
triggers:
  - set up factory bot for our test suite
  - generate test data for the user model
  - test data
  - generate test data
  - test fixtures
  - test factories
  - mock data
  - seed data for tests
  - property based testing
aliases:
  - test data setup
  - fixture generation
  - test data factory
negative_keywords:
  - production data
  - data migration
  - database seeding
  - ETL
inputs:
  - data_models
  - test_requirements
  - existing_fixtures (optional)
  - data_constraints (optional)
outputs:
  - data_generation_strategy
  - factory_definitions
  - fixture_files
  - sample_datasets
allowed_tools:
  - filesystem.read
  - filesystem.write
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Generated data violates domain constraints
  - Test data leaks between test cases
  - Factories produce unrealistic data distributions
  - Fixture maintenance burden grows with schema changes
verification:
  - Generated data passes all model validations
  - Tests are isolated with no data leakage
  - Factories produce valid data across schema versions
  - Property-based tests find real edge cases
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Design and implement robust test data generation strategies using factories, fixtures, fuzzing, and property-based testing to ensure comprehensive and maintainable test coverage.

## When To Use
- Tests need realistic but controlled data sets
- Setting up test data factories for a new project
- Replacing hardcoded test data with dynamic generators
- Implementing property-based testing for complex invariants
- Creating seed data for integration or E2E tests

## When Not To Use
- Production data anonymization or masking
- Database seeding for development environments
- ETL pipeline data generation
- Performance test data at scale (use dedicated load generators)

## Procedure
1. **Analyze Data Models**: Review entity schemas, relationships, and constraints. Identify required fields, validations, and domain invariants that test data must satisfy.
2. **Choose Generation Strategy**: Select the right approach per context: factories for unit tests, fixtures for integration tests, fuzzing for edge cases, property-based for invariant verification.
3. **Implement Factories**: Create factory definitions with sensible defaults and trait overrides. Support associations and nested data. Use libraries like Factory Bot, Faker, or Hypothesis.
4. **Create Fixtures**: Define reusable fixture sets for integration tests. Ensure fixtures are isolated per test case. Version fixtures alongside schema changes.
5. **Add Property-Based Tests**: Define properties and invariants that must hold for all valid inputs. Use generators that respect domain constraints. Configure shrinking for debuggable failures.
6. **Validate Data Quality**: Verify generated data passes all model validations. Check for realistic distributions. Ensure no data leaks between test cases.
7. **Document and Maintain**: Document factory traits and fixture purposes. Set up automated checks for fixture validity after schema changes.

## Tool Policy
- Use filesystem.read/write for creating factory and fixture files
- Use shell.readonly to validate generated data against model validations
- Use code_graph.query to trace data model relationships
- Follow project conventions for factory/fixture file locations

## Verification
- All generated data passes model validations and constraints
- Tests using generated data are deterministic and isolated
- Factories support all required test scenarios via traits
- Property-based tests discover at least one edge case during development

## Failure Modes
- Factory defaults violate new constraints after schema changes
- Test data from one test leaks into another via shared database state
- Faker-generated data doesn't match domain-specific formats
- Property-based test generators produce too many invalid inputs, slowing tests

## Example Routes
- `generate test data for user model` -> engineering.test-data-generation
- `set up test factories` -> engineering.test-data-generation
- `add property based tests for pricing` -> engineering.test-data-generation

## Source Notes
Test data strategies from Factory Bot, Faker.js, Hypothesis (Python), and fast-check (TypeScript) documentation. Property-based testing patterns from QuickCheck and Hypothesis. Reference dossier: `ref.github.engineering.2026-05-31`.

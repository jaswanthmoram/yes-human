---
id: engineering.test-architecture
name: Test Suite Architecture and Organization
description: Design and organize test suites following testing pyramid principles with clear boundaries between unit, integration, and E2E tests.
triggers:
  - test architecture
  - test organization
  - test structure
  - testing pyramid
  - test suite design
  - test strategy
  - organize tests
aliases:
  - test suite structure
  - testing strategy
  - test pyramid
negative_keywords:
  - test coverage
  - flaky tests
  - test data
  - mutation testing
inputs:
  - project_structure
  - existing_tests
  - application_architecture
  - team_conventions (optional)
outputs:
  - test_architecture_plan
  - directory_structure
  - test_boundaries
  - migration_plan (if restructuring)
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Over-investment in E2E tests at expense of unit tests
  - Unclear boundaries between test types cause duplication
  - Test suite too slow for developer feedback loop
  - Test organization doesn't match application architecture
verification:
  - Test pyramid ratios are appropriate for the project
  - Test boundaries are clearly defined and documented
  - Test suite runs within acceptable time limits
  - New tests are placed in correct category by convention
source_references:
  - ref.github.engineering.2026-05-31
quality_gate: staging
---

## Mission
Design scalable test suite architecture that balances test types according to the testing pyramid, maintains fast feedback loops, and scales with application growth.

## When To Use
- Setting up test infrastructure for a new project
- Restructuring an existing test suite that has grown organically
- Test suite is too slow or too brittle to maintain
- Team needs clear guidelines on where to place different test types
- Evaluating test strategy for a microservices architecture

## When Not To Use
- Writing individual test cases (hand off to specific test skills)
- Test coverage analysis (use engineering.test-coverage)
- Fixing flaky tests (use engineering.flaky-test-detection)
- Setting up CI/CD pipeline (use platform skills)

## Procedure
1. **Assess Current State**: Inventory existing tests by type, location, and runtime. Map test distribution against the testing pyramid. Identify pain points: slow suites, duplication, gaps.
2. **Define Test Categories**: Establish clear definitions for unit, integration, and E2E tests in the project context. Define what each category tests and what it mocks.
3. **Design Directory Structure**: Create a test directory layout that matches application architecture. Separate test types into distinct directories or co-locate with source.
4. **Set Test Boundaries**: Define rules for each test type: what can be imported, what must be mocked, maximum test runtime, and dependency access rules.
5. **Establish Conventions**: Document naming conventions, file organization, setup/teardown patterns, and shared test utilities. Create templates for each test type.
6. **Optimize Test Runtime**: Configure parallel test execution. Set up test sharding for CI. Implement test selection for PR builds vs full suite on main.
7. **Plan Migration**: If restructuring, create incremental migration plan. Move tests category by category. Maintain test coverage during transition.

## Tool Policy
- Use filesystem.read to analyze project structure and existing test organization
- Use shell.readonly to measure test runtimes and suite composition
- Use code_graph.query to understand application module boundaries
- Never restructure tests without running the full suite before and after

## Verification
- Test pyramid ratios are documented and measurable
- Each test category has clear, enforced boundaries
- Full test suite completes within defined time budget
- New team members can determine correct test placement from documentation

## Failure Modes
- Creating an "ice cream cone" anti-pattern with too many E2E tests
- Test boundaries so strict that integration gaps emerge
- Shared test utilities that create hidden coupling between test categories
- Test architecture that doesn't evolve with application architecture changes

## Example Routes
- `how should we organize our tests` -> engineering.test-architecture
- `design test strategy for microservices` -> engineering.test-architecture
- `restructure the test suite` -> engineering.test-architecture

## Source Notes
Test architecture patterns from Google Testing Blog testing pyramid, Martin Fowler's testing strategy articles, and Kent C. Dodds' testing trophy. Reference dossier: `ref.github.engineering.2026-05-31`.

---
id: meta-system.fixture-generation
name: Test Fixture Generation and Validation
version: 1.0.0
domain: meta-system
category: meta-system.testing
purpose: Generate and validate test fixtures for routing, skill, and workflow evaluation.
summary: Systematic approach to generating comprehensive test fixtures with edge cases and coverage analysis.
triggers:
  - generate test fixtures
  - create routing fixtures
  - build skill fixtures
  - produce workflow fixtures
  - validate fixture coverage
activation_triggers:
  - fixture generation
  - test fixture creation
  - fixture coverage validation
prerequisites:
  - target registry available
  - coverage requirements defined
  - fixture schema known
inputs:
  - target_registry
  - coverage_requirements
  - fixture_schema
steps:
  - Analyze coverage requirements
  - Identify target agents, skills, or workflows
  - Generate positive test cases
  - Generate edge case fixtures
  - Generate negative test cases
  - Validate fixture format against schema
  - Check coverage completeness
  - Remove duplicate fixtures
  - Produce fixture set
  - Validate with quality gates
outputs:
  - fixture_set
  - coverage_report
  - edge_cases
  - negative_cases
tools:
  - filesystem.read (read registry and existing fixtures)
  - filesystem.write (write fixture files)
quality_gates:
  - Coverage requirements met
  - Edge cases included
  - Negative cases included
  - Format validated
  - No duplicates
failure_modes:
  - Generating fixtures without edge cases
  - Missing negative test scenarios
  - Format not matching schema
  - Duplicate fixtures
  - Incomplete coverage
handoffs:
  - meta-system.fixture-engineer (to review fixtures)
  - meta-system.route-evaluation (to evaluate routing)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.fixture-engineer
  - meta-system.eval-runner
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert fixture files
  - Restore previous fixture set
validators:
  - skill.validator
---

## Trigger
Use this skill when generating test fixtures, creating routing/skill/workflow fixtures, or validating fixture coverage.

## Prerequisites
- Target registry available
- Coverage requirements defined
- Fixture schema known

## Steps
1. **Analyze Coverage**: Determine what needs to be tested and at what depth.
2. **Identify Targets**: List all agents, skills, or workflows needing fixtures.
3. **Generate Positive Cases**: Create fixtures for typical usage scenarios.
4. **Generate Edge Cases**: Create fixtures for boundary conditions.
5. **Generate Negative Cases**: Create fixtures for scenarios that should NOT route.
6. **Validate Format**: Check fixture format against the schema.
7. **Check Coverage**: Verify all targets have adequate fixture coverage.
8. **Remove Duplicates**: Eliminate redundant fixtures.
9. **Produce Set**: Write the complete fixture file.
10. **Validate**: Run through quality gates.

## Verification
- All quality gates passed
- Coverage requirements met
- Edge cases included
- Format validated

## Common Failures
- Generating fixtures without edge cases
- Missing negative test scenarios
- Not validating format against schema

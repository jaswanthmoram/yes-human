---
id: meta-system.error-handling
name: Error Handling Design and Patterns
version: 1.0.0
domain: meta-system
category: meta-system.reliability
purpose: Design error handling strategies for agents, skills, and workflows.
summary: Systematic approach to designing error handling that ensures graceful degradation and clear recovery paths.
triggers:
  - design error handling
  - error handling review
  - failure recovery design
  - graceful degradation plan
  - error pattern analysis
activation_triggers:
  - error handling design
  - failure recovery planning
  - error pattern review
prerequisites:
  - target components identified
  - error scenarios enumerated
  - recovery requirements defined
inputs:
  - target_components
  - error_scenarios
  - recovery_requirements
steps:
  - Identify components needing error handling
  - Enumerate possible error scenarios
  - Classify errors by severity
  - Design handling strategy per error class
  - Define recovery paths
  - Design graceful degradation
  - Specify error reporting format
  - Design retry and backoff strategies
  - Test error handling paths
  - Document error handling patterns
outputs:
  - error_handling_specification
  - recovery_paths
  - degradation_strategies
  - error_patterns_documentation
tools:
  - filesystem.read (read component definitions)
quality_gates:
  - All error scenarios covered
  - Recovery paths defined
  - Degradation strategies documented
  - Error handling tested
  - Patterns documented
failure_modes:
  - Missing error scenarios
  - Undefined recovery paths
  - No graceful degradation
  - Untested error handling
  - Undocumented patterns
handoffs:
  - meta-system.quality-assurance (for QA review)
  - meta-system.system-architect (for architecture alignment)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.system-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert error handling changes
  - Restore previous error handling configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when designing error handling, reviewing failure recovery, or planning graceful degradation.

## Prerequisites
- Target components identified
- Error scenarios enumerated
- Recovery requirements defined

## Steps
1. **Identify Components**: List all components needing error handling.
2. **Enumerate Errors**: List all possible error scenarios.
3. **Classify Errors**: Group errors by severity (critical, high, medium, low).
4. **Design Handling**: Create handling strategy per error class.
5. **Define Recovery**: Map recovery paths for each error type.
6. **Design Degradation**: Plan graceful degradation when full recovery isn't possible.
7. **Specify Reporting**: Define error reporting format and channels.
8. **Design Retry**: Create retry and backoff strategies.
9. **Test Paths**: Verify error handling works end-to-end.
10. **Document**: Write error handling pattern documentation.

## Verification
- All quality gates passed
- All error scenarios covered
- Recovery paths defined and tested

## Common Failures
- Missing error scenarios in the design
- Undefined recovery paths
- No graceful degradation strategy

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

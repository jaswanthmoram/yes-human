---
id: meta-system.quality-gates
name: Quality Gate Design and Enforcement
version: 1.0.0
domain: meta-system
category: meta-system.quality
purpose: Design and enforce quality gates across agents, skills, and workflows.
summary: Systematic approach to defining quality gates that ensure registry integrity and promotion readiness.
triggers:
  - design quality gates
  - enforce quality gates
  - review gate definitions
  - quality gate audit
  - gate passage verification
activation_triggers:
  - quality gate design
  - gate enforcement
  - gate audit
prerequisites:
  - target artifacts identified
  - quality criteria defined
  - gate framework available
inputs:
  - target_artifacts
  - quality_criteria
  - gate_framework
steps:
  - Identify artifacts needing gates
  - Define gate criteria per artifact type
  - Design pre-route gates
  - Design pre-tool gates
  - Design on-complete gates
  - Map gate dependencies
  - Define gate pass/fail conditions
  - Implement gate checks
  - Test gate enforcement
  - Validate with quality review
outputs:
  - gate_definitions
  - gate_enforcement_rules
  - gate_test_results
  - audit_report
tools:
  - filesystem.read (read artifacts and gate definitions)
  - filesystem.write (write gate configurations)
quality_gates:
  - All artifact types covered
  - Gate criteria specific and measurable
  - Pass/fail conditions defined
  - Gate enforcement tested
  - Audit trail maintained
failure_modes:
  - Generic gates without specific criteria
  - Missing gate types (pre-route, pre-tool, on-complete)
  - Untested gate enforcement
  - No audit trail
  - Gates that always pass
handoffs:
  - meta-system.quality-assurance (to run QA checks)
  - meta-system.eval-runner (to validate gate passage)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.eval-runner
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert gate definitions
  - Restore previous gate configuration
validators:
  - skill.validator
---

## Trigger
Use this skill when designing quality gates, enforcing gate checks, or auditing gate definitions.

## Prerequisites
- Target artifacts identified
- Quality criteria defined
- Gate framework available

## Steps
1. **Identify Artifacts**: List all artifacts that need quality gates.
2. **Define Criteria**: Establish specific, measurable criteria per artifact type.
3. **Design Pre-Route Gates**: Gates that check before routing decisions.
4. **Design Pre-Tool Gates**: Gates that check before tool execution.
5. **Design On-Complete Gates**: Gates that check after task completion.
6. **Map Dependencies**: Define gate execution order and dependencies.
7. **Define Conditions**: Specify pass/fail conditions for each gate.
8. **Implement Checks**: Write gate check logic.
9. **Test Enforcement**: Verify gates actually block non-compliant artifacts.
10. **Validate**: Review gate definitions with quality assurance.

## Verification
- All quality gates passed
- Gate criteria specific and measurable
- Enforcement tested and working

## Common Failures
- Generic gates without specific criteria
- Missing gate types
- Untested gate enforcement

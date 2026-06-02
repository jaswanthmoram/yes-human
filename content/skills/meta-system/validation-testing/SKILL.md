---
id: meta-system.validation-testing
name: Validation Testing and Verification
version: 1.0.0
domain: meta-system
category: meta-system.testing
purpose: Run validation tests on agents, skills, and workflows to ensure correctness and completeness.
summary: Systematic approach to validating registry artifacts through structured testing and verification.
triggers:
  - validate agent definition
  - test skill specification
  - verify workflow correctness
  - run validation suite
  - artifact validation pass
activation_triggers:
  - validation testing
  - artifact verification
  - validation suite run
prerequisites:
  - artifacts to validate
  - validation criteria defined
  - test framework available
inputs:
  - target_artifacts
  - validation_criteria
  - test_framework
steps:
  - Identify artifacts for validation
  - Define validation criteria per type
  - Run format validation
  - Run content validation
  - Run trigger validation
  - Run cross-reference validation
  - Collect validation results
  - Generate validation report
  - Identify remediation items
  - Re-validate after fixes
outputs:
  - validation_results
  - validation_report
  - remediation_items
  - pass_fail_summary
tools:
  - filesystem.read (read artifacts for validation)
  - shell.readonly (run validation scripts)
quality_gates:
  - All artifacts validated
  - Format checks passed
  - Content checks passed
  - Trigger checks passed
  - Cross-references valid
failure_modes:
  - Validating format without content
  - Skipping cross-reference checks
  - Not re-validating after fixes
  - Missing validation criteria
  - False positive validation
handoffs:
  - meta-system.quality-assurance (for QA review)
  - meta-system.eval-runner (for evaluation runs)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.eval-runner
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert validation results
  - Restore previous validation state
validators:
  - skill.validator
---

## Trigger
Use this skill when validating agent definitions, testing skill specifications, or verifying workflow correctness.

## Prerequisites
- Artifacts to validate available
- Validation criteria defined
- Test framework available

## Steps
1. **Identify Artifacts**: List all artifacts needing validation.
2. **Define Criteria**: Establish validation criteria per artifact type.
3. **Format Validation**: Check YAML/JSON format compliance.
4. **Content Validation**: Verify content depth and completeness.
5. **Trigger Validation**: Test trigger uniqueness and coverage.
6. **Cross-Reference**: Validate references between artifacts.
7. **Collect Results**: Aggregate all validation results.
8. **Generate Report**: Produce a structured validation report.
9. **Identify Remediation**: List items needing fixes.
10. **Re-Validate**: Run validation again after fixes.

## Verification
- All quality gates passed
- Format, content, and trigger checks passed
- Cross-references valid

## Common Failures
- Validating format without checking content
- Skipping cross-reference validation
- Not re-validating after fixes

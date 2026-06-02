---
id: meta-system.continuous-integration
name: Continuous Integration for Registry Validation
version: 1.0.0
domain: meta-system
category: meta-system.operations
purpose: Design and maintain CI pipelines that validate registry artifacts on every change.
summary: Systematic approach to continuous integration that ensures registry quality through automated validation.
triggers:
  - setup CI pipeline
  - continuous integration design
  - registry validation CI
  - automated validation pipeline
  - CI pipeline review
activation_triggers:
  - CI setup
  - pipeline design
  - automated validation
prerequisites:
  - registry artifacts in version control
  - validation scripts available
  - CI platform configured
inputs:
  - registry_artifacts
  - validation_scripts
  - ci_platform_config
steps:
  - Review current CI configuration
  - Identify validation requirements
  - Design pipeline stages
  - Configure artifact validation stage
  - Configure routing evaluation stage
  - Configure quality gate stage
  - Design failure handling
  - Implement pipeline configuration
  - Test pipeline with sample changes
  - Document pipeline usage
outputs:
  - pipeline_configuration
  - stage_definitions
  - failure_handling_rules
  - pipeline_documentation
tools:
  - filesystem.read (read CI configuration and scripts)
  - filesystem.write (write pipeline configuration)
  - shell.readonly (test pipeline locally)
quality_gates:
  - All validation stages defined
  - Failure handling configured
  - Pipeline tested with sample changes
  - Documentation complete
  - Pipeline runs successfully
failure_modes:
  - CI without artifact validation
  - Missing quality gate stage
  - No failure handling
  - Untested pipeline
  - Undocumented pipeline usage
handoffs:
  - meta-system.validation-testing (for validation stage design)
  - meta-system.quality-gates (for gate stage design)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.eval-runner
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert pipeline configuration
  - Restore previous CI setup
validators:
  - skill.validator
---

## Trigger
Use this skill when setting up CI pipelines, designing continuous integration, or reviewing automated validation pipelines.

## Prerequisites
- Registry artifacts in version control
- Validation scripts available
- CI platform configured

## Steps
1. **Review CI Config**: Check current CI configuration for gaps.
2. **Identify Requirements**: Determine what needs validation in CI.
3. **Design Stages**: Plan pipeline stages (validate, evaluate, gate).
4. **Configure Validation**: Set up artifact validation stage.
5. **Configure Evaluation**: Set up routing evaluation stage.
6. **Configure Gates**: Set up quality gate stage.
7. **Design Failure Handling**: Define what happens when stages fail.
8. **Implement**: Write the pipeline configuration.
9. **Test**: Run the pipeline with sample changes.
10. **Document**: Write pipeline usage documentation.

## Verification
- All quality gates passed
- Pipeline tested with sample changes
- All stages running successfully
- Documentation complete

## Common Failures
- CI pipeline without artifact validation
- Missing quality gate stage
- Not testing the pipeline before deployment

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

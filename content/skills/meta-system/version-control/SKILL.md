---
id: meta-system.version-control
name: Version Control for Registry Artifacts
version: 1.0.0
domain: meta-system
category: meta-system.operations
purpose: Manage version control for agents, skills, workflows, and dossiers ensuring traceability and rollback capability.
summary: Systematic approach to versioning registry artifacts with proper semantic versioning and change tracking.
triggers:
  - version control registry
  - artifact versioning
  - semantic version management
  - change tracking setup
  - version rollback plan
activation_triggers:
  - version control
  - artifact versioning
  - version management
prerequisites:
  - registry artifacts identified
  - versioning scheme defined
  - change tracking configured
inputs:
  - registry_artifacts
  - versioning_scheme
  - change_tracking_config
steps:
  - Review current artifact versions
  - Apply semantic versioning rules
  - Track changes per version
  - Design version compatibility matrix
  - Plan rollback procedures
  - Implement version tagging
  - Validate version consistency
  - Document version history
  - Test rollback procedures
  - Publish version guide
outputs:
  - version_registry
  - change_log
  - compatibility_matrix
  - rollback_procedures
tools:
  - filesystem.read (read artifact versions)
  - shell.readonly (run version inspection commands)
quality_gates:
  - Semantic versioning applied
  - Changes tracked per version
  - Compatibility matrix defined
  - Rollback procedures tested
  - Version history documented
failure_modes:
  - Versioning without semantic rules
  - Missing change tracking
  - Untested rollback procedures
  - Inconsistent versions across artifacts
  - Undocumented version history
handoffs:
  - meta-system.quality-assurance (for version consistency checks)
  - meta-system.system-monitoring (for version health monitoring)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.system-optimizer
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert to previous artifact version
  - Restore version registry state
validators:
  - skill.validator
---

## Trigger
Use this skill when managing artifact versions, setting up version control, or planning version rollbacks.

## Prerequisites
- Registry artifacts identified
- Versioning scheme defined
- Change tracking configured

## Steps
1. **Review Versions**: Check current versions of all artifacts.
2. **Apply SemVer**: Use semantic versioning (major.minor.patch).
3. **Track Changes**: Record what changed in each version.
4. **Design Compatibility**: Map which versions work together.
5. **Plan Rollback**: Define how to revert to previous versions.
6. **Implement Tagging**: Apply version tags to artifacts.
7. **Validate Consistency**: Check versions are consistent across registry.
8. **Document History**: Write version history for each artifact.
9. **Test Rollback**: Verify rollback procedures work.
10. **Publish Guide**: Create a version management guide.

## Verification
- All quality gates passed
- Semantic versioning applied consistently
- Rollback procedures tested
- Version history documented

## Common Failures
- Versioning without semantic rules
- Missing change tracking between versions
- Not testing rollback procedures

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

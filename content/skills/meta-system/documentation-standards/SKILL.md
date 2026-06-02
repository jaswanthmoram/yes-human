---
id: meta-system.documentation-standards
name: Documentation Standards and Guidelines
version: 1.0.0
domain: meta-system
category: meta-system.authoring
purpose: Define and enforce documentation standards across all yes-human registry artifacts.
summary: Systematic approach to establishing documentation standards that ensure consistency and quality.
triggers:
  - define documentation standards
  - review documentation quality
  - documentation guidelines
  - writing standards review
  - documentation audit
activation_triggers:
  - documentation standards
  - writing guidelines
  - documentation quality review
prerequisites:
  - existing documentation reviewed
  - quality requirements defined
  - style guide available
inputs:
  - existing_documentation
  - quality_requirements
  - style_guide
steps:
  - Review existing documentation patterns
  - Identify inconsistencies and gaps
  - Define documentation standards
  - Create style guidelines
  - Define structure requirements
  - Specify formatting rules
  - Design documentation templates
  - Create quality checklist
  - Audit existing documentation
  - Publish standards document
outputs:
  - documentation_standards
  - style_guidelines
  - quality_checklist
  - audit_results
tools:
  - filesystem.read (read existing documentation)
  - filesystem.write (write standards documents)
quality_gates:
  - Existing patterns reviewed
  - Standards defined clearly
  - Style guidelines complete
  - Quality checklist created
  - Audit conducted
failure_modes:
  - Standards without reviewing existing docs
  - Vague or ambiguous guidelines
  - Missing quality checklist
  - No audit of existing documentation
  - Unpublished standards
handoffs:
  - meta-system.template-design (for documentation templates)
  - meta-system.quality-assurance (for standards enforcement)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.quality-assurance
  - meta-system.system-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert standards changes
  - Restore previous standards document
validators:
  - skill.validator
---

## Trigger
Use this skill when defining documentation standards, reviewing documentation quality, or creating writing guidelines.

## Prerequisites
- Existing documentation reviewed
- Quality requirements defined
- Style guide available

## Steps
1. **Review Patterns**: Analyze existing documentation for patterns and inconsistencies.
2. **Identify Gaps**: Find areas where documentation is inconsistent or missing.
3. **Define Standards**: Establish clear documentation standards.
4. **Create Guidelines**: Write style guidelines for common scenarios.
5. **Define Structure**: Specify required document structure per artifact type.
6. **Specify Formatting**: Define formatting rules (headers, lists, code blocks).
7. **Design Templates**: Create templates that enforce standards.
8. **Create Checklist**: Build a quality checklist for documentation review.
9. **Audit**: Review existing documentation against new standards.
10. **Publish**: Publish the standards document for all contributors.

## Verification
- All quality gates passed
- Standards defined clearly
- Quality checklist created
- Audit conducted

## Common Failures
- Defining standards without reviewing existing documentation
- Vague or ambiguous guidelines
- Not auditing existing documentation against new standards

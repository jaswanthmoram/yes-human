---
id: meta-system.template-design
name: Template Design for Registry Artifacts
version: 1.0.0
domain: meta-system
category: meta-system.authoring
purpose: Design reusable templates for agents, skills, workflows, and dossiers.
summary: Systematic approach to creating templates that standardize artifact creation across the yes-human registry.
triggers:
  - design agent template
  - create skill template
  - build workflow template
  - template standardization
  - artifact template design
activation_triggers:
  - template design
  - template standardization
  - artifact template creation
prerequisites:
  - artifact types identified
  - existing patterns reviewed
  - standardization requirements defined
inputs:
  - artifact_types
  - existing_patterns
  - standardization_requirements
steps:
  - Review existing artifact patterns
  - Identify common elements across artifacts
  - Design template structure
  - Define required fields and sections
  - Create placeholder patterns
  - Add validation rules
  - Design template variants
  - Test template with sample artifacts
  - Refine based on testing
  - Document template usage
outputs:
  - template_set
  - template_documentation
  - validation_rules
  - usage_examples
tools:
  - filesystem.read (read existing artifacts and patterns)
  - filesystem.write (write template files)
quality_gates:
  - Common elements identified
  - Template structure defined
  - Required fields specified
  - Validation rules included
  - Templates tested
failure_modes:
  - Templates without validation rules
  - Missing common elements
  - Untested templates
  - Overly rigid templates
  - Undocumented usage
handoffs:
  - meta-system.code-generation (to generate from templates)
  - meta-system.documentation-standards (for template documentation)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.agent-designer
  - meta-system.skill-designer
  - meta-system.workflow-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert template changes
  - Restore previous template versions
validators:
  - skill.validator
---

## Trigger
Use this skill when designing templates for registry artifacts, standardizing artifact formats, or creating reusable templates.

## Prerequisites
- Artifact types identified
- Existing patterns reviewed
- Standardization requirements defined

## Steps
1. **Review Patterns**: Analyze existing artifacts for common patterns.
2. **Identify Common Elements**: List elements shared across artifact types.
3. **Design Structure**: Create the template structure.
4. **Define Fields**: Specify required and optional fields.
5. **Create Placeholders**: Design placeholder patterns for variable content.
6. **Add Validation**: Define validation rules for template instances.
7. **Design Variants**: Create template variants for different use cases.
8. **Test**: Generate sample artifacts from templates.
9. **Refine**: Improve templates based on testing results.
10. **Document**: Write template usage documentation.

## Verification
- All quality gates passed
- Templates tested with sample artifacts
- Validation rules working
- Usage documented

## Common Failures
- Templates without validation rules
- Not testing templates with real artifacts
- Overly rigid templates that don't allow variation

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

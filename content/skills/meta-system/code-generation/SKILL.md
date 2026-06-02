---
id: meta-system.code-generation
name: Code Generation for Registry Artifacts
version: 1.0.0
domain: meta-system
category: meta-system.authoring
purpose: Generate code artifacts for agents, skills, and workflows following yes-human conventions.
summary: Systematic approach to generating code that creates registry artifacts conforming to project standards.
triggers:
  - generate agent code
  - create skill code
  - produce workflow code
  - code generation for registry
  - scaffold registry artifact
activation_triggers:
  - code generation
  - registry artifact scaffolding
  - artifact code creation
prerequisites:
  - artifact specification defined
  - code conventions known
  - target format specified
inputs:
  - artifact_specification
  - code_conventions
  - target_format
steps:
  - Review artifact specification
  - Identify target format (YAML, JSON, MD)
  - Apply code conventions
  - Generate frontmatter or schema
  - Generate content body
  - Add verification sections
  - Include source references
  - Validate generated code
  - Format and lint
  - Review against specification
outputs:
  - generated_code
  - validation_results
  - format_check_results
  - review_notes
tools:
  - filesystem.read (read conventions and specifications)
  - filesystem.write (write generated code)
quality_gates:
  - Specification followed
  - Conventions applied
  - Format validated
  - Code linted
  - Review complete
failure_modes:
  - Generating code without following conventions
  - Missing verification sections
  - Incorrect format
  - Unlinted code
  - Skipping review
handoffs:
  - meta-system.validation-testing (to validate generated artifacts)
  - meta-system.quality-assurance (for QA review)
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
  - Remove generated code
  - Restore previous version
validators:
  - skill.validator
---

## Trigger
Use this skill when generating code for registry artifacts, scaffolding agents/skills/workflows, or creating code from specifications.

## Prerequisites
- Artifact specification defined
- Code conventions known
- Target format specified

## Steps
1. **Review Specification**: Understand the artifact specification completely.
2. **Identify Format**: Determine the target format (YAML frontmatter, JSON, Markdown).
3. **Apply Conventions**: Follow yes-human code conventions.
4. **Generate Schema**: Create the frontmatter or JSON schema.
5. **Generate Content**: Write the content body following patterns.
6. **Add Verification**: Include verification sections.
7. **Include References**: Add source references and dossier links.
8. **Validate**: Check generated code against specification.
9. **Format and Lint**: Run formatting and linting.
10. **Review**: Review against specification for completeness.

## Verification
- All quality gates passed
- Specification followed
- Conventions applied
- Code linted

## Common Failures
- Generating code without following conventions
- Missing verification sections
- Not linting generated code

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

---
id: meta-system.skill-authoring
name: Skill Authoring and Specification
version: 1.0.0
domain: meta-system
category: meta-system.authoring
purpose: Author skill definitions with proper triggers, steps, quality gates, and handoff chains.
summary: Systematic approach to authoring skills that meet yes-human registry conventions and quality standards.
triggers:
  - author new skill
  - write skill specification
  - create skill definition
  - skill trigger authoring
  - skill handoff design
activation_triggers:
  - skill authoring
  - skill spec writing
  - skill definition creation
prerequisites:
  - skill requirement defined
  - domain context available
  - existing skills reviewed
inputs:
  - skill_requirement
  - domain_context
  - existing_skills
steps:
  - Analyze skill requirement and scope
  - Review existing skills for overlap
  - Design trigger set with activation triggers
  - Define prerequisites and inputs
  - Write step-by-step procedure
  - Define quality gates
  - Design handoff chains
  - Specify tools and allowed agents
  - Produce skill specification
  - Validate with quality gates
outputs:
  - skill_specification
  - trigger_set
  - procedure_guide
  - handoff_chain
tools:
  - filesystem.read (read existing skills and registry)
  - filesystem.write (write new skill files)
quality_gates:
  - Requirements analyzed
  - Overlap check complete
  - Triggers validated
  - Quality gates defined
  - Handoffs mapped
failure_modes:
  - Authoring without overlap check
  - Missing quality gates
  - Undefined handoff chains
  - Incomplete trigger sets
  - Skipping procedure steps
handoffs:
  - meta-system.skill-designer (to review skill design)
  - meta-system.fixture-engineer (to create skill fixtures)
source_references:
  - ref.github.meta-system.2026-05-31
allowed_agents:
  - meta-system.skill-designer
  - meta-system.system-architect
allowed_workflows: []
status: active
budget_band: standard
rollback:
  - Revert skill specification
  - Remove authored skill from registry
validators:
  - skill.validator
---

## Trigger
Use this skill when authoring new skills, writing skill specifications, or creating skill definitions.

## Prerequisites
- Skill requirement defined
- Domain context available
- Existing skills reviewed

## Steps
1. **Analyze Requirement**: Break down the skill requirement into capabilities and steps.
2. **Review Overlap**: Scan existing skills for functional overlap.
3. **Design Triggers**: Create trigger set with activation triggers.
4. **Define Prerequisites**: List prerequisites and required inputs.
5. **Write Procedure**: Write detailed step-by-step procedure.
6. **Define Gates**: Establish quality gates the skill must pass.
7. **Design Handoffs**: Map handoff chains to related skills.
8. **Specify Tools**: List allowed tools and agents.
9. **Produce Specification**: Write the complete SKILL.md file.
10. **Validate**: Run through quality gates.

## Verification
- All quality gates passed
- Overlap check complete
- Triggers validated
- Handoffs mapped

## Common Failures
- Authoring without checking existing skills
- Missing quality gates in the skill
- Undefined handoff chains
- Incomplete trigger sets

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

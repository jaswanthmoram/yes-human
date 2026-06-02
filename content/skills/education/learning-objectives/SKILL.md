---
id: education.learning-objectives
name: Learning Objectives Design
version: 1.0.0
domain: education
category: education.instruction
purpose: Write measurable, standards-aligned learning objectives using Bloom's taxonomy and competency frameworks for clear assessment targets.
summary: Crafting measurable learning objectives aligned to standards using Bloom's taxonomy with clear performance criteria.
triggers:
  - write learning objectives
  - learning outcomes design
  - bloom taxonomy objectives
  - competency statement writing
  - objective alignment check
aliases:
  - learning objectives
  - learning outcomes
negative_keywords:
  - marketing goals
  - OKR writing
  - project milestones
inputs:
  - standards_or_competencies
  - learner_level
  - content_domain
outputs:
  - learning_objectives
  - alignment_matrix
  - performance_criteria
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Writes objectives that are not measurable
  - Ignores Bloom's taxonomy levels
  - Objectives not aligned to standards
verification:
  - All objectives measurable
  - Bloom's levels identified
  - Standards alignment documented
source_references:
  - ref.github.education.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Write measurable, standards-aligned learning objectives using Bloom's taxonomy and competency frameworks with clear performance criteria.

## When To Use
- Writing learning objectives for courses or units
- Designing competency statements for programs
- Checking alignment between objectives and standards
- Creating performance criteria for assessments

## When Not To Use
- Marketing goal setting belongs to marketing domain
- OKR writing belongs to product-business domain
- Project milestone planning belongs to engineering domain

## Procedure
1. Identify the target standards or competencies.
2. Determine appropriate Bloom's taxonomy levels for each objective.
3. Write objectives using measurable action verbs.
4. Define performance criteria for each objective.
5. Create alignment matrix mapping objectives to standards.
6. Review for clarity, measurability, and appropriate rigor.

## Tool Policy
- Use `filesystem.read` to access standards documents and curriculum maps.
- Use `filesystem.write` to save objectives and alignment matrices.

## Verification
- Every objective uses a measurable action verb
- Bloom's taxonomy level identified for each objective
- Alignment matrix maps each objective to a standard

## Failure Modes
- Writing objectives with vague verbs like "understand" or "know"
- Ignoring cognitive complexity levels in Bloom's taxonomy
- Creating objectives that do not align to required standards

## Example Routes
- "write learning objectives for grade 5 math"
- "learning outcomes design for nursing program"
- "objective alignment check for science curriculum"

## Source Notes
- Bloom's taxonomy revised by Anderson & Krathwohl
- Mager's three-component objective model
- Reference: ref.github.education.2026-05-31

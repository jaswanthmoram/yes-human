---
id: education.educational-technology
name: Educational Technology Integration
version: 1.0.0
domain: education
category: education.technology
purpose: Evaluate, select, and integrate educational technology tools to enhance teaching and learning with pedagogical rationale.
summary: Strategic edtech evaluation and integration using TPACK and SAMR frameworks with accessibility and equity considerations.
triggers:
  - integrate educational technology
  - edtech tool selection
  - technology enhanced learning
  - digital tool integration
  - SAMR model application
aliases:
  - edtech integration
  - educational tech
negative_keywords:
  - IT infrastructure
  - software deployment
  - cloud migration
inputs:
  - learning_objectives
  - technology_options
  - learner_context
outputs:
  - technology_plan
  - integration_strategy
  - evaluation_criteria
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Selects technology without pedagogical rationale
  - Ignores accessibility and digital divide
  - Overlooks teacher training needs
verification:
  - Pedagogical rationale stated
  - Accessibility reviewed
  - Training plan included
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
Evaluate, select, and integrate educational technology tools to enhance teaching and learning with clear pedagogical rationale and equity considerations.

## When To Use
- Selecting edtech tools for specific learning objectives
- Planning technology integration across a curriculum
- Evaluating existing technology for pedagogical effectiveness
- Designing professional development for edtech adoption

## When Not To Use
- IT infrastructure setup belongs to platform domain
- Software deployment belongs to engineering domain
- Cloud migration belongs to platform domain

## Procedure
1. Identify learning objectives that technology can enhance.
2. Evaluate technology options using TPACK and SAMR frameworks.
3. Assess accessibility, equity, and digital divide implications.
4. Design integration strategy with implementation timeline.
5. Create evaluation criteria for measuring impact.
6. Plan teacher training and ongoing support.

## Tool Policy
- Use `filesystem.read` to access technology inventories and standards.
- Use `filesystem.write` to save integration plans and evaluations.

## Verification
- Pedagogical rationale stated for each tool selected
- Accessibility and equity review documented
- Teacher training plan included with timeline

## Failure Modes
- Choosing tools based on features rather than pedagogy
- Ignoring accessibility barriers for diverse learners
- Overlooking professional development needs for adoption

## Example Routes
- "integrate educational technology for math instruction"
- "edtech tool selection for elementary reading"
- "SAMR model application for science labs"

## Source Notes
- TPACK framework (Mishra & Koehler)
- SAMR model (Puentedura)
- ISTE Standards for Educators and Students
- Reference: ref.github.education.2026-05-31

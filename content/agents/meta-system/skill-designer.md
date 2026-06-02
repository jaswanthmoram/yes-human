---
id: meta-system.skill-designer
name: Skill Designer
version: 1.0.0
status: active
category: meta-system
kind: specialist
summary: Designs and reviews skill definitions with proper triggers, steps, quality gates, and handoff chains for the yes-human registry.
triggers:
  - design new skill
  - skill spec review
  - skill trigger design
  - skill quality gate review
  - skill handoff chain
aliases:
  - skill designer
  - skill spec writer
negative_keywords:
  - agent design
  - workflow design
  - code implementation
inputs:
  - skill_requirement
  - domain_context
  - existing_skills
outputs:
  - skill_specification
  - step_guide
  - handoff_map
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 4000
failure_modes:
  - creates skills without quality gates
  - omits handoff chains to related skills
  - duplicates existing skill functionality
verification:
  - quality_gates_defined
  - handoffs_validated
  - overlap_checked
source_references:
  - ref.github.meta-system.2026-05-31
quality_gate: staging
---
## Mission
Designs and reviews skill definitions with proper triggers, steps, quality gates, and handoff chains for the yes-human registry.

## Scope
- In scope: tasks matching triggers and domain expectations for `meta-system.skill-designer`.
- Out of scope: unrelated domains, destructive actions without approval, and ungrounded speculation.

## Procedure
1. Apply guidance from: skill designer: Microsoft Agent Framework docs patterns and workflow references.
2. Apply guidance from: verification pattern 1.
3. Apply guidance from: skill designer: OpenAI Agents docs patterns and workflow references.
4. Apply guidance from: verification pattern 2.
5. Apply guidance from: skill designer: Open Interpreter patterns and workflow references.
6. Apply guidance from: verification pattern 3.

4. Cite patterns from source dossier; do not invent policies.
5. Run verification checklist before completion.

## Verification
- quality_gates_defined
- handoffs_validated
- overlap_checked

## Failure modes
- creates skills without quality gates
- omits handoff chains to related skills
- duplicates existing skill functionality

## Examples
- Example A: User asks for Skill Designer help on a bounded task → deliver checklist, risks, and next actions.
- Example B: User provides incomplete context → ask targeted questions, then execute the procedure with assumptions explicit.

## Handoffs
- Escalate to domain master when task spans multiple specialists.
- Route to meta-system.supreme-router when no specialist fit.

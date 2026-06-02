---
id: sales.objection-handling
name: Objection Handling Framework
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Equip sellers with structured responses to common buyer objections using evidence, reframing, and social proof.
summary: Objection response frameworks with categorized objections, evidence-based rebuttals, and escalation paths.
triggers:
  - design objection handling for enterprise procurement
  - build an objection playbook for competitor comparisons
  - create objection responses for pricing pushback
  - handle buyer objections
  - objection response guide
  - common objections framework
  - rebuttal creation
  - objection handling training
  - sales objection playbook
aliases:
  - objection handling
  - rebuttals
  - objection playbook
negative_keywords:
  - customer complaint resolution
  - legal dispute
  - product bug report
inputs:
  - objection_catalog
  - product_evidence
  - competitive_context
outputs:
  - objection_responses
  - evidence_library
  - escalation_guide
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates responses without evidence
  - Treats all objections the same way
  - Skips escalation path for unresolvable objections
verification:
  - Responses backed by evidence or social proof
  - Objections categorized by type
  - Escalation path defined
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Equip sellers with structured, evidence-based responses to common buyer objections, categorized by type with escalation paths.

## When To Use
- Creating objection handling guides for sellers
- Preparing for deals with known objections
- Training sellers on objection response techniques
- Building objection playbooks for new market segments

## When Not To Use
- Customer complaint resolution belongs to customer success
- Legal disputes belong to legal-compliance
- Product bug reports belong to engineering

## Procedure
1. Catalog common objections by category (price, timing, competitor, authority, need).
2. For each objection, identify the underlying concern.
3. Craft responses using evidence, social proof, or reframing.
4. Define escalation paths for objections that require specialist input.
5. Test responses against real deal outcomes.
6. Update the catalog based on win/loss data.

## Tool Policy
- Use `filesystem.read` to access win/loss data and competitive intelligence.
- Use `filesystem.write` to save objection guides and response libraries.

## Verification
- Each response backed by evidence, case study, or data
- Objections categorized by type with underlying concern identified
- Escalation path defined for unresolvable objections

## Failure Modes
- Generic responses without specific evidence
- Treating all objections as price objections
- No escalation path for complex or legal objections

## Example Routes
- "create objection responses for pricing pushback"
- "build an objection playbook for competitor comparisons"
- "design objection handling for enterprise procurement"

## Source Notes
- LAER model: Listen, Acknowledge, Explore, Respond
- Reference: ref.github.sales.2026-05-31

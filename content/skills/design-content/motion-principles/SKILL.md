---
id: design-content.motion-principles
name: Motion Principles
version: 1.0.0
domain: design-content
category: design-content.motion-design
purpose: Define motion design principles for a product's animation language and behavior system.
summary: Motion design principle definition covering easing, duration, choreography, and purposeful animation.
triggers:
  - define motion principles for the product
  - motion principles definition
  - animation language design
  - motion design guidelines
  - animation principle setup
  - motion behavior system
aliases:
  - motion principles
  - animation principles
negative_keywords:
  - static design
  - backend implementation
  - database design
inputs:
  - brand_personality
  - product_context
  - platform_constraints
outputs:
  - motion_principles_document
  - animation_guidelines
  - behavior_specs
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Principles without brand personality alignment
  - Missing platform constraint consideration
  - No animation purpose justification
verification:
  - Principles aligned with brand personality
  - Platform constraints addressed
  - Animation purpose justified
source_references:
  - ref.github.design-content.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Define motion design principles for a product's animation language and behavior system.

## When To Use
- Defining motion principles for a new product
- Creating animation language documentation
- Setting up motion behavior guidelines

## When Not To Use
- Static design (use visual-designer agent)
- Backend implementation (use engineering domain)
- Database design (use engineering.database-design)

## Procedure
1. Define brand personality and how motion expresses it.
2. Establish core motion principles (easing, timing, choreography).
3. Define animation purposes (feedback, navigation, delight).
4. Address platform constraints (performance, reduced motion).
5. Document motion guidelines with examples.

## Tool Policy
- Use `filesystem.read` to review brand and product context.
- Use `filesystem.write` to produce motion principle docs.

## Verification
- Principles aligned with brand personality
- Platform constraints addressed
- Animation purpose justified

## Source Notes
Material Design motion principles, IBM Carbon motion guidelines, Val Head animation resources. Reference: ref.github.design-content.2026-05-31

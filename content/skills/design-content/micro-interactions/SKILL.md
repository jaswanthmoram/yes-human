---
id: design-content.micro-interactions
name: Micro-Interactions
version: 1.0.0
domain: design-content
category: design-content.motion-design
purpose: Design micro-interactions for feedback, state changes, and delightful user experiences.
summary: Micro-interaction design covering triggers, rules, feedback, and loops for small interactive moments.
triggers:
  - create loading animation for the spinner
  - micro-interaction design
  - button feedback animation
  - state change animation
  - loading animation design
  - notification animation
aliases:
  - micro interactions
  - micro animations
negative_keywords:
  - full page transitions
  - backend implementation
  - database design
inputs:
  - interaction_context
  - trigger_types
  - brand_personality
outputs:
  - micro_interaction_specs
  - feedback_patterns
  - animation_details
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Interactions without clear trigger
  - Missing feedback for state changes
  - Animations that delay user tasks
verification:
  - Clear trigger defined for each interaction
  - Feedback provided for all state changes
  - Animation duration does not delay tasks
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
Design micro-interactions for feedback, state changes, and delightful user experiences.

## When To Use
- Designing button and control feedback
- Creating loading and progress animations
- Designing notification and alert animations

## When Not To Use
- Full page transitions (use motion-principles skill)
- Backend implementation (use engineering domain)
- Database design (use engineering.database-design)

## Procedure
1. Identify the trigger (user action or system event).
2. Define the rules (what happens and when).
3. Design the feedback (visual, haptic, audio).
4. Specify animation details (timing, easing, duration).
5. Define loops and conditions for repeating interactions.

## Tool Policy
- Use `filesystem.read` to review interaction context and specs.

## Verification
- Clear trigger defined for each interaction
- Feedback provided for all state changes
- Animation duration does not delay tasks

## Source Notes
Dan Saffer Microinteractions, Material Design motion, Apple HIG animation guidelines. Reference: ref.github.design-content.2026-05-31

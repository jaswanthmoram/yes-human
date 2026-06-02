---
id: design-content.animation-timing
name: Animation Timing
version: 1.0.0
domain: design-content
category: design-content.motion-design
purpose: Define animation timing curves, durations, and delay patterns for consistent motion behavior.
summary: Animation timing specification with easing curves, duration scales, delay patterns, and performance budgets.
triggers:
  - define easing curves for the design system
  - animation timing specification
  - easing curve definition
  - duration scale design
  - animation delay patterns
  - motion timing system
aliases:
  - animation timing
  - timing curves
negative_keywords:
  - static design
  - backend implementation
  - database design
inputs:
  - motion_principles
  - interaction_types
  - performance_budget
outputs:
  - timing_specifications
  - easing_curves
  - duration_scale
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Timing without performance consideration
  - Missing easing curve definitions
  - No duration scale hierarchy
verification:
  - Performance budget respected
  - All easing curves defined
  - Duration scale hierarchy present
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
Define animation timing curves, durations, and delay patterns for consistent motion behavior.

## When To Use
- Specifying animation timing for a design system
- Defining easing curves for transitions
- Creating duration scales for motion

## When Not To Use
- Static design (use visual-designer agent)
- Backend implementation (use engineering domain)
- Database design (use engineering.database-design)

## Procedure
1. Review motion principles and interaction types.
2. Define easing curves (ease-in, ease-out, ease-in-out, custom).
3. Create duration scale (instant, fast, normal, slow, deliberate).
4. Define delay patterns for staggered animations.
5. Set performance budget constraints (max duration, frame rate).

## Tool Policy
- Use `filesystem.read` to review motion principles and specs.
- Use `filesystem.write` to produce timing specifications.

## Verification
- Performance budget respected
- All easing curves defined
- Duration scale hierarchy present

## Source Notes
Material Design motion timing, CSS easing functions, Web Animations API timing. Reference: ref.github.design-content.2026-05-31

---
id: design-content.component-libraries
name: Component Libraries
version: 1.0.0
domain: design-content
category: design-content.design-systems
purpose: Build and maintain component libraries with consistent APIs, documentation, and testing.
summary: Component library architecture with API design, documentation standards, and visual regression testing.
triggers:
  - component library setup
  - component api design
  - component documentation
  - component testing setup
  - component library audit
aliases:
  - component library
  - ui library
negative_keywords:
  - one-off component
  - backend api
  - database schema
inputs:
  - design_system_specs
  - component_requirements
  - platform_targets
outputs:
  - component_api_specs
  - documentation_templates
  - testing_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Inconsistent component APIs
  - Missing documentation for components
  - No visual regression testing
verification:
  - Component APIs follow consistent patterns
  - All components have documentation
  - Visual regression tests defined
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
Build and maintain component libraries with consistent APIs, documentation, and testing.

## When To Use
- Setting up a new component library
- Designing component APIs
- Auditing existing component libraries

## When Not To Use
- One-off component creation (use engineering domain)
- Backend API design (use engineering.backend-api)
- Database schema (use engineering.database-design)

## Procedure
1. Define component library architecture and structure.
2. Design consistent component APIs (props, slots, events).
3. Create documentation templates for each component.
4. Set up visual regression testing strategy.
5. Define contribution and review guidelines.

## Tool Policy
- Use `filesystem.read` to review existing component files.
- Use `filesystem.write` to produce component specs and docs.

## Verification
- Component APIs follow consistent patterns
- All components have documentation
- Visual regression tests defined

## Source Notes
Storybook documentation, Radix UI primitives, shadcn/ui patterns, React Aria. Reference: ref.github.design-content.2026-05-31

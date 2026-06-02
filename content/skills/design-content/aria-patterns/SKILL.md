---
id: design-content.aria-patterns
name: ARIA Patterns
version: 1.0.0
domain: design-content
category: design-content.accessibility
purpose: Implement WAI-ARIA patterns for complex interactive widgets and dynamic content.
summary: ARIA authoring practices for common widget patterns including tabs, dialogs, menus, and tree views.
triggers:
  - set up aria live regions for notifications
  - aria pattern implementation
  - aria widget design
  - aria role assignment
  - aria live region setup
  - accessible widget pattern
aliases:
  - aria patterns
  - aria widgets
negative_keywords:
  - visual design only
  - backend implementation
  - database design
inputs:
  - widget_requirements
  - interaction_patterns
  - assistive_tech_targets
outputs:
  - aria_implementation_spec
  - keyboard_interaction_map
  - testing_checklist
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Incorrect ARIA role usage
  - Missing keyboard interaction support
  - Overuse of ARIA where native HTML suffices
verification:
  - ARIA roles match WAI-ARIA authoring practices
  - Keyboard interactions defined for all widgets
  - Native HTML preferred over ARIA where possible
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
Implement WAI-ARIA patterns for complex interactive widgets and dynamic content.

## When To Use
- Building accessible tab panels, dialogs, or menus
- Implementing ARIA live regions for dynamic content
- Creating complex interactive widgets

## When Not To Use
- Visual design only (use figma-design skill)
- Backend implementation (use engineering domain)
- Database design (use engineering.database-design)

## Procedure
1. Identify the widget pattern and its ARIA requirements.
2. Map keyboard interactions (Tab, Enter, Space, Arrow keys).
3. Define ARIA roles, states, and properties.
4. Prefer native HTML elements over ARIA where possible.
5. Create testing checklist for assistive technology.

## Tool Policy
- Use `filesystem.read` to review widget requirements and code.

## Verification
- ARIA roles match WAI-ARIA authoring practices
- Keyboard interactions defined for all widgets
- Native HTML preferred over ARIA where possible

## Source Notes
WAI-ARIA Authoring Practices 1.2, W3C ARIA specification, OpenAjax accessibility examples. Reference: ref.github.design-content.2026-05-31

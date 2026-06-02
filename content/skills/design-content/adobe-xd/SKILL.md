---
id: design-content.adobe-xd
name: Adobe XD Design
version: 1.0.0
domain: design-content
category: design-content.ui-design
purpose: Create and manage design files in Adobe XD with components, responsive resize, and prototyping.
summary: Adobe XD-specific workflows for component creation, responsive resize, auto-animate, and design handoff.
triggers:
  - adobe xd component creation
  - xd responsive resize setup
  - xd auto animate prototype
  - xd design handoff
  - xd component library setup
aliases:
  - adobe xd
  - xd workflow
negative_keywords:
  - figma design
  - sketch design
  - code implementation
inputs:
  - design_requirements
  - component_specs
  - prototype_flows
outputs:
  - xd_components
  - responsive_specs
  - prototype_definitions
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Creates components without responsive resize
  - Omits auto-animate transitions
  - Missing handoff specs
verification:
  - Responsive resize applied to key artboards
  - Auto-animate defined for key transitions
  - Handoff specs present
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
Create and manage design files in Adobe XD with components, responsive resize, and prototyping.

## When To Use
- Creating Adobe XD components with responsive resize
- Setting up auto-animate prototypes in XD
- Preparing design handoff from XD files

## When Not To Use
- Figma-specific workflows (use figma-design skill)
- Sketch-specific workflows (use sketch-design skill)
- Code implementation (use engineering domain)

## Procedure
1. Define component requirements and responsive breakpoints.
2. Apply responsive resize to key artboards.
3. Create component states for interactive elements.
4. Define auto-animate transitions between screens.
5. Add handoff specs for developers.

## Tool Policy
- Use `filesystem.read` to review design requirements and specs.

## Verification
- Responsive resize applied to key artboards
- Auto-animate defined for key transitions
- Handoff specs present

## Source Notes
Adobe XD documentation, XD design system patterns, prototyping best practices. Reference: ref.github.design-content.2026-05-31

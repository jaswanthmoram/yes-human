---
id: product-business.product-roadmapping
name: Product Roadmapping
version: 1.0.0
domain: product-business
category: product-business.planning
purpose: Build strategic product roadmaps that align initiatives with business goals and communicate direction to stakeholders.
summary: Guides through creating outcome-based roadmaps with themes, initiatives, and timeline horizons.
triggers:
  - build product roadmap
  - create roadmap
  - roadmap planning
  - product roadmap template
activation_triggers:
  - plan the roadmap
  - roadmap for next quarter
  - strategic roadmap
prerequisites:
  - strategic goals and business objectives
  - feature backlog or initiative list
inputs:
  - strategic_goals
  - initiative_list
  - resource_constraints
steps:
  - Define roadmap themes aligned to strategic goals
  - Group initiatives into themes and epics
  - Assign time horizons (now/next/later or quarterly)
  - Map dependencies between initiatives
  - Define success metrics for each theme
  - Create stakeholder communication view
outputs:
  - product_roadmap
  - theme_definitions
  - dependency_map
tools:
  - filesystem.read
quality_gates:
  - Roadmap is outcome-based, not feature-list-based
  - Dependencies are explicitly mapped
  - Success metrics defined per theme
failure_modes:
  - Creating a feature list instead of an outcome roadmap
  - Ignoring cross-team dependencies
  - Not defining success metrics
handoffs:
  - product-business.feature-prioritizer (for backlog ordering)
  - product-business.roadmap-planner (for detailed planning)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.roadmap-planner
  - product-business.product-strategist
  - product-business.master
allowed_workflows:
  - product-business.product-roadmap-creation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when building or updating a product roadmap.

## Prerequisites
- Strategic goals and business objectives defined
- Feature backlog or initiative list available

## Steps
1. **Define Themes**: Group work into strategic themes (e.g., "Improve Activation", "Expand Enterprise").
2. **Map Initiatives**: Assign initiatives and epics to themes.
3. **Set Horizons**: Use now/next/later or quarterly time horizons.
4. **Map Dependencies**: Identify cross-team and technical dependencies.
5. **Define Metrics**: Set measurable outcomes for each theme.
6. **Communicate**: Create tailored views for different stakeholders.

## Verification
- Roadmap communicates direction, not commitments
- Each theme has measurable success criteria
- Dependencies are visible and tracked

## Rollback
- No state changes; this is a planning skill

## Common Failures
- Building a feature factory roadmap instead of outcome-based
- Overcommitting to specific dates without buffer
- Not updating roadmap as priorities shift

## Examples
### Theme: Improve User Activation
Initiatives: Onboarding redesign, In-app tutorials, Email drip sequence
Horizon: Next quarter
Success Metric: Increase D1 activation rate from 30% to 45%

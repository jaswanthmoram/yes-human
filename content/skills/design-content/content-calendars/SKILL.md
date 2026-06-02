---
id: design-content.content-calendars
name: Content Calendars
version: 1.0.0
domain: design-content
category: design-content.content-strategy
purpose: Plan and manage editorial calendars with content scheduling, workflow assignments, and publishing timelines.
summary: Editorial calendar creation with content scheduling, team assignments, and publishing workflow management.
triggers:
  - publishing timeline for the product launch
  - editorial calendar creation
  - content scheduling plan
  - publishing timeline design
  - content workflow setup
  - content pipeline planning
aliases:
  - content calendar
  - editorial calendar
negative_keywords:
  - content writing
  - code implementation
  - financial planning
inputs:
  - content_strategy
  - team_capacity
  - publishing_channels
outputs:
  - editorial_calendar
  - workflow_assignments
  - publishing_schedule
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 6000
failure_modes:
  - Calendar without team capacity check
  - Missing publishing channel mapping
  - No workflow status tracking
verification:
  - Team capacity validated
  - All publishing channels mapped
  - Workflow status tracking defined
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
Plan and manage editorial calendars with content scheduling, workflow assignments, and publishing timelines.

## When To Use
- Creating an editorial calendar for a quarter or year
- Planning content publishing schedules
- Setting up content workflow assignments

## When Not To Use
- Content writing (use copywriter or seo-writer agents)
- Code implementation (use engineering domain)
- Financial planning (use finance domain)

## Procedure
1. Review content strategy and publishing goals.
2. Map publishing channels and content types.
3. Assess team capacity and assign workflows.
4. Create publishing schedule with milestones.
5. Define status tracking and review checkpoints.

## Tool Policy
- Use `filesystem.read` to review strategy and capacity docs.
- Use `filesystem.write` to produce calendar outputs.

## Verification
- Team capacity validated
- All publishing channels mapped
- Workflow status tracking defined

## Source Notes
Content Marketing Institute editorial calendar templates, CoSchedule best practices. Reference: ref.github.design-content.2026-05-31

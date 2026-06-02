---
id: product-business.launch-checklists
name: Launch Checklists
version: 1.0.0
domain: product-business
category: product-business.launch
purpose: Create comprehensive launch checklists covering all functional areas for successful product launches.
summary: Guides through building launch checklists with cross-functional coverage, timing, and ownership.
triggers:
  - launch checklist
  - launch readiness
  - pre launch checklist
  - go live checklist
activation_triggers:
  - create launch checklist
  - are we ready to launch
  - launch preparation
prerequisites:
  - launch scope and timeline defined
  - cross-functional team identified
inputs:
  - launch_scope
  - launch_timeline
  - team_roles
steps:
  - Identify all functional areas involved in launch
  - Create checklist items per area with owners and deadlines
  - Define readiness criteria for go/no-go decision
  - Build timeline with dependencies and milestones
  - Include post-launch monitoring and rollback plan
  - Conduct readiness review before launch
outputs:
  - launch_checklist
  - readiness_criteria
  - timeline_with_owners
tools:
  - filesystem.read
quality_gates:
  - All functional areas covered
  - Every item has an owner and deadline
  - Go/no-go criteria are explicit
failure_modes:
  - Missing functional areas (support, legal, docs)
  - Items without owners or deadlines
  - No rollback or contingency plan
handoffs:
  - product-business.product-launcher (for execution)
  - product-business.product-ops (for process coordination)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-launcher
  - product-business.product-ops
  - product-business.master
allowed_workflows:
  - product-business.product-launch
status: active
budget_band: standard
rollback:
  - Rollback plan included in checklist
validators:
  - skill.validator
---

## Trigger
Use this skill when creating launch checklists or assessing launch readiness.

## Prerequisites
- Launch scope and timeline defined
- Cross-functional team identified

## Steps
1. **Functional Areas**: Product, Engineering, Marketing, Sales, Support, Legal, Docs.
2. **Checklist Items**: Per-area tasks with owner, deadline, and status.
3. **Readiness Criteria**: Go/no-go gates per area (e.g., "QA passed", "Docs published").
4. **Timeline**: Dependencies, milestones, and critical path.
5. **Post-Launch**: Monitoring, support escalation, rollback plan.
6. **Review**: Conduct readiness review 1 week before launch.

## Verification
- All areas have completed checklists
- Go/no-go criteria met for each area
- Rollback plan is tested

## Rollback
- Rollback plan is part of the checklist

## Common Failures
- Forgetting support and documentation preparation
- No clear go/no-go decision maker
- Launching on Friday or before a holiday

## Examples
### Launch Checklist (Marketing)
- [ ] Blog post published (Owner: Content, Due: T-3 days)
- [ ] Email campaign scheduled (Owner: Growth, Due: T-1 day)
- [ ] Social media posts queued (Owner: Social, Due: T-2 days)
- [ ] Press release distributed (Owner: PR, Due: Launch day)

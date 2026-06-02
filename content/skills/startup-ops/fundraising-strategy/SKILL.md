---
id: startup-ops.fundraising-strategy
name: Fundraising Strategy
version: 1.0.0
domain: startup-ops
category: startup-ops.fundraising
purpose: Plan fundraising rounds including timing, amount, investor targeting, and materials preparation.
summary: Creates comprehensive fundraising strategies with round sizing, investor lists, and timeline planning.
triggers:
  - fundraising strategy
  - raise planning
  - round planning
  - fundraise timeline
activation_triggers:
  - fundraising strategy
  - raise planning
  - round planning
  - fundraise timeline
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Assess fundraising readiness
  - Determine round size and structure
  - Build target investor list by thesis match
  - Create fundraising timeline
  - Prepare materials checklist
  - Plan outreach sequence
  - Define negotiation parameters
outputs:
  - fundraising_plan
  - investor_targets
  - timeline
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Plans raise without readiness assessment
  - Targets investors without thesis alignment
  - Skips materials preparation
handoffs:
  - startup-ops.fundraising-specialist
  - startup-ops.investor-outreach
source_references:
  - ref.github.startup-ops.2026-05-31
allowed_agents:
  - startup-ops.startup-strategist
  - startup-ops.business-model-designer
  - startup-ops.customer-development
allowed_workflows:
  - startup-ops.business-model-validation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when fundraising strategy or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Assess fundraising readiness**: assess fundraising readiness with evidence and documentation.
2. **Determine round size and structure**: determine round size and structure with evidence and documentation.
3. **Build target investor list by thesis match**: build target investor list by thesis match with evidence and documentation.
4. **Create fundraising timeline**: create fundraising timeline with evidence and documentation.
5. **Prepare materials checklist**: prepare materials checklist with evidence and documentation.
6. **Plan outreach sequence**: plan outreach sequence with evidence and documentation.
7. **Define negotiation parameters**: define negotiation parameters with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Plans raise without readiness assessment
- Targets investors without thesis alignment
- Skips materials preparation

## Examples
### Fundraising Strategy Example
Input: fundraising strategy for a B2B SaaS startup
Output:
- fundraising_plan with evidence-based entries
- investor_targets with prioritized items
- timeline with clear next steps
---
id: startup-ops.mvp-development
name: MVP Development Planning
version: 1.0.0
domain: startup-ops
category: startup-ops.validation
purpose: Plan and scope minimum viable products that test core hypotheses with minimal resources.
summary: Guides MVP scoping, build-vs-buy decisions, and validation criteria for rapid iteration.
triggers:
  - MVP planning
  - minimum viable product
  - MVP scope
  - build vs buy
activation_triggers:
  - MVP planning
  - minimum viable product
  - MVP scope
  - build vs buy
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Identify core hypothesis to test
  - Define minimum feature set
  - Evaluate build vs buy for components
  - Set validation criteria and success metrics
  - Plan rapid iteration cycles
  - Define feedback collection mechanisms
  - Establish pivot or persevere criteria
outputs:
  - mvp_scope
  - build_plan
  - validation_criteria
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Builds too many features before validating
  - Skips success metrics definition
  - Confuses MVP with prototype
handoffs:
  - startup-ops.startup-strategist
  - startup-ops.product-market-fit
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
Use this skill when MVP planning or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Identify core hypothesis to test**: identify core hypothesis to test with evidence and documentation.
2. **Define minimum feature set**: define minimum feature set with evidence and documentation.
3. **Evaluate build vs buy for components**: evaluate build vs buy for components with evidence and documentation.
4. **Set validation criteria and success metrics**: set validation criteria and success metrics with evidence and documentation.
5. **Plan rapid iteration cycles**: plan rapid iteration cycles with evidence and documentation.
6. **Define feedback collection mechanisms**: define feedback collection mechanisms with evidence and documentation.
7. **Establish pivot or persevere criteria**: establish pivot or persevere criteria with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Builds too many features before validating
- Skips success metrics definition
- Confuses MVP with prototype

## Examples
### MVP Development Planning Example
Input: MVP planning for a B2B SaaS startup
Output:
- mvp_scope with evidence-based entries
- build_plan with prioritized items
- validation_criteria with clear next steps
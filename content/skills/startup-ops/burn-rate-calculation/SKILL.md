---
id: startup-ops.burn-rate-calculation
name: Burn Rate and Runway
version: 1.0.0
domain: startup-ops
category: startup-ops.finance
purpose: Calculate burn rate, runway, and cash management strategies for startup financial health.
summary: Tracks gross and net burn rate, calculates runway under different scenarios, and recommends cash optimization.
triggers:
  - burn rate
  - runway calculation
  - cash runway
  - monthly burn
  - cash management startup
activation_triggers:
  - burn rate
  - runway calculation
  - cash runway
  - monthly burn
  - cash management startup
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Calculate gross monthly burn rate
  - Calculate net burn rate with revenue
  - Determine current runway in months
  - Model runway under different scenarios
  - Identify cost optimization opportunities
  - Set cash reserve targets
  - Create burn rate monitoring dashboard
outputs:
  - burn_rate_report
  - runway_analysis
  - optimization_plan
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Calculates burn without separating fixed vs variable costs
  - Skips scenario modeling
  - Confuses gross burn with net burn
handoffs:
  - startup-ops.financial-modeler
  - startup-ops.operations-manager
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
Use this skill when burn rate or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Calculate gross monthly burn rate**: calculate gross monthly burn rate with evidence and documentation.
2. **Calculate net burn rate with revenue**: calculate net burn rate with revenue with evidence and documentation.
3. **Determine current runway in months**: determine current runway in months with evidence and documentation.
4. **Model runway under different scenarios**: model runway under different scenarios with evidence and documentation.
5. **Identify cost optimization opportunities**: identify cost optimization opportunities with evidence and documentation.
6. **Set cash reserve targets**: set cash reserve targets with evidence and documentation.
7. **Create burn rate monitoring dashboard**: create burn rate monitoring dashboard with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Calculates burn without separating fixed vs variable costs
- Skips scenario modeling
- Confuses gross burn with net burn

## Examples
### Burn Rate and Runway Example
Input: burn rate for a B2B SaaS startup
Output:
- burn_rate_report with evidence-based entries
- runway_analysis with prioritized items
- optimization_plan with clear next steps
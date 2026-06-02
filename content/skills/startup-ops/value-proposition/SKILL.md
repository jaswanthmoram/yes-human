---
id: startup-ops.value-proposition
name: Value Proposition Design
version: 1.0.0
domain: startup-ops
category: startup-ops.strategy
purpose: Design and test value propositions that match customer jobs, pains, and gains.
summary: Uses the Value Proposition Canvas to map customer profile and value map for product-market alignment.
triggers:
  - value proposition
  - value prop design
  - customer pain gain
activation_triggers:
  - value proposition
  - value prop design
  - customer pain gain
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Map customer jobs to be done
  - List customer pains and gains
  - Define products and services
  - Map pain relievers
  - Map gain creators
  - Test fit between profiles
  - Iterate based on feedback
outputs:
  - value_proposition_canvas
  - fit_analysis
  - test_plan
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Designs value prop without customer research
  - Lists features instead of benefits
  - Skips pain-gain fit validation
handoffs:
  - startup-ops.customer-development
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
Use this skill when value proposition or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Map customer jobs to be done**: map customer jobs to be done with evidence and documentation.
2. **List customer pains and gains**: list customer pains and gains with evidence and documentation.
3. **Define products and services**: define products and services with evidence and documentation.
4. **Map pain relievers**: map pain relievers with evidence and documentation.
5. **Map gain creators**: map gain creators with evidence and documentation.
6. **Test fit between profiles**: test fit between profiles with evidence and documentation.
7. **Iterate based on feedback**: iterate based on feedback with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Designs value prop without customer research
- Lists features instead of benefits
- Skips pain-gain fit validation

## Examples
### Value Proposition Design Example
Input: value proposition for a B2B SaaS startup
Output:
- value_proposition_canvas with evidence-based entries
- fit_analysis with prioritized items
- test_plan with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

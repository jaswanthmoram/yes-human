---
id: startup-ops.unit-economics
name: Unit Economics Analysis
version: 1.0.0
domain: startup-ops
category: startup-ops.finance
purpose: Calculate and optimize unit economics including CAC, LTV, payback period, and contribution margin.
summary: Analyzes per-unit profitability metrics to validate business model sustainability and scalability.
triggers:
  - unit economics
  - CAC LTV
  - payback period
  - contribution margin
  - customer lifetime value
activation_triggers:
  - unit economics
  - CAC LTV
  - payback period
  - contribution margin
  - customer lifetime value
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Calculate Customer Acquisition Cost by channel
  - Estimate Lifetime Value from retention data
  - Compute LTV/CAC ratio
  - Calculate payback period
  - Analyze contribution margin per unit
  - Identify levers to improve unit economics
  - Benchmark against industry standards
outputs:
  - unit_economics_report
  - channel_analysis
  - improvement_levers
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Calculates LTV without retention cohort data
  - Uses blended CAC without channel breakdown
  - Skips payback period analysis
handoffs:
  - startup-ops.financial-modeler
  - startup-ops.growth-hacker
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
Use this skill when unit economics or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Calculate Customer Acquisition Cost by channel**: calculate customer acquisition cost by channel with evidence and documentation.
2. **Estimate Lifetime Value from retention data**: estimate lifetime value from retention data with evidence and documentation.
3. **Compute LTV/CAC ratio**: compute ltv/cac ratio with evidence and documentation.
4. **Calculate payback period**: calculate payback period with evidence and documentation.
5. **Analyze contribution margin per unit**: analyze contribution margin per unit with evidence and documentation.
6. **Identify levers to improve unit economics**: identify levers to improve unit economics with evidence and documentation.
7. **Benchmark against industry standards**: benchmark against industry standards with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Calculates LTV without retention cohort data
- Uses blended CAC without channel breakdown
- Skips payback period analysis

## Examples
### Unit Economics Analysis Example
Input: unit economics for a B2B SaaS startup
Output:
- unit_economics_report with evidence-based entries
- channel_analysis with prioritized items
- improvement_levers with clear next steps
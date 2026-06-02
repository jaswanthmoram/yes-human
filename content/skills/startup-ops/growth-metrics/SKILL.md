---
id: startup-ops.growth-metrics
name: Growth Metrics Framework
version: 1.0.0
domain: startup-ops
category: startup-ops.growth
purpose: Define and track growth metrics including AARRR pirate metrics, North Star metric, and growth accounting.
summary: Sets up growth measurement frameworks with acquisition, activation, retention, referral, and revenue tracking.
triggers:
  - growth metrics
  - AARRR
  - pirate metrics
  - north star metric
  - growth accounting
activation_triggers:
  - growth metrics
  - AARRR
  - pirate metrics
  - north star metric
  - growth accounting
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Define North Star metric
  - Map AARRR funnel stages
  - Set up cohort-based retention tracking
  - Define activation criteria
  - Track referral and viral coefficients
  - Implement growth accounting
  - Create metrics dashboard
outputs:
  - metrics_framework
  - funnel_dashboard
  - growth_accounting
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Tracks vanity metrics without actionable insight
  - Skips cohort-based retention analysis
  - Confuses growth rate with growth accounting
handoffs:
  - startup-ops.growth-hacker
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
Use this skill when growth metrics or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Define North Star metric**: define north star metric with evidence and documentation.
2. **Map AARRR funnel stages**: map aarrr funnel stages with evidence and documentation.
3. **Set up cohort-based retention tracking**: set up cohort-based retention tracking with evidence and documentation.
4. **Define activation criteria**: define activation criteria with evidence and documentation.
5. **Track referral and viral coefficients**: track referral and viral coefficients with evidence and documentation.
6. **Implement growth accounting**: implement growth accounting with evidence and documentation.
7. **Create metrics dashboard**: create metrics dashboard with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Tracks vanity metrics without actionable insight
- Skips cohort-based retention analysis
- Confuses growth rate with growth accounting

## Examples
### Growth Metrics Framework Example
Input: growth metrics for a B2B SaaS startup
Output:
- metrics_framework with evidence-based entries
- funnel_dashboard with prioritized items
- growth_accounting with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

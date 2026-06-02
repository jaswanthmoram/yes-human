---
id: startup-ops.cap-tables
name: Cap Table Management
version: 1.0.0
domain: startup-ops
category: startup-ops.fundraising
purpose: Build and maintain capitalization tables tracking equity ownership, option pools, and dilution across rounds.
summary: Creates cap table models with founder equity, investor shares, employee options, and round-by-round dilution tracking.
triggers:
  - cap table
  - capitalization table
  - equity tracking
  - option pool
  - dilution tracking
activation_triggers:
  - cap table
  - capitalization table
  - equity tracking
  - option pool
  - dilution tracking
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Set up initial founder equity split
  - Add employee option pool
  - Model each funding round
  - Calculate dilution per round
  - Track vesting schedules
  - Project future dilution scenarios
  - Validate against legal documents
outputs:
  - cap_table
  - dilution_projection
  - equity_summary
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Builds cap table without option pool
  - Skips vesting schedule tracking
  - Confuses authorized shares with issued shares
handoffs:
  - startup-ops.legal-compliance
  - startup-ops.financial-modeler
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
Use this skill when cap table or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Set up initial founder equity split**: set up initial founder equity split with evidence and documentation.
2. **Add employee option pool**: add employee option pool with evidence and documentation.
3. **Model each funding round**: model each funding round with evidence and documentation.
4. **Calculate dilution per round**: calculate dilution per round with evidence and documentation.
5. **Track vesting schedules**: track vesting schedules with evidence and documentation.
6. **Project future dilution scenarios**: project future dilution scenarios with evidence and documentation.
7. **Validate against legal documents**: validate against legal documents with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Builds cap table without option pool
- Skips vesting schedule tracking
- Confuses authorized shares with issued shares

## Examples
### Cap Table Management Example
Input: cap table for a B2B SaaS startup
Output:
- cap_table with evidence-based entries
- dilution_projection with prioritized items
- equity_summary with clear next steps
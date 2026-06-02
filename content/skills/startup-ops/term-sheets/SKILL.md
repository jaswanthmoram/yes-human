---
id: startup-ops.term-sheets
name: Term Sheet Analysis
version: 1.0.0
domain: startup-ops
category: startup-ops.fundraising
purpose: Analyze and negotiate venture capital term sheets including valuation, dilution, and governance terms.
summary: Breaks down term sheet provisions, models dilution scenarios, and identifies negotiation leverage points.
triggers:
  - term sheet
  - term sheet analysis
  - valuation negotiation
  - dilution model
  - VC terms
activation_triggers:
  - term sheet
  - term sheet analysis
  - valuation negotiation
  - dilution model
  - VC terms
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Parse all term sheet provisions
  - Model dilution under different scenarios
  - Analyze governance and control terms
  - Identify non-standard or aggressive terms
  - Compare against market benchmarks
  - Prepare negotiation talking points
  - Flag items requiring legal review
outputs:
  - term_sheet_analysis
  - dilution_model
  - negotiation_points
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Analyzes valuation without modeling dilution
  - Skips governance terms focus
  - Confuses pre-money with post-money valuation
handoffs:
  - startup-ops.legal-compliance
  - startup-ops.fundraising-specialist
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
Use this skill when term sheet or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Parse all term sheet provisions**: parse all term sheet provisions with evidence and documentation.
2. **Model dilution under different scenarios**: model dilution under different scenarios with evidence and documentation.
3. **Analyze governance and control terms**: analyze governance and control terms with evidence and documentation.
4. **Identify non-standard or aggressive terms**: identify non-standard or aggressive terms with evidence and documentation.
5. **Compare against market benchmarks**: compare against market benchmarks with evidence and documentation.
6. **Prepare negotiation talking points**: prepare negotiation talking points with evidence and documentation.
7. **Flag items requiring legal review**: flag items requiring legal review with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Analyzes valuation without modeling dilution
- Skips governance terms focus
- Confuses pre-money with post-money valuation

## Examples
### Term Sheet Analysis Example
Input: term sheet for a B2B SaaS startup
Output:
- term_sheet_analysis with evidence-based entries
- dilution_model with prioritized items
- negotiation_points with clear next steps
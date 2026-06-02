---
id: finance.tax-planning
name: Tax Planning
version: 1.0.0
domain: finance
category: finance.tax
purpose: Support tax planning analysis including entity structure, timing strategies, and jurisdiction optimization with disclaimers.
summary: Tax planning analysis covering entity structure, timing, jurisdiction, and provision impact with mandatory disclaimers.
triggers:
  - tax planning analysis
  - tax strategy review
  - entity structure tax impact
  - tax timing strategy
  - jurisdiction tax optimization
aliases:
  - tax planning
  - tax strategy
negative_keywords:
  - tax filing preparation
  - code review
  - marketing campaign
inputs:
  - tax_context
  - entity_structure
  - jurisdiction_data
outputs:
  - tax_planning_analysis
  - strategy_options
  - impact_assessment
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Provides tax advice without disclaimer
  - Omits jurisdiction analysis
  - Confuses tax planning with tax evasion
verification:
  - Disclaimer attached
  - Jurisdiction analysis included
  - Strategy options documented
source_references:
  - ref.github.finance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Support tax planning analysis including entity structure, timing strategies, and jurisdiction optimization with mandatory disclaimers.

## When To Use
- Analyzing tax planning strategies
- Reviewing entity structure tax impact
- Assessing jurisdiction tax optimization

## When Not To Use
- Tax filing preparation requires qualified tax preparer
- Legal tax opinions belong to legal-compliance
- Transfer pricing belongs to specialized tax counsel

## Procedure
1. Gather tax context and entity structure information.
2. Identify applicable jurisdictions and tax regimes.
3. Analyze current tax position and effective rate.
4. Evaluate planning strategies and timing options.
5. Assess impact of each strategy option.
6. Document with disclaimer that output is not tax advice.

## Tool Policy
- Use `filesystem.read` to access tax data and context.

## Verification
- Disclaimer attached to all outputs
- Jurisdiction analysis included
- Strategy options documented with pros and cons

## Failure Modes
- Providing tax advice without disclaimer
- Omitting jurisdiction analysis
- Confusing tax planning with tax evasion

## Example Routes
- "tax planning analysis for restructuring"
- "entity structure tax impact review"
- "jurisdiction tax optimization"

## Source Notes
- Reference: ref.github.finance.2026-05-31

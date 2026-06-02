---
id: finance.cash-flow-analysis
name: Cash Flow Analysis
version: 1.0.0
domain: finance
category: finance.analysis
purpose: Analyze cash flow patterns, identify timing risks, and assess liquidity adequacy across operating, investing, and financing activities.
summary: Structured cash flow analysis covering operating, investing, and financing activities with timing and liquidity assessment.
triggers:
  - cash flow analysis
  - cash flow review
  - liquidity assessment
  - cash flow timing analysis
  - operating cash flow review
aliases:
  - cash flow analysis
  - cash flow review
negative_keywords:
  - tax filing
  - investment recommendation
  - code review
inputs:
  - cash_flow_statements
  - timing_data
  - liquidity_requirements
outputs:
  - cash_flow_analysis
  - timing_assessment
  - liquidity_findings
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Confuses cash flow with profit
  - Omits timing analysis
  - Ignores seasonal patterns
verification:
  - All three cash flow categories analyzed
  - Timing risks identified
  - Liquidity adequacy assessed
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
Analyze cash flow patterns, identify timing risks, and assess liquidity adequacy across operating, investing, and financing activities.

## When To Use
- Analyzing cash flow statements
- Assessing cash flow timing risks
- Evaluating liquidity adequacy

## When Not To Use
- Cash management operations belong to treasury-manager
- Investment decisions belong to investment-analyst
- Tax implications belong to tax-specialist

## Procedure
1. Obtain cash flow statements for the analysis period.
2. Analyze operating cash flow trends and quality.
3. Review investing cash flow for capital allocation patterns.
4. Assess financing cash flow for capital structure changes.
5. Identify timing mismatches and liquidity pressure points.
6. Document findings with recommendations.

## Tool Policy
- Use `filesystem.read` to access cash flow data and timing information.

## Verification
- All three cash flow categories analyzed
- Timing risks identified and quantified
- Liquidity adequacy assessed against requirements

## Failure Modes
- Confusing cash flow with profit
- Omitting timing analysis
- Ignoring seasonal patterns

## Example Routes
- "analyze Q3 cash flow"
- "cash flow timing risk review"
- "liquidity adequacy assessment"

## Source Notes
- Reference: ref.github.finance.2026-05-31

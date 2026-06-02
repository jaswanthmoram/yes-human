---
id: finance.due-diligence
name: Due Diligence
version: 1.0.0
domain: finance
category: finance.valuation
purpose: Conduct financial due diligence including quality of earnings, working capital analysis, and debt-like items identification.
summary: Financial due diligence covering quality of earnings, normalized working capital, debt-like items, and deal risks.
triggers:
  - financial due diligence
  - quality of earnings review
  - due diligence checklist
  - deal risk assessment
  - normalized earnings analysis
aliases:
  - due diligence
  - FDD
negative_keywords:
  - legal due diligence
  - code review
  - IT due diligence
inputs:
  - target_financials
  - diligence_scope
  - deal_context
outputs:
  - diligence_report
  - quality_of_earnings
  - risk_findings
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: expanded
max_context_tokens: 10000
failure_modes:
  - Omits quality of earnings analysis
  - Misses debt-like items
  - Inadequate working capital normalization
verification:
  - Quality of earnings analyzed
  - Debt-like items identified
  - Working capital normalized
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
Conduct financial due diligence including quality of earnings, working capital analysis, and debt-like items identification.

## When To Use
- Financial due diligence for acquisitions
- Quality of earnings analysis
- Deal risk assessment

## When Not To Use
- Legal due diligence belongs to legal-compliance
- IT due diligence belongs to platform domain
- Tax due diligence belongs to tax-specialist

## Procedure
1. Define due diligence scope and materiality thresholds.
2. Analyze quality of earnings and revenue recognition.
3. Identify non-recurring items and normalized EBITDA.
4. Assess working capital normalization.
5. Identify debt-like items and off-balance-sheet obligations.
6. Document findings and deal risk implications.

## Tool Policy
- Use `filesystem.read` to access target financials and deal context.

## Verification
- Quality of earnings analyzed with adjustments
- Debt-like items identified and quantified
- Working capital normalized with target peg

## Failure Modes
- Omitting quality of earnings analysis
- Missing debt-like items
- Inadequate working capital normalization

## Example Routes
- "financial due diligence for acquisition"
- "quality of earnings review"
- "deal risk assessment"

## Source Notes
- Reference: ref.github.finance.2026-05-31

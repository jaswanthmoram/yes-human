---
id: finance.risk-assessment
name: Financial Risk Assessment
version: 1.0.0
domain: finance
category: finance.risk
purpose: Assess financial risks including market, credit, liquidity, and operational risks with structured scoring and mitigation planning.
summary: Structured financial risk assessment with likelihood-impact scoring, categorization, and mitigation recommendations.
triggers:
  - financial risk assessment
  - risk scoring analysis
  - risk mitigation planning
  - risk exposure review
  - risk register maintenance
aliases:
  - risk assessment
  - financial risk review
negative_keywords:
  - cybersecurity risk
  - code review
  - marketing campaign
inputs:
  - risk_data
  - exposure_metrics
  - risk_appetite_statement
outputs:
  - risk_assessment_report
  - risk_register
  - mitigation_recommendations
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Omits risk categorization
  - Skips residual risk assessment
  - Fails to link risks to mitigations
verification:
  - Risks categorized by type
  - Likelihood and impact scored
  - Mitigations linked to risks
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
Assess financial risks including market, credit, liquidity, and operational risks with structured scoring and mitigation planning.

## When To Use
- Assessing financial risk exposure
- Building or updating risk registers
- Planning risk mitigation strategies

## When Not To Use
- Cybersecurity risk belongs to security domain
- Legal risk belongs to legal-compliance
- Operational risk outside finance belongs to platform

## Procedure
1. Gather risk data and exposure metrics.
2. Categorize risks by type (market, credit, liquidity, operational).
3. Score each risk on likelihood and impact.
4. Assess existing controls and residual risk.
5. Recommend mitigation actions for high-priority risks.
6. Update risk register with findings.

## Tool Policy
- Use `filesystem.read` to access risk data and exposure metrics.

## Verification
- Risks categorized by type
- Likelihood and impact scored consistently
- Mitigations linked to specific risks

## Failure Modes
- Omitting risk categorization
- Skipping residual risk assessment
- Failing to link risks to mitigations

## Example Routes
- "financial risk assessment for Q4"
- "risk scoring analysis"
- "risk mitigation planning"

## Source Notes
- Reference: ref.github.finance.2026-05-31

---
id: finance.treasury-operations
name: Treasury Operations
version: 1.0.0
domain: finance
category: finance.treasury
purpose: Support treasury operations including cash management, banking relationships, payment processing, and liquidity optimization.
summary: Treasury operations support covering cash management, banking, payments, and liquidity with proper controls.
triggers:
  - treasury operations review
  - cash management optimization
  - banking relationship assessment
  - payment process review
  - liquidity management plan
aliases:
  - treasury operations
  - treasury ops
negative_keywords:
  - investment recommendation
  - code review
  - marketing campaign
inputs:
  - treasury_data
  - banking_information
  - cash_requirements
outputs:
  - operations_assessment
  - optimization_plan
  - control_recommendations
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Omits segregation of duties
  - Skips banking fee analysis
  - Ignores payment fraud controls
verification:
  - Controls assessed
  - Banking costs analyzed
  - Fraud controls reviewed
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
Support treasury operations including cash management, banking relationships, payment processing, and liquidity optimization.

## When To Use
- Reviewing treasury operations
- Optimizing cash management
- Assessing banking relationships

## When Not To Use
- Investment decisions belong to investment-analyst
- Strategic treasury planning belongs to treasury-manager
- Tax implications belong to tax-specialist

## Procedure
1. Gather treasury data and banking information.
2. Assess current cash management processes.
3. Review banking relationships and fee structures.
4. Evaluate payment processing controls.
5. Identify optimization opportunities.
6. Recommend control improvements.

## Tool Policy
- Use `filesystem.read` to access treasury data and banking information.

## Verification
- Controls assessed for key treasury processes
- Banking costs analyzed and benchmarked
- Fraud controls reviewed and recommended

## Failure Modes
- Omitting segregation of duties review
- Skipping banking fee analysis
- Ignoring payment fraud controls

## Example Routes
- "treasury operations review"
- "cash management optimization"
- "banking relationship assessment"

## Source Notes
- Reference: ref.github.finance.2026-05-31

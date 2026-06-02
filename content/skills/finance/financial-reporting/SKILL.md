---
id: finance.financial-reporting
name: Financial Reporting
version: 1.0.0
domain: finance
category: finance.reporting
purpose: Prepare financial reports including management discussion, board packages, and regulatory filings with proper formatting.
summary: Financial report preparation covering management discussion, board packages, investor reports, and regulatory filings.
triggers:
  - financial report preparation
  - board report creation
  - management discussion draft
  - investor report update
  - regulatory filing support
aliases:
  - financial reporting
  - financial reports
negative_keywords:
  - tax filing
  - code review
  - marketing content
inputs:
  - financial_data
  - reporting_requirements
  - audience_context
outputs:
  - financial_report
  - management_discussion
  - supporting_schedules
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Omits required disclosures
  - Inconsistent data across report sections
  - Missing period comparisons
verification:
  - Required disclosures included
  - Data consistent across sections
  - Period comparisons present
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
Prepare financial reports including management discussion, board packages, and regulatory filings with proper formatting and disclaimers.

## When To Use
- Preparing financial reports
- Creating board reporting packages
- Drafting management discussion and analysis

## When Not To Use
- Tax filings belong to tax-specialist
- Audit reports belong to audit-specialist
- Marketing content belongs to marketing domain

## Procedure
1. Define reporting requirements and audience.
2. Gather financial data and supporting schedules.
3. Prepare financial statements with required disclosures.
4. Draft management discussion and analysis.
5. Ensure data consistency across all report sections.
6. Format for audience and attach disclaimers.

## Tool Policy
- Use `filesystem.read` to access financial data and reporting templates.
- Use `filesystem.write` to save report outputs when requested.

## Verification
- Required disclosures included per applicable standards
- Data consistent across all report sections
- Period comparisons present with commentary

## Failure Modes
- Omitting required disclosures
- Inconsistent data across report sections
- Missing period comparisons

## Example Routes
- "prepare quarterly financial report"
- "board report creation"
- "management discussion draft"

## Source Notes
- Reference: ref.github.finance.2026-05-31

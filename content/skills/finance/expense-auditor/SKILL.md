---
quality_gate: production
id: finance.expense-auditor
name: Expense Policy Audit
version: 1.0.0
domain: finance
category: finance.controls
purpose: Review expenses for policy compliance, duplicate spend, missing evidence, and approval exceptions. Informational only.
summary: Expense auditing checks transactions against policy, approval rules, receipts, vendor patterns, and exception handling without making legal or tax determinations.
triggers:
  - expense audit
  - expense auditor task
  - review expenses
  - policy compliance audit
  - duplicate expense check
activation_triggers:
  - audit these expenses
  - find expense policy issues
prerequisites:
  - Expense policy and approval matrix are available
  - Transaction export includes date, vendor, amount, category, employee, and approver
  - Receipt or evidence status is available
inputs:
  - expense_export
  - expense_policy
  - approval_matrix
  - receipt_status
steps:
  - Normalize expense data and flag missing required fields.
  - Check each transaction against policy limits, categories, approval thresholds, and receipt requirements.
  - Detect duplicate patterns by employee, vendor, amount, date proximity, and receipt identifier.
  - Separate hard violations from review-needed exceptions.
  - Summarize root causes and process fixes.
  - Add disclaimer that outputs are operational controls support, not tax or legal advice.
outputs:
  - expense_audit_report
  - exception_list
  - duplicate_risk_list
  - control_improvement_recommendations
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Policy basis is cited for every violation
  - Exceptions are separated from confirmed issues
  - Disclaimer is included
failure_modes:
  - Treating missing data as confirmed fraud
  - Applying the wrong approval threshold
  - Making tax or legal conclusions
handoffs:
  - finance.audit-specialist
  - legal-compliance.compliance-checker
source_references:
  - ref.github.finance.expense-auditor.2026-06-02
  - https://github.com/actualbudget/actual
allowed_agents:
  - finance.expense-auditor
status: active
budget_band: standard
rollback:
  - Revert audit report artifact
validators:
  - skill.validator
  - disclaimer_present
---

## Procedure
1. Confirm policy version, approval matrix, audit period, and materiality threshold.
2. Normalize transactions and identify missing fields.
3. Test each transaction against category limits, receipt rules, and approval thresholds.
4. Run duplicate checks using amount, date, vendor, employee, and receipt metadata.
5. Classify results as violation, exception needing review, or clean.
6. Produce a report with remediation and control improvements.

## Verification
- Findings reference policy criteria.
- Fraud, tax, and legal conclusions are avoided.
- Human finance review is required before action.

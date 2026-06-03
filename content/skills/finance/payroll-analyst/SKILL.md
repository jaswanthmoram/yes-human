---
id: finance.payroll-analyst
name: Payroll Reconciliation Analysis
version: 1.0.0
domain: finance
category: finance.payroll
purpose: Reconcile payroll records, headcount changes, deductions, taxes, and variance drivers. Informational only.
summary: Payroll analysis compares payroll runs against HR rosters, compensation changes, benefits, deductions, and expected cash impact.
triggers:
  - payroll analysis
  - payroll analyst task
  - payroll reconciliation
  - payroll variance analysis
  - headcount payroll review
activation_triggers:
  - reconcile payroll
  - explain payroll variance
prerequisites:
  - Payroll register and prior-period payroll are available
  - HR roster and compensation changes are available
  - Review period and entity scope are defined
inputs:
  - payroll_register
  - hr_roster
  - compensation_changes
  - prior_period_payroll
steps:
  - Reconcile employee count, start dates, terminations, salary changes, and variable pay.
  - Compare gross pay, deductions, employer taxes, benefits, and net cash movement to prior period.
  - Flag anomalies by employee, department, pay type, or entity.
  - Separate expected variance from unresolved variance.
  - Document questions for payroll provider, HR, or finance controller.
  - Add disclaimer that payroll outputs require human payroll or finance review.
outputs:
  - payroll_reconciliation
  - variance_explanation
  - anomaly_list
  - review_questions
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Headcount and compensation changes reconcile to HR records
  - Variances are labeled expected or unresolved
  - Disclaimer and review gate are included
failure_modes:
  - Missing terminated or newly hired employees
  - Treating tax withholding as advice
  - Combining different entities or pay periods
handoffs:
  - finance.audit-specialist
  - hr.hr-operations
source_references:
  - ref.github.finance.payroll-analyst.2026-06-02
  - https://github.com/actualbudget/actual
allowed_agents:
  - finance.payroll-analyst
status: active
budget_band: standard
rollback:
  - Revert payroll analysis artifact
validators:
  - skill.validator
  - disclaimer_present
---

## Procedure
1. Confirm entity, period, payroll system, and roster source.
2. Reconcile employees and compensation changes to the HR roster.
3. Compare gross pay, deductions, taxes, benefits, and net pay to the prior period.
4. Identify expected and unexplained variances.
5. Prepare review questions for HR, payroll provider, and finance.

## Verification
- No payroll action is recommended without human review.
- Tax and employment-law claims are avoided.
- Every unresolved variance has a next owner.

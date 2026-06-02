---
id: finance.payroll-analyst
name: payroll-analyst
version: 1.0.0
domain: finance
category: finance.payroll-analyst
purpose: Supports payroll reconciliation. Informational only.
summary: Supports payroll reconciliation. Informational only.
triggers:
  - payroll analysis
  - payroll analyst task
prerequisites:
  - task_context
steps:
  - Execute procedure
outputs:
  - skill_output
budget_band: standard
rollback:
  - revert
validators:
  - outputs_complete
source_references:
  - ref.github.finance.payroll-analyst.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

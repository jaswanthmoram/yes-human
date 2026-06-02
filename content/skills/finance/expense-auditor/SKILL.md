---
id: finance.expense-auditor
name: expense-auditor
version: 1.0.0
domain: finance
category: finance.expense-auditor
purpose: Audits expenses for policy compliance. Informational only.
summary: Audits expenses for policy compliance. Informational only.
triggers:
  - expense audit
  - expense auditor task
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
  - ref.github.finance.expense-auditor.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

---
id: product-business.sales-operator
name: sales-operator
version: 1.0.0
domain: product-business
category: product-business.sales-operator
purpose: Runs sales operations and CRM hygiene.
summary: Runs sales operations and CRM hygiene.
triggers:
  - sales operations
  - sales ops
  - sales operator task
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
  - ref.github.product-business.sales-operator.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

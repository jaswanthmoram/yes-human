---
id: sales.account-manager
name: account-manager
version: 1.0.0
domain: sales
category: sales.account-manager
purpose: Manages strategic accounts and renewals.
summary: Manages strategic accounts and renewals.
triggers:
  - account management
  - account manager task
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
  - ref.github.sales.account-manager.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

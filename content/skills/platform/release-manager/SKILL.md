---
id: platform.release-manager
name: release-manager
version: 1.0.0
domain: platform
category: platform.release-manager
purpose: Owns release planning and rollbacks.
summary: Owns release planning and rollbacks.
triggers:
  - release management
  - release plan
  - release manager task
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
  - ref.github.platform.release-manager.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

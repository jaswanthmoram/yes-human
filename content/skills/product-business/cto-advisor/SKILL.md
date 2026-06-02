---
id: product-business.cto-advisor
name: cto-advisor
version: 1.0.0
domain: product-business
category: product-business.cto-advisor
purpose: Advises CTOs on technical strategy.
summary: Advises CTOs on technical strategy.
triggers:
  - cto advisor
  - technical strategy advice
  - cto advisor task
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
  - ref.github.product-business.cto-advisor.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

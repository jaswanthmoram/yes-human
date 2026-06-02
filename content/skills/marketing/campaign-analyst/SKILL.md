---
id: marketing.campaign-analyst
name: campaign-analyst
version: 1.0.0
domain: marketing
category: marketing.campaign-analyst
purpose: Analyzes campaign performance and attribution.
summary: Analyzes campaign performance and attribution.
triggers:
  - campaign analysis
  - campaign analyst task
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
  - ref.github.marketing.campaign-analyst.2026-06-02
status: active
---

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

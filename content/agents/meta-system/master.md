---
id: meta-system.master
name: Meta-System Master
version: 2.0.0
status: active
category: meta-system
kind: master
summary: Orchestrates router compiles, dossier reviews, quality gates, and system-wide configurations.
triggers:
  - supreme-router
  - system route
  - system compile
inputs:
  - system_request
outputs:
  - routing_decision
allowed_tools:
  - filesystem.read
budget_band: micro
max_context_tokens: 4000
failure_modes:
  - cannot compile without files
verification:
  - self_check
source_references:
  - ref.github.ecc.2026-05-29
quality_gate: production
---

## Mission
To coordinate system bootstrapping, manage the registry compilation lifecycle, and run route validations.

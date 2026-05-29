---
id: engineering.build-resolver
name: Build Error Resolver
version: 1.0.0
status: active
category: engineering.language-review
kind: specialist
summary: Resolves build and compilation errors.
triggers:
  - fix build
  - build error
inputs:
  - build_log
outputs:
  - fix_suggestions
allowed_tools:
  - shell.readonly
budget_band: standard
max_context_tokens: 1200
failure_modes:
  - cannot resolve complex library dependency mismatches
verification:
  - compiler_check
source_references:
  - ref.github.ecc.2026-05-29
quality_gate: staging
---

## Mission
To analyze build logs and type system diagnostics and resolve compile errors.

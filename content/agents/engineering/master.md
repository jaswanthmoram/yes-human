---
id: engineering.master
name: Engineering Master
version: 1.0.0
status: active
category: engineering
kind: master
summary: Orchestrates all software engineering subtasks and delegates to language or review specialists.
triggers:
  - engineering task
  - software development
inputs:
  - prompt
outputs:
  - resolution
allowed_tools:
  - filesystem.read
  - filesystem.write
budget_band: standard
max_context_tokens: 16000
failure_modes:
  - cannot route specialized domain tasks outside engineering
verification:
  - compiler_check
source_references:
  - ref.github.ecc.2026-05-29
quality_gate: staging
---

## Mission
To coordinate engineering requests, perform structural code analysis, and delegate specialist tasks.

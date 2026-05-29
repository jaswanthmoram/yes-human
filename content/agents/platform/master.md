---
id: platform.master
name: Platform Master
version: 1.0.0
status: active
category: platform
kind: master
summary: Orchestrates DevOps operations, CI/CD pipeline management, and monitoring/logging configurations.
triggers:
  - devops deploy
  - ci configuration
  - incident response
inputs:
  - deployment_manifests
outputs:
  - deployment_status
allowed_tools:
  - filesystem.read
  - filesystem.write
budget_band: standard
max_context_tokens: 16000
failure_modes:
  - cannot write cloud infrastructure without human approval
verification:
  - deployment_check
source_references:
  - ref.github.claude-repos-pack.2026-05-29
quality_gate: staging
---

## Mission
To configure runtime environments, generate CI/CD workflow templates, and diagnose system/platform logs.

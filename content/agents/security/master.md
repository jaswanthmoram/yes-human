---
id: security.master
name: Security Master
version: 1.0.0
status: active
category: security
kind: master
summary: Orchestrates all security audits, vulnerability scanning, and threat modeling.
triggers:
  - security review
  - penetration test
  - vulnerability scan
inputs:
  - source_code
outputs:
  - security_report
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 16000
failure_modes:
  - cannot patch binaries directly
verification:
  - security_scanner
source_references:
  - ref.github.claude-bughunter.2026-05-29
quality_gate: staging
---

## Mission
To audit source code repositories, identify architectural risks, and run static vulnerability analyses.

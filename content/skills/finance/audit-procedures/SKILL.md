---
id: finance.audit-procedures
name: Audit Procedures
version: 1.0.0
domain: finance
category: finance.audit
purpose: Design and execute audit procedures including sampling, testing, and documentation following professional standards.
summary: Audit procedure design and execution with sampling methodology, testing protocols, and workpaper documentation.
triggers:
  - audit procedure design
  - audit testing execution
  - audit sampling plan
  - audit workpaper preparation
  - substantive testing plan
aliases:
  - audit procedures
  - audit testing
negative_keywords:
  - security audit
  - code review
  - IT audit
inputs:
  - audit_objectives
  - population_data
  - materiality_thresholds
outputs:
  - audit_procedures
  - sampling_plan
  - testing_documentation
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Omits sampling methodology
  - Skips materiality assessment
  - Inadequate documentation
verification:
  - Sampling methodology documented
  - Materiality assessed
  - Workpapers complete
source_references:
  - ref.github.finance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design and execute audit procedures including sampling, testing, and documentation following professional standards.

## When To Use
- Designing audit procedures
- Planning audit sampling
- Executing substantive testing

## When Not To Use
- Security audits belong to security domain
- IT audits belong to platform domain
- Legal compliance audits belong to legal-compliance

## Procedure
1. Define audit objectives and scope.
2. Assess materiality and risk levels.
3. Design sampling methodology and sample sizes.
4. Execute testing procedures per plan.
5. Document findings in workpapers.
6. Evaluate results against audit objectives.

## Tool Policy
- Use `filesystem.read` to access audit data and documentation.

## Verification
- Sampling methodology documented and justified
- Materiality assessed and applied
- Workpapers complete with evidence references

## Failure Modes
- Omitting sampling methodology
- Skipping materiality assessment
- Inadequate documentation of procedures

## Example Routes
- "design audit procedures for revenue"
- "audit sampling plan for accounts receivable"
- "substantive testing plan"

## Source Notes
- Reference: ref.github.finance.2026-05-31

---
id: hr.hr-compliance
name: HR Compliance
version: 1.0.0
domain: hr
category: hr.compliance
purpose: Design HR compliance frameworks, audit processes, and regulatory readiness plans with employment-law caution.
summary: Compliance framework design, audit process creation, regulatory tracking, and documentation requirements.
triggers:
  - design hr compliance framework
  - create compliance audit process
  - build regulatory tracking system
  - compliance documentation review
  - employment law readiness plan
aliases:
  - hr compliance
  - compliance framework
  - regulatory compliance
negative_keywords:
  - performance review
  - compensation analysis
  - employee handbook
inputs:
  - regulatory_context
  - policy_inventory
  - compliance_gaps
outputs:
  - compliance_framework
  - audit_process
  - readiness_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs framework without jurisdiction awareness
  - Implies legal advice
  - Omits documentation requirements
verification:
  - Jurisdiction caution attached
  - Documentation requirements defined
  - Human review marker present
source_references:
  - ref.github.hr.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design HR compliance frameworks, audit processes, and regulatory readiness plans with employment-law caution.

## When To Use
- Designing HR compliance frameworks
- Creating compliance audit processes
- Building regulatory readiness plans

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Identify regulatory context and jurisdiction requirements.
2. Inventory existing policies and identify compliance gaps.
3. Design compliance framework with documentation requirements.
4. Create audit process with review cadence.
5. Build regulatory readiness plan with human review markers.

## Tool Policy
- Use `filesystem.read` to access regulatory references and existing policies.
- Use `filesystem.write` to save compliance frameworks and audit processes.

## Verification
- Jurisdiction caution attached to framework
- Documentation requirements defined
- Human review marker present on outputs

## Failure Modes
- Designing framework without jurisdiction awareness
- Implying legal advice
- Omitting documentation requirements

## Example Routes
- "design HR compliance framework"
- "create compliance audit process"
- "build regulatory readiness plan"

## Source Notes
- SHRM compliance resources, EEOC and DOL public guidance, NLRB resources
- Reference: ref.github.hr.2026-05-31

---
id: hr.employee-handbooks
name: Employee Handbooks
version: 1.0.0
domain: hr
category: hr.compliance
purpose: Design employee handbook structures, section templates, and update processes for clear policy communication.
summary: Handbook structure design, section template creation, update process planning, and accessibility review.
triggers:
  - design employee handbook
  - create handbook section
  - update handbook template
  - handbook structure plan
  - handbook accessibility review
aliases:
  - employee handbook
  - handbook design
  - policy handbook
negative_keywords:
  - performance review
  - compensation analysis
  - job description
inputs:
  - organizational_context
  - policy_inventory
  - communication_goals
outputs:
  - handbook_structure
  - section_templates
  - update_process
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Designs handbook without legal review markers
  - Omits accessibility considerations
  - Ignores update cadence and versioning
verification:
  - Legal review markers present
  - Accessibility addressed
  - Update process defined
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
Design employee handbook structures, section templates, and update processes for clear policy communication.

## When To Use
- Designing employee handbook structures
- Creating handbook section templates
- Planning handbook update processes

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Compensation analysis belongs to compensation-analysis skill
- Job descriptions belong to job-description-writing skill

## Procedure
1. Gather organizational context and policy inventory.
2. Design handbook structure with logical section ordering.
3. Create section templates with consistent formatting.
4. Include legal review markers for each section.
5. Define update cadence and versioning process.

## Tool Policy
- Use `filesystem.read` to access existing handbooks and policy documents.
- Use `filesystem.write` to save handbook structures and templates.

## Verification
- Legal review markers present in each section
- Accessibility considerations addressed
- Update process defined with versioning

## Failure Modes
- Designing handbook without legal review markers
- Omitting accessibility considerations
- Ignoring update cadence and versioning

## Example Routes
- "design employee handbook structure"
- "create handbook section for remote work"
- "plan handbook update process"

## Source Notes
- SHRM handbook guidelines, open employee handbooks (clef/handbook, OsioLabs/emphandbook)
- Reference: ref.github.hr.2026-05-31

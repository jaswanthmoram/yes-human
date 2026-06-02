---
id: healthcare.cpt-codes
name: CPT Coding Standards
version: 1.0.0
domain: healthcare
category: healthcare.coding
purpose: Apply CPT coding standards for procedure and service classification in outpatient and physician settings.
summary: CPT coding standards covering evaluation and management, surgical, radiology, pathology, and medicine code sections.
triggers:
  - cpt coding review
  - procedure code assignment
  - cpt modifier usage
  - e/m coding review
  - surgical coding
aliases:
  - cpt coding
  - cpt codes
negative_keywords:
  - icd procedure coding
  - software development
  - product pricing
inputs:
  - procedure_documentation
  - coding_scenario
  - payer_guidelines
outputs:
  - cpt_code_assignment
  - modifier_justification
  - documentation_requirements
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Selects incorrect E/M level
  - Misapplies surgical package rules
  - Omits required modifiers
verification:
  - E/M level matches documentation
  - Surgical package rules applied
  - Modifiers correctly applied with justification
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert CPT assignments if documentation does not support selection
validators:
  - skill.validator
---

## Mission
Apply CPT coding standards for accurate procedure and service classification in outpatient and physician settings.

## When To Use
- When assigning CPT codes for procedures and services
- When reviewing E/M code level selection
- When applying CPT modifiers
- When auditing surgical coding

## When Not To Use
- For inpatient procedure coding (use icd-10 skill for ICD-10-PCS)
- For diagnosis coding (use icd-10 skill)
- For HCPCS Level II codes (use medical-coding skill)

## Procedure
1. **Review Procedure Documentation**:
   - Identify procedure performed and approach used
   - Verify anatomical site and laterality
   - Check for multiple or bilateral procedures

2. **Select CPT Codes**:
   - Navigate to correct code section (E/M, Surgery, Radiology, etc.)
   - Select most specific code that describes the service
   - Apply bundling and unbundling rules per NCCI

3. **Apply Modifiers**:
   - Determine if modifiers are needed (25, 59, RT/LT, etc.)
   - Validate modifier usage against NCCI edits
   - Document modifier justification

4. **Validate E/M Level**:
   - Apply current E/M guidelines (MDM or time-based)
   - Verify documentation supports level selected
   - Check for split/shared visit rules

5. **Cross-Reference Payer Policies**:
   - Check payer-specific coding policies
   - Validate medical necessity requirements
   - Review prior authorization requirements

## Tool Policy
- Use `filesystem.read` to review procedure documentation and coding references

## Verification
- E/M level matches documentation complexity or time
- Surgical package rules correctly applied
- All modifiers justified and documented

## Failure Modes
- Selecting incorrect E/M level not supported by documentation
- Misapplying global surgical package rules
- Omitting required modifiers leading to denials

## Example Routes
- E/M code selection for office visit with procedure
- Surgical coding for laparoscopic cholecystectomy
- Modifier 25 application for E/M with minor procedure

## Source Notes
- AMA CPT: https://www.ama-assn.org/practice-management/cpt
- CMS NCCI Edits: https://www.cms.gov/medicare/national-correct-coding-initiative
- Reference: ref.github.healthcare.2026-05-31

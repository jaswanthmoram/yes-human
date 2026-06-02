---
id: healthcare.icd-10
name: ICD-10 Coding Standards
version: 1.0.0
domain: healthcare
category: healthcare.coding
purpose: Apply ICD-10-CM and ICD-10-PCS coding standards for diagnosis and procedure classification.
summary: ICD-10 coding standards covering diagnosis codes (CM), procedure codes (PCS), conventions, and official guidelines.
triggers:
  - icd-10 coding
  - diagnosis code assignment
  - icd-10-cm review
  - icd-10-pcs coding
  - icd-10 guideline application
aliases:
  - icd-10
  - icd coding
negative_keywords:
  - icd-9 migration
  - software versioning
  - product classification
inputs:
  - clinical_documentation
  - coding_scenario
  - guideline_version
outputs:
  - code_assignment
  - guideline_application
  - documentation_gaps
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Uses outdated ICD-10 code set
  - Misses combination codes
  - Ignores laterality requirements
verification:
  - Current fiscal year code set used
  - Combination codes applied where required
  - Laterality and specificity documented
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous code set if errors found
validators:
  - skill.validator
---

## Mission
Apply ICD-10-CM and ICD-10-PCS coding standards for accurate diagnosis and procedure classification.

## When To Use
- When assigning ICD-10-CM diagnosis codes
- When coding inpatient procedures with ICD-10-PCS
- When reviewing coding accuracy and specificity
- When applying official coding guidelines

## When Not To Use
- For CPT procedure coding (use cpt-codes skill)
- For HCPCS Level II coding (use medical-coding skill)
- For clinical diagnosis (use clinical-decision-support)

## Procedure
1. **Review Documentation for Specificity**:
   - Identify diagnosis to the highest level of specificity
   - Check for laterality, episode of care, and sequela
   - Verify combination codes where applicable

2. **Apply ICD-10-CM Conventions**:
   - Follow excludes1 and excludes2 notes
   - Apply code first and use additional code instructions
   - Follow etiology/manifestation conventions

3. **Apply Official Guidelines**:
   - Apply chapter-specific guidelines
   - Follow general coding conventions
   - Apply sequencing rules for principal diagnosis

4. **Code ICD-10-PCS Procedures** (inpatient):
   - Identify root operation, body part, approach, device, qualifier
   - Apply PCS conventions for multiple procedures
   - Validate against operative report documentation

5. **Validate and Document**:
   - Cross-check codes against documentation
   - Identify documentation improvement opportunities
   - Flag any coding queries for provider clarification

## Tool Policy
- Use `filesystem.read` to review clinical documentation and coding references

## Verification
- Current fiscal year ICD-10 code set applied
- Combination codes used where required
- Laterality and maximum specificity achieved

## Failure Modes
- Using outdated ICD-10 code sets
- Missing combination codes that capture full clinical picture
- Ignoring laterality requirements

## Example Routes
- ICD-10-CM coding for diabetes with complications
- ICD-10-PCS coding for cardiac catheterization
- Guideline application for COVID-19 diagnosis coding

## Source Notes
- CMS ICD-10-CM Guidelines: https://www.cms.gov/medicare/coding/icd10
- AHA Coding Clinic
- Reference: ref.github.healthcare.2026-05-31

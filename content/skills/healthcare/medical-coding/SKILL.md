---
id: healthcare.medical-coding
name: Medical Coding Review
version: 1.0.0
domain: healthcare
category: healthcare.coding
purpose: Review and validate medical coding assignments for accuracy, compliance, and revenue integrity.
summary: Medical coding review covering ICD-10-CM/PCS, CPT, HCPCS Level II, and modifier usage for inpatient and outpatient settings.
triggers:
  - medical coding review
  - coding accuracy audit
  - claim denial analysis
  - coding compliance check
  - revenue integrity review
aliases:
  - medical coding
  - coding review
negative_keywords:
  - software coding
  - programming
  - web development
inputs:
  - clinical_documentation
  - code_assignments
  - payer_requirements
outputs:
  - coding_validation
  - compliance_findings
  - revenue_impact
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Assigns codes without complete documentation review
  - Misses coding guideline updates
  - Ignores payer-specific requirements
verification:
  - Documentation supports all assigned codes
  - Current coding guidelines applied
  - Payer-specific rules addressed
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert code assignments if documentation does not support them
validators:
  - skill.validator
---

## Mission
Review and validate medical coding assignments for accuracy, compliance, and revenue integrity.

## When To Use
- When reviewing medical code assignments for accuracy
- When analyzing claim denials for coding issues
- When auditing coding compliance
- When training on coding guidelines

## When Not To Use
- For software development coding (use engineering agents)
- For clinical diagnosis (use clinical-decision-support)
- For billing disputes (use finance agents)

## Procedure
1. **Review Clinical Documentation**:
   - Verify documentation completeness and specificity
   - Identify missing documentation elements
   - Query providers for clarification when needed

2. **Validate Code Assignments**:
   - Check ICD-10-CM/PCS code accuracy and specificity
   - Validate CPT code selection and modifier usage
   - Verify HCPCS Level II codes for supplies and services

3. **Apply Coding Guidelines**:
   - Apply current year ICD-10-CM Official Guidelines
   - Follow CPT Assistant guidance for complex scenarios
   - Apply NCCI edits and bundling rules

4. **Check Payer Requirements**:
   - Review payer-specific coding policies
   - Validate medical necessity requirements
   - Check prior authorization coding

5. **Assess Revenue Impact**:
   - Calculate revenue impact of coding changes
   - Identify undercoding and overcoding risks
   - Recommend documentation improvement opportunities

## Tool Policy
- Use `filesystem.read` to review clinical documentation and code assignments
- Use `filesystem.write` to produce coding validation reports

## Verification
- All codes supported by clinical documentation
- Current coding guidelines and updates applied
- Payer-specific requirements addressed

## Failure Modes
- Assigning codes without complete documentation review
- Missing annual coding guideline updates
- Ignoring payer-specific coding requirements

## Example Routes
- ICD-10-CM code validation for inpatient DRG assignment
- CPT modifier review for surgical procedures
- Claim denial root cause analysis for coding errors

## Source Notes
- CMS ICD-10: https://www.cms.gov/medicare/coding/icd10
- AMA CPT: https://www.ama-assn.org/practice-management/cpt
- Reference: ref.github.healthcare.2026-05-31

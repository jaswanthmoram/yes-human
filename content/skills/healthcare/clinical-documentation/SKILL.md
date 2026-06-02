---
id: healthcare.clinical-documentation
name: Clinical Documentation Improvement
version: 1.0.0
domain: healthcare
category: healthcare.documentation
purpose: Review and improve clinical documentation for accuracy, completeness, and compliance with coding and regulatory requirements.
summary: Clinical documentation improvement covering CDI queries, documentation specificity, and regulatory compliance.
triggers:
  - clinical documentation review
  - cdi query generation
  - documentation improvement
  - clinical note audit
  - documentation specificity check
aliases:
  - cdi
  - clinical documentation
negative_keywords:
  - technical writing
  - marketing copy
  - software documentation
inputs:
  - clinical_notes
  - coding_requirements
  - regulatory_standards
outputs:
  - documentation_assessment
  - cdi_queries
  - improvement_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Generates queries that lead to inaccurate documentation
  - Misses regulatory documentation requirements
  - Ignores clinical significance of conditions
verification:
  - Queries are non-leading and compliant
  - Regulatory documentation requirements met
  - Clinical significance captured
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert CDI queries if found to be non-compliant
validators:
  - skill.validator
---

## Mission
Review and improve clinical documentation for accuracy, completeness, and compliance with coding and regulatory requirements.

## When To Use
- When reviewing clinical notes for documentation quality
- When generating CDI queries for provider clarification
- When auditing documentation for regulatory compliance
- When training providers on documentation improvement

## When Not To Use
- For technical writing or software documentation (use engineering agents)
- For marketing content (use marketing agents)
- For clinical diagnosis (use clinical-decision-support)

## Procedure
1. **Review Clinical Documentation**:
   - Assess completeness of history, assessment, and plan
   - Identify documentation gaps affecting code assignment
   - Check for conflicting or ambiguous documentation

2. **Generate CDI Queries**:
   - Write compliant, non-leading queries for clarification
   - Provide clinical indicators supporting the query
   - Follow AHIMA/ACDIS query guidelines

3. **Assess Regulatory Compliance**:
   - Verify documentation meets CMS conditions of participation
   - Check for required elements (attending physician, discharge summary)
   - Validate authentication and timeliness

4. **Recommend Improvements**:
   - Suggest documentation templates and smart phrases
   - Recommend provider education topics
   - Identify opportunities for clinical validation

5. **Measure Impact**:
   - Track query response rates and agreement rates
   - Monitor case mix index and severity of illness trends
   - Report documentation quality metrics

## Tool Policy
- Use `filesystem.read` to review clinical notes and documentation standards
- Use `filesystem.write` to produce CDI queries and improvement reports

## Verification
- All queries are non-leading and compliant with AHIMA guidelines
- Regulatory documentation requirements met
- Clinical significance of conditions captured

## Failure Modes
- Generating leading queries that bias provider responses
- Missing regulatory documentation requirements
- Ignoring clinical significance of comorbidities and complications

## Example Routes
- CDI query for heart failure specificity and acuity
- Documentation review for sepsis clinical validation
- Discharge summary completeness audit

## Source Notes
- AHIMA CDI Practice Brief
- ACDIS CDI Tips and Guidelines
- Reference: ref.github.healthcare.2026-05-31

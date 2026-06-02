---
id: healthcare.fda-regulations
name: FDA Regulatory Compliance
version: 1.0.0
domain: healthcare
category: healthcare.regulatory
purpose: Review and navigate FDA regulatory requirements for medical devices, drugs, biologics, and digital health products.
summary: FDA regulatory compliance covering device classification, 510(k), PMA, drug approval, SaMD, and digital health regulations.
triggers:
  - fda regulatory review
  - device classification
  - 510k submission planning
  - pma application
  - digital health fda
  - fda compliance check
aliases:
  - fda regulations
  - fda compliance
negative_keywords:
  - epa regulations
  - consumer product safety
  - general legal compliance
inputs:
  - product_description
  - regulatory_pathway
  - clinical_evidence
outputs:
  - regulatory_strategy
  - submission_plan
  - compliance_assessment
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Misidentifies regulatory classification
  - Skips predicate device analysis for 510(k)
  - Ignores post-market requirements
verification:
  - Regulatory classification correctly identified
  - Predicate analysis complete for 510(k) pathways
  - Post-market requirements addressed
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Halt submission activities if classification errors found
validators:
  - skill.validator
---

## Mission
Review and navigate FDA regulatory requirements for medical devices, drugs, biologics, and digital health products.

## When To Use
- When determining FDA regulatory classification
- When planning 510(k), PMA, or De Novo submissions
- When reviewing digital health and SaMD regulations
- When assessing post-market compliance

## When Not To Use
- For EPA or environmental regulations (different agency)
- For consumer product safety (CPSC jurisdiction)
- For general legal compliance (use legal-compliance agents)

## Procedure
1. **Determine Product Classification**:
   - Identify product type (device, drug, biologic, combination)
   - Determine device class (I, II, III) if applicable
   - Identify applicable product code and regulation number

2. **Select Regulatory Pathway**:
   - Evaluate 510(k), De Novo, PMA, or HDE pathways
   - Identify predicate devices for substantial equivalence
   - Assess digital health and SaMD specific guidance

3. **Plan Submission**:
   - Define required testing (bench, animal, clinical)
   - Compile submission content per FDA guidance
   - Plan pre-submission meetings with FDA

4. **Address Quality System Requirements**:
   - Apply 21 CFR Part 820 (QSR) for devices
   - Implement design controls per FDA requirements
   - Address IEC 62304 for software devices

5. **Plan Post-Market Compliance**:
   - Design post-market surveillance plan
   - Configure MDR reporting procedures
   - Plan UDI implementation and labeling

## Tool Policy
- Use `filesystem.read` to review FDA guidance and product documentation
- Use `filesystem.write` to produce regulatory strategies and submission plans

## Verification
- Regulatory classification correctly identified with product code
- Predicate analysis complete for 510(k) pathways
- Post-market requirements addressed

## Failure Modes
- Misidentifying regulatory classification leading to wrong pathway
- Skipping predicate device analysis for 510(k) submissions
- Ignoring post-market surveillance and MDR requirements

## Example Routes
- 510(k) submission planning for Class II medical device
- SaMD regulatory pathway for AI diagnostic tool
- De Novo classification for novel digital health device

## Source Notes
- FDA: https://www.fda.gov/
- 21 CFR Part 820 Quality System Regulation
- FDA Digital Health: https://www.fda.gov/medical-devices/digital-health-center-excellence
- Reference: ref.github.healthcare.2026-05-31

---
id: healthcare.healthcare-interoperability
name: Healthcare Interoperability
version: 1.0.0
domain: healthcare
category: healthcare.interoperability
purpose: Design and evaluate healthcare interoperability solutions spanning FHIR, HL7 v2, X12, DICOM, and IHE profiles.
summary: Healthcare interoperability covering data exchange standards, interface design, interoperability testing, and information blocking compliance.
triggers:
  - healthcare interoperability design
  - data exchange architecture
  - interface design healthcare
  - interoperability testing
  - information blocking review
aliases:
  - interoperability
  - health data exchange
negative_keywords:
  - general system integration
  - non-healthcare apis
  - web services
inputs:
  - exchange_requirements
  - system_landscape
  - compliance_constraints
outputs:
  - interoperability_design
  - interface_specifications
  - testing_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Ignores information blocking regulations
  - Uses incompatible standard versions
  - Skips semantic interoperability validation
verification:
  - Information blocking compliance addressed
  - Standard versions compatible across systems
  - Semantic interoperability validated
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert interface changes if data exchange errors occur
validators:
  - skill.validator
---

## Mission
Design and evaluate healthcare interoperability solutions spanning FHIR, HL7 v2, X12, DICOM, and IHE profiles.

## When To Use
- When designing healthcare data exchange architecture
- When selecting interoperability standards for a use case
- When testing healthcare interfaces
- When reviewing information blocking compliance

## When Not To Use
- For general system integration without healthcare data (use engineering)
- For non-healthcare API design (use engineering agents)
- For web services without clinical data (use engineering agents)

## Procedure
1. **Assess Exchange Requirements**:
   - Identify data types (clinical, claims, imaging, lab)
   - Map stakeholders and their system capabilities
   - Define exchange patterns (push, pull, query, subscribe)

2. **Select Standards**:
   - Choose appropriate standards (FHIR, HL7 v2, X12, DICOM)
   - Verify version compatibility across systems
   - Apply IHE profiles for common use cases

3. **Design Interfaces**:
   - Create interface specifications and message maps
   - Design transformation and routing logic
   - Configure error handling and monitoring

4. **Address Compliance**:
   - Review information blocking regulations (21st Century Cures Act)
   - Ensure API access requirements are met
   - Address TEFCA and QHIN requirements if applicable

5. **Test and Validate**:
   - Design interoperability test cases
   - Validate semantic interoperability (terminology mapping)
   - Perform end-to-end integration testing

## Tool Policy
- Use `filesystem.read` to review interoperability specs and system documentation
- Use `filesystem.write` to produce interface designs and testing strategies

## Verification
- Information blocking compliance addressed per 21st Century Cures Act
- Standard versions compatible across all participating systems
- Semantic interoperability validated with terminology mapping

## Failure Modes
- Ignoring information blocking regulations in interface design
- Using incompatible standard versions between systems
- Skipping semantic interoperability validation

## Example Routes
- FHIR + HL7 v2 hybrid exchange for hospital-ambulatory integration
- X12 270/271 eligibility verification interface
- DICOM image exchange across health system

## Source Notes
- ONC Interoperability: https://www.healthit.gov/topic/interoperability
- IHE Profiles: https://www.ihe.net/
- 21st Century Cures Act Information Blocking
- Reference: ref.github.healthcare.2026-05-31

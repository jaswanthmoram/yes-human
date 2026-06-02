---
id: healthcare.ehr-systems
name: EHR Systems Integration
version: 1.0.0
domain: healthcare
category: healthcare.systems
purpose: Design and review EHR system integrations, data models, and clinical workflow configurations.
summary: EHR systems integration covering Epic, Cerner, Allscripts platforms, clinical data models, and workflow optimization.
triggers:
  - ehr system integration
  - ehr workflow design
  - clinical data model review
  - ehr platform configuration
  - epic integration
  - cerner integration
aliases:
  - ehr systems
  - ehr integration
negative_keywords:
  - general software engineering
  - web development
  - marketing automation
inputs:
  - ehr_platform_spec
  - workflow_requirements
  - integration_constraints
outputs:
  - integration_design
  - workflow_configuration
  - data_mapping
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Designs integration without considering HL7 FHIR standards
  - Ignores HIPAA security requirements
  - Skips clinical workflow validation
verification:
  - HL7 FHIR standards applied
  - HIPAA security requirements addressed
  - Clinical workflow validated with stakeholders
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert EHR configuration changes if clinical workflows are disrupted
validators:
  - skill.validator
---

## Mission
Design and review EHR system integrations, data models, and clinical workflow configurations across major EHR platforms.

## When To Use
- When integrating clinical systems with EHR platforms
- When designing clinical workflows within EHR systems
- When reviewing EHR data models and mappings
- When configuring Epic, Cerner, or Allscripts environments

## When Not To Use
- For general software engineering tasks (use engineering agents)
- For patient-facing application development (use telehealth-specialist)
- For billing system integration (use medical-coder)

## Procedure
1. **Assess Current EHR Environment**:
   - Identify EHR platform version and configuration
   - Map existing integrations and interfaces
   - Document current clinical workflows

2. **Design Integration Architecture**:
   - Define data exchange patterns (HL7 v2, FHIR, CDA)
   - Map clinical data elements to EHR data model
   - Design error handling and retry mechanisms

3. **Configure Clinical Workflows**:
   - Map clinical processes to EHR workflow engine
   - Configure order sets, smart phrases, and templates
   - Design clinical decision support rules

4. **Validate Security and Compliance**:
   - Apply HIPAA Security Rule to all integrations
   - Configure audit logging and access controls
   - Validate data encryption in transit and at rest

5. **Test and Deploy**:
   - Create test scenarios covering clinical edge cases
   - Validate with clinical end users
   - Plan rollback procedures for production deployment

## Tool Policy
- Use `filesystem.read` to review EHR configuration and integration specs
- Use `filesystem.write` to produce integration designs and data mappings

## Verification
- All integrations follow HL7 FHIR or appropriate messaging standards
- HIPAA security requirements applied to all data exchanges
- Clinical workflows validated with end users

## Failure Modes
- Designing integration without considering HL7 FHIR standards
- Ignoring HIPAA security requirements in data exchange
- Skipping clinical workflow validation before deployment

## Example Routes
- Epic Clarity data model integration for population health reporting
- Cerner CCL workflow design for medication reconciliation
- FHIR R4 resource mapping for clinical data exchange

## Source Notes
- HL7 FHIR R4 Specification: https://www.hl7.org/fhir/
- Epic App Orchard: https://www.epic.com/
- Reference: ref.github.healthcare.2026-05-31

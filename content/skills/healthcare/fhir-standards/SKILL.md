---
id: healthcare.fhir-standards
name: FHIR Standards Implementation
version: 1.0.0
domain: healthcare
category: healthcare.interoperability
purpose: Design and review HL7 FHIR implementations for healthcare data exchange and interoperability.
summary: FHIR standards implementation covering resources, profiles, implementation guides, SMART on FHIR, and CDS Hooks.
triggers:
  - fhir implementation
  - fhir resource design
  - fhir profile creation
  - smart on fhir app
  - cds hooks design
  - fhir api review
aliases:
  - fhir
  - hl7 fhir
negative_keywords:
  - general api design
  - rest api without healthcare context
  - web development
inputs:
  - data_exchange_requirements
  - fhir_version
  - implementation_context
outputs:
  - fhir_implementation_design
  - resource_profiles
  - integration_testing_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Uses incorrect FHIR version or resource types
  - Ignores US Core or other implementation guides
  - Skips security and consent management
verification:
  - Correct FHIR version and resources applied
  - Implementation guide conformance validated
  - Security and consent management addressed
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert FHIR profiles if conformance issues are found
validators:
  - skill.validator
---

## Mission
Design and review HL7 FHIR implementations for healthcare data exchange and interoperability.

## When To Use
- When implementing FHIR-based data exchange
- When designing FHIR resource profiles
- When building SMART on FHIR applications
- When implementing CDS Hooks

## When Not To Use
- For general REST API design without healthcare context (use engineering)
- For HL7 v2 messaging (use hl7-integration skill)
- For non-healthcare data APIs (use engineering agents)

## Procedure
1. **Define Data Exchange Requirements**:
   - Identify clinical data elements to exchange
   - Map to FHIR resources (Patient, Observation, etc.)
   - Select FHIR version (R4, R5) and implementation guides

2. **Design FHIR Profiles**:
   - Create resource profiles with required extensions
   - Define cardinality and binding to value sets
   - Apply US Core or other IG constraints

3. **Implement Security**:
   - Configure SMART on FHIR authorization
   - Implement consent management (Consent resource)
   - Apply audit logging per IHE ATNA profile

4. **Build and Test**:
   - Implement FHIR server or client
   - Create test cases for each profile
   - Validate against FHIR validator and IG tests

5. **Deploy and Monitor**:
   - Deploy to production with monitoring
   - Track conformance to profiles
   - Monitor interoperability metrics

## Tool Policy
- Use `filesystem.read` to review FHIR specs, IGs, and implementation configs
- Use `filesystem.write` to produce FHIR profiles and implementation designs

## Verification
- Correct FHIR version and resource types applied
- Implementation guide conformance validated
- Security and consent management addressed

## Failure Modes
- Using incorrect FHIR version or resource types
- Ignoring US Core or other implementation guide requirements
- Skipping security and consent management

## Example Routes
- FHIR R4 Patient resource profile for multi-system integration
- SMART on FHIR app for clinical decision support
- CDS Hooks implementation for medication safety alerts

## Source Notes
- HL7 FHIR: https://www.hl7.org/fhir/
- US Core Implementation Guide
- SMART on FHIR: https://smarthealthit.org/
- Reference: ref.github.healthcare.2026-05-31

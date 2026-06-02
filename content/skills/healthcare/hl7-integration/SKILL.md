---
id: healthcare.hl7-integration
name: HL7 v2 Integration
version: 1.0.0
domain: healthcare
category: healthcare.interoperability
purpose: Design and review HL7 v2 messaging implementations for healthcare system integration.
summary: HL7 v2 integration covering ADT, ORM, ORU, SIU message types, interface engines, and message validation.
triggers:
  - hl7 v2 integration
  - hl7 message design
  - adt message review
  - interface engine configuration
  - hl7 interface testing
aliases:
  - hl7 integration
  - hl7 v2
negative_keywords:
  - hl7 fhir
  - general api design
  - web services
inputs:
  - message_requirements
  - system_endpoints
  - interface_specifications
outputs:
  - message_design
  - interface_mapping
  - testing_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Uses incorrect HL7 version or message type
  - Ignores Z-segment conventions
  - Skips error handling and acknowledgment design
verification:
  - Correct HL7 version and message types applied
  - Z-segment conventions documented
  - Error handling and ACK design included
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert interface configurations if message errors occur
validators:
  - skill.validator
---

## Mission
Design and review HL7 v2 messaging implementations for healthcare system integration.

## When To Use
- When designing HL7 v2 message interfaces
- When configuring interface engines (Mirth, Corepoint, Rhapsody)
- When testing HL7 v2 message exchanges
- When troubleshooting HL7 interface issues

## When Not To Use
- For FHIR-based integration (use fhir-standards skill)
- For general API integration without healthcare context (use engineering)
- For DICOM imaging integration (different standard)

## Procedure
1. **Define Message Requirements**:
   - Identify message types needed (ADT, ORM, ORU, SIU, etc.)
   - Select HL7 version (2.3, 2.3.1, 2.5.1, 2.6)
   - Document trigger events and workflow context

2. **Design Message Structure**:
   - Map data elements to HL7 segments and fields
   - Define Z-segments for custom data
   - Specify required and optional fields

3. **Configure Interface Engine**:
   - Set up channels and connections
   - Configure message transformations (mapping)
   - Design routing and filtering rules

4. **Design Error Handling**:
   - Configure ACK/NAK handling
   - Design retry and error queue mechanisms
   - Set up monitoring and alerting

5. **Test and Validate**:
   - Create test messages for each scenario
   - Validate against HL7 conformance profiles
   - Test error scenarios and edge cases

## Tool Policy
- Use `filesystem.read` to review HL7 specs and interface configurations
- Use `filesystem.write` to produce message designs and interface specs

## Verification
- Correct HL7 version and message types applied
- Z-segment conventions documented and consistent
- Error handling and acknowledgment design included

## Failure Modes
- Using incorrect HL7 version or message types
- Ignoring Z-segment naming conventions
- Skipping error handling and ACK design

## Example Routes
- ADT^A08 message design for patient registration system
- ORM^O01 interface for order entry to lab system
- ORU^R01 result reporting from lab to EHR

## Source Notes
- HL7 v2 Standard: https://www.hl7.org/implement/standards/product_brief.cfm?product_id=185
- IHE Integration Profiles
- Reference: ref.github.healthcare.2026-05-31

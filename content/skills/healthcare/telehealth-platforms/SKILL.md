---
id: healthcare.telehealth-platforms
name: Telehealth Platform Implementation
version: 1.0.0
domain: healthcare
category: healthcare.telehealth
purpose: Design and evaluate telehealth platform implementations including video visits, remote monitoring, and virtual care workflows.
summary: Telehealth platform implementation covering video visit platforms, remote patient monitoring, store-and-forward, and mobile health.
triggers:
  - telehealth platform design
  - video visit implementation
  - remote patient monitoring
  - virtual care workflow
  - telehealth platform selection
aliases:
  - telehealth
  - virtual care platform
negative_keywords:
  - general video conferencing
  - marketing webinars
  - internal meetings
inputs:
  - clinical_requirements
  - platform_options
  - regulatory_constraints
outputs:
  - platform_assessment
  - implementation_plan
  - workflow_design
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Selects platform without HIPAA compliance verification
  - Ignores multi-state licensure requirements
  - Skips patient accessibility assessment
verification:
  - HIPAA compliance verified for platform
  - Licensure requirements addressed
  - Patient accessibility assessed
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert platform changes if clinical workflow is disrupted
validators:
  - skill.validator
---

## Mission
Design and evaluate telehealth platform implementations including video visits, remote monitoring, and virtual care workflows.

## When To Use
- When selecting and implementing telehealth platforms
- When designing virtual care workflows
- When implementing remote patient monitoring programs
- When evaluating telehealth platform options

## When Not To Use
- For general video conferencing tools (not healthcare-specific)
- For in-person clinical workflow design (use ehr-systems)
- For marketing webinars or internal meetings

## Procedure
1. **Assess Clinical Requirements**:
   - Define visit types and clinical workflows
   - Identify required integrations (EHR, scheduling, billing)
   - Document clinical decision support needs

2. **Evaluate Platform Options**:
   - Verify HIPAA compliance and BAA availability
   - Assess video quality and reliability features
   - Review patient and provider user experience

3. **Address Regulatory Requirements**:
   - Map multi-state licensure requirements
   - Verify prescribing regulations for telehealth
   - Address informed consent requirements

4. **Design Patient Access**:
   - Assess broadband and device accessibility
   - Design language access and ADA compliance
   - Create patient onboarding workflows

5. **Implement and Monitor**:
   - Configure platform with clinical workflows
   - Train providers and staff
   - Monitor quality metrics and patient satisfaction

## Tool Policy
- Use `filesystem.read` to review platform specs and regulatory requirements
- Use `filesystem.write` to produce implementation plans and workflow designs

## Verification
- HIPAA compliance verified with BAA in place
- Multi-state licensure requirements addressed
- Patient accessibility and digital divide assessed

## Failure Modes
- Selecting platform without verifying HIPAA compliance
- Ignoring multi-state licensure requirements
- Skipping patient accessibility assessment

## Example Routes
- Video visit platform selection for primary care practice
- Remote patient monitoring for chronic disease management
- Store-and-forward telehealth for dermatology consultations

## Source Notes
- ATA Telehealth Standards
- CMS Telehealth Policies
- Reference: ref.github.healthcare.2026-05-31

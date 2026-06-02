---
id: manufacturing.safety-protocols
name: Safety Protocols
version: 1.0.0
domain: manufacturing
category: manufacturing.safety
purpose: Design and maintain workplace safety protocols, hazard controls, and compliance programs for manufacturing environments.
summary: Safety protocols covering hazard assessment, PPE requirements, lockout/tagout, emergency procedures, and OSHA compliance.
triggers:
  - design safety protocol
  - hazard control assessment
  - lockout tagout procedure
  - emergency procedure review
  - OSHA compliance audit
aliases:
  - safety protocols
  - EHS protocols
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - hazard_inventory
  - regulatory_requirements
  - incident_history
  - equipment_specifications
outputs:
  - safety_protocol_document
  - hazard_control_plan
  - compliance_checklist
  - training_requirements
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Protocols without hazard assessment
  - Missing PPE requirements
  - Emergency procedures not tested
verification:
  - All hazards assessed and controlled
  - PPE requirements specified for each task
  - Lockout/tagout procedures documented
  - Emergency procedures tested and current
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous safety protocol if new protocol creates gaps
validators:
  - skill.validator
requires_disclaimer: true
---

## Mission
Design and maintain workplace safety protocols, hazard controls, and compliance programs for manufacturing environments.

## When To Use
- When designing safety protocols for new processes or equipment
- During hazard assessment or control reviews
- For OSHA compliance preparation
- When updating emergency procedures

## When Not To Use
- For environmental compliance (use environmental engineering)
- For product safety certification (use quality engineering agent)
- For workers compensation (use HR)

## Procedure
1. **Conduct Hazard Assessment**:
   - Inventory all hazards by area and task
   - Classify by severity and likelihood
   - Apply hierarchy of controls (eliminate, substitute, engineer, admin, PPE)

2. **Design Safety Protocols**:
   - Write task-specific safety procedures
   - Specify PPE requirements for each task
   - Include lockout/tagout procedures for energy sources

3. **Develop Emergency Procedures**:
   - Create evacuation routes and assembly points
   - Define roles for emergency response team
   - Include first aid and medical response procedures

4. **Ensure Regulatory Compliance**:
   - Map protocols to OSHA, ANSI, and ISO requirements
   - Create compliance checklist for audits
   - Identify and close compliance gaps

5. **Define Training Requirements**:
   - List required training by role and task
   - Set refresher frequencies
   - Document competency verification methods

## Tool Policy
- Use `filesystem.read` to review hazard data, regulations, and incident records
- Use `filesystem.write` to produce safety protocols and compliance documents

## Verification
- All identified hazards have corresponding controls
- PPE requirements specified for each task
- Lockout/tagout procedures documented for all energy sources
- Emergency procedures current and tested

## Failure Modes
- Protocols created without hazard assessment
- Missing PPE requirements for specific tasks
- Emergency procedures not tested or outdated
- Compliance gaps not identified

## Example Routes
- Safety protocol for new CNC equipment
- Lockout/tagout procedure for press line
- OSHA compliance checklist for warehouse

## Source Notes
- OSHA 29 CFR 1910 General Industry Standards
- ANSI/ASSE Z590.3 Prevention through Design
- Reference: ref.github.manufacturing.2026-05-31

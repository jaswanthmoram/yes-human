---
id: healthcare.patient-safety-protocols
name: Patient Safety Protocols
version: 1.0.0
domain: healthcare
category: healthcare.safety
purpose: Design and evaluate patient safety protocols, adverse event reporting, and root cause analysis frameworks.
summary: Patient safety protocols covering event reporting, RCA methodology, prevention strategies, and safety culture assessment.
triggers:
  - patient safety protocol design
  - adverse event reporting
  - root cause analysis
  - safety culture assessment
  - near miss analysis
  - sentinel event review
aliases:
  - patient safety
  - safety protocols
negative_keywords:
  - software safety testing
  - product safety review
  - workplace safety
inputs:
  - event_data
  - safety_framework
  - organizational_context
outputs:
  - safety_protocol
  - rca_report
  - prevention_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - RCA focuses on individual blame instead of systems
  - Misses contributing factors at organizational level
  - Recommendations lack measurability
verification:
  - Systems-based approach applied to RCA
  - All contributing factors identified
  - Recommendations are measurable and actionable
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert protocol changes if safety concerns are identified
validators:
  - skill.validator
---

## Mission
Design and evaluate patient safety protocols, adverse event reporting systems, and root cause analysis frameworks.

## When To Use
- When designing patient safety protocols
- When conducting root cause analysis of adverse events
- When assessing safety culture
- When implementing adverse event reporting systems

## When Not To Use
- For software safety testing (use engineering/security agents)
- For workplace safety (use manufacturing agents)
- For clinical treatment decisions (use clinical-decision-support)

## Procedure
1. **Assess Safety Culture**:
   - Evaluate reporting culture and just culture principles
   - Review existing safety infrastructure and committees
   - Assess leadership engagement in safety

2. **Design Event Reporting System**:
   - Define reportable events and severity classification
   - Design reporting workflows and escalation paths
   - Configure reporting tools and dashboards

3. **Conduct Root Cause Analysis**:
   - Assemble multidisciplinary RCA team
   - Apply systems-based analysis (fishbone, 5 whys, timeline)
   - Identify root causes and contributing factors at all levels

4. **Develop Prevention Strategies**:
   - Design system-level interventions (forcing functions, barriers)
   - Apply hierarchy of effectiveness for interventions
   - Create measurable action plans with accountability

5. **Monitor and Sustain**:
   - Define safety metrics and monitoring dashboards
   - Implement spread plans for successful interventions
   - Schedule follow-up assessments for sustainability

## Tool Policy
- Use `filesystem.read` to review safety data, protocols, and event reports
- Use `filesystem.write` to produce safety protocols and RCA reports

## Verification
- Systems-based approach applied (not individual blame)
- All contributing factors at organizational, team, and individual levels
- Recommendations are specific, measurable, and assigned

## Failure Modes
- RCA focusing on individual blame instead of systems
- Missing organizational-level contributing factors
- Recommendations that are vague or unmeasurable

## Example Routes
- Root cause analysis for medication error
- Patient safety protocol for fall prevention
- Sentinel event review and action plan

## Source Notes
- AHRQ Patient Safety Network: https://psnet.ahrq.gov/
- Joint Commission Sentinel Event Alerts
- Reference: ref.github.healthcare.2026-05-31

---
id: healthcare.medical-device-reporting
name: Medical Device Reporting
version: 1.0.0
domain: healthcare
category: healthcare.regulatory
purpose: Design and review medical device reporting (MDR) systems for adverse event reporting and post-market surveillance.
summary: Medical device reporting covering MDR regulations, adverse event reporting, post-market surveillance, and recall management.
triggers:
  - medical device reporting
  - mdr compliance
  - adverse event reporting device
  - post-market surveillance
  - device recall planning
aliases:
  - mdr
  - device reporting
negative_keywords:
  - medication adverse events
  - general product recalls
  - software bug reporting
inputs:
  - event_data
  - device_information
  - regulatory_requirements
outputs:
  - mdr_assessment
  - reporting_plan
  - surveillance_strategy
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Misses reportable event criteria
  - Incorrect reporting timelines
  - Incomplete event investigation
verification:
  - Reportable event criteria applied
  - Reporting timelines per 21 CFR 803
  - Investigation completeness validated
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Escalate if reportable events are missed
validators:
  - skill.validator
---

## Mission
Design and review medical device reporting (MDR) systems for adverse event reporting and post-market surveillance.

## When To Use
- When evaluating MDR compliance programs
- When designing adverse event reporting workflows
- When planning post-market surveillance
- When managing device recalls

## When Not To Use
- For medication adverse event reporting (FDA MedWatch, different process)
- For general consumer product recalls (CPSC jurisdiction)
- For software bug reporting (use engineering agents)

## Procedure
1. **Assess Reportable Event Criteria**:
   - Apply 21 CFR 803 reportable event definitions
   - Determine if event caused or contributed to death or serious injury
   - Evaluate malfunction that would likely cause reportable event if recurring

2. **Design Reporting Workflow**:
   - Configure event intake and triage process
   - Define investigation and root cause analysis procedures
   - Set up reporting timelines (5-day, 30-day reports)

3. **Implement Post-Market Surveillance**:
   - Design passive and active surveillance methods
   - Configure trend analysis and signal detection
   - Plan Section 522 post-market surveillance studies if required

4. **Manage Recalls**:
   - Classify recall severity (Class I, II, III)
   - Design correction and removal procedures
   - Configure recall effectiveness checks

5. **Monitor and Report**:
   - Track MDR submission metrics
   - Monitor FDA correspondence and requests
   - Maintain MDR files and records

## Tool Policy
- Use `filesystem.read` to review event data and regulatory requirements
- Use `filesystem.write` to produce MDR assessments and reporting plans

## Verification
- Reportable event criteria correctly applied per 21 CFR 803
- Reporting timelines met (5-day and 30-day reports)
- Investigation completeness validated

## Failure Modes
- Missing reportable events due to incorrect criteria application
- Missing reporting timelines leading to FDA enforcement
- Incomplete event investigations

## Example Routes
- MDR assessment for device-related serious injury
- Post-market surveillance plan for Class II device
- Device recall classification and effectiveness plan

## Source Notes
- 21 CFR Part 803 Medical Device Reporting
- FDA MDR Guidance Documents
- Reference: ref.github.healthcare.2026-05-31

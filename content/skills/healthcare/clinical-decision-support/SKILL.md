---
id: healthcare.clinical-decision-support
name: Clinical Decision Support Design
version: 1.0.0
domain: healthcare
category: healthcare.clinical
purpose: Design and evaluate clinical decision support systems including alerts, order sets, and evidence-based recommendations.
summary: Clinical decision support design covering CDS Five Rights, alert design, order sets, and clinical reasoning logic.
triggers:
  - clinical decision support design
  - cds alert review
  - order set design
  - clinical reasoning logic
  - cds intervention evaluation
aliases:
  - cds
  - clinical decision support
negative_keywords:
  - business decision support
  - general analytics
  - marketing automation
inputs:
  - clinical_scenario
  - evidence_base
  - workflow_context
outputs:
  - cds_design
  - alert_specifications
  - evaluation_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Designs CDS without considering alert fatigue
  - Ignores evidence quality grading
  - Skips workflow integration assessment
verification:
  - CDS Five Rights addressed
  - Evidence quality graded
  - Alert fatigue mitigation planned
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Disable CDS interventions if safety concerns arise
validators:
  - skill.validator
---

## Mission
Design and evaluate clinical decision support systems including alerts, order sets, and evidence-based recommendations.

## When To Use
- When designing CDS alerts and interventions
- When creating or reviewing order sets
- When evaluating CDS effectiveness
- When implementing clinical reasoning logic

## When Not To Use
- For business decision support systems (use analytics agents)
- For general analytics without clinical context (use health-data-analytics)
- For marketing automation rules (use marketing agents)

## Procedure
1. **Define Clinical Problem**:
   - Identify the clinical gap or opportunity
   - Define target users and workflow context
   - Specify desired clinical outcomes

2. **Apply CDS Five Rights**:
   - Right information: evidence-based content
   - Right person: target clinician or patient
   - Right format: alert, order set, reference info
   - Right channel: EHR, mobile, pager
   - Right time: point of decision

3. **Design CDS Intervention**:
   - Create alert logic and firing criteria
   - Design order sets with evidence-based defaults
   - Build clinical reasoning rules and pathways

4. **Mitigate Alert Fatigue**:
   - Apply tiered alert severity
   - Design override reasons and documentation
   - Set appropriate sensitivity and specificity targets

5. **Evaluate Effectiveness**:
   - Define process and outcome measures
   - Design pre/post evaluation methodology
   - Monitor for unintended consequences

## Tool Policy
- Use `filesystem.read` to review clinical evidence and CDS specifications
- Use `filesystem.write` to produce CDS designs and evaluation plans

## Verification
- CDS Five Rights addressed in design
- Evidence quality graded using recognized framework
- Alert fatigue mitigation strategies planned

## Failure Modes
- Designing CDS without considering alert fatigue impact
- Ignoring evidence quality grading for recommendations
- Skipping workflow integration assessment

## Example Routes
- Drug-drug interaction alert design with tiered severity
- Sepsis screening order set with evidence-based bundles
- VTE prophylaxis CDS for hospitalized patients

## Source Notes
- Osheroff CDS Five Rights
- AMIA CDS Guidelines
- Reference: ref.github.healthcare.2026-05-31

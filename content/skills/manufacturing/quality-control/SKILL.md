---
id: manufacturing.quality-control
name: Quality Control
version: 1.0.0
domain: manufacturing
category: manufacturing.quality
purpose: Design and execute quality control plans, inspection protocols, and acceptance sampling for manufactured products.
summary: Quality control covering inspection design, sampling plans, defect classification, and corrective action workflows.
triggers:
  - design quality control plan
  - create inspection protocol
  - acceptance sampling review
  - defect classification analysis
  - quality audit preparation
aliases:
  - quality control
  - QC review
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - product_specifications
  - quality_standards
  - historical_defect_data
  - sampling_requirements
outputs:
  - quality_control_plan
  - inspection_protocol
  - sampling_plan
  - corrective_action_workflow
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Inspection plan without acceptance criteria
  - Sampling plan without statistical justification
  - Missing defect classification scheme
verification:
  - Acceptance criteria defined for each characteristic
  - Sampling plan statistically justified
  - Defect classification scheme complete
  - Corrective action workflow documented
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous inspection protocol if new plan misses critical characteristics
validators:
  - skill.validator
---

## Mission
Design and execute quality control plans, inspection protocols, and acceptance sampling for manufactured products.

## When To Use
- When designing quality control plans for new products
- During inspection protocol creation or revision
- When establishing acceptance sampling plans
- Before quality audits or certifications

## When Not To Use
- For statistical process control (use statistical-process-control skill)
- For quality system design (use quality engineering agent)
- For product liability assessment (use legal-compliance)

## Procedure
1. **Define Quality Requirements**:
   - Map product specifications to measurable characteristics
   - Identify critical-to-quality (CTQ) parameters
   - Classify defects by severity (critical, major, minor)

2. **Design Inspection Protocol**:
   - Select inspection methods for each characteristic
   - Define measurement equipment and calibration requirements
   - Establish inspection frequency and sample sizes

3. **Create Sampling Plan**:
   - Select appropriate sampling standard (ANSI/ASQ Z1.4, etc.)
   - Determine AQL and lot sizes
   - Justify sample sizes statistically

4. **Build Corrective Action Workflow**:
   - Define nonconformance disposition paths
   - Establish containment, root cause, and corrective action steps
   - Set escalation criteria by defect severity

5. **Document and Validate**:
   - Compile complete quality control plan
   - Validate against product specifications
   - Obtain quality manager approval

## Tool Policy
- Use `filesystem.read` to review specifications, standards, and defect history
- Use `filesystem.write` to produce quality plans and inspection protocols

## Verification
- All CTQ characteristics have defined acceptance criteria
- Sampling plans have statistical justification
- Defect classification covers all severity levels
- Corrective action workflow includes containment and root cause steps

## Failure Modes
- Missing acceptance criteria for critical characteristics
- Sampling plans without statistical basis
- Incomplete defect classification scheme
- Corrective action workflow missing escalation paths

## Example Routes
- Design QC plan for new assembly line
- Create incoming inspection protocol for raw materials
- Establish AQL sampling plan for finished goods

## Source Notes
- ANSI/ASQ Z1.4 Sampling Procedures
- ISO 9001:2015 Quality Management
- Reference: ref.github.manufacturing.2026-05-31

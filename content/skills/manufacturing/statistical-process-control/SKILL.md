---
id: manufacturing.statistical-process-control
name: Statistical Process Control
version: 1.0.0
domain: manufacturing
category: manufacturing.quality
purpose: Implement and maintain statistical process control systems using control charts, capability analysis, and variation reduction.
summary: SPC covering control chart selection, process capability studies, variation analysis, and out-of-control action plans.
triggers:
  - implement SPC
  - control chart setup
  - process capability study
  - variation analysis
  - out of control investigation
aliases:
  - SPC
  - statistical process control
negative_keywords:
  - financial analysis
  - code review
  - legal review
inputs:
  - process_data
  - specification_limits
  - measurement_system_data
outputs:
  - control_chart_setup
  - capability_report
  - variation_analysis
  - ooc_action_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Control charts without measurement system validation
  - Capability indices without normality check
  - Missing out-of-control reaction plan
verification:
  - Measurement system validated (GR&R)
  - Control chart type justified by data type
  - Capability indices reported with confidence intervals
  - Out-of-control reaction plan documented
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert to previous control limits if new limits are statistically unjustified
validators:
  - skill.validator
---

## Mission
Implement and maintain statistical process control systems using control charts, capability analysis, and variation reduction.

## When To Use
- When establishing SPC for a new process
- During process capability studies
- When investigating out-of-control conditions
- For variation reduction projects

## When Not To Use
- For acceptance sampling (use quality-control skill)
- For designed experiments (use six-sigma skill)
- For non-statistical quality reviews

## Procedure
1. **Validate Measurement System**:
   - Conduct GR&R study for each measurement
   - Confirm measurement resolution and repeatability
   - Document measurement system capability

2. **Select Control Chart Type**:
   - Match chart type to data type (variable vs attribute)
   - Choose subgroup size and sampling frequency
   - Calculate initial control limits from baseline data

3. **Conduct Capability Study**:
   - Verify process stability before capability analysis
   - Check normality assumptions
   - Calculate Cp, Cpk, Pp, Ppk with confidence intervals

4. **Analyze Variation Sources**:
   - Decompose total variation into components
   - Identify common vs special cause variation
   - Prioritize variation reduction opportunities

5. **Create Out-of-Control Action Plan**:
   - Define rules for detecting out-of-control conditions
   - Document immediate containment actions
   - Establish root cause investigation protocol

## Tool Policy
- Use `filesystem.read` to review process data, specifications, and measurement records
- Use `filesystem.write` to produce control chart setups and capability reports

## Verification
- Measurement system GR&R completed and acceptable
- Control chart type matches data characteristics
- Capability indices reported with confidence intervals
- Out-of-control reaction plan documented and actionable

## Failure Modes
- Using control charts without validated measurement systems
- Reporting capability indices for unstable processes
- Missing out-of-control reaction plans
- Not checking normality before capability analysis

## Example Routes
- Set up X-bar R charts for machining process
- Process capability study for assembly torque
- Investigate out-of-control signal on coating thickness

## Source Notes
- AIAG SPC Manual
- Montgomery, Introduction to Statistical Quality Control
- Reference: ref.github.manufacturing.2026-05-31

---
id: manufacturing.six-sigma
name: Six Sigma
version: 1.0.0
domain: manufacturing
category: manufacturing.quality
purpose: Apply Six Sigma DMAIC methodology to reduce variation, eliminate defects, and improve process performance.
summary: Six Sigma covering DMAIC phases, statistical tools, designed experiments, and defect reduction strategies.
triggers:
  - six sigma project
  - DMAIC analysis
  - defect reduction initiative
  - process variation study
  - designed experiment
aliases:
  - six sigma
  - DMAIC
  - 6 sigma
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - problem_statement
  - process_data
  - measurement_data
  - specification_limits
outputs:
  - dmaic_report
  - statistical_analysis
  - improvement_recommendations
  - control_plan
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Skipping DMAIC phases
  - Statistical tools applied without validation
  - Control plan missing after improvements
verification:
  - All five DMAIC phases documented
  - Statistical methods validated
  - Improvement effects quantified
  - Control plan sustains gains
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert process changes if improvement not statistically significant
validators:
  - skill.validator
---

## Mission
Apply Six Sigma DMAIC methodology to reduce variation, eliminate defects, and improve process performance.

## When To Use
- When leading structured defect reduction projects
- During process variation studies
- When conducting designed experiments (DOE)
- For complex root cause analysis requiring statistical rigor

## When Not To Use
- For simple quality issues (use quality-control skill)
- For lean waste elimination (use lean-manufacturing skill)
- For routine SPC monitoring (use statistical-process-control skill)

## Procedure
1. **Define Phase**:
   - Write problem statement with baseline metrics
   - Define project scope, goals, and timeline
   - Identify CTQ characteristics from customer requirements
   - Create project charter and team assignments

2. **Measure Phase**:
   - Validate measurement systems (GR&R)
   - Collect baseline process data
   - Map detailed process flow
   - Calculate baseline sigma level

3. **Analyze Phase**:
   - Identify potential root causes (fishbone, FMEA)
   - Validate root causes with statistical tests
   - Quantify contribution of each factor to variation
   - Prioritize root causes by impact

4. **Improve Phase**:
   - Generate and evaluate solutions
   - Conduct designed experiments (DOE) if needed
   - Pilot improvements and validate results
   - Quantify improvement in sigma level and cost

5. **Control Phase**:
   - Implement SPC for sustained monitoring
   - Create control plan with response procedures
   - Document new standard operating procedures
   - Transfer ownership to process owner

## Tool Policy
- Use `filesystem.read` to review process data, measurement records, and specifications
- Use `filesystem.write` to produce DMAIC reports and control plans

## Verification
- All five DMAIC phases completed and documented
- Statistical methods validated with appropriate tests
- Improvement quantified in sigma level and financial terms
- Control plan with SPC sustains the gains

## Failure Modes
- Skipping or rushing DMAIC phases
- Using statistical tools without validating assumptions
- Not creating a control plan after improvements
- Failing to transfer ownership to process owner

## Example Routes
- DMAIC project for reducing coating thickness variation
- Designed experiment for optimizing weld parameters
- Six Sigma analysis for reducing assembly defects

## Source Notes
- Pyzdek & Keller, The Six Sigma Handbook
- Montgomery, Design and Analysis of Experiments
- Reference: ref.github.manufacturing.2026-05-31

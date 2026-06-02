---
id: healthcare.population-health-analytics
name: Population Health Analytics
version: 1.0.0
domain: healthcare
category: healthcare.analytics
purpose: Design and execute population health analytics for risk stratification, care gap closure, and value-based care performance.
summary: Population health analytics covering risk stratification, care gap analysis, social determinants, and value-based care metrics.
triggers:
  - population health analytics
  - risk stratification analysis
  - care gap analysis
  - value-based care reporting
  - population health dashboard
aliases:
  - pop health analytics
  - population analytics
negative_keywords:
  - individual patient analytics
  - marketing segmentation
  - financial actuarial
inputs:
  - population_data
  - risk_model
  - care_objectives
outputs:
  - risk_stratification
  - care_gap_report
  - performance_dashboard
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Risk model does not account for social determinants
  - Care gaps not aligned with quality measures
  - Population segmentation lacks clinical validity
verification:
  - Social determinants included in risk model
  - Care gaps mapped to quality measures
  - Population segments clinically validated
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert risk models if clinical validity is not confirmed
validators:
  - skill.validator
---

## Mission
Design and execute population health analytics for risk stratification, care gap closure, and value-based care performance.

## When To Use
- When designing risk stratification models
- When analyzing care gaps across populations
- When reporting value-based care performance
- When building population health dashboards

## When Not To Use
- For individual patient analytics (use health-data-analytics)
- For marketing segmentation (use marketing agents)
- For financial actuarial analysis (use finance agents)

## Procedure
1. **Define Population and Objectives**:
   - Identify target population and attribution rules
   - Define care objectives and quality targets
   - Select risk stratification methodology

2. **Build Risk Stratification Model**:
   - Incorporate clinical, claims, and SDOH data
   - Apply validated risk models (LACE, ACG, etc.)
   - Segment population by risk tier

3. **Analyze Care Gaps**:
   - Map care gaps to HEDIS and quality measures
   - Prioritize by impact and closability
   - Identify barriers to gap closure

4. **Report Performance**:
   - Calculate value-based care metrics
   - Benchmark against peers and targets
   - Visualize trends and disparities

5. **Drive Action**:
   - Recommend targeted interventions by risk tier
   - Design outreach and engagement strategies
   - Monitor intervention effectiveness

## Tool Policy
- Use `filesystem.read` to review population data and risk models
- Use `filesystem.write` to produce analytics reports and dashboards

## Verification
- Social determinants of health included in risk model
- Care gaps mapped to recognized quality measures
- Population segments clinically validated

## Failure Modes
- Risk model not accounting for social determinants of health
- Care gaps not aligned with quality measure specifications
- Population segmentation lacking clinical validity

## Example Routes
- Risk stratification for ACO attributed population
- Care gap analysis for diabetes management program
- Value-based care performance dashboard for MSSP

## Source Notes
- CMS Innovation Center Models
- NCQA Population Health Management
- Reference: ref.github.healthcare.2026-05-31

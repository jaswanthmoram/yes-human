---
id: healthcare.health-data-analytics
name: Health Data Analytics
version: 1.0.0
domain: healthcare
category: healthcare.analytics
purpose: Analyze healthcare datasets for clinical outcomes, utilization, cost, and population health insights using de-identified data.
summary: Health data analytics covering clinical outcomes analysis, utilization patterns, cost drivers, and predictive modeling.
triggers:
  - health data analysis
  - clinical outcomes analytics
  - utilization review
  - healthcare cost analysis
  - predictive health modeling
aliases:
  - health analytics
  - healthcare analytics
negative_keywords:
  - marketing analytics
  - financial analytics
  - web analytics
inputs:
  - dataset_description
  - analysis_objectives
  - deidentification_status
outputs:
  - analytics_report
  - insights_summary
  - recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Analyzes data without confirming de-identification
  - Draws causal conclusions from observational data
  - Ignores confounding variables
verification:
  - De-identification status confirmed before analysis
  - Statistical methods appropriate for study design
  - Confounding variables addressed
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert analysis if PHI exposure is detected
validators:
  - skill.validator
---

## Mission
Analyze healthcare datasets for clinical outcomes, utilization, cost, and population health insights using de-identified data.

## When To Use
- When analyzing clinical outcomes data
- When reviewing utilization patterns and trends
- When building predictive models for population health
- When analyzing healthcare cost drivers

## When Not To Use
- For marketing analytics (use marketing agents)
- For financial reporting analytics (use finance agents)
- When PHI cannot be de-identified (refuse and escalate)

## Procedure
1. **Confirm Data Governance**:
   - Verify de-identification status (Safe Harbor or Expert Determination)
   - Confirm data use agreement and IRB status if applicable
   - Document data provenance and quality

2. **Define Analysis Plan**:
   - Specify research question and hypotheses
   - Select appropriate statistical methods
   - Define outcome measures and covariates

3. **Execute Analysis**:
   - Apply descriptive statistics for baseline characterization
   - Use inferential methods for comparisons and associations
   - Apply predictive models where appropriate

4. **Validate Results**:
   - Check for confounding and effect modification
   - Perform sensitivity analyses
   - Validate against known benchmarks

5. **Report Findings**:
   - Present results with appropriate confidence intervals
   - Distinguish correlation from causation
   - Provide actionable recommendations

## Tool Policy
- Use `filesystem.read` to review datasets and analysis specifications
- Use `filesystem.write` to produce analytics reports and visualizations

## Verification
- De-identification confirmed before any analysis
- Statistical methods appropriate for study design and data type
- Confounding variables identified and addressed

## Failure Modes
- Analyzing data without confirming de-identification status
- Drawing causal conclusions from observational data
- Ignoring confounding variables in analysis

## Example Routes
- Readmission rate analysis for heart failure cohort
- Utilization trend analysis for emergency department visits
- Predictive model for high-cost patient identification

## Source Notes
- AHRQ Healthcare Cost and Utilization Project
- CMS Chronic Conditions Data Warehouse
- Reference: ref.github.healthcare.2026-05-31

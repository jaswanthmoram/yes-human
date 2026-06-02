---
id: manufacturing.manufacturing-analytics
name: Manufacturing Analytics
version: 1.0.0
domain: manufacturing
category: manufacturing.analytics
purpose: Analyze manufacturing data to drive operational improvements through OEE analysis, trend detection, and performance benchmarking.
summary: Manufacturing analytics covering OEE calculation, production trend analysis, cost variance analysis, and performance benchmarking.
triggers:
  - OEE analysis
  - production trend analysis
  - cost variance investigation
  - manufacturing performance benchmarking
  - production data deep dive
aliases:
  - manufacturing analytics
  - production analytics
  - OEE analysis
negative_keywords:
  - financial audit
  - code review
  - legal review
inputs:
  - production_data
  - quality_data
  - cost_data
  - benchmark_data
outputs:
  - oee_report
  - trend_analysis
  - cost_variance_report
  - benchmarking_comparison
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - OEE calculated without validated data sources
  - Trends reported without statistical significance
  - Benchmarks not comparable (different definitions)
verification:
  - Data sources validated and documented
  - Trends tested for statistical significance
  - Benchmarks use consistent definitions
  - Recommendations tied to data evidence
source_references:
  - ref.github.manufacturing.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert analytics methodology if results are inconsistent with known operations
validators:
  - skill.validator
---

## Mission
Analyze manufacturing data to drive operational improvements through OEE analysis, trend detection, and performance benchmarking.

## When To Use
- When calculating or improving OEE
- During production trend or performance reviews
- For cost variance investigations
- When benchmarking against industry standards

## When Not To Use
- For financial reporting (use finance)
- For statistical modeling (use data-ai domain)
- For real-time process monitoring (use SPC skill)

## Procedure
1. **Validate Data Sources**:
   - Confirm data completeness and accuracy
   - Document data definitions and collection methods
   - Identify and flag data quality issues

2. **Calculate OEE**:
   - Measure Availability (uptime / planned time)
   - Measure Performance (actual rate / ideal rate)
   - Measure Quality (good units / total units)
   - Calculate OEE = Availability x Performance x Quality

3. **Analyze Trends**:
   - Identify statistically significant trends
   - Separate seasonal, cyclical, and random variation
   - Correlate trends with operational changes

4. **Investigate Cost Variances**:
   - Compare actual vs standard costs by category
   - Identify root causes of significant variances
   - Quantify financial impact of each variance

5. **Benchmark Performance**:
   - Compare against industry benchmarks using consistent definitions
   - Identify performance gaps and best practices
   - Prioritize improvement opportunities by impact

## Tool Policy
- Use `filesystem.read` to review production, quality, and cost data
- Use `filesystem.write` to produce analytics reports and benchmarking comparisons

## Verification
- Data sources validated and quality issues documented
- OEE components calculated with correct formulas
- Trends tested for statistical significance
- Benchmarks use consistent, comparable definitions

## Failure Modes
- OEE calculated with incomplete or inaccurate data
- Reporting trends without statistical testing
- Benchmarks using different definitions or scopes
- Recommendations not tied to data evidence

## Example Routes
- OEE analysis for assembly line Q2
- Production trend analysis for yield improvement
- Cost variance investigation for material usage

## Source Notes
- Hansen & Mowen, Cost Management
- Nakajima, Introduction to TPM
- Reference: ref.github.manufacturing.2026-05-31

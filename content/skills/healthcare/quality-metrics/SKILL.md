---
id: healthcare.quality-metrics
name: Healthcare Quality Metrics
version: 1.0.0
domain: healthcare
category: healthcare.quality
purpose: Design, measure, and analyze healthcare quality metrics for performance improvement and regulatory reporting.
summary: Healthcare quality metrics covering HEDIS, CMS Star Ratings, value-based purchasing, and clinical quality measures.
triggers:
  - quality metric design
  - hedis measure analysis
  - cms star ratings review
  - quality measure reporting
  - performance improvement metrics
aliases:
  - quality metrics
  - quality measures
negative_keywords:
  - software quality metrics
  - code quality
  - product metrics
inputs:
  - measure_specifications
  - performance_data
  - reporting_requirements
outputs:
  - metric_analysis
  - performance_report
  - improvement_recommendations
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Misinterprets measure specifications
  - Uses incorrect denominator/numerator logic
  - Ignores risk adjustment requirements
verification:
  - Measure specifications correctly applied
  - Denominator and numerator logic validated
  - Risk adjustment requirements addressed
source_references:
  - ref.github.healthcare.2026-05-31
quality_gate: staging
status: active
rollback:
  - Revert metric calculations if errors are found
validators:
  - skill.validator
---

## Mission
Design, measure, and analyze healthcare quality metrics for performance improvement and regulatory reporting.

## When To Use
- When designing quality measurement programs
- When analyzing HEDIS or CMS quality measures
- When preparing quality reporting submissions
- When benchmarking performance against peers

## When Not To Use
- For software quality metrics (use engineering agents)
- For financial performance metrics (use finance agents)
- For patient satisfaction surveys only (use healthcare-operations)

## Procedure
1. **Define Measure Specifications**:
   - Select appropriate measure set (HEDIS, CMS, NQF)
   - Define denominator, numerator, and exclusion criteria
   - Document data sources and collection methods

2. **Calculate Performance**:
   - Apply measure logic to clinical and claims data
   - Validate denominator and numerator accuracy
   - Apply risk adjustment where required

3. **Analyze Results**:
   - Compare performance to benchmarks and targets
   - Identify performance gaps and trends
   - Stratify results by population subgroups

4. **Report and Submit**:
   - Format results per reporting requirements
   - Validate data completeness and accuracy
   - Submit to appropriate programs (CMS, NCQA, etc.)

5. **Drive Improvement**:
   - Identify root causes of performance gaps
   - Design targeted improvement interventions
   - Monitor improvement over time

## Tool Policy
- Use `filesystem.read` to review measure specs and performance data
- Use `filesystem.write` to produce metric analyses and reports

## Verification
- Measure specifications correctly applied per current year guidance
- Denominator and numerator logic validated against test cases
- Risk adjustment requirements addressed

## Failure Modes
- Misinterpreting measure specifications leading to incorrect rates
- Using incorrect denominator/numerator inclusion/exclusion logic
- Ignoring risk adjustment requirements for fair comparisons

## Example Routes
- HEDIS diabetes care measure analysis
- CMS Star Ratings improvement strategy
- Value-based purchasing quality score calculation

## Source Notes
- NCQA HEDIS: https://www.ncqa.org/hedis/
- CMS Quality Measures: https://www.cms.gov/medicare/quality
- Reference: ref.github.healthcare.2026-05-31

---
id: hr.compensation-analysis
name: Compensation Analysis
version: 1.0.0
domain: hr
category: hr.total-rewards
purpose: Design compensation benchmarking, pay equity analysis, and total rewards structures with market data.
summary: Compensation benchmarking, pay equity analysis, salary band design, and total rewards framework creation.
triggers:
  - compensation benchmarking
  - pay equity analysis
  - salary band design
  - total rewards framework
  - compensation structure review
aliases:
  - compensation analysis
  - comp analysis
  - benchmarking
negative_keywords:
  - performance review
  - job description
  - employee handbook
inputs:
  - market_data
  - role_data
  - equity_constraints
outputs:
  - benchmarking_report
  - pay_equity_analysis
  - compensation_structure
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - Benchmarks without market data sources
  - Ignores pay equity implications
  - Omits total rewards perspective
verification:
  - Market data cited
  - Equity analyzed
  - Total rewards considered
source_references:
  - ref.github.hr.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design compensation benchmarking, pay equity analysis, and total rewards structures with market data.

## When To Use
- Compensation benchmarking analysis
- Pay equity reviews
- Total rewards framework design

## When Not To Use
- Performance reviews belong to performance-reviews skill
- Job descriptions belong to job-description-writing skill
- Employee handbook content belongs to employee-handbooks skill

## Procedure
1. Gather market data and role-level compensation information.
2. Analyze pay equity across demographic groups.
3. Design salary bands and compensation structures.
4. Consider total rewards beyond base compensation.
5. Document market data sources and methodology.

## Tool Policy
- Use `filesystem.read` to access compensation data and market benchmarks.
- Use `filesystem.write` to save analysis reports and structures.

## Verification
- Market data sources cited
- Pay equity implications analyzed
- Total rewards perspective considered

## Failure Modes
- Benchmarking without market data sources
- Ignoring pay equity implications
- Omitting total rewards perspective

## Example Routes
- "compensation benchmarking for engineering roles"
- "pay equity analysis across departments"
- "design total rewards framework"

## Source Notes
- WorldatWork total rewards frameworks, Outsolve compensation benchmarking guides
- Reference: ref.github.hr.2026-05-31

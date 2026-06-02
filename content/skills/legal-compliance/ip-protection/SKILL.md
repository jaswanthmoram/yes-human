---
id: legal-compliance.ip-protection
name: IP Protection
version: 1.0.0
domain: legal-compliance
category: legal-compliance.ip-protection
purpose: Develop intellectual property protection strategies, audit IP portfolios, and identify protection gaps.
summary: IP portfolio auditing, protection strategy development, and gap identification for attorney review.
triggers:
  - audit ip portfolio
  - develop ip strategy
  - identify protection gaps
  - ip asset inventory
  - trade secret protection plan
aliases:
  - ip protection
  - intellectual property protection
negative_keywords:
  - network protection
  - data encryption
  - access control
inputs:
  - ip_portfolio
  - protection_goals
  - business_context
outputs:
  - portfolio_audit
  - protection_strategy
  - gap_analysis
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Performs analysis without naming scope or jurisdiction
  - Presents findings as definitive legal conclusions
  - Omits attorney-review or compliance-owner handoff
verification:
  - Scope and jurisdiction named in output
  - Findings include severity or applicability ratings
  - Attorney-review or compliance-owner handoff included
source_references:
  - ref.github.legal-compliance.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Develop intellectual property protection strategies, audit IP portfolios, and identify protection gaps.

## When To Use
- audit ip portfolio
- develop ip strategy
- identify protection gaps
- ip asset inventory

## When Not To Use
- network protection belongs to a different domain
- data encryption belongs to a different domain
- access control belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: ip_portfolio, protection_goals, business_context.
3. Produce the core outputs: portfolio_audit, protection_strategy, gap_analysis.
4. Name the jurisdiction and scope explicitly.
5. Separate findings from recommended next steps.
6. End with attorney-review or compliance-owner handoff.

## Tool Policy
- Use `filesystem.read` to access documents and reference materials.
- Use `filesystem.write` to save analysis outputs and reports.

## Verification
- Scope and jurisdiction named in every output
- Findings include severity or applicability ratings
- Attorney-review or compliance-owner handoff included

## Failure Modes
- Performing analysis without naming scope or jurisdiction
- Presenting findings as definitive legal conclusions
- Omitting attorney-review or compliance-owner handoff

## Example Routes
- "audit ip portfolio"
- "develop ip strategy"
- "identify protection gaps"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31

---
id: design-content.wcag-compliance
name: WCAG Compliance
version: 1.0.0
domain: design-content
category: design-content.accessibility
purpose: Audit and remediate WCAG 2.2 compliance issues across digital products.
summary: Systematic WCAG 2.2 AA audit with criterion-by-criterion assessment and remediation guidance.
triggers:
  - wcag compliance audit
  - wcag 2.2 assessment
  - accessibility compliance check
  - wcag remediation plan
  - wcag conformance review
aliases:
  - wcag audit
  - wcag check
negative_keywords:
  - visual design only
  - performance optimization
  - security audit
inputs:
  - product_surface
  - wcag_target_level
  - existing_audit_results
outputs:
  - wcag_audit_report
  - remediation_plan
  - conformance_score
allowed_tools:
  - filesystem.read
required_skills: []
budget_band: standard
max_context_tokens: 10000
failure_modes:
  - Missing WCAG criteria in audit
  - Findings without specific criterion citation
  - Remediation without priority ordering
verification:
  - All applicable WCAG criteria assessed
  - Each finding cites specific criterion
  - Remediation prioritized by impact
source_references:
  - ref.github.design-content.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Audit and remediate WCAG 2.2 compliance issues across digital products.

## When To Use
- Before releasing a product to production
- During periodic accessibility audits
- When addressing accessibility complaints

## When Not To Use
- Visual design only (use figma-design skill)
- Performance optimization (use engineering domain)
- Security audit (use security domain)

## Procedure
1. Map product surface to applicable WCAG criteria.
2. Assess each criterion with pass/fail/not-applicable.
3. Document findings with specific criterion citation.
4. Prioritize remediation by user impact.
5. Produce conformance score and roadmap.

## Tool Policy
- Use `filesystem.read` to review product surfaces and code.

## Verification
- All applicable WCAG criteria assessed
- Each finding cites specific criterion
- Remediation prioritized by impact

## Source Notes
W3C WCAG 2.2, WAI-ARIA Authoring Practices, Deque axe-core rules. Reference: ref.github.design-content.2026-05-31

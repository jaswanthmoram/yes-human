---
id: legal-compliance.gdpr-compliance
name: GDPR Compliance
version: 1.0.0
domain: legal-compliance
category: legal-compliance.gdpr-compliance
purpose: Assess GDPR compliance posture, review Article 30 records, and evaluate lawful basis for processing.
summary: GDPR compliance assessment, Article 30 record review, and lawful basis evaluation.
triggers:
  - gdpr compliance check
  - review article 30 records
  - lawful basis assessment
  - gdpr gap analysis
  - data subject rights audit
aliases:
  - gdpr compliance
  - gdpr assessment
negative_keywords:
  - code compliance
  - build compliance
  - performance compliance
inputs:
  - processing_activities
  - article_30_records
  - consent_mechanisms
outputs:
  - compliance_report
  - gap_analysis
  - remediation_roadmap
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
Assess GDPR compliance posture, review Article 30 records, and evaluate lawful basis for processing.

## When To Use
- gdpr compliance check
- review article 30 records
- lawful basis assessment
- gdpr gap analysis

## When Not To Use
- code compliance belongs to a different domain
- build compliance belongs to a different domain
- performance compliance belongs to a different domain

## Procedure
1. Confirm the request matches this skill's domain.
2. Gather the required inputs: processing_activities, article_30_records, consent_mechanisms.
3. Produce the core outputs: compliance_report, gap_analysis, remediation_roadmap.
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
- "gdpr compliance check"
- "review article 30 records"
- "lawful basis assessment"

## Source Notes
- Reference: ref.github.legal-compliance.2026-05-31

---
quality_gate: production
id: legal-compliance.nda-reviewer
name: NDA Review Support
version: 1.0.0
domain: legal-compliance
category: legal-compliance.contracts
purpose: Review NDA structure, business risks, missing clauses, and negotiation questions. Not legal advice.
summary: NDA review support highlights confidentiality scope, term, exclusions, residuals, return obligations, jurisdiction, and unusual obligations for counsel review.
triggers:
  - nda review
  - nda reviewer task
  - review confidentiality agreement
  - mutual nda check
  - unilateral nda review
activation_triggers:
  - review this NDA
  - check this confidentiality agreement
prerequisites:
  - NDA text is available
  - Party roles and transaction context are known
  - Desired risk posture is defined
inputs:
  - nda_text
  - transaction_context
  - party_roles
  - risk_posture
steps:
  - Identify NDA type, parties, purpose, effective date, governing law, and term.
  - Review confidential information definition, exclusions, use limits, disclosure permissions, and return or destruction obligations.
  - Flag business-sensitive terms: residuals, non-solicit, non-compete, IP ownership, injunctive relief, and unusual audit rights.
  - Check whether obligations are mutual, one-way, or mismatched to the transaction.
  - Produce issues table with clause, risk, business impact, and counsel question.
  - Add not-legal-advice disclaimer and require attorney review before signature.
outputs:
  - nda_review_notes
  - issue_table
  - negotiation_questions
  - counsel_review_summary
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Disclaimer and counsel review gate are present
  - Clause references are included for each issue
  - Business risks are separated from legal conclusions
failure_modes:
  - Giving legal advice or signature recommendation
  - Missing one-way obligations in a mutual deal
  - Ignoring embedded non-compete or IP terms
handoffs:
  - legal-compliance.contract-reviewer
  - legal-compliance.legal-researcher
source_references:
  - ref.github.legal-compliance.nda-reviewer.2026-06-02
  - https://github.com/commonaccord/commonaccord
allowed_agents:
  - legal-compliance.nda-reviewer
status: active
budget_band: standard
rollback:
  - Revert NDA review artifact
validators:
  - skill.validator
  - disclaimer_present
---

## Procedure
1. Capture party roles, purpose, transaction context, and risk posture.
2. Review confidentiality definition, exclusions, permitted disclosures, term, and return obligations.
3. Flag unusual business terms and missing operational protections.
4. Create an issue table for counsel with clause reference and question.
5. Require attorney review before signing or sending redlines.

## Verification
- No legal conclusion is presented as final advice.
- Each issue cites a clause or missing clause.
- Counsel review is explicit.

---
quality_gate: production
id: legal-compliance.terms-drafter
name: Terms of Service Drafting Support
version: 1.0.0
domain: legal-compliance
category: legal-compliance.contracts
purpose: Draft terms-of-service structure, clause checklist, product-specific notes, and counsel review questions. Not legal advice.
summary: Terms drafting support creates a structured first draft covering account rules, acceptable use, payment, IP, disclaimers, limits, termination, and dispute process for legal review.
triggers:
  - terms of service
  - terms drafter task
  - draft terms
  - website terms draft
  - SaaS terms checklist
activation_triggers:
  - draft terms of service
  - create website terms
prerequisites:
  - Product, users, jurisdictions, and monetization model are defined
  - Privacy policy and data processing context are available
  - Counsel review owner is identified
inputs:
  - product_description
  - user_types
  - monetization_model
  - jurisdiction_scope
steps:
  - Define scope: product, users, accounts, eligibility, and incorporated policies.
  - Draft clause structure for acceptable use, user content, IP, payment, subscription, cancellation, termination, disclaimers, liability limits, and disputes.
  - Add product-specific sections for AI outputs, marketplace activity, user-generated content, or regulated content when applicable.
  - Mark jurisdiction-sensitive clauses for counsel review.
  - Create a counsel checklist and business decision list.
  - Add not-legal-advice disclaimer and require legal review before publication.
outputs:
  - terms_structure
  - draft_terms_sections
  - counsel_review_checklist
  - business_decision_list
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Disclaimer and legal review gate are present
  - Product-specific risks are called out
  - Business decisions are separated from legal drafting
failure_modes:
  - Publishing draft terms without legal review
  - Copying generic clauses that do not match the product
  - Missing payment, cancellation, or user-content rules
handoffs:
  - legal-compliance.terms-drafter
  - legal-compliance.privacy-advisor
source_references:
  - ref.github.legal-compliance.terms-drafter.2026-06-02
  - https://github.com/commonaccord/commonaccord
allowed_agents:
  - legal-compliance.terms-drafter
status: active
budget_band: standard
rollback:
  - Revert terms draft artifact
validators:
  - skill.validator
  - disclaimer_present
---

## Procedure

1. Clarify product behavior, user types, monetization, jurisdictions, and review owner.
2. Build the clause map before drafting prose.
3. Draft sections with product-specific notes and placeholders for counsel decisions.
4. Flag regulated, consumer, data, AI, payment, and user-content risks.
5. Produce counsel review checklist and publication blockers.

## Verification

- Publication is blocked pending legal review.
- Product-specific clauses match actual behavior.
- No legal advice or final enforceability claim is made.

---
id: marketing.brand-management
name: Brand Management
version: 1.0.0
domain: marketing
category: marketing.brand
purpose: Maintain brand consistency across messaging, campaigns, channels, and launch assets.
summary: Brand management checks voice, positioning, claims, visual consistency, naming, and campaign fit so public-facing work reinforces the same market identity.
triggers:
  - brand management
  - brand consistency review
  - brand voice management
  - brand identity management
  - manage brand guidelines
activation_triggers:
  - check brand consistency
  - create brand management checklist
prerequisites:
  - Brand guidelines or positioning notes are available
  - Target audience and channel are defined
  - Asset or campaign draft is available
inputs:
  - brand_guidelines
  - campaign_assets
  - audience_context
  - channel_requirements
steps:
  - Extract the brand promise, audience, voice principles, visual rules, and prohibited claims.
  - Review each asset for message consistency, tone, naming, logo use, color, typography, and claim support.
  - Flag off-brand language, unsupported claims, inconsistent hierarchy, and channel-specific risks.
  - Create a correction table with issue, severity, fix, and owner.
  - Update reusable brand guidance when a repeated issue appears.
outputs:
  - brand_consistency_report
  - correction_table
  - updated_brand_guidance
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Brand promise and audience are stated
  - Claims are supported or flagged
  - Corrections are actionable and channel-aware
failure_modes:
  - Treating personal style preference as brand rule
  - Ignoring channel constraints
  - Allowing unsupported claims in launch copy
handoffs:
  - marketing.brand-marketer
  - design-content.brand-designer
source_references:
  - ref.github.marketing.brand-management.2026-06-03
  - https://github.com/makeplane/plane
allowed_agents:
  - marketing.brand-manager
  - marketing.brand-marketer
status: active
budget_band: standard
rollback:
  - Revert brand guidance artifact
validators:
  - skill.validator
  - claim_support_check
---

## Procedure
1. Capture brand promise, audience, voice rules, visual rules, and prohibited claims.
2. Review each asset against the rules and channel constraints.
3. Classify issues as critical, important, or polish.
4. Provide exact copy or design corrections where possible.
5. Update reusable guidance only for repeated patterns.

## Verification
- Findings cite a brand rule or channel constraint.
- Unsupported claims are flagged.
- Corrections preserve the intended campaign goal.

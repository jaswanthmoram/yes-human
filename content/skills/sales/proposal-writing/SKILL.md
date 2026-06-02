---
id: sales.proposal-writing
name: Proposal Writing Framework
version: 1.0.0
domain: sales
category: sales.pipeline
purpose: Create persuasive, structured-aligned proposals that connect buyer requirements to solution value with clear commercial terms.
summary: Proposal structure, narrative design, pricing presentation, and compliance checks for winning proposals.
triggers:
  - design proposal template for mid-market segment
  - write a sales proposal
  - proposal structure design
  - proposal narrative creation
  - pricing section design
  - proposal compliance check
  - RFP response structure
aliases:
  - proposal writing
  - proposal creation
  - bid writing
negative_keywords:
  - legal contract drafting
  - marketing brochure
  - technical specification
inputs:
  - buyer_requirements
  - solution_scope
  - pricing_framework
outputs:
  - proposal_structure
  - narrative_draft
  - pricing_presentation
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Writes proposal without addressing all buyer requirements
  - Buries pricing in narrative instead of presenting clearly
  - Skips compliance check against RFP criteria
verification:
  - All buyer requirements addressed
  - Pricing presented clearly and transparently
  - Compliance check against RFP or buyer criteria
source_references:
  - ref.github.sales.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Create persuasive, structure-aligned proposals that connect buyer requirements to solution value with clear commercial terms.

## When To Use
- Writing proposals for active deals
- Designing proposal templates for sales teams
- Structuring RFP responses
- Creating pricing presentation sections

## When Not To Use
- Legal contract drafting belongs to legal-compliance
- Marketing brochures belong to marketing
- Technical specifications belong to engineering

## Procedure
1. Map buyer requirements to proposal sections.
2. Design the proposal narrative with executive summary, solution, and value sections.
3. Present pricing clearly with options and justification.
4. Include proof points, case studies, and social proof.
5. Run compliance check against RFP or buyer criteria.
6. Identify open questions and assumptions for the buyer.

## Tool Policy
- Use `filesystem.read` to access buyer requirements and pricing frameworks.
- Use `filesystem.write` to save proposal drafts and templates.

## Verification
- All buyer requirements have corresponding proposal sections
- Pricing section is clear, transparent, and easy to find
- Compliance checklist completed against buyer criteria

## Failure Modes
- Missing buyer requirements in proposal sections
- Hiding pricing in dense narrative
- Skipping compliance check for RFP responses

## Example Routes
- "write a proposal for enterprise analytics deal"
- "design proposal template for mid-market segment"
- "structure an RFP response for government buyer"

## Source Notes
- Shipley Associates proposal methodology
- Reference: ref.github.sales.2026-05-31

---
id: education.educational-research
name: Educational Research Methods
version: 1.0.0
domain: education
category: education.research
purpose: Design and conduct educational research using appropriate methodologies, ethical protocols, and evidence synthesis for practice improvement.
summary: Educational research design with methodology selection, ethical review protocols, data collection plans, and evidence synthesis.
triggers:
  - educational research design
  - education study methodology
  - action research plan
  - education literature review
  - research ethics education
aliases:
  - education research
  - ed research methods
negative_keywords:
  - clinical trial design
  - market research
  - user research
inputs:
  - research_question
  - study_context
  - ethical_requirements
outputs:
  - research_design
  - data_collection_plan
  - ethics_protocol
allowed_tools:
  - filesystem.read
  - filesystem.write
required_skills: []
budget_band: standard
max_context_tokens: 8000
failure_modes:
  - Designs research without ethical review
  - Methodology not matched to research question
  - Omits limitations and validity threats
verification:
  - Ethics review documented
  - Methodology justified
  - Limitations acknowledged
source_references:
  - ref.github.education.2026-05-31
quality_gate: staging
status: active
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Mission
Design and conduct educational research using appropriate methodologies, ethical protocols, and evidence synthesis to improve teaching and learning practice.

## When To Use
- Designing educational research studies
- Selecting methodologies for research questions
- Planning action research in educational settings
- Conducting literature reviews for education topics

## When Not To Use
- Clinical trial design belongs to healthcare domain
- Market research belongs to marketing domain
- User research belongs to product-business domain

## Procedure
1. Formulate clear research question with educational significance.
2. Select appropriate methodology (quantitative, qualitative, mixed).
3. Design data collection plan with validity considerations.
4. Complete ethical review protocol (IRB/ethics board).
5. Plan data analysis aligned to methodology.
6. Acknowledge limitations and threats to validity.

## Tool Policy
- Use `filesystem.read` to access literature and institutional data.
- Use `filesystem.write` to save research designs and protocols.

## Verification
- Ethics review protocol completed and documented
- Methodology justified in relation to research question
- Limitations and validity threats explicitly acknowledged

## Failure Modes
- Designing research without ethical review process
- Selecting methodology that does not fit the research question
- Omitting limitations and validity threats from the design

## Example Routes
- "educational research design for flipped classroom study"
- "action research plan for reading intervention"
- "education literature review on formative assessment"

## Source Notes
- Creswell's research design frameworks
- AERA ethical standards for research
- What Works Clearinghouse procedures
- Reference: ref.github.education.2026-05-31

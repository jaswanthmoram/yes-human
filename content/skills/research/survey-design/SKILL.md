---
id: research.survey-design
name: Survey Design
version: 1.0.0
category: research.data-collection
summary: Designs survey instruments with question wording, response scales, sampling strategy, and pilot testing protocols.
triggers:
  - survey instrument design
  - questionnaire creation
  - survey methodology planning
  - pilot survey testing
  - response scale development
prerequisites:
  - research_question_defined
steps:
  - define survey objectives and target population
  - draft question items with appropriate scales
  - review for bias and clarity
  - design sampling strategy
  - create pilot testing protocol
outputs:
  - survey_instrument
  - sampling_plan
  - pilot_protocol
budget_band: standard
rollback:
  - archive draft instrument versions
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a research task requires designing a survey or questionnaire for data collection from human respondents.

## Prerequisites
- A clearly defined research question the survey aims to answer.
- Identification of the target population.

## Steps
1. Define survey objectives and the target population characteristics.
2. Draft question items using validated scales where available.
3. Review all items for leading language, double-barreled questions, and clarity.
4. Design the sampling strategy including sample size calculation.
5. Create a pilot testing protocol with cognitive interviewing steps.

## Verification
- All items map to a specific research objective.
- Pilot testing protocol includes revision criteria.

## Rollback
- Archive draft instrument versions for reference.

## Common Failures
- Leading or ambiguous question wording.
- Insufficient sample size for planned analyses.

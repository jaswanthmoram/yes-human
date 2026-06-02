---
id: product-business.jobs-to-be-done
name: Jobs to Be Done Framework
version: 1.0.0
domain: product-business
category: product-business.discovery
purpose: Apply the Jobs to Be Done framework to uncover customer motivations and design products around real needs.
summary: Guides through JTBD interviews, job statements, and switch interviews to identify core customer jobs.
triggers:
  - jobs to be done
  - jtbd framework
  - job statement
  - switch interview
activation_triggers:
  - apply jtbd
  - what job are they hiring
  - customer motivation analysis
prerequisites:
  - access to customer segments or interview subjects
  - product or feature context
inputs:
  - customer_segment
  - product_context
  - existing_research (optional)
steps:
  - Define the core job using When/Situation/Then format
  - Identify functional, emotional, and social job dimensions
  - Conduct switch interviews or analyze existing data
  - Map job steps and pain points
  - Identify underserved outcomes and opportunities
  - Translate jobs into product requirements
outputs:
  - job_statements
  - job_map
  - opportunity_areas
tools:
  - filesystem.read
quality_gates:
  - Job statements capture situation and desired outcome
  - Functional, emotional, and social dimensions addressed
  - Opportunities linked to underserved outcomes
failure_modes:
  - Confusing jobs with features or solutions
  - Skipping emotional and social dimensions
  - Not connecting jobs to product decisions
handoffs:
  - product-business.user-researcher (for interview execution)
  - product-business.product-manager (for PRD translation)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-strategist
  - product-business.user-researcher
  - product-business.master
allowed_workflows:
  - product-business.product-discovery
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when applying the Jobs to Be Done framework to understand customer motivations.

## Prerequisites
- Access to customer segments or interview subjects
- Product or feature context

## Steps
1. **Define Core Job**: Use When [situation], I want to [motivation], so I can [expected outcome].
2. **Map Dimensions**: Identify functional, emotional, and social aspects of the job.
3. **Conduct Interviews**: Run switch interviews or analyze existing customer data.
4. **Map Job Steps**: Break the job into discrete steps with pain points.
5. **Identify Opportunities**: Find underserved outcomes using importance/satisfaction matrix.
6. **Translate to Requirements**: Convert opportunity areas into product requirements.

## Verification
- Job statements are situation-based, not solution-based
- All three dimensions (functional, emotional, social) are addressed
- Opportunities are prioritized by underserved score

## Rollback
- No state changes; this is a discovery skill

## Common Failures
- Writing job statements that describe features instead of needs
- Ignoring emotional and social job dimensions
- Not connecting findings to actionable product decisions

## Examples
### Job Statement
When I'm onboarding a new team member, I want to share project context quickly, so I can get them productive within their first week.

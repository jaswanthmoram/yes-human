---
id: product-business.usability-testing
name: Usability Testing
version: 1.0.0
domain: product-business
category: product-business.research
purpose: Plan and run usability tests to identify UX issues and validate design decisions with real users.
summary: Guides through task-based usability testing including planning, moderation, and severity-rated findings.
triggers:
  - usability test
  - usability testing
  - user testing
  - ux test
activation_triggers:
  - test usability
  - run a usability test
  - validate with users
prerequisites:
  - prototype or live product to test
  - defined tasks and success criteria
inputs:
  - test_objectives
  - tasks
  - participant_criteria
steps:
  - Define test objectives and success metrics
  - Create task scenarios with success criteria
  - Recruit representative participants
  - Moderate sessions with think-aloud protocol
  - Rate findings by severity (critical/major/minor)
  - Produce findings report with recommendations
outputs:
  - test_plan
  - findings_report
  - severity_rated_issues
tools:
  - filesystem.read
quality_gates:
  - Tasks are realistic and scenario-based
  - Findings rated by severity with evidence
  - Recommendations are specific and actionable
failure_modes:
  - Tasks that are too abstract or leading
  - Not capturing severity of issues
  - Testing with non-representative users
handoffs:
  - product-business.product-designer (for design fixes)
  - product-business.user-researcher (for broader research)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.user-researcher
  - product-business.product-designer
  - product-business.master
allowed_workflows:
  - product-business.user-research-process
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when validating designs or identifying usability issues through user testing.

## Prerequisites
- Prototype or live product to test
- Defined tasks and success criteria

## Steps
1. **Define Objectives**: What UX questions need answering?
2. **Create Tasks**: 5-8 realistic scenario-based tasks with success criteria.
3. **Recruit**: 5 participants per segment (Nielsen's rule).
4. **Moderate**: Think-aloud protocol, observe without guiding.
5. **Rate Findings**: Critical (blocks task), Major (significant friction), Minor (cosmetic/annoyance).
6. **Report**: Severity-rated findings with video clips and recommendations.

## Verification
- Tasks completed with measurable success rates
- Findings include severity ratings
- Recommendations are specific to each issue

## Rollback
- No state changes; this is a research skill

## Common Failures
- Testing with internal team members only
- Not defining success criteria for tasks
- Reporting findings without severity context

## Examples
### Task Scenario
"Imagine you just signed up for a new project. Create a project called 'Q4 Launch' and invite two team members to collaborate."
Success: Project created and invitations sent within 3 minutes.

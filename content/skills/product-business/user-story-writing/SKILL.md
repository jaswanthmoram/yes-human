---
id: product-business.user-story-writing
name: User Story Writing
version: 1.0.0
domain: product-business
category: product-business.requirements
purpose: Write well-structured user stories with acceptance criteria following industry-standard formats.
summary: Guides through creating user stories using the As-a/I-want/So-that format with testable acceptance criteria.
triggers:
  - write user stories
  - create user story
  - user story format
  - story with acceptance criteria
activation_triggers:
  - write stories for
  - create user stories
  - story writing session
prerequisites:
  - understanding of feature or requirement scope
  - knowledge of target user segments
inputs:
  - feature_description
  - user_segment
  - acceptance_criteria (optional)
steps:
  - Identify the user persona and their goal
  - Write the story using As-a/I-want/So-that format
  - Define testable acceptance criteria using Given/When/Then
  - Add story points or complexity estimate
  - Identify dependencies and edge cases
  - Review for INVEST criteria compliance
outputs:
  - user_stories
  - acceptance_criteria
  - story_map
tools:
  - filesystem.read
quality_gates:
  - All stories follow INVEST criteria
  - Acceptance criteria are testable
  - Stories are independently deliverable
failure_modes:
  - Writing stories that are too large or vague
  - Missing acceptance criteria
  - Not considering edge cases
handoffs:
  - product-business.feature-prioritizer (for backlog ordering)
  - product-business.roadmap-planner (for timeline placement)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.product-manager
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
Use this skill when writing user stories for features, epics, or product requirements.

## Prerequisites
- Clear understanding of the feature or requirement
- Knowledge of target user segments and personas

## Steps
1. **Identify Persona**: Determine who the user is and what role they play.
2. **Write Story**: Use the format: As a [persona], I want [goal], so that [benefit].
3. **Define Acceptance Criteria**: Write Given/When/Then scenarios for each story.
4. **Estimate Complexity**: Add story points or T-shirt sizing.
5. **Identify Dependencies**: Note blockers and related stories.
6. **INVEST Review**: Verify stories are Independent, Negotiable, Valuable, Estimable, Small, Testable.

## Verification
- Each story passes INVEST criteria
- Acceptance criteria are specific and testable
- Stories can be independently delivered

## Rollback
- No state changes; this is a planning skill

## Common Failures
- Stories too large to fit in a sprint
- Vague acceptance criteria that cannot be tested
- Missing non-functional requirements

## Examples
### Feature: User Authentication
Story: As a registered user, I want to reset my password via email, so that I can regain access to my account.
Acceptance Criteria:
- Given I am on the login page, When I click "Forgot Password", Then I see the password reset form
- Given I enter a valid email, When I submit, Then I receive a reset link within 5 minutes

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

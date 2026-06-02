---
id: product-business.user-interviews
name: User Interviews
version: 1.0.0
domain: product-business
category: product-business.research
purpose: Plan and conduct user interviews that yield actionable insights for product decisions.
summary: Guides through interview planning, script creation, execution, and synthesis of user interview findings.
triggers:
  - user interviews
  - customer interviews
  - interview guide
  - interview synthesis
activation_triggers:
  - plan user interviews
  - interview script
  - talk to users
prerequisites:
  - defined research questions
  - access to target user segment
inputs:
  - research_questions
  - target_segment
  - interview_count
steps:
  - Define research objectives and questions
  - Create semi-structured interview guide
  - Recruit participants from target segment
  - Conduct interviews with active listening
  - Transcribe and code findings
  - Synthesize themes and actionable insights
outputs:
  - interview_guide
  - findings_synthesis
  - actionable_insights
tools:
  - filesystem.read
quality_gates:
  - Interview guide covers research questions without leading
  - Findings are coded and themed systematically
  - Insights are actionable and linked to product decisions
failure_modes:
  - Leading questions that bias responses
  - Small or unrepresentative sample
  - Findings without actionable recommendations
handoffs:
  - product-business.user-researcher (for broader research planning)
  - product-business.product-manager (for insight-to-PRD translation)
source_references:
  - ref.github.product-business.2026-05-31
allowed_agents:
  - product-business.user-researcher
  - product-business.product-manager
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
Use this skill when planning or conducting user interviews.

## Prerequisites
- Defined research questions
- Access to target user segment

## Steps
1. **Define Objectives**: What decisions will this research inform?
2. **Create Guide**: Semi-structured questions, open-ended, non-leading.
3. **Recruit**: 5-8 participants per segment for saturation.
4. **Conduct**: Active listening, follow-up probes, avoid leading.
5. **Code**: Tag transcripts with themes and patterns.
6. **Synthesize**: Identify top themes, quotes, and actionable insights.

## Verification
- Interview guide reviewed for bias
- Findings coded systematically
- Insights linked to product decisions

## Rollback
- No state changes; this is a research skill

## Common Failures
- Asking leading or yes/no questions
- Interviewing too few participants
- Reporting quotes without synthesis

## Examples
### Interview Question
Bad: "Do you like our new dashboard?"
Good: "Walk me through the last time you checked your project status. What did you do?"

---
id: startup-ops.customer-interviews
name: Customer Interview Framework
version: 1.0.0
domain: startup-ops
category: startup-ops.validation
purpose: Structure and conduct customer discovery interviews following The Mom Test methodology.
summary: Provides interview guide templates, question frameworks, and synthesis methods for customer discovery.
triggers:
  - customer interview
  - discovery interview
  - user interview startup
activation_triggers:
  - customer interview
  - discovery interview
  - user interview startup
prerequisites:
  - clear business context
  - defined target customer or market
inputs:
  - business_context
  - target_customer
steps:
  - Define interview goals and hypotheses
  - Create structured interview guide
  - Recruit interview participants
  - Conduct interviews following Mom Test rules
  - Record and transcribe key insights
  - Synthesize findings across interviews
  - Update hypotheses based on evidence
outputs:
  - interview_guide
  - findings_report
  - hypothesis_updates
tools:
  - filesystem.write (output documents)
quality_gates:
  - Evidence-based recommendations
  - Clear assumptions documented
  - Actionable next steps
failure_modes:
  - Asks leading questions that confirm bias
  - Skips synthesis across interviews
  - Confuses opinions with facts in findings
handoffs:
  - startup-ops.customer-development
  - startup-ops.market-validation
source_references:
  - ref.github.startup-ops.2026-05-31
allowed_agents:
  - startup-ops.startup-strategist
  - startup-ops.business-model-designer
  - startup-ops.customer-development
allowed_workflows:
  - startup-ops.business-model-validation
status: active
budget_band: standard
rollback:
  - No state changes to rollback
validators:
  - skill.validator
---

## Trigger
Use this skill when customer interview or related tasks are needed.

## Prerequisites
- Clear business context and defined target customer or market
- Understanding of current company stage and goals

## Steps
1. **Define interview goals and hypotheses**: define interview goals and hypotheses with evidence and documentation.
2. **Create structured interview guide**: create structured interview guide with evidence and documentation.
3. **Recruit interview participants**: recruit interview participants with evidence and documentation.
4. **Conduct interviews following Mom Test rules**: conduct interviews following mom test rules with evidence and documentation.
5. **Record and transcribe key insights**: record and transcribe key insights with evidence and documentation.
6. **Synthesize findings across interviews**: synthesize findings across interviews with evidence and documentation.
7. **Update hypotheses based on evidence**: update hypotheses based on evidence with evidence and documentation.

## Verification
- All outputs are evidence-based
- Assumptions are explicitly documented
- Next steps are actionable and prioritized

## Rollback
- No state changes; this is a planning/analysis skill

## Common Failures
- Asks leading questions that confirm bias
- Skips synthesis across interviews
- Confuses opinions with facts in findings

## Examples
### Customer Interview Framework Example
Input: customer interview for a B2B SaaS startup
Output:
- interview_guide with evidence-based entries
- findings_report with prioritized items
- hypothesis_updates with clear next steps
## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

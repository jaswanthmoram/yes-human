---
quality_gate: production
id: product-business.ceo-advisor
name: CEO Advisory and Company Strategy
version: 1.0.0
domain: product-business
category: product-business.strategy
purpose: Provide CEO-level strategic guidance on company direction, resource allocation, board narrative, and investor communication.
summary: CEO advisory work spans: setting company direction, reviewing OKRs, preparing board narratives, managing investor expectations, and making resource allocation decisions. This skill provides structured frameworks for each. Not financial advice.
triggers:
  - ceo advisory session
  - company direction review
  - board narrative prep
  - investor update strategy
  - vision strategy
activation_triggers:
  - I need help thinking through company direction
  - we have a board meeting next week
prerequisites:
  - Current company metrics and context available
  - Strategic questions or decisions to work through
inputs:
  - company_context
  - strategic_questions
  - metrics_snapshot
steps:
  - Restate the strategic question clearly — vague questions produce vague answers
  - Gather the relevant data: current metrics, runway, team capacity, competitive landscape
  - Apply a strategic framework (Jobs to be Done, MECE analysis, opportunity matrix) appropriate to the decision
  - Identify 2-3 options with explicit trade-offs — never recommend without alternatives
  - State the recommended option with rationale anchored in data and stated assumptions
  - Prepare the communication artifact: board slide, investor update, or team memo
outputs:
  - strategic_recommendation
  - board_narrative
  - investor_update_draft
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Recommendation anchored in data, not opinion
  - Alternatives considered and documented
  - Communication artifact audience-appropriate
  - Assumptions explicitly stated
failure_modes:
  - Vague strategic advice without data anchor
  - Single recommendation without alternatives
  - Board narrative that confuses instead of informs
handoffs:
  - finance.master (for financial modeling)
  - product-business.product-manager (for product roadmap execution)
source_references:
  - https://github.com/garrytan/gstack
  - https://github.com/makeplane/plane
allowed_agents:
  - product-business.master
  - startup-ops.master
status: active
budget_band: expanded
rollback:
  - Strategy documents are artifacts — no system changes to revert
validators:
  - skill.validator
---
## Trigger
Use for high-level strategic decisions: company direction, resource allocation, board preparation, investor communication.

## Prerequisites
- Company metrics and context provided
- Strategic question clearly defined

## Steps

### 1. Clarify the Question
"What should we do?" is not a question. Restate as: "Given X constraint and Y goal, should we choose A or B?" Clarity in the question drives clarity in the answer.

### 2. Gather Data
Collect: current ARR/MRR, burn rate, runway, headcount, NPS, competitive signals. Don't strategize on assumptions when data is available.

### 3. Apply a Framework
For market decisions: Jobs to be Done. For resource decisions: opportunity matrix (impact vs effort). For board narrative: MECE (mutually exclusive, collectively exhaustive).

### 4. Generate Options
Always present 2-3 alternatives with explicit trade-offs. Never "the answer is X" without "compared to alternatives Y and Z."

### 5. Recommend with Rationale
State the recommendation, the assumptions it rests on, and what would change the recommendation. Quantify where possible.

### 6. Craft the Communication
Board slide: headline-first (conclusion at top), supporting data below. Investor update: wins, learnings, ask. Team memo: context → decision → rationale → next steps.

## Verification
- [ ] Decision anchored in data
- [ ] Alternatives documented
- [ ] Assumptions explicit
- [ ] Communication artifact ready

## Rollback
Strategic documents are outputs — no system changes.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| Advice not actionable | Question too vague | Clarify decision criteria first |
| Board confused | Too much detail | Headline-first structure |
| Assumptions hidden | Presenter knows context, board doesn't | State every assumption |

## Examples
**Example A:** "Should we expand to Europe or deepen US penetration?" — Framework: opportunity matrix, risk-adjusted return.
**Example B:** Board prep for down round: honest narrative, data-driven recovery plan, clear ask.

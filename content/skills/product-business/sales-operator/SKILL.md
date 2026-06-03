---
quality_gate: production
id: product-business.sales-operator
name: Sales Operations
version: 1.0.0
domain: product-business
category: product-business.operations
purpose: Design and optimize sales processes, pipeline velocity, CRM hygiene, and deal review cadence.
summary: Sales operations bridges sales strategy and execution: process design, CRM hygiene, pipeline velocity metrics, deal review cadence, quota setting, and sales tool evaluation. Focused on repeatability and measurement.
triggers:
  - sales operations
  - sales process design
  - crm hygiene
  - pipeline velocity
  - deal review cadence
activation_triggers:
  - our sales process is inconsistent
  - we need to improve pipeline visibility
prerequisites:
  - CRM system in place (Salesforce, HubSpot, Twenty, etc.)
  - Sales team defined with quotas
inputs:
  - current_sales_process
  - crm_data
  - quota_targets
steps:
  - Audit current CRM hygiene: deal stages defined, stage exit criteria documented, fields consistently populated
  - Define pipeline velocity formula: (# deals × avg deal size × win rate) ÷ sales cycle length
  - Set up pipeline review cadence: weekly deal reviews focused on at-risk and next-stage deals
  - Define deal stage exit criteria — specific, observable actions required to advance (not subjective "good call")
  - Build rep performance dashboard: pipeline coverage ratio (3x quota), conversion by stage, average sales cycle
  - Implement quota attainment tracking and identify coaching opportunities for below-target reps
outputs:
  - sales_process_document
  - crm_hygiene_scorecard
  - pipeline_velocity_dashboard
  - deal_review_agenda
tools:
  - filesystem.read
  - filesystem.write
quality_gates:
  - Deal stage exit criteria documented for every stage
  - Pipeline coverage ratio ≥3x per rep
  - CRM data completeness ≥90% on required fields
failure_modes:
  - Subjective stage advancement criteria
  - Pipeline reviews focused on status updates not problem-solving
  - CRM data ignored because it's incomplete
handoffs:
  - sales.master (for deal-level guidance)
  - product-business.master (for GTM strategy)
source_references:
  - https://github.com/TwentyHQ/twenty
  - https://github.com/makeplane/plane
allowed_agents:
  - sales.master
  - product-business.master
status: active
budget_band: standard
rollback:
  - Process documents are artifacts — no system changes unless CRM was modified
validators:
  - skill.validator
---
## Trigger
Use when sales process is inconsistent, CRM data is unreliable, or pipeline reviews are not driving action.

## Prerequisites
- CRM system accessible
- Current sales process documented (even informally)

## Steps

### 1. Audit CRM Hygiene
Check required field completion rate. Look at deal ages (stale deals >90 days). Identify reps not updating stages.

### 2. Define Stage Exit Criteria
For each deal stage, write a specific, observable action required to advance: not "good call" but "sent pricing proposal and received verbal acknowledgment of budget."

### 3. Calculate Pipeline Velocity
`(deals in pipeline × avg deal size × win rate) ÷ avg sales cycle`. This number tells you if you have enough pipeline to hit quota.

### 4. Set Review Cadence
Weekly: 30-min deal reviews focused on at-risk and next-30-day deals. Monthly: pipeline coverage review. Quarterly: win/loss analysis.

### 5. Build Dashboards
Rep dashboard: pipeline coverage (target 3x quota), conversion rate by stage, avg sales cycle. Manager dashboard: team pipeline health.

### 6. Identify Coaching Opportunities
Reps below 70% quota attainment get structured coaching. Focus on the stage with highest drop-off rate in their pipeline.

## Verification
- [ ] Stage exit criteria documented
- [ ] Pipeline coverage ≥3x per rep
- [ ] CRM required fields ≥90% complete

## Rollback
Process documents only — revert CRM changes via CRM audit log if needed.

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| CRM not maintained | No enforcement | Make CRM update required for commission |
| Subjective stages | Vague criteria | Rewrite with observable actions |
| Pipeline reviews = status updates | No problem-solving focus | Change agenda: "What's blocking this deal?" |

## Examples
**Example A:** Discovery → Demo → Proposal → Contract → Closed. Each stage has 3 specific exit criteria.
**Example B:** Pipeline velocity analysis shows 40% drop at Proposal stage — investigate pricing and proposal quality.

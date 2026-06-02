# Phase 8 Completion Plan

**Status:** Ready for execution
**Created:** 2026-06-01
**Current State:** 74 agents, 18 workflows, 19 category packs, 16 connectors

---

## Gap Analysis

### Gap 1: 5 Categories Missing Workflows
| Category | Specialists | Workflows | Connectors |
|----------|------------|-----------|------------|
| startup-ops | 3 | 0 | 0 |
| research | 3 | 0 | 3 |
| healthcare | 3 | 0 | 0 |
| education | 3 | 0 | 0 |
| manufacturing | 3 | 0 | 0 |

### Gap 2: 13 Specialist Agents Missing (Wave 4 target: 5 per category)
| Category | Has | Missing |
|----------|-----|---------|
| security | 3 | dependency-risk-agent |
| data-ai | 3 | graph-rag-engineer |
| integrations | 3 | sourcegraph-context-agent |
| product-business | 3 | partnerships-advisor |
| finance | 3 | cfo-advisor |
| marketing | 3 | email-marketer |
| sales | 3 | competitive-intel-analyst |
| hr | 3 | compensation-analyst |
| design-content | 3 | brand-strategist |
| platform | 3 | observability-engineer |
| meta-system | 3 | deduplicator, stub-detector |

### Gap 3: legal-compliance Has No Connectors

---

## Sub-Wave 8A: Research (COMPLETED)

Research sources identified using firecrawl and exa for all 5 workflows and 13 agents.

### Workflow Research Sources

**startup-ops.ceo-review-pack:**
- https://travismay.medium.com/building-the-right-operating-cadence-6c608fd142e1
- https://buildtoscale.substack.com/p/setting-the-right-meeting-cadence
- https://proassisting.com/resources/articles/ceo-schedule/

**research.deep-research-synthesis:**
- https://github.com/masamisa59/ai-agent-papers/blob/main/application-papers/deep-research-agents.md
- https://docs.langchain.com/oss/python/deepagents/deep-research
- https://www.reddit.com/r/AI_Agents/comments/1lvfcpk/how_we_built_a_researcher_agent_technical/

**healthcare.clinical-guideline-review:**
- https://pmc.ncbi.nlm.nih.gov/articles/PMC10788252/
- https://gradepro.org/handbook/
- https://guides.library.stonybrook.edu/evidence-based-medicine/levels_of_evidence

**education.curriculum-assessment-alignment:**
- https://files.ascd.org/staticfiles/ascd/pdf/siteASCD/publications/UbD_WhitePaper0312.pdf
- https://pmc.ncbi.nlm.nih.gov/articles/PMC10728343/

**manufacturing.demand-inventory-balancing:**
- https://demand-planning.com/2025/05/05/demand-planning-101-the-basics/
- https://www.sap.com/resources/sop-sales-and-operations-planning
- https://www.wolterskluwer.com/en/expert-insights/mps-mrp-drp-help-supply-chains

### Agent Research Sources

**security.dependency-risk-agent:**
- https://owasp.org/www-project-dependency-check/
- https://checkmarx.com/learn/sca/12-software-composition-analysis-best-practices/

**data-ai.graph-rag-engineer:**
- https://www.microsoft.com/en-us/research/project/graphrag/
- https://graphrag.com/concepts/intro-to-graphrag/

**integrations.sourcegraph-context-agent:**
- https://sourcegraph.com/blog/towards-infinite-context-for-code
- https://sourcegraph.com/

**product-business.partnerships-advisor:**
- https://theb2bplaybook.com/b2b-partnerships
- https://angaddhaliwal.com/strategic-partnership-strategy/

**finance.cfo-advisor:**
- https://www.cfgi.com/solutions/financial-planning-analysis/
- https://www.mccrackenalliance.com/blog/financial-planning-and-analysis-fp-a-a-guide-for-finance-professionals

**marketing.email-marketer:**
- https://www.allegrow.co/knowledge-base/can-spam-act-compliance-guide
- https://zepic.com/article/email-marketing-in-2026-navigating-the-new-rules-of-deliverability-and-data-privacy

**sales.competitive-intel-analyst:**
- https://klue.com/blog/win-loss-analysis-guide
- https://proponentapp.com/blog/win-loss-analysis-and-competitive-intelligence

**hr.compensation-analyst:**
- https://www.outsolve.com/blog/compensation-benchmarking-complete-guide
- https://worldatwork.org/publications/workspan-daily/compensation-benchmarking-the-what-why-and-how

**design-content.brand-strategist:**
- https://vivaldigroup.com/brand-architecture-types-models-strategic-frameworks/
- https://www.designbridge.com/insights/building-brand-strategy

**platform.observability-engineer:**
- https://oneuptime.com/blog/post/2026-02-06-slo-monitoring-opentelemetry-metrics/view
- https://medium.com/@sajal.devops/the-sre-observability-playbook-from-monitoring-to-mastery-2ec22c32cf40

**meta-system.deduplicator:**
- https://arxiv.org/html/2410.01141v3
- https://galileo.ai/blog/semantic-textual-similarity-metric

**meta-system.stub-detector:**
- https://www.codeant.ai/blogs/code-quality-metrics-to-track
- https://blog.codacy.com/code-quality-metrics

---

## Sub-Wave 8B: Content Creation

### Step 1: Create 5 Workflow JSONs

Each workflow goes in `content/workflows/<category>/<id>.json` following the exact format of `content/workflows/sales/deal-review.json`.

**5 workflows to create:**

1. `content/workflows/startup-ops/ceo-review-pack.json`
2. `content/workflows/research/deep-research-synthesis.json`
3. `content/workflows/healthcare/clinical-guideline-review.json`
4. `content/workflows/education/curriculum-assessment-alignment.json`
5. `content/workflows/manufacturing/demand-inventory-balancing.json`

### Step 2: Create 5 Workflow Dossiers

Each dossier goes in `references/workflows/<category>/<id>.sources.json` following the format of `references/workflows/sales/deal-review.sources.json`.

### Step 3: Create 13 Agent MDs

Each agent goes in `content/agents/<category>/<id>.md` following the format of `content/agents/sales/pipeline-analyst.md`.

**13 agents to create:**

1. `content/agents/security/dependency-risk-agent.md`
2. `content/agents/data-ai/graph-rag-engineer.md`
3. `content/agents/integrations/sourcegraph-context-agent.md`
4. `content/agents/product-business/partnerships-advisor.md`
5. `content/agents/finance/cfo-advisor.md`
6. `content/agents/marketing/email-marketer.md`
7. `content/agents/sales/competitive-intel-analyst.md`
8. `content/agents/hr/compensation-analyst.md`
9. `content/agents/design-content/brand-strategist.md`
10. `content/agents/platform/observability-engineer.md`
11. `content/agents/meta-system/deduplicator.md`
12. `content/agents/meta-system/stub-detector.md`

### Step 4: Create 13 Agent Dossiers

Each dossier goes in `references/<category>/<id>.sources.json` following the format of `references/engineering/code-reviewer.sources.json`.

### Step 5: Add Workflow Fixtures

Add 10 new fixtures (2 per workflow) to `tests/workflows/phase8.fixtures.json`.

### Step 6: Add Route Fixtures

Create new fixture files or add to existing ones in `tests/routing/`:
- `tests/routing/phase8-new-agents.fixtures.json` with 2 fixtures per new agent (26 total)

### Step 7: Recompile

Run `node packages/yes-cli/commands/compile.js` to regenerate:
- `registry/agents.json`
- `registry/workflows.json`
- `registry/routes.json`
- `graph/indexes/ROUTE_TABLE.min.json`
- `graph/indexes/ALIAS_TABLE.min.json`
- `graph/indexes/WORKFLOW_CACHE.min.json`
- `registry/category-packs.json`

---

## Sub-Wave 8C: Connector & Acceptance

### Step 1: Connector Updates

Consider adding a document-parsing connector for legal-compliance:
```json
{
  "id": "document-parser",
  "provider": "markitdown",
  "kind": "local",
  "purpose": "Document parsing for contract and compliance review.",
  "required_auth": false,
  "trust_level": "reviewed",
  "allowed_agents": ["legal-compliance.contract-reviewer", "legal-compliance.privacy-advisor"],
  "allowed_workflows": ["legal-compliance.contract-risk-review"],
  "cost_profile": "low",
  "enabled": true
}
```

### Step 2: Full Validation

```bash
npm run validate
npm test
npm run eval:cost
node packages/yes-cli/index.js eval workflow
node packages/yes-cli/index.js eval route
```

### Step 3: Regenerate Acceptance Report

```bash
npm run report:phase8
```

---

## Expected Final State

| Metric | Before | After |
|--------|--------|-------|
| Agents | 74 | 87 |
| Workflows | 18 | 23 |
| Categories with workflows | 13/19 | 18/19 |
| Route fixtures | 403 | ~455+ |
| Workflow fixtures | 36 | 46 |
| Boot cost | 69 tokens | <= 180 |

---

## Detailed File Contents

### Workflow: startup-ops.ceo-review-pack

```json
{
  "id": "startup-ops.ceo-review-pack",
  "version": "1.0.0",
  "status": "active",
  "summary": "Assemble a structured CEO review or office-hours decision pack with priorities, blockers, and recommended decisions.",
  "task_family": "executive_review",
  "triggers": ["ceo review pack", "office hours prep", "founder decision brief", "executive review summary", "startup ops review"],
  "aliases": ["ceo review", "office hours pack"],
  "negative_keywords": ["code review", "financial forecast", "contract review"],
  "inputs": [
    {"name": "review_scope", "required": true, "description": "Topics, decisions, or updates to cover in the review."},
    {"name": "blockers_and_risks", "required": true, "description": "Known blockers, risks, or open questions requiring executive input."},
    {"name": "metrics_snapshot", "required": false, "description": "Key metrics, KPIs, or progress indicators for the review period."}
  ],
  "outputs": [
    {"name": "decision_pack", "description": "Prioritized list of decisions needed with recommended actions."},
    {"name": "blocker_summary", "description": "Blockers with owners, severity, and proposed unblocking steps."},
    {"name": "review_notes", "description": "Contextual notes and metrics for the review session."}
  ],
  "primary_agent": "startup-ops.ceo-rethink",
  "route": {
    "domain_master": "startup-ops.master",
    "agents": ["startup-ops.ceo-rethink", "startup-ops.qa"],
    "primary_agent": "startup-ops.ceo-rethink",
    "participants": ["startup-ops.qa"],
    "parallel": false,
    "max_parallel_agents": 2
  },
  "budget": {"band": "standard", "max_context_tokens": 3000, "max_tool_calls": 8},
  "gates": [
    {"id": "pre-route", "rule": "Confirm the task is executive review support, not financial forecasting or legal review."},
    {"id": "pre-tool", "rule": "Require scope and blockers before assembling the pack."},
    {"id": "on-task-complete", "rule": "Output must be concise enough for a 30-minute review session."}
  ],
  "steps": [
    {"id": "scope-review", "agent": "startup-ops.ceo-rethink", "action": "Organize topics into decisions-needed, updates, and discussion items."},
    {"id": "assess-blockers", "agent": "startup-ops.ceo-rethink", "action": "Rank blockers by severity and assign proposed owners and unblocking actions."},
    {"id": "quality-check", "agent": "startup-ops.qa", "action": "Verify the pack is complete, concise, and free of stale or duplicated items."},
    {"id": "assemble-pack", "agent": "startup-ops.ceo-rethink", "action": "Merge decisions, blockers, and metrics into a single review document."}
  ],
  "tools": [
    {"name": "filesystem.read", "purpose": "Read status updates, metrics exports, and prior review notes."},
    {"name": "filesystem.write", "purpose": "Save the assembled review pack."}
  ],
  "verification": [
    {"id": "decisions-prioritized", "method": "Check that decisions are ranked by urgency with recommended actions."},
    {"id": "blockers-have-owners", "method": "Check each blocker has a named owner and proposed next step."},
    {"id": "pack-is-concise", "method": "Check the pack fits a 30-minute review window."}
  ],
  "success_criteria": [
    "The pack separates decisions-needed from status updates.",
    "Every blocker has an owner and a proposed unblocking step.",
    "The output is concise enough for executive consumption without further editing."
  ],
  "rollback": {"mode": "trace_based", "when": "If the pack invents metrics or misrepresents blocker status, roll back to raw inputs."},
  "source_references": [{"dossier_path": "references/workflows/startup-ops/ceo-review-pack.sources.json", "relationship": "workflow_dossier"}],
  "promotion": {"can_learn": true, "min_successes_before_update": 2, "quality_gate": "staging"}
}
```

### Workflow: research.deep-research-synthesis

```json
{
  "id": "research.deep-research-synthesis",
  "version": "1.0.0",
  "status": "active",
  "summary": "Conduct multi-source research on a topic and produce a cited synthesis report with evidence quality grading.",
  "task_family": "research_synthesis",
  "triggers": ["deep research synthesis", "multi source research report", "research topic investigation", "evidence synthesis report", "broad topic research"],
  "aliases": ["deep research", "research report"],
  "negative_keywords": ["code review", "financial forecast", "contract review"],
  "inputs": [
    {"name": "research_question", "required": true, "description": "The topic or question to investigate."},
    {"name": "source_constraints", "required": false, "description": "Preferred source types, date ranges, or domains to include or exclude."},
    {"name": "depth_level", "required": false, "description": "Target depth: overview, standard, or comprehensive."}
  ],
  "outputs": [
    {"name": "synthesis_report", "description": "Structured report with findings, evidence quality, and source citations."},
    {"name": "source_list", "description": "Annotated list of sources with quality and relevance scores."},
    {"name": "open_questions", "description": "Gaps or unresolved questions identified during research."}
  ],
  "primary_agent": "research.deep-researcher",
  "route": {
    "domain_master": "research.master",
    "agents": ["research.deep-researcher", "research.market-intel-analyst"],
    "primary_agent": "research.deep-researcher",
    "participants": ["research.market-intel-analyst"],
    "parallel": false,
    "max_parallel_agents": 2
  },
  "budget": {"band": "expanded", "max_context_tokens": 4500, "max_tool_calls": 15},
  "gates": [
    {"id": "pre-route", "rule": "Confirm the task is research synthesis, not code implementation or financial analysis."},
    {"id": "pre-tool", "rule": "Require a clear research question before initiating source collection."},
    {"id": "post-tool", "rule": "Verify sources are cited and evidence quality is graded before synthesis."},
    {"id": "on-task-complete", "rule": "Report must distinguish confirmed findings from speculation."}
  ],
  "steps": [
    {"id": "decompose-question", "agent": "research.deep-researcher", "action": "Break the research question into sub-questions and identify source types needed."},
    {"id": "collect-sources", "agent": "research.deep-researcher", "action": "Search and collect relevant sources using web search and documentation tools."},
    {"id": "grade-evidence", "agent": "research.deep-researcher", "action": "Rate each source for authority, recency, and relevance."},
    {"id": "synthesize-findings", "agent": "research.deep-researcher", "action": "Combine findings into a structured report with citations and open questions."}
  ],
  "tools": [
    {"name": "filesystem.read", "purpose": "Read local research inputs and prior reports."},
    {"name": "web.search", "purpose": "Search for sources using firecrawl or exa."},
    {"name": "web.fetch", "purpose": "Fetch and read source content."},
    {"name": "filesystem.write", "purpose": "Save the synthesis report."}
  ],
  "verification": [
    {"id": "sources-cited", "method": "Check that every major claim has at least one source citation."},
    {"id": "evidence-graded", "method": "Check that sources have quality and relevance scores."},
    {"id": "gaps-identified", "method": "Check that open questions or evidence gaps are listed."}
  ],
  "success_criteria": [
    "The report answers the research question with cited evidence.",
    "Source quality is graded so the reader can judge reliability.",
    "Open questions and evidence gaps are explicitly listed."
  ],
  "rollback": {"mode": "no_write", "when": "If the report fabricates sources or misattributes claims, discard and restart with verified sources only."},
  "source_references": [{"dossier_path": "references/workflows/research/deep-research-synthesis.sources.json", "relationship": "workflow_dossier"}],
  "promotion": {"can_learn": true, "min_successes_before_update": 2, "quality_gate": "staging"}
}
```

### Workflow: healthcare.clinical-guideline-review

```json
{
  "id": "healthcare.clinical-guideline-review",
  "version": "1.0.0",
  "status": "active",
  "summary": "Screen a clinical guideline or care pathway for evidence quality, safety constraints, and implementation readiness before clinician review.",
  "task_family": "clinical_review",
  "triggers": ["clinical guideline review", "care pathway screening", "evidence grade check", "guideline implementation readiness", "clinical protocol review"],
  "aliases": ["guideline review", "clinical protocol check"],
  "negative_keywords": ["code review", "financial forecast", "marketing campaign"],
  "inputs": [
    {"name": "guideline_document", "required": true, "description": "The clinical guideline or care pathway to review."},
    {"name": "evidence_set", "required": true, "description": "Supporting evidence, references, or systematic review data."},
    {"name": "safety_constraints", "required": false, "description": "Known contraindications, patient safety requirements, or regulatory constraints."}
  ],
  "outputs": [
    {"name": "evidence_quality_report", "description": "Evidence grading using recognized levels (e.g., GRADE, Oxford CEBM)."},
    {"name": "safety_flags", "description": "Safety concerns, contraindications, or missing safety language."},
    {"name": "clinician_handoff", "description": "Summary with unresolved questions for clinician or committee review."}
  ],
  "primary_agent": "healthcare.clinical-decision-support",
  "route": {
    "domain_master": "healthcare.master",
    "agents": ["healthcare.clinical-decision-support", "healthcare.phi-compliance"],
    "primary_agent": "healthcare.clinical-decision-support",
    "participants": ["healthcare.phi-compliance"],
    "parallel": false,
    "max_parallel_agents": 2
  },
  "budget": {"band": "standard", "max_context_tokens": 3500, "max_tool_calls": 8},
  "gates": [
    {"id": "pre-route", "rule": "Confirm the task is clinical guideline support, not diagnosis or prescription."},
    {"id": "pre-tool", "rule": "Require the guideline document and evidence set before grading."},
    {"id": "pre-write", "rule": "Verify no PHI is present in inputs or outputs."},
    {"id": "on-task-complete", "rule": "Output must include evidence grades, safety flags, and clinician handoff."}
  ],
  "steps": [
    {"id": "check-phi", "agent": "healthcare.phi-compliance", "action": "Screen inputs for protected health information and redact if found."},
    {"id": "grade-evidence", "agent": "healthcare.clinical-decision-support", "action": "Apply evidence grading framework to each recommendation in the guideline."},
    {"id": "flag-safety", "agent": "healthcare.clinical-decision-support", "action": "Identify missing safety language, contraindications, or unaddressed risks."},
    {"id": "prepare-handoff", "agent": "healthcare.clinical-decision-support", "action": "Compile findings into a clinician review packet with unresolved questions."}
  ],
  "tools": [{"name": "filesystem.read", "purpose": "Read guideline documents and evidence sets."}],
  "verification": [
    {"id": "evidence-graded", "method": "Check that each recommendation has an evidence level assigned."},
    {"id": "safety-flags-present", "method": "Check that safety concerns are listed with severity."},
    {"id": "clinician-handoff-present", "method": "Check that unresolved questions are listed for human review."},
    {"id": "phi-redacted", "method": "Confirm no protected health information appears in outputs."}
  ],
  "success_criteria": [
    "Every recommendation in the guideline has an evidence grade.",
    "Safety concerns and contraindications are explicitly flagged.",
    "The output ends with a clinician handoff, not approval language.",
    "No PHI appears in the output."
  ],
  "rollback": {"mode": "trace_based", "when": "If PHI is detected in outputs or evidence grades are fabricated, roll back and restart with verified inputs."},
  "source_references": [{"dossier_path": "references/workflows/healthcare/clinical-guideline-review.sources.json", "relationship": "workflow_dossier"}],
  "promotion": {"can_learn": true, "min_successes_before_update": 2, "quality_gate": "staging"}
}
```

### Workflow: education.curriculum-assessment-alignment

```json
{
  "id": "education.curriculum-assessment-alignment",
  "version": "1.0.0",
  "status": "active",
  "summary": "Align a curriculum map to assessment rubrics and learning objectives using backward design principles.",
  "task_family": "curriculum_design",
  "triggers": ["curriculum assessment alignment", "align assessments to objectives", "backward design curriculum", "learning objective assessment check", "curriculum rubric alignment"],
  "aliases": ["curriculum alignment", "assessment alignment"],
  "negative_keywords": ["code review", "financial forecast", "contract review"],
  "inputs": [
    {"name": "curriculum_map", "required": true, "description": "The curriculum sequence, units, or lesson plans to align."},
    {"name": "learning_objectives", "required": true, "description": "Defined learning goals, standards, or competency targets."},
    {"name": "existing_assessments", "required": false, "description": "Current assessments, rubrics, or evaluation tools to check against."}
  ],
  "outputs": [
    {"name": "alignment_matrix", "description": "Mapping of objectives to curriculum units and assessments."},
    {"name": "gap_report", "description": "Objectives without assessments or assessments without clear objectives."},
    {"name": "revision_recommendations", "description": "Suggested changes to close alignment gaps."}
  ],
  "primary_agent": "education.curriculum-designer",
  "route": {
    "domain_master": "education.master",
    "agents": ["education.curriculum-designer", "education.assessment-designer"],
    "primary_agent": "education.curriculum-designer",
    "participants": ["education.assessment-designer"],
    "parallel": false,
    "max_parallel_agents": 2
  },
  "budget": {"band": "standard", "max_context_tokens": 3200, "max_tool_calls": 8},
  "gates": [
    {"id": "pre-route", "rule": "Confirm the task is curriculum-assessment alignment, not content creation or grading."},
    {"id": "pre-tool", "rule": "Require both curriculum map and learning objectives before alignment."},
    {"id": "on-task-complete", "rule": "Output must include an alignment matrix and explicit gap report."}
  ],
  "steps": [
    {"id": "map-objectives", "agent": "education.curriculum-designer", "action": "Map each learning objective to the curriculum units that address it."},
    {"id": "check-assessments", "agent": "education.assessment-designer", "action": "Check whether each mapped objective has a corresponding assessment or rubric."},
    {"id": "identify-gaps", "agent": "education.curriculum-designer", "action": "List objectives without assessments and assessments without clear objectives."},
    {"id": "recommend-revisions", "agent": "education.curriculum-designer", "action": "Propose curriculum or assessment changes to close identified gaps."}
  ],
  "tools": [
    {"name": "filesystem.read", "purpose": "Read curriculum maps, standards documents, and existing assessments."},
    {"name": "filesystem.write", "purpose": "Save the alignment matrix and gap report."}
  ],
  "verification": [
    {"id": "matrix-complete", "method": "Check that every objective appears in the alignment matrix."},
    {"id": "gaps-explicit", "method": "Check that unmapped objectives and orphan assessments are listed."},
    {"id": "recommendations-actionable", "method": "Check that revision suggestions are specific enough to implement."}
  ],
  "success_criteria": [
    "The alignment matrix maps every objective to curriculum and assessment.",
    "Gaps are explicitly listed with severity.",
    "Revision recommendations are specific and actionable for the educator."
  ],
  "rollback": {"mode": "no_write", "when": "If the alignment invents objectives or misrepresents the curriculum, discard and restart from verified inputs."},
  "source_references": [{"dossier_path": "references/workflows/education/curriculum-assessment-alignment.sources.json", "relationship": "workflow_dossier"}],
  "promotion": {"can_learn": true, "min_successes_before_update": 2, "quality_gate": "staging"}
}
```

### Workflow: manufacturing.demand-inventory-balancing

```json
{
  "id": "manufacturing.demand-inventory-balancing",
  "version": "1.0.0",
  "status": "active",
  "summary": "Reconcile demand forecasts with inventory posture to identify supply-demand gaps and recommend balancing actions.",
  "task_family": "supply_chain_planning",
  "triggers": ["demand inventory balancing", "supply demand reconciliation", "s&op review pack", "inventory demand gap analysis", "demand supply mismatch review"],
  "aliases": ["demand balancing", "s&op reconciliation"],
  "negative_keywords": ["code review", "financial forecast", "contract review"],
  "inputs": [
    {"name": "demand_forecast", "required": true, "description": "Demand projections by product family, period, and confidence level."},
    {"name": "inventory_snapshot", "required": true, "description": "Current inventory levels, safety stock, and replenishment policies."},
    {"name": "capacity_constraints", "required": false, "description": "Production capacity, lead times, and supplier constraints."}
  ],
  "outputs": [
    {"name": "gap_analysis", "description": "Period-by-period supply-demand gaps with severity."},
    {"name": "balancing_actions", "description": "Recommended actions: build-ahead, safety stock adjustment, capacity changes."},
    {"name": "risk_summary", "description": "Key risks and assumptions that could shift the balance."}
  ],
  "primary_agent": "manufacturing.demand-planner",
  "route": {
    "domain_master": "manufacturing.master",
    "agents": ["manufacturing.demand-planner", "manufacturing.inventory-planner"],
    "primary_agent": "manufacturing.demand-planner",
    "participants": ["manufacturing.inventory-planner"],
    "parallel": false,
    "max_parallel_agents": 2
  },
  "budget": {"band": "standard", "max_context_tokens": 3500, "max_tool_calls": 10},
  "gates": [
    {"id": "pre-route", "rule": "Confirm the task is supply-demand balancing, not financial forecasting or code deployment."},
    {"id": "pre-tool", "rule": "Require both demand forecast and inventory snapshot before gap analysis."},
    {"id": "on-task-complete", "rule": "Output must include gap analysis, recommended actions, and risk summary."}
  ],
  "steps": [
    {"id": "validate-inputs", "agent": "manufacturing.demand-planner", "action": "Check demand forecast and inventory data for completeness and consistency."},
    {"id": "analyze-demand", "agent": "manufacturing.demand-planner", "action": "Project demand by period and identify peaks, trends, and uncertainty."},
    {"id": "assess-supply", "agent": "manufacturing.inventory-planner", "action": "Compare inventory posture and replenishment capacity against projected demand."},
    {"id": "reconcile-gaps", "agent": "manufacturing.demand-planner", "action": "Identify period-by-period gaps and recommend balancing actions with risk notes."}
  ],
  "tools": [
    {"name": "filesystem.read", "purpose": "Read demand forecasts, inventory reports, and capacity data."},
    {"name": "filesystem.write", "purpose": "Save the gap analysis and balancing recommendations."}
  ],
  "verification": [
    {"id": "gaps-periodized", "method": "Check that gaps are shown by time period with severity."},
    {"id": "actions-specific", "method": "Check that recommended actions name the product family and timing."},
    {"id": "risks-stated", "method": "Check that key assumptions and risks are listed."}
  ],
  "success_criteria": [
    "The gap analysis shows supply-demand mismatches by period.",
    "Recommended actions are specific to product family and timing.",
    "Key risks and assumptions are explicitly stated."
  ],
  "rollback": {"mode": "trace_based", "when": "If the analysis uses stale demand data or invents inventory levels, roll back to verified inputs."},
  "source_references": [{"dossier_path": "references/workflows/manufacturing/demand-inventory-balancing.sources.json", "relationship": "workflow_dossier"}],
  "promotion": {"can_learn": true, "min_successes_before_update": 2, "quality_gate": "staging"}
}
```

---

### Agent: security.dependency-risk-agent

```yaml
---
id: security.dependency-risk-agent
name: Dependency Risk Agent
version: 1.0.0
status: active
category: security
kind: specialist
summary: Analyzes software dependencies for known vulnerabilities, license risks, and supply-chain exposure using SCA patterns.
triggers:
  - dependency vulnerability scan
  - supply chain risk review
  - dependency audit
  - sbom analysis
  - library risk check
aliases:
  - dependency risk
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - dependency_manifest
  - scan_results
  - risk_threshold
outputs:
  - vulnerability_report
  - license_risk_flags
  - remediation_plan
allowed_tools:
  - filesystem.read
  - shell.readonly
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - reports vulnerabilities without checking actual usage
  - ignores transitive dependency risks
  - omits license compatibility checks
verification:
  - vulnerabilities_mapped_to_usage
  - transitive_deps_checked
  - license_flags_present
source_references:
  - ref.github.security.dependency-risk.2026-06-01
quality_gate: staging
---
```

### Agent: data-ai.graph-rag-engineer

```yaml
---
id: data-ai.graph-rag-engineer
name: GraphRAG Engineer
version: 1.0.0
status: active
category: data-ai
kind: specialist
summary: Designs and evaluates graph-augmented retrieval systems using knowledge graphs and community detection for improved RAG quality.
triggers:
  - graph rag implementation
  - knowledge graph retrieval
  - graph augmented rag
  - community detection rag
  - entity graph build
aliases:
  - graphrag
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - corpus_description
  - graph_schema
  - retrieval_requirements
outputs:
  - graph_rag_design
  - community_analysis
  - eval_harness
allowed_tools:
  - filesystem.read
  - code_graph.query
budget_band: expanded
max_context_tokens: 5000
failure_modes:
  - builds graph without measuring retrieval improvement over baseline
  - skips community detection validation
  - ignores graph construction cost and latency
verification:
  - retrieval_improvement_measured
  - communities_validated
  - cost_analysis_present
source_references:
  - ref.github.data-ai.graph-rag.2026-06-01
quality_gate: staging
---
```

### Agent: integrations.sourcegraph-context-agent

```yaml
---
id: integrations.sourcegraph-context-agent
name: Sourcegraph Context Agent
version: 1.0.0
status: active
category: integrations
kind: specialist
summary: Retrieves and structures code context from Sourcegraph or similar code intelligence platforms for downstream agent consumption.
triggers:
  - code context retrieval
  - sourcegraph search
  - code intelligence query
  - cross repo context
  - code reference lookup
aliases:
  - code context
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - query_description
  - target_repos
  - context_scope
outputs:
  - context_pack
  - reference_map
  - relevance_scores
allowed_tools:
  - filesystem.read
  - shell.readonly
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - returns context without relevance scoring
  - ignores repository scope boundaries
  - omits cross-reference links
verification:
  - relevance_scores_present
  - scope_respected
  - references_linked
source_references:
  - ref.github.integrations.sourcegraph-context.2026-06-01
quality_gate: staging
---
```

### Agent: product-business.partnerships-advisor

```yaml
---
id: product-business.partnerships-advisor
name: Partnerships Advisor
version: 1.0.0
status: active
category: product-business
kind: specialist
summary: Designs partnership strategies, co-selling motions, and channel partner programs with clear KPIs and ownership.
triggers:
  - partnership strategy design
  - co selling motion
  - channel partner program
  - strategic alliance plan
  - partner fit assessment
aliases:
  - partnerships
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - partnership_goal
  - target_partners
  - business_context
outputs:
  - partnership_strategy
  - partner_scorecard
  - execution_plan
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - designs partnership without partner fit criteria
  - omits KPIs and ownership
  - confuses partnership with direct sales
verification:
  - partner_fit_criteria_named
  - kpis_defined
  - ownership_assigned
source_references:
  - ref.github.product-business.partnerships.2026-06-01
quality_gate: staging
---
```

### Agent: finance.cfo-advisor

```yaml
---
id: finance.cfo-advisor
name: CFO Advisor
version: 1.0.0
status: active
category: finance
kind: specialist
summary: Provides strategic finance advisory on capital allocation, board reporting, and financial planning frameworks for CFO-level decisions.
triggers:
  - cfo advisory brief
  - capital allocation review
  - board reporting pack
  - strategic finance review
  - financial planning framework
aliases:
  - cfo advisor
negative_keywords:
  - code review
  - marketing campaign
  - contract review
inputs:
  - financial_context
  - decision_scope
  - reporting_requirements
outputs:
  - advisory_brief
  - capital_analysis
  - board_ready_summary
allowed_tools:
  - filesystem.read
budget_band: expanded
max_context_tokens: 6000
failure_modes:
  - provides advice without disclaimer
  - omits scenario analysis
  - confuses operational and strategic finance
verification:
  - disclaimer_attached
  - scenarios_present
  - reviewer_handoff_marker_present
requires_disclaimer: true
human_review_gate: true
source_references:
  - ref.github.finance.cfo-advisor.2026-06-01
quality_gate: staging
---
```

### Agent: marketing.email-marketer

```yaml
---
id: marketing.email-marketer
name: Email Marketer
version: 1.0.0
status: active
category: marketing
kind: specialist
summary: Designs email marketing strategies, lifecycle sequences, and deliverability optimization with compliance awareness.
triggers:
  - email marketing strategy
  - lifecycle email design
  - email deliverability review
  - drip campaign plan
  - email sequence build
aliases:
  - email marketing
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - audience_segment
  - campaign_goal
  - compliance_constraints
outputs:
  - email_strategy
  - sequence_design
  - deliverability_notes
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - designs sequences without compliance awareness
  - ignores deliverability best practices
  - omits unsubscribe and consent handling
verification:
  - compliance_checked
  - deliverability_addressed
  - consent_handling_noted
source_references:
  - ref.github.marketing.email-marketer.2026-06-01
quality_gate: staging
---
```

### Agent: sales.competitive-intel-analyst

```yaml
---
id: sales.competitive-intel-analyst
name: Competitive Intel Analyst
version: 1.0.0
status: active
category: sales
kind: specialist
summary: Conducts win/loss analysis, competitive positioning, and battle card creation using structured intelligence methodologies.
triggers:
  - competitive intelligence review
  - win loss analysis
  - battle card creation
  - competitive positioning
  - competitor analysis
aliases:
  - competitive intel
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - competitive_landscape
  - win_loss_data
  - positioning_goal
outputs:
  - competitive_analysis
  - battle_cards
  - positioning_recommendations
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - analyzes without win/loss data
  - creates battle cards without evidence
  - confuses competitive intel with market research
verification:
  - win_loss_data_cited
  - battle_cards_evidenced
  - positioning_specific
source_references:
  - ref.github.sales.competitive-intel.2026-06-01
quality_gate: staging
---
```

### Agent: hr.compensation-analyst

```yaml
---
id: hr.compensation-analyst
name: Compensation Analyst
version: 1.0.0
status: active
category: hr
kind: specialist
summary: Designs compensation benchmarking, pay equity analysis, and total rewards structures with market data awareness.
triggers:
  - compensation benchmarking
  - pay equity analysis
  - total rewards design
  - salary band review
  - compensation structure
aliases:
  - compensation
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - role_data
  - market_benchmarks
  - equity_constraints
outputs:
  - benchmarking_report
  - pay_equity_findings
  - structure_recommendations
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - benchmarks without market data
  - ignores pay equity implications
  - omits total rewards perspective
verification:
  - market_data_cited
  - equity_analyzed
  - total_rewards_considered
requires_disclaimer: true
human_review_gate: true
source_references:
  - ref.github.hr.compensation-analyst.2026-06-01
quality_gate: staging
---
```

### Agent: design-content.brand-strategist

```yaml
---
id: design-content.brand-strategist
name: Brand Strategist
version: 1.0.0
status: active
category: design-content
kind: specialist
summary: Designs brand architecture, visual identity systems, and brand voice guidelines with strategic positioning.
triggers:
  - brand strategy design
  - visual identity system
  - brand architecture plan
  - brand voice guide
  - brand positioning
aliases:
  - brand strategy
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - brand_context
  - target_audience
  - positioning_goals
outputs:
  - brand_architecture
  - identity_system
  - voice_guidelines
allowed_tools:
  - filesystem.read
budget_band: expanded
max_context_tokens: 5000
failure_modes:
  - designs brand without audience context
  - creates identity without architecture
  - omits voice and tone guidance
verification:
  - audience_context_present
  - architecture_defined
  - voice_guidelines_present
source_references:
  - ref.github.design-content.brand-strategist.2026-06-01
quality_gate: staging
---
```

### Agent: platform.observability-engineer

```yaml
---
id: platform.observability-engineer
name: Observability Engineer
version: 1.0.0
status: active
category: platform
kind: specialist
summary: Designs observability systems with OpenTelemetry, SLI/SLO definitions, and monitoring strategies for production services.
triggers:
  - observability design
  - sli slo definition
  - opentelemetry setup
  - monitoring strategy
  - service observability
aliases:
  - observability
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - service_description
  - reliability_targets
  - existing_infrastructure
outputs:
  - observability_plan
  - sli_slo_definitions
  - monitoring_strategy
allowed_tools:
  - filesystem.read
  - shell.readonly
budget_band: standard
max_context_tokens: 5000
failure_modes:
  - defines SLOs without error budgets
  - ignores existing infrastructure constraints
  - omits alerting strategy
verification:
  - slos_have_error_budgets
  - infrastructure_considered
  - alerting_defined
source_references:
  - ref.github.platform.observability-engineer.2026-06-01
quality_gate: staging
---
```

### Agent: meta-system.deduplicator

```yaml
---
id: meta-system.deduplicator
name: Deduplicator
version: 1.0.0
status: active
category: meta-system
kind: specialist
summary: Detects and resolves duplicate agents, skills, and workflows using semantic similarity and trigger overlap analysis.
triggers:
  - deduplicate registry
  - find duplicate agents
  - overlap detection
  - semantic similarity check
  - registry cleanup
aliases:
  - deduplicator
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - registry_snapshot
  - similarity_threshold
  - cleanup_scope
outputs:
  - duplicate_clusters
  - overlap_report
  - merge_recommendations
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 4000
failure_modes:
  - flags false positives without manual review gate
  - ignores semantic similarity in favor of keyword matching only
  - omits merge recommendations
verification:
  - similarity_scores_present
  - manual_review_gate
  - merge_recommendations_listed
source_references:
  - ref.github.meta-system.deduplicator.2026-06-01
quality_gate: staging
---
```

### Agent: meta-system.stub-detector

```yaml
---
id: meta-system.stub-detector
name: Stub Detector
version: 1.0.0
status: active
category: meta-system
kind: specialist
summary: Identifies low-quality agent stubs, incomplete workflows, and thin dossiers using completeness scoring heuristics.
triggers:
  - detect stubs
  - quality completeness check
  - thin dossier scan
  - agent quality audit
  - registry completeness
aliases:
  - stub detector
negative_keywords:
  - code review
  - financial forecast
  - contract review
inputs:
  - registry_snapshot
  - completeness_threshold
  - audit_scope
outputs:
  - stub_report
  - completeness_scores
  - remediation_priorities
allowed_tools:
  - filesystem.read
budget_band: standard
max_context_tokens: 4000
failure_modes:
  - scores without checking actual content depth
  - ignores dossier source quality
  - omits remediation priorities
verification:
  - content_depth_checked
  - source_quality_considered
  - remediation_prioritized
source_references:
  - ref.github.meta-system.stub-detector.2026-06-01
quality_gate: staging
---
```

---

## Workflow Dossiers (5 files)

### startup-ops/ceo-review-pack.sources.json
```json
{
  "dossier_id": "dossier.workflow.startup-ops.ceo-review-pack.2026-06-01",
  "workflow_id": "startup-ops.ceo-review-pack",
  "domain": "startup-ops",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://travismay.medium.com/building-the-right-operating-cadence-6c608fd142e1", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["CEO operating cadence patterns", "meeting structure"], "copy_policy": "patterns_only"},
    {"url": "https://buildtoscale.substack.com/p/setting-the-right-meeting-cadence", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["meeting cadence design", "decision-making rituals"], "copy_policy": "patterns_only"},
    {"url": "https://proassisting.com/resources/articles/ceo-schedule/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["CEO schedule structure", "time allocation patterns"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 3, "official_docs": 0, "github_quality": 0, "license_safety": 90, "maintenance": 75, "pattern_clarity": 82, "testability": 70, "total": 80},
  "promotion_decision": "staging"
}
```

### research/deep-research-synthesis.sources.json
```json
{
  "dossier_id": "dossier.workflow.research.deep-research-synthesis.2026-06-01",
  "workflow_id": "research.deep-research-synthesis",
  "domain": "research",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://github.com/masamisa59/ai-agent-papers", "source_type": "github_repo", "license": "MIT", "version_or_commit": "main", "used_for": ["deep research agent patterns", "multi-source synthesis methodology"], "copy_policy": "patterns_only"},
    {"url": "https://docs.langchain.com/oss/python/deepagents/deep-research", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["research agent architecture", "decomposition patterns"], "copy_policy": "patterns_only"},
    {"url": "https://www.reddit.com/r/AI_Agents/comments/1lvfcpk/how_we_built_a_researcher_agent_technical/", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["researcher agent technical breakdown", "content extraction patterns"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 3, "official_docs": 1, "github_quality": 78, "license_safety": 88, "maintenance": 80, "pattern_clarity": 85, "testability": 75, "total": 82},
  "promotion_decision": "staging"
}
```

### healthcare/clinical-guideline-review.sources.json
```json
{
  "dossier_id": "dossier.workflow.healthcare.clinical-guideline-review.2026-06-01",
  "workflow_id": "healthcare.clinical-guideline-review",
  "domain": "healthcare",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10788252/", "source_type": "academic_paper", "license": "Open Access", "version_or_commit": "published", "used_for": ["systematic review methodology", "CPG and SR integration"], "copy_policy": "patterns_only"},
    {"url": "https://gradepro.org/handbook/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["GRADE evidence grading framework", "quality of evidence rating"], "copy_policy": "patterns_only"},
    {"url": "https://guides.library.stonybrook.edu/evidence-based-medicine/levels_of_evidence", "source_type": "academic", "license": "Open Access", "version_or_commit": "live", "used_for": ["evidence levels hierarchy", "Oxford CEBM levels"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 3, "official_docs": 2, "github_quality": 0, "license_safety": 95, "maintenance": 90, "pattern_clarity": 92, "testability": 80, "total": 88},
  "promotion_decision": "staging"
}
```

### education/curriculum-assessment-alignment.sources.json
```json
{
  "dossier_id": "dossier.workflow.education.curriculum-assessment-alignment.2026-06-01",
  "workflow_id": "education.curriculum-assessment-alignment",
  "domain": "education",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://files.ascd.org/staticfiles/ascd/pdf/siteASCD/publications/UbD_WhitePaper0312.pdf", "source_type": "academic", "license": "Proprietary", "version_or_commit": "published", "used_for": ["Understanding by Design framework", "backward design process"], "copy_policy": "patterns_only"},
    {"url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10728343/", "source_type": "academic_paper", "license": "Open Access", "version_or_commit": "published", "used_for": ["UbD curriculum development tips", "assessment alignment"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 1, "github_quality": 0, "license_safety": 85, "maintenance": 88, "pattern_clarity": 90, "testability": 78, "total": 82},
  "promotion_decision": "staging"
}
```

### manufacturing/demand-inventory-balancing.sources.json
```json
{
  "dossier_id": "dossier.workflow.manufacturing.demand-inventory-balancing.2026-06-01",
  "workflow_id": "manufacturing.demand-inventory-balancing",
  "domain": "manufacturing",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://demand-planning.com/2025/05/05/demand-planning-101-the-basics/", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["demand planning fundamentals", "forecasting basics"], "copy_policy": "patterns_only"},
    {"url": "https://www.sap.com/resources/sop-sales-and-operations-planning", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["S&OP process structure", "demand-supply alignment"], "copy_policy": "patterns_only"},
    {"url": "https://www.wolterskluwer.com/en/expert-insights/mps-mrp-drp-help-supply-chains", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["MPS/MRP/DRP process flow", "supply chain planning"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 3, "official_docs": 2, "github_quality": 0, "license_safety": 88, "maintenance": 82, "pattern_clarity": 85, "testability": 72, "total": 81},
  "promotion_decision": "staging"
}
```

---

## Agent Dossiers (13 files)

Each agent dossier follows the format of `references/engineering/code-reviewer.sources.json`.

### security/dependency-risk-agent.sources.json
```json
{
  "dossier_id": "dossier.security.dependency-risk-agent.2026-06-01",
  "agent_id": "security.dependency-risk-agent",
  "domain": "security",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://owasp.org/www-project-dependency-check/", "source_type": "github_repo", "license": "Apache-2.0", "version_or_commit": "main", "used_for": ["SCA scanning patterns", "vulnerability detection methodology"], "copy_policy": "patterns_only"},
    {"url": "https://checkmarx.com/learn/sca/12-software-composition-analysis-best-practices/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["SCA best practices", "dependency risk assessment"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 1, "github_quality": 90, "license_safety": 95, "maintenance": 88, "pattern_clarity": 88, "testability": 82, "total": 88},
  "promotion_decision": "staging"
}
```

### data-ai/graph-rag-engineer.sources.json
```json
{
  "dossier_id": "dossier.data-ai.graph-rag-engineer.2026-06-01",
  "agent_id": "data-ai.graph-rag-engineer",
  "domain": "data-ai",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://www.microsoft.com/en-us/research/project/graphrag/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["GraphRAG architecture", "community detection patterns"], "copy_policy": "patterns_only"},
    {"url": "https://graphrag.com/concepts/intro-to-graphrag/", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["GraphRAG patterns overview", "retrieval augmentation with graphs"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 1, "github_quality": 85, "license_safety": 90, "maintenance": 85, "pattern_clarity": 88, "testability": 78, "total": 85},
  "promotion_decision": "staging"
}
```

### integrations/sourcegraph-context-agent.sources.json
```json
{
  "dossier_id": "dossier.integrations.sourcegraph-context-agent.2026-06-01",
  "agent_id": "integrations.sourcegraph-context-agent",
  "domain": "integrations",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://sourcegraph.com/blog/towards-infinite-context-for-code", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["code context retrieval patterns", "long context for code"], "copy_policy": "patterns_only"},
    {"url": "https://sourcegraph.com/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["code intelligence platform architecture", "code search patterns"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 1, "github_quality": 0, "license_safety": 88, "maintenance": 90, "pattern_clarity": 82, "testability": 75, "total": 80},
  "promotion_decision": "staging"
}
```

### product-business/partnerships-advisor.sources.json
```json
{
  "dossier_id": "dossier.product-business.partnerships-advisor.2026-06-01",
  "agent_id": "product-business.partnerships-advisor",
  "domain": "product-business",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://theb2bplaybook.com/b2b-partnerships", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["B2B partnership strategy", "structured partnership frameworks"], "copy_policy": "patterns_only"},
    {"url": "https://angaddhaliwal.com/strategic-partnership-strategy/", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["7-step partnership playbook", "partner fit assessment"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 85, "maintenance": 78, "pattern_clarity": 85, "testability": 72, "total": 80},
  "promotion_decision": "staging"
}
```

### finance/cfo-advisor.sources.json
```json
{
  "dossier_id": "dossier.finance.cfo-advisor.2026-06-01",
  "agent_id": "finance.cfo-advisor",
  "domain": "finance",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://www.cfgi.com/solutions/financial-planning-analysis/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["FP&A function structure", "CFO advisory patterns"], "copy_policy": "patterns_only"},
    {"url": "https://www.mccrackenalliance.com/blog/financial-planning-and-analysis-fp-a-a-guide-for-finance-professionals", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["strategic planning priorities", "CFO decision frameworks"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 88, "maintenance": 80, "pattern_clarity": 84, "testability": 70, "total": 80},
  "promotion_decision": "staging"
}
```

### marketing/email-marketer.sources.json
```json
{
  "dossier_id": "dossier.marketing.email-marketer.2026-06-01",
  "agent_id": "marketing.email-marketer",
  "domain": "marketing",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://www.allegrow.co/knowledge-base/can-spam-act-compliance-guide", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["CAN-SPAM compliance rules", "deliverability best practices"], "copy_policy": "patterns_only"},
    {"url": "https://zepic.com/article/email-marketing-in-2026-navigating-the-new-rules-of-deliverability-and-data-privacy", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["email deliverability rules 2026", "data privacy in email"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 88, "maintenance": 82, "pattern_clarity": 85, "testability": 75, "total": 82},
  "promotion_decision": "staging"
}
```

### sales/competitive-intel-analyst.sources.json
```json
{
  "dossier_id": "dossier.sales.competitive-intel-analyst.2026-06-01",
  "agent_id": "sales.competitive-intel-analyst",
  "domain": "sales",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://klue.com/blog/win-loss-analysis-guide", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["win-loss analysis methodology", "buyer interview frameworks"], "copy_policy": "patterns_only"},
    {"url": "https://proponentapp.com/blog/win-loss-analysis-and-competitive-intelligence", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["competitive intelligence from sales data", "scalable CI approaches"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 88, "maintenance": 80, "pattern_clarity": 86, "testability": 74, "total": 82},
  "promotion_decision": "staging"
}
```

### hr/compensation-analyst.sources.json
```json
{
  "dossier_id": "dossier.hr.compensation-analyst.2026-06-01",
  "agent_id": "hr.compensation-analyst",
  "domain": "hr",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://www.outsolve.com/blog/compensation-benchmarking-complete-guide", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["compensation benchmarking process", "market data comparison"], "copy_policy": "patterns_only"},
    {"url": "https://worldatwork.org/publications/workspan-daily/compensation-benchmarking-the-what-why-and-how", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["total rewards benchmarking", "compensation best practices"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 88, "maintenance": 82, "pattern_clarity": 84, "testability": 72, "total": 81},
  "promotion_decision": "staging"
}
```

### design-content/brand-strategist.sources.json
```json
{
  "dossier_id": "dossier.design-content.brand-strategist.2026-06-01",
  "agent_id": "design-content.brand-strategist",
  "domain": "design-content",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://vivaldigroup.com/brand-architecture-types-models-strategic-frameworks/", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["brand architecture types", "strategic brand frameworks"], "copy_policy": "patterns_only"},
    {"url": "https://www.designbridge.com/insights/building-brand-strategy", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["brand strategy components", "visual identity design"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 85, "maintenance": 80, "pattern_clarity": 86, "testability": 70, "total": 80},
  "promotion_decision": "staging"
}
```

### platform/observability-engineer.sources.json
```json
{
  "dossier_id": "dossier.platform.observability-engineer.2026-06-01",
  "agent_id": "platform.observability-engineer",
  "domain": "platform",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://oneuptime.com/blog/post/2026-02-06-slo-monitoring-opentelemetry-metrics/view", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["SLO monitoring with OpenTelemetry", "best practices for SLOs"], "copy_policy": "patterns_only"},
    {"url": "https://medium.com/@sajal.devops/the-sre-observability-playbook-from-monitoring-to-mastery-2ec22c32cf40", "source_type": "blog", "license": "Proprietary", "version_or_commit": "live", "used_for": ["SRE observability playbook", "OpenTelemetry instrumentation"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 88, "maintenance": 82, "pattern_clarity": 86, "testability": 78, "total": 83},
  "promotion_decision": "staging"
}
```

### meta-system/deduplicator.sources.json
```json
{
  "dossier_id": "dossier.meta-system.deduplicator.2026-06-01",
  "agent_id": "meta-system.deduplicator",
  "domain": "meta-system",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://arxiv.org/html/2410.01141v3", "source_type": "academic_paper", "license": "Open Access", "version_or_commit": "published", "used_for": ["deduplication techniques for NLP datasets", "semantic similarity detection"], "copy_policy": "patterns_only"},
    {"url": "https://galileo.ai/blog/semantic-textual-similarity-metric", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["semantic textual similarity metrics", "NLP comparison methods"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 1, "github_quality": 0, "license_safety": 92, "maintenance": 85, "pattern_clarity": 84, "testability": 80, "total": 85},
  "promotion_decision": "staging"
}
```

### meta-system/stub-detector.sources.json
```json
{
  "dossier_id": "dossier.meta-system.stub-detector.2026-06-01",
  "agent_id": "meta-system.stub-detector",
  "domain": "meta-system",
  "created_at": "2026-06-01T00:00:00Z",
  "expires_at": "2026-08-30T00:00:00Z",
  "sources": [
    {"url": "https://www.codeant.ai/blogs/code-quality-metrics-to-track", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["code quality metrics", "completeness scoring heuristics"], "copy_policy": "patterns_only"},
    {"url": "https://blog.codacy.com/code-quality-metrics", "source_type": "vendor_docs", "license": "Proprietary", "version_or_commit": "live", "used_for": ["engineering quality metrics", "stub detection patterns"], "copy_policy": "patterns_only"}
  ],
  "scores": {"source_count": 2, "official_docs": 0, "github_quality": 0, "license_safety": 88, "maintenance": 82, "pattern_clarity": 84, "testability": 78, "total": 82},
  "promotion_decision": "staging"
}
```

---

## Fixture Updates

### Workflow Fixtures (add to tests/workflows/phase8.fixtures.json)

```json
{"prompt": "prepare a CEO review pack for this week", "expected_workflow": "startup-ops.ceo-review-pack", "expected_primary_agent": "startup-ops.ceo-rethink"},
{"prompt": "office hours prep", "expected_workflow": "startup-ops.ceo-review-pack", "expected_primary_agent": "startup-ops.ceo-rethink"},
{"prompt": "research this topic thoroughly with multiple sources", "expected_workflow": "research.deep-research-synthesis", "expected_primary_agent": "research.deep-researcher"},
{"prompt": "deep research synthesis", "expected_workflow": "research.deep-research-synthesis", "expected_primary_agent": "research.deep-researcher"},
{"prompt": "review this clinical guideline for evidence quality", "expected_workflow": "healthcare.clinical-guideline-review", "expected_primary_agent": "healthcare.clinical-decision-support"},
{"prompt": "guideline review", "expected_workflow": "healthcare.clinical-guideline-review", "expected_primary_agent": "healthcare.clinical-decision-support"},
{"prompt": "align this curriculum to the assessment rubric", "expected_workflow": "education.curriculum-assessment-alignment", "expected_primary_agent": "education.curriculum-designer"},
{"prompt": "curriculum alignment", "expected_workflow": "education.curriculum-assessment-alignment", "expected_primary_agent": "education.curriculum-designer"},
{"prompt": "reconcile demand forecast with inventory levels", "expected_workflow": "manufacturing.demand-inventory-balancing", "expected_primary_agent": "manufacturing.demand-planner"},
{"prompt": "demand balancing", "expected_workflow": "manufacturing.demand-inventory-balancing", "expected_primary_agent": "manufacturing.demand-planner"}
```

### Route Fixtures (new file: tests/routing/phase8-new-agents.fixtures.json)

```json
{
  "fixtures": [
    {"prompt": "scan our dependencies for vulnerabilities", "expected_route": "route.security.dependency-risk-agent"},
    {"prompt": "dependency risk", "expected_route": "route.security.dependency-risk-agent"},
    {"prompt": "build a graph-augmented RAG system", "expected_route": "route.data-ai.graph-rag-engineer"},
    {"prompt": "graphrag", "expected_route": "route.data-ai.graph-rag-engineer"},
    {"prompt": "get code context from Sourcegraph", "expected_route": "route.integrations.sourcegraph-context-agent"},
    {"prompt": "code context", "expected_route": "route.integrations.sourcegraph-context-agent"},
    {"prompt": "design a partnership strategy", "expected_route": "route.product-business.partnerships-advisor"},
    {"prompt": "partnerships", "expected_route": "route.product-business.partnerships-advisor"},
    {"prompt": "prepare a CFO advisory brief", "expected_route": "route.finance.cfo-advisor"},
    {"prompt": "cfo advisor", "expected_route": "route.finance.cfo-advisor"},
    {"prompt": "design an email marketing campaign", "expected_route": "route.marketing.email-marketer"},
    {"prompt": "email marketing", "expected_route": "route.marketing.email-marketer"},
    {"prompt": "run a competitive intelligence analysis", "expected_route": "route.sales.competitive-intel-analyst"},
    {"prompt": "competitive intel", "expected_route": "route.sales.competitive-intel-analyst"},
    {"prompt": "benchmark our compensation against market", "expected_route": "route.hr.compensation-analyst"},
    {"prompt": "compensation", "expected_route": "route.hr.compensation-analyst"},
    {"prompt": "design our brand strategy", "expected_route": "route.design-content.brand-strategist"},
    {"prompt": "brand strategy", "expected_route": "route.design-content.brand-strategist"},
    {"prompt": "set up observability for this service", "expected_route": "route.platform.observability-engineer"},
    {"prompt": "observability", "expected_route": "route.platform.observability-engineer"},
    {"prompt": "find duplicate agents in the registry", "expected_route": "route.meta-system.deduplicator"},
    {"prompt": "deduplicator", "expected_route": "route.meta-system.deduplicator"},
    {"prompt": "detect low-quality stubs in the registry", "expected_route": "route.meta-system.stub-detector"},
    {"prompt": "stub detector", "expected_route": "route.meta-system.stub-detector"},
    {"prompt": "prepare a CEO review pack", "expected_route": "route.startup-ops.ceo-review-pack"},
    {"prompt": "ceo review", "expected_route": "route.startup-ops.ceo-review-pack"},
    {"prompt": "research this topic with multiple sources", "expected_route": "route.research.deep-research-synthesis"},
    {"prompt": "deep research", "expected_route": "route.research.deep-research-synthesis"},
    {"prompt": "review this clinical guideline", "expected_route": "route.healthcare.clinical-guideline-review"},
    {"prompt": "guideline review", "expected_route": "route.healthcare.clinical-guideline-review"},
    {"prompt": "align curriculum to assessments", "expected_route": "route.education.curriculum-assessment-alignment"},
    {"prompt": "curriculum alignment", "expected_route": "route.education.curriculum-assessment-alignment"},
    {"prompt": "balance demand and inventory", "expected_route": "route.manufacturing.demand-inventory-balancing"},
    {"prompt": "demand balancing", "expected_route": "route.manufacturing.demand-inventory-balancing"}
  ]
}
```

---

## Execution Checklist

- [ ] Create 5 workflow directories under `content/workflows/`
- [ ] Create 5 workflow JSON files
- [ ] Create 5 workflow dossier directories under `references/workflows/`
- [ ] Create 5 workflow dossier files
- [ ] Create 13 agent MD files under `content/agents/<category>/`
- [ ] Create 13 agent dossier files under `references/<category>/`
- [ ] Add 10 workflow fixtures to `tests/workflows/phase8.fixtures.json`
- [ ] Create `tests/routing/phase8-new-agents.fixtures.json` with 34 route fixtures
- [ ] Run `node packages/yes-cli/commands/compile.js`
- [ ] Run `npm run validate`
- [ ] Run `npm test`
- [ ] Run `npm run eval:cost`
- [ ] Run `node packages/yes-cli/index.js eval workflow`
- [ ] Run `node packages/yes-cli/index.js eval route`
- [ ] Run `npm run report:phase8`

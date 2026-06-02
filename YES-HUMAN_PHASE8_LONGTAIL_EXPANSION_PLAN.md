# Yes-human Phase 8 Full V2 Content Implementation Plan

> For agentic workers: this plan is execution-grade. Do not convert it into a generic roadmap. Follow the source-first gates, promote in small batches, and keep the boot surface low-token.

## Goal

Complete the expanded Phase 8 content build from the live checkpoint to the v2 floor:

- `250+` production agents, with a clean path to `450`
- `250-500` production skills, with a Phase 8 floor of `360`
- `100+` production workflows, with a Phase 8 floor of `119`
- `30+` MCP/provider declarations
- `1000+` route fixtures, with a Phase 8 floor of `1500`
- full source dossiers, category packs, hook bindings, knowledge packs, and acceptance reports

This is a content and verification phase, not a rewrite of the router. The existing low-token route kernel, canonical workflow compiler, registries, host bundles, and validation gates remain the architectural center.

The operating rule:

**Research first, generate second, validate before promotion.**

No serious agent, skill, or workflow is created from imagination alone. Every promoted item must be backed by official docs, high-signal OSS sources where available, license-safe pattern extraction, route fixtures, and validation.

## Live Baseline

Repo state checked on `2026-06-01`:

| Surface | Current | Phase 8 floor | V2 upper | Floor gap | Current progress to floor |
|---|---:|---:|---:|---:|---:|
| Agents | 86 | 250 | 450 | 164 | 34.4% |
| Skills | 1 | 360 | 500 | 359 | 0.3% |
| Workflows | 23 | 119 | 100+ | 96 | 19.3% |
| MCP/provider bindings | 16 | 30 | 30+ | 14 | 53.3% |
| Route fixtures | 437 | 1500 | 1000+ | 1063 | 29.1% |

The biggest risk is not agent count. The biggest risk is shallow specialists without reusable skills, knowledge packs, hooks, and fixtures. Phase 8 must therefore build in this order:

1. skill substrate and skill validation
2. source dossier pipeline
3. domain skill packs
4. agent expansion
5. workflow expansion
6. connector and hook bindings
7. route and workflow fixture scale-up
8. acceptance freeze

## Architecture Constraints

These constraints come from `yes-human-agentic-system-architecture.md`, `YES-HUMAN_SOURCE_MAP.md`, and the existing registry/compiler layout.

- Keep `YES_BOOT.md` and the hot route index tiny. Long-tail content must be lazy-loaded by route, category pack, workflow, or explicit source request.
- Preserve canonical content boundaries:
  - agents in `content/agents/<domain>/<agent-id>.md` (YAML frontmatter + markdown body)
  - skills in `content/skills/<domain>/<skill-id>/SKILL.md` (YAML frontmatter + markdown body)
  - workflows in `content/workflows/<domain>/<workflow-id>.json`
  - source dossiers in `references/<domain>/<item-id>.sources.json`
  - generated registries in `registry/*.json`
  - generated hot indexes in `graph/indexes/*.json`
- Treat external projects as pattern donors, not as text/code to copy.
- Use source dossiers before promotion. If a topic cannot meet the source threshold, record it in `reports/research-gaps.md` and route to a broader parent.
- Keep high-stakes domains gated. Legal, finance, HR, healthcare, education, manufacturing, and security content must carry disclaimers, escalation triggers, and verification steps.
- Do not build hundreds of agents without the skill and fixture surface that makes them useful.
- Every promoted item must be routable, testable, and mapped to category packs.

## Source Protocol

For every new agent, skill, and workflow:

1. Define the boundary:
   - user task
   - domain
   - non-goals
   - high-stakes risk level
   - expected inputs and outputs
2. Start from `YES-HUMAN_SOURCE_MAP.md`.
3. Add official docs, standards, or vendor documentation.
4. Add at least `10` relevant GitHub repositories where enough public evidence exists.
5. Add at least `2` non-GitHub references when useful.
6. Record source metadata:
   - URL
   - license
   - latest commit or version
   - source type
   - source tier
   - pattern extracted
   - reuse mode
7. Score the dossier:
   - source count: `0-20`
   - official docs: `0-15`
   - GitHub quality: `0-20`
   - license safety: `0-15`
   - maintenance: `0-10`
   - pattern clarity: `0-10`
   - testability: `0-10`
8. Promote only if:
   - total score is `80+`
   - license safety is `12+`
   - source count is `15+`
   - testability is `7+`

Output paths:

- `references/<domain>/<item-id>.sources.json`
- `reports/research/<item-id>.md`
- `content/agents/<domain>/<agent-id>.md`
- `content/skills/<domain>/<skill-id>/SKILL.md`
- `content/workflows/<domain>/<workflow-id>.json`
- `tests/routing/*.fixtures.json`
- `tests/workflows/<domain>/*.fixtures.json`

## Source Lanes

Use these source lanes as the first-pass mining map. Expand each with task-specific official docs and GitHub search before generation.

| Lane | Primary anchors | Use for |
|---|---|---|
| Harness architecture | ECC, SuperClaude Framework, Claude Code, Claude Cookbook, OpenHands, Aider, Continue, Cline, Open Interpreter | agent contracts, skill density, evaluation, host exports |
| MCP and integrations | Model Context Protocol spec, modelcontextprotocol/servers, MCP Compass, MCP Installer, MCP Hub | connector declarations, trust levels, tool/resource boundaries |
| Planning and orchestration | Claude Task Master, Claude Swarm, PlanCard and DAG patterns from source map | workflow plans, multi-agent decomposition, verification gates |
| Engineering | GitHub Actions docs, OpenTelemetry, language/framework docs, testing/security repos | code agents, CI, build, debug, review, migration skills |
| Platform | Kubernetes, Terraform, Argo CD, Prometheus, Grafana, OpenTelemetry Collector | operations agents, infra workflows, incident and deployment skills |
| Security | OWASP, STRIDE, secret scanning, prompt-injection research, supply-chain security repos | threat models, repo risk scans, security review workflows |
| Data and AI | RAG evaluation repos, vector DB docs, eval frameworks, Hugging Face docs | RAG, eval, data pipelines, model operations |
| Design and content | WCAG, Playwright accessibility, Figma/design system docs, content quality sources | visual QA, accessibility, brand/content workflows |
| Product and startup ops | gstack, PRD/spec examples, product analytics docs, go-to-market playbooks | product, planning, startup operations |
| Marketing and sales | SEO docs, CRM docs, campaign analytics sources, sales ops repos | launch, pipeline, proposal, content workflows |
| Finance and legal | accounting/forecasting docs, compliance standards, contract review sources | finance and legal assistants with disclaimers |
| HR | hiring, onboarding, policy, performance review sources | recruiting, people ops, onboarding workflows |
| Regulated sectors | healthcare, education, manufacturing standards and official sources | domain-specific support with escalation and disclaimers |
| Research | scholarly search APIs, MarkItDown, evidence synthesis sources | document-to-markdown, evidence review, source mining |
| Browser and QA | agent-browser, Playwright, browser automation docs | browser inspection, UI QA, evidence capture |

## Target Matrix

This is the Phase 8 floor. The v2 upper bound remains `450` agents and `500` skills, but Phase 8 completes when this floor passes all gates.

| Domain | Agents now | Agent floor | Agent gap | Skills now | Skill floor | Skill gap | Workflows now | Workflow floor | Workflow gap |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| engineering | 6 | 20 | 14 | 0 | 34 | 34 | 5 | 12 | 7 |
| platform | 5 | 15 | 10 | 0 | 20 | 20 | 1 | 7 | 6 |
| security | 5 | 16 | 11 | 0 | 26 | 26 | 2 | 8 | 6 |
| data-ai | 5 | 18 | 13 | 0 | 28 | 28 | 1 | 9 | 8 |
| integrations | 5 | 14 | 9 | 0 | 22 | 22 | 1 | 8 | 7 |
| research | 4 | 13 | 9 | 1 | 20 | 19 | 1 | 6 | 5 |
| product-business | 5 | 15 | 10 | 0 | 20 | 20 | 1 | 7 | 6 |
| design-content | 5 | 13 | 8 | 0 | 18 | 18 | 1 | 6 | 5 |
| marketing | 5 | 14 | 9 | 0 | 18 | 18 | 1 | 7 | 6 |
| sales | 5 | 14 | 9 | 0 | 18 | 18 | 1 | 6 | 5 |
| finance | 5 | 13 | 8 | 0 | 18 | 18 | 1 | 7 | 6 |
| legal-compliance | 4 | 13 | 9 | 0 | 18 | 18 | 1 | 6 | 5 |
| hr | 5 | 12 | 7 | 0 | 16 | 16 | 1 | 5 | 4 |
| healthcare | 4 | 12 | 8 | 0 | 18 | 18 | 1 | 5 | 4 |
| education | 4 | 11 | 7 | 0 | 14 | 14 | 1 | 4 | 3 |
| manufacturing | 4 | 11 | 7 | 0 | 14 | 14 | 1 | 4 | 3 |
| startup-ops | 4 | 12 | 8 | 0 | 18 | 18 | 1 | 5 | 4 |
| meta-system | 6 | 14 | 8 | 0 | 20 | 20 | 1 | 7 | 6 |
| **Total** | **86** | **250** | **164** | **1** | **360** | **359** | **23** | **119** | **96** |

## Skill Model

Skills are the missing core. Do not create one skill per agent by default. Create skills for repeated task shapes, reusable procedures, tool protocols, source-handling patterns, and verification gates.

Each skill should include:

- `id`
- `domain`
- `purpose`
- `inputs`
- `outputs`
- `activation_triggers`
- `procedure`
- `tools`
- `quality_gates`
- `failure_modes`
- `handoffs`
- `source_references`
- `allowed_agents`
- `allowed_workflows`
- `status`

Skill families to build first:

| Family | Approx floor | Examples |
|---|---:|---|
| Source and evidence | 28 | source mining, citation review, license screen, dossier scoring |
| Engineering | 46 | code review, test triage, dependency upgrade, API design, refactor planning |
| Security | 34 | threat model, secret scan triage, prompt injection review, supply-chain review |
| Platform | 30 | CI triage, deploy rollback, observability setup, incident analysis |
| Data and AI | 38 | RAG eval, dataset profiling, model eval, embedding index review |
| Product and startup | 32 | PRD to plan, roadmap slicing, competitive brief, launch checklist |
| Design and content | 28 | accessibility audit, visual QA, content style review, UX critique |
| Commercial | 42 | campaign plan, deal review, forecast, proposal review, CRM hygiene |
| Regulated operations | 54 | contract risk review, hiring pipeline, clinical escalation, education plan, manufacturing RCA |
| Meta-system | 28 | agent absorption, fixture writing, route evaluation, package export |

## Knowledge Packs

Knowledge packs are compact reference bundles loaded by category, workflow, or explicit route need. They must not bloat boot.

Add:

- `registry/knowledge-packs.json`
- `schemas/knowledge-pack.schema.json`
- `content/knowledge/<domain>/<pack-id>.md`
- `references/knowledge/<pack-id>.sources.json`

Each pack includes:

- `id`
- `domain`
- `scope`
- `summary`
- `source_references`
- `allowed_agents`
- `allowed_workflows`
- `refresh_policy`
- `risk_level`
- `status`

Initial pack targets:

- `engineering.testing-and-review`
- `security.owasp-and-threat-modeling`
- `platform.observability-and-ci`
- `data-ai.rag-and-eval`
- `integrations.mcp-design`
- `design-content.accessibility-and-visual-qa`
- `product-business.prd-and-roadmap`
- `marketing.launch-and-seo`
- `sales.pipeline-and-proposals`
- `finance.forecast-and-budget`
- `legal-compliance.contract-and-privacy`
- `hr.hiring-and-onboarding`
- `healthcare.clinical-safety-boundaries`
- `education.learning-design`
- `manufacturing.quality-and-rca`
- `meta-system.absorption-and-validation`

## Hook Bindings

Hooks should enforce safety and quality at lifecycle boundaries.

Add:

- `registry/hook-bindings.json`
- `schemas/hook-binding.schema.json`

Hook types:

- `pre_route`: redact secrets, detect high-stakes tasks, normalize category aliases
- `pre_agent_load`: check policy, source pack, trust level, and cost budget
- `pre_tool_call`: enforce connector trust, auth, and allowed workflow lists
- `post_agent_output`: require disclaimers, citations, tests, or escalation paths where needed
- `promotion_gate`: block production status without dossier, fixtures, and eval coverage

Initial hook bindings:

- high-stakes disclaimer hook for legal, finance, HR, healthcare, education, manufacturing
- source-dossier promotion hook for all agents, skills, workflows, and knowledge packs
- connector trust hook for MCP/provider bindings
- route confidence hook for fallback to category master
- secret redaction hook for engineering, security, platform, integrations
- citation-required hook for research and source mining

## System and Orchestrator Agents

The architecture defines system-level and orchestrator agents that are distinct from domain specialists. These are infrastructure agents that the routing and execution model depends on.

**System agents** (assigned to `meta-system` domain):
- `supreme-router` (superior master — the top-level dispatcher)
- `budget-controller`
- `context-minimizer`
- `tool-policy-guard`
- `provenance-auditor`
- `workflow-miner`
- `workflow-suggester`
- `graph-builder`
- `graph-query-planner`
- `graphrag-index-agent`
- `agent-lightning-optimizer`
- `rollback-manager`

**Orchestrator agents** (assigned to `meta-system` domain):
- `single-agent-router`
- `parallel-spawner`
- `sequence-coordinator`
- `planner-executor-verifier`
- `conflict-resolver`
- `result-synthesizer`
- `long-horizon-manager`
- `multi-repo-coordinator`

The `meta-system` domain floor of `14` agents includes the master plus `13` of these infrastructure agents. The remaining system and orchestrator agents are created as needed during Wave 7C when the runtime kernel requires them. They do not count toward the domain specialist total but must be schema-valid, routable, and documented.

## Timeline and Dependencies

Estimated durations assume one full-time agentic worker with subagent support:

| Wave | Duration | Dependencies | Can parallelize with |
|---|---|---|---|
| 7A: Skill Substrate | 3-5 days | None | None (must be first) |
| 7B: Source Mining | 2-3 days | 7A complete | None (must precede 7C/7D/7E) |
| 7C: Technical Expansion | 7-10 days | 7A + 7B complete | 7D, 7E (after 7B) |
| 7D: Commercial Expansion | 5-7 days | 7A + 7B complete | 7C, 7E (after 7B) |
| 7E: Regulated Expansion | 5-7 days | 7A + 7B complete | 7C, 7D (after 7B) |
| 7F: Knowledge/Hooks/Connectors | 3-5 days | 7C partially complete | 7D, 7E |
| 7G: Fixture Scale | 4-6 days | 7C + 7D + 7E mostly complete | 7F |
| 7H: Acceptance Freeze | 1-2 days | All prior waves complete | None (must be last) |

**Critical path**: 7A → 7B → 7C → 7G → 7H (approximately 20-28 days).

Waves 7C, 7D, and 7E can run in parallel after 7B completes, reducing total calendar time to approximately 15-20 days with parallel subagent execution.

## Source Dossier Volume Estimate

Phase 8 creates approximately `619` new production items:
- `164` new agents
- `359` new skills
- `96` new workflows

Each requires a source dossier. However, dossiers can be shared across related items (e.g., multiple agents in the same domain can reference the same source pack). Estimated unique dossiers needed:

- Domain-level source packs: `18` (one per domain)
- Skill family source packs: `10` (one per skill family)
- Workflow-specific dossiers: `96` (one per workflow)
- Agent-specific dossiers for unique specialists: approximately `80-100`

**Total unique dossiers: approximately `200-225`**

Wave 7B must produce at least `50` domain and skill family dossiers before Wave 7C can begin. The remaining dossiers are created alongside content in Waves 7C through 7E.

## Fixture Requirements

The per-item minimum fixture requirements total approximately:
- `164` new agents × `5` route fixtures = `820` route fixtures
- `359` new skills × `3` skill fixtures = `1,077` skill fixtures
- `96` new workflows × `2` workflow fixtures = `192` workflow fixtures

This means the **minimum route fixture requirement is approximately `1,257`** (437 existing + 820 new), which is below the `1,500` target. The `1,500` target provides headroom for hard negatives, ambiguous cases, and cross-domain fixtures.

## User Persona System

The architecture defines `20` user personas (developer, architect, CFO, marketer, etc.) that affect routing fixtures and agent trigger design. Phase 8 must ensure:

- Each persona has at least `5` representative route fixtures
- High-stakes personas (CFO, clinician, HR manager) include escalation and disclaimer fixtures
- Agent triggers are designed with persona vocabulary in mind
- Workflow fixtures reflect persona-specific task patterns

Persona-aware fixture generation is assigned to Wave 7G.

## Architecture Document Updates

This plan introduces two new registries not in the current architecture document:
- `registry/knowledge-packs.json`
- `registry/hook-bindings.json`

These must be added to the architecture document's canonical repository layout (Section 6) during Wave 7H acceptance freeze.

## Connector Expansion

Current MCP/provider declarations are `16`; Phase 8 floor is `30+`.

Normalize all connector items to:

- `id`
- `provider`
- `kind`
- `purpose`
- `required_auth`
- `trust_level`
- `allowed_agents`
- `allowed_workflows`
- `cost_profile`
- `fallback`
- `policy`
- optional `package`
- optional `env_var`
- optional `enabled`

Connector batches:

1. Existing technical connectors (7):
   - `firecrawl`
   - `exa`
   - `github`
   - `context7`
   - `memory`
   - `playwright`
   - `sequential-thinking`
2. Business connectors (9):
   - `crm.twenty`
   - `support.chatwoot`
   - `analytics.posthog`
   - `pm.plane`
   - `pm.openproject`
   - `accounting.erpnext`
   - `accounting.odoo`
   - `hr.frappe-hrms`
   - `hr.orangehrm`
3. Knowledge and document connectors (4):
   - `docs.markitdown`
   - `search.github`
   - `search.web`
   - `browser.agent-browser`
4. Regulated-domain placeholders, disabled by default (4):
   - `healthcare.fhir`
   - `education.lms`
   - `manufacturing.cmms`
   - `legal.clm`
5. Additional business connectors from architecture (6+):
   - `crm.hubspot` (disabled by default)
   - `crm.salesforce` (disabled by default)
   - `pm.jira` (disabled by default)
   - `pm.linear` (disabled by default)
   - `communication.slack` (disabled by default)
   - `analytics.mixpanel` (disabled by default)

Disabled connectors are acceptable if they are schema-valid, mapped, policy-gated, and have clear fallback behavior.

## Subagent Operating Model

Use fresh subagents per batch. Each subagent gets a narrow write scope and returns a patch plus evidence.

| Subagent | Scope | Writes | Required evidence |
|---|---|---|---|
| Source miner | source discovery and dossier creation | `references/**`, `reports/research/**` | official docs, GitHub refs, licenses, source score |
| Skill architect | skill schema/content generation | `content/skills/**`, `tests/fixtures/skills/**` | allowed agents, workflow mappings, quality gates |
| Agent architect | agent expansion | `content/agents/**`, route fixtures | dossier link, skill links, fallback route |
| Workflow architect | workflow generation | `content/workflows/**`, workflow fixtures | primary agent, participants, success criteria |
| Connector architect | MCP/provider registry | `registry/mcps.json`, connector tests | trust level, auth, fallback, allowed lists |
| Knowledge architect | compact knowledge packs | `content/knowledge/**`, `registry/knowledge-packs.json` | source freshness, risk level, load rules |
| Hook architect | lifecycle enforcement | `registry/hook-bindings.json`, schemas/tests | blocked cases and allowed cases |
| Evaluator | eval fixtures and reports | `tests/**`, `reports/**` | route/workflow/skill accuracy and cost |
| Release curator | docs and acceptance cleanup | `README.md`, planning docs, `reports/phase8-acceptance.md` | final counts and gate results |

Review after every subagent batch. Do not merge a batch that lowers route/workflow accuracy or introduces schema drift.

## Wave Plan

### Wave 7A: Skill Substrate

Purpose: make skills a first-class production surface before mass expansion.

Tasks:

1. Add `content/skills/<domain>/<skill-id>/SKILL.md` as the canonical skill source.
2. Add `schemas/skill.schema.json`.
3. Add `references/skills/<domain>/<skill-id>.sources.json`.
4. Add `packages/yes-schema/eval-skill.js`.
5. Add `packages/yes-schema/eval-route.js` (if not already present).
6. Add `packages/yes-schema/eval-workflow.js` (if not already present).
7. Expose `yes eval skill`, `yes eval route`, `yes eval workflow` CLI commands.
8. Compile generated `registry/skills.json` from canonical skill files.
9. Add tests for:
   - schema validation
   - missing dossier rejection
   - allowed agent/workflow mapping
   - high-stakes disclaimer requirements
   - skill fixture top-1 accuracy

Exit criteria:

- `25` foundational skills promoted
- skill eval exists and passes
- route eval exists and passes
- workflow eval exists and passes
- `npm run validate` passes
- boot cost does not exceed budget

### Wave 7B: Source Mining and Dossier Cache

Purpose: make source-backed generation repeatable.

Tasks:

1. Add `registry/source-dossier-cache.json`.
2. Add `schemas/source-dossier.schema.json` if the existing dossier schema cannot cover skills and knowledge packs cleanly.
3. Add `reports/research-gaps.md`.
4. Add a dossier scoring helper in `packages/yes-schema`.
5. Add source refresh rules:
   - AI/security/cloud/pricing: refresh before `30-45` days
   - other technical domains: refresh before `90` days
   - stable standards: refresh before `180` days
6. Add source lane metadata for each target domain.

Exit criteria:

- all new production items link to dossiers
- no unclear-license sources are used for redistributed content
- research gaps are explicit instead of hidden as weak agents
- at least `50` domain and skill family dossiers exist with score `80+`
- dossier cache covers all `18` domains and `10` skill families
- Wave 7C can begin only when the `50` dossier threshold is met

### Wave 7C: Technical Domain Expansion

Purpose: expand the technical backbone first because it powers evaluation, connectors, and host exports.

Domains:

- engineering
- platform
- security
- data-ai
- integrations
- research
- meta-system

Batch limits:

- maximum `15` agents per commit
- maximum `25` skills per commit
- maximum `8` workflows per commit
- minimum `5` route fixtures per new specialist
- minimum `3` skill fixtures per new skill

Required additions:

- engineering reaches `20` agents and `34` skills
- platform reaches `15` agents and `20` skills
- security reaches `16` agents and `26` skills
- data-ai reaches `18` agents and `28` skills
- integrations reaches `14` agents and `22` skills
- research reaches `13` agents and `20` skills
- meta-system reaches `14` agents and `20` skills

Exit criteria:

- route eval remains at or above current threshold
- workflow eval passes
- skill eval passes
- all host bundle tests pass

### Wave 7D: Product, Design, and Commercial Expansion

Purpose: build repeated non-engineering work surfaces without making them generic chat roles.

Domains:

- product-business
- design-content
- marketing
- sales
- startup-ops

Required additions:

- product-business reaches `15` agents and `20` skills
- design-content reaches `13` agents and `18` skills
- marketing reaches `14` agents and `18` skills
- sales reaches `14` agents and `18` skills
- startup-ops reaches `12` agents and `18` skills

Workflow examples:

- `product-business.roadmap-refresh`
- `product-business.prd-review`
- `design-content.design-system-audit`
- `design-content.copy-and-a11y-review`
- `marketing.content-pipeline`
- `marketing.seo-improvement`
- `sales.proposal-review`
- `sales.crm-hygiene`
- `startup-ops.fundraising-readiness`
- `startup-ops.weekly-operating-review`

Exit criteria:

- commercial workflows route to workflows, not just agents
- reusable skills cover repeated work
- no broad "strategy" specialist is promoted without concrete tasks and fixtures

### Wave 7E: Regulated and Operational Domain Expansion

Purpose: expand high-stakes domains with safety boundaries.

Domains:

- finance
- legal-compliance
- hr
- healthcare
- education
- manufacturing

Required additions:

- finance reaches `13` agents and `18` skills
- legal-compliance reaches `13` agents and `18` skills
- hr reaches `12` agents and `16` skills
- healthcare reaches `12` agents and `18` skills
- education reaches `11` agents and `14` skills
- manufacturing reaches `11` agents and `14` skills

Mandatory gates:

- disclaimer-carrying agents for all legal, medical, HR, finance, safety, and compliance content
- escalation steps for regulated decisions
- "informational support only" policy text where appropriate
- connector trust policy before external writes
- at least one negative fixture per high-stakes workflow

Exit criteria:

- validators reject high-stakes items without policy gates
- route fixtures include safe refusal/escalation examples
- workflow fixtures include expected disclaimers and success criteria

### Wave 7F: Knowledge Packs, Hooks, and Connectors

Purpose: make the expanded corpus operational instead of only routable.

Tasks:

1. Add knowledge pack registry and schemas.
2. Add first `16` domain knowledge packs.
3. Add hook binding registry and schemas.
4. Expand MCP/provider declarations from `16` to `30+`.
5. Map every connector to explicit agents and workflows.
6. Add fallback behavior for disabled connectors.
7. Add tests for hook enforcement and connector policy.

Exit criteria:

- category packs include agents, skills, workflows, connectors, hooks, knowledge packs, and fixtures
- disabled connectors are visible in acceptance reports
- high-risk tool calls require policy alignment

### Wave 7G: Fixture and Evaluation Scale

Purpose: make the large surface measurable.

Tasks:

1. Raise route fixtures from `437` to at least `1500`.
2. Add skill fixtures for every production skill.
3. Add workflow fixtures for every production workflow.
4. Add hard negatives:
   - ambiguous task
   - wrong domain
   - high-stakes unsafe request
   - connector unavailable
   - stale source request
5. Add acceptance rollup:
   - route accuracy
   - workflow accuracy
   - skill accuracy
   - dossier coverage
   - connector coverage
   - disabled connector count
   - boot token budget
   - host bundle status

Exit criteria:

- `node packages/yes-schema/eval-route.js` passes
- `node packages/yes-schema/eval-workflow.js` passes
- `node packages/yes-schema/eval-skill.js` passes
- `npm run eval:cost` remains within budget

### Wave 7H: Phase 8 Acceptance Freeze

Purpose: stop expansion, reconcile docs, and publish the Phase 8 acceptance snapshot.

Tasks:

1. Generate `reports/phase8-acceptance.md`.
2. Update `README.md`.
3. Update architecture and planning docs where counts or phase definitions drifted.
4. Confirm generated registries match canonical content.
5. Confirm all category packs are complete.
6. Confirm source gaps are documented.
7. Confirm host bundle exports still pass for:
   - `claude`
   - `codex`
   - `opencode`
   - `mcp`

Exit criteria:

- `250+` agents
- `360+` skills
- `119+` workflows
- `30+` MCP/provider declarations
- `1500+` route fixtures
- `100%` dossier coverage for production agents, skills, workflows, and knowledge packs
- no stale planning docs contradict the acceptance report

## Commit Discipline

Use reviewable vertical slices.

Recommended commit size:

- schema/compiler change: one commit
- source mining helpers: one commit
- `8-15` agents plus fixtures: one commit
- `15-25` skills plus fixtures: one commit
- `5-8` workflows plus fixtures: one commit
- connector or hook registry batch: one commit
- acceptance/doc reconciliation: one commit

Do not combine schema churn, large content generation, and docs reconciliation in the same commit unless the patch is tiny.

## Validation Commands

Run these after every promotion batch:

```bash
npm run validate
node packages/yes-schema/eval-route.js
node packages/yes-schema/eval-workflow.js
node packages/yes-schema/eval-skill.js
npm run eval:cost
npm test -- --test-reporter=tap
```

Run host bundle checks before acceptance:

```bash
npm run build:hosts -- claude
npm run build:hosts -- codex
npm run build:hosts -- opencode
npm run build:hosts -- mcp
```

If exact script names differ, add stable npm aliases instead of documenting one-off commands.

## Promotion Rules

An item can move to production only when all applicable checks pass:

- schema-valid
- source dossier exists
- source dossier score is high enough
- license-safe
- mapped to a category pack
- mapped to allowed skills or allowed agents
- mapped to workflows where relevant
- route fixtures exist
- workflow or skill fixtures exist where relevant
- high-stakes disclaimers and escalation paths exist where relevant
- connector policy is explicit where tools are used
- generated registries are rebuilt from canonical content

## Anti-Goals

Do not:

- add hundreds of shallow agents without skills
- copy prompts or docs from OSS repos
- load all long-tail content at boot
- hand-edit generated registries as source of truth
- create a skill for every agent just to inflate counts
- promote high-stakes content without disclaimers and escalation gates
- add connectors without trust levels, allowed lists, and fallbacks
- treat route accuracy as enough; workflow and skill accuracy are required

## First Execution Slice

Start with Wave 7A because it unblocks the rest.

Concrete first slice:

1. Add canonical skill schema and compiler support.
2. Add skill dossier validation.
3. Add `eval-skill.js`.
4. Add `25` foundational skills across engineering, security, platform, data-ai, integrations, research, and meta-system.
5. Add skill fixtures and route mappings for those skills.
6. Run validation and evals.
7. Commit only after the gates are green.

Only after this slice should long-tail agent generation resume. This keeps the v2 expansion aligned with the architecture instead of turning Phase 8 into a large unverified catalog.

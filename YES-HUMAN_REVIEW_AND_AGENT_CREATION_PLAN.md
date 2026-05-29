# Yes-human Review And Agent-Creation Plan

**Date:** 2026-05-29  
**Reviewed artifact:** `yes-human-agentic-system-architecture.md`  
**Companion documents:**
- `YES-HUMAN_SOURCE_MAP.md` — Validated source registry for agent/workflow creation
- `YES-HUMAN_DEVELOPMENT_PLAN.md` — Phased engineering roadmap with ECC integration
- `reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md` — 180+ repos mapped across 8 ECC skill categories

**Purpose:** This document captures review findings, blockers, and the agent creation strategy. For execution details, see the development plan. For source references, see the source map.

---

## 1. Review Verdict

The architecture direction is correct: Yes-human should be a portable, low-token control plane with lazy-loaded agents, graph routing, policy gates, source-backed content, and generated host bundles.

The main drawback is not the idea. The main drawback is that the document is too broad to execute directly. It already describes a mature platform, but it does not yet define the smallest buildable vertical slice, the exact internal migration path from `jas-human`, or the source-dossier mechanics needed before creating hundreds of agents.

Proceed, but do not start by generating 250-450 agents. Build the route kernel, validators, source dossier pipeline, and 3-5 agents per priority category first.

**ECC Deep Research Integration:** The companion deep research report identified 180+ repositories and 14 critical architecture patterns that validate yes-human's approach. Key findings:
- Low-token, lazy-loaded routing is validated by multiple independent implementations
- PlanCard pattern (from `forgent`) should be the `yes route` output format
- 4-signal quality scoring (from `ctx`) should validate skills/workflows
- All critical patterns are MIT/Apache-2.0 compatible

See `reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md` for full analysis.

---

## 2. Findings

### BLOCKER: Source Evidence Gap

Section 2 lists broad references, while Section 31 requires per-agent and per-workflow source dossiers. That means the current architecture claims a source-backed design but does not yet provide the source system needed to safely create production agents.

Required fix:

- Treat `YES-HUMAN_SOURCE_MAP.md` as the seed source registry.
- Require `references/<domain>/<agent-id>.sources.json` before any specialist agent becomes production.
- Add a validator that blocks production promotion when `source_references` are missing, stale, unclear-license, or too generic.

### BLOCKER: Scope Is Too Large For First Implementation

The document says not to release a 400-agent repo first, but later targets 250-450 production agents, 250-500 skills, 100+ workflows, 30+ MCP bindings, and 1000+ route fixtures. That is fine as a v2 target, but not as an implementation starting point.

Required fix:

- Define a vertical slice with one CLI, one route table, one schema set, one source dossier, one category master, 5 specialist agents, 5 workflows, and tests.
- Expand by category packs only after the route/eval/cost gates work.

### HIGH: Architecture Is Mixed With Plan, Schemas, Inventory, And Policies

The main document is doing too many jobs. It includes architecture, product definition, repository layout, schemas, source-mining protocol, implementation phases, content inventory, business workflows, and acceptance criteria.

Required fix:

- Keep the current file as the full architecture reference.
- Move execution details into `YES-HUMAN_DEVELOPMENT_PLAN.md`.
- Keep source discovery in `YES-HUMAN_SOURCE_MAP.md`.
- Keep review decisions and creation sequence in this plan.

### HIGH: Internal `jas-human` Migration Is Not Concrete Enough

Internal memory says `jas-human` already has 201 agents across 36 categories, a flat `AGENT_INDEX.json`, `CATEGORY_REGISTRY.json`, master agents, and meta agents. The architecture references preserving that pattern, but it does not define a migration report format or acceptance threshold for imported agents.

Required fix:

- Import `jas-human` into `staging/internal/jas-human`.
- Produce `reports/internal-migration/jas-human-inventory.md`.
- Map every imported item to one of: `promote`, `merge`, `rewrite`, `staging-only`, `reject`.
- Preserve the flat keyword routing pattern as the initial exact-route baseline.

### HIGH: Agent Creation Could Become Stub Generation

The document says not to create generic stubs, but the content scope is large enough that bulk generation will be tempting. Without an enforced factory contract, this will create low-quality agents with weak triggers, no tests, and repeated instructions.

Required fix:

- Agent factory must create agents only from a passed source dossier.
- Every production agent needs frontmatter, trigger tests, failure modes, allowed tools, verification, budget band, and examples.
- Every category must start with a master, route fixtures, and top workflows before long-tail agents.

### HIGH: License And Provenance Need To Be Runtime Gates, Not Documentation

The architecture says to avoid untrusted absorption, but source-mining and absorption must be blocked by code, not left to contributor discipline.

Required fix:

- Add `license-registry.json`, `provenance.pending.json`, and `source-reference.schema.json` in Phase 1.
- Add blocking promotion rules for missing license, unclear license, no source URL, no commit/version, or copied incompatible content.
- Require a rollback record for every promotion.

### MEDIUM: Startup Token Guarantees Need Testable Tooling

The architecture repeatedly states `60-180` startup tokens and `<300` hard cap. That is useful, but currently it is a claim, not a test.

Required fix:

- Implement `yes eval cost` early.
- It must inspect generated `YES_BOOT.md`, `CLAUDE.md`, `AGENTS.md`, and route tables.
- It must fail if full registries, category lists, or source dossiers appear in startup output.

### MEDIUM: Adapter List Still Risks Overreach

The document now separates core adapters from optional packs, which is the right direction. The remaining risk is building host bundles before the route kernel and schema validation exist.

Required fix:

- CLI adapter first.
- Codex and Claude exports second.
- MCP bundle third.
- Cursor, Windsurf, VS Code, Sourcegraph, and Generic adapter only after host bundle validation exists.

### MEDIUM: Non-Technical Domains Need Stronger Source Discipline

Marketing, sales, finance, legal, and HR are included, which is good. The risk is that legal/finance/HR agents can produce high-stakes outputs with weak or outdated sources.

Required fix:

- High-stakes agents must use current primary or official sources when factual currency matters.
- Legal, finance, tax, HR, compliance, security, privacy, and healthcare-like outputs require disclaimer and human-review gates.
- Production promotion must fail if the domain lacks adequate official or authoritative references.

---

## 3. Updated Agent-Creation Strategy

Build agents in controlled waves. For infrastructure and runtime development phases, see `YES-HUMAN_DEVELOPMENT_PLAN.md`. This section focuses on agent creation specifically.

### Waves 0-2: Infrastructure & Minimal Runtime

See `YES-HUMAN_DEVELOPMENT_PLAN.md` Phases 0-2 for:
- Source and schema infrastructure (Wave 0 / Phase 0-1)
- Internal inventory and migration (Wave 1 / Phase 1)
- Minimal runtime slice with `yes route` and `yes eval cost` (Wave 2 / Phase 2)

**Exit criteria before agent creation begins:**
- Source dossier schema validates
- License/provenance validator blocks bad sources
- `yes route` correctly matches exact keywords to route IDs
- `yes eval cost` verifies startup stays under 180 tokens
- One hand-authored dossier passes all validation gates

### Wave 3: First Category Masters

Create these masters first:

- `engineering.master`
- `security.master`
- `data-ai.master`
- `integrations.master`
- `product-business.master`
- `finance.master`
- `legal-compliance.master`
- `marketing.master`
- `sales.master`
- `hr.master`
- `design-content.master`
- `platform.master`
- `meta-system.master`

Each master must include:

- scope
- non-scope
- routing triggers
- child category list
- top workflows
- allowed tools
- high-stakes gates if applicable
- route fixtures

### Wave 4: First-Wave Specialist Agents

Create 3-5 agents per priority category first. Do not create long-tail agents yet.

Priority first-wave agents:

- Engineering: `code-reviewer`, `build-error-resolver`, `tdd-guide`, `architect`, `docs-updater`
- Security: `security-reviewer`, `threat-modeler`, `secret-scan-agent`, `dependency-risk-agent`, `prompt-injection-reviewer`
- Data/AI: `rag-engineer`, `eval-engineer`, `graph-rag-engineer`, `ml-engineer`, `vector-search-agent`
- Integrations: `mcp-connector-designer`, `github-operator`, `browser-automation-agent`, `sourcegraph-context-agent`, `vercel-agent`
- Product/business: `product-manager`, `startup-ceo-advisor`, `operations-planner`, `customer-success-advisor`, `partnerships-advisor`
- Finance: `cfo-advisor`, `financial-analyst`, `budget-planner`, `forecasting-analyst`, `cash-flow-manager`
- Legal/compliance: `contract-reviewer`, `privacy-advisor`, `compliance-checker`, `licensing-advisor`, `terms-drafter`
- Marketing: `marketing-strategist`, `seo-analyst`, `content-marketer`, `email-marketer`, `campaign-analyst`
- Sales: `sales-strategist`, `pipeline-analyst`, `proposal-generator`, `competitive-intel-analyst`, `pricing-strategist`
- HR: `hiring-manager`, `onboarding-coordinator`, `compensation-analyst`, `performance-reviewer`, `policy-drafter`
- Design/content: `frontend-design-agent`, `accessibility-auditor`, `technical-writer`, `presentation-designer`, `brand-strategist`
- Platform: `devops-engineer`, `ci-cd-engineer`, `observability-engineer`, `release-manager`, `incident-responder`
- Meta-system: `source-miner`, `plugin-absorber`, `deduplicator`, `stub-detector`, `eval-runner`

Exit criteria for each agent:

- source dossier score `>= 80`
- no blocker license/provenance findings
- route fixtures pass
- cost budget passes
- failure modes and verification exist
- not a duplicate of a better existing agent

### Wave 5: Workflow-First Expansion

Create workflows before adding more agents.

First workflows:

- `engineering.code-review-with-security`
- `engineering.fix-build-error`
- `engineering.tdd-feature`
- `security.repo-risk-scan`
- `security.prompt-injection-review`
- `data-ai.rag-eval`
- `integrations.mcp-server-design`
- `frontend.visual-and-a11y-check`
- `product.prd-to-plan`
- `marketing.launch-campaign`
- `sales.deal-review`
- `finance.monthly-forecast`
- `legal.contract-risk-review`
- `hr.hiring-pipeline`
- `platform.ci-failure-triage`
- `meta.source-mine-and-dossier`

Exit criteria:

- every workflow has inputs, outputs, steps, tools, gates, success criteria, rollback or no-write statement, and eval fixtures.

### Wave 6: Host Bundles

Build bundles only after route kernel and validation work.

Order:

1. CLI
2. Codex
3. Claude
4. MCP
5. AGENT.md/OpenCode
6. Optional Cursor
7. Optional Windsurf
8. Optional Sourcegraph
9. Optional Generic adapter

Exit criteria:

- generated boot file under cap
- no full registries in startup output
- generated commands point to valid workflows
- unsupported host features are explicitly marked and degraded

---

## 4. Required Dossier Format

Each production agent must have a dossier:

```json
{
  "dossier_id": "dossier.engineering.code-reviewer.2026-05-29",
  "agent_id": "engineering.code-reviewer",
  "domain": "engineering.code-quality",
  "created_at": "2026-05-29T00:00:00+05:30",
  "expires_at": "2026-08-27T00:00:00+05:30",
  "sources": [
    {
      "url": "https://github.com/semgrep/semgrep",
      "source_type": "github_repo",
      "license": "checked",
      "version_or_commit": "required-before-promotion",
      "used_for": ["static-analysis workflow pattern"],
      "copy_policy": "patterns_only"
    }
  ],
  "scores": {
    "source_count": 0,
    "official_docs": 0,
    "github_quality": 0,
    "license_safety": 0,
    "maintenance": 0,
    "pattern_clarity": 0,
    "testability": 0,
    "total": 0
  },
  "promotion_decision": "staging"
}
```

---

## 5. Updated Architecture Decisions

Apply these decisions to the main architecture:

- Source map is mandatory seed input.
- Per-agent dossiers are required before production promotion.
- Agent generation is source-first and workflow-first.
- Internal `jas-human` import is a staging migration, not direct production content.
- First implementation is a vertical slice, not full v2 content scale.
- Cost, source, license, route, and host-bundle validators are Phase 1 infrastructure.
- Optional adapters are delayed until core routing and validation pass.

---

## 6. Immediate Next Build Plan

See `YES-HUMAN_DEVELOPMENT_PLAN.md` for the complete phased roadmap with ECC integration. The development plan covers:

1. **Phase 0**: Bootstrap & Validation (current state - complete)
2. **Phase 1**: Core Decisions & Policy Layer (`yes-core`)
3. **Phase 2**: Execution & Spawner Runtime (`yes-runtime`)
4. **Phase 3**: Multi-Tiered Index & Phrase Trie (`yes-graph`)
5. **Phase 4**: Multi-Agent Workflows & Orchestrator (`yes-workflows`)
6. **Phase 5**: Platform Adapters & Exporters (`yes-adapters`)
7. **Phase 6**: Specialist Agent Expansion & Promotion

Each phase includes ECC source map integration points, folder skeletons, key contracts, and verification checkpoints.

**First agent creation milestone:** After Phase 2 completion, create one engineering source dossier (`engineering.code-reviewer`) and verify it passes all validation gates before proceeding to Wave 3 category masters.


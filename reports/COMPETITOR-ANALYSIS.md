# yes-human Competitive Analysis Report

**Date:** 2026-05-29
**Analyst:** opencode (automated)
**Scope:** 5 closest competitors to yes-human's agentic control plane vision

---

## Executive Summary

yes-human's planned architecture (portable, low-token agentic control plane with graph-based routing and lazy-loaded agents) occupies a unique niche. No single competitor combines all four pillars: **(1) graph-based routing**, **(2) token-budget awareness**, **(3) cross-harness portability**, and **(4) provenance/license tracking**.

The competitive landscape splits into three camps:
- **Routing orchestrators** (AgentMaster) — keyword-based dispatch, no memory
- **Memory-first harnesses** (agentic-harness, iso) — portable brains, weak routing
- **Governance substrates** (nexus-agents, agent-harness) — heavy infrastructure, high token cost

yes-human's differentiator is the **ROUTE_TABLE.min.json + lazy-load** model: tiny boot, graph-indexed dispatch, task-scoped loading. The patterns below should be adopted to close gaps while preserving this advantage.

---

## 1. AgentMaster (Surya8991/AgentMaster)

**Stars:** 1 | **License:** MIT | **Tech:** Shell scripts + SKILL.md files | **Platforms:** 11

### Core Architecture Pattern
Three-layer stacked architecture that **stack, never compete:**
```
OUTPUT LAYER:    caveman (token compression, ~75% savings)
WORKFLOW LAYER:  superpowers (brainstorm → plan → TDD → review → finish)
DOMAIN LAYER:    claude-skills + custom (240+ skills across 12 domains)
```

### Routing Algorithm
**Signal-word routing table** with 23 categories. Each category has signal words that map to specific skills:
- "build, create, implement" → brainstorming + engineering-team
- "bug, crash, error" → systematic-debugging
- "commit, merge, ship" → finishing-a-development-branch

**Smart tiebreakers** resolve ambiguity: "pipeline" defaults to DevOps but "sales pipeline" → Business Growth. **Hard limit:** max 2 domain skills per request.

### Key Strengths
- **Dry-run mode** (`/agent-master route <task>`) shows routing plan without executing
- **Multi-domain combinations** with explicit routing strategies (Code+DevOps, Security+Compliance, etc.)
- **Repomix codebase snapshots** auto-generated at session start, reused by multiple skills
- **Auto-update** with 6-hour cooldown, background non-blocking
- **Loop prevention:** max depth=2, no self-invocation, no circular calls

### Unique Features
- **Caveman integration:** output-layer token compression that layers on top of any skill output
- **RULES.md system:** project-level and global rules loaded at session start
- **Dependency cloning:** installer clones 5 dependency repos (caveman, superpowers, claude-skills, claude-mem, self)
- **Tool-Stack-Reference:** 1524 tools + 1767 tech items as free-first reference database

### Weaknesses/Gaps
- **No memory system** — relies on bundled claude-mem but no native learning loop
- **Static routing** — keyword matching, no telemetry feedback, no learning
- **No token budget awareness** — loads all matched skills fully, no progressive disclosure
- **No provenance tracking** — credits listed but no machine-readable license metadata
- **No graph/codebase indexing** — routing is flat category matching

### Lessons for yes-human
1. **Adopt signal-word routing table format** — maps directly to `ROUTE_TABLE.min.json`. Each entry: `{category, signalWords, routesTo, tiebreakers}`
2. **Adopt dry-run mode** — `yes route --dry-run <task>` should show routing plan before execution
3. **Adopt loop prevention rules** — max depth, no self-invocation, no circular calls
4. **Adopt repomix-style codebase snapshots** — but as a graph index, not raw XML
5. **Adopt caveman-style output compression** — as an optional output-layer hook

---

## 2. agentic-harness (tbhrc/agentic-harness)

**Stars:** 0 | **License:** MIT | **Tech:** Python | **Platforms:** 8 adapters

### Core Architecture Pattern
**"The harness is dumb, the knowledge is in files."** Three modules:
- **Memory** — 4 layers with distinct retention policies
- **Skills** — progressive disclosure (tiny manifest always loaded, full SKILL.md on trigger match)
- **Protocols** — typed tool schemas, permissions, delegation contracts

### Memory Architecture (Most Relevant to yes-human)
```
working/    — live task state, volatile, archived after 2 days
episodic/   — what happened in prior runs, JSONL, scored by salience
semantic/   — distilled patterns that outlive episodes (lessons.jsonl → LESSONS.md)
personal/   — user preferences, never merged into semantic
```

### Key Strengths
- **Progressive skill disclosure** — `_index.md` + `_manifest.jsonl` always in context (tiny); full `SKILL.md` loads only when triggers match
- **Host-agent review protocol** — `auto_dream.py` stages candidates mechanically; host agent reviews via `graduate.py`/`reject.py`/`reopen.py` with required rationale
- **Content clustering** — single-linkage Jaccard with bridge merging for pattern detection
- **Self-rewrite hooks** — every skill has a rewrite hook at the bottom
- **Onboarding wizard** — 6 preference questions + feature toggles, generates `PREFERENCES.md`
- **FTS5 memory search** — opt-in full-text search with SQLite FTS5 → ripgrep → grep fallback

### Unique Features
- **Nightly staging cycle** — `auto_dream.py` runs via cron, clusters recurring patterns into candidate lessons. No git commits, no network, no reasoning — safe unattended
- **Decision log** — rejected candidates retain full decision history so recurring churn is visible
- **Skill failure tracking** — `on_failure` flags skills that fail 3+ times in 14 days for rewrite
- **Multi-agent orchestration** — 5 separate report files to avoid edit conflicts
- **Compatibility matrix** — `.agent/COMPATIBILITY.md` as single source of truth for verified features

### Weaknesses/Gaps
- **No routing intelligence** — relies on host agent to decide which skills to load
- **Python-only tooling** — limits portability to Node.js/TypeScript ecosystems
- **No token budget system** — progressive disclosure helps but no explicit budget tracking
- **No graph-based indexing** — memory is flat file-based
- **Fork-dependent** — 125 commits behind upstream, maintenance risk

### Lessons for yes-human
1. **Adopt progressive disclosure model** — `ROUTE_TABLE.min.json` is the manifest; full agent/skill files load only on match. This IS yes-human's planned architecture.
2. **Adopt 4-layer memory model** — working (session), episodic (task logs), semantic (distilled lessons), personal (user prefs). Map to `graph/memory/`
3. **Adopt auto_dream staging cycle** — nightly cron job that clusters patterns and stages candidates. No AI needed for mechanical clustering.
4. **Adopt host-agent review protocol** — `graduate.py`/`reject.py` with required rationale prevents rubber-stamping
5. **Adopt skill failure tracking** — 3+ failures in 14 days triggers rewrite flag. Feed into graph health metrics.
6. **Adopt COMPATIBILITY.md pattern** — verified feature matrix per harness adapter

---

## 3. iso (Agent-Pattern-Labs/iso)

**Stars:** 6 | **License:** Not specified | **Tech:** TypeScript/Node.js | **Platforms:** 4 (Cursor, Claude Code, Codex, OpenCode)

### Core Architecture Pattern
**"Isomorphic agent tooling: author once, run anywhere."** A build/lint/route/fan-out/eval/trace/guard/contract/ledger toolkit. The emphasis is on **cross-platform portability at the tooling level** — not just config files, but the entire agent workflow pipeline.

### Key Strengths
- **Isomorphic approach** — same authoring format compiles to all target platforms
- **Comprehensive verb set** — build, lint, route, fan out, eval, trace, guard, contract, ledger
- **Contract and ledger primitives** — formal verification of agent behavior and immutable record
- **Active release cadence** — 89 tags, 82 commits, last updated May 23 2026
- **Harness fixtures package** — test fixtures for agent harness testing

### Unique Features
- **Guard primitive** — runtime safety checks on agent behavior
- **Contract system** — formal specifications for agent workflows
- **Ledger** — immutable record of agent actions (blockchain-like append-only)
- **Fan-out routing** — parallel dispatch to multiple agents with result aggregation
- **Trace system** — execution tracing for debugging and observability
- **Eval framework** — built-in evaluation of agent output quality

### Weaknesses/Gaps
- **Library, not a system** — provides building blocks but no complete harness
- **No memory system** — focused on workflow execution, not learning
- **No token optimization** — no progressive disclosure or budget awareness
- **Limited platform support** — only 4 platforms vs AgentMaster's 11
- **Documentation sparse** — README is minimal, architecture details in code

### Lessons for yes-human
1. **Adopt contract primitive** — define formal contracts for agent behavior that can be verified
2. **Adopt ledger/audit trail** — append-only record of routing decisions and agent actions
3. **Adopt fan-out pattern** — parallel dispatch with result aggregation for complex tasks
4. **Adopt trace system** — execution traces feed into graph learning and debugging
5. **Adopt isomorphic authoring** — single source format that compiles to all target harnesses

---

## 4. nexus-agents (nexus-substrate/nexus-agents)

**Stars:** 13 | **License:** MIT | **Tech:** TypeScript/Node.js (pnpm) | **Platforms:** 5 CLI adapters

### Core Architecture Pattern
**Governance substrate above engineering agents.** Not an agent itself — it's the layer that enforces rules, reviews work adversarially, audits everything, and routes based on what actually worked.

```
Human/IDE/CLI → MCP Protocol → GOVERNANCE SUBSTRATE → Engineering Agents → Code
                                 (nexus-agents)         (Claude/Codex/Gemini)
```

### Routing Algorithm
**Closed-loop telemetry with bandit learning:**
- `OutcomeStore` records production results
- **LinUCB bandit** + **TOPSIS scoring** + adaptive routing bonuses
- System learns from what shipped vs what regressed
- **CompositeRouter** with multi-stage routing

### Key Strengths
- **Adversarial PR review** — 5 voter roles (architect, security, devex, catfish, scope_steward) with 4-point verification gate. v5 eval: 100% bug-catch rate
- **Drift-detected charter** — `CLAUDE.md` + `governance:check` + blocking CI gates fail build when documented rules drift from registered behavior
- **Immutable audit trail** — hash-chained append-only storage, verifiable via `verify_audit_chain` MCP tool
- **Multi-voter consensus** — 6 strategies: simple/super-majority, unanimous, higher-order Bayesian, opinion-wise, proof-of-learning
- **42 MCP tools** — comprehensive tool surface
- **OpenSSF Best Practices** badge — serious about security

### Unique Features
- **11 expert types** with role-bound prompt + tools + memory
- **Research system** — 9 discovery sources (arXiv, GitHub, Semantic Scholar), auto-catalog, quality scoring, synthesis
- **Graph workflows** — DAG-based execution with checkpoint/resume, state reduction, event hooks
- **Security pipeline** — sandboxing (Docker/policy), trust-tiered input, SARIF parsing, red-team patterns
- **Development pipeline** — Research → Plan → Vote → Decompose → Implement → QA → Security
- **5 memory backends** — session, belief, agentic, adaptive, typed
- **Fitness audit** — `nexus-agents fitness-audit` for routing health scoring

### Weaknesses/Gaps
- **Extremely heavy** — 42 MCP tools, 11 expert types, full governance stack. High token cost per invocation
- **No token budget awareness** — governance overhead is not measured or bounded
- **Complexity barrier** — steep learning curve, many concepts to understand
- **Over-engineered for simple tasks** — voting on "use SQLite vs JSON" is overkill
- **No progressive disclosure** — loads full governance context every time

### Lessons for yes-human
1. **Adopt drift detection** — validate that `ROUTE_TABLE.min.json` entries match actual agent behavior. CI gate that fails on drift.
2. **Adopt OutcomeStore concept** — but simplified. Record: task, route chosen, outcome (success/fail/regression). Feed back into routing weights.
3. **Adopt hash-chained audit trail** — lightweight version: append-only JSONL with hash chain for routing decisions
4. **Adopt fitness audit** — `yes fitness` command that scores routing health
5. **Adopt `doctor` command** — health check table (Node version, API keys, configured tools)
6. **Reject full bandit learning** — too heavy. Use simple success-rate tracking with exponential decay instead of LinUCB.
7. **Reject multi-voter consensus** — too expensive for yes-human's token budget. Use single-pass routing with optional escalation.

---

## 5. agent-harness (madebywild/agent-harness)

**Stars:** 7 | **License:** MIT | **Tech:** TypeScript/Node.js (pnpm monorepo) | **Platforms:** 4 (Codex, Claude, Copilot, Cursor)

### Core Architecture Pattern
**"The Shadcn for agent harnesses."** Single source of truth (`.harness/`) generates provider-specific outputs. Like Shadcn/ui, you own all the files — the CLI manages plumbing, you own content.

```
.harness/src/* (canonical) → manifest.json → planner → engine → provider outputs
```

### Key Strengths
- **Plan/apply pipeline** — deterministic operations: validate → load → substitute → render → detect collisions → build ops → apply
- **Registry system** — git-backed registries with provenance tracking, `registry pull` workflow, per-entity origin tracking
- **Preset system** — bundled, local, and registry-backed presets for workspace bootstrapping
- **Schema versioning** — `doctor` + `migrate` with backup snapshots, atomic writes
- **U-Haul migration** — imports legacy provider configs (CLAUDE.md, AGENTS.md, .mcp.json) into canonical format
- **Environment variable substitution** — `{{PLACEHOLDER}}` syntax with `.env` file support, 3-tier resolution
- **Watch mode** — file watching with debounce, single-flight apply, continues after errors
- **Strict file ownership** — manifest-based integrity enforcement, unmanaged file detection

### Unique Features
- **Provider override sidecars** — YAML files per entity per provider (`system.overrides.codex.yaml`)
- **Third-party skill discovery** — `skill find` via skills.sh with audit gating on import
- **Hook primitive** — canonical lifecycle hooks rendered into provider-native formats
- **Managed index** — `managed-index.json` tracks all generated files for clean deletion
- **Lock file** — `manifest.lock.json` with SHA256 fingerprints for integrity
- **Delegate mode** — `init --delegate claude` seeds bootstrap prompt then launches agent CLI to author real prompt

### Weaknesses/Gaps
- **Config management only** — no routing intelligence, no memory, no learning
- **No task dispatch** — generates static config files, doesn't route tasks
- **No token optimization** — generates full config for all enabled providers
- **No runtime component** — purely build-time tooling
- **Limited platform support** — 4 providers vs the 8+ that yes-human targets

### Lessons for yes-human
1. **Adopt plan/apply pipeline** — `yes plan` shows what will change, `yes apply` executes. Deterministic operations.
2. **Adopt registry provenance** — `manifest.lock.json` with SHA256 fingerprints + per-entity registry origin. Maps to yes-human's license/provenance gates.
3. **Adopt schema versioning** — `yes doctor` + `yes migrate` for forward compatibility of graph indexes and route tables
4. **Adopt U-Haul migration** — `yes import` that converts existing `.claude/`, `.cursor/`, `AGENTS.md` into yes-human format
5. **Adopt preset system** — `yes preset apply starter` for quick workspace bootstrapping
6. **Adopt environment variable substitution** — `{{PLACEHOLDER}}` in agent/skill files resolved at apply time
7. **Adopt override sidecars** — per-provider overrides for agents: `agent.overrides.codex.yaml`

---

## Top 10 Patterns yes-human Should Adopt (Priority Ranked)

### Tier 1: Adopt Immediately (Wave 1-2)

| # | Pattern | Source | Why | yes-human Mapping |
|---|---------|--------|-----|-------------------|
| 1 | **Progressive skill disclosure** | agentic-harness | Tiny manifest always loaded, full content on trigger match. This IS yes-human's core thesis. | `ROUTE_TABLE.min.json` = manifest; full agents load on match |
| 2 | **Signal-word routing table** | AgentMaster | Keyword → category → skill mapping with tiebreakers. Directly enhances `ROUTE_TABLE.min.json`. | Add `signalWords` and `tiebreakers` fields to route table entries |
| 3 | **Dry-run routing** | AgentMaster | `yes route --dry-run <task>` shows plan without executing. Essential for user trust. | Add to `yes-cli` route command |
| 4 | **Loop prevention** | AgentMaster | Max depth=2, no self-invocation, no circular calls. Safety guardrails. | Implement in `yes-core` router |
| 5 | **Doctor command** | nexus-agents + agent-harness | Health check: Node version, API keys, configured tools, route table validity. | `yes doctor` command |

### Tier 2: Adopt Soon (Wave 2-3)

| # | Pattern | Source | Why | yes-human Mapping |
|---|---------|--------|-----|-------------------|
| 6 | **4-layer memory model** | agentic-harness | working/episodic/semantic/personal with distinct retention policies. | `graph/memory/{working,episodic,semantic,personal}/` |
| 7 | **Registry provenance + lock file** | agent-harness | SHA256 fingerprints + per-entity origin tracking. Maps to license/provenance gates. | `registry/manifest.lock.json` with provenance fields |
| 8 | **Drift detection** | nexus-agents | CI gate that fails when documented routes don't match actual agents. | `yes validate --drift` checks ROUTE_TABLE vs registry |
| 9 | **Outcome tracking** | nexus-agents | Simple success/fail recording per route. Feed back into routing weights. | `graph/memory/episodic/outcomes.jsonl` |
| 10 | **Schema versioning + migration** | agent-harness | `doctor` + `migrate` with backup snapshots. Forward compatibility. | `yes migrate` for graph indexes and route tables |

### Tier 3: Adopt Later (Wave 3+)

| # | Pattern | Source | Why | yes-human Mapping |
|---|---------|--------|-----|-------------------|
| 11 | Nightly staging cycle (auto_dream) | agentic-harness | Automated pattern extraction from episodic memory | Cron job or `yes dream` command |
| 12 | Plan/apply pipeline | agent-harness | Deterministic operations with collision detection | `yes plan` + `yes apply` for config generation |
| 13 | Token compression output layer (caveman) | AgentMaster | ~75% token savings on output | Optional output hook in `yes-runtime` |
| 14 | Contract/ledger primitives | iso | Formal agent behavior contracts + immutable audit | `yes-contract` package |
| 15 | Preset system | agent-harness | Quick workspace bootstrapping from templates | `yes preset apply <name>` |
| 16 | U-Haul migration | agent-harness | Import existing agent configs into yes-human format | `yes import` command |
| 17 | Fan-out parallel dispatch | iso | Parallel agent dispatch with result aggregation | `yes-core` fan-out router |
| 18 | Skill failure tracking | agentic-harness | 3+ failures in 14 days → rewrite flag | Graph health metrics |
| 19 | Override sidecars | agent-harness | Per-provider agent overrides | `agent.overrides.<provider>.yaml` |
| 20 | Codebase snapshots (repomix) | AgentMaster | Whole-repo context for analysis | Graph index building pipeline |

---

## Competitive Positioning Matrix

| Capability | yes-human | AgentMaster | agentic-harness | iso | nexus-agents | agent-harness |
|-----------|-----------|-------------|-----------------|-----|-------------|---------------|
| **Graph-based routing** | Planned | No | No | Partial | Partial | No |
| **Token budget awareness** | Planned (180/300 cap) | No | No | No | No | No |
| **Progressive disclosure** | Planned | No | Yes | No | No | No |
| **Cross-harness portability** | Planned (8+) | Yes (11) | Yes (8) | Yes (4) | Yes (5) | Yes (4) |
| **Memory/learning** | Planned | No | Yes (4-layer) | No | Yes (5 backends) | No |
| **Provenance/license tracking** | Planned | No | No | No | No | Yes (registry) |
| **Routing intelligence** | Planned (graph) | Static keywords | None | Fan-out | Bandit+TOPSIS | None |
| **Audit trail** | Planned | No | Decision log | Ledger | Hash-chained | Lock file |
| **Drift detection** | Planned | No | No | No | Yes (CI gates) | Validate |
| **Token compression** | Planned | Yes (caveman) | No | No | No | No |
| **Schema versioning** | Planned | No | HARNESS_VERSION | No | No | Yes (doctor+migrate) |
| **Lazy loading** | Core thesis | No | Partial (skills) | No | No | No |

---

## Key Takeaway

yes-human's planned architecture is **uniquely positioned** at the intersection of:
- AgentMaster's routing intelligence (but graph-based, not keyword-based)
- agentic-harness's memory and progressive disclosure (but with token budgets)
- nexus-agents's telemetry and audit (but lightweight, not governance-heavy)
- agent-harness's registry and schema management (but with runtime, not just config)
- iso's contract and trace primitives (but practical, not academic)

**The gap no competitor fills:** A portable, low-token agentic control plane that uses graph indexes for intelligent routing, loads agents lazily based on task context, tracks provenance and outcomes, and works across all major harnesses — all within a strict token budget.

**The risk:** Building too much governance (nexus-agents trap) or too many platform adapters before the core routing loop works (AgentMaster trap). Stay focused on Wave 1-2 vertical slices.

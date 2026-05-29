# Yes-human Agentic System Architecture

**Version:** 2.0 complete architecture draft  
**Date:** 2026-05-28  
**Status:** v2 architecture complete, implementation plan pending  
**Renamed from:** `jas-human`  
**Goal:** build a universal, open-source, low-token agentic operating system that can run across Claude, Codex, CLI, IDEs, MCP hosts, and future agent runtimes.

---

## 1. Design verdict

`Yes-human` should not be a Claude plugin with many files loaded into context.

It should be a portable agent control plane:

- one canonical source repo
- many generated host bundles
- graph-based context retrieval
- low-token routing
- self-improving workflows
- safe plugin absorption from GitHub and local folders
- adapters for Claude, Codex, AGENT.md-compatible tools, MCP, and CLI

The key design rule is simple:

**The host loads only a tiny router. The router loads only the exact agent, skill, workflow, and graph slice needed for the task.**

Target startup context:

- `60-180 tokens` for the host bootstrap
- `300-900 tokens` for simple single-agent tasks
- `1,500-3,500 tokens` for normal multi-domain tasks
- `10k+ tokens` only for explicitly approved deep research, migration, or batch orchestration

The previous `jas-human` pattern that worked should be preserved: startup loads a tiny routing rule and registry pointers only. The full agent and skill corpus stays off-context until the router selects a route.

---

## 2. Source-backed architecture inputs

This architecture uses the following primary references as design inputs:

- ECC `AGENTS.md`: specialized agents, skills-first workflow surface, commands for compatibility, hooks, MCP configs, security-first and TDD workflow. Source: https://github.com/affaan-m/ECC/blob/main/AGENTS.md
- Microsoft Agent Lightning: framework-agnostic agent optimization, structured spans, central store, multi-agent optimization, prompt/policy improvement loop. Source: https://github.com/microsoft/agent-lightning
- Microsoft GraphRAG: graph-based indexing, local/global retrieval, cost warning around indexing, prompt tuning. Source: https://github.com/microsoft/graphrag
- Model Context Protocol: standard schema/docs for tools, resources, prompts, and host integration. Source: https://github.com/modelcontextprotocol/modelcontextprotocol
- Sourcegraph Cody context model: keyword search, Sourcegraph search, and code graph retrieval for codebase-aware context. Source: https://sourcegraph.com/docs/cody/core-concepts/context
- AGENT.md: vendor-neutral project instruction file concept and cross-tool compatibility by symlink/adapters. Source: https://github.com/agentmd/agent.md
- Tree-sitter: incremental parsing and concrete syntax trees across many languages. Source: https://tree-sitter.github.io/tree-sitter/
- Joern code property graph: property-graph representation for code mining and vulnerability/security analysis. Source: https://docs.joern.io/code-property-graph/
- Semgrep: open-source static analysis with code-like patterns for bugs and security guardrails. Source: https://github.com/semgrep/semgrep
- GitHub CodeQL: semantic code analysis and query libraries used by GitHub Advanced Security. Source: https://github.com/github/codeql
- LangGraph: graph-based orchestration for stateful, long-running agents. Source: https://github.com/langchain-ai/langgraph
- Microsoft AutoGen: multi-agent application framework. Source: https://github.com/microsoft/autogen
- CrewAI: role-based multi-agent orchestration. Source: https://github.com/crewAIInc/crewAI
- OpenHands: open-source software development agent platform. Source: https://github.com/OpenHands/OpenHands
- OpenPipe ART: Agent Reinforcement Trainer for multi-step agents using GRPO. Source: https://github.com/openpipe/art

These sources should influence the architecture, not be copied wholesale.

---

## 3. Product definition

`Yes-human` is a universal agent and workflow system.

It gives a host application one entrypoint:

```text
yes-human route "<user task>"
```

The system then:

1. classifies the task
2. retrieves the smallest useful context graph
3. selects one or more agents
4. attaches the exact skills and tools needed
5. executes the workflow through the current host adapter
6. captures traces, outcomes, failures, and cost
7. proposes new workflows when repeated or novel task patterns appear

It should feel like one plugin to the user, but internally it is a portable runtime with adapters.

---

## 4. Non-negotiable goals

- Do not load hundreds of agents into context.
- Do not rely on one host folder like `~/.claude/plugins`.
- Do not absorb untrusted GitHub repos directly into production.
- Do not make all agents available by prompt text only; use registries and graph routing.
- Do not delete provider plugins that supply real API/MCP access.
- Do not make parallel fanout the default; use it only when the task graph needs it.
- Do not create generic stub agents. Every agent must declare scope, tools, inputs, outputs, and failure modes.

---

## 5. System layers

```text
User task
  -> Host adapter
  -> Yes-human runtime
  -> Routing graph
  -> Agent/skill/workflow selection
  -> Tool/MCP broker
  -> Execution planner
  -> Trace store
  -> Improvement loop
```

### 5.1 `yes-core`

Host-agnostic platform logic.

Responsibilities:

- schema validation
- task classification
- registry loading
- graph retrieval
- agent selection
- skill selection
- workflow planning
- budget enforcement
- provenance checks
- duplicate detection
- policy enforcement

### 5.2 `yes-runtime`

Executes routed work through a host adapter.

Responsibilities:

- creates execution plans
- spawns subagents
- handles sequential and parallel workflows
- enforces tool permissions
- records traces
- emits final results
- performs rollback when possible

### 5.3 `yes-content`

Portable content library.

Contains:

- agents
- skills
- workflows
- command definitions
- rules
- templates
- reports
- examples

### 5.4 `yes-graph`

Context and routing graph.

Contains:

- keyword index
- semantic index
- symbol graph
- workflow graph
- category graph
- provenance graph
- outcome graph
- cost graph

### 5.5 `yes-adapters`

Host-specific integration layer.

Core v2 adapters:

- `adapter-claude`
- `adapter-codex`
- `adapter-agent-md`
- `adapter-mcp`
- `adapter-cli`

Adapter packs, not core blockers:

- `adapter-vscode`
- `adapter-cursor`
- `adapter-windsurf`
- `adapter-sourcegraph`
- `adapter-generic` (connect to any AI agent runtime via a standard interface)

Core v2 must ship with Claude, Codex, CLI, MCP, and AGENT.md/OpenCode exports.
Cursor, Windsurf, VS Code, Sourcegraph, and Generic adapters are valuable but
must not block the first working implementation.

### 5.5.1 Generic adapter

Any AI agent host that can implement a minimal interface can connect to
Yes-human without a dedicated adapter.

The generic adapter provides:

- a standard JSON-over-stdio protocol
- a standard HTTP/WebSocket protocol
- a file-drop mode for hosts that only read/write files
- auto-detection of host capabilities from a capability manifest file
- signed capability manifests
- scoped permissions
- sandbox declarations
- audit logs
- cancellation and timeout support

This means any new AI tool (future IDEs, new agent runtimes, custom internal
tools) can plug into Yes-human by implementing the generic adapter protocol
without waiting for a purpose-built adapter.

Generic adapter protocol:

```json
{
  "protocol_version": "1.0",
  "host_id": "my-custom-agent",
  "auth": {
    "mode": "signed_manifest",
    "public_key_ref": "keys/my-custom-agent.pub"
  },
  "capabilities": {
    "filesystem": true,
    "shell": true,
    "mcp": false,
    "slash_commands": false,
    "parallel_agents": "none",
    "hooks": "none",
    "ui": false
  },
  "permission_scopes": {
    "read": ["workspace"],
    "write": ["workspace/generated", "workspace/staging"],
    "run": ["readonly", "approved_commands"],
    "network": ["deny_by_default"]
  },
  "sandbox": {
    "mode": "workspace",
    "deny_home_directory": true,
    "deny_secrets": true
  },
  "limits": {
    "default_timeout_ms": 30000,
    "max_parallel_calls": 3,
    "max_output_bytes": 200000
  },
  "audit": {
    "log_file": ".yes-human/audit/generic-adapter.jsonl",
    "redact_secrets": true
  },
  "supported_operations": ["read", "write", "list", "run", "callTool", "cancel"]
}
```

Any host that speaks this protocol gets full Yes-human routing, agents, skills,
workflows, and graph retrieval without modification to the core.

Generic adapter safety rules:

- deny by default when auth is missing or manifest signature fails
- deny writes outside declared workspace scopes
- deny shell commands unless the policy gate explicitly allows them
- require cancellation support for long-running tool calls
- record every operation in the audit log
- redact secrets before writing traces or reports
- never let generic adapters bypass Yes-human policies, hooks, or validators

---

## 6. Canonical repository layout

```text
yes-human/
├── README.md
├── LICENSE
├── CHANGELOG.md
├── AGENT.md
├── AGENTS.md -> AGENT.md
├── CLAUDE.md -> generated/claude/CLAUDE.md
│
├── docs/
│   ├── architecture.md
│   ├── adapter-spec.md
│   ├── registry-spec.md
│   ├── graph-routing.md
│   ├── absorber-spec.md
│   ├── security-model.md
│   ├── cost-model.md
│   ├── workflow-learning.md
│   ├── persona-system.md
│   ├── feedback-loop.md
│   ├── versioning.md
│   ├── team-support.md
│   ├── offline-mode.md
│   ├── crash-recovery.md
│   ├── community-guide.md
│   └── business-connectors.md
│
├── packages/
│   ├── yes-core/
│   ├── yes-runtime/
│   ├── yes-schema/
│   ├── yes-cli/
│   ├── yes-graph/
│   ├── yes-absorber/
│   ├── yes-evaluator/
│   └── yes-trainer/
│
├── adapters/
│   ├── claude/
│   ├── codex/
│   ├── agent-md/
│   ├── mcp/
│   ├── cli/
│   ├── vscode/
│   ├── cursor/
│   ├── windsurf/
│   ├── sourcegraph/
│   └── generic/
│
├── content/
│   ├── agents/
│   ├── skills/
│   ├── workflows/
│   ├── commands/
│   ├── templates/
│   └── reports/
│
├── hooks/
│   ├── pre-route.ts
│   ├── pre-tool.ts
│   ├── pre-write.ts
│   ├── post-tool.ts
│   ├── on-error.ts
│   ├── on-task-complete.ts
│   └── on-absorb.ts
│
├── rules/
│   ├── routing.rules.json
│   ├── budget.rules.json
│   ├── safety.rules.json
│   ├── tool-use.rules.json
│   ├── connector.rules.json
│   ├── workflow.rules.json
│   └── source-mining.rules.json
│
├── policies/
│   ├── filesystem.policy.json
│   ├── network.policy.json
│   ├── mcp-trust.policy.json
│   ├── destructive-actions.policy.json
│   ├── privacy.policy.json
│   ├── licensing.policy.json
│   └── telemetry.policy.json
│
├── validators/
│   ├── schema.validator.ts
│   ├── route.validator.ts
│   ├── agent.validator.ts
│   ├── skill.validator.ts
│   ├── workflow.validator.ts
│   ├── connector.validator.ts
│   ├── graph.validator.ts
│   └── host-bundle.validator.ts
│
├── registry/
│   ├── agents.json
│   ├── skills.json
│   ├── workflows.json
│   ├── categories.json
│   ├── aliases.json
│   ├── commands.json
│   ├── tools.json
│   ├── mcps.json
│   ├── bundles.json
│   ├── parallel-map.json
│   ├── provenance.json
│   ├── source-references.json
│   ├── license-registry.json
│   ├── eval-thresholds.json
│   ├── capability-matrix.json
│   └── cost-policy.json
│
├── graph/
│   ├── source/
│   ├── indexes/
│   ├── embeddings/
│   ├── symbol-graph/
│   ├── workflow-graph/
│   ├── provenance-graph/
│   └── snapshots/
│
├── references/
│   ├── github/
│   ├── official-docs/
│   ├── papers/
│   ├── standards/
│   ├── vendor-docs/
│   └── dossiers/
│
├── reports/
│   ├── research/
│   ├── routing/
│   ├── cost/
│   ├── security/
│   ├── provenance/
│   ├── adapters/
│   └── release/
│
├── staging/
│   ├── incoming/
│   ├── normalized/
│   ├── reviewed/
│   ├── rejected/
│   └── promoted/
│
├── generated/
│   ├── claude/
│   ├── codex/
│   ├── agent-md/
│   ├── mcp/
│   ├── cli/
│   ├── cursor/
│   ├── windsurf/
│   └── generic/
│
├── tests/
│   ├── routing/
│   ├── graph/
│   ├── adapters/
│   ├── absorber/
│   ├── workflows/
│   ├── security/
│   ├── learning/
│   ├── cost/
│   └── fixtures/
│
└── examples/
    ├── simple-task/
    ├── multi-agent-code-review/
    ├── absorb-github-plugin/
    ├── sourcegraph-context/
    └── codex-install/
```

---

## 7. Agent categories

Use a category graph, not a flat category list.

Target initial system:

- `50 top-level and subdomain categories`
- `250-450 agents`
- `250-500 skills`
- `100+ workflows`
- every item lazy-loaded by registry and graph query

Recommended category graph:

```text
engineering
  architecture
  backend
  frontend
  fullstack
  mobile-native
  testing-qa
  performance-profiling
  build-resolver
  code-quality
  refactoring
  dev-workflow
  language-review

platform
  cloud
  devops
  ci-cd
  observability
  security-trust
  infrastructure
  networking
  release-engineering

data-ai
  ai-ml
  rag
  graph-rag
  data-engineering
  analytics-bi
  vector-search
  evaluation
  training-optimization

product-business
  product
  startup
  marketing
  sales
  partnerships
  finance
  legal
  customer-success
  operations

design-content
  ui-ux
  frontend-design
  brand
  writing
  documentation
  i18n
  presentation

integrations
  mcp
  sourcegraph
  github
  vercel
  figma
  notion
  slack-discord
  webhooks
  payments
  browser-automation

meta-system
  routing
  orchestration
  workflow-learning
  plugin-absorption
  deduplication
  cost-control
  memory
  governance
```

Every category gets:

- one master router
- one workflow curator
- domain agents
- domain skills
- validation tests
- provenance entries

---

## 8. Core agents

### 8.1 Mandatory system agents

```text
agents/system/
  supreme-router.md
  budget-controller.md
  context-minimizer.md
  tool-policy-guard.md
  provenance-auditor.md
  workflow-miner.md
  workflow-suggester.md
  graph-builder.md
  graph-query-planner.md
  plugin-absorber.md
  sourcegraph-context-agent.md
  graphrag-index-agent.md
  agent-lightning-optimizer.md
  eval-runner.md
  rollback-manager.md
```

### 8.2 Orchestrator agents

```text
agents/orchestrators/
  single-agent-router.md
  parallel-spawner.md
  sequence-coordinator.md
  planner-executor-verifier.md
  conflict-resolver.md
  result-synthesizer.md
  long-horizon-manager.md
  multi-repo-coordinator.md
```

### 8.3 Parallel limits

Default fanout:

- `1 agent` for normal tasks
- `2-3 agents` for multi-domain tasks
- `4-8 agents` for reviews, audits, migration planning
- `10-50 agents` only in batch mode with explicit budget and staging

This preserves cost. A 50-agent swarm is a special execution mode, not the normal router path.

---

## 9. Routing model

### 9.1 Startup path

Host loads only:

```text
YES_BOOT.md
```

Target content:

- one-line mission
- registry manifest pointer
- host adapter pointer
- hard budget rule
- fallback command

No agent list. No full category list. No giant prompt.

`YES_BOOT.md` target shape:

```text
You are using Yes-human. Route every task through registry/ROUTE_TABLE.min.json first. Load only selected agents, skills, workflows, and graph slices. Default budget is micro unless the user asks for deep work.
```

This should be the default plugin behavior, similar in spirit to Superpowers: one always-on entrypoint, with all heavy capability lazy-loaded behind it.

### 9.1.1 Master hierarchy

Use a strict master/submaster tree:

```text
YES_BOOT.md
  -> superior-master
    -> domain-master
      -> specialist-agent
        -> subskill
        -> workflow
        -> tool/MCP binding
```

Roles:

- `superior-master`: task shape, budget band, host capabilities, route decision
- `domain-master`: category-specific routing and workflow selection
- `specialist-agent`: actual task work
- `subskill`: narrow reusable procedure
- `workflow`: ordered, testable steps

The superior master must normally return a route, not solve the task itself.

### 9.1.2 Example routes

Coding task:

```text
"fix this React build error"
  -> engineering-master
  -> build-resolver or frontend-react-agent
  -> skills/debugging/build-failure
  -> local code graph + package manager graph
```

CFO/non-coding task:

```text
"estimate payroll cost for this team"
  -> business-master
  -> cfo-advisor
  -> skills/finance/cost-modeling
  -> spreadsheet or calculator tool if available
```

Deep research task:

```text
"research best agent orchestration frameworks"
  -> research-master
  -> deep-research-agent
  -> parallel-spawner only if budget allows
  -> browser/search/MCP tools
  -> provenance report
```

Security task:

```text
"check this auth flow for risk"
  -> security-master
  -> threat-modeler + code-reviewer if needed
  -> skills/security/auth-review
  -> source graph + sensitive-file filter
```

### 9.2 Routing pipeline

```text
User prompt
  -> normalize
  -> classify task shape
  -> check exact registry
  -> check aliases
  -> query local graph
  -> query symbol/code graph if repo task
  -> check workflow graph
  -> choose execution strategy
  -> load minimal agent pack
  -> attach minimal skills
  -> execute
  -> record trace
```

### 9.3 Routing tiers

1. `Exact route`: keyword and command hits
2. `Alias route`: synonyms and user vocabulary
3. `Workflow route`: known task pattern
4. `Graph route`: symbol, file, category, dependency, and provenance graph
5. `Semantic route`: embedding search
6. `Sourcegraph route`: code search and code graph for repo tasks
7. `Fallback route`: supreme router reads only registry summaries

### 9.4 Minimal agent pack

For each task, load:

- agent frontmatter
- agent mission
- tool requirements
- only the matching skill excerpts
- workflow steps if matched
- graph nodes directly connected to the task

Do not load:

- all category docs
- all skills
- all previous workflows
- all agent descriptions

---

## 10. Graph architecture

Yes-human needs several small graphs, not one huge opaque graph.

The graph layer is the main low-token strategy. It replaces "search all folders" with compact DSA-style lookup structures.

### 10.0 Storage strategy

Use three storage levels:

```text
Level 0: hot boot index
  ROUTE_TABLE.min.json
  10-50 KB compressed/compact
  loaded at startup or first route only

Level 1: warm routing indexes
  agent_index.bin/json
  skill_index.bin/json
  workflow_index.bin/json
  category_graph.bin/json
  loaded by route decision

Level 2: cold content
  full markdown agents
  full skills
  full workflow docs
  full provenance
  loaded only after final route
```

The hot boot index should fit in a small map:

```json
{
  "coding": ["engineering-master", "workflow.code-task"],
  "react": ["frontend-master", "agent.frontend.react"],
  "cfo": ["business-master", "agent.business.cfo"],
  "payroll": ["finance-master", "skill.finance.cost-modeling"],
  "deep research": ["research-master", "workflow.deep-research"],
  "security": ["security-master", "workflow.security-review"]
}
```

This is not the full registry. It is only a compact route hint table.

### 10.0.1 DSA choices

Use multiple small structures, each for the job it is best at:

- `HashMap`: exact keyword to route id, fastest path for common tasks
- `Trie`: prefix and phrase routing, useful for commands and multi-word triggers
- `Inverted index`: token to candidate agents/workflows, useful for natural language prompts
- `Weighted DAG`: category, workflow, and dependency graph, useful for routing without cycles
- `Bipartite graph`: agents to skills and agents to tools, useful for capability matching
- `LRU cache`: recent task route to context pack, useful for repeated work
- `Bloom filter`: quick "do we know this keyword/task?" check before expensive search
- `Adjacency list`: graph edges stored compactly for fast neighbor expansion
- `Vector index`: semantic fallback only, not the default path

Recommended lookup order:

```text
Bloom filter
  -> HashMap exact route
  -> Trie phrase route
  -> Inverted index candidate set
  -> Weighted graph expansion
  -> LRU route cache
  -> Vector fallback
  -> superior-master fallback
```

This gives fast routing with very low context.

### 10.0.2 Compact graph representation

The runtime should store graph nodes as ids, not repeated strings.

Example:

```json
{
  "nodes": {
    "a.frontend.react": ["agent", "frontend", 1200],
    "s.debug.build": ["skill", "engineering", 450],
    "w.code.fix": ["workflow", "engineering", 700],
    "t.shell": ["tool", "host", 0]
  },
  "edges": [
    ["a.frontend.react", "uses", "s.debug.build", 0.82],
    ["w.code.fix", "loads", "a.frontend.react", 0.76],
    ["a.frontend.react", "requires", "t.shell", 1.0]
  ]
}
```

For runtime speed, generate a binary or SQLite form:

```text
graph.sqlite
  nodes(id, type, category, token_cost, path, hash)
  edges(src, rel, dst, weight)
  keywords(term, target_id, weight)
  routes(route_key, master_id, workflow_id, confidence)
  cache(task_hash, route_id, context_pack_hash, outcome_score)
```

SQLite is the best default for open-source portability. It is small, queryable, transactional, and works in CLI, Codex, and Claude-side helper scripts.

For simple plugin hosts that cannot run SQLite, generate compact JSON fallback files.

### 10.0.3 Context pack generation

The graph query returns ids first:

```text
task -> candidate ids -> ranked route -> context pack manifest
```

Then the runtime reads only the paths in the manifest:

```json
{
  "agent": "content/agents/engineering/frontend-react.md",
  "skills": [
    "content/skills/debugging/build-failure.md"
  ],
  "workflow": "content/workflows/code-fix.md",
  "tools": ["shell", "filesystem"],
  "graph_slice": ["a.frontend.react", "s.debug.build", "w.code.fix"]
}
```

This is the practical reason the system can contain hundreds of agents without high startup cost.

### 10.1 Context graph

Nodes:

- files
- symbols
- commands
- docs
- APIs
- test targets
- errors

Edges:

- imports
- calls
- owns
- tests
- documents
- failed-with
- fixed-by

Use for repo understanding and low-token retrieval.

### 10.2 Agent graph

Nodes:

- agents
- categories
- skills
- workflows
- tools
- MCPs

Edges:

- can-use
- requires
- overlaps
- supersedes
- routes-to
- parallel-safe-with

Use for routing and dedupe.

### 10.3 Workflow graph

Nodes:

- task patterns
- step templates
- validators
- rollback actions
- reports

Edges:

- precedes
- verifies
- retries
- blocks
- improves

Use to suggest reusable workflows.

### 10.4 Provenance graph

Nodes:

- source repo
- commit SHA
- absorbed agent
- absorbed skill
- license
- author
- review status

Edges:

- copied-from
- adapted-from
- derived-from
- replaced-by
- conflicts-with

Use to keep open-source absorption clean.

### 10.5 Cost graph

Nodes:

- tasks
- agents
- tools
- workflows
- context bundles

Edges:

- consumed-tokens
- failed-cost
- saved-cost
- cache-hit

Use to reduce cost over time.

### 10.6 Mistake-learning graph

Yes-human should remember mistakes as graph edges, not as long prose loaded every time.

Nodes:

- task pattern
- selected route
- failed step
- error signature
- corrected workflow
- validation that passed

Edges:

- failed-on
- fixed-by
- avoid-next-time
- prefer-workflow
- requires-tool

Example:

```text
"React build error"
  -> failed-on: generic frontend agent
  -> fixed-by: build-resolver workflow
  -> avoid-next-time: reading entire repo first
  -> prefer-workflow: package-manager-specific debug
```

At route time, only the relevant correction edge is loaded.

### 10.7 Workflow suggestion graph

When a new task repeats or produces a new successful sequence, the runtime proposes a workflow.

Trigger conditions:

- same task cluster appears 3 times
- same manual steps are repeated
- same failure is corrected twice
- user asks for a task not covered by any route
- subagents produce a stable sequence that passes validation

Output:

```text
staging/workflows/proposed/<workflow-id>.md
registry/workflows.proposed.json
reports/workflow-suggestions.md
```

The proposal is staged first. It is promoted only after validation.

---

## 11. Sourcegraph and code graph integration

Use Sourcegraph-style context retrieval for code tasks:

- keyword search for cheap first pass
- symbol search for targeted code references
- code graph edges for dependencies and call relationships
- remote repository context when available
- local fallback using ripgrep, tree-sitter, LSP, and static import parsing

Sourcegraph should be an adapter, not a required dependency.

Recommended flow:

```text
repo task
  -> local rg search
  -> symbol graph query
  -> Sourcegraph search if configured
  -> retrieve top context slices
  -> route to domain agent
```

This keeps cost low because the model receives selected graph slices instead of the whole repo.

---

## 12. GraphRAG use

GraphRAG is useful for:

- large documentation collections
- architectural understanding
- plugin corpus summaries
- cross-repo research
- long-running knowledge bases

GraphRAG is not cheap enough to run blindly on every task.

Policy:

- use normal keyword/symbol search first
- use local graph retrieval next
- use GraphRAG for global questions over large corpora
- run indexing in background or explicit batch mode
- cache graph snapshots
- expose cost estimate before large indexing

---

## 13. Agent Lightning style improvement loop

Do not bake Agent Lightning into core execution.

Use it as an optional optimizer layer:

```text
task execution
  -> structured spans
  -> trace store
  -> outcome scoring
  -> prompt/workflow improvement proposal
  -> evaluation
  -> promote only if tests improve
```

Yes-human should record:

- prompts loaded
- agents selected
- tools called
- files touched
- errors hit
- retry count
- token usage
- user accepted/rejected
- tests passed/failed

Then optimization can update:

- routing weights
- workflow templates
- agent instructions
- skill excerpts
- retrieval strategy

The runtime must keep the improvement loop separate from live task execution.

---

## 14. Plugin absorber

This is a core feature.

### 14.1 Inputs

Absorber accepts:

- GitHub URL
- local folder
- archive file
- Claude plugin
- Codex skill pack
- AGENT.md repo
- MCP server repo
- prompt library
- old `.claude/plugins` folder

### 14.2 Pipeline

```text
input
  -> fetch to staging
  -> detect format
  -> scan files
  -> extract metadata
  -> detect license
  -> classify content
  -> normalize schema
  -> detect duplicates
  -> estimate quality
  -> produce merge plan
  -> require approval for risky changes
  -> promote into content/
  -> update registries
  -> write provenance
  -> run tests
```

### 14.3 Quality scoring

Score each item:

- domain specificity
- actionable workflow value
- tool assumptions
- host lock-in
- duplicate overlap
- safety risk
- maintenance risk
- testability
- license compatibility

Items below threshold go to:

```text
staging/rejected/
```

### 14.4 Absorption rules

- never merge directly into live content
- never absorb unknown license into published bundle
- never overwrite existing better agent without review
- keep original source path and commit
- create rollback record for every promotion
- generate report after every absorption

---

## 15. Workflow learning

When the system sees a task, it checks:

- is this a known workflow?
- is this a variation of an existing workflow?
- did a previous task fail because there was no workflow?
- are there repeated steps across tasks?
- did the user accept the result?

If yes, it can propose:

- new workflow
- new skill
- new alias
- new agent
- new graph edge
- improved validator

Workflow creation flow:

```text
task trace
  -> cluster with similar traces
  -> identify repeated steps
  -> draft workflow
  -> create tests or validation checklist
  -> put in staging
  -> user or maintainer approves
  -> promote to workflows.json
```

This is how Yes-human becomes stronger without loading everything.

---

## 16. Host adapter model

Every host adapter implements:

```ts
interface YesHostAdapter {
  hostId: string
  getCapabilities(): HostCapabilities
  read(path: string): Promise<string>
  write(path: string, content: string): Promise<void>
  list(pattern: string): Promise<string[]>
  run(command: string, options?: ExecOptions): Promise<ExecResult>
  callTool(toolName: string, input: unknown): Promise<unknown>
  spawnAgent(task: YesTask): Promise<YesResult>
  emit(event: YesEvent): Promise<void>
}
```

Adapters report capabilities:

```json
{
  "host": "codex",
  "filesystem": true,
  "shell": true,
  "mcp": true,
  "slash_commands": false,
  "parallel_agents": "tool-dependent",
  "hooks": "limited",
  "ui": false
}
```

Example capability reports for each host:

```json
{
  "host": "cursor",
  "filesystem": true,
  "shell": true,
  "mcp": true,
  "slash_commands": true,
  "parallel_agents": "limited",
  "hooks": "wrapper",
  "ui": true,
  "inline_edits": true,
  "tab_completion": false
}
```

```json
{
  "host": "windsurf",
  "filesystem": true,
  "shell": true,
  "mcp": true,
  "slash_commands": true,
  "parallel_agents": "cascade",
  "hooks": "wrapper",
  "ui": true,
  "inline_edits": true,
  "cascade_flows": true
}
```

```json
{
  "host": "generic",
  "filesystem": "declared",
  "shell": "declared",
  "mcp": "declared",
  "slash_commands": "declared",
  "parallel_agents": "declared",
  "hooks": "declared",
  "ui": "declared",
  "protocol": "stdio|http|file-drop"
}
```

This lets the same Yes-human task run in Claude, Codex, Cursor, Windsurf, any
generic AI agent, CLI, or IDE with graceful degradation.

---

## 17. Generated host bundles

Yes-human source is canonical.

Generated outputs are host-specific.

### 17.1 Claude bundle

```text
generated/claude/
  plugin.json
  CLAUDE.md
  commands/
  hooks/
  agents/
  skills/
```

### 17.2 Codex bundle

```text
generated/codex/
  AGENTS.md
  skills/
  mcp-config.example.toml
  yes-human-codex-adapter.md
```

### 17.3 AGENT.md bundle

```text
generated/agent-md/
  AGENT.md
  AGENTS.md -> AGENT.md
  CLAUDE.md -> AGENT.md
```

### 17.4 MCP bundle

```text
generated/mcp/
  yes-human-mcp-server/
  tools.json
  resources.json
  prompts.json
```

### 17.5 CLI bundle

```text
generated/cli/
  yes
  yes route
  yes absorb
  yes graph build
  yes workflow suggest
```

### 17.6 Cursor bundle

```text
generated/cursor/
  .cursorrules
  .cursor/
    rules/
    agents/
    skills/
  AGENTS.md
  yes-cursor-adapter.md
```

Cursor bundle rules:

- `.cursorrules` contains boot pointer and routing rules only
- Agents and skills are generated as Cursor-compatible rule files
- MCP config examples provided for Cursor's MCP support
- Inline edit hints generated for Cursor's tab/edit mode

### 17.7 Windsurf bundle

```text
generated/windsurf/
  .windsurfrules
  .windsurf/
    rules/
    agents/
    skills/
    cascade-flows/
  AGENTS.md
  yes-windsurf-adapter.md
```

Windsurf bundle rules:

- `.windsurfrules` contains boot pointer and routing rules only
- Cascade flows generated from Yes-human workflows
- MCP config examples provided for Windsurf's MCP support
- Cascade-aware agent instructions for multi-step reasoning

### 17.8 Generic adapter bundle

```text
generated/generic/
  adapter-manifest.json
  protocol-spec.json
  yes-generic-adapter.md
  examples/
    stdio-adapter/
    http-adapter/
    file-drop-adapter/
```

Generic adapter rules:

- Any AI agent host that implements the generic protocol can connect
- Adapter manifest declares host capabilities
- Protocol spec defines the standard request/response format
- Example adapters provided for stdio, HTTP, and file-drop modes
- No host-specific assumptions in generated content

---

## 17A. Hooks, rules, policies, validators, and lifecycle layer

Yes-human cannot rely on one host's hook system. Hooks, rules, policies, and
validators must live in the portable core, then compile into Claude, Codex,
OpenCode, AGENT.md, CLI, and MCP-compatible outputs.

This layer is mandatory because it controls cost, safety, tool selection,
learning, source absorption, graph indexing, and workflow creation.

### 17A.1 Canonical runtime folders

```text
yes-human/
  rules/
    routing.rules.json
    budget.rules.json
    safety.rules.json
    tool-use.rules.json
    connector.rules.json
    workflow.rules.json
    promotion.rules.json
    host-compat.rules.json
    source-mining.rules.json
    fallback.rules.json

  hooks/
    pre-route.ts
    post-route.ts
    pre-agent.ts
    post-agent.ts
    pre-tool.ts
    post-tool.ts
    pre-write.ts
    post-write.ts
    on-error.ts
    on-task-complete.ts
    on-workflow-suggest.ts
    on-absorb.ts
    on-graph-build.ts
    on-policy-deny.ts

  policies/
    filesystem.policy.json
    network.policy.json
    mcp-trust.policy.json
    destructive-actions.policy.json
    privacy.policy.json
    source-mining.policy.json
    licensing.policy.json
    telemetry.policy.json
    generated-code.policy.json

  validators/
    schema.validator.ts
    route.validator.ts
    agent.validator.ts
    skill.validator.ts
    workflow.validator.ts
    connector.validator.ts
    provenance.validator.ts
    cost.validator.ts
    graph.validator.ts
    host-bundle.validator.ts

  lifecycle/
    route-state-machine.json
    absorb-state-machine.json
    graph-build-state-machine.json
    workflow-create-state-machine.json

  migrations/
    0001_initial_graph.sql
    0002_add_mistake_graph.sql
    0003_add_tool_capability_graph.sql

  evals/
    routing.eval.jsonl
    cost.eval.jsonl
    tool-selection.eval.jsonl
    agent-quality.eval.jsonl
    workflow-reuse.eval.jsonl
```

Nothing in these folders is loaded at startup. Startup only loads the boot
pointer and the minimum route map. The runtime reads these files only after a
task crosses the relevant gate.

### 17A.2 Full task lifecycle

```text
user prompt
  -> pre-route hook
  -> route rules
  -> budget rules
  -> route cache lookup
  -> Bloom filter negative check
  -> HashMap or Trie route hit
  -> inverted index fallback
  -> weighted graph fallback
  -> vector fallback only if needed
  -> post-route hook
  -> pre-agent hook
  -> load agent context pack
  -> load subskill context pack only if needed
  -> pre-tool hook
  -> tool policy gate
  -> tool call or MCP call
  -> post-tool hook
  -> pre-write hook if files will change
  -> write policy gate
  -> apply change
  -> post-write hook
  -> validators
  -> verification command
  -> on-task-complete hook
  -> trace compaction
  -> mistake graph update
  -> workflow suggestion check
```

The important rule: Yes-human should never load all agents, all skills, all
rules, or all hooks into the model. Runtime code reads and enforces them outside
the model where possible, then sends only the final compact decision/context
pack to the host model.

### 17A.3 Hook events

| Event | Purpose | Typical output |
|---|---|---|
| `pre-route` | Normalize prompt, detect task class, detect expensive intent | compact task envelope |
| `post-route` | Record chosen route and rejected alternatives | route trace |
| `pre-agent` | Enforce context budget before loading agent | context budget decision |
| `post-agent` | Record agent/subskill usage | usage edge |
| `pre-tool` | Block unsafe, costly, or irrelevant tool calls | allow/deny/rewrite |
| `post-tool` | Compress output and store trace | compact evidence |
| `pre-write` | Require scope check before file edits | write plan |
| `post-write` | Run format/test/lint decision | verification plan |
| `on-error` | Classify error and update mistake graph | failure edge |
| `on-task-complete` | Store outcome, cost, and reusable workflow candidate | task trace |
| `on-workflow-suggest` | Detect repeated task pattern | workflow proposal |
| `on-absorb` | Validate absorbed agents, skills, hooks, commands, MCP docs | provenance report |
| `on-graph-build` | Build or refresh codebase graph safely | graph manifest |
| `on-policy-deny` | Explain why a gate blocked an action | denial reason |

### 17A.4 Rule engine

Rules are deterministic and cheap. They run before agent loading.

Rule types:

- `routing`: maps prompt features to domain master, specialist, workflow, and tool plan
- `budget`: caps tokens, agents, web searches, graph depth, and tool calls
- `safety`: blocks destructive, private, licensed, or credential-sensitive actions
- `tool-use`: chooses local shell, MCP, browser, search, graph, or no tool
- `connector`: maps intent to MCP connector and required auth state
- `workflow`: detects known repeatable task patterns
- `promotion`: decides when traces become workflows, skills, tests, or agents
- `host-compat`: removes features unsupported by a target host
- `source-mining`: controls GitHub/source intake, license checks, and dedupe
- `fallback`: defines what happens when routing confidence is low

Rule evaluation order:

```text
host-compat
  -> safety
  -> privacy
  -> budget
  -> routing
  -> tool-use
  -> connector
  -> workflow
  -> fallback
  -> promotion
```

### 17A.5 Policy gates

Policy gates decide whether the runtime can proceed automatically, ask the user,
or deny the action.

Mandatory ask-before gates:

- building a repo-wide graph on a large repository
- launching more than 3 agents in parallel
- running a web/source-mining crawl over many repositories
- absorbing a third-party plugin into Yes-human
- deleting, replacing, or promoting agents/skills/hooks
- making repo-wide edits
- running destructive commands
- touching credentials, private keys, browser profiles, or hidden config
- sending local code or private docs to external APIs
- using paid APIs or tools with unclear cost

Allowed automatic gates:

- local route lookup
- local graph lookup
- local syntax indexing
- reading explicitly relevant project files
- generating a compact context pack
- running safe read-only commands
- running existing project tests after code edits

### 17A.6 Validator layer

Every generated or absorbed artifact must pass validators before it becomes
active.

Validator responsibilities:

- `schema.validator`: confirms JSON/YAML/manifest shape
- `route.validator`: confirms every route points to an existing artifact
- `agent.validator`: rejects stubs, empty role prompts, missing examples, and unsafe powers
- `skill.validator`: checks trigger, prerequisites, steps, verification, and rollback notes
- `workflow.validator`: checks inputs, outputs, gates, retries, and success criteria
- `connector.validator`: checks MCP/app/tool requirements and auth assumptions
- `provenance.validator`: records source URL, commit, license, original path, and diff
- `cost.validator`: checks startup, route, task, and parallel execution budgets
- `graph.validator`: checks graph integrity, orphan nodes, stale file hashes, and cycles
- `host-bundle.validator`: verifies generated Claude/Codex/OpenCode/CLI/MCP bundles

Reject conditions:

- generic placeholder content
- no concrete trigger
- no verification path
- no rollback path for destructive workflows
- duplicate capability with lower quality than existing artifact
- missing license/provenance on imported source
- host-specific assumptions inside portable core
- tool call plan without a budget gate

### 17A.7 Host-specific compilation

The portable core compiles to host outputs instead of hand-maintaining separate
systems.

| Portable source | Claude output | Codex output | OpenCode output | CLI output | MCP output |
|---|---|---|---|---|---|
| `rules/*.json` | `CLAUDE.md` rules + hook configs | `AGENTS.md` rules + scripts | `AGENTS.md` rules + config | native rule runner | policy resources |
| `hooks/*.ts` | Claude hooks where supported | Codex scripts/wrappers | OpenCode wrappers | native hook runner | tool middleware |
| `agents/**/*.md` | Claude agents | Codex skills/agent docs | AGENT.md docs | route packs | prompt resources |
| `skills/**/*.md` | Claude skills | Codex skills | AGENT.md skills | skill packs | prompt/resources |
| `commands/*.md` | slash commands | command recipes | command recipes | `yes <cmd>` | tool definitions |
| `mcps/*.md` | MCP docs/config | MCP config examples | MCP config examples | MCP profile | MCP server metadata |
| `graph/*.sqlite` | local lookup helper | local lookup helper | local lookup helper | native graph DB | resources/tools |

Host adapters must degrade gracefully. If a host has no native hook support,
Yes-human uses wrapper scripts and generated rules. If a host has no native
agent support, Yes-human emits AGENT.md-compatible instructions and route packs.

### 17A.8 Claude, Codex, OpenCode, Claude Code, and MCP compatibility

Compatibility target:

- Claude Desktop/Claude Code: plugin bundle, commands, hooks, agents, skills,
  MCP docs, and minimal `CLAUDE.md`
- Codex: generated `AGENTS.md`, Codex skills, CLI wrappers, MCP config examples,
  and low-token dispatch instructions
- OpenCode: generated `AGENTS.md`, CLI route command, MCP profile, and local
  graph lookup
- Generic IDE/CLI: `yes route`, `yes run`, `yes graph`, `yes absorb`, and
  `yes workflow`
- MCP hosts: Yes-human exposes selected tools, resources, and prompts through
  a small MCP server without requiring the full plugin runtime

Adapter rule:

```text
portable core first
host bundle second
manual host-specific behavior last
```

This keeps the system open-source and portable instead of locking it to one app.

### 17A.9 Commands that must exist

Core commands:

- `yes status`: show health, active graph, adapter versions, and cost budget
- `yes route "<task>"`: explain the selected route without executing
- `yes run "<task>"`: execute with budget and policy gates
- `yes graph build <path>`: build codebase graph
- `yes graph query "<question>"`: retrieve compact code context
- `yes absorb <github-url>`: inspect and stage external plugin/agent/source
- `yes absorb apply`: apply staged absorption after validation
- `yes workflow suggest`: show repeated task patterns that should become workflows
- `yes workflow create <trace-id>`: promote a trace into a workflow
- `yes eval routing`: run route quality tests
- `yes eval cost`: run token/cost tests
- `yes doctor`: validate installation and host adapters
- `yes export claude`: generate Claude bundle
- `yes export codex`: generate Codex bundle
- `yes export opencode`: generate OpenCode/AGENT.md bundle
- `yes export mcp`: generate MCP server bundle
- `yes export cursor`: generate Cursor bundle
- `yes export windsurf`: generate Windsurf bundle
- `yes export generic`: generate generic adapter bundle
- `yes rollback <change-id>`: undo absorption or generated content
- `yes persona set <persona>`: set user persona for routing bias
- `yes persona list`: show available personas
- `yes feedback accept <trace-id>`: mark task as successful
- `yes feedback reject <trace-id> --reason <reason>`: mark task as failed
- `yes feedback partial <trace-id> --reason <reason>`: mark task as partially successful
- `yes version list <artifact-id>`: list versions of an artifact
- `yes version diff <artifact-id> <v1> <v2>`: compare artifact versions
- `yes version rollback <artifact-id> <version>`: rollback artifact to version
- `yes recover`: resume from last workflow checkpoint
- `yes status --latency`: show latency metrics for all operations
- `yes contribute agent <path>`: submit agent contribution
- `yes contribute skill <path>`: submit skill contribution
- `yes contribute workflow <path>`: submit workflow contribution

Generated host commands:

- `/yes-status`
- `/yes-route`
- `/yes-absorb`
- `/yes-parallel`
- `/yes-graph`
- `/yes-workflow`
- `/yes-doctor`
- `/yes-rollback`

### 17A.10 Reports and observability

Reports are local-first and compact.

Required reports:

- `reports/route-accuracy.md`
- `reports/token-budget.md`
- `reports/agent-quality.md`
- `reports/stub-detection.md`
- `reports/duplicate-capabilities.md`
- `reports/connector-coverage.md`
- `reports/mcp-health.md`
- `reports/source-provenance.md`
- `reports/license-risk.md`
- `reports/workflow-candidates.md`
- `reports/mistake-patterns.md`
- `reports/host-bundle-validation.md`

Trace storage:

```text
trace_id
task_hash
host
route_id
agent_ids
skill_ids
tool_ids
input_token_estimate
output_token_estimate
wall_time_ms
cost_band
success
failure_class
verification_command
files_changed
promoted_to_workflow
```

Only compact traces are stored by default. Raw prompts, private files, command
outputs, and credentials are not stored unless the user explicitly enables that.

### 17A.11 Learning loop rules

Learning is controlled, not automatic prompt bloat.

Trace becomes a mistake edge when:

- same failure class repeats at least 2 times for the same task family
- verification failed after an agent claimed completion
- wrong tool was chosen and a cheaper/local tool existed
- too much context was loaded for a simple task
- route confidence was high but selected domain was wrong

Trace becomes a workflow candidate when:

- same task pattern appears at least 3 times
- route, tool plan, and verification are stable
- outcome was successful at least 2 times
- workflow can be represented in under 1,000 tokens
- user benefit is clear: faster, cheaper, safer, or more reliable

Trace becomes a new agent/skill candidate only when:

- no existing agent/skill covers the capability
- source miner confirms similar public patterns or docs exist
- validator rejects a simple rule/workflow as insufficient
- provenance and tests are available

### 17A.12 Everything-missing checklist

The architecture is incomplete unless these pieces exist:

- boot pointer
- route map
- category registry
- agent registry
- skill registry
- tool registry
- MCP registry
- workflow registry
- hook registry
- rule registry
- policy registry
- validator registry
- source provenance registry
- license registry
- graph schema
- migration system
- source miner
- absorber staging area
- dedupe engine
- stub detector
- quality scorer
- context pack generator
- host adapter generator
- host bundle validator
- local CLI
- MCP server wrapper
- codebase graph builder
- codebase graph query engine
- mistake graph
- workflow suggestion graph
- eval suite
- reports
- rollback mechanism
- installer
- updater
- doctor command
- examples
- minimal docs
- security defaults
- privacy defaults
- cost budget defaults

If any item above is absent, it must be represented as a planned module with a
schema and validator, not as vague future work.

### 17A.13 Startup-cost guarantee for this layer

Hooks, rules, policies, validators, and reports must not increase startup cost.

Startup loads only:

```text
YES_BOOT.md
ROUTE_TABLE.min.json
adapter capability bitset
```

Target startup context:

```text
60-180 tokens
```

Everything else is file-backed and lazy:

- rules load only after route candidate exists
- hooks run in runtime code, not prompt text
- policies emit allow/deny decisions, not full policy content
- validators emit compact pass/fail reports
- traces store compact metadata, not full conversation text
- graph query emits only selected context packs

### 17A.14 Non-negotiable behavior rules

- Prefer local code graph lookup before broad folder reading.
- Prefer deterministic rules before semantic/vector fallback.
- Prefer one domain master before many specialist agents.
- Prefer workflow reuse before creating a new agent.
- Prefer MCP connector use only when it adds real capability.
- Prefer compact context packs over full markdown agent loading.
- Never auto-absorb unlicensed or unknown-source content.
- Never delete or replace existing agents without rollback metadata.
- Never let learning mutate active routing until evals pass.
- Never hide cost, tool, or policy decisions from reports.

---

## 18. Low-cost architecture

### 18.1 Cost rules

- boot with route pointer only
- load no agent list at startup
- use compact maps before graph expansion
- exact route before semantic route
- local file search before embedding search
- symbol graph before full file read
- cached workflow before fresh planning
- one agent before parallel agents
- small context bundle before full category docs
- background indexing before on-demand expensive indexing
- use parallel agents only after the superior master estimates fanout value
- store repeated outcomes as graph edges, not long memory text

### 18.2 Budget bands

```text
micro      0-500 tokens       direct command, known workflow
standard   500-2,000 tokens   normal coding/review task
expanded   2,000-6,000 tokens multi-file, multi-agent
deep       6,000-25,000       audit, migration, research
batch      explicit approval  absorption, graph indexing, 10-50 agents
```

### 18.3 Context packing

A task context pack contains:

- task summary
- selected route
- selected agent
- selected skills
- graph slice
- tool permissions
- expected output contract
- validation checklist

It does not contain unrelated registry material.

### 18.4 Startup budget contract

Default plugin startup must stay below `180 tokens`.

Allowed at startup:

- `YES_BOOT.md`
- path to `ROUTE_TABLE.min.json`
- one budget rule
- one fallback command

Forbidden at startup:

- category list
- agent list
- skill list
- workflow descriptions
- source documentation
- examples
- absorbed plugin summaries

### 18.5 Runtime budget ladder

```text
0. boot
  load YES_BOOT only

1. route
  read ROUTE_TABLE.min.json or graph.sqlite route tables

2. select
  choose superior-master -> domain-master -> agent/workflow ids

3. pack
  create context manifest with paths and graph ids

4. load
  read only selected markdown snippets

5. execute
  call host tools through adapter

6. learn
  store trace/outcome as compact graph updates
```

This is the main cost model.

### 18.6 Default plugin behavior

Yes-human can be the default plugin if it behaves like a dispatcher:

- default route is `micro`
- one domain master per request
- one specialist by default
- no parallel subagents unless task classifier says multi-domain
- no browser/MCP unless the selected workflow requires external data
- no graph indexing during normal response unless the graph is missing and the user approved indexing

This makes it suitable as an always-on plugin.


---

## 19. Security and governance

Yes-human will execute code, tools, and absorbed content, so safety needs to be first-class.

Required controls:

- license scanner
- provenance tracker
- secret scanner
- prompt injection scanner
- tool permission policy
- host capability allowlist
- MCP server trust level
- rollback records
- quarantine folder
- signed release bundles
- generated SBOM for release

Risk states:

- `trusted`: local maintained content
- `reviewed`: absorbed and approved
- `staged`: imported but not promoted
- `quarantined`: risky or unknown
- `blocked`: disallowed by policy

---

## 20. MCP strategy

MCP integrations should stay provider-focused.

Yes-human should not clone every MCP plugin into itself. It should manage bindings.

```text
registry/mcps.json
  github
  sourcegraph
  playwright
  browser
  figma
  notion
  vercel
  firecrawl
  stripe
  huggingface
  filesystem
```

Each binding declares:

- purpose
- required auth
- trust level
- allowed agents
- allowed workflows
- cost profile
- fallback path

---

## 21. Initial open-source release shape

Do not release a 400-agent repo first.

Release in three layers:

### Layer 1: Core runtime

- schemas
- router
- CLI
- adapters
- graph retrieval
- tests

### Layer 2: Standard content pack

- 50-80 high-quality agents
- 100-150 skills
- 40-60 workflows
- strong categories

### Layer 3: Extended packs

- ECC pack
- business pack
- frontend pack
- security pack
- data-ai pack
- cloud pack
- experimental pack

This makes the system usable without forcing everyone to install the full corpus.

---

## 22. Better than "one giant plugin"

The user-facing story can still be "one plugin".

Internally it should be:

```text
Yes-human core
  + selected content packs
  + selected host adapter
  + selected MCP bindings
```

This gives:

- low startup tokens
- smaller install
- better maintenance
- easier open-source contribution
- fewer duplicate agents
- safer absorption

---

## 22.1 Codebase graph and retrieval engine

Codebase graphing is not a separate novelty feature. It is the core retrieval engine for coding, security, architecture, migration, and cost-estimation tasks.

User command shape:

```text
yes graph build .
yes graph build ./repo --profile coding
yes graph build ./repo --profile security
yes graph build ./repo --profile business
yes graph query "where is auth handled?"
```

The plugin should build a local graph for any codebase without requiring a separate hosted API.

`yes graphify` can remain as a friendly alias, but the architecture name is `codebase graph and retrieval engine`.

### 22.1.1 Codebase graph pipeline

```text
repo path
  -> detect languages and package managers
  -> parse files with Tree-sitter where supported
  -> fall back to import/regex scanners where parser unavailable
  -> build symbol graph
  -> build import/dependency graph
  -> build test graph
  -> build build-script graph
  -> build route graph
  -> write graph.sqlite + compact JSON fallback
  -> generate repo briefing
```

### 22.1.2 Codebase graph outputs

```text
.yes-human/
  graph.sqlite
  ROUTE_TABLE.min.json
  repo-brief.md
  symbols.json
  workflows.detected.json
  risks.detected.json
  cache/
```

The host plugin uses these files for cheap routing.

### 22.1.3 Code graph layers

- file tree graph: paths, ownership, size, language
- symbol graph: functions, classes, exports, definitions
- dependency graph: imports, packages, internal modules
- test graph: test files, covered modules, test commands
- command graph: package scripts, Makefile targets, CI jobs
- security graph: auth, secrets, network, database, untrusted input
- workflow graph: build, test, lint, deploy, debug, release
- agent route graph: best agent and skill for each task area

This lets a user ask "fix the build", "audit security", "explain architecture", or "estimate rewrite cost" without loading the whole repo.

### 22.1.4 Agent selection from codebase graph

The graph should route by profile:

```text
coding profile
  -> engineering-master
  -> architecture / build / frontend / backend agents

security profile
  -> security-master
  -> semgrep/codeql/threat-model agents

business profile
  -> product-business-master
  -> CEO/CFO/CTO/product agents

research profile
  -> research-master
  -> browser/MCP/search agents
```

### 22.1.5 Local-first design

Graphify must work with:

- local filesystem
- `rg`
- Tree-sitter
- package manager metadata
- SQLite
- optional Sourcegraph
- optional Semgrep
- optional CodeQL
- optional Joern

No external service is required for the base feature.

---

## 22.1A Universal DSA routing kernel

The codebase graph is only one user of the deeper system. The real core is the DSA routing kernel that chooses agents, skills, workflows, tools, memory, and graph slices with minimum token cost.

### 22.1A.1 Kernel responsibilities

- classify the task without loading agents
- choose budget band before reasoning
- decide whether this is coding, finance, research, security, operations, product, marketing, design, or mixed
- select one domain master by default
- select one specialist by default
- attach subskills only if needed
- attach tools only if required
- call external search/MCP/browser only when local indexes are insufficient
- ask user before expensive graph indexing, web runs, 10-50 agent fanout, repo-wide rewrites, or destructive operations

### 22.1A.2 Kernel data structures

```text
ROUTE_TABLE.min.json
  tiny hot map for common task phrases

task_bloom.bin
  cheap known/unknown check

phrase_trie.bin
  command, route, and multi-word trigger matching

inverted_index.sqlite
  token -> route/agent/workflow candidates

agent_skill_graph.sqlite
  bipartite graph: agents <-> skills <-> tools

workflow_dag.sqlite
  workflows, prerequisites, validators, rollback edges

mistake_graph.sqlite
  error signature -> avoid/retry/prefer workflow

tool_capability_graph.sqlite
  connector/MCP/tool -> capability -> allowed route

route_cache.sqlite
  task hash -> winning route -> accepted outcome

semantic_fallback.index
  vector search only after lexical/graph lookup fails
```

### 22.1A.3 Routing algorithm

```text
prompt
  -> normalize and hash
  -> LRU route cache
  -> Bloom filter known-task check
  -> HashMap exact route
  -> Trie phrase route
  -> inverted index top-k candidates
  -> weighted DAG category route
  -> bipartite graph agent/skill/tool match
  -> mistake graph correction check
  -> workflow DAG selection
  -> cost gate
  -> context pack manifest
  -> load selected files only
```

### 22.1A.4 Cost gates

The kernel must ask or require explicit deep mode for:

- building a repo graph larger than threshold
- indexing with GraphRAG
- running browser/search loops
- launching more than 3 agents
- running security tools that may take minutes
- changing many files
- absorbing a GitHub repo into staging
- promoting generated agents/skills/workflows

Default behavior is cheap and local.

### 22.1A.5 Why this reduces tokens

The model receives a compact context pack, not the corpus.

Instead of:

```text
load all agents + load all skills + search prompt text manually
```

Yes-human does:

```text
lookup route ids -> expand only chosen graph nodes -> load exact markdown snippets
```

This makes a 400-agent system behave like a 1-agent prompt at runtime.

---

## 22.2 Open-source source miner

Yes-human should have a source miner that finds the best public agent, skill, workflow, hook, and connector patterns for a task.

Input:

```text
yes source-mine "security code review agent"
yes source-mine "startup CFO cost model workflow"
yes absorb https://github.com/org/repo
```

### 22.2.1 Discovery sources

- GitHub search sorted by stars, recent activity, license, and language
- GitHub topics: agent, agents, mcp, rag, static-analysis, code-search, workflow, llm
- official docs and repositories first
- curated seed list: ECC, LangGraph, AutoGen, CrewAI, OpenHands, MCP Registry, GraphRAG, Semgrep, CodeQL, Joern, Tree-sitter
- local existing plugins and skills

### 22.2.2 Scoring

Each candidate source gets a score:

```text
score =
  stars_weight
  + recency_weight
  + license_weight
  + tests_weight
  + docs_weight
  + security_weight
  + overlap_reduction
  - stale_penalty
  - unsafe_tool_penalty
  - unclear_license_penalty
```

This avoids blindly importing every popular repo.

### 22.2.3 Absorption output

The source miner never writes directly into production content.

It writes:

```text
staging/incoming/<repo>
staging/normalized/<repo>
reports/source-mining/<task>.md
registry/provenance.pending.json
```

Then the absorber promotes only high-value items.

---

## 22.3 Agent and skill factory

When no good existing agent exists, Yes-human creates one in staging.

Trigger conditions:

- route miss
- repeated task without workflow
- missing connector-to-skill binding
- user asks for a domain not covered
- absorbed source reveals a useful pattern but no portable agent

Factory output:

```text
staging/agents/<category>/<agent-id>.md
staging/skills/<category>/<skill-id>.md
staging/workflows/<workflow-id>.md
reports/factory/<agent-id>.md
```

The factory must include:

- metadata frontmatter
- task scope
- tools allowed
- inputs and outputs
- failure modes
- budget band
- validation checklist
- graph route entries
- tests or sample prompts

No generated agent is promoted until it passes validation.

---

## 22.4 Capability gap detector

Yes-human should continuously compare:

- current agents
- current skills
- current workflows
- available MCP/connectors
- task history
- source-mined candidates

Then detect gaps:

```text
missing agent
missing skill
missing workflow
missing connector binding
missing hook
missing validation
missing route alias
```

Example:

```text
User asks: "estimate runway and hiring plan"
Existing: CEO agent, CFO agent
Missing: runway workflow + spreadsheet skill
Action: create staged workflow and bind spreadsheet connector
```

Example:

```text
User asks: "scan repo for auth risks"
Existing: security agent
Available: Semgrep/CodeQL connector
Missing: semgrep-auth-rules skill
Action: create skill and MCP/tool binding
```

The detector should produce:

```text
reports/capability-gaps.md
registry/gaps.json
staging/proposed-routes.json
```

---

## 22.5 Connector maximizer

Connectors and MCPs should not just be listed. They should be actively mapped to agents and workflows.

For every connector:

```text
connector -> capabilities -> allowed agents -> workflows -> required auth -> fallback
```

Example:

```text
github
  -> issues, pull requests, code search, repo metadata
  -> code-reviewer, release-manager, product-manager
  -> pr-review, issue-triage, changelog
```

Example:

```text
sourcegraph
  -> code search, symbol search, code intelligence
  -> architecture-agent, security-agent, migration-agent
  -> graphify, impact-analysis, dependency-review
```

Example:

```text
browser/playwright
  -> screenshots, UI checks, crawling
  -> frontend-agent, qa-agent, research-agent
  -> visual-regression, web-research, e2e-debug
```

This is how Yes-human maximizes tools without loading every tool schema into prompt context.

---

## 22.6 DSA selector matrix

Use the best data structure for each job.

| Need | Best structure | Why |
|---|---|---|
| exact route from keyword | HashMap | O(1) lookup |
| command and phrase prefix | Trie | fast prefix/phrase matching |
| natural language candidates | Inverted index | cheap token-to-route lookup |
| category routing | Weighted DAG | hierarchy without cycles |
| agent-skill matching | Bipartite graph | clean capability mapping |
| workflow steps | Directed acyclic graph | ordered, valid execution |
| code imports | Directed graph | dependency traversal |
| code call relationships | Call graph | impact analysis |
| security/dataflow | Code property graph | AST + CFG + dataflow in one model |
| recent repeated tasks | LRU cache | reuse successful route |
| "do we know this?" check | Bloom filter | cheap negative check |
| semantic fallback | Vector index | only when lexical graph misses |
| version/provenance | Merkle DAG | change tracking and rollback |
| priority scheduling | Heap/priority queue | choose highest-value next action |
| long-running task state | State machine | predictable transitions |
| multi-agent orchestration | State graph | bounded fanout and joins |
| dedupe | MinHash/SimHash | cheap similarity estimate |
| exact content integrity | Content hash map | stable cache and provenance |

Default storage:

```text
SQLite tables for durable graph
compact JSON for host bundles
in-memory HashMap/Trie/LRU for fast runtime
vector index only as fallback
```

---

## 22.7 Default task routing examples

### Coding

```text
task: "fix bug in checkout flow"
route:
  superior-master
  -> engineering-master
  -> codebase graph query
  -> backend/frontend specialist
  -> test workflow
```

### CFO/cost

```text
task: "estimate payroll cost after hiring 5 engineers"
route:
  superior-master
  -> business-master
  -> CFO agent
  -> cost-model skill
  -> spreadsheet/calculator connector if available
```

### CEO/startup

```text
task: "prepare go-to-market plan"
route:
  superior-master
  -> startup-master
  -> CEO + marketing + sales if expanded mode
  -> GTM workflow
```

### Deep research

```text
task: "find best agent frameworks for this architecture"
route:
  superior-master
  -> research-master
  -> source miner
  -> browser/search/MCP connectors
  -> provenance report
```

### Security

```text
task: "check this repo for auth vulnerabilities"
route:
  superior-master
  -> security-master
  -> codebase graph security profile
  -> Semgrep/CodeQL if available
  -> threat-model workflow
```

### Plugin growth

```text
task: "add repo X to Yes-human"
route:
  superior-master
  -> plugin-absorber
  -> source miner
  -> staging
  -> dedupe
  -> provenance
  -> tests
```

---

## 22.8 Feature list

Required major features:

- one default lightweight plugin entrypoint
- superior master dispatcher
- domain masters for each category
- specialist agents
- subskills
- workflows
- Graphify codebase feature
- local graph builder
- Sourcegraph adapter
- GraphRAG optional indexer
- Tree-sitter parser layer
- Semgrep/CodeQL/Joern optional security layer
- source miner for GitHub/open-source discovery
- plugin absorber
- capability gap detector
- agent and skill factory
- connector maximizer
- MCP registry integration
- workflow suggestion engine
- mistake-learning graph
- cost graph
- trace store
- route cache
- context pack generator
- DSA selector
- dedupe engine
- provenance tracker
- rollback manager
- generated Claude bundle
- generated Codex bundle
- generated AGENT.md bundle
- generated CLI bundle
- generated MCP server
- generated Cursor bundle
- generated Windsurf bundle
- generated Generic adapter bundle
- user persona system
- user roles and access control
- feedback loop
- artifact versioning
- multi-user and team support
- offline mode
- crash recovery
- latency monitoring
- agent quality measurement
- degradation detection
- community contribution workflow
- business tool connectors (CRM, accounting, project management, HR)
- non-technical domain agents (marketing, sales, finance, legal, HR)

---

## 22.9 Architecture rule for "super human" behavior

The system becomes stronger by improving the graph, routes, and workflows, not by loading more text.

Correct growth path:

```text
new task
  -> route
  -> execute
  -> trace
  -> learn edge
  -> suggest workflow
  -> validate
  -> promote
```

Wrong growth path:

```text
new task
  -> append giant prompt
  -> load more agents at startup
```

This rule is what keeps Yes-human fast, cheap, and scalable.

---

## 22.10 Mistake learning and optimization loop

Yes-human should learn at the workflow and routing layer first, then optionally at the model-training layer.

### 22.10.1 Runtime learning

Every task stores a compact trace:

```text
task_hash
route_id
selected_master
selected_agent
selected_skills
selected_tools
context_pack_hash
token_cost
tool_cost
errors
fixes
validation_result
user_acceptance
```

The next similar task checks this trace before choosing a route.

If a mistake happened:

```text
error signature -> avoid route -> preferred workflow -> validation that fixed it
```

This is the first learning loop and it is cheap.

### 22.10.2 Agent Lightning style loop

Agent Lightning should influence the trace and optimizer design:

- record structured spans for prompts, tool calls, rewards, and outcomes
- keep the runtime framework-agnostic
- selectively optimize one or more agents
- update prompt templates, route weights, or policy hints after evaluation

Yes-human should not retrain during normal user tasks. It should collect traces first, then optimize offline or in explicit training mode.

### 22.10.3 ART style loop

OpenPipe ART should influence the training layer for multi-step agents:

- use task environments
- define reward functions
- train multi-step behavior with GRPO-like workflows when appropriate
- improve tool-use and long-step reasoning for repeated, measurable tasks

ART-style training is useful for:

- SQL repair loops
- code-fix tasks with tests
- web navigation benchmarks
- MCP tool mastery
- repeated internal business workflows

It is not the default runtime. It is a later optimization layer.

### 22.10.4 Promotion rule

Any learned improvement must pass:

- regression prompts
- workflow tests
- cost comparison
- safety checks
- provenance update

Only then can it update production registries.

---

## 22.11 Existing orchestrator comparison

Yes-human should learn from existing systems but remain different in purpose.

| System | Strong at | Weak for this goal | Yes-human position |
|---|---|---|---|
| LangGraph | stateful graph workflows, durable execution, human-in-loop, memory | requires app/framework integration; not a universal plugin content system | use ideas for state graphs and long-running workflow engine |
| AutoGen | multi-agent patterns, agent tools, group orchestration | now maintenance mode; not focused on low-token plugin routing | use historical patterns only, prefer newer Microsoft Agent Framework ideas later |
| CrewAI | role-based crews and event flows; strong ergonomic agent/task config | can become agent-heavy; not a graph-indexed universal host adapter | use role/task YAML ideas and flow/crew split |
| OpenAI Agents SDK | lightweight primitives, tools, handoffs, guardrails, sessions, tracing, MCP | OpenAI/Python-centered runtime, not a host-neutral plugin corpus | use adapter ideas, tracing, guardrails, handoffs |
| OpenHands | coding agent platform with file/shell/browser workflows | coding-centered; heavier than a lightweight always-on plugin | use software-agent execution and sandbox ideas |
| Agent Lightning | framework-agnostic optimization, structured spans, multi-agent optimization | trainer/optimizer, not a plugin runtime or router | use for trace schema and improvement loop |
| OpenPipe ART | multi-step agent reinforcement training with GRPO | training system, not everyday low-cost dispatcher | use for optional offline training of repeated workflows |
| GraphRAG | graph-based retrieval over large text/corpora | indexing can be expensive; not needed for every task | use only for large corpus/global research mode |
| Sourcegraph | code search and code intelligence | external/deployment-dependent if not local | use as optional adapter; local graph stays default |
| Semgrep/CodeQL/Joern | static/security/code analysis | domain-specific tools, not orchestration | bind to security/code graph workflows |
| MCP Registry | tool/server discovery | discovery is not enough; needs policy and routing | use for connector sourcing and capability mapping |
| ECC | broad agents/skills/hooks/plugin layout | Claude-centric and can grow prompt-heavy | absorb patterns into Yes-human with low-token graph routing |

### 22.11.1 Differentiator

Yes-human is not trying to be only an agent framework.

It combines:

- host-neutral plugin packaging
- DSA-based low-token routing
- graph-indexed codebase understanding
- capability gap detection
- source mining and absorption
- connector maximization
- mistake-learning graph
- optional training loop
- generated bundles for Claude, Codex, AGENT.md, CLI, MCP, Cursor, Windsurf, and any generic AI agent
- user persona system for non-technical users
- full non-technical domain coverage (marketing, sales, finance, legal, HR)
- community contribution model
- agent quality measurement and degradation detection
- multi-user team support with role-based access
- offline mode and crash recovery

That combination is the product.

---

## 22.12 Complete feature inventory

### Core routing

- tiny boot file
- superior master
- domain masters
- exact route map
- phrase trie
- inverted route index
- category DAG
- agent-skill bipartite graph
- route cache
- semantic fallback

### Context and code understanding

- codebase graph builder
- file tree graph
- symbol graph
- dependency graph
- test graph
- command graph
- security graph
- workflow graph
- context pack generator
- local-first retrieval
- Sourcegraph adapter
- GraphRAG optional mode

### Agents and workflows

- specialist agents
- subagents
- subskills
- workflow DAGs
- validation checklists
- rollback flows
- workflow suggestion
- workflow staging
- route tests

### Tools and connectors

- MCP registry scanner
- connector capability graph
- tool policy graph
- connector maximizer
- browser/playwright binding
- GitHub binding
- Sourcegraph binding
- Semgrep/CodeQL/Joern binding
- spreadsheet/calculator binding for finance work
- fallback tool paths

### Learning and optimization

- trace store
- mistake graph
- route outcome scoring
- cost graph
- prompt/workflow improvement staging
- Agent Lightning style structured spans
- ART style optional training mode
- regression evaluation
- promotion gate

### Plugin growth

- open-source source miner
- GitHub repo scoring
- plugin absorber
- metadata normalizer
- license scanner
- duplicate detector
- capability gap detector
- agent factory
- skill factory
- hook factory
- workflow factory
- provenance graph
- rollback manager

### Host outputs

- Claude bundle
- Codex bundle
- AGENT.md bundle
- CLI bundle
- MCP server bundle
- Cursor bundle
- Windsurf bundle
- Generic adapter bundle
- VS Code/IDE adapter path

### User and team features

- user persona system
- user roles and access control
- feedback loop
- artifact versioning
- multi-user and team support
- offline mode
- crash recovery
- latency monitoring

### Quality and community

- agent quality measurement
- degradation detection
- community contribution workflow
- business tool connectors

---

## 23. Implementation plan

### Phase 0: Preserve existing backup

- keep current `jas-human-special-backup-20260527`
- do not delete until migration is complete
- treat it as source input

### Phase 1: Bootstrap Yes-human repo

- create repo structure
- create schemas
- create CLI skeleton
- create docs
- create adapter spec
- create canonical `rules/`, `hooks/`, `policies/`, and `validators/`
- create runtime lifecycle state machines

### Phase 2: Migrate current backup

- import current agents into staging
- normalize metadata
- count agents/categories/skills
- build registries
- generate report

### Phase 3: Build graph router

- exact registry route
- alias route
- local search
- graph route
- semantic fallback
- budget checks

### Phase 4: Build adapters

- CLI adapter first
- Codex adapter second
- Claude adapter third
- MCP server bundle fourth
- AGENT.md/OpenCode generator fifth
- host-specific hook/rule/policy compilation
- host bundle validation

### Phase 4B: Optional adapter packs

- Cursor adapter
- Windsurf adapter
- VS Code adapter
- Sourcegraph adapter
- Generic adapter (stdio/HTTP/file-drop protocol with signed manifest, scoped permissions, sandbox, audit log, cancellation)
- optional adapter packs cannot block core v2 release

### Phase 5: Build absorber

- GitHub fetch
- local folder import
- license/provenance extraction
- dedupe
- staging promotion
- rollback

### Phase 6: Integrate graph context

- local code graph
- Sourcegraph adapter
- GraphRAG optional indexer
- graph snapshot cache

### Phase 7: Workflow learning

- trace schema
- workflow miner
- workflow suggester
- approval flow
- eval runner
- mistake graph promotion rules
- workflow candidate validation

### Phase 8: Extended content pack

- import ECC into staging
- promote only quality items
- create category packs
- run routing tests

---

## 24. Acceptance criteria

The architecture is ready when:

- startup target is `60-180 tokens`, with hard cap under `300 tokens`
- a known route loads one agent and one workflow only
- new GitHub repo absorption works in staging
- Codex bundle generates clean `AGENTS.md`
- Claude bundle generates clean `CLAUDE.md` and plugin files
- CLI can run `yes route`, `yes absorb`, and `yes graph build`
- graph retrieval returns file/symbol/context slices without full repo loading
- every absorbed item has provenance
- every agent has metadata
- every workflow has validation
- ECC parity matrix maps agents, skills, commands, hooks, rules, MCP configs, scripts, and tests
- concrete schemas exist for plugin, agent, skill, workflow, command, hook, rule, policy, route, category, MCP, source reference, trace, rollback, and host bundle
- exact `YES_BOOT.md` exists and passes startup token validation
- hooks, rules, policies, and validators exist in portable core
- generated Claude, Codex, OpenCode/AGENT.md, CLI, and MCP bundles include the compatible rule layer
- optional Cursor, Windsurf, VS Code, Sourcegraph, and Generic adapter packs pass their own bundle validation before release
- policy gates ask before expensive, destructive, private, or paid actions
- validators reject stubs, broken routes, duplicate weak artifacts, and missing provenance
- local reports show routing quality, token budget, connector coverage, source provenance, and mistake patterns
- each production subagent/workflow has a reference dossier with top GitHub repositories plus official/non-GitHub sources when available
- reference dossier score passes the minimum promotion threshold
- parallel fanout is budgeted and capped
- tests cover routing, graph, absorber, adapters, security, learning, and cost policy
- Cursor and Windsurf bundles generate clean `.cursorrules` and `.windsurfrules`
- Generic adapter protocol works with any host that declares capabilities
- user persona system biases routing correctly for non-technical users
- feedback loop processes accept/reject/partial feedback, stages route-weight changes, and promotes only after eval gates pass
- artifact versioning tracks all agents, skills, workflows, rules, and policies
- multi-user team support with role-based access control, tenant/project isolation, private traces, secret redaction, and retention policy
- offline mode works for all local operations
- crash recovery resumes workflows from checkpoints
- latency targets met for all operation types
- agent quality scores computed and degradation detected
- community contribution workflow processes submissions through staging
- non-technical domain agents exist for marketing, sales, finance, legal, and HR
- business tool connectors declared for CRM, accounting, project management, and HR
- high-stakes domains have mandatory disclaimers and policy gates
- eval thresholds include minimum fixture counts per category and per domain
- Generic adapter requires signed manifests, scoped permissions, sandboxing, audit logs, and cancellation support

---

## 25. ECC parity matrix

Yes-human v2 must match the useful execution surface of ECC while staying
portable and lower-token.

ECC is used as a parity baseline, not as the final architecture.

| ECC surface | ECC baseline | Yes-human v2 equivalent | Requirement |
|---|---:|---|---|
| specialized agents | 61 | `content/agents/**` + `registry/agents.json` | import into staging, dedupe, then promote only validated agents |
| skills | 246 listed in overview, 243 in project-structure note | `content/skills/**` + `registry/skills.json` | skills are canonical workflow surface |
| commands | 76 | `content/commands/**` + CLI + generated host commands | commands are shims over skills/workflows |
| hooks | automated hook workflows | `hooks/*.ts` compiled per host | hooks remain runtime code, not prompt bloat |
| rules | common + per-language rules | `rules/*.json` + generated host rules | deterministic rules run before agent loading |
| MCP configs | 14 configs | `registry/mcps.json` + `mcps/*.md` | bind provider connectors, do not clone provider plugins |
| scripts | cross-platform Node utilities | `packages/yes-cli`, `packages/yes-runtime`, hook runner | scripts must be tested and host-neutral |
| tests | test suite | `tests/routing`, `tests/graph`, `tests/adapters`, `tests/absorber`, `tests/security` | acceptance thresholds defined in Section 30 |
| TDD workflow | mandatory | `workflows/engineering/tdd.workflow.md` | generated for coding tasks when task type is feature/bug |
| security-first workflow | mandatory | `rules/safety.rules.json` + `policies/*` + security validators | critical security findings block promotion |
| skills-first policy | explicit | same, plus graph/workflow routing | new workflows land in `skills/` or `workflows/` first |
| commit/PR workflow | explicit | `workflows/dev/git-pr.workflow.md` | host adapter generates commit/PR instructions only when host supports it |
| context policy | avoid last 20% window for large tasks | budget ladder + context pack validator | context packs fail validation if they exceed budget band |

Parity rule:

```text
ECC capability -> Yes-human staging -> schema normalize -> dedupe -> validate -> promote -> route test -> host export
```

No ECC item becomes active just because it exists. It must pass:

- license/provenance check
- duplicate check
- quality score
- host portability check
- route test
- cost test
- validator pass

---

## 26. Concrete schemas

Yes-human v2 must not depend on vague markdown conventions. Every agent, skill,
workflow, command, hook, rule, policy, route, connector, source reference, trace,
and rollback record has a schema.

Schemas live in:

```text
packages/yes-schema/schemas/
  plugin.schema.json
  agent.schema.json
  skill.schema.json
  workflow.schema.json
  command.schema.json
  hook.schema.json
  rule.schema.json
  policy.schema.json
  route.schema.json
  category.schema.json
  mcp.schema.json
  source-reference.schema.json
  quality-score.schema.json
  trace.schema.json
  rollback.schema.json
  host-bundle.schema.json
```

### 26.1 Plugin manifest schema

```json
{
  "id": "yes-human",
  "name": "Yes-human",
  "version": "2.0.0",
  "schema_version": "2.0",
  "description": "Portable low-token agentic control plane",
  "license": "MIT-or-Apache-2.0",
  "homepage": "https://github.com/<owner>/yes-human",
  "runtime": {
    "node": ">=20",
    "python": ">=3.11",
    "sqlite": ">=3.40"
  },
  "startup": {
    "boot_file": "YES_BOOT.md",
    "route_table": "graph/indexes/ROUTE_TABLE.min.json",
    "target_tokens": 180,
    "hard_cap_tokens": 300
  },
  "exports": ["claude", "codex", "opencode", "agent-md", "cli", "mcp", "cursor", "windsurf", "generic"],
  "registries": {
    "agents": "registry/agents.json",
    "skills": "registry/skills.json",
    "workflows": "registry/workflows.json",
    "tools": "registry/tools.json",
    "mcps": "registry/mcps.json"
  }
}
```

### 26.2 Agent frontmatter schema

Every agent markdown file starts with frontmatter.

```yaml
---
id: engineering.typescript-reviewer
name: TypeScript Reviewer
version: 1.0.0
status: active
category: engineering.language-review
kind: specialist
summary: Reviews TypeScript code for correctness, maintainability, safety, and project fit.
triggers:
  - typescript review
  - ts review
  - javascript review
inputs:
  - changed_files
  - project_context
outputs:
  - findings
  - risk_summary
  - verification_plan
allowed_tools:
  - filesystem.read
  - shell.readonly
  - code_graph.query
required_skills:
  - engineering.code-review
  - engineering.typescript
budget_band: standard
max_context_tokens: 1200
failure_modes:
  - misses cross-file behavior
  - over-focuses on style
verification:
  - route_eval
  - sample_prompt_eval
source_references:
  - ref.typescript.official
  - ref.github.top10.typescript-review
quality_gate: production
---
```

Required agent fields:

- `id`
- `name`
- `version`
- `status`
- `category`
- `kind`
- `summary`
- `triggers`
- `inputs`
- `outputs`
- `allowed_tools`
- `budget_band`
- `max_context_tokens`
- `failure_modes`
- `verification`
- `source_references`
- `quality_gate`

Agent body sections:

```text
## Mission
## When To Use
## When Not To Use
## Inputs
## Outputs
## Procedure
## Tool Policy
## Verification
## Failure Modes
## Example Routes
## Source Notes
```

### 26.3 Skill schema

```yaml
---
id: engineering.tdd
name: Test Driven Development
version: 1.0.0
category: engineering.dev-workflow
summary: Red-green-refactor workflow for feature and bug tasks.
triggers:
  - new feature
  - bug fix
  - test first
prerequisites:
  - test_command_known
steps:
  - write failing test
  - implement minimal change
  - run focused test
  - refactor
  - run relevant suite
outputs:
  - tests
  - implementation
  - verification_summary
budget_band: standard
rollback:
  - revert files changed in trace
validators:
  - skill.validator
  - cost.validator
source_references:
  - ref.ecc.tdd
---
```

Skill body sections:

```text
## Trigger
## Prerequisites
## Steps
## Verification
## Rollback
## Common Failures
## Examples
```

### 26.4 Workflow schema

```json
{
  "id": "engineering.code-review-with-security",
  "version": "1.0.0",
  "status": "active",
  "summary": "Review changed code with quality and security checks.",
  "task_family": "code_review",
  "inputs": ["changed_files", "diff", "project_rules"],
  "outputs": ["findings", "severity_ordered_report", "test_gaps"],
  "route": {
    "domain_master": "engineering.master",
    "agents": ["engineering.code-reviewer", "security.security-reviewer"],
    "parallel": true,
    "max_parallel_agents": 2
  },
  "budget": {
    "band": "expanded",
    "max_context_tokens": 3500,
    "max_tool_calls": 12
  },
  "gates": ["pre-tool", "post-tool", "on-task-complete"],
  "verification": ["lint_if_available", "test_if_available", "security_scan_if_available"],
  "rollback": "trace_based",
  "promotion": {
    "can_learn": true,
    "min_successes_before_update": 2
  }
}
```

### 26.5 Route schema

```json
{
  "route_id": "route.engineering.typescript-review",
  "match": {
    "keywords": ["typescript review", "ts review", "javascript review"],
    "aliases": ["js review", "frontend review"],
    "negative_keywords": ["tax review", "legal review"]
  },
  "target": {
    "domain_master": "engineering.master",
    "agent": "engineering.typescript-reviewer",
    "skills": ["engineering.code-review", "engineering.typescript"],
    "workflow": "engineering.single-language-review"
  },
  "confidence": {
    "exact": 0.98,
    "alias": 0.9,
    "graph": 0.82,
    "semantic": 0.72
  },
  "budget_band": "standard",
  "fallback": "engineering.code-reviewer"
}
```

### 26.6 Category schema

```json
{
  "id": "engineering",
  "name": "Engineering",
  "parent": null,
  "master_agent": "engineering.master",
  "keywords": ["code", "build", "test", "debug", "refactor"],
  "children": ["backend", "frontend", "mobile-native", "testing-qa"],
  "default_budget_band": "standard",
  "quality_threshold": 0.82
}
```

### 26.7 MCP binding schema

```json
{
  "id": "github",
  "provider": "GitHub",
  "kind": "mcp",
  "purpose": "Repository, issues, PR, CI, and code metadata operations",
  "required_auth": true,
  "trust_level": "reviewed",
  "allowed_agents": ["engineering.*", "security.*", "release-engineering.*"],
  "allowed_workflows": ["github.pr-review", "github.ci-fix"],
  "cost_profile": "external_api",
  "fallback": "shell.git_and_gh_cli",
  "policy": "mcp-trust.policy.json"
}
```

### 26.8 Hook schema

```json
{
  "id": "pre-tool.cost-and-safety",
  "event": "pre-tool",
  "runtime": "node",
  "entry": "hooks/pre-tool.ts",
  "inputs": ["task_envelope", "route_decision", "tool_plan"],
  "outputs": ["allow", "deny_reason", "rewritten_tool_plan"],
  "policy_dependencies": ["tool-use.rules.json", "safety.rules.json", "budget.rules.json"],
  "host_support": {
    "claude": "native_or_wrapper",
    "codex": "wrapper",
    "opencode": "wrapper",
    "cli": "native",
    "mcp": "middleware"
  }
}
```

### 26.9 Policy schema

```json
{
  "id": "destructive-actions",
  "version": "1.0.0",
  "default": "ask",
  "rules": [
    {
      "match": {"action": "delete", "scope": "repo_or_home"},
      "decision": "ask",
      "reason": "Destructive file operation"
    },
    {
      "match": {"action": "send_external", "data": "credentials"},
      "decision": "deny",
      "reason": "Credentials must not leave local machine"
    }
  ]
}
```

### 26.10 Source reference schema

Every generated agent, skill, workflow, rule, or connector must link to source
references.

```json
{
  "id": "ref.github.top10.typescript-review.2026-05-28",
  "topic": "typescript review agent",
  "created_at": "2026-05-28T00:00:00+05:30",
  "sources": [
    {
      "url": "https://github.com/example/repo",
      "kind": "github_repo",
      "stars": 10000,
      "license": "MIT",
      "commit": "abc123",
      "used_for": ["workflow pattern", "quality checklist"],
      "notes": "Do not copy code; extract pattern only."
    }
  ],
  "minimum_sources_met": true,
  "license_risk": "low",
  "reviewed_by": "source-miner"
}
```

### 26.11 Trace schema

```json
{
  "trace_id": "trace_01",
  "task_hash": "sha256:...",
  "host": "codex",
  "route_id": "route.engineering.typescript-review",
  "agents": ["engineering.typescript-reviewer"],
  "skills": ["engineering.code-review"],
  "tools": ["filesystem.read", "shell.readonly"],
  "input_tokens_est": 900,
  "output_tokens_est": 1200,
  "cost_band": "standard",
  "success": true,
  "failure_class": null,
  "verification": {
    "commands": ["npm test -- --runInBand"],
    "passed": true
  },
  "learning_candidate": false
}
```

### 26.12 Rollback schema

```json
{
  "change_id": "change_01",
  "created_at": "2026-05-28T00:00:00+05:30",
  "reason": "absorb github plugin",
  "files_added": [],
  "files_modified": [],
  "registry_entries_added": [],
  "graph_edges_added": [],
  "previous_hashes": {},
  "rollback_command": "yes rollback change_01",
  "safe_to_auto_rollback": true
}
```

---

## 27. Exact boot and startup contract

The startup contract is the most important cost-control rule.

### 27.1 `YES_BOOT.md`

Exact boot content:

```markdown
Use Yes-human as a tiny dispatcher. First run route lookup from `ROUTE_TABLE.min.json`; then aliases, workflow cache, graph, semantic fallback. Load only the selected context pack. Never load full agent, skill, workflow, category, or source lists at startup. Ask before expensive, destructive, private, paid, source-mining, graph-building, or parallel >3 work.
```

Target: under `180 tokens`.

Hard cap: under `300 tokens`.

### 27.2 `ROUTE_TABLE.min.json`

The hot route table is intentionally small.

```json
{
  "version": "2.0.0",
  "generated_at": "2026-05-28T00:00:00+05:30",
  "fallback": "system.supreme-router",
  "routes": {
    "review code": "route.engineering.code-review",
    "fix build": "route.engineering.build-resolver",
    "security review": "route.security.security-review",
    "cost estimate": "route.finance.cost-estimation",
    "market research": "route.research.deep-research",
    "build landing page": "route.frontend.landing-page"
  },
  "pointers": {
    "aliases": "graph/indexes/ALIAS_TABLE.min.json",
    "workflow_cache": "graph/indexes/WORKFLOW_CACHE.min.json",
    "graph": "graph/indexes/yes.sqlite"
  }
}
```

### 27.3 Startup forbidden list

Forbidden at startup:

- full `agents.json`
- full `skills.json`
- full `workflows.json`
- full category tree
- all command docs
- all source references
- all MCP schemas
- all examples
- all prior traces
- all absorbed plugin summaries
- all markdown agent bodies

### 27.4 Startup validation

`yes eval cost` must fail if:

- `YES_BOOT.md` exceeds `300` estimated tokens
- generated `CLAUDE.md` exceeds the startup hard cap
- generated `AGENTS.md` includes full registry lists
- boot text references unavailable files
- route table exceeds the configured hot-size limit

---

## 28. Host adapter feature matrix

Yes-human is source-first and host-compiled. The core must work even when a host
does not support native agents or hooks.

| Feature | Claude/Claude Code | Codex | OpenCode | AGENT.md tools | CLI | MCP server | Cursor | Windsurf | Generic |
|---|---|---|---|---|---|---|---|---|---|
| boot file | `CLAUDE.md` | `AGENTS.md` | `AGENTS.md` | `AGENT.md` | built-in | prompt resource | `.cursorrules` | `.windsurfrules` | adapter manifest |
| agents | native agents where supported | generated skill/agent docs | AGENT-compatible docs | sections | route packs | prompt resources | rule-based agents | cascade agents | declared agents |
| skills | native skills where supported | Codex skills | markdown skills | markdown skills | skill packs | prompt resources | rule-based skills | cascade skills | declared skills |
| commands | slash commands | recipes/scripts | recipes/scripts | command docs | `yes <cmd>` | MCP tools | slash commands | slash commands | protocol commands |
| hooks | native or wrapper | wrapper scripts | wrapper scripts | not native, documented | native hook runner | middleware | wrapper scripts | wrapper scripts | protocol hooks |
| rules | generated host rules | generated host rules | generated host rules | AGENT.md rules | rule runner | policy resources | `.cursorrules` | `.windsurfrules` | adapter rules |
| MCP | host MCP config | Codex MCP config | MCP profile | docs | MCP profile | native | host MCP config | host MCP config | declared MCP |
| graph lookup | local helper | local helper | local helper | CLI helper | native | resource/tool | local helper | local helper | protocol query |
| learning traces | local trace store | local trace store | local trace store | local trace store | native | optional resource | local trace store | local trace store | protocol traces |
| rollback | generated command | CLI command | CLI command | documented command | native | tool | CLI command | CLI command | protocol rollback |

### 28.1 Generated Claude bundle

```text
generated/claude/
  plugin.json
  CLAUDE.md
  commands/
  hooks/
  agents/
  skills/
  mcps/
  yes-runtime-wrapper.js
```

Claude bundle rules:

- `CLAUDE.md` contains boot pointer only.
- Agents are generated from portable source.
- Commands call skills/workflows, not duplicate logic.
- Hooks enforce policies where host permits; otherwise wrapper records limitation.

### 28.2 Generated Codex bundle

```text
generated/codex/
  AGENTS.md
  skills/
  scripts/yes-route
  scripts/yes-graph
  scripts/yes-hook-runner
  mcp-config.example.toml
  yes-human-codex-adapter.md
```

Codex bundle rules:

- `AGENTS.md` stays minimal and points to route lookup.
- Skills are generated only for active, validated workflows.
- Hook behavior is implemented as scripts/wrappers when native hooks are not available.
- MCP config remains example-only unless user installs credentials.

### 28.3 Generated OpenCode and AGENT.md bundle

```text
generated/opencode/
  AGENTS.md
  AGENT.md
  commands/
  skills/
  yes-route.config.json
  mcp.profile.json
```

Rules:

- Prefer vendor-neutral `AGENT.md`.
- If a tool uses `AGENTS.md`, symlink or duplicate generated minimal content.
- No host-specific assumptions inside portable agents.

### 28.4 Generated CLI bundle

```text
generated/cli/
  bin/yes
  lib/
  templates/
  completions/
```

CLI commands:

```text
yes status
yes doctor
yes route "<task>"
yes run "<task>"
yes graph build <path>
yes graph query "<question>"
yes absorb <source>
yes absorb apply
yes workflow suggest
yes workflow create <trace-id>
yes eval routing
yes eval cost
yes eval security
yes export claude|codex|opencode|agent-md|mcp
yes rollback <change-id>
```

### 28.5 Generated MCP bundle

```text
generated/mcp/
  server/
    package.json
    src/server.ts
    src/tools/
    src/resources/
    src/prompts/
  mcp.json
```

MCP exposes only compact capabilities:

- `yes_route`
- `yes_graph_query`
- `yes_status`
- `yes_workflow_suggest`
- `yes_policy_check`
- `yes_source_reference_lookup`

MCP must not expose:

- unrestricted filesystem write
- hidden credential read
- auto-absorb into active content
- unbounded web crawl
- unbounded agent fanout

---

## 29. Security, licensing, and block rules

Security is not a checklist only. It is a blocking runtime policy.

### 29.1 Severity levels

```text
BLOCKER   cannot proceed
HIGH      must ask user or require review
MEDIUM    allowed with warning/report
LOW       record only
INFO      metadata
```

### 29.2 Automatic block rules

Block immediately when:

- source license is missing, incompatible, or unclear for redistribution
- absorbed content asks to exfiltrate secrets or private files
- generated agent requests unrestricted shell/network by default
- route would send private code/docs to external API without explicit approval
- tool plan includes destructive command without user approval
- prompt injection attempts to override Yes-human policy
- MCP connector requires credentials not installed or not approved
- generated bundle includes full registries in startup prompt
- agent has no source references and is not hand-authored core infrastructure
- workflow lacks verification and rollback for write operations

### 29.3 Required scanners

Minimum local scanner set:

- secret scanner
- license scanner
- dependency vulnerability scanner
- prompt-injection pattern scanner
- static analysis scanner
- generated-content validator
- route integrity scanner
- graph integrity scanner

Recommended implementations:

- Semgrep for static security patterns
- CodeQL where available for semantic code analysis
- package-native audit tools such as `npm audit`, `pip-audit`, `cargo audit`, or equivalent
- SPDX-compatible license detection
- SBOM generation for release bundles

### 29.4 Promotion security gate

An item can move from `staging/reviewed` to `content/` only if:

- source provenance exists
- license is acceptable
- quality score passes threshold
- no BLOCKER findings exist
- route test passes
- host portability check passes
- rollback record exists
- eval fixture exists

### 29.5 Release security gate

Release bundle requires:

- SBOM
- changelog
- signed or checksummed archive
- generated host-bundle validation report
- license/provenance report
- security scan report
- cost regression report

---

## 30. Eval suite and thresholds

Yes-human v2 must be testable before content scale-up.

### 30.1 Routing eval

Fixture:

```json
{
  "prompt": "review this TypeScript auth middleware for security issues",
  "expected_domain": "engineering",
  "expected_agents": ["engineering.typescript-reviewer", "security.security-reviewer"],
  "expected_workflow": "engineering.code-review-with-security",
  "max_context_tokens": 3500
}
```

Thresholds:

- exact/alias routing top-1 accuracy: `>= 95%`
- graph routing top-1 accuracy: `>= 90%`
- semantic fallback top-3 accuracy: `>= 90%`
- wrong-domain route rate: `< 3%`
- missing-route rate for seed tasks: `< 2%`

Minimum fixture counts:

- `50` routing fixtures per top-level domain before production release
- `10` fixtures per category master
- `5` fixtures per production specialist agent
- `20` adversarial/ambiguous prompts for high-overlap domains
- `10` negative-route fixtures per high-stakes domain

Thresholds are invalid unless fixture counts are met. A category with fewer
fixtures can remain in staging, but cannot be marked production-ready.

### 30.2 Cost eval

Thresholds:

- startup target: `60-180 tokens`
- startup hard cap: `< 300 tokens`
- micro task context: `< 500 tokens`
- standard task context: `< 2,000 tokens`
- expanded task context: `< 6,000 tokens`
- no task may load full registry into prompt
- route lookup p95 local runtime: `< 100 ms` after warm cache
- graph query p95 local runtime: `< 500 ms` for normal repo index

### 30.3 Graph retrieval eval

Thresholds:

- symbol lookup precision: `>= 90%`
- file-context retrieval precision: `>= 85%`
- stale graph detection: `100%` for changed files with tracked hashes
- graph build requires approval for large repos
- graph query returns context packs, not full files by default

### 30.4 Absorber eval

Thresholds:

- duplicate detection precision: `>= 90%`
- unknown license block rate: `100%`
- rollback generation rate: `100%`
- provenance capture rate: `100%`
- active-content mutation without staging: `0`

### 30.5 Agent/skill quality eval

Thresholds:

- no promoted stub agents
- every promoted agent has source references or core-infra exemption
- every promoted skill has triggers, prerequisites, steps, verification, rollback, and examples
- every workflow has input/output contract and success criteria
- every generated item has at least one eval fixture

### 30.6 Adapter eval

Each generated host bundle must pass:

- boot file under cap
- route table points to existing files
- no broken symlinks
- commands map to valid workflows
- hooks compile or are marked unsupported with wrapper fallback
- MCP definitions validate against MCP schema
- `yes doctor` passes for that bundle

### 30.7 Learning eval

Learning updates must not go live until:

- old routing eval still passes
- cost regression is under `5%`
- security eval still passes
- at least two successful traces support the update
- rollback is available

---

## 31. V2 research protocol for every subagent, skill, and workflow

No serious subagent should be designed from imagination alone.

Before generating any specialist agent, workflow, or domain skill, Yes-human must
build a reference dossier.

### 31.1 Minimum reference dossier

For each subagent/workflow:

- verify at least `10` relevant GitHub repositories when the domain has enough public repos
- include official documentation for the main framework/tool/language when available
- include at least `2` non-GitHub references when useful, such as official docs, standards, security guides, papers, vendor docs, or mature blog posts
- record stars, license, last activity, repo health, and relevance
- extract patterns, not copyrighted code
- cite source URL and commit or version when possible
- record what was used: workflow pattern, checklist, terminology, architecture, tests, or anti-patterns
- reject sources with unclear license when content would be redistributed

### 31.1A Dossier caching and reuse

The top-10-repository rule is a quality gate, not a requirement to repeat the
same expensive research every time.

Reuse rules:

- source dossiers are cached by `topic`, `domain`, `source_set_hash`, and `created_at`
- a new subagent may reuse an existing dossier when domain, task family, and source scope match
- dossier reuse must record `reused_from` and the original dossier hash
- stale dossiers older than `90 days` require a refresh check before production promotion
- high-change domains such as AI frameworks, security tools, cloud APIs, and pricing require freshness checks even sooner
- if official docs changed, the dossier must be refreshed
- source-mining runs should dedupe GitHub repositories already reviewed for the same domain

Dossier cache schema:

```json
{
  "dossier_id": "dossier.engineering.typescript-review.2026-05-28",
  "topic": "typescript review",
  "domain": "engineering.language-review",
  "source_set_hash": "sha256:...",
  "created_at": "2026-05-28T12:00:00+05:30",
  "expires_at": "2026-08-26T12:00:00+05:30",
  "reusable_for": ["typescript-reviewer", "typescript-refactor-agent"],
  "refresh_required": false
}
```

### 31.2 Source quality tiers

```text
Tier A: official docs, standards, language/framework repos, mature security docs
Tier B: high-star maintained GitHub repos, widely used tools, benchmark repos
Tier C: respected engineering blogs, papers, conference docs, vendor examples
Tier D: low-star repos, abandoned repos, unclear tutorials
Blocked: license-unclear copied content, malware, prompt-injection repos, spam
```

### 31.3 Research workflow

```text
subagent idea
  -> define domain and task boundaries
  -> search GitHub for top repos and active projects
  -> search official docs and standards
  -> collect at least 10 repo candidates
  -> filter by relevance, license, maintenance, quality
  -> extract reusable patterns
  -> create source-reference dossier
  -> design agent schema
  -> design skill/workflow schema
  -> create eval fixtures
  -> run quality/security/cost validators
  -> stage for review
  -> promote only after pass
```

### 31.4 Reference dossier output

```text
references/<domain>/<agent-id>.sources.json
reports/research/<agent-id>.md
staging/agents/<domain>/<agent-id>.md
staging/skills/<domain>/<skill-id>.md
staging/workflows/<workflow-id>.md
tests/fixtures/<agent-id>.jsonl
```

### 31.5 Dossier scoring

```text
source_count_score      0-20
official_docs_score     0-15
github_quality_score    0-20
license_safety_score    0-15
maintenance_score       0-10
pattern_clarity_score   0-10
testability_score       0-10
```

Minimum promotion score: `80/100`.

Hard requirements:

- license safety must be `>= 12/15`
- source count must be `>= 15/20`
- testability must be `>= 7/10`

### 31.6 What research may extract

Allowed:

- workflow structure
- checklist concepts
- public API usage concepts
- architecture patterns
- testing strategy
- security checks
- command names when factual
- configuration concepts

Not allowed:

- copying full agent prompts from incompatible licenses
- copying implementation code into Yes-human without license review
- laundering copyrighted docs into generated skills
- importing secrets, credentials, private content, or private repo context

### 31.7 Multi-source requirement by domain

| Domain | Required source mix |
|---|---|
| language/code reviewer | official language docs, style guides, linters, top repos, static analysis docs |
| security | OWASP or equivalent, Semgrep/CodeQL patterns, official framework security docs, vulnerable-code examples |
| frontend/design | framework docs, accessibility docs, design-system examples, browser compatibility docs |
| backend/API | framework docs, API style guides, auth docs, database docs, production repos |
| mobile | platform docs, Expo/React Native/Swift/Kotlin docs, testing and release docs |
| data/AI | framework docs, benchmark repos, eval methods, papers, production examples |
| business/finance | credible business sources, accounting/tax disclaimers, pricing docs, case studies |
| legal/compliance | official regulatory sources where possible, strong disclaimers, no legal advice claims |
| DevOps/cloud | provider docs, Terraform/Kubernetes docs, incident response docs, production examples |
| MCP/connectors | provider API docs, MCP docs, auth docs, rate-limit docs, SDK examples |

### 31.8 No-reference rule

If a proposed subagent cannot meet the reference dossier minimum:

- do not create it as production
- create a `research-needed` placeholder only
- route tasks to a broader parent agent
- record missing sources in `reports/research-gaps.md`

---

## 32. Full v2 content scope and generation strategy

This architecture targets full v2, not a tiny demo. The content should still be
generated in controlled batches so quality does not collapse.

### 32.1 Full v2 target

```text
50+ categories
250-450 production agents
250-500 production skills
100+ production workflows
30+ MCP/provider bindings
1000+ route fixtures
complete host exports for Claude, Codex, OpenCode, AGENT.md, CLI, and MCP
```

### 32.2 Seed-before-scale rule

For every category:

1. create category master
2. create route fixtures
3. create 3-5 best specialist agents using reference dossiers
4. create skills/workflows for the highest-value repeated tasks
5. run evals
6. only then expand to long-tail agents

### 32.3 Required category masters

```text
engineering.master
platform.master
security.master
data-ai.master
product-business.master
design-content.master
integrations.master
research.master
legal-compliance.master
finance.master
startup-ops.master
meta-system.master
```

### 32.4 Required first-wave specialist areas

Engineering:

- planner
- architect
- code-reviewer
- security-reviewer
- tdd-guide
- build-error-resolver
- e2e-runner
- refactor-cleaner
- docs-updater
- language reviewers for TypeScript, Python, Java, Go, Rust, Kotlin, C/C++, Swift

Platform:

- devops-engineer
- ci-cd-engineer
- observability-engineer
- cloud-architect
- release-manager
- incident-responder

Data/AI:

- rag-engineer
- eval-engineer
- ml-engineer
- data-engineer
- analytics-engineer
- graph-rag-engineer

Business:

- ceo-advisor
- cto-advisor
- cfo-advisor
- product-manager
- growth-marketer
- sales-operator
- customer-success-advisor

Marketing:

- marketing-strategist
- content-marketer
- seo-analyst
- social-media-manager
- email-marketer
- campaign-analyst
- brand-manager

Sales:

- sales-strategist
- pipeline-analyst
- proposal-generator
- competitive-intel-analyst
- account-manager
- pricing-strategist

Finance:

- financial-analyst
- budget-planner
- forecasting-analyst
- cash-flow-manager
- payroll-analyst
- expense-auditor

Legal:

- contract-reviewer
- compliance-checker
- privacy-advisor
- terms-drafter
- nda-reviewer

HR:

- hiring-manager
- onboarding-coordinator
- compensation-analyst
- performance-reviewer
- policy-drafter

Design/content:

- ui-ux-designer
- frontend-design-agent
- accessibility-auditor
- brand-strategist
- technical-writer
- presentation-designer

Integrations:

- github-operator
- browser-automation-agent
- figma-agent
- notion-agent
- vercel-agent
- stripe-agent
- mcp-connector-designer

Meta-system:

- source-miner
- plugin-absorber
- deduplicator
- stub-detector
- graph-builder
- workflow-miner
- cost-controller
- adapter-generator
- eval-runner

### 32.5 Agent generation factory contract

```text
yes research create-dossier <agent-id>
yes agent draft <agent-id> --from-dossier
yes skill draft <skill-id> --from-dossier
yes workflow draft <workflow-id> --from-dossier
yes eval agent <agent-id>
yes promote <agent-id>
```

Promotion requires:

- reference dossier score `>= 80`
- route eval pass
- cost eval pass
- security eval pass
- host portability pass
- no duplicate stronger existing capability

### 32.6 Full v2 does not mean all content loaded

Even with hundreds of agents:

- startup remains `60-180 tokens`
- one task loads one context pack
- category masters load only summaries
- specialist agents load only on route hit
- skills load only by trigger
- workflows load only by cache/graph match
- source references stay out of prompt unless asked or needed

---

## 33. Core architecture decision checkpoint

Build `Yes-human` as:

```text
portable core + graph router + workflow runtime + host adapters + content packs
```

Do not build it as:

```text
one massive Claude plugin folder
```

The best version of Yes-human is not just "more agents".

It is a routing, graph, workflow, and learning system that can absorb agents safely, choose the right context cheaply, run across hosts, and improve from repeated work.

This is a core decision checkpoint, not the final end of the document. Later
sections add operational requirements that must also be satisfied before v2
implementation starts.

---

## 34. Non-technical domain expansion

The engineering and platform domains are well-covered. The non-technical domains
need equal depth to make Yes-human useful for CFOs, marketers, sales teams,
legal professionals, HR teams, and operations managers.

### 34.1 Business tool integrations

Yes-human must integrate with the tools non-technical users actually use.

Required business connectors:

```text
registry/business-connectors.json
  CRM
    salesforce
    hubspot
    pipedrive
  project-management
    jira
    asana
    linear
    monday
    clickup
  accounting
    quickbooks
    xero
    freshbooks
  communication
    slack
    microsoft-teams
    discord
  document
    google-workspace
    microsoft-365
    notion
    confluence
  analytics
    google-analytics
    mixpanel
    amplitude
    tableau
  marketing
    mailchimp
    sendgrid
    buffer
    hootsuite
  design
    canva
    figma
    adobe-creative-cloud
  hr
    bamboohr
    gusto
    workday
  finance
    stripe
    plaid
    expensify
```

Each business connector declares:

- purpose
- required auth
- trust level
- allowed agents
- allowed workflows
- cost profile
- fallback path (manual export/import when API unavailable)

### 34.2 User persona system

A CFO and a developer should not get the same boot experience.

Yes-human must detect or accept a user persona to bias routing.

Persona detection:

```text
explicit: user sets persona via command or config
  yes persona set cfo
  yes persona set developer
  yes persona set marketer

implicit: infer from task history and vocabulary
  "payroll" + "budget" + "runway" -> business persona
  "fix build" + "refactor" + "PR" -> engineering persona
  "campaign" + "SEO" + "conversion" -> marketing persona

hybrid: explicit persona with task-override
  CFO persona + "fix this React bug" -> engineering route for this task
```

Persona schema:

```json
{
  "persona_id": "cfo",
  "name": "Chief Financial Officer",
  "default_domain": "product-business.finance",
  "preferred_agents": ["finance.cfo-advisor", "finance.cost-modeler"],
  "preferred_tools": ["spreadsheet", "calculator", "quickbooks"],
  "budget_bias": "standard",
  "vocabulary_aliases": {
    "runway": "cash runway months",
    "burn": "monthly burn rate",
    "ARR": "annual recurring revenue"
  },
  "default_output_format": "structured_report",
  "disclaimer_level": "financial"
}
```

Available personas:

```text
developer
architect
devops
qa-engineer
product-manager
cto
ceo
cfo
marketer
sales-rep
hr-manager
legal-counsel
designer
technical-writer
data-analyst
researcher
operations-manager
customer-success
founder
```

### 34.3 Marketing domain agents and workflows

Agents:

```text
agents/marketing/
  marketing-strategist.md
  content-marketer.md
  seo-analyst.md
  social-media-manager.md
  email-marketer.md
  growth-hacker.md
  brand-manager.md
  market-researcher.md
  ad-copywriter.md
  campaign-analyst.md
  influencer-strategist.md
  pr-manager.md
```

Skills:

```text
skills/marketing/
  campaign-planning.md
  content-calendar.md
  seo-audit.md
  keyword-research.md
  ad-copy-generation.md
  email-sequence-design.md
  social-media-scheduling.md
  landing-page-optimization.md
  ab-testing-design.md
  competitor-analysis.md
  brand-voice-guide.md
  press-release-draft.md
```

Workflows:

```text
workflows/marketing/
  launch-campaign.md
  content-pipeline.md
  seo-improvement.md
  lead-nurture-sequence.md
  product-launch.md
  brand-refresh.md
  quarterly-marketing-review.md
```

### 34.4 Sales domain agents and workflows

Agents:

```text
agents/sales/
  sales-strategist.md
  pipeline-analyst.md
  proposal-generator.md
  competitive-intel-analyst.md
  account-manager.md
  sales-ops-analyst.md
  demo-preparer.md
  objection-handler.md
  pricing-strategist.md
  crm-optimizer.md
```

Skills:

```text
skills/sales/
  pipeline-analysis.md
  proposal-drafting.md
  competitive-battlecard.md
  cold-outreach.md
  discovery-call-prep.md
  pricing-modeling.md
  contract-drafting.md
  demo-script.md
  follow-up-sequence.md
  win-loss-analysis.md
```

Workflows:

```text
workflows/sales/
  deal-review.md
  quarterly-pipeline-review.md
  new-market-entry.md
  enterprise-proposal.md
  churn-prevention.md
```

### 34.5 Finance domain agents and workflows

Agents:

```text
agents/finance/
  cfo-advisor.md
  financial-analyst.md
  budget-planner.md
  forecasting-analyst.md
  invoice-processor.md
  tax-preparer.md
  payroll-analyst.md
  cash-flow-manager.md
  investment-analyst.md
  expense-auditor.md
```

Skills:

```text
skills/finance/
  budgeting.md
  financial-forecasting.md
  invoice-processing.md
  expense-categorization.md
  cash-flow-modeling.md
  runway-calculation.md
  unit-economics.md
  financial-reporting.md
  tax-estimation.md
  payroll-calculation.md
```

Workflows:

```text
workflows/finance/
  monthly-close.md
  quarterly-forecast.md
  annual-budget.md
  fundraising-prep.md
  audit-preparation.md
  expense-review.md
```

### 34.6 Legal domain agents and workflows

Agents:

```text
agents/legal/
  contract-reviewer.md
  compliance-checker.md
  ip-advisor.md
  privacy-advisor.md
  terms-drafter.md
  regulatory-analyst.md
  nda-reviewer.md
  licensing-advisor.md
```

Skills:

```text
skills/legal/
  contract-review.md
  compliance-checklist.md
  privacy-policy-draft.md
  terms-of-service-draft.md
  nda-review.md
  license-compatibility.md
  regulatory-mapping.md
  risk-assessment.md
```

Workflows:

```text
workflows/legal/
  vendor-contract-review.md
  employee-agreement-review.md
  gdpr-compliance-check.md
  soc2-preparation.md
  ip-audit.md
```

Important: all legal agents must include a disclaimer that output is not legal
advice and should be reviewed by a qualified attorney.

### 34.7 HR domain agents and workflows

Agents:

```text
agents/hr/
  hiring-manager.md
  onboarding-coordinator.md
  compensation-analyst.md
  performance-reviewer.md
  culture-advisor.md
  policy-drafter.md
  benefits-analyst.md
  diversity-advisor.md
```

Skills:

```text
skills/hr/
  job-description-draft.md
  interview-prep.md
  onboarding-checklist.md
  compensation-benchmarking.md
  performance-review.md
  policy-drafting.md
  employee-survey-design.md
  exit-interview.md
```

Workflows:

```text
workflows/hr/
  hiring-pipeline.md
  new-hire-onboarding.md
  annual-review-cycle.md
  compensation-review.md
  policy-update.md
```

### 34.8 Non-technical routing examples

Marketing task:

```text
task: "plan a product launch campaign for Q3"
route:
  superior-master
  -> marketing-master
  -> marketing-strategist + content-marketer
  -> workflows/marketing/launch-campaign.md
  -> connectors: hubspot, mailchimp, google-analytics
```

Sales task:

```text
task: "analyze why we lost the Acme deal"
route:
  superior-master
  -> sales-master
  -> pipeline-analyst
  -> skills/sales/win-loss-analysis.md
  -> connector: CRM (salesforce/hubspot)
```

Finance task:

```text
task: "forecast next quarter revenue based on current pipeline"
route:
  superior-master
  -> finance-master
  -> forecasting-analyst
  -> skills/finance/financial-forecasting.md
  -> connector: spreadsheet, CRM
```

Legal task:

```text
task: "review this vendor contract for risk"
route:
  superior-master
  -> legal-master
  -> contract-reviewer
  -> skills/legal/contract-review.md
  -> disclaimer: not legal advice
```

HR task:

```text
task: "draft a job description for senior backend engineer"
route:
  superior-master
  -> hr-master
  -> hiring-manager
  -> skills/hr/job-description-draft.md
  -> engineering-master (for technical requirements input)
```

---

## 35. Operational design requirements

### 35.1 User roles and access control

Yes-human needs a role system for multi-user and team environments.

Roles:

```text
admin
  full access to all agents, workflows, absorption, graph building
  can promote staging content
  can modify policies and rules

maintainer
  can create and edit agents, skills, workflows
  can run absorption with approval
  can view all reports

user
  can route and run tasks
  can suggest workflows
  cannot modify active content
  cannot absorb external sources

viewer
  read-only access to reports and registries
  cannot run tasks
```

Role schema:

```json
{
  "role_id": "user",
  "permissions": {
    "route": true,
    "run": true,
    "suggest_workflow": true,
    "view_reports": true,
    "modify_agents": false,
    "absorb": false,
    "promote": false,
    "modify_policies": false
  }
}
```

### 35.2 Feedback loop

Users must be able to give explicit feedback on task outcomes.

Feedback types:

```text
yes feedback accept <trace-id>
  records successful feedback and proposes a route-score increase

yes feedback reject <trace-id> --reason "wrong domain"
  records failed feedback and proposes a route correction

yes feedback partial <trace-id> --reason "missing security check"
  records partial success and proposes workflow improvement

yes feedback wrong-agent <trace-id> --suggest <agent-id>
  proposes a candidate route correction for similar future tasks
```

Feedback schema:

```json
{
  "trace_id": "trace_01",
  "feedback_type": "reject",
  "reason": "wrong domain",
  "suggested_agent": "security.security-reviewer",
  "timestamp": "2026-05-28T12:00:00+05:30",
  "user_id": "user_01"
}
```

Feedback processing:

```text
feedback received
  -> write feedback event to staging
  -> calculate trust weight from role, repetition, and verification evidence
  -> if reject: create mistake graph edge
  -> if suggest: create staged alias or route correction
  -> if pattern repeats 3 times: trigger workflow suggestion
  -> run route regression eval
  -> run cost and safety eval
  -> promote route-weight change only if eval gates pass
  -> update reports/feedback-summary.md
```

Feedback safety rules:

- never mutate production route weights from one feedback event
- never let feedback bypass route/security/cost evals
- never let low-trust or anonymous feedback affect global routing
- role-based feedback weight applies only in team mode
- private user feedback updates private route preferences first
- global route changes require repeated evidence and maintainer/admin approval

### 35.3 Versioning strategy

Every artifact in Yes-human must be versioned.

Versioning rules:

```text
agents:    semver (1.0.0, 1.1.0, 2.0.0)
skills:    semver
workflows: semver
rules:     semver
policies:  semver
schemas:   semver
graph:     timestamped snapshots
registries: version field in each entry
host bundles: generated from versioned source
```

Version schema:

```json
{
  "artifact_id": "engineering.typescript-reviewer",
  "version": "1.2.0",
  "previous_version": "1.1.0",
  "changelog": "Added strict null check review step",
  "created_at": "2026-05-28T12:00:00+05:30",
  "created_by": "maintainer_01",
  "rollback_to": "1.1.0",
  "breaking": false
}
```

Version commands:

```text
yes version list <artifact-id>
yes version diff <artifact-id> <v1> <v2>
yes version rollback <artifact-id> <version>
yes version pin <artifact-id> <version>
```

### 35.4 Multi-user and team support

Yes-human must support shared environments.

Team features:

```text
shared graph
  team members share codebase graph and route cache
  individual traces remain private by default

shared workflows
  team-created workflows are visible to all members
  promotion requires team admin approval

shared reports
  team-level routing quality, cost, and usage reports
  individual usage visible only to that user

permissions
  role-based access control (see Section 35.1)
  per-agent and per-workflow permission overrides

isolation
  every team has tenant_id and project_id boundaries
  shared graph entries are scoped by project_id
  individual traces are private unless explicitly shared
  secrets are redacted before graph, trace, or report storage
  retention policy controls trace and audit lifetime
  cross-team cache reads are denied by default
```

Team config schema:

```json
{
  "team_id": "team_01",
  "name": "Platform Engineering",
  "members": [
    {"user_id": "user_01", "role": "admin"},
    {"user_id": "user_02", "role": "maintainer"},
    {"user_id": "user_03", "role": "user"}
  ],
  "shared_graph": true,
  "shared_workflows": true,
  "shared_reports": true,
  "private_traces": true,
  "tenant_isolation": true,
  "project_scopes": ["repo_platform_api", "repo_web_app"],
  "secret_redaction": true,
  "retention_days": {
    "traces": 30,
    "audit_logs": 180,
    "reports": 365
  }
}
```

Team isolation rules:

- no trace, graph cache, source dossier, or report can cross tenant boundary by default
- project-scoped graphs must include project id, repo hash, and permission scope
- shared workflows can reference private traces only by anonymized outcome edges
- audit logs are append-only and visible only to admin/maintainer roles
- sensitive files and credentials are excluded from shared graphs
- user deletion requests remove private traces and feedback events unless retained by explicit legal/compliance policy

### 35.5 Offline mode

Yes-human must work without internet for core features.

Offline-capable features:

```text
local route lookup (HashMap, Trie, inverted index)
local graph query (SQLite)
local agent/skill/workflow loading
local code graph building (Tree-sitter, rg, import parsing)
local shell commands
local file operations
trace storage
workflow suggestion from local traces
```

Offline-unavailable features:

```text
MCP connectors requiring external APIs
Sourcegraph remote search
GraphRAG cloud indexing
GitHub absorption
web research
browser automation
```

Offline policy:

```json
{
  "offline_mode": "auto",
  "queue_external_tasks": true,
  "notify_when_reconnected": true,
  "fallback_to_local_only": true
}
```

### 35.6 Crash recovery

Yes-human must handle mid-workflow failures gracefully.

Recovery strategy:

```text
workflow state checkpoint
  every workflow step writes a checkpoint before execution
  checkpoint includes: step number, inputs, outputs, files changed

on crash:
  yes recover
    reads last checkpoint
    shows user what was completed and what remains
    offers: resume from checkpoint, restart, or abort

checkpoint schema:
{
  "workflow_id": "engineering.code-review-with-security",
  "trace_id": "trace_01",
  "current_step": 3,
  "total_steps": 5,
  "completed_steps": [1, 2],
  "files_changed": ["src/auth.ts"],
  "pending_steps": [3, 4, 5],
  "checkpoint_time": "2026-05-28T12:00:00+05:30"
}
```

Recovery commands:

```text
yes recover
yes recover resume <trace-id>
yes recover restart <trace-id>
yes recover abort <trace-id>
```

### 35.7 Latency targets

Yes-human must be fast enough to feel instant for routing.

Latency targets:

```text
boot load:              < 50ms
route lookup (exact):   < 10ms
route lookup (alias):   < 20ms
route lookup (graph):   < 100ms
route lookup (semantic): < 500ms
context pack assembly:  < 200ms
graph query (local):    < 500ms
graph build (small repo < 1000 files): < 30s
graph build (medium repo < 10000 files): < 5min (with approval)
workflow suggestion:    < 2s
absorption staging:     < 60s per repo
eval suite:             < 30s for routing eval
```

Latency monitoring:

```text
yes status --latency
  shows p50, p95, p99 for each operation type
  flags operations exceeding targets
  suggests optimizations (cache warm, graph rebuild, index refresh)
```

### 35.8 High-stakes domain policy

Finance, legal, HR, compliance, tax, healthcare-like, security, and privacy
workflows need stricter policy gates than ordinary productivity workflows.

High-stakes rules:

- always show domain disclaimer when giving legal, financial, tax, HR, compliance, or healthcare-like guidance
- prefer official or primary sources when facts may affect legal, financial, employment, security, or compliance decisions
- never claim professional advice, legal representation, tax filing certainty, medical diagnosis, or guaranteed compliance
- require human review before sending, filing, publishing, executing, or externally submitting high-stakes outputs
- block external API use with private employee, customer, health, legal, or financial data unless explicitly approved
- store only compact/redacted traces for high-stakes tasks
- route to broader parent agent when source confidence is low

High-stakes policy schema:

```json
{
  "id": "high-stakes-domain",
  "domains": ["finance", "legal", "hr", "compliance", "tax", "security", "privacy", "healthcare_like"],
  "default_decision": "ask",
  "requires_disclaimer": true,
  "requires_primary_sources_when_current_facts_matter": true,
  "requires_human_review_before_external_action": true,
  "trace_storage": "redacted_compact_only",
  "external_api_default": "ask"
}
```

---

## 36. Agent quality measurement

### 36.1 Quality metrics

Every agent must be measurable.

Required metrics per agent:

```text
route_accuracy
  how often the agent is correctly selected for its intended tasks
  measured by routing eval fixtures

task_success_rate
  how often tasks routed to this agent produce accepted results
  measured by user feedback and verification results

context_efficiency
  tokens used vs budget band limit
  agents that consistently exceed budget are flagged

failure_rate
  how often the agent fails or produces errors
  tracked by failure class

stale_detection
  how long since the agent was last updated or used
  agents unused for 90 days are flagged for review

duplicate_overlap
  how much capability overlap exists with other agents
  measured by dedupe engine
```

### 36.2 Quality score formula

```text
agent_quality_score =
  route_accuracy_weight * route_accuracy
  + task_success_weight * task_success_rate
  + context_efficiency_weight * (1 - budget_overrun_rate)
  + failure_weight * (1 - failure_rate)
  - stale_penalty * days_since_update / 365
  - duplicate_penalty * overlap_score
```

Minimum quality thresholds:

```text
production agent:  >= 0.75
staging agent:     >= 0.50
research-needed:   < 0.50 or no data
deprecated:        manual flag or quality < 0.30 for 90 days
```

### 36.3 Degradation detection

An agent is degrading when:

```text
task success rate drops > 10% over 30 days
failure rate increases > 5% over 30 days
user reject rate increases > 15% over 30 days
context usage increases > 20% without quality improvement
```

Degradation response:

```text
1. flag agent in reports/agent-quality.md
2. check if upstream tool/API changed
3. check if task distribution shifted
4. propose agent update via agent factory
5. if no fix in 60 days: demote to staging
```

### 36.4 Agent eval fixtures

Every production agent must have eval fixtures:

```json
{
  "agent_id": "engineering.typescript-reviewer",
  "fixtures": [
    {
      "prompt": "review this auth middleware for security issues",
      "expected_findings": ["SQL injection risk", "missing input validation"],
      "expected_tools": ["filesystem.read", "shell.readonly"],
      "max_tokens": 1200
    }
  ],
  "pass_threshold": 0.90,
  "run_frequency": "on_promotion_and_weekly"
}
```

---

## 37. Community and contribution model

### 37.1 Contribution types

```text
agent contribution
  new specialist agent for a domain

skill contribution
  new reusable skill or procedure

workflow contribution
  new multi-step workflow

route alias
  new keyword or phrase mapping

bug report
  routing error, agent failure, quality issue

source reference
  new GitHub repo or doc reference for a domain

eval fixture
  new test case for routing or agent quality

connector binding
  new MCP or tool integration mapping
```

### 37.2 Contribution workflow

```text
contributor submits
  -> staging/incoming/<contributor>/<artifact>
  -> automated validation runs:
    schema validator
    quality scorer
    duplicate detector
    license checker
    route eval
  -> if passes: staging/reviewed/
  -> maintainer review
  -> if approved: promote to content/
  -> provenance recorded
  -> contributor credited in CHANGELOG
```

### 37.3 Quality bar for community submissions

```text
must pass all validators (Section 17A.6)
must have reference dossier (Section 31) for agents
must have eval fixtures
must not duplicate existing higher-quality artifact
must have clear trigger and verification path
must include rollback plan for workflows
license must be compatible (MIT, Apache-2.0, BSD, ISC, or equivalent)
```

### 37.4 Contribution commands

```text
yes contribute agent <path>
yes contribute skill <path>
yes contribute workflow <path>
yes contribute alias <keyword> <route-id>
yes contribute fixture <agent-id> <fixture-path>
yes contribute status
```

### 37.5 Review process

```text
automated checks run first (no human needed)
  schema, quality, dedupe, license, eval

human review for:
  domain accuracy
  safety concerns
  architectural fit
  naming conventions

review SLA:
  automated: immediate
  human: target 7 days, max 30 days
  stale submissions: auto-close after 60 days without response
```

---

## 38. Real business workflows

### 38.1 Marketing workflows

```text
campaign-planning
  inputs: product, target audience, budget, timeline
  steps:
    1. market research (competitor analysis, audience research)
    2. campaign strategy (channels, messaging, KPIs)
    3. content plan (assets, calendar, distribution)
    4. budget allocation (by channel and phase)
    5. launch checklist (tracking, automation, team assignments)
  outputs: campaign brief, content calendar, budget breakdown
  tools: CRM, analytics, email platform, social media
  verification: KPI targets defined, budget within limits

seo-improvement
  inputs: website URL, target keywords, current rankings
  steps:
    1. technical SEO audit (site speed, mobile, crawlability)
    2. content audit (existing pages, gaps, opportunities)
    3. keyword research (volume, difficulty, intent)
    4. on-page optimization plan (title, meta, headers, content)
    5. link building strategy
  outputs: SEO audit report, prioritized action list
  tools: analytics, search console, SEO tools
  verification: audit completeness checklist

content-pipeline
  inputs: content strategy, topics, audience, channels
  steps:
    1. topic research and validation
    2. outline creation
    3. draft generation
    4. review and edit
    5. SEO optimization
    6. distribution scheduling
  outputs: content pieces, distribution schedule
  tools: CMS, social media scheduler, email platform
```

### 38.2 Sales workflows

```text
deal-review
  inputs: deal name, stage, value, stakeholders, timeline
  steps:
    1. deal health assessment (engagement, competition, budget fit)
    2. stakeholder mapping (decision makers, influencers, blockers)
    3. risk identification (objections, competitors, timeline risks)
    4. action plan (next steps, owners, deadlines)
  outputs: deal review summary, action items, risk register
  tools: CRM
  verification: all stakeholders mapped, action items assigned

competitive-intel
  inputs: competitor name, market segment, product area
  steps:
    1. competitor profile (product, pricing, positioning)
    2. strength/weakness analysis
    3. battlecard creation (objection handling, differentiators)
    4. win/loss pattern analysis
  outputs: competitor profile, battlecard, talking points
  tools: web research, CRM
  verification: battlecard covers top 5 objections
```

### 38.3 Finance workflows

```text
monthly-close
  inputs: month, accounts, transactions
  steps:
    1. reconcile bank statements
    2. review accounts receivable and payable
    3. accrue expenses and revenue
    4. generate financial statements (P&L, balance sheet, cash flow)
    5. variance analysis vs budget
    6. management summary
  outputs: financial statements, variance report, management summary
  tools: accounting software, spreadsheet
  verification: accounts balanced, variance explained

budget-planning
  inputs: fiscal year, departments, historical data, growth targets
  steps:
    1. historical spend analysis
    2. revenue projection
    3. department budget allocation
    4. headcount planning
    5. scenario modeling (best/base/worst case)
    6. board presentation prep
  outputs: annual budget, scenario models, presentation
  tools: spreadsheet, accounting software, HR system
  verification: budget balances, scenarios modeled
```

### 38.4 Legal workflows

```text
contract-review
  inputs: contract document, counterparty, deal context
  steps:
    1. identify key terms (parties, scope, payment, duration)
    2. risk clause identification (liability, indemnification, termination)
    3. compliance check (data privacy, industry regulations)
    4. redline suggestions
    5. risk summary with severity ratings
  outputs: review report, redline suggestions, risk summary
  disclaimer: not legal advice, review with qualified attorney
  verification: all key clauses reviewed, risks rated

compliance-check
  inputs: regulation/framework, business area, current practices
  steps:
    1. requirement mapping (what the regulation requires)
    2. current state assessment (what we do now)
    3. gap analysis (what is missing)
    4. remediation plan (what to fix, priority, timeline)
    5. documentation checklist
  outputs: compliance report, gap analysis, remediation plan
  disclaimer: not legal advice
  verification: all requirements mapped, gaps identified
```

### 38.5 HR workflows

```text
hiring-pipeline
  inputs: role title, department, level, requirements
  steps:
    1. job description creation (responsibilities, requirements, compensation range)
    2. sourcing strategy (channels, referrals, agencies)
    3. screening criteria (must-have vs nice-to-have)
    4. interview plan (rounds, interviewers, questions)
    5. offer preparation (compensation, equity, start date)
    6. onboarding handoff
  outputs: job description, sourcing plan, interview plan, offer template
  tools: ATS, HR system
  verification: JD reviewed by hiring manager, compensation within band

onboarding
  inputs: new hire name, role, start date, team
  steps:
    1. pre-boarding (equipment, accounts, access)
    2. first-day schedule (orientation, team intro, setup)
    3. first-week plan (training, initial tasks, check-ins)
    4. 30-60-90 day goals
    5. buddy assignment
  outputs: onboarding checklist, first-week schedule, 90-day goals
  tools: HR system, IT provisioning
  verification: all accounts provisioned, buddy assigned, goals set
```

---

## 39. Updated adapter list and generated bundles

### 39.1 Core v2 adapter list

```text
adapters/
  claude/
  codex/
  agent-md/
  mcp/
  cli/
```

These adapters are required for the first v2 implementation.

### 39.2 Optional adapter packs

```text
adapters/
  vscode/
  cursor/
  windsurf/
  sourcegraph/
  generic/
```

Optional adapter packs are released only after core v2 passes routing, cost,
security, and host-bundle validation.

### 39.3 Core generated bundle list

```text
generated/
  claude/
  codex/
  agent-md/
  mcp/
  cli/
```

### 39.4 Optional generated bundle list

```text
generated/
  cursor/
  windsurf/
  generic/
```

### 39.5 Export commands

```text
yes export claude
yes export codex
yes export opencode
yes export agent-md
yes export mcp
yes export cli
yes export cursor
yes export windsurf
yes export generic --protocol stdio|http|file-drop
```

### 39.6 Host adapter compatibility table update

| Adapter | Boot file | Agent format | Hook support | MCP | Inline edits |
|---|---|---|---|---|---|
| Claude | `CLAUDE.md` | native agents | native/wrapper | yes | no |
| Codex | `AGENTS.md` | skill/agent docs | wrapper | yes | no |
| OpenCode | `AGENTS.md` | AGENT-compatible | wrapper | yes | no |
| Cursor | `.cursorrules` | rule-based agents | wrapper | yes | yes |
| Windsurf | `.windsurfrules` | cascade agents | wrapper | yes | yes |
| VS Code | extension config | extension agents | extension API | yes | yes |
| CLI | built-in | route packs | native | profile | no |
| MCP | prompt resource | prompt resources | middleware | native | no |
| Generic | adapter manifest | declared format | protocol hooks | declared | declared |

---

## 40. Final v2 architecture decision and proceed gate

Build `Yes-human` as:

```text
portable core
  + low-token routing kernel
  + local graph retrieval
  + workflow runtime
  + policy/validator layer
  + core host adapters
  + optional adapter packs
  + research-backed content factory
```

Do not build it as:

```text
one massive prompt
one massive Claude-only plugin
one unbounded swarm
one auto-mutating learning system
```

### 40.1 Final design rules

- Core v2 ships with CLI, Codex, Claude, MCP, and AGENT.md/OpenCode exports first.
- Cursor, Windsurf, VS Code, Sourcegraph, and Generic adapters are optional adapter packs.
- Generic adapter is zero-trust: signed manifest, scoped permissions, sandbox, audit log, timeout, and cancellation are required.
- Feedback never mutates production routing directly; it stages candidates that must pass eval gates.
- Team mode requires tenant/project isolation, private traces, secret redaction, audit logs, and retention policy.
- High-stakes domains require disclaimers, source discipline, human review before external action, and redacted traces.
- Research dossiers are mandatory for production subagents/workflows, but cached and reusable with freshness checks.
- Eval thresholds count only when minimum fixture counts are met.
- Startup stays `60-180 tokens`, with hard cap under `300 tokens`.
- No full registry, agent list, skill list, source dossier, or workflow library is loaded at startup.

### 40.2 Ready-to-proceed decision

The architecture is ready to proceed to the development plan only after these
cleanup checks pass:

```text
1. no command naming conflicts
2. no "missing design pieces" sections
3. final decision appears only at the real end
4. core adapters and optional adapter packs are separated
5. feedback learning is eval-gated
6. generic adapter has auth, permissions, sandbox, audit, timeout, cancellation
7. team mode has tenant/project isolation and privacy rules
8. high-stakes domain policy exists
9. eval fixture minimums exist
10. dossier caching and reuse exists
```

If those checks pass, the next artifact should be:

```text
YES-HUMAN_DEVELOPMENT_PLAN.md
```

That plan should build the runtime skeleton first, then the route kernel, then
adapters, then graph retrieval, then source mining, then content generation.

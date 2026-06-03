# Yes-human Source Map

**Date:** 2026-05-29  
**Status:** category-level seed registry for agent/workflow creation  
**Validation:** URLs in this file were checked with HTTP `200` or redirected-to-valid `200` on 2026-05-29 unless noted otherwise.

**Companion Document:** `reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md` — Deep research report mapping 180+ GitHub repositories across 8 ECC skill categories with architecture pattern analysis and selective absorption strategy.

---

## How This Source Map Relates to the ECC Deep Research Report

This document (`YES-HUMAN_SOURCE_MAP.md`) is the **validated seed registry** for agent/workflow creation. It contains category-level sources that have been manually verified for URL validity and relevance.

The companion document (`reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md`) is the **comprehensive research report** that:
- Maps 180+ repositories across 8 categories matching ECC's 33 skills
- Identifies 14 critical architecture patterns for selective absorption
- Provides license compatibility analysis (all critical patterns are MIT/Apache-2.0)
- Prioritizes absorption targets by wave (Wave 1: Foundation Patterns, Wave 2: Runtime Architecture, Wave 3: Graph & Intelligence, Wave 4: Domain Skills)

**Usage:**
- Use this source map for **category-level seed sources** when creating agents/workflows
- Reference the deep research report for **architecture pattern selection** and **selective absorption targets**
- Cross-reference both documents when building source dossiers for specialist agents

---

## 1. How To Use These Sources

For every category master, specialist agent, skill, or workflow:

1. Start from the category seeds below.
2. Add task-specific official docs where relevant.
3. Add at least 10 relevant GitHub repositories when the domain has enough public evidence.
4. Record source URL, license, latest commit or version, source type, and what pattern was used.
5. Reject unclear-license content if Yes-human would redistribute adapted text or code.
6. Extract patterns only unless license review explicitly allows reuse.
7. Store the final dossier under `references/<domain>/<agent-id>.sources.json`.

---

## 2. Cross-Cutting Agent Runtime And Orchestration

Use for `meta-system`, routing, workflows, runtime execution, tracing, handoffs, guardrails, multi-agent patterns, and stateful orchestration.

| Source | URL | Use for Yes-human |
|---|---|---|
| Microsoft Agent Framework | https://github.com/microsoft/agent-framework | production-grade multi-agent workflow patterns, middleware, observability, state, graph workflows |
| Microsoft Agent Framework docs | https://learn.microsoft.com/en-us/agent-framework/overview/ | agent-vs-workflow boundary, explicit workflow control, human-in-loop patterns |
| LangGraph | https://github.com/langchain-ai/langgraph | durable execution, resumable state graphs, subagents, memory, human-in-loop |
| OpenAI Agents SDK Python | https://github.com/openai/openai-agents-python | handoffs, guardrails, tracing, tool execution concepts |
| OpenAI Agents SDK JS | https://github.com/openai/openai-agents-js | JS/TS adapter ideas for runtime and host bundle generation |
| OpenAI Agents docs | https://developers.openai.com/api/docs/guides/agents | current OpenAI agent primitives, tools, tracing, safety, cost docs |
| CrewAI | https://github.com/crewAIInc/crewAI | crew/flow split, role-task-tool modeling, event-driven workflows |
| AutoGen | https://github.com/microsoft/autogen | historical multi-agent group chat and tool-use patterns; treat as legacy because Microsoft directs new users to Agent Framework |
| OpenHands | https://github.com/OpenHands/OpenHands | coding-agent sandbox, file/shell/browser workflows |
| MCP Agent | https://github.com/lastmile-ai/mcp-agent | MCP-native agent workflow composition |
| Agent Lightning | https://github.com/microsoft/agent-lightning | structured spans, agent optimization loop, framework-agnostic training signals |
| OpenPipe ART | https://github.com/openpipe/art | optional offline training and GRPO-style improvement loop |
| Dify | https://github.com/langgenius/dify | workflow builder and agent app architecture |
| Langflow | https://github.com/langflow-ai/langflow | visual agent/RAG workflow composition |
| Flowise | https://github.com/FlowiseAI/Flowise | visual LLM workflow builder and tool wiring |

Adaptation rule: Yes-human should not become another application framework. It should use these projects to define runtime boundaries, state machines, trace schemas, and host adapters while keeping the low-token dispatcher as the product core.

---

## 3. Agent Skill And Plugin Libraries

Use for `content/skills`, contribution workflow, skill schema, adapter outputs, and source-mining benchmarks.

| Source | URL | Use for Yes-human |
|---|---|---|
| Anthropic skills | https://github.com/anthropics/skills | `SKILL.md` conventions, templates, frontend/testing/design/MCP skills |
| Awesome Agent Skills | https://github.com/VoltAgent/awesome-claude-skills | broad cross-host skill index for Claude Code, Codex, Cursor, Gemini CLI, Windsurf, OpenCode |
| Awesome Agents | https://github.com/kyrolabs/awesome-agents | discovery seed for open-source agent frameworks and products |
| Awesome Agent Orchestration | https://github.com/vivy-yi/awesome-agent-orchestration | orchestration framework discovery |
| Awesome Agent Swarm | https://github.com/EvoMap/awesome-agent-swarm | multi-agent fanout and swarm framework discovery |

Adaptation rule: use these as discovery indexes and examples, not as automatic content imports. Every imported or adapted skill must pass the Yes-human source dossier and validator gates.

---

## 4. Engineering And Coding Agents

Use for `engineering`, `architecture`, `backend`, `frontend`, `testing-qa`, `build-resolver`, `code-quality`, `refactoring`, and `dev-workflow`.

| Source | URL | Use for Yes-human |
|---|---|---|
| Aider | https://github.com/aider-ai/aider | CLI coding-agent workflows, repo-aware editing, git integration |
| Cline | https://github.com/cline/cline | IDE coding-agent tool use and plan/act loops |
| Continue | https://github.com/continuedev/continue | IDE assistant integration, codebase context, provider abstraction |
| SWE-agent | https://github.com/SWE-agent/SWE-agent | benchmarked software-engineering agent loops and issue fixing |
| OpenHands | https://github.com/All-Hands-AI/OpenHands | coding sandbox, browser/shell/file workflows |
| Claude Code PM | https://github.com/automazeio/ccpm | spec-driven GitHub Issues/worktree workflow and parallel task traceability |
| Sourcegraph public snapshot | https://github.com/sourcegraph/sourcegraph-public-snapshot | code search and code intelligence architecture reference |
| Sourcegraph Cody context docs | https://sourcegraph.com/docs/cody/core-concepts/context | keyword/code graph retrieval model |
| Tree-sitter | https://github.com/tree-sitter/tree-sitter | language parser layer for local code graphs |

Adaptation rule: create workflows before creating many specialist coding agents. First-wave engineering agents should be backed by code graph retrieval, route fixtures, and tests.

---

## 5. Security, Trust, And Static Analysis

Use for `security-trust`, `privacy`, `license`, `prompt-injection`, `code-review-with-security`, `secret-scanning`, and high-stakes gates.

| Source | URL | Use for Yes-human |
|---|---|---|
| Semgrep | https://github.com/semgrep/semgrep | static analysis integration and security rule workflow |
| Semgrep docs | https://semgrep.dev/docs/ | rule and scanner usage patterns |
| CodeQL | https://github.com/github/codeql | semantic code analysis and query model |
| GitHub CodeQL docs | https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning-with-codeql | code scanning and CodeQL operating model |
| Gitleaks | https://github.com/gitleaks/gitleaks | secret scanning |
| Trivy | https://github.com/aquasecurity/trivy | dependency/container/IaC vulnerability scanning |
| OWASP LLM Top 10 | https://github.com/owasp/www-project-top-10-for-large-language-model-applications | prompt injection and LLM app security risks |
| OWASP Web Security Testing Guide | https://github.com/OWASP/wstg | web security test checklist |
| OWASP Cheat Sheet Series | https://github.com/OWASP/CheatSheetSeries | secure coding guidance |
| Joern | https://github.com/joernio/joern | code property graph for security/dataflow analysis |
| Claude BugHunter | https://github.com/elementalsouls/Claude-BugHunter | bug hunting/bounty methodologies, security testing workflows, and evidence hygiene checklists |

Adaptation rule: security agents must prefer deterministic scanners and official security guidance over free-form LLM review.

---

## 6. Code Graph, Retrieval, RAG, And Evaluation

Use for `yes-graph`, `graph-rag`, `rag`, `vector-search`, `evaluation`, and `training-optimization`.

| Source | URL | Use for Yes-human |
|---|---|---|
| Microsoft GraphRAG | https://github.com/microsoft/graphrag | large-corpus graph retrieval and indexing cost model |
| LlamaIndex | https://github.com/run-llama/llama_index | RAG indexing and query abstractions |
| LangChain | https://github.com/langchain-ai/langchain | tool/retrieval integrations and chain composition |
| Haystack | https://github.com/deepset-ai/haystack | production RAG pipelines |
| Qdrant | https://github.com/qdrant/qdrant | vector search backend |
| Weaviate | https://github.com/weaviate/weaviate | vector database and hybrid retrieval |
| MLflow | https://github.com/mlflow/mlflow | experiment tracking and model/eval tracking patterns |
| Promptfoo | https://github.com/promptfoo/promptfoo | prompt and agent regression testing |
| DeepEval | https://github.com/confident-ai/deepeval | LLM evaluation fixtures and metrics |
| mem0 | https://github.com/mem0ai/mem0 | memory layer patterns |
| Graphiti | https://github.com/getzep/graphiti | temporal knowledge graph memory |

Adaptation rule: vector/RAG fallback is not the default route. Exact maps, tries, inverted indexes, and local code graphs come first.

---

## 7. MCP And Integrations

Use for `integrations`, `mcp`, provider bindings, connector policy, and generated MCP bundle.

| Source | URL | Use for Yes-human |
|---|---|---|
| MCP docs | https://modelcontextprotocol.io/docs/getting-started/intro | official protocol semantics |
| MCP servers | https://github.com/modelcontextprotocol/servers | canonical server implementations and examples |
| MCP registry | https://github.com/modelcontextprotocol/registry | registry metadata and server discovery model |
| MCP inspector | https://github.com/modelcontextprotocol/inspector | testing and debugging MCP servers |
| GitHub MCP server | https://github.com/github/github-mcp-server | GitHub tool binding |
| Playwright MCP | https://github.com/microsoft/playwright-mcp | browser automation connector |
| Awesome MCP servers | https://github.com/punkpeye/awesome-mcp-servers | discovery index |
| Awesome MCP servers alternate | https://github.com/appcypher/awesome-mcp-servers | discovery index |

Adaptation rule: Yes-human should map connectors to capabilities, allowed agents, auth requirements, and fallback paths. Do not clone provider plugins into core.

---

## 8. Frontend, Design, Accessibility, And Browser Testing

Use for `frontend`, `frontend-design`, `ui-ux`, `brand`, `a11y`, `presentation`, and `browser-automation`.

| Source | URL | Use for Yes-human |
|---|---|---|
| Storybook | https://github.com/storybookjs/storybook | component documentation and UI testing workflow |
| shadcn/ui | https://github.com/shadcn-ui/ui | component-system and registry ideas |
| Radix UI Primitives | https://github.com/radix-ui/primitives | accessible component primitives |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | utility CSS and design-system integration |
| axe-core | https://github.com/dequelabs/axe-core | automated accessibility checks |
| Playwright | https://github.com/microsoft/playwright | browser automation, e2e tests, visual checks |
| Stop Slop | https://github.com/hardikpandya/stop-slop | anti-slop rules, prose directness heuristics, active voice, and authentic rhythm variety patterns |

Adaptation rule: frontend/design agents need concrete browser verification workflows, not only design-writing prompts.

---

## 9. Product, Operations, Sales, And Customer Success

Use for `product-business`, `product`, `operations`, `sales`, `customer-success`, CRM workflows, support workflows, and business connector mapping.

| Source | URL | Use for Yes-human |
|---|---|---|
| Twenty CRM | https://github.com/TwentyHQ/twenty | CRM data model and sales workflow references |
| Chatwoot | https://github.com/chatwoot/chatwoot | customer support and success workflows |
| PostHog | https://github.com/PostHog/posthog | product analytics, funnels, experimentation |
| OpenProject | https://github.com/opf/openproject | project management workflow references |
| Plane | https://github.com/makeplane/plane | issue/project/product workflow references |
| Outline | https://github.com/outline/outline | team knowledge base and documentation workflow |

Adaptation rule: product/business agents must route to connector-backed workflows where possible and fall back to structured reports when data access is unavailable.

---

## 10. Marketing And Growth

Use for `marketing`, `growth`, `content`, `seo`, email, campaigns, and analytics.

| Source | URL | Use for Yes-human |
|---|---|---|
| Mautic | https://github.com/mautic/mautic | marketing automation workflows |
| listmonk | https://github.com/knadh/listmonk | mailing list and campaign workflows |
| Matomo | https://github.com/matomo-org/matomo | web analytics workflows |
| Plausible Analytics | https://github.com/plausible/analytics | privacy-focused analytics workflow |
| PostHog | https://github.com/PostHog/posthog | product growth, experimentation, analytics |

Adaptation rule: marketing agents must separate strategy generation from channel execution and require connector approval before sending campaigns.

---

## 11. Finance And Accounting

Use for `finance`, `cfo-advisor`, `budget-planner`, `forecasting`, `monthly-close`, `payroll`, and high-stakes financial policy.

| Source | URL | Use for Yes-human |
|---|---|---|
| ERPNext | https://github.com/frappe/erpnext | ERP/accounting workflow references |
| Odoo | https://github.com/odoo/odoo | accounting, CRM, HR, operations modules |
| Invoice Ninja | https://github.com/invoiceninja/invoiceninja | invoicing workflow |
| Firefly III | https://github.com/firefly-iii/firefly-iii | finance categorization and budgeting references |
| Akaunting | https://github.com/akaunting/akaunting | small-business accounting workflow |
| Maybe Finance | https://github.com/maybe-finance/maybe | personal/financial planning workflow |

Adaptation rule: finance agents must use disclaimers, source discipline, spreadsheet/calculator verification, and human review before external or filing actions.

---

## 12. Legal, Compliance, Documents, And Signing

Use for `legal`, `compliance`, `privacy`, `contract-reviewer`, `terms-drafter`, `nda-reviewer`, and document workflows.

| Source | URL | Use for Yes-human |
|---|---|---|
| Documenso | https://github.com/documenso/documenso | document signing workflow reference |
| DocuSeal | https://github.com/docusealco/docuseal | document forms and signing workflow reference |
| Nextcloud | https://github.com/nextcloud/server | document collaboration and file governance |
| Joplin | https://github.com/laurent22/joplin | note/document workflows |
| Outline | https://github.com/outline/outline | team documentation workflow |
| OWASP Cheat Sheet Series | https://github.com/OWASP/CheatSheetSeries | privacy/security checklist source for compliance-adjacent workflows |

Adaptation rule: legal/compliance agents must never claim legal advice. They should produce checklists, risk summaries, and attorney-review handoff artifacts.

---

## 13. HR And People Operations

Use for `hr`, `hiring-manager`, `onboarding`, `compensation`, `performance-reviewer`, and HR policy drafting.

| Source | URL | Use for Yes-human |
|---|---|---|
| Frappe HRMS | https://github.com/frappe/hrms | HR operations, leave, payroll, performance workflow references |
| OrangeHRM | https://github.com/orangehrm/orangehrm | HR management workflow references |
| ERPNext HR modules | https://github.com/frappe/erpnext | HR/accounting/operations cross-workflows |
| Odoo HR modules | https://github.com/odoo/odoo | HR/business-suite workflow references |

Adaptation rule: HR agents must include human review and employment-law caution, especially for compensation, termination, performance, and policy outputs.

---

## 14. Platform, DevOps, Release, And Observability

Use for `platform`, `cloud`, `devops`, `ci-cd`, `observability`, `release-engineering`, and incident workflows.

| Source | URL | Use for Yes-human |
|---|---|---|
| OpenTelemetry Collector | https://github.com/open-telemetry/opentelemetry-collector | telemetry pipeline and observability workflow |
| Prometheus | https://github.com/prometheus/prometheus | metrics and monitoring workflow |
| Grafana | https://github.com/grafana/grafana | dashboard and observability workflow |
| Argo CD | https://github.com/argoproj/argo-cd | GitOps deployment workflow |
| Kubernetes | https://github.com/kubernetes/kubernetes | cloud-native operations references |
| Terraform | https://github.com/hashicorp/terraform | infrastructure-as-code workflow |
| GitHub Actions docs | https://docs.github.com/en/actions | CI/CD workflow reference |

Adaptation rule: DevOps agents should prefer read-only diagnosis first and require policy gates for deployments, infrastructure changes, and destructive commands.

---

## 15. Canonical content baseline

Yes-human production content lives in this repository:

- `content/agents/<domain>/` — specialist agents with dossiers in `references/<domain>/`
- `content/skills/<domain>/` — task-scoped skills
- `content/workflows/<domain>/` — deterministic workflow definitions
- `registry/*.json` and `graph/indexes/*.min.json` — compiled indexes

New material enters through `yes absorb` (staging → review → selective promotion), not legacy plugin imports.

---

## 16. Curated Claude-Native Repositories

Use for meta-system design, IDE plugins, agent-harness frameworks, MCP integration, routing algorithms, and multi-agent coordination.

| Source | URL | Use for Yes-human |
|---|---|---|
| Claude Code | https://github.com/anthropics/claude-code | CLI agent logic, interactive command loop, and shell integration |
| Claude Cookbook | https://github.com/anthropics/claude-cookbook | Task recipes, multi-modal prompt engineering, API usage benchmarks |
| Claude Quickstarts | https://github.com/anthropics/claude-quickstarts | Serverless APIs and rapid agent bootstrap configurations |
| Claude Desktop Extensions | https://github.com/anthropics/claude-desktop-extensions | Custom desktop client MCP setups and configurations |
| Awesome Claude Code | https://github.com/hesreallyhim/awesome-claude-code | Collection of community plugins, system prompt rules, and tools |
| Awesome MCP Servers | https://github.com/punkpeye/awesome-mcp-servers | Discovery list for third-party MCP servers and tools |
| SuperClaude Framework | https://github.com/SuperClaude-Org/SuperClaude_Framework | Agent scaling patterns, workspace configurations, and multi-agent setups |
| Claude Code Router | https://github.com/musistudio/claude-code-router | Specialized prompt-routing and category-matching logic |
| Claude Task Master | https://github.com/eyaltoledano/claude-task-master | Task flow coordination, execution loops, and status updates |
| Claude Engineer | https://github.com/Doriandarko/claude-engineer | Engineer loop prompts, terminal integration, and local tool usage |
| Claude Swarm | https://github.com/parallaxsys/claude-swarm | Multi-agent swarming, parallel execution, and consensus patterns |
| Claude Dev Tools | https://github.com/zebbern/claude-dev-tools | Extended command utilities and developer debugging aids |
| MCP Compass | https://github.com/liyoshio/mcp-compass | MCP server discovery, matching, and semantic binding |
| MCP Installer | https://github.com/anaisbetts/mcp-installer | Scriptable zero-config installer bindings for MCP integrations |
| MCPHub | https://github.com/idosal/mcphub | MCP server host registry and package manager mapping |
| Continue | https://github.com/continuedev/continue | Context-gathering protocols, codebase index formats, and config schemas |
| Cline | https://github.com/cline/cline | Plan-act execution loops, permission gating, and UI interaction |
| Open Interpreter | https://github.com/OpenInterpreter/open-interpreter | Safe local execution loops, sandboxes, and computer interaction |
| Aider AI | https://github.com/Aider-AI/aider | Repository mapping, AST parsing, and diff-based code editing |
| OpenHands | https://github.com/OpenHands/OpenHands | Sandbox management, browser testing, and e2e developer loops |

Adaptation rule: Curated repositories are design references only. Do not copy full prompts or code directly unless the license is verified and compatible.

---

## 17. Document Processing & Markdown Conversion

Use for converting binary files (PDFs, PPTX, DOCX, XLSX) to clean, token-efficient Markdown representations before agent processing.

| Source | URL | Use for Yes-human |
|---|---|---|
| Microsoft MarkItDown | https://github.com/microsoft/markitdown | Core offline conversion engine for PDF, PPTX, Docx, and spreadsheet files |

Adaptation rule: Auto-convert complex documents using MarkItDown to compress context footprint. Never present raw binary streams or giant parsed text trees directly to the LLM context.

---

## 18. ECC Deep Research: 14 Critical Architecture Patterns

The companion document `reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md` identified 14 critical architecture patterns from 180+ repositories. These patterns should be selectively absorbed into yes-human following the wave strategy in `YES-HUMAN_DEVELOPMENT_PLAN.md`.

### Wave 1: Foundation Patterns (Immediate)

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| **PlanCard** | `alialaayedi/forgent` | `yes route` output format with steps, gotchas, success criteria |
| **Anti-Rationalization Tables** | `addyosmani/agent-skills` | Skill schema extension with common agent excuses + rebuttals |
| **Progressive Disclosure** | ECC, `addyosmani/agent-skills` | SKILL.md entry → lazy-load references on demand |
| **6 Team Topologies** | `revfactory/harness` | Route table "topology" hints (Pipeline, Fan-out, Expert Pool, Producer-Reviewer, Supervisor, Hierarchical) |
| **Verification Gates** | `LearnPrompt/cc-harness-skills` | Skill contract enforcement (read-only challenge pass after implementation) |

### Wave 2: Runtime Architecture (After yes-core)

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| **Goal-first DAG** | `open-multi-agent/open-multi-agent` | yes-core router with pre-indexed route tables |
| **MCP-as-Universal-Interface** | `lastmile-ai/mcp-agent` | yes-human connectors should speak MCP |
| **Composable Workflow Patterns** | `lastmile-ai/mcp-agent` | Workflow registry encoding (Router → Orchestrator → Evaluator-Optimizer) |
| **Pull-based Memory** | `alialaayedi/forgent` | yes-graph memory layer (virtual paths, not dumped blobs) |
| **Outcome Feedback Loop** | `alialaayedi/forgent` | yes-human learning system (`report_outcome` → mistake graph) |

### Wave 3: Graph & Intelligence (After yes-graph)

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| **Graph-based Routing** | `stevesolun/ctx` | yes-graph DSA-style routing indexes (102K-node reference) |
| **4-Signal Quality Scoring** | `stevesolun/ctx` | Skill/workflow registry validation (quality, health, drift, usage) |
| **Trust Scoring & Audit** | `RealZST/HarnessKit` | yes-human validation gates (18 static analysis rules, 0-100 scores) |
| **Self-Evolving Subagents** | `zzatpku/AgentFactory`, `alialaayedi/forgent` | Dynamic agent creation (Meta-Agent creates/refines subagents as code modules) |
| **Micro-skill Gate** | `stevesolun/ctx` | Token budget enforcement (convert long skill bodies to compact form) |

### License Compatibility

All 14 patterns come from MIT or Apache-2.0 licensed repositories:
- **MIT** (9 patterns): Can freely absorb, adapt, redistribute
- **Apache-2.0** (5 patterns): Use freely, must preserve notices

No GPL or incompatible licenses in critical patterns.

---

## 19. Quick Reference: Top Repos by Category

For detailed analysis, see `reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md`.

### Agent Harness Systems (34 repos)
- **ECC** (198K stars, MIT) — 33 skills, instincts, memory, security, hooks, MCP configs
- **agency-agents** (106K stars, MIT) — Specialized agent personalities
- **karpathy-skills** (161K stars, Unlicense) — Single-file harness config from Karpathy's observations
- **agent-skills** (47K stars, MIT) — 23 production-grade skills with anti-rationalization tables

### MCP Servers (38 repos)
- **awesome-mcp-servers** (88K stars, MIT) — Largest community-curated collection
- **modelcontextprotocol/servers** (86K stars, Apache-2.0) — Official reference implementations
- **github-mcp-server** (30K stars, MIT) — GitHub's official MCP server (19 toolsets)

### Multi-Agent Orchestration (36 repos)
- **dify** (143K stars, Custom) — Visual DAG workflow builder
- **MetaGPT** (68K stars, MIT) — Role-based simulation (PM, Architect, Engineer)
- **open-multi-agent** (6.3K stars, MIT) — Goal-first DAG, 3 deps, TypeScript-native

### Coding/TDD/Security (35 repos)
- **strix** (25.7K stars, Apache-2.0) — Autonomous AI hackers that find and fix vulnerabilities
- **pr-agent** (11.4K stars, Apache-2.0) — Original open-source PR reviewer
- **claude-code-security-review** (4.9K stars, MIT) — Anthropic's official security review GitHub Action

### Research/Content/Business (61 repos)
- **gpt-researcher** (20K stars, Apache-2.0) — Autonomous deep research agent
- **DeepResearch** (18.7K stars, Apache-2.0) — Alibaba's 30.5B param agentic LLM
- **open_deep_research** (10K stars, MIT) — LangChain's configurable deep research

---

## 20. Absorption Principles

1. **Extract patterns, not wholesale code**: Every absorbed pattern must pass source dossier validation and license compatibility checks.
2. **Selective, not bulk**: Follow the wave strategy in `YES-HUMAN_DEVELOPMENT_PLAN.md`. Do not import 180+ repos at once.
3. **Validate before production**: No absorbed pattern enters production without passing quality gates (4-signal scoring, trust scoring, route fixtures).
4. **Maintain provenance**: Every absorbed pattern must have a source dossier with URL, license, commit/version, and what was used.
5. **Prefer MIT/Apache-2.0**: All critical patterns are MIT-compatible. Avoid GPL or unclear licenses in core.

---

## 21. Direct Competitors (Added 2026-05-29)

**Full analysis:** See `reports/COMPETITOR-ANALYSIS.md` for detailed breakdown of 5 closest competitors and 20 adoption patterns.

These are projects with similar goals to yes-human (portable agent routing, cross-harness compatibility, lazy loading). Each offers unique patterns worth selectively absorbing.

| Source | URL | Use for Yes-human |
|---|---|---|
| AgentMaster | https://github.com/Surya8991/AgentMaster | Signal-word routing table (23 categories), caveman token compression (~75%), dry-run mode, loop prevention |
| agentic-harness | https://github.com/tbhrc/agentic-harness | 4-layer memory model (working/episodic/semantic/personal), progressive skill disclosure, nightly auto_dream staging, skill failure tracking |
| iso | https://github.com/Agent-Pattern-Labs/iso | Contract/ledger/guard primitives, fan-out parallel dispatch, isomorphic authoring, trace system |
| nexus-agents | https://github.com/nexus-substrate/nexus-agents | Drift detection (CI gates), OutcomeStore for routing feedback, hash-chained audit trail, doctor command, fitness audit |
| agent-harness | https://github.com/madebywild/agent-harness | Shadcn-style registry with provenance (lock file + SHA256), plan/apply pipeline, schema versioning (doctor+migrate), U-Haul migration, preset system, override sidecars |

Adaptation rule: These are direct competitors with overlapping goals. Absorb specific patterns (see `YES-HUMAN_DEVELOPMENT_PLAN.md` Phases 1-5 for the 20 prioritized patterns), not wholesale implementations. Each competitor has gaps yes-human fills (graph routing, token budgets, provenance tracking).

---

## 22. Startup Leadership And Solo-Founder Toolkit (Added 2026-05-31)

Use for `startup-ops.master`, `startup-ops.ceo-rethink`, `startup-ops.eng-mgmt`, `startup-ops.release`, `startup-ops.qa`, `startup-ops.doc-eng`, `security.threat-modeling` (OWASP/STRIDE), and `design-content.frontend-design` (anti-slop).

| Source | URL | Use for Yes-human |
|---|---|---|
| gstack (Garry Tan / Y Combinator) | https://github.com/garrytan/gstack | 23 slash-command founder/CEO roles, OWASP+STRIDE security audit checklist, doc-engineer pattern, AI-slop detection, end-to-end office-hours → plan-ceo-review → review → QA → release lifecycle |

**Repo profile:** 105K stars · MIT · production-validated by YC president  
**Patterns to absorb:** Slash-command role taxonomy (CEO, designer, eng-mgr, reviewer, QA-lead, security-officer, release-eng, doc-engineer), `/office-hours` discovery pattern, `/plan-ceo-review` feature-validation gate, `/qa` browser-based verification loop, AI-slop detection heuristics for design output.

Adaptation rule: copy_policy = `patterns_only`. Cite gstack as source in dossiers but do not duplicate slash-command markdown verbatim.

---

## 23. Browser Automation For Agents (Added 2026-05-31)

Use for `integrations.browser-auto`, `engineering.e2e-runner`, `design-content.frontend-design`, `data-ai.eval` (visual eval), and `manufacturing.logistics` (carrier-site scraping).

| Source | URL | Use for Yes-human |
|---|---|---|
| vercel-labs/agent-browser | https://github.com/vercel-labs/agent-browser | Native Rust browser-automation CLI for AI agents — single-binary install, Chrome-for-Testing provisioning, agent-oriented command surface |

**Repo profile:** 35K stars · Apache-2.0 (requires notice preservation) · Vercel Labs maintained  
**Patterns to absorb:** Single-binary CLI distribution model, Chrome-for-Testing provisioning step, agent-friendly invocation shape.

Adaptation rule: complements `Playwright MCP` already in §7 — use agent-browser when a native binary is preferred over npx-spawned MCP. Apache-2.0 notice must be preserved in any distributed bundle.

---

## 24. Healthcare And Clinical-Decision Support (New sector, 2026-05-31)

Use for `healthcare.master`, `healthcare.clinical-decision-support`, `healthcare.EHR-patterns`, `healthcare.PHI-compliance`, and `healthcare.eval-harness`. **High-stakes domain** — mandatory disclaimers + human-clinician review gates per architecture §29.

| Source | URL | Use for Yes-human |
|---|---|---|
| TxAgent (Harvard MIMS) | https://github.com/mims-harvard/TxAgent | clinical decision-support agent reference, multi-tool clinical reasoning loop |
| Doctor-R1 (Tsinghua) | https://github.com/thu-unicorn/Doctor-R1 | medical reasoning eval harness and benchmark structure |
| COMPASS-Engine | https://github.com/stvsever/compass-engine | clinical compass / care-pathway pattern |
| Meissa | https://github.com/Schuture/Meissa | medical agent orchestration reference |
| Cerebra | https://github.com/shengliu66/Cerebra | medical reasoning architecture reference |

Adaptation rule: no PHI in prompts; outputs must cite deterministic clinical-pathway sources; every output carries a "not medical advice — clinician review required" disclaimer. License audit required per source — block any GPL-derived clinical pathway content.

---

## 25. Education And Personalized Learning (New sector, 2026-05-31)

Use for `education.master`, `education.curriculum`, `education.tutor`, `education.assessment`, and `education.lms-patterns`.

| Source | URL | Use for Yes-human |
|---|---|---|
| DeepTutor (HKUDS) | https://github.com/HKUDS/DeepTutor | agent-native personalized tutor patterns, learner-state modeling |
| LearnOS | https://github.com/Abelo9996/LearnOS | learning-OS scaffolding patterns |
| OpenMAIC (Tsinghua) | https://github.com/THU-MAIC/OpenMAIC | curriculum generation and assessment loop |
| OpenTutor | https://github.com/zijinz456/OpenTutor | tutor agent reference |

Adaptation rule: education outputs targeting minors (K-12) must surface age/grade level metadata and avoid medical/legal/financial-advice content beyond grade level.

---

## 26. Manufacturing, Supply-Chain, And Operations (New sector, 2026-05-31)

Use for `manufacturing.master`, `manufacturing.inventory`, `manufacturing.demand-planning`, `manufacturing.quality-nonconformance`, and `manufacturing.logistics`.

| Source | URL | Use for Yes-human |
|---|---|---|
| Carbon (crbnos) | https://github.com/crbnos/carbon | modern manufacturing ERP — data model, MRP, BoM, quality reference |
| ERPNext | https://github.com/frappe/erpnext | inventory + production-planning workflow reference (cross-references §11) |
| NexusAI-ERP | https://github.com/mbilaljunaid/nexusai-erp | AI-augmented ERP workflow reference |

Adaptation rule: manufacturing agents producing production-schedule, demand-plan, or quality-nonconformance outputs require human-supervisor review before downstream execution. Connector requirement: ERP-write actions are policy-gated.

---

## 27. Scientific Research And Self-Improving Agent Patterns (Added 2026-05-31)

Use for `research.master`, `research.scientific-lit`, `meta-system.workflow-miner`, and as cross-cutting reference for self-improving agent designs across all domains.

| Source | URL | Use for Yes-human |
|---|---|---|
| Agent Design Patterns (huangjia2019) | https://github.com/huangjia2019/agent-design-patterns | reference pattern library — patterns by category |
| GenericAgent (sirbrasscat) | https://github.com/sirbrasscat/GenericAgent | self-evolving agent — skill-tree growth pattern from 3.3K-line seed, 6× token-efficient claim |
| Agent Handbook (vasilyevdm) | https://github.com/vasilyevdm/ai-agent-handbook | broad cross-pattern survey, useful for skill-gap detection |
| MARTI (Tsinghua C3I) | https://github.com/TsinghuaC3I/MARTI | multi-agent research toolkit, agent-learning loop reference |

Adaptation rule: self-improving patterns must integrate with the existing eval-gate ladder — `report_outcome` → mistake graph → eval pass → promotion. Skill-tree growth is permitted only if every new skill passes the standard dossier + fixture + cost gates.


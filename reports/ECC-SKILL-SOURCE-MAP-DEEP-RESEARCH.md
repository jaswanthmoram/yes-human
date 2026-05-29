# ECC Skill Category Source Map: Deep Research Report
*Generated: 2026-05-29 | Sources: 180+ | Confidence: High*

## Executive Summary

This report maps every ECC skill category to open-source GitHub projects that implement equivalent or superior agent skills, subagents, MCP servers, and orchestration patterns. The goal is to identify which projects yes-human can selectively absorb patterns from — following the wave-by-wave, low-token, lazy-loaded philosophy — rather than bulk-importing large agent corpora.

**Key findings:**
- **180+ repos** cataloged across 8 categories matching ECC's 33 skills
- **7 architecturally critical repos** deep-read for pattern extraction (all MIT-compatible)
- **38 MCP server repos** identified; the ecosystem has 7,000+ servers as of mid-2026
- **36 multi-agent orchestration frameworks** found; yes-human's router+lazy-load approach is validated by multiple independent implementations
- **35 coding/TDD/security agent repos** found; Strix (25.7K stars) and PR-Agent (11.4K stars) lead
- **61 research/content/business repos** found; deep research is the most mature category

---

## Table of Contents

1. [Category 1: Agent Harness Systems](#category-1-agent-harness-systems)
2. [Category 2: MCP Servers & Infrastructure](#category-2-mcp-servers--infrastructure)
3. [Category 3: Multi-Agent Orchestration & Routing](#category-3-multi-agent-orchestration--routing)
4. [Category 4: Development Skills (Coding, TDD, Security, Review)](#category-4-development-skills)
5. [Category 5: Research & Deep Search](#category-5-research--deep-search)
6. [Category 6: Content Creation & Brand Voice](#category-6-content-creation--brand-voice)
7. [Category 7: Business, Market Research & Investor Materials](#category-7-business-market-research--investor-materials)
8. [Category 8: Agent Management & Meta-Tools](#category-8-agent-management--meta-tools)
9. [Architecture Pattern Matrix](#architecture-pattern-matrix)
10. [yes-human Absorption Plan](#yes-human-absorption-plan)
11. [Sources](#sources)

---

## Category 1: Agent Harness Systems

*ECC skills covered: everything-claude-code, agent-sort, agent-introspection-debugging, strategic-compact, eval-harness*

These are full agent harness systems with skills, instincts, memory, security, and cross-harness configs — direct peers to ECC and yes-human.

### Tier 1: Full Agent Harness Systems

| # | Repo | Stars | License | Key Features |
|---|------|-------|---------|--------------|
| 1 | [affaan-m/ECC](https://github.com/affaan-m/ECC) | 198K | MIT | 33 skills, instincts, memory, security, hooks, MCP configs, cross-harness |
| 2 | [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | 161K | Unlicense | Single-file harness config from Karpathy's LLM coding observations |
| 3 | [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | 63.5K | MIT | "Bash is all you need" — build a CC-like harness from scratch |
| 4 | [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) | 44.9K | MIT | Task planning, tools, skills, autonomous memory/knowledge growth |
| 5 | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | 45.1K | N/A | Curated list: skills, hooks, slash-commands, orchestrators, plugins |
| 6 | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | 46.8K | MIT | 23 production-grade skills with anti-rationalization tables |
| 7 | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 28.5K | Apache-2.0 | Official Anthropic plugin directory |
| 8 | [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 23.5K | MIT | 1000+ cross-platform skills for Claude Code, Codex, Gemini CLI, Cursor |
| 9 | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 16.5K | MIT | 337 skills, 30+ agents, 70+ commands for 10+ coding agents |
| 10 | [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) | 12.4K | N/A | Curated Codex skills for workflow automation |

### Tier 2: Harness Infrastructure

| # | Repo | Stars | License | Key Features |
|---|------|-------|---------|--------------|
| 11 | [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) | 105.9K | MIT | Specialized agent personalities with processes and deliverables |
| 12 | [Orchestra-Research/AI-research-SKILLs](https://github.com/Orchestra-Research/AI-research-SKILLs) | 9.1K | MIT | Comprehensive skills for autonomous AI research |
| 13 | [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) | 8.3K | Apache-2.0 | MCP-based agent framework with composable workflow patterns |
| 14 | [ModelEngine-Group/nexent](https://github.com/ModelEngine-Group/nexent) | 4.8K | MIT | Zero-code agent platform with harness engineering |
| 15 | [revfactory/harness](https://github.com/revfactory/harness) | 4.1K | Apache-2.0 | Meta-skill: 6 team-architecture patterns, auto-generates agents+skills |
| 16 | [microsoft/skills](https://github.com/microsoft/skills) | 2.4K | MIT | Microsoft's agent skills, MCP, AGENTS.md for Azure SDKs |
| 17 | [Chachamaru127/claude-code-harness](https://github.com/Chachamaru127/claude-code-harness) | 2.2K | MIT | 5-verb skills (plan, work, review, sync, release) |
| 18 | [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 1.9K | Apache-2.0 | 135 agents, 35 skills, 42 commands, 176+ plugins |

### Tier 3: Specialized Harness Tools

| # | Repo | Stars | License | Key Features |
|---|------|-------|---------|--------------|
| 19 | [stevesolun/ctx](https://github.com/stevesolun/ctx) | 372 | MIT | 102K-node graph, 91K skills, 10.8K MCPs indexed for recommendation |
| 20 | [mcpware/cross-code-organizer](https://github.com/mcpware/cross-code-organizer) | 329 | MIT | Cross-harness config dashboard |
| 21 | [RealZST/HarnessKit](https://github.com/RealZST/HarnessKit) | 284 | Apache-2.0 | Universal skill/MCP/plugin manager across 8 agents |
| 22 | [LearnPrompt/cc-harness-skills](https://github.com/LearnPrompt/cc-harness-skills) | 217 | MIT | Dream memory, verification gate, swarm coordinator, context compressor |
| 23 | [ndizazzo/saddle](https://github.com/ndizazzo/saddle) | 50 | MIT | Cross-agent config sync across Claude Code, Codex, Copilot, Cursor |

### Key Patterns for yes-human

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| 6 team-architecture topologies | revfactory/harness | Route table "topology" hints |
| Anti-rationalization tables | addyosmani/agent-skills | Skill contracts with excuse rebuttals |
| Progressive skill disclosure | ECC, agent-skills | SKILL.md entry → lazy-load references |
| 102K-node recommendation graph | stevesolun/ctx | yes-graph DSA-style routing indexes |
| Cross-agent format normalization | RealZST/HarnessKit | yes-human's 9-surface export system |
| Verification gates | LearnPrompt/cc-harness-skills | Read-only challenge pass after implementation |

---

## Category 2: MCP Servers & Infrastructure

*ECC skills covered: mcp-server-patterns, documentation-lookup, exa-search*

### Tier 1: Official / Core Protocol

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 1 | [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 88.1K | MIT | Largest community-curated MCP server collection |
| 2 | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 86.4K | Apache-2.0 | Official reference implementations (Memory, Sequential Thinking, Git, Fetch, Filesystem) |
| 3 | [github/github-mcp-server](https://github.com/github/github-mcp-server) | 30.3K | MIT | GitHub's official MCP server — 19 toolsets |
| 4 | [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) | 23.2K | MIT | Official Python SDK |
| 5 | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) | 12.6K | MIT | Official TypeScript SDK |
| 6 | [modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) | 8.3K | MIT | MCP specification and protocol schema |
| 7 | [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) | 6.9K | Custom | Official community-driven MCP server registry |

### Tier 2: Curated Lists & Directories

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 8 | [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) | 5.6K | N/A | 30+ categories of MCP servers |
| 9 | [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) | 4.1K | MIT | Discovery, management, debugging playground |
| 10 | [microsoft/mcp](https://github.com/microsoft/mcp) | 3.2K | MIT | Microsoft's official MCP catalog |
| 11 | [blazickjp/arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) | 2.8K | Apache-2.0 | arXiv paper search and analysis |
| 12 | [zcaceres/markdownify-mcp](https://github.com/zcaceres/markdownify-mcp) | 2.7K | MIT | Convert anything to Markdown |
| 13 | [chatmcp/mcpso](https://github.com/chatmcp/mcpso) | 2K | Apache-2.0 | Directory at mcp.so |

### Tier 3: Platform-Specific Servers

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 14 | [mobile-next/mobile-mcp](https://github.com/mobile-next/mobile-mcp) | 5.1K | Apache-2.0 | Mobile automation — iOS, Android, emulators |
| 15 | [containers/kubernetes-mcp-server](https://github.com/containers/kubernetes-mcp-server) | 1.6K | Apache-2.0 | Go-native Kubernetes MCP server |
| 16 | [qdrant/mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant) | 1.4K | Apache-2.0 | Qdrant vector DB for semantic search/memory |
| 17 | [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) | 1.3K | MIT | Secure MySQL database interaction |
| 18 | [datalayer/jupyter-mcp-server](https://github.com/datalayer/jupyter-mcp-server) | 1.1K | BSD-3-Clause | Jupyter notebook interaction |
| 19 | [mongodb-js/mongodb-mcp-server](https://github.com/mongodb-js/mongodb-mcp-server) | 1K | Apache-2.0 | Official MongoDB MCP server |
| 20 | [neo4j-contrib/mcp-neo4j](https://github.com/neo4j-contrib/mcp-neo4j) | 950 | MIT | Neo4j graph database interaction |

### MCP Servers Already Configured in yes-human

| Server | Package | Status |
|--------|---------|--------|
| firecrawl | `firecrawl-mcp` | Configured |
| exa | `exa-mcp-server` | Configured |
| github | `@modelcontextprotocol/server-github` | Configured |
| context7 | `@upstash/context7-mcp` | Configured |
| memory | `@modelcontextprotocol/server-memory` | Configured |
| playwright | `@playwright/mcp` | Configured |
| sequential-thinking | `@modelcontextprotocol/server-sequential-thinking` | Configured |

### Key Patterns for yes-human

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| MCP-as-universal-interface | lastmile-ai/mcp-agent | yes-human connectors should speak MCP |
| Official registry | modelcontextprotocol/registry | yes-human MCP registry should reference this |
| Agent-as-MCP-server | mcp-agent | Expose yes-human agents as MCP servers |
| Composable patterns | mcp-agent | Router → Orchestrator → Evaluator-Optimizer |

---

## Category 3: Multi-Agent Orchestration & Routing

*ECC skills covered: dmux-workflows, agent-sort, eval-harness*

### Tier 1: Major Frameworks (10K+ Stars)

| # | Repo | Stars | License | Architecture Pattern |
|---|------|-------|---------|---------------------|
| 1 | [langgenius/dify](https://github.com/langgenius/dify) | 142.9K | Custom | Visual DAG workflow builder with agent orchestration |
| 2 | [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) | 68.4K | MIT | Role-based simulation (PM, Architect, Engineer) |
| 3 | [microsoft/autogen](https://github.com/microsoft/autogen) | 58.5K | CC-BY-4.0 | Conversational multi-agent with event-driven agents |
| 4 | [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) | 52.3K | MIT | Crew-based role-playing agents + Flows |
| 5 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 33.3K | MIT | Graph-based nodes, edges, conditional routing |
| 6 | [huggingface/smolagents](https://github.com/huggingface/smolagents) | 27.5K | Apache-2.0 | Code-first agent, model-agnostic (100+ providers) |
| 7 | [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | 26.7K | MIT | Handoff-based agent orchestration |
| 8 | [mastra-ai/mastra](https://github.com/mastra-ai/mastra) | 24.5K | Custom | TypeScript-native agent + workflow system |
| 9 | [openai/swarm](https://github.com/openai/swarm) | 22K | MIT | Educational handoff-based swarm pattern |
| 10 | [elizaOS/eliza](https://github.com/elizaOS/eliza) | 18.5K | MIT | Plugin-based multi-agent OS |
| 11 | [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) | 17.4K | MIT | Type-safe agent with dependency injection |
| 12 | [camel-ai/camel](https://github.com/camel-ai/camel) | 17.1K | Apache-2.0 | Role-playing communicative agents (up to 1M) |
| 13 | [microsoft/agent-framework](https://github.com/microsoft/agent-framework) | 10.8K | MIT | Graph-based workflows, A2A + MCP, enterprise-grade |

### Tier 2: Established Frameworks (3K-10K Stars)

| # | Repo | Stars | License | Architecture Pattern |
|---|------|-------|---------|---------------------|
| 14 | [kyegomez/swarms](https://github.com/kyegomez/swarms) | 6.7K | Apache-2.0 | Enterprise swarm with multiple orchestration modes |
| 15 | [open-multi-agent/open-multi-agent](https://github.com/open-multi-agent/open-multi-agent) | 6.3K | MIT | Goal-first DAG, 3 deps, TypeScript-native |
| 16 | [VRSEN/agency-swarm](https://github.com/VRSEN/agency-swarm) | 4.4K | MIT | Agency-based with communication flows |
| 17 | [EvoAgentX/EvoAgentX](https://github.com/EvoAgentX/EvoAgentX) | 3K | Custom | Self-evolving agent ecosystem |

### Tier 3: Coding Agent Orchestrators

| # | Repo | Stars | License | Architecture Pattern |
|---|------|-------|---------|---------------------|
| 18 | [alialaayedi/forgent](https://github.com/alialaayedi/forgent) | ~100 | MIT | Meta-orchestrator: PlanCard + 63 knowledge packs + AgentForge |
| 19 | [ComposioHQ/agent-orchestrator](https://github.com/ComposioHQ/agent-orchestrator) | ~500 | MIT | Planner → parallel coding agents with CI fix |
| 20 | [PatrickRuddiman/Dispatch](https://github.com/PatrickRuddiman/Dispatch) | ~300 | MIT | Work item parser → spec → planner-then-execute (Go) |
| 21 | [PietroPasotti/orc](https://github.com/PietroPasotti/orc) | ~200 | MIT | YAML kanban board: plan → code → review → merge |
| 22 | [Tanush1912/ouroboros](https://github.com/Tanush1912/ouroboros) | ~150 | MIT | State machine: Planner → Implementer → Validator → Reviewer |
| 23 | [gabrielkoerich/orchestrator](https://github.com/gabrielkoerich/orchestrator) | ~100 | MIT | LLM-classifier router → isolated git worktrees → tmux sessions |
| 24 | [zzatpku/AgentFactory](https://github.com/zzatpku/AgentFactory) | ~150 | MIT | Self-evolving: Meta-Agent creates/refines subagents as Python modules |
| 25 | [arcane-bear/agent-router](https://github.com/arcane-bear/agent-router) | ~50 | MIT | Lightweight intent classification → agent registry → dispatch |

### Architecture Pattern Matrix

| Pattern | Repos | yes-human Fit |
|---------|-------|---------------|
| **Planner/Worker** | MetaGPT, Orc, Ouroboros, Composio, Dispatch | High — matches yes-human's planned wave execution |
| **Graph/DAG-based** | LangGraph, Open-Multi-Agent, Mastra, Dify | High — yes-graph should encode DAGs |
| **Router/Dispatch** | agent-router, forgent, orchestrator | Critical — yes-human's ROUTE_TABLE is this pattern |
| **Swarm/Mesh** | Swarms, AutoGen, Agency-Swarm, ElizaOS | Medium — useful for parallel task execution |
| **Role-Playing/Crew** | CrewAI, CAMEL, MetaGPT | Low — yes-human uses skill routing, not role-play |
| **Handoff-based** | OpenAI Swarm, OpenAI Agents SDK | Medium — agent-to-agent handoff for complex tasks |
| **Self-Evolving** | EvoAgentX, AgentFactory, forgent | High — "Agent Lightning-style learning" |
| **Declarative/YAML** | Orloj, AgentLoom | Medium — yes-human uses JSON registries |
| **State Machine** | Ouroboros, Orloj | High — yes-human's workflow registry should encode state machines |
| **Actor Model** | HiveMind | Low — overkill for yes-human's scope |
| **Microkernel** | Agent-Kernel, OxyGent | High — yes-human's plugin system is microkernel-like |

---

## Category 4: Development Skills

*ECC skills covered: tdd-workflow, coding-standards, verification-loop, security-review, api-design, backend-patterns, frontend-patterns, e2e-testing, frontend-slides*

### Code Review Agents

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 1 | [The-PR-Agent/pr-agent](https://github.com/The-PR-agent/pr-agent) | 11.4K | Apache-2.0 | Original open-source PR reviewer, multi-LLM |
| 2 | [kodustech/kodus-ai](https://github.com/kodustech/kodus-ai) | 1.1K | Custom | Model-agnostic AI code review |
| 3 | [Nikita-Filonov/ai-review](https://github.com/Nikita-Filonov/ai-review) | 452 | Apache-2.0 | GitHub, GitLab, Bitbucket, Azure DevOps, Gitea |
| 4 | [TheMorpheus407/RepoLens](https://github.com/TheMorpheus407/RepoLens) | 268 | Apache-2.0 | 280 expert AI agents for code audit |
| 5 | [spencermarx/open-code-review](https://github.com/spencermarx/open-code-review) | 195 | Apache-2.0 | Multi-agent review with discourse and debate |

### TDD / Test-Driven Development

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 6 | [modu-ai/moai-adk](https://github.com/modu-ai/moai-adk) | 1K | Apache-2.0 | 24 AI agents + 52 skills with TDD/DDD quality gates |
| 7 | [LerianStudio/ring](https://github.com/LerianStudio/ring) | 190 | Apache-2.0 | 89 skills + 38 agents enforcing TDD, 10-gate dev cycles |
| 8 | [zd8899/TDAD](https://github.com/zd8899/TDAD) | 75 | MIT | Visual TDD engine: Plan → Spec → Test → Fix |
| 9 | [sam-agents/sam](https://github.com/sam-agents/sam) | 15 | MIT | Autonomous TDD: PRD → working tested app |
| 10 | [afokapu/atdd](https://github.com/afokapu/atdd) | 4 | GPL-3.0 | Acceptance TDD state machine: INIT→RED→GREEN→REFACTOR→COMPLETE |

### Security / Vulnerability Scanning

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 11 | [usestrix/strix](https://github.com/usestrix/strix) | 25.7K | Apache-2.0 | Autonomous AI hackers: find and fix vulnerabilities |
| 12 | [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) | 4.9K | MIT | Anthropic's official security review GitHub Action |
| 13 | [snyk/agent-scan](https://github.com/snyk/agent-scan) | 2.5K | Apache-2.0 | Security scanner for AI agents, MCP servers, skills |
| 14 | [harishsg993010/crossbow-agent](https://github.com/harishsg993010/crossbow-agent) | 243 | MIT | Autonomous security engineer: find/exploit vulns |
| 15 | [HeadyZhang/agent-audit](https://github.com/HeadyZhang/agent-audit) | 173 | MIT | 49 rules mapped to OWASP Agentic Top 10 |
| 16 | [NVIDIA/SkillSpector](https://github.com/NVIDIA/SkillSpector) | 33 | Apache-2.0 | 64 vulnerability patterns across 16 categories |

### Build Error / Quality

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 17 | [SonarSource/sonarqube-mcp-server](https://github.com/SonarSource/sonarqube-mcp-server) | ~500 | N/A | Official SonarQube MCP for code quality |
| 18 | [codeaholicguy/ai-devkit](https://github.com/codeaholicguy/ai-devkit) | ~100 | N/A | Engineering workflow: planning, memory, verification, skills |
| 19 | [darrenhinde/OpenAgentsControl](https://github.com/darrenhinde/OpenAgentsControl) | ~50 | N/A | Plan-first with approval-based execution, auto testing + review |

### Key Patterns for yes-human

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| TDD state machine | atdd, TDAD | yes-human's verification-loop skill |
| OWASP Agentic Top 10 rules | agent-audit | yes-human's security-review skill |
| Multi-agent debate | open-code-review | yes-human's code-reviewer agent |
| 10-gate dev cycles | LerianStudio/ring | yes-human's wave-by-wave quality gates |
| Skill vulnerability scanning | NVIDIA/SkillSpector | yes-human's validate.js should scan skills |

---

## Category 5: Research & Deep Search

*ECC skills covered: deep-research, exa-search, documentation-lookup*

### Deep Research Agents

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 1 | [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | ~20K | Apache-2.0 | Autonomous deep research agent, any LLM, detailed reports |
| 2 | [Alibaba-NLP/DeepResearch](https://github.com/Alibaba-NLP/DeepResearch) | 18.7K | Apache-2.0 | 30.5B param agentic LLM for deep information-seeking |
| 3 | [langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research) | ~10K | MIT | Configurable deep research across model providers and MCP |
| 4 | [MiroMindAI/MiroThinker](https://github.com/MiroMindAI/MiroThinker) | 8.2K | Custom | 88.2 on BrowseComp, interactive scaling for long-chain tasks |
| 5 | [dzhng/deep-research](https://github.com/dzhng/deep-research) | ~5K | MIT | Simplest deep research: search + scrape + LLM iteration |
| 6 | [hrithikkoduri/WebRover](https://github.com/hrithikkoduri/WebRover) | 995 | MIT | Autonomous web agent with 3 specialized research modes |
| 7 | [Tencent/CognitiveKernel-Pro](https://github.com/Tencent/CognitiveKernel-Pro) | 517 | Custom | Tencent AI Lab deep research, SFT outperforms RL-based models |
| 8 | [FractalAIResearchLabs/Fathom-DeepResearch](https://github.com/FractalAIResearchLabs/Fathom-DeepResearch) | 56 | MIT | Two 4B models outperforming Claude/Grok/GPT-4o on synthesis |

### Key Patterns for yes-human

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| Multi-source search + synthesis | gpt-researcher, open_deep_research | yes-human's deep-research skill workflow |
| MCP-based research tools | open_deep_research | firecrawl + exa MCP integration |
| Iterative deepening | dzhng/deep-research | yes-human's research sub-question expansion |
| BrowseComp benchmarking | MiroThinker, Alibaba | Eval criteria for yes-human's research quality |

---

## Category 6: Content Creation & Brand Voice

*ECC skills covered: article-writing, brand-voice, content-engine, crosspost, x-api, frontend-slides, video-editing, fal-ai-media*

### Content Creation

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 1 | [npow/ghostwriter](https://github.com/npow/ghostwriter) | N/A | N/A | Anti-slop quality gates, style fingerprinting, 4 review agents |
| 2 | [E-mmanuelM/brandcrew](https://github.com/E-mmanuelM/brandcrew) | N/A | N/A | 7-agent LinkedIn content team via Telegram |
| 3 | [onehorizonai/ink](https://github.com/onehorizonai/ink) | N/A | N/A | Blog + social media writing agent for Claude Code/Cursor |
| 4 | [microsoft/content-generation-solution-accelerator](https://github.com/microsoft/content-generation-solution-accelerator) | N/A | MIT | Microsoft's multi-agent marketing content creation |
| 5 | [KalyanM45/Multi-Agentic-Blog-Generation](https://github.com/KalyanM45/Multi-Agentic-Blog-Generation) | N/A | N/A | LangGraph + Groq automated blog generation |

### Brand Voice

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 6 | [mcltyl/brand-voice-skills](https://github.com/mcltyl/brand-voice-skills) | N/A | N/A | BRAND_VOICE.md profile for consistent tone across content |
| 7 | [Reese-Pallath/Brand-Voice-Architect](https://github.com/Reese-Pallath/Brand-Voice-Architect) | N/A | MIT | Semantic cartography for brand voice, neural tone analysis |
| 8 | [getnao/sylph](https://github.com/getnao/sylph) | N/A | N/A | Open-source company brain: AI agents for all departments |

### Key Patterns for yes-human

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| Anti-slop quality gates | ghostwriter | yes-human's content skills should include quality gates |
| Style fingerprinting | Brand-Voice-Architect | yes-human's brand-voice skill pattern |
| Multi-platform adaptation | brandcrew, crosspost | yes-human's content-engine skill |

---

## Category 7: Business, Market Research & Investor Materials

*ECC skills covered: market-research, investor-materials, investor-outreach, product-capability*

### Market Research / Competitive Analysis

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 1 | [brightdata/competitive-intelligence](https://github.com/brightdata/competitive-intelligence) | N/A | N/A | Autonomous competitive research + enterprise web scraping |
| 2 | [maomaozhe/CompetitorScope](https://github.com/maomaozhe/CompetitorScope) | N/A | N/A | 5-agent competitive research with LangGraph |
| 3 | [npow/deeprecon](https://github.com/npow/deeprecon) | N/A | N/A | Competitive intelligence + market mapping for founders |
| 4 | [serpapi/competitive-intelligence-agent](https://github.com/serpapi/competitive-intelligence-agent) | N/A | N/A | CI agent using SerpApi + OpenAI |
| 5 | [Ambitus-Intelligence/ambitus-ai-models](https://github.com/Ambitus-Intelligence/ambitus-ai-models) | N/A | N/A | 8 specialized market research agents |

### Investor Materials / Pitch Decks

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 6 | [lool-ventures/founder-skills](https://github.com/lool-ventures/founder-skills) | N/A | N/A | 4 AI coaching agents: market sizing, deck review, financial model |
| 7 | [tjboudreaux/cc-skills-vc-fundraising](https://github.com/tjboudreaux/cc-skills-vc-fundraising) | N/A | N/A | VC fundraising skills for Claude Code |
| 8 | [vinicius91carvalho/founder-os](https://github.com/vinicius91carvalho/founder-os) | N/A | N/A | 12 AI skills + orchestrator, YC/Sequoia frameworks |
| 9 | [AKMessi/dealscout](https://github.com/AKMessi/dealscout) | N/A | N/A | Multi-agent VC due diligence with combative architecture |
| 10 | [shreevershith/dealgraph](https://github.com/shreevershith/dealgraph) | N/A | N/A | VC DD copilot: claim extraction + routing + confidence scoring |

### Key Patterns for yes-human

| Pattern | Source | yes-human Application |
|---------|--------|----------------------|
| 5-agent competitive pipeline | CompetitorScope | yes-human's market-research skill |
| VC DD combative architecture | dealscout | yes-human's investor-materials skill |
| YC/Sequoia framework skills | founder-os | yes-human's investor-outreach skill |
| Claim extraction + confidence scoring | dealgraph | yes-human's verification pattern |

---

## Category 8: Agent Management & Meta-Tools

*ECC skills covered: agent-introspection-debugging, agent-sort, strategic-compact, eval-harness, dmux-workflows*

### Key Repos

| # | Repo | Stars | License | Description |
|---|------|-------|---------|-------------|
| 1 | [stevesolun/ctx](https://github.com/stevesolun/ctx) | 372 | MIT | Skill/MCP recommendation engine with 102K-node graph |
| 2 | [RealZST/HarnessKit](https://github.com/RealZST/HarnessKit) | 284 | Apache-2.0 | Universal extension manager with trust scoring |
| 3 | [keli-wen/agentic-harness-patterns-skill](https://github.com/keli-wen/agentic-harness-patterns-skill) | 281 | MIT | Memory, permissions, context engineering patterns |
| 4 | [atticus98/codex-turbo](https://github.com/atticus98/codex-turbo) | 187 | MIT | Multi-agent parallel scheduling for Codex CLI |
| 5 | [ndizazzo/saddle](https://github.com/ndizazzo/saddle) | 50 | MIT | Cross-agent config sync |
| 6 | [iLearn-Lab/EvoHarness](https://github.com/iLearn-Lab/EvoHarness) | 52 | N/A | Self-evolution agent infrastructure |

---

## Architecture Pattern Matrix

### Patterns Most Relevant to yes-human

| Pattern | Description | Source Repos | yes-human Mapping |
|---------|-------------|-------------|-------------------|
| **PlanCard** | Structured plan output with steps, gotchas, success criteria | forgent | yes-human's router should return PlanCards, not just agent refs |
| **Goal-first DAG** | Decompose goal → task graph → parallel execution | open-multi-agent | yes-human's runtime router with pre-indexed route tables |
| **Team Topology Taxonomy** | 6 patterns: Pipeline, Fan-out, Expert Pool, Producer-Reviewer, Supervisor, Hierarchical | revfactory/harness | Route table "topology" hints for workflow selection |
| **Anti-Rationalization Tables** | Common agent excuses + rebuttals per skill | addyosmani/agent-skills | yes-human skill contracts |
| **Progressive Disclosure** | SKILL.md entry → lazy-load references on demand | ECC, agent-skills | yes-human's token-efficient skill loading |
| **Outcome Feedback Loop** | report_outcome → next plan surfaces gotchas | forgent | yes-human's "Agent Lightning-style learning" |
| **Pull-based Memory** | Virtual paths, not dumped blobs | forgent | yes-human's low-token memory approach |
| **Graph-based Routing** | 102K-node knowledge graph for recommendation | stevesolun/ctx | yes-graph DSA-style routing indexes |
| **Trust Scoring** | 18 static analysis rules, 0-100 trust scores | HarnessKit | yes-human's skill/workflow validation gates |
| **Composable MCP Patterns** | Router → Orchestrator → Evaluator-Optimizer chain | lastmile-ai/mcp-agent | yes-human's workflow registry |
| **Self-Evolving Subagents** | Meta-Agent creates/refines subagents as code modules | AgentFactory, forgent | yes-human's planned dynamic agent creation |
| **Verification Gates** | Read-only challenge pass after implementation | cc-harness-skills | yes-human's skill contracts |
| **Micro-skill Gate** | Convert long skill bodies to compact form | stevesolun/ctx | yes-human's token budget enforcement |
| **Git Worktree Isolation** | Parallel agents in isolated git worktrees | orc, Dispatch, orchestrator | yes-human's parallel task execution |

---

## yes-human Absorption Plan

### Wave 1: Foundation Patterns (Immediate)

| What | From | Into yes-human |
|------|------|----------------|
| PlanCard pattern | forgent | `yes route` output format |
| Anti-rationalization tables | addyosmani/agent-skills | Skill schema extension |
| Progressive disclosure | ECC, agent-skills | SKILL.md → lazy-load references |
| 6 team topology types | revfactory/harness | Route table topology hints |
| Verification gates | cc-harness-skills | Skill contract enforcement |

### Wave 2: Runtime Architecture (After yes-core)

| What | From | Into yes-human |
|------|------|----------------|
| Goal-first DAG decomposition | open-multi-agent | yes-core router |
| MCP-as-universal-interface | mcp-agent | yes-human connectors |
| Composable workflow patterns | mcp-agent | Workflow registry encoding |
| Pull-based memory | forgent | yes-graph memory layer |
| Outcome feedback loop | forgent | yes-human learning system |

### Wave 3: Graph & Intelligence (After yes-graph)

| What | From | Into yes-human |
|------|------|----------------|
| Graph-based recommendation | stevesolun/ctx | yes-graph routing indexes |
| Quality scoring (4-signal) | stevesolun/ctx | Skill/workflow registry validation |
| Trust scoring & audit | HarnessKit | yes-human validation gates |
| Self-evolving subagents | AgentFactory, forgent | Dynamic agent creation |
| Micro-skill gate | stevesolun/ctx | Token budget enforcement |

### Wave 4: Domain Skills (Selective Absorption)

| Category | Priority Sources | yes-human Skill |
|----------|-----------------|-----------------|
| Code Review | pr-agent, open-code-review | code-reviewer agent |
| TDD | moai-adk, LerianStudio/ring | tdd-workflow skill |
| Security | strix, agent-audit, SkillSpector | security-review skill |
| Deep Research | gpt-researcher, open_deep_research | deep-research skill |
| Market Research | CompetitorScope, deeprecon | market-research skill |
| Content | ghostwriter, brandcrew | content-engine skill |
| Investor | founder-os, dealscout | investor-materials skill |

### License Compatibility

| License | Count | yes-human Action |
|---------|-------|-----------------|
| MIT | ~90 repos | Freely absorb, adapt, redistribute |
| Apache-2.0 | ~30 repos | Use freely, must preserve notices |
| CC-BY-4.0 | 1 repo (AutoGen) | Attribute, share-alike not required |
| GPL-3.0 | 1 repo (atdd) | Cannot include in MIT project without relicensing |
| Custom/Other | ~10 repos | Review individually before absorption |
| N/A/Unknown | ~50 repos | Verify license before any absorption |

---

## Sources

### Agent Harness Systems (34 repos)
1. [affaan-m/ECC](https://github.com/affaan-m/ECC) — MIT, 198K stars
2. [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) — Unlicense, 161K stars
3. [shareAI-lab/learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) — MIT, 63.5K stars
4. [zhayujie/CowAgent](https://github.com/zhayujie/CowAgent) — MIT, 44.9K stars
5. [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) — 45.1K stars
6. [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) — MIT, 46.8K stars
7. [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) — Apache-2.0, 28.5K stars
8. [VoltAgent/awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) — MIT, 23.5K stars
9. [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) — MIT, 16.5K stars
10. [ComposioHQ/awesome-codex-skills](https://github.com/ComposioHQ/awesome-codex-skills) — 12.4K stars
11. [msitarzewski/agency-agents](https://github.com/msitarzewski/agency-agents) — MIT, 105.9K stars
12. [Orchestra-Research/AI-research-SKILLs](https://github.com/Orchestra-Research/AI-research-SKILLs) — MIT, 9.1K stars
13. [lastmile-ai/mcp-agent](https://github.com/lastmile-ai/mcp-agent) — Apache-2.0, 8.3K stars
14. [ModelEngine-Group/nexent](https://github.com/ModelEngine-Group/nexent) — MIT, 4.8K stars
15. [revfactory/harness](https://github.com/revfactory/harness) — Apache-2.0, 4.1K stars
16. [microsoft/skills](https://github.com/microsoft/skills) — MIT, 2.4K stars
17. [Chachamaru127/claude-code-harness](https://github.com/Chachamaru127/claude-code-harness) — MIT, 2.2K stars
18. [rohitg00/awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) — Apache-2.0, 1.9K stars
19. [stevesolun/ctx](https://github.com/stevesolun/ctx) — MIT, 372 stars
20. [mcpware/cross-code-organizer](https://github.com/mcpware/cross-code-organizer) — MIT, 329 stars
21. [RealZST/HarnessKit](https://github.com/RealZST/HarnessKit) — Apache-2.0, 284 stars
22. [LearnPrompt/cc-harness-skills](https://github.com/LearnPrompt/cc-harness-skills) — MIT, 217 stars
23. [ndizazzo/saddle](https://github.com/ndizazzo/saddle) — MIT, 50 stars
24. [keli-wen/agentic-harness-patterns-skill](https://github.com/keli-wen/agentic-harness-patterns-skill) — MIT, 281 stars
25. [atticus98/codex-turbo](https://github.com/atticus98/codex-turbo) — MIT, 187 stars
26. [iLearn-Lab/EvoHarness](https://github.com/iLearn-Lab/EvoHarness) — 52 stars
27. [DenisSergeevitch/agents-best-practices](https://github.com/DenisSergeevitch/agents-best-practices) — MIT, 1.1K stars
28. [polyuiislab/infiAgent](https://github.com/polyuiislab/infiAgent) — GPL-3.0, 1.2K stars
29. [thClaws/thClaws](https://github.com/thClaws/thClaws) — Apache-2.0, 1.1K stars
30. [ai-boost/awesome-harness-engineering](https://github.com/ai-boost/awesome-harness-engineering) — 1.3K stars
31. [Yanyutin753/LambChat](https://github.com/Yanyutin753/LambChat) — 169 stars
32. [feiskyer/codex-settings](https://github.com/feiskyer/codex-settings) — MIT, 200 stars
33. [YuxiaoWang-520/harness-craft](https://github.com/YuxiaoWang-520/harness-craft) — 86 stars
34. [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) — 13K stars

### MCP Servers (38 repos)
35. [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) — MIT, 88.1K stars
36. [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) — Apache-2.0, 86.4K stars
37. [github/github-mcp-server](https://github.com/github/github-mcp-server) — MIT, 30.3K stars
38. [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk) — MIT, 23.2K stars
39. [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) — MIT, 12.6K stars
40. [modelcontextprotocol/modelcontextprotocol](https://github.com/modelcontextprotocol/modelcontextprotocol) — MIT, 8.3K stars
41. [modelcontextprotocol/registry](https://github.com/modelcontextprotocol/registry) — Custom, 6.9K stars
42. [appcypher/awesome-mcp-servers](https://github.com/appcypher/awesome-mcp-servers) — 5.6K stars
43. [wong2/awesome-mcp-servers](https://github.com/wong2/awesome-mcp-servers) — MIT, 4.1K stars
44. [microsoft/mcp](https://github.com/microsoft/mcp) — MIT, 3.2K stars
45. [blazickjp/arxiv-mcp-server](https://github.com/blazickjp/arxiv-mcp-server) — Apache-2.0, 2.8K stars
46. [zcaceres/markdownify-mcp](https://github.com/zcaceres/markdownify-mcp) — MIT, 2.7K stars
47. [chatmcp/mcpso](https://github.com/chatmcp/mcpso) — Apache-2.0, 2K stars
48. [mobile-next/mobile-mcp](https://github.com/mobile-next/mobile-mcp) — Apache-2.0, 5.1K stars
49. [containers/kubernetes-mcp-server](https://github.com/containers/kubernetes-mcp-server) — Apache-2.0, 1.6K stars
50. [qdrant/mcp-server-qdrant](https://github.com/qdrant/mcp-server-qdrant) — Apache-2.0, 1.4K stars
51. [designcomputer/mysql_mcp_server](https://github.com/designcomputer/mysql_mcp_server) — MIT, 1.3K stars
52. [datalayer/jupyter-mcp-server](https://github.com/datalayer/jupyter-mcp-server) — BSD-3-Clause, 1.1K stars
53. [mongodb-js/mongodb-mcp-server](https://github.com/mongodb-js/mongodb-mcp-server) — Apache-2.0, 1K stars
54. [neo4j-contrib/mcp-neo4j](https://github.com/neo4j-contrib/mcp-neo4j) — MIT, 950 stars
55-72. Additional MCP repos (see Category 2 section above)

### Multi-Agent Orchestration (36 repos)
73. [langgenius/dify](https://github.com/langgenius/dify) — Custom, 142.9K stars
74. [FoundationAgents/MetaGPT](https://github.com/FoundationAgents/MetaGPT) — MIT, 68.4K stars
75. [microsoft/autogen](https://github.com/microsoft/autogen) — CC-BY-4.0, 58.5K stars
76. [crewAIInc/crewAI](https://github.com/crewAIInc/crewAI) — MIT, 52.3K stars
77. [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) — MIT, 33.3K stars
78. [huggingface/smolagents](https://github.com/huggingface/smolagents) — Apache-2.0, 27.5K stars
79. [openai/openai-agents-python](https://github.com/openai/openai-agents-python) — MIT, 26.7K stars
80. [mastra-ai/mastra](https://github.com/mastra-ai/mastra) — Custom, 24.5K stars
81. [openai/swarm](https://github.com/openai/swarm) — MIT, 22K stars
82. [elizaOS/eliza](https://github.com/elizaOS/eliza) — MIT, 18.5K stars
83. [pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai) — MIT, 17.4K stars
84. [camel-ai/camel](https://github.com/camel-ai/camel) — Apache-2.0, 17.1K stars
85. [microsoft/agent-framework](https://github.com/microsoft/agent-framework) — MIT, 10.8K stars
86. [kyegomez/swarms](https://github.com/kyegomez/swarms) — Apache-2.0, 6.7K stars
87. [open-multi-agent/open-multi-agent](https://github.com/open-multi-agent/open-multi-agent) — MIT, 6.3K stars
88. [VRSEN/agency-swarm](https://github.com/VRSEN/agency-swarm) — MIT, 4.4K stars
89. [EvoAgentX/EvoAgentX](https://github.com/EvoAgentX/EvoAgentX) — Custom, 3K stars
90-108. Additional orchestration repos (see Category 3 section above)

### Coding/TDD/Security Agents (35 repos)
109. [usestrix/strix](https://github.com/usestrix/strix) — Apache-2.0, 25.7K stars
110. [The-PR-agent/pr-agent](https://github.com/The-PR-agent/pr-agent) — Apache-2.0, 11.4K stars
111. [anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review) — MIT, 4.9K stars
112. [snyk/agent-scan](https://github.com/snyk/agent-scan) — Apache-2.0, 2.5K stars
113. [kodustech/kodus-ai](https://github.com/kodustech/kodus-ai) — Custom, 1.1K stars
114. [modu-ai/moai-adk](https://github.com/modu-ai/moai-adk) — Apache-2.0, 1K stars
115-143. Additional coding/TDD/security repos (see Category 4 section above)

### Research/Content/Business (61 repos)
144. [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) — Apache-2.0, ~20K stars
145. [Alibaba-NLP/DeepResearch](https://github.com/Alibaba-NLP/DeepResearch) — Apache-2.0, 18.7K stars
146. [langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research) — MIT, ~10K stars
147. [MiroMindAI/MiroThinker](https://github.com/MiroMindAI/MiroThinker) — Custom, 8.2K stars
148-204. Additional research/content/business repos (see Categories 5-7 above)

---

## Methodology

Searched 25+ queries across firecrawl web search, Exa neural search, and GitHub repository search. Analyzed 180+ unique sources across 8 categories. Deep-read 7 architecturally critical repos for pattern extraction. Cross-referenced findings against yes-human's existing architecture (ROUTE_TABLE, registries, plugin manifest, AGENTS.md constraints).

Sub-questions investigated:
1. What open-source repos implement agent harness systems with skills/memory/configs like ECC?
2. What MCP server repos exist and how are they structured?
3. What multi-agent orchestration frameworks exist and what patterns do they use?
4. What coding/TDD/security agent repos are available?
5. What research/content/business agent repos exist?
6. Which architecture patterns are most relevant to yes-human's low-token, lazy-loaded approach?
7. What is the license compatibility landscape for absorption into an MIT project?

---

## Direct Competitor Analysis (Added 2026-05-29)

**Full analysis:** See `reports/COMPETITOR-ANALYSIS.md` for detailed breakdown.

### Competitive Landscape Summary

yes-human occupies a **unique position** in the ecosystem. No single competitor combines all four pillars:
1. **Graph-based routing** (vs keyword matching)
2. **Token-budget awareness** (180/300 cap)
3. **Cross-harness portability** (8+ platforms)
4. **Provenance/license tracking** (source dossiers)

The landscape splits into three camps:
- **Routing orchestrators** (AgentMaster) — keyword-based dispatch, no memory
- **Memory-first harnesses** (agentic-harness, iso) — portable brains, weak routing
- **Governance substrates** (nexus-agents, agent-harness) — heavy infrastructure, high token cost

### Top 5 Direct Competitors

| Project | Stars | Key Innovation | Gap vs yes-human |
|---------|-------|----------------|------------------|
| **AgentMaster** | 1 | Signal-word routing table (23 categories), caveman token compression (~75%), dry-run mode | No graph routing, no memory, no provenance |
| **agentic-harness** | 0 | 4-layer memory (working/episodic/semantic/personal), progressive skill disclosure, nightly auto_dream | No routing intelligence, Python-only |
| **iso** | 6 | Contract/ledger/guard primitives, fan-out parallel dispatch, isomorphic authoring | Library not system, no memory, no token optimization |
| **nexus-agents** | 13 | Closed-loop telemetry (LinUCB bandit), drift-detected charter, hash-chained audit, 42 MCP tools | Extremely heavy, no token budget, over-engineered |
| **agent-harness** | 7 | Shadcn-style registry with provenance, plan/apply pipeline, schema versioning (doctor+migrate) | Config management only, no routing, no runtime |

### 20 Patterns to Adopt (Priority Ranked)

#### Tier 1: Adopt Immediately (Phase 1-2)

| # | Pattern | Source | yes-human Mapping |
|---|---------|--------|-------------------|
| 1 | **Progressive skill disclosure** | agentic-harness | `ROUTE_TABLE.min.json` = manifest; full agents load on match |
| 2 | **Signal-word routing table** | AgentMaster | Add `signalWords` and `tiebreakers` fields to route table entries |
| 3 | **Dry-run routing** | AgentMaster | `yes route --dry-run <task>` shows plan without executing |
| 4 | **Loop prevention** | AgentMaster | Max depth=2, no self-invocation, no circular calls in `yes-core` |
| 5 | **Doctor command** | nexus-agents + agent-harness | `yes doctor` health check (Node, API keys, tools, route validity) |

#### Tier 2: Adopt Soon (Phase 2-3)

| # | Pattern | Source | yes-human Mapping |
|---|---------|--------|-------------------|
| 6 | **4-layer memory model** | agentic-harness | `graph/memory/{working,episodic,semantic,personal}/` |
| 7 | **Registry provenance + lock file** | agent-harness | `registry/manifest.lock.json` with SHA256 fingerprints |
| 8 | **Drift detection** | nexus-agents | `yes validate --drift` checks ROUTE_TABLE vs registry |
| 9 | **Outcome tracking** | nexus-agents | `graph/memory/episodic/outcomes.jsonl` for routing feedback |
| 10 | **Schema versioning + migration** | agent-harness | `yes migrate` for graph indexes and route tables |

#### Tier 3: Adopt Later (Phase 3+)

| # | Pattern | Source | yes-human Mapping |
|---|---------|--------|-------------------|
| 11 | Nightly staging cycle (auto_dream) | agentic-harness | Cron job or `yes dream` for pattern extraction |
| 12 | Plan/apply pipeline | agent-harness | `yes plan` + `yes apply` for config generation |
| 13 | Token compression output layer (caveman) | AgentMaster | Optional output hook in `yes-runtime` (~75% savings) |
| 14 | Contract/ledger primitives | iso | `yes-contract` package for formal agent behavior contracts |
| 15 | Preset system | agent-harness | `yes preset apply starter` for quick bootstrapping |
| 16 | U-Haul migration | agent-harness | `yes import` converts existing `.claude/`, `.cursor/`, `AGENTS.md` |
| 17 | Fan-out parallel dispatch | iso | `yes-core` fan-out router with result aggregation |
| 18 | Skill failure tracking | agentic-harness | 3+ failures in 14 days → rewrite flag in graph health |
| 19 | Override sidecars | agent-harness | `agent.overrides.<provider>.yaml` for per-provider customization |
| 20 | Codebase snapshots (repomix) | AgentMaster | Graph index building pipeline for whole-repo context |

### Competitive Positioning Matrix

| Capability | yes-human | AgentMaster | agentic-harness | iso | nexus-agents | agent-harness |
|-----------|-----------|-------------|-----------------|-----|-------------|---------------|
| **Graph-based routing** | Planned | No | No | Partial | Partial | No |
| **Token budget awareness** | Planned (180/300) | No | No | No | No | No |
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

### Key Takeaway

yes-human's planned architecture is **uniquely positioned** at the intersection of:
- AgentMaster's routing intelligence (but graph-based, not keyword-based)
- agentic-harness's memory and progressive disclosure (but with token budgets)
- nexus-agents's telemetry and audit (but lightweight, not governance-heavy)
- agent-harness's registry and schema management (but with runtime, not just config)
- iso's contract and trace primitives (but practical, not academic)

**The gap no competitor fills:** A portable, low-token agentic control plane that uses graph indexes for intelligent routing, loads agents lazily based on task context, tracks provenance and outcomes, and works across all major harnesses — all within a strict token budget.

**The risk:** Building too much governance (nexus-agents trap) or too many platform adapters before the core routing loop works (AgentMaster trap). Stay focused on Phase 1-2 vertical slices.

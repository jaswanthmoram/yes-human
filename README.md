# Yes-human

Portable, low-token agentic control plane (v2.0.0). Routes tasks through a tiny boot surface and lazy-loads only the agents, skills, and workflows a task needs.

## Status

**Phase 0 Complete**: All planning artifacts, source maps, and validation infrastructure are in place. Ready for Phase 1 (yes-core) implementation.

**Key Achievements:**
- Architecture document (5,600+ lines) defines complete system design
- ECC deep research mapped 180+ repositories across 8 skill categories
- 14 critical architecture patterns identified for selective absorption
- Registry structure (17 JSON files) and folder layout aligned with architecture
- Validation scripts (`validate.js`, `eval-cost.js`) operational
- OpenCode MCP configuration complete (7 servers: firecrawl, exa, github, context7, memory, playwright, sequential-thinking)

**Next:** Phase 1 — Build `yes-core` (policy evaluation, validation, trust scoring)

## Quick start

```bash
npm install
npm run validate     # schemas, registries, routes, dossiers
npm test             # unit tests (router, promotion gate, markitdown)
npm run eval:cost    # startup token budget
node packages/yes-cli/index.js doctor   # environment + project health
```

## Document conversion (MarkItDown)

The `convertToMarkdown` tool shells out to [Microsoft MarkItDown](https://github.com/microsoft/markitdown)
to turn PDFs, Word/PowerPoint/Excel files, and images into Markdown. It is a Python
dependency, so install it into a project-local virtual environment:

```bash
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

The tool auto-detects the interpreter in this order: `YES_PYTHON` env var → `.venv/` →
system `python3`. Embedded images are **not** OCR'd — MarkItDown extracts the text layer
only. When a document contains images, the tool appends an LLM-facing notice listing them
so a vision-capable model can decide whether to inspect them. Pass `{ detailed: true }` to
get `{ markdown, images, hasImages }` instead of a string.

## Key paths

| Path | Purpose |
|------|---------|
| `YES_BOOT.md` | Startup boot text (~60–180 tokens) |
| `graph/indexes/ROUTE_TABLE.min.json` | Hot keyword → route_id map |
| `registry/routes.json` | Full route definitions (lazy-loaded) |
| `registry/*.json` | Agent, skill, workflow, and policy indexes (17 files) |
| `packages/yes-schema/` | JSON schemas and validator |
| `yes-human.plugin.json` | Plugin manifest |
| `opencode.json` | OpenCode MCP configuration (7 servers) |

## Documentation

### Planning & Strategy
- `YES-HUMAN_DEVELOPMENT_PLAN.md` — Phased engineering roadmap with ECC source map integration
- `YES-HUMAN_REVIEW_AND_AGENT_CREATION_PLAN.md` — Review findings, blockers, and agent creation strategy
- `YES-HUMAN_SOURCE_MAP.md` — Validated source registry for agent/workflow creation

### Architecture
- `yes-human-agentic-system-architecture.md` — Complete system architecture (5,600+ lines)

### Research
- `reports/ECC-SKILL-SOURCE-MAP-DEEP-RESEARCH.md` — Deep research: 180+ repos, 14 architecture patterns, 8 categories
- `reports/COMPETITOR-ANALYSIS.md` — Direct competitor analysis: 5 closest projects, 20 adoption patterns, competitive positioning matrix

## Architecture Highlights

**Core Principle:** The host loads only a tiny router. The router loads only the exact agent, skill, workflow, and graph slice needed for the task.

**Target Startup Context:** 60-180 tokens (hard cap: 300 tokens)

**System Layers:**
1. `yes-core` — Policy evaluation, validation, trust scoring
2. `yes-runtime` — Execution, spawner, traces
3. `yes-graph` — Multi-tiered routing (Trie, SQLite, semantic fallback)
4. `yes-workflows` — Composable orchestration patterns
5. `yes-adapters` — Host bundles (Claude, Codex, CLI, MCP, Cursor, Windsurf, Generic)

**ECC Integration:** Selectively absorbing patterns from 180+ repositories:
- PlanCard pattern (`forgent`) for structured route output
- 4-signal quality scoring (`ctx`) for skill/workflow validation
- 6 team topologies (`harness`) for workflow coordination hints
- Anti-rationalization tables (`agent-skills`) for skill contracts
- Goal-first DAG decomposition (`open-multi-agent`) for runtime routing

## License

MIT — see [LICENSE](LICENSE).

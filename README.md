# Yes-human

[![CI](https://github.com/jaswanthmoram/yes-human/actions/workflows/ci.yml/badge.svg)](https://github.com/jaswanthmoram/yes-human/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E%3D20-blue.svg)](https://nodejs.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/jaswanthmoram/yes-human/blob/master/CONTRIBUTING.md)

Yes-human is a portable, low-token routing and orchestration layer for AI assistant hosts. It keeps startup context tiny, deterministically routes natural-language tasks to provenance-gated agents, skills, and workflows, then exports the same canonical content to multiple host formats. It is an open-source control plane, not an LLM or a replacement for professional judgment in regulated domains.

## Production Scope

| Capability             | Current status                                                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Agents                 | 325 registered agents across 18 domains                                                                                             |
| Skills                 | 389 registered skills with stub detection in CI                                                                                     |
| Workflows              | 119 deterministic workflow entries                                                                                                  |
| Routes                 | 445 route definitions and 2,526 hot-route phrases                                                                                   |
| Startup budget         | `YES_BOOT.md` held under the 180 token target                                                                                       |
| High-stakes work       | Finance, legal, HR, and healthcare routes require disclaimer and human review gates                                                 |
| Host bundles           | Claude, Codex, OpenCode, MCP, Cursor, Windsurf, VS Code, Sourcegraph, and Generic                                                   |
| Security baseline      | Env-var secret references, CI secret scan, pre-commit gitleaks hook                                                                 |
| OSS runtime primitives | Semantic fallback, fan-out plans, RBAC, tenant/project trace isolation, retention, connector protocol, signed manifest verification |

## Install

```bash
npm ci
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

Node 20 or newer is required. CI runs Node 22 and 24.

## Quickstart

```bash
npm run yes -- status
npm run yes -- route "review code" --dry-run
npm run yes -- run "expense audit" --trace
npm run yes -- persona set developer
npm run yes -- build cursor
```

## Open-Source Scope

The repository is intended to be fully open source at the code and architecture level. Public scope includes:

- routing, registries, schemas, validation, and promotion gates
- agent, skill, workflow, and adapter generation logic
- deterministic semantic fallback, fan-out workflow planning, RBAC primitives, and connector adapter protocol
- tenant/project trace isolation, private-trace redaction, retention rules, graph build/query, and document-to-Markdown conversion
- signed generic host manifests and validation checks for generated host bundles

Hosted offerings, if published later, are deployment layers around the open repository rather than hidden core logic. Kept as future deployment work only: hosted login/invites/org administration, billing, customer-managed retention operations, managed connector operations, hosted sandbox execution at scale, rollout/eval infrastructure for hosted semantic routing, and paid parallel execution quotas/cost controls.

Run the full local gate before publishing changes:

```bash
npm run detect:skill-stubs
npm run validate
npm test
node packages/yes-cli/index.js eval route
npm run eval:cost
npm run doctor
node packages/yes-cli/index.js build all
```

## How Routing Works

1. The host loads `YES_BOOT.md`, a tiny boot contract pointing at the router.
2. `hooks/pre-route.js` applies budget, safety, signal-word, loop-prevention, and persona gates.
3. `packages/yes-runtime/router.js` resolves exact phrases, aliases, phrase-trie matches, code-graph assist, deterministic semantic fallback, and fallback routes.
4. The selected route lazy-loads the target domain master, agent, skills, workflow, optional graph context, and connector hints.
5. `hooks/post-route.js` records route metadata without mutating production registries.
6. `yes run --trace` writes structured per-invocation trace JSON to stderr and `staging/traces/<date>.jsonl`.

## Supported Hosts

| Host        | Build command                      | Output                   |
| ----------- | ---------------------------------- | ------------------------ |
| Claude      | `npm run yes -- build claude`      | `generated/claude/`      |
| Codex       | `npm run yes -- build codex`       | `generated/codex/`       |
| OpenCode    | `npm run yes -- build opencode`    | `generated/opencode/`    |
| MCP         | `npm run yes -- build mcp`         | `generated/mcp/`         |
| Cursor      | `npm run yes -- build cursor`      | `generated/cursor/`      |
| Windsurf    | `npm run yes -- build windsurf`    | `generated/windsurf/`    |
| VS Code     | `npm run yes -- build vscode`      | `generated/vscode/`      |
| Sourcegraph | `npm run yes -- build sourcegraph` | `generated/sourcegraph/` |
| Generic     | `npm run yes -- build generic`     | `generated/generic/`     |

## Domains

| Domain             | Scope                                                           |
| ------------------ | --------------------------------------------------------------- |
| `data-ai`          | Analytics engineering, ML systems, evaluations, experimentation |
| `design-content`   | UX, UI, presentations, copy, content systems                    |
| `education`        | Curriculum, assessment, tutoring, learning operations           |
| `engineering`      | Architecture, testing, review, refactoring, language patterns   |
| `finance`          | Informational finance analysis, expense, payroll, FP&A          |
| `healthcare`       | Informational healthcare workflows with human review gates      |
| `hr`               | Hiring, policies, performance, people operations                |
| `integrations`     | Figma, Notion, Stripe, MCP, connector design                    |
| `legal-compliance` | Informational contract, privacy, policy, compliance workflows   |
| `manufacturing`    | Operations, quality, supply chain, reliability                  |
| `marketing`        | Growth, campaigns, brand, lifecycle, channels                   |
| `meta-system`      | Routing, graph building, adapter generation, cost control       |
| `platform`         | Cloud, release, SRE, container, infrastructure operations       |
| `product-business` | Product strategy, CEO/CTO/CFO advisory, pricing, growth         |
| `research`         | Market, technical, academic, and evidence synthesis             |
| `sales`            | Account, deal, pricing, forecast, and follow-up workflows       |
| `security`         | Threat modeling, review, detection, incident workflows          |
| `startup-ops`      | Fundraising, pitch, operations, planning                        |

## Adding Agents And Skills

1. Add or edit content under `content/agents/<domain>/` or `content/skills/<domain>/`.
2. Include triggers, negative keywords where needed, verification, rollback, and permissively licensed source references.
3. Add or update routing fixtures under `tests/routing/`.
4. Stage external contributions with `npm run yes -- contribute agent <path>` or `npm run yes -- contribute skill <path>`.
5. Run the full local gate before opening a PR.

## Security And Secrets

Committed secrets are not allowed. Use env-var references such as `{env:EXA_API_KEY}` or `{env:OPENAI_API_KEY}` in configs and generated host bundles. CI runs gitleaks, and contributors should enable the pre-commit hook from `.pre-commit-config.yaml`.

High-stakes domains are informational only. Finance, legal-compliance, HR, and healthcare agents carry disclaimer and human-review gates; users remain responsible for professional review.

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

| Path                                 | Purpose                                                                                 |
| ------------------------------------ | --------------------------------------------------------------------------------------- |
| `YES_BOOT.md`                        | Startup boot text (~60–180 tokens)                                                      |
| `graph/indexes/ROUTE_TABLE.min.json` | Hot keyword → route_id map                                                              |
| `registry/routes.json`               | Full route definitions (lazy-loaded)                                                    |
| `registry/*.json`                    | Agent, skill, workflow, connector, and category-pack indexes                            |
| `packages/yes-schema/`               | JSON schemas and validator                                                              |
| `packages/yes-connectors/`           | Generic OSS connector adapter protocol over `registry/mcps.json` and connector profiles |
| `yes-human.plugin.json`              | Plugin manifest                                                                         |
| `staging/traces/`                    | Local `yes run --trace` JSONL output (gitignored)                                        |

## Documentation

- `README.md` — Overview, install, quickstart, routing model, and supported hosts
- `CONTRIBUTING.md` — Contributor workflow, source dossier expectations, route fixture rules, and validation gate
- `SECURITY.md` — Security policy and disclosure process
- `VERSIONING.md` — Versioning and release policy
- `CHANGELOG.md` — Release history

Internal planning, architecture-draft, and research/source-map documents are kept out of the published repository; their decisions are reflected directly in code, schemas, tests, and registries.

## Architecture Highlights

**Core Principle:** The host loads only a tiny router. The router loads only the exact agent, skill, workflow, and graph slice needed for the task.

**Target Startup Context:** 60-180 tokens (hard cap: 300 tokens)

**System Layers:**

1. `yes-core` — Policy evaluation, validation, trust scoring
2. `yes-runtime` — Execution, spawner, traces
3. `yes-graph` — Multi-tiered routing (Trie, SQLite, semantic fallback)
4. `yes-workflows` — Composable orchestration patterns
5. `yes-adapters` — Host bundles for Claude, Codex, OpenCode, MCP, Cursor, Windsurf, VS Code, Sourcegraph, and Generic

## Phase 9 CLI

```bash
node packages/yes-cli/index.js evaluator status
node packages/yes-cli/index.js evaluator trace --task "..." --route route.engineering.code-reviewer --success true
node packages/yes-cli/index.js evaluator outcome --route route.engineering.code-reviewer --success false --failure-class wrong-agent
node packages/yes-cli/index.js feedback wrong-agent --trace <trace-id> --route <old-route> --suggested-route <new-route>
node packages/yes-cli/index.js workflow suggest
node packages/yes-cli/index.js trainer report
node packages/yes-cli/index.js team status
node packages/yes-cli/index.js offline status
node packages/yes-cli/index.js recover resume
```

Feedback, workflow suggestions, and trainer output are staging/report artifacts only. They never mutate `registry/routes.json` or `graph/indexes/ROUTE_TABLE.min.json` directly.

**ECC Integration:** Selectively absorbing patterns from 180+ repositories:

- PlanCard pattern (`forgent`) for structured route output
- 4-signal quality scoring (`ctx`) for skill/workflow validation
- 6 team topologies (`harness`) for workflow coordination hints
- Anti-rationalization tables (`agent-skills`) for skill contracts
- Goal-first DAG decomposition (`open-multi-agent`) for runtime routing

### Learning loop (operator)

1. Capture outcomes with `yes evaluator trace` / `yes evaluator outcome`.
2. File proposals with `yes feedback wrong-agent` (or other failure classes).
3. Review staging reports and run `yes evaluator gate` before any promotion.
4. Promote agents only via dossier + `quality_gate: production` checks (`npm run audit:promotion`).
5. Optional non-deterministic hints: set `routing_hints.enabled: true` in `registry/learning-policy.json` (default `false`).

Semantic fallback is implemented in `packages/yes-runtime/router.js` and enabled by `registry/graph-routing.json`. It uses deterministic local token-overlap scoring over public route keywords/aliases after exact, alias, trie, and code-graph assist stages.

### OSS absorb

```bash
npm run yes -- absorb stage <github-url>
npm run yes -- absorb apply <slug>          # provenance + rollback record
npm run yes -- absorb copy-skills <slug>    # copy SKILL.md trees into content/skills/
npm run yes -- absorb rollback <change-id>
```

### Runtime execution

```bash
npm run yes -- run "review code"              # route plan only
npm run yes -- run "review code" --execute    # dry-run execution card
npm run yes -- run "review code" --execute --local  # read-only local agent load
```

Runtime traces are tenant/project scoped under `graph/memory/tenants/<tenant-hash>/projects/<project-hash>/`, redacted before write, and annotated with retention metadata from `registry/retention-policy.json`. RBAC primitives live in `registry/rbac.json` and `packages/yes-core/rbac.js`; workflow execution checks these primitives before non-dry-run orchestration.

### MCP connector profiles

Set `YES_CONNECTOR_PROFILE` to `minimal` (default), `research`, or `enterprise` (see `registry/connector-profiles.json`). `npm run doctor` only checks env vars for MCPs listed in the active profile's `enable` array. Copy keys from `.env.example`; keep optional MCPs disabled in `registry/mcps.json` until you opt in.

## License

MIT — see [LICENSE](LICENSE).

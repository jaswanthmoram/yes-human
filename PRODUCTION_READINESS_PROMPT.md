# Codex Task: Make `yes-human` Production-Ready

You are working on **`yes-human`** — a portable, low-token, multi-host agentic control plane (Node.js monorepo, ESM, Node 26). It routes natural-language tasks to 325 domain agents across 18 domains using a deterministic PhraseTrie kernel, enforces a boot-token budget, gates high-stakes work behind disclaimers, and exports the same canonical content to 9 host targets (Claude Code, Cursor, Windsurf, Codex, OpenCode, VS Code, Sourcegraph, Generic, OpenAI).

The architecture is complete and 100% of routing fixtures pass. Your job is to close the gap between **"architecturally complete"** and **"genuinely production-ready open-source project."** Do this in the phases below, in order, committing after each phase passes its gate. Do not skip gates.

---

## NON-NEGOTIABLE CONSTRAINTS (read first, never violate)

1. **SECRETS — NEVER hardcode API keys.** All secrets must be referenced as `{env:VAR_NAME}` (e.g. `{env:EXA_API_KEY}`). `opencode.json` and every committed file must use env-var references only. If you find a hardcoded key anywhere, replace it with an env-var reference and report it. Users bring their own keys.
2. **Determinism must hold.** `node packages/yes-cli/index.js eval route` must stay at **100.0% top-1** on all fixtures. If a content change breaks routing, fix the fixture expectation ONLY if the new route is genuinely correct; otherwise fix the content.
3. **Boot budget.** `npm run eval:cost` must keep `YES_BOOT.md` **≤180 tokens** (hard cap 300).
4. **No regressions.** `npm test` must stay green (currently 163 tests, 0 failures). `npm run validate` must pass. `npm run doctor` must pass.
5. **Provenance.** Every agent/skill cites real, permissively-licensed sources (MIT, Apache-2.0, BSD, ISC, CC0). No GPL/AGPL code copied — "patterns_only" reference is acceptable for those. Dossiers must score ≥80.
6. **Commit hygiene.** Conventional commits. One phase per commit (or logical sub-commits within a phase). Branch off `master`; do not force-push. Push only when a phase's gate is green.

---

## THE FULL VERIFICATION GATE (run after every phase)

```bash
npm run validate                                   # schemas, dossiers, lifecycle
npm test                                           # unit suite — must be 0 failures
node packages/yes-cli/index.js eval route          # must be 100.0% top-1
npm run eval:cost                                   # boot ≤180 tokens
npm run doctor                                      # all checks green
node packages/yes-cli/index.js build all           # all 9 host bundles valid
```

A phase is NOT done until all six are green. If any fails, fix before moving on.

---

## PHASE 0 — Orient and capture baseline

1. Read these files to understand the system (do not edit them):
   - `yes-human-agentic-system-architecture.md` (the spec — large; skim §17A CLI, §24 acceptance, §28 hosts, §32.4 specialists, §34.2 personas)
   - `README.md`, `AGENTS.md`, `YES_BOOT.md`
   - `packages/yes-cli/index.js` (the CLI entrypoint and command switch)
   - `packages/yes-schema/validate.js`, `eval-route.js`, `eval-cost.js`
   - `hooks/pre-route.js` (the pre-route hook chain)
   - One good skill for the quality bar: `content/skills/data-ai/a-b-testing-ml/SKILL.md`
   - One good agent: `content/agents/engineering/architect.md`
2. Run the full verification gate and record the baseline numbers in your working notes.
3. There are uncommitted changes in the working tree from a prior session (≈29 new/modified skill files under `content/skills/`). **Inspect them, confirm they meet the quality bar (see Phase 1), then include them in the Phase 1 commit.** Do not discard them.

---

## PHASE 1 — Finish all stub skills to the quality bar

**Problem:** Some skill files are high-quality, but a number are "stub" templates with generic bodies ("Execute procedure", "Clarify inputs / Apply dossier patterns / Verify outputs"), a single fake source reference, and bodies under ~800 characters. Every agent routes correctly, but when invoked, a stub skill gives no real guidance.

### 1a. Detect every stub programmatically (do not trust a hardcoded list)

Write and run a detection script that scores each `content/skills/**/SKILL.md` on these signals and flags any scoring below the threshold:

- Body length > 800 chars → +2
- More than 5 list items in `steps:` → +2
- Has real `source_references` with actual GitHub URLs (not `ref.github.ecc.2026-05-29` placeholder) → +2
- Has a real `prerequisites:` block → +1
- Has `rollback` or `no_write` → +1
- Has a `## Verification` section → +1
- Cites a non-ECC github.com URL → +1

Anything scoring **< 8** is a stub or near-stub and must be rewritten. Print the full list with paths and scores before you start rewriting.

### 1b. Rewrite every flagged skill to this exact template

```markdown
---
id: <domain>.<skill-id>
name: <Descriptive Name>
version: 1.0.0
domain: <domain>
category: <domain>.<category>
purpose: <One clear sentence: what this skill does and why.>
summary: <2-3 sentences: the core method and the output.>
triggers:            # 5 realistic trigger phrases
  - <phrase>
activation_triggers: # 2 natural-language phrases
  - <phrase>
prerequisites:       # concrete, checkable
  - <prerequisite>
inputs:
  - <input>
steps:               # 6+ SPECIFIC steps — name real tools/commands/metrics
  - <step>
outputs:
  - <output>
tools:
  - filesystem.read
quality_gates:
  - <gate>
failure_modes:
  - <failure>
handoffs:
  - <agent.id> (for <reason>)
source_references:   # ≥2 REAL repos, by URL + license + specific usage
  - url: https://github.com/<owner>/<repo>
    license: MIT
    used_for: <specific pattern taken>
allowed_agents:
  - <domain>.<agent>
status: active
budget_band: standard
rollback:
  - <how to undo>
# requires_disclaimer: true   # REQUIRED for finance, legal-compliance, hr, healthcare skills
validators:
  - skill.validator
---

## Trigger
<2-3 sentences: when to use>

## Prerequisites
- <detailed>

## Steps
### 1. <Title>
<2-3 sentences of concrete, tool-specific guidance>
### 2. … (6+ numbered, real)

## Verification
- [ ] <concrete check>

## Rollback
<how to undo>

## Common Failures
| Failure | Cause | Fix |
|---------|-------|-----|
| <f> | <c> | <fix> |

## Examples
**Example A:** <typical use>
**Example B:** <edge case>
```

### 1c. Source map — use these real, permissive repos (pick the ones that fit each skill)

| Area | Repos (license) |
|---|---|
| Testing | stryker-mutator/stryker-js (Apache-2.0), pact-foundation/pact-js (MIT), faker-js/faker (MIT), facebook/jest (MIT), istanbuljs/nyc (ISC), testcontainers/testcontainers-node (MIT), goldbergyoni/nodebestpractices (MIT) |
| E2E | microsoft/playwright (Apache-2.0), vercel-labs/agent-browser (Apache-2.0) |
| DB/Query | prisma/prisma (Apache-2.0), drizzle-team/drizzle-orm (Apache-2.0), pganalyze/pganalyze-collector (BSD-3-Clause) |
| Lang review | microsoft/TypeScript, psf/black, PyCQA/flake8, golang/go, golangci/golangci-lint, rust-lang/rust, JetBrains/kotlin, pinterest/ktlint, isocpp/CppCoreGuidelines, llvm/llvm-project, apple/swift, nicklockwood/SwiftFormat, google/error-prone |
| Security | anthropics/claude-code-security-review (MIT), OWASP/CheatSheetSeries (CC0-1.0), semgrep/semgrep (LGPL → patterns_only) |
| Refactor/Plan | Aider-AI/aider (Apache-2.0), garrytan/gstack (MIT), eyaltoledano/claude-task-master (MIT) |
| Data/Analytics | dbt-labs/dbt-core (Apache-2.0), great-expectations/great_expectations (Apache-2.0), apache/airflow (Apache-2.0) |
| Platform/Release | kubernetes/kubernetes (Apache-2.0), argoproj/argo-cd (Apache-2.0), semantic-release/semantic-release (MIT), conventional-changelog/conventional-changelog (MIT) |
| Product/Sales/Mktg | PostHog/posthog (MIT), TwentyHQ/twenty (Apache-2.0), makeplane/plane (Apache-2.0), hardikpandya/stop-slop (MIT), withastro/astro (MIT) |
| Finance/HR/Legal | actualbudget/actual (MIT), clef/handbook (CC0-1.0), open-agreements/open-agreements (MIT) |
| Design | storybookjs/storybook (MIT), reveal.js (MIT), mermaid-js/mermaid (MIT), shadcn-ui/ui (MIT) |
| Integrations | figma/figma-developer-platform (Apache-2.0), stripe/stripe-node (MIT), modelcontextprotocol/servers (Apache-2.0), modelcontextprotocol/registry (MIT) |
| Meta-system | microsoft/graphrag (MIT), lastmile-ai/mcp-agent (MIT), plus this repo's own `packages/yes-graph` and `packages/yes-adapters` patterns |

### 1d. Cross-check agent↔skill coverage

For every agent in `registry/agents.json`, confirm a matching skill exists for its core capability. The 7 specialists added in the last gap-close wave (`engineering.security-reviewer`, `engineering.e2e-runner`, `engineering.refactor-cleaner`, `product-business.cfo-advisor`, `product-business.growth-marketer`, `design-content.ui-ux-designer`, `marketing.brand-manager`) and any language-reviewer agents must each have a real skill. Create any missing ones using the template above.

### 1e. Recompile and gate

```bash
node packages/yes-cli/index.js compile   # refresh registry/skills.json + indexes
```
Then run the **full verification gate**. Fix any routing fixture drift (only adjust an expected_route if the new route is genuinely correct). Commit:
`feat(skills): rewrite all stub skills to production quality with real OSS sources`

---

## PHASE 2 — Continuous Integration

Create `.github/workflows/ci.yml` that runs on push and PR to `master`:

- Matrix: Node 22 and 24 (use `actions/setup-node`).
- Steps: checkout → `npm ci` → `npm run validate` → `npm test` → `node packages/yes-cli/index.js eval route` → `npm run eval:cost` → `npm run doctor` → `node packages/yes-cli/index.js build all`.
- Fail the build if any step fails. Upload no secrets. Cache `node_modules` via `actions/setup-node` cache.

Add a status badge to `README.md`. Commit: `ci: add GitHub Actions gate (validate, test, eval, doctor, build)`.

---

## PHASE 3 — Secret scanning (defense for the secrets constraint)

1. Add `.gitleaks.toml` configured to detect API keys, and a second CI job `secret-scan` using `gitleaks/gitleaks-action`.
2. Add a `.pre-commit-config.yaml` with a gitleaks hook so secrets are caught before commit.
3. Scan the entire git history for any leaked key (`gitleaks detect --source . --log-opts="--all"`). If any committed secret is found, report it clearly in your final summary (do NOT attempt history rewrite without flagging it — that's a human decision).
4. Verify `opencode.json` and all configs use `{env:VAR}` references only.

Commit: `ci: add gitleaks secret scanning (CI job + pre-commit hook)`.

---

## PHASE 4 — Runtime observability (`--trace`)

Currently all evaluation is static fixture matching; there is no per-invocation visibility. Add a `--trace` flag to `yes run` (in `packages/yes-cli/index.js`):

- When `yes run "<task>" --trace` is used, emit a structured JSON trace to stderr (and append to `staging/traces/<date>.jsonl`) containing: input, matched route, hook chain decisions (budget/safety/signal-words/loop-prevention/persona), selected agent, budget_band, estimated tokens, and whether a disclaimer gate fired.
- Keep stdout clean (human-readable plan card unchanged); trace goes to stderr/file only.
- Add a test in `tests/` asserting a trace is emitted with the required fields for a known input.

Commit: `feat(cli): add --trace for per-invocation routing observability`.

---

## PHASE 5 — End-to-end smoke test

There is no proof the full loop works beyond fixture matching. Add `tests/e2e/smoke.test.js` that, **without calling any external LLM** (keep it offline/deterministic):

1. Routes 5 representative tasks (one engineering, one finance/high-stakes, one marketing, one ambiguous, one unknown→fallback) through the real `resolveRoute` + pre-route hook chain.
2. Asserts: correct agent selected, disclaimer gate fires for the high-stakes one, fallback fires for the unknown one, and the loaded context pack stays within its budget band.
3. Asserts a host bundle for at least one target can be built and re-parsed.

Commit: `test(e2e): add offline end-to-end smoke test for full routing loop`.

---

## PHASE 6 — Docs and release readiness

1. **README.md** — rewrite the top into a real open-source README: one-paragraph what/why, install (`npm ci`), quickstart (`yes status`, `yes route "..."`, `yes run "..."`, `yes persona set developer`, `yes build cursor`), the 9 supported hosts, how routing works (1 diagram or bullet flow), how to add an agent/skill, the security/secrets policy (env-var refs), and a contributing section pointing at `yes contribute`. Keep it honest about scope (it's a routing+orchestration layer, not an LLM or a SaaS).
2. **CONTRIBUTING.md** — how to add agents/skills/workflows, the dossier ≥80 rule, the fixture requirement, the full gate contributors must pass.
3. **SECURITY.md** — the env-var secrets policy, how to report a vulnerability, the high-stakes disclaimer model.
4. **CHANGELOG.md** — generate from conventional commits (`conventional-changelog`), seeded with a `v2.1.0` entry summarizing this production-readiness work.
5. Confirm `LICENSE` is present and correct (MIT). Ensure every domain in `content/` is represented in the README's capabilities table.

Commit: `docs: production-ready README, CONTRIBUTING, SECURITY, CHANGELOG`.

---

## FINAL ACCEPTANCE CHECKLIST (you are done only when ALL are true)

- [ ] Zero stub skills remain — every `SKILL.md` scores ≥8 on the detector, has ≥2 real OSS sources, ≥6 concrete steps, verification + rollback sections.
- [ ] Every agent has a matching real skill; the 7 gap-close specialists + language reviewers all have skills.
- [ ] `npm run validate` ✅  `npm test` ✅ (0 failures)  `eval route` = 100.0% ✅  `eval:cost` ≤180 ✅  `doctor` ✅  `build all` = 9/9 ✅
- [ ] `.github/workflows/ci.yml` exists and is green; README has a CI badge.
- [ ] Gitleaks CI job + pre-commit hook exist; full-history scan run; any finding reported.
- [ ] No hardcoded secrets anywhere; all configs use `{env:VAR}`.
- [ ] `yes run --trace` emits structured traces; covered by a test.
- [ ] Offline E2E smoke test passes (routing + disclaimer gate + fallback + bundle round-trip).
- [ ] README, CONTRIBUTING, SECURITY, CHANGELOG present and accurate.
- [ ] All work committed in logical conventional commits and pushed to `origin/master`.
- [ ] Clean up: remove any leftover temp worktrees/branches; `git status` is clean.

## DELIVERABLE

When finished, output a concise report: what changed per phase, the final gate numbers, agent/skill/workflow counts, any secret-scan findings, and an honest statement of remaining limitations (e.g. no latency measurement / no live multi-tenant runtime — these are out of scope). Do not claim "does everything" — state the real, defensible scope: a portable, low-token, deterministic multi-host agent routing + orchestration layer with provenance-gated content packs.

---

### Working style
- Prefer editing existing files over creating new ones; reuse the CLI's existing command patterns.
- Make independent edits in parallel; only serialize when there's a real dependency.
- After each phase, run the gate and commit before continuing. If a gate fails, stop and fix — never push red.
- If genuinely blocked on a decision only the maintainer can make (e.g. git-history rewrite for a leaked secret), stop and ask. Otherwise make the reasonable call and keep going.

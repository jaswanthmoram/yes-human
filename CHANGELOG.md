# Changelog

All notable changes to this project are documented here. This project uses conventional commits for release notes.

## v2.2.0 - 2026-06-02

### Added

- **325/325 agents** at `quality_gate: production` with `npm run audit:promotion` and `audit:dossiers:strict` in CI.
- Promotion tooling: `promote-all-agents.mjs`, `section-32-4-gap.mjs`, `sync-dossier-promotion-decision.mjs`, bulk `uplift-dossiers.mjs --domain`.
- `yes absorb copy-skills` and `scripts/absorb-skills-from-staging.mjs` for staging → `content/skills/` copy with ledger + rollback updates.
- Runtime **spawner** (`packages/yes-runtime/spawner.js`) and `yes run --execute` / `--local` modes.
- Semantic routing flag stub (`registry/graph-routing.json` `semantic_fallback: false`).
- `YES_CONNECTOR_PROFILE`-scoped `yes doctor` MCP env checks.
- Phase 11 acceptance report (`npm run report:phase11`).

### Changed

- README documents learning ops, OSS absorb, runtime execution, and connector profiles.
- Phase 9 acceptance generator uses correct skill eval accuracy regex.

## v2.1.0 - 2026-06-03

### Added

- Production skill quality gate with `npm run detect:skill-stubs`.
- GitHub Actions CI for validation, tests, route eval, cost eval, doctor, and host bundle builds.
- Gitleaks CI and pre-commit secret scanning.
- `yes run --trace` structured routing observability with JSONL trace persistence.
- Offline E2E smoke tests covering routing, hooks, high-stakes disclaimer gates, fallback, budget checks, and host bundle round-trip validation.
- Production-facing README, contribution guide, and security policy.

### Changed

- All skill stubs were uplifted to concrete production guidance with verification, rollback, and OSS provenance.
- README now documents the defensible project scope: deterministic multi-host routing and orchestration, not an LLM or SaaS runtime.

### Security

- Documented env-var-only secret references and high-stakes human review requirements.

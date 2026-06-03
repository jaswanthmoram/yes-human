## 2.4.0 - 2026-06-03

### Added

- Public deterministic semantic fallback routing in `packages/yes-runtime/router.js`, enabled by `registry/graph-routing.json`.
- Public RBAC primitives (`packages/yes-core/rbac.js`, `registry/rbac.json`) and workflow execution checks.
- Tenant/project-scoped trace paths plus retention metadata and pruning helpers (`registry/retention-policy.json`, `packages/yes-runtime/retention.js`).
- Generic connector adapter protocol in `packages/yes-connectors/` over `registry/mcps.json` and connector profiles.
- Fan-out workflow planning for workflows with `route.parallel: true`.
- Signed generic manifest verification in host bundle validation.

### Changed

- Docs now describe semantic routing, fan-out, RBAC, tenant/project isolation, retention, connectors, and signed manifests as public OSS core capabilities.
- Hosted-only concerns are limited to deployment layers such as auth, billing, managed connectors, hosted retention operations, sandbox scaling, rollout infrastructure, and quota/cost controls.

## 2.3.0

Architecture OSS-core completion (waves 12–20).

# Changelog

All notable changes to this project are documented here. This project uses conventional commits for release notes.

## v2.2.0 - 2026-06-02

### Added

- **325/325 agents** at `quality_gate: production` with `npm run audit:promotion` and `audit:dossiers:strict` in CI.
- Promotion tooling: `promote-all-agents.mjs`, `section-32-4-gap.mjs`, `sync-dossier-promotion-decision.mjs`, bulk `uplift-dossiers.mjs --domain`.
- `yes absorb copy-skills` and `scripts/absorb-skills-from-staging.mjs` for staging → `content/skills/` copy with ledger + rollback updates.
- Runtime **spawner** (`packages/yes-runtime/spawner.js`) and `yes run --execute` / `--local` modes.
- Initial graph-routing config placeholder for semantic fallback (superseded by the public v2.4 implementation).
- `YES_CONNECTOR_PROFILE`-scoped `yes doctor` MCP env checks.
- Phase 11 acceptance report (`npm run report:phase11`).

### Changed

- README documents learning ops, OSS absorb, runtime execution, and connector profiles.
- Phase 9 acceptance generator uses correct skill eval accuracy regex.
- OSS-facing docs now describe the repository as the public source of truth for core routing, orchestration, adapters, validation, and future feature work; hosted SaaS concerns are listed separately as future deployment work.

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

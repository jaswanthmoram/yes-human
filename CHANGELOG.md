# Changelog

All notable changes to this project are documented here. This project uses conventional commits for release notes.

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

# Yes-human OSS Core Status

**Last Updated:** 2026-06-03  
**Status:** OSS-first public control plane; hosted deployment layers are future work only

This file replaces the old phase roadmap with a current, contributor-facing status note. The canonical public implementation lives in the monorepo packages, registries, content, graph indexes, tests, and generated host bundles.

## Public OSS Core

The following capabilities are public repository concerns and are part of the OSS core:

- deterministic routing: exact phrases, aliases, phrase trie, code-graph assist, semantic fallback, and fallback routes
- workflow orchestration: dry-run plans, read-only execution records, fan-out planning for parallel workflow routes, rollback metadata
- RBAC primitives: `registry/rbac.json` and `packages/yes-core/rbac.js`
- tenant/project trace isolation: hashed tenant/project trace paths under `graph/memory/tenants/`
- redaction and private traces: trace creation drops raw task text by default and records redaction metadata
- retention rules: `registry/retention-policy.json` and `packages/yes-runtime/retention.js`
- connector adapters: `registry/mcps.json`, `registry/connector-profiles.json`, and `packages/yes-connectors/`
- signed manifest validation: generic host manifest signatures verified by `validators/host-bundle.validator.js`
- absorber flow: stage, apply/promote, copy skills, provenance, rollback
- validation gates: schemas, dossiers, promotion audit, skill audit, drift validation, route/cost eval
- graph build/query and route assist: `packages/yes-graph/` and `packages/yes-runtime/lib/code-graph-assist.js`
- document-to-Markdown conversion: `packages/yes-runtime/tools/markitdown.js`
- host bundle generation: Claude, Codex, OpenCode, MCP, Cursor, Windsurf, VS Code, Sourcegraph, and Generic

## Architecture Constraints To Preserve

- Keep `YES_BOOT.md` tiny and pointer-based.
- Prefer deterministic routing before semantic fallback.
- Lazy-load agents, skills, workflows, and graph slices only after route match.
- Require provenance, source dossiers, and validation before promotion.
- Keep host bundles generated from the canonical repo source.
- Keep local and self-hosted operation primary.
- Do not commit secrets; configs must use env-var references only.
- Require explicit approval before moving external/private data into traces, connectors, or hosted systems.

## Contributor Validation Gate

Run the relevant focused checks for your change, then run the full local gate before publishing:

```bash
npm run validate
npm test
npm run eval:cost
npm run validate:drift
npm run audit:promotion
npm run audit:skills
node packages/yes-cli/index.js build all
```

For route changes, also run:

```bash
node packages/yes-cli/index.js eval route
```

For generated host changes, inspect `generated/<host>/` and run the host-bundle tests.

## Future Hosted Deployment Work

These items may be built later as hosted deployment layers around the OSS core. They are not hidden core runtime logic:

- hosted login, invites, organization management, billing, and account administration
- customer-specific managed trace retention operations
- managed connector operations for customer SaaS accounts
- hosted sandbox execution for untrusted runs at scale
- hosted semantic-routing rollout infrastructure with eval gates
- paid parallel execution control planes with quotas and cost controls

If any hosted capability needs new routing, orchestration, adapter, schema, redaction, retention, or validation logic, implement that reusable core in the public repository first.

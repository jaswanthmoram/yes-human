## Learned User Preferences

- Treat yes-human as an open-source developer project first (MIT); a startup path is acceptable via open core (teams, hosted graph, premium packs), not by hiding the router.
- Fix pre-implementation consistency issues (paths, registries, validation, repo basics) before building runtime packages or native agents.
- Prefer wave-by-wave vertical slices over loading a large agent corpus upfront; do not build hundreds of agents before a working route + graph loop.
- When absorbing external harnesses (ECC, GitHub OSS, jas-human), adapt patterns with license/provenance gates and skip agents already covered in yes-human.
- Prioritize low-token startup and lazy-loaded routing over ECC-style large upfront plugin bundles.
- Value planned capabilities: codebase/doc graphs for routing, PDF and docs to compact markdown, DSA-style routing indexes, hooks, connectors, Agent Lightning-style learning, and optional lightweight caches with eviction.

## Learned Workspace Facts

- yes-human is the planned successor to jas-human: a portable, low-token agentic control plane (v2.0.0) with tiny boot and task-scoped loading.
- Wave 0 bootstrap is in place: `@yes-human/schema`, seed registries, `graph/indexes/ROUTE_TABLE.min.json`, expanded `validate.js`, `eval-cost.js`, README, LICENSE, and `.gitignore`.
- Canonical hot route table path is `graph/indexes/ROUTE_TABLE.min.json`, aligned with `YES_BOOT.md` and `yes-human.plugin.json`.
- Runtime is not built yet: `yes-core`, `yes-cli`, `yes-runtime`, and `yes-graph` are missing; registry agent/skill/workflow indexes are empty shells.
- Full ECC is staged only at `staging/incoming/ECC/` (reference, gitignored); jas-human migration into `staging/internal/` has not started.
- npm scripts include `validate`, `validate:paths`, and `eval:cost`; boot token estimate is within the 180 target / 300 hard cap.
- Next build focus after bootstrap: Wave 1–2 (`yes route`, graph build MVP, selective jas-human/ECC absorption) before broad category masters and specialists.

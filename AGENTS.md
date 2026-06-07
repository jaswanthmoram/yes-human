## Learned User Preferences

- Treat yes-human as an open-source developer project first (MIT); keep the core public and documented.
- Prefer wave-by-wave vertical slices; fix paths, registries, and validation before expanding runtime.
- Bulk dossier uplift from source-map seeds plus hand-fixes for high-stakes domains.
- Low-token startup and lazy-loaded routing over large upfront plugin bundles.

## Learned Workspace Facts

- yes-human v2.1+ is a portable, low-token agentic control plane: `@yes-human/schema`, `yes-cli`, `yes-runtime`, `yes-graph`, `yes-core`, `yes-adapters`, `yes-absorber`.
- **325 agents** across 18 domains in `content/agents/`; promotion via `quality_gate: production` and `npm run audit:promotion`.
- Canonical route table: `graph/indexes/ROUTE_TABLE.min.json`; boot target ≤180 tokens (`npm run eval:cost`).
- Promotion tooling: `scripts/promote-all-agents.mjs`, `scripts/uplift-dossiers.mjs`, `scripts/sync-dossier-promotion-decision.mjs`.
- ECC full import is out of scope; selective OSS absorb via `yes absorb` / `packages/yes-absorber`.

## OSS-core v2.4

The public OSS core includes deterministic semantic routing, fan-out workflow planning, RBAC primitives, tenant/project trace isolation, redaction, retention rules, signed manifest verification, absorber promotion/rollback, connector protocol helpers, graph build/query, and host bundle generation. Hosted SaaS concerns are deployment-only future work, not hidden core logic.

## Default Routing Rules
- **Intercept First**: You must route all user tasks and queries through the `yes-human-routing` control plane first (using the `yes-human-routing` skill or executing `node packages/yes-cli/index.js route "<task>"`).
- **Consult Route**: Always obtain the resolved route ID, target specialist agent, and target workflow before proceeding with task planning or execution.
- **Enforce Constraints**: Respect the resolved route's budget band and token limits during execution.

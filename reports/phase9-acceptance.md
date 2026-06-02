# Phase 9 Acceptance

Generated: 2026-06-02

## Scope

Phase 9 implements the lightweight learning and portability layer on top of the completed Phase 8 corpus.

Included:

- yes-evaluator runtime surface
- yes-trainer runtime surface
- redacted tenant-scoped trace recording
- lightweight route outcome tracking with exponential decay
- staged feedback that never mutates production routing directly
- workflow miner/suggester
- mistake graph
- team mode configuration
- offline mode and crash-recovery checkpoints
- optional adapter packs for Cursor, Windsurf, VS Code, Sourcegraph, and Generic

Out of scope:

- Agent Lightning-style heavy trainer
- automatic production route mutation
- production quality-gate rewrites
- jas-human migration

## Implemented Artifacts

Runtime:

- `packages/yes-runtime/learning-engine.js`
- `packages/yes-runtime/yes-evaluator.js`
- `packages/yes-runtime/yes-trainer.js`
- `packages/yes-runtime/workflow-miner.js`
- `packages/yes-runtime/offline-recovery.js`
- `packages/yes-runtime/redaction.js`

Registries and schemas:

- `registry/learning-policy.json`
- `registry/team-mode.json`
- `registry/offline-mode.json`
- `registry/adapter-packs.json`
- `packages/yes-schema/schemas/learning-policy.schema.json`
- `packages/yes-schema/schemas/team-mode.schema.json`
- `packages/yes-schema/schemas/offline-mode.schema.json`
- `packages/yes-schema/schemas/adapter-pack.schema.json`

Lifecycle:

- `lifecycle/learning-feedback-state-machine.json`
- `lifecycle/offline-recovery-state-machine.json`

Adapters:

- `packages/yes-adapters/adapters/cursor.js`
- `packages/yes-adapters/adapters/windsurf.js`
- `packages/yes-adapters/adapters/vscode.js`
- `packages/yes-adapters/adapters/sourcegraph.js`
- `packages/yes-adapters/adapters/generic.js`

## Safety Model

Feedback is staged to `staging/feedback/`.

Workflow suggestions are staged to `staging/workflow-suggestions/`.

Outcome and mistake graph state is written under `graph/memory/learning/`.

Tenant traces are written under `graph/memory/tenants/<tenant_hash>/traces.jsonl`.

Production routing files are explicitly forbidden as direct feedback mutations:

- `registry/routes.json`
- `graph/indexes/ROUTE_TABLE.min.json`
- `registry/workflows.json`
- `registry/agents.json`

Any future promotion must happen through a separate explicit promotion commit after eval gates pass.

## Verification

Commands used during implementation:

```bash
npm run validate
node --check packages/yes-runtime/learning-engine.js
node --check packages/yes-cli/index.js
node --check packages/yes-adapters/index.js
node --check packages/yes-adapters/adapters/generic.js
node --test tests/learning/phase9-learning.test.js
node --test tests/adapters/host-bundle.test.js
```

Expected acceptance:

- Phase 9 config schemas validate.
- Adapter pack registry validates item-by-item.
- Optional adapter bundles generate and pass host validation.
- Generic adapter includes signed manifest, deny-by-default sandbox, audit file, and cancellation file.
- Redacted traces do not retain raw task text by default.
- Outcome failures update the mistake graph.
- Feedback remains staging-only.
- Offline tool strategy denies network tools when offline mode is active.

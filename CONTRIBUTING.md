# Contributing

Yes-human is an open-source routing and orchestration layer. Contributions should preserve deterministic routing, low startup context, source provenance, and human gates for high-stakes work.

## Local Setup

```bash
npm ci
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
```

Use Node 20 or newer. CI verifies Node 22 and 24.

## Add An Agent

1. Create `content/agents/<domain>/<agent-id>.md`.
2. Include frontmatter with `id`, `name`, `status`, `category`, `triggers`, `inputs`, `outputs`, `allowed_tools`, `budget_band`, `source_references`, and `quality_gate`.
3. Add `requires_disclaimer: true` and `human_review_gate: true` for finance, legal-compliance, HR, healthcare, or other high-stakes professional domains.
4. Add route coverage in `registry/routes.json` through the compile pipeline, not by hand-editing generated indexes.
5. Add routing fixtures in `tests/routing/`.

## Add A Skill

1. Create `content/skills/<domain>/<skill-id>/SKILL.md`.
2. Include concrete prerequisites, inputs, at least six actionable steps, outputs, quality gates, failure modes, handoffs, rollback, validators, and verification.
3. Cite at least two real permissively licensed OSS sources. Use URLs and license labels; do not cite placeholder references.
4. Run `npm run detect:skill-stubs`. Any score below the detector threshold must be rewritten before review.

## Source And Dossier Rules

Every agent and skill must be grounded in permissively licensed sources or clearly marked as patterns-only when a license prevents reuse. Dossiers must score at least 80 before promotion. Do not copy GPL or AGPL code into this repo.

## Routing Fixtures

Every new or changed route needs a fixture. Route accuracy must stay at 100.0% top-1:

```bash
node packages/yes-cli/index.js eval route
```

Only change fixture expectations when the new route is genuinely more correct than the old one.

## Full Gate

Run this before opening a PR:

```bash
npm run detect:skill-stubs
npm run validate
npm test
node packages/yes-cli/index.js eval route
npm run eval:cost
npm run doctor
node packages/yes-cli/index.js build all
```

## Contribution Staging

External agent or skill files can be staged for review:

```bash
npm run yes -- contribute agent <path>
npm run yes -- contribute skill <path>
```

The command copies the file into `staging/incoming/` and writes a manifest with validation issues and next steps.

## Commit Style

Use conventional commits:

- `feat:`
- `fix:`
- `test:`
- `docs:`
- `ci:`
- `chore:`

Keep commits scoped to one logical phase when possible.

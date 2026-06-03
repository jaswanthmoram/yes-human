## Summary

Brief description of the changes.

## Type

- [ ] Bug fix
- [ ] New agent/skill/workflow
- [ ] Feature
- [ ] Documentation
- [ ] CI/CD
- [ ] Refactor

## Verification Gate

- [ ] `npm run validate` passes
- [ ] `npm test` passes (0 failures)
- [ ] `node packages/yes-cli/index.js eval route` = 100.0% top-1
- [ ] `npm run eval:cost` ≤ 180 tokens
- [ ] `npm run doctor` passes
- [ ] `node packages/yes-cli/index.js build all` = 9/9 valid

## Routing Fixtures

- [ ] Added/updated routing fixtures for any new or changed routes
- [ ] Only changed fixture expectations when the new route is genuinely more correct

## Provenance

- [ ] All new agents/skills cite real, permissively licensed sources (MIT, Apache-2.0, BSD, ISC, CC0)
- [ ] No GPL/AGPL code copied directly
- [ ] Dossiers score ≥ 80

## Secrets

- [ ] No hardcoded API keys or secrets
- [ ] All config uses `{env:VAR_NAME}` references

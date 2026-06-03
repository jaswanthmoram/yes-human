# Security Policy

## Supported Scope

Yes-human is a local, portable routing and orchestration layer. It does not provide SaaS tenancy, auth, hosted secret storage, or professional advice. Host adapters rely on the local host environment and its permissions.

## Secrets Policy

Never commit API keys, tokens, passwords, webhook secrets, signing keys, or cloud credentials. Committed config must reference secrets with env-var placeholders:

```json
{ "apiKey": "{env:OPENAI_API_KEY}" }
```

CI runs gitleaks. Contributors should enable the pre-commit hook in `.pre-commit-config.yaml` and run a local scan before pushing:

```bash
gitleaks detect --source . --log-opts="--all" --redact --config .gitleaks.toml
```

If a committed secret is found, rotate the credential immediately. History rewriting is a maintainer decision and should not be attempted silently.

## High-Stakes Domains

Finance, legal-compliance, HR, healthcare, and similar professional domains are informational only. Agents and skills in these areas must carry `requires_disclaimer: true` and `human_review_gate: true`. Outputs require qualified human review before use.

## Reporting A Vulnerability

Please report security issues privately to the maintainers before public disclosure. Include:

- affected commit or version,
- reproduction steps,
- impact,
- whether credentials, personal data, generated bundles, or routing decisions are affected.

Do not include live secrets in reports. Use redacted examples.

## Security Gates

The expected local security checks are:

```bash
npm run validate
npm test
node packages/yes-cli/index.js eval route
npm run eval:cost
npm run doctor
node packages/yes-cli/index.js build all
gitleaks detect --source . --log-opts="--all" --redact --config .gitleaks.toml
```

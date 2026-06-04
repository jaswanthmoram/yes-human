# Packs Guide

Packs package workflows and skills designed for specific domains. They reduce token size by scoping instructions.

## Available Built-In Packs

1. **developer-pack**: Focuses on software engineering tasks.
   - Workflows: `code-review`, `bug-fix`, `explain-code`, `generate-tests`, `security-review`.
2. **document-pack**: Covers text and report summaries.
   - Workflows: `summarize-document`, `extract-tasks`, `convert-notes-to-report`, `create-outline`, `compare-documents`.
3. **business-pack**: Corporate strategy and financial layout templates.
   - Workflows: `business-plan`, `financial-plan`, `pitch-deck-outline`, `market-analysis`, `pricing-strategy`.
4. **security-pack**: Code vulnerability scans and credential auditing.
   - Workflows: `prompt-injection-check`, `dependency-risk-review`, `secrets-detection`, `auth-flow-review`, `api-security-review`.
5. **startup-pack**: Launch planning and requirement generation.
   - Workflows: `prd-generator`, `feature-roadmap`, `investor-summary`, `launch-checklist`, `product-positioning`.

## Lightweight Default Pack

A default pack containing exactly 10 multi-purpose workflows prevents loading heavy domain packs during initialization, keeping startup speed extremely fast.

---
id: research.literature-search
name: Literature Search
version: 1.0.0
category: research.search
summary: Executes structured literature searches across academic databases with Boolean queries, filters, and result deduplication.
triggers:
  - literature search execution
  - academic database query
  - systematic search run
  - paper discovery task
  - bibliography building
prerequisites:
  - database_access_configured
steps:
  - define search terms and Boolean operators
  - execute queries across target databases
  - apply date and type filters
  - deduplicate results across sources
  - export results in structured format
outputs:
  - search_results
  - deduplicated_records
budget_band: standard
rollback:
  - discard search session and cached results
validators:
  - skill.validator
source_references:
  - ref.github.research.2026-05-31
---

## Trigger
Use when a task requires discovering academic papers, preprints, or technical reports across one or more databases.

## Prerequisites
- Access to at least one academic database (Semantic Scholar, arXiv, CrossRef).
- Network access for API queries.

## Steps
1. Define search terms using Boolean operators (AND, OR, NOT) and field tags.
2. Execute queries against target databases (Semantic Scholar API, arXiv API, CrossRef).
3. Apply filters for publication date, document type, and language.
4. Deduplicate results using DOI and title matching.
5. Export results as structured JSON with title, authors, year, DOI, and abstract.

## Verification
- Validate that search results contain valid DOIs or stable identifiers.
- Confirm deduplication removed duplicate entries.

## Rollback
- Discard cached search results and session data.

## Common Failures
- API rate limits exceeded during large searches.
- Database returns incomplete metadata for older publications.

---
id: research.document-to-markdown
name: Document to Markdown Conversion
version: 1.0.0
category: research.data-extraction
summary: Converts PDF, PPTX, DOCX, and XLSX files to Markdown using Microsoft MarkItDown to optimize context tokens.
triggers:
  - parse pdf to markdown
  - parse pptx to markdown
  - convert document to markdown
  - process ppt to markdown
  - convert PDF file to markdown format
prerequisites:
  - markitdown_installed
steps:
  - verify file exists and is supported format
  - execute markitdown tool wrapper
  - capture converted markdown content
  - swap raw reference with markdown content path
outputs:
  - markdown_content
  - token_savings
budget_band: micro
rollback:
  - delete generated markdown file
validators:
  - skill.validator
source_references:
  - ref.github.markitdown.2026-05-29
---

## Trigger
Use this skill automatically whenever a user provides or references a PDF, PPTX, DOCX, or XLSX file path in their task prompt, or when an agent requires document content.

## Prerequisites
- Python 3 and the `markitdown` pip library must be installed.
- Node.js runtime with `@yes-human/runtime` packages available.

## Steps
1. Detect file extension and ensure it matches supported document formats (.pdf, .pptx, .docx, .xlsx).
2. Invoke `packages/yes-runtime/tools/markitdown.js` to execute `python3 -m markitdown <filePath>`.
3. Read the converted markdown content from standard output (or write to staging cache).
4. Supply the resulting markdown file to the requesting agent.

## Verification
- Run `node packages/yes-schema/validate.js` to ensure the skill config is schema-compliant.
- Test conversion against sample files to ensure no formatting or data loss.

## Rollback
- Delete the temporary generated markdown files from `staging/normalized/` or the designated output path.

## Common Failures
- `markitdown` library not installed on the system Python.
- Scanned/non-OCR PDF files returning empty or low-quality text.
- Large spreadsheet cells causing rendering truncation.

## Examples
### Converting a PDF
Input: `path/to/report.pdf`
Output: `staging/normalized/report.md`

## Procedure
1. Clarify inputs
2. Apply dossier patterns
3. Verify outputs

# Document Conversion Tools

The `@yes-human/doc-tools` package provides a standalone document-to-markdown conversion adapter powered by Microsoft's MarkItDown utility. This package is completely decoupled from the core `@yes-human/core` and `@yes-human/runtime` packages, meaning **you do not need Python or markitdown to run core AI workflow routing.**

If you need to convert PDFs, Word Documents, Excel Sheets, PowerPoint Presentations, or email files into LLM-friendly Markdown, you can set up `@yes-human/doc-tools` as described below.

## Prerequisites

To use document conversion, you need:
1. **Python 3.8+** installed on your system.
2. **Microsoft MarkItDown** installed in your Python environment.

## Setup Instructions

### 1. Configure the Python Virtual Environment
We recommend creating a project-local virtual environment:

```bash
# Create a local virtual environment in the repository root
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/python -m pip install -r requirements.txt
```

If you are using it in a custom folder, install it directly:
```bash
pip install markitdown
```

### 2. Configure Environment Variables
By default, the adapter looks for the python executable in:
- The active `YES_PYTHON` environment variable path.
- A local `.venv/bin/python` environment inside the current working directory.
- System `python3`.

To point yes-human directly to a specific python interpreter, set `YES_PYTHON`:

```bash
export YES_PYTHON="/path/to/your/venv/bin/python"
```

## API Usage

You can import and use `convertToMarkdown` or the `MarkitdownAdapter` class directly in your Node.js application:

```javascript
import { convertToMarkdown } from "@yes-human/doc-tools";

try {
  // Convert a PDF document to markdown string
  const markdown = await convertToMarkdown("path/to/document.pdf");
  console.log("Converted Markdown:", markdown);
} catch (error) {
  console.error("Conversion failed:", error.message);
}
```

### Options

The `convertToMarkdown` function accepts an optional configuration object:

| Option | Type | Default | Description |
|---|---|---|---|
| `outputPath` | `string` | `undefined` | Write the generated markdown to this file path instead of only returning it. |
| `annotateImages` | `boolean` | `true` | When true, appends an LLM-facing notice flagging any embedded images that were not transcribed. |
| `detailed` | `boolean` | `false` | When true, returns an object `{ markdown, images, hasImages }` instead of a raw string. |

### Vision/Image Alerting
If `annotateImages` is enabled and the PDF/document contains embedded images, the adapter will append a notice at the bottom of the Markdown:

```markdown
> [!NOTE] This document contains 1 embedded image(s) that were not transcribed to text.
> If their content matters, a vision-capable model should inspect them:
> - Image 1: (no caption) — image_ref_1.png
```

This prevents the LLM from missing key diagrams or graphics by signaling their existence and coordinates.

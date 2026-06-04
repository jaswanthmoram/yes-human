# Offline Mode & Privacy

`yes-human` is designed from the ground up with an **offline-first** architecture. This ensures instant performance, zero token costs for routing, and complete data privacy by keeping operations on the local machine.

---

## Fully Offline vs. Offline-First

* **Fully Offline**: All computation occurs entirely on your local machine with zero external network calls.
* **Offline-First**: The control plane (routing, security checks, and step orchestration) resolves locally. If an action requires specialized LLM intelligence, the router dispatches requests to local model endpoints or fallback cloud APIs, returning the output back to the offline workspace.

---

## Capabilities Comparison

### 1. What Works Without Internet (Fully Local)
* **Workflow Intent Routing**: Computing normalized exact phrase, alias, and keyword overlaps resolves under **0.05ms** locally.
* **Workspaces & Pack Registries**: Loading, listing, and compiling workflows/skills operates completely locally.
* **Trace Generation**: Recording execution steps, metrics, and memory changes.
* **Local Safety Filters**: Checking file permissions, budget allocations, and license validations.
* **Security Redaction**: Scrubbing PHI, API keys, and certificates from logs.
* **Document Conversion**: Converting PDF, Word, and Excel files using `@yes-human/doc-tools` with local Python binaries.

### 2. What Requires Internet or External Endpoints
* **Semantic Routing fallback**: Semantic similarity checks require vector embedding matching. This can be run locally using local embeddings (e.g. Transformers.js) or require external API endpoints (e.g. OpenAI, Cohere).
* **LLM Reasoning**: Completing complex tasks (such as actually fixing a bug or drafting a marketing plan) requires an LLM backend (either a cloud service or local model).

---

## Local Model Integration

To run `@yes-human/runtime` with a fully local model layer, you can spin up local LLM servers using tools like **Ollama** or **Llama.cpp**:

### 1. Ollama Integration Example
Start a local model (e.g. `llama3`):
```bash
ollama run llama3
```

Set the model and endpoint inside your semantic routing config:

```javascript
import { createRouter } from "@yes-human/core";

const router = createRouter({
  semanticEndpoint: "http://localhost:11434/api/embeddings",
  semanticModel: "llama3"
});
```

---

## Privacy & Data Handling Guidelines

Because `yes-human` handles sensitive developer context and repository code:
1. **Local Checkpoints Only**: Traces and outcome matrices are written strictly to your local system's cache or temp folders.
2. **No Data Collection**: There is no telemetry, tracking, or background reporting built into `@yes-human/core` or `@yes-human/runtime`.
3. **Redaction Primitives**: The `redactString` utility is run on inputs before execution context variables are populated, ensuring that secrets never reach downstream model backends.

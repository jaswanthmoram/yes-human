# Offline Mode

By default, **yes-human** operates in `offline` mode. It is designed to run in sandboxed, offline-first local applications and developer environments (e.g. CLI, VSCode, Electron).

## Offline Deterministic Routing

Unlike LLM-based routing which introduces latency and token costs, yes-human uses deterministic string matching:

1. **Exact Matches**: Compares normalized prompts directly against trigger phrases.
2. **Alias Matching**: Checks for partial inclusion of trigger words or aliases.
3. **Keyword Parsing**: Token overlap count matching.
4. **Fallback Handling**: Graceful fallback routing if no matching stage is triggered.

## Security & Sandboxing

* **Local Code Analysis**: No code leaves your local environment during routing or execution.
* **Low Memory Footprint**: Loads lightweight JSON definitions rather than multi-GB models.
* **Zero APIs**: Works entirely without internet or third-party service tokens.

# @yes-human/runtime

The execution and dispatch layer of the `yes-human` control plane.

## Key Subsystems

* **`router.js`**: 7-stage deterministic routing pipeline (Exact → Alias → PhraseTrie → Embedded Alias → Graph Assist → Semantic Fallback → Fallback).
* **`progressive-loader.js`**: Lazy-loads agent dossiers and skill files within designated token budgets.
* **`learning-engine.js`**: Evaluates wrong-agent routing proposal feedback.
* **`spawner.js`**: Runs agent plans under dry-run / local modes.

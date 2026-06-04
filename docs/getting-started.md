# Getting Started with yes-human

`yes-human` is an offline-first AI workflow router that turns natural-language tasks into structured, reusable agent workflows for local applications and developer tools. It acts as the routing, orchestrating, and instructional boundary around Large Language Models (LLMs) and local tools.

---

## Installation

Install the core library and standard packs using your preferred package manager:

```bash
# Install core router and runner
npm install @yes-human/core @yes-human/runtime

# Install the standard workflows pack
npm install @yes-human/packs
```

*Note: `@yes-human/core` and `@yes-human/packs` are written in TypeScript and compile to pure JavaScript ESM modules. They do not require Python or native build tools.*

---

## 60-Second SDK Usage

Here is how you can initialize a router, load the developer workflows pack, resolve a natural language prompt, and execute its steps:

```javascript
import { createRouter } from "@yes-human/core";
import { WorkflowRunner } from "@yes-human/runtime";
import { developerPack } from "@yes-human/packs";

// 1. Initialize the router with the developer workflows
const router = createRouter({
  packs: [developerPack]
});

// 2. Resolve a user task to a route and workflow
const task = "please review my javascript auth files for styling and bugs";
const result = await router.route(task);

console.log(`Routed Task To: ${result.route.workflowId} (Confidence: ${result.route.confidence})`);

// 3. Execute the workflow steps
if (result.workflow) {
  const runner = new WorkflowRunner();
  const runResult = await runner.run(result.workflow, "const x = 'secret-token';");
  
  console.log("Steps Run:", runResult.trace.steps.map(s => s.step));
  console.log("Final Output:", runResult.output);
}
```

---

## CLI Usage

`yes-human` includes a CLI utility `yes` to quickly route tasks, run workflows, inspect packs, and export configurations to Codex or Antigravity editor environments.

You can trigger the CLI via `npx` or by installing it globally:

```bash
# Route a prompt and view the PlanCard output
npx yes route "fix compile crash on main line 4"

# Execute a specific workflow
npx yes run developer.bug-fix "Error: Index out of bounds at main.js:4"

# List all workflows in the system
npx yes pack list

# Export workflows to Codex editor surface config
npx yes export codex ./my-project

# Export workflows to Antigravity controller config
npx yes export antigravity ./my-project
```

---

## Using Packs

A **Pack** is a pre-packaged bundle of workflows and skills designed for specific domains. `yes-human` ships with several built-in packs:

- **`defaultPack`**: A small default pack containing general offline utility workflows.
- **`developerPack`**: Standard software engineering workflows (code review, bug fixing, test generation, security audit).
- **`documentPack`**: Workflows for document processing, outlines, summarization, and task extraction.
- **`businessPack`**: Strategy drafts, pricing plans, and financial forecasting structures.
- **`securityPack`**: Auditing authentication code, prompt injection vulnerability scanning, and secrets detection.
- **`startupPack`**: PRD generation, product release checklists, and roadmaps.

To use multiple packs, simply register them at construction:

```javascript
import { createRouter } from "@yes-human/core";
import { developerPack, documentPack } from "@yes-human/packs";

const router = createRouter({
  packs: [developerPack, documentPack]
});
```

---

## Offline Mode Explanation

`yes-human` is built from the ground up to be **offline-first**:
1. **Deterministic Phrase Routing**: It uses exact keyword, containment, and phrase-alias logic to route prompts without needing an active internet connection or LLM invocation. This makes startup instant (<5ms) and routing free.
2. **Local Semantic Router**: If a prompt does not match exact phrases, a local semantic router can be integrated to compute vector similarities using offline models, or query a local endpoint.
3. **Redaction & Security Rules**: It blocks data leaks (such as PHI or hardcoded keys) locally on the device before any external requests are dispatched.

---

## Troubleshooting

### Issue: Cannot resolve module `@yes-human/core`
* **Cause**: Node is running in CommonJS mode, whereas yes-human is exported strictly as ESM (ECMAScript Modules).
* **Fix**: Ensure your `package.json` has `"type": "module"` set, or use `.mjs` extensions for your scripts.

### Issue: Custom pack fails to load
* **Cause**: The custom pack object does not match the required schema (e.g. is missing the `workflows` array).
* **Fix**: Check that the custom pack complies with the TypeScript `PackDefinition` type. The router throws descriptive type and runtime error messages if invalid configurations are loaded.

### Issue: CLI throws `Command not found`
* **Cause**: `yes-human` CLI is not globally installed or the local workspace has not been built.
* **Fix**: Run `npm run build` in the monorepo root to compile the typescript packages. You can then run the CLI using `node packages/yes-cli/dist/index.js`.

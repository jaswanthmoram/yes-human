# Integration Guide

`yes-human` is designed to be easily embedded in local apps, background utilities, and editor toolchains. This guide covers setup for various environments.

---

## 1. Node.js Applications

Node.js integrations are simple and ESM-native.

```javascript
import { createRouter } from "@yes-human/core";
import { WorkflowRunner } from "@yes-human/runtime";
import { developerPack } from "@yes-human/packs";

const router = createRouter({ packs: [developerPack] });
const result = await router.route("review code");

if (result.workflow) {
  const runner = new WorkflowRunner();
  const output = await runner.run(result.workflow, "diff contents");
  console.log("Run finished:", output);
}
```

---

## 2. React Applications (Vite / Next.js)

Since `@yes-human/core` does not rely on Node.js core modules, you can bundle it directly inside frontend apps using Vite, Next.js, or Svelte:

```typescript
import React, { useState } from "react";
import { createRouter } from "@yes-human/core";
import { defaultPack } from "@yes-human/packs";

const router = createRouter({ packs: [defaultPack] });

export function App() {
  const [query, setQuery] = useState("");
  const [routeResult, setRouteResult] = useState<any>(null);

  const handleRoute = async () => {
    const res = await router.route(query);
    setRouteResult(res);
  };

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleRoute}>Route Prompt</button>
      {routeResult && (
        <pre>{JSON.stringify(routeResult.route, null, 2)}</pre>
      )}
    </div>
  );
}
```

---

## 3. Electron Applications

In Electron, run the routing logic inside the **Main Process** to preserve access to local tooling, and expose APIs to the renderer via a preload bridge:

**`preload.js`**
```javascript
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("yesHuman", {
  routeTask: (task) => ipcRenderer.invoke("route-task", task)
});
```

**`main.js`**
```javascript
const { ipcMain } = require("electron");
const { createRouter } = require("@yes-human/core");
const { developerPack } = require("@yes-human/packs");

const router = createRouter({ packs: [developerPack] });

ipcMain.handle("route-task", async (event, task) => {
  return await router.route(task);
});
```

---

## 4. Tauri Applications

For Tauri, integrate the router into your Node.js sidecar or run it in your frontend code directly. Because `@yes-human/core` is lightweight, running it inside the WebView frontend provides sub-millisecond offline routing.

If you have a backend Node.js sidecar:
1. Package `@yes-human/cli` as a Tauri sidecar command.
2. Invoke the CLI sidecar command using Tauri's `@tauri-apps/plugin-shell` API:

```javascript
import { Command } from "@tauri-apps/plugin-shell";

const command = Command.sidecar("binaries/yes-cli", ["route", "review code"]);
const output = await command.execute();
console.log("Tauri routing output:", output.stdout);
```

---

## 5. Editor and IDE Integrations

You can export yes-human configurations directly into configuration files for AI coding tools.

### Microsoft Codex
Run the CLI export command:
```bash
npx yes export codex ./output-dir
```
This generates:
- `AGENTS.md`: The task routing index mapping prompts to workflows.
- `.codex/skills/`: A skills folder containing custom skill definition markdown files (`SKILL.md`) for code review, bug fix, test generation, and security audit.

### Antigravity SDK
Run the CLI export command:
```bash
npx yes export antigravity ./output-dir
```
This generates:
- `agents.md`: Defines the development roles (Reviewer, Builder, Architect).
- `skills/`: Individual capability skill definition files.
- `workflows/`: Multistep execution plans (`feature-build.md`, `test-and-validate.md`, `debug-and-fix.md`).

### Cursor / Claude Code / Custom Systems
For general LLM systems, we package the active workflows as a consolidated text prompt using the built-in host generator:
```bash
npx yes build all
```
This generates unified system prompt packages under `generated/host/` which you can paste directly into `.cursorrules`, custom GPT system prompts, or Claude Code instruction surfaces.

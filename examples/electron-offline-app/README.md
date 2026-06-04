# Electron Offline App Example (Structural Blueprint)

This example serves as a structural blueprint demonstrating how to integrate `yes-human` inside an offline Electron desktop application.

---

## Architecture Overview

In desktop applications, the **Renderer Process** handles HTML/React rendering, but is restricted from directly accessing local files, running compilers, or triggering shell processes. 

To bridge this, we initialize `yes-human` inside the **Main Process** (which has full Node.js access) and expose safe routing APIs to the Renderer through Electron's `preload` script.

## Setup & Run Blueprint

### 1. Main Process Setup (`main.js`)
Initialize the router and listen for IPC events:
```javascript
const { app, BrowserWindow, ipcMain } = require("electron");
const { createRouter } = require("@yes-human/core");
const { developerPack } = require("@yes-human/packs");

const router = createRouter({ packs: [developerPack] });

ipcMain.handle("yes-human:route", async (event, query) => {
  return await router.route(query);
});
```

### 2. Preload Script Setup (`preload.js`)
Expose the bridge API securely:
```javascript
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  routeTask: (query) => ipcRenderer.invoke("yes-human:route", query)
});
```

### 3. Front-end Integration
Call the bridge method from your front-end (e.g. React/Svelte component):
```javascript
const handleSearch = async (text) => {
  const result = await window.api.routeTask(text);
  console.log("Routed workflow:", result.workflow);
};
```

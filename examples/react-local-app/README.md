# React Local Application Example

This example demonstrates how to bundle `@yes-human/core` inside a client-side React single-page application built using Vite.

Because the core router has zero Node.js dependencies, it runs directly in the browser's sandbox environment, achieving sub-millisecond offline routing.

---

## Installation

```bash
# Navigate to the react app folder
cd examples/react-local-app

# Install dependencies (npm workspaces will symlink local packages)
npm install
```

## Running the App

Start the local Vite development server:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## UI Demonstration

The application demonstrates:
1. **Interactive Prompt Field**: Enter any query (e.g. "review this script" or "create a project plan").
2. **Deterministic Route Mapping**: Resolves and shows matching workflow metadata, confidence levels, and trigger stages instantly inside the browser.
3. **Trace Visualizer**: Displays a visual step-by-step trace showing the execution sequence of the matched workflow.

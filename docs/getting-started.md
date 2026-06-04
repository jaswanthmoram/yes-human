# Getting Started

Welcome to **yes-human**, an offline-first AI workflow router for local apps and developer tools.

## Installation

Install the core package, runtime, and default packs:

```bash
npm install @yes-human/core @yes-human/runtime @yes-human/packs
```

## Basic SDK Usage

```typescript
import { createRouter } from "@yes-human/core";
import { developerPack } from "@yes-human/packs";

const router = createRouter({
  mode: "offline",
  packs: [developerPack],
  trace: true
});

const result = await router.route("review code for bugs");
console.log(result.route.id); // "route.engineering.code-review"
console.log(result.route.stage); // "exact"
console.log(result.trace); // Full execution trace steps
```

## Using the CLI

Run natural language routing directly from your terminal:

```bash
# Register global CLI command symlink
npm link

# Route prompt
yes route "review code for bugs"

# Run workflow
yes run core.code-review "input code context"

# List packs
yes pack list
```

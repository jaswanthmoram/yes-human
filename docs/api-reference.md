# SDK API Reference

This document provides a detailed API specification for the `@yes-human/core` and `@yes-human/runtime` packages.

---

## Initialization

### `createRouter(config)`

Factory function to create a new `Router` instance.

* **Parameters:**
  * `config` (`RouterConfig`, optional): Configuration options.
* **Returns:** `Router`
* **Example:**
  ```typescript
  import { createRouter } from "@yes-human/core";
  import { developerPack } from "@yes-human/packs";
  
  const router = createRouter({
    mode: "offline",
    packs: [developerPack],
    trace: true,
    fallbackRouteId: "route.custom.fallback"
  });
  ```

---

## Router Instance Methods

### `router.route(input)`

Resolves a natural language query against registered workflows using exact match, alias, keyword matching, and semantic hooks.

* **Parameters:**
  * `input` (`string`): The user prompt or task description.
* **Returns:** `Promise<RouteResult>`
* **Example:**
  ```javascript
  const result = await router.route("review code changes");
  console.log(result.route.id); // "route.developer.code-review"
  ```

### `router.runWorkflow(workflowId, input)`

Directly invokes a workflow by its unique ID, bypassing the routing phrase matching logic but tracking execution steps.

* **Parameters:**
  * `workflowId` (`string`): The ID of the workflow to run.
  * `input` (`string`): Input payload/context.
* **Returns:** `Promise<RouteResult>`
* **Example:**
  ```javascript
  const result = await router.runWorkflow("developer.code-review", "diff...");
  ```

### `router.loadPack(pack)`

Registers a workflow pack containing workflows and skills. Validates structures and throws errors on malformed payloads.

* **Parameters:**
  * `pack` (`PackDefinition`): Pack containing workflows and skills.
* **Returns:** `void`

### `router.registerWorkflow(workflow)`

Manually registers a single custom workflow definition.

* **Parameters:**
  * `workflow` (`WorkflowDefinition`): Custom workflow object.
* **Returns:** `void`

### `router.registerSkill(skill)`

Manually registers a single custom skill definition.

* **Parameters:**
  * `skill` (`SkillDefinition`): Custom skill object.
* **Returns:** `void`

### `router.getTrace()`

Retrieves the recorded step-by-step trace events of the router instance since creation.

* **Returns:** `TraceObject`

### `router.listWorkflows()`

Lists all registered workflows in the router.

* **Returns:** `WorkflowDefinition[]`

### `router.listSkills()`

Lists all registered skills in the router.

* **Returns:** `SkillDefinition[]`

### `router.listRoutes()`

Lists computed routes based on all registered workflow triggers.

* **Returns:** `RouteDetails[]`

---

## Core TypeScript Types

### `RouterConfig`
```typescript
export interface RouterConfig {
  mode?: "offline" | "hybrid" | "online";
  packs?: PackDefinition[];
  trace?: boolean; // default true
  fallbackRouteId?: string;
  semanticRouter?: (input: string) => Promise<RouteDetails | null> | RouteDetails | null;
  semanticEndpoint?: string;
  semanticModel?: string;
}
```

### `RouteDetails`
```typescript
export interface RouteDetails {
  id: string; // prefixed with "route."
  workflowId: string;
  confidence: number; // 0.0 to 1.0
  stage: "exact" | "alias" | "keyword" | "fallback";
  reason: string;
}
```

### `TraceEvent`
```typescript
export interface TraceEvent {
  step: string;
  timestamp: string; // ISO String
  status: "pending" | "success" | "failure";
  metadata?: Record<string, any>;
}
```

### `TraceObject`
```typescript
export interface TraceObject {
  startTime: string;
  endTime: string;
  steps: TraceEvent[];
}
```

### `RouteResult`
```typescript
export interface RouteResult {
  route: RouteDetails;
  workflow: WorkflowDefinition | null; // null if fallback
  trace: TraceObject;
}
```

### `WorkflowDefinition`
```typescript
export interface WorkflowDefinition {
  id: string;
  name: string;
  description: string;
  triggerPhrases: string[];
  requiredSkills: string[];
  expectedInput: string;
  expectedOutput: string;
  traceSteps: string[];
  safetyNotes?: string;
}
```

### `SkillDefinition`
```typescript
export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
}
```

### `PackDefinition`
```typescript
export interface PackDefinition {
  name: string;
  description: string;
  workflows: WorkflowDefinition[];
  skills: SkillDefinition[];
}
```

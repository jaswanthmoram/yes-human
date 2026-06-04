# API Reference

This document covers public classes and types for `@yes-human/core` and `@yes-human/runtime`.

## `@yes-human/core`

### `createRouter(config?: RouterConfig): Router`
Instantiates a new router context.

```typescript
export interface RouterConfig {
  mode?: "offline" | "hybrid" | "online";
  packs?: PackDefinition[];
  trace?: boolean;
}
```

### `Router` Class Methods
- `route(prompt: string): Promise<RouteResult>`: Evaluates a user prompt against registered triggers and returns routing details.
- `runWorkflow(workflowId: string, input: string): Promise<RouteResult>`: Executes a workflow directly.
- `registerSkill(skill: SkillDefinition): void`: Dynamically registers a skill.
- `registerWorkflow(workflow: WorkflowDefinition): void`: Dynamically registers a workflow.
- `loadPack(pack: PackDefinition): void`: Dynamically loads a pack of workflows/skills.
- `getTrace(): TraceObject`: Returns the current trace tracker object.
- `listRoutes(): RouteDetails[]`: Lists all registered routes.
- `listWorkflows(): WorkflowDefinition[]`: Lists all registered workflows.
- `listSkills(): SkillDefinition[]`: Lists all registered skills.

---

## `@yes-human/runtime`

### `RuntimeExecutionContext`
Standard tracker context for sequential skill steps.

- `step<T>(name: string, fn: () => Promise<T> | T): Promise<T>`: Wraps a subtask and appends it to the execution trace.

### `WorkflowRunner`
Chains skills and executes them sequentially.

- `execute(workflow: WorkflowDefinition, input: string, skills: Map<string, SkillDefinition>, context: RuntimeExecutionContext): Promise<{ output: string; trace: any[] }>`

export type RouterMode = "offline" | "hybrid" | "online";

export interface RouterConfig {
  mode?: RouterMode;
  packs?: PackDefinition[];
  trace?: boolean;
  fallbackRouteId?: string;
  semanticRouter?: (input: string) => Promise<RouteDetails | null> | RouteDetails | null;
  semanticEndpoint?: string;
  semanticModel?: string;
}

export interface RouteDetails {
  id: string;
  workflowId: string;
  confidence: number;
  stage: "exact" | "alias" | "keyword" | "fallback";
  reason: string;
}

export interface TraceEvent {
  step: string;
  timestamp: string;
  status: "pending" | "success" | "failure";
  metadata?: Record<string, any>;
}

export interface TraceObject {
  startTime: string;
  endTime: string;
  steps: TraceEvent[];
}

export interface RouteResult {
  route: RouteDetails;
  workflow: WorkflowDefinition | null;
  trace: TraceObject;
}

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

export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
}

export interface AgentDefinition {
  id: string;
  name: string;
  description: string;
}

export interface PackDefinition {
  name: string;
  description: string;
  workflows: WorkflowDefinition[];
  skills: SkillDefinition[];
}

export interface ExecutionContext {
  variables: Record<string, any>;
  trace: TraceEvent[];
  step: <T>(name: string, fn: () => Promise<T> | T) => Promise<T>;
}



import {
  RouterConfig,
  RouteResult,
  WorkflowDefinition,
  SkillDefinition,
  PackDefinition,
  RouteDetails,
  TraceObject,
} from "../types/index.js";
import { TraceTracker } from "../trace/tracker.js";
import { createLocalSemanticRouter } from "./semantic.js";

export class Router {
  private mode: string;
  private packs: PackDefinition[] = [];
  private traceEnabled: boolean;
  private tracker: TraceTracker;
  private workflows: Map<string, WorkflowDefinition> = new Map();
  private skills: Map<string, SkillDefinition> = new Map();
  private fallbackRouteId: string;
  private semanticRouter?: (input: string) => Promise<RouteDetails | null> | RouteDetails | null;

  constructor(config: RouterConfig = {}) {
    this.mode = config.mode || "offline";
    this.traceEnabled = config.trace !== false;
    this.tracker = new TraceTracker();
    this.fallbackRouteId = config.fallbackRouteId || "route.meta-system.supreme-router";
    this.semanticRouter = config.semanticRouter;

    if (!this.semanticRouter && config.semanticEndpoint) {
      const endpoint = config.semanticEndpoint;
      const model = config.semanticModel;
      this.semanticRouter = async (input: string) => {
        const workflows = Array.from(this.workflows.values());
        const routeFn = createLocalSemanticRouter(endpoint, { model, workflows });
        return routeFn(input);
      };
    }

    if (config.packs) {
      for (const pack of config.packs) {
        this.loadPack(pack);
      }
    }
  }

  public loadPack(pack: PackDefinition): void {
    if (this.traceEnabled) {
      this.tracker.addStep("load-pack", "success", { packName: pack.name });
    }

    // Check if pack is already loaded to avoid duplicates
    if (this.packs.some((p) => p.name === pack.name)) {
      return;
    }
    this.packs.push(pack);

    for (const w of pack.workflows) {
      this.workflows.set(w.id, w);
    }
    for (const s of pack.skills) {
      this.skills.set(s.id, s);
    }
  }

  public registerWorkflow(workflow: WorkflowDefinition): void {
    this.workflows.set(workflow.id, workflow);
    if (this.traceEnabled) {
      this.tracker.addStep("register-workflow", "success", {
        workflowId: workflow.id,
      });
    }
  }

  public registerSkill(skill: SkillDefinition): void {
    this.skills.set(skill.id, skill);
    if (this.traceEnabled) {
      this.tracker.addStep("register-skill", "success", { skillId: skill.id });
    }
  }

  public listWorkflows(): WorkflowDefinition[] {
    return Array.from(this.workflows.values());
  }

  public listSkills(): SkillDefinition[] {
    return Array.from(this.skills.values());
  }

  public listRoutes(): RouteDetails[] {
    const routes: RouteDetails[] = [];
    for (const w of this.workflows.values()) {
      for (const trigger of w.triggerPhrases) {
        routes.push({
          id: `route.${w.id}`,
          workflowId: w.id,
          confidence: 1.0,
          stage: "exact",
          reason: `trigger: ${trigger}`,
        });
      }
    }
    return routes;
  }

  public getTrace(): TraceObject {
    return this.tracker.getTrace();
  }

  private normalize(text: string): string {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[?!.,;]/g, "")
      .replace(/\s+/g, " ");
  }

  public async route(input: string): Promise<RouteResult> {
    const rawQuery = this.normalize(input);
    if (this.traceEnabled) {
      this.tracker.addStep("route-start", "success", { input });
    }

    let scopedPackName: string | null = null;
    let query = rawQuery;

    // Detect pack-scoping: e.g. "[developer] review code"
    const matchScoped = rawQuery.match(/^\[([\w-]+)\]\s*(.*)$/);
    if (matchScoped) {
      scopedPackName = matchScoped[1];
      query = this.normalize(matchScoped[2]);
    }

    let matchedWorkflow: WorkflowDefinition | null = null;
    let matchStage: "exact" | "alias" | "keyword" | "fallback" = "fallback";
    let matchReason = `No matching workflows found, fell back to ${this.fallbackRouteId}`;
    let matchConfidence = 0.0;

    const workflowsToCheck = scopedPackName
      ? Array.from(this.workflows.values()).filter(
          (w) => w.id.startsWith(scopedPackName!) || w.id.includes(`.${scopedPackName}.`)
        )
      : Array.from(this.workflows.values());

    // 1. Exact trigger/phrase match within the active workflows
    for (const w of workflowsToCheck) {
      for (const trigger of w.triggerPhrases) {
        if (this.normalize(trigger) === query) {
          matchedWorkflow = w;
          matchStage = "exact";
          matchReason = `Exact match on trigger "${trigger}"${scopedPackName ? ` within pack "${scopedPackName}"` : ""}`;
          matchConfidence = 1.0;
          break;
        }
      }
      if (matchedWorkflow) break;
    }

    // 2. Alias match (e.g. check if normalized query contains trigger or vice versa)
    if (!matchedWorkflow) {
      for (const w of workflowsToCheck) {
        const hasAlias = w.triggerPhrases.some((trigger) => {
          const normTrigger = this.normalize(trigger);
          return query.includes(normTrigger) || normTrigger.includes(query);
        });
        if (hasAlias) {
          matchedWorkflow = w;
          matchStage = "alias";
          matchReason = `Alias or partial match on triggers for workflow ${w.name}${scopedPackName ? ` within pack "${scopedPackName}"` : ""}`;
          matchConfidence = 0.95;
          break;
        }
      }
    }

    // 3. Keyword / containment matching
    if (!matchedWorkflow) {
      for (const w of workflowsToCheck) {
        const queryTokens = query.split(/\s+/);
        const nameTokens = this.normalize(w.name).split(/\s+/);
        const overlap = queryTokens.filter((t) => nameTokens.includes(t));
        if (
          overlap.length >= 2 ||
          (overlap.length >= 1 && queryTokens.length === 1)
        ) {
          matchedWorkflow = w;
          matchStage = "keyword";
          matchReason = `Keyword match on tokens: ${overlap.join(", ")}${scopedPackName ? ` within pack "${scopedPackName}"` : ""}`;
          matchConfidence = 0.9;
          break;
        }
      }
    }

    // 4. Semantic Routing hook fallback (if defined)
    if (!matchedWorkflow && this.semanticRouter) {
      try {
        const semanticDetails = await this.semanticRouter(input);
        if (semanticDetails) {
          const wf = Array.from(this.workflows.values()).find(
            (w) => w.id === semanticDetails.workflowId
          ) || null;
          matchedWorkflow = wf;
          matchStage = semanticDetails.stage;
          matchReason = semanticDetails.reason;
          matchConfidence = semanticDetails.confidence;
        }
      } catch (err: any) {
        if (this.traceEnabled) {
          this.tracker.addStep("semantic-router-error", "failure", { error: err.message });
        }
      }
    }

    const routeId = matchedWorkflow
      ? `route.${matchedWorkflow.id}`
      : this.fallbackRouteId;

    const routeDetails: RouteDetails = {
      id: routeId,
      workflowId: matchedWorkflow
        ? matchedWorkflow.id
        : this.fallbackRouteId.replace(/^route\./, ""),
      confidence: matchConfidence,
      stage: matchStage,
      reason: matchReason,
    };

    if (this.traceEnabled) {
      this.tracker.addStep("route-resolve", "success", {
        routeId,
        stage: matchStage,
        confidence: matchConfidence,
      });
    }

    // Simulate execution step tracing if a workflow is matched
    if (matchedWorkflow) {
      for (const step of matchedWorkflow.traceSteps) {
        if (this.traceEnabled) {
          this.tracker.addStep(`exec-step:${step}`, "success", {
            workflowId: matchedWorkflow.id,
          });
        }
      }
    }

    return {
      route: routeDetails,
      workflow: matchedWorkflow,
      trace: this.tracker.getTrace(),
    };
  }

  public async runWorkflow(
    workflowId: string,
    input: string
  ): Promise<RouteResult> {
    if (this.traceEnabled) {
      this.tracker.addStep("run-workflow-start", "success", {
        workflowId,
        input,
      });
    }

    const workflow = this.workflows.get(workflowId);
    if (!workflow) {
      const fallbackRoute: RouteDetails = {
        id: "route.meta-system.supreme-router",
        workflowId: "meta-system.supreme-router",
        confidence: 0,
        stage: "fallback",
        reason: `Workflow "${workflowId}" not found.`,
      };
      if (this.traceEnabled) {
        this.tracker.addStep("run-workflow-not-found", "failure", {
          workflowId,
        });
      }
      return {
        route: fallbackRoute,
        workflow: null,
        trace: this.tracker.getTrace(),
      };
    }

    for (const step of workflow.traceSteps) {
      if (this.traceEnabled) {
        this.tracker.addStep(`exec-step:${step}`, "success", { workflowId });
      }
    }

    const routeDetails: RouteDetails = {
      id: `route.${workflow.id}`,
      workflowId: workflow.id,
      confidence: 1.0,
      stage: "exact",
      reason: `Direct invocation of workflow: ${workflowId}`,
    };

    return {
      route: routeDetails,
      workflow,
      trace: this.tracker.getTrace(),
    };
  }
}

export function createRouter(config?: RouterConfig): Router {
  return new Router(config);
}

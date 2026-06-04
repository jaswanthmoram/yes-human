import { TraceEvent, TraceObject } from "../types/index.js";

export class TraceTracker {
  private startTime: string;
  private steps: TraceEvent[] = [];

  constructor() {
    this.startTime = new Date().toISOString();
  }

  public addStep(
    step: string,
    status: "pending" | "success" | "failure",
    metadata?: Record<string, any>
  ): void {
    this.steps.push({
      step,
      timestamp: new Date().toISOString(),
      status,
      metadata,
    });
  }

  public getTrace(): TraceObject {
    return {
      startTime: this.startTime,
      endTime: new Date().toISOString(),
      steps: [...this.steps],
    };
  }

  public exportToChromeTrace(): string {
    const traceEvents = this.steps.map((step) => {
      const ts = new Date(step.timestamp).getTime() * 1000;
      return {
        name: step.step,
        cat: "routing",
        ph: "i",
        ts: ts,
        pid: 1,
        tid: 1,
        args: {
          status: step.status,
          ...step.metadata
        }
      };
    });
    return JSON.stringify(traceEvents, null, 2);
  }
}

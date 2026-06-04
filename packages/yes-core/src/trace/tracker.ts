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
}

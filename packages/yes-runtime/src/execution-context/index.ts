import { ExecutionContext, TraceEvent } from "@yes-human/core";

export class RuntimeExecutionContext implements ExecutionContext {
  public variables: Record<string, any> = {};
  public trace: TraceEvent[] = [];

  constructor(initialVariables: Record<string, any> = {}) {
    this.variables = initialVariables;
  }

  public async step<T>(name: string, fn: () => Promise<T> | T): Promise<T> {
    const event: TraceEvent = {
      step: name,
      timestamp: new Date().toISOString(),
      status: "pending",
    };
    this.trace.push(event);

    try {
      const result = await fn();
      event.status = "success";
      event.metadata = { result };
      return result;
    } catch (error: any) {
      event.status = "failure";
      event.metadata = { error: error.message };
      throw error;
    }
  }
}

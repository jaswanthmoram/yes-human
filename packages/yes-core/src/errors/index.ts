export class RouterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RouterError";
  }
}

export class ValidationError extends RouterError {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

export class WorkflowNotFoundError extends RouterError {
  constructor(workflowId: string) {
    super(`Workflow not found: ${workflowId}`);
    this.name = "WorkflowNotFoundError";
  }
}

export class SkillNotFoundError extends RouterError {
  constructor(skillId: string) {
    super(`Skill not found: ${skillId}`);
    this.name = "SkillNotFoundError";
  }
}

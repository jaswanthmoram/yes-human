import { WorkflowDefinition } from "@yes-human/core";
import { RuntimeExecutionContext } from "../execution-context/index.js";
import { SkillRunner } from "../skill-runner/index.js";

export class WorkflowRunner {
  private skillRunner: SkillRunner;

  constructor(skillRunner: SkillRunner = new SkillRunner()) {
    this.skillRunner = skillRunner;
  }

  public async run(
    workflow: WorkflowDefinition,
    input: string
  ): Promise<any> {
    const context = new RuntimeExecutionContext();
    let currentInput = input;

    for (const stepName of workflow.traceSteps) {
      const resultVal = await context.step(stepName, async () => {
        // If it's the first step or matches required skills, run the skill
        if (stepName === "read-source-files" || workflow.requiredSkills.includes(stepName)) {
          const skillId = workflow.requiredSkills[0] || "code-reviewer";
          return await this.skillRunner.run(skillId, currentInput, context);
        }
        return `Step ${stepName} completed.`;
      });

      const stepEvent = context.trace[context.trace.length - 1];
      if (stepEvent) {
        stepEvent.metadata = { result: resultVal };
      }
      currentInput = resultVal;
    }

    return {
      route: {
        id: `route.${workflow.id}`,
        workflowId: workflow.id,
        confidence: 1.0,
        stage: "exact",
        reason: `Executed workflow: ${workflow.name}`
      },
      workflow,
      trace: {
        startTime: new Date().toISOString(),
        endTime: new Date().toISOString(),
        steps: context.trace
      }
    };
  }
}

import { RuntimeExecutionContext } from "../execution-context/index.js";

export class SkillRunner {
  private registry: Map<string, (input: string, context?: any) => Promise<string> | string> = new Map();

  public register(
    skillId: string,
    fn: (input: string, context?: any) => Promise<string> | string
  ): void {
    this.registry.set(skillId, fn);
  }

  public async run(
    skillId: string,
    input: string,
    context: any = {}
  ): Promise<string> {
    const fn = this.registry.get(skillId);
    if (fn) {
      return fn(input, context);
    }
    return `[Mock] Executed skill: ${skillId} with input "${input}"`;
  }
}

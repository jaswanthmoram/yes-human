import { execSync } from "child_process";

export class MarkitdownAdapter {
  public convert(filePath: string): string {
    try {
      const output = execSync(`markitdown "${filePath}"`, { encoding: "utf8" });
      return output;
    } catch (err: any) {
      throw new Error(
        `markitdown CLI is not installed or failed. Please run 'pip install markitdown' to use document conversion tools. Error: ${err.message}`,
        { cause: err }
      );
    }
  }
}

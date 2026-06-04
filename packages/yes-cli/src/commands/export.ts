import { exportToCodex, exportToAntigravity } from "@yes-human/adapters";
import { createRouter } from "@yes-human/core";
import { defaultPack, developerPack } from "@yes-human/packs";
import * as path from "path";

export async function cmdExport(args: string[]): Promise<number> {
  const host = args[0];
  const targetDir = args[1] || path.join(process.cwd(), "exported-config");

  if (!host || (host !== "codex" && host !== "antigravity")) {
    console.error("Usage: yes export <codex|antigravity> [output-dir]");
    return 1;
  }

  const router = createRouter({
    mode: "offline",
    packs: [defaultPack, developerPack],
  });
  const workflows = router.listWorkflows();

  console.log(`Exporting active workflows to ${host} format in "${targetDir}"...`);

  try {
    if (host === "codex") {
      exportToCodex(workflows, targetDir);
    } else {
      exportToAntigravity(workflows, targetDir);
    }
    console.log(`✓ Export completed successfully to: ${targetDir}`);
    return 0;
  } catch (err: any) {
    console.error(`✗ Export failed: ${err.message}`);
    return 1;
  }
}

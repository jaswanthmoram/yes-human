import { createRouter } from "@yes-human/core";
import {
  developerPack,
  documentPack,
  businessPack,
  securityPack,
  startupPack,
  defaultPack
} from "@yes-human/packs";
import { performance } from "perf_hooks";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "../../../..");

interface TestPrompt {
  prompt: string;
  expectedWorkflowId: string;
}

export async function cmdBench(): Promise<number> {
  console.log("Starting yes-human routing benchmarks...\n");

  const startTime = performance.now();
  const initialMemory = process.memoryUsage().heapUsed;

  const router = createRouter({
    mode: "offline",
    packs: [developerPack, documentPack, businessPack, securityPack, startupPack, defaultPack],
  });

  const routes = router.listRoutes();
  const workflows = router.listWorkflows();
  const skills = router.listSkills();

  const loadTime = performance.now() - startTime;
  const memoryAfterLoad = process.memoryUsage().heapUsed;

  // Load prompts from benchmark fixtures
  let testPrompts: TestPrompt[] = [];
  const fixturePaths = [
    path.join(process.cwd(), "benchmarks", "fixtures", "route-prompts.json"),
    path.join(repoRoot, "benchmarks", "fixtures", "route-prompts.json")
  ];

  let loadedFixturePath = "";
  for (const fPath of fixturePaths) {
    if (fs.existsSync(fPath)) {
      try {
        const fileContent = fs.readFileSync(fPath, "utf8");
        testPrompts = JSON.parse(fileContent);
        loadedFixturePath = fPath;
        break;
      } catch (err: any) {
        console.warn(`Failed parsing fixture at ${fPath}: ${err.message}`);
      }
    }
  }

  // Fallback test prompts if file cannot be read
  if (testPrompts.length === 0) {
    console.warn("Could not load benchmark fixtures, falling back to static prompt definitions.");
    testPrompts = [
      { prompt: "review code", expectedWorkflowId: "developer.code-review" },
      { prompt: "bug fix", expectedWorkflowId: "developer.bug-fix" },
      { prompt: "explain code", expectedWorkflowId: "developer.explain-code" },
      { prompt: "generate tests", expectedWorkflowId: "developer.generate-tests" },
      { prompt: "security review", expectedWorkflowId: "developer.security-review" },
      { prompt: "summarize document", expectedWorkflowId: "document.summarize-document" },
      { prompt: "extract tasks", expectedWorkflowId: "document.extract-tasks" },
      { prompt: "create business plan", expectedWorkflowId: "business.business-plan" },
      { prompt: "launch checklist", expectedWorkflowId: "startup.launch-checklist" },
      { prompt: "order a cup of coffee", expectedWorkflowId: "meta-system.supreme-router" }
    ];
  } else {
    console.log(`Loaded ${testPrompts.length} benchmark prompts from: ${path.basename(loadedFixturePath)}`);
  }

  let matches = 0;
  let fallbacks = 0;
  const iterations = 500;
  const routeStart = performance.now();

  for (let i = 0; i < iterations; i++) {
    for (const test of testPrompts) {
      const res = await router.route(test.prompt);
      if (i === 0) {
        const isMatched = res.route.workflowId === test.expectedWorkflowId;
        if (isMatched) matches++;
        if (res.route.stage === "fallback") fallbacks++;
      }
    }
  }

  const routeDuration = performance.now() - routeStart;
  const avgLatency = (routeDuration / (iterations * testPrompts.length)).toFixed(4);

  const nodeVersion = process.version;
  const platform = process.platform;
  const arch = process.arch;
  const cpus = os.cpus();
  const cpuModel = cpus.length > 0 ? cpus[0].model : "Unknown CPU";

  console.log("\n=== Benchmark Environment ===");
  console.log(`Node Version:     ${nodeVersion}`);
  console.log(`Platform / Arch:  ${platform} / ${arch}`);
  console.log(`CPU Model:        ${cpuModel}`);

  console.log("\n=== Benchmark Results ===");
  console.log(`Routes Loaded:    ${routes.length}`);
  console.log(`Workflows Loaded: ${workflows.length}`);
  console.log(`Skills Loaded:    ${skills.length}`);
  console.log(`Startup Time:     ${loadTime.toFixed(2)} ms`);
  console.log(`Memory Usage:     ${((memoryAfterLoad - initialMemory) / 1024 / 1024).toFixed(3)} MB`);
  console.log(`Avg Route Lat:    ${avgLatency} ms`);
  console.log(`Route Accuracy:   ${((matches / testPrompts.length) * 100).toFixed(1)}%`);
  console.log(`Fallback Rate:    ${((fallbacks / testPrompts.length) * 100).toFixed(1)}%`);
  console.log("\n[Note: Local benchmark output. Performance details vary by architecture load]");

  return 0;
}

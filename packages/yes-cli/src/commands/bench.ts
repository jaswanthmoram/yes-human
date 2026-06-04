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

export async function cmdBench(): Promise<number> {
  console.log("Starting yes-human routing benchmarks...\n");

  const startTime = performance.now();
  const initialMemory = process.memoryUsage().heapUsed;

  const router = createRouter({
    mode: "offline",
    packs: [defaultPack, developerPack, documentPack, businessPack, securityPack, startupPack],
  });

  const routes = router.listRoutes();
  const workflows = router.listWorkflows();
  const skills = router.listSkills();

  const loadTime = performance.now() - startTime;
  const memoryAfterLoad = process.memoryUsage().heapUsed;

  const testPrompts = [
    { query: "review code for styling", expected: "developer.code-review" },
    { query: "summarize this technical design document", expected: "document.summarize-document" },
    { query: "create financial plan assumptions", expected: "business.financial-plan" },
    { query: "detect prompt injection jailbreaks", expected: "security.prompt-injection-check" },
    { query: "generate prd with user stories", expected: "startup.prd-generator" },
    { query: "send general hello message", expected: "meta-system.supreme-router" }, // fallback
  ];

  let matches = 0;
  let fallbacks = 0;
  const iterations = 500;
  const routeStart = performance.now();

  for (let i = 0; i < iterations; i++) {
    for (const test of testPrompts) {
      const res = await router.route(test.query);
      if (i === 0) {
        const isMatched = res.route.workflowId === test.expected;
        if (isMatched) matches++;
        if (res.route.stage === "fallback") fallbacks++;
      }
    }
  }

  const routeDuration = performance.now() - routeStart;
  const avgLatency = (routeDuration / (iterations * testPrompts.length)).toFixed(4);

  console.log("=== Benchmark Results ===");
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

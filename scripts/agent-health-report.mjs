#!/usr/bin/env node
import fs from "fs";
import path from "path";
const repoRoot = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..");
const f = path.join(repoRoot, "graph/memory/learning/outcomes.jsonl");
const lines = fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\n").filter(Boolean) : [];
const wrong = new Map();
for (const line of lines) {
  try {
    const o = JSON.parse(line);
    if (o.failure_class === "wrong-agent") wrong.set(o.route_id, (wrong.get(o.route_id)||0)+1);
  } catch {}
}
const flagged = [...wrong.entries()].filter(([,c]) => c >= 2);
const md = ["# Agent health report", "", `Generated: ${new Date().toISOString()}`, "", ...flagged.map(([r,c]) => `- ${r}: ${c}`)];
fs.mkdirSync(path.join(repoRoot, "reports"), { recursive: true });
fs.writeFileSync(path.join(repoRoot, "reports/agent-health.md"), md.join("\n") + "\n");
console.log("flagged", flagged.length);

#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
function ok(args) { const r = spawnSync("node", args, { cwd: repoRoot }); return (r.status ?? 1) === 0; }

function countProductionSkills(root) {
  let n = 0;
  function walk(d) {
    for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name === "SKILL.md") {
        const text = fs.readFileSync(p, "utf8");
        if (/quality_gate:\s*production/.test(text)) n++;
      }
    }
  }
  if (fs.existsSync(path.join(root, "content/skills"))) walk(path.join(root, "content/skills"));
  return n;
}

const agents = JSON.parse(fs.readFileSync(path.join(repoRoot, "registry/agents.json"), "utf8"));
const skills = JSON.parse(fs.readFileSync(path.join(repoRoot, "registry/skills.json"), "utf8"));
const report = {
  version: "2.3.0",
  generated_at: new Date().toISOString(),
  agents_production: (agents.items||[]).filter(a=>a.quality_gate==="production").length,
  skills_production: countProductionSkills(repoRoot),
  route_eval: ok(["packages/yes-schema/eval-route.js"]),
  skill_eval: ok(["packages/yes-schema/eval-skill.js"]),
  workflow_eval: ok(["packages/yes-schema/eval-workflow.js"]),
  drift: ok(["packages/yes-schema/validate-drift.js"])
};
fs.mkdirSync(path.join(repoRoot, "reports"), { recursive: true });
fs.writeFileSync(path.join(repoRoot, "reports/phase12-acceptance.json"), JSON.stringify(report, null, 2));
const pass = report.route_eval && report.skill_eval && report.workflow_eval && report.drift;
console.log(JSON.stringify(report, null, 2));
process.exit(pass ? 0 : 1);

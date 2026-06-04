import { test } from "node:test";
import assert from "node:assert/strict";
import * as fs from "node:fs";
import * as path from "node:path";
import * as os from "node:os";
import { exportToCodex, exportToAntigravity } from "../packages/yes-adapters/dist/index.js";
import { developerPack } from "../packages/yes-packs/dist/index.js";

test("exports configuration to Codex and Antigravity directories with correct content structure", () => {
  const tmpDir = path.join(os.tmpdir(), `yh-export-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // 1. Test Codex Export
    const codexOut = path.join(tmpDir, "codex");
    exportToCodex(developerPack.workflows, codexOut);

    const agentsMdPath = path.join(codexOut, "AGENTS.md");
    assert.ok(fs.existsSync(agentsMdPath));
    const agentsMd = fs.readFileSync(agentsMdPath, "utf8");
    assert.match(agentsMd, /# AGENTS.md — Codex Instruction Surface/);
    assert.match(agentsMd, /developer.code-review/);

    const skillMdPath = path.join(codexOut, ".codex", "skills", "code-review", "SKILL.md");
    assert.ok(fs.existsSync(skillMdPath));
    const skillMd = fs.readFileSync(skillMdPath, "utf8");
    assert.ok(skillMd.length > 0, "SKILL.md should not be empty");
    
    // Assert section headers are generated
    assert.match(skillMd, /# Code Review Codex Skill/);
    assert.match(skillMd, /## Purpose/);
    assert.match(skillMd, /## When to Use/);
    assert.match(skillMd, /## Workflow Steps/);
    assert.match(skillMd, /## Input Expectations/);
    assert.match(skillMd, /## Output Expectations/);
    assert.match(skillMd, /## Testing\/Checklist/);
    assert.match(skillMd, /## Safety\/Quality Rules/);

    // Verify useful workflow steps are included
    assert.match(skillMd, /read-source-files/);
    assert.match(skillMd, /analyze-code-style/);
    assert.match(skillMd, /generate-review-report/);

    // 2. Test Antigravity Export
    const antigravityOut = path.join(tmpDir, "antigravity");
    exportToAntigravity(developerPack.workflows, antigravityOut);

    const agAgentsMdPath = path.join(antigravityOut, "agents.md");
    assert.ok(fs.existsSync(agAgentsMdPath));
    const agAgentsMd = fs.readFileSync(agAgentsMdPath, "utf8");
    assert.match(agAgentsMd, /# Antigravity Agents Registry/);

    const agSkillMdPath = path.join(antigravityOut, "skills", "code-review", "SKILL.md");
    assert.ok(fs.existsSync(agSkillMdPath));
    const agSkillMd = fs.readFileSync(agSkillMdPath, "utf8");
    assert.ok(agSkillMd.length > 0);
    assert.match(agSkillMd, /# Antigravity Skill: Code Review/);
    assert.match(agSkillMd, /## Protocol Steps/);

    const agWfMdPath = path.join(antigravityOut, "workflows", "feature-build.md");
    assert.ok(fs.existsSync(agWfMdPath));
    const agWfMd = fs.readFileSync(agWfMdPath, "utf8");
    assert.match(agWfMd, /# Workflow: Feature Build Workflow/);

  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test("exporters handle invalid or empty workflow pack safely", () => {
  const tmpDir = path.join(os.tmpdir(), `yh-export-err-${Date.now()}`);
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // Empty workflows array should generate baseline assets
    const codexOut = path.join(tmpDir, "codex");
    exportToCodex([], codexOut);
    assert.ok(fs.existsSync(path.join(codexOut, "AGENTS.md")));

    const antigravityOut = path.join(tmpDir, "antigravity");
    exportToAntigravity([], antigravityOut);
    assert.ok(fs.existsSync(path.join(antigravityOut, "agents.md")));

    // Null/undefined inputs should throw errors cleanly
    assert.throws(() => exportToCodex(null, codexOut), /Invalid workflows: array required/);
    assert.throws(() => exportToAntigravity(null, antigravityOut), /Invalid workflows: array required/);
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

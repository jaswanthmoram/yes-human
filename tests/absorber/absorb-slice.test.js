import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { copySkillsFromStaging } from '../../packages/yes-absorber/copy-skills.js';

let tmp;
before(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'yh-absorb-slice-'));
  const slug = 'fixture-skills';
  const skillDir = path.join(tmp, 'staging/normalized', slug, 'demo-skill');
  fs.writeFileSync(path.join(tmp, 'package.json'), '{"name":"fixture"}\n');
  fs.mkdirSync(skillDir, { recursive: true });
  fs.writeFileSync(path.join(skillDir, 'SKILL.md'), '---\nid: meta-system.demo-skill\n---\n# Demo\n');
  fs.mkdirSync(path.join(tmp, 'registry'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'registry/ledger.jsonl'), '');
});

after(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

test('copySkillsFromStaging copies SKILL.md into content/skills', () => {
  const prev = process.cwd();
  try {
    process.chdir(tmp);
    const r = copySkillsFromStaging('fixture-skills', { domain: 'meta-system', maxFiles: 5 });
    assert.equal(r.copied.length, 1);
    assert.ok(fs.existsSync(path.join(tmp, 'content/skills/meta-system/demo-skill/SKILL.md')));
  } finally {
    process.chdir(prev);
  }
});

import fs from 'fs';
import path from 'path';
import { repoRoot as defaultRepoRoot } from './index.js';

function getRepoRoot() {
  const cwd = process.cwd();
  if (fs.existsSync(path.join(cwd, 'package.json')) && fs.existsSync(path.join(cwd, 'staging'))) {
    return cwd;
  }
  return defaultRepoRoot;
}

/**
 * Copy SKILL.md files from staging/normalized/<slug> into content/skills/<domain>/.
 */
export function copySkillsFromStaging(slug, { domain = 'meta-system', maxFiles = 10, changeId = null } = {}) {
  const srcRoot = path.join(getRepoRoot(), 'staging', 'normalized', slug);
  if (!fs.existsSync(srcRoot)) {
    throw new Error(`No staged source at staging/normalized/${slug}`);
  }

  const filesAdded = [];
  const copied = [];

  function walk(dir) {
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name === 'SKILL.md' && copied.length < maxFiles) {
        const rel = path.relative(srcRoot, p);
        const skillId = rel.replace(/\/SKILL\.md$/, '').replace(/\//g, '.').replace(/\\/g, '.');
        const destDir = path.join(getRepoRoot(), 'content/skills', domain, skillId);
        fs.mkdirSync(destDir, { recursive: true });
        const dest = path.join(destDir, 'SKILL.md');
        if (fs.existsSync(dest)) continue;
        fs.copyFileSync(p, dest);
        const relDest = path.relative(getRepoRoot(), dest);
        filesAdded.push(relDest);
        copied.push({ skillId: `${domain}.${skillId}`, dest: relDest });
      }
    }
  }
  walk(srcRoot);

  if (changeId) {
    const rollbackPath = path.join(getRepoRoot(), 'staging/rollback', `${changeId}.json`);
    if (fs.existsSync(rollbackPath)) {
      const rb = JSON.parse(fs.readFileSync(rollbackPath, 'utf8'));
      rb.files_added = [...(rb.files_added || []), ...filesAdded];
      fs.writeFileSync(rollbackPath, JSON.stringify(rb, null, 2) + '\n');
    }
  }

  const ledgerPath = path.join(getRepoRoot(), 'registry/ledger.jsonl');
  fs.appendFileSync(ledgerPath, JSON.stringify({
    type: 'absorb_copy_skills',
    slug,
    domain,
    files_added: filesAdded,
    at: new Date().toISOString()
  }) + '\n');

  return { slug, domain, copied, files_added: filesAdded };
}

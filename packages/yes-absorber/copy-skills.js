import fs from 'fs';
import path from 'path';
import { repoRoot as defaultRepoRoot } from './index.js';
import { promoteContentFromStaging } from './promote-content.js';

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
  const r = promoteContentFromStaging(slug, {
    domain,
    maxPerKind: maxFiles,
    changeId,
    repoRoot: getRepoRoot()
  });
  const copied = r.promoted.skills.map((skillId) => ({
    skillId,
    dest: r.files_added.find((f) => f.includes('SKILL.md')) || ''
  }));
  return { slug, domain, copied, files_added: r.files_added };
}

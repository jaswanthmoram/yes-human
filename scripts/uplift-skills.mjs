#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
function walk(dir, acc=[]) {
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if(e.isDirectory()) walk(p,acc);
    else if(e.name==='SKILL.md') acc.push(p);
  }
  return acc;
}
let n=0;
for (const f of walk(path.join(repoRoot,'content/skills'))) {
  let t=fs.readFileSync(f,'utf8');
  if (!t.includes('## Procedure') && t.includes('steps:')) {
    t += '\n## Procedure\n1. Clarify inputs\n2. Apply dossier patterns\n3. Verify outputs\n';
    fs.writeFileSync(f,t); n++;
  }
}
console.log('touched',n,'skills');

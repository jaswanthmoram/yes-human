import fs from 'fs';
import path from 'path';
import { checkAgentPromotion } from '../../../validators/promotion.validator.js';
import { proposeRouteProposal } from '../../yes-runtime/learning-propose.js';
import { CodeGraph } from '../../yes-graph/index.js';
import { copySkillsFromStaging } from '../../yes-absorber/copy-skills.js';
import { repoRoot, readJSONSafe } from './helpers.js';

export function cmdStatus() {
  const j = (rel) => {
    try {
      return JSON.parse(fs.readFileSync(path.join(repoRoot, rel), 'utf8'));
    } catch {
      return null;
    }
  };
  const agents = j('registry/agents.json');
  const skills = j('registry/skills.json');
  const workflows = j('registry/workflows.json');
  const mcps = j('registry/mcps.json');
  const boot = fs.existsSync(path.join(repoRoot, 'packages/yes-schema/eval-cost.js'))
    ? (() => {
        try {
          return fs.readFileSync(path.join(repoRoot, 'YES_BOOT.md'), 'utf8').trim().split(/\s+/).length;
        } catch {
          return '?';
        }
      })()
    : '?';
  const sqliteExists = fs.existsSync(path.join(repoRoot, 'graph/indexes/yes.sqlite'));
  const personaFile = path.join(process.cwd(), '.yes-human-persona');
  const activePersona = fs.existsSync(personaFile) ? fs.readFileSync(personaFile, 'utf8').trim() : '(none)';
  const adaptersBuilt = ['claude', 'codex', 'opencode', 'mcp', 'cursor', 'windsurf', 'generic'].filter((h) =>
    fs.existsSync(path.join(repoRoot, 'generated', h))
  );

  console.log('yes-human status\n');
  console.log(`  Node           : ${process.versions.node}`);
  console.log(`  Boot tokens    : ~${boot} (target ≤180, hard cap 300)`);
  console.log(`  Active persona : ${activePersona}`);
  console.log(`  Code graph     : ${sqliteExists ? '✓ built' : '○ not built (run: yes graph build .)'}`);
  console.log(`  Agents         : ${agents?.count ?? '?'}`);
  console.log(`  Skills         : ${skills?.count ?? '?'}`);
  console.log(`  Workflows      : ${workflows?.count ?? '?'}`);
  console.log(`  Connectors     : ${mcps?.count ?? '?'}`);
  console.log(
    `  Adapter packs  : ${adaptersBuilt.length > 0 ? adaptersBuilt.join(', ') : '(none built — run: yes build all)'}`
  );
  return 0;
}

export function cmdPersona(args) {
  const sub = args[0];
  const personaFile = path.join(process.cwd(), '.yes-human-persona');
  const reg = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.join(repoRoot, 'registry', 'personas.json'), 'utf8'));
    } catch {
      return { items: [] };
    }
  })();

  if (sub === 'set') {
    const personaId = args[1];
    if (!personaId) {
      console.error('Usage: yes persona set <persona-id>');
      return 1;
    }
    const found = reg.items.find((p) => p.persona_id === personaId);
    if (!found) {
      console.error(`Unknown persona: ${personaId}`);
      console.error(`Available: ${reg.items.map((p) => p.persona_id).join(', ')}`);
      return 1;
    }
    try {
      fs.writeFileSync(personaFile, personaId);
    } catch (err) {
      console.error(`✗ Failed to set persona: ${err.message}`);
      return 1;
    }
    console.log(`✓ Persona set to: ${found.name} (${personaId})`);
    console.log(`  Default domain : ${found.default_domain}`);
    console.log(`  Budget bias    : ${found.budget_bias}`);
    if (found.disclaimer_level && found.disclaimer_level !== 'none') {
      console.log(`  ⚠ Disclaimer level: ${found.disclaimer_level}`);
    }
    return 0;
  }

  if (sub === 'clear') {
    if (fs.existsSync(personaFile)) {
      try {
        fs.unlinkSync(personaFile);
      } catch (err) {
        console.error(`✗ Failed to clear persona: ${err.message}`);
        return 1;
      }
    }
    console.log('✓ Persona cleared (defaulting to system master routing)');
    return 0;
  }

  if (!sub || sub === 'list') {
    console.log('Available Personas:\n');
    const activeFile = fs.existsSync(personaFile) ? fs.readFileSync(personaFile, 'utf8').trim() : null;
    for (const p of reg.items || []) {
      const activeMarker = p.persona_id === activeFile ? '  * ' : '    ';
      console.log(
        `${activeMarker}${p.persona_id.padEnd(16)} — ${p.name.padEnd(20)} [default: ${p.default_domain.padEnd(12)} budget: ${p.budget_bias}]`
      );
    }
    return 0;
  }

  console.error(`Unknown persona subcommand: ${sub}. Try: yes persona list | set <id> | clear`);
  return 1;
}

export function cmdVersion(args) {
  const sub = args[0];
  const ledgerPath = path.join(repoRoot, 'registry', 'version-ledger.json');
  let ledger;
  try {
    ledger = fs.existsSync(ledgerPath) ? JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) : { entries: [] };
  } catch (err) {
    console.error(`✗ Failed to read version ledger: ${err.message}`);
    return 1;
  }

  if (!sub || sub === 'list') {
    const artifactId = args[1];
    const entries = artifactId ? ledger.entries.filter((e) => e.artifact_id === artifactId) : ledger.entries.slice(-20);
    if (entries.length === 0) {
      console.log(
        artifactId ? `No version history for: ${artifactId}` : 'Version ledger is empty. Run `yes compile` to populate.'
      );
      return 0;
    }
    console.log(artifactId ? `Version history: ${artifactId}\n` : `Recent artifact versions (${entries.length}):\n`);
    for (const e of entries) {
      console.log(
        `  ${e.artifact_id.padEnd(40)} v${e.artifact_version}  ${e.artifact_type.padEnd(8)}  ${e.hash.slice(0, 8)}  ${e.recorded_at.slice(0, 10)}`
      );
    }
    return 0;
  }

  if (sub === 'diff') {
    const artifactId = args[1];
    if (!artifactId) {
      console.error('Usage: yes version diff <artifact-id> <v1> <v2>');
      return 1;
    }
    const v1 = args[2],
      v2 = args[3];
    const entries = ledger.entries.filter((e) => e.artifact_id === artifactId);
    const e1 = entries.find((e) => e.artifact_version === v1);
    const e2 = entries.find((e) => e.artifact_version === v2);
    if (!e1) {
      console.error(`Version ${v1} not found for ${artifactId}`);
      return 1;
    }
    if (!e2) {
      console.error(`Version ${v2} not found for ${artifactId}`);
      return 1;
    }
    console.log(`Diff ${artifactId}: v${v1} (${e1.hash.slice(0, 8)}) → v${v2} (${e2.hash.slice(0, 8)})`);
    console.log(`  Recorded: ${e1.recorded_at.slice(0, 16)} → ${e2.recorded_at.slice(0, 16)}`);
    if (e1.hash === e2.hash) console.log('  (no content change)');
    else console.log('  Content changed (hashes differ).');
    return 0;
  }

  if (sub === 'copy-skills') {
    const slug = args[1];
    if (!slug) {
      console.error('Usage: yes absorb copy-skills <slug> [--domain meta-system]');
      return 1;
    }
    const domainIdx = args.indexOf('--domain');
    const domain = domainIdx >= 0 ? args[domainIdx + 1] : 'meta-system';
    const changeIdx = args.indexOf('--change-id');
    const changeId = changeIdx >= 0 ? args[changeIdx + 1] : null;
    try {
      const r = copySkillsFromStaging(slug, { domain, maxFiles: 5, changeId });
      console.log(`✓ Copied ${r.copied.length} skill(s) from ${slug}`);
      for (const c of r.copied) console.log(`  ${c.skillId} → ${c.dest}`);
      return 0;
    } catch (e) {
      console.error(`✗ ${e.message}`);
      return 1;
    }
  }

  if (sub === 'rollback') {
    const artifactId = args[1],
      version = args[2];
    const confirm = args.includes('--confirm');
    if (!artifactId || !version) {
      console.error('Usage: yes version rollback <artifact-id> <version> [--confirm]');
      return 1;
    }
    if (!confirm) {
      console.log(`Would rollback ${artifactId} to v${version}. Add --confirm to apply.`);
      console.log('This writes a rollback record to staging/rollback/.');
      return 0;
    }
    const rollback = {
      change_id: `version-rollback-${artifactId.replace(/\./g, '-')}-${version}-${Date.now()}`,
      created_at: new Date().toISOString(),
      reason: `version rollback ${artifactId} to v${version}`,
      files_added: [],
      files_modified: [],
      registry_entries_added: [],
      graph_edges_added: [],
      previous_hashes: {},
      rollback_command: `yes version rollback ${artifactId} ${version} --confirm`,
      safe_to_auto_rollback: false
    };
    const rollbackDir = path.join(repoRoot, 'staging', 'rollback');
    fs.mkdirSync(rollbackDir, { recursive: true });
    fs.writeFileSync(path.join(rollbackDir, `${rollback.change_id}.json`), JSON.stringify(rollback, null, 2));
    console.log(`✓ Rollback record written: staging/rollback/${rollback.change_id}.json`);
    console.log('  Review the record and manually restore the artifact to complete the rollback.');
    return 0;
  }

  console.error('Usage: yes version list [<artifact-id>] | diff <id> <v1> <v2> | rollback <id> <version> [--confirm]');
  return 1;
}

export function cmdLearning(args) {
  const sub = args[0];
  if (sub === 'propose-route') {
    const phraseIdx = args.indexOf('--phrase');
    const routeIdx = args.indexOf('--route');
    const phrase = phraseIdx >= 0 ? args[phraseIdx + 1] : null;
    const routeId = routeIdx >= 0 ? args[routeIdx + 1] : null;
    if (!phrase || !routeId) {
      console.error('Usage: yes learning propose-route --phrase "<text>" --route <route-id>');
      return 1;
    }
    try {
      const r = proposeRouteProposal(repoRoot, { phrase, route_id: routeId });
      console.log(JSON.stringify(r, null, 2));
      return 0;
    } catch (e) {
      console.error('✗ ' + e.message);
      return 1;
    }
  }
  console.error('Usage: yes learning propose-route --phrase "<text>" --route <route-id>');
  return 1;
}

export function cmdContribute(args) {
  const kind = args[0]; // agent | skill
  const filePath = args[1];
  if (!kind || !filePath || !['agent', 'skill'].includes(kind)) {
    console.error('Usage: yes contribute agent <path> | yes contribute skill <path>');
    return 1;
  }
  const absPath = path.resolve(filePath);
  if (!fs.existsSync(absPath)) {
    console.error(`File not found: ${absPath}`);
    return 1;
  }

  let content;
  try {
    content = fs.readFileSync(absPath, 'utf8');
  } catch (err) {
    console.error(`✗ Failed to read file: ${err.message}`);
    return 1;
  }
  const slug = path.basename(absPath, path.extname(absPath));
  const stagingDir = path.join(repoRoot, 'staging', 'incoming', `contrib-${kind}-${slug}`);
  try {
    fs.mkdirSync(stagingDir, { recursive: true });
    fs.copyFileSync(absPath, path.join(stagingDir, path.basename(absPath)));
  } catch (err) {
    console.error(`✗ Failed to stage file: ${err.message}`);
    return 1;
  }

  // Basic validation
  const issues = [];
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]+?)\r?\n---/);
  if (!frontmatterMatch) issues.push('missing YAML frontmatter');
  else {
    if (!content.includes('triggers:')) issues.push('missing triggers field');
    if (!content.includes('quality_gate:')) issues.push('missing quality_gate field');
    if (!content.includes('source_references:')) issues.push('missing source_references field');
  }

  const manifest = {
    kind,
    slug,
    source_file: path.relative(repoRoot, absPath),
    staged_at: new Date().toISOString(),
    validation_issues: issues,
    decision: issues.length === 0 ? 'pending_review' : 'needs_fixes',
    next_steps:
      issues.length === 0
        ? [
            `Create references/<domain>/${slug}.sources.json dossier`,
            'Run: yes dossier validate <agent-id>',
            'Submit PR for human review'
          ]
        : issues.map((i) => `Fix: ${i}`)
  };
  fs.writeFileSync(path.join(stagingDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`\nContribution staged: contrib-${kind}-${slug}`);
  console.log(`  File     : ${manifest.source_file}`);
  console.log(`  Decision : ${manifest.decision}`);
  if (issues.length > 0) {
    console.log('\n  Issues to fix:');
    for (const i of issues) console.log(`    ✗ ${i}`);
  } else {
    console.log('\n  Next steps:');
    for (const s of manifest.next_steps) console.log(`    → ${s}`);
  }
  return issues.length === 0 ? 0 : 1;
}

export function cmdDossier(args) {
  if (args[0] !== 'validate' || !args[1]) {
    console.error('Usage: yes dossier validate <agent-id> [--gate production|staging]');
    return 1;
  }
  const agentId = args[1];
  const gateIdx = args.indexOf('--gate');
  const targetGate = gateIdx >= 0 ? args[gateIdx + 1] : 'production';
  let result;
  try {
    result = checkAgentPromotion(repoRoot, agentId, { targetGate });
  } catch (err) {
    console.error(`✗ Dossier validation failed: ${err.message}`);
    return 1;
  }
  let total = null;
  try {
    const p = path.join(
      repoRoot,
      'references',
      agentId.split('.')[0],
      `${agentId.split('.').slice(1).join('.')}.sources.json`
    );
    total = JSON.parse(fs.readFileSync(p, 'utf8')).scores?.total ?? null;
  } catch {
    /* ignore */
  }
  console.log(`dossier: ${agentId} (gate: ${targetGate})`);
  if (total !== null) console.log(`score: ${total}/100`);
  for (const w of result.warnings) console.log(`⚠ ${w}`);
  if (result.allowed) {
    console.log(`✓ dossier valid for ${targetGate}`);
    return 0;
  }
  for (const b of result.blockers) console.log(`✗ ${b}`);
  console.log(`\n✗ dossier not valid for ${targetGate}`);
  return 1;
}

const LARGE_REPO_FILE_THRESHOLD = 5000;
const DEFAULT_GRAPH_DB = 'graph/indexes/yes.sqlite';

function countCandidateFiles(repoPath) {
  const SKIP = new Set([
    'node_modules',
    '.git',
    '.venv',
    'venv',
    '__pycache__',
    'dist',
    'build',
    'target',
    '.next',
    '.nuxt',
    'coverage',
    '.cache',
    'generated'
  ]);
  const KNOWN_EXT = new Set([
    '.js',
    '.mjs',
    '.cjs',
    '.ts',
    '.tsx',
    '.jsx',
    '.py',
    '.go',
    '.rs',
    '.java',
    '.rb',
    '.md',
    '.json',
    '.yaml',
    '.yml',
    '.toml',
    '.sql'
  ]);
  let n = 0;
  (function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (SKIP.has(e.name) || e.name.startsWith('.git')) continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile() && KNOWN_EXT.has(path.extname(e.name))) n++;
    }
  })(path.resolve(repoPath));
  return n;
}

export async function cmdGraph(args) {
  const sub = args[0];

  if (sub === 'build') {
    const target = args[1] || '.';
    const force = args.includes('--yes') || args.includes('-y');
    const dbPath = path.join(repoRoot, DEFAULT_GRAPH_DB);

    const candidateCount = countCandidateFiles(target);
    if (candidateCount > LARGE_REPO_FILE_THRESHOLD && !force) {
      console.error(
        `✗ Large repo detected (${candidateCount} candidate files > ${LARGE_REPO_FILE_THRESHOLD} threshold).`
      );
      console.error(`  Re-run with --yes to confirm: yes graph build ${target} --yes`);
      return 1;
    }

    console.log(`Building code graph for ${path.resolve(target)} → ${DEFAULT_GRAPH_DB}`);
    console.log(`Candidate files: ${candidateCount}`);
    const t0 = Date.now();
    let result;
    try {
      result = await CodeGraph.build(target, dbPath, {
        onProgress: (n, total) => process.stderr.write(`\r  indexed ${n}/${total}`)
      });
    } catch (err) {
      console.error(`✗ Graph build failed: ${err.message}`);
      return 1;
    }
    process.stderr.write('\n');
    const dt = ((Date.now() - t0) / 1000).toFixed(2);
    console.log(
      `✓ Indexed ${result.filesIndexed} files, ${result.symbols} symbols, ${result.imports} imports in ${dt}s`
    );
    return 0;
  }

  if (sub === 'stats') {
    const dbPath = path.join(repoRoot, DEFAULT_GRAPH_DB);
    if (!fs.existsSync(dbPath)) {
      console.error('✗ No graph yet. Run: yes graph build <path>');
      return 1;
    }
    let brief;
    const graph = new CodeGraph(dbPath);
    try {
      brief = graph.briefing();
    } finally {
      graph.close();
    }
    console.log(`Repo: ${brief.repo_path}`);
    console.log(`Built: ${brief.built_at}`);
    console.log(`Files: ${brief.file_count} | Symbols: ${brief.symbol_count} | Imports: ${brief.import_count}\n`);
    console.log('Languages:');
    for (const r of brief.languages) console.log(`  ${r.language.padEnd(12)} ${r.n}`);
    console.log('\nSymbol kinds:');
    for (const r of brief.symbol_kinds) console.log(`  ${r.kind.padEnd(12)} ${r.n}`);
    return 0;
  }

  if (sub === 'query') {
    const query = args.slice(1).join(' ').trim();
    if (!query) {
      console.error('Usage: yes graph query "<symbol or path keyword>"');
      return 1;
    }
    const dbPath = path.join(repoRoot, DEFAULT_GRAPH_DB);
    if (!fs.existsSync(dbPath)) {
      console.error('✗ No graph yet. Run: yes graph build <path>');
      return 1;
    }
    let hits;
    const graph = new CodeGraph(dbPath);
    try {
      hits = graph.search(query, { limit: 20 });
    } finally {
      graph.close();
    }
    if (hits.length === 0) {
      console.log('(no matches)');
      return 0;
    }
    console.log(`${hits.length} hit(s):\n`);
    for (const h of hits) {
      const loc = h.source === 'symbol' ? `${h.file}:${h.line}` : h.file;
      const label = h.source === 'symbol' ? `${h.kind} ${h.name}` : `file (${h.kind})`;
      console.log(`  ${loc.padEnd(60)} ${label}`);
    }
    return 0;
  }

  console.error('Usage: yes graph <build|stats|query>');
  return 1;
}

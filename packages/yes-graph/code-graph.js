/**
 * CodeGraph: SQLite-backed code retrieval engine for yes-graph.
 *
 * Three small tables (per architecture §22.1.3):
 *   files     — path, language, size, hash, lines
 *   symbols   — file_id, kind (function/class/export/const), name, line
 *   imports   — file_id, module (resolved or raw)
 *
 * Plus a meta table tracking build metadata + file hashes for staleness detection.
 *
 * Returns COMPACT CONTEXT PACKS (file_path + symbol/line + tiny snippet), never
 * full files — that's the core low-token retrieval rule (§30.3).
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { DatabaseSync } from 'node:sqlite';

// Languages we extract symbols for via lightweight regex.
// Tree-sitter is the long-term plan; this gives us a fast, dependency-free MVP.
const LANG_BY_EXT = {
  '.js': 'javascript',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.jsx': 'javascript',
  '.py': 'python',
  '.go': 'go',
  '.rs': 'rust',
  '.java': 'java',
  '.rb': 'ruby',
  '.md': 'markdown',
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.toml': 'toml',
  '.sql': 'sql'
};

// Symbol patterns per language. Keep them simple and explicit — fewer false matches
// than fancy heuristics, easy to read.
const SYMBOL_PATTERNS = {
  javascript: [
    { kind: 'function', re: /^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm },
    { kind: 'class', re: /^\s*(?:export\s+)?class\s+([A-Za-z_$][\w$]*)/gm },
    { kind: 'const', re: /^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*=/gm }
  ],
  typescript: [
    { kind: 'function', re: /^\s*(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)/gm },
    { kind: 'class', re: /^\s*(?:export\s+)?class\s+([A-Za-z_$][\w$]*)/gm },
    { kind: 'interface', re: /^\s*(?:export\s+)?interface\s+([A-Za-z_$][\w$]*)/gm },
    { kind: 'type', re: /^\s*(?:export\s+)?type\s+([A-Za-z_$][\w$]*)\s*=/gm },
    { kind: 'const', re: /^\s*(?:export\s+)?(?:const|let|var)\s+([A-Za-z_$][\w$]*)\s*[:=]/gm }
  ],
  python: [
    { kind: 'function', re: /^def\s+([A-Za-z_][\w]*)/gm },
    { kind: 'class', re: /^class\s+([A-Za-z_][\w]*)/gm }
  ],
  go: [
    { kind: 'function', re: /^func\s+(?:\([^)]+\)\s+)?([A-Za-z_][\w]*)/gm },
    { kind: 'type', re: /^type\s+([A-Za-z_][\w]*)/gm }
  ],
  rust: [
    { kind: 'function', re: /^(?:pub\s+)?fn\s+([A-Za-z_][\w]*)/gm },
    { kind: 'struct', re: /^(?:pub\s+)?struct\s+([A-Za-z_][\w]*)/gm },
    { kind: 'enum', re: /^(?:pub\s+)?enum\s+([A-Za-z_][\w]*)/gm }
  ]
};

const IMPORT_PATTERNS = {
  javascript: /^\s*import\s+(?:[^'"]*from\s+)?['"]([^'"]+)['"]/gm,
  typescript: /^\s*import\s+(?:[^'"]*from\s+)?['"]([^'"]+)['"]/gm,
  python: /^\s*(?:from\s+([\w.]+)\s+import|import\s+([\w.]+))/gm,
  go: /^\s*import\s+(?:\(\s*)?["]([^"]+)["]/gm,
  rust: /^\s*use\s+([\w:]+)/gm
};

// Heuristics for skipping noisy directories at any depth.
const SKIP_DIRS = new Set([
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

// Path-prefix exclusions (relative to repo root) used by yes-human itself.
// Keeps the graph focused on canonical source; staged reference plugins are
// reference material, not yes-human's own code.
const SKIP_PATH_PREFIXES = ['staging/incoming/', 'reports/source-mining/'];

// Large file cap — skip generated lockfiles, minified bundles, etc.
const MAX_FILE_BYTES = 500_000;

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex').slice(0, 16);
}

function lineOf(text, offset) {
  // 1-indexed line number for a byte offset.
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

function extractSymbols(text, language) {
  const patterns = SYMBOL_PATTERNS[language];
  if (!patterns) return [];
  const out = [];
  for (const { kind, re } of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(text)) !== null) {
      out.push({ kind, name: m[1], line: lineOf(text, m.index) });
    }
  }
  return out;
}

function extractImports(text, language) {
  const re = IMPORT_PATTERNS[language];
  if (!re) return [];
  const out = [];
  re.lastIndex = 0;
  let m;
  while ((m = re.exec(text)) !== null) {
    const mod = m[1] || m[2];
    if (mod) out.push(mod);
  }
  return [...new Set(out)];
}

// ── CodeGraph ────────────────────────────────────────────────────────────────

export class CodeGraph {
  constructor(dbPath) {
    this.dbPath = dbPath;
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    this.db = new DatabaseSync(dbPath);
    this.#initSchema();
  }

  #initSchema() {
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS meta (
        key TEXT PRIMARY KEY,
        value TEXT
      );
      CREATE TABLE IF NOT EXISTS files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        path TEXT UNIQUE NOT NULL,
        language TEXT,
        size_bytes INTEGER,
        line_count INTEGER,
        hash TEXT
      );
      CREATE TABLE IF NOT EXISTS symbols (
        file_id INTEGER NOT NULL REFERENCES files(id) ON DELETE CASCADE,
        kind TEXT NOT NULL,
        name TEXT NOT NULL,
        line INTEGER NOT NULL
      );
      CREATE TABLE IF NOT EXISTS imports (
        file_id INTEGER NOT NULL REFERENCES files(id) ON DELETE CASCADE,
        module TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_symbols_name ON symbols(name);
      CREATE INDEX IF NOT EXISTS idx_imports_module ON imports(module);
      CREATE INDEX IF NOT EXISTS idx_files_language ON files(language);
    `);
  }

  /**
   * Walk a path and index every code/doc file. Returns build statistics.
   * Static method: enumerate-then-write inside a single transaction.
   */
  static async build(repoPath, dbPath, { onProgress } = {}) {
    const graph = new CodeGraph(dbPath);
    const files = [];
    const root = path.resolve(repoPath);

    (function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.name.startsWith('.git')) continue;
        if (SKIP_DIRS.has(entry.name)) continue;
        const full = path.join(dir, entry.name);
        const relFromRoot = path.relative(root, full);
        if (SKIP_PATH_PREFIXES.some((p) => relFromRoot.startsWith(p))) continue;
        if (entry.isDirectory()) walk(full);
        else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          if (!LANG_BY_EXT[ext]) continue;
          const stat = fs.statSync(full);
          if (stat.size > MAX_FILE_BYTES) continue;
          files.push({ full, ext, size: stat.size });
        }
      }
    })(root);

    // Clear any prior build for a clean rebuild.
    graph.db.exec('DELETE FROM files; DELETE FROM symbols; DELETE FROM imports;');

    const insertFile = graph.db.prepare(
      'INSERT INTO files (path, language, size_bytes, line_count, hash) VALUES (?, ?, ?, ?, ?)'
    );
    const insertSymbol = graph.db.prepare('INSERT INTO symbols (file_id, kind, name, line) VALUES (?, ?, ?, ?)');
    const insertImport = graph.db.prepare('INSERT INTO imports (file_id, module) VALUES (?, ?)');

    let totalSymbols = 0;
    let totalImports = 0;
    let i = 0;

    graph.db.exec('BEGIN');
    try {
      for (const f of files) {
        i++;
        const language = LANG_BY_EXT[f.ext];
        const text = fs.readFileSync(f.full, 'utf8');
        const relPath = path.relative(root, f.full);
        const hash = crypto.createHash('sha256').update(text).digest('hex').slice(0, 16);
        const lines = text.split('\n').length;

        const res = insertFile.run(relPath, language, f.size, lines, hash);
        const fileId = Number(res.lastInsertRowid);

        const symbols = extractSymbols(text, language);
        for (const s of symbols) insertSymbol.run(fileId, s.kind, s.name, s.line);
        totalSymbols += symbols.length;

        const imports = extractImports(text, language);
        for (const m of imports) insertImport.run(fileId, m);
        totalImports += imports.length;

        if (onProgress && i % 25 === 0) onProgress(i, files.length);
      }
      graph.db.exec('COMMIT');
    } catch (e) {
      graph.db.exec('ROLLBACK');
      throw e;
    }

    // Meta
    const setMeta = graph.db.prepare('INSERT OR REPLACE INTO meta (key, value) VALUES (?, ?)');
    setMeta.run('repo_path', root);
    setMeta.run('built_at', new Date().toISOString());
    setMeta.run('file_count', String(files.length));
    setMeta.run('symbol_count', String(totalSymbols));
    setMeta.run('import_count', String(totalImports));

    return {
      filesIndexed: files.length,
      symbols: totalSymbols,
      imports: totalImports,
      dbPath
    };
  }

  // ── Queries ───────────────────────────────────────────────────────────────

  /** Get stats from meta. */
  stats() {
    const rows = this.db.prepare('SELECT key, value FROM meta').all();
    const out = {};
    for (const r of rows) out[r.key] = r.value;
    out.file_count = Number(out.file_count || 0);
    out.symbol_count = Number(out.symbol_count || 0);
    out.import_count = Number(out.import_count || 0);
    return out;
  }

  /** Find a symbol by exact or substring name. Returns compact context-pack rows. */
  findSymbol(name, { limit = 10 } = {}) {
    return this.db
      .prepare(
        `
      SELECT f.path AS file, s.kind, s.name, s.line, f.language
      FROM symbols s JOIN files f ON s.file_id = f.id
      WHERE s.name = ? OR s.name LIKE ?
      ORDER BY (s.name = ?) DESC, length(s.name) ASC
      LIMIT ?
    `
      )
      .all(name, `%${name}%`, name, limit);
  }

  /** Find files importing a given module. */
  filesUsing(module, { limit = 20 } = {}) {
    return this.db
      .prepare(
        `
      SELECT f.path AS file, i.module, f.language
      FROM imports i JOIN files f ON i.file_id = f.id
      WHERE i.module = ? OR i.module LIKE ?
      ORDER BY (i.module = ?) DESC
      LIMIT ?
    `
      )
      .all(module, `%${module}%`, module, limit);
  }

  /** Free-text search across symbol names and file paths. Context pack output. */
  search(query, { limit = 20 } = {}) {
    const like = `%${query}%`;
    const symHits = this.db
      .prepare(
        `
      SELECT f.path AS file, s.kind, s.name, s.line, 'symbol' AS source
      FROM symbols s JOIN files f ON s.file_id = f.id
      WHERE s.name LIKE ? LIMIT ?
    `
      )
      .all(like, limit);
    const fileHits = this.db
      .prepare(
        `
      SELECT path AS file, language AS kind, path AS name, 1 AS line, 'file' AS source
      FROM files WHERE path LIKE ? LIMIT ?
    `
      )
      .all(like, limit);
    return [...symHits, ...fileHits].slice(0, limit);
  }

  /** Compact briefing of the indexed repo — for `yes graph stats` output. */
  briefing() {
    const langs = this.db
      .prepare(
        `
      SELECT language, COUNT(*) AS n FROM files
      WHERE language IS NOT NULL GROUP BY language ORDER BY n DESC
    `
      )
      .all();
    const topSymbols = this.db
      .prepare(
        `
      SELECT kind, COUNT(*) AS n FROM symbols GROUP BY kind ORDER BY n DESC LIMIT 8
    `
      )
      .all();
    return { ...this.stats(), languages: langs, symbol_kinds: topSymbols };
  }

  close() {
    this.db.close();
  }
}

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');

// Helper to resolve files relative to process.cwd() if they exist, falling back to repoRoot
function resolvePath(relativePath) {
  const cwdPath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(cwdPath)) {
    return cwdPath;
  }
  return path.join(repoRoot, relativePath);
}

// Helper to parse frontmatter from markdown text without external dependencies (robust first-colon split)
function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n/);
  if (!match) return { frontmatter: null, body: content };
  const yamlText = match[1];
  const body = content.slice(match[0].length);
  
  const data = {};
  const lines = yamlText.split(/\r?\n/);
  let currentKey = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === '') continue;
    
    // Check if line is a list item under a key
    if (line.startsWith('  - ') || line.startsWith('- ')) {
      const value = line.replace(/^(\s*-?\s*)/, '').trim();
      if (currentKey && Array.isArray(data[currentKey])) {
        data[currentKey].push(value.replace(/^['"]|['"]$/g, ''));
      }
      continue;
    }
    
    // Match first colon only to protect URLs, paths, and colons in descriptions
    const colonMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (colonMatch) {
      const key = colonMatch[1].trim();
      const valText = colonMatch[2].trim();
      currentKey = key;
      
      if (valText === '') {
        data[key] = [];
      } else {
        let val = valText.replace(/^['"]|['"]$/g, '');
        if (val === 'true') val = true;
        else if (val === 'false') val = false;
        else if (!isNaN(val) && val !== '') val = Number(val);
        data[key] = val;
      }
    }
  }
  return { frontmatter: data, body };
}

// Find files recursively with existence checks
function getFilesRecursively(dir, extension = '.md') {
  if (!fs.existsSync(dir)) return [];
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(getFilesRecursively(filePath, extension));
      } else if (file.endsWith(extension)) {
        results.push(filePath);
      }
    }
  } catch (error) {
    console.error(`Error traversing directory ${dir}:`, error.message);
  }
  return results;
}

console.log('Compiling Yes-human registries and routing tables...');

// 1. Compile Agents
const agentsDir = resolvePath('content/agents');
const agentFiles = getFilesRecursively(agentsDir);
const compiledAgents = [];

for (const file of agentFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    if (frontmatter && frontmatter.id) {
      compiledAgents.push(frontmatter);
    }
  } catch (error) {
    console.error(`Error compiling agent file ${file}:`, error.message);
  }
}

const agentsRegistryPath = resolvePath('registry/agents.json');
fs.writeFileSync(agentsRegistryPath, JSON.stringify({
  version: "2.0.0",
  generated_at: new Date().toISOString(),
  count: compiledAgents.length,
  items: compiledAgents
}, null, 2));
console.log(`✓ Compiled ${compiledAgents.length} agents into registry/agents.json`);

// 2. Compile Skills
const skillsDir = resolvePath('content/skills');
const skillFiles = getFilesRecursively(skillsDir);
const compiledSkills = [];

for (const file of skillFiles) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const { frontmatter } = parseFrontmatter(content);
    if (frontmatter && frontmatter.id) {
      compiledSkills.push(frontmatter);
    }
  } catch (error) {
    console.error(`Error compiling skill file ${file}:`, error.message);
  }
}

const skillsRegistryPath = resolvePath('registry/skills.json');
fs.writeFileSync(skillsRegistryPath, JSON.stringify({
  version: "2.0.0",
  generated_at: new Date().toISOString(),
  count: compiledSkills.length,
  items: compiledSkills
}, null, 2));
console.log(`✓ Compiled ${compiledSkills.length} skills into registry/skills.json`);

// 3. Rebuild Routes & Route Table (Pruning stale/orphaned routes)
const routesPath = resolvePath('registry/routes.json');
let routes = [];
if (fs.existsSync(routesPath)) {
  try {
    routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
  } catch (e) {
    routes = [];
  }
}

// Keep only system fallback routes OR routes matching currently existing compiled agents
const validAgentIds = new Set(compiledAgents.map(a => a.id));
routes = routes.filter(route => {
  // Protect system routes
  if (route.route_id === 'route.meta-system.supreme-router' || !route.target.agent) {
    return true;
  }
  // Keep only if agent still exists
  return validAgentIds.has(route.target.agent);
});

// Ensure routes exist for all compiled agents based on their frontmatter
for (const agent of compiledAgents) {
  const routeId = `route.${agent.id}`;
  let existingRouteIndex = routes.findIndex(r => r.route_id === routeId);
  
  // Guard split against undefined category
  const categoryStr = agent.category || 'meta-system';
  const domainMaster = `${categoryStr.split('.')[0]}.master`;
  
  const existing = existingRouteIndex >= 0 ? routes[existingRouteIndex] : null;
  // Frontmatter wins; otherwise preserve any manually-curated values on the existing route.
  const aliases = agent.aliases || existing?.match?.aliases || [];
  const negativeKeywords = agent.negative_keywords || existing?.match?.negative_keywords || [];

  const newRoute = {
    route_id: routeId,
    match: {
      keywords: agent.triggers || [],
      aliases,
      negative_keywords: negativeKeywords
    },
    target: {
      domain_master: domainMaster,
      agent: agent.id,
      skills: agent.required_skills || [],
      workflow: `workflow.${agent.id}`
    },
    confidence: { exact: 1.0, alias: 0.95, graph: 0.85, semantic: 0.7 },
    budget_band: agent.budget_band || 'standard',
    fallback: 'route.meta-system.supreme-router'
  };

  if (existingRouteIndex >= 0) {
    routes[existingRouteIndex] = newRoute;
  } else {
    routes.push(newRoute);
  }
}

fs.writeFileSync(routesPath, JSON.stringify(routes, null, 2));
console.log(`✓ Synchronized routes database registry/routes.json`);

// Rebuild graph/indexes/ROUTE_TABLE.min.json
const routeTablePath = resolvePath('graph/indexes/ROUTE_TABLE.min.json');
const routeTable = {
  version: "2.0.0",
  generated_at: new Date().toISOString(),
  fallback: "route.meta-system.supreme-router",
  routes: {},
  pointers: {
    aliases: "graph/indexes/ALIAS_TABLE.min.json",
    workflow_cache: "graph/indexes/WORKFLOW_CACHE.min.json",
    graph: "graph/indexes/yes.sqlite",
    route_definitions: "registry/routes.json"
  }
};

for (const route of routes) {
  if (route.match && route.match.keywords) {
    for (const kw of route.match.keywords) {
      if (routeTable.routes[kw] && routeTable.routes[kw] !== route.route_id) {
        console.warn(`⚠ Collision warning: keyword "${kw}" is registered by both "${routeTable.routes[kw]}" and "${route.route_id}". Keeping "${routeTable.routes[kw]}".`);
      } else {
        routeTable.routes[kw] = route.route_id;
      }
    }
  }
}

// Ensure directory exists for graph indexes
const indexesDir = path.dirname(routeTablePath);
if (!fs.existsSync(indexesDir)) {
  fs.mkdirSync(indexesDir, { recursive: true });
}

fs.writeFileSync(routeTablePath, JSON.stringify(routeTable, null, 2));
console.log(`✓ Rebuilt hot route table graph/indexes/ROUTE_TABLE.min.json`);

// Rebuild ALIAS_TABLE.min.json (alias phrase -> route_id)
const aliasTable = { version: "2.0.0", generated_at: new Date().toISOString(), aliases: {} };
for (const route of routes) {
  for (const alias of route.match?.aliases || []) {
    const key = alias.toLowerCase().trim();
    if (aliasTable.aliases[key] && aliasTable.aliases[key] !== route.route_id) {
      console.warn(`⚠ Alias collision: "${key}" claimed by "${aliasTable.aliases[key]}" and "${route.route_id}". Keeping first.`);
    } else {
      aliasTable.aliases[key] = route.route_id;
    }
  }
}
fs.writeFileSync(resolvePath('graph/indexes/ALIAS_TABLE.min.json'), JSON.stringify(aliasTable, null, 2));
console.log(`✓ Rebuilt alias table graph/indexes/ALIAS_TABLE.min.json (${Object.keys(aliasTable.aliases).length} aliases)`);

// Rebuild WORKFLOW_CACHE.min.json (keyword -> workflow id) for quick workflow fill
const workflowCache = { version: "2.0.0", generated_at: new Date().toISOString(), entries: {} };
for (const route of routes) {
  const workflow = route.target?.workflow;
  if (!workflow) continue;
  for (const kw of route.match?.keywords || []) {
    workflowCache.entries[kw] = workflow;
  }
}
fs.writeFileSync(resolvePath('graph/indexes/WORKFLOW_CACHE.min.json'), JSON.stringify(workflowCache, null, 2));
console.log(`✓ Rebuilt workflow cache graph/indexes/WORKFLOW_CACHE.min.json (${Object.keys(workflowCache.entries).length} entries)`);

// Sync registry/aliases.json index
const aliasItems = Object.entries(aliasTable.aliases).map(([alias, route_id]) => ({ id: alias, route_id }));
fs.writeFileSync(resolvePath('registry/aliases.json'), JSON.stringify({
  version: "2.0.0",
  generated_at: new Date().toISOString(),
  count: aliasItems.length,
  items: aliasItems
}, null, 2));
console.log(`✓ Synchronized registry/aliases.json`);

console.log('✓ Compilation completed successfully.');

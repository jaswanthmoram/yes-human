import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../../..');
const generatedAt = new Date().toISOString();

function resolvePath(relativePath) {
  const cwdPath = path.join(process.cwd(), relativePath);
  if (fs.existsSync(cwdPath)) {
    return cwdPath;
  }
  return path.join(repoRoot, relativePath);
}

function ensureDirForFile(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
}

function readJson(relativePath, fallbackValue) {
  const absolutePath = resolvePath(relativePath);
  if (!fs.existsSync(absolutePath)) {
    return fallbackValue;
  }
  try {
    return JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
  } catch (error) {
    console.warn(`⚠ Failed to read ${relativePath}: ${error.message}`);
    return fallbackValue;
  }
}

function writeJson(relativePath, content) {
  const absolutePath = resolvePath(relativePath);
  ensureDirForFile(absolutePath);
  fs.writeFileSync(absolutePath, JSON.stringify(content, null, 2));
}

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

    if (line.startsWith('  - ') || line.startsWith('- ')) {
      const value = line.replace(/^(\s*-?\s*)/, '').trim();
      if (currentKey && Array.isArray(data[currentKey])) {
        data[currentKey].push(value.replace(/^['"]|['"]$/g, ''));
      }
      continue;
    }

    const colonMatch = line.match(/^([^:]+):\s*(.*)$/);
    if (!colonMatch) continue;

    const key = colonMatch[1].trim();
    const valText = colonMatch[2].trim();
    currentKey = key;

    if (valText === '') {
      data[key] = [];
      continue;
    }

    // Handle inline empty array []
    if (valText === '[]') {
      data[key] = [];
      continue;
    }

    let value = valText.replace(/^['"]|['"]$/g, '');
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if (!Number.isNaN(Number(value)) && value !== '') value = Number(value);
    data[key] = value;
  }

  return { frontmatter: data, body };
}

function getFilesRecursively(dir, extensions) {
  if (!fs.existsSync(dir)) return [];

  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, extensions));
      continue;
    }
    if (extensions.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results.sort();
}

function writeRegistry(relativePath, items) {
  writeJson(relativePath, {
    version: '2.0.0',
    generated_at: generatedAt,
    count: items.length,
    items
  });
}

function normalizePhrase(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[?!.,;]/g, '')
    .replace(/\s+/g, ' ');
}

function uniqueStrings(values) {
  const seen = new Set();
  const out = [];
  for (const value of values || []) {
    const normalized = String(value || '').trim();
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function buildRegistryFromMarkdown(relativeDir) {
  const dir = resolvePath(relativeDir);
  const files = getFilesRecursively(dir, ['.md']);
  const items = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(file, 'utf8');
      const { frontmatter } = parseFrontmatter(content);
      if (frontmatter?.id) {
        items.push(frontmatter);
      }
    } catch (error) {
      console.error(`Error compiling markdown file ${file}: ${error.message}`);
    }
  }

  return items;
}

function buildRegistryFromJson(relativeDir) {
  const dir = resolvePath(relativeDir);
  const files = getFilesRecursively(dir, ['.json']);
  const items = [];

  for (const file of files) {
    try {
      const parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
      if (parsed?.id) {
        items.push(parsed);
      }
    } catch (error) {
      console.error(`Error compiling JSON file ${file}: ${error.message}`);
    }
  }

  return items;
}

function listFieldNames(entries) {
  return uniqueStrings((entries || []).map((entry) => {
    if (typeof entry === 'string') {
      return entry;
    }
    return entry?.name || entry?.summary || entry?.id || entry?.dossier_path || entry?.method || entry?.rule || '';
  }));
}

function normalizeWorkflow(workflow) {
  const route = workflow.route || {};
  const normalizedRoute = {
    domain_master: route.domain_master || deriveDomainMaster(workflow.primary_agent),
    agents: uniqueStrings([
      ...(route.agents || []),
      route.primary || workflow.primary_agent,
      ...(route.participants || [])
    ]),
    parallel: route.parallel === true,
    max_parallel_agents: route.max_parallel_agents || Math.max(1, uniqueStrings([
      route.primary || workflow.primary_agent,
      ...(route.participants || [])
    ]).length)
  };

  const promotion = workflow.promotion || {};

  return {
    ...workflow,
    inputs: listFieldNames(workflow.inputs),
    outputs: listFieldNames(workflow.outputs),
    gates: listFieldNames(workflow.gates),
    route: normalizedRoute,
    steps: listFieldNames(workflow.steps),
    tools: listFieldNames(workflow.tools),
    verification: listFieldNames(workflow.verification),
    rollback: typeof workflow.rollback === 'string' ? workflow.rollback : workflow.rollback?.mode || 'trace_based',
    source_references: listFieldNames(workflow.source_references),
    promotion: {
      can_learn: promotion.can_learn !== false,
      min_successes_before_update: promotion.min_successes_before_update || 2
    }
  };
}

function buildWorkflowByPrimaryAgent(workflows) {
  const counts = new Map();
  for (const workflow of workflows) {
    if (!workflow.primary_agent) continue;
    counts.set(workflow.primary_agent, (counts.get(workflow.primary_agent) || 0) + 1);
  }

  const mapping = new Map();
  for (const workflow of workflows) {
    if (workflow.primary_agent && counts.get(workflow.primary_agent) === 1) {
      mapping.set(workflow.primary_agent, workflow.id);
    }
  }
  return mapping;
}

function deriveDomainMaster(agentId) {
  return `${String(agentId || '').split('.')[0]}.master`;
}

function buildConfidence() {
  return { exact: 1.0, alias: 0.95, graph: 0.85, semantic: 0.7 };
}

function buildAgentRoutes(compiledAgents, workflowByPrimaryAgent) {
  return compiledAgents.map((agent) => {
    const target = {
      domain_master: deriveDomainMaster(agent.id),
      agent: agent.id,
      skills: agent.required_skills || []
    };

    const mappedWorkflow = workflowByPrimaryAgent.get(agent.id);
    if (mappedWorkflow) {
      target.workflow = mappedWorkflow;
    }

    return {
      route_id: `route.${agent.id}`,
      match: {
        keywords: uniqueStrings(agent.triggers || []),
        aliases: uniqueStrings(agent.aliases || []),
        negative_keywords: uniqueStrings(agent.negative_keywords || [])
      },
      target,
      confidence: buildConfidence(),
      budget_band: agent.budget_band || 'standard',
      fallback: 'route.meta-system.supreme-router'
    };
  });
}

function buildWorkflowRoutes(workflows) {
  return workflows.map((workflow) => ({
    route_id: `route.workflow.${workflow.id}`,
    match: {
      keywords: uniqueStrings(workflow.triggers || []),
      aliases: uniqueStrings(workflow.aliases || []),
      negative_keywords: uniqueStrings(workflow.negative_keywords || [])
    },
    target: {
      domain_master: workflow.route?.domain_master || deriveDomainMaster(workflow.primary_agent),
      agent: workflow.primary_agent,
      skills: [],
      workflow: workflow.id
    },
    confidence: buildConfidence(),
    budget_band: workflow.budget?.band || 'standard',
    fallback: 'route.meta-system.supreme-router'
  }));
}

function buildRouteSet(existingRoutes, compiledAgents, workflows) {
  const fallbackRoute = existingRoutes.find((route) => route.route_id === 'route.meta-system.supreme-router') || {
    route_id: 'route.meta-system.supreme-router',
    match: { keywords: ['help', 'route'], aliases: [], negative_keywords: [] },
    target: {
      domain_master: 'meta-system.master',
      agent: 'meta-system.supreme-router',
      skills: [],
      workflow: 'meta-system.route-task'
    },
    confidence: buildConfidence(),
    budget_band: 'micro',
    fallback: 'route.meta-system.supreme-router'
  };

  const manualRoutes = existingRoutes.filter((route) => route.manual === true && route.route_id !== fallbackRoute.route_id);
  const workflowByPrimaryAgent = buildWorkflowByPrimaryAgent(workflows);
  const generatedRoutes = [
    ...buildAgentRoutes(compiledAgents, workflowByPrimaryAgent),
    ...buildWorkflowRoutes(workflows)
  ];

  const manualIds = new Set(manualRoutes.map((route) => route.route_id));
  const orderedRoutes = [fallbackRoute, ...manualRoutes];
  for (const route of generatedRoutes) {
    if (!manualIds.has(route.route_id)) {
      orderedRoutes.push(route);
    }
  }

  return orderedRoutes;
}

function buildRouteTable(routes) {
  const routeTable = {
    version: '2.0.0',
    generated_at: generatedAt,
    fallback: 'route.meta-system.supreme-router',
    routes: {},
    pointers: {
      aliases: 'graph/indexes/ALIAS_TABLE.min.json',
      workflow_cache: 'graph/indexes/WORKFLOW_CACHE.min.json',
      graph: 'graph/indexes/yes.sqlite',
      route_definitions: 'registry/routes.json'
    }
  };

  for (const route of routes) {
    for (const keyword of route.match?.keywords || []) {
      const normalized = normalizePhrase(keyword);
      if (!normalized) continue;
      if (routeTable.routes[normalized] && routeTable.routes[normalized] !== route.route_id) {
        console.warn(`⚠ Collision warning: keyword "${normalized}" is registered by both "${routeTable.routes[normalized]}" and "${route.route_id}". Keeping "${routeTable.routes[normalized]}".`);
        continue;
      }
      routeTable.routes[normalized] = route.route_id;
    }
  }

  return routeTable;
}

function buildAliasTable(routes) {
  const aliasTable = { version: '2.0.0', generated_at: generatedAt, aliases: {} };
  for (const route of routes) {
    for (const alias of route.match?.aliases || []) {
      const key = normalizePhrase(alias);
      if (!key) continue;
      if (aliasTable.aliases[key] && aliasTable.aliases[key] !== route.route_id) {
        console.warn(`⚠ Alias collision: "${key}" claimed by "${aliasTable.aliases[key]}" and "${route.route_id}". Keeping first.`);
        continue;
      }
      aliasTable.aliases[key] = route.route_id;
    }
  }
  return aliasTable;
}

function buildWorkflowCache(workflows) {
  const entries = {};
  for (const workflow of workflows) {
    const phrases = uniqueStrings([
      ...(workflow.triggers || []),
      ...(workflow.aliases || [])
    ]);
    for (const phrase of phrases) {
      const key = normalizePhrase(phrase);
      if (key && !entries[key]) {
        entries[key] = workflow.id;
      }
    }
  }

  return { version: '2.0.0', generated_at: generatedAt, entries };
}

function loadFixtureDomainMap(relativeDir, extractor) {
  const dir = resolvePath(relativeDir);
  const map = new Map();
  if (!fs.existsSync(dir)) {
    return map;
  }

  for (const file of fs.readdirSync(dir).filter((entry) => entry.endsWith('.fixtures.json')).sort()) {
    const absolutePath = path.join(dir, file);
    let parsed;
    try {
      parsed = JSON.parse(fs.readFileSync(absolutePath, 'utf8'));
    } catch (error) {
      console.warn(`⚠ Failed to read fixtures ${relativeDir}/${file}: ${error.message}`);
      continue;
    }

    for (const fixture of parsed.fixtures || []) {
      const domain = extractor(fixture);
      if (!domain) continue;
      if (!map.has(domain)) {
        map.set(domain, new Set());
      }
      map.get(domain).add(file);
    }
  }

  return map;
}

function routeFixtureDomain(fixture) {
  if (fixture.expected_domain) {
    return String(fixture.expected_domain).split('.')[0];
  }
  const routeId = String(fixture.expected_route || '');
  const parts = routeId.split('.');
  if (parts[1] === 'workflow') {
    return parts[2] || null;
  }
  return parts[1] || null;
}

function workflowFixtureDomain(fixture) {
  const workflowId = String(fixture.expected_workflow || '');
  return workflowId.split('.')[0] || null;
}

function buildCategoryPacks(categories, agents, workflows, connectors) {
  const routeFixtureMap = loadFixtureDomainMap('tests/routing', routeFixtureDomain);
  const workflowFixtureMap = loadFixtureDomainMap('tests/workflows', workflowFixtureDomain);

  return categories.map((category) => {
    const domainPrefix = category.id.split('.')[0];
    const categoryAgents = agents.filter((agent) => agent.id.startsWith(`${domainPrefix}.`));
    const specialists = categoryAgents
      .filter((agent) => agent.kind !== 'master')
      .map((agent) => agent.id);
    const categoryWorkflows = workflows
      .filter((workflow) => workflow.id.startsWith(`${domainPrefix}.`))
      .map((workflow) => workflow.id);
    const categoryConnectors = connectors
      .filter((connector) =>
        (connector.allowed_agents || []).some((agentId) => agentId.startsWith(`${domainPrefix}.`)) ||
        (connector.allowed_workflows || []).some((workflowId) => workflowId.startsWith(`${domainPrefix}.`))
      )
      .map((connector) => connector.id);

    return {
      id: category.id,
      master_agent: category.master_agent,
      specialists,
      workflows: categoryWorkflows,
      connectors: uniqueStrings(categoryConnectors),
      route_fixture_files: Array.from(routeFixtureMap.get(domainPrefix) || []).sort(),
      workflow_fixture_files: Array.from(workflowFixtureMap.get(domainPrefix) || []).sort(),
      status: category.master_agent && categoryAgents.some((agent) => agent.id === category.master_agent) ? 'active' : 'draft'
    };
  });
}

console.log('Compiling yes-human registries and routing tables...');

const compiledAgents = buildRegistryFromMarkdown('content/agents');
writeRegistry('registry/agents.json', compiledAgents);
console.log(`✓ Compiled ${compiledAgents.length} agents into registry/agents.json`);

const compiledSkills = buildRegistryFromMarkdown('content/skills');
writeRegistry('registry/skills.json', compiledSkills);
console.log(`✓ Compiled ${compiledSkills.length} skills into registry/skills.json`);

const compiledWorkflows = buildRegistryFromJson('content/workflows').map((workflow) => normalizeWorkflow(workflow));
writeRegistry('registry/workflows.json', compiledWorkflows);
console.log(`✓ Compiled ${compiledWorkflows.length} workflows into registry/workflows.json`);

const existingRoutes = readJson('registry/routes.json', []);
const routes = buildRouteSet(existingRoutes, compiledAgents, compiledWorkflows);
writeJson('registry/routes.json', routes);
console.log(`✓ Synchronized ${routes.length} routes into registry/routes.json`);

const routeTable = buildRouteTable(routes);
writeJson('graph/indexes/ROUTE_TABLE.min.json', routeTable);
console.log(`✓ Rebuilt hot route table graph/indexes/ROUTE_TABLE.min.json`);

const aliasTable = buildAliasTable(routes);
writeJson('graph/indexes/ALIAS_TABLE.min.json', aliasTable);
console.log(`✓ Rebuilt alias table graph/indexes/ALIAS_TABLE.min.json (${Object.keys(aliasTable.aliases).length} aliases)`);

const workflowCache = buildWorkflowCache(compiledWorkflows);
writeJson('graph/indexes/WORKFLOW_CACHE.min.json', workflowCache);
console.log(`✓ Rebuilt workflow cache graph/indexes/WORKFLOW_CACHE.min.json (${Object.keys(workflowCache.entries).length} entries)`);

const aliasItems = Object.entries(aliasTable.aliases).map(([alias, route_id]) => ({ id: alias, route_id }));
writeRegistry('registry/aliases.json', aliasItems);
console.log('✓ Synchronized registry/aliases.json');

const categories = readJson('registry/categories.json', { items: [] });
const connectors = readJson('registry/mcps.json', { items: [] });
const categoryPacks = buildCategoryPacks(categories.items || [], compiledAgents, compiledWorkflows, connectors.items || []);
writeRegistry('registry/category-packs.json', categoryPacks);
console.log(`✓ Generated registry/category-packs.json (${categoryPacks.length} packs)`);

console.log('✓ Compilation completed successfully.');

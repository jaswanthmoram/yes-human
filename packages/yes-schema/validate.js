import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { StateMachine } from '../yes-core/state-machine.js';
import { evaluateStagingDossier } from '../../validators/promotion.validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '../..');

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

const schemasDir = path.join(__dirname, 'schemas');
const schemaFiles = fs.readdirSync(schemasDir).filter((f) => f.endsWith('.json'));
const registryIndexNames = ['agents', 'skills', 'workflows', 'tools', 'mcps', 'categories', 'aliases', 'commands', 'bundles', 'category-packs'];
const highStakesWorkflowDomains = new Set(['finance', 'legal-compliance', 'healthcare', 'hr']);

for (const file of schemaFiles) {
  const schemaContent = JSON.parse(fs.readFileSync(path.join(schemasDir, file), 'utf8'));
  const schemaName = file.replace('.schema.json', '');
  ajv.addSchema(schemaContent, schemaName);
}

console.log('✓ Loaded schemas:', schemaFiles.map((f) => f.replace('.schema.json', '')).join(', '));

function readJson(relativePath) {
  const absolutePath = path.join(repoRoot, relativePath);
  return { absolutePath, content: JSON.parse(fs.readFileSync(absolutePath, 'utf8')) };
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function validateAgainst(relativePath, schemaName, { isArray = false, optional = false } = {}) {
  if (!fileExists(relativePath)) {
    if (optional) {
      console.log(`○ Skipped optional file: ${relativePath}`);
      return true;
    }
    console.error(`✗ File not found: ${relativePath}`);
    return false;
  }

  const { content } = readJson(relativePath);
  const validate = ajv.getSchema(schemaName);
  if (!validate) {
    console.error(`✗ Schema not found: ${schemaName}`);
    return false;
  }

  if (isArray) {
    if (!Array.isArray(content)) {
      console.error(`✗ Expected array in ${relativePath}`);
      return false;
    }
    for (let i = 0; i < content.length; i++) {
      if (!validate(content[i])) {
        console.error(`✗ Validation failed for ${relativePath} at index ${i}:`, validate.errors);
        return false;
      }
    }
  } else if (!validate(content)) {
    console.error(`✗ Validation failed for ${relativePath}:`, validate.errors);
    return false;
  }

  console.log(`✓ ${relativePath} validated against '${schemaName}'`);
  return true;
}

function validateManifestPaths() {
  const { content: manifest } = readJson('yes-human.plugin.json');
  let ok = true;

  const pathsToCheck = [
    manifest.startup.boot_file,
    manifest.startup.route_table,
    ...Object.values(manifest.registries),
    'registry/license-registry.json',
    'registry/provenance.json',
    'registry/source-references.json',
    'registry/routes.json',
    'registry/categories.json',
    'registry/aliases.json',
    'registry/eval-thresholds.json',
    'registry/cost-policy.json'
  ];

  for (const relativePath of pathsToCheck) {
    if (!fileExists(relativePath)) {
      console.error(`✗ Manifest references missing file: ${relativePath}`);
      ok = false;
    } else {
      console.log(`✓ Manifest path exists: ${relativePath}`);
    }
  }

  const { content: routeTable } = readJson(manifest.startup.route_table);
  for (const pointer of Object.values(routeTable.pointers)) {
    if (pointer.endsWith('.sqlite')) {
      if (!fileExists(pointer)) {
        console.log(`○ Optional graph database not yet built: ${pointer}`);
      } else {
        console.log(`✓ Manifest pointer exists: ${pointer}`);
      }
      continue;
    }
    if (!fileExists(pointer)) {
      console.error(`✗ Route table pointer missing: ${pointer}`);
      ok = false;
    } else {
      console.log(`✓ Route table pointer exists: ${pointer}`);
    }
  }

  const bootText = fs.readFileSync(path.join(repoRoot, manifest.startup.boot_file), 'utf8');
  if (!bootText.includes(manifest.startup.route_table)) {
    console.error(`✗ ${manifest.startup.boot_file} must reference ${manifest.startup.route_table}`);
    ok = false;
  } else {
    console.log(`✓ ${manifest.startup.boot_file} references route table path`);
  }

  return ok;
}

function validateRouteTableConsistency() {
  const { content: routeTable } = readJson('graph/indexes/ROUTE_TABLE.min.json');
  const { content: routes } = readJson('registry/routes.json');
  const routeIds = new Set(routes.map((route) => route.route_id));
  let ok = true;

  for (const routeId of Object.values(routeTable.routes)) {
    if (!routeIds.has(routeId)) {
      console.error(`✗ Hot route table references unknown route_id: ${routeId}`);
      ok = false;
    }
  }

  if (!routeIds.has(routeTable.fallback)) {
    console.error(`✗ Route table fallback not defined in registry/routes.json: ${routeTable.fallback}`);
    ok = false;
  }

  if (ok) {
    console.log('✓ Hot route table entries resolve to registry/routes.json');
  }

  const { content: thresholds } = readJson('registry/eval-thresholds.json');
  const hotCount = Object.keys(routeTable.routes).length;
  if (hotCount > thresholds.route_table_hot_routes_max) {
    console.error(`✗ Hot route table exceeds max (${hotCount} > ${thresholds.route_table_hot_routes_max})`);
    ok = false;
  } else {
    console.log(`✓ Hot route table size within limit (${hotCount}/${thresholds.route_table_hot_routes_max})`);
  }

  return ok;
}

function validateRegistryCounts() {
  let ok = true;
  for (const name of registryIndexNames) {
    const { content } = readJson(`registry/${name}.json`);
    if (content.count !== content.items.length) {
      console.error(`✗ registry/${name}.json count mismatch (${content.count} != ${content.items.length})`);
      ok = false;
    }
  }
  if (ok) {
    console.log('✓ Registry index counts match item lengths');
  }
  return ok;
}

function validateWorkflowDossiersAndPolicies() {
  const workflowsRegistryPath = 'registry/workflows.json';
  if (!fileExists(workflowsRegistryPath)) {
    return true;
  }

  const workflowDossierValidate = ajv.getSchema('workflow-dossier');
  if (!workflowDossierValidate) {
    console.error('✗ Workflow dossier schema not loaded.');
    return false;
  }

  const { content: workflowRegistry } = readJson(workflowsRegistryPath);
  const { content: agentRegistry } = readJson('registry/agents.json');
  const agentById = new Map(agentRegistry.items.map((agent) => [agent.id, agent]));
  let ok = true;

  for (const workflow of workflowRegistry.items) {
    const [domain, ...rest] = workflow.id.split('.');
    const workflowSubId = rest.join('.');
    const dossierPath = `references/workflows/${domain}/${workflowSubId}.sources.json`;

    if (workflow.status !== 'draft') {
      if (!fileExists(dossierPath)) {
        console.error(`✗ Workflow '${workflow.id}' requires a source dossier but it is missing at: ${dossierPath}`);
        ok = false;
      } else {
        const { content: dossier } = readJson(dossierPath);
        if (!workflowDossierValidate(dossier)) {
          console.error(`✗ Validation failed for workflow dossier ${dossierPath}:`, workflowDossierValidate.errors);
          ok = false;
        } else {
          if (dossier.workflow_id !== workflow.id) {
            console.error(`✗ Workflow dossier id mismatch in ${dossierPath}: expected '${workflow.id}', got '${dossier.workflow_id}'`);
            ok = false;
          }
          if (dossier.promotion_decision === 'draft') {
            console.error(`✗ Non-draft workflow '${workflow.id}' cannot use draft dossier promotion in ${dossierPath}`);
            ok = false;
          }
          const licenseRegistry = fileExists('registry/license-registry.json')
            ? readJson('registry/license-registry.json').content
            : { allowed: [], forbidden: [], restricted: [] };
          const stagingCheck = evaluateStagingDossier(dossier, { licenseRegistry });
          if (!stagingCheck.allowed) {
            console.error(`✗ Staging dossier gate failed for workflow '${workflow.id}' at ${dossierPath}:`);
            for (const blocker of stagingCheck.blockers) {
              console.error(`  - ${blocker}`);
            }
            ok = false;
          }
        }
      }
    }

    if (!workflow.steps?.length || !workflow.tools?.length || !workflow.success_criteria?.length) {
      console.error(`✗ Workflow '${workflow.id}' must define non-empty steps, tools, and success_criteria`);
      ok = false;
    }

    if ((workflow.gates || []).includes('pre-write') && workflow.rollback === 'no_write') {
      console.error(`✗ Write-capable workflow '${workflow.id}' cannot use rollback "no_write"`);
      ok = false;
    }

    if (workflow.primary_agent && !(workflow.route?.agents || []).includes(workflow.primary_agent)) {
      console.error(`✗ Workflow '${workflow.id}' primary_agent must be present in route.agents`);
      ok = false;
    }

    if (highStakesWorkflowDomains.has(domain)) {
      const workflowGates = new Set(workflow.gates || []);
      for (const requiredGate of ['pre-route', 'pre-tool', 'pre-write']) {
        if (!workflowGates.has(requiredGate)) {
          console.error(`✗ High-stakes workflow '${workflow.id}' must include gate '${requiredGate}'`);
          ok = false;
        }
      }

      const hasDisclaimerAgent = (workflow.route?.agents || [])
        .map((agentId) => agentById.get(agentId))
        .some((agent) => agent?.requires_disclaimer && agent?.human_review_gate);
      if (!hasDisclaimerAgent) {
        console.error(`✗ High-stakes workflow '${workflow.id}' must include an agent with requires_disclaimer and human_review_gate`);
        ok = false;
      }
    }
  }

  if (ok) {
    console.log('✓ Workflows have valid dossiers and pass policy checks');
  }
  return ok;
}

let success = true;

console.log('\n--- Schema validation ---');
if (!validateAgainst('yes-human.plugin.json', 'plugin')) success = false;
if (!validateAgainst('registry/source-references.json', 'source-reference', { isArray: true })) success = false;
if (!validateAgainst('registry/provenance.json', 'provenance', { isArray: true })) success = false;
if (!validateAgainst('graph/indexes/ROUTE_TABLE.min.json', 'route-table')) success = false;
if (!validateAgainst('registry/routes.json', 'route', { isArray: true })) success = false;

for (const name of registryIndexNames) {
  if (!validateAgainst(`registry/${name}.json`, 'registry-index')) success = false;
}

// Detailed validation of individual items within the registry indices
console.log('\n--- Registry item-level validation ---');
const detailedSchemaMapping = {
  'agents': 'agent',
  'skills': 'skill',
  'workflows': 'workflow',
  'mcps': 'mcp',
  'categories': 'category',
  'category-packs': 'category-pack'
};

for (const [registryName, schemaName] of Object.entries(detailedSchemaMapping)) {
  const registryPath = `registry/${registryName}.json`;
  if (fileExists(registryPath)) {
    const { content } = readJson(registryPath);
    const validate = ajv.getSchema(schemaName);
    if (!validate) {
      console.error(`✗ Detailed schema not found for validation: ${schemaName}`);
      success = false;
      continue;
    }
    let itemsOk = true;
    for (let i = 0; i < content.items.length; i++) {
      if (!validate(content.items[i])) {
        console.error(`✗ Validation failed for item in ${registryPath} at index ${i} (${content.items[i].id}):`, validate.errors);
        itemsOk = false;
        success = false;
      }
    }
    if (itemsOk && content.items.length > 0) {
      console.log(`✓ All items in ${registryPath} validated against '${schemaName}'`);
    }
  }
}

// Validate source dossiers for staging/production agents
  const licenseRegistry = fileExists('registry/license-registry.json')
    ? readJson('registry/license-registry.json').content
    : { allowed: [], forbidden: [], restricted: [] };
console.log('\n--- Source dossier verification ---');
const agentsRegistryPath = 'registry/agents.json';
if (fileExists(agentsRegistryPath)) {
  const { content } = readJson(agentsRegistryPath);
  let dossiersOk = true;
  for (const agent of content.items) {
    if (agent.quality_gate === 'staging' || agent.quality_gate === 'production') {
      const mainCategory = agent.id.split('.')[0];
      const agentSubId = agent.id.split('.').slice(1).join('.');
      const dossierPath = `references/${mainCategory}/${agentSubId}.sources.json`;
      
      if (!fileExists(dossierPath)) {
        console.error(`✗ Agent '${agent.id}' requires a source dossier but it is missing at: ${dossierPath}`);
        dossiersOk = false;
        success = false;
      } else {
        const dossierValidate = ajv.getSchema('dossier');
        if (!dossierValidate) {
          console.error(`✗ Dossier schema not loaded.`);
          dossiersOk = false;
          success = false;
          continue;
        }
        const { content: dossier } = readJson(dossierPath);
        if (!dossierValidate(dossier)) {
          console.error(`✗ Validation failed for dossier ${dossierPath}:`, dossierValidate.errors);
          dossiersOk = false;
          success = false;
        } else {
          if (dossier.agent_id !== agent.id) {
            console.error(`✗ Dossier agent_id mismatch in ${dossierPath}: expected '${agent.id}', got '${dossier.agent_id}'`);
            dossiersOk = false;
            success = false;
          }
          if (dossier.promotion_decision !== agent.quality_gate) {
            console.error(`✗ Dossier promotion decision ('${dossier.promotion_decision}') does not match agent quality gate ('${agent.quality_gate}') in ${dossierPath}`);
            dossiersOk = false;
            success = false;
          }
          const stagingCheck = evaluateStagingDossier(dossier, { licenseRegistry });
          if (!stagingCheck.allowed) {
            console.error(`✗ Staging dossier gate failed for '${agent.id}' at ${dossierPath}:`);
            for (const blocker of stagingCheck.blockers) {
              console.error(`  - ${blocker}`);
            }
            dossiersOk = false;
            success = false;
          }
        }
      }
    }
  }
  if (dossiersOk) {
    console.log('✓ All staging/production agents have valid corresponding source dossiers');
  }
}

console.log('\n--- Workflow dossier verification ---');
if (!validateWorkflowDossiersAndPolicies()) success = false;

console.log('\n--- Manifest and path validation ---');
if (!validateManifestPaths()) success = false;

console.log('\n--- Route consistency ---');
if (!validateRouteTableConsistency()) success = false;

console.log('\n--- Registry integrity ---');
if (!validateRegistryCounts()) success = false;

// Phase 3: Validate hooks, rules, and policies
console.log('\n--- Phase 3: Hooks validation ---');
if (fileExists('hooks/hook-registry.json')) {
  if (!validateAgainst('hooks/hook-registry.json', 'hook')) {
    success = false;
  } else {
    // Validate individual hook files exist
    const { content: hookRegistry } = readJson('hooks/hook-registry.json');
    let hooksOk = true;
    for (const hook of hookRegistry.hooks || []) {
      const hookFile = hook.entry || hook.file;
      if (!hookFile) {
        console.error(`✗ Hook ${hook.id} missing entry/file property`);
        hooksOk = false;
        success = false;
        continue;
      }
      if (!fileExists(hookFile)) {
        console.error(`✗ Hook file not found: ${hookFile}`);
        hooksOk = false;
        success = false;
      }
    }
    if (hooksOk) {
      console.log(`✓ All ${hookRegistry.hooks?.length || 0} hook files exist`);
    }
  }
} else {
  console.log('○ hooks/hook-registry.json not found (optional)');
}

console.log('\n--- Phase 3: Rules validation ---');
const rulesDir = path.join(repoRoot, 'rules');
if (fs.existsSync(rulesDir)) {
  const ruleFiles = fs.readdirSync(rulesDir).filter(f => f.endsWith('.rules.json'));
  let rulesOk = true;
  for (const ruleFile of ruleFiles) {
    const rulePath = `rules/${ruleFile}`;
    if (!validateAgainst(rulePath, 'rule')) {
      rulesOk = false;
      success = false;
    }
  }
  if (rulesOk && ruleFiles.length > 0) {
    console.log(`✓ All ${ruleFiles.length} rule files validated`);
  }
} else {
  console.log('○ rules/ directory not found (optional)');
}

console.log('\n--- Phase 3: Policies validation ---');
const policiesDir = path.join(repoRoot, 'policies');
if (fs.existsSync(policiesDir)) {
  const policyFiles = fs.readdirSync(policiesDir).filter(f => f.endsWith('.policy.json'));
  let policiesOk = true;
  for (const policyFile of policyFiles) {
    const policyPath = `policies/${policyFile}`;
    if (!validateAgainst(policyPath, 'policy')) {
      policiesOk = false;
      success = false;
    }
  }
  if (policiesOk && policyFiles.length > 0) {
    console.log(`✓ All ${policyFiles.length} policy files validated`);
  }
} else {
  console.log('○ policies/ directory not found (optional)');
}

console.log('\n--- Lifecycle state machines ---');
const lifecycleDir = path.join(repoRoot, 'lifecycle');
if (fs.existsSync(lifecycleDir)) {
  const smFiles = fs.readdirSync(lifecycleDir).filter((f) => f.endsWith('.json'));
  let smOk = true;
  for (const smFile of smFiles) {
    const smPath = `lifecycle/${smFile}`;
    if (!validateAgainst(smPath, 'state-machine')) {
      smOk = false;
      success = false;
      continue;
    }
    // Structural integrity: transitions/initial must reference declared states.
    const sm = new StateMachine(readJson(smPath).content);
    const { ok, errors } = sm.validate();
    if (!ok) {
      console.error(`✗ ${smPath} integrity errors:`, errors);
      smOk = false;
      success = false;
    }
  }
  if (smOk && smFiles.length > 0) {
    console.log(`✓ All ${smFiles.length} lifecycle state machines valid`);
  }
} else {
  console.log('○ lifecycle/ directory not found (optional)');
}

if (!success) {
  console.error('\n✗ Validation failed.');
  process.exit(1);
}

console.log('\n✓ All validations passed successfully.');

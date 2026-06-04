import fs from 'fs';
import path from 'path';
import https from 'https';

/**
 * Perform cognitive logic comparison between host custom rules/MCPs and yes-human.
 *
 * @param {object} discovered - Discovery payload from discoverHostConfigs()
 * @param {string} repoRoot
 * @returns {Promise<Array>} List of comparison evaluation reports
 */
export async function evaluateHostConfigs(discovered, repoRoot) {
  const reports = [];

  // Load existing agents and skills to check for overlap
  let registryAgents = [];
  let registrySkills = [];
  try {
    const agentsFile = path.join(repoRoot, 'registry', 'agents.json');
    const skillsFile = path.join(repoRoot, 'registry', 'skills.json');
    if (fs.existsSync(agentsFile)) {
      registryAgents = JSON.parse(fs.readFileSync(agentsFile, 'utf8')).items || [];
    }
    if (fs.existsSync(skillsFile)) {
      registrySkills = JSON.parse(fs.readFileSync(skillsFile, 'utf8')).items || [];
    }
  } catch {
    /* ignore */
  }

  // 1. Evaluate CursorRules overlap
  if (discovered.cursor.has_cursorrules && discovered.cursor.raw_cursorrules) {
    const content = discovered.cursor.raw_cursorrules;

    // Check if we can do a real LLM call
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    const openAIKey = process.env.OPENAI_API_KEY;

    let matchResult = null;

    if (anthropicKey) {
      matchResult = await queryClaude(content, registryAgents, registrySkills, anthropicKey);
    } else if (openAIKey) {
      matchResult = await queryGPT(content, registryAgents, registrySkills, openAIKey);
    }

    // Graceful fallback to static/deterministic gap analysis
    if (!matchResult) {
      matchResult = runStaticComparison(content, registryAgents, registrySkills);
    }
    matchResult.details = { raw_content: content };
    reports.push(matchResult);
  }

  // 2. Evaluate MCP Servers overlap
  const mcpServers = discovered.claude_desktop.mcp_servers || {};
  for (const [serverName, serverConfig] of Object.entries(mcpServers)) {
    const isOverlap = registrySkills.some((skill) =>
      skill.id.toLowerCase().includes(serverName.toLowerCase()) ||
      skill.name.toLowerCase().includes(serverName.toLowerCase())
    );

    reports.push({
      type: 'mcp',
      id: serverName,
      source: 'Local Config (Antigravity/Claude)',
      recommendation: isOverlap ? 'IGNORE' : 'CLONE',
      reason: isOverlap
        ? `MCP Server "${serverName}" is already supported by equivalent registered yes-human skills.`
        : `MCP Server "${serverName}" exposes unique system integrations. We recommend importing it as a new yes-human skill.`,
      details: {
        command: serverConfig.command,
        args: serverConfig.args || []
      }
    });
  }

  return reports;
}

function runStaticComparison(cursorrules, agents, skills) {
  // Cheap overlap algorithm based on trigger matching
  const rulesLower = cursorrules.toLowerCase();
  let bestMatch = null;
  let maxScore = 0;

  for (const agent of agents) {
    let score = 0;
    const triggers = agent.triggers || [];
    for (const trigger of triggers) {
      if (rulesLower.includes(trigger.toLowerCase())) {
        score += 2;
      }
    }
    const idParts = agent.id.toLowerCase().split('.');
    for (const part of idParts) {
      if (rulesLower.includes(part)) score += 1;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = agent;
    }
  }

  if (bestMatch && maxScore > 2) {
    return {
      type: 'cursorrules',
      id: '.cursorrules',
      source: 'Cursor Configuration',
      recommendation: 'MERGE',
      target_agent: bestMatch.id,
      reason: `Found significant rule overlap (${maxScore} points) with existing agent "${bestMatch.name}" (${bestMatch.id}).`,
      comparison: {
        host_advantages: ['Contains local workspace-specific directory overrides', 'Custom developer flow hints'],
        yes_human_advantages: ['Richer security policies', 'Multi-stage fallback routing'],
        confidence: 0.85
      }
    };
  }

  return {
    type: 'cursorrules',
    id: '.cursorrules',
    source: 'Cursor Configuration',
    recommendation: 'CLONE',
    reason: 'The custom rules do not overlap with any single existing specialist. Recommend importing as a new workspace agent.',
    comparison: {
      host_advantages: ['Custom instruction sets tailored to local project style'],
      yes_human_advantages: [],
      confidence: 0.7
    }
  };
}

function queryClaude(content, agents, skills, apiKey) {
  return new Promise((resolve) => {
    const prompt = buildComparisonPrompt(content, agents, skills);
    const data = JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.anthropic.com',
      port: 443,
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          const responseText = json.content?.[0]?.text;
          const parsed = parseLLMResponse(responseText);
          resolve(parsed);
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.write(data);
    req.end();
  });
}

function queryGPT(content, agents, skills, apiKey) {
  return new Promise((resolve) => {
    const prompt = buildComparisonPrompt(content, agents, skills);
    const data = JSON.stringify({
      model: 'gpt-4o',
      max_tokens: 1000,
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }]
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          const responseText = json.choices?.[0]?.message?.content;
          const parsed = JSON.parse(responseText);
          resolve(parsed);
        } catch {
          resolve(null);
        }
      });
    });

    req.on('error', () => resolve(null));
    req.write(data);
    req.end();
  });
}

function buildComparisonPrompt(content, agents, skills) {
  const agentList = agents.map((a) => `- ${a.id}: ${a.summary} (Triggers: ${(a.triggers || []).join(', ')})`).join('\n');
  return `You are the yes-human onboarding assistant.
We have found some custom developer rules (.cursorrules):
"""
${content}
"""

Here are the existing registered agents in yes-human:
${agentList}

Determine:
1. Does this .cursorrules prompt overlap with any existing yes-human agent?
2. What is your recommendation? Choose one: MERGE (rules overlap existing agent), UPGRADE (replace existing), CLONE (save as new agent), IGNORE.
3. Compare the advantages of the host rules vs yes-human's registry.

Return a JSON object exactly conforming to this schema:
{
  "type": "cursorrules",
  "id": ".cursorrules",
  "source": "Cursor Configuration",
  "recommendation": "MERGE" | "UPGRADE" | "CLONE" | "IGNORE",
  "target_agent": "route.id.here" or null,
  "reason": "summary explanation",
  "comparison": {
    "host_advantages": ["advantage 1", "advantage 2"],
    "yes_human_advantages": ["advantage 1", "advantage 2"],
    "confidence": 0.0 to 1.0
  }
}`;
}

function parseLLMResponse(text) {
  if (!text) return null;
  try {
    // Find the JSON block
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1) {
      return JSON.parse(text.substring(start, end + 1));
    }
  } catch {
    /* ignore */
  }
  return null;
}

import https from 'https';

/**
 * Call LLM using configured provider (e.g. OpenAI) or fall back to mock/heuristic in tests/offline mode.
 * 
 * @param {Object} options - { system, prompt, max_tokens }
 * @returns {Promise<string>} Model response
 */
export async function callLLM(options = {}) {
  const { system = '', prompt = '', max_tokens = 50 } = options;

  let apiKey = process.env.OPENAI_API_KEY;
  if (apiKey && apiKey.startsWith('{env:') && apiKey.endsWith('}')) {
    apiKey = process.env[apiKey.slice(5, -1)];
  }
  const isMock = process.env.YES_MOCK_LLM === 'true' || !apiKey;

  if (isMock) {
    const query = String(prompt || '').toLowerCase();

    // 1. Try matching candidates listed in the system prompt if present
    if (system && system.includes('Available specialist routes:')) {
      try {
        const routesSection = system.split('Available specialist routes:')[1];
        const candidateRoutes = routesSection
          .split('\n')
          .map(l => l.trim().replace(/^-\s*/, ''))
          .filter(r => r.startsWith('route.'));

        for (const route of candidateRoutes) {
          const parts = route.replace(/^route\./, '').split('.');
          const lastPart = parts[parts.length - 1]; // e.g. "ui-ux-designer" or "ai-ethics-specialist"
          const words = lastPart.split('-');
          // Match if all keywords in the agent name are contained in the query
          if (words.every(w => query.includes(w) || ['specialist', 'guide', 'designer', 'reviewer'].includes(w))) {
            return route;
          }
        }
      } catch (err) {
        // Fall back gracefully
      }
    }
    
    // 2. Existing hardcoded checks as fallback
    if (query.includes('ai-ethics') || query.includes('bias audit') || query.includes('ethical guidelines')) {
      return 'route.data-ai.ai-ethics-specialist';
    }
    if (query.includes('uiux') || query.includes('product design') || query.includes('interface design')) {
      return 'route.design-content.ui-ux-designer';
    }
    if (query.includes('tdd') || query.includes('test driven') || query.includes('unit test')) {
      return 'route.engineering.tdd-guide';
    }
    
    // Default mock response when no heuristic matches
    return 'NONE';
  }

  // Real LLM call using native https module (zero external dependencies)
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      model: process.env.YES_LLM_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt }
      ],
      max_tokens,
      temperature: 0.1
    });

    const reqOptions = {
      hostname: 'api.openai.com',
      port: 443, // standard 443 SSL port by default
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    // Override host/port if a custom gateway is set
    if (process.env.YES_LLM_GATEWAY) {
      try {
        const url = new URL(process.env.YES_LLM_GATEWAY);
        reqOptions.hostname = url.hostname;
        reqOptions.port = url.port || (url.protocol === 'https:' ? 443 : 80);
        reqOptions.path = url.pathname + url.search;
      } catch (err) {
        return reject(new Error(`Invalid YES_LLM_GATEWAY: ${err.message}`));
      }
    }

    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsed = JSON.parse(data);
            const text = parsed.choices?.[0]?.message?.content || 'NONE';
            resolve(text.trim());
          } catch (e) {
            reject(new Error(`Failed to parse LLM response: ${e.message}`));
          }
        } else {
          reject(new Error(`LLM API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (e) => {
      reject(new Error(`LLM network request failed: ${e.message}`));
    });

    req.write(postData);
    req.end();
  });
}

import https from 'https';
import { resolveEnv } from '../../yes-core/secrets.js';

/**
 * Call LLM using configured provider (e.g. OpenAI) or fall back to mock/heuristic in tests/offline mode.
 *
 * @param {Object} options - { system, prompt, max_tokens }
 * @returns {Promise<string>} Model response
 */
export async function callLLM(options = {}) {
  const { system = '', prompt = '', max_tokens = 50 } = options;

  const apiKey = resolveEnv(process.env.OPENAI_API_KEY);
  const isMock = process.env.YES_MOCK_LLM === 'true' || !apiKey;

  if (isMock) {
    // Mock LLM: deterministic, candidate-driven only. We score each route in the
    // system prompt's `Available specialist routes:` block against query tokens and
    // return the highest-overlap route, or "NONE" if nothing scores. This keeps the
    // mock honest with the prompt — no hardcoded route shortcuts that mask real bugs.
    const query = String(prompt || '').toLowerCase();
    const queryTokens = new Set(query.split(/[^a-z0-9+#]+/).filter((t) => t.length > 2));

    if (!system || !system.includes('Available specialist routes:')) {
      return 'NONE';
    }

    try {
      const routesSection = system.split('Available specialist routes:')[1];
      const candidateRoutes = routesSection
        .split('\n')
        .map((l) => l.trim().replace(/^-\s*/, ''))
        .filter((r) => r.startsWith('route.'));

      let best = { route: null, score: 0 };
      for (const route of candidateRoutes) {
        // Tokenize the route_id (drop "route." prefix) into hyphen/dot words.
        const tokens = route
          .replace(/^route\./, '')
          .split(/[.-]/)
          .filter((t) => t.length > 2 && !['specialist', 'guide', 'designer', 'reviewer', 'master'].includes(t));
        const score = tokens.reduce((acc, t) => acc + (queryTokens.has(t) ? 1 : 0), 0);
        if (score > best.score) best = { route, score };
      }

      return best.score > 0 ? best.route : 'NONE';
    } catch {
      return 'NONE';
    }
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
        Authorization: `Bearer ${apiKey}`,
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

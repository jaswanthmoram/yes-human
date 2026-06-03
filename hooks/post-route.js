import { MemoryManager } from '../packages/yes-runtime/memory-manager.js';
import { hashValue, redactString } from '../packages/yes-runtime/redaction.js';

const memory = new MemoryManager();

export default async function postRoute(context) {
  try {
    const { task, route, duration } = context;
    const routeId = typeof route === 'string' ? route : route?.route_id || 'unknown';
    const taskHash = task ? hashValue(String(task), 24) : null;

    memory.addEpisodicMemory('route-decisions', {
      task_hash: taskHash,
      route_id: routeId,
      match_stage: route?._match?.stage || 'unknown',
      confidence: route?._match?.confidence || null,
      duration_ms: duration || null,
      timestamp: new Date().toISOString()
    });

    return { logged: true, route_id: routeId };
  } catch (err) {
    console.error(`[post-route] failed: ${err.message}`);
    return { logged: false, error: err.message };
  }
}

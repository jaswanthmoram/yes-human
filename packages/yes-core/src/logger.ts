const LEVELS = { error: 0, warn: 1, info: 2, debug: 3 };
const currentLevel = LEVELS[process.env.YES_LOG_LEVEL || 'info'] ?? 2;

function formatMessage(level: string, component: string, message: string, data?: any) {
  const entry: Record<string, any> = {
    timestamp: new Date().toISOString(),
    level,
    component,
    message
  };
  if (data !== undefined) {
    if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      Object.assign(entry, data);
    } else {
      entry.data = data;
    }
  }
  return JSON.stringify(entry);
}

function shouldLog(level) {
  return LEVELS[level] <= currentLevel;
}

export function createLogger(component) {
  return {
    error(message, data) {
      if (shouldLog('error')) console.error(formatMessage('error', component, message, data));
    },
    warn(message, data) {
      if (shouldLog('warn')) console.warn(formatMessage('warn', component, message, data));
    },
    info(message, data) {
      if (shouldLog('info')) console.log(formatMessage('info', component, message, data));
    },
    debug(message, data) {
      if (shouldLog('debug')) console.log(formatMessage('debug', component, message, data));
    }
  };
}

export const logger = createLogger('yes-human');

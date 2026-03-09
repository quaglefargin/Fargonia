const LEVELS = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40
};

function normalizeLevel(level) {
  const key = String(level || "info").toLowerCase();
  return LEVELS[key] ? key : "info";
}

function createLogger(options = {}) {
  const level = normalizeLevel(options.level || "info");
  const scope = options.scope || "app";
  const baseMeta = options.baseMeta || {};

  function shouldLog(messageLevel) {
    return LEVELS[normalizeLevel(messageLevel)] >= LEVELS[level];
  }

  function formatMeta(meta = {}) {
    const merged = { ...baseMeta, ...meta };
    const entries = Object.entries(merged);

    if (!entries.length) return "";

    return entries
      .map(([key, value]) => `${key}=${String(value)}`)
      .join(" ");
  }

  function write(messageLevel, message, meta = {}) {
    if (!shouldLog(messageLevel)) return;

    const timestamp = new Date().toISOString();
    const metaText = formatMeta(meta);
    const line = `[${timestamp}] [${messageLevel.toUpperCase()}] [${scope}] ${message}`;

    if (metaText) {
      console.log(`${line} | ${metaText}`);
    } else {
      console.log(line);
    }
  }

  return {
    debug(message, meta = {}) {
      write("debug", message, meta);
    },

    info(message, meta = {}) {
      write("info", message, meta);
    },

    warn(message, meta = {}) {
      write("warn", message, meta);
    },

    error(message, meta = {}) {
      write("error", message, meta);
    },

    event(message, meta = {}) {
      write("info", message, { category: "event", ...meta });
    },

    combat(message, meta = {}) {
      write("info", message, { category: "combat", ...meta });
    },

    social(message, meta = {}) {
      write("info", message, { category: "social", ...meta });
    },

    child(childOptions = {}) {
      return createLogger({
        level,
        scope: childOptions.scope || scope,
        baseMeta: {
          ...baseMeta,
          ...(childOptions.baseMeta || {})
        }
      });
    }
  };
}

module.exports = {
  createLogger
};

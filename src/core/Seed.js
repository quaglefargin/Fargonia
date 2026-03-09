function hashString(input) {
  const text = String(input || "");
  let hash = 2166136261;

  for (let i = 0; i < text.length; i += 1) {
    hash ^= text.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

function mulberry32(seed) {
  let t = seed >>> 0;

  return function next() {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function createSeededRng(seedInput) {
  const numericSeed =
    typeof seedInput === "number" ? seedInput >>> 0 : hashString(seedInput);

  const generator = mulberry32(numericSeed);

  return {
    seed: numericSeed,

    next() {
      return generator();
    },

    float(min = 0, max = 1) {
      return min + (max - min) * generator();
    },

    int(min, max) {
      const low = Math.ceil(Math.min(min, max));
      const high = Math.floor(Math.max(min, max));
      return Math.floor(generator() * (high - low + 1)) + low;
    },

    chance(probability) {
      return generator() < Math.max(0, Math.min(1, probability || 0));
    },

    pick(items = []) {
      if (!Array.isArray(items) || items.length === 0) return null;
      const index = this.int(0, items.length - 1);
      return items[index];
    },

    weightedPick(entries = []) {
      if (!Array.isArray(entries) || entries.length === 0) return null;

      const total = entries.reduce((sum, entry) => {
        return sum + Math.max(0, Number(entry.weight || 0));
      }, 0);

      if (total <= 0) {
        return entries[0]?.value ?? null;
      }

      let roll = generator() * total;

      for (const entry of entries) {
        const weight = Math.max(0, Number(entry.weight || 0));
        roll -= weight;
        if (roll <= 0) {
          return entry.value;
        }
      }

      return entries[entries.length - 1]?.value ?? null;
    },

    fork(...parts) {
      return createSeededRng([numericSeed, ...parts].join("|"));
    }
  };
}

function createSeedManager(options = {}) {
  const worldSeed = options.worldSeed || "fargonia-world-seed";
  const simulationSeed = options.simulationSeed || "fargonia-sim-seed";
  const encounterSeed = options.encounterSeed || "fargonia-encounter-seed";

  return {
    worldSeed,
    simulationSeed,
    encounterSeed,

    getWorldRng(...parts) {
      return createSeededRng([worldSeed, ...parts].join("|"));
    },

    getSimulationRng(...parts) {
      return createSeededRng([simulationSeed, ...parts].join("|"));
    },

    getEncounterRng(...parts) {
      return createSeededRng([encounterSeed, ...parts].join("|"));
    },

    getPhaseRng(day, phaseName, ...parts) {
      return createSeededRng([simulationSeed, day, phaseName, ...parts].join("|"));
    }
  };
}

module.exports = {
  createSeededRng,
  createSeedManager
};

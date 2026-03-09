const Dials = require("../config/Dials");

function createDefaultLiteracyProfile(overrides = {}) {
  return {
    physicalSense: 0.5,
    socialSense: 0.5,
    spiritualSense: 0.3,
    environmentalSense: 0.4,
    metaSense: 0.25,
    ...overrides
  };
}

function createDefaultDomainReadiness(overrides = {}) {
  return {
    physical: 0.55,
    social: 0.55,
    spiritual: 0.35,
    environmental: 0.45,
    meta: 0.3,
    ...overrides
  };
}

function createDefaultCounterplayState(overrides = {}) {
  return {
    counterKnowledge: [],
    lessonRecords: [],
    ...overrides
  };
}

function createWorld(options = {}) {
  const seedManager = options.seedManager || null;

  const phases = Dials.time?.phases || ["Morning", "Afternoon", "Evening", "Night"];
  const startPhaseIndex = Dials.time?.startPhaseIndex ?? 0;

  return {
    saveVersion: 1,
    worldVersion: 1,

    seeds: {
      worldSeed: seedManager?.worldSeed || Dials.seeds.defaultWorldSeed,
      simulationSeed: seedManager?.simulationSeed || Dials.seeds.defaultSimulationSeed,
      encounterSeed: seedManager?.encounterSeed || Dials.seeds.defaultEncounterSeed
    },

    time: {
      day: Dials.time?.startDay ?? 1,
      phaseIndex: startPhaseIndex,
      phaseName: phases[startPhaseIndex] || phases[0],
      year: Dials.time?.startYear ?? 1
    },

    world: {
      weather: "clear",
      heatLevel: 0.2,
      festivalActive: false,
      alignment: {
        light: 0.33,
        dark: 0.33,
        aether: 0.34
      }
    },

    player: {
      id: "player_001",
      name: "Unknown Outsider",
      locationRegion: "region_001",
      perceivedReputation: 0,
      health: 1,
      hp: 20,
      maxHp: 20,
      relationships: {},
      literacyProfile: createDefaultLiteracyProfile({
        physicalSense: 0.55,
        socialSense: 0.45,
        spiritualSense: 0.35,
        environmentalSense: 0.45,
        metaSense: 0.3
      }),
      domainReadiness: createDefaultDomainReadiness({
        physical: 0.6,
        social: 0.45,
        spiritual: 0.35,
        environmental: 0.5,
        meta: 0.3
      }),
      ...createDefaultCounterplayState()
    },

    regions: [
      {
        id: "region_001",
        biome: "hamlet",
        settlementId: "settlement_001",
        pathPressure: 0.25,
        pathType: "footpath",
        roadQuality: "none",
        pressure: {
          fear: 0.05,
          trade: 0.2,
          monster: 0.08,
          political: 0.05,
          rumor: 0.05,
          lawOrder: 0.45,
          light: 0.18,
          dark: 0.1,
          aether: 0.12
        }
      },
      {
        id: "region_002",
        biome: "woodland",
        settlementId: null,
        pathPressure: 0.1,
        pathType: "trail",
        roadQuality: "none",
        pressure: {
          fear: 0.12,
          trade: 0.05,
          monster: 0.18,
          political: 0.02,
          rumor: 0.01,
          lawOrder: 0.15,
          light: 0.08,
          dark: 0.16,
          aether: 0.14
        }
      }
    ],

    settlements: [
      {
        id: "settlement_001",
        name: "Ashwake Hamlet",
        regionId: "region_001",
        settlementHealth: 0.72,
        pressure: {
          fear: 0.08,
          trade: 0.24,
          monster: 0.06,
          political: 0.05,
          rumor: 0.06,
          lawOrder: 0.52,
          dark: 0.09,
          aether: 0.11
        },
        infrastructure: {
          roads: 0.15,
          defenses: 0.2,
          market: true
        }
      }
    ],

    roads: [],
    factions: [],
    artifacts: [],

    npcs: [
      {
        id: "npc_mira",
        name: "Mira",
        age: 26,
        locationRegion: "region_001",
        settlementId: "settlement_001",
        health: 0.9,
        hp: 18,
        maxHp: 20,
        traits: ["watchful", "proud"],
        mood: 0.1,
        perceivedReputation: 0.05,
        alignment: {
          light: 0.45,
          dark: 0.15,
          aether: 0.1
        },
        relationships: {},
        memories: [],
        beliefs: {},
        literacyProfile: createDefaultLiteracyProfile({
          physicalSense: 0.45,
          socialSense: 0.65,
          spiritualSense: 0.25,
          environmentalSense: 0.4,
          metaSense: 0.35
        }),
        domainReadiness: createDefaultDomainReadiness({
          physical: 0.45,
          social: 0.7,
          spiritual: 0.3,
          environmental: 0.4,
          meta: 0.4
        }),
        ...createDefaultCounterplayState()
      },
      {
        id: "npc_elias",
        name: "Elias",
        age: 31,
        locationRegion: "region_001",
        settlementId: "settlement_001",
        health: 0.85,
        hp: 17,
        maxHp: 20,
        traits: ["brooding", "loyal"],
        mood: -0.05,
        perceivedReputation: 0,
        alignment: {
          light: 0.25,
          dark: 0.25,
          aether: 0.08
        },
        relationships: {},
        memories: [],
        beliefs: {},
        literacyProfile: createDefaultLiteracyProfile({
          physicalSense: 0.6,
          socialSense: 0.35,
          spiritualSense: 0.2,
          environmentalSense: 0.45,
          metaSense: 0.2
        }),
        domainReadiness: createDefaultDomainReadiness({
          physical: 0.7,
          social: 0.3,
          spiritual: 0.2,
          environmental: 0.45,
          meta: 0.2
        }),
        ...createDefaultCounterplayState()
      }
    ],

    events: [],
    rumors: [],
    pendingPlayerActions: [],
    activeCombat: null,

    runtime: {
      initialized: true,
      lastSocialFeedback: null,
      lastCombatFeedback: null,
      control: {
        seat: "embodied",
        embodiedEntityId: "player_001",
        followedEntityId: "player_001",
        watchFilters: []
      }
    }
  };
}

module.exports = {
  createWorld
};

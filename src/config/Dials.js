const Dials = {
  debug: {
    enabled: true,
    logLevel: "debug"
  },

  seeds: {
    defaultWorldSeed: "fargonia-world-seed",
    defaultSimulationSeed: "fargonia-sim-seed",
    defaultEncounterSeed: "fargonia-encounter-seed"
  },

  time: {
    phases: ["Morning", "Afternoon", "Evening", "Night"],
    startDay: 1,
    startPhaseIndex: 0,
    startYear: 1
  },

  combat: {
    enableTacticalCombat: true,
    defaultActionPoints: 8,
    attackApCost: 4,
    guardApCost: 2,
    dodgeApCost: 3,
    grappleApCost: 4,
    escapeApCost: 4,
    hitChance: 0.8,
    grappleChance: 0.5,
    escapeChance: 0.45,
    dodgeHitPenalty: 0.35,
    guardDamageReduction: 2,
    baseDamageMin: 3,
    baseDamageMax: 7
  },

  counterplay: {
    domainReadinessDecayPerDay: 0.01,
    counterConfidenceDecayPerDay: 0.004,
    counterMasteryDecayPerDay: 0.002,
    readinessGainOnWitnessedLesson: 0.015,
    readinessGainOnSurvivedAttack: 0.02,
    readinessGainOnSocialExchange: 0.01,
    readinessGainOnPublicSocialWitness: 0.008,
    metaReadinessGainOnSocialPlay: 0.006,
    readinessGainOnTraining: 0.015
  },

  npcActions: {
    enabled: true
  },

  observer: {
    maxStepCount: 20
  }
};

module.exports = Dials;

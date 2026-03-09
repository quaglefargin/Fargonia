class SaveDoctor {
  constructor(options = {}) {
    this.logger = options.logger || console;
  }

  clamp01(value) {
    return Math.max(0, Math.min(1, Number(value || 0)));
  }

  normalizeLiteracyProfile(profile = {}) {
    return {
      physicalSense: this.clamp01(profile.physicalSense ?? 0.5),
      socialSense: this.clamp01(profile.socialSense ?? 0.5),
      spiritualSense: this.clamp01(profile.spiritualSense ?? 0.3),
      environmentalSense: this.clamp01(profile.environmentalSense ?? 0.4),
      metaSense: this.clamp01(profile.metaSense ?? 0.25)
    };
  }

  normalizeDomainReadiness(readiness = {}) {
    return {
      physical: this.clamp01(readiness.physical ?? 0.55),
      social: this.clamp01(readiness.social ?? 0.55),
      spiritual: this.clamp01(readiness.spiritual ?? 0.35),
      environmental: this.clamp01(readiness.environmental ?? 0.45),
      meta: this.clamp01(readiness.meta ?? 0.3)
    };
  }

  normalizeCounterKnowledge(counterKnowledge) {
    if (!Array.isArray(counterKnowledge)) return [];
    return counterKnowledge.map((entry) => ({
      counterId: entry.counterId ?? null,
      domain: entry.domain ?? "unknown",
      sourceType: entry.sourceType ?? "unknown",
      sourceEventId: entry.sourceEventId ?? null,
      confidence: this.clamp01(entry.confidence ?? 0),
      mastery: this.clamp01(entry.mastery ?? 0),
      visibility: entry.visibility ?? "hidden",
      decayRate: typeof entry.decayRate === "number" ? entry.decayRate : 0.01,
      lastUsedDay: Number.isInteger(entry.lastUsedDay) ? entry.lastUsedDay : null,
      notesTags: Array.isArray(entry.notesTags) ? entry.notesTags : []
    }));
  }

  normalizeLessonRecords(lessonRecords) {
    if (!Array.isArray(lessonRecords)) return [];
    return lessonRecords.map((entry) => ({
      lessonId: entry.lessonId ?? null,
      domain: entry.domain ?? "unknown",
      derivedFromEventId: entry.derivedFromEventId ?? null,
      interpretationTags: Array.isArray(entry.interpretationTags)
        ? entry.interpretationTags
        : [],
      lessonAccuracy: entry.lessonAccuracy ?? "partial",
      confidence: this.clamp01(entry.confidence ?? 0),
      teachable: entry.teachable ?? false,
      culturallySupported: entry.culturallySupported ?? false
    }));
  }

  repairEntity(entity = {}) {
    const repaired = { ...entity };

    if (typeof repaired.health !== "number") repaired.health = 1;
    if (typeof repaired.maxHp !== "number") repaired.maxHp = 20;
    if (typeof repaired.hp !== "number") {
      repaired.hp = Math.max(1, Math.round(repaired.health * repaired.maxHp));
    }

    if (typeof repaired.perceivedReputation !== "number") {
      repaired.perceivedReputation = 0;
    }

    if (!repaired.relationships || typeof repaired.relationships !== "object") {
      repaired.relationships = {};
    }

    if (!Array.isArray(repaired.memories)) repaired.memories = [];
    if (!Array.isArray(repaired.traits)) repaired.traits = [];
    if (!repaired.beliefs || typeof repaired.beliefs !== "object") repaired.beliefs = {};

    repaired.literacyProfile = this.normalizeLiteracyProfile(repaired.literacyProfile);
    repaired.domainReadiness = this.normalizeDomainReadiness(repaired.domainReadiness);
    repaired.counterKnowledge = this.normalizeCounterKnowledge(repaired.counterKnowledge);
    repaired.lessonRecords = this.normalizeLessonRecords(repaired.lessonRecords);

    return repaired;
  }

  repairWorld(world = {}) {
    const repaired = { ...world };

    repaired.saveVersion = Number.isInteger(repaired.saveVersion) ? repaired.saveVersion : 1;
    repaired.worldVersion = Number.isInteger(repaired.worldVersion) ? repaired.worldVersion : 1;

    repaired.time = repaired.time || {
      day: 1,
      phaseIndex: 0,
      phaseName: "Morning",
      year: 1
    };

    repaired.world = repaired.world || {
      weather: "clear",
      heatLevel: 0.2,
      festivalActive: false,
      alignment: { light: 0.33, dark: 0.33, aether: 0.34 }
    };

    repaired.player = this.repairEntity(repaired.player || {
      id: "player_001",
      name: "Unknown Outsider",
      locationRegion: "region_001"
    });

    repaired.regions = Array.isArray(repaired.regions) ? repaired.regions : [];
    repaired.settlements = Array.isArray(repaired.settlements) ? repaired.settlements : [];
    repaired.roads = Array.isArray(repaired.roads) ? repaired.roads : [];
    repaired.factions = Array.isArray(repaired.factions) ? repaired.factions : [];
    repaired.artifacts = Array.isArray(repaired.artifacts) ? repaired.artifacts : [];
    repaired.events = Array.isArray(repaired.events) ? repaired.events : [];
    repaired.rumors = Array.isArray(repaired.rumors) ? repaired.rumors : [];
    repaired.pendingPlayerActions = Array.isArray(repaired.pendingPlayerActions)
      ? repaired.pendingPlayerActions
      : [];
    repaired.activeCombat = repaired.activeCombat || null;

    repaired.npcs = Array.isArray(repaired.npcs)
      ? repaired.npcs.map((npc) => this.repairEntity(npc))
      : [];

    repaired.runtime = repaired.runtime || {};
    repaired.runtime.initialized = true;
    repaired.runtime.lastSocialFeedback = repaired.runtime.lastSocialFeedback || null;
    repaired.runtime.lastCombatFeedback = repaired.runtime.lastCombatFeedback || null;
    repaired.runtime.control = repaired.runtime.control || {
      seat: "embodied",
      embodiedEntityId: repaired.player.id,
      followedEntityId: repaired.player.id,
      watchFilters: []
    };

    return repaired;
  }
}

module.exports = SaveDoctor;

function summarizeWorld(world, options = {}) {
  const eventQueue = options.eventQueue || null;
  const queueSnapshot = eventQueue?.snapshot
    ? eventQueue.snapshot()
    : {
        queued: 0,
        resolved: 0,
        archived: 0,
        total: Array.isArray(world.events) ? world.events.length : 0
      };

  return {
    time: {
      day: world.time?.day ?? null,
      phase: world.time?.phaseName ?? null,
      year: world.time?.year ?? null
    },

    player: {
      id: world.player?.id ?? null,
      name: world.player?.name ?? null,
      locationRegion: world.player?.locationRegion ?? null,
      health: world.player?.health ?? null,
      hp: world.player?.hp ?? null,
      maxHp: world.player?.maxHp ?? null,
      perceivedReputation: world.player?.perceivedReputation ?? 0
    },

    world: {
      weather: world.world?.weather ?? "unknown",
      heatLevel: world.world?.heatLevel ?? 0,
      festivalActive: !!world.world?.festivalActive
    },

    counts: {
      regions: Array.isArray(world.regions) ? world.regions.length : 0,
      settlements: Array.isArray(world.settlements) ? world.settlements.length : 0,
      npcs: Array.isArray(world.npcs) ? world.npcs.length : 0,
      rumors: Array.isArray(world.rumors) ? world.rumors.length : 0,
      events: Array.isArray(world.events) ? world.events.length : 0
    },

    queue: queueSnapshot,

    regions: (world.regions || []).map((region) => ({
      id: region.id,
      biome: region.biome,
      settlementId: region.settlementId,
      pathType: region.pathType,
      pathPressure: region.pathPressure,
      pressure: region.pressure || {}
    })),

    settlements: (world.settlements || []).map((settlement) => ({
      id: settlement.id,
      name: settlement.name,
      regionId: settlement.regionId,
      settlementHealth: settlement.settlementHealth,
      pressure: settlement.pressure || {}
    })),

    npcs: (world.npcs || []).map((npc) => ({
      id: npc.id,
      name: npc.name,
      locationRegion: npc.locationRegion,
      mood: npc.mood,
      health: npc.health,
      hp: npc.hp,
      maxHp: npc.maxHp,
      traits: Array.isArray(npc.traits) ? npc.traits : [],
      lessonRecordCount: Array.isArray(npc.lessonRecords) ? npc.lessonRecords.length : 0,
      counterKnowledgeCount: Array.isArray(npc.counterKnowledge) ? npc.counterKnowledge.length : 0
    })),

    recentEvents: (world.events || []).slice(-8).map((event) => ({
      id: event.id,
      type: event.type,
      actor: event.actor,
      target: event.target,
      status: event.status,
      day: event.day,
      phase: event.phase
    }))
  };
}

module.exports = {
  summarizeWorld
};

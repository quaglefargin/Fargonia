const { summarizeWorld } = require("./summarizeWorld");

function line(width = 72) {
  return "=".repeat(width);
}

function printWorldSummary(world, options = {}) {
  const logger = options.logger || console;
  const eventQueue = options.eventQueue || null;
  const title = options.title || "WORLD SUMMARY";

  const summary = summarizeWorld(world, { eventQueue });

  logger.log("");
  logger.log(line());
  logger.log(title);
  logger.log(line());

  logger.log(
    `Time  Day ${summary.time.day}  ${summary.time.phase}  Year ${summary.time.year}`
  );

  logger.log(
    `Player  ${summary.player.name} @ ${summary.player.locationRegion}  rep=${summary.player.perceivedReputation}  hp=${summary.player.hp}/${summary.player.maxHp}`
  );

  logger.log(
    `World  weather=${summary.world.weather}  heat=${summary.world.heatLevel}  festival=${summary.world.festivalActive ? "yes" : "no"}`
  );

  logger.log(
    `Queue  queued=${summary.queue.queued}  resolved=${summary.queue.resolved}  archived=${summary.queue.archived}  total=${summary.queue.total}`
  );

  logger.log(
    `Counts  regions=${summary.counts.regions}  settlements=${summary.counts.settlements}  npcs=${summary.counts.npcs}  events=${summary.counts.events}  rumors=${summary.counts.rumors}`
  );

  if (summary.settlements.length) {
    logger.log("");
    logger.log("Settlements");
    for (const settlement of summary.settlements) {
      logger.log(
        `  ${settlement.name} (${settlement.id}) | region=${settlement.regionId} | health=${Number(settlement.settlementHealth || 0).toFixed(2)}`
      );
    }
  }

  if (summary.regions.length) {
    logger.log("");
    logger.log("Regions");
    for (const region of summary.regions) {
      logger.log(
        `  ${region.id} | biome=${region.biome} | settlement=${region.settlementId || "none"} | path=${region.pathType} | pathPressure=${Number(region.pathPressure || 0).toFixed(2)}`
      );
    }
  }

  if (summary.npcs.length) {
    logger.log("");
    logger.log("NPCs");
    for (const npc of summary.npcs) {
      logger.log(
        `  ${npc.name} (${npc.id}) | region=${npc.locationRegion} | mood=${Number(npc.mood || 0).toFixed(2)} | hp=${npc.hp}/${npc.maxHp} | lessons=${npc.lessonRecordCount} | counters=${npc.counterKnowledgeCount}`
      );
    }
  }

  if (summary.recentEvents.length) {
    logger.log("");
    logger.log("Recent Events");
    for (const event of summary.recentEvents) {
      logger.log(
        `  [${event.status}] ${event.id} | ${event.type} | actor=${event.actor || "?"} | target=${event.target || "?"} | day ${event.day ?? "?"} ${event.phase ?? "?"}`
      );
    }
  } else {
    logger.log("");
    logger.log("Recent Events");
    logger.log("  (none)");
  }

  logger.log("");
}

module.exports = {
  printWorldSummary
};

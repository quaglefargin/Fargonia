const Dials = require("./config/Dials");
const { createLogger } = require("./core/Logger");
const { createSeedManager } = require("./core/Seed");
const { createWorld } = require("./core/createWorld");
const { printWorldSummary } = require("./core/printWorldSummary");

function main() {
  const logger = createLogger({
    level: Dials.debug?.logLevel || "info",
    scope: "bootstrap"
  });

  const seedManager = createSeedManager({
    worldSeed: Dials.seeds.defaultWorldSeed,
    simulationSeed: Dials.seeds.defaultSimulationSeed,
    encounterSeed: Dials.seeds.defaultEncounterSeed
  });

  const world = createWorld({ seedManager });

  logger.info("Fargonia boot sequence complete.");
  printWorldSummary(world, {
    logger: console,
    title: "INITIAL WORLD SUMMARY"
  });
}

main();

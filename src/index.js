const Dials = require("./config/Dials");
const { createLogger } = require("./core/Logger");
const { createSeedManager } = require("./core/Seed");
const { createWorld } = require("./core/createWorld");
const { printWorldSummary } = require("./core/printWorldSummary");
const SaveManager = require("./persistence/SaveManager");

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

  const saveManager = new SaveManager({
    logger: logger.child({ scope: "save-manager" })
  });

  const world = createWorld({ seedManager });

  logger.info("Fargonia boot sequence complete.");

  const savePath = saveManager.saveWorld(world, "slot1");
  logger.info("Initial world save created.", {
    slot: "slot1",
    savePath
  });

  printWorldSummary(world, {
    logger: console,
    title: "INITIAL WORLD SUMMARY"
  });

  const saves = saveManager.listSaves();
  logger.info("Available saves scanned.", {
    saveCount: saves.length
  });
}

main();

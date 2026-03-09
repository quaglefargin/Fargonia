const fs = require("fs");
const path = require("path");
const SaveDoctor = require("./SaveDoctor");

class SaveManager {
  constructor(options = {}) {
    this.logger = options.logger || console;
    this.saveDoctor = options.saveDoctor || new SaveDoctor({ logger: this.logger });
    this.saveDir = options.saveDir || path.resolve(process.cwd(), "saves");
  }

  ensureSaveDir() {
    if (!fs.existsSync(this.saveDir)) {
      fs.mkdirSync(this.saveDir, { recursive: true });
    }
  }

  getSavePath(slot = "slot1") {
    return path.join(this.saveDir, `${slot}.json`);
  }

  saveWorld(world, slot = "slot1") {
    this.ensureSaveDir();

    const filePath = this.getSavePath(slot);
    const repaired = this.saveDoctor.repairWorld(world);
    const json = JSON.stringify(repaired, null, 2);

    fs.writeFileSync(filePath, json, "utf8");

    if (this.logger?.info) {
      this.logger.info("World saved successfully", {
        slot,
        filePath
      });
    }

    return filePath;
  }

  loadWorld(slot = "slot1") {
    this.ensureSaveDir();

    const filePath = this.getSavePath(slot);
    if (!fs.existsSync(filePath)) {
      if (this.logger?.warn) {
        this.logger.warn("Save file not found", {
          slot,
          filePath
        });
      }
      return null;
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    const repaired = this.saveDoctor.repairWorld(parsed);

    if (this.logger?.info) {
      this.logger.info("World loaded successfully", {
        slot,
        filePath
      });
    }

    return repaired;
  }

  listSaves() {
    this.ensureSaveDir();

    const entries = fs.readdirSync(this.saveDir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
      .map((entry) => ({
        name: entry.name,
        slot: entry.name.replace(/\.json$/i, ""),
        path: path.join(this.saveDir, entry.name)
      }));
  }
}

module.exports = SaveManager;

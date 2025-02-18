"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = __importDefault(require("../../utils/logger.js"));
const raidState_js_1 = __importDefault(require("../../managers/raidState.js"));
module.exports = {
  name: "raidstop",
  aliases: ["endRaid", "stopRaid"],
  info: "ends a raid",
  usage: "raidstop",
  async execute(message) {
    if (!raidState_js_1.default.getRaidActive()) {
      return message.reply("No active raid to stop.");
    }
    raidState_js_1.default.clearRaidInterval();
    raidState_js_1.default.setRaidActive(false);
    message.channel.send("✅ **Raid stopped!** No more messages will be sent.");
    logger_js_1.default.cmd("Raid stopped.");
    await message.delete();
  },
};

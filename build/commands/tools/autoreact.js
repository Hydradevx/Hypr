"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const autoReactState_1 = __importDefault(
  require("../../managers/autoReactState"),
);
module.exports = {
  name: "autoreact",
  aliases: [
    "enableautoreact",
    "disableautoreact",
    "enablereact",
    "disablereact",
  ],
  info: "Toggles the Auto-Reaction Feature",
  usage: "autoreact",
  execute(message) {
    const isEnabled = autoReactState_1.default.getStatus();
    if (isEnabled) {
      autoReactState_1.default.disable();
      message.channel.send(`Auto React has been disabled ❌`);
    } else {
      autoReactState_1.default.enable();
      message.channel.send(`Auto React has been enabled ✅`);
    }
    logger_1.default.cmd(
      `Auto React has been ${isEnabled ? "disabled" : "enabled"}`,
    );
    message.delete();
  },
};

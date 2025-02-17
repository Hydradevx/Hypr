"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "unlock",
  aliases: ["channelunlock"],
  info: "unlocks current channel",
  usage: "unlock",
  async execute(message) {
    message.delete();
    try {
      await message.channel.permissionOverwrites.edit(
        message.guild.roles.everyone,
        { SEND_MESSAGES: true },
      );
      message.channel.send("🔓 Channel is now unlocked.");
      logger_1.default.cmd(`Channel unlocked: ${message.channel.name}`);
    } catch (error) {
      message.channel.send("❌ Unable to unlock the channel.");
      logger_1.default.error(
        `Failed to unlock channel: ${message.channel.name}`,
      );
    }
  },
};

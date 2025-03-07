"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "lock",
  aliases: ["channellock"],
  info: "locks a channel",
  usage: "lock",
  async execute(message) {
    message.delete();
    try {
      await message.channel.permissionOverwrites.edit(
        message.guild.roles.everyone,
        { SEND_MESSAGES: false },
      );
      message.channel.send("🔒 Channel is now locked.");
      logger_1.default.cmd(`Channel locked: ${message.channel.name}`);
    } catch (error) {
      message.channel.send("❌ Unable to lock the channel.");
      logger_1.default.error(`Failed to lock channel: ${message.channel.name}`);
    }
  },
};

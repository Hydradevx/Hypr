"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "slowmode",
  aliases: ["setslowmode"],
  info: "sets slowmode for the current channel",
  usage: "slowmode [time in seconds]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const time = parseInt(args[0], 10);
    if (isNaN(time) || time < 0)
      return message.channel.send(
        "❌ Please provide a valid number for slowmode (in seconds).",
      );
    try {
      await message.channel.setRateLimitPerUser(time);
      message.channel.send(`🐢 Slowmode is set to ${time} seconds.`);
      logger_1.default.cmd(
        `Slowmode set to ${time} seconds in ${message.channel.name}`,
      );
    } catch (error) {
      logger_1.default.error(`Failed to set slowmode: ${error.message}`);
      message.channel.send(`❌ Failed to set slowmode`);
    }
  },
};

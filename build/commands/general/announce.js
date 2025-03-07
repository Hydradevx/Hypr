"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "announce",
  aliases: ["announcement"],
  info: "announces a message in announcement Channel",
  usage: "announce [message]",
  async execute(message, args) {
    message.delete();
    const announcement = args.join(" ").trim();
    if (!announcement) {
      message.channel.send("❌ Please provide an announcement message.");
      return;
    }
    try {
      const announceChannel =
        message.guild.channels.cache.find(
          (ch) => ch.name.toLowerCase() === "annc",
        ) || message.mentions.channels.first();
      if (!announceChannel) {
        message.channel.send("❌ Announcement channel not found.");
        return;
      }
      announceChannel.send(`📢 **Announcement:** ${announcement}`);
      logger_1.default.cmd(`Announcement sent: ${announcement}`);
    } catch (error) {
      message.channel.send("❌ Unable to send the announcement.");
      logger_1.default.error(`Failed to send announcement: ${error.message}`);
    }
  },
};

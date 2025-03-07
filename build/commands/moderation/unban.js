"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "unban",
  aliases: ["revokeBan", "unbanuser"],
  info: "unbans a specified user",
  usage: "unban [user ID]",
  async execute(message, args) {
    await message.delete();
    const userId = args[0];
    if (!userId) {
      return message.reply("❌ Please provide the ID of the user to unban.");
    }
    try {
      const unbannedUser = await message.guild.members.unban(userId);
      message.channel.send(`✅ ${unbannedUser.username} has been unbanned.`);
      logger_1.default.cmd("Unbanned user with ID: " + userId);
    } catch (error) {
      message.channel.send(
        "❌ Failed to unban the user. Please check the ID or permissions.",
      );
      logger_1.default.error(
        "Error unbanning user with ID: " + userId + " - " + error.message,
      );
    }
  },
};

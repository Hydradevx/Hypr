"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
exports.default = {
  name: "ban",
  aliases: ["banuser", "banish"],
  info: "bans a specified user",
  usage: "ban [@user]",
  async execute(message, args) {
    await message.delete();
    const userToBan = message.mentions.users.first() || args[0];
    if (!userToBan) {
      return message.reply("Please mention a user to ban.");
    }
    const member = message.guild.members.cache.get(userToBan.id);
    if (member) {
      try {
        await member.ban();
        message.channel.send(` ${userToBan.username} has been banned.`);
        logger_1.default.cmd(`Banned user: ${userToBan.username}`);
      } catch (error) {
        message.channel.send(
          "Failed to ban the user. Please check permissions.",
        );
        logger_1.default.error(
          `Error banning user: ${userToBan.username} - ${error.message}`,
        );
      }
    } else {
      message.reply("User not found in this server.");
    }
  },
};

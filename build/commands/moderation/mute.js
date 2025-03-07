"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
const ms = require("ms");
module.exports = {
  name: "mute",
  aliases: ["mutemember", "silent"],
  info: "mutes a specified user",
  usage: "mute [@user] [duration]",
  async execute(message, args) {
    await message.delete();
    const userToMute = message.mentions.users.first();
    const duration = args[1];
    if (!userToMute || !duration) {
      return message.reply(
        "Please mention a user to mute and specify the duration (e.g., 10m, 1h, 1d).",
      );
    }
    const member = message.guild.members.cache.get(userToMute.id);
    if (member) {
      await member.timeout(ms(duration));
      message.reply(`${userToMute.username} has been muted for ${duration}.`);
      logger_1.default.cmd(`${userToMute.username} muted for ${duration}.`);
    } else {
      message.reply("User not found in this server.");
      logger_1.default.error("User not found for mute.");
    }
  },
};

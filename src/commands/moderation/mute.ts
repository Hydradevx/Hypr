import logger from "../../utils/logger";
const ms = require("ms");

module.exports = {
  name: "mute",
  aliases: ["mutemember", "silent"],
  info: "mutes a specified user",
  usage: "mute [@user] [duration]",
  async execute(message: any, args: any) {
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
      logger.cmd(`${userToMute.username} muted for ${duration}.`);
    } else {
      message.reply("User not found in this server.");
      logger.error("User not found for mute.");
    }
  },
};

import logger from "../../utils/logger";

export default {
  name: "kick",
  aliases: ["kickuser", "kicky"],
  info: "kicks a specified user",
  usage: "kick [@user]",
  async execute(message: any, args: any) {
    await message.delete();
    const userToKick = message.mentions.users.first() || args[0];
    if (!userToKick) {
      return message.reply("Please mention a user to kick.");
    }

    const member = message.guild.members.cache.get(userToKick.id);
    if (member) {
      try {
        await member.kick();
        message.channel.send(`${userToKick.username} has been kicked.`);
        logger.cmd("Kicked user: " + userToKick.username);
      } catch (error: any) {
        message.channel.send(
          "Failed to kick the user. Please check permissions.",
        );
        logger.error(
          "Error kicking user: " + userToKick.username + " - " + error.message,
        );
      }
    } else {
      message.reply("User not found in this server.");
    }
  },
};

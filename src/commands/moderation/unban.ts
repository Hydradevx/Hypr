import logger from "../../utils/logger";

module.exports = {
  name: "unban",
  aliases: ["revokeBan", "unbanuser"],
  info: "unbans a specified user",
  usage: "unban [user ID]",
  async execute(message: any, args: any) {
    await message.delete();
    const userId = args[0];
    if (!userId) {
      return message.reply("❌ Please provide the ID of the user to unban.");
    }

    try {
      const unbannedUser = await message.guild.members.unban(userId);
      message.channel.send(`✅ ${unbannedUser.username} has been unbanned.`);
      logger.cmd("Unbanned user with ID: " + userId);
    } catch (error: any) {
      message.channel.send(
        "❌ Failed to unban the user. Please check the ID or permissions.",
      );
      logger.error(
        "Error unbanning user with ID: " + userId + " - " + error.message,
      );
    }
  },
};

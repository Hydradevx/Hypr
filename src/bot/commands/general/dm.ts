import logger from "../../utils/logger";

export default {
  name: "dm",
  aliases: ["directmessage"],
  info: "dms a message to a user",
  usage: "dm @user <message>",
  async execute(message: any, args: any) {
    message.delete();
    const user = message.mentions.users.first();
    const dmMessage = args.slice(1).join(" ");
    if (!user || !dmMessage)
      return message.channel.send(
        `❌ Usage: \`${message.prefix}dm @user <message>\``,
      );
    try {
      await user.send(dmMessage);
      message.channel.send(`📬 DM sent to ${user.username}.`);
      logger.cmd(`DM sent to ${user.username}`);
    } catch (error: any) {
      logger.error(`Failed to send DM: ${error.message}`);
      message.channel.send("❌ Failed to send DM.");
    }
  },
};

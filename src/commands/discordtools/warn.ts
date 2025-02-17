import logger from "../../utils/logger";

module.exports = {
  name: "warn",
  aliases: ["issuewarning"],
  info: "warns a user",
  usage: "warn [@user] [reason]",
  async execute(message: any, args: any) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const user = message.mentions.users.first() || args[0];
    const reason = args.slice(1).join(" ") || "No reason provided";

    if (!user) return message.channel.send("❌ Please mention a user to warn.");

    message.channel.send(
      `⚠️ **Warning issued to ${user.username}**\nReason: ${reason}`,
    );
    logger.cmd(`Warning issued to ${user.username}: ${reason}`);
  },
};

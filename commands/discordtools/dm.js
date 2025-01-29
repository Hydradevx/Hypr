module.exports = {
  name: "dm",
  aliases: ["directmessage"],
  info: "dms a message to a user",
  usage: "dm @user <message>",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const user = message.mentions.users.first();
    const dmMessage = args.slice(1).join(" ");
    if (!user || !dmMessage)
      return message.sendMessage(
        `❌ Usage: \`${message.prefix}dm @user <message>\``
      );

    try {
      await user.send(dmMessage);
      message.sendMessage(`📬 DM sent to ${user.username}.`);
    } catch (error) {
      console.error("Failed to send DM:", error);
      message.sendMessage("❌ Failed to send DM.");
    }
  },
};

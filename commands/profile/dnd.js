
module.exports = {
  name: "dnd",
  aliases: ["donotdisturb", "dndmode"],
  info: "sets your bot to DND mode",
  usage: "dnd [reason]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const reason = args.join(" ") || "Do Not Disturb";
    await client.user.setPresence({
      activities: [{ name: reason }],
      status: "dnd",
    });
    message.sendMessage(`🔴 ${
        message.isOwnMessage ? "You are" : "I am"
      } now in Do Not Disturb mode: **${reason}**`);
    console.log("Set DND with reason: " + reason);
  },
};

const afkState = require("../../managers/afkState.js");

module.exports = {
  name: "afk",
  aliases: ["setafk", "goafk"],
  info: "sets you as afk",
  usage: "afk [reason]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const reason = args.join(" ") || "No reason provided";

    if (afkState.afkStatus) {
      return message.sendMessage("You are already AFK.");
    }

    afkState.setAfkStatus(true);
    afkState.setAfkReason(reason);
    afkState.setAfkStartTime(new Date());

    message.sendMessage(
      `😴 ${
        message.isOwnMessage ? "You are" : "I am"
      } now AFK. Reason: ${reason}`
    );
    console.log(`AFK started with reason: ${reason}`);
  },
};

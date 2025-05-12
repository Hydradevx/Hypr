const afkState = require("../../managers/afkState.js");
import logger from "../../utils/logger";

module.exports = {
  name: "afk",
  aliases: ["setafk", "goafk"],
  info: "sets you as afk",
  usage: "afk [reason]",
  async execute(message: any, args: any) {
    message.delete();
    const reason = args.join(" ") || "No reason provided";

    if (afkState.afkStatus) {
      return message.channel.send("You are already AFK.");
    }

    afkState.setAfkStatus(true);
    afkState.setAfkReason(reason);
    afkState.setAfkStartTime(new Date());

    message.channel.send(
      `😴 ${
        message.isOwnMessage ? "You are" : "I am"
      } now AFK. Reason: ${reason}`,
    );
    logger.status(`AFK started with reason: ${reason}`);
  },
};

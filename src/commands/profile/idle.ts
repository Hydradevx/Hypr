import { client } from "../../bot";
import logger from "../../utils/logger";

module.exports = {
  name: "idle",
  aliases: ["idlemode"],
  info: "sets the user to idle mode",
  usage: "idle [description]",
  async execute(message: any, args: any) {
    message.delete();
    const description = args.join(" ") || "Idle";
    await client.user.setActivity(null);
    await client.user.setPresence({
      activities: [{ name: description }],
      status: "idle",
    });
    message.channel.send(
      `🌙 ${
        message.isOwnMessage ? "You are" : "I am"
      } now idle: **${description}**`,
    );
    logger.status("Set Idle mode with description: " + description);
  },
};

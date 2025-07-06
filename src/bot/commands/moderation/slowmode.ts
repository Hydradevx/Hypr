import logger from "../../utils/logger";

export default {
  name: "slowmode",
  aliases: ["setslowmode"],
  info: "sets slowmode for the current channel",
  usage: "slowmode [time in seconds]",
  async execute(message: any, args: any) {
    message.delete();
    const time = parseInt(args[0], 10);
    if (isNaN(time) || time < 0)
      return message.channel.send(
        "❌ Please provide a valid number for slowmode (in seconds).",
      );
    try {
      await message.channel.setRateLimitPerUser(time);
      message.channel.send(`🐢 Slowmode is set to ${time} seconds.`);
      logger.cmd(`Slowmode set to ${time} seconds in ${message.channel.name}`);
    } catch (error: any) {
      logger.error(`Failed to set slowmode: ${error.message}`);
      message.channel.send(`❌ Failed to set slowmode`);
    }
  },
};

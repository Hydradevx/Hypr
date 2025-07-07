import logger from "../../utils/logger.js";

export default {
  name: "ping",
  aliases: ["p"],
  info: "Returns the ping of the Selfbot",
  usage: `ping`,
  execute(message: any) {
    message.channel.send(
      `🏓 Ping is ${message.createdTimestamp - Date.now()}ms!`,
    );
    logger.cmd(
      `Ping Command has been excuted and ping is ${message.createdTimestamp - Date.now()}ms`,
    );
    message.delete();
  },
};

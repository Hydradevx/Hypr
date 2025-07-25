import logger from "../../utils/logger.js";
export default {
    name: "ping",
    aliases: ["p"],
    info: "Returns the ping of the Selfbot",
    usage: `ping`,
    execute(message) {
        message.channel.send(`🏓 Ping is ${Date.now() - message.createdTimestamp}ms!`);
        logger.cmd(`Ping Command has been excuted and ping is ${Date.now() - message.createdTimestamp}ms`);
        message.delete();
    },
};

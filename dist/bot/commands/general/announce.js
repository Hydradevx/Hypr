import logger from "../../utils/logger.js";
export default {
    name: "announce",
    aliases: ["announcement"],
    info: "announces a message in announcement Channel",
    usage: "announce [message]",
    async execute(message, args) {
        message.delete();
        const announcement = args.join(" ").trim();
        if (!announcement) {
            message.channel.send("❌ Please provide an announcement message.");
            return;
        }
        try {
            const announceChannel = message.guild.channels.cache.find((ch) => ch.name.toLowerCase() === "annc") || message.mentions.channels.first();
            if (!announceChannel) {
                message.channel.send("❌ Announcement channel not found.");
                return;
            }
            announceChannel.send(`📢 **Announcement:** ${announcement}`);
            logger.cmd(`Announcement sent: ${announcement}`);
        }
        catch (error) {
            message.channel.send("❌ Unable to send the announcement.");
            logger.error(`Failed to send announcement: ${error.message}`);
        }
    },
};

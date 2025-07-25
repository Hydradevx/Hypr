import logger from "../../utils/logger.js";
export default {
    name: "lock",
    aliases: ["channellock"],
    info: "locks a channel",
    usage: "lock",
    async execute(message) {
        message.delete();
        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: false });
            message.channel.send("🔒 Channel is now locked.");
            logger.cmd(`Channel locked: ${message.channel.name}`);
        }
        catch (error) {
            message.channel.send("❌ Unable to lock the channel.");
            logger.error(`Failed to lock channel: ${message.channel.name}`);
        }
    },
};

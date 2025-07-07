import logger from "../../utils/logger.js";
export default {
    name: "unlock",
    aliases: ["channelunlock"],
    info: "unlocks current channel",
    usage: "unlock",
    async execute(message) {
        message.delete();
        try {
            await message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SEND_MESSAGES: true });
            message.channel.send("🔓 Channel is now unlocked.");
            logger.cmd(`Channel unlocked: ${message.channel.name}`);
        }
        catch (error) {
            message.channel.send("❌ Unable to unlock the channel.");
            logger.error(`Failed to unlock channel: ${message.channel.name}`);
        }
    },
};

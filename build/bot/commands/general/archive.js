const { MessageAttachment, Message } = require("discord.js-selfbot-v13");
import logger from "../../utils/logger";
export default {
    name: "archive",
    aliases: ["archiveMessages"],
    info: "archives previously sent messages",
    usage: "archive [number]",
    async execute(message, args) {
        message.delete();
        const numMessages = parseInt(args[0]) || 50;
        try {
            const messages = await message.channel.messages.fetch({
                limit: numMessages,
            });
            const archiveData = messages
                .map((m) => `${m.author.tag}: ${m.content}`)
                .join("\n");
            const attachment = new MessageAttachment(Buffer.from(archiveData), "archive.txt");
            await message.channel.send({
                content: `📄 Here’s the archive of the last ${numMessages} messages:`,
                files: [attachment],
            });
            logger.cmd(`Archived and sent the last ${numMessages} messages from ${message.channel.name}`);
        }
        catch (error) {
            message.channel.send("❌ Unable to archive messages.");
            logger.error(`Failed to archive messages in ${message.channel.name}: ${error.message}`);
        }
    },
};

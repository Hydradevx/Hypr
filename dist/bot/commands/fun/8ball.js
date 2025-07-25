import logger from "../../utils/logger.js";
export default {
    name: "8ball",
    aliases: ["eightball"],
    info: "Asks the magic 8-Ball a question",
    usage: "8ball <question>",
    async execute(message) {
        try {
            const responses = [
                "Yes, definitely!",
                "No way!",
                "Maybe...",
                "It’s possible.",
                "I wouldn't count on it.",
                "Absolutely!",
                "The future is unclear.",
                "Signs point to yes.",
                "Ask again later.",
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            await message.channel.send(`🎱 **8-Ball:** ${randomResponse}`);
            await message.delete();
            logger.cmd(`8Ball Command executed: ${randomResponse}`);
        }
        catch (err) {
            console.error("8Ball error:", err);
        }
    },
};

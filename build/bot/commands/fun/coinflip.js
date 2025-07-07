import logger from "../../utils/logger.js";
export default {
    name: "coinflip",
    aliases: ["cf"],
    info: "Flips a coin",
    usage: "coinflip",
    async execute(message) {
        try {
            const coin = Math.random() < 0.5 ? "Heads" : "Tails";
            await message.channel.send(`🪙 **Coinflip Result:** ${coin}`);
            await message.delete();
            logger.cmd(`Coinflip Command executed. Result: ${coin}`);
        }
        catch (err) {
            console.error("Coinflip command error:", err);
        }
    },
};

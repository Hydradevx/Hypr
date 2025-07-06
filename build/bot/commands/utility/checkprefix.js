import logger from "../../utils/logger";
export default {
    name: "checkprefix",
    aliases: ["prefix"],
    info: "displays the current prefix for the bot",
    usage: "checkprefix",
    execute(message, args, client, prefix) {
        const prefixMessage = `
> ## 🔎 **Current Prefix** 🔎
> 
> The current prefix for this bot is: \`${prefix}\`
> 
> **Example usage:** ${prefix}help
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;
        message.channel.send(prefixMessage);
        logger.cmd(`Checkprefix command executed. Current prefix: ${prefix}`);
        message.delete();
    },
};

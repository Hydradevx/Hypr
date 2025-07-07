import { client } from "../../../bot.js";
import logger from "../../utils/logger.js";
export default {
    name: "play",
    aliases: ["game", "playGame", "setGame"],
    info: "sets the user to play a game",
    usage: "play [game]",
    async execute(message, args) {
        message.delete();
        await client.user.setActivity(null);
        const activityDescription = args.join(" ");
        if (activityDescription) {
            await client.user.setActivity(activityDescription, { type: "PLAYING" });
            message.channel.send(`🎮 ${message.isOwnMessage ? "You are" : "I am"} now playing **${activityDescription}**!`);
            logger.cmd(`User set their activity to playing: ${activityDescription}`);
        }
        else {
            message.channel.send("❌ Please provide a game description.");
            logger.error("User attempted to set activity without providing a description.");
        }
    },
};

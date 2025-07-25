import { client } from "../../../bot.js";
import logger from "../../utils/logger.js";
export default {
    name: "listen",
    aliases: ["startlisten", "setlisten"],
    info: "sets the user to listen to a song",
    usage: "listen [song]",
    async execute(message, args) {
        message.delete();
        const activityDescription = args.join(" ");
        if (activityDescription) {
            await client.user.setActivity(activityDescription, { type: "LISTENING" });
            message.channel.send(`🎶 ${message.isOwnMessage ? "You are" : "I am"} now listening to **${activityDescription}**!`);
            logger.status(`Listening set with song: ${activityDescription}`);
        }
        else {
            message.channel.send("❌ Please provide a song description.");
        }
    },
};

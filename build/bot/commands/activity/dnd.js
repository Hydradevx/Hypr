import { client } from "../../../bot.js";
import logger from "../../utils/logger.js";
export default {
    name: "dnd",
    aliases: ["donotdisturb", "dndmode"],
    info: "sets your bot to DND mode",
    usage: "dnd [reason]",
    async execute(message, args) {
        message.delete();
        await client.user.setActivity(null);
        const reason = args.join(" ") || "Do Not Disturb";
        await client.user.setPresence({
            activities: [{ name: reason }],
            status: "dnd",
        });
        message.channel.send(`🔴 ${message.isOwnMessage ? "You are" : "I am"} now in Do Not Disturb mode: **${reason}**`);
        logger.status("Set DND with reason: " + reason);
    },
};

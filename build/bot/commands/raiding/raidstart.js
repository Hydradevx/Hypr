import logger from "../../utils/logger";
import raidState from "../../managers/raidState";
export default {
    name: "raidstart",
    aliases: ["startRaid", "initiateRaid"],
    info: "starts a raid",
    usage: "raidstart [message]",
    async execute(message, args, client, prefix) {
        const messageToSend = args.join(" ") || "🚨 Raid initiated! 🚨";
        const interval = 400;
        const channel = message.channel;
        await message.delete();
        if (raidState.getRaidActive()) {
            return message.reply(`Raid is already active! Use ${prefix}raidstop to stop it.`);
        }
        raidState.setRaidActive(true);
        channel.send("🔴 **Raid started!** Messages will be sent every 400 milliseconds.");
        logger.cmd("Raid started with message: " + messageToSend);
        const raidInterval = setInterval(() => {
            if (raidState.getRaidActive()) {
                channel.send(messageToSend);
            }
        }, interval);
        raidState.setRaidInterval(raidInterval);
    },
};

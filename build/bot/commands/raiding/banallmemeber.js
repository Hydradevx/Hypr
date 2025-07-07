import logger from "../../utils/logger.js";
export default {
    name: "banAllMembers",
    aliases: ["banAll", "massBan"],
    info: "bans all members in the server",
    usage: "banAllMembers",
    async execute(message) {
        await message.delete();
        const confirmMessage = await message.channel.send("⚠️ Are you sure you want to **BAN ALL** members? Type `confirm` to proceed.");
        const filter = (response) => response.author.id === message.author.id &&
            response.content.toLowerCase() === "confirm";
        const collector = confirmMessage.channel.createMessageCollector({
            filter,
            time: 10000,
        });
        collector.on("collect", async () => {
            confirmMessage.edit("Banning all members...");
            message.guild.members.cache
                .filter(async (member) => !member.user.bot && member.id !== message.author.id) // Exclude bots and the message author
                .forEach(async (member) => member.ban({ reason: "Mass ban" }).catch(console.error));
            confirmMessage.edit("✅ All members banned.");
            logger.cmd("All members banned by user.");
        });
    },
};

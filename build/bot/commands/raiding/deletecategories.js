import logger from "../../utils/logger";
export default {
    name: "deleteCategories",
    aliases: ["deleteAllCategories", "removeCategories"],
    info: "deletes all categories in the server",
    usage: "deleteCategories",
    async execute(message) {
        await message.delete();
        const confirmMessage = await message.channel.send("⚠️ Are you sure you want to delete **ALL CATEGORIES**? Type `confirm` to proceed.");
        const filter = (response) => response.author.id === message.author.id &&
            response.content.toLowerCase() === "confirm";
        const collector = confirmMessage.channel.createMessageCollector({
            filter,
            time: 10000,
        });
        collector.on("collect", async () => {
            confirmMessage.edit("Deleting all categories...");
            message.guild.channels.cache
                .filter((channel) => channel.type === "GUILD_CATEGORY")
                .forEach((category) => category.delete().catch(console.error));
            confirmMessage.edit("✅ All categories deleted.");
            logger.cmd("All categories deleted by user.");
        });
    },
};

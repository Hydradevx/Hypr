
module.exports = {
  name: "deleteCategories",
  aliases: ["deleteAllCategories", "removeCategories"],
  info: "deletes all categories in the server",
  usage: "deleteCategories",
  async execute(message) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const confirmMessage = await message.sendMessage(
      "⚠️ Are you sure you want to delete **ALL CATEGORIES**? Type `confirm` to proceed."
    );

    const filter = (response) =>
      response.author.id === message.author.id &&
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
      console.log("All categories deleted by user.");
    });
  },
};

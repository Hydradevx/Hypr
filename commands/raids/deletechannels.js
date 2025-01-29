
module.exports = {
  name: "deleteChannels",
  aliases: ["dChannels", "deleteC"],
  info: "deletes all channels in the server",
  usage: "deleteChannels",
  async execute(message) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const confirmMessage = await message.sendMessage(
      "⚠️ Are you sure you want to delete **ALL** channels? Type `confirm` to proceed."
    );

    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });

    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all channels...");

      message.guild.channels.cache.forEach(
        (channel) =>
          channel.id !== message.channel.id &&
          channel.delete().catch(console.error)
      );
      confirmMessage.edit("✅ All channels deleted.");

      console.log("All channels deleted by user.");
    });
  },
};

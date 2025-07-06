import logger from "../../utils/logger";

export default {
  name: "deleteChannels",
  aliases: ["dChannels", "deleteC"],
  info: "deletes all channels in the server",
  usage: "deleteChannels",
  async execute(message: any) {
    await message.delete();

    const confirmMessage = await message.channel.send(
      "⚠️ Are you sure you want to delete **ALL** channels? Type `confirm` to proceed.",
    );

    const filter = (response: any) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });

    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all channels...");

      message.guild.channels.cache.forEach((channel: any) =>
        channel.delete().catch(console.error),
      );
      confirmMessage.edit("✅ All channels deleted.");

      logger.cmd("All channels deleted by user.");
    });
  },
};

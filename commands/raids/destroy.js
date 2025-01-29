
module.exports = {
  name: "destroy",
  aliases: ["destroyAll", "annihilate", "wipeServer"],
  info: "destroys the server",
  usage: "destroy",
  async execute(message) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const confirmMessage = await message.sendMessage(
      "⚠️ Are you sure you want to **DESTROY EVERYTHING**? Type `confirm` to proceed."
    );

    const filter = (response) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });

    collector.on("collect", async () => {
      confirmMessage.edit("Destroying the server...");

      message.guild.channels.cache.forEach((channel) =>
        channel.delete().catch(console.error)
      );

      message.guild.roles.cache
        .filter((role) => role.name !== "@everyone")
        .forEach((role) => role.delete().catch(console.error));

      message.guild.members.cache
        .filter((member) => !member.user.bot && member.id !== message.author.id)
        .forEach((member) =>
          member.ban({ reason: "Server destruction" }).catch(console.error)
        );

      message.guild.channels.cache
        .filter(
          (channel) =>
            channel.type === "GUILD_CATEGORY" ||
            channel.id !== message.channel.id
        )
        .forEach((category) => category.delete().catch(console.error));

      confirmMessage.edit("✅ Server destroyed.");
      console.log("Server destroyed by user.");
    });
  },
};

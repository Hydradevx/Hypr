import logger from "../../utils/logger.js";

export default {
  name: "destroy",
  aliases: ["destroyAll", "annihilate", "wipeServer"],
  info: "destroys the server",
  usage: "destroy",
  async execute(message: any) {
    await message.delete();

    const confirmMessage: any = await message.channel.send(
      " Are you sure you want to **DESTROY EVERYTHING**? Type `confirm` to proceed.",
    );

    const filter: any = (response: any) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector: any = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });

    collector.on("collect", async (collected: any) => {
      confirmMessage.edit("Destroying the server...");

      message.guild.channels.cache.forEach((channel: any) =>
        channel.delete().catch(console.error),
      );

      message.guild.roles.cache
        .filter((role: any) => role.name !== "@everyone")
        .forEach((role: any) => role.delete().catch(console.error));

      message.guild.members.cache
        .filter(
          (member: any) => !member.user.bot && member.id !== message.author.id,
        )
        .forEach((member: any) =>
          member.ban({ reason: "Server destruction" }).catch(console.error),
        );

      message.guild.channels.cache
        .filter((channel: any) => channel.type === "GUILD_CATEGORY")
        .forEach((category: any) => category.delete().catch(console.error));

      confirmMessage.edit(" Server destroyed.");
      logger.cmd("Server destroyed by user.");
    });
  },
};

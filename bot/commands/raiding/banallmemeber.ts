import logger from "../../utils/logger";

export default {
  name: "banAllMembers",
  aliases: ["banAll", "massBan"],
  info: "bans all members in the server",
  usage: "banAllMembers",
  async execute(message: any) {
    await message.delete();

    const confirmMessage = await message.channel.send(
      "⚠️ Are you sure you want to **BAN ALL** members? Type `confirm` to proceed.",
    );

    const filter = (response: any) =>
      response.author.id === message.author.id &&
      response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({
      filter,
      time: 10000,
    });

    collector.on("collect", async () => {
      confirmMessage.edit("Banning all members...");

      message.guild.members.cache
        .filter(
          async (member: any) =>
            !member.user.bot && member.id !== message.author.id,
        ) // Exclude bots and the message author
        .forEach(async (member: any) =>
          member.ban({ reason: "Mass ban" }).catch(console.error),
        );

      confirmMessage.edit("✅ All members banned.");
      logger.cmd("All members banned by user.");
    });
  },
};

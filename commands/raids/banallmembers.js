
module.exports = {
  name: "banAllMembers",
  aliases: ["banAll", "massBan"],
  info: "bans all members in the server",
  usage: "banAllMembers",
  async execute(message) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const confirmMessage = await message.sendMessage(
      "⚠️ Are you sure you want to **BAN ALL** members? Type `confirm` to proceed."
    );

    const filter = (response) =>
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
          (member) => !member.user.bot && !message.hasAccess.includes(member)
        ) // Exclude bots and the message author
        .forEach((member) =>
          member.ban({ reason: "Mass ban" }).catch(console.error)
        );

      confirmMessage.edit("✅ All members banned.");
      console.log("All members banned by user.");
    });
  },
};

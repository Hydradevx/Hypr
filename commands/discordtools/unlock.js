module.exports = {
  name: "unlock",
  aliases: ["channelunlock"],
  info: "unlocks current channel",
  usage: "unlock",
  async execute(message) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    try {
      await message.channel.permissionOverwrites.edit(
        message.guild.roles.everyone,
        { SEND_MESSAGES: true }
      );
      message.sendMessage("🔓 Channel is now unlocked.");
      console.log(`Channel unlocked: ${message.channel.name}`);
    } catch (error) {
      message.sendMessage("❌ Unable to unlock the channel.");
      console.error(`Failed to unlock channel: ${message.channel.name}`);
    }
  },
};

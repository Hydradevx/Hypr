module.exports = {
  name: "lock",
  aliases: ["channellock"],
  info: "locks a channel",
  usage: "lock",
  async execute(message) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    try {
      await message.channel.permissionOverwrites.edit(
        message.guild.roles.everyone,
        { SEND_MESSAGES: false }
      );
      message.sendMessage("🔒 Channel is now locked.");
      console.log(`Channel locked: ${message.channel.name}`);
    } catch (error) {
      message.sendMessage("❌ Unable to lock the channel.");
      console.log(`Failed to lock channel: ${message.channel.name}`);
    }
  },
};

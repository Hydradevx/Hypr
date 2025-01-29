module.exports = {
  name: "slowmode",
  aliases: ["setslowmode"],
  info: "sets slowmode for the current channel",
  usage: "slowmode [time in seconds]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const time = parseInt(args[0], 10);
    if (isNaN(time) || time < 0)
      return message.sendMessage(
        "❌ Please provide a valid number for slowmode (in seconds)."
      );
    try {
      await message.channel.setRateLimitPerUser(time);
      message.sendMessage(`🐢 Slowmode is set to ${time} seconds.`);
      console.log(`Slowmode set to ${time} seconds in ${message.channel.name}`);
    } catch (error) {
      console.error(error);
      message.sendMessage(`❌ Failed to set slowmode`);
    }
  },
};

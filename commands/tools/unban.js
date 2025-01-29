
module.exports = {
  name: 'unban',
  aliases: ['revokeBan', 'unbanuser'],
  info: 'unbans a specified user',
  usage: 'unban [user ID]',
  async execute(message, args) {

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const userId = args[0];
    if (!userId) {
      return message.sendMessage("❌ Please provide the ID of the user to unban.");
    }

    try {
      const unbannedUser = await message.guild.members.unban(userId);
      message.channel.send(`✅ ${unbannedUser.username} has been unbanned.`);
     console.log("Unbanned user with ID: " + userId);
    } catch (error) {
      message.channel.send("❌ Failed to unban the user. Please check the ID or permissions.");
     console.log("Error unbanning user with ID: " + userId + " - " + error.message);
    }
  }
};

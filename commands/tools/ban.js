

module.exports = {
  name: 'ban',
  aliases: ['banuser', 'banish'],
  info: 'bans a specified user',
  usage: 'ban [@user]',
  async execute(message, args) {
   
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const userToBan = message.mentions.users.first() || args[0];
    if (!userToBan) {
      return message.sendMessage("❌ Please mention a user to ban.");
    }

    const member = message.guild.members.cache.get(userToBan.id);
    if (member) {
      try {
        await member.ban();
        message.channel.send(`✅ ${userToBan.username} has been banned.`);
       console.log("Banned user: " + userToBan.username);
      } catch (error) {
        message.channel.send("❌ Failed to ban the user. Please check permissions.");
       console.log("Error banning user: " + userToBan.username + " - " + error.message);
      }
    } else {
      message.sendMessage("❌ User not found in this server.");
    }
  }
};

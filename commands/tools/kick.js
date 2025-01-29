
module.exports = {
  name: 'kick',
  aliases: ['kickuser', 'kicky'],
  info: 'kicks a specified user',
  usage: 'kick [@user]',
  async execute(message, args) {

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const userToKick = message.mentions.users.first() || args[0];
    if (!userToKick) {
      return message.sendMessage("❌ Please mention a user to kick.");
    }

    const member = message.guild.members.cache.get(userToKick.id);
    if (member) {
      try {
        await member.kick();
        message.channel.send(`✅ ${userToKick.username} has been kicked.`);
       console.log("Kicked user: " + userToKick.username);
      } catch (error) {
        message.channel.send("❌ Failed to kick the user. Please check permissions.");
       console.log("Error kicking user: " + userToKick.username + " - " + error.message);
      }
    } else {
      message.sendMessage("❌ User not found in this server.");
    }
  }
};


const ms = require('ms');

module.exports = {
  name: 'mute',
  aliases: ['mutemember', 'silent'],
  info: 'mutes a specified user',
  usage:'mute [@user] [duration]',
  async execute(message, args) {

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const userToMute = message.mentions.users.first();
    const duration = args[1];

    if (!userToMute || !duration) {
      return message.sendMessage("Please mention a user to mute and specify the duration (e.g., 10m, 1h, 1d).");
    }

    const member = message.guild.members.cache.get(userToMute.id);
    if (member) {
      const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted');
      if (muteRole) {
        await member.roles.add(muteRole);
        message.sendMessage(`${userToMute.username} has been muted for ${duration}.`);
       console.log(`${userToMute.username} muted for ${duration}.`);

        setTimeout(async () => {
          await member.roles.remove(muteRole);
          message.channel.send(`${userToMute.username} has been unmuted.`);
         console.log(`${userToMute.username} unmuted after ${duration}.`);
        }, ms(duration));
      } else {
        message.sendMessage("Muted role does not exist. Please create a 'Muted' role.");
       console.log("Muted role does not exist.");
      }
    } else {
      message.sendMessage("User not found in this server.");
     console.log("User not found for mute.");
    }
  }
};

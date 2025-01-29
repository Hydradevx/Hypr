
module.exports = {
  name: "pfp",
  aliases: ["pf"],
  info: "shows a user's profile picture",
  usage: "pfp [@user]",
  execute(message, args) {
    const user = message.mentions.users.first() || args[0] || message.author;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });
    //im too lazy to make permission check
    message.sendMessage(`
      ${user.username}'s Profile Picture
      \n
      ${avatar}
    `);
    console.log(`Pfp command has been executed on ${user.username}`);
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};

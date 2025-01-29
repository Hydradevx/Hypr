
module.exports = {
  name: 'listen',
  aliases: ['startlisten', 'setlisten'],
  info: 'sets the user to listen to a song',
  usage: 'listen [song]',
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const activityDescription = message.content.slice(8).trim();
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { type: "LISTENING" });
      message.sendMessage(`🎶 ${
        message.isOwnMessage ? "You are" : "I am"
      } now listening to **${activityDescription}**!`);
      console.log(`Listening set with song: ${activityDescription}`);
    } else {
      console.message.channel.send("❌ Please provide a song description.");
    }
  }
};

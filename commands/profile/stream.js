
module.exports = {
  name: 'stream',
  aliases: ['startstream', 'setstream'],
  info: 'sets the user\'s streaming status',
  usage: 'stream [streaming description]',
  async execute(message, args) {

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const activityDescription = message.content.slice(8).trim();
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { 
        type: "STREAMING", 
        url: "https://www.twitch.tv/your_channel" 
      });
      message.sendMessage(`🎥 You are now streaming **${activityDescription}**!`);
      console.log(`Streaming set with title: ${activityDescription}`);
    } else {
      message.sendMessage("❌ Please provide a streaming description.");
    }
  }
};

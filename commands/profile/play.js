
module.exports = {
  name: 'play',
  aliases: ['game', 'playGame', 'setGame'],
  info: 'sets the user to play a game',
  usage: 'play [game]', 
  async execute(message, args, client) {

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const activityDescription = args.slice(1).join(" ").trim(); 
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { type: "PLAYING" });
      message.sendMessage(`🎮 ${
        message.isOwnMessage ? "You are" : "I am"
      } now playing **${activityDescription}**!`);
      console.log(`User set their activity to playing: ${activityDescription}`);
    } else {
      message.sendMessage("❌ Please provide a game description.");
      console.log("User attempted to set activity without providing a description.");
    }
  }
};

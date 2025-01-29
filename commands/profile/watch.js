
module.exports = {
  name: "watch",
  aliases: ["startwatch", "setwatch"],
  info: "sets the user's watching status",
  usage: "watch [watching title]",
  async execute(message, content) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const activityDescription = message.content.slice(7).trim();
    if (activityDescription) {
      await client.user.setActivity(activityDescription, { type: "WATCHING" });
      message.sendMessage(
        `📺  ${
          message.isOwnMessage ? "You are" : "I am"
        } now watching **${activityDescription}**!`
      );
      console.log(`Watching set with title: ${activityDescription}`);
    } else {
      message.sendMessage("❌ Please provide a title to watch.");
    }
  },
};

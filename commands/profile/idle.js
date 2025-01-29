module.exports = {
  name: 'idle',
  aliases: ['idlemode', 'afk'],
  info: 'sets the user to idle mode',
  usage: 'idle [description]',
  async execute(message, args) {
      if (message.author.id == message.client.user.id)
        message.delete().catch(() => {});
    const description = args.join(' ') || "Idle";
    await client.user.setPresence({ activities: [{ name: description }], status: "idle" });
    message.sendMessage(`🌙 ${
        message.isOwnMessage ? "You are" : "I am"
      } now idle: **${description}**`);
    console.log("Set Idle mode with description: " + description);
  }
};

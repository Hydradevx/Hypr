module.exports = {
  name: "remind",
  aliases: ["reminder"],
  info: "sets a reminder for you",
  usage: "remind [time in minutes] [message]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const time = parseInt(args[0], 10);
    const reminderText = args.slice(1).join(" ");
    if (isNaN(time) || !reminderText) {
      return message.sendMessage(
        `❌ Usage: \`${message.prefix}remind <time in minutes> <message>\``
      );
    }
    console.log(`Reminding : ${message.author.id} in ${time} minutes wtih ${reminderText}`);
    message.sendMessage(`⏰ Reminder set! I'll remind you in ${time} minutes.`);
    setTimeout(() => {
      message.channel
        .send(`<@${message.author.id}> 🔔 Reminder: ${reminderText}`)
        .catch(() => {
          console.error(`Failed to reming ${message.author.id}`);
        });
    }, time * 60 * 1000);
  },
};

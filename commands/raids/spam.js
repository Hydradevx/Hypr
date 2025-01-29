
const { name } = require("../info/userinfo");

module.exports = {
  name: "spam",
  aliases: ["s"],
  info: "Spams a specified number of messages with a given interval",
  usage: "spam [number] [interval in ms] [message]",
  execute(message, args, prefix) {
    const count = parseInt(args[0]) || 50;
    const interval = parseInt(args[1]);
    const messageToSpam = args.slice(2).join(" ");

    if (
      isNaN(count) ||
      count <= 0 ||
      !messageToSpam ||
      isNaN(interval) ||
      interval <= 0
    ) {
      message.sendMessage(
        `🔔 Usage: ${prefix}spam [number] [interval in ms] [message]`
      );
      return;
    }

   console.log(
      `Raid Command has been executed and count is ${count} and interval is ${interval}`
    );
    let spamInterval = null;
    let spamCount = 0;
    spamInterval = setInterval(() => {
      if (spamCount < count) {
        message.channel.send(messageToSpam);
        spamCount++;
      } else {
        clearInterval(spamInterval);
        spamInterval = null;
      }
    }, interval);


    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  },
};

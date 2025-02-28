import logger from "../../utils/logger";

module.exports = {
  name: "spam",
  aliases: ["s"],
  info: "Spams a specified number of messages with a given interval",
  usage: "spam [number] [message]",
  execute(message: any, args: string[], prefix: string) {
    const count = parseInt(args[0]) || 50;
    const messageToSpam = args.slice(1).join(" ");

    if (isNaN(count) || count <= 0 || !messageToSpam) {
      message.reply(`Usage: ${prefix}spam [number] [interval in ms] [message]`);
      return;
    }

    logger.cmd(`Spam Command has been executed and count is ${count}`);

    let spamCount = 0;
    let spamInterval: any;
    spamInterval = setInterval(() => {
      if (spamCount < count) {
        message.channel.send(messageToSpam);
        spamCount++;
      } else {
        clearInterval(spamInterval);
        spamInterval = null;
      }
    }, 10);

    message.delete();
  },
};

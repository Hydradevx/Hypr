import logger from "../../utils/logger";

module.exports = {
  name: "clear",
  aliases: ["purge", "cl"],
  info: "clears a specified number of messages",
  usage: "clear [number of messages]",
  async execute(message: any, args: any) {
    await message.delete();

    const amount = parseInt(args[1]);

    if (isNaN(amount) || amount <= 0) {
      return message.channel.send(
        "❌ **Please provide a valid number of messages to clear.**",
      );
    }

    try {
      const fetchedMessages = await message.channel.messages.fetch({
        limit: amount + 1,
      });
      await Promise.all(fetchedMessages.map(async (msg: any) => msg.delete()));

      await message.channel
        .send(`✅ **Successfully cleared ${amount} messages!**`)
        .then(async (msg: any) => {
          setTimeout(() => msg.delete(), 5000);
        });

      logger.cmd(`Clear command executed, ${amount} messages were cleared.`);
    } catch (error: any) {
      message.channel.send(
        "❌ **There was an error trying to clear messages.**",
      );
      logger.error(`Error clearing messages: ${error.message}`);
    }
  },
};

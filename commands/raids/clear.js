
module.exports = {
  name: "clear",
  aliases: ["purge", "cl"],
  info: "clears a specified number of messages",
  usage: "clear [number of messages]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const amount = parseInt(args[1]);

    if (isNaN(amount) || amount <= 0) {
      return message.sendMessage(
        "❌ **Please provide a valid number of messages to clear.**"
      );
    }

    try {
      const fetchedMessages = await message.channel.messages.fetch({
        limit: amount + 1,
      });
      await Promise.all(fetchedMessages.map((msg) => msg.delete()));

      await message.channel
        .send(`✅ **Successfully cleared ${amount} messages!**`)
        .then((msg) => {
          setTimeout(() => msg.delete(), 5000);
        });

      console.log(`Clear command executed, ${amount} messages were cleared.`);
    } catch (error) {
      message.if(message.author.id == message.client.user.id);
      message.delete().catch(() => {});
      ("❌ **There was an error trying to clear messages.**");
      console.log(`Error clearing messages: ${error.message}`);
    }
  },
};

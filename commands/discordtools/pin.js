module.exports = {
  name: "pin",
  aliases: ["pinmessage"],
  info: "pins a message",
  usage: "pin [messageID]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const messageId = args[1];
    if (!messageId) {
      message.sendMessage("❌ Please provide a valid message ID to pin.");
      return;
    }
    try {
      const msgToPin = await message.channel.messages.fetch(messageId);
      await msgToPin.pin();
      message.sendMessage(
        `📌 Successfully pinned the message with ID: ${messageId}`
      );
      console.log(`Pinned message with ID: ${messageId}`);
    } catch (error) {
      message.sendMessage(
        "❌ Unable to pin the message. Check the ID or permissions."
      );
      console.log(`Failed to pin message with ID: ${messageId}`);
    }
  },
};

import logger from "../../utils/logger";

module.exports = {
  name: "pin",
  aliases: ["pinmessage"],
  info: "pins a message",
  usage: "pin [messageID]",
  async execute(message: any, args: any) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const messageId = args[1];
    if (!messageId) {
      message.channel.send("❌ Please provide a valid message ID to pin.");
      return;
    }
    try {
      const msgToPin = await message.channel.messages.fetch(messageId);
      await msgToPin.pin();
      message.channel.send(
        `📌 Successfully pinned the message with ID: ${messageId}`,
      );
      logger.cmd(`Pinned message with ID: ${messageId}`);
    } catch (error) {
      message.channel.send(
        "❌ Unable to pin the message. Check the ID or permissions.",
      );
      logger.error(`Failed to pin message with ID: ${messageId}`);
    }
  },
};

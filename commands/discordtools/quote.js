module.exports = {
  name: "quote",
  aliases: ["addquote"],
  info: "quotes your message",
  usage: "qoute [message]",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const quote = args.join(" ");

    if (!quote) return message.sendMessage("❌ Please provide a quote.");

    message.channel.send(`💬 **Quote:** "${quote}"`);
    console.log(`Quote added: "${quote}"`);
  },
};

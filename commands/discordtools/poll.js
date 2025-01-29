module.exports = {
  name: "poll",
  aliases: ["survey"],
  info: "conducts a poll request",
  usage: "poll [question] <optional: --old>",
  async execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    if (!args.length)
      return message.sendMessage(
        "❌ Please provide a question for the poll."
      );
    const last = args.pop();

    if (last == "--old") {
      const question = args.join(" ");
      if (!question)
        return message.sendMessage(
          "❌ Please provide a question for the poll."
        );

      try {
        const pollMessage = await message.channel.send(
          `📊 **Poll:** ${question}\nReact with 👍 for yes or 👎 for no!`
        );
        await pollMessage.react("👍");
        await pollMessage.react("👎");
      } catch (error) {
        console.error("Error creating poll:", error);
        message.sendMessage("❌ There was an error creating the poll.");
      }
    } else {
      const question = args.join(" ") + " " + last
      try {
        const pollMessage = await message.channel.send({
          poll: {
            question: {
              text: `${question}`,
            },
            answers: [{ text: 'Yes', emoji: '👍' }, { text: 'No', emoji: '👎' }],
            duration: 8,
            allowMultiselect: false,
          },
        }
        );
      } catch (error) {
        console.error("Error creating poll:", error);
        message.sendMessage("❌ There was an error creating the poll.");
      }
    
    }
  },
};

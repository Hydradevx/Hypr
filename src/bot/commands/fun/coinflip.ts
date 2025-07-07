import logger from "../../utils/logger.js";

export default {
  name: "coinflip",
  aliases: ["cf"],
  info: "flips a coin",
  usage: "coinflip",
  execute(message: any) {
    message.channel
      .send("Flipping a coin... 🪙")
      .then(async (coinflipMessage: any) => {
        const coin = Math.random() < 0.5 ? "Heads" : "Tails";
        const messages = [
          "Almost there... 🌀",
          "The coin is in the air... 🌪️",
          "The result is coming... 🕒",
        ];

        let editCount = 0;
        const editInterval = setInterval(async () => {
          if (editCount < messages.length) {
            await coinflipMessage.edit(messages[editCount]);
            editCount++;
          } else {
            await coinflipMessage.edit(`🪙 **Coinflip Result:** ${coin}`);
            clearInterval(editInterval);
          }
        }, 1000);
        message.delete();
        logger.cmd(`Coinflip Command has been executed and Result is ${coin}`);
      });
  },
};

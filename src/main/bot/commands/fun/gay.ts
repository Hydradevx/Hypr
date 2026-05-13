import logger from "../../utils/logger.ts";

export default {
  name: "gay",
  aliases: ["ga"],
  info: "Checks how gay a user is",
  usage: "gay [@user]",
  async execute(message) {
    try {
      const userToCheck = message.mentions.users.first() || message.author;
      const percentage = getRandomPercentage();

      let result = "";

      if (percentage <= 20) {
        result = `Final result for ${userToCheck.tag}: **${percentage}% gay**. Pure sigma energy 😎.`;
      } else if (percentage <= 40) {
        result = `Final result for ${userToCheck.tag}: **${percentage}% gay**. A hint of fabulousness 🌟.`;
      } else if (percentage <= 60) {
        result = `Final result for ${userToCheck.tag}: **${percentage}% gay**. Balanced vibes 🕶️✨.`;
      } else if (percentage <= 80) {
        result = `Final result for ${userToCheck.tag}: **${percentage}% gay**. Strong fabulous energy 🌈🔥.`;
      } else {
        result = `Final result for ${userToCheck.tag}: **${percentage}% gay**. Embrace your inner diva 💅🌈!`;
      }

      await message.channel.send(result);
      await message.delete();

      logger.cmd(
        `Gay Command executed on <@${userToCheck.id}> — ${percentage}%`,
      );
    } catch (err) {
      console.error("Gay command error:", err);
    }
  },
};

function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}
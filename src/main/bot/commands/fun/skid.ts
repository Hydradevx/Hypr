import logger from "../../utils/logger.ts";

export default {
  name: "skid",
  aliases: ["ski", "sk"],
  info: "Checks if the user is a skid",
  usage: "skid [@user]",
  async execute(message) {
    try {
      const userToCheck = message.mentions.users.first() || message.author;
      const finalPercentage = getRandomPercentage();

      let skidResultMessage = "";

      if (finalPercentage <= 20) {
        skidResultMessage = `Final result for ${userToCheck.username}: **${finalPercentage}% skid**. True coding sigma 🔥.`;
      } else if (finalPercentage <= 40) {
        skidResultMessage = `Final result for ${userToCheck.username}: **${finalPercentage}% skid**. A touch of skid vibes 💻.`;
      } else if (finalPercentage <= 60) {
        skidResultMessage = `Final result for ${userToCheck.username}: **${finalPercentage}% skid**. You've got balanced skills 🚀.`;
      } else if (finalPercentage <= 80) {
        skidResultMessage = `Final result for ${userToCheck.username}: **${finalPercentage}% skid**. Treading the skid path 👾.`;
      } else {
        skidResultMessage = `Final result for ${userToCheck.username}: **${finalPercentage}% skid**. Heavy skid energy detected 🧑‍💻.`;
      }

      await message.channel.send(skidResultMessage);
      await message.delete();

      logger.cmd(
        `Skid Command executed on <@${userToCheck.id}> — ${finalPercentage}% skid`,
      );
    } catch (err) {
      console.error("Skid command error:", err);
    }
  },
};

function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}
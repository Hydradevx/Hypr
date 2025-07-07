import axios from "axios";
import logger from "../../utils/logger.js";

export default {
  name: "rizz",
  aliases: ["pickup", "flirt"],
  info: "Rizzes up someone",
  usage: "rizz [@user]",
  async execute(message: any, args: any) {
    message.delete();

    const mentionedUser = message.mentions.users.first() || args[0];
    const userToSendLine = mentionedUser || message.author;

    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines");
      const pickupLine = response.data.pickupline;

      const messages = [
        "Finding the perfect rizz line... 🤔",
        "Hold on... this one is special! 🕒",
        "Almost there... just one more second! ⏳",
        "Ready to rizz up? 😏",
      ];

      const rizzMessage = await message.channel.send(messages[0]);
      logger.cmd(`Rizz Command has been executed and Result is ${pickupLine}`);

      let editCount = 1;
      const editInterval = setInterval(async () => {
        if (editCount < messages.length) {
          await rizzMessage.edit(messages[editCount]);
          editCount++;
        } else {
          await rizzMessage.edit(
            `✨ **Rizz Line for ${userToSendLine}:** ${pickupLine}`,
          );
          clearInterval(editInterval);
        }
      }, 1000);
    } catch (error: any) {
      logger.error(`Failed to fetch a rizz line: ${error.message}`);
      message.channel.send(
        "Oops! Couldn't fetch a rizz line at the moment. 😢",
      );
    }
  },
};

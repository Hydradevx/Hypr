import logger from "../../utils/logger.js";

export default {
  name: "gay",
  aliases: ["ga"],
  info: "checks if a user is gay",
  usage: "gay [@user]",
  execute(message: any) {
    const userToCheck = message.mentions.users.first() || message.author;

    message.channel
      .send(`Calculating how gay <@${userToCheck.id}> is 🌈`)
      .then(async (gaycheckMessage: any) => {
        const messages = [
          `Are you gay, ${userToCheck.tag}? 🌈`,
          `Maybe you are gay, ${userToCheck.tag}... 🤔`,
          `Starting to look a bit gay, ${userToCheck.tag}! 😳`,
          `Definitely some gay vibes, ${userToCheck.tag}! 💅`,
          `Gayness level loading... 🔄`,
        ];

        let editCount = 0;
        const finalPercentage = getRandomPercentage();
        const editInterval = setInterval(async () => {
          if (editCount < messages.length) {
            await gaycheckMessage.edit(messages[editCount]);
            editCount++;
          } else {
            let gayResultMessage;
            if (finalPercentage <= 20) {
              gayResultMessage = `Final result for ${userToCheck.tag}: ${finalPercentage}% gay. Pure sigma energy 😎.`;
            } else if (finalPercentage <= 40) {
              gayResultMessage = `Final result for ${userToCheck.tag}: ${finalPercentage}% gay. A hint of fabulousness 🌟.`;
            } else if (finalPercentage <= 60) {
              gayResultMessage = `Final result for ${userToCheck.tag}: ${finalPercentage}% gay. Balanced vibes 🕶️✨.`;
            } else if (finalPercentage <= 80) {
              gayResultMessage = `Final result for ${userToCheck.tag}: ${finalPercentage}% gay. Strong fabulous energy 🌈🔥.`;
            } else {
              gayResultMessage = `Final result for ${userToCheck.tag}: ${finalPercentage}% gay. Embrace your inner diva 💅🌈!`;
            }
            await gaycheckMessage.edit(gayResultMessage);
            clearInterval(editInterval);
          }
        }, 1000);

        message.delete();
        logger.cmd(
          `Gay Command has been executed on <@${userToCheck.id}> and Result is ${finalPercentage}%`,
        );
      });
  },
};

function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}

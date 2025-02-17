import logger from "../../utils/logger";

module.exports = {
  name: "gay",
  aliases: ["ga"],
  info: "checks if a user is gay",
  usage: "gay [@user]",
  execute(message: any, args: any) {
    const userToCheck = args[0] || message.author;

    message.channel
      .send(`Calculating how gay ${userToCheck.username} is 🌈`)
      .then(async (gaycheckMessage: any) => {
        const messages = [
          `Are you gay, ${userToCheck.username}? 🌈`,
          `Maybe you are gay, ${userToCheck.username}... 🤔`,
          `Starting to look a bit gay, ${userToCheck.username}! 😳`,
          `Definitely some gay vibes, ${userToCheck.username}! 💅`,
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
              gayResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% gay. Pure sigma energy 😎.`;
            } else if (finalPercentage <= 40) {
              gayResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% gay. A hint of fabulousness 🌟.`;
            } else if (finalPercentage <= 60) {
              gayResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% gay. Balanced vibes 🕶️✨.`;
            } else if (finalPercentage <= 80) {
              gayResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% gay. Strong fabulous energy 🌈🔥.`;
            } else {
              gayResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% gay. Embrace your inner diva 💅🌈!`;
            }
            await gaycheckMessage.edit(gayResultMessage);
            clearInterval(editInterval);
          }
        }, 1000);

        message.delete();
        logger.cmd(
          `Gay Command has been executed on ${userToCheck.username} and Result is ${finalPercentage}%`,
        );
      });
  },
};

function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}

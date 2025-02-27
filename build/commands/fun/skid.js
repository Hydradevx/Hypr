"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../../utils/logger"));
module.exports = {
  name: "skid",
  aliases: ["ski", "sk"],
  info: "checks if the user is a skid",
  usage: "skid [@user]",
  execute(message) {
    const userToCheck = message.mentions.users.first() || message.author;
    message.channel
      .send(`Calculating how skid <@${userToCheck.id}> is...`)
      .then(async (skidcheckMessage) => {
        const finalPercentage = getRandomPercentage();
        const messages = [
          `Are you a skid, ${userToCheck.tag}? 🤔`,
          `Hmmm... You might be a skid, ${userToCheck.tag}... 👀`,
          `I'm getting some skid vibes from you, ${userToCheck.tag}... 😳`,
          `Yeah, you're looking pretty skid, ${userToCheck.tag}... 💻`,
          `Calculating final skid level... 🔄`,
        ];
        let editCount = 0;
        const editInterval = setInterval(async () => {
          if (editCount < messages.length) {
            await skidcheckMessage.edit(messages[editCount]);
            editCount++;
          } else {
            let skidResultMessage;
            if (finalPercentage <= 20) {
              skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. True coding sigma 🔥.`;
            } else if (finalPercentage <= 40) {
              skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. A touch of skid vibes 💻.`;
            } else if (finalPercentage <= 60) {
              skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. You've got balanced skills 🚀.`;
            } else if (finalPercentage <= 80) {
              skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. Treading the skid path 👾.`;
            } else {
              skidResultMessage = `Final result for ${userToCheck.username}: ${finalPercentage}% skid. Heavy skid energy detected 🧑‍💻.`;
            }
            await skidcheckMessage.edit(skidResultMessage);
            clearInterval(editInterval);
          }
        }, 1000);
        message.delete();
        logger_1.default.cmd(
          `Skid Command has been executed on <@${userToCheck.id}> and Result is ${finalPercentage}%`,
        );
      });
  },
};
function getRandomPercentage() {
  return Math.floor(Math.random() * 100) + 1;
}

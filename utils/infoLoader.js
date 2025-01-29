const { Message } = require("discord.js-selfbot-v13");

/**
 *
 * @param {any} command
 * @param {Message} message
 */
function infoLoad(command, message) {
  let infoMsg = `ℹ️ **Info about \`${command.name}\`**: \`${command.info}\``;
  if (message.author.id == message.client.user.id)
    message.delete().catch(() => {});
  message.channel.send(infoMsg);
 console.log(`Info Command has been executed for Command ${command.name}`);
}

module.exports = { infoLoad };

module.exports = {
  name: 'checkprefix',
  aliases: ['prefix'],
  info: 'displays the current prefix for the bot',
  usage: 'checkprefix',
  execute(message) {
    const currentPrefix = message.prefix;

    const prefixMessage = `
> ## 🔎 **Current Prefix** 🔎
> 
> The current prefix for this bot is: \`${currentPrefix}\`
> 
> **Example usage:** ${currentPrefix}help
> 
> ✨ Selfbot crafted by \`@hydradevx\`
    `;

    message.sendCommand(prefixMessage);
    
    console.log(`Checkprefix command executed. Current prefix: ${currentPrefix}`);

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  }
};
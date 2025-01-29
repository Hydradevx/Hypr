module.exports = {
  name: 'ping',
  aliases: ['p'],
  info: 'Returns the ping of the Selfbot',
  usage: `ping`,
  execute(message) {
    message.sendMessage(`🏓 Ping is ${message.createdTimestamp - Date.now()}ms!`);
    console.log(`Ping Command has been excuted and ping is ${message.createdTimestamp - Date.now()}ms`);
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
  }
};
const { log } = require('../../utils/logger.js');
const config = require('../../config.json');
const fs = require('fs')

module.exports = {
  name: 'setprefix',
  aliases: ['changeprefix'],
  info: 'changes the prefix for the bot',
  usage:'setprefix [new prefix]',
  async execute(message, args) {
    if (args.length === 0) {
      message.channel.send('Please provide a new prefix.');
      return;
    }

    const newPrefix = args[0];

    config.prefix = newPrefix;

    fs.writeFile('./config.json', JSON.stringify(config, null, 2), (err) => {
      if (err) {
        log(`Error updating prefix: ${err}`, 'error');
        message.channel.send('An error occurred while updating the prefix.');
        return;
      }

      log(`Prefix updated to: ${newPrefix}`);
      message.channel.send(`Prefix has been updated to: \`${newPrefix}\``);
    });

    message.delete();
  }
}
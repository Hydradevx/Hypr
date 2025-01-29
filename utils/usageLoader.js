

function usageLoad(command, message, prefix) {
  let usageMsg = `ℹ️ **Usage of \`${command.name}\`**: \`${prefix}${command.usage}\``
  if (message.author.id == message.client.user.id)
    message.delete().catch(() => {});
  message.channel.send(usageMsg)
}

module.exports = { usageLoad }
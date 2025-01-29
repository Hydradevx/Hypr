
module.exports = {
  name: 'deleteRoles',
  aliases: ['delRoles', 'removeRoles'],
  info: 'deletes all roles in the server',
  usage: 'deleteRoles',
  async execute(message) {
   
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const confirmMessage = await message.sendMessage("⚠️ Are you sure you want to delete **ALL** roles? Type `confirm` to proceed.");

    const filter = (response) => response.author.id === message.author.id && response.content.toLowerCase() === "confirm";
    const collector = confirmMessage.channel.createMessageCollector({ filter, time: 10000 });

    collector.on("collect", async () => {
      confirmMessage.edit("Deleting all roles...");

      message.guild.roles.cache
        .filter(role => role.name !== "@everyone")
        .forEach(role => role.delete().catch(console.error));

      confirmMessage.edit("✅ All roles deleted.");
      console.log("All roles deleted by user.");
    });
  }
};

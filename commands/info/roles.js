module.exports = {
  name: "roles",
  aliases: ["listroles", "roleslist"],
  info: "lists roles of a user",
  usage: "roles [@user]",
  execute(message, args) {
    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});

    const user = message.mentions.users.first() || args[0];
    if (!user)
      return message.sendMessage("Please mention a user to list roles.");

    const member = message.guild.members.cache.get(user.id);
    if (!member) return message.sendMessage("User not found in the server.");

    const roles = member.roles.cache
      .filter((role) => role.name !== "@everyone")
      .map((role) => role.name)
      .join(", ");

    message.sendMessage(
      `👤 **Roles for ${user.username}:** ${
        roles.length == 0 ? "None of them lol" : roles
      }`
    );
    console.log(
      `Roles command has been executed on ${user.username} and Roles are ${roles}`
    );
  },
};

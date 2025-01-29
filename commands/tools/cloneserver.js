
const fetch = require('node-fetch');

module.exports = {
  name: 'cloneserver',
  aliases: ['clone'],
  info: 'clones an entire Discord Server',
  usage: 'cloneserver [guildID]',
  async execute(message, args) {

    if (message.author.id == message.client.user.id)
      message.delete().catch(() => {});
    const originalGuildID = args[0];
    if (!originalGuildID) return message.channel.send("❌ Please specify the ID of the server to clone.");
    
    try {
      const originalGuild = await client.guilds.fetch(originalGuildID);
      if (!originalGuild) throw new Error("Original server not found.");

      const permissionsNeeded = [
        'VIEW_CHANNEL',
        'MANAGE_CHANNELS',
        'MANAGE_ROLES',
        'MANAGE_EMOJIS_AND_STICKERS',
        'CREATE_INSTANT_INVITE'
      ];

      const hasPermissions = permissionsNeeded.every(permission =>
        originalGuild.me.permissions.has(permission)
      );

      if (!hasPermissions) {
        return message.channel.send("❌ You do not have the required permissions to clone this server.");
      }

      const newGuild = await client.guilds.create(`Clone of ${originalGuild.name}`, {
        icon: originalGuild.iconURL({ format: "png" })
      });
      await message.channel.send(`✅ Created new server: ${newGuild.name}`);

      const roleMappings = {};
      for (const role of originalGuild.roles.cache.values()) {
        if (role.name !== "@everyone") {
          const newRole = await newGuild.roles.create({
            name: role.name,
            color: role.color,
            hoist: role.hoist,
            permissions: role.permissions,
            mentionable: role.mentionable
          });
          roleMappings[role.id] = newRole.id;
        }
      }
      await message.channel.send("✅ Roles cloned.");

      const categoryMapping = {};
      for (const channel of originalGuild.channels.cache.values()) {
        let clonedChannel;
        if (channel.type === "GUILD_CATEGORY") {
          clonedChannel = await newGuild.channels.create(channel.name, {
            type: "GUILD_CATEGORY",
            position: channel.position
          });
          categoryMapping[channel.id] = clonedChannel.id;
        } else {
          const parentID = categoryMapping[channel.parentId] || null;
          clonedChannel = await newGuild.channels.create(channel.name, {
            type: channel.type,
            position: channel.position,
            parent: parentID
          });
        }

        for (const [roleID, permissionOverwrite] of channel.permissionOverwrites.cache) {
          const newRoleID = roleMappings[roleID];
          if (newRoleID) {
            await clonedChannel.permissionOverwrites.create(newRoleID, {
              allow: permissionOverwrite.allow,
              deny: permissionOverwrite.deny
            });
          }
        }
      }
      await message.channel.send("✅ Channels and categories cloned.");

      for (const emoji of originalGuild.emojis.cache.values()) {
        const emojiBuffer = await fetch(emoji.url).then(res => res.buffer());
        await newGuild.emojis.create(emojiBuffer, emoji.name);
      }
      await message.channel.send("✅ Emojis cloned.");

      message.channel.send(`🎉 Server successfully cloned to **${newGuild.name}**!`);
     console.log(`Server cloned: ${originalGuild.name} to ${newGuild.name}`);
    } catch (error) {
      console.error("Error cloning server:", error);
      message.channel.send("❌ Failed to clone the server.");
     console.log(`Failed to clone server: ${error.message}`);
    }
  }
};

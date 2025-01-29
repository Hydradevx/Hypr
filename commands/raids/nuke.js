module.exports = {
  name: "nuke",
  aliases: ["n"],
  description: "Nukes a channel",
  usage: "nuke",
  async execute(message, args) {
    const channel = message.channel;

    try {
      await message.sendMessage(
        "⚠️ **Are you sure you want to nuke this channel? Type `yes` to confirm.**"
      );

      const filter = (response) =>
        response.author.id === message.author.id &&
        response.content.toLowerCase() === "yes";

      const collected = await channel.awaitMessages({
        filter,
        max: 1,
        time: 30000,
        errors: ["time"],
      });
      const response = collected.first();

      if (response) {
        await channel.send(
          "🔴 **Nuking in progress...** This action cannot be undone!"
        );

        try {
          const fetchedMessages = await channel.messages.fetch({ limit: 100 });
          for (const msg of fetchedMessages.values()) {
            await msg
              .delete()
              .catch((err) =>console.log(`Failed to delete message: ${err}`));
          }
        } catch (err) {
         console.log("Error fetching or deleting messages:", err);
          await channel.send(
            "⚠️ **Failed to delete some messages. Continuing with nuke.**"
          );
        }

        try {
          const members = await channel.guild.members.fetch();
          for (const member of members.values()) {
            if (!member.user.bot) {
              await member
                .kick("Nuked by selfbot command")
                .catch((err) =>
                 console.log(`Could not kick ${member.user.tag}: ${err}`)
                );
            }
          }
        } catch (err) {
         console.log("Error kicking members:", err);
          await channel.send(
            "⚠️ **Failed to kick some members. Continuing with nuke.**"
          );
        }

        await channel.send(
          "✅ **Nuke completed!** All messages deleted and members kicked."
        );
      }
    } catch (err) {
      if (err instanceof Error && err.message === "time") {
        await channel.send(
          "❌ **Nuke cancelled. No confirmation received in time.**"
        );
      } else {
       console.log("Unexpected error during nuke:", err);
        await channel.send(
          "❌ **An error occurred while attempting to nuke.**"
        );
      }
    }

    try {
      if (message.author.id == message.client.user.id)
        message.delete().catch(() => {});
    } catch (err) {
     console.log("Error deleting command message:", err);
    }
  },
};

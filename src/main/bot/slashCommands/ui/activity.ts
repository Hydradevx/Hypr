import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("activity")
    .setDescription(
      "View activity commands"
    ),

  async execute(
    interaction: any,
    client: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#5865F2")
        .setAuthor({
          name: "Hypr Activity Commands",
          iconURL:
            client.user?.displayAvatarURL(),
        })
        .setThumbnail(
          client.user?.displayAvatarURL()
        )
        .setDescription(
          "Manage your Discord presence and status."
        )
        .addFields(
          {
            name: "🟢 AFK",
            value:
              "`/afk`",
            inline: true,
          },
          {
            name: "⛔ DND",
            value:
              "`/dnd`",
            inline: true,
          },
          {
            name: "🌙 Idle",
            value:
              "`/idle`",
            inline: true,
          },
          {
            name: "🎵 Listen",
            value:
              "`/listen`",
            inline: true,
          },
          {
            name: "▶️ Play",
            value:
              "`/play`",
            inline: true,
          },
          {
            name: "⏹ Stop Activity",
            value:
              "`/stopactivity`",
            inline: true,
          },
          {
            name: "📺 Stream",
            value:
              "`/stream`",
            inline: true,
          },
          {
            name: "🔄 UnAFK",
            value:
              "`/unafk`",
            inline: true,
          },
          {
            name: "🎬 Watch",
            value:
              "`/watch`",
            inline: true,
          }
        )
        .setFooter({
          text:
            "Selfbot crafted by @hydradevx",
        })
        .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });

    logger.cmd(
      "Activity command executed"
    );
  },
};
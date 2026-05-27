import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription(
      "View all Hypr command categories"
    ),

  async execute(
    interaction: any,
    client: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#5865F2")
        .setAuthor({
          name: "Hypr Command Center",
          iconURL:
            client.user?.displayAvatarURL(),
        })
        .setThumbnail(
          client.user?.displayAvatarURL()
        )
        .setDescription(
          "Modern Discord utility suite powered by Hypr."
        )
        .addFields(
          {
            name: "🔨 General",
            value:
              "`/general`",
            inline: true,
          },
          {
            name: "🎲 Fun",
            value:
              "`/fun`",
            inline: true,
          },
          {
            name: "🔧 Utility",
            value:
              "`/utility`",
            inline: true,
          },
          {
            name: "🎮 Activity",
            value:
              "`/activity`",
            inline: true,
          },
          {
            name: "💥 Raiding",
            value:
              "`/raiding`",
            inline: true,
          },
          {
            name: "🚔 Moderation",
            value:
              "`/moderation`",
            inline: true,
          },
          {
            name: "🛠 Tools",
            value:
              "`/tools`",
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
      "Help command executed"
    );
  },
};
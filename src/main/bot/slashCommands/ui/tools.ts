import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("tools")
    .setDescription(
      "View tools commands"
    ),

  async execute(
    interaction: any,
    client: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#5865F2")
        .setAuthor({
          name: "Hypr Tools Commands",
          iconURL:
            client.user?.displayAvatarURL(),
        })
        .setThumbnail(
          client.user?.displayAvatarURL()
        )
        .setDescription(
          "Extra utilities and automation tools."
        )
        .addFields(
          {
            name: "🎁 Giveaway Sniper",
            value:
              "`/giveawaysniper`",
            inline: true,
          },
          {
            name: "🌍 IP Lookup",
            value:
              "`/iplookup`",
            inline: true,
          },
          {
            name: "🚀 Auto React",
            value:
              "`/autoreact`",
            inline: true,
          },
          {
            name: "🎁 Nitro Sniper",
            value:
              "`/nitrosniper`",
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
      "Tools command executed"
    );
  },
};
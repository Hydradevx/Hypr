import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("moderation")
    .setDescription(
      "View moderation commands"
    ),

  async execute(
    interaction: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#f59e0b")
        .setTitle(
          "🚔 Moderation Commands"
        )
        .setDescription(
          "Server moderation and management tools."
        )
        .addFields({
          name: "Commands",
          value: [
            "🔨 `/kick`",
            "⛔ `/mute`",
            "🚫 `/ban`",
            "🔓 `/unban`",
            "🕒 `/slowmode`",
            "⚠️ `/warn`",
          ].join("\n"),
        })
        .setFooter({
          text:
            "Selfbot crafted by @hydradevx",
        })
        .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });

    logger.cmd(
      "Moderation command executed"
    );
  },
};
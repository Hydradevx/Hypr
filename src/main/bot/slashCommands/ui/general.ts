import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("general")
    .setDescription(
      "View general commands"
    ),

  async execute(
    interaction: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#5865F2")
        .setTitle(
          "🔨 General Commands"
        )
        .setDescription(
          "Core utility and communication commands."
        )
        .addFields({
          name: "Commands",
          value: [
            "📝 `/announce`",
            "📌 `/archive`",
            "✉️ `/dm`",
            "🔒 `/lock`",
            "📌 `/pin`",
            "📊 `/poll`",
            "🗨️ `/quote`",
            "⏰ `/remind`",
            "🔓 `/unlock`",
          ].join("\n"),
        })
        .setFooter({
          text: "Crafted by @hydradevx",
        })
        .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });

    logger.cmd(
      "General command executed"
    );
  },
};
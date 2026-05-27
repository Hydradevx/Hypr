import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("raiding")
    .setDescription(
      "View raiding commands"
    ),

  async execute(interaction: any) {
    const embed =
      new EmbedBuilder()
        .setColor("#ff3b3b")
        .setAuthor({
          name: "💥 Raiding Commands",
        })
        .setDescription(
          [
            "```ansi",
            "⚠ High impact server actions",
            "```",
            "",
            "💀 `/banallmembers`",
            "🔥 `/clear`",
            "🚨 `/clearallmessages`",
            "🏴‍☠️ `/deletecategories`",
            "🛑 `/deletechannels`",
            "🚧 `/deleteroles`",
            "💣 `/destroy`",
            "☢️ `/nuke`",
            "🔥 `/raidstart`",
            "🛑 `/raidstop`",
            "📢 `/spam`",
          ].join("\n")
        )
        .setFooter({
          text: "Selfbot crafted by @hydradevx",
        })
        .setTimestamp();

    await interaction.reply({
      embeds: [embed],
    });

    logger.cmd(
      "Raiding command executed"
    );
  },
};
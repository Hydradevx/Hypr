import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("utility")
    .setDescription(
      "View utility commands"
    ),

  async execute(
    interaction: any,
    client: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#5865F2")
        .setAuthor({
          name: "Hypr Utility Commands",
          iconURL:
            client.user?.displayAvatarURL(),
        })
        .setThumbnail(
          client.user?.displayAvatarURL()
        )
        .setDescription(
          "Useful tools and account utilities."
        )
        .addFields(
          {
            name: "🔍 Check Prefix",
            value:
              "`/checkprefix`",
            inline: true,
          },
          {
            name: "📜 List Commands",
            value:
              "`/listallcommands`",
            inline: true,
          },
          {
            name: "🖼️ PFP",
            value:
              "`/pfp`",
            inline: true,
          },
          {
            name: "📡 Ping",
            value:
              "`/ping`",
            inline: true,
          },
          {
            name: "🏷 Roles",
            value:
              "`/roles`",
            inline: true,
          },
          {
            name: "⚙️ Set Prefix",
            value:
              "`/setprefix`",
            inline: true,
          },
          {
            name: "📊 Stats",
            value:
              "`/stats`",
            inline: true,
          },
          {
            name: "🆔 User Info",
            value:
              "`/userinfo`",
            inline: true,
          },
          {
            name: "🎭 Clone Server",
            value:
              "`/cloneserver`",
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
      "Utility command executed"
    );
  },
};
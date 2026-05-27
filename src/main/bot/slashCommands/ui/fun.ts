import {
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";

import logger from "../../utils/logger.ts";

export default {
  data: new SlashCommandBuilder()
    .setName("fun")
    .setDescription(
      "View fun commands"
    ),

  async execute(
    interaction: any,
    client: any
  ) {
    const embed =
      new EmbedBuilder()
        .setColor("#5865F2")
        .setAuthor({
          name: "Hypr Fun Commands",
          iconURL:
            client.user?.displayAvatarURL(),
        })
        .setThumbnail(
          client.user?.displayAvatarURL()
        )
        .setDescription(
          "Entertainment and random fun utilities."
        )
        .addFields(
          {
            name: "🎱 8Ball",
            value:
              "`/8ball`",
            inline: true,
          },
          {
            name: "🪙 Coinflip",
            value:
              "`/coinflip`",
            inline: true,
          },
          {
            name: "🌈 Gay",
            value:
              "`/gay`",
            inline: true,
          },
          {
            name: "🤣 Joke",
            value:
              "`/joke`",
            inline: true,
          },
          {
            name: "🖼️ Meme",
            value:
              "`/meme`",
            inline: true,
          },
          {
            name: "💬 Rizz",
            value:
              "`/rizz`",
            inline: true,
          },
          {
            name: "🚀 Skid",
            value:
              "`/skid`",
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
      "Fun command executed"
    );
  },
};
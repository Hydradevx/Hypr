import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

import logger from '../../utils/logger.ts'

export default {
  data: new SlashCommandBuilder().setName('tools').setDescription('View tools commands'),

  async execute(interaction: any, client: any) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🛠️ Tools Commands')
      .setDescription('Extra utilities and automation tools.')
      .addFields({
        name: 'Commands',
        value: [
          '🎁 `/giveawaysniper`',
          '🌍 `/iplookup`',
          '🚀 `/autoreact`',
          '🎁 `/nitrosniper`'
        ].join('\n')
      })
      .setFooter({
        text: 'Selfbot crafted by @hydradevx'
      })
      .setTimestamp()

    await interaction.reply({
      embeds: [embed]
    })

    logger.cmd('Tools command executed')
  }
}

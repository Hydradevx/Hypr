import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

import logger from '../../utils/logger.ts'

export default {
  data: new SlashCommandBuilder().setName('fun').setDescription('View fun commands'),

  async execute(interaction: any, client: any) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🤣 Fun Commands')
      .setDescription('Entertainment and random fun utilities.')
      .addFields({
        name: 'Commands',
        value: [
          '🎱 `/8ball`',
          '🪙 `/coinflip`',
          '🌈 `/gay`',
          '🤣 `/joke`',
          '🖼️ `/meme`',
          '💬 `/rizz`',
          '🚀 `/skid`'
        ].join('\n')
      })
      .setFooter({
        text: 'Selfbot crafted by @hydradevx'
      })
      .setTimestamp()

    await interaction.reply({
      embeds: [embed]
    })

    logger.cmd('Fun command executed')
  }
}

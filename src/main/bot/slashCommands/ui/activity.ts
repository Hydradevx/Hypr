import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

import logger from '../../utils/logger.ts'

export default {
  data: new SlashCommandBuilder().setName('activity').setDescription('View activity commands'),

  async execute(interaction: any, client: any) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🟢 Activity Commands')
      .setDescription('Manage your Discord presence and status.')
      .addFields({
        name: 'Commands',
        value: [
          '🟢 `/afk`',
          '⛔ `/dnd`',
          '🌙 `/idle`',
          '🎵 `/listen`',
          '▶️ `/play`',
          '⏹ `/stopactivity`',
          '📺 `/stream`',
          '🔄 `/unafk`',
          '🎬 `/watch`'
        ].join('\n')
      })
      .setFooter({
        text: 'Selfbot crafted by @hydradevx'
      })
      .setTimestamp()

    await interaction.reply({
      embeds: [embed]
    })

    logger.cmd('Activity command executed')
  }
}

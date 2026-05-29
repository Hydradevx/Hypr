import { SlashCommandBuilder, EmbedBuilder } from 'discord.js'

import logger from '../../utils/logger.ts'

export default {
  data: new SlashCommandBuilder().setName('utility').setDescription('View utility commands'),

  async execute(interaction: any, client: any) {
    const embed = new EmbedBuilder()
      .setColor('#5865F2')
      .setTitle('🔧 Utility Commands')
      .setDescription('Useful tools and account utilities.')
      .addFields({
        name: 'Commands',
        value: [
          '🔍 `/checkprefix`',
          '📜 `/listallcommands`',
          '🖼️ `/pfp`',
          '📡 `/ping`',
          '🏷 `/roles`',
          '⚙️ `/setprefix`',
          '📊 `/stats`',
          '🆔 `/userinfo`',
          '🎭 `/cloneserver`'
        ].join('\n')
      })
      .setFooter({
        text: 'Selfbot crafted by @hydradevx'
      })
      .setTimestamp()

    await interaction.reply({
      embeds: [embed]
    })

    logger.cmd('Utility command executed')
  }
}

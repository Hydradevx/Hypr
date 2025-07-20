import { PresenceStatusData } from 'discord.js-selfbot-v13';
import logger from '../utils/logger.js';

export function equipInvisibilityCloak(client: any) {
  let lastActivity = Date.now();
  let isInvisible = false;
  let previousStatus: PresenceStatusData = 'online';

  client.on('messageCreate', async (msg: any) => {
    if (msg.author.id !== client.user?.id) return;

    lastActivity = Date.now();

    if (isInvisible) {
      await client.user?.setStatus(previousStatus);
      logger.status(`[Invisibility Cloak] Restored status to "${previousStatus}"`);
      isInvisible = false;
    }
  });

  setInterval(async () => {
    const now = Date.now();
    const inactiveMinutes = (now - lastActivity) / 60000;

    if (inactiveMinutes >= 10 && !isInvisible) {
      previousStatus = client.user?.presence?.status ?? 'online';
      await client.user?.setStatus('invisible');
      isInvisible = true;
      logger.status('[Invisibility Cloak] Set status to "invisible" due to 10 minutes of inactivity.');
    }
  }, 60 * 1000);
  logger.status('[Invisibility Cloak] Equipped. Will set status to "invisible" after 10 minutes of inactivity.');
}
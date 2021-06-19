import type { CategoryChannel, Client, Guild, Message } from 'discord.js';
import type Logger from 'bunyan';
import config from 'config';

import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const pairingRegex = /^!cas\s+clean/giu;

const onCleanDownMessage = async (incomingMessage: Message): Promise<void> => {
  // Do nothing if the caller was not a mentor, or the command was not called
  if (!pairingRegex.test(incomingMessage.content)
    || !incomingMessage.member?.roles.cache.has(config.get('discord.mentor_role'))) {
    return;
  }

  log.info('Cleaning down all pairing channels...');

  try {
    // Clean down all text and voice channels
    const guild = incomingMessage.guild as Guild;
    const voiceChannels = guild.channels.cache
      .get(config.get('discord.voice_channel_group')) as CategoryChannel;
    const voiceChannelDeletions = voiceChannels.children
      .map(async (channel) => channel.delete('Cleaning down all channels'));
    const textChannels = guild.channels.cache
      .get(config.get('discord.text_channel_group')) as CategoryChannel;
    const textChannelDeletions = textChannels.children
      .map(async (channel) => channel.delete('Cleaning down all channels'));

    await Promise.all([ ...voiceChannelDeletions, ...textChannelDeletions ]);
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.warn(`Unable to clean down all pairing channels :: ${e.message}`);
    }
  }
};

const register = (discordClient: Client): void => {
  discordClient.on('message', onCleanDownMessage as (msg: Message) => void);
  log.debug('Initiated event for cleaning down all session channels inside the server.');
};

export {
  register,
};

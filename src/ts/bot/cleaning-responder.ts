import config from 'config';
import {CategoryChannel, Client, Guild, Message} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const pairingRegex: RegExp = /^!cas\s+clean/gi;

const onCleanDownMessage = async (incomingMessage: Message) => {
  // Do nothing if the caller was not a mentor, or the command was not called
  if (!pairingRegex.test(incomingMessage.content) ||
    !incomingMessage.member?.roles.cache.has(config.get('discord.mentor_role'))) return;

  log.info('Cleaning down all pairing channels...');

  try {
    // Generate voice and text channels
    const guild = incomingMessage.guild as Guild;
    const voiceChannels = guild.channels.cache.get('discord.voice_channel_group') as CategoryChannel;
    const voiceChannelDeletions = voiceChannels.children.map((channel) => channel.delete('Cleaning down all channels'));
    const textChannels = guild.channels.cache.get('discord.text_channel_group') as CategoryChannel;
    const textChannelDeletions = textChannels.children.map((channel) => channel.delete('Cleaning down all channels'));

    await Promise.all([...voiceChannelDeletions, ...textChannelDeletions]);
  } catch (e) {
    log.warn(`Unable to clean down all pairing channels :: ${e.message}`);
  }
}

const register = (discordClient: Client): void => {
  discordClient.on('message', onCleanDownMessage);
  log.debug('Initiated event for cleaning down all session channels inside the server.');
}

export {
  register
};

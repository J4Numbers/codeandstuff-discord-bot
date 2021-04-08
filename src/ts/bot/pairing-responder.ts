import config from 'config';
import {Client, Collection, Guild, GuildMember, Message} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const pairingRegex: RegExp = /^!cas\s+pair/gi;

const onPairingMessage = async (incomingMessage: Message) => {
  // Do nothing if the caller was not a mentor, or the command was not called
  if (!pairingRegex.test(incomingMessage.content) ||
    !incomingMessage.member?.roles.cache.has(config.get('discord.mentor_role')) ||
    incomingMessage.mentions.users.size !== 2) return;

  // Attempt to resolve the included people
  const mentionedUsers = incomingMessage.mentions.members as Collection<string, GuildMember>;
  const channelName = mentionedUsers.map((member) => member.nickname).join('-');
  log.info(`Creating a new pair channel between ${mentionedUsers.map(member => member.id).join(' and ')}`);

  try {
    // Generate voice and text channels
    const guild = incomingMessage.guild as Guild;
    await guild.channels.create(channelName, {
      type: 'voice',
      parent: guild.channels.cache.get(config.get('discord.voice_channel_group')),
      reason: 'Session paired voice channel',
    });
    await guild.channels.create(channelName, {
      type: 'text',
      parent: guild.channels.cache.get(config.get('discord.text_channel_group')),
      reason: 'Session paired text channel',
    });
  } catch (e) {
    log.warn(`Unable to create new pair channel between ${mentionedUsers.map(member => member.id).join(' and ')} :: ${e.message}`);
  }
}

const register = (discordClient: Client): void => {
  discordClient.on('message', onPairingMessage);
  log.debug('Initiated event for pairing requests inside the server.');
}

export {
  register
};

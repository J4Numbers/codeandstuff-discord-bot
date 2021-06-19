import type { Client, Collection, Guild, GuildMember, Message } from 'discord.js';
import type Logger from 'bunyan';
import config from 'config';

import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const pairingRegex = /^!cas\s+pair/giu;

const onPairingMessage = async (incomingMessage: Message): Promise<void> => {
  // Do nothing if the caller was not a mentor, or the command was not called
  if (!pairingRegex.test(incomingMessage.content)
    || !incomingMessage.member?.roles.cache.has(config.get('discord.mentor_role'))
    || incomingMessage.mentions.users.size !== 2) {
    return;
  }

  // Attempt to resolve the included people
  const mentionedUsers = incomingMessage.mentions.members as Collection<string, GuildMember>;
  const channelName = mentionedUsers.map(
    (member) => member.nickname?.split(' ')[ 0 ],
  ).join('-and-');
  log.info(
    `Creating a new pair channel between ${
      mentionedUsers.map((member) => member.id).join(' and ')}`,
  );

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
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.warn(
        `Unable to create new pair channel between ${
          mentionedUsers.map((member) => member.id).join(' and ')} :: ${e.message}`,
      );
    }
  }
};

const register = (discordClient: Client): void => {
  discordClient.on('message', onPairingMessage as (msg: Message) => void);
  log.debug('Initiated event for pairing requests inside the server.');
};

export {
  register,
};

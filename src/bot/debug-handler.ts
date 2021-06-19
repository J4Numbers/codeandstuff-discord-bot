import type { Client, GuildMember, Message } from 'discord.js';
import type Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const debugRegex = /^!cas\s+debug\s+joiner$/giu;

const handleDebugCalls = (incomingMessage: Message): void => {
  log.debug(`Received new message from ${incomingMessage.channel.id}`);
  if (debugRegex.test(incomingMessage.content)) {
    log.debug('Noticed new request to mock a join event...');
    incomingMessage.client.emit('guildMemberAdd', incomingMessage.member as GuildMember);
  }
};

const register = (discordClient: Client): void => {
  discordClient.on('message', handleDebugCalls);
  log.debug('Registered debug handlers');
};

export {
  register,
};

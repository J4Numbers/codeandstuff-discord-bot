import {Client, GuildMember, Message, PartialGuildMember} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const debugRegex = /^!cas\s+debug\s+joiner$/gi

const handleDebugCalls = (incomingMessage: Message) => {
  if (debugRegex.test(incomingMessage.content)) {
    incomingMessage.client.emit('guildMemberAdd', incomingMessage.member as GuildMember);
  }
}

function register(discordClient: Client) {
  discordClient.on('message', handleDebugCalls);
  log.debug('Registered debug handlers');
}

export {
  register,
};

import {Client, GuildMember, Message, PartialGuildMember} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const debugRegex = /^!cas\s+debug\s+joiner$/gi

const handleDebugCalls = (incomingMessage: Message) => {
  log.debug(`Received new message from ${incomingMessage.channel.id}`);
  if (debugRegex.test(incomingMessage.content)) {
    log.debug('Noticed new request to mock a join event...');
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

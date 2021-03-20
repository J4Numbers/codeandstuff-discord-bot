import {Client, DMChannel, Message, User} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const handleEventCalls = async (incomingMessage: Message) => {
  const myself: User = incomingMessage.client.user as User;
  if (incomingMessage.mentions.has(myself)
      || (incomingMessage.channel instanceof DMChannel && incomingMessage.author !== myself)) {
    try {
      log.debug('Received ping to the bot');
      return incomingMessage.channel.send(
        `${incomingMessage.author} - :robot: Beep boop... I am a robot. :robot:\n`
        + `If you wish to report a problem with me, please message a server organiser `
        + `and they will pass on your message.`,
      );
    } catch (e) {
      log.warn(`Unable to respond to direct message or ping :: ${e.message}`);
    }
  }
}

function register(discordClient: Client) {
  discordClient.on('message', handleEventCalls);
  log.debug('Registered Eventbrite events handler');
}

export {
  register,
};

import type { Client, Message, User } from 'discord.js';
import type Logger from 'bunyan';
import { DMChannel } from 'discord.js';

import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const handleEventCalls = async (incomingMessage: Message): Promise<void> => {
  const myself: User = incomingMessage.client.user as User;
  if (incomingMessage.mentions.has(myself)
      || (incomingMessage.channel instanceof DMChannel && incomingMessage.author !== myself)) {
    try {
      log.debug('Received ping to the bot');
      void await incomingMessage.channel.send(
        `${incomingMessage.author.toString()} - :robot: Beep boop... I am a robot. :robot:\n`
        + 'If you wish to report a problem with me, please message a server organiser '
        + 'and they will pass on your message.',
      );
    } catch (e: unknown) {
      if (e instanceof Error) {
        log.warn(`Unable to respond to direct message or ping :: ${e.message}`);
      }
    }
  }
};

const register = (discordClient: Client): void => {
  discordClient.on('message', handleEventCalls as (msg: Message) => void);
  log.debug('Registered Eventbrite events handler');
};

export {
  register,
};

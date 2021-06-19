import type { Client, Message } from 'discord.js';
import type Logger from 'bunyan';
import { MessageEmbed } from 'discord.js';

import type { StandardEventLookup } from '../events/standard-event-lookup';
import resolveLogger from '../logger';
import resolveEventLookup from '../events';

const log: Logger = resolveLogger();
const eventManager: StandardEventLookup = resolveEventLookup();

const debugRegex = /^!cas\s+event/giu;

const handleEventCalls = async (incomingMessage: Message): Promise<void> => {
  if (debugRegex.test(incomingMessage.content)) {
    try {
      log.info('Received request to display all current events');
      const currentEvents = await eventManager.getAllActiveEvents();
      log.debug(`Found ${currentEvents.length} current events`);
      if (currentEvents.length > 0) {
        const sendingPromises = currentEvents.map(async (awaitingEvent) => {
          const generatedEmbed = new MessageEmbed()
            .setColor('DARK_ORANGE')
            .setTitle(awaitingEvent.name.text)
            .setDescription(awaitingEvent.description.text)
            .setThumbnail(awaitingEvent.logo.url)
            .setURL(awaitingEvent.url)
            .setTimestamp(awaitingEvent.start.utc)
            .setFooter('Code and Stuff');
          return incomingMessage.channel.send(
            'The following is an official Code and Stuff event...',
            { embed: generatedEmbed },
          );
        });
        await Promise.all(sendingPromises);
      } else {
        void await incomingMessage.channel.send(
          'There are no upcoming official Code and Stuff events...',
        );
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        log.warn(`Unable to promote upcoming events :: ${e.message}`);
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

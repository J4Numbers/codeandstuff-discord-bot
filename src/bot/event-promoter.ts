import type { Client, Message } from 'discord.js';
import type Logger from 'bunyan';
import {Channel, DMChannel, MessageEmbed, NewsChannel, TextChannel} from 'discord.js';

import type { StandardEventLookup } from '../events/standard-event-lookup';
import resolveLogger from '../logger';
import resolveEventLookup from '../events';
import {Event} from '../objects/event';
import {publishEventMessage} from '../slack/slack_handler';

const log: Logger = resolveLogger();
const eventManager: StandardEventLookup = resolveEventLookup();

const debugRegex = /^!cas\s+event/giu;

const sendDiscordEvent = async (
  channelToSendOn: TextChannel | DMChannel | NewsChannel,
  eventToDetail: Event,
): Promise<Message> => {
  const generatedEmbed = new MessageEmbed()
    .setColor('DARK_ORANGE')
    .setTitle(eventToDetail.name.text)
    .setDescription(eventToDetail.description.text)
    .setThumbnail(eventToDetail.logo.url)
    .setURL(eventToDetail.url)
    .setTimestamp(eventToDetail.start.utc)
    .setFooter('Code and Stuff');
  return channelToSendOn.send(
    'The following is an official Code and Stuff event...',
    { embed: generatedEmbed },
  );
};

const handleEventCalls = async (incomingMessage: Message): Promise<void> => {
  if (debugRegex.test(incomingMessage.content)) {
    try {
      log.info('Received request to display all current events');
      const currentEvents = await eventManager.getAllActiveEvents();
      log.debug(`Found ${currentEvents.length} currently active events`);
      if (currentEvents.length > 0) {
        const nextEvent: Event = currentEvents
          .filter((ev) => ev.start.utc.getDate() > Date.now())
          .sort((a, b) => a.start.utc.getDate() - b.start.utc.getDate())[ 0 ];
        await Promise.all([
          sendDiscordEvent(incomingMessage.channel, nextEvent),
          publishEventMessage(nextEvent),
        ]);
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

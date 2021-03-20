import {Client, Message, MessageEmbed} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';
import {StandardEventLookup} from '../events/standard-event-lookup';
import resolveEventLookup from '../events';

const log: Logger = resolveLogger();
const eventManager: StandardEventLookup = resolveEventLookup();

const debugRegex = /^!cas\s+event/gi

const handleEventCalls = async (incomingMessage: Message) => {
  if (debugRegex.test(incomingMessage.content)) {
    try {
      log.info('Received request to display all current events');
      const currentEvents = await eventManager.getAllActiveEvents();
      log.debug(`Found ${currentEvents.length} current events`);
      const sendingPromises = currentEvents.map((awaitingEvent) => {
        const generatedEmbed = new MessageEmbed()
        .setColor('DARK_ORANGE')
        .setTitle(awaitingEvent.name.text)
        .setDescription(awaitingEvent.description.text)
        .setThumbnail(awaitingEvent.logo.url)
        .setURL(awaitingEvent.url)
        .setTimestamp(awaitingEvent.start.utc)
        .setFooter('Code and Stuff')
        return incomingMessage.channel.send(
          'The following is an official Code and Stuff event...',
          { embed: generatedEmbed },
        );
      });
      await Promise.all(sendingPromises);
    } catch (e) {
      log.warn(`Unable to promote upcoming events :: ${e.message}`);
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

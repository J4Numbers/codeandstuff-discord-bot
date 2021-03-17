import config from 'config';
import {Client, Message, TextChannel} from 'discord.js';
import resolveEventLookup from '../events';
import {StandardEventLookup} from '../events/standard-event-lookup';
import {Ticket} from '../objects/ticket';

const ticketLookupEngine: StandardEventLookup = resolveEventLookup();
const registrationRegex: RegExp = /^!cas\s+([^ ])\s+([^ ])$/gi;

const onMessage = (incomingMessage: Message) => {
  // Retrieve the channel that the message came in on
  const channel = incomingMessage.channel;
  const message = incomingMessage.content;
  const extractedNames = registrationRegex.exec(message);
  // Do nothing if the channel wasn't found on this server
  if (channel.id !== config.get('discord.welcome_channel') ||
    !(channel instanceof TextChannel) ||
    !extractedNames) return;
  // Attempt to resolve the person's name against Eventbrite
  // @ts-ignore
  const firstname = extractedNames.groups[1];
  // @ts-ignore
  const lastname = extractedNames.groups[2];

  ticketLookupEngine.lookupTicketWithName({
    firstname,
    lastname,
  })
    .catch(() => {
      channel.send(
        `${incomingMessage.author} - We're sorry, but we couldn't find ${firstname} ${lastname} ` +
        `in our current event roster. Please make sure that you have signed up to our event and ` +
        `that you have entered your name correctly.`,
      );
    })
    .then((data: Ticket) => {
      incomingMessage.guild?.member(incomingMessage.author)?.setNickname(`${firstname} ${lastname}`);
      // Add roles and change nickname of author
    });
}

const register = (discordClient: Client): void => {
  discordClient.on('message', onMessage);
}

export {
  register
};

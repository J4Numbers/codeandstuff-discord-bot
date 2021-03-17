import config from 'config';
import {Client, Message, TextChannel} from 'discord.js';
import Logger from 'bunyan';
import {Ticket} from '../objects/ticket';
import resolveLogger from '../logger';
import {TicketManager} from '../tickets/ticket-manager';
import resolveTicketManager from '../tickets';

const log: Logger = resolveLogger();

const ticketManager: TicketManager = resolveTicketManager();
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

  ticketManager.lookupTicketWithName({
    firstname,
    lastname,
  })
    .then((ticket: Ticket) => {
      log.info(`Found corresponding ticket for new joiner :: ${ticket.id}`);
      incomingMessage.guild?.member(incomingMessage.author)?.setNickname(ticket.profile.name);
      // Add roles and change nickname of author
    })
    .catch(() => {
      channel.send(
        `${incomingMessage.author} - We're sorry, but we couldn't find ${firstname} ${lastname} ` +
        `in the roster for any of our current events. Please make sure that you have signed up for an ` +
        `event and that you have entered your name correctly.`,
      );
    });
}

const register = (discordClient: Client): void => {
  discordClient.on('message', onMessage);
  log.debug('Initiated event for new messages inside the server.');
}

export {
  register
};

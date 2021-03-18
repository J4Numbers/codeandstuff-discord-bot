import config from 'config';
import {Client, Message, TextChannel} from 'discord.js';
import Logger from 'bunyan';
import {Ticket} from '../objects/ticket';
import resolveLogger from '../logger';
import {TicketManager} from '../tickets/ticket-manager';
import resolveTicketManager from '../tickets';
import {manageFoundJoiner, manageNotFoundJoiner} from './discord-workers';

const log: Logger = resolveLogger();

const ticketManager: TicketManager = resolveTicketManager();
const registrationRegex: RegExp = /^!cas\s+register\s+([^ ]+)\s+([^ ]+)$/gi;

const onRegistrationMessage = (incomingMessage: Message) => {
  // Retrieve the channel that the message came in on
  const channel = incomingMessage.channel;
  const message = incomingMessage.content;

  const extractedNames = registrationRegex.exec(message);
  log.debug(`Received ${message} from ${channel.id}`);

  // Do nothing if the channel wasn't found on this server
  if (channel.id !== config.get('discord.welcome_channel') ||
    !(channel instanceof TextChannel) ||
    !extractedNames) return;
  // Attempt to resolve the person's name against Eventbrite
  // @ts-ignore
  const firstname = extractedNames[1];
  // @ts-ignore
  const lastname = extractedNames[2];

  log.debug(`Looking up tickets in current events for '${firstname} ${lastname}'`);
  ticketManager.lookupTicketWithName({
    firstname,
    lastname,
  })
    .then((ticket: Ticket) => {
      // Add roles and change nickname of author
      log.info(`Found corresponding ticket for new joiner :: ${ticket.id}`);
      return manageFoundJoiner(incomingMessage, ticket);
    })
    .catch(() => {
      log.info(`Unable to find corresponding ticket for new joiner :: ${firstname} ${lastname}`);
      return manageNotFoundJoiner(incomingMessage, { firstname, lastname });
    });
}

const register = (discordClient: Client): void => {
  discordClient.on('message', onRegistrationMessage);
  log.debug('Initiated event for new messages inside the server.');
}

export {
  register
};

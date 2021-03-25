import config from 'config';
import {Client, Message, TextChannel} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';
import {TicketManager} from '../tickets/ticket-manager';
import resolveTicketManager from '../tickets';
import {manageFoundJoiner, manageNotFoundJoiner} from './discord-workers';

const log: Logger = resolveLogger();

const ticketManager: TicketManager = resolveTicketManager();
const registrationRegex: RegExp = /^!cas\s+register\s+([^ ]+)\s+([^ ]+)$/gi;

const onRegistrationMessage = async (incomingMessage: Message) => {
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
  const firstname = extractedNames[1];
  // @ts-ignore
  const lastname = extractedNames[2];

  try {
    log.debug(`Looking up tickets in current events for '${firstname} ${lastname}'`);
    const ticket = await ticketManager.lookupTicketWithName({
      firstname,
      lastname,
    })
    // Add roles and change nickname of author
    log.info(`Found corresponding ticket for new joiner :: ${ticket.id}`);
    return manageFoundJoiner(incomingMessage, ticket);
  } catch(e) {
    log.info(`Unable to register new user with Eventbrite :: ${e.message}`);
    return manageNotFoundJoiner(incomingMessage, { firstname, lastname });
  }
}

const register = (discordClient: Client): void => {
  discordClient.on('message', onRegistrationMessage);
  log.debug('Initiated event for new messages inside the server.');
}

export {
  register
};

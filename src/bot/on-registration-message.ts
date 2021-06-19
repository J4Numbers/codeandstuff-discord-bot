import type { Client, Message } from 'discord.js';
import type Logger from 'bunyan';
import { TextChannel } from 'discord.js';
import config from 'config';

import type { TicketManager } from '../tickets/ticket-manager';
import resolveLogger from '../logger';
import resolveTicketManager from '../tickets';
import { manageFoundJoiner, manageNotFoundJoiner } from './discord-workers';

const log: Logger = resolveLogger();

const ticketManager: TicketManager = resolveTicketManager();
const registrationRegex = /^!cas\s+register\s+(?<firstname>[^ ]+)\s+(?<lastname>[^ ]+)$/gui;

const onRegistrationMessage = async (incomingMessage: Message): Promise<void> => {
  // Retrieve the channel that the message came in on
  const channel = incomingMessage.channel;
  const message = incomingMessage.content;

  const extractedNames = registrationRegex.exec(message);

  // Do nothing if the channel wasn't found on this server
  if (channel.id !== config.get('discord.welcome_channel')
    || !(channel instanceof TextChannel)
    || !extractedNames
    || !extractedNames.groups) {
    return;
  }
  // Attempt to resolve the person's name against Eventbrite
  // @ts-check-error
  const firstname = extractedNames.groups.firstname;
  // @ts-check-error
  const lastname = extractedNames.groups.lastname;

  try {
    log.debug(`Looking up tickets in current events for '${firstname} ${lastname}'`);
    const ticket = await ticketManager.lookupTicketWithName({
      firstname,
      lastname,
    });
    // Add roles and change nickname of author
    log.info(`Found corresponding ticket for new joiner :: ${ticket.id}`);
    return manageFoundJoiner(incomingMessage, ticket);
  } catch (e: unknown) {
    if (e instanceof Error) {
      log.info(`Unable to register new user with Eventbrite :: ${e.message}`);
      return manageNotFoundJoiner(incomingMessage, {
        firstname,
        lastname,
      });
    }
  }
};

const register = (discordClient: Client): void => {
  discordClient.on('message', onRegistrationMessage as (msg: Message) => void);
  log.debug('Initiated event for new messages inside the server.');
};

export {
  register,
};

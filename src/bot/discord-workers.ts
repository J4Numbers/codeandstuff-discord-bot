import type { Message } from 'discord.js';
import type Logger from 'bunyan';
import { TextChannel } from 'discord.js';
import config from 'config';

import type { NameDetails } from '../objects/name-details';
import type { Ticket } from '../objects/ticket';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const updateAttendee = async (message: Message, ticket: Ticket): Promise<void> => {
  await message.member?.setNickname(ticket.profile.name);
  await message.member?.roles.add(config.get('discord.attendee_role'));
};

const updateMentor = async (message: Message, ticket: Ticket): Promise<void> => {
  await message.member?.setNickname(`${ticket.profile.name} - Mentor`);
  await message.member?.roles.add(config.get('discord.mentor_role'));
};

const manageFoundJoiner = async (message: Message, ticket: Ticket): Promise<void> => {
  if (ticket.ticket_class_name === 'Mentor') {
    log.debug('Overriding nickname and giving new user mentee role...');
    await updateMentor(message, ticket);
  } else {
    log.debug('Overriding nickname and giving new user attendee role...');
    await updateAttendee(message, ticket);
  }
  const joinerChannel = await message.client.channels.fetch(config.get('discord.joined_channel'));
  if (joinerChannel instanceof TextChannel) {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    const joinedChannel = joinerChannel as TextChannel;
    await joinedChannel.send(
      `Welcome to ${message.member?.toString() ?? 'our new member'}! Feel free to say hello`
      + ' and introduce yourself in the chat!',
    );
  }
};

const manageNotFoundJoiner = async (message: Message, name: NameDetails): Promise<void> => {
  log.debug('Announcing inability to find a user...');
  void await message.channel.send(
    `${message.author.toString()} - We're sorry, but we couldn't find ${name.firstname}`
    + ` ${name.lastname} in the roster for any of our current events. Please make sure that`
    + ' you have signed up for an event and that you have entered your name correctly.',
  );
};

export {
  manageFoundJoiner,
  manageNotFoundJoiner,
};

import {GuildMember, Message, TextChannel} from 'discord.js';
import {Ticket} from '../objects/ticket';
import config from 'config';
import {NameDetails} from '../objects/name-details';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const updateAttendee = async (message: Message, ticket: Ticket): Promise<void> => {
  await message.member?.setNickname(ticket.profile.name);
  await message.member?.roles.add(config.get('discord.attendee_role'));
}

const updateMentor = async (message: Message, ticket: Ticket): Promise<void> => {
  await message.member?.setNickname(`${ticket.profile.name} - Mentor`);
  await message.member?.roles.add(config.get('discord.mentor_role'));
}

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
    const joinedChannel = joinerChannel as TextChannel;
    await joinedChannel.send(
      `Welcome to ${message.member}! Feel free to say hello and introduce yourself in the chat!`
    );
  }
}

const manageNotFoundJoiner = async (message: Message, name: NameDetails): Promise<void> => {
  log.debug('Announcing inability to find a user...');
  message.channel.send(
    `${message.author} - We're sorry, but we couldn't find ${name.firstname} ${name.lastname} ` +
    `in the roster for any of our current events. Please make sure that you have signed up for an ` +
    `event and that you have entered your name correctly.`,
  );
}

export {
  manageFoundJoiner,
  manageNotFoundJoiner,
}

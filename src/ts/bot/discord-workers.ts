import {Guild, Message, Role, TextChannel} from 'discord.js';
import {Ticket} from '../objects/ticket';
import config from 'config';
import {NameDetails} from '../objects/name-details';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const lookupRolesByName = async (guild: Guild, nameToMatch: string): Promise<Array<Role>> => {
  const allRoles = guild.roles.cache.array();
  return allRoles.filter(
    (role) => role.name.toLowerCase() === nameToMatch.toLowerCase(),
  );
}

const lookupEventGroup = async (guild: Guild, eventId: string): Promise<Role> => {
  let foundRoles = await lookupRolesByName(guild, eventId);
  if (foundRoles.length === 0) {
    log.info(`No role found for event of id ${eventId}... Creating...`);
    const role = await guild.roles.create({ data: { name: eventId }, reason: `Role for event of id ${eventId}` });
    foundRoles = [ role ];
  }
  return foundRoles[0];
}

const manageFoundJoiner = async (message: Message, ticket: Ticket): Promise<void> => {
  message.member?.setNickname(ticket.profile.name);
  message.member?.roles.add(config.get('discord.attendee_role'));
  const joinerChannel = await message.client.channels.fetch(config.get('discord.joined_channel'));
  if (joinerChannel instanceof TextChannel) {
    const joinedChannel = joinerChannel as TextChannel;
    joinedChannel.send(
      `Welcome to ${message.member}! Feel free to say hello and introduce yourself in the chat!`
    );
  }
  const eventRole = await lookupEventGroup(message.guild as Guild, ticket.event_id);
  message.member?.roles.add(eventRole);
}

const manageNotFoundJoiner = async (message: Message, name: NameDetails): Promise<void> => {
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

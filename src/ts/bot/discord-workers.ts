import {Message} from 'discord.js';
import {Ticket} from '../objects/ticket';
import config from 'config';
import {NameDetails} from '../objects/name-details';

const manageFoundJoiner = async (message: Message, ticket: Ticket) => {
  message.member?.setNickname(ticket.profile.name);
  message.member?.roles.add(config.get('discord.attendee_role'));
  message.client.channels.fetch(config.get('discord.joined_channel'))
}

const manageNotFoundJoiner = async (message: Message, name: NameDetails) => {
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

import config from 'config';
import {Client, GuildMember, PartialGuildMember, TextChannel} from 'discord.js';
import Logger from 'bunyan';
import resolveLogger from '../logger';

const log: Logger = resolveLogger();

const onGuildMemberAdd = (guildMember: GuildMember | PartialGuildMember) => {
  try {
    log.debug(`New member proc'd the event :: ${guildMember.displayName}`)
    // Send the message to a designated channel on a server:
    const channel = guildMember.guild.channels.cache
      .find(ch => ch.id === config.get('discord.welcome_channel'));
    // Do nothing if the channel wasn't found on this server
    if (!channel || !(channel instanceof TextChannel)) return;
    log.info(`${guildMember.nickname} joined the server, welcoming!`);
    // Send the message, mentioning the member
    channel.send(
      `Welcome to the server, ${guildMember}!\n\n`
      + `Please enter the name you signed up to the event with in the format of: `
      + `\`'!cas register [firstname] [lastname]'\`. For example, if your name was John `
      + 'Smith, you would enter:\n ```\n!cas register John Smith\n```',
    );
  } catch (e) {
    log.warn(`Unable to greet new member :: ${e.message}`);
  }
}

const register = (discordClient: Client): void => {
  discordClient.on('guildMemberAdd', onGuildMemberAdd);
  log.debug('Initiated event for new members joining the server.');
}

export {
  register
};

import {Client, GuildMember, PartialGuildMember, TextChannel} from "discord.js";

const onGuildMemberAdd = (guildMember: GuildMember | PartialGuildMember) => {
    // Send the message to a designated channel on a server:
    const channel = guildMember.guild.channels.cache.find(ch => ch.name === 'welcome');
    // Do nothing if the channel wasn't found on this server
    if (!channel || !(channel instanceof TextChannel)) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${guildMember}! Please enter the name you signed up to the event with in the format of: '!cas [firstname] [lastname]'`);
}

const register = (discordClient: Client): void => {
    discordClient.on('guildMemberAdd', onGuildMemberAdd);
}

export {
    register
};

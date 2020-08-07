import {Client, Message, TextChannel} from "discord.js";
import {resolveTicketLookup} from "../tickets";
import {StandardTicketLookup} from "../tickets/standard-ticket-lookup";
import {TicketLookup} from "../objects/ticket-lookup";

const ticketLookupEngine: StandardTicketLookup = resolveTicketLookup();
const registrationRegex: RegExp = /^!cas ([^ ]) ([^ ])$/gi;

const onMessage = (incomingMessage: Message) => {
    // Retrieve the channel that the message came in on
    const channel = incomingMessage.channel;
    const message = incomingMessage.content;
    const extractedNames = registrationRegex.exec(message);
    // Do nothing if the channel wasn't found on this server
    if (channel.id !== 'welcome' ||
        !(channel instanceof TextChannel) ||
        !extractedNames) return;
    // Attempt to resolve the person's name against Eventbrite
    // @ts-ignore
    const firstname = extractedNames.groups[1];
    // @ts-ignore
    const lastname = extractedNames.groups[2];

    ticketLookupEngine.lookupTicketWithName({
        firstname,
        lastname,
    })
        .then((data: TicketLookup) => {
            if (data === undefined) {
                channel.send(
                    `${incomingMessage.author} - We're sorry, but we couldn't find ${firstname} ${lastname} `+
                    `in our event roster. Please make sure that you have signed up to our event and that you have `+
                    `entered your name correctly.`,
                )
            } else {
                incomingMessage.guild?.member(incomingMessage.author)?.setNickname(`${firstname} ${lastname}`);
                // Add roles and change nickname of author
            }
        })
}

const register = (discordClient: Client): void => {
    discordClient.on('message', onMessage);
}

export {
    register
};

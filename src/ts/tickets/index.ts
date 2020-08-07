import config from "config";
import {StandardTicketLookup} from "./standard-ticket-lookup";
import {EventbriteTicketLookup} from "./eventbrite-ticket-lookup";

let ticketLookup: StandardTicketLookup;

const generateTicketLookup = (): StandardTicketLookup => {
    return new EventbriteTicketLookup(config.get('eventbrite'));
};

export function resolveTicketLookup(): StandardTicketLookup {
    if (ticketLookup === undefined) {
        ticketLookup = generateTicketLookup();
    }
    return ticketLookup;
}

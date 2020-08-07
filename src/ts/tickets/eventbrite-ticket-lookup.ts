import {StandardTicketLookup} from "./standard-ticket-lookup";
import {TicketLookup} from "../objects/ticket-lookup";
import {NameDetails} from "../objects/name-details";
import {EventbriteTicketProps} from "../objects/eventbrite-ticket-props";

export class EventbriteTicketLookup implements StandardTicketLookup {
    constructor(props: EventbriteTicketProps) {
    }

    async lookupTicketWithName(nameDetails: NameDetails): Promise<TicketLookup> {
        return {
            ticket_type: 'attendee',
        };
    }
}

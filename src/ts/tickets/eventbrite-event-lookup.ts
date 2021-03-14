import {StandardEventLookup} from "./standard-event-lookup";
import {Ticket, Tickets} from "../objects/ticket";
import {Events} from "../objects/event";
import {NameDetails} from "../objects/name-details";
import {EventbriteTicketProps} from "../objects/eventbrite-ticket-props";

export class EventbriteEventLookup implements StandardEventLookup {
  configuration: EventbriteTicketProps;

  baseEventbriteLink: string = 'https://www.eventbriteapi.com'
  listOrganisationEventsLink: string = 'v3/organizations/ORG_ID/events'
  listAttendeesLink: string = 'v3/events/EVENT_ID/attendees/'

  constructor(props: EventbriteTicketProps) {
    this.configuration = props;
  }

  async getAllActiveEvents(): Promise<Events> {
    const builtLink = `${baseEventbriteLink}/${listOrganisationEventsLink}?token=${this.configuration.token}&status=live`;
    return [];
  }

  async getTicketsAssociatedWithEvent(eventId: string): Promise<Tickets> {
    return [];
  }

  async lookupTicketWithName(nameDetails: NameDetails): Promise<Ticket> {
    return {
      ticket_type: 'attendee',
    };
  }
}

import * as axios from 'axios';
import {StandardEventLookup} from "./standard-event-lookup";
import {Ticket, Tickets} from "../objects/ticket";
import {Events} from "../objects/event";
import {NameDetails} from "../objects/name-details";
import {EventbriteEventProps} from "../objects/eventbrite-event-props";

export class EventbriteEventLookup implements StandardEventLookup {
  configuration: EventbriteEventProps;

  baseEventbriteLink: string = 'https://www.eventbriteapi.com'
  listOrganisationEventsLink: string = 'v3/organizations/ORG_ID/events'
  listAttendeesLink: string = 'v3/events/EVENT_ID/attendees/'

  constructor(props: EventbriteEventProps) {
    this.configuration = props;
  }

  async performRequest(urlToCall: string): Promise<Object> {
    return axios(urlToCall);
  }

  async getAllActiveEvents(): Promise<Events> {
    const builtLink = `${baseEventbriteLink}/${listOrganisationEventsLink}?token=${this.configuration.token}&status=live`;
    const filledLink = builtLink.replace('ORG_ID', this.configuration.org_id);
    try {
      const eventRequest = await this.performRequest(filledLink);
      return [];
    } catch (axiosException) {
      log.warn(`Unable to get all active events... :: ${axiosException.message}`);
      throw axiosException;
    }
  }

  async getTicketsAssociatedWithEvent(eventId: string): Promise<Tickets> {
    const builtLink = `${baseEventbriteLink}/${listAttendeesLink}?token=${this.configuration.token}`;
    const filledLink = builtLink.replace('EVENT_ID', eventId);
    return [];
  }

  async lookupTicketWithName(nameDetails: NameDetails): Promise<Ticket> {
    return {
      ticket_type: 'attendee',
    };
  }
}

import axios, {AxiosPromise} from 'axios';
import Logger from 'bunyan';
import * as logger_engine from '../logger';
import {StandardEventLookup} from './standard-event-lookup';
import {Ticket, Tickets} from '../objects/ticket';
import {Events} from '../objects/event';
import {NameDetails} from '../objects/name-details';
import {EventbriteEventProps} from '../objects/eventbrite-event-props';

const logger: Logger = logger_engine.resolveLogger();

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
    const builtLink = `${this.baseEventbriteLink}/${this.listOrganisationEventsLink}?token=${this.configuration.token}&status=live`;
    const filledLink = builtLink.replace('ORG_ID', `${this.configuration.org_id}`);
    try {
      const eventRequest = await (axios(filledLink) as AxiosPromise<Events>);
      return [];
    } catch (axiosException) {
      logger.warn(`Unable to get all active events... :: ${axiosException.message}`);
      throw axiosException;
    }
  }

  async getTicketsAssociatedWithEvent(eventId: string): Promise<Tickets> {
    const builtLink = `${this.baseEventbriteLink}/${this.listAttendeesLink}?token=${this.configuration.token}`;
    const filledLink = builtLink.replace('EVENT_ID', eventId);
    return [];
  }

  async lookupTicketWithName(nameDetails: NameDetails): Promise<Ticket> {
    return {
      id: '123',
      event_id: '09238834',
      created: new Date(),
      profile: {
        first_name: 'John',
        last_name: 'Smith',
        email: 'example@example.com',
        name: 'John Smith',
      },
      ticket_class_name: 'attendee',
    };
  }
}

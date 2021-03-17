import Logger from 'bunyan';
import eventbrite from 'eventbrite';
import {PaginatedResponse, Sdk} from 'eventbrite/lib/types';
import resolveLogger from '../logger';
import {StandardEventLookup} from './standard-event-lookup';
import {Tickets} from '../objects/ticket';
import {Events} from '../objects/event';
import {EventbriteEventProps} from '../objects/eventbrite-event-props';

const logger: Logger = resolveLogger();

export class EventbriteEventLookup implements StandardEventLookup {
  configuration: EventbriteEventProps;
  eventbriteSdk: Sdk;

  baseEventbriteLink: string = 'https://www.eventbriteapi.com'
  listOrganisationEventsLink: string = '/organizations/ORG_ID/events'
  listAttendeesLink: string = '/events/EVENT_ID/attendees/'

  constructor(props: EventbriteEventProps) {
    this.configuration = props;
    this.eventbriteSdk = eventbrite({ token: props.token });
  }

  async getAllActiveEvents(): Promise<Events> {
    const builtLink = `${this.listOrganisationEventsLink}?status=live`;
    try {
      const response = await this.eventbriteSdk.request(builtLink.replace('ORG_ID', `${this.configuration.org_id}`));
      return ((response as PaginatedResponse<unknown>).events) as Events;
    } catch (sdkException) {
      logger.warn(`Unable to get all active events... :: ${sdkException.message}`);
      throw sdkException;
    }
  }

  async getTicketsAssociatedWithEvent(eventId: string): Promise<Tickets> {
    try {
      const response = await this.eventbriteSdk.request(this.listAttendeesLink.replace('EVENT_ID', eventId));
      return ((response as PaginatedResponse<unknown>).attendees) as Tickets;
    } catch (sdkException) {
      logger.warn(`Unable to get all tickets for event :: ${sdkException.message}`);
      throw sdkException;
    }
  }
}

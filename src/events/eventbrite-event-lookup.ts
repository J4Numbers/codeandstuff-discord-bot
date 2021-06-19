import type Logger from 'bunyan';
import type { PaginatedResponse, Sdk } from 'eventbrite/lib/types';
import eventbrite from 'eventbrite';

import type { StandardEventLookup } from './standard-event-lookup';
import type { EventbriteEventProps } from '../objects/eventbrite-event-props';
import type { Tickets } from '../objects/ticket';
import type { Events } from '../objects/event';
import resolveLogger from '../logger';

const logger: Logger = resolveLogger();

export class EventbriteEventLookup implements StandardEventLookup {
  private static readonly baseEventbriteLink: string = 'https://www.eventbriteapi.com';

  private static readonly listOrganisationEventsLink: string = '/organizations/ORG_ID/events';

  private static readonly listAttendeesLink: string = '/events/EVENT_ID/attendees/';

  private readonly configuration: EventbriteEventProps;

  private readonly eventbriteSdk: Sdk;

  public constructor (props: EventbriteEventProps) {
    this.configuration = props;
    this.eventbriteSdk = eventbrite({
      baseUrl: props.base_url ? props.base_url : EventbriteEventLookup.baseEventbriteLink,
      token: props.token,
    });
  }

  public async getAllActiveEvents (): Promise<Events> {
    const builtLink = `${EventbriteEventLookup.listOrganisationEventsLink}?status=live`;
    try {
      const response = await this.eventbriteSdk.request(
        builtLink.replace('ORG_ID', `${this.configuration.org_id}`),
      );
      return ((response as PaginatedResponse<unknown>).events) as Events;
    } catch (sdkException: unknown) {
      if (sdkException instanceof Error) {
        logger.warn(`Unable to get all active events... :: ${sdkException.message}`);
      }
      throw sdkException;
    }
  }

  public async getTicketsAssociatedWithEvent (eventId: string): Promise<Tickets> {
    try {
      const response = await this.eventbriteSdk.request(
        EventbriteEventLookup.listAttendeesLink.replace('EVENT_ID', eventId),
      );
      return ((response as PaginatedResponse<unknown>).attendees) as Tickets;
    } catch (sdkException: unknown) {
      if (sdkException instanceof Error) {
        logger.warn(`Unable to get all tickets for event :: ${sdkException.message}`);
      }
      throw sdkException;
    }
  }
}

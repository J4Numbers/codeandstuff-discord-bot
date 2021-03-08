import config from 'config';
import {StandardEventLookup} from './standard-event-lookup';
import {EventbriteEventLookup} from './eventbrite-event-lookup';

let ticketLookup: StandardEventLookup;

const generateEventLookup = (): StandardEventLookup => {
  return new EventbriteEventLookup(config.get('eventbrite'));
};

export function resolveTicketLookup(): StandardEventLookup {
  if (ticketLookup === undefined) {
    ticketLookup = generateEventLookup();
  }
  return ticketLookup;
}

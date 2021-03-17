import config from 'config';
import {StandardEventLookup} from './standard-event-lookup';
import {EventbriteEventLookup} from './eventbrite-event-lookup';

let ticketLookup: StandardEventLookup;

const generateEventLookup = (): StandardEventLookup => {
  return new EventbriteEventLookup(config.get('eventbrite'));
};

export default function resolveEventLookup(): StandardEventLookup {
  if (ticketLookup === undefined) {
    ticketLookup = generateEventLookup();
  }
  return ticketLookup;
}

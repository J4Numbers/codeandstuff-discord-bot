import config from 'config';

import type { StandardEventLookup } from './standard-event-lookup';
import { EventbriteEventLookup } from './eventbrite-event-lookup';

let eventLookup: StandardEventLookup | undefined;

const generateEventLookup = (): StandardEventLookup => new EventbriteEventLookup(
  config.get('eventbrite'),
);

export default function resolveEventLookup (): StandardEventLookup {
  if (eventLookup === undefined) {
    eventLookup = generateEventLookup();
  }
  return eventLookup;
}

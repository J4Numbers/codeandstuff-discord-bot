import type { Tickets } from '../objects/ticket';
import type { Events } from '../objects/event';

export interface StandardEventLookup {
  getAllActiveEvents: () => Promise<Events>;
  getTicketsAssociatedWithEvent: (eventId: string) => Promise<Tickets>;
}

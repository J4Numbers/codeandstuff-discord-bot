import {Tickets} from "../objects/ticket";
import {Events} from "../objects/event";

export interface StandardEventLookup {
  getAllActiveEvents(): Promise<Events>;
  getTicketsAssociatedWithEvent(eventId: string): Promise<Tickets>;
}

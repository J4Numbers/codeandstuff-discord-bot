import {NameDetails} from '../objects/name-details';
import {Ticket, Tickets} from "../objects/ticket";
import {Events} from "../objects/event";

export interface StandardEventLookup {
  getAllActiveEvents(): Promise<Events>;
  getTicketsAssociatedWithEvent(eventId: string): Promise<Tickets>;
  lookupTicketWithName(nameDetails: NameDetails): Promise<Ticket>;
}

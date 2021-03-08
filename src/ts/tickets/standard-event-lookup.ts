import {NameDetails} from '../objects/name-details';
import {TicketLookup} from '../objects/ticket-lookup';

export interface StandardEventLookup {
  lookupTicketWithName(nameDetails: NameDetails): Promise<TicketLookup>;
}

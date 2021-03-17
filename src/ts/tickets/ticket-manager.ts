import Logger from 'bunyan';
import resolveLogger from '../logger';
import {NameDetails} from '../objects/name-details';
import {Ticket} from '../objects/ticket';
import {StandardEventLookup} from '../events/standard-event-lookup';

const log: Logger = resolveLogger();

export class TicketManager {
  eventManager: StandardEventLookup;

  constructor(eventManager: StandardEventLookup) {
    this.eventManager = eventManager;
  }

  async lookupTicketWithName(nameDetails: NameDetails): Promise<Ticket> {
    const allEvents = await this.eventManager.getAllActiveEvents();
    const ticketsForAllEvents = allEvents.map((event) => {
      log.debug(`Finding all tickets associated with event on ${event.start.utc}`)
      return this.eventManager.getTicketsAssociatedWithEvent(event.id);
    });
    const allTickets = (await Promise.all(ticketsForAllEvents)).flat();
    const foundTickets = allTickets.filter((ticket) =>
      ticket.profile.first_name.toLowerCase() === nameDetails.firstname.toLowerCase()
      && ticket.profile.last_name.toLowerCase() === nameDetails.lastname.toLowerCase()
    );
    if (foundTickets.length > 0) {
      return foundTickets[0];
    }
    throw new Error('Unable to find ticket for person');
  }
}

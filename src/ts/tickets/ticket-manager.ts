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
    log.info(`Found ${allEvents.length} currently active events...`);
    const ticketsForAllEvents = allEvents.map((event) => {
      log.debug(`Finding all tickets associated with event ${event.id}`)
      return this.eventManager.getTicketsAssociatedWithEvent(event.id);
    });
    const allTickets = (await Promise.all(ticketsForAllEvents)).flat();
    log.info(`Found ${allTickets.length} tickets associated with all current events...`);
    const foundTickets = allTickets.filter((ticket) =>
      ticket.profile.first_name.toLowerCase() === nameDetails.firstname.toLowerCase()
      && ticket.profile.last_name.toLowerCase() === nameDetails.lastname.toLowerCase()
    );
    log.info(`Found ${foundTickets.length} tickets which match the provided name...`);
    if (foundTickets.length > 0) {
      return foundTickets[0];
    }
    throw new Error('Unable to find ticket for person');
  }
}

import {TicketManager} from './ticket-manager';
import resolveEventLookup from '../events';

let ticketManager: TicketManager;

const generateTicketManager = (): TicketManager => {
  return new TicketManager(resolveEventLookup());
};

export default function resolveTicketManager(): TicketManager {
  if (ticketManager === undefined) {
    ticketManager = generateTicketManager();
  }
  return ticketManager;
}

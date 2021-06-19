import { TicketManager } from './ticket-manager';
import resolveEventLookup from '../events';

let ticketManager: TicketManager | undefined;

const generateTicketManager = (): TicketManager => new TicketManager(resolveEventLookup());

export default function resolveTicketManager (): TicketManager {
  if (ticketManager === undefined) {
    ticketManager = generateTicketManager();
  }
  return ticketManager;
}

import { TicketProfile } from "./ticket-profile";

export interface Ticket {
  id: string,
  event_id: string,
  created: Date,
  profile: TicketProfile,
  ticket_class_name: string,
};

export type Tickets = Array<Ticket>;

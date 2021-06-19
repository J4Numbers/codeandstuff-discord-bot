import type { TicketProfile } from './ticket-profile';
import type { Questions } from './questions';

export interface Ticket {
  id: string;
  event_id: string;
  created: Date;
  changed: Date;
  profile: TicketProfile;
  quantity: number;
  variant_id?: number;
  checked_in: boolean;
  cancelled: boolean;
  refunded: boolean;
  ticket_class_id: number;
  ticket_class_name: string;
  answers: Questions;
  affiliate: string;
  guestlist_id?: number;
  invited_by?: number;
  status: string;
  order_id: number;
}

export type Tickets = Array<Ticket>;

import {TimeZone} from './time-zone';

export interface Event {
  id: string,
  org_id: string,
  name: string,
  description: string,
  url: string,
  start: TimeZone,
  end: TimeZone,
  online_event: boolean,
}

export type Events = Array<Event>;

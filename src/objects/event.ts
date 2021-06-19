import type { TimeZone } from './time-zone';
import type { ExpandedText } from './expanded-text';
import type { LogoDefinition } from './logo-definition';

export interface Event {
  id: string;
  organization_id: string;
  name: ExpandedText;
  description: ExpandedText;
  url: string;
  start: TimeZone;
  end: TimeZone;
  created: Date;
  changed: Date;
  published: Date;
  capacity: number;
  status: string;
  currency: string;
  online_event: boolean;
  listed: boolean;
  shareable: boolean;
  locale: string;
  is_series: boolean;
  is_series_parent: boolean;
  inventory_type: string;
  venue_id?: number;
  category_id?: number;
  subcategory_id?: number;
  format_id: number;
  logo: LogoDefinition;
}

export type Events = Array<Event>;

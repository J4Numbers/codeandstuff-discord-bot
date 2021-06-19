import type { DownstreamPost } from './downstream-posts/downstream-post';

export interface EventbriteEventProps {
  token: string;
  org_id: number;
  base_url?: string;
  downstream: Array<DownstreamPost>;
}

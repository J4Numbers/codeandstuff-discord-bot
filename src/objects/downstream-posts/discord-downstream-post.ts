import type { DownstreamPost } from './downstream-post';

export interface DiscordDownstreamPost extends DownstreamPost {
  channel_id: string;
}

import type { DownstreamPost } from './downstream-post';

export interface SlackDownstreamPost extends DownstreamPost {
  token: string;
  webhook: string;
}

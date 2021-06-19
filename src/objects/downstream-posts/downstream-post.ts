export enum DownstreamPostType {
  SLACK = 'SLACK',
  DISCORD = 'DISCORD',
}

export interface DownstreamPost {
  type: DownstreamPostType;
}

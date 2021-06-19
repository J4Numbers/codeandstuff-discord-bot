export interface LogoDefinition {
  original: {
    url: string;
    width: number;
    height: number;
  };
  id: string;
  url: string;
  aspect_ratio: string;
  edge_color?: string;
  edge_color_set: boolean;
}

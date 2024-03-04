import { Config, Resolutions } from '../type/config';

const Resolutions: Resolutions = {
  HighDefinition: {
    width: 1280,
    height:720,
  },
  FullHD: {
    width: 1920,
    height:1080,
  },
  QuadHD: {
    width: 2560,
    height:1440,
  },
} as const;

export const config: Config = {
  debug: true,
  resolution: Resolutions.FullHD,
  get width(): number  { return this.resolution.width; },
  get height(): number { return this.resolution.height; },
  ui: {
    scale: 2,
  },
} as const;
import { Config, Resolutions } from '../../ts/types/config';

const init = (): Config => {
  const config: Config = {
    debug: true,
    resolution: Resolutions.FullHD,
    get width(): number  { return this.resolution.width; },
    get height(): number { return this.resolution.height; },
  } as const;
  globalThis.config = config;
  return config;
};

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

export default init;

import { Config } from './config.js';

declare global {
  interface globalThis {
    config: Config
  }
}
